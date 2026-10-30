import { describe, expect, it } from 'vitest'
import { produtos, complementos } from '../data/catalogo'
import { filtrarProdutos, normalizarTexto, ordemValida } from './filtros'
import { LIMITE_CARTAO, LIMITE_QUANTIDADE, lerCarrinhoSalvo, reducerCarrinho, resumirCarrinho } from './carrinho'
import { cepValido, formatarPreco, mascararCep } from './formato'
import { consultarCepDemo } from './cep'

describe('formatação', () => {
  it('formata centavos em reais', () => {
    expect(formatarPreco(18900)).toMatch(/R\$\s?189,00/)
  })

  it('mascara o CEP enquanto digita', () => {
    expect(mascararCep('88330670')).toBe('88330-670')
    expect(mascararCep('8833')).toBe('8833')
    expect(mascararCep('88a33-06b70 9')).toBe('88330-670')
  })

  it('valida CEP com ou sem hífen', () => {
    expect(cepValido('88330-670')).toBe(true)
    expect(cepValido('88330670')).toBe(true)
    expect(cepValido('8833-067')).toBe(false)
  })
})

describe('busca e filtros do catálogo', () => {
  it('normaliza acentos e caixa', () => {
    expect(normalizarTexto('  Orquídea ')).toBe('orquidea')
  })

  it('filtra por categoria e ocasião', () => {
    const cestas = filtrarProdutos(produtos, { categoria: 'cestas', ocasiao: null, busca: '', ordem: 'relevancia' })
    expect(cestas.every((p) => p.categoria === 'cestas')).toBe(true)
    expect(cestas.length).toBeGreaterThan(0)

    const namorados = filtrarProdutos(produtos, { categoria: null, ocasiao: 'namorados', busca: '', ordem: 'relevancia' })
    expect(namorados.every((p) => p.ocasioes.includes('namorados'))).toBe(true)
  })

  it('busca sem acento', () => {
    const achados = filtrarProdutos(produtos, { categoria: null, ocasiao: null, busca: 'orquidea', ordem: 'relevancia' })
    expect(achados.some((p) => p.id === 'p-orquidea-elegante')).toBe(true)
  })

  it('ordena por preço', () => {
    const crescente = filtrarProdutos(produtos, { categoria: null, ocasiao: null, busca: '', ordem: 'menor-preco' })
    for (let i = 1; i < crescente.length; i++) {
      expect(crescente[i - 1].precoCentavos).toBeLessThanOrEqual(crescente[i].precoCentavos)
    }
  })

  it('aceita apenas ordens conhecidas', () => {
    expect(ordemValida('maior-preco')).toBe('maior-preco')
    expect(ordemValida('qualquer-coisa')).toBe('relevancia')
    expect(ordemValida(null)).toBe('relevancia')
  })
})

describe('carrinho', () => {
  const base = { produtoId: 'p-buque-girassois', cartao: '', ocasiao: '', dataEntrega: '', complementos: [] }

  it('adiciona linhas e respeita o limite de quantidade', () => {
    let estado = reducerCarrinho([], { tipo: 'adicionar', linha: 'a', item: { ...base, quantidade: 999 } })
    expect(estado[0].quantidade).toBe(LIMITE_QUANTIDADE)

    estado = reducerCarrinho(estado, { tipo: 'alterar-quantidade', linha: 'a', quantidade: 0 })
    expect(estado[0].quantidade).toBe(1)
  })

  it('remove e limpa', () => {
    let estado = reducerCarrinho([], { tipo: 'adicionar', linha: 'a', item: base })
    estado = reducerCarrinho(estado, { tipo: 'adicionar', linha: 'b', item: base })
    estado = reducerCarrinho(estado, { tipo: 'remover', linha: 'a' })
    expect(estado.map((i) => i.linha)).toEqual(['b'])
    expect(reducerCarrinho(estado, { tipo: 'limpar' })).toEqual([])
  })

  it('limita o texto do cartão', () => {
    const longo = 'x'.repeat(LIMITE_CARTAO + 50)
    const [item] = reducerCarrinho([], { tipo: 'adicionar', linha: 'a', item: { ...base, cartao: longo } })
    expect(item.cartao.length).toBe(LIMITE_CARTAO)
  })

  it('calcula subtotal com complementos ilustrativos', () => {
    const estado = reducerCarrinho([], {
      tipo: 'adicionar',
      linha: 'a',
      item: { ...base, quantidade: 2, complementos: ['chocolates'] },
    })
    const resumo = resumirCarrinho(estado, produtos, complementos)
    const produto = produtos.find((p) => p.id === 'p-buque-girassois')!
    const chocolates = complementos.find((c) => c.id === 'chocolates')!
    expect(resumo.itens).toBe(2)
    expect(resumo.subtotalCentavos).toBe((produto.precoCentavos + chocolates.precoCentavos) * 2)
  })

  it('ignora linhas de produtos inexistentes ao restaurar', () => {
    const resumo = resumirCarrinho(
      [{ ...base, quantidade: 1, linha: 'x', produtoId: 'inexistente' }],
      produtos,
      complementos,
    )
    expect(resumo.linhas).toHaveLength(0)
    expect(resumo.subtotalCentavos).toBe(0)
  })

  it('restaura dados salvos de forma segura', () => {
    expect(lerCarrinhoSalvo(null)).toEqual([])
    expect(lerCarrinhoSalvo('{não é json')).toEqual([])
    expect(lerCarrinhoSalvo('{"a":1}')).toEqual([])
    const salvo = JSON.stringify([{ linha: 'a', produtoId: 'p', quantidade: 500, cartao: 'oi', complementos: ['x'] }])
    const [item] = lerCarrinhoSalvo(salvo)
    expect(item.quantidade).toBe(LIMITE_QUANTIDADE)
    expect(item.complementos).toEqual(['x'])
  })
})

describe('consulta de CEP demonstrativa', () => {
  it('não confirma entrega nem taxa', () => {
    const resultado = consultarCepDemo('88330-670')
    expect(resultado.status).toBe('demonstracao')
    expect(resultado.mensagem).toMatch(/demonstração/)
  })

  it('recusa CEP incompleto', () => {
    expect(consultarCepDemo('8833').status).toBe('invalido')
  })
})
