// Tudo o que é da clínica fica aqui: contatos, endereço, redes e responsável técnica.
// Fontes (out/2026): o site atual (fernandaprevedello.com) e o Instagram (@dranandaprevedello).
// Campo com null ainda não foi informado: o site esconde o trecho ou mostra "a preencher", e o
// build lista o que falta.

export interface Responsavel {
  /** Nome como deve aparecer no site. */
  nome: string | null;
  /** Profissão como deve aparecer, ex.: "Biomédica esteta". */
  profissao: string | null;
  /** Conselho e número. A publicidade em saúde exige o registro do(a) responsável técnico(a). */
  registro: string | null;
  /** true para responsável técnica, false para responsável técnico. */
  feminino: boolean | null;
}

export const clinica = {
  nome: "Nanda Prevedello",
  nomeCompleto: "Clínica Nanda Prevedello Estética Avançada",
  /** Endereço oficial do site (canônico, sitemap e prévia de link). Troque quando o domínio próprio apontar para cá. */
  endereco: "https://nanda-prevedello.pages.dev",
  cnpj: null as string | null,
  cidade: "Balneário Camboriú",
  uf: "SC",
  rua: "Rua Isidoro Caetano, 152, sala 02" as string | null,
  bairro: "Pioneiros" as string | null,
  cep: "88331-005" as string | null,
  /** Ficha no Google Maps (rota, fotos e avaliações). Não achamos a ficha da clínica em out/2026. */
  googleMaps: null as string | null,
  /** Nota e número de avaliações no Google, quando houver ficha. */
  avaliacoes: null as { nota: string; total: number } | null,
  /** A profissional à frente da clínica, como se apresenta no site e no Instagram. */
  profissional: {
    nome: "Dra. Nanda Prevedello",
    curto: "Dra. Nanda",
    profissao: "Biomédica",
    registro: "CRBM 64579",
    foto: "nanda-prevedello.png",
  },
  horarios: ["Segunda a sexta, das 10h às 19h"] as string[] | null,
  email: "fernanda@fernandaprevedello.com",
  whatsapp: {
    /** O número dos botões "Marcar consulta" do site atual e da bio do Instagram. */
    agenda: "5521997542205",
    /** O telefone de Balneário Camboriú, no contato do site atual. */
    local: "5547991505134",
    mensagem: "Olá, Dra. Nanda! Vim pelo site e gostaria de agendar uma avaliação.",
  },
  redes: {
    instagram: "https://www.instagram.com/dranandaprevedello/",
  },
  responsavel: {
    nome: "Dra. Nanda Prevedello",
    profissao: "Biomédica",
    registro: "CRBM 64579",
    feminino: true,
  } as Responsavel,
};

export const linkWhatsapp = (mensagem: string = clinica.whatsapp.mensagem, numero: string = clinica.whatsapp.agenda): string =>
  `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

/** Mensagem pronta para pedir avaliação de um tratamento ("de harmonização glútea"). */
export const mensagemPara = (assunto: string) => `Olá, Dra. Nanda! Vim pelo site e gostaria de agendar uma avaliação ${assunto}.`;

/** "(21) 99754-2205", a partir do número do WhatsApp. */
export const telefone = (numero: string = clinica.whatsapp.agenda): string => {
  const n = numero.replace(/^55/, "");
  return `(${n.slice(0, 2)}) ${n.slice(2, n.length - 4)}-${n.slice(-4)}`;
};

export const temEndereco = () => Boolean(clinica.rua && clinica.cep);

export const enderecoCompleto = () =>
  temEndereco() ? `${clinica.rua}, ${clinica.bairro ? `${clinica.bairro}, ` : ""}${clinica.cidade} (${clinica.uf}), CEP ${clinica.cep}` : null;

const destino = () => encodeURIComponent(`${clinica.rua?.replace(/, (?:sala|loja) \d+$/, "")}, ${clinica.cidade} - ${clinica.uf}, ${clinica.cep}`);
export const linkRotaGoogle = () => `https://www.google.com/maps/dir/?api=1&destination=${destino()}`;
export const linkRotaWaze = () => `https://waze.com/ul?q=${destino()}&navigate=yes`;

/** "Responsável técnica", "Responsável técnico" ou "Responsável técnico(a)". */
export const rotuloResponsavel = (r: Responsavel = clinica.responsavel) =>
  r.feminino === null ? "Responsável técnico(a)" : r.feminino ? "Responsável técnica" : "Responsável técnico";

/** O que a clínica ainda precisa mandar. Aparece no fim do build. */
export function pendencias(): string[] {
  const falta: string[] = [];
  const r = clinica.responsavel;
  if (!r.nome) falta.push("Nome do(a) responsável técnico(a) (responsavel.nome)");
  if (!r.registro) falta.push("Registro no conselho (responsavel.registro)");
  if (!temEndereco()) falta.push("Endereço completo: rua, número, bairro e CEP (rua, bairro, cep)");
  if (!clinica.cnpj) falta.push("CNPJ (cnpj)");
  if (!clinica.googleMaps) falta.push("Link da ficha no Google Maps (googleMaps)");
  falta.push("Confirmar a região do CRBM (ex.: CRBM-5) e qual WhatsApp atende Balneário Camboriú");
  return falta;
}
