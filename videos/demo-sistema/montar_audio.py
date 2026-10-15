"""Monta a trilha do vídeo: a narração de cada cena no tempo certo e, por baixo, um fundo musical suave
(acordes sintetizados aqui mesmo, sem música de terceiros), que abaixa sozinho quando a voz fala.

Uso: python3 montar_audio.py linha.json trilha.wav [--sem-fundo]
"""

import json
import sys

import numpy as np
import soundfile as sf
from scipy.signal import butter, fftconvolve, resample_poly, sosfilt

TAXA = 48000
linha = json.load(open(sys.argv[1], encoding="utf-8"))
saida = sys.argv[2]
com_fundo = "--sem-fundo" not in sys.argv
N = int(linha["duracao"] * TAXA)
rng = np.random.default_rng(7)


def db(x):
    return 10 ** (x / 20)


# Narração ------------------------------------------------------------------
voz = np.zeros(N)
for cena in linha["cenas"]:
    audio, taxa = sf.read(cena["arquivo"], dtype="float64")
    if audio.ndim > 1:
        audio = audio.mean(axis=1)
    audio = resample_poly(audio, TAXA, taxa)
    i = int(round(cena["fala"] * TAXA))
    trecho = audio[: max(0, N - i)]
    voz[i : i + len(trecho)] += trecho

voz = sosfilt(butter(2, 70, "highpass", fs=TAXA, output="sos"), voz)
# Nível da fala: RMS de -20 dBFS nos trechos com voz.
janela = int(0.05 * TAXA)
blocos = voz[: len(voz) // janela * janela].reshape(-1, janela)
rms = np.sqrt((blocos**2).mean(axis=1))
ativos = rms[rms > rms.max() * 0.05]
voz *= db(-20) / np.sqrt((ativos**2).mean())

# Fundo musical -------------------------------------------------------------
fundo = np.zeros((N, 2))
if com_fundo:
    t = np.arange(N) / TAXA
    nota = lambda m: 440 * 2 ** ((m - 69) / 12)
    acordes = [  # Ré maior, voz grave e aberta: Dmaj9, Bm9, Gmaj7(9), A6/9 com a terça suspensa
        [50, 57, 61, 64, 66],
        [47, 54, 57, 61, 62],
        [43, 50, 54, 59, 62],
        [45, 52, 54, 59, 61],
    ]
    DUR, CRUZA = 8.0, 3.0
    k = 0
    inicio = 0.0
    while inicio < linha["duracao"]:
        notas = acordes[k % len(acordes)]
        env = np.zeros(N)
        a, b = inicio - CRUZA / 2, inicio + DUR + CRUZA / 2
        dentro = (t >= a) & (t <= b)
        x = (t[dentro] - a) / (b - a)
        # sobe e desce em cosseno, para os acordes se fundirem sem degrau
        env[dentro] = np.minimum(1, np.minimum(x, 1 - x) * (b - a) / CRUZA)
        env[dentro] = 0.5 - 0.5 * np.cos(np.pi * env[dentro])
        idx = np.nonzero(dentro)[0]
        for j, m in enumerate(notas):
            f = nota(m)
            amp = 0.9 if j == 0 else 0.55
            trem = 1 + 0.12 * np.sin(2 * np.pi * (0.07 + 0.03 * j) * t[idx] + j)
            for canal, cents in ((0, -4), (1, 4)):
                fc = f * 2 ** (cents / 1200)
                fase = rng.uniform(0, 2 * np.pi)
                onda = np.sin(2 * np.pi * fc * t[idx] + fase) + 0.22 * np.sin(4 * np.pi * fc * t[idx] + fase) + 0.06 * np.sin(6 * np.pi * fc * t[idx])
                fundo[idx, canal] += amp * trem * env[idx] * onda
        inicio += DUR
        k += 1
    fundo = sosfilt(butter(2, 1600, "lowpass", fs=TAXA, output="sos"), fundo, axis=0)
    # Sala: reverberação curta feita com ruído decaindo.
    rt = np.arange(int(2.4 * TAXA)) / TAXA
    for canal in range(2):
        ir = rng.standard_normal(len(rt)) * np.exp(-rt * 2.6)
        ir = sosfilt(butter(1, 2500, "lowpass", fs=TAXA, output="sos"), ir)
        ir /= np.sqrt((ir**2).sum())
        fundo[:, canal] = 0.65 * fundo[:, canal] + 0.6 * fftconvolve(fundo[:, canal], ir)[:N]
    fundo *= db(-33) / np.sqrt((fundo**2).mean())
    # Abaixa o fundo quando há fala (6 dB), com ataque e soltura suaves.
    ativo = np.repeat(rms > rms.max() * 0.05, janela).astype(float)
    ativo = np.pad(ativo, (0, N - len(ativo)))
    suave = np.zeros(N)
    nivel = 0.0
    sobe, desce = 1 - np.exp(-1 / (0.12 * TAXA)), 1 - np.exp(-1 / (0.7 * TAXA))
    for i0 in range(0, N, 480):  # envelope calculado a cada 10 ms
        alvo = ativo[i0]
        nivel += (alvo - nivel) * (1 - (1 - (sobe if alvo > nivel else desce)) ** 480)
        suave[i0 : i0 + 480] = nivel
    fundo *= (1 - 0.5 * suave)[:, None]
    entra, sai = int(2.0 * TAXA), int(3.5 * TAXA)
    fundo[:entra] *= np.linspace(0, 1, entra)[:, None]
    fundo[-sai:] *= np.linspace(1, 0, sai)[:, None]

mix = fundo + voz[:, None]
pico = np.abs(mix).max()
if pico > db(-1):
    mix *= db(-1) / pico
sf.write(saida, mix.astype(np.float32), TAXA, subtype="PCM_24")
print(f"Trilha: {saida} ({N / TAXA:.1f} s, pico {20 * np.log10(np.abs(mix).max()):.1f} dBFS)")
