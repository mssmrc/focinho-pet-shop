# AGENTS.md — Guia obrigatório para agentes de IA

> Vale para Cline, Antigravity, Claude, Gemini, DeepSeek e qualquer outro agente.
> **Leia este arquivo inteiro antes de alterar o código.** Detalhes em `docs/`.

---

## 1. O que é o projeto

1. Site **demonstrativo (case de portfólio)** de **Focinho Pet Shop**, pet shop com entrega **fictício(a)**.
2. Desenvolvido pela **Runa Web**. O crédito "Desenvolvido por Runa Web" (com a runa ᛗ e link em `DEV_CREDIT.url`, `src/content/site.ts`) fica no rodapé e **não deve ser removido**.
3. Não há banco de dados, login nem pagamento. A sacola e o agendamento montam uma mensagem e abrem o WhatsApp do visitante. Não há pagamento online (exemplo do plano Catálogo).
4. Nomes, telefones, e-mails, endereços, preços e depoimentos são **placeholders**.

**Páginas:** Início (`/`), Produtos (`/produtos`), Banho e tosa (`/banho-e-tosa`), Política de privacidade (`/privacidade`).

---

## 2. Stack

| Camada     | Tecnologia                                            |
| ---------- | ----------------------------------------------------- |
| Framework  | **TanStack Start** (React 19 + TanStack Router, SSR)  |
| Build      | **Vite 8**                                            |
| Hospedagem | **Cloudflare Workers** (deploy com `wrangler`)        |
| Estilo     | **Tailwind v4** + CSS de componentes em `src/styles/` |
| Testes     | **Vitest** · Qualidade: ESLint + Prettier             |

---

## 3. Comandos

```bash
npm install            # instalar dependências (uma vez)
npm run images:baixar  # baixar as fotos placeholder do Unsplash (uma vez)
npm run images:prompts # regenerar public/images/PROMPTS-IA.md após mudar images.json
npm run dev            # site local em http://localhost:3000
npm run check          # typecheck + lint + testes  ← RODE SEMPRE ANTES DE TERMINAR
npm run build          # build de produção
npm run deploy         # build + publicar no Cloudflare
```

---

## 4. Mapa de pastas

```
src/
├── routes/                 PÁGINAS (cada arquivo = uma URL)
│   ├── __root.tsx          layout geral (cabeçalho, rodapé, fontes)
│   ├── index.tsx             /  conteúdo em components/pages/HomePage.tsx
│   ├── produtos.tsx          /produtos  aceita ?categoria=, ?especie=caes|gatos e ?busca=
│   ├── banho-e-tosa.tsx      /banho-e-tosa
│   ├── privacidade.tsx       /privacidade
├── components/             peças reutilizáveis (Header, Footer, Logo, Price, CategoryIcon, Photo, Faq, CartContext (sacola), CartDrawer, ProductCard…)
├── content/                TEXTOS E DADOS (site.ts (dados, entrega, letreiro, etapas, FAQ, crédito), products.ts (produtos, corredores, ofertas), legal.ts, images.json)
├── lib/                    regras puras (whatsapp.ts, cart.ts (totais, frete e texto do pedido), grooming.ts (tabela de banho e tosa))
├── styles/ + styles.css    estilos (cores em styles/base.css → :root)
├── server.ts               entrada do Worker (cabeçalhos de segurança e CSP)
└── test/                   testes automáticos
scripts/                    baixar-imagens.mjs · gerar-prompts.mjs
public/                     imagens, favicon, robots.txt
docs/                       especificação e deploy
```

---

## 5. Regras de ouro

| #   | Regra                                                                                   | Por quê                                     |
| --- | --------------------------------------------------------------------------------------- | ------------------------------------------- |
| 1   | **Não remova o crédito "Desenvolvido por Runa Web"** nem o aviso de site demonstrativo. | É um case de portfólio.                     |
| 2   | **Textos e dados ficam em `src/content/`**, não espalhados nas páginas.                 | Trocar o cliente = editar só essa pasta.    |
| 3   | **Imagens: lista única em `src/content/images.json`.** Use `<Photo k="nome" />`.        | O script e os prompts leem o mesmo arquivo. |
| 4   | **Cores e fontes só pelas variáveis CSS** de `src/styles/base.css`.                     | Mudar a identidade em um lugar só.          |
| 5   | **Novo domínio externo** (script, iframe, API) → inclua na CSP em `src/server.ts`.      | Senão o navegador bloqueia.                 |
| 6   | **Nunca `dangerouslySetInnerHTML`.**                                                    | Evita XSS.                                  |
| 7   | **Rode `npm run check` antes de concluir.**                                             | É a rede de segurança do projeto.           |

---

## 6. Convenções

- Textos de interface em **português do Brasil**; variáveis, funções e arquivos em **inglês**.
- Identidade "vitrine de bairro": letreiro corrido no topo, vitrine em mosaico (encarte + banho e tosa + entrega), corredores numerados, preço estilo encarte (componente `Price`), selo de oferta amarelo (`.burst`) e etiqueta de preço com furinho nos cartões. Não volte para o layout "título à esquerda + foto em arco à direita". A sacola usa localStorage com try/catch: se o navegador bloquear, ela funciona só durante a visita.
- Commits pequenos, em português, dizendo o que mudou e por quê.

---

## 7. Receitas rápidas

- **Adicionar um produto:** inclua em `PRODUCTS` (`src/content/products.ts`). Use `featured: true` para aparecer em "Mais pedidos" e `oldPrice` (preço "de") para entrar em "Ofertas da semana" com o selo de desconto.
- **Mudar o letreiro do topo ou a validade das ofertas:** `TICKER` e `OFFERS_NOTE` em `src/content/site.ts`.
- **Mudar frete ou valor mínimo da entrega grátis:** `SITE.delivery` em `src/content/site.ts`.
- **Mudar preços de banho e tosa:** `SERVICES` e `EXTRAS` em `src/lib/grooming.ts`; testes em `src/test/cart.test.ts`.
- **Trocar uma foto:** salve o arquivo novo em `public/` com o mesmo nome (veja `public/images/LEIA-ME.md`).
- **Mudar cores:** variáveis do `:root` em `src/styles/base.css`.
