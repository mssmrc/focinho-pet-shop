import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { CategoryIcon } from '~/components/CategoryIcon'
import { ProductCard } from '~/components/ProductCard'
import { CATEGORIES, PRODUCTS, type CategoryId, type Species } from '~/content/products'
import { SITE } from '~/content/site'

const SPECIES = [
  { id: undefined, label: 'Todos' },
  { id: 'caes', label: 'Cães' },
  { id: 'gatos', label: 'Gatos' },
] as const
type SpeciesParam = 'caes' | 'gatos'
const MATCH: Record<SpeciesParam, Species> = { caes: 'cão', gatos: 'gato' }

/** Filtros ficam na URL: /produtos?categoria=racao&especie=gatos&busca=areia (dá para compartilhar o link). */
type Search = { categoria?: CategoryId; especie?: SpeciesParam; busca?: string }

export const Route = createFileRoute('/produtos')({
  validateSearch: (s: Record<string, unknown>): Search => {
    const out: Search = {}
    if (CATEGORIES.some((c) => c.id === s.categoria)) out.categoria = s.categoria as CategoryId
    if (s.especie === 'caes' || s.especie === 'gatos') out.especie = s.especie
    if (typeof s.busca === 'string' && s.busca.trim()) out.busca = s.busca.slice(0, 60)
    return out
  },
  head: () => ({
    meta: [
      { title: `Produtos · ${SITE.name}` },
      {
        name: 'description',
        content:
          'Ração, petiscos, brinquedos, higiene e acessórios para cães e gatos. Monte a sacola e peça pelo WhatsApp.',
      },
    ],
  }),
  component: ProductsPage,
})

const normalize = (t: string) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

function ProductsPage() {
  const { categoria, especie, busca = '' } = Route.useSearch()
  const navigate = useNavigate({ from: '/produtos' })
  const term = normalize(busca.trim())
  const bySpecies = PRODUCTS.filter((p) => !especie || p.species === MATCH[especie] || p.species === 'ambos')
  const list = bySpecies.filter(
    (p) =>
      (!categoria || p.category === categoria) &&
      (!term || normalize(`${p.name} ${p.detail}`).includes(term)),
  )
  const current = CATEGORIES.find((c) => c.id === categoria)
  const go = (next: Search) => navigate({ search: (prev) => ({ ...prev, ...next }), replace: true })

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <p className="eyebrow">
            {current ? `Corredor ${String(CATEGORIES.indexOf(current) + 1).padStart(2, '0')}` : 'Catálogo'}
          </p>
          <h1 className="h1">{current ? current.label : 'Todos os produtos'}</h1>
          <p className="lead">
            Escolha, coloque na sacola e envie o pedido pelo WhatsApp. Confirmamos preços e estoque na
            resposta.
          </p>
        </div>
      </section>
      <section className="section section--flush">
        <div className="wrap catalog">
          <aside className="catalog-side" aria-label="Filtros">
            <div className="seg" role="group" aria-label="Para quem">
              {SPECIES.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  aria-pressed={especie === s.id}
                  onClick={() => go({ especie: s.id })}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <div className="side-aisles" role="group" aria-label="Corredor">
              <button type="button" aria-pressed={!categoria} onClick={() => go({ categoria: undefined })}>
                <span className="side-num">··</span>
                Tudo
                <span className="side-count">{bySpecies.length}</span>
              </button>
              {CATEGORIES.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={categoria === c.id}
                  onClick={() => go({ categoria: c.id })}
                >
                  <span className="side-num">{String(i + 1).padStart(2, '0')}</span>
                  <CategoryIcon id={c.id} className="side-icon" />
                  {c.label}
                  <span className="side-count">{bySpecies.filter((p) => p.category === c.id).length}</span>
                </button>
              ))}
            </div>
          </aside>
          <div>
            <div className="catalog-bar">
              <label className="search search--inline">
                <span className="sr-only">Buscar produto</span>
                <input
                  type="search"
                  value={busca}
                  onChange={(e) => go({ busca: e.target.value || undefined })}
                  placeholder="Buscar neste catálogo"
                />
              </label>
              <p className="catalog-count" aria-live="polite">
                {list.length} {list.length === 1 ? 'produto' : 'produtos'}
                {busca && ` para “${busca}”`}
              </p>
            </div>
            {list.length ? (
              <div className="shelf shelf--grid">
                {list.map((p) => (
                  <ProductCard key={p.id} p={p} />
                ))}
              </div>
            ) : (
              <p className="empty">
                Nenhum produto encontrado. Tente outra palavra ou peça pelo WhatsApp: temos mais itens na
                loja.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
