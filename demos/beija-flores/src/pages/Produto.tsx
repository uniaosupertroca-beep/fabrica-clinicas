import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Minus, Plus, ShoppingBag } from 'lucide-react'
import { Ilustracao } from '../components/Ilustracao'
import { ProdutoCard } from '../components/ProdutoCard'
import { NaoEncontrado } from './NaoEncontrado'
import { categorias, complementos, ocasioes, produtos, type Produto as TipoProduto } from '../data/catalogo'
import { LIMITE_CARTAO, LIMITE_QUANTIDADE, limitarQuantidade } from '../lib/carrinho'
import { useCarrinho } from '../lib/CarrinhoContexto'
import { formatarPreco } from '../lib/formato'
import { useMeta } from '../lib/useMeta'

export function Produto() {
  const { slug } = useParams()
  const produto = produtos.find((p) => p.slug === slug)
  if (!produto) return <NaoEncontrado />
  return <ProdutoDetalhe key={produto.slug} produto={produto} />
}

const vistas = [
  { id: 'geral', rotulo: 'Vista geral' },
  { id: 'detalhe', rotulo: 'Detalhe' },
  { id: 'tons', rotulo: 'Tons alternativos' },
] as const

function ProdutoDetalhe({ produto }: { produto: TipoProduto }) {
  useMeta(produto.nome, produto.resumo)
  const { despachar, novaLinha } = useCarrinho()
  const [vista, setVista] = useState<(typeof vistas)[number]['id']>('geral')
  const [quantidade, setQuantidade] = useState(1)
  const [cartao, setCartao] = useState('')
  const [ocasiao, setOcasiao] = useState(produto.ocasioes[0] ?? '')
  const [dataEntrega, setDataEntrega] = useState('')
  const [escolhidos, setEscolhidos] = useState<string[]>([])
  const [mensagem, setMensagem] = useState('')

  const categoria = categorias.find((c) => c.id === produto.categoria)
  const relacionados = produtos
    .filter((p) => p.id !== produto.id && (p.categoria === produto.categoria || p.ocasioes.some((o) => produto.ocasioes.includes(o))))
    .slice(0, 3)

  const totalUnitario =
    produto.precoCentavos + complementos.filter((c) => escolhidos.includes(c.id)).reduce((s, c) => s + c.precoCentavos, 0)

  function alternarComplemento(id: string) {
    setEscolhidos((atual) => (atual.includes(id) ? atual.filter((x) => x !== id) : [...atual, id]))
  }

  function adicionar() {
    despachar({
      tipo: 'adicionar',
      linha: novaLinha(),
      item: {
        produtoId: produto.id,
        quantidade,
        cartao,
        ocasiao,
        dataEntrega,
        complementos: escolhidos,
      },
    })
    setMensagem(`${produto.nome} foi adicionado ao carrinho de demonstração.`)
  }

  const tonsAlternativos: [string, string] = [produto.tons[1], produto.tons[0]]

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8 lg:pt-12">
      <nav aria-label="Caminho da página" className="mb-8 text-sm text-vinho/70">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link to="/catalogo" className="hover:text-vinho hover:underline">
              Catálogo
            </Link>
          </li>
          {categoria && (
            <li>
              <span aria-hidden="true">/ </span>
              <Link to={`/catalogo?categoria=${categoria.id}`} className="hover:text-vinho hover:underline">
                {categoria.nome}
              </Link>
            </li>
          )}
          <li aria-current="page" className="text-vinho">
            <span aria-hidden="true">/ </span>
            {produto.nome}
          </li>
        </ol>
      </nav>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-4 lg:col-span-7">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-rosa-claro">
            <div className="h-full w-full transition-transform duration-700 ease-suave" style={{ transform: vista === 'detalhe' ? 'scale(1.55)' : 'none', transformOrigin: '50% 40%' }}>
              <Ilustracao
                arte={produto.arte}
                tons={vista === 'tons' ? tonsAlternativos : produto.tons}
                titulo={`${produto.nome}, ilustração demonstrativa (${vista === 'geral' ? 'vista geral' : vista === 'detalhe' ? 'detalhe' : 'tons alternativos'})`}
              />
            </div>
            <p className="absolute bottom-3 left-3 rounded-full bg-creme/90 px-3 py-1 text-xs text-vinho">Ilustração de demonstração</p>
          </div>
          <div role="group" aria-label="Galeria de imagens" className="grid grid-cols-3 gap-3">
            {vistas.map((v) => (
              <button
                key={v.id}
                type="button"
                aria-pressed={vista === v.id}
                onClick={() => setVista(v.id)}
                className={`rounded-2xl border p-2 text-xs transition-colors ${
                  vista === v.id ? 'border-vinho bg-branco text-vinho' : 'border-vinho/15 text-vinho/70 hover:border-vinho/40'
                }`}
              >
                <span className="block aspect-square overflow-hidden rounded-xl bg-rosa-claro">
                  <Ilustracao arte={produto.arte} tons={v.id === 'tons' ? tonsAlternativos : produto.tons} />
                </span>
                <span className="mt-2 block text-center">{v.rotulo}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="space-y-6 lg:sticky lg:top-28">
            <div className="space-y-4">
              {categoria && <p className="text-sm text-vinho/70">{categoria.nome}</p>}
              <h1 className="text-5xl leading-[1.02] text-vinho">{produto.nome}</h1>
              <p className="text-2xl text-vinho">
                {formatarPreco(totalUnitario)}
                <span className="ml-3 align-middle text-sm text-vinho/60">valor ilustrativo, sem relação com a tabela da loja</span>
              </p>
              <p className="texto-apoio">{produto.descricao}</p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-vinho/80 marker:text-ouro">
                {produto.composicao.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            {!produto.disponivel ? (
              <p className="rounded-xl bg-rosa-claro px-5 py-4 text-sm text-vinho">
                Esta peça aparece como indisponível na demonstração. Consulte o catálogo atual da loja.
              </p>
            ) : (
              <fieldset className="space-y-6 rounded-[1.5rem] border border-vinho/12 bg-branco p-6 sm:p-7">
                <legend className="px-1 font-serif text-2xl text-vinho">Personalize seu presente</legend>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="ocasiao-produto" className="rotulo mb-1.5 block">
                      Ocasião
                    </label>
                    <select id="ocasiao-produto" className="campo" value={ocasiao} onChange={(e) => setOcasiao(e.target.value)}>
                      <option value="">Escolher depois</option>
                      {ocasioes.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="data-entrega" className="rotulo mb-1.5 block">
                      Data desejada
                    </label>
                    <input
                      id="data-entrega"
                      type="date"
                      className="campo"
                      min={hojeIso()}
                      value={dataEntrega}
                      onChange={(e) => setDataEntrega(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <label htmlFor="cartao" className="rotulo">
                      Mensagem do cartão
                    </label>
                    <span className="text-xs text-vinho/60" aria-live="off">
                      {cartao.length}/{LIMITE_CARTAO}
                    </span>
                  </div>
                  <textarea
                    id="cartao"
                    rows={3}
                    maxLength={LIMITE_CARTAO}
                    className="campo resize-none"
                    placeholder="Escreva uma frase para acompanhar as flores"
                    value={cartao}
                    onChange={(e) => setCartao(e.target.value)}
                  />
                </div>

                <div>
                  <p className="rotulo mb-2">Complementos ilustrativos</p>
                  <ul className="space-y-2">
                    {complementos.map((c) => {
                      const ativo = escolhidos.includes(c.id)
                      return (
                        <li key={c.id}>
                          <label
                            className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl border px-4 py-3 transition-colors ${
                              ativo ? 'border-vinho bg-vinho/5' : 'border-vinho/15 hover:border-vinho/40'
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                className="h-4 w-4 accent-vinho"
                                checked={ativo}
                                onChange={() => alternarComplemento(c.id)}
                              />
                              <span>
                                <span className="block text-sm font-medium text-vinho">{c.nome}</span>
                                <span className="block text-xs text-vinho/60">{c.descricao}</span>
                              </span>
                            </span>
                            <span className="shrink-0 text-sm text-vinho">+ {formatarPreco(c.precoCentavos)}</span>
                          </label>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                <div className="flex flex-col gap-4 border-t border-vinho/10 pt-6 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-1 rounded-full border border-vinho/20 p-1 self-start" role="group" aria-label="Quantidade">
                    <button
                      type="button"
                      className="flex h-11 w-11 items-center justify-center rounded-full text-vinho hover:bg-vinho/5 disabled:opacity-40"
                      onClick={() => setQuantidade((q) => limitarQuantidade(q - 1))}
                      disabled={quantidade <= 1}
                      aria-label="Diminuir quantidade"
                    >
                      <Minus className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <output className="w-10 text-center text-base font-medium text-vinho" aria-live="polite">
                      {quantidade}
                    </output>
                    <button
                      type="button"
                      className="flex h-11 w-11 items-center justify-center rounded-full text-vinho hover:bg-vinho/5 disabled:opacity-40"
                      onClick={() => setQuantidade((q) => limitarQuantidade(q + 1))}
                      disabled={quantidade >= LIMITE_QUANTIDADE}
                      aria-label="Aumentar quantidade"
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                  <button type="button" onClick={adicionar} className="botao-primario flex-1">
                    <ShoppingBag className="h-4.5 w-4.5" aria-hidden="true" />
                    Adicionar ao carrinho
                  </button>
                </div>

                <p role="status" className="min-h-5 text-sm text-vinho/80">
                  {mensagem}
                  {mensagem && (
                    <>
                      {' '}
                      <Link to="/carrinho" className="font-medium text-vinho underline underline-offset-4">
                        Ver carrinho
                      </Link>
                    </>
                  )}
                </p>
              </fieldset>
            )}

            <p className="text-xs leading-relaxed text-vinho/60">
              Demonstração: nenhum pedido é enviado e nenhum dado pessoal é coletado. Dia de entrega, mensagem e complementos
              serão confirmados pela loja. O limite de quantidade por item é {LIMITE_QUANTIDADE}.
            </p>
          </div>
        </div>
      </div>

      {relacionados.length > 0 && (
        <section aria-labelledby="relacionados" className="mt-28">
          <h2 id="relacionados" className="mb-10 text-4xl text-vinho">
            Você também pode gostar
          </h2>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-7">
            {relacionados.map((p) => (
              <li key={p.id}>
                <ProdutoCard produto={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

function hojeIso(): string {
  const agora = new Date()
  const mes = String(agora.getMonth() + 1).padStart(2, '0')
  const dia = String(agora.getDate()).padStart(2, '0')
  return `${agora.getFullYear()}-${mes}-${dia}`
}
