/**
 * Dados reais da empresa, conferidos no catálogo público atual (Agora Menu)
 * e nas informações divulgadas pela própria loja.
 * Itens marcados como `confirmar` ainda dependem de validação da empresa.
 */
export const empresa = {
  nome: 'Floricultura Beija-Flores',
  slogan: 'Flores que transformam sentimentos em lembranças inesquecíveis.',
  subtitulo:
    'Desde 1995, a Floricultura Beija-Flores celebra histórias, emoções e momentos especiais em Balneário Camboriú.',
  fundacao: 1995,
  endereco: {
    logradouro: 'Avenida Central, 820',
    bairro: 'Centro',
    cidade: 'Balneário Camboriú',
    uf: 'SC',
    cep: '88330-670',
    mapa: 'https://www.google.com/maps/search/?api=1&query=Avenida+Central+820+Centro+Balneario+Camboriu+SC',
  },
  telefone: {
    exibicao: '(47) 93300-2467',
    link: 'tel:+5547933002467',
  },
  /** Confirmar com a empresa se o número recebe WhatsApp antes de ativar o canal. */
  whatsapp: {
    ativo: false,
    link: 'https://wa.me/5547933002467',
  },
  /** Horários informados no catálogo atual. Confirmar antes da publicação. */
  horarioLoja: [
    { dias: 'Segunda a sexta', horario: '8h às 19h' },
    { dias: 'Sábado', horario: '8h às 18h' },
  ],
  horarioConfirmar: true,
  catalogoAtual: 'https://app.agoramenu.com.br/floricultura_beija_flores',
  /** Link a validar. Substituir pelo perfil oficial de avaliações quando confirmado. */
  reputacao: 'https://www.google.com/search?q=Floricultura+Beija-Flores+Balneário+Camboriú+avaliações',
} as const

export const regioesAtendidas = [
  'Balneário Camboriú',
  'Itajaí',
  'Camboriú',
  'Itapema',
] as const

export const avisoDemonstracao =
  'Proposta visual demonstrativa — projeto independente, sujeito à aprovação da Floricultura Beija-Flores.'
