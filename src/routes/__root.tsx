/// <reference types="vite/client" />
import type { ReactNode } from 'react'
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import appCss from '~/styles.css?url'
import { Header } from '~/components/Header'
import { Footer } from '~/components/Footer'
import { NotFound } from '~/components/NotFound'
import { WhatsAppButton } from '~/components/WhatsAppButton'
import { CartProvider } from '~/components/CartContext'
import { CartDrawer } from '~/components/CartDrawer'
import { SITE } from '~/content/site'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: `${SITE.name} · Pet shop em Vitória com entrega` },
      { name: 'description', content: SITE.description },
      { name: 'theme-color', content: '#12543f' },
      { property: 'og:site_name', content: SITE.name },
      { property: 'og:locale', content: 'pt_BR' },
      { property: 'og:type', content: 'website' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Figtree:wght@400;500;600;700&display=swap',
      },
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
})

function RootComponent() {
  return (
    <RootDocument>
      <CartProvider>
        <Header />
        <main id="conteudo">
          <Outlet />
        </main>
        <Footer />
        <WhatsAppButton />
        <CartDrawer />
      </CartProvider>
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
