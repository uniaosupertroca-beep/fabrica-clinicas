import type { APIRoute } from "astro";
import { tratamentos } from "../data/tratamentos.ts";

const paginas = ["/", "/tratamentos/", ...tratamentos.map((t) => `/tratamentos/${t.slug}/`), "/privacidade/"];

export const GET: APIRoute = ({ site }) => {
  const urls = paginas.map((p) => `<url><loc>${new URL(p, site).href}</loc></url>`).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
