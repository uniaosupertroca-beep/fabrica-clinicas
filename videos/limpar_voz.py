"""Limpa a narração gerada: corta respiros e estalos soltos no fim (ou no começo) de cada frase,
depois de um silêncio longo, e encurta pausas internas exageradas. Regrava os WAVs e o resumo.json
com os novos tempos de cada frase.

Uso: python3 videos/limpar_voz.py videos/demo-sistema/voz/chatterbox
"""

import json
import sys
from pathlib import Path

import numpy as np
import soundfile as sf

PAUSA_FRASE = 0.34
JANELA = 0.02
LIMIAR = 0.01


def trechos_de_som(audio, taxa):
    j = int(taxa * JANELA)
    blocos = np.abs(audio[: len(audio) // j * j]).reshape(-1, j).max(axis=1) >= LIMIAR
    trechos, i = [], 0
    while i < len(blocos):
        if blocos[i]:
            k = i
            while k < len(blocos) and blocos[k]:
                k += 1
            if trechos and (i * j - trechos[-1][1]) / taxa < 0.12:
                trechos[-1][1] = k * j  # respiro curto dentro da mesma palavra: junta
            else:
                trechos.append([i * j, k * j])
            i = k
        else:
            i += 1
    return trechos


def limpa(audio, taxa):
    trechos = trechos_de_som(audio, taxa)
    if not trechos:
        return audio, []
    mudancas = []
    estalo = lambda t: (t[1] - t[0]) / taxa < 0.1 and np.abs(audio[t[0] : t[1]]).max() < 0.1
    # Ruído solto no fim: pedaço curto (< 0,4 s) depois de um silêncio de 0,4 s ou mais, ou um estalo fraco.
    while len(trechos) > 1:
        ultimo, antes = trechos[-1], trechos[-2]
        if (ultimo[1] - ultimo[0]) / taxa < 0.4 and ((ultimo[0] - antes[1]) / taxa >= 0.4 or estalo(ultimo)):
            mudancas.append(f"fim {(ultimo[1] - ultimo[0]) / taxa:.2f}s")
            trechos.pop()
        else:
            break
    while len(trechos) > 1:
        primeiro, depois = trechos[0], trechos[1]
        if (primeiro[1] - primeiro[0]) / taxa < 0.25 and ((depois[0] - primeiro[1]) / taxa >= 0.4 or estalo(primeiro)):
            mudancas.append(f"começo {(primeiro[1] - primeiro[0]) / taxa:.2f}s")
            trechos.pop(0)
        else:
            break
    folga = int(0.04 * taxa)
    ini, fim = max(0, trechos[0][0] - folga), min(len(audio), trechos[-1][1] + folga)
    # Pausas internas de mais de 0,6 s viram 0,45 s.
    partes, cursor = [], ini
    for a, b in zip(trechos, trechos[1:]):
        vazio = (b[0] - a[1]) / taxa
        if vazio > 0.6:
            corte_ini = a[1] + int(0.225 * taxa)
            corte_fim = b[0] - int(0.225 * taxa)
            partes.append(audio[cursor:corte_ini])
            cursor = corte_fim
            mudancas.append(f"pausa {vazio:.2f}s")
    partes.append(audio[cursor:fim])
    saida = np.concatenate(partes)
    # Emendas sem estalo: rampas curtas nas bordas.
    r = int(0.01 * taxa)
    saida[:r] *= np.linspace(0, 1, r)
    saida[-r:] *= np.linspace(1, 0, r)
    return saida, mudancas


def main():
    pasta = Path(sys.argv[1])
    resumo = json.loads((pasta / "resumo.json").read_text(encoding="utf-8"))
    for cena in resumo["cenas"]:
        audio, taxa = sf.read(pasta / cena["arquivo"], dtype="float32")
        pedacos, cursor = [], 0.0
        for n, f in enumerate(cena["frases"]):
            trecho = audio[int(f["inicio"] * taxa) : int(f["fim"] * taxa)]
            limpo, mudancas = limpa(trecho, taxa)
            if mudancas:
                print(f"{cena['id']} {n + 1}: {', '.join(mudancas)}")
            if pedacos:
                pedacos.append(np.zeros(int(PAUSA_FRASE * taxa), dtype=np.float32))
                cursor += PAUSA_FRASE
            pedacos.append(limpo)
            dur = len(limpo) / taxa
            f["inicio"], f["fim"] = round(cursor, 3), round(cursor + dur, 3)
            cursor += dur
        novo = np.concatenate(pedacos)
        sf.write(pasta / cena["arquivo"], novo, taxa, subtype="PCM_16")
        cena["duracao"] = round(len(novo) / taxa, 3)
    resumo["limpo"] = True
    (pasta / "resumo.json").write_text(json.dumps(resumo, ensure_ascii=False, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
