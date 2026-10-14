"""Desenha o logo da Dra. Nanda Prevedello em vetor, a partir do logo do site atual:
o monograma NP dourado num escudo de topo em arco, o nome em Marcellus e "ESTÉTICA AVANÇADA".

As letras viram contornos (sem depender de fonte instalada), então o SVG fica igual no site,
no favicon e no PDF da apresentação. Gera em public/:
  logo-nanda.svg            vertical, ouro claro, para fundo escuro
  logo-nanda-escuro.svg     vertical, ouro escuro, para fundo claro
  logo-nanda-linha.svg      horizontal (escudo + nome), ouro claro
  logo-nanda-linha-escuro.svg  horizontal, ouro escuro
  monograma.svg             só o escudo com NP (favicon e ícone do app)

Uso: python3 scripts/logo.py  (precisa de fonttools e brotli)
"""
from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

RAIZ = Path(__file__).resolve().parent.parent
MARCELLUS = RAIZ / "node_modules/@fontsource/marcellus/files/marcellus-latin-400-normal.woff2"
FIGTREE = RAIZ / "node_modules/@fontsource-variable/figtree/files/figtree-latin-wght-normal.woff2"

serifa = TTFont(MARCELLUS)
sans = instantiateVariableFont(TTFont(FIGTREE), {"wght": 500})

OURO_CLARO = ["#9a7038", "#ecd29b", "#b98f52", "#f4e2b4"]
OURO_ESCURO = ["#5e3f17", "#a97f43", "#7a5626", "#b8915a"]


def gradiente(gid, cores):
    paradas = "".join(f'<stop offset="{o}" stop-color="{c}"/>' for o, c in zip(("0", ".38", ".62", "1"), cores))
    return f'<linearGradient id="{gid}" x1="0" y1="0" x2="1" y2="1">{paradas}</linearGradient>'


def texto(fonte, frase, x, base, altura_maiuscula, espaco=0.0):
    """Contorno SVG da frase, com a linha de base em `base` e a altura das maiúsculas pedida."""
    gs = fonte.getGlyphSet()
    cmap = fonte.getBestCmap()
    cap = fonte["OS/2"].sCapHeight or fonte["head"].unitsPerEm * 0.7
    k = altura_maiuscula / cap
    caneta = SVGPathPen(gs)
    cx = 0.0
    for ch in frase:
        nome = cmap.get(ord(ch))
        if nome is None:
            continue
        g = gs[nome]
        g.draw(TransformPen(caneta, (k, 0, 0, -k, x + cx * k, base)))
        cx += g.width + espaco * fonte["head"].unitsPerEm
    return caneta.getCommands(), cx * k


def largura(fonte, frase, altura_maiuscula, espaco=0.0):
    return texto(fonte, frase, 0, 0, altura_maiuscula, espaco)[1]


def limites(fonte, letra):
    gs = fonte.getGlyphSet()
    b = BoundsPen(gs)
    gs[fonte.getBestCmap()[ord(letra)]].draw(b)
    return b.bounds  # xMin, yMin, xMax, yMax


