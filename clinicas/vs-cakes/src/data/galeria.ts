// As fotos do site, todas do Instagram (@vscakes__) e do Linktree da Vanessa.
// Ficam fora do site fotos com crianças, nomes de clientes ou terceiros identificáveis.
import type { ImageMetadata } from "astro";

const modulos = import.meta.glob<{ default: ImageMetadata }>("../assets/fotos/*.jpg", { eager: true });

export function imagem(arquivo: string): ImageMetadata {
  const m = modulos[`../assets/fotos/${arquivo}.jpg`];
  if (!m) throw new Error(`Foto não encontrada: src/assets/fotos/${arquivo}.jpg`);
  return m.default;
}

export type Tipo = "vintage" | "floral" | "tematico" | "bento" | "casamento" | "natal" | "docinhos";

export const nomeDoTipo: Record<Tipo, string> = {
  vintage: "Vintage",
  floral: "Florais e texturas",
  tematico: "Temáticos",
  bento: "Bentô e presentes",
  casamento: "Casamentos e eventos",
  natal: "Natal",
  docinhos: "Docinhos",
};

export interface Foto {
  id: string;
  arquivo: string;
  titulo: string;
  tipos: Tipo[];
  alt: string;
  /** Ponto da foto que fica no centro ao cortar (CSS object-position). */
  posicao?: string;
}

