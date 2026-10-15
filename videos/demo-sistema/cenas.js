// As 11 cenas do vídeo. Cada cena recebe os tempos das suas frases (vindos da narração gerada)
// e agenda as animações em cima deles, para a imagem acompanhar a fala.

const LOGO = "recursos/logo-essenciale.svg";
const LOGO_BRANCO = "recursos/logo-essenciale-branco.svg";

const ICONES = {
  ok: '<path d="M5 12.5l4.2 4.2L19 7"/>',
  agenda: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  sino: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
  tel: '<path d="M6 3.5h3.2l1.8 4.6-2.4 1.5a11 11 0 0 0 5.8 5.8l1.5-2.4 4.6 1.8V18a2.5 2.5 0 0 1-2.5 2.5A15 15 0 0 1 3.5 6 2.5 2.5 0 0 1 6 3.5z"/>',
  alerta: '<path d="M12 4l9 16H3z"/><path d="M12 10v4.5M12 17.2v.3"/>',
  caixa: '<path d="M3.5 7.5L12 4l8.5 3.5v9L12 20l-8.5-3.5z"/><path d="M3.5 7.5L12 11l8.5-3.5M12 11v9"/>',
  camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13.5" r="3.5"/>',
  pessoa: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c1.4-3.8 4.3-5.7 7.5-5.7s6.1 1.9 7.5 5.7"/>',
  grafico: '<path d="M5 20V11M11 20V5M17 20v-7M3 20.5h18"/>',
  escudo: '<path d="M12 3.5l7.5 3v5.6c0 4.6-3.2 7.6-7.5 8.6-4.3-1-7.5-4-7.5-8.6V6.5z"/><path d="M8.8 12.2l2.2 2.2 4.3-4.6"/>',
  doc: '<path d="M6.5 3.5h8l4 4v13h-12z"/><path d="M14 3.5v4.5h4.5M9.5 12.5h6M9.5 16.5h4"/>',
  folha: '<path d="M5 19c0-8.5 6-14 14.5-14 0 8.5-5.8 14-14.5 14z"/><path d="M5 19l7.5-7.5"/>',
  relogio: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  etiqueta: '<path d="M3.5 12.3V4.5h7.8l9.2 9.2-7.8 7.8z"/><circle cx="8" cy="9" r="1.4"/>',
  estrela: '<path d="M12 3.8l2.5 5.2 5.6.7-4.1 3.9 1 5.6L12 16.5l-5 2.7 1-5.6-4.1-3.9 5.6-.7z"/>',
  conversa: '<path d="M4 5.5h16v10H9l-5 4z"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  pacote: '<rect x="4" y="7.5" width="16" height="12.5" rx="2"/><path d="M8 7.5V5.5a4 4 0 0 1 8 0v2"/>',
};
const ic = (nome, tam = 22, traco = 1.6) =>
  `<svg width="${tam}" height="${tam}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${traco}" stroke-linecap="round" stroke-linejoin="round">${ICONES[nome]}</svg>`;
const okP = () => `<span class="ic-ok">${ic("ok", 12, 2.6)}</span>`;
const okA = () => `<span class="a-ok">${ic("ok", 13, 2.6)}</span>`;

function no(pai, html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  const el = t.content.firstElementChild;
  pai.appendChild(el);
  return el;
}
const $ = (raiz, sel) => raiz.querySelector(sel);
const $$ = (raiz, sel) => [...raiz.querySelectorAll(sel)];

function celular(pai, { x, y, escala = 0.9, tema = "", hora = "9:41" }) {
  return no(
    pai,
    `<div class="cel ${tema}" style="left:${x}px;top:${y}px;scale:${escala}"><div class="cel-tela"><div class="status"><span>${hora}</span><i></i></div></div></div>`,
  );
}
const tela = (cel, html, classe = "") => no($(cel, ".cel-tela"), `<div class="tela ${classe}">${html}</div>`);

function janela(pai, { x, y, w, h, ativo = "Hoje", endereco = "app.essencialeestetica.com.br" }) {
  const itens = ["Hoje", "Agenda", "Pacientes", "Prontuários", "Estoque", "Equipe", "Relatórios"];
  return no(
    pai,
    `<div class="jan" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">
      <div class="jan-barra"><i></i><i></i><i></i><span>${endereco}</span></div>
      <div class="jan-corpo"><nav class="lateral"><img src="${LOGO}" alt="">${itens.map((i) => `<span class="${i === ativo ? "ativo" : ""}">${i}</span>`).join("")}</nav><div class="area"></div></div>
    </div>`,
  );
}

function cabeca(palco, titulo, sub) {
  return no(palco, `<div class="cabeca"><h2>${titulo}</h2><p>${sub}</p></div>`);
}

const ETAPAS = ["Agendamento", "Confirmação", "Termo", "Atendimento", "Pós", "Retorno"];
function trilha(palco, atual) {
  return no(
    palco,
    `<ol class="trilha">${ETAPAS.map((e, i) => `<li class="${i < atual ? "feita" : i === atual ? "agora" : ""}">${e}</li>`).join("")}</ol>`,
  );
}

// Tela inicial do app da paciente, usada na abertura e na cena das marcas.
function inicio(cel, { logo = LOGO, alturaLogo = 24, quando = "Hoje, 14h30, com a Dra. Cláudia", tratamento = "Toxina botulínica", pacote = "Pele de Rainha", sessoes = [4, 5], data = "Quinta, 22 de outubro" } = {}) {
  return tela(
    cel,
    `<div class="a-topo"><img src="${logo}" alt="" style="height:${alturaLogo}px"><div class="a-avatar">MS</div></div>
     <div><div class="a-sub">${data}</div><div class="a-t" style="margin-top:4px">Olá, Marina</div></div>
     <div class="a-card" style="background:var(--app-tinta);color:var(--app-fundo);border:0">
       <p style="color:inherit;opacity:.7;margin:0">Sua próxima sessão</p>
       <h4 style="font-size:19px;margin-top:4px">${tratamento}</h4>
       <p style="color:inherit;opacity:.85">${quando}</p>
       <div class="a-bt" style="margin-top:12px;height:40px;font-size:14px">Ver cuidados de antes</div>
     </div>
     <div class="a-grade" style="grid-template-columns:1fr 1fr">
       ${[["agenda", "Agendar"], ["folha", "Meus cuidados"], ["pacote", "Pacotes"], ["camera", "Minha evolução"]]
         .map(([i, t]) => `<div class="a-card" style="padding:12px;display:flex;flex-direction:column;gap:8px;color:var(--app-acento)">${ic(i, 22)}<h4 style="color:var(--app-tinta);font-size:14.5px">${t}</h4></div>`)
         .join("")}
     </div>
     <div class="a-card"><h4>Seu pacote</h4><p>${pacote}: ${sessoes[0]} de ${sessoes[1]} sessões</p>
       <div class="barra-p" style="margin-top:9px;background:var(--app-suave)"><i style="width:${(sessoes[0] / sessoes[1]) * 100}%;background:var(--app-acento)"></i></div></div>`,
  );
}

// --------------------------------------------------------------------------

function montarCenas(linha) {
  const porId = Object.fromEntries(linha.cenas.map((c) => [c.id, c]));
  const construtores = { abertura, agendamento, confirmacao, termo, prontuario, pos, retorno, bastidores, painel, marca, fechamento };

  for (const info of linha.cenas) {
    const escura = ["abertura", "marca", "fechamento"].includes(info.id);
    const c = cena(info.id, info, escura ? "noite" : "");
    c.el.style.display = "block";
    c.el.style.zIndex = String(Q.cenas.length);
    // Dissolve de entrada e um leve avanço de câmera durante a cena.
    pista(c.el, "o", 0);
    vai(c.el, "o", 1, info.ini - 0.6, 0.6, "vaivem");
    pista(c.palco, "s", 1);
    vai(c.palco, "s", 1.028, info.ini - 0.6, info.fim - info.ini + 1.3, "linear");
    const F = info.frases;
    const f = (i, k = 0) => F[i].ini + k * (F[i].fim - F[i].ini);
    const fim = (i) => F[i].fim;
    // Momento aproximado em que uma palavra é dita, pela posição dela na frase.
    const pal = (i, palavra, k = 0) => {
      const pos = F[i].texto.toLowerCase().indexOf(palavra.toLowerCase());
      if (pos < 0) console.warn(`Palavra não encontrada em ${info.id}, frase ${i}: ${palavra}`);
      const frac = pos < 0 ? 0.5 : (pos + k * palavra.length) / F[i].texto.length;
      return f(i, Math.min(0.97, frac * 0.96 + 0.02));
    };
    construtores[info.id](c.palco, { f, fim, pal, F, ini: info.ini, fimCena: info.fim, linha });
  }

  // Legendas: uma por frase, por cima de tudo.
  const leg = cena("legendas", { ini: -10, fim: 1e9 }, "");
  leg.el.style.display = "block";
  leg.el.style.background = "none";
  leg.el.style.zIndex = "100";
  const todas = linha.cenas.filter((c) => c.id !== "fechamento").flatMap((c) => c.frases);
  // Legenda longa vira duas linhas de tamanho parecido, quebrando de preferência depois de uma vírgula.
  const quebra = (texto) => {
    if (texto.length <= 90) return texto;
    const meio = texto.length / 2;
    const espacos = [...texto.matchAll(/ /g)].map((m) => m.index);
    const nota = (i) => Math.abs(i - meio) - (texto[i - 1] === "," || texto[i - 1] === ":" ? texto.length * 0.12 : 0);
    const corte = espacos.reduce((a, b) => (nota(b) < nota(a) ? b : a));
    return `${texto.slice(0, corte)}<br>${texto.slice(corte + 1)}`;
  };
  // Cada legenda só entra depois que a anterior terminou de sair.
  let livre = 0;
  todas.forEach((fr, i) => {
    const el = no(leg.palco, `<div class="legenda">${quebra(fr.texto)}</div>`);
    const prox = todas[i + 1];
    const entrada = Math.max(fr.ini - 0.12, livre + 0.04);
    const saida = Math.max(entrada + 0.5, prox ? Math.min(fr.fim + 0.3, prox.ini - 0.3) : fr.fim + 0.5);
    pista(el, "o", 0);
    vai(el, "o", 1, entrada, 0.2, "suave");
    vai(el, "o", 0, saida, 0.16, "suave");
    livre = saida + 0.16;
  });

  // Fim: escurece até o preto.
  const preto = no(leg.palco, `<div class="abs" style="inset:0;background:#120a0c;z-index:200"></div>`);
  pista(preto, "o", 1);
  vai(preto, "o", 0, 0, 0.9, "suave");
  vai(preto, "o", 1, linha.duracao - 1.4, 1.3, "vaivem");
}

