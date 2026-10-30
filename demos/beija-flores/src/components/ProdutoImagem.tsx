import type { Produto } from '../data/catalogo'
import { Ilustracao } from './Ilustracao'

type Props = {
  produto: Produto
  /** Amplia a foto para a vista de detalhe da galeria. */
  zoom?: boolean
  className?: string
}

/** Mostra a foto real do produto quando existir; caso contrário, a ilustração demonstrativa. */
export function ProdutoImagem({ produto, zoom = false, className = '' }: Props) {
  if (!produto.foto) {
    return <Ilustracao arte={produto.arte} tons={produto.tons} />
  }
  return (
    <img
      src={`/fotos/${produto.foto}`}
      alt={produto.nome}
      loading="lazy"
      decoding="async"
      className={`h-full w-full object-cover transition-transform duration-700 ease-suave ${className}`}
      style={zoom ? { transform: 'scale(1.5)' } : undefined}
    />
  )
}
