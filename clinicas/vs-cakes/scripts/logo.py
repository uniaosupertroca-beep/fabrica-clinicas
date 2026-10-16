"""Desenha os elementos de marca do site em vetor, a partir da fonte Fraunces (a mesma dos títulos):
as letras viram contornos, então ficam iguais no site, no favicon e na prévia de link.

Gera em public/:
  padrao-vs.svg   padrão "VS" repetido (fundo dos blocos em marinho e do rodapé)
  favicon.svg     "VS" em rosa sobre marinho
  monograma.svg   "VS" solto, para a prévia de link

Atenção: é um logotipo feito com a fonte do site, não o logo oficial da Vanessa. Quando ela mandar o
vetor do monograma e do selo, troque estes arquivos.

Uso: python3 scripts/logo.py  (precisa de fonttools e brotli)
"""
from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

RAIZ = Path(__file__).resolve().parent.parent
FONTE = RAIZ / "node_modules/@fontsource-variable/fraunces/files/fraunces-latin-full-italic.woff2"
fonte = instantiateVariableFont(TTFont(FONTE), {"wght": 820, "opsz": 144, "SOFT": 100, "WONK": 1})
gs = fonte.getGlyphSet()
cmap = fonte.getBestCmap()
UPM = fonte["head"].unitsPerEm


def contorno(texto, x, base, tamanho, espaco=0.0):
    """Caminho SVG do texto com a linha de base em `base`; devolve (caminho, largura)."""
    k = tamanho / UPM
    caneta = SVGPathPen(gs)
    cx = 0.0
    for ch in texto:
        g = gs[cmap[ord(ch)]]
        g.draw(TransformPen(caneta, (k, 0, 0, -k, x + cx * k, base)))
        cx += g.width + espaco
    return caneta.getCommands(), cx * k


def caixa(texto, tamanho):
    bp = BoundsPen(gs)
    cx = 0.0
    for ch in texto:
        g = gs[cmap[ord(ch)]]
        g.draw(TransformPen(bp, (1, 0, 0, 1, cx, 0)))
        cx += g.width
    x0, y0, x1, y1 = bp.bounds
    k = tamanho / UPM
    return x0 * k, y0 * k, x1 * k, y1 * k


MARINHO, ROSA, ROSA_SUAVE, CREME = "#223579", "#ed96c0", "#ecadbd", "#f4e1c1"
publico = RAIZ / "public"
publico.mkdir(exist_ok=True)

# Monograma centralizado numa caixa de 100 x 100.
t = 78
x0, y0, x1, y1 = caixa("VS", t)
largura, altura = x1 - x0, y1 - y0
caminho, _ = contorno("VS", 50 - largura / 2 - x0, 50 + altura / 2 + y0, t)

(publico / "monograma.svg").write_text(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="VS Cakes"><path d="{caminho}" fill="{ROSA}"/></svg>',
    encoding="utf-8",
)
(publico / "favicon.svg").write_text(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="24" fill="{MARINHO}"/>'
    f'<g transform="translate(50 50) scale(.72) translate(-50 -50)"><path d="{caminho}" fill="{ROSA}"/></g></svg>',
    encoding="utf-8",
)

# Padrão: "VS" em fileiras deslocadas, como tijolos, num bloco que se repete sem emenda.
LARG, ALT = 150, 100
tp = 54
px0, py0, px1, py1 = caixa("VS", tp)
pl, pa = px1 - px0, py1 - py0
fileiras = []
for linha, (cy, desloc) in enumerate(((ALT * 0.25, 0), (ALT * 0.75, LARG / 2))):
    for dx in (-LARG, 0, LARG):
        cx = LARG / 2 + desloc + dx
        c, _ = contorno("VS", cx - pl / 2 - px0, cy + pa / 2 + py0, tp)
        fileiras.append(c)
(publico / "padrao-vs.svg").write_text(
    f'<svg xmlns="http://www.w3.org/2000/svg" width="{LARG}" height="{ALT}" viewBox="0 0 {LARG} {ALT}"><path d="{"".join(fileiras)}" fill="{ROSA}"/></svg>',
    encoding="utf-8",
)
print("public/monograma.svg, favicon.svg, padrao-vs.svg")
