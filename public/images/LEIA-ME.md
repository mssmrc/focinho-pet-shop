# Imagens do site

As imagens são **placeholders de apresentação** e podem ser trocadas a qualquer momento.

## Baixar os placeholders (Unsplash, licença gratuita)

```bash
npm run images:baixar               # baixa as fotos que ainda não existem
npm run images:baixar -- --forcar   # baixa de novo, sobrescrevendo
```

Cada imagem tem uma ou mais opções no Unsplash; o script usa a primeira que funcionar.
Se nenhuma funcionar, o site mostra um espaço reservado com a descrição da foto. Nada quebra.

## Gerar as versões definitivas por IA

Use os prompts de [`PROMPTS-IA.md`](./PROMPTS-IA.md) e salve cada imagem **com o mesmo nome e caminho**.

## Onde fica a lista

`src/content/images.json` é a fonte única: caminho do arquivo, texto alternativo, opções do Unsplash
e prompt. Mudou a lista? Rode `npm run images:prompts` para atualizar o `PROMPTS-IA.md`.

Recomendação: `.jpg` ou `.webp`, até 400 KB, na proporção indicada em cada prompt.
