// Renderiza o vídeo quadro a quadro com o Playwright e monta o MP4 com o ffmpeg.
//
//   node renderizar.mjs --motor xtts --saida video.mp4            vídeo completo com a narração
//   node renderizar.mjs --previa 3,12.5,40 --pasta-previa /tmp/x  só alguns quadros, em PNG
//
// Sem --motor (ou sem a narração gerada), usa tempos estimados pelo tamanho do texto.
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { linhaDoTempo } from "./linha.mjs";

const PLAYWRIGHT = process.env.PLAYWRIGHT_MODULE || "/opt/node-tools/node_modules/playwright/index.mjs";
const { chromium } = await import(PLAYWRIGHT);

const pasta = dirname(fileURLToPath(import.meta.url));
const arg = (nome, padrao) => {
  const i = process.argv.indexOf(`--${nome}`);
  return i > 0 ? process.argv[i + 1] : padrao;
};
const motor = arg("motor");
const fps = Number(arg("fps", 30));
const partes = Number(arg("partes", 4));
const saida = arg("saida", join(pasta, "video.mp4"));
const previa = arg("previa");
const ate = arg("ate") ? Number(arg("ate")) : null;
const temp = arg("temp", join(pasta, ".render"));

const linha = linhaDoTempo(pasta, motor);
writeFileSync(join(pasta, "linha.json"), JSON.stringify(linha, null, 2));
console.log(`Duração: ${linha.duracao.toFixed(1)} s, narração: ${linha.motor ?? "estimada"}`);

const navegador = await chromium.launch({ args: ["--disable-gpu", "--font-render-hinting=none"] });

async function abrir() {
  const pagina = await navegador.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  pagina.on("pageerror", (e) => console.error("Erro na página:", e.message));
  pagina.on("console", (m) => m.type() === "warning" && console.warn(m.text()));
  await pagina.goto(pathToFileURL(join(pasta, "cenas.html")).href, { waitUntil: "load" });
  await pagina.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(["Cormorant Garamond", "Jost", "Raleway", "Marcellus", "Figtree"].map((f) => document.fonts.load(`400 20px "${f}"`)));
  });
  await pagina.evaluate((l) => window.montarCenas(l), linha);
  await pagina.evaluate(async () => {
    const imgs = [...document.images];
    await Promise.all(imgs.map((i) => (i.complete ? null : new Promise((r) => (i.onload = i.onerror = r)))));
  });
  return pagina;
}

if (previa) {
  const destino = arg("pasta-previa", join(pasta, ".previa"));
  mkdirSync(destino, { recursive: true });
  const pagina = await abrir();
  for (const t of previa.split(",").map(Number)) {
    await pagina.evaluate((t) => window.quadro(t), t);
    const nome = join(destino, `quadro-${t.toFixed(2).padStart(7, "0")}.png`);
    await pagina.screenshot({ path: nome });
    console.log(nome);
  }
  await navegador.close();
  process.exit(0);
}

// Vídeo: cada parte renderiza um trecho contínuo em paralelo, direto para o ffmpeg.
const total = Math.ceil((ate ?? linha.duracao) * fps);
rmSync(temp, { recursive: true, force: true });
mkdirSync(temp, { recursive: true });
const porParte = Math.ceil(total / partes);
const inicio = Date.now();

async function renderizarParte(p) {
  const de = p * porParte, ateQ = Math.min(total, de + porParte);
  if (de >= ateQ) return null;
  const arquivo = join(temp, `parte-${p}.mp4`);
  const ff = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(fps), "-c:v", "mjpeg", "-i", "-",
    "-c:v", "libx264", "-preset", "medium", "-crf", "17", "-pix_fmt", "yuv420p", "-r", String(fps), arquivo], { stdio: ["pipe", "inherit", "inherit"] });
  const pagina = await abrir();
  for (let q = de; q < ateQ; q++) {
    await pagina.evaluate((t) => window.quadro(t), q / fps);
    const img = await pagina.screenshot({ type: "jpeg", quality: 93 });
    if (!ff.stdin.write(img)) await new Promise((r) => ff.stdin.once("drain", r));
    if (p === 0 && q % (fps * 5) === 0) console.log(`  parte 0: ${(((q - de) / (ateQ - de)) * 100).toFixed(0)}% (${((Date.now() - inicio) / 1000).toFixed(0)} s)`);
  }
  ff.stdin.end();
  await new Promise((r, e) => ff.on("close", (c) => (c === 0 ? r() : e(new Error(`ffmpeg saiu com ${c}`)))));
  await pagina.close();
  return arquivo;
}

const arquivos = (await Promise.all([...Array(partes).keys()].map(renderizarParte))).filter(Boolean);
await navegador.close();
writeFileSync(join(temp, "partes.txt"), arquivos.map((a) => `file '${a}'`).join("\n"));
console.log(`Quadros prontos em ${((Date.now() - inicio) / 1000).toFixed(0)} s`);

const audio = arg("audio");
const entrada = ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", join(temp, "partes.txt")];
const comando = audio
  ? [...entrada, "-i", audio, "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", saida]
  : [...entrada, "-c", "copy", "-movflags", "+faststart", saida];
await new Promise((r, e) => spawn("ffmpeg", comando, { stdio: "inherit" }).on("close", (c) => (c === 0 ? r() : e(new Error(`ffmpeg ${c}`)))));
console.log(`Vídeo: ${saida}`);