// 1. Abertura ---------------------------------------------------------------
function abertura(palco, { f, fim, pal }) {
  no(palco, `<div class="abs" style="inset:-40px;background:url(recursos/essenciale-corredor.jpg) center/cover;filter:blur(26px) saturate(.8);opacity:.16"></div>`);
  const marca = no(
    palco,
    `<div class="abs" style="left:0;right:0;top:330px;display:flex;flex-direction:column;align-items:center;gap:26px">
      <img src="${LOGO_BRANCO}" alt="" style="width:600px">
      <span style="width:120px;height:1px;background:var(--champanhe)"></span>
      <p style="font-family:var(--display);font-size:48px;font-weight:400;color:var(--rosa)">Um dia na clínica com o aplicativo</p>
    </div>`,
  );
  entra(marca, f(0, 0) - 0.4, { d: 1.4, y: 30 });
  move(marca, fim(0) + 0.05, { y: -248, s: 0.62 }, 1.1);
  pista(marca, "s", 1);

  const cel = celular(palco, { x: 470, y: 300, escala: 0.86 });
  inicio(cel);
  entra(cel, f(1, 0.1), { d: 1.1, y: 140 });

  const jan = janela(palco, { x: 920, y: 392, w: 860, h: 540 });
  const area = $(jan, ".area");
  no(
    area,
    `<div><h3>Hoje</h3><p class="sub">Quinta, 22 de outubro</p>
     <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:22px">
       ${[["14", "atendimentos"], ["12", "confirmados"], ["2", "precisam de atenção"]].map(([n, t]) => `<div class="caixa"><div class="numero" style="font-size:54px">${n}</div><p class="nota" style="margin-top:4px">${t}</p></div>`).join("")}
     </div>
     <div class="caixa" style="margin-top:14px;display:grid;gap:10px">
       ${[["09:00", "Ana Paula S.", "Bioestimulador", "ok", "Confirmada"], ["14:30", "Marina Souza", "Toxina botulínica", "ok", "Confirmada"], ["16:00", "Carla M.", "Toxina botulínica", "espera", "Aguardando"]]
         .map(([h, n, p, c, s]) => `<div style="display:grid;grid-template-columns:64px 1fr auto;gap:10px;align-items:center;font-size:15.5px"><b>${h}</b><span>${n} <span class="nota">${p}</span></span><span class="pilula ${c}">${s}</span></div>`)
         .join("")}
     </div></div>`,
  );
  entra(jan, f(2, 0.12), { d: 1.1, x: 120, y: 0 });

  // "o nome, o logo e as cores": brilho nos logos e a paleta da clínica.
  const cores = no(
    palco,
    `<div class="abs" style="left:0;right:0;top:322px;display:flex;justify-content:center;gap:14px">${["#2a171c", "#8d5f6a", "#c99a92", "#ecd3cc", "#f4e8e2", "#c9a46c"].map((c) => `<span style="width:30px;height:30px;border-radius:50%;background:${c};box-shadow:0 0 0 1px rgba(255,255,255,.25)"></span>`).join("")}</div>`,
  );
  [...cores.children].forEach((s, i) => entra(s, pal(3, "cores") - 0.2 + i * 0.07, { d: 0.5, y: 10 }));
  for (const alvo of [$(cel, ".a-topo img"), $(jan, ".lateral img")]) {
    vai(alvo, "s", 1.12, pal(3, "logo") - 0.1, 0.35, "suave");
    vai(alvo, "s", 1, pal(3, "logo") + 0.35, 0.5, "vaivem");
  }
}

// 2. Agendamento ------------------------------------------------------------
function agendamento(palco, { f, fim, pal, ini }) {
  const cab = cabeca(palco, "Agendamento", "A paciente escolhe o horário; o sistema cuida do encaixe.");
  const tr = trilha(palco, 0);
  entra(cab, ini + 0.05, { d: 0.8 });
  entra(tr, ini + 0.2, { d: 0.8, y: 0 });

  const cel = celular(palco, { x: 150, y: 232 });
  const post = tela(
    cel,
    `<div class="a-topo"><div class="a-linha"><div class="a-avatar" style="background:var(--noite);color:var(--rosa);font-family:var(--display);font-size:18px">E</div><div><b style="font-size:14px">essenciale.estetica</b><div class="a-sub" style="font-size:12px">Balneário Camboriú</div></div></div><span style="font-size:22px;letter-spacing:2px">…</span></div>
     <div style="margin:0 -18px;aspect-ratio:1;background:url(recursos/essenciale-corredor.jpg) center/cover"></div>
     <div class="a-sub" style="color:var(--tinta)"><b>essenciale.estetica</b> Agenda de outubro aberta para toxina botulínica, bioestimuladores e protocolos faciais.</div>
     <div class="a-bt" data-alvo="agendar">${ic("agenda", 18)} Agendar pelo app</div>`,
  );
  const ag = tela(
    cel,
    `<div class="a-topo"><img src="${LOGO}" alt=""><div class="a-avatar">MS</div></div>
     <div class="a-t">Agendar</div>
     <div class="a-card"><h4>Toxina botulínica</h4><p>40 minutos, com a Dra. Cláudia</p></div>
     <div class="a-rotulo">Outubro</div>
     <div class="a-chips" style="flex-wrap:nowrap">${[["Ter", 20], ["Qua", 21], ["Qui", 22], ["Sex", 23]].map(([d, n]) => `<div class="a-chip" data-dia="${n}" style="flex:1">${d}<b>${n}</b></div>`).join("")}</div>
     <div class="a-rotulo">Horários livres na quinta</div>
     <div class="a-grade">${["09:30", "11:00", "13:00", "14:30", "16:30", "17:30"].map((h) => `<div class="a-chip" data-hora="${h}">${h}</div>`).join("")}</div>
     <div class="a-bt" data-alvo="confirmar" style="margin-top:auto">Confirmar horário</div>`,
    "coberta",
  );
  entra(cel, ini + 0.3, { d: 0.9, y: 60 });

  const tAg = pal(1, "agendar", 0.5);
  toque($(post, "[data-alvo=agendar]"), tAg);
  troca(post, ag, tAg + 0.3);
  const dia = $(ag, "[data-dia='22']"), hora = $(ag, "[data-hora='14:30']");
  const tDia = pal(1, "escolheu", 0.2), tHora = pal(1, "horário", 0.6);
  toque(dia, tDia); liga(dia, "sel", tDia);
  toque(hora, tHora); liga(hora, "sel", tHora);
  const tConf = fim(1) + 0.15;
  toque($(ag, "[data-alvo=confirmar]"), tConf);

  // Agenda da clínica.
  const jan = janela(palco, { x: 620, y: 232, w: 1180, h: 712, ativo: "Agenda" });
  const area = $(jan, ".area");
  no(area, `<div style="display:flex;justify-content:space-between;align-items:end"><div><h3>Agenda</h3><p class="sub">Quinta, 22 de outubro</p></div><span class="pilula">3 salas e 1 laser</span></div>`);
  const H = 58, T0 = 9;
  const y = (h) => (h - T0) * H;
  const agenda = no(area, `<div class="agenda"><div class="horas">${[9, 10, 11, 12, 13, 14, 15, 16, 17].map((h) => `<span style="top:${y(h)}px">${String(h).padStart(2, "0")}:00</span>`).join("")}</div></div>`);
  agenda.style.top = "128px";
  const colunas = [
    ["Dra. Cláudia", "Sala 2", [[9, 10, "Ana Paula S.", "Bioestimulador"], [10.5, 11.5, "Júlia R.", "Preenchimento labial"], [16, 17, "Carla M.", "Toxina botulínica"]]],
    ["Bianca", "Sala 1", [[9.5, 11, "Rita F.", "Limpeza de pele"], [13, 14.5, "Paula T.", "Pele de Rainha"], [15.5, 17, "Lívia A.", "Drenagem"]]],
    ["Lara", "Sala de tecnologias", [[10, 11, "Sônia M.", "Ultrassom", "tec"], [14, 15, "Beatriz C.", "Laser", "tec"]]],
  ];
  const cols = colunas.map(([p, s, blocos]) => {
    const col = no(agenda, `<div class="col"><b>${p}<small>${s}</small></b></div>`);
    for (const [a, b, n, t, cl = ""] of blocos) no(col, `<div class="bloco ${cl}" style="top:${y(a) + 2}px;height:${(b - a) * H - 4}px"><b>${n}</b>${t}</div>`);
    return col;
  });
  entra(jan, ini + 0.45, { d: 1, x: 80, y: 0 });

  const novo = no(cols[0], `<div class="bloco novo" style="top:${y(14.5) + 2}px;height:${0.86 * H}px"><b>Marina Souza</b>Toxina botulínica</div>`);
  entra(novo, tConf + 0.35, { d: 0.6, y: 0, s: 0.86, e: "volta" });

  // As três checagens do encaixe, uma a cada trecho da frase.
  const checa = no(
    palco,
    `<div class="caixa abs" style="left:1170px;top:612px;width:360px;box-shadow:0 30px 60px -30px rgba(42,23,28,.45);display:grid;gap:12px">
      <h5>Encaixe conferido</h5>
      ${[["Dra. Cláudia livre às 14h30", "profissional"], ["Sala 2 livre", "sala"], ["Nenhum aparelho em conflito", "aparelho"]].map(([t, k]) => `<div class="a-linha" data-k="${k}" style="font-size:16px">${okP()}${t}</div>`).join("")}
    </div>`,
  );
  entra(checa, f(2, 0.05), { d: 0.6, y: 16 });
  for (const linha of $$(checa, "[data-k]")) entra(linha, pal(2, linha.dataset.k, 0.4), { d: 0.45, y: 8 });
  sai(checa, fim(2) + 0.2, { d: 0.4 });

  // Conflito: um segundo laser no mesmo horário é barrado e vai para o próximo livre.
  const fant = no(cols[2], `<div class="bloco fantasma" style="top:${y(14.5) + 2}px;height:${H - 4}px"><b>Bruna L.</b>Laser</div>`);
  const aviso = no(
    palco,
    `<div class="abs pilula alerta" style="left:1470px;top:640px;font-size:15.5px;padding:8px 14px;box-shadow:0 10px 24px -12px rgba(164,72,58,.5)">${ic("alerta", 18)} O laser já está reservado às 14h30</div>`,
  );
  entra(fant, f(3, 0.0), { d: 0.5, y: -30 });
  vai(fant, "x", -8, f(3, 0.3), 0.07, "linear");
  vai(fant, "x", 8, f(3, 0.3) + 0.07, 0.07, "linear");
  vai(fant, "x", -5, f(3, 0.3) + 0.14, 0.07, "linear");
  vai(fant, "x", 0, f(3, 0.3) + 0.21, 0.07, "linear");
  entra(aviso, f(3, 0.3), { d: 0.4, y: 8 });
  const tMove = fim(3) + 0.15;
  move(fant, tMove, { y: y(15) - y(14.5) }, 0.7);
  liga(fant, "tec", tMove + 0.3);
  liga(fant, "fantasma", tMove + 0.3, false);
  sai(aviso, tMove, { d: 0.35 });
}

