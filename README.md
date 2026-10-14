# Fábrica de sites de clínicas

Cada pasta em `clinicas/` é o site de uma clínica. Cada site é estático, rápido, sem JavaScript no navegador e publicado no Cloudflare Pages. A pasta `apresentacoes/` gera o PDF da proposta do app com a marca de cada clínica.

| Clínica | Pasta | Endereço |
| --- | --- | --- |
| Dra. Nanda Prevedello | `clinicas/nanda-prevedello` | https://nanda-prevedello.pages.dev |

## Como funciona

- **Publicar** (`.github/workflows/publicar.yml`): a cada envio para a `main`, gera, confere e publica só as clínicas que mudaram. Cada pasta vira um projeto próprio no Cloudflare Pages, com o mesmo nome (`<pasta>.pages.dev`). Também dá para rodar à mão em *Actions → Publicar → Run workflow*, com o nome da pasta, ou em branco para publicar todas.
- **Baixar fotos** (`.github/workflows/baixar-fotos.yml`): baixa as fotos listadas em `clinicas/<pasta>/fotos.txt` para `clinicas/<pasta>/baixadas/`. Serve para fotos de sites e do Instagram que só abrem de dentro do GitHub.
- **Conferência:** cada site roda `scripts/conferir.mjs` no build. Ela barra a publicação em três casos:
  - se aparecer JavaScript;
  - se houver link quebrado;
  - se aparecer frase proibida na publicidade em saúde: preço, promessa de resultado, urgência ou marca de aparelho.

## Configuração (uma vez só)

Em *Settings → Secrets and variables → Actions*, crie o segredo `CLOUDFLARE_API_TOKEN` com um token do Cloudflare que tenha a permissão **Conta → Cloudflare Pages → Editar**. Nunca mande o token por chat.

## Clínica nova

1. Copie a pasta de uma clínica para `clinicas/<apelido>`.
2. Troque:
   - `src/data/clinica.ts`: contatos e responsável técnico(a);
   - `src/data/tratamentos.ts`;
   - as cores e fontes no topo de `src/styles/global.css`;
   - o logo (em `public/`) e as fotos (em `src/assets/fotos/`).
3. Liste as fotos em `fotos.txt` para baixar.
4. Envie para a `main`: o site sai em `<apelido>.pages.dev`.
