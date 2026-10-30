import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Clock, MapPin, Phone } from 'lucide-react'
import { empresa, regioesAtendidas } from '../data/empresa'
import { consultarCepDemo, type ResultadoCep } from '../lib/cep'
import { mascararCep } from '../lib/formato'
import { useMeta } from '../lib/useMeta'

export function Contato() {
  useMeta('Contato e entrega', 'Endereço, telefone, áreas de atendimento e rota para a Floricultura Beija-Flores em Balneário Camboriú.')
  const [cep, setCep] = useState('')
  const [resultado, setResultado] = useState<ResultadoCep | null>(null)

  function consultar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    setResultado(consultarCepDemo(cep))
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <header className="mb-14 max-w-3xl space-y-5">
        <h1 className="text-5xl leading-none text-vinho sm:text-6xl">Contato e entrega</h1>
        <p className="texto-apoio text-lg">Visite a loja no Centro de Balneário Camboriú ou fale pelo telefone.</p>
      </header>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-10 lg:col-span-5">
          <section aria-labelledby="endereco-titulo" className="space-y-4">
            <h2 id="endereco-titulo" className="flex items-center gap-3 text-3xl text-vinho">
              <MapPin className="h-6 w-6 text-ouro-escuro" aria-hidden="true" />
              Endereço
            </h2>
            <address className="not-italic text-lg leading-relaxed text-vinho/85">
              {empresa.endereco.logradouro}
              <br />
              {empresa.endereco.bairro}, {empresa.endereco.cidade} · {empresa.endereco.uf}
              <br />
              CEP {empresa.endereco.cep}
            </address>
            <a
              href={empresa.endereco.mapa}
              target="_blank"
              rel="noopener noreferrer"
              className="botao-secundario"
            >
              Abrir rota no Google Maps
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          </section>

          <section aria-labelledby="telefone-titulo" className="space-y-4">
            <h2 id="telefone-titulo" className="flex items-center gap-3 text-3xl text-vinho">
              <Phone className="h-6 w-6 text-ouro-escuro" aria-hidden="true" />
              Telefone
            </h2>
            <a href={empresa.telefone.link} className="block font-serif text-3xl text-vinho underline-offset-4 hover:underline">
              {empresa.telefone.exibicao}
            </a>
            {empresa.whatsapp.ativo ? (
              <a href={empresa.whatsapp.link} className="botao-secundario" target="_blank" rel="noopener noreferrer">
                Enviar mensagem no WhatsApp
              </a>
            ) : (
              <p className="text-sm text-vinho/65">
                O canal de WhatsApp está em confirmação com a loja e será ativado somente após validação.
              </p>
            )}
          </section>

          <section aria-labelledby="horario-titulo" className="space-y-4">
            <h2 id="horario-titulo" className="flex items-center gap-3 text-3xl text-vinho">
              <Clock className="h-6 w-6 text-ouro-escuro" aria-hidden="true" />
              Horário da loja
            </h2>
            <dl className="divide-y divide-vinho/10 rounded-2xl bg-branco px-6">
              {empresa.horarioLoja.map((h) => (
                <div key={h.dias} className="flex justify-between py-3 text-sm">
                  <dt className="text-vinho/75">{h.dias}</dt>
                  <dd className="text-vinho">{h.horario}</dd>
                </div>
              ))}
            </dl>
            {empresa.horarioConfirmar && (
              <p className="text-xs text-vinho/60">Horário informado no catálogo atual. Confirmar com a loja antes da publicação.</p>
            )}
          </section>
        </div>

        <div className="space-y-10 lg:col-span-7">
          <section aria-labelledby="cep-titulo" className="rounded-[1.5rem] bg-branco p-7 sm:p-10">
            <h2 id="cep-titulo" className="text-3xl text-vinho">
              Consultar entrega
            </h2>
            <p className="texto-apoio mt-3 max-w-prose">
              Campo demonstrativo. Ele valida o formato do CEP, mas não confirma taxa, prazo ou área de entrega.
            </p>
            <form onSubmit={consultar} className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-end" noValidate>
              <div className="flex-1">
                <label htmlFor="cep" className="rotulo mb-1.5 block">
                  CEP de entrega
                </label>
                <input
                  id="cep"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  className="campo"
                  placeholder="00000-000"
                  maxLength={9}
                  value={cep}
                  onChange={(e) => {
                    setCep(mascararCep(e.target.value))
                    setResultado(null)
                  }}
                  aria-describedby="cep-ajuda"
                />
                <p id="cep-ajuda" className="mt-2 text-xs text-vinho/60">
                  Apenas números. Ex.: 88330-670
                </p>
              </div>
              <button type="submit" className="botao-primario">
                Consultar
              </button>
            </form>
            {resultado && (
              <p role="status" className={`mt-5 rounded-xl px-4 py-3 text-sm ${resultado.status === 'invalido' ? 'bg-rosa-claro text-vinho' : 'bg-oliva/10 text-vinho'}`}>
                {resultado.mensagem}
              </p>
            )}
          </section>

          <section aria-labelledby="regioes-titulo" className="space-y-5">
            <h2 id="regioes-titulo" className="text-3xl text-vinho">
              Regiões divulgadas
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {regioesAtendidas.map((cidade) => (
                <li key={cidade} className="rounded-2xl border border-vinho/12 px-5 py-4 font-serif text-xl text-vinho">
                  {cidade}
                </li>
              ))}
            </ul>
            <p className="text-sm text-vinho/70">
              Antes de cada pedido, a loja confirma disponibilidade, taxa e prazo. Nenhum desses valores é calculado aqui.
            </p>
          </section>

          <section aria-labelledby="catalogo-titulo" className="rounded-[1.5rem] bg-vinho p-7 text-creme sm:p-10">
            <h2 id="catalogo-titulo" className="text-3xl">
              Compre no catálogo atual
            </h2>
            <p className="mt-3 max-w-prose text-creme/80">
              Enquanto esta proposta é avaliada, o catálogo atual da loja segue como referência oficial para pedidos.
            </p>
            <a
              href={empresa.catalogoAtual}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-creme px-6 text-sm font-medium text-vinho transition-colors hover:bg-branco"
            >
              Comprar no catálogo atual
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          </section>
        </div>
      </div>
    </div>
  )
}