def monograma(cx, topo, larg, cor):
    """Escudo de topo em arco com N e P entrelaçados. Devolve (svg, altura)."""
    W = larg
    H = W * 1.42
    a = W * 0.2  # altura do arco
    b = W * 0.27  # altura da ponta
    x0 = cx - W / 2
    escudo = (
        f"M{x0:.1f} {topo + a:.1f} C{x0:.1f} {topo - a * 0.28:.1f} {x0 + W:.1f} {topo - a * 0.28:.1f} {x0 + W:.1f} {topo + a:.1f} "
        f"V{topo + H - b:.1f} L{cx:.1f} {topo + H:.1f} L{x0:.1f} {topo + H - b:.1f} Z"
    )
    linha = f"M{x0:.1f} {topo + a:.1f} H{x0 + W:.1f}"
    traco = W * 0.012

    # N e P em Marcellus: a haste do P apoiada na haste direita do N.
    cap = W * 0.6
    nx0, _, nx1, _ = limites(serifa, "N")
    px0, _, px1, _ = limites(serifa, "P")
    k = cap / serifa["OS/2"].sCapHeight
    haste = 0.105 * serifa["head"].unitsPerEm  # largura aproximada da haste
    desloc_p = (nx1 - haste - px0) * k
    total = (nx1 - nx0) * k + max(0.0, (px1 - px0) * k - (nx1 - nx0) * k + desloc_p)
    inicio = cx - total / 2 - nx0 * k
    base = topo + a + (H - a - b) * 0.5 + cap * 0.5 + W * 0.02
    n_path, _ = texto(serifa, "N", inicio, base, cap)
    p_path, _ = texto(serifa, "P", inicio + desloc_p, base + cap * 0.08, cap * 1.08)
    svg = (
        f'<path d="{escudo}" fill="none" stroke="{cor}" stroke-width="{traco:.2f}" stroke-linejoin="round"/>'
        f'<path d="{linha}" stroke="{cor}" stroke-width="{traco:.2f}"/>'
        f'<path d="{n_path}" fill="{cor}"/><path d="{p_path}" fill="{cor}"/>'
    )
    return svg, H


def logo_vertical(cores, arquivo):
    nome_cap = 54
    sub_cap = 15
    W = largura(serifa, "Nanda Prevedello", nome_cap) + 48
    mono, H = monograma(W / 2, 40, 250, "url(#ouro)")
    y_nome = 40 + H + 46 + nome_cap
    ln = largura(serifa, "Nanda Prevedello", nome_cap)
    nome, _ = texto(serifa, "Nanda Prevedello", (W - ln) / 2, y_nome, nome_cap)
    ls = largura(sans, "ESTÉTICA AVANÇADA", sub_cap, 0.32)
    sub, _ = texto(sans, "ESTÉTICA AVANÇADA", (W - ls) / 2, y_nome + 46, sub_cap, 0.32)
    altura = y_nome + 46 + 34
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {altura:.0f}" role="img" aria-label="Nanda Prevedello, Estética Avançada">'
        f"<defs>{gradiente('ouro', cores)}</defs>{mono}"
        f'<path d="{nome}" fill="url(#ouro)"/><path d="{sub}" fill="url(#ouro)"/></svg>'
    )
    (RAIZ / "public" / arquivo).write_text(svg)


def logo_linha(cores, arquivo):
    mono, H = monograma(60, 14, 84, "url(#ouro)")
    nome_cap = 34
    sub_cap = 10.5
    x = 128
    nome, ln = texto(serifa, "Nanda Prevedello", x, 14 + H * 0.52, nome_cap)
    sub, ls = texto(sans, "ESTÉTICA AVANÇADA", x + 2, 14 + H * 0.52 + 30, sub_cap, 0.34)
    W = x + max(ln, ls) + 8
    altura = 14 + H + 10
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.0f} {altura:.0f}" role="img" aria-label="Nanda Prevedello, Estética Avançada">'
        f"<defs>{gradiente('ouro', cores)}</defs>{mono}"
        f'<path d="{nome}" fill="url(#ouro)"/><path d="{sub}" fill="url(#ouro)"/></svg>'
    )
    (RAIZ / "public" / arquivo).write_text(svg)


def so_monograma():
    """Ícone quadrado (aba do navegador, ícone do app e do iPhone): escudo NP no fundo ônix."""
    mono, H = monograma(128, 128 - 0.71 * 124 + 4, 124, "url(#ouro)")
    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img" aria-label="NP">'
        f"<defs>{gradiente('ouro', OURO_CLARO)}</defs>"
        f'<rect width="256" height="256" rx="52" fill="#141011"/>{mono}</svg>'
    )
    (RAIZ / "public" / "monograma.svg").write_text(svg)
    (RAIZ / "public" / "favicon.svg").write_text(svg)


logo_vertical(OURO_CLARO, "logo-nanda.svg")
logo_vertical(OURO_ESCURO, "logo-nanda-escuro.svg")
logo_linha(OURO_CLARO, "logo-nanda-linha.svg")
logo_linha(OURO_ESCURO, "logo-nanda-linha-escuro.svg")
so_monograma()
print("logos gerados em public/")
