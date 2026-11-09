/**
 * Ponto de entrada do Worker. Envolve o handler padrão do TanStack Start para aplicar
 * cabeçalhos de segurança em TODAS as respostas.
 *
 * Se adicionar um serviço externo (script, iframe, API chamada do navegador), inclua o
 * domínio na CSP abaixo.
 */
import { createServerEntry, createStartHandler, defaultStreamHandler } from '@tanstack/react-start/server'

const startFetch = createStartHandler(defaultStreamHandler)

const CSP = [
  "default-src 'self'",
  // 'unsafe-inline' é necessário para os scripts de hidratação do TanStack Start.
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https:",
  // Mapa incorporado do Google Maps na página de contato.
  'frame-src https://www.google.com https://maps.google.com',
  "connect-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ')

const SECURITY_HEADERS: Record<string, string> = {
  'Content-Security-Policy': CSP,
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
}

export default createServerEntry({
  async fetch(request: Request) {
    const response = await startFetch(request)
    const headers = new Headers(response.headers)
    for (const [k, v] of Object.entries(SECURITY_HEADERS)) if (!headers.has(k)) headers.set(k, v)
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers })
  },
})
