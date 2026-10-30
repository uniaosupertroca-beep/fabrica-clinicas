import { Link } from 'react-router-dom'
import { Ilustracao } from '../components/Ilustracao'
import { ocasioes, produtos } from '../data/catalogo'
import { useMeta } from '../lib/useMeta'

export function Ocasioes() {
  useMeta('Compre por ocasião', 'Coleções de demonstração para aniversários, namorados, agradecimentos, nascimentos, casamentos e homenagens.')
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <header className="mb-14 max-w-3xl space-y-5">
        <h1 className="text-5xl leading-none text-vinho sm:text-6xl">Compre por ocasião</h1>
        <p className="texto-apoio text-lg">
          Cada momento tem uma linguagem própria. Escolha a ocasião e veja uma coleção de demonstração pensada para ela.
        </p>
      </header>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ocasioes.map((o, indice) => {
          const exemplo = produtos.find((p) => p.ocasioes.includes(o.id))
          const destaque = indice === 0
          return (
            <li key={o.id} className={destaque ? 'sm:col-span-2' : ''}>
              <Link
                to={`/catalogo?ocasiao=${o.id}`}
                className={`group grid h-full overflow-hidden rounded-[1.5rem] bg-branco ring-1 ring-vinho/10 transition-shadow duration-500 hover:shadow-[0_24px_50px_-28px_rgba(84,46,61,0.5)] ${
                  destaque ? 'sm:grid-cols-2' : ''
                }`}
              >
                <span className={`block bg-rosa-claro ${destaque ? 'aspect-[4/3] sm:aspect-auto' : 'aspect-[4/3]'}`}>
                  {exemplo && <Ilustracao arte={exemplo.arte} tons={exemplo.tons} />}
                </span>
                <span className="flex flex-col justify-end gap-3 p-7">
                  <span className="font-serif text-3xl leading-tight text-vinho">{o.nome}</span>
                  <span className="texto-apoio text-[0.95rem]">{o.descricao}</span>
                  <span className="pt-2 text-sm font-medium text-vinho underline-offset-4 group-hover:underline">
                    Ver coleção de demonstração
                  </span>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
