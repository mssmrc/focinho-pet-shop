import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Cart } from '~/lib/cart'

const KEY = 'focinho-sacola'

type CartApi = {
  cart: Cart
  add: (id: string, qty?: number) => void
  set: (id: string, qty: number) => void
  clear: () => void
  open: boolean
  setOpen: (v: boolean) => void
}

const CartCtx = createContext<CartApi | null>(null)

/** Sacola compartilhada pelo site. Fica salva no navegador do visitante (se o navegador permitir). */
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({})
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY)
      // Lido só depois de hidratar: o servidor não conhece a sacola, e ler antes geraria HTML diferente.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setCart(JSON.parse(saved) as Cart)
    } catch {
      /* navegador sem armazenamento: a sacola funciona só nesta visita */
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(cart))
    } catch {
      /* ignora */
    }
  }, [cart])

  const set = (id: string, qty: number) =>
    setCart((c) => {
      const next = { ...c }
      if (qty <= 0) delete next[id]
      else next[id] = Math.min(qty, 50)
      return next
    })

  const api: CartApi = {
    cart,
    add: (id, qty = 1) => set(id, (cart[id] ?? 0) + qty),
    set,
    clear: () => setCart({}),
    open,
    setOpen,
  }
  return <CartCtx.Provider value={api}>{children}</CartCtx.Provider>
}

export function useCart() {
  const ctx = useContext(CartCtx)
  if (!ctx) throw new Error('useCart fora do CartProvider')
  return ctx
}
