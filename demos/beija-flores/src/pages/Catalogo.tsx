import { useMemo, type ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { X } from 'lucide-react'
import { ProdutoCard } from '../components/ProdutoCard'
import { avisoPrecos, categorias, ocasioes, produtos } from '../data/catalogo'
import { filtrarProdutos, ordemValida, ordensDisponiveis, type FiltrosCatalogo } from '../lib/filtros'
import { useMeta } from '../lib/useMeta'

export function Catalogo() {
  useMeta('Catálogo de demonstração', 'Buquês, arranjos, orquídeas, cestas e homenagens florais. Catálogo ilustrativo.')
  const [params, setParams] = useSearchParams()

  const filtros: FiltrosCatalogo = useMemo(
    () => ({
      categoria: params.get('categoria') && categorias.some((c) => c.id === params.get('categoria')) ? params.get('categoria') : null,
      ocasiao: params.get('ocasiao') && ocasioes.some((o) => o.id === params.get('ocasiao')) ? params.get('ocasiao') : null,
      busca: params.get('q') ?? '',
      ordem: ordemValida(params.get('ordem')),
    }),
    [params],
  )

  const resultado = useMemo(() => filtrarProdutos(produtos, filtros), [filtros])
  const categoriaAtual = categorias.find((c) => c.id === filtros.categoria)
  const ocasiaoAtual = ocasioes.find((o) => o.id === filtros.ocasiao)
  const filtrosAtivos = Boolean(filtros.categoria || filtros.ocasiao || filtros.busca)

  function atualizar(chave: string, valor: string | null) {
    const proximo = new URLSearchParams(params)
    if (valor) proximo.set(chave, valor)
    else proximo.delete(chave)
    setParams(proximo, { replace: true })
  }

  const titulo = ocasiaoAtual ? ocasiaoAtual.nome : categoriaAtual ? categoriaAtual.nome : 'Catálogo'

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <header className="mb-10 max-w-3xl space-y-4">
        <p className="text-sm text-vinho/70">Coleção de demonstração</p>
        <h1 className="text-5xl leading-none text-vinho sm:text-6xl">{titulo}</h1>
        <p className="texto-apoio text-lg">
          {ocasiaoAtual?.descricao ?? categoriaAtual?.descricao ?? 'Encontre a peça ideal por tipo, ocasião ou nome.'}
        </p>
        <p className="rounded-xl border border-ouro/40 bg-branco/70 px-4 py-3 text-sm text-vinho/75">{avisoPrecos}</p>
      </header>

      <div className="mb-8 space-y-5 border-b border-vinho/10 pb-6">
        <nav aria-label="Categorias" className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
          <ul className="flex w-max gap-2">
            <li>
              <ChipCategoria ativo={!filtros.categoria} onClick={() => atualizar('categoria', null)}>
                Todas
              </ChipCategoria>
            </li>
            {categorias.map((c) => (
              <li key={c.id}>
                <ChipCategoria ativo={filtros.categoria === c.id} onClick={() => atualizar('categoria', c.id)}>
                  {c.nome}
                </ChipCategoria>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid gap-4 md:grid-cols-[1fr_auto_auto] md:items-end">
          <div>
            <label htmlFor="busca-catalogo" className="rotulo mb-1.5 block">
              Pesquisar produto
            </label>
            <input
              id="busca-catalogo"
              type="search"
              className="campo"
              placeholder="Ex.: rosas, orquídea, girassol"
              value={filtros.busca}
              onChange={(e) => atualizar('q', e.target.value || null)}
            />
          </div>
          <div>
            <label htmlFor="filtro-ocasiao" className="rotulo mb-1.5 block">
              Ocasião
            </label>
            <select
              id="filtro-ocasiao"
              className="campo md:w-56"
              value={filtros.ocasiao ?? ''}
              onChange={(e) => atualizar('ocasiao', e.target.value || null)}
            >
              <option value="">Todas as ocasiões</option>
              {ocasioes.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.nome}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="ordenacao" className="rotulo mb-1.5 block">
              Ordenar por
            </label>
            <select id="ordenacao" className="campo md:w-52" value={filtros.ordem} onChange={(e) => atualizar('ordem', e.target.value === 'relevancia' ? null : e.target.value)}>
              {ordensDisponiveis.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.rotulo}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-vinho/75" aria-live="polite">
            {resultado.length === 1 ? '1 peça encontrada' : `${resultado.length} peças encontradas`}
          </p>
          {filtrosAtivos && (
            <button
              type="button"
              onClick={() => setParams(new URLSearchParams(), { replace: true })}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-vinho underline-offset-4 hover:underline"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      {resultado.length > 0 ? (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-7 lg:grid-cols-4">
          {resultado.map((p) => (
            <li key={p.id}>
              <ProdutoCard produto={p} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-[1.5rem] border border-dashed border-vinho/25 px-6 py-16 text-center">
          <h2 className="text-3xl text-vinho">Nenhuma peça com esses filtros</h2>
          <p className="texto-apoio mx-auto mt-3 max-w-md">
            Ajuste a busca ou limpe os filtros para ver toda a coleção de demonstração.
          </p>
          <Link to="/catalogo" className="botao-secundario mt-8" onClick={() => setParams(new URLSearchParams(), { replace: true })}>
            Ver todo o catálogo
          </Link>
        </div>
      )}
    </div>
  )
}

function ChipCategoria({ ativo, onClick, children }: { ativo: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={ativo}
      className={`min-h-10 whitespace-nowrap rounded-full border px-4 text-sm transition-colors duration-200 ${
        ativo ? 'border-vinho bg-vinho text-creme' : 'border-vinho/20 text-vinho hover:border-vinho/50'
      }`}
    >
      {children}
    </button>
  )
}
