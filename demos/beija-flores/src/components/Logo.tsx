/**
 * MARCA DEMONSTRATIVA. Não é o logotipo original da empresa, que deve ser
 * usado apenas em avaliação privada, com autorização. Este desenho original
 * apenas sugere a ilustração de beija-flor para a apresentação.
 */
type Props = { variante?: 'completa' | 'compacta'; className?: string }

export function Logo({ variante = 'completa', className = '' }: Props) {
  return (
    <span className={`inline-flex items-center gap-3 text-vinho ${className}`}>
      <svg viewBox="0 0 64 64" className="h-9 w-9 shrink-0" aria-hidden="true">
        <path d="M24 25 L6 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d="M30 30 C36 26 44 30 46 38 C40 44 31 41 27 35 Z" fill="#65745a" />
        <path d="M31 33 C35 35 37 39 35 42 C32 40 29 37 31 33 Z" fill="#d9b5b5" />
        <path d="M37 29 C42 13 58 11 60 17 C54 25 47 31 39 33 Z" fill="currentColor" opacity="0.88" />
        <path d="M45 38 L54 50 L48 49 L42 42 Z" fill="currentColor" />
        <circle cx="27.5" cy="26.5" r="4.6" fill="currentColor" />
        <circle cx="28.8" cy="25.6" r="1" fill="#f8f5ef" />
        <circle cx="32" cy="50" r="1.4" fill="#c5a67b" />
      </svg>
      {variante === 'completa' && (
        <span className="flex flex-col leading-none">
          <span className="font-sans text-[0.68rem] font-medium tracking-[0.2em] text-vinho/70">Floricultura</span>
          <span className="font-serif text-xl text-vinho sm:text-2xl">Beija-Flores</span>
        </span>
      )}
    </span>
  )
}
