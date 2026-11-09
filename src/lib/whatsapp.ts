/**
 * Monta links do WhatsApp (wa.me). Funciona sem servidor: o formulário apenas abre o
 * WhatsApp do visitante com a mensagem pronta para a clínica.
 */

/** Mantém só os dígitos do telefone (wa.me exige o formato 55DDDNÚMERO). */
export function onlyDigits(phone: string): string {
  return phone.replace(/\D/g, '')
}

export function whatsappLink(phone: string, message?: string): string {
  const base = `https://wa.me/${onlyDigits(phone)}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

/** Gera a mensagem a partir dos campos do formulário, ignorando os vazios. */
export function buildMessage(
  intro: string,
  fields: readonly (readonly [string, string | undefined])[],
): string {
  const lines = fields
    .map(([label, value]) => [label, (value ?? '').trim()] as const)
    .filter(([, value]) => value.length > 0)
    .map(([label, value]) => `*${label}:* ${value}`)
  return [intro, '', ...lines].join('\n')
}
