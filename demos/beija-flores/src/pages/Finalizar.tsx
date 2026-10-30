import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { empresa } from '../data/empresa'
import { useCarrinho } from '../lib/CarrinhoContexto'
import { formatarData, formatarPreco } from '../lib/formato'
import { useMeta } from '../lib/useMeta'

export function Finalizar() {
  useMeta('Simular conclusão do pedido', 'Simulação de finalização. Nenhum pedido, pagamento ou dado pessoal é enviado.')
  const { resumo, despachar } = useCarrinho()
  const [simulado, setSimulado] = useState(false)

  if (resumo.linhas.length === 0 && !simulado) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-5xl text-vinho">Nada para finalizar</h1>
        <p className="texto-apoio mx-auto mt-4">Adicione uma peça da coleção antes de simular a conclusão.</p>
        <Link to="/catalogo" className="botao-primario mt-10">
          Explorar Coleção
        </Link>
      </div>
    )
  }

  if (simulado) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6" role="status">
        <CheckCircle2 className="mb-6 h-12 w-12 text-oliva" aria-hidden="true" />
        <h1 className="text-5xl text-vinho">Simulação concluída</h1>
        <p className="texto-apoio mt-5 text-lg">
          Esta foi uma demonstração. Nenhum pedido foi enviado, nenhum pagamento foi processado e nenhum dado pessoal foi
          coletado.
        </p>
        <p className="texto-apoio mt-4">
          Para comprar de verdade, use o catálogo atual da Floricultura Beija-Flores.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href={empresa.catalogoAtual} target="_blank" rel="noopener noreferrer" className="botao-primario">
            Comprar no catálogo atual
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">(abre em nova aba)</span>
          </a>
          <button
            type="button"
            className="botao-secundario"
            onClick={() => {
              despachar({ tipo: 'limpar' })
              setSimulado(false)
            }}
          >
            Esvaziar carrinho de demonstração
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-12 sm:px-6">
      <p className="mb-3 text-sm text-vinho/70">Etapa de demonstração</p>
      <h1 className="text-5xl text-vinho">Revisar e simular conclusão</h1>
      <p className="texto-apoio mt-4 max-w-2xl">
        Esta tela mostra como seria a conclusão de um pedido. Nenhum dado é coletado nem enviado. A loja confirma a
        entrega, a taxa e o pagamento pelo canal oficial.
      </p>

      <section aria-labelledby="itens-finalizacao" className="mt-12">
        <h2 id="itens-finalizacao" className="mb-5 text-2xl text-vinho">
          Peças escolhidas
        </h2>
        <ul className="divide-y divide-vinho/10 rounded-[1.25rem] bg-branco px-6">
          {resumo.linhas.map(({ item, produto, totalCentavos }) => (
            <li key={item.linha} className="flex items-start justify-between gap-4 py-5 text-sm">
              <div>
                <p className="font-medium text-vinho">
                  {produto.nome} × {item.quantidade}
                </p>
                {item.dataEntrega && <p className="text-vinho/65">Data desejada: {formatarData(item.dataEntrega)}</p>}
              </div>
              <p className="text-vinho">{formatarPreco(totalCentavos)}</p>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-center justify-between px-1 text-base">
          <span className="text-vinho/75">Total ilustrativo</span>
          <span className="font-medium text-vinho">{formatarPreco(resumo.subtotalCentavos)}</span>
        </div>
        <p className="mt-3 px-1 text-xs text-vinho/60">
          Valores fictícios, sem relação com a tabela comercial da loja.
        </p>
      </section>

      <div className="mt-12 flex flex-col gap-3 sm:flex-row">
        <button type="button" className="botao-primario" onClick={() => setSimulado(true)}>
          Simular conclusão
        </button>
        <Link to="/carrinho" className="botao-secundario">
          Voltar ao carrinho
        </Link>
      </div>
    </div>
  )
}
