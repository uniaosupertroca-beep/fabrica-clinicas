// Gera apresentacao.pdf a partir de deck.html e salva uma prévia PNG de cada página.
import { fileURLToPath } from "node:url";
import { chromium } from "/opt/node-tools/node_modules/playwright/index.mjs";

const pasta = new URL("./", import.meta.url);
const navegador = await chromium.launch();
const pagina = await navegador.newPage({ viewport: { width: 1280, height: 720 } });
await pagina.goto(new URL("deck.html", pasta).href, { waitUntil: "load" });
await pagina.evaluate(() => document.fonts.ready);
await pagina.pdf({ path: fileURLToPath(new URL(process.argv[2] ?? "apresentacao.pdf", pasta)), width: "1280px", height: "720px", printBackground: true, preferCSSPageSize: true });
const total = await pagina.locator(".slide").count();
console.log("páginas:", total);
await navegador.close();
