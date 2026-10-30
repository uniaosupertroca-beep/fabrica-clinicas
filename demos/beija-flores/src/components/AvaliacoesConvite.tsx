import { ExternalLink } from 'lucide-react'
import { empresa } from '../data/empresa'

export type Avaliacao = {
  id: string
  autor: string
  nota: 1 | 2 | 3 | 4 | 5
  texto: string
  data: string
  verificada: boolean
}

/**
 * Vitrine de avaliações. Só exibe avaliações recebidas e verificadas.
 * Enquanto a lista estiver vazia, mostra um convite discreto para a
 * reputação pública da empresa. Nenhum dado é inventado.
 */
export function Avaliacoes({ itens = [] }: { itens?: Avaliacao[] }) {
  const verificadas = itens.filter((a) => a.verificada)

  if (verificadas.length === 0) {
    return (
      <div className="flex flex-col items-start gap-5 rounded-[1.5rem] border border-dashed border-vinho/25 bg-branco/60 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
        <p className="max-w-xl text-vinho/80">
          Quando a loja autorizar, as avaliações reais de clientes aparecerão aqui. Enquanto isso, você pode conhecer a
          reputação da Floricultura Beija-Flores no Google.
        </p>
        <a
          href={empresa.reputacao}
          target="_blank"
          rel="noopener noreferrer"
          className="botao-secundario"
          aria-label="Ver avaliações da Floricultura Beija-Flores no Google (link a validar), abre em nova aba"
        >
          Ver a reputação no Google
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    )
  }

  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {verificadas.map((a) => (
        <li key={a.id} className="rounded-[1.25rem] bg-branco p-7">
          <p className="font-serif text-xl text-ouro-escuro" aria-label={`Nota ${a.nota} de 5`}>
            {'★'.repeat(a.nota)}
            <span className="text-vinho/25">{'★'.repeat(5 - a.nota)}</span>
          </p>
          <p className="mt-4 leading-relaxed text-vinho/85">{a.texto}</p>
          <p className="mt-5 text-sm text-vinho/60">
            {a.autor} · {a.data}
          </p>
        </li>
      ))}
    </ul>
  )
}
