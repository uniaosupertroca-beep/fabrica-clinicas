"""Compara as narrações geradas e escolhe a mais natural.

Uso: python videos/avaliar_voz.py videos/demo-sistema

Para cada motor em <pasta>/voz/, mede a naturalidade com o UTMOS (nota de 1 a 5 que imita a avaliação
de ouvintes) e usa a nota do Whisper (o quanto a fala bate com o roteiro) como filtro.
Grava <pasta>/voz/avaliacao.json com o ranking e o motor escolhido.
"""

import json
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
import torch

pasta = Path(sys.argv[1]) / "voz"
# skip_validation evita a consulta à API do GitHub, que tem limite de acessos sem login.
preditor = torch.hub.load("tarepan/SpeechMOS:v1.2.0", "utmos22_strong", trust_repo=True, skip_validation=True)

ranking = []
for resumo_path in sorted(pasta.glob("*/resumo.json")):
    resumo = json.loads(resumo_path.read_text(encoding="utf-8"))
    notas = []
    for cena in resumo["cenas"]:
        audio, taxa = sf.read(resumo_path.parent / cena["arquivo"], dtype="float32")
        # o UTMOS foi treinado com trechos curtos: avalia em janelas de até 10 s
        passo = taxa * 10
        for ini in range(0, len(audio), passo):
            trecho = audio[ini : ini + passo]
            if len(trecho) < taxa * 2:
                continue
            with torch.no_grad():
                notas.append(float(preditor(torch.from_numpy(trecho).unsqueeze(0), taxa)))
    item = {
        "motor": resumo["motor"],
        "voz": resumo["voz"],
        "naturalidade": round(float(np.mean(notas)), 3),
        "fidelidade": resumo["nota_media"],
        "duracao": round(sum(c["duracao"] for c in resumo["cenas"]), 1),
        "frases_fracas": [f["texto"] for c in resumo["cenas"] for f in c["frases"] if f["nota"] < 0.8],
    }
    ranking.append(item)
    print(item, flush=True)

validos = [r for r in ranking if r["fidelidade"] >= 0.85] or ranking
escolhido = max(validos, key=lambda r: r["naturalidade"])
saida = {"escolhido": escolhido["motor"], "ranking": sorted(ranking, key=lambda r: -r["naturalidade"])}
(pasta / "avaliacao.json").write_text(json.dumps(saida, ensure_ascii=False, indent=2), encoding="utf-8")
print("Escolhido:", escolhido["motor"])
