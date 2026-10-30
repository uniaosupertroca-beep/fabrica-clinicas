import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react'
import { complementos, produtos } from '../data/catalogo'
import {
  lerCarrinhoSalvo,
  reducerCarrinho,
  resumirCarrinho,
  type AcaoCarrinho,
  type EstadoCarrinho,
  type ResumoCarrinho,
} from './carrinho'

const CHAVE = 'bf-demo-carrinho'

type ValorCarrinho = {
  itens: EstadoCarrinho
  resumo: ResumoCarrinho
  despachar: (acao: AcaoCarrinho) => void
  novaLinha: () => string
}

const CarrinhoContexto = createContext<ValorCarrinho | null>(null)

function lerDoArmazenamento(): EstadoCarrinho {
  try {
    return lerCarrinhoSalvo(window.localStorage.getItem(CHAVE))
  } catch {
    return []
  }
}

function gravarNoArmazenamento(itens: EstadoCarrinho) {
  try {
    window.localStorage.setItem(CHAVE, JSON.stringify(itens))
  } catch {
    // Armazenamento bloqueado (navegação privada, cota cheia): o carrinho segue só na sessão.
  }
}

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, despachar] = useReducer(reducerCarrinho, undefined, lerDoArmazenamento)

  useEffect(() => {
    gravarNoArmazenamento(itens)
  }, [itens])

  const valor = useMemo<ValorCarrinho>(() => {
    const novaLinha = () =>
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `l-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    return {
      itens,
      resumo: resumirCarrinho(itens, produtos, complementos),
      despachar,
      novaLinha,
    }
  }, [itens])

  return <CarrinhoContexto.Provider value={valor}>{children}</CarrinhoContexto.Provider>
}

export function useCarrinho(): ValorCarrinho {
  const contexto = useContext(CarrinhoContexto)
  if (!contexto) throw new Error('useCarrinho precisa estar dentro de CarrinhoProvider')
  return contexto
}
