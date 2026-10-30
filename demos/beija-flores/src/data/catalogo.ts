/**
 * CATÁLOGO DE DEMONSTRAÇÃO.
 * Produtos, descrições e preços são ILUSTRATIVOS. Não representam a tabela
 * comercial da Floricultura Beija-Flores, que deve substituir estes dados
 * por consulta ao catálogo real após validação.
 */

export type ArteFloral = 'rosa' | 'girassol' | 'lirio' | 'orquidea' | 'campo' | 'cesta' | 'vaso' | 'branco'

export type Categoria = {
  id: string
  nome: string
  descricao: string
}

export type Ocasiao = {
  id: string
  nome: string
  descricao: string
  frase: string
}

export type Produto = {
  id: string
  slug: string
  nome: string
  categoria: string
  ocasioes: string[]
  /** Preço ilustrativo em centavos. */
  precoCentavos: number
  resumo: string
  descricao: string
  arte: ArteFloral
  tons: [string, string]
  destaque: boolean
  disponivel: boolean
  composicao: string[]
}

export type Complemento = {
  id: string
  nome: string
  precoCentavos: number
  descricao: string
}

export const categorias: Categoria[] = [
  { id: 'buques', nome: 'Buquês de flores', descricao: 'Buquês preparados à mão, com flores selecionadas do dia.' },
  { id: 'arranjos', nome: 'Arranjos florais', descricao: 'Composições para mesas, recepções e presentes.' },
  { id: 'rosas-girassois', nome: 'Rosas e girassóis', descricao: 'Duas flores clássicas, em versões românticas e alegres.' },
  { id: 'orquideas', nome: 'Orquídeas', descricao: 'Orquídeas em vaso ou em arranjo, com longa duração.' },
  { id: 'plantadas', nome: 'Flores plantadas', descricao: 'Plantas e flores em vaso para acompanhar o dia a dia.' },
  { id: 'cestas', nome: 'Cestas e presentes', descricao: 'Cestas com flores, chocolates e pequenos mimos.' },
  { id: 'homenagens', nome: 'Homenagens florais', descricao: 'Composições discretas e elegantes para momentos de respeito.' },
]

export const ocasioes: Ocasiao[] = [
  { id: 'aniversario', nome: 'Aniversários', descricao: 'Para celebrar mais um ano de histórias.', frase: 'Um dia para lembrar' },
  { id: 'namorados', nome: 'Dia dos Namorados', descricao: 'Declarações de amor em forma de flor.', frase: 'Com todo o meu amor' },
  { id: 'declaracoes', nome: 'Declarações de amor', descricao: 'Palavras que as flores dizem por você.', frase: 'Eu quero você por perto' },
  { id: 'agradecimentos', nome: 'Agradecimentos', descricao: 'Um gesto delicado de gratidão.', frase: 'Obrigado por tudo' },
  { id: 'nascimento', nome: 'Nascimento', descricao: 'Boas-vindas para o novo integrante da família.', frase: 'Bem-vindo ao mundo' },
  { id: 'casamentos', nome: 'Casamentos', descricao: 'Arranjos para recepções, mesas e a cerimônia.', frase: 'Um sim cercado de flores' },
  { id: 'homenagens', nome: 'Homenagens', descricao: 'Composições sóbrias para honrar quem se foi.', frase: 'Com respeito e carinho' },
]

