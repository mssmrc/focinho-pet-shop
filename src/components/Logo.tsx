/** Marca do Focinho: um focinho (nariz + boca) dentro do selo verde. Cores pelas variáveis CSS. */
export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="13" fill="var(--green)" />
      <path
        d="M10 15.5C10 11.4 14.6 9 20 9s10 2.4 10 6.5c0 4.6-5 9.5-10 9.5s-10-4.9-10-9.5Z"
        fill="var(--yolk)"
      />
      <ellipse cx="15.6" cy="15.4" rx="2" ry="1.4" fill="var(--green)" />
      <ellipse cx="24.4" cy="15.4" rx="2" ry="1.4" fill="var(--green)" />
      <path
        d="M20 25v3.5M14 29.5c2.6 2 9.4 2 12 0"
        fill="none"
        stroke="var(--yolk)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Runa Mannaz (ᛗ), marca da Runa Web, usada no crédito do rodapé. */
export function RunaMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#1f4fd8" />
      <path
        d="M7.5 5v14M16.5 5v14M7.5 5l9 6M16.5 5l-9 6"
        fill="none"
        stroke="#ffd23f"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
