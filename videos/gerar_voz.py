"""Gera a narração de um vídeo, frase a frase, com um motor de voz.

Uso: python videos/gerar_voz.py videos/demo-sistema --motor xtts|xtts-ref|kokoro|chatterbox [--referencia ref.wav]

Cada frase é sintetizada e conferida com o Whisper: se a transcrição não bater com o roteiro
(palavra trocada, trecho inventado, silêncio longo), a frase é gerada de novo e fica a melhor tentativa.
Saída em <pasta>/voz/<motor>/: um WAV por cena e resumo.json com o tempo de cada frase,
que o vídeo usa para sincronizar as animações.
"""

import argparse
import difflib
import json
import os
import re
import sys
import time
import unicodedata
from pathlib import Path

import numpy as np
import soundfile as sf

TAXA = 24000
PAUSA_FRASE = 0.34
TENTATIVAS = 4
ACEITA = 0.9


def frases(texto):
    return [f.strip() for f in re.split(r"(?<=[.!?])\s+", texto) if f.strip()]


def falar(texto, pronuncia):
    for palavra, som in pronuncia.items():
        texto = re.sub(rf"\b{re.escape(palavra)}\b", som, texto)
    return texto


# O Whisper escreve números com algarismos; o roteiro, por extenso.
NUMEROS = {"1": "um", "2": "dois", "3": "tres", "4": "quatro", "5": "cinco", "10": "dez", "15": "quinze", "30": "trinta"}
ORDINAIS = {"1": "primeiro", "2": "segundo", "3": "terceiro"}


def normaliza(texto):
    texto = re.sub(r"\b(\d)\s*[ºo°]", lambda m: ORDINAIS.get(m.group(1), m.group(1)), texto.lower())
    texto = re.sub(r"\b\d+\b", lambda m: NUMEROS.get(m.group(0), m.group(0)), texto)
    texto = unicodedata.normalize("NFD", texto)
    texto = "".join(c for c in texto if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9 ]+", " ", texto).split()


def parecido(a, b):
    return difflib.SequenceMatcher(None, normaliza(a), normaliza(b)).ratio()


