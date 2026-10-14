# Peças visuais reutilizadas nas páginas: mapas de aplicação (rosto e corpo), molduras de celular e de painel.

def mapa_facial(largura=300, rotulos=True, cor="#8d5f6a", traco="#2a171c", fundo="none", fonte="Jost"):
    """Rosto de frente em traço fino, com pontos de aplicação e unidades (ilustrativo)."""
    pontos = [
        # (x, y, raio, rótulo, lado do rótulo)
        (112, 96, 5, "Frontal · 4 U", "esq"),
        (150, 90, 5, None, None),
        (188, 96, 5, None, None),
        (140, 126, 5, "Glabela · 20 U", "dir"),
        (160, 126, 5, None, None),
        (150, 118, 5, None, None),
        (76, 146, 5, "Periorbital · 12 U por lado", "esq"),
        (79, 162, 5, None, None),
        (224, 146, 5, None, None),
        (221, 162, 5, None, None),
        (150, 244, 6, "Lábios · 1 ml · lote AH-2291", "dir"),
    ]
    marcas = "".join(
        f'<circle cx="{x}" cy="{y}" r="{r}" fill="{cor}" fill-opacity="0.18" stroke="{cor}" stroke-width="1.4"/>'
        f'<circle cx="{x}" cy="{y}" r="1.8" fill="{cor}"/>'
        for x, y, r, *_ in pontos
    )
    textos = ""
    if rotulos:
        for x, y, r, rotulo, lado in pontos:
            if not rotulo:
                continue
            if lado == "esq":
                textos += f'<path d="M{x - 8} {y} H{-6}" stroke="{cor}" stroke-width="0.8" stroke-dasharray="2 3"/>'
                textos += f'<text x="-12" y="{y + 4}" text-anchor="end" font-size="12" fill="{traco}" font-family="{fonte}">{rotulo}</text>'
            else:
                textos += f'<path d="M{x + 8} {y} H{306}" stroke="{cor}" stroke-width="0.8" stroke-dasharray="2 3"/>'
                textos += f'<text x="312" y="{y + 4}" font-size="12" fill="{traco}" font-family="{fonte}">{rotulo}</text>'
    margem = 190 if rotulos else 6
    return f"""<svg width="{largura}" viewBox="{-margem} 0 {300 + 2 * margem} 360" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mapa facial com pontos de aplicação">
  <rect x="{-margem}" y="0" width="{300 + 2 * margem}" height="360" fill="{fundo}"/>
  <g stroke="{traco}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M150 22 C 96 22 64 62 64 126 C 64 196 86 262 118 306 C 132 326 168 326 182 306 C 214 262 236 196 236 126 C 236 62 204 22 150 22 Z"/>
    <path d="M92 130 Q 114 117 136 125"/><path d="M164 125 Q 186 117 208 130"/>
    <path d="M98 150 Q 115 140 132 150 Q 115 157 98 150 Z"/><path d="M168 150 Q 185 140 202 150 Q 185 157 168 150 Z"/>
    <path d="M147 150 C 145 172 141 188 138 197 Q 150 208 162 197"/>
    <path d="M122 238 Q 136 229 150 234 Q 164 229 178 238"/><path d="M122 238 Q 150 257 178 238"/>
    <path d="M64 126 C 56 128 54 150 66 160" stroke-opacity="0.5"/><path d="M236 126 C 244 128 246 150 234 160" stroke-opacity="0.5"/>
  </g>
  {marcas}
  {textos}
</svg>"""


def mapa_corporal(largura=300, rotulos=True, cor="#8d5f6a", traco="#2a171c", fundo="none", fonte="Jost"):
    """Corpo de costas em traço fino, com pontos em glúteos e flancos (ilustrativo)."""
    pontos = [
        (118, 214, 6, "Glúteo superior · 2 frascos", "esq"),
        (182, 214, 6, None, None),
        (100, 240, 5, "Região lateral · 1 frasco", "esq"),
        (200, 240, 5, None, None),
        (98, 158, 5, None, None),
        (202, 158, 5, "Flancos · Lipolaser 3/6", "dir"),
        (150, 196, 4, None, None),
    ]
    marcas = "".join(
        f'<circle cx="{x}" cy="{y}" r="{r}" fill="{cor}" fill-opacity="0.18" stroke="{cor}" stroke-width="1.4"/>'
        f'<circle cx="{x}" cy="{y}" r="1.8" fill="{cor}"/>'
        for x, y, r, *_ in pontos
    )
    textos = ""
    if rotulos:
        for x, y, r, rotulo, lado in pontos:
            if not rotulo:
                continue
            if lado == "esq":
                textos += f'<path d="M{x - 8} {y} H{-6}" stroke="{cor}" stroke-width="0.8" stroke-dasharray="2 3"/>'
                textos += f'<text x="-12" y="{y + 4}" text-anchor="end" font-size="12" fill="{traco}" font-family="{fonte}">{rotulo}</text>'
            else:
                textos += f'<path d="M{x + 8} {y} H{306}" stroke="{cor}" stroke-width="0.8" stroke-dasharray="2 3"/>'
                textos += f'<text x="312" y="{y + 4}" font-size="12" fill="{traco}" font-family="{fonte}">{rotulo}</text>'
    margem = 190 if rotulos else 6
    return f"""<svg width="{largura}" viewBox="{-margem} 0 {300 + 2 * margem} 360" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mapa corporal com pontos de aplicação">
  <rect x="{-margem}" y="0" width="{300 + 2 * margem}" height="360" fill="{fundo}"/>
  <g stroke="{traco}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M128 14C126 30 104 36 84 44C72 49 70 70 74 94C80 122 98 136 100 154C102 172 80 192 78 218C76 252 86 292 92 322L97 356"/>
    <path d="M172 14C174 30 196 36 216 44C228 49 230 70 226 94C220 122 202 136 200 154C198 172 220 192 222 218C224 252 214 292 208 322L203 356"/>
    <path d="M128 356C132 322 140 292 150 270C160 292 168 322 172 356"/>
    <path d="M104 230C118 262 140 266 150 248C160 266 182 262 196 230" stroke-opacity="0.75"/>
    <path d="M150 40V192" stroke-opacity="0.35"/>
    <path d="M112 60C124 72 138 76 150 76C162 76 176 72 188 60" stroke-opacity="0.35"/>
  </g>
  {marcas}
  {textos}
</svg>"""


def celular(conteudo, largura=260, classe=""):
    """Moldura de celular com a tela em HTML."""
    return f'<div class="celular {classe}" style="width:{largura}px"><div class="tela">{conteudo}</div></div>'


def painel(conteudo, classe="", endereco="clinica.app/painel"):
    """Moldura de navegador para telas do painel da clínica."""
    return f'<div class="janela {classe}"><div class="barra"><i></i><i></i><i></i><span>{endereco}</span></div><div class="area">{conteudo}</div></div>'
