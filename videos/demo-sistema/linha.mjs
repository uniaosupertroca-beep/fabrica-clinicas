// Linha do tempo do vídeo: quando cada cena começa e quando cada frase é dita.
// Usa os tempos reais da narração (voz/<motor>/resumo.json) ou, sem ela, uma estimativa pelo tamanho do texto.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

export const ENTRADA = 0.55; // respiro entre a cena aparecer e a fala começar
export const SAIDA = 0.85; // respiro depois da última frase
export const DISSOLVE = 0.6;

export function linhaDoTempo(pasta, motor) {
  const roteiro = JSON.parse(readFileSync(join(pasta, "roteiro.json"), "utf8"));
  const arquivo = motor && join(pasta, "voz", motor, "resumo.json");
  const resumo = arquivo && existsSync(arquivo) ? JSON.parse(readFileSync(arquivo, "utf8")) : null;
  const cenas = [];
  let t = 1.0;
  roteiro.cenas.forEach((c, n) => {
    const r = resumo?.cenas.find((x) => x.id === c.id);
    let frases;
    if (r) frases = r.frases.map((f) => ({ texto: f.texto, inicio: f.inicio, fim: f.fim }));
    else {
      let cur = 0;
      frases = c.texto.split(/(?<=[.!?])\s+/).map((texto) => {
        const d = texto.replace(/\W/g, "").length * 0.068;
        const fr = { texto, inicio: cur, fim: cur + d };
        cur += d + 0.34;
        return fr;
      });
    }
    const dur = r ? r.duracao : frases.at(-1).fim;
    const ini = t;
    const fala = ini + (n === 0 ? 0.9 : ENTRADA);
    const ultima = n === roteiro.cenas.length - 1;
    const fim = fala + dur + (ultima ? 3.2 : SAIDA);
    cenas.push({
      id: c.id, ini, fala, fim, arquivo: r ? join(pasta, "voz", motor, r.arquivo) : null,
      frases: frases.map((f) => ({ texto: f.texto, ini: +(fala + f.inicio).toFixed(3), fim: +(fala + f.fim).toFixed(3) })),
    });
    t = fim + DISSOLVE;
  });
  const duracao = cenas.at(-1).fim + 0.4;
  return { duracao: +duracao.toFixed(3), motor: resumo ? motor : null, cenas };
}
