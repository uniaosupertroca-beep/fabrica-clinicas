import { useId } from 'react'
import type { ArteFloral } from '../data/catalogo'

/**
 * Ilustrações botânicas originais, desenhadas em SVG para o demo.
 * Substituir por fotografias profissionais, com direito de uso, antes da publicação.
 */
type Props = {
  arte: ArteFloral
  tons: [string, string]
  titulo?: string
  className?: string
}

type Cabeca = { x: number; y: number; r: number }

const BUQUE: Cabeca[] = [
  { x: 200, y: 175, r: 62 },
  { x: 132, y: 225, r: 50 },
  { x: 268, y: 228, r: 52 },
  { x: 200, y: 268, r: 44 },
]

function Rosa({ x, y, r, tons }: Cabeca & { tons: [string, string] }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={tons[0]} />
      <circle cx={x} cy={y} r={r * 0.78} fill={tons[1]} opacity="0.85" />
      <circle cx={x} cy={y} r={r * 0.55} fill={tons[0]} opacity="0.9" />
      <path
        d={`M${x - r * 0.5} ${y} q${r * 0.5} ${-r * 0.55} ${r} 0`}
        stroke="#ffffff"
        strokeOpacity="0.35"
        strokeWidth="2"
        fill="none"
      />
      <circle cx={x} cy={y} r={r * 0.22} fill={tons[1]} />
    </g>
  )
}

function Girassol({ x, y, r, tons }: Cabeca & { tons: [string, string] }) {
  const petalas = Array.from({ length: 14 }, (_, i) => i * (360 / 14))
  return (
    <g>
      {petalas.map((a) => (
        <ellipse
          key={a}
          cx={x}
          cy={y}
          rx={r * 0.26}
          ry={r * 0.98}
          fill={tons[0]}
          transform={`rotate(${a} ${x} ${y}) translate(0 ${-r * 0.5})`}
        />
      ))}
      <circle cx={x} cy={y} r={r * 0.6} fill={tons[1]} />
      <circle cx={x} cy={y} r={r * 0.42} fill="#4a3a24" opacity="0.85" />
    </g>
  )
}

function Lirio({ x, y, r, tons }: Cabeca & { tons: [string, string] }) {
  const petalas = [0, 60, 120, 180, 240, 300]
  return (
    <g>
      {petalas.map((a) => (
        <ellipse
          key={a}
          cx={x}
          cy={y}
          rx={r * 0.3}
          ry={r * 0.9}
          fill={tons[0]}
          stroke="#e7dcd0"
          strokeWidth="1"
          transform={`rotate(${a} ${x} ${y}) translate(0 ${-r * 0.45})`}
        />
      ))}
      {[0, 72, 144, 216, 288].map((a) => (
        <line
          key={a}
          x1={x}
          y1={y}
          x2={x}
          y2={y - r * 0.8}
          stroke={tons[1]}
          strokeWidth="1.4"
          transform={`rotate(${a} ${x} ${y})`}
          strokeLinecap="round"
        />
      ))}
      <circle cx={x} cy={y} r={r * 0.14} fill={tons[1]} />
    </g>
  )
}

function Campo({ x, y, r, tons }: Cabeca & { tons: [string, string] }) {
  const petalas = Array.from({ length: 10 }, (_, i) => i * 36)
  return (
    <g>
      {petalas.map((a) => (
        <ellipse
          key={a}
          cx={x}
          cy={y}
          rx={r * 0.2}
          ry={r * 0.6}
          fill={tons[0]}
          stroke="#d8cbb8"
          strokeWidth="0.8"
          transform={`rotate(${a} ${x} ${y}) translate(0 ${-r * 0.5})`}
        />
      ))}
      <circle cx={x} cy={y} r={r * 0.24} fill="#e2b65b" />
    </g>
  )
}

function Orquidea({ x, y, r, tons }: Cabeca & { tons: [string, string] }) {
  return (
    <g>
      {[-72, -18, 36, 90, 144].map((a) => (
        <ellipse
          key={a}
          cx={x}
          cy={y}
          rx={r * 0.34}
          ry={r * 0.92}
          fill={tons[0]}
          stroke="#d9cfc3"
          strokeWidth="0.8"
          transform={`rotate(${a} ${x} ${y}) translate(0 ${-r * 0.5})`}
        />
      ))}
      <ellipse cx={x} cy={y + r * 0.2} rx={r * 0.2} ry={r * 0.32} fill={tons[1]} />
      <circle cx={x} cy={y} r={r * 0.1} fill="#c5a67b" />
    </g>
  )
}

function Branco({ x, y, r, tons }: Cabeca & { tons: [string, string] }) {
  return (
    <g>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <ellipse
          key={a}
          cx={x}
          cy={y}
          rx={r * 0.28}
          ry={r * 0.7}
          fill={tons[0]}
          stroke="#e4e0d6"
          strokeWidth="0.8"
          transform={`rotate(${a} ${x} ${y}) translate(0 ${-r * 0.4})`}
        />
      ))}
      <circle cx={x} cy={y} r={r * 0.2} fill={tons[1]} />
    </g>
  )
}

