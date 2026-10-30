import { Link } from 'react-router-dom'
import { useMeta } from '../lib/useMeta'

type Props = { tipo: 'privacidade' | 'termos' }

const textos = {
  privacidade: {
    titulo: 'Política de privacidade',
    descricao: 'Estrutura da política de privacidade. Texto jurídico a ser elaborado e validado antes da publicação.',
    itens: [
      'Quais dados serão coletados em cada canal (contato, pedido, entrega).',
      'Finalidade de cada dado e base legal aplicável.',
      'Prazo de guarda, compartilhamento com fornecedores de entrega e pagamento.',
      'Direitos do titular e canal para solicitações.',
    ],
  },
  termos: {
    titulo: 'Termos de uso',
    descricao: 'Estrutura dos termos de uso. Texto jurídico a ser elaborado e validado antes da publicação.',
    itens: [
      'Condições de compra, disponibilidade, trocas e cancelamentos.',
      'Regras de entrega, prazo, taxa e recebimento pelo destinatário.',
      'Uso das imagens e identidade visual da marca.',
      'Foro e informações legais da empresa, a confirmar.',
    ],
  },
} as const

export function Institucional({ tipo }: Props) {
  const conteudo = textos[tipo]
  useMeta(conteudo.titulo)
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-16 sm:px-6">
      <p className="text-sm text-vinho/70">Em elaboração</p>
      <h1 className="mt-4 text-5xl text-vinho">{conteudo.titulo}</h1>
      <p className="texto-apoio mt-5 text-lg">{conteudo.descricao}</p>
      <div className="mt-10 rounded-[1.25rem] border border-dashed border-vinho/25 bg-branco/60 p-8">
        <p className="mb-4 text-sm font-medium text-vinho">Pontos que o texto final deve cobrir</p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-vinho/80 marker:text-ouro">
          {conteudo.itens.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </div>
      <p className="mt-10 text-sm text-vinho/70">
        Este conteúdo não tem validade jurídica nesta demonstração. Nenhum texto legal foi criado para a empresa.{' '}
        <Link to="/" className="font-medium text-vinho underline underline-offset-4">
          Voltar à página inicial
        </Link>
      </p>
    </div>
  )
}
