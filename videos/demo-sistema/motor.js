// Motor de animação determinístico: cada quadro é calculado só a partir do tempo t (em segundos),
// para o vídeo sair igual toda vez e ser renderizado quadro a quadro pelo Playwright.

const Q = { cenas: [], atual: null };

const curvas = {
  linear: (x) => x,
  suave: (x) => 1 - Math.pow(1 - x, 3),
  entra: (x) => 1 - Math.pow(1 - x, 4),
  vaivem: (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
  volta: (x) => {
    const c1 = 1.4, c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  },
};

const PADRAO = { o: 1, x: 0, y: 0, s: 1, r: 0 };

function estado(el) {
  if (!el.__q) {
    el.__q = { props: {}, classes: [], textos: [] };
    Q.atual.elementos.add(el);
  }
  return el.__q;
}

// Uma propriedade animada: valor inicial e trechos { t0, t1, v, e } em ordem de tempo.
function pista(el, prop, inicial) {
  const q = estado(el);
  if (!q.props[prop]) q.props[prop] = { ini: inicial ?? PADRAO[prop] ?? 0, trechos: [] };
  return q.props[prop];
}

function vai(el, prop, v, t, d = 0.6, e = "suave") {
  const p = pista(el, prop);
  p.trechos.push({ t0: t, t1: t + Math.max(d, 1e-4), v, e });
  p.trechos.sort((a, b) => a.t0 - b.t0);
}

function valor(p, t) {
  let v = p.ini;
  for (const tr of p.trechos) {
    if (t >= tr.t1) v = tr.v;
    else if (t > tr.t0) {
      const k = curvas[tr.e]((t - tr.t0) / (tr.t1 - tr.t0));
      return v + (tr.v - v) * k;
    } else break;
  }
  return v;
}

// Atalhos de animação ------------------------------------------------------

function entra(el, t, { d = 0.7, x = 0, y = 26, s = 1, e = "entra" } = {}) {
  pista(el, "o", 0);
  if (x) { pista(el, "x", x); vai(el, "x", 0, t, d, e); }
  if (y) { pista(el, "y", y); vai(el, "y", 0, t, d, e); }
  if (s !== 1) { pista(el, "s", s); vai(el, "s", 1, t, d, e); }
  vai(el, "o", 1, t, d * 0.8, "suave");
}

function sai(el, t, { d = 0.45, x = 0, y = 0, s = 1 } = {}) {
  vai(el, "o", 0, t, d, "suave");
  if (x) vai(el, "x", x, t, d, "vaivem");
  if (y) vai(el, "y", y, t, d, "vaivem");
  if (s !== 1) vai(el, "s", s, t, d, "vaivem");
}

function move(el, t, alvo, d = 0.8, e = "vaivem") {
  for (const [k, v] of Object.entries(alvo)) vai(el, k, v, t, d, e);
}

function aperta(el, t) {
  vai(el, "s", 0.94, t - 0.06, 0.12, "suave");
  vai(el, "s", 1, t + 0.08, 0.3, "volta");
}

function liga(el, classe, t, ligada = true) {
  const q = estado(el);
  q.inicial ??= {};
  if (!(classe in q.inicial)) q.inicial[classe] = el.classList.contains(classe);
  q.classes.push({ t, classe, ligada });
}

function escreve(el, t, texto) {
  estado(el).textos.push({ t, f: () => texto });
}

function digita(el, t, texto, cps = 24) {
  const q = estado(el);
  q.textos.push({ t, f: (agora) => texto.slice(0, Math.max(0, Math.min(texto.length, Math.floor((agora - t) * cps)))) });
}

function conta(el, t, d, de, ate, fmt = (n) => Math.round(n).toString()) {
  const q = estado(el);
  q.textos.push({ t: -1e9, f: () => fmt(de) });
  q.textos.push({ t, f: (agora) => fmt(de + (ate - de) * curvas.vaivem(Math.min(1, (agora - t) / d))) });
}

function largura(el, t, d, de, ate) {
  pista(el, "w", de);
  vai(el, "w", ate, t, d, "vaivem");
}

function traca(caminho, t, d) {
  const L = caminho.getTotalLength();
  caminho.style.strokeDasharray = `${L}`;
  pista(caminho, "dash", L);
  vai(caminho, "dash", 0, t, d, "vaivem");
}

// Dedo tocando um elemento do celular: ponto, onda e o botão afundando.
function toque(alvo, t) {
  const tela = alvo.closest(".cel-tela");
  const rt = tela.getBoundingClientRect(), ra = alvo.getBoundingClientRect();
  const k = rt.width / tela.offsetWidth; // o celular pode estar em escala
  const x = (ra.left - rt.left + ra.width / 2) / k, y = (ra.top - rt.top + ra.height / 2) / k;
  const ponto = Object.assign(document.createElement("div"), { className: "toque" });
  const onda = Object.assign(document.createElement("div"), { className: "onda" });
  for (const n of [ponto, onda]) {
    n.style.left = `${x}px`;
    n.style.top = `${y}px`;
    tela.appendChild(n);
  }
  pista(ponto, "o", 0); pista(ponto, "s", 1.5);
  vai(ponto, "o", 1, t - 0.35, 0.25); vai(ponto, "s", 1, t - 0.35, 0.3);
  vai(ponto, "s", 0.85, t - 0.05, 0.1); vai(ponto, "o", 0, t + 0.25, 0.3);
  pista(onda, "o", 0); pista(onda, "s", 1);
  vai(onda, "o", 0.7, t, 0.05); vai(onda, "s", 2.6, t, 0.6); vai(onda, "o", 0, t + 0.1, 0.55);
  aperta(alvo, t);
}

// Troca de tela dentro do celular: a nova entra pela direita.
function troca(antiga, nova, t, d = 0.6) {
  pista(nova, "x", 360); pista(nova, "o", 1);
  vai(nova, "x", 0, t, d, "vaivem");
  vai(antiga, "x", -90, t, d, "vaivem");
  vai(antiga, "o", 0.4, t, d, "vaivem");
}

// Cenas -------------------------------------------------------------------

function cena(id, info, classe = "") {
  const el = document.createElement("section");
  el.className = `cena ${classe}`;
  el.dataset.id = id;
  el.innerHTML = `<div class="palco"></div>`;
  document.body.appendChild(el);
  const registro = { id, el, palco: el.firstChild, info, elementos: new Set() };
  Q.cenas.push(registro);
  Q.atual = registro;
  return registro;
}

function quadro(t) {
  for (const c of Q.cenas) {
    const visivel = t >= c.info.ini - 0.7 && t <= c.info.fim + 0.75;
    c.el.style.display = visivel ? "block" : "none";
    if (!visivel) continue;
    for (const el of c.elementos) {
      const q = el.__q;
      const p = q.props;
      if (p.o) el.style.opacity = valor(p.o, t).toFixed(4);
      if (p.x || p.y || p.s || p.r) {
        const x = p.x ? valor(p.x, t) : 0, y = p.y ? valor(p.y, t) : 0;
        const s = p.s ? valor(p.s, t) : 1, r = p.r ? valor(p.r, t) : 0;
        el.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) scale(${s.toFixed(4)}) rotate(${r.toFixed(2)}deg)`;
      }
      if (p.w) el.style.width = `${valor(p.w, t).toFixed(2)}%`;
      if (p.dash) el.style.strokeDashoffset = valor(p.dash, t).toFixed(2);
      if (q.classes.length) {
        const vistas = { ...q.inicial };
        for (const c2 of q.classes) if (t >= c2.t) vistas[c2.classe] = c2.ligada;
        for (const c2 of q.classes) el.classList.toggle(c2.classe, !!vistas[c2.classe]);
      }
      if (q.textos.length) {
        let ultimo = null;
        for (const tx of q.textos) if (t >= tx.t) ultimo = tx;
        if (ultimo) {
          const s = ultimo.f(t);
          if (el.textContent !== s) el.textContent = s;
        }
      }
    }
  }
}

window.Q = Q;
window.quadro = quadro;
