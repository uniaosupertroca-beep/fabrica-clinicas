import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Layout } from './components/Layout'
import { CarrinhoProvider } from './lib/CarrinhoContexto'
import { Carrinho } from './pages/Carrinho'
import { Catalogo } from './pages/Catalogo'
import { Contato } from './pages/Contato'
import { Finalizar } from './pages/Finalizar'
import { Historia } from './pages/Historia'
import { Home } from './pages/Home'
import { Institucional } from './pages/Institucional'
import { NaoEncontrado } from './pages/NaoEncontrado'
import { Ocasioes } from './pages/Ocasioes'
import { Produto } from './pages/Produto'

const Apresentacao = lazy(() => import('./pages/Apresentacao').then((m) => ({ default: m.Apresentacao })))
const Painel = lazy(() => import('./pages/Painel').then((m) => ({ default: m.Painel })))
const Inspiracoes = lazy(() => import('./pages/Inspiracoes').then((m) => ({ default: m.Inspiracoes })))

/** Volta ao topo a cada troca de página, exceto quando há âncora na URL. */
function RolarAoTrocarRota() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

export function App() {
  return (
    <CarrinhoProvider>
      <RolarAoTrocarRota />
      <Routes>
        {/* Apresentação comercial: tela própria, sem o cabeçalho da loja */}
        <Route path="/apresentacao" element={<Suspense fallback={null}><Apresentacao /></Suspense>} />

        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="catalogo" element={<Catalogo />} />
          <Route path="produto/:slug" element={<Produto />} />
          <Route path="ocasioes" element={<Ocasioes />} />
          <Route path="carrinho" element={<Carrinho />} />
          <Route path="finalizar" element={<Finalizar />} />
          <Route path="nossa-historia" element={<Historia />} />
          <Route path="contato" element={<Contato />} />
          <Route path="inspiracoes" element={<Suspense fallback={null}><Inspiracoes /></Suspense>} />
          <Route path="painel" element={<Suspense fallback={null}><Painel /></Suspense>} />
          <Route path="privacidade" element={<Institucional tipo="privacidade" />} />
          <Route path="termos" element={<Institucional tipo="termos" />} />
          <Route path="*" element={<NaoEncontrado />} />
        </Route>
      </Routes>
    </CarrinhoProvider>
  )
}
