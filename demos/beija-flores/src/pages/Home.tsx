import { Link } from 'react-router-dom'
import { ArrowUpRight, Flower2, HandHeart, MapPin } from 'lucide-react'
import { ProdutoImagem } from '../components/ProdutoImagem'
import { ProdutoCard } from '../components/ProdutoCard'
import { Secao } from '../components/Secao'
import { Avaliacoes } from '../components/AvaliacoesConvite'
import { empresa, regioesAtendidas } from '../data/empresa'
import { destaquesHome, ocasioes, produtos } from '../data/catalogo'
import { useMeta } from '../lib/useMeta'

const beneficios = [
  {
    icone: Flower2,
    titulo: 'Tradição desde 1995',
    texto: 'Quase três décadas e meia no Centro de Balneário Camboriú, acompanhando datas que importam.',
  },
  {
    icone: HandHeart,
    titulo: 'Arranjos preparados com cuidado',
    texto: 'Flores selecionadas e montagem feita com atenção a cada detalhe, da escolha à embalagem.',
  },
  {
    icone: MapPin,
    titulo: 'Entregas na região divulgada',
    texto: 'Atendimento em Balneário Camboriú, Itajaí, Camboriú e Itapema, conforme a disponibilidade da loja.',
  },
]

export function Home() {
  useMeta(
    'Floricultura Beija-Flores · Flores desde 1995',
    'Buquês, arranjos, orquídeas e presentes no Centro de Balneário Camboriú. Proposta visual demonstrativa.',
  )

  const destaques = destaquesHome
    .map((id) => produtos.find((p) => p.id === id))
    .filter((p): p is (typeof produtos)[number] => Boolean(p))

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-12 sm:px-6 md:pt-20 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:pb-28">
          <div className="space-y-8 lg:col-span-6">
            <p className="text-sm text-vinho/70">Em Balneário Camboriú desde {empresa.fundacao}</p>
            <h1 className="text-[2.9rem] leading-[1.02] text-vinho sm:text-6xl lg:text-[4.25rem]">
              {empresa.slogan}
            </h1>
            <p className="texto-apoio max-w-xl text-lg">{empresa.subtitulo}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/catalogo" className="botao-primario">
                Explorar Coleção
              </Link>
              <Link to="/nossa-historia" className="botao-secundario">
                Conheça Nossa História
              </Link>
            </div>
            <p className="border-l-2 border-ouro pl-4 text-sm text-vinho/80">
              Uma tradição que floresce desde 1995.
            </p>
          </div>

          <div className="relative lg:col-span-6">
            <div className="absolute -right-3 -top-3 hidden h-full w-full rounded-[2rem] border border-ouro/60 sm:block" aria-hidden="true" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-rosa-claro shadow-[0_30px_60px_-30px_rgba(84,46,61,0.35)] motion-safe:animate-[revelar_1.6s_var(--ease-suave)_both]">
              <img
                src="/fotos/buques-rosas-vermelhas.jpg"
                alt="Buquê de rosas vermelhas, foto do catálogo da Floricultura Beija-Flores"
                className="h-full w-full object-cover"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Benefícios" className="border-y border-vinho/10 bg-branco">
        <ul className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
          {beneficios.map(({ icone: Icone, titulo, texto }) => (
            <li key={titulo} className="flex gap-5">
              <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rosa-claro text-vinho">
                <Icone className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="space-y-2">
                <h2 className="text-2xl text-vinho">{titulo}</h2>
                <p className="texto-apoio text-[0.95rem]">{texto}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="py-24">
        <Secao
          id="vitrine"
          titulo="Vitrine em destaque"
          descricao="Peças de demonstração, com imagens ilustrativas. Os valores exibidos são fictícios."
          acao={
            <Link to="/catalogo" className="botao-secundario">
              Ver catálogo completo
            </Link>
          }
        >
          <div className="grid gap-x-7 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {destaques.map((p) => (
              <ProdutoCard key={p.id} produto={p} />
            ))}
          </div>
        </Secao>
      </div>

      <Secao
        id="ocasioes"
        titulo="Compre por ocasião"
        descricao="Escolha o momento e veja uma coleção pensada para ele."
        className="pb-24"
      >
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
          {ocasioes.map((o) => {
            const exemplo = produtos.find((p) => p.ocasioes.includes(o.id))
            return (
              <li key={o.id}>
                <Link
                  to={`/catalogo?ocasiao=${o.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] bg-branco ring-1 ring-vinho/10 transition-shadow duration-500 hover:shadow-[0_20px_40px_-24px_rgba(84,46,61,0.45)]"
                >
                  <span className="aspect-[4/5] bg-rosa-claro">
                    {exemplo && <ProdutoImagem produto={exemplo} />}
                  </span>
                  <span className="flex flex-1 flex-col gap-1 p-4">
                    <span className="font-serif text-xl leading-tight text-vinho">{o.nome}</span>
                    <span className="text-xs text-vinho/65">{o.frase}</span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </Secao>

      <Secao
        id="entrega"
        titulo="Entregamos carinho até você"
        descricao={
          <>
            Atendemos as cidades divulgadas pela loja: {regioesAtendidas.join(', ')}. Taxa, prazo e disponibilidade são
            confirmados pela loja antes de cada pedido.
          </>
        }
        className="pb-24"
        acao={
          <Link to="/contato" className="botao-secundario">
            Consultar entrega
          </Link>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {regioesAtendidas.map((cidade) => (
            <div key={cidade} className="flex items-center justify-between rounded-2xl bg-rosa-claro/60 px-6 py-6">
              <span className="font-serif text-2xl text-vinho">{cidade}</span>
              <MapPin className="h-5 w-5 text-vinho/60" aria-hidden="true" />
            </div>
          ))}
        </div>
      </Secao>

      <Secao
        id="reputacao"
        titulo="Confiança construída com o tempo"
        descricao="Avaliações verificadas da loja aparecerão aqui, após autorização. Não exibimos nenhuma avaliação fictícia."
        className="pb-24"
      >
        <Avaliacoes />
      </Secao>

      <section aria-labelledby="chamada-final" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 rounded-[2rem] bg-vinho px-8 py-14 text-creme md:grid-cols-[1fr_auto] md:px-14">
          <div className="space-y-4">
            <h2 id="chamada-final" className="text-4xl leading-tight sm:text-5xl">
              Uma flor certa para cada história.
            </h2>
            <p className="max-w-xl text-creme/80">
              Explore a coleção de demonstração ou visite o catálogo atual da loja, que segue como referência oficial.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Link to="/catalogo" className="inline-flex min-h-11 items-center justify-center rounded-full bg-creme px-6 text-sm font-medium text-vinho transition-colors hover:bg-branco">
              Explorar Coleção
            </Link>
            <a
              href={empresa.catalogoAtual}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-creme/40 px-6 text-sm font-medium text-creme transition-colors hover:bg-creme/10"
            >
              Comprar no catálogo atual
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
