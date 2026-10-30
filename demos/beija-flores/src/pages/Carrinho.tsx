import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Ilustracao } from '../components/Ilustracao'
import { ocasioes } from '../data/catalogo'
import { useCarrinho } from '../lib/CarrinhoContexto'
import { LIMITE_QUANTIDADE, limitarQuantidade } from '../lib/carrinho'
import { formatarData, formatarPreco } from '../lib/formato'
import { useMeta } from '../lib/useMeta'

export function Carrinho() {
  useMeta('Carrinho de demonstração', 'Revise as peças escolhidas antes de finalizar a demonstração.')
  const { resumo, despachar } = useCarrinho()

  if (resumo.linhas.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-5xl text-vinho">Seu carrinho está vazio</h1>
        <p className="texto-apoio mx-auto mt-4 max-w-md">
          Escolha uma peça da coleção de demonstração para começar a simulação.
        </p>
        <Link to="/catalogo" className="botao-primario mt-10">
          Explorar Coleção
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <h1 className="mb-3 text-5xl text-vinho">Carrinho de demonstração</h1>
      <p className="texto-apoio mb-12 max-w-2xl">
        Valores ilustrativos, guardados apenas neste navegador. Nenhum pedido é enviado.
      </p>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <ul className="divide-y divide-vinho/10 lg:col-span-8">
          {resumo.linhas.map(({ item, produto, complementosSelecionados, totalCentavos }) => (
            <li key={item.linha} className="flex gap-5 py-7 first:pt-0 sm:gap-7">
              <div className="h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-rosa-claro sm:h-36 sm:w-32">
                <Ilustracao arte={produto.arte} tons={produto.tons} />
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl leading-tight text-vinho">
                      <Link to={`/produto/${produto.slug}`} className="hover:underline underline-offset-4">
                        {produto.nome}
                      </Link>
                    </h2>
                    <p className="mt-1 text-sm text-vinho/65">
                      {[item.ocasiao && ocasiaoNome(item.ocasiao), item.dataEntrega && `Data: ${formatarData(item.dataEntrega)}`]
                        .filter(Boolean)
                        .join(' · ') || 'Sem personalização'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => despachar({ tipo: 'remover', linha: item.linha })}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-vinho/70 hover:bg-vinho/5 hover:text-vinho"
                    aria-label={`Remover ${produto.nome} do carrinho`}
                  >
                    <Trash2 className="h-4.5 w-4.5" aria-hidden="true" />
                  </button>
                </div>

                {item.cartao && (
                  <p className="border-l-2 border-ouro pl-3 text-sm italic text-vinho/80">“{item.cartao}”</p>
                )}
                {complementosSelecionados.length > 0 && (
                  <p className="text-sm text-vinho/70">
                    Complementos ilustrativos: {complementosSelecionados.map((c) => c.nome).join(', ')}
                  </p>
                )}

                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-1 rounded-full border border-vinho/20 p-1" role="group" aria-label={`Quantidade de ${produto.nome}`}>
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-vinho/5 disabled:opacity-40"
                      disabled={item.quantidade <= 1}
                      onClick={() => despachar({ tipo: 'alterar-quantidade', linha: item.linha, quantidade: limitarQuantidade(item.quantidade - 1) })}
                      aria-label="Diminuir quantidade"
                    >
                      <Minus className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <output className="w-9 text-center text-sm font-medium" aria-live="polite">
                      {item.quantidade}
                    </output>
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-vinho/5 disabled:opacity-40"
                      disabled={item.quantidade >= LIMITE_QUANTIDADE}
                      onClick={() => despachar({ tipo: 'alterar-quantidade', linha: item.linha, quantidade: limitarQuantidade(item.quantidade + 1) })}
                      aria-label="Aumentar quantidade"
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                  <p className="text-lg text-vinho">{formatarPreco(totalCentavos)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside aria-labelledby="resumo-titulo" className="lg:col-span-4">
          <div className="space-y-6 rounded-[1.5rem] bg-branco p-7 lg:sticky lg:top-28">
            <h2 id="resumo-titulo" className="text-3xl text-vinho">
              Resumo
            </h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-vinho/75">Itens de demonstração</dt>
                <dd className="text-vinho">{resumo.itens}</dd>
              </div>
              <div className="flex justify-between border-t border-vinho/10 pt-4 text-base">
                <dt className="font-medium text-vinho">Total ilustrativo</dt>
                <dd className="font-medium text-vinho">{formatarPreco(resumo.subtotalCentavos)}</dd>
              </div>
            </dl>
            <p className="text-xs leading-relaxed text-vinho/65">
              Total fictício para demonstrar o funcionamento. Taxa de entrega, prazo e disponibilidade não são calculados
              nesta demonstração.
            </p>
            <Link to="/finalizar" className="botao-primario w-full">
              Revisar e simular conclusão
            </Link>
            <button
              type="button"
              onClick={() => despachar({ tipo: 'limpar' })}
              className="w-full text-center text-sm text-vinho/70 underline-offset-4 hover:text-vinho hover:underline"
            >
              Esvaziar carrinho
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}

function ocasiaoNome(id: string): string {
  return ocasioes.find((o) => o.id === id)?.nome ?? id
}
