// Tudo o que é do negócio fica aqui: contatos, regras de pedido e redes.
// Fontes (out/2026): Instagram @vscakes__, o link da bio (linktr.ee/vscakes__) e o cardápio em Canva dela.
// Campo com null ainda não foi informado: o site esconde o trecho e o build lista o que falta.

export const negocio = {
  nome: "VS Cakes",
  responsavel: "Vanessa Soares",
  responsavelCurto: "Vanessa",
  /** Endereço oficial do site (canônico, sitemap e prévia de link). Troque quando o domínio próprio apontar para cá. */
  endereco: "https://vs-cakes.pages.dev",
  /**
   * false = o site fica fora do Google (vitrine de demonstração, até a Vanessa aprovar).
   * Troque para true quando ela aprovar e o domínio próprio estiver no ar.
   */
  indexavel: false,
  cidade: "Itajaí",
  uf: "SC",
  area: "Itajaí e região",
  /** Só números, com país e DDD. */
  whatsapp: "5547996910291",
  whatsappVisivel: "(47) 99691-0291",
  instagram: "vscakes__",
  instagramUrl: "https://www.instagram.com/vscakes__/",
  anosDeMarca: 6,
  cnpj: null as string | null,
  /** Endereço de retirada ainda não é público: a Vanessa combina a retirada pelo WhatsApp. */
  enderecoRetirada: null as string | null,
  /** Antecedência mínima da encomenda, em dias (cardápio dela). */
  prazoMinimoDias: 4,
  /** Mostra a tabela de valores do cardápio. false esconde preços em todo o site. */
  mostrarPrecos: true,
  /** Mês em que os valores foram conferidos no cardápio publicado. */
  valoresConferidosEm: "outubro de 2026",
  pagamento: {
    formas: "Pix, dinheiro ou link de pagamento (consulte as taxas do link)",
    entrada: 50,
  },
  /** Dias da semana: 0 = domingo. Retirada só com agendamento. */
  retirada: [
    { dias: [1, 2, 3, 4, 5], de: 9, ate: 19, texto: "segunda a sexta, das 9h às 19h" },
    { dias: [6], de: 8, ate: 12, texto: "sábado, das 8h às 12h" },
  ],
  entrega: "Fazemos entregas. A taxa depende do endereço e é combinada pelo WhatsApp.",
  /** Cardápios em PDF que ela publica no Linktree. */
  cardapioCanva: "https://canva.link/c56xwc43l25ylva",
};

/** O que ainda não temos da Vanessa. O build lista isto. */
export function pendencias(): string[] {
  const falta: string[] = [];
  falta.push("Logo e monograma em vetor (o site usa um logotipo feito com a fonte do site)");
  falta.push("Cardápios completos de bentô cake e de docinhos (os PDFs do Linktree)");
  falta.push("Depoimentos de clientes, com autorização");
  falta.push("Fotos originais em alta resolução para a abertura de cada página");
  if (!negocio.enderecoRetirada) falta.push("Se ela quer divulgar o endereço de retirada");
  if (!negocio.cnpj) falta.push("CNPJ (para o rodapé), se ela quiser mostrar");
  return falta;
}

export function linkWhatsapp(texto?: string): string {
  const base = `https://wa.me/${negocio.whatsapp}`;
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base;
}

export const mensagemPadrao = "Oi, Vanessa! Vi o site da VS Cakes e quero fazer uma encomenda.";