// 3. Confirmação ------------------------------------------------------------
function confirmacao(palco, { f, fim, pal, ini }) {
  const cab = cabeca(palco, "Confirmação", "O lembrete sai sozinho na véspera. A recepção só cuida das exceções.");
  const tr = trilha(palco, 1);
  entra(cab, ini + 0.05, { d: 0.8 });
  entra(tr, ini + 0.2, { d: 0.8, y: 0 });

  const cel = celular(palco, { x: 150, y: 232, hora: "10:02" });
  const zap = tela(
    cel,
    `<div class="zap-topo"><div class="a-avatar">E</div><div><b>Essenciale</b><small>conta comercial</small></div></div>
     <div class="zap-msgs">
       <div class="bolha" data-m="1">Oi, Marina! Passando para lembrar da sua sessão amanhã, quinta, às 14h30, com a Dra. Cláudia.<small>10:00</small></div>
       <div class="zap-bts" data-m="2"><span data-alvo="sim">Confirmar presença</span><span>Preciso remarcar</span></div>
       <div class="bolha minha" data-m="3">Confirmar presença<small>10:02 ✓✓</small></div>
       <div class="bolha" data-m="4">Presença confirmada. Até amanhã, Marina!<small>10:02</small></div>
     </div>`,
    "zap",
  );
  const aviso = no(
    $(cel, ".cel-tela"),
    `<div class="aviso"><span class="ic"><img src="${LOGO_BRANCO}" alt=""></span><div><b>Essenciale</b>Sua sessão é amanhã, às 14h30. Toque para ver os cuidados de antes.</div></div>`,
  );
  entra(cel, ini + 0.3, { d: 0.9, y: 60 });
  const m = (n) => $(zap, `[data-m='${n}']`);
  entra(m(1), f(0, 0.25), { d: 0.5, y: 12 });
  entra(m(2), f(0, 0.4), { d: 0.5, y: 12 });
  entra(aviso, pal(0, "aplicativo", -0.2), { d: 0.55, y: -40 });
  sai(aviso, fim(0) + 0.2, { d: 0.45, y: -40 });
  const tSim = pal(1, "toque", 0.6);
  toque($(zap, "[data-alvo=sim]"), tSim);
  entra(m(3), tSim + 0.3, { d: 0.45, y: 12 });
  entra(m(4), tSim + 1.0, { d: 0.45, y: 12 });

  const jan = janela(palco, { x: 620, y: 232, w: 1180, h: 712, ativo: "Agenda" });
  const area = $(jan, ".area");
  no(area, `<div style="display:flex;justify-content:space-between;align-items:end"><div><h3>Amanhã</h3><p class="sub">Quinta, 22 de outubro</p></div></div>`);
  const linhas = [
    ["09:00", "Ana Paula S.", "Bioestimulador", "Dra. Cláudia", "ok"],
    ["10:30", "Júlia R.", "Preenchimento labial", "Dra. Cláudia", "ok"],
    ["13:00", "Paula T.", "Pele de Rainha", "Bianca", "sem"],
    ["14:30", "Marina Souza", "Toxina botulínica", "Dra. Cláudia", "marina"],
    ["16:00", "Carla M.", "Toxina botulínica", "Dra. Cláudia", "sem"],
    ["17:30", "Rita F.", "Limpeza de pele", "Bianca", "ok"],
  ];
  const lista = no(area, `<div class="lista" style="margin-top:22px"></div>`);
  const rows = linhas.map(([h, n, p, pr, st]) =>
    no(
      lista,
      `<div data-st="${st}"><b>${h}</b><span>${n}<small>${p}</small></span><span class="nota" style="font-size:15px">${pr}</span>
        <span style="display:flex;gap:8px;justify-content:flex-end;align-items:center"><span class="pilula ${st === "ok" ? "ok" : "espera"}" data-pilula>${st === "ok" ? "Confirmada" : "Aguardando"}</span></span></div>`,
    ),
  );
  entra(jan, ini + 0.45, { d: 1, x: 80, y: 0 });

  const marina = rows[3];
  const pil = $(marina, "[data-pilula]");
  const tConf = pal(1, "confirmada", 0.1);
  vai(marina, "s", 1, 0, 0.01);
  liga(marina, "destaque", tConf - 0.05);
  liga(marina, "destaque", tConf + 1.6, false);
  escreve(pil, tConf, "Confirmada");
  liga(pil, "ok", tConf);
  liga(pil, "espera", tConf, false);
  aperta(pil, tConf + 0.1);

  // Quem não respondeu ganha destaque e um botão de ligar.
  for (const r of rows.filter((r) => r.dataset.st === "sem")) {
    const t = pal(2, "destaque", 0.2);
    liga(r, "destaque", t);
    const bt = no($(r, "span:last-child"), `<span class="ligar">${ic("tel", 16)} Ligar</span>`);
    bt.style.opacity = "";
    entra(bt, t + 0.15, { d: 0.45, y: 0, x: 12 });
    vai(bt, "s", 1.08, pal(2, "ligar") - 0.1, 0.25, "suave");
    vai(bt, "s", 1, pal(2, "ligar") + 0.2, 0.4, "vaivem");
  }
  const resumo = no(
    area,
    `<div class="caixa abs" style="right:32px;top:24px;display:flex;gap:14px;align-items:center;padding:12px 18px">${ic("sino", 24)}<div style="font-size:15.5px;line-height:1.35"><b>6 lembretes enviados sozinhos</b><br><span class="nota">nenhuma mensagem digitada pela equipe</span></div></div>`,
  );
  entra(resumo, f(3, 0.15), { d: 0.6, y: -10 });
}

