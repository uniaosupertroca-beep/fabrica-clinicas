import { Link } from 'react-router-dom'
import { ArrowRight, Flower2 } from 'lucide-react'
import { Ilustracao } from '../components/Ilustracao'
import { Logo } from '../components/Logo'
import { empresa } from '../data/empresa'
import { useMeta } from '../lib/useMeta'

const slides = [
  { id: 'capa', rotulo: 'Capa' },
  { id: 'conceito', rotulo: 'Conceito' },
  { id: 'beneficios', rotulo: 'Benefícios' },
  { id: 'experiencia', rotulo: 'Experiência' },
  { id: 'recursos', rotulo: 'Recursos' },
  { id: 'personalizacao', rotulo: 'Personalização' },
  { id: 'proximos-passos', rotulo: 'Próximos passos' },
] as const

const cabecalhoSlide = 'mb-8 text-sm text-vinho/70'

export function Apresentacao() {
  useMeta('Apresentação da proposta', 'Proposta de modernização digital para a Floricultura Beija-Flores.')
  return (
    <div className="bg-creme">
      <nav aria-label="Seções da apresentação" className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
        <ul className="flex flex-col gap-3">
          {slides.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-label={s.rotulo}
                className="group flex items-center justify-end gap-3"
              >
                <span className="text-xs text-vinho/0 transition-colors group-hover:text-vinho/70 group-focus-visible:text-vinho/70">{s.rotulo}</span>
                <span className="h-2.5 w-2.5 rounded-full border border-vinho/50 transition-colors group-hover:bg-vinho" />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* 1. Capa */}
      <section id="capa" className="relative flex min-h-dvh items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="space-y-8">
            <Logo variante="completa" />
            <h1 className="text-5xl leading-[1.02] text-vinho sm:text-7xl">Uma nova casa digital para a Beija-Flores</h1>
            <p className="texto-apoio max-w-xl text-lg">
              Uma proposta de modernização que preserva a tradição desde 1995 e apresenta a marca com a elegância que
              ela merece.
            </p>
            <p className="max-w-xl rounded-xl border border-ouro/40 bg-branco/70 px-4 py-3 text-sm text-vinho/75">
              Proposta visual demonstrativa — projeto independente, sujeito à aprovação da Floricultura Beija-Flores.
            </p>
          </div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] bg-rosa-claro">
            <Ilustracao arte="rosa" tons={['#8e2f45', '#d9b5b5']} titulo="Ilustração de capa, buquê demonstrativo" />
          </div>
        </div>
      </section>

      {/* 2. Conceito */}
      <section id="conceito" className="flex min-h-dvh items-center border-t border-vinho/10">
        <div className="mx-auto w-full max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
          <p className={cabecalhoSlide}>Conceito</p>
          <h2 className="text-4xl leading-tight text-vinho sm:text-6xl">Modernizar sem perder a alma da casa.</h2>
          <p className="texto-apoio mt-8 max-w-2xl text-lg">
            A marca já tem reconhecimento local e uma história construída desde 1995. O conceito propõe uma experiência
            digital à altura dessa trajetória: clara no catálogo, delicada na apresentação e simples no celular.
          </p>
          <p className="texto-apoio mt-5 max-w-2xl">
            O catálogo atual da loja segue como referência para pedidos. Esta proposta apenas imagina uma forma mais
            pessoal de mostrar o que a loja faz.
          </p>
        </div>
      </section>

      {/* 3. Benefícios */}
      <section id="beneficios" className="flex min-h-dvh items-center border-t border-vinho/10 bg-branco">
        <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          <p className={cabecalhoSlide}>Benefícios</p>
          <h2 className="mb-14 text-4xl leading-tight text-vinho sm:text-5xl">Uma loja com identidade própria</h2>
          <ul className="grid gap-10 md:grid-cols-3">
            {[
              ['Identidade reconhecível', 'Cores, tipografia e linguagem visual alinhadas à tradição da marca.'],
              ['Compra mais clara', 'Filtros por ocasião e categoria ajudam a encontrar o presente sem rolar uma lista infinita.'],
              ['Mais proximidade', 'Contato, endereço e regiões atendidas sempre à vista, com um caminho direto para a loja.'],
            ].map(([titulo, texto]) => (
              <li key={titulo} className="space-y-3 border-t border-ouro/60 pt-6">
                <h3 className="text-2xl text-vinho">{titulo}</h3>
                <p className="texto-apoio">{texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Experiência */}
      <section id="experiencia" className="flex min-h-dvh items-center border-t border-vinho/10">
        <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          <p className={cabecalhoSlide}>Demonstração da experiência</p>
          <h2 className="mb-12 text-4xl leading-tight text-vinho sm:text-5xl">Da inspiração ao carrinho, em poucos toques</h2>
          <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-center">
            <ol className="space-y-7">
              {[
                ['Explorar por ocasião', 'Aniversário, namorados, agradecimento ou homenagem: cada momento abre uma coleção própria.'],
                ['Personalizar o presente', 'Mensagem do cartão, data desejada e complementos ilustrativos, tudo na mesma tela.'],
                ['Revisar no carrinho', 'Quantidades, subtotal e resumo claros, com a opção de voltar a qualquer momento.'],
              ].map(([titulo, texto]) => (
                <li key={titulo} className="flex gap-5">
                  <Flower2 className="mt-1 h-5 w-5 shrink-0 text-ouro-escuro" aria-hidden="true" />
                  <div>
                    <h3 className="text-2xl text-vinho">{titulo}</h3>
                    <p className="texto-apoio mt-2">{texto}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link
              to="/catalogo"
              className="group relative block aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-rosa-claro"
              aria-label="Abrir a demonstração do catálogo"
            >
              <Ilustracao arte="girassol" tons={['#e0b04f', '#8f7650']} titulo="Ilustração de girassóis, abre o catálogo" />
              <span className="absolute bottom-4 left-4 rounded-full bg-creme/90 px-4 py-1.5 text-sm text-vinho transition-colors group-hover:bg-creme">
                Abrir o catálogo de demonstração
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Recursos */}
      <section id="recursos" className="flex min-h-dvh items-center border-t border-vinho/10 bg-branco">
        <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          <p className={cabecalhoSlide}>Recursos propostos</p>
          <h2 className="mb-12 text-4xl leading-tight text-vinho sm:text-5xl">O que a nova versão pode fazer</h2>
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {[
              'Catálogo com busca, filtros por categoria e por ocasião, e ordenação',
              'Página de produto com galeria, quantidade e mensagem do cartão',
              'Carrinho com alteração de quantidades e total do pedido',
              'Painel para gerir produtos, preços, disponibilidade, pedidos e regiões',
              'Consulta de CEP e orientação sobre taxa e disponibilidade',
              'Estrutura pronta para integrar pedidos, pagamentos e entregas no futuro',
            ].map((r) => (
              <li key={r} className="border-b border-vinho/10 pb-5 text-lg text-vinho/85">
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. Personalização */}
      <section id="personalizacao" className="flex min-h-dvh items-center border-t border-vinho/10">
        <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          <p className={cabecalhoSlide}>Possibilidades de personalização</p>
          <h2 className="mb-10 text-4xl leading-tight text-vinho sm:text-5xl">Cada presente pode contar a sua história</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[1.5rem] bg-branco p-8">
              <h3 className="text-2xl text-vinho">Para o cliente</h3>
              <p className="texto-apoio mt-3">
                Mensagem no cartão, data escolhida, complementos como chocolates, pelúcias e velas, e lembretes para
                ocasiões especiais.
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-branco p-8">
              <h3 className="text-2xl text-vinho">Para a loja</h3>
              <p className="texto-apoio mt-3">
                Destaques da vitrine, coleções sazonais, regiões de entrega e disponibilidade por dia, sempre sob o
                controle da equipe.
              </p>
            </div>
          </div>
          <p className="mt-8 text-sm text-vinho/65">
            Complementos e coleções apresentados aqui são ilustrativos, até a confirmação do catálogo real.
          </p>
        </div>
      </section>

      {/* 7. Próximos passos */}
      <section id="proximos-passos" className="flex min-h-dvh items-center border-t border-vinho/10 bg-vinho text-creme">
        <div className="mx-auto w-full max-w-5xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <p className="mb-8 text-sm text-creme/70">Próximos passos</p>
          <h2 className="text-4xl leading-tight sm:text-6xl">Um convite para conversar</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-creme/85">
            Se a proposta fizer sentido, o próximo passo é validar o catálogo real, as fotos autorizadas e os canais de
            contato com a equipe da loja. Tudo é ajustável ao jeito da Beija-Flores.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-creme/65">
            {empresa.endereco.logradouro}, {empresa.endereco.bairro} · {empresa.telefone.exibicao}
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-creme px-8 text-base font-medium text-vinho transition-colors hover:bg-branco"
            >
              Explorar o novo conceito de site
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={empresa.catalogoAtual}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center rounded-full border border-creme/40 px-8 text-base text-creme transition-colors hover:bg-creme/10"
            >
              Ver o catálogo atual
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
