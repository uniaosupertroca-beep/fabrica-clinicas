// Site estático: o Astro gera HTML e CSS puros (sem JavaScript no navegador) em dist/,
// publicado no Cloudflare Pages. O endereço oficial fica em src/data/clinica.ts.
import { defineConfig } from "astro/config";
import { clinica } from "./src/data/clinica.ts";

export default defineConfig({
  site: clinica.endereco,
  trailingSlash: "ignore",
  build: { format: "directory", inlineStylesheets: "always" },
  compressHTML: true,
  devToolbar: { enabled: false },
});