// 4. Ficha e termo ----------------------------------------------------------
function termo(palco, { f, fim, pal, ini }) {
  const cab = cabeca(palco, "Ficha e termo", "Tudo assinado no celular, antes de chegar.");
  const tr = trilha(palco, 2);
  entra(cab, ini + 0.05, { d: 0.8 });
  entra(tr, ini + 0.2, { d: 0.8, y: 0 });

  const cel = celular(palco, { x: 150, y: 232, hora: "19:40" });
  const perguntas = [
    ["Está grávida ou amamentando?", "Não"],
    ["Tem alergia a algum medicamento?", "Não"],
    ["Usa anticoagulante?", "Não"],
    ["Fez algum procedimento nos últimos 6 meses?", "Sim"],
    ["Tem alguma doença autoimune?", "Não"],
  ];
  const ficha = tela(
    cel,
    `<div class="a-topo"><img src="${LOGO}" alt=""><div class="a-avatar">MS</div></div>
     <div class="a-t">Ficha de saúde</div><div class="a-sub">Leva dois minutos. Só a equipe que te atende vê.</div>
     <div>${perguntas.map(([p]) => `<div class="a-pergunta"><span>${p}</span><span class="a-simnao"><span data-r="Sim">Sim</span><span data-r="Não">Não</span></span></div>`).join("")}</div>
     <div class="a-bt" style="margin-top:auto" data-alvo="seguir">Continuar</div>`,
  );
  const termoT = tela(
    cel,
    `<div class="a-topo"><img src="${LOGO}" alt=""><div class="a-avatar">MS</div></div>
     <div class="a-t">Termo de consentimento</div>
     <div class="a-card" style="font-size:13px;line-height:1.5;color:var(--tinta-2)">Toxina botulínica. Fui informada sobre o procedimento, os cuidados antes e depois, os efeitos esperados e os possíveis efeitos adversos, e tive minhas dúvidas respondidas pela Dra. Cláudia.</div>
     <div class="a-linha" style="font-size:14px">${okA()} Li e concordo com o termo</div>
     <div class="a-card" style="padding:6px 10px;height:118px;position:relative"><span class="a-rotulo" style="position:absolute;left:12px;top:8px">Assine aqui</span>
       <svg viewBox="0 0 300 100" style="width:100%;height:100%"><path data-ass fill="none" stroke="#2a171c" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" d="M30 70 C 40 30, 52 28, 50 62 C 48 80, 62 40, 72 44 C 80 48, 70 70, 84 66 C 98 62, 100 40, 112 46 C 122 52, 108 72, 124 68 C 140 64, 146 36, 150 40 C 154 46, 148 70, 160 66 C 176 60, 182 44, 196 52 C 206 58, 200 70, 214 66 C 232 60, 250 52, 272 50"/></svg></div>
     <div class="a-bt" data-alvo="assinar" style="margin-top:auto">Assinar termo</div>
     <div class="a-card" data-ok style="position:absolute;left:18px;right:18px;bottom:78px;display:flex;gap:10px;align-items:center;background:var(--salvia-clara);border-color:transparent">${okA()}<div><h4>Termo assinado</h4><p style="margin:0">21 de outubro, às 19h42</p></div></div>`,
    "coberta",
  );
  const imagem = tela(
    cel,
    `<div class="a-topo"><img src="${LOGO}" alt=""><div class="a-avatar">MS</div></div>
     <div class="a-t">Uso da sua imagem</div><div class="a-sub">Cada uso é uma escolha separada.</div>
     <div class="a-card" style="display:flex;gap:12px;align-items:center"><div style="flex:1"><h4>No meu prontuário</h4><p>Para acompanhar a minha evolução. Só a equipe vê.</p></div><span class="a-chave" data-ch="pront"></span></div>
     <div class="a-card" style="display:flex;gap:12px;align-items:center"><div style="flex:1"><h4>Nas redes da clínica</h4><p>Antes e depois em posts e stories.</p></div><span class="a-chave" data-ch="redes"></span></div>
     <div class="a-card" data-mudar style="background:var(--app-suave);border-color:transparent"><p style="margin:0;color:var(--tinta)">Você pode mudar essas escolhas quando quiser, no seu perfil.</p></div>`,
    "coberta",
  );
  entra(cel, ini + 0.3, { d: 0.9, y: 60 });

  // Respostas da ficha, uma a uma.
  perguntas.forEach(([, r], i) => {
    const alvo = $$(ficha, ".a-simnao")[i].querySelector(`[data-r='${r}']`);
    const t = f(0, 0.12 + i * 0.065);
    liga(alvo, "sel", t);
    aperta(alvo, t);
  });
  const tFicha = f(0, 0.47);
  toque($(ficha, "[data-alvo=seguir]"), tFicha);
  troca(ficha, termoT, tFicha + 0.25);
  traca($(termoT, "[data-ass]"), f(0, 0.62), 1.4);
  const tAss = fim(0) - 0.25;
  toque($(termoT, "[data-alvo=assinar]"), tAss);
  entra($(termoT, "[data-ok]"), tAss + 0.25, { d: 0.45, y: 14 });

  troca(termoT, imagem, f(1, 0.02));
  const pront = $(imagem, "[data-ch=pront]");
  toque(pront, pal(1, "imagem", 0.4));
  liga(pront, "on", pal(1, "imagem", 0.4));
  const mudar = $(imagem, "[data-mudar]");
  vai(mudar, "s", 1.04, pal(1, "mudar") - 0.1, 0.3);
  vai(mudar, "s", 1, pal(1, "quando quiser", 1), 0.4, "vaivem");

  // Ficha da paciente no painel, preenchendo sozinha.
  const jan = janela(palco, { x: 620, y: 232, w: 1180, h: 712, ativo: "Pacientes" });
  const area = $(jan, ".area");
  no(
    area,
    `<div class="a-linha" style="gap:18px"><div class="a-avatar" style="width:72px;height:72px;font-size:24px;background:var(--rosa)">MS</div><div><h3>Marina Souza</h3><p class="sub">Amanhã, 14h30, toxina botulínica com a Dra. Cláudia</p></div></div>`,
  );
  const itens = no(area, `<div class="caixa" style="margin-top:26px;display:grid;gap:4px;padding:8px 22px"></div>`);
  const linhas = [
    ["doc", "Ficha de saúde", "Respondida pelo app", f(0, 0.5)],
    ["escudo", "Termo de consentimento", "Assinado em 21/10, às 19h42", tAss + 0.4],
    ["camera", "Uso de imagem", "Prontuário: sim. Redes sociais: não.", pal(1, "imagem", 0.6)],
  ].map(([i, t, s, quando]) => {
    const el = no(
      itens,
      `<div style="display:grid;grid-template-columns:44px 1fr auto;gap:14px;align-items:center;padding:16px 0;border-bottom:1px solid var(--linha)"><span style="color:var(--ameixa)">${ic(i, 26)}</span><div><b style="font-size:18px;font-weight:500">${t}</b><div class="nota" style="font-size:15px" data-s>Pendente</div></div><span class="pilula espera" data-p>Pendente</span></div>`,
    );
    escreve($(el, "[data-s]"), quando, s);
    escreve($(el, "[data-p]"), quando, "Pronto");
    liga($(el, "[data-p]"), "ok", quando);
    liga($(el, "[data-p]"), "espera", quando, false);
    aperta($(el, "[data-p]"), quando + 0.1);
    return el;
  });
  linhas.at(-1).style.borderBottom = "0";
  entra(jan, ini + 0.45, { d: 1, x: 80, y: 0 });

  const pronta = no(
    area,
    `<div class="a-linha" style="margin-top:22px;gap:16px;padding:20px 24px;border-radius:16px;background:var(--noite);color:var(--po)"><span class="ic-ok" style="width:34px;height:34px">${ic("ok", 18, 2.6)}</span><div style="flex:1"><b style="font-size:22px;font-weight:500">Pronta para o atendimento</b><div style="opacity:.75;font-size:15px">Nenhum papel para preencher na recepção</div></div><span class="pilula" style="background:rgba(255,255,255,.12);color:var(--rosa)">Chegou às 14h22</span></div>`,
  );
  entra(pronta, f(2, 0.1), { d: 0.7, y: 18 });
}

