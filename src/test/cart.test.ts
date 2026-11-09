import { describe, expect, it } from 'vitest'
import { cartLines, cartTotals, discountPct, orderText, priceParts } from '~/lib/cart'
import { groomingPrice } from '~/lib/grooming'

describe('cart', () => {
  it('soma itens e ignora quantidade zero', () => {
    const cart = { bifinho: 2, bolinha: 0 }
    expect(cartLines(cart)).toHaveLength(1)
    expect(cartTotals(cart, false, 8, 150)).toEqual({ items: 45.8, shipping: 0, total: 45.8, count: 2 })
  })
  it('cobra entrega abaixo do mínimo e libera acima', () => {
    expect(cartTotals({ bifinho: 1 }, true, 8, 150).shipping).toBe(8)
    expect(cartTotals({ 'racao-adulto-15': 1 }, true, 8, 150).shipping).toBe(0)
  })
  it('monta o texto do pedido', () => {
    expect(orderText({ shampoo: 1 })).toContain('1× Shampoo Neutro')
  })
})

describe('groomingPrice', () => {
  it('soma pelagem longa e táxi dog', () => {
    expect(groomingPrice('banho', 'P', false, false)).toBe(50)
    expect(groomingPrice('completa', 'G', true, true)).toBe(180)
  })
})

describe('ofertas', () => {
  it('calcula o desconto e ignora preço antigo menor', () => {
    expect(discountPct(189.9, 219.9)).toBe(14)
    expect(discountPct(50)).toBe(0)
    expect(discountPct(50, 40)).toBe(0)
    expect(priceParts(1189.9)).toEqual({ reais: '1.189', cents: '90' })
  })
})
