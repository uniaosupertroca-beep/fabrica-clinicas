import type { Complemento, Produto } from '../data/catalogo'

export const LIMITE_QUANTIDADE = 20
export const LIMITE_CARTAO = 180

export type ItemCarrinho = {
  /** Identificador da linha. Cada personalização vira uma linha própria. */
  linha: string
  produtoId: string
  quantidade: number
  cartao: string
  ocasiao: string
  dataEntrega: string
  complementos: string[]
}

export type EstadoCarrinho = ItemCarrinho[]

export type AcaoCarrinho =
  | { tipo: 'adicionar'; item: Omit<ItemCarrinho, 'linha' | 'quantidade'> & { quantidade?: number } ; linha: string }
  | { tipo: 'alterar-quantidade'; linha: string; quantidade: number }
  | { tipo: 'remover'; linha: string }
  | { tipo: 'limpar' }
  | { tipo: 'carregar'; itens: EstadoCarrinho }

export function limitarQuantidade(valor: number): number {
  if (!Number.isFinite(valor)) return 1
  return Math.min(LIMITE_QUANTIDADE, Math.max(1, Math.trunc(valor)))
}

export function limitarCartao(texto: string): string {
  return texto.slice(0, LIMITE_CARTAO)
}

export function reducerCarrinho(estado: EstadoCarrinho, acao: AcaoCarrinho): EstadoCarrinho {
  switch (acao.tipo) {
    case 'adicionar': {
      const novo: ItemCarrinho = {
        linha: acao.linha,
        produtoId: acao.item.produtoId,
        quantidade: limitarQuantidade(acao.item.quantidade ?? 1),
        cartao: limitarCartao(acao.item.cartao),
        ocasiao: acao.item.ocasiao,
        dataEntrega: acao.item.dataEntrega,
        complementos: [...acao.item.complementos],
      }
      return [...estado, novo]
    }
    case 'alterar-quantidade':
      return estado.map((item) =>
        item.linha === acao.linha ? { ...item, quantidade: limitarQuantidade(acao.quantidade) } : item,
      )
    case 'remover':
      return estado.filter((item) => item.linha !== acao.linha)
    case 'limpar':
      return []
    case 'carregar':
      return acao.itens
    default:
      return estado
  }
}

export type ResumoCarrinho = {
  itens: number
  subtotalCentavos: number
  linhas: {
    item: ItemCarrinho
    produto: Produto
    complementosSelecionados: Complemento[]
    totalCentavos: number
  }[]
}

/**
 * Calcula o total usando preços ILUSTRATIVOS do catálogo de demonstração.
 * Linhas com produto inexistente são ignoradas, para que dados antigos do
 * armazenamento local não quebrem a página.
 */
export function resumirCarrinho(
  estado: EstadoCarrinho,
  produtos: Produto[],
  complementos: Complemento[],
): ResumoCarrinho {
  const porId = new Map(produtos.map((p) => [p.id, p]))
  const complementosPorId = new Map(complementos.map((c) => [c.id, c]))

  const linhas = estado.flatMap((item) => {
    const produto = porId.get(item.produtoId)
    if (!produto) return []
    const complementosSelecionados = item.complementos
      .map((id) => complementosPorId.get(id))
      .filter((c): c is Complemento => Boolean(c))
    const precoUnitario =
      produto.precoCentavos + complementosSelecionados.reduce((soma, c) => soma + c.precoCentavos, 0)
    return [{ item, produto, complementosSelecionados, totalCentavos: precoUnitario * item.quantidade }]
  })

  return {
    itens: linhas.reduce((soma, l) => soma + l.item.quantidade, 0),
    subtotalCentavos: linhas.reduce((soma, l) => soma + l.totalCentavos, 0),
    linhas,
  }
}

export function lerCarrinhoSalvo(bruto: string | null): EstadoCarrinho {
  if (!bruto) return []
  try {
    const dados: unknown = JSON.parse(bruto)
    if (!Array.isArray(dados)) return []
    return dados.filter(
      (x): x is ItemCarrinho =>
        typeof x === 'object' &&
        x !== null &&
        typeof (x as ItemCarrinho).linha === 'string' &&
        typeof (x as ItemCarrinho).produtoId === 'string' &&
        typeof (x as ItemCarrinho).quantidade === 'number',
    ).map((x) => ({
      linha: x.linha,
      produtoId: x.produtoId,
      quantidade: limitarQuantidade(x.quantidade),
      cartao: limitarCartao(String(x.cartao ?? '')),
      ocasiao: String(x.ocasiao ?? ''),
      dataEntrega: String(x.dataEntrega ?? ''),
      complementos: Array.isArray(x.complementos) ? x.complementos.map(String) : [],
    }))
  } catch {
    return []
  }
}