// 5. Prontuário -------------------------------------------------------------
function prontuario(palco, { f, fim, pal, ini }) {
  const cab = cabeca(palco, "Atendimento", "O registro completo da sessão, em um minuto.");
  const tr = trilha(palco, 3);
  entra(cab, ini + 0.05, { d: 0.8 });
  entra(tr, ini + 0.2, { d: 0.8, y: 0 });

  const jan = janela(palco, { x: 120, y: 232, w: 1680, h: 712, ativo: "Prontuários" });
  const area = $(jan, ".area");
  no(area, `<div><h3>Marina Souza</h3><p class="sub">Sessão de 22 de outubro, toxina botulínica, Dra. Cláudia</p></div>`);
  entra(jan, ini + 0.35, { d: 1, y: 40 });

  // Mapa do rosto com os pontos de aplicação.
  const pontos = [
    [112, 96, "f"], [150, 90, "f"], [188, 96, "f"],
    [140, 126, "g"], [160, 126, "g"], [150, 116, "g"],
    [76, 146, "p"], [79, 162, "p"], [224, 146, "p"], [221, 162, "p"],
  ];
  const mapa = no(
    area,
    `<div class="caixa abs" style="left:32px;top:110px;width:560px;height:520px;padding:14px 10px 18px;display:flex;flex-direction:column">
      <svg viewBox="-112 14 524 322" style="width:100%;flex:1;min-height:0" fill="none">
        <g stroke="#2a171c" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
          <path d="M150 22 C 96 22 64 62 64 126 C 64 196 86 262 118 306 C 132 326 168 326 182 306 C 214 262 236 196 236 126 C 236 62 204 22 150 22 Z"/>
          <path d="M92 130 Q 114 117 136 125"/><path d="M164 125 Q 186 117 208 130"/>
          <path d="M98 150 Q 115 140 132 150 Q 115 157 98 150 Z"/><path d="M168 150 Q 185 140 202 150 Q 185 157 168 150 Z"/>
          <path d="M147 150 C 145 172 141 188 138 197 Q 150 208 162 197"/>
          <path d="M122 238 Q 136 229 150 234 Q 164 229 178 238"/><path d="M122 238 Q 150 257 178 238"/>
        </g>
        ${pontos.map(([x, y, g]) => `<g data-g="${g}" style="transform-box:fill-box;transform-origin:center"><circle cx="${x}" cy="${y}" r="7" fill="#8d5f6a" fill-opacity=".2" stroke="#8d5f6a" stroke-width="1.4"/><circle cx="${x}" cy="${y}" r="2.2" fill="#8d5f6a"/></g>`).join("")}
        <g font-family="Jost" font-size="13.5" fill="#2a171c">
          <g data-r="f"><path d="M104 96 H-20" stroke="#8d5f6a" stroke-width=".8" stroke-dasharray="2 3"/><text x="-26" y="100" text-anchor="end">Frontal, 12 U</text></g>
          <g data-r="g"><path d="M168 126 H326" stroke="#8d5f6a" stroke-width=".8" stroke-dasharray="2 3"/><text x="332" y="130">Glabela, 20 U</text></g>
          <g data-r="p"><path d="M68 154 H-20" stroke="#8d5f6a" stroke-width=".8" stroke-dasharray="2 3"/><text x="-26" y="150" text-anchor="end">Periorbital,</text><text x="-26" y="167" text-anchor="end">12 U por lado</text></g>
        </g>
      </svg>
      <div style="display:flex;gap:8px;justify-content:center">${[["f", "Frontal", "12 U"], ["g", "Glabela", "20 U"], ["p", "Periorbital", "24 U"]].map(([g, n, u]) => `<span class="pilula" data-chip="${g}" style="font-size:15px;padding:6px 14px">${n} <b style="font-weight:600;color:var(--tinta)">${u}</b></span>`).join("")}</div>
    </div>`,
  );
  entra(mapa, f(0, 0.5), { d: 0.7, y: 16 });
  const ordem = ["f", "g", "p"];
  $$(mapa, "[data-g]").forEach((p, i) => {
    const t = f(1, 0.03 + i * 0.03);
    entra(p, t, { d: 0.35, y: 0, s: 0.2, e: "volta" });
  });
  ordem.forEach((g, i) => {
    entra($(mapa, `[data-r='${g}']`), f(1, 0.18 + i * 0.07), { d: 0.45, y: 0, x: g === "g" ? -10 : 10 });
    entra($(mapa, `[data-chip='${g}']`), f(1, 0.22 + i * 0.07), { d: 0.4, y: 8 });
  });

  // Registro: produto, lote vindo do estoque e unidades.
  const reg = no(
    area,
    `<div class="abs" style="left:620px;top:110px;width:400px;display:grid;gap:14px">
      <div class="caixa"><div class="nota">Produto</div><b style="font-size:19px;font-weight:500">Toxina botulínica 100 U</b></div>
      <div class="caixa" data-lote style="position:relative"><div class="nota">Lote</div><b style="font-size:19px;font-weight:500" data-lote-txt>Escolher do estoque</b>
        <div data-menu class="caixa" style="position:absolute;left:-1px;right:-1px;top:calc(100% + 6px);box-shadow:0 24px 40px -20px rgba(42,23,28,.4);padding:8px;z-index:3">
          <div data-op style="padding:10px 12px;border-radius:10px;font-size:15.5px"><b style="font-weight:600">TB-4471</b><br><span class="nota">validade 03/2027, 7 frascos</span></div>
          <div style="padding:10px 12px;border-radius:10px;font-size:15.5px;color:var(--tinta-2)"><b style="font-weight:500">TB-4302</b><br><span class="nota">validade 11/2026, 2 frascos</span></div>
        </div></div>
      <div class="caixa"><div class="nota">Unidades aplicadas</div><b class="numero" style="font-size:56px" data-u>0</b></div>
      <div class="caixa"><div class="nota">Observações</div><span style="font-size:16px" data-obs></span></div>
    </div>`,
  );
  entra(reg, f(0, 0.65), { d: 0.7, y: 16 });
  conta($(reg, "[data-u]"), f(1, 0.05), (fim(1) - f(1)) * 0.45, 0, 56, (n) => `${Math.round(n)} U`);
  const menu = $(reg, "[data-menu]"), op = $(reg, "[data-op]");
  entra(menu, pal(1, "lote"), { d: 0.35, y: -6 });
  liga(op, "sel-op", pal(1, "estoque") - 0.2);
  op.style.setProperty("--x", "1");
  vai(op, "s", 0.97, pal(1, "estoque", 0.6), 0.1);
  vai(op, "s", 1, pal(1, "estoque", 0.6) + 0.1, 0.2);
  sai(menu, pal(1, "estoque", 0.8) + 0.1, { d: 0.3 });
  escreve($(reg, "[data-lote-txt]"), pal(1, "estoque", 0.8) + 0.1, "TB-4471, validade 03/2027");
  digita($(reg, "[data-obs]"), f(2, 0.0), "Sem intercorrências. Revisão em 15 dias.", 26);

  // Fotos com guia: mesmo enquadramento sempre.
  const fotos = no(
    area,
    `<div class="caixa abs" style="left:1048px;top:110px;width:370px;height:520px;display:flex;flex-direction:column;gap:12px">
      <div class="a-linha" style="color:var(--ameixa)">${ic("camera", 22)}<h5 style="color:var(--tinta)">Fotos da sessão</h5></div>
      <div style="position:relative;flex:1;border-radius:14px;background:linear-gradient(180deg,#3a2228,#2a171c);overflow:hidden">
        <svg viewBox="0 0 300 300" style="position:absolute;inset:0;width:100%;height:100%" fill="none">
          <ellipse cx="150" cy="140" rx="70" ry="92" stroke="#ecd3cc" stroke-width="2" stroke-dasharray="6 7"/>
          <path d="M150 20v22M150 238v22M20 140h22M258 140h22" stroke="#ecd3cc" stroke-opacity=".6"/>
        </svg>
        <span style="position:absolute;left:0;right:0;bottom:12px;text-align:center;color:var(--rosa);font-size:14.5px">Mesma distância, mesma luz</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
        ${["Frente", "45°", "Perfil"].map((t, i) => `<div data-foto style="text-align:center;font-size:13px;color:var(--tinta-2)"><div style="aspect-ratio:3/4;border-radius:10px;background:var(--nude);display:grid;place-items:center;margin-bottom:5px"><svg viewBox="0 0 60 80" width="46"><ellipse cx="${30 + [0, 4, 8][i]}" cy="34" rx="${[16, 14, 12][i]}" ry="21" fill="#c99a92" fill-opacity=".55"/><path d="M8 80c3-14 12-20 22-20s19 6 22 20" fill="#c99a92" fill-opacity=".4"/></svg></div>${t}</div>`).join("")}
      </div>
    </div>`,
  );
  entra(fotos, f(2, 0.02), { d: 0.6, x: 30, y: 0 });
  $$(fotos, "[data-foto]").forEach((el, i) => entra(el, pal(2, ["ângulo", "luz", "comparar"][i]), { d: 0.4, y: 10, s: 0.9 }));

  // Baixa automática no estoque.
  const est = no(
    palco,
    `<div class="caixa abs" style="left:1400px;top:220px;width:390px;display:flex;gap:14px;align-items:center;box-shadow:0 30px 60px -30px rgba(42,23,28,.5)"><span style="color:var(--ameixa)">${ic("caixa", 30)}</span><div style="flex:1"><b style="font-size:17px;font-weight:500">Estoque atualizado</b><div class="nota" style="font-size:15px">Toxina 100 U, lote TB-4471</div></div><span class="numero" style="font-size:44px" data-n>7</span></div>`,
  );
  entra(est, f(3, 0.05), { d: 0.55, y: -14 });
  conta($(est, "[data-n]"), f(3, 0.45), 0.5, 7, 6, (n) => `${Math.round(n)}`);
}