def apara(audio, limiar=0.012, folga=0.04):
    """Tira o silêncio do começo e do fim, deixando uma folga curta."""
    janela = int(TAXA * 0.01)
    if len(audio) < janela * 3:
        return audio
    blocos = np.abs(audio[: len(audio) // janela * janela]).reshape(-1, janela).max(axis=1)
    ativos = np.nonzero(blocos > limiar)[0]
    if len(ativos) == 0:
        return audio
    ini = max(0, ativos[0] * janela - int(folga * TAXA))
    fim = min(len(audio), (ativos[-1] + 1) * janela + int(folga * TAXA))
    return audio[ini:fim]


def reamostra(audio, de, para=TAXA):
    if de == para:
        return audio.astype(np.float32)
    import librosa

    return librosa.resample(audio.astype(np.float32), orig_sr=de, target_sr=para)


class Motor:
    estocastico = True
    voz = ""

    def gerar(self, texto, semente):
        raise NotImplementedError


class Xtts(Motor):
    def __init__(self, referencia=None):
        os.environ.setdefault("COQUI_TOS_AGREED", "1")
        import torch
        from TTS.api import TTS

        self.torch = torch
        self.tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2").to("cpu")
        self.referencia = referencia
        self.voz = f"clonada de {Path(referencia).name}" if referencia else "Ana Florence"

    def gerar(self, texto, semente):
        self.torch.manual_seed(semente)
        if self.referencia:
            wav = self.tts.tts(text=texto, speaker_wav=self.referencia, language="pt", split_sentences=False)
        else:
            wav = self.tts.tts(text=texto, speaker="Ana Florence", language="pt", split_sentences=False)
        return reamostra(np.asarray(wav, dtype=np.float32), 24000)


class Kokoro(Motor):
    estocastico = False
    voz = "pf_dora"

    def __init__(self):
        from kokoro import KPipeline

        self.pipe = KPipeline(lang_code="p")

    def gerar(self, texto, semente):
        partes = [np.asarray(r.audio, dtype=np.float32) for r in self.pipe(texto, voice="pf_dora", speed=0.98, split_pattern=None)]
        return reamostra(np.concatenate(partes), 24000)


class Chatterbox(Motor):
    def __init__(self, referencia=None):
        import torch
        from chatterbox.mtl_tts import ChatterboxMultilingualTTS

        self.torch = torch
        self.modelo = ChatterboxMultilingualTTS.from_pretrained(device="cpu")
        self.referencia = referencia
        if referencia:
            self.modelo.prepare_conditionals(referencia, exaggeration=0.45)
        self.voz = f"clonada de {Path(referencia).name}" if referencia else "voz padrão"

    def gerar(self, texto, semente):
        self.torch.manual_seed(semente)
        wav = self.modelo.generate(texto, language_id="pt", exaggeration=0.45, cfg_weight=0.3, temperature=0.7)
        return reamostra(wav.squeeze(0).cpu().numpy(), self.modelo.sr)


class Conferente:
    def __init__(self):
        from faster_whisper import WhisperModel

        self.modelo = WhisperModel("small", device="cpu", compute_type="int8")

    def ouvir(self, audio):
        import librosa

        a16 = librosa.resample(audio, orig_sr=TAXA, target_sr=16000)
        segs, _ = self.modelo.transcribe(a16, language="pt", beam_size=5, vad_filter=False)
        return " ".join(s.text.strip() for s in segs)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("pasta")
    ap.add_argument("--motor", required=True, choices=["xtts", "xtts-ref", "kokoro", "chatterbox"])
    ap.add_argument("--referencia")
    args = ap.parse_args()

    pasta = Path(args.pasta)
    roteiro = json.loads((pasta / "roteiro.json").read_text(encoding="utf-8"))
    pronuncia = roteiro.get("pronuncia", {})
    saida = pasta / "voz" / args.motor
    saida.mkdir(parents=True, exist_ok=True)

    if args.motor == "kokoro":
        motor = Kokoro()
    elif args.motor == "chatterbox":
        motor = Chatterbox(args.referencia)
    else:
        motor = Xtts(args.referencia if args.motor == "xtts-ref" else None)
    conferente = Conferente()

    resumo = {"motor": args.motor, "voz": motor.voz, "taxa": TAXA, "cenas": []}
    inicio_geral = time.time()
    for n, cena in enumerate(roteiro["cenas"], 1):
        pedacos, tempos, cursor = [], [], 0.0
        for i, frase in enumerate(frases(cena["texto"])):
            melhor = None
            for tentativa in range(TENTATIVAS if motor.estocastico else 1):
                semente = 1000 * n + 10 * i + tentativa
                try:
                    audio = apara(motor.gerar(falar(frase, pronuncia), semente))
                except Exception as erro:  # uma frase que falha não derruba as outras
                    print(f"  falhou ({erro})", file=sys.stderr)
                    continue
                ouvido = conferente.ouvir(audio)
                nota = parecido(frase, ouvido)
                letras = len(re.sub(r"\W", "", frase))
                ritmo = len(audio) / TAXA / max(letras, 1)
                if not 0.035 < ritmo < 0.12:  # rápido ou lento demais: trecho cortado ou silêncio inventado
                    nota -= 0.3
                print(f"[{cena['id']} {i + 1}.{tentativa + 1}] {nota:.2f} {len(audio) / TAXA:.1f}s | {ouvido}", flush=True)
                if melhor is None or nota > melhor[0]:
                    melhor = (nota, audio, ouvido, tentativa + 1)
                if nota >= ACEITA:
                    break
            if melhor is None:
                raise SystemExit(f"Nenhuma tentativa funcionou em {cena['id']}: {frase}")
            nota, audio, ouvido, usadas = melhor
            if pedacos:
                pedacos.append(np.zeros(int(PAUSA_FRASE * TAXA), dtype=np.float32))
                cursor += PAUSA_FRASE
            pedacos.append(audio)
            dur = len(audio) / TAXA
            tempos.append({"texto": frase, "inicio": round(cursor, 3), "fim": round(cursor + dur, 3), "nota": round(nota, 3), "ouvido": ouvido, "tentativas": usadas})
            cursor += dur

        audio = np.concatenate(pedacos)
        pico = float(np.max(np.abs(audio))) or 1.0
        audio = audio / pico * 0.89
        arquivo = f"cena-{n:02d}-{cena['id']}.wav"
        sf.write(saida / arquivo, audio, TAXA, subtype="PCM_16")
        resumo["cenas"].append({"id": cena["id"], "arquivo": arquivo, "duracao": round(len(audio) / TAXA, 3), "frases": tempos})
        print(f"== {arquivo}: {len(audio) / TAXA:.1f}s", flush=True)

    resumo["nota_media"] = round(float(np.mean([f["nota"] for c in resumo["cenas"] for f in c["frases"]])), 3)
    resumo["minutos_gerando"] = round((time.time() - inicio_geral) / 60, 1)
    (saida / "resumo.json").write_text(json.dumps(resumo, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Pronto: {saida} (nota média {resumo['nota_media']})")


if __name__ == "__main__":
    main()