export const fotos: Foto[] = [
  { id: "coracao-vintage", arquivo: "vintage-coracao-vermelho", titulo: "Coração vintage", tipos: ["vintage"], alt: "Bolo vintage em formato de coração vermelho, com bico de confeitar, laços azuis e a frase Hello my 25 escrita à mão", posicao: "50% 55%" },
  { id: "vintage-cerejas", arquivo: "vintage-cerejas", titulo: "Vintage com cerejas", tipos: ["vintage"], alt: "Bolo vintage rosa com bico de confeitar vermelho, laços e cerejas, com a inscrição 5K", posicao: "50% 52%" },
  { id: "coracao-preto", arquivo: "vintage-coracao-preto", titulo: "Coração preto", tipos: ["vintage"], alt: "Bolo em formato de coração com cobertura preta e bico de confeitar prateado, sobre mármore", posicao: "50% 62%" },
  { id: "mesversario-lacos", arquivo: "mesversario-lacos", titulo: "Mesversário com laços", tipos: ["vintage"], alt: "Bolo de mesversário com bico de confeitar rosa e laços xadrez azuis, sobre mármore", posicao: "50% 45%" },
  { id: "floral-gerberas", arquivo: "floral-gerberas", titulo: "Gérberas e cravos", tipos: ["floral"], alt: "Bolo branco decorado com gérberas, cravos e outras flores coloridas", posicao: "50% 55%" },
  { id: "rosas-amarelas", arquivo: "floral-rosas-amarelas", titulo: "Rosas amarelas", tipos: ["floral"], alt: "Bolo de cobertura rosada com rosas amarelas frescas ao redor", posicao: "50% 60%" },
  { id: "margaridas", arquivo: "floral-margaridas", titulo: "Margaridas", tipos: ["floral"], alt: "Bolo branco com margaridas, sobre um suporte rosa, em uma mesa de festa", posicao: "50% 35%" },
  { id: "folhas-laranja", arquivo: "textura-folhas-laranja", titulo: "Folhas em relevo", tipos: ["floral"], alt: "Bolo laranja com folhas desenhadas em relevo na cobertura, sobre mármore", posicao: "50% 55%" },
  { id: "bolo-tematico", arquivo: "tematico-woody", titulo: "Bolo temático", tipos: ["tematico"], alt: "Bolo temático amarelo com estampa de vaca, detalhes em vermelho e bico de confeitar azul, sobre mármore", posicao: "50% 50%" },
  { id: "casamento-duas-camadas", arquivo: "casamento-duas-camadas", titulo: "Bolo de casamento", tipos: ["casamento"], alt: "Bolo de casamento branco de duas camadas com rosas brancas, em uma mesa de doces à beira de um lago", posicao: "50% 55%" },
  { id: "mini-bolos-casamento", arquivo: "casamento-mini-bolos", titulo: "Mini bolos de casamento", tipos: ["casamento"], alt: "Mesa com dezenas de mini bolos amarrados com laços brancos, entre arranjos de flores", posicao: "50% 60%" },
  { id: "long-cake", arquivo: "long-cake-evento", titulo: "Long cake de 1 metro", tipos: ["casamento"], alt: "A confeiteira Vanessa ao lado de um bolo comprido de 1 metro, decorado com flores frescas, em um evento", posicao: "50% 60%" },
  { id: "bento-namorados", arquivo: "bento-namorados", titulo: "Bentô de Dia dos Namorados", tipos: ["bento"], alt: "Bentô cake em forma de coração vermelho e bentô LOVE, com brigadeiros em caixas, sobre mármore", posicao: "50% 50%" },
  { id: "bento-maes", arquivo: "bento-maes", titulo: "Bentô de Dia das Mães", tipos: ["bento"], alt: "Bentô cake com a frase Te amamos, Mãe, ao lado de um mini buquê e docinhos", posicao: "50% 70%" },
  { id: "bento-pais", arquivo: "bento-pais", titulo: "Bentô de Dia dos Pais", tipos: ["bento"], alt: "Bentôs de Dia dos Pais com frases escritas à mão, em embalagens e caixas com laço azul", posicao: "50% 50%" },
  { id: "bento-amigo", arquivo: "bento-amigo", titulo: "Bentô do Dia do Amigo", tipos: ["bento"], alt: "Bentô cake em caixa branca com a frase Feliz dia do Amigo, escrita à mão", posicao: "50% 60%" },
  { id: "bento-pais-caixa", arquivo: "bento-pais-caixa", titulo: "Caixa de Dia dos Pais", tipos: ["bento"], alt: "Caixa transparente com laço azul, bentô cake com a frase Pai, eu te amo e docinhos", posicao: "50% 70%" },
  { id: "natal-vintage", arquivo: "natal-vintage", titulo: "Vintage de Natal", tipos: ["natal", "vintage"], alt: "Bolo vintage de Natal vermelho com bico de confeitar verde, laços e a frase Feliz Natal", posicao: "55% 60%" },
  { id: "guirlanda-brownie", arquivo: "natal-guirlanda-brownie", titulo: "Guirlanda de brownie", tipos: ["natal", "docinhos"], alt: "Guirlanda de brownie com brigadeiro, morangos frescos, brigadeiros boleados e laço vermelho", posicao: "50% 55%" },
  { id: "pave-natalino", arquivo: "natal-pave", titulo: "Pavê natalino", tipos: ["natal", "docinhos"], alt: "Pavê natalino em camadas, em pote retangular com laço vermelho, entre enfeites de Natal", posicao: "50% 58%" },
  { id: "morango-cravejado", arquivo: "docinho-morango", titulo: "Morango cravejado", tipos: ["docinhos"], alt: "Morango coberto de chocolate branco com granulado, partido ao meio, segurado na mão", posicao: "50% 78%" },
];

export const foto = (id: string): Foto => {
  const f = fotos.find((x) => x.id === id);
  if (!f) throw new Error(`Foto sem cadastro: ${id}`);
  return f;
};

/** Fotos de bastidores e retratos da Vanessa. */
export const vanessa = {
  retrato: { arquivo: "vanessa-retrato", alt: "A confeiteira Vanessa sorrindo, com uma taça na mão, ao lado de um bolo vintage rosa com velas", posicao: "50% 22%" },
  perfil: { arquivo: "vanessa-perfil", alt: "Retrato da confeiteira Vanessa", posicao: "50% 30%" },
  flores: { arquivo: "vanessa-flores", alt: "Vanessa colocando flores em um bolo branco", posicao: "50% 60%" },
  morangos: { arquivo: "vanessa-morangos", alt: "Vanessa confeitando um bolo de chocolate com morangos frescos", posicao: "60% 45%" },
  bico: { arquivo: "vanessa-bico", alt: "Vanessa confeitando um bolo de chocolate com saco de confeitar", posicao: "30% 55%" },
};
