import type { Product } from '~/content/products'
import { brl, discountPct } from '~/lib/cart'
import { CategoryIcon } from './CategoryIcon'
import { useCart } from './CartContext'
import { Price } from './Price'

const SPECIES_LABEL: Record<Product['species'], string> = {
  cão: 'Cães',
  gato: 'Gatos',
  ambos: 'Cães e gatos',
}

/**
 * Cartão de produto. A "foto" é o ícone da categoria sobre a cor do corredor;
 * o preço fica numa etiqueta com furinho (assinatura do site) e as ofertas ganham o selo amarelo.
 */
export function ProductCard({ p }: { p: Product }) {
  const { cart, add, set, setOpen } = useCart()
  const qty = cart[p.id] ?? 0
  const off = discountPct(p.price, p.oldPrice)
  return (
    <article className="card">
      <div className={`card-shot card-shot--${p.category}`}>
        <CategoryIcon id={p.category} className="card-icon" />
        <span className="card-species">{SPECIES_LABEL[p.species]}</span>
        {off > 0 && (
          <span className="burst burst--sm" aria-label={`${off}% de desconto`}>
            <b>-{off}%</b>
          </span>
        )}
      </div>
      <div className="card-body">
        <h3>{p.name}</h3>
        <p className="card-detail">{p.detail}</p>
        <div className="card-tag">
          <span className="tag-hole" aria-hidden="true" />
          {p.oldPrice && off > 0 && (
            <s className="card-old">
              <span className="sr-only">de </span>
              {brl(p.oldPrice)}
            </s>
          )}
          <Price value={p.price} className={off > 0 ? 'price--promo' : ''} />
        </div>
        {qty === 0 ? (
          <button type="button" className="btn btn--green card-btn" onClick={() => add(p.id)}>
            Adicionar
            <span className="sr-only"> {p.name} à sacola</span>
          </button>
        ) : (
          <div className="card-qty">
            <div className="qty" role="group" aria-label={`Quantidade de ${p.name}`}>
              <button type="button" onClick={() => set(p.id, qty - 1)} aria-label="Diminuir">
                −
              </button>
              <b aria-live="polite">{qty}</b>
              <button type="button" onClick={() => set(p.id, qty + 1)} aria-label="Aumentar">
                +
              </button>
            </div>
            <button type="button" className="link-btn" onClick={() => setOpen(true)}>
              Ver sacola
            </button>
          </div>
        )}
      </div>
    </article>
  )
}
