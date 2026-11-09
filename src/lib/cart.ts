import { PRODUCTS, type Product } from '~/content/products'

/** Sacola: id do produto → quantidade. */
export type Cart = Record<string, number>

export const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export function cartLines(cart: Cart): { product: Product; qty: number; subtotal: number }[] {
  return PRODUCTS.filter((p) => (cart[p.id] ?? 0) > 0).map((p) => {
    const qty = cart[p.id]!
    return { product: p, qty, subtotal: Math.round(p.price * qty * 100) / 100 }
  })
}

export function cartTotals(cart: Cart, delivery: boolean, fee: number, freeFrom: number) {
  const items = cartLines(cart).reduce((s, l) => s + l.subtotal, 0)
  const shipping = !delivery || items === 0 || items >= freeFrom ? 0 : fee
  const round = (n: number) => Math.round(n * 100) / 100
  return {
    items: round(items),
    shipping,
    total: round(items + shipping),
    count: Object.values(cart).reduce((a, b) => a + b, 0),
  }
}

/** Linhas do pedido para a mensagem do WhatsApp. */
export function orderText(cart: Cart): string {
  return cartLines(cart)
    .map((l) => `• ${l.qty}× ${l.product.name} (${l.product.detail}): ${brl(l.subtotal)}`)
    .join('\n')
}

/** Desconto em % (arredondado) entre o preço "de" e o "por". 0 se não houver oferta. */
export function discountPct(price: number, oldPrice?: number): number {
  if (!oldPrice || oldPrice <= price) return 0
  return Math.round((1 - price / oldPrice) * 100)
}

/** Separa reais e centavos para o preço no estilo encarte (R$ 189,⁹⁰). */
export function priceParts(n: number): { reais: string; cents: string } {
  const [reais, cents] = n.toFixed(2).split('.')
  return { reais: Number(reais).toLocaleString('pt-BR'), cents: cents ?? '00' }
}
