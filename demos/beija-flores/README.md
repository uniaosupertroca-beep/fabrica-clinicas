# Floricultura Beija-Flores · Site demonstrativo

Proposta visual **independente**, ainda não aprovada pela Floricultura Beija-Flores.
Não é o site oficial, não está publicada e não substitui o catálogo atual da loja.

> Proposta visual demonstrativa — projeto independente, sujeito à aprovação da Floricultura Beija-Flores.

## Como rodar

```bash
cd demos/beija-flores
npm install
npm run dev        # desenvolvimento, http://localhost:5173
npm run build      # confere tipos e gera dist/
npm run preview    # prévia da build de produção, http://localhost:4173
npm test           # testes da lógica de catálogo, carrinho e CEP
```

Rotas principais:

| Rota | Conteúdo |
| --- | --- |
| `/` | Página inicial: hero, benefícios, vitrine, ocasiões, entrega, reputação |
| `/catalogo` | Busca, filtros por categoria e ocasião, ordenação (sincronizados na URL) |
| `/produto/:slug` | Galeria, personalização do presente, carrinho e produtos relacionados |
| `/ocasioes` | Coleções por ocasião |
| `/carrinho`, `/finalizar` | Carrinho demonstrativo e simulação de conclusão |
| `/nossa-historia` | Narrativa institucional |
| `/contato` | Endereço, telefone, horário, consulta de CEP demonstrativa, rota |
| `/inspiracoes` | Galeria de referências ilustrativas |
| `/apresentacao` | Apresentação comercial para os responsáveis pela loja |
| `/painel` | Painel administrativo de demonstração (dados fictícios) |
| `/privacidade`, `/termos` | Estrutura das páginas legais, em elaboração |

## Estrutura

```
src/
  data/        empresa.ts (dados reais e pendências), catalogo.ts (demonstração), navegacao.ts
  lib/         lógica pura (filtros, carrinho, CEP, formatação) + contexto do carrinho
  components/  layout, marca, ilustrações SVG, cards, avaliações
  pages/       uma página por rota
public/        _redirects e _headers (Cloudflare Pages), robots.txt, sitemap.xml
capturas/      prévias desktop e celular geradas nesta versão
```

## O que é real e o que é ilustrativo

**Dados reais, conferidos no catálogo público da loja** (`src/data/empresa.ts`):
- Av. Central, 820, Centro, Balneário Camboriú/SC, CEP 88330-670.
- Telefone (47) 93300-2467.
- Tradição desde 1995.
- Regiões divulgadas: Balneário Camboriú, Itajaí, Camboriú e Itapema.

**Pendências a confirmar com a loja antes da publicação:**
- **WhatsApp:** `empresa.whatsapp.ativo` está `false`. O botão só aparece depois da confirmação.
- **Horário:** o catálogo atual informa seg–sex 8h–19h e sáb 8h–18h, mas no mesmo catálogo há o aviso "Aberto até às 20h00". A página mostra o horário com a nota "confirmar".
- **Entrega:** taxa, prazo, área e janela de entrega não são calculados nem prometidos. O catálogo atual menciona janelas de até 3 horas. Isso não aparece como promessa no site.
- **Domínio anterior** (`floriculturabeijafloresbc.com.br`): no momento da pesquisa, o DNS não resolvia. Não foi usado.
- **Avaliações:** nenhuma foi inventada. A área de reputação mostra um convite com link de pesquisa do Google, marcado como "a validar".
- **Textos legais** (privacidade e termos): apenas a estrutura. Não há conteúdo jurídico.
- **CNPJ e redes sociais:** não aparecem no site.

**Ilustrativo ou fictício (não representa a loja):**
- **Produtos e preços:** todos fictícios. Estão marcados como "ilustrativo" em cada tela.
- **Complementos** (chocolates, pelúcia, vela): opções visuais, com preço fictício.
- **Imagens:** três produtos usam fotos reais do catálogo público da loja (`public/fotos/`): Buquê de Rosas Vermelhas, Buquê de Girassóis e Cesta de Chocolates e Mimos. Os demais usam ilustrações SVG originais. Antes da publicação definitiva, confirmar com a loja o direito de uso dessas fotos.
- **Logotipo:** a marca em `src/components/Logo.tsx` é um desenho original que apenas sugere o beija-flor. **O logotipo original não foi usado** e só deve ser aplicado em avaliação privada, com autorização da empresa.
- **Painel administrativo, pedidos e clientes:** dados fictícios que vivem só na memória da página. Não há login, backend, pedidos reais nem pagamentos.
- **Carrinho:** guardado apenas no navegador (`localStorage`, com proteção contra falhas de armazenamento). Nenhum pedido é enviado.

## Publicação futura (não feita)

Nada foi publicado nem enviado para nenhum domínio. Esta pasta está fora de `clinicas/`, então o workflow `publicar.yml` (que dispara apenas em `clinicas/**`) não a alcança.

Quando houver autorização:
1. Substituir `SEU-DOMINIO` em `public/sitemap.xml`.
2. Remover `noindex` de `index.html` e `Disallow: /` de `public/robots.txt`, somente depois da aprovação.
3. Trocar as ilustrações por fotografias com direito de uso e o catálogo fictício pelos dados reais.
4. Confirmar WhatsApp, horários, textos legais e o link de avaliações.
5. Publicar no Cloudflare Pages com `npm run build` e o diretório `dist/`. `public/_redirects` e `public/_headers` já estão prontos para o roteamento e os cabeçalhos de segurança.

## Decisões de implementação

- **Stack:** React 19, TypeScript estrito, Vite 7, Tailwind CSS 4, React Router 7 e Lucide. Sem shadcn/ui, para não adicionar dependências desnecessárias.
- **Tipografia:** Gilda Display nos títulos e Instrument Sans no texto (Google Fonts).
- **Performance:** apresentação, painel e galeria carregam sob demanda. Animação única na entrada da página inicial, com `prefers-reduced-motion` respeitado.
- **Acessibilidade:** link para pular ao conteúdo, foco visível, menu mobile com `aria-expanded` e tecla Esc, rótulos em todos os campos e tabelas com `caption`.
- **SEO:** metadados por página, JSON-LD `Florist` com endereço e telefone reais. Indexação bloqueada enquanto for demonstração.
