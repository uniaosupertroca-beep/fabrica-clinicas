import { useEffect } from 'react'

const SUFIXO = ' · Floricultura Beija-Flores'

/** Atualiza título e descrição da página ao navegar (SPA). */
export function useMeta(titulo: string, descricao?: string) {
  useEffect(() => {
    document.title = titulo.includes('Beija-Flores') ? titulo : `${titulo}${SUFIXO}`
    if (descricao) {
      let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'description'
        document.head.appendChild(meta)
      }
      meta.content = descricao
    }
  }, [titulo, descricao])
}
