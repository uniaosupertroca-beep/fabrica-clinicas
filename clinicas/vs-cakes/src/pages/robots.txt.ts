import type { APIRoute } from "astro";
import { negocio } from "../data/site.ts";

// Enquanto a Vanessa não aprovar (negocio.indexavel = false), o site pede para ficar fora do Google.
export const GET: APIRoute = ({ site }) =>
  new Response(
    negocio.indexavel
      ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap.xml", site).href}\n`
      : `User-agent: *\nDisallow: /\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
