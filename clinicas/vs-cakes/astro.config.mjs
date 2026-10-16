// Site estático: o Astro gera HTML e CSS e um único script pequeno (o "Monte seu pedido") em dist/,
// publicado no Cloudflare Pages. O endereço oficial fica em src/data/site.ts.
import { defineConfig } from "astro/config";
import { negocio } from "./src/data/site.ts";

export default defineConfig({
  site: negocio.endereco,
  trailingSlash: "ignore",
  build: { format: "directory", inlineStylesheets: "always" },
  compressHTML: true,
  devToolbar: { enabled: false },
  // Nenhum script embutido na página: a política de segurança (CSP) só aceita arquivos do próprio site.
  vite: { build: { assetsInlineLimit: 0 } },
});