// 6. Pós --------------------------------------------------------------------
function pos(palco, { f, fim, pal, ini }) {
  const cab = cabeca(palco, "Pós-procedimento", "A paciente é acompanhada dia a dia, e a clínica fica sabendo na hora.");
  const tr = trilha(palco, 4);
  entra(cab, ini + 0.05, { d: 0.8 });
  entra(tr, ini + 0.2, { d: 0.8, y: 0 });

  const cel = celular(palco, { x: 150, y: 232, hora: "8:30" });
  const cuidados = tela(
    cel,
    `<div class="a-topo"><img src="${LOGO}" alt=""><div class="a-avatar">MS</div></div>
     <div class="a-t">Seus cuidados</div>
     <div class="a-chips" style="flex-wrap:nowrap">${[1, 2, 3, 4, 5, 6, 7].map((d) => `<div class="a-chip ${d === 1 ? "sel" : ""}" style="flex:1;padding:6px 0">Dia<b>${d}</b></div>`).join("")}</div>
     ${[["relogio", "Nas próximas 4 horas", "Evite deitar e abaixar a cabeça."], ["folha", "Hoje", "Não massageie a região aplicada."], ["sino", "Amanhã", "Exercícios intensos, só a partir de amanhã."]]
       .map(([i, t, p]) => `<div class="a-card" data-c style="display:flex;gap:12px"><span style="color:var(--ameixa);margin-top:2px">${ic(i, 22)}</span><div><h4>${t}</h4><p>${p}</p></div></div>`)
       .join("")}`,
  );
  const pergunta = tela(
    cel,
    `<div class="a-topo"><img src="${LOGO}" alt=""><div class="a-avatar">MS</div></div>
     <div class="a-t">Bom dia, Marina! Como você está hoje?</div><div class="a-sub">Dia 1 depois da sessão</div>
     <div class="a-bt leve" style="justify-content:flex-start;padding:0 18px">Tudo bem</div>
     <div class="a-bt leve" style="justify-content:flex-start;padding:0 18px">Um pouco inchado no local</div>
     <div class="a-bt leve" data-alvo="diferente" style="justify-content:flex-start;padding:0 18px">Algo diferente</div>
     <div class="a-card" data-resp style="background:var(--app-suave);border-color:transparent;margin-top:6px"><h4>A clínica já foi avisada.</h4><p>A Dra. Cláudia vai falar com você em instantes.</p></div>`,
    "coberta",
  );
  const aviso = no(
    $(cel, ".cel-tela"),
    `<div class="aviso"><span class="ic"><img src="${LOGO_BRANCO}" alt=""></span><div><b>Essenciale</b>Bom dia, Marina! Como você está hoje?</div></div>`,
  );
  entra(cel, ini + 0.3, { d: 0.9, y: 60 });
  $$(cuidados, "[data-c]").forEach((c, i) => entra(c, f(0, 0.3 + i * 0.16), { d: 0.5, y: 14 }));
  const tAv = pal(1, "pergunta", -0.4);
  entra(aviso, tAv, { d: 0.5, y: -40 });
  toque(aviso, pal(1, "como", 0.5));
  sai(aviso, pal(1, "como", 0.5) + 0.2, { d: 0.3, y: -30 });
  troca(cuidados, pergunta, pal(1, "como", 0.5) + 0.25);
  const tDif = pal(2, "diferente", 0.3);
  const dif = $(pergunta, "[data-alvo=diferente]");
  toque(dif, tDif);
  liga(dif, "sel-dif", tDif);
  vai(dif, "o", 1, 0, 0.01);
  entra($(pergunta, "[data-resp]"), tDif + 0.5, { d: 0.5, y: 12 });

  // No painel, as respostas do pós chegam; a da Marina vira alerta.
  const jan = janela(palco, { x: 620, y: 232, w: 1180, h: 712, ativo: "Hoje" });
  const area = $(jan, ".area");
  no(area, `<div><h3>Pós em acompanhamento</h3><p class="sub">Sexta, 23 de outubro, 8h30</p></div>`);
  const respostas = no(area, `<div class="caixa" style="margin-top:22px;padding:6px 22px"></div>`);
  const rs = [
    ["Ana Paula S.", "Bioestimulador, dia 1", "Tudo bem"],
    ["Júlia R.", "Preenchimento labial, dia 1", "Tudo bem"],
    ["Marina Souza", "Toxina botulínica, dia 1", "Aguardando"],
    ["Rita F.", "Limpeza de pele, dia 1", "Tudo bem"],
  ].map(([n, p, s], i, arr) =>
    no(
      respostas,
      `<div style="display:grid;grid-template-columns:1fr auto;align-items:center;padding:14px 0;${i < arr.length - 1 ? "border-bottom:1px solid var(--linha)" : ""}"><span style="font-size:17px">${n}<br><span class="nota" style="font-size:14.5px">${p}</span></span><span class="pilula ${s === "Tudo bem" ? "ok" : ""}" data-p>${s}</span></div>`,
    ),
  );
  entra(jan, ini + 0.45, { d: 1, x: 80, y: 0 });
  rs.forEach((r, i) => i !== 2 && entra($(r, "[data-p]"), f(1, 0.25 + i * 0.12), { d: 0.4, y: 0, s: 0.8 }));
  const pm = $(rs[2], "[data-p]");
  const tAlerta = pal(2, "alerta", 0);
  escreve(pm, tDif + 0.3, "Algo diferente");
  liga(pm, "alerta", tDif + 0.3);

  const alerta = no(
    area,
    `<div class="cartao-alerta vermelho" style="margin-top:20px;border-color:var(--alerta);box-shadow:0 20px 40px -24px rgba(164,72,58,.55)"><span class="ic">${ic("alerta", 26)}</span><div><b>Marina Souza relatou algo diferente</b><small>Toxina botulínica, dia 1 do pós. Resposta enviada às 8h31.</small></div><div style="display:flex;gap:8px"><span class="acao" data-ligar style="background:var(--alerta);color:#fff;border-color:var(--alerta)">${"Ligar agora"}</span><span class="acao">WhatsApp</span></div></div>`,
  );
  entra(alerta, tAlerta - 0.2, { d: 0.6, y: 20, s: 0.96 });
  aperta($(alerta, "[data-ligar]"), pal(2, "chamar", 0.5));
}

// 7. Retorno ----------------------------------------------------------------
function retorno(palco, { f, fim, pal, ini }) {
  const cab = cabeca(palco, "Retorno", "Cada etapa termina com o próximo passo já combinado.");
  const tr = trilha(palco, 5);
  entra(cab, ini + 0.05, { d: 0.8 });
  entra(tr, ini + 0.2, { d: 0.8, y: 0 });

  const etapas = [
    ["22 de outubro", "Sessão", "Toxina botulínica com a Dra. Cláudia"],
    ["6 de novembro", "Revisão de 15 dias", "Marcada no dia da sessão"],
    ["6 de novembro", "Avaliação no Google", "Pedido na hora certa, depois da revisão"],
    ["Janeiro", "Hora de renovar", "O app convida a Marina a voltar"],
  ];
  const X0 = 150, PASSO = 330;
  const base = no(palco, `<div class="abs" style="left:${X0 + 9}px;top:530px;width:${PASSO * 3}px;height:2px;background:var(--linha)"></div>`);
  const linha = no(palco, `<div class="abs" style="left:${X0 + 9}px;top:530px;width:${PASSO * 3}px;height:2px"><i style="display:block;height:100%;width:0;background:var(--ameixa)"></i></div>`);
  entra(base, ini + 0.4, { d: 0.6, y: 0 });
  const barra = linha.firstChild;
  const quando = [ini + 0.6, f(0, 0.1), f(1, 0.1), f(2, 0.15)];
  largura(barra, quando[0], 0.01, 0, 0);
  for (let i = 1; i < 4; i++) {
    pista(barra, "w");
    vai(barra, "w", (i / 3) * 100, quando[i] - 0.2, 0.9, "vaivem");
  }
  etapas.forEach(([d, t, s], i) => {
    const el = no(
      palco,
      `<div class="abs" style="left:${X0 + i * PASSO}px;top:410px;width:300px">
        <span class="marco" style="margin:0 0 38px -23px">${ic(["agenda", "ok", "estrela", "sino"][i], 28, 1.5)}</span>
        <span data-p style="display:block;width:18px;height:18px;border-radius:50%;background:var(--po);border:2px solid var(--ameixa)"></span>
        <div class="nota" style="margin-top:22px;font-size:17px">${d}</div>
        <div style="font-family:var(--display);font-size:36px;font-weight:500;line-height:1.05;margin-top:6px">${t}</div>
        <div style="font-size:17px;color:var(--tinta-2);margin-top:8px;max-width:15em">${s}</div>
      </div>`,
    );
    entra(el, quando[i] + 0.3, { d: 0.6, y: 18 });
    liga($(el, "[data-p]"), "feito", quando[i] + 0.4);
    const p = $(el, "[data-p]");
    vai(p, "s", 1.35, quando[i] + 0.35, 0.25);
    vai(p, "s", 1, quando[i] + 0.6, 0.4, "volta");
  });
  const fecho = no(
    palco,
    `<div class="abs a-linha" style="left:150px;top:810px;font-size:20px;color:var(--tinta);gap:12px">${okP()} Próximo passo sempre combinado</div>`,
  );
  entra(fecho, f(3, 0.3), { d: 0.6, y: 10 });

  // O celular mostra cada etapa do lado da paciente.
  const cel = celular(palco, { x: 1440, y: 232, hora: "14:10" });
  const t1 = tela(
    cel,
    `<div class="a-topo"><img src="${LOGO}" alt=""><div class="a-avatar">MS</div></div>
     <div class="a-t">Próximos passos</div>
     <div class="a-card" style="display:flex;gap:12px;align-items:center"><span style="color:var(--ameixa)">${ic("agenda", 24)}</span><div style="flex:1"><h4>Revisão de 15 dias</h4><p>Sexta, 6 de novembro, 14h30</p></div>${okA()}</div>
     <div class="a-card" style="display:flex;gap:12px;align-items:center;opacity:.6"><span style="color:var(--ameixa)">${ic("folha", 24)}</span><div><h4>Cuidados do pós</h4><p>Dia 7 de 7 concluído</p></div></div>`,
  );
  const t2 = tela(
    cel,
    `<div class="a-topo"><img src="${LOGO}" alt=""><div class="a-avatar">MS</div></div>
     <div class="a-t">Como foi a sua experiência?</div><div class="a-sub">Sua opinião ajuda outras pacientes a conhecerem a Essenciale.</div>
     <div style="display:flex;gap:8px;justify-content:center;margin:14px 0;color:var(--champanhe)">${[0, 1, 2, 3, 4].map(() => `<span data-e style="display:block">${ic("estrela", 40, 1.4)}</span>`).join("")}</div>
     <div class="a-bt">Avaliar no Google</div>`,
    "coberta",
  );
  const t3 = tela(
    cel,
    `<div class="a-topo"><img src="${LOGO}" alt=""><div class="a-avatar">MS</div></div>
     <div class="a-t">Faz quase 3 meses da sua sessão</div><div class="a-sub">É o momento em que o efeito começa a diminuir. Quer garantir o seu horário?</div>
     <div class="a-chips" style="flex-wrap:nowrap">${[["Ter", 19], ["Qua", 20], ["Qui", 21]].map(([d, n], i) => `<div class="a-chip ${i === 1 ? "sel" : ""}" style="flex:1">${d}<b>${n}</b></div>`).join("")}</div>
     <div class="a-sub" style="text-align:center">janeiro de 2027</div>
     <div class="a-bt" data-alvo="ag" style="margin-top:auto">Agendar minha sessão</div>`,
    "coberta",
  );
  entra(cel, ini + 0.35, { d: 0.9, y: 60 });
  troca(t1, t2, f(1, 0.05));
  $$(t2, "[data-e]").forEach((e, i) => {
    const t = f(1, 0.4 + i * 0.07);
    e.style.color = "var(--linha)";
    liga(e, "cheia", t);
    vai(e, "s", 1.25, t, 0.15);
    vai(e, "s", 1, t + 0.15, 0.3, "volta");
  });
  troca(t2, t3, f(2, 0.08));
  toque($(t3, "[data-alvo=ag]"), fim(2) - 0.2);
}

