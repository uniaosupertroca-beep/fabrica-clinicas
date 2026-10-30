import { Link } from 'react-router-dom'
import { empresa } from '../data/empresa'
import { useMeta } from '../lib/useMeta'

/**
 * Narrativa institucional. Não cita fundadores, famílias ou depoimentos,
 * pois esses dados ainda não foram confirmados pela empresa.
 */
export function Historia() {
  useMeta('Nossa História', 'A trajetória da Floricultura Beija-Flores em Balneário Camboriú desde 1995.')
  return (
    <article className="pb-24">
      <header className="mx-auto max-w-4xl px-4 pb-16 pt-16 text-center sm:px-6 md:pt-24">
        <p className="text-sm text-vinho/70">Desde {empresa.fundacao}</p>
        <h1 className="mt-5 text-5xl leading-[1.02] text-vinho sm:text-7xl">Nossa História</h1>
        <p className="texto-apoio mx-auto mt-8 max-w-xl text-lg">
          Três décadas de flores, encontros e pequenos gestos no coração de Balneário Camboriú.
        </p>
      </header>

      <div className="mx-auto max-w-2xl space-y-8 px-4 text-[1.1rem] leading-[1.85] text-vinho/85 sm:px-6">
        <p className="first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-vinho">
          Desde 1995, a Floricultura Beija-Flores ocupa seu lugar na Avenida Central, no Centro de Balneário Camboriú.
          Ali, ao longo de mais de trinta anos, a loja acompanhou aniversários, pedidos de desculpas, declarações e
          despedidas, sempre com a mesma atenção ao que cada flor precisa dizer.
        </p>
        <p>
          Uma floricultura de bairro cresce com a rotina de quem passa pela porta: a pressa de quem esqueceu a data, a
          calma de quem escolhe com tempo, a alegria de quem volta para pedir de novo. Essa convivência ensinou que um
          bom arranjo começa na escuta.
        </p>
        <blockquote className="my-14 border-y border-ouro/50 py-10 text-center font-serif text-3xl leading-snug text-vinho sm:text-4xl">
          Cada buquê é uma pequena conversa entre quem presenteia e quem recebe.
        </blockquote>
        <p>
          Hoje, a tradição segue no Centro de Balneário Camboriú, com o mesmo cuidado: flores selecionadas, montagens feitas com
          atenção aos detalhes e um atendimento que valoriza o momento de cada pessoa.
        </p>
        <p>
          Esta proposta digital quer respeitar essa história. A ideia não é substituir o que já funciona, mas dar à
          marca uma casa à altura da sua trajetória, com mais clareza na escolha, mais carinho na apresentação e mais
          facilidade para quem compra pelo celular.
        </p>
      </div>

      <section aria-labelledby="valores-titulo" className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="valores-titulo" className="mb-10 text-4xl text-vinho">
          O que nos guia
        </h2>
        <ul className="grid gap-6 md:grid-cols-3">
          {[
            ['Cuidado com as flores', 'Escolher, armazenar e montar com atenção, porque a qualidade começa antes da entrega.'],
            ['Atenção a cada pessoa', 'Ouvir o que a ocasião pede: um recado, uma data, um gosto. Cada detalhe conta.'],
            ['Presença no centro', 'Estar na Avenida Central, perto de quem passa, e atender a região com proximidade.'],
          ].map(([titulo, texto]) => (
            <li key={titulo} className="rounded-[1.25rem] bg-branco p-8">
              <h3 className="text-2xl text-vinho">{titulo}</h3>
              <p className="texto-apoio mt-3 text-[0.95rem]">{texto}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mx-auto mt-20 flex max-w-2xl flex-col items-center gap-5 px-4 text-center sm:px-6">
        <p className="texto-apoio">Conheça a coleção ou fale com a loja para encontrar a flor certa.</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/catalogo" className="botao-primario">
            Explorar Coleção
          </Link>
          <Link to="/contato" className="botao-secundario">
            Falar com a loja
          </Link>
        </div>
      </div>
    </article>
  )
}
