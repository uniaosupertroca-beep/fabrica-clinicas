# Apresentações: o app com a marca de cada clínica

Gera o PDF da proposta de parceria (permuta). São 20 páginas, sem preços, com o logo, as cores, as fontes e as fotos da clínica.

```bash
cd apresentacoes
python3 montar.py nanda-prevedello      # monta deck.html com clinicas/nanda-prevedello/
node gerar-pdf.mjs "Nanda Prevedello - app com a sua marca.pdf"
```

O PDF é gerado pelo Playwright com Chromium. Para trocar o caminho do Playwright, edite o `import` em `gerar-pdf.mjs`.

## Clínica nova

Crie `clinicas/<pasta>/` com estes arquivos:

- `config.py`: o dicionário `CLINICA`, com nome, logo, fotos, domínio do app e profissional. O que não for definido usa o padrão de `montar.py`, pensado para estética facial (ciclo da toxina, mapa do rosto). As clínicas de corpo e íntima usam `"mapa": "corporal"` e o próprio ciclo, como a da Dra. Nanda.
- `tema.css`: as cores e as fontes, em `:root`, e os ajustes de capa e molduras.
- `fontes/`, `marcas/` e `fotos/`.