// 8. Bastidores -------------------------------------------------------------
function bastidores(palco, { f, fim, pal, ini }) {
  const cab = cabeca(palco, "Nos bastidores", "Pacotes, estoque, lotes e comissões se resolvem sozinhos.");
  entra(cab, ini + 0.05, { d: 0.8 });
  const jan = janela(palco, { x: 120, y: 232, w: 1680, h: 712, ativo: "Relatórios" });
  const area = $(jan, ".area");
  area.style.display = "grid";
  area.style.gridTemplateColumns = "1fr 1fr";
  area.style.gridTemplateRows = "1fr 1fr";
  area.style.gap = "18px";
  entra(jan, f(0, 0.2), { d: 1, y: 40 });

  const pacote = no(
    area,
    `<div class="caixa" style="display:flex;flex-direction:column;gap:14px">
      <div class="a-linha" style="color:var(--ameixa)">${ic("pacote", 24)}<h5 style="color:var(--tinta);font-size:18px">Pacotes</h5></div>
      <div style="font-size:17px">Paula T., protocolo Pele de Rainha</div>
      <div style="display:flex;gap:10px">${[0, 1, 2, 3, 4].map((i) => `<span data-s style="flex:1;height:14px;border-radius:99px;background:${i < 3 ? "var(--ameixa)" : "var(--nude)"}"></span>`).join("")}</div>
      <div style="display:flex;justify-content:space-between;align-items:center"><span class="numero" style="font-size:46px" data-n>3 de 5</span><span class="pilula" data-app>No app dela: 2 sessões restantes</span></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">${["24/09", "01/10", "08/10"].map((d) => `<span class="pilula">${d}</span>`).join("")}<span class="pilula" data-nova style="background:var(--noite);color:var(--po)">22/10, hoje</span></div>
    </div>`,
  );
  const estoque = no(
    area,
    `<div class="caixa" style="display:flex;flex-direction:column;gap:6px">
      <div class="a-linha" style="color:var(--ameixa)">${ic("caixa", 24)}<h5 style="color:var(--tinta);font-size:18px">Estoque</h5></div>
      ${[["Ácido hialurônico 1 ml", "4 unidades", "Vence em 24 dias", "espera"], ["Toxina botulínica 100 U", "6 frascos", "Em dia", "ok"], ["Bioestimulador", "3 frascos", "Em dia", "ok"], ["Ponteiras descartáveis", "40 unidades", "Em dia", "ok"]]
        .map(([n, q, s, c]) => `<div data-l style="display:grid;grid-template-columns:1fr 120px 150px;gap:10px;align-items:center;padding:9px 0;border-bottom:1px solid var(--linha);font-size:16px"><span>${n}</span><span class="nota" style="font-size:15px">${q}</span><span class="pilula ${c}" style="justify-self:end">${s}</span></div>`)
        .join("")}
    </div>`,
  );
  const lote = no(
    area,
    `<div class="caixa" style="display:flex;flex-direction:column;gap:10px;border-color:var(--alerta)">
      <div class="a-linha" style="color:var(--alerta)">${ic("etiqueta", 24)}<h5 style="color:var(--tinta);font-size:18px">Lote AH-2291 em alerta</h5><span class="pilula alerta" style="margin-left:auto">Rastreio</span></div>
      <div class="nota" style="font-size:15px">Quem recebeu este lote</div>
      ${[["Júlia R.", "Preenchimento labial, 22/10"], ["Luiza M.", "Preenchimento labial, 14/10"], ["Camila D.", "Bigode chinês, 9/10"]]
        .map(([n, p]) => `<div data-l class="a-linha" style="font-size:16.5px;justify-content:space-between;padding:4px 0"><span>${n} <span class="nota">${p}</span></span>${ic("tel", 18)}</div>`)
        .join("")}
    </div>`,
  );
  const comissao = no(
    area,
    `<div class="caixa" style="display:flex;flex-direction:column;gap:8px">
      <div class="a-linha" style="color:var(--ameixa)">${ic("grafico", 24)}<h5 style="color:var(--tinta);font-size:18px">Comissões de outubro</h5></div>
      ${[["Dra. Cláudia", "48 atendimentos"], ["Bianca", "61 atendimentos"], ["Lara", "37 atendimentos"]]
        .map(([n, q]) => `<div data-l style="display:grid;grid-template-columns:1fr 170px auto;gap:10px;align-items:center;padding:9px 0;border-bottom:1px solid var(--linha);font-size:16.5px"><span>${n}</span><span class="nota" style="font-size:15px">${q}</span><span class="pilula ok" data-calc>Calculada</span></div>`)
        .join("")}
      <div class="nota" style="font-size:15px;margin-top:4px">Fechamento em 31/10, direto do registro de cada sessão.</div>
    </div>`,
  );
  const tiles = [pacote, estoque, lote, comissao];
  tiles.forEach((t, i) => entra(t, f(i + 1, 0.0) - 0.1, { d: 0.6, y: 20 }));

  // Pacote: a quarta sessão é descontada e o app da paciente acompanha.
  const s4 = $$(pacote, "[data-s]")[3];
  const tP = pal(1, "desconta", 0.3);
  s4.style.background = "var(--nude)";
  const cor = document.createElement("i");
  cor.style.cssText = "display:block;height:100%;width:0;border-radius:99px;background:var(--ameixa)";
  s4.appendChild(cor);
  largura(cor, tP, 0.6, 0, 100);
  escreve($(pacote, "[data-n]"), tP + 0.3, "4 de 5");
  entra($(pacote, "[data-nova]"), tP + 0.1, { d: 0.45, y: 0, s: 0.8, e: "volta" });
  escreve($(pacote, "[data-app]"), pal(1, "saldo"), "No app dela: 1 sessão restante");
  vai($(pacote, "[data-app]"), "s", 1.08, pal(1, "saldo"), 0.2);
  vai($(pacote, "[data-app]"), "s", 1, pal(1, "saldo") + 0.25, 0.4, "volta");

  // Estoque: o que vence logo pulsa.
  const vence = $$(estoque, "[data-l]")[0];
  liga(vence, "destaque-v", pal(2, "vencer", -0.3));
  vai(vence, "s", 1.03, pal(2, "vencer", -0.3), 0.3);
  vai(vence, "s", 1, pal(2, "vencer", 0.5), 0.4, "vaivem");

  // Lote: as pacientes aparecem uma a uma.
  $$(lote, "[data-l]").forEach((l, i) => entra(l, pal(3, "quem recebeu") + i * 0.18, { d: 0.4, x: -12, y: 0 }));

  // Comissões: calculadas em sequência.
  $$(comissao, "[data-calc]").forEach((c, i) => entra(c, pal(4, "calculadas") + i * 0.15, { d: 0.35, y: 0, s: 0.8 }));
}

