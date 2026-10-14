// Conferência depois do build (roda em `npm run build` e no GitHub antes de publicar).
// Barra a publicação se o site tiver JavaScript, link interno quebrado, link externo sem proteção
// ou frase proibida na publicidade de procedimento estético. Também lista o que a clínica ainda não mandou.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { pendencias } from "../src/data/clinica.ts";

const dist = new URL("../dist/", import.meta.url).pathname;
const paginas = readdirSync(dist, { recursive: true })
  .filter((f) => String(f).endsWith(".html"))
  .map((f) => ({ arquivo: String(f), html: readFileSync(join(dist, String(f)), "utf8") }));

// Promessa de resultado, preço, desconto, urgência falsa e "risco zero": proibidos pelo Código de Defesa
// do Consumidor (art. 37) e pelas regras de publicidade dos conselhos de saúde.
const PROIBIDAS = [
  [/\b\d+(?:[.,]\d+)?\s?cm\b/i, "medida em centímetros (promessa de resultado)"],
  [/R\$\s?\d/, "preço"],
  [/\d+\s?%\s*(?:de\s+)?(?:desconto|off)/i, "desconto"],
  [/100\s?%/, "100% (garantia absoluta)"],
  [/sem\s+riscos?|risco\s+(?:algum|zero)|nenhum\s+risco/i, "promessa de risco zero"],
  [/resultado\s+garantido|garantimos/i, "resultado garantido"],
  [/v[aá]lid[oa]\s+por\s+(?:somente|apenas)|o\s+tempo\s+est[aá]\s+acabando|vagas\s+limitadas|[uú]ltimas\s+vagas/i, "urgência falsa"],
  [/resultado\s+natural|resultados?\s+imediatos?|sem\s+dor\b|indolor/i, "promessa de resultado ou de ausência de dor"],
  [/elimin\w*\s+(?:as\s+)?rugas|zero\s+cicatriz|resultados?\s+duradouros?/i, "promessa de resultado"],
  [/\ba\s+melhor\s+cl[ií]nica|\bn[uú]mero\s+1\b/i, "superlativo sem comprovação"],
  // "Lipo" lembra lipoaspiração, que é cirurgia e é feita por médico.
  [/\blipo\b|lipoaspira/i, "termo \"lipo\" (sugere lipoaspiração)"],
  // Marcas de aparelhos e produtos ficam fora da publicidade.
  [/\b(?:tesla|emsculpt|exilis|jordi|jordy|ultraformer|morpheus|sculptra|radiesse|restylane|juv[eé]derm|dysport|xeomin|coolsculpting|botox)\b/i, "marca de aparelho ou produto"],
  // Promessas que a ciência não sustenta e termos de cirurgia.
  [/c[eé]lulas?[\s-]+tronco/i, "\"células-tronco\" (sem tratamento estético aprovado)"],
  [/gluteoplastia|ninfoplastia/i, "termo de cirurgia plástica"],
  // Sobra dos modelos usados como base (outras clínicas da fábrica).
  [/essenciale|rinascere|cl[aá]udia\s+braga|pele\s+de\s+rainha|bumbum\s+das\s+estrelas/i, "texto que sobrou do modelo de outro site"],
];

const erros = [];
const texto = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ");

for (const { arquivo, html } of paginas) {
  for (const m of html.matchAll(/<script\b([^>]*)>/g)) {
    if (!/type="application\/ld\+json"/.test(m[1])) erros.push(`${arquivo}: tem JavaScript (<script${m[1]}>); o site deve sair sem JS`);
  }

  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  for (const m of html.matchAll(/\shref="#([^"]*)"/g)) {
    if (m[1] && !ids.has(m[1])) erros.push(`${arquivo}: link para #${m[1]}, que não existe na página`);
  }
  for (const m of html.matchAll(/\shref="\/([^"#]*)(?:#([^"]*))?"/g)) {
    const caminho = m[1].replace(/\/$/, "");
    if (caminho.startsWith("_astro/") || /\.(?:svg|png|xml|txt)$/.test(caminho)) continue;
    const alvo = caminho === "" ? "index.html" : `${caminho}/index.html`;
    const pagina = paginas.find((p) => p.arquivo === alvo);
    if (!pagina) erros.push(`${arquivo}: link para /${m[1]}, que não existe no site`);
    else if (m[2] && !pagina.html.includes(`id="${m[2]}"`)) erros.push(`${arquivo}: link para /${caminho}#${m[2]}, âncora inexistente`);
  }

  for (const m of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
    if (!/rel="[^"]*noopener/.test(m[0])) erros.push(`${arquivo}: link que abre nova aba sem rel="noopener": ${m[0]}`);
  }

  const corpo = texto(html);
  for (const [regra, motivo] of PROIBIDAS) {
    const achou = corpo.match(regra);
    if (achou) erros.push(`${arquivo}: "${achou[0]}" (${motivo})`);
  }
}

if (erros.length) {
  console.error(`\nConferência do site: ${erros.length} problema(s)\n- ${erros.join("\n- ")}\n`);
  process.exit(1);
}

console.log(`\nConferência do site: ok (${paginas.length} páginas, sem JavaScript, links e textos conferidos).`);
const falta = pendencias();
if (falta.length) {
  console.log(`\nA clínica ainda precisa mandar (o site mostra esses espaços marcados):\n- ${falta.join("\n- ")}\n`);
}
