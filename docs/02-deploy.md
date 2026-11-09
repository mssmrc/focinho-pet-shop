# Publicação (Cloudflare Workers)

O plano gratuito do Cloudflare Workers atende este site com folga.

## 1. Primeira vez

```bash
npm install
npm run images:baixar     # baixa as fotos antes de publicar
npx wrangler login        # abre o navegador para entrar na conta Cloudflare (gratuita)
npm run deploy
```

O endereço final aparece no terminal, no formato:

```
https://focinho-pet-shop.<sua-conta>.workers.dev
```

`<sua-conta>` é o subdomínio da sua conta Cloudflare. Dá para trocá-lo em
**Workers & Pages → Settings → Subdomain** (por exemplo, `2mrs` → `focinho-pet-shop.2mrs.workers.dev`).

## 2. Usar um subdomínio próprio (opcional)

Se você tiver um domínio na Cloudflare (ex.: `2mrs.com.br`):

1. **Workers & Pages → focinho-pet-shop → Settings → Domains & Routes → Add → Custom domain**.
2. Digite `petshop.2mrs.com.br` e confirme. O DNS e o HTTPS são configurados automaticamente.

## 3. Publicar pelo GitHub (opcional)

Em **Workers & Pages → focinho-pet-shop → Settings → Build**, conecte o repositório.
Comando de build: `npm run build` · Comando de deploy: `npx wrangler deploy`.

## 4. Atualizar

Depois de qualquer mudança: `npm run check` e `npm run deploy`.
