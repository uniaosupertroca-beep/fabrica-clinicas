import { useId, useState } from 'react'
import { categorias, destaquesHome, produtos as produtosIniciais, type Produto } from '../data/catalogo'
import { regioesAtendidas } from '../data/empresa'
import { formatarPreco } from '../lib/formato'
import { useMeta } from '../lib/useMeta'

/**
 * PAINEL DE DEMONSTRAÇÃO. Todos os dados são fictícios e vivem apenas na
 * memória desta página. Não há login, backend, pedidos reais nem
 * integração com pagamentos.
 */

type Aba = 'produtos' | 'categorias' | 'pedidos' | 'clientes' | 'regioes' | 'datas' | 'destaques'

const abas: { id: Aba; rotulo: string }[] = [
  { id: 'produtos', rotulo: 'Produtos' },
  { id: 'categorias', rotulo: 'Categorias' },
  { id: 'pedidos', rotulo: 'Pedidos' },
  { id: 'clientes', rotulo: 'Clientes' },
  { id: 'regioes', rotulo: 'Regiões' },
  { id: 'datas', rotulo: 'Datas de entrega' },
  { id: 'destaques', rotulo: 'Destaques da home' },
]

const pedidosFicticios = [
  { id: 'DEMO-1042', cliente: 'Cliente de exemplo A', itens: 'Buquê de Girassóis × 1', status: 'Em preparo', data: '2026-11-02' },
  { id: 'DEMO-1041', cliente: 'Cliente de exemplo B', itens: 'Cesta de Flores e Chocolates × 1', status: 'Aguardando confirmação', data: '2026-11-01' },
  { id: 'DEMO-1040', cliente: 'Cliente de exemplo C', itens: 'Orquídea Elegante × 2', status: 'Entregue', data: '2026-10-29' },
]

const clientesFicticios = [
  { nome: 'Cliente de exemplo A', pedidos: 3, ultimoPedido: '2026-11-02' },
  { nome: 'Cliente de exemplo B', pedidos: 1, ultimoPedido: '2026-11-01' },
  { nome: 'Cliente de exemplo C', pedidos: 5, ultimoPedido: '2026-10-29' },
]

const datasFicticias = [
  { data: '2026-11-02', capacidade: 20, agendadas: 14 },
  { data: '2026-11-03', capacidade: 20, agendadas: 9 },
  { data: '2026-11-04', capacidade: 16, agendadas: 16 },
  { data: '2026-11-05', capacidade: 16, agendadas: 6 },
]

