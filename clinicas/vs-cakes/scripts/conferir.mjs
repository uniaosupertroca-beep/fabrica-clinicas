// Conferência depois do build (roda em `npm run build` e no GitHub antes de publicar).
// Barra a publicação se o site tiver script de fora, link quebrado, imagem sem texto alternativo,
// WhatsApp trocado, preço escondido que apareceu, texto que sobrou de outro site ou página sem o básico de SEO.
// Também lista o que a Vanessa ainda precisa mandar.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { negocio, pendencias } from "../src/data/site.ts";

const dist = new URL("../dist/", import.meta.url).pathname;
const paginas = readdirSync(dist, { recursive: true })
  .filter((f) => String(f).endsWith(".html"))
  .map((f) => ({ arquivo: String(f), html: readFileSync(join(dist, String(f)), "utf8") }));

// Sobra de outros sites da fábrica e marcas de espaço reservado.
const SOBRAS = /essenciale|rinascere|nanda|prevedello|cl[aá]udia\s+braga|pele\s+de\s+rainha|bumbum\s+das\s+estrelas|lorem|a\s+preencher|undefined|\[object/i;
// Anotações de trabalho esquecidas (maiúsculas: "todo" em português é uma palavra comum).
const ANOTACOES = /\b(?:TODO|FIXME|XXX)\b/;
// Promessas que a VS Cakes não faz no cardápio dela.
const PROMESSAS = /melhor\s+(?:bolo|confeitaria)\s+de|n[uú]mero\s+1|garantimos|100\s?%\s*(?:natural|artesanal|saud)/i;

const erros = [];
const texto = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/g, (m) => m)
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ");

for (const { arquivo, html } of paginas) {
  // Scripts: só os do próprio site (/_astro/...) e os dados estruturados. Nada embutido na página (a CSP bloqueia).
  for (const m of html.matchAll(/<script\b([^>]*)>/g)) {
    const attrs = m[1];
    const ldjson = /type="application\/ld\+json"/.test(attrs);
    const proprio = /\ssrc="\/_astro\/[^"]+\.js"/.test(attrs);
    if (!ldjson && !proprio) erros.push(`${arquivo}: script não permitido (<script${attrs}>). Use só arquivos de /_astro/`);
  }

  // Nada carregado de fora (a CSP só deixa o próprio site).
  for (const m of html.matchAll(/<(?:img|link|script|source|iframe)\b[^>]*\s(?:src|href)="(https?:)?\/\/[^"]+"/g)) {
    if (/<a\b/.test(m[0])) continue;
    if (/<link\b[^>]*rel="(?:canonical|alternate)"/.test(m[0])) continue;
    erros.push(`${arquivo}: recurso externo carregado: ${m[0].slice(0, 120)}`);
  }

  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  for (const m of html.matchAll(/\shref="#([^"]*)"/g)) {
    if (m[1] && !ids.has(m[1])) erros.push(`${arquivo}: link para #${m[1]}, que não existe na página`);
  }
  for (const m of html.matchAll(/\shref="\/([^"#?]*)(?:\?[^"#]*)?(?:#([^"]*))?"/g)) {
    const caminho = m[1].replace(/\/$/, "");
    if (caminho.startsWith("_astro/") || /\.(?:svg|png|xml|txt|ico)$/.test(caminho)) continue;
    const alvo = caminho === "" ? "index.html" : `${caminho}/index.html`;
    const pagina = paginas.find((p) => p.arquivo === alvo);
    if (!pagina) erros.push(`${arquivo}: link para /${m[1]}, que não existe no site`);
    else if (m[2] && !pagina.html.includes(`id="${m[2]}"`)) erros.push(`${arquivo}: link para /${caminho}#${m[2]}, âncora inexistente`);
  }

  for (const m of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
    if (!/rel="[^"]*noopener/.test(m[0])) erros.push(`${arquivo}: link que abre nova aba sem rel="noopener": ${m[0]}`);
  }

  // WhatsApp: sempre o número da Vanessa.
  for (const m of html.matchAll(/https?:\/\/(?:wa\.me|api\.whatsapp\.com)\/([^"?&<\s]*)/g)) {
    if (m[1].replace(/\D/g, "") !== negocio.whatsapp) erros.push(`${arquivo}: WhatsApp com número diferente do cadastrado: ${m[0]}`);
  }

  // Imagens: texto alternativo e tamanho (evita a página pular enquanto carrega).
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt(?:=|\s|>|\/)/.test(m[0])) erros.push(`${arquivo}: imagem sem alt: ${m[0].slice(0, 100)}`);
    if (!/\swidth="\d+"/.test(m[0]) || !/\sheight="\d+"/.test(m[0])) erros.push(`${arquivo}: imagem sem width/height: ${m[0].slice(0, 100)}`);
  }

  // O básico de cada página.
  if (!/<html lang="pt-BR"/.test(html)) erros.push(`${arquivo}: falta lang="pt-BR"`);
  if (!/<title>[^<]{8,}<\/title>/.test(html)) erros.push(`${arquivo}: falta o título`);
  if (!/<meta name="description" content="[^"]{40,}"/.test(html)) erros.push(`${arquivo}: falta a descrição (40+ caracteres)`);
  const h1 = (html.match(/<h1\b/g) ?? []).length;
  if (h1 !== 1) erros.push(`${arquivo}: deve ter exatamente um h1 (tem ${h1})`);
  const noindex = /<meta name="robots" content="noindex/.test(html);
  if (!negocio.indexavel && !noindex) erros.push(`${arquivo}: site em demonstração (indexavel = false) mas a página não tem noindex`);
  if (negocio.indexavel && !noindex && !/<link rel="canonical"/.test(html)) erros.push(`${arquivo}: falta o link canônico`);

  const corpo = texto(html);
  const sobra = corpo.match(SOBRAS) ?? corpo.match(ANOTACOES);
  if (sobra) erros.push(`${arquivo}: "${sobra[0]}" (texto que sobrou de outro site ou espaço reservado)`);
  const promessa = corpo.match(PROMESSAS);
  if (promessa) erros.push(`${arquivo}: "${promessa[0]}" (promessa que o cardápio não faz)`);
  if (!negocio.mostrarPrecos) {
    const preco = corpo.match(/R\$\s?\d/);
    if (preco) erros.push(`${arquivo}: "${preco[0]}" (preço com mostrarPrecos = false)`);
  }
}

const robots = readFileSync(join(dist, "robots.txt"), "utf8");
if (!negocio.indexavel && !/Disallow:\s*\//.test(robots)) erros.push("robots.txt deve bloquear tudo enquanto indexavel = false");
if (negocio.indexavel && /Disallow:\s*\/\s*$/m.test(robots)) erros.push("robots.txt bloqueia o site, mas indexavel = true");

if (erros.length) {
  console.error(`\nConferência do site: ${erros.length} problema(s)\n- ${erros.join("\n- ")}\n`);
  process.exit(1);
}

console.log(`\nConferência do site: ok (${paginas.length} páginas: links, imagens, WhatsApp, SEO e textos conferidos).`);
console.log(negocio.indexavel ? "O site está aberto para o Google." : "Site em demonstração: fora do Google (noindex) até a Vanessa aprovar.");
const falta = pendencias();
if (falta.length) console.log(`\nA Vanessa ainda precisa mandar:\n- ${falta.join("\n- ")}\n`);
