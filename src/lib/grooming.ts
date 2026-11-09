/** Tabela de banho e tosa (preços FICTÍCIOS) e cálculo do valor estimado. */
export const SIZES = [
  { id: 'P', label: 'Pequeno', hint: 'até 10 kg' },
  { id: 'M', label: 'Médio', hint: '10 a 25 kg' },
  { id: 'G', label: 'Grande', hint: '25 a 40 kg' },
  { id: 'GG', label: 'Gigante', hint: 'acima de 40 kg' },
] as const
export type SizeId = (typeof SIZES)[number]['id']

export const SERVICES = [
  { id: 'banho', label: 'Banho', prices: { P: 50, M: 65, G: 85, GG: 110 } },
  { id: 'higienica', label: 'Banho + tosa higiênica', prices: { P: 65, M: 80, G: 100, GG: 130 } },
  { id: 'completa', label: 'Banho + tosa completa', prices: { P: 90, M: 115, G: 145, GG: 180 } },
] as const
export type ServiceId = (typeof SERVICES)[number]['id']

export const EXTRAS = { longCoat: 15, taxi: 20 } as const

export function groomingPrice(service: ServiceId, size: SizeId, longCoat: boolean, taxi: boolean): number {
  const base = SERVICES.find((s) => s.id === service)!.prices[size]
  return base + (longCoat ? EXTRAS.longCoat : 0) + (taxi ? EXTRAS.taxi : 0)
}