export function Painel() {
  useMeta('Painel administrativo (demonstração)', 'Prévia visual de um painel de gestão com dados fictícios.')
  const [aba, setAba] = useState<Aba>('produtos')
  const [produtos, setProdutos] = useState<Produto[]>(produtosIniciais)
  const [regioes, setRegioes] = useState<Record<string, boolean>>(
    Object.fromEntries(regioesAtendidas.map((c) => [c, true])),
  )
  const [destaques, setDestaques] = useState<string[]>(destaquesHome)
  const [aviso, setAviso] = useState('')
  const idPainel = useId()

  function atualizarProduto(id: string, alteracoes: Partial<Pick<Produto, 'disponivel' | 'precoCentavos'>>) {
    setProdutos((lista) => lista.map((p) => (p.id === id ? { ...p, ...alteracoes } : p)))
  }

  function alternarDestaque(id: string) {
    if (destaques.includes(id)) {
      setDestaques(destaques.filter((x) => x !== id))
      setAviso('')
      return
    }
    if (destaques.length >= 3) {
      setAviso('A vitrine comporta até três destaques. Remova um para incluir outro.')
      return
    }
    setDestaques([...destaques, id])
    setAviso('')
  }

  function restaurar() {
    setProdutos(produtosIniciais)
    setRegioes(Object.fromEntries(regioesAtendidas.map((c) => [c, true])))
    setDestaques(destaquesHome)
    setAviso('Dados de demonstração restaurados.')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl text-vinho sm:text-5xl">Painel de gestão</h1>
          <p className="texto-apoio max-w-2xl">
            Prévia de como a loja poderia gerir a vitrine. Os dados são fictícios e as alterações ficam apenas nesta tela.
          </p>
        </div>
        <button type="button" onClick={restaurar} className="botao-secundario self-start sm:self-auto">
          Restaurar dados de demonstração
        </button>
      </header>

      <p className="mb-8 rounded-xl border border-ouro/40 bg-branco px-4 py-3 text-sm text-vinho/80">
        Ambiente de demonstração, sem login e sem sistema de pedidos real. Nenhum pedido, cliente ou pagamento é
        verdadeiro.
      </p>

      <div role="tablist" aria-label="Seções do painel" className="-mx-4 mb-8 flex gap-1 overflow-x-auto border-b border-vinho/10 px-4 sm:mx-0 sm:px-0">
        {abas.map((a) => (
          <button
            key={a.id}
            id={`${idPainel}-${a.id}`}
            role="tab"
            type="button"
            aria-selected={aba === a.id}
            aria-controls={`${idPainel}-painel`}
            onClick={() => setAba(a.id)}
            className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm transition-colors ${
              aba === a.id ? 'border-vinho font-medium text-vinho' : 'border-transparent text-vinho/60 hover:text-vinho'
            }`}
          >
            {a.rotulo}
          </button>
        ))}
      </div>

      {aviso && (
        <p role="status" className="mb-6 text-sm text-vinho/80">
          {aviso}
        </p>
      )}

      <div role="tabpanel" id={`${idPainel}-painel`} aria-labelledby={`${idPainel}-${aba}`} className="overflow-x-auto rounded-[1.25rem] bg-branco">
        {aba === 'produtos' && (
          <table className="w-full min-w-[640px] text-left text-sm">
            <caption className="sr-only">Produtos de demonstração, com preço e disponibilidade</caption>
            <thead className="border-b border-vinho/10 text-vinho/70">
              <tr>
                <th scope="col" className="px-5 py-4 font-medium">Produto</th>
                <th scope="col" className="px-5 py-4 font-medium">Categoria</th>
                <th scope="col" className="px-5 py-4 font-medium">Preço (fictício)</th>
                <th scope="col" className="px-5 py-4 font-medium">Disponível</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-vinho/10">
              {produtos.map((p) => (
                <tr key={p.id}>
                  <td className="px-5 py-4 text-vinho">{p.nome}</td>
                  <td className="px-5 py-4 text-vinho/75">{categorias.find((c) => c.id === p.categoria)?.nome}</td>
                  <td className="px-5 py-4">
                    <label className="sr-only" htmlFor={`preco-${p.id}`}>
                      Preço de {p.nome}
                    </label>
                    <input
                      id={`preco-${p.id}`}
                      type="number"
                      min={0}
                      step={1}
                      className="campo h-10 w-32 py-1.5"
                      value={p.precoCentavos / 100}
                      onChange={(e) => {
                        const reais = Number(e.target.value)
                        if (Number.isFinite(reais) && reais >= 0) atualizarProduto(p.id, { precoCentavos: Math.round(reais * 100) })
                      }}
                    />
                    <span className="ml-3 text-xs text-vinho/60">{formatarPreco(p.precoCentavos)}</span>
                  </td>
                  <td className="px-5 py-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4 accent-vinho"
                        checked={p.disponivel}
                        onChange={(e) => atualizarProduto(p.id, { disponivel: e.target.checked })}
                      />
                      <span className="text-vinho/80">{p.disponivel ? 'Sim' : 'Não'}</span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {aba === 'categorias' && (
          <ul className="divide-y divide-vinho/10">
            {categorias.map((c) => (
              <li key={c.id} className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-serif text-xl text-vinho">{c.nome}</p>
                  <p className="text-sm text-vinho/65">{c.descricao}</p>
                </div>
                <p className="text-sm text-vinho/75">{produtos.filter((p) => p.categoria === c.id).length} peças</p>
              </li>
            ))}
          </ul>
        )}

        {aba === 'pedidos' && (
          <table className="w-full min-w-[640px] text-left text-sm">
            <caption className="sr-only">Pedidos fictícios de exemplo</caption>
            <thead className="border-b border-vinho/10 text-vinho/70">
              <tr>
                <th scope="col" className="px-5 py-4 font-medium">Pedido</th>
                <th scope="col" className="px-5 py-4 font-medium">Cliente (fictício)</th>
                <th scope="col" className="px-5 py-4 font-medium">Itens</th>
                <th scope="col" className="px-5 py-4 font-medium">Situação</th>
                <th scope="col" className="px-5 py-4 font-medium">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-vinho/10">
              {pedidosFicticios.map((p) => (
                <tr key={p.id}>
                  <td className="px-5 py-4 font-medium text-vinho">{p.id}</td>
                  <td className="px-5 py-4 text-vinho/80">{p.cliente}</td>
                  <td className="px-5 py-4 text-vinho/80">{p.itens}</td>
                  <td className="px-5 py-4 text-vinho/80">{p.status}</td>
                  <td className="px-5 py-4 text-vinho/80">{p.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {aba === 'clientes' && (
          <table className="w-full min-w-[480px] text-left text-sm">
            <caption className="sr-only">Clientes fictícios de exemplo</caption>
            <thead className="border-b border-vinho/10 text-vinho/70">
              <tr>
                <th scope="col" className="px-5 py-4 font-medium">Cliente (fictício)</th>
                <th scope="col" className="px-5 py-4 font-medium">Pedidos</th>
                <th scope="col" className="px-5 py-4 font-medium">Último pedido</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-vinho/10">
              {clientesFicticios.map((c) => (
                <tr key={c.nome}>
                  <td className="px-5 py-4 text-vinho">{c.nome}</td>
                  <td className="px-5 py-4 text-vinho/80">{c.pedidos}</td>
                  <td className="px-5 py-4 text-vinho/80">{c.ultimoPedido}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {aba === 'regioes' && (
          <ul className="divide-y divide-vinho/10">
            {regioesAtendidas.map((cidade) => (
              <li key={cidade} className="flex items-center justify-between px-6 py-5">
                <span className="font-serif text-xl text-vinho">{cidade}</span>
                <label className="flex items-center gap-3 text-sm text-vinho/80">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-vinho"
                    checked={regioes[cidade]}
                    onChange={(e) => setRegioes((r) => ({ ...r, [cidade]: e.target.checked }))}
                  />
                  {regioes[cidade] ? 'Atendendo' : 'Pausada'}
                </label>
              </li>
            ))}
          </ul>
        )}

        {aba === 'datas' && (
          <ul className="divide-y divide-vinho/10">
            {datasFicticias.map((d) => {
              const lotado = d.agendadas >= d.capacidade
              return (
                <li key={d.data} className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-vinho">{d.data.split('-').reverse().join('/')}</span>
                  <span className="text-sm text-vinho/75">
                    {d.agendadas} de {d.capacidade} pedidos agendados
                    {lotado ? ' · Agenda cheia' : ''}
                  </span>
                </li>
              )
            })}
          </ul>
        )}

        {aba === 'destaques' && (
          <div className="space-y-5 p-6">
            <p className="text-sm text-vinho/75">Escolha até três peças para a vitrine. Atualmente: {destaques.length} de 3. Prévia: nesta demonstração, a página inicial não é alterada por este painel.</p>
            <ul className="grid gap-3 md:grid-cols-2">
              {produtos.map((p) => {
                const ativo = destaques.includes(p.id)
                return (
                  <li key={p.id}>
                    <label className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 ${ativo ? 'border-vinho bg-vinho/5' : 'border-vinho/15'}`}>
                      <input type="checkbox" className="h-4 w-4 accent-vinho" checked={ativo} onChange={() => alternarDestaque(p.id)} />
                      <span className="text-sm text-vinho">{p.nome}</span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
