import type { CategoryId } from '~/content/products'

const PATHS: Record<CategoryId, string> = {
  racao: 'M12 6h24l-3 30H15Z M10 6h28 M18 16h12',
  petiscos: 'M10 20a5 5 0 1 1 6-6l16 16a5 5 0 1 1-6 6Z',
  brinquedos: 'M24 8a16 16 0 1 0 0 32a16 16 0 1 0 0-32 M10 18c8 4 20 4 28 0 M10 30c8-4 20-4 28 0',
  higiene: 'M18 6h12v6H18Z M14 14h20v26H14Z M20 24h8',
  acessorios: 'M8 20c0-6 32-6 32 0v4c0 6-32 6-32 0Z M24 28v8 M20 40h8',
}

/** Ícone de linha de cada categoria (corredor). */
export function CategoryIcon({ id, className = '' }: { id: CategoryId; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        d={PATHS[id]}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}
