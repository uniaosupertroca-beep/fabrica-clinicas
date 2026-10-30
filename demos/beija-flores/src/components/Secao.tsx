import type { ReactNode } from 'react'

type Props = {
  titulo: string
  id?: string
  descricao?: ReactNode
  children: ReactNode
  className?: string
  acao?: ReactNode
}

/** Cabeçalho de seção padrão: título em serifa, texto de apoio à esquerda. */
export function Secao({ titulo, id, descricao, children, className = '', acao }: Props) {
  const tituloId = id ? `${id}-titulo` : undefined
  return (
    <section aria-labelledby={tituloId} className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl space-y-3">
          <h2 id={tituloId} className="text-4xl leading-[1.08] text-vinho sm:text-5xl">
            {titulo}
          </h2>
          {descricao && <div className="texto-apoio max-w-prose text-base">{descricao}</div>}
        </div>
        {acao}
      </div>
      {children}
    </section>
  )
}
