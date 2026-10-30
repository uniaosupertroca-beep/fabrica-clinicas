import type { Produto } from '../data/catalogo'

export type Ordem = 'relevancia' | 'menor-preco' | 'maior-preco' | 'nome'

export type FiltrosCatalogo = {
  categoria: string | null
  ocasiao: string | null
  busca: string
  ordem: Ordem
}

export const ordensDisponiveis: { id: Ordem; rotulo: string }[] = [
  { id: 'relevancia', rotulo: 'Destaques' },
  { id: 'menor-preco', rotulo: 'Menor preço' },
  { id: 'maior-preco', rotulo: 'Maior preço' },
  { id: 'nome', rotulo: 'Nome de A a Z' },
]

/** Remove acentos e caixa para que "orquidea" encontre "Orquídea". */
export function normalizarTexto(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
}

export function filtrarProdutos(lista: Produto[], filtros: FiltrosCatalogo): Produto[] {
  const termo = normalizarTexto(filtros.busca)

  const resultado = lista.filter((produto) => {
    if (filtros.categoria && produto.categoria !== filtros.categoria) return false
    if (filtros.ocasiao && !produto.ocasioes.includes(filtros.ocasiao)) return false
    if (termo) {
      const alvo = normalizarTexto(`${produto.nome} ${produto.resumo} ${produto.categoria}`)
      if (!alvo.includes(termo)) return false
    }
    return true
  })

  return ordenarProdutos(resultado, filtros.ordem)
}

export function ordenarProdutos(lista: Produto[], ordem: Ordem): Produto[] {
  const copia = [...lista]
  switch (ordem) {
    case 'menor-preco':
      return copia.sort((a, b) => a.precoCentavos - b.precoCentavos)
    case 'maior-preco':
      return copia.sort((a, b) => b.precoCentavos - a.precoCentavos)
    case 'nome':
      return copia.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
    case 'relevancia':
    default:
      return copia.sort((a, b) => Number(b.destaque) - Number(a.destaque))
  }
}

export function ordemValida(valor: string | null): Ordem {
  const encontrada = ordensDisponiveis.find((item) => item.id === valor)
  return encontrada ? encontrada.id : 'relevancia'
}
