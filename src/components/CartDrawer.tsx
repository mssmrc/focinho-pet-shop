import { useEffect, useState, type FormEvent } from 'react'
import { SITE } from '~/content/site'
import { brl, cartLines, cartTotals, orderText } from '~/lib/cart'
import { buildMessage, whatsappLink } from '~/lib/whatsapp'
import { useCart } from './CartContext'

/** Sacola lateral com os itens, o total e o envio do pedido pelo WhatsApp. */
export function CartDrawer() {
  const { cart, set, clear, open, setOpen } = useCart()
  const [delivery, setDelivery] = useState(true)
  const [error, setError] = useState('')
  const lines = cartLines(cart)
  const t = cartTotals(cart, delivery, SITE.delivery.fee, SITE.delivery.freeFrom)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, setOpen])

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const get = (k: string) => String(data.get(k) ?? '').trim()
    if (!lines.length) return setError('Sua sacola está vazia.')
    if (!get('nome')) return setError('Informe seu nome.')
    if (delivery && !get('endereco')) return setError('Informe o endereço de entrega.')
    setError('')
    const message = buildMessage(`Olá! Quero fazer um pedido no ${SITE.name}.`, [
      ['Nome', get('nome')],
      ['Recebimento', delivery ? `Entrega: ${get('endereco')}` : 'Retirada na loja'],
      ['Pagamento', get('pagamento')],
      ['Itens', `\n${orderText(cart)}`],
      ['Entrega', delivery ? (t.shipping ? brl(t.shipping) : 'grátis') : ''],
      ['Total', brl(t.total)],
    ])
    window.open(whatsappLink(SITE.whatsappNumber, message), '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <div
        className={`drawer-backdrop${open ? ' is-open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`drawer${open ? ' is-open' : ''}`}
        aria-label="Sacola"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="drawer-head">
          <div>
            <h2>Sua sacola</h2>
            <p className="drawer-sub-title">Pedido pelo WhatsApp · pague na entrega</p>
          </div>
          <button
            type="button"
            className="drawer-close"
            onClick={() => setOpen(false)}
            aria-label="Fechar sacola"
          >
            ×
          </button>
        </div>
        {lines.length === 0 ? (
          <p className="drawer-empty">A sacola está vazia. Escolha os produtos no catálogo.</p>
        ) : (
          <>
            <ul className="drawer-list">
              {lines.map((l) => (
                <li key={l.product.id}>
                  <div>
                    <b>{l.product.name}</b>
                    <span>{l.product.detail}</span>
                  </div>
                  <div className="qty" role="group" aria-label={`Quantidade de ${l.product.name}`}>
                    <button type="button" onClick={() => set(l.product.id, l.qty - 1)} aria-label="Diminuir">
                      −
                    </button>
                    <b>{l.qty}</b>
                    <button type="button" onClick={() => set(l.product.id, l.qty + 1)} aria-label="Aumentar">
                      +
                    </button>
                  </div>
                  <span className="drawer-sub">{brl(l.subtotal)}</span>
                </li>
              ))}
            </ul>
            <button type="button" className="drawer-clear" onClick={clear}>
              Esvaziar sacola
            </button>
          </>
        )}
        <form className="drawer-form" onSubmit={onSubmit} noValidate>
          <div className="seg" role="group" aria-label="Como receber">
            <button type="button" aria-pressed={delivery} onClick={() => setDelivery(true)}>
              Entrega
            </button>
            <button type="button" aria-pressed={!delivery} onClick={() => setDelivery(false)}>
              Retirar na loja
            </button>
          </div>
          <label>
            Nome
            <input name="nome" autoComplete="name" />
          </label>
          {delivery && (
            <label>
              Endereço com bairro
              <input name="endereco" autoComplete="street-address" placeholder="Rua, número, bairro" />
            </label>
          )}
          <label>
            Pagamento
            <select name="pagamento" defaultValue="Pix">
              <option>Pix</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
              <option>Dinheiro</option>
            </select>
          </label>
          <dl className="drawer-totals">
            <div>
              <dt>Produtos</dt>
              <dd>{brl(t.items)}</dd>
            </div>
            {delivery && (
              <div>
                <dt>Entrega</dt>
                <dd>{t.shipping ? brl(t.shipping) : 'grátis'}</dd>
              </div>
            )}
            <div className="drawer-total">
              <dt>Total</dt>
              <dd>{brl(t.total)}</dd>
            </div>
          </dl>
          {delivery && t.items > 0 && t.items < SITE.delivery.freeFrom && (
            <p className="drawer-hint">
              Faltam {brl(SITE.delivery.freeFrom - t.items)} para a entrega grátis.
            </p>
          )}
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="btn btn--green btn--lg">
            Enviar pedido pelo WhatsApp
          </button>
        </form>
      </aside>
    </>
  )
}
