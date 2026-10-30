import { Link } from 'react-router-dom'
import { useMeta } from '../lib/useMeta'

export function NaoEncontrado() {
  useMeta('Página não encontrada')
  return (
    <div className="mx-auto max-w-2xl px-4 py-28 text-center sm:px-6">
      <p className="text-sm text-vinho/70">Erro 404</p>
      <h1 className="mt-4 text-5xl text-vinho">Esta página não existe</h1>
      <p className="texto-apoio mx-auto mt-5 max-w-md">Talvez o endereço tenha mudado. Volte à página inicial ou explore a coleção.</p>
      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <Link to="/" className="botao-primario">
          Página inicial
        </Link>
        <Link to="/catalogo" className="botao-secundario">
          Ver catálogo
        </Link>
      </div>
    </div>
  )
}
