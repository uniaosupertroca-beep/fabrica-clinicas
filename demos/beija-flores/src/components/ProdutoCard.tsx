import { Link } from 'react-router-dom'
import type { Produto } from '../data/catalogo'
import { formatarPreco } from '../lib/formato'
import { ProdutoImagem } from './ProdutoImagem'

export function ProdutoCard({ produto }: { produto: Produto }) {
  return (
    <article className="group flex flex-col">
      <Link
        to={`/produto/${produto.slug}`}
        className="relative block aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-rosa-claro"
        aria-label={`Ver detalhes: ${produto.nome}`}
      >
        <div className="h-full w-full transition-transform duration-700 ease-suave group-hover:scale-[1.035]">
          <ProdutoImagem produto={produto} />
        </div>
        {!produto.disponivel && (
          <span className="absolute left-3 top-3 rounded-full bg-creme/95 px-3 py-1 text-xs text-vinho">
            Indisponível na demonstração
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 pt-5">
        <h3 className="text-2xl leading-tight text-vinho">
          <Link to={`/produto/${produto.slug}`} className="hover:underline decoration-ouro underline-offset-4">
            {produto.nome}
          </Link>
        </h3>
        <p className="texto-apoio text-[0.95rem]">{produto.resumo}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <p className="text-sm text-vinho">
            <span className="font-medium">{formatarPreco(produto.precoCentavos)}</span>
            <span className="ml-2 text-xs text-vinho/55">ilustrativo</span>
          </p>
          <Link to={`/produto/${produto.slug}`} className="text-sm font-medium text-vinho underline-offset-4 hover:underline">
            Ver detalhes
          </Link>
        </div>
      </div>
    </article>
  )
}
