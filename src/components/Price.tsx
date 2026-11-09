import { brl, priceParts } from '~/lib/cart'

/** Preço no estilo encarte: reais grandes e centavos pequenos no alto. Leitores de tela ouvem o valor inteiro. */
export function Price({ value, className = '' }: { value: number; className?: string }) {
  const { reais, cents } = priceParts(value)
  return (
    <span className={`price ${className}`}>
      <span className="sr-only">{brl(value)}</span>
      <span aria-hidden="true">
        <small>R$</small>
        {reais}
        <sup>,{cents}</sup>
      </span>
    </span>
  )
}
