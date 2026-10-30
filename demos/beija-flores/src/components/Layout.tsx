import { useEffect, useState, type FormEvent } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import { empresa, avisoDemonstracao, regioesAtendidas } from '../data/empresa'
import { categorias } from '../data/catalogo'
import { menuPrincipal } from '../data/navegacao'
import { useCarrinho } from '../lib/CarrinhoContexto'
import { Logo } from './Logo'

function DemoBanner() {
  return (
    <div className="bg-vinho px-4 py-1.5 text-center text-[0.72rem] leading-snug tracking-wide text-creme/90">
      {avisoDemonstracao}
    </div>
  )
}

function BuscaCabecalho({ onBuscar, id }: { onBuscar?: () => void; id: string }) {
  const navigate = useNavigate()
  const [termo, setTermo] = useState('')

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    const texto = termo.trim()
    navigate(texto ? `/catalogo?q=${encodeURIComponent(texto)}` : '/catalogo')
    setTermo('')
    onBuscar?.()
  }

  return (
    <form role="search" onSubmit={enviar} className="relative">
      <label htmlFor={id} className="sr-only">
        Buscar produtos
      </label>
      <input
        id={id}
        type="search"
        value={termo}
        onChange={(e) => setTermo(e.target.value)}
        placeholder="Buscar buquês, orquídeas..."
        className="h-10 w-full rounded-full border border-vinho/15 bg-branco/70 pl-10 pr-4 text-sm text-vinho placeholder:text-vinho/45 focus:border-ouro focus:outline-none"
      />
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-vinho/55" aria-hidden="true" />
    </form>
  )
}

function Cabecalho() {
  const { resumo } = useCarrinho()
  const location = useLocation()
  const [menuAberto, setMenuAberto] = useState(false)

  useEffect(() => {
    setMenuAberto(false)
  }, [location.pathname, location.search])

  useEffect(() => {
    if (!menuAberto) return
    function aoPressionarTecla(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuAberto(false)
    }
    window.addEventListener('keydown', aoPressionarTecla)
    return () => window.removeEventListener('keydown', aoPressionarTecla)
  }, [menuAberto])

  return (
    <header className="sticky top-0 z-40 border-b border-vinho/10 bg-creme/92 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" aria-label="Floricultura Beija-Flores, página inicial" className="shrink-0 rounded-md">
          <Logo variante="completa" className="scale-90 origin-left sm:scale-100" />
        </Link>

        <nav aria-label="Principal" className="ml-auto hidden items-center gap-4 xl:flex">
          {menuPrincipal.map((item) => (
            <NavLink
              key={item.rotulo}
              to={item.href}
              end={item.href === '/'}
              className={({ isActive }) =>
                `relative whitespace-nowrap py-1 text-sm text-vinho/80 transition-colors hover:text-vinho after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-ouro after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                  isActive ? 'text-vinho after:scale-x-100' : ''
                }`
              }
            >
              {item.rotulo}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto hidden w-48 lg:block 2xl:w-60 xl:ml-2">
          <BuscaCabecalho id="busca-desktop" />
        </div>

        <div className="ml-auto flex items-center gap-2 xl:ml-0">
          <Link to="/contato" className="botao-secundario hidden min-h-10 whitespace-nowrap px-4 md:inline-flex">
            Fale conosco
          </Link>
          <Link
            to="/carrinho"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-vinho transition-colors hover:bg-vinho/5"
            aria-label={`Carrinho de demonstração, ${resumo.itens} ${resumo.itens === 1 ? 'item' : 'itens'}`}
          >
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            {resumo.itens > 0 && (
              <span className="absolute right-1 top-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-vinho px-1 text-[0.65rem] font-medium text-creme">
                {resumo.itens}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-vinho transition-colors hover:bg-vinho/5 xl:hidden"
            aria-expanded={menuAberto}
            aria-controls="menu-mobile"
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMenuAberto((v) => !v)}
          >
            {menuAberto ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        hidden={!menuAberto}
        className="border-t border-vinho/10 bg-creme px-4 pb-8 pt-5 xl:hidden"
      >
        <div className="mb-6">
          <BuscaCabecalho id="busca-mobile" onBuscar={() => setMenuAberto(false)} />
        </div>
        <nav aria-label="Menu do celular" className="flex flex-col">
          {menuPrincipal.map((item) => (
            <Link
              key={item.rotulo}
              to={item.href}
              className="border-b border-vinho/10 py-3.5 font-serif text-2xl text-vinho"
            >
              {item.rotulo}
            </Link>
          ))}
        </nav>
        <p className="mt-6 text-sm text-vinho/70">
          {empresa.endereco.logradouro} · {empresa.endereco.bairro}, {empresa.endereco.cidade}
        </p>
        <a href={empresa.telefone.link} className="mt-2 inline-block font-medium text-vinho">
          {empresa.telefone.exibicao}
        </a>
      </div>
    </header>
  )
}

function Rodape() {
  return (
    <footer className="mt-24 border-t border-vinho/10 bg-branco">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="space-y-5">
          <Logo variante="completa" />
          <p className="max-w-xs text-sm texto-apoio">
            Flores selecionadas e cuidado artesanal desde 1995, no Centro de Balneário Camboriú.
          </p>
        </div>

        <nav aria-label="Rodapé: navegação" className="space-y-3 text-sm">
          <h2 className="font-serif text-lg">Navegação</h2>
          <ul className="space-y-2.5 text-vinho/75">
            {menuPrincipal.map((item) => (
              <li key={item.rotulo}>
                <Link to={item.href} className="hover:text-vinho">
                  {item.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Rodapé: categorias" className="space-y-3 text-sm">
          <h2 className="font-serif text-lg">Categorias</h2>
          <ul className="space-y-2.5 text-vinho/75">
            {categorias.map((c) => (
              <li key={c.id}>
                <Link to={`/catalogo?categoria=${c.id}`} className="hover:text-vinho">
                  {c.nome}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-5 text-sm">
          <h2 className="font-serif text-lg">Visite e fale conosco</h2>
          <address className="not-italic leading-relaxed text-vinho/75">
            {empresa.endereco.logradouro}
            <br />
            {empresa.endereco.bairro}, {empresa.endereco.cidade} · {empresa.endereco.uf}
            <br />
            CEP {empresa.endereco.cep}
          </address>
          <p>
            <a href={empresa.telefone.link} className="font-medium text-vinho hover:underline">
              {empresa.telefone.exibicao}
            </a>
          </p>
          <p className="text-vinho/75">Regiões: {regioesAtendidas.join(', ')}.</p>
          <ul className="space-y-2 text-vinho/75">
            <li>
              <a href={empresa.catalogoAtual} target="_blank" rel="noopener noreferrer" className="hover:text-vinho hover:underline">
                Catálogo atual da loja (site existente)
              </a>
            </li>
            <li>
              <a href={empresa.endereco.mapa} target="_blank" rel="noopener noreferrer" className="hover:text-vinho hover:underline">
                Rota no Google Maps
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-vinho/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-vinho/65 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Floricultura Beija-Flores. Demonstração independente.</p>
          <div className="flex gap-5">
            <Link to="/privacidade" className="hover:text-vinho hover:underline">
              Política de privacidade
            </Link>
            <Link to="/termos" className="hover:text-vinho hover:underline">
              Termos de uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-vinho focus:px-4 focus:py-2 focus:text-creme"
      >
        Pular para o conteúdo
      </a>
      <DemoBanner />
      <Cabecalho />
      <main id="conteudo" className="flex-1">
        <Outlet />
      </main>
      <Rodape />
    </div>
  )
}