function Haste({ d, cor, largura = 3 }: { d: string; cor: string; largura?: number }) {
  return <path d={d} stroke={cor} strokeWidth={largura} fill="none" strokeLinecap="round" />
}

function Folha({ x, y, rotacao, tamanho = 1 }: { x: number; y: number; rotacao: number; tamanho?: number }) {
  return (
    <ellipse
      cx={x}
      cy={y}
      rx={26 * tamanho}
      ry={9 * tamanho}
      fill="#8a977c"
      opacity="0.85"
      transform={`rotate(${rotacao} ${x} ${y})`}
    />
  )
}

function Buque({ arte, tons }: { arte: ArteFloral; tons: [string, string] }) {
  const Flor = {
    rosa: Rosa,
    girassol: Girassol,
    lirio: Lirio,
    campo: Campo,
    branco: Branco,
    orquidea: Orquidea,
    vaso: Orquidea,
    cesta: Rosa,
  }[arte]
  const alvo = arte === 'girassol' ? [BUQUE[0], BUQUE[1], BUQUE[2]] : BUQUE
  return (
    <>
      <Haste d="M200 330 Q196 300 200 250" cor="#65745a" />
      {alvo.map((c, i) => (
        <Haste key={i} d={`M200 330 Q${(200 + c.x) / 2} ${c.y + 60} ${c.x} ${c.y + c.r * 0.8}`} cor="#65745a" largura={2.2} />
      ))}
      <Folha x={160} y={300} rotacao={-28} />
      <Folha x={240} y={298} rotacao={26} />
      <Folha x={150} y={262} rotacao={-40} tamanho={0.85} />
      <Folha x={252} y={258} rotacao={38} tamanho={0.85} />
      {alvo.map((c, i) => (
        <Flor key={i} x={c.x} y={c.y} r={c.r} tons={tons} />
      ))}
    </>
  )
}

function Vaso({ tons }: { tons: [string, string] }) {
  const hastes = [
    { x: 150, y: 150, r: 34 },
    { x: 230, y: 130, r: 38 },
    { x: 280, y: 200, r: 30 },
    { x: 120, y: 205, r: 28 },
  ]
  return (
    <>
      {hastes.map((h, i) => (
        <Haste key={i} d={`M200 330 Q${h.x + (i % 2 ? 10 : -10)} ${h.y + 80} ${h.x} ${h.y + h.r * 0.7}`} cor="#65745a" largura={2} />
      ))}
      <Folha x={178} y={300} rotacao={-18} tamanho={0.9} />
      <Folha x={222} y={300} rotacao={18} tamanho={0.9} />
      {hastes.map((h, i) => (
        <Orquidea key={i} x={h.x} y={h.y} r={h.r} tons={tons} />
      ))}
      <path d="M140 330 H260 L248 430 H152 Z" fill="#e9ded0" stroke="#d6c7b2" strokeWidth="1.5" />
      <rect x="132" y="318" width="136" height="16" rx="3" fill="#f5efe6" stroke="#d6c7b2" strokeWidth="1" />
    </>
  )
}

function Cesta({ tons }: { tons: [string, string] }) {
  const flores: Cabeca[] = [
    { x: 150, y: 200, r: 36 },
    { x: 200, y: 180, r: 42 },
    { x: 252, y: 202, r: 36 },
    { x: 178, y: 240, r: 28 },
    { x: 226, y: 240, r: 28 },
  ]
  return (
    <>
      {flores.map((f, i) => (
        <Haste key={`h${i}`} d={`M${f.x} ${f.y + f.r * 0.6} Q200 300 200 330`} cor="#65745a" largura={1.6} />
      ))}
      {flores.map((f, i) => (
        <Rosa key={i} x={f.x} y={f.y} r={f.r} tons={tons} />
      ))}
      <path d="M118 268 Q200 300 282 268 L268 350 Q200 368 132 350 Z" fill="#c5a67b" opacity="0.95" />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M${128 + i * 3} ${282 + i * 14} Q200 ${306 + i * 14} ${272 - i * 3} ${282 + i * 14}`} stroke="#8f7650" strokeWidth="1.2" fill="none" opacity="0.6" />
      ))}
      <path d="M190 345 H210" stroke="#f8f5ef" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      <path d="M200 342 Q174 300 146 308" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" fill="none" />
    </>
  )
}

export function Ilustracao({ arte, tons, titulo, className = '' }: Props) {
  const id = useId().replace(/:/g, '')
  const acessivel = Boolean(titulo)
  return (
    <svg
      viewBox="0 0 400 480"
      className={`h-full w-full ${className}`}
      role={acessivel ? 'img' : undefined}
      aria-label={titulo}
      aria-hidden={acessivel ? undefined : true}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`fundo-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbf8f3" />
          <stop offset="1" stopColor={tons[1]} stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <rect width="400" height="480" fill={`url(#fundo-${id})`} />
      <ellipse cx="200" cy="420" rx="150" ry="18" fill="#542e3d" opacity="0.08" />
      {arte === 'cesta' ? <Cesta tons={tons} /> : arte === 'vaso' || arte === 'orquidea' ? <Vaso tons={tons} /> : <Buque arte={arte} tons={tons} />}
    </svg>
  )
}