// 9. Painel do dia e do mês -------------------------------------------------
function painel(palco, { f, fim, pal, ini }) {
  const cab = cabeca(palco, "O painel da equipe", "O dia começa pelo que precisa de atenção.");
  entra(cab, ini + 0.05, { d: 0.8 });
  const jan = janela(palco, { x: 120, y: 232, w: 1680, h: 712, ativo: "Hoje" });
  const area = $(jan, ".area");
  entra(jan, ini + 0.3, { d: 1, y: 40 });
  no(area, `<div><h3>Bom dia, equipe</h3><p class="sub">Sexta, 23 de outubro</p></div>`);
  const col = no(area, `<div class="abs" style="left:32px;top:120px;width:700px"><h5 style="font-size:18px;margin-bottom:14px">Precisa de atenção hoje</h5><div class="cartoes"></div></div>`);
  const cards = [
    ["vermelho", "alerta", "Marina Souza relatou algo no pós", "Toxina botulínica, dia 1", "Ligar", "paciente"],
    ["ambar", "agenda", "4 revisões de 15 dias sem horário", "Sessões entre 8 e 12 de outubro", "Ver lista", "revisões"],
    ["ambar", "doc", "2 termos pendentes para hoje", "Pacientes das 15h e das 17h", "Reenviar", "termos"],
  ].map(([c, i, t, s, a, palavra]) => {
    const el = no($(col, ".cartoes"), `<div class="cartao-alerta ${c}"><span class="ic">${ic(i, 26)}</span><div><b>${t}</b><small>${s}</small></div><span class="acao">${a}</span></div>`);
    entra(el, pal(0, palavra, -0.1), { d: 0.55, x: -20, y: 0 });
    return el;
  });

  const mes = no(
    area,
    `<div class="abs" style="left:770px;top:120px;right:32px">
      <h5 style="font-size:18px;margin-bottom:14px">Outubro em números</h5>
      <div style="display:grid;gap:14px"></div>
      <p class="nota" style="margin-top:14px">Números ilustrativos.</p>
    </div>`,
  );
  const grade = $(mes, "div");
  [
    ["Ocupação da agenda", 86, "%", "ocupação"],
    ["Faltas", 4, "%", "faltas"],
    ["Pacientes que voltaram", 71, "%", "voltaram"],
  ].forEach(([t, n, u, palavra]) => {
    const el = no(
      grade,
      `<div class="caixa" style="display:grid;grid-template-columns:1fr auto;align-items:center;gap:8px 20px;padding:16px 22px"><span style="font-size:18px">${t}</span><span class="numero" style="font-size:62px" data-n>0${u}</span><div class="barra-p" style="grid-column:1/-1"><i data-b></i></div></div>`,
    );
    const t0 = pal(1, palavra, -0.2);
    entra(el, t0 - 0.15, { d: 0.5, y: 14 });
    conta($(el, "[data-n]"), t0, 1.1, 0, n, (v) => `${Math.round(v)}${u}`);
    largura($(el, "[data-b]"), t0, 1.1, 0, n);
  });
  entra(mes, f(1, 0) - 0.3, { d: 0.5, y: 0 });
}

// 10. Com a cara da Essenciale ------------------------------------------------
function marca(palco, { f, fim, pal, ini }) {
  const titulo = no(
    palco,
    `<div class="abs" style="left:0;right:0;top:70px;text-align:center"><h2 style="font-family:var(--display);font-weight:400;font-size:64px;color:var(--po)">Com a cara da Essenciale.</h2></div>`,
  );
  entra(titulo, f(0, 0.15), { d: 0.9, y: 20 });

  // À esquerda, a tela inicial do celular da paciente, com o ícone da clínica entre os outros apps.
  const casa = celular(palco, { x: 530, y: 190, escala: 0.86 });
  $(casa, ".cel-tela").style.background = "linear-gradient(165deg, #d9b3aa 0%, #a9757f 45%, #4a2a31 100%)";
  const apps = [
    ["agenda", "Calendário", "#5d6f86"], ["camera", "Câmera", "#4b4f57"], ["conversa", "Mensagens", "#3f7d5c"], ["relogio", "Relógio", "#2f2f35"],
    ["grafico", "Banco", "#7a5a2e"], ["folha", "Saúde", "#a24d5b"], ["doc", "Notas", "#a8862c"], ["estrela", "Favoritos", "#6a5a8a"],
    ["essenciale", "Essenciale", ""], ["sino", "Lembretes", "#8a4b52"], ["pessoa", "Contatos", "#5e6b62"], ["seta", "Mapas", "#3e6d8a"],
  ];
  const grade = no(
    $(casa, ".cel-tela"),
    `<div class="abs" style="left:22px;right:22px;top:76px;display:grid;grid-template-columns:repeat(4,1fr);row-gap:22px;justify-items:center">
      ${apps
        .map(([i, nome, cor]) =>
          i === "essenciale"
            ? `<div data-app="ess" style="display:grid;justify-items:center;gap:6px"><span style="width:62px;height:62px;border-radius:16px;background:var(--noite);display:grid;place-items:center;box-shadow:0 6px 16px -6px rgba(0,0,0,.5)"><span style="width:40px;height:40px;border:1.5px solid var(--rosa);display:grid;place-items:center;font-family:var(--display);font-size:30px;line-height:1;color:var(--rosa)">E</span></span><span data-rotulo style="font-size:12px;color:#fff;font-weight:500">Essenciale</span></div>`
            : `<div style="display:grid;justify-items:center;gap:6px"><span style="width:62px;height:62px;border-radius:16px;background:${cor};display:grid;place-items:center;color:#fff;opacity:.92">${ic(i, 28, 1.6)}</span><span style="font-size:12px;color:#fff;opacity:.9">${nome}</span></div>`,
        )
        .join("")}
    </div>`,
  );
  $(casa, ".status").style.color = "#fff";
  no(
    $(casa, ".cel-tela"),
    `<div class="abs" style="left:14px;right:14px;bottom:14px;height:88px;border-radius:30px;background:rgba(255,255,255,.18);display:flex;justify-content:space-around;align-items:center">${["tel", "conversa", "camera", "agenda"].map((i) => `<span style="width:58px;height:58px;border-radius:15px;background:rgba(255,255,255,.85);display:grid;place-items:center;color:#4a2a31">${ic(i, 26, 1.6)}</span>`).join("")}</div>`,
  );

  // À direita, o aplicativo aberto.
  const app = celular(palco, { x: 1030, y: 190, escala: 0.86 });
  inicio(app);

  const rotulos = [
    [530, "Na tela do celular"],
    [1030, "O aplicativo da Essenciale"],
  ].map(([x, t]) => no(palco, `<div class="abs" style="left:${x}px;width:360px;top:884px;text-align:center;font-size:24px;font-weight:300;color:var(--rosa)">${t}</div>`));

  entra(app, f(0, 0.1), { d: 0.9, y: 60 });
  entra(rotulos[1], f(0, 0.4), { d: 0.6, y: 10 });
  entra(casa, f(0, 0.35), { d: 0.9, x: 120, y: 0 });
  entra(rotulos[0], f(0, 0.6), { d: 0.6, y: 10 });

  // "o nome, o logo e as cores": o nome no ícone, o logo no app e a paleta da marca.
  const icone = $(grade, "[data-app=ess]");
  const rotuloIcone = $(icone, "[data-rotulo]");
  vai(rotuloIcone, "s", 1.25, pal(1, "nome") - 0.1, 0.3, "suave");
  vai(rotuloIcone, "s", 1, pal(1, "nome") + 0.35, 0.4, "vaivem");
  const logo = $(app, ".a-topo img");
  vai(logo, "s", 1.15, pal(1, "logo") - 0.1, 0.35, "suave");
  vai(logo, "s", 1, pal(1, "logo") + 0.35, 0.5, "vaivem");
  const cores = no(
    palco,
    `<div class="abs" style="left:0;right:0;top:168px;display:flex;justify-content:center;gap:12px">${["#2a171c", "#8d5f6a", "#c99a92", "#ecd3cc", "#f4e8e2", "#c9a46c"].map((c) => `<span style="width:24px;height:24px;border-radius:50%;background:${c};box-shadow:0 0 0 1px rgba(255,255,255,.25)"></span>`).join("")}</div>`,
  );
  [...cores.children].forEach((s, i) => entra(s, pal(1, "cores") - 0.2 + i * 0.07, { d: 0.5, y: 8 }));

  // "fica na tela do celular": o ícone da clínica se destaca e é tocado.
  const tIcone = pal(1, "tela do celular");
  vai(icone, "s", 1.18, tIcone, 0.35, "volta");
  vai(icone, "s", 1, tIcone + 0.9, 0.5, "vaivem");
  toque($(icone, "span"), pal(1, "outros aplicativos", 0.6));
}

// 11. Fechamento ------------------------------------------------------------
function fechamento(palco, { f, fim, pal, ini, fimCena }) {
  const foto = no(
    palco,
    `<div class="abs" style="left:190px;top:170px;width:560px;height:740px;border-radius:280px 280px 18px 18px;overflow:hidden;box-shadow:0 0 0 1px rgba(201,164,108,.5), 0 50px 90px -40px rgba(0,0,0,.6)"><div style="position:absolute;inset:0;background:url(recursos/essenciale-recepcao.jpg) center/cover"></div></div>`,
  );
  entra(foto, ini - 0.2, { d: 1.4, y: 30 });
  const img = foto.firstChild;
  pista(img, "s", 1.08);
  vai(img, "s", 1, ini - 0.2, fimCena - ini + 1, "linear");

  const frases = no(
    palco,
    `<div class="abs" style="left:880px;top:250px;width:880px;display:flex;flex-direction:column;gap:30px">
      <p data-i style="font-family:var(--display);font-size:68px;line-height:1.05;color:var(--po)">Menos tempo com planilhas e mensagens.</p>
      <p data-i style="font-family:var(--display);font-size:68px;line-height:1.05;color:var(--rosa)">Mais tempo para cuidar de quem está na cadeira.</p>
      <div data-i style="margin-top:40px;display:flex;flex-direction:column;gap:22px"><span style="width:120px;height:1px;background:var(--champanhe)"></span><img src="${LOGO_BRANCO}" alt="" style="width:420px"><span style="font-size:28px;font-weight:300;color:var(--rosa)">O aplicativo com a cara da sua clínica.</span></div>
    </div>`,
  );
  $$(frases, "[data-i]").forEach((el, i) => entra(el, f(i, 0) - 0.15, { d: 0.9, y: 20 }));
}

window.montarCenas = montarCenas;
