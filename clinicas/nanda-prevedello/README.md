# Site da Dra. Nanda Prevedello

Site da **Clínica Nanda Prevedello Estética Avançada**, de Balneário Camboriú (SC): página principal, lista de tratamentos e uma página para cada tratamento. É estático, sem JavaScript no navegador, e é publicado pelo GitHub Actions da fábrica em **https://nanda-prevedello.pages.dev**.

## De onde vêm os dados

Coletados em outubro de 2026:

- **Site atual** (fernandaprevedello.com): nome da clínica, CRBM 64579, endereço, telefones, e-mail, horário, tratamentos e o logo NP.
- **Instagram** ([@dranandaprevedello](https://www.instagram.com/dranandaprevedello/)): o WhatsApp da bio, a certificação internacional, a técnica NinfoSlim, os temas dos posts e a frase "Não existe milagre. Existe fisiologia."
- **Google Maps:** não achamos a ficha da clínica. A busca devolve outra clínica, que não foi usada.

Ficaram de fora, de propósito:

- as fotos de antes e depois e os depoimentos, por causa das regras de publicidade em saúde;
- as imagens de procedimentos íntimos;
- "células-tronco", que não tem tratamento estético aprovado;
- "gluteoplastia", termo de cirurgia plástica.

## Identidade

- **Cores:** ônix (`#141011`), ouro (`#c9a465`, em degradê como no logo) e seda rosada (`#f4e9e3`, a cor da blusa do retrato), sobre porcelana (`#fbf7f4`).
- **Fontes:** Marcellus nos títulos (a mesma família da serifa do nome no logo) e Figtree no texto, servidas pelo próprio site.
- **Logo:** o escudo com N e P do logo atual, redesenhado em vetor por `scripts/logo.py`. As letras viram contornos. O script gera estes arquivos em `public/`:
  - versões vertical e horizontal, em ouro claro e em ouro escuro;
  - `monograma.svg`, que serve de ícone da aba e do app.
- **Assinatura visual:** o escudo do logo. O retrato da abertura aparece dentro dele, com um eco em fio de ouro, e o mesmo escudo marca o topo de cada tratamento e o fundo do Protocolo Corpo Detox.

## Fotos

Ficam em `src/assets/fotos/`, escolhidas entre as baixadas pelo workflow **Baixar fotos** (lista em `fotos.txt`, arquivos em `baixadas/`):

- **Abertura:** `nanda-prevedello.png`, o retrato do site atual (blusa rosa), recortado com fundo transparente.
- **Frase da Dra. Nanda:** `nanda-prevedello-rosto.jpg`, da foto de perfil do Instagram.
- **Corpo Detox:** `corpo-detox.jpg`, a imagem que ilustra o protocolo no site atual.

Os posts do Instagram são, na maioria, artes gráficas, antes e depois ou conteúdo íntimo, por isso não entraram. Fotos do espaço da clínica, se ela mandar, podem entrar numa galeria.

## Regras de publicidade

Os textos seguem o Código de Defesa do Consumidor (art. 37) e o Código de Ética do Biomédico (Res. CFBM 330/2020). Essa resolução pede que constem:

- o nome e o CRBM;
- o endereço e o horário.

Os dois aparecem no rodapé. Nos textos:

- sem preço, sem desconto e sem urgência;
- sem promessa de resultado ("sem dor", "resultado natural", "garantido");
- sem antes e depois e sem depoimentos;
- sem marcas de aparelhos ou produtos;
- o lipedema aparece com o diagnóstico feito pelo médico, e a ozonioterapia como procedimento complementar (Lei 14.648/2023).

A conferência do build (`scripts/conferir.mjs`) barra a publicação se alguma frase proibida aparecer.

**Antes de divulgar:** a Dra. Nanda deve revisar os textos de cada tratamento.

## Dados da clínica

Tudo fica em `src/data/clinica.ts`. Falta a clínica confirmar:

- [ ] a região do CRBM (ex.: CRBM-5)
- [ ] qual WhatsApp atende Balneário Camboriú: o site atual usa o (21) 99754-2205 nos botões e o (47) 99150-5134 como telefone local
- [ ] o CNPJ
- [ ] a ficha no Google Maps, se houver

Os tratamentos ficam em `src/data/tratamentos.ts`. Um item novo vira uma página nova, com cartão na lista e entrada no sitemap.
