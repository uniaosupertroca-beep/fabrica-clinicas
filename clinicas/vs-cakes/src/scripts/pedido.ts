// "Monte seu pedido": junta as escolhas da pessoa numa mensagem de WhatsApp pronta para a Vanessa.
// Não guarda nada, não envia nada para servidor: tudo acontece neste navegador.
interface Tam {
  id: string;
  nome: string;
  diametro: number;
  fatias: string;
  max: number;
  valor: { tradicional: number; especial: number };
}
interface Sab {
  id: string;
  nome: string;
  linha: "tradicional" | "especial";
  recheio: string;
}
interface Config {
  whatsapp: string;
  prazo: number;
  precos: boolean;
  retirada: { dias: number[]; de: number; ate: number }[];
  tamanhos: Tam[];
  sabores: Sab[];
  fotos: Record<string, string>;
}

const raiz = document.getElementById("construtor");
if (raiz) iniciar(raiz);

function iniciar(raiz: HTMLElement) {
  const cfg: Config = JSON.parse(raiz.dataset.config ?? "{}");
  raiz.hidden = false;

  const form = document.getElementById("pedido") as HTMLFormElement;
  const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
  const campos = form.elements as HTMLFormControlsCollection & Record<string, any>;

  const blocoBolo = $("bloco-bolo");
  const dicaProduto = $("dica-produto");
  const sugestao = $("sugestao");
  const recheio = $("recheio");
  const fotoRef = $("foto-ref");
  const avisoData = $("aviso-data");
  const campoEndereco = $("campo-endereco");
  const textoResumo = $("texto-resumo");
  const valorEl = document.getElementById("valor");
  const erro = $("erro");
  const enviar = $<HTMLAnchorElement>("enviar");
  const copiar = $<HTMLButtonElement>("copiar");
  const status = $("status");
  const dataInput = campos["data"] as HTMLInputElement;
  const horaSelect = campos["hora"] as HTMLSelectElement;

  const rotulos: Record<string, string> = {
    aniversario: "Aniversário",
    mesversario: "Mesversário",
    casamento: "Casamento ou evento",
    presente: "Presente",
    outro: "Outro momento",
    bolo: "Bolo",
    bento: "Bentô cake",
    docinhos: "Docinhos",
    varios: "Mais de uma coisa",
  };

  let escolheuTamanho = false;
  let fotoSelecionada = "";

  const radio = (nome: string) => (form.querySelector(`input[name="${nome}"]:checked`) as HTMLInputElement | null)?.value ?? "";
  const marcar = (nome: string, valor: string) => {
    const el = form.querySelector(`input[name="${nome}"][value="${valor}"]`) as HTMLInputElement | null;
    if (el) el.checked = true;
  };
  const texto = (nome: string) => String(campos[nome]?.value ?? "").trim();

  const z = (n: number) => String(n).padStart(2, "0");
  const iso = (d: Date) => `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`;
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const minimo = new Date(hoje);
  minimo.setDate(minimo.getDate() + cfg.prazo);
  dataInput.min = iso(minimo);
  const longa = (d: Date) => d.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" });
  const real = (n: number) => `R$ ${n.toLocaleString("pt-BR")}`;

  function lerData(): Date | null {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dataInput.value);
    return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null;
  }
  function janela(d: Date) {
    return cfg.retirada.find((r) => r.dias.includes(d.getDay()));
  }

  /** Horários de 30 em 30 minutos dentro da janela do dia. Devolve o aviso de data inválida, se houver. */
  function ajustarHorarios(): string {
    const d = lerData();
    const atual = horaSelect.value;
    horaSelect.replaceChildren();
    const opcao = (v: string, t: string) => {
      const o = document.createElement("option");
      o.value = v;
      o.textContent = t;
      return o;
    };
    if (!d) {
      horaSelect.append(opcao("", "Escolha a data primeiro"));
      horaSelect.disabled = true;
      return "";
    }
    if (d < minimo) {
      horaSelect.append(opcao("", "Escolha outra data"));
      horaSelect.disabled = true;
      return `A encomenda precisa de pelo menos ${cfg.prazo} dias de antecedência. A primeira data possível é ${longa(minimo)}.`;
    }
    const j = janela(d);
    if (!j) {
      horaSelect.append(opcao("", "Escolha outra data"));
      horaSelect.disabled = true;
      return "A VS Cakes não atende aos domingos. Escolha uma data de segunda a sábado.";
    }
    horaSelect.append(opcao("", "Escolha o horário"));
    for (let h = j.de; h < j.ate; h += 0.5) {
      const hora = `${z(Math.floor(h))}:${h % 1 ? "30" : "00"}`;
      horaSelect.append(opcao(hora, hora.replace(":00", "h").replace(":30", "h30")));
    }
    horaSelect.disabled = false;
    if ([...horaSelect.options].some((o) => o.value === atual)) horaSelect.value = atual;
    return "";
  }

  function tamanhoEscolhido(): Tam | undefined {
    return cfg.tamanhos.find((t) => t.id === radio("tamanho"));
  }
  function saborEscolhido(): Sab | undefined {
    return cfg.sabores.find((s) => s.id === texto("sabor"));
  }

  function atualizar() {
    const produto = radio("produto");
    const temBolo = produto === "bolo" || produto === "varios";
    blocoBolo.hidden = !temBolo;
    dicaProduto.hidden = produto === "bolo" || produto === "";
    dicaProduto.textContent =
      produto === "bento" || produto === "docinhos"
        ? "Bentô cakes e docinhos não têm tamanho nem sabor fixos: a Vanessa combina os detalhes com você no WhatsApp."
        : "Para o bolo, escolha o tamanho e o sabor. O que mais você quiser, a Vanessa combina no WhatsApp.";

    campoEndereco.hidden = radio("entrega") !== "entrega";

    // Sugestão de tamanho pela quantidade de pessoas (uma fatia por pessoa).
    const pessoas = Number(texto("pessoas"));
    if (pessoas > 0) {
      if (pessoas > 50) {
        sugestao.textContent = "Para mais de 50 pessoas, a Vanessa combina com você mais de um bolo ou um long cake pelo WhatsApp.";
      } else {
        const sug = cfg.tamanhos.find((t) => pessoas <= t.max)!;
        sugestao.textContent = `Para ${pessoas} ${pessoas === 1 ? "pessoa" : "pessoas"}, indicamos o ${sug.nome} (${sug.fatias} fatias).`;
        if (!escolheuTamanho) marcar("tamanho", sug.id);
      }
    } else {
      sugestao.textContent = "";
    }

    const sab = saborEscolhido();
    recheio.textContent = sab ? `${sab.recheio}. Linha ${sab.linha}.` : "";

    const aviso = ajustarHorarios();
    avisoData.textContent = aviso;
    avisoData.classList.toggle("erro-data", Boolean(aviso));

    montarResumo(temBolo, aviso);
  }

  function linhasDoPedido(temBolo: boolean) {
    const tam = tamanhoEscolhido();
    const sab = saborEscolhido();
    const d = lerData();
    const hora = horaSelect.value;
    const entrega = radio("entrega");
    const linhas: [string, string][] = [];
    const add = (k: string, v: string) => v && linhas.push([k, v]);

    add("Momento", rotulos[radio("momento")] ?? "");
    add("Quero", rotulos[radio("produto")] ?? "");
    if (temBolo) {
      add("Para", texto("pessoas") ? `${texto("pessoas")} pessoas` : "");
      add("Tamanho", tam ? `${tam.nome} (${tam.diametro} cm, ${tam.fatias} fatias)` : "");
      add("Sabor", sab ? `${sab.nome} (${sab.linha})` : "");
    }
    add("Decoração", texto("decoracao"));
    add("Referência", texto("referencia"));
    add("Foto do site", fotoSelecionada ? cfg.fotos[fotoSelecionada] : "");
    add("Data", d && d >= minimo && janela(d) ? longa(d) : "");
    add("Horário", hora);
    add("Forma", entrega === "entrega" ? `entrega${texto("endereco") ? ` em ${texto("endereco")}` : ""}` : "retirada");
    add("Nome", texto("nome"));
    return { linhas, tam, sab };
  }

  let mensagem = "";
  function montarResumo(temBolo: boolean, avisoData: string) {
    const { linhas, tam, sab } = linhasDoPedido(temBolo);

    textoResumo.replaceChildren();
    if (linhas.length === 0) {
      const p = document.createElement("p");
      p.className = "vazio";
      p.textContent = "Suas escolhas aparecem aqui conforme você responde.";
      textoResumo.append(p);
    } else {
      const dl = document.createElement("dl");
      for (const [k, v] of linhas) {
        const dt = document.createElement("dt");
        dt.textContent = k;
        const dd = document.createElement("dd");
        dd.textContent = v;
        const bloco = document.createElement("div");
        bloco.append(dt, dd);
        dl.append(bloco);
      }
      textoResumo.append(dl);
    }

    let valorBase = "";
    if (cfg.precos && temBolo && tam && sab) {
      valorBase = `Valor base do bolo: ${real(tam.valor[sab.linha])}. A decoração pode ter taxa à parte.`;
    }
    if (valorEl) {
      valorEl.hidden = !valorBase;
      valorEl.textContent = valorBase;
    }

    const faltas: string[] = [];
    if (temBolo && !tam) faltas.push("o tamanho");
    if (temBolo && !sab) faltas.push("o sabor");
    if (!lerData() || avisoData) faltas.push("uma data válida");
    erro.hidden = faltas.length === 0 || linhas.length === 0;
    erro.textContent = faltas.length ? `Para a Vanessa responder mais rápido, escolha ${faltas.join(", ").replace(/, ([^,]*)$/, " e $1")}. Você também pode enviar assim e completar no WhatsApp.` : "";

    const corpo = linhas.map(([k, v]) => `${k}: ${v}`).join("\n");
    mensagem =
      "Oi, Vanessa! Quero fazer uma encomenda na VS Cakes." +
      (corpo ? `\n\n${corpo}` : "") +
      (valorBase ? `\n\n${valorBase.replace("Valor base do bolo", "Valor base pelo cardápio")}` : "") +
      "\n\nPode me confirmar o valor final e a disponibilidade?";
    enviar.href = `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(mensagem)}`;
  }

  form.addEventListener("input", (e) => {
    const alvo = e.target as HTMLInputElement;
    if (alvo.name === "tamanho") escolheuTamanho = true;
    atualizar();
  });
  form.addEventListener("change", atualizar);
  form.addEventListener("submit", (e) => e.preventDefault());

  copiar.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(mensagem);
      status.textContent = "Mensagem copiada. Cole no WhatsApp da Vanessa.";
    } catch {
      status.textContent = "Não foi possível copiar. Use o botão verde para abrir o WhatsApp.";
    }
    window.setTimeout(() => (status.textContent = ""), 5000);
  });

  // Pré-preenchimento vindo de outras páginas: ?ref=foto&momento=aniversario&produto=bento
  const q = new URLSearchParams(location.search);
  const ref = q.get("ref") ?? "";
  if (cfg.fotos[ref]) {
    fotoSelecionada = ref;
    fotoRef.hidden = false;
    fotoRef.textContent = `Você está pedindo um bolo como o “${cfg.fotos[ref]}” da galeria. A Vanessa adapta ao seu tema e às suas cores.`;
  }
  if (rotulos[q.get("momento") ?? ""]) marcar("momento", q.get("momento")!);
  if (["bolo", "bento", "docinhos", "varios"].includes(q.get("produto") ?? "")) marcar("produto", q.get("produto")!);

  atualizar();
}