export const produtos: Produto[] = [
  {
    id: 'p-buque-rosas-vermelhas',
    slug: 'buque-de-rosas-vermelhas',
    nome: 'Buquê de Rosas Vermelhas',
    categoria: 'buques',
    ocasioes: ['aniversario', 'namorados', 'declaracoes'],
    precoCentavos: 18900,
    resumo: 'Rosas vermelhas em papel de seda marfim, com acabamento em fita de cetim.',
    descricao:
      'Um clássico que segue sendo o mais pedido para declarações. Rosas vermelhas selecionadas, envoltas em papel de seda marfim e laço de cetim vinho.',
    arte: 'rosa',
    tons: ['#8e2f45', '#c95f72'],
    destaque: true,
    disponivel: true,
    composicao: ['12 rosas vermelhas', 'Papel de seda marfim', 'Fita de cetim vinho'],
  },
  {
    id: 'p-buque-girassois',
    slug: 'buque-de-girassois',
    nome: 'Buquê de Girassóis',
    categoria: 'rosas-girassois',
    ocasioes: ['aniversario', 'agradecimentos'],
    precoCentavos: 13900,
    resumo: 'Girassóis luminosos com folhagem verde oliva e acabamento rústico.',
    descricao:
      'Alegria em forma de flor. Girassóis em tons de sol, acompanhados de folhagem verde oliva e embalagem de juta natural.',
    arte: 'girassol',
    tons: ['#e0b04f', '#8f7650'],
    destaque: true,
    disponivel: true,
    composicao: ['5 girassóis', 'Folhagem verde oliva', 'Embalagem de juta'],
  },
  {
    id: 'p-arranjo-lirios-rosas',
    slug: 'arranjo-de-lirios-e-rosas',
    nome: 'Arranjo de Lírios e Rosas',
    categoria: 'arranjos',
    ocasioes: ['agradecimentos', 'homenagens', 'casamentos'],
    precoCentavos: 24900,
    resumo: 'Lírios brancos e rosas rosé em vaso de cerâmica fosca.',
    descricao:
      'Arranjo de mesa com estrutura alta e leve. Lírios e rosas rosé combinados com folhagens de textura suave, em vaso de cerâmica fosca.',
    arte: 'lirio',
    tons: ['#f4efe8', '#d9b5b5'],
    destaque: true,
    disponivel: true,
    composicao: ['3 lírios', '6 rosas rosé', 'Vaso de cerâmica fosca'],
  },
  {
    id: 'p-orquidea-elegante',
    slug: 'orquidea-elegante',
    nome: 'Orquídea Elegante',
    categoria: 'orquideas',
    ocasioes: ['declaracoes', 'aniversario', 'casamentos'],
    precoCentavos: 21900,
    resumo: 'Orquídea phalaenopsis branca em vaso de vidro com musgo decorativo.',
    descricao:
      'Uma orquídea de hastes arqueadas e longa duração, apresentada em vaso de vidro com musgo decorativo. Ideal para presentear com sofisticação.',
    arte: 'orquidea',
    tons: ['#ffffff', '#c9a7b3'],
    destaque: false,
    disponivel: true,
    composicao: ['1 orquídea phalaenopsis', 'Vaso de vidro', 'Musgo decorativo'],
  },
  {
    id: 'p-cesta-flores-chocolates',
    slug: 'cesta-de-flores-e-chocolates',
    nome: 'Cesta de Flores e Chocolates',
    categoria: 'cestas',
    ocasioes: ['namorados', 'aniversario', 'agradecimentos'],
    precoCentavos: 25900,
    resumo: 'Cesta de vime com flores da estação, chocolates finos e laço de tecido.',
    descricao:
      'Uma cesta com flores da estação e uma seleção de chocolates. A combinação perfeita para surpreender com doçura.',
    arte: 'cesta',
    tons: ['#c5a67b', '#65745a'],
    destaque: true,
    disponivel: true,
    composicao: ['Flores da estação', 'Chocolates finos (ilustrativo)', 'Cesta de vime'],
  },
  {
    id: 'p-buque-flores-do-campo',
    slug: 'buque-de-flores-do-campo',
    nome: 'Buquê de Flores do Campo',
    categoria: 'buques',
    ocasioes: ['agradecimentos', 'nascimento'],
    precoCentavos: 12900,
    resumo: 'Margaridas, flores silvestres e folhagens leves em tons suaves.',
    descricao:
      'Um buquê solto e natural, com margaridas e flores silvestres em tons de creme e rosa. Delicado e acolhedor.',
    arte: 'campo',
    tons: ['#ffffff', '#e8c9a6'],
    destaque: false,
    disponivel: true,
    composicao: ['Margaridas', 'Flores silvestres', 'Folhagens leves'],
  },
  {
    id: 'p-vaso-orquidea-plantada',
    slug: 'vaso-de-orquidea-plantada',
    nome: 'Vaso de Orquídea Plantada',
    categoria: 'plantadas',
    ocasioes: ['nascimento', 'agradecimentos', 'homenagens'],
    precoCentavos: 17900,
    resumo: 'Orquídea viva em vaso de cerâmica artesanal, pronta para a casa.',
    descricao:
      'Uma planta viva para cuidar e acompanhar por muito tempo. Entregue em vaso de cerâmica artesanal, com instruções simples de cuidado.',
    arte: 'vaso',
    tons: ['#e9ded0', '#65745a'],
    destaque: false,
    disponivel: true,
    composicao: ['Orquídea viva', 'Vaso de cerâmica artesanal', 'Guia de cuidado'],
  },
  {
    id: 'p-arranjo-homenagem-branca',
    slug: 'arranjo-de-homenagem-branca',
    nome: 'Arranjo de Homenagem Branca',
    categoria: 'homenagens',
    ocasioes: ['homenagens'],
    precoCentavos: 20900,
    resumo: 'Composição sóbria em branco e verde, com acabamento discreto.',
    descricao:
      'Uma composição de tons brancos e verdes, pensada para momentos de respeito e lembrança. Acabamento discreto e elegante.',
    arte: 'branco',
    tons: ['#ffffff', '#65745a'],
    destaque: false,
    disponivel: true,
    composicao: ['Flores brancas', 'Folhagem verde', 'Base discreta'],
  },
  {
    id: 'p-rosas-caixa-vinho',
    slug: 'rosas-em-caixa-vinho',
    nome: 'Rosas em Caixa Vinho',
    categoria: 'rosas-girassois',
    ocasioes: ['namorados', 'declaracoes'],
    precoCentavos: 22900,
    resumo: 'Rosas em caixa de presente na cor vinho, com cartão personalizado.',
    descricao:
      'Rosas em caixa de presente vinho, com fita de cetim e espaço para uma mensagem especial no cartão.',
    arte: 'rosa',
    tons: ['#542e3d', '#d9b5b5'],
    destaque: false,
    disponivel: false,
    composicao: ['9 rosas', 'Caixa vinho', 'Cartão personalizado'],
  },
]

export const complementos: Complemento[] = [
  { id: 'chocolates', nome: 'Chocolates selecionados', precoCentavos: 2800, descricao: 'Opção ilustrativa de chocolates. Confirmar o catálogo real.' },
  { id: 'pelucia', nome: 'Pelúcia', precoCentavos: 6900, descricao: 'Opção ilustrativa de pelúcia. Confirmar o catálogo real.' },
  { id: 'vela', nome: 'Vela aromática', precoCentavos: 4500, descricao: 'Opção ilustrativa de vela aromática. Confirmar o catálogo real.' },
]

/** Produtos que aparecem na vitrine da página inicial, por ordem de destaque. */
export const destaquesHome: string[] = ['p-buque-rosas-vermelhas', 'p-arranjo-lirios-rosas', 'p-cesta-flores-chocolates']

export const avisoPrecos =
  'Produtos e preços ilustrativos, apenas para demonstrar o funcionamento da loja. Não representam a tabela comercial da empresa.'
