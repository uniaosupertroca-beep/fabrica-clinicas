import { Ilustracao } from '../components/Ilustracao'
import { produtos } from '../data/catalogo'
import { useMeta } from '../lib/useMeta'

const referencias = [
  { titulo: 'Buquê em tons de vinho', arte: 'rosa', tons: ['#8e2f45', '#c95f72'] },
  { titulo: 'Girassóis e juta', arte: 'girassol', tons: ['#e0b04f', '#8f7650'] },
  { titulo: 'Lírios em vaso fosco', arte: 'lirio', tons: ['#f4efe8', '#d9b5b5'] },
  { titulo: 'Orquídea de vidro', arte: 'orquidea', tons: ['#ffffff', '#c9a7b3'] },
  { titulo: 'Cesta de presente', arte: 'cesta', tons: ['#c5a67b', '#65745a'] },
  { titulo: 'Flores do campo', arte: 'campo', tons: ['#ffffff', '#e8c9a6'] },
] as const

export function Inspiracoes() {
  useMeta('Galeria de inspirações', 'Referências visuais de arranjos, buquês e composições. Ilustrativas.')
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <header className="mb-14 max-w-3xl space-y-5">
        <h1 className="text-5xl leading-none text-vinho sm:text-6xl">Galeria de inspirações</h1>
        <p className="texto-apoio text-lg">
          Referências visuais para escolher o estilo de um presente. As imagens são ilustrações originais de demonstração.
          Serão substituídas pelo acervo fotográfico da loja.
        </p>
      </header>

      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
        {referencias.map((r, i) => (
          <li key={r.titulo} className={`overflow-hidden rounded-[1.25rem] bg-rosa-claro ${i === 0 ? 'row-span-2' : ''}`}>
            <figure className="relative h-full">
              <div className={`${i === 0 ? 'aspect-[3/4] md:aspect-auto md:h-full' : 'aspect-[4/5]'} w-full`}>
                <Ilustracao arte={r.arte} tons={[...r.tons]} titulo={`${r.titulo}, referência ilustrativa`} />
              </div>
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-creme/90 px-3 py-1 text-xs text-vinho">
                {r.titulo}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <p className="mt-12 max-w-2xl text-sm text-vinho/70">
        Peças do catálogo de demonstração relacionadas a estas referências:{' '}
        {produtos
          .slice(0, 3)
          .map((p) => p.nome)
          .join(', ')}
        .
      </p>
    </div>
  )
}
