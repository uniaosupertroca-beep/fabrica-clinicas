// Tamanhos, sabores e valores do cardápio publicado pela Vanessa (Canva "Menu VSCAKES", out/2026).
// O valor final do bolo "é composto pelo tamanho, sabor e decoração escolhida": decorações adicionais e
// técnicas especiais têm taxa à parte, sob consulta.

export type Linha = "tradicional" | "especial";

export interface Tamanho {
  id: "mini" | "pp" | "p" | "m" | "g" | "gg";
  nome: string;
  diametro: number;
  fatias: string;
  fatiasMin: number;
  fatiasMax: number;
  peso: string;
  valor: Record<Linha, number>;
}

export const tamanhos: Tamanho[] = [
  { id: "mini", nome: "Mini", diametro: 13, fatias: "6", fatiasMin: 1, fatiasMax: 6, peso: "650 g", valor: { tradicional: 80, especial: 90 } },
  { id: "pp", nome: "PP", diametro: 13, fatias: "10", fatiasMin: 7, fatiasMax: 10, peso: "1 kg", valor: { tradicional: 125, especial: 142 } },
  { id: "p", nome: "P", diametro: 15, fatias: "15", fatiasMin: 11, fatiasMax: 15, peso: "1,5 a 2 kg", valor: { tradicional: 160, especial: 205 } },
  { id: "m", nome: "M", diametro: 17, fatias: "20 a 25", fatiasMin: 16, fatiasMax: 25, peso: "2,5 a 3 kg", valor: { tradicional: 215, especial: 265 } },
  { id: "g", nome: "G", diametro: 20, fatias: "30 a 35", fatiasMin: 26, fatiasMax: 35, peso: "3,5 kg", valor: { tradicional: 255, especial: 315 } },
  { id: "gg", nome: "GG", diametro: 25, fatias: "45 a 50", fatiasMin: 36, fatiasMax: 50, peso: "4,5 a 5 kg", valor: { tradicional: 405, especial: 455 } },
];

export interface Sabor {
  id: string;
  nome: string;
  linha: Linha;
  recheio: string;
}

export const sabores: Sabor[] = [
  // Tradicionais
  { id: "dois-amores", nome: "Dois amores", linha: "tradicional", recheio: "Massa amanteigada de chocolate, brigadeiro branco e de chocolate" },
  { id: "cafe-chocolate", nome: "Café e chocolate", linha: "tradicional", recheio: "Massa amanteigada de chocolate regada com café, brigadeiro de café e brigadeiro de chocolate" },
  { id: "doce-leite-branco", nome: "Doce de leite e brigadeiro branco", linha: "tradicional", recheio: "Massa amanteigada com toque de canela, doce de leite cremoso e brigadeiro branco" },
  { id: "abacaxi-coco", nome: "Abacaxi com coco", linha: "tradicional", recheio: "Massa amanteigada com toque de canela, compota de abacaxi e brigadeiro de coco" },
  // Especiais
  { id: "bombom-morango", nome: "Bombom de morango", linha: "especial", recheio: "Massa de chocolate, brigadeiro branco e de chocolate com morangos frescos" },
  { id: "chocolate-nozes-whisky", nome: "Chocolate, nozes e toque de whisky", linha: "especial", recheio: "Massa de chocolate, ganache com toque de whisky e brigadeiro de nozes" },
  { id: "devils-cake", nome: "Devil's cake", linha: "especial", recheio: "Massa de chocolate com ganache meio amarga" },
  { id: "doce-leite-chocolate", nome: "Doce de leite e chocolate", linha: "especial", recheio: "Massa de chocolate, brigadeiro de chocolate e doce de leite artesanal" },
  { id: "red-velvet", nome: "Red velvet", linha: "especial", recheio: "Massa vermelha, creme de brigadeiro branco com cream cheese e geleia de frutas vermelhas" },
  { id: "pistache-vermelhas", nome: "Pistache e geleia de frutas vermelhas", linha: "especial", recheio: "Massa de baunilha, brigadeiro de pistache e geleia de frutas vermelhas" },
  { id: "4-leites-vermelhas", nome: "4 leites e geleia de frutas vermelhas", linha: "especial", recheio: "Massa de baunilha, creme 4 leites e geleia de frutas vermelhas" },
  { id: "4-leites-morangos", nome: "4 leites e morangos frescos", linha: "especial", recheio: "Massa de baunilha, creme 4 leites e morangos frescos" },
  { id: "limao-amendoas", nome: "Limão siciliano e amêndoas", linha: "especial", recheio: "Massa de baunilha com brigadeiro de limão siciliano e amêndoas caramelizadas" },
  { id: "maracuja-vermelhas", nome: "Maracujá e geleia de frutas vermelhas", linha: "especial", recheio: "Massa de baunilha com brigadeiro de maracujá e geleia de frutas vermelhas" },
];

export const nomeDaLinha: Record<Linha, string> = { tradicional: "Tradicional", especial: "Especial" };

export const real = (n: number) => `R$ ${n.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}`;

/** Tamanho sugerido para uma quantidade de pessoas (uma fatia por pessoa). */
export function tamanhoParaPessoas(pessoas: number): Tamanho {
  return tamanhos.find((t) => pessoas <= t.fatiasMax) ?? tamanhos[tamanhos.length - 1];
}
