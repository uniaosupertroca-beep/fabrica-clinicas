// Os caminhos de compra da página inicial: o momento que a pessoa está celebrando.
export interface Ocasiao {
  titulo: string;
  texto: string;
  href: string;
  foto: string;
  tema: "marinho" | "rosa" | "creme" | "vinho";
}

export const ocasioes: Ocasiao[] = [
  { titulo: "Aniversário e mesversário", texto: "Bolos personalizados no tamanho certo para a sua festa, com a decoração que você imaginou.", href: "/bolos", foto: "mesversario-lacos", tema: "marinho" },
  { titulo: "Bentô cakes", texto: "Mini bolos com frase ou desenho, em caixinha. O presente que cabe na mão.", href: "/bento", foto: "bento-maes", tema: "rosa" },
  { titulo: "Casamentos e eventos", texto: "Mini bolos, bolos de várias camadas, long cake e mesas de docinhos.", href: "/casamentos-e-eventos", foto: "casamento-duas-camadas", tema: "creme" },
  { titulo: "Datas especiais", texto: "Natal, Dia das Mães, Namorados e outras datas, com cardápio e prazo de encomenda.", href: "/datas-especiais", foto: "natal-vintage", tema: "vinho" },
];
