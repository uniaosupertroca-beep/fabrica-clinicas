// Datas em que a VS Cakes lança cardápio especial. Tudo vem do Instagram da Vanessa: o que ela fez na última
// edição e quando fechou as encomendas. O cardápio de cada data novo sai no Instagram e no WhatsApp.
export interface DataEspecial {
  id: string;
  nome: string;
  quando: string;
  ultima: string;
  foto: string;
}

export const datas: DataEspecial[] = [
  {
    id: "natal",
    nome: "Natal",
    quando: "25 de dezembro",
    ultima: "Em 2025, o cardápio de Natal foi aberto em 26 de novembro, com pavê natalino, guirlanda de brownie e bolos vintage de Natal.",
    foto: "natal-vintage",
  },
  {
    id: "maes",
    nome: "Dia das Mães",
    quando: "segundo domingo de maio",
    ultima: "Em 2026, menu especial com bentô cake e mini buquê.",
    foto: "bento-maes",
  },
  {
    id: "namorados",
    nome: "Dia dos Namorados",
    quando: "12 de junho",
    ultima: "Em 2026, bentôs, caixas especiais e docinhos, com encomendas até 11 de junho.",
    foto: "bento-namorados",
  },
  {
    id: "amigo",
    nome: "Dia do Amigo",
    quando: "20 de julho",
    ultima: "Em 2025, bentô cake para declarar amizade em forma de bolo.",
    foto: "bento-amigo",
  },
  {
    id: "pais",
    nome: "Dia dos Pais",
    quando: "segundo domingo de agosto",
    ultima: "Em 2026, Bentô Cake e Kit Bentô Cake com docinhos, com encomendas até 6 de agosto.",
    foto: "bento-pais",
  },
];
