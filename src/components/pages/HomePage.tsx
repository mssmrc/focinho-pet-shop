import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { CATEGORIES, OFFERS, PRODUCTS } from '~/content/products'
import { FAQ, OFFERS_NOTE, SITE, STEPS } from '~/content/site'
import { brl, discountPct } from '~/lib/cart'
import { EXTRAS, SERVICES, SIZES } from '~/lib/grooming'
import { whatsappLink } from '~/lib/whatsapp'
import { CategoryIcon } from '../CategoryIcon'
import { Faq } from '../Faq'
import { Photo } from '../Photo'
import { Price } from '../Price'
import { ProductCard } from '../ProductCard'

const SPECIES = [
  { id: 'caes', label: 'Cães', match: 'cão' },
  { id: 'gatos', label: 'Gatos', match: 'gato' },
] as const

export function HomePage() {
  const featured = PRODUCTS.filter((p) => p.featured)
  // No encarte da vitrine, uma oferta de cada corredor (fica mais variado).
  const flyerItems = OFFERS.filter((p, i) => OFFERS.findIndex((o) => o.category === p.category) === i).slice(
    0,
    3,
  )
  const maxOff = Math.max(...OFFERS.map((p) => discountPct(p.price, p.oldPrice)))
  const minGroom = Math.min(...SERVICES.map((s) => s.prices.P))
  const [species, setSpecies] = useState<(typeof SPECIES)[number]['id']>('caes')
  const sp = SPECIES.find((s) => s.id === species)!

  return (
    <>
      {/* ===== Vitrine: mosaico de banners (encarte + serviço + entrega) ===== */}
      <section className="showcase">
        <div className="wrap showcase-grid">
          <div className="flyer">
            <span className="burst" aria-hidden="true">
              <small>até</small>
              <b>-{maxOff}%</b>
            </span>
            <p className="eyebrow">Ofertas da semana</p>
            <h1>Tudo para o seu pet, entregue hoje.</h1>
            <p className="flyer-lead">
              Ração, petiscos, brinquedos e higiene para cães e gatos em {SITE.address.district}. Monte a
              sacola, envie pelo WhatsApp e pague na entrega.
            </p>
            <ul className="flyer-items">
              {flyerItems.map((p) => (
                <li key={p.id}>
                  <CategoryIcon id={p.category} className="flyer-icon" />
                  <span className="flyer-name">{p.name}</span>
                  {p.oldPrice && <s>{brl(p.oldPrice)}</s>}
                  <Price value={p.price} className="price--promo" />
                </li>
              ))}
            </ul>
            <div className="ctas">
              <a href="#ofertas" className="btn btn--ink btn--lg">
                Ver todas as ofertas
              </a>
              <Link to="/produtos" className="btn btn--ghost btn--lg">
                Ver produtos
              </Link>
            </div>
          </div>

          <Link to="/banho-e-tosa" className="promo promo--groom">
            <div className="promo-photo">
              <Photo k="banho" eager />
            </div>
            <div className="promo-text">
              <p className="eyebrow">Banho e tosa</p>
              <h2>Hora marcada, um pet por vez</h2>
              <p>
                a partir de <b>{brl(minGroom)}</b>
              </p>
              <span className="promo-cta">Ver preços e agendar →</span>
            </div>
          </Link>

          <a href="#como-pedir" className="promo promo--delivery">
            <div className="promo-text">
              <p className="eyebrow">Entrega no bairro</p>
              <h2>Grátis acima de {brl(SITE.delivery.freeFrom)}</h2>
              <p>Pedidos até 16h chegam no mesmo dia. Abaixo disso, {brl(SITE.delivery.fee)}.</p>
              <span className="promo-cta">Como pedir →</span>
            </div>
            <div className="promo-photo promo-photo--round">
              <Photo k="hero" eager />
            </div>
          </a>
        </div>
      </section>

      {/* ===== Corredores (categorias) ===== */}
      <section className="section section--tight" aria-labelledby="corredores">
        <div className="wrap">
          <div className="head">
            <div>
              <p className="eyebrow">Navegue pela loja</p>
              <h2 className="h2" id="corredores">
                Corredores
              </h2>
            </div>
            <div className="seg seg--big" role="group" aria-label="Mostrar corredores para">
              {SPECIES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={species === s.id}
                  onClick={() => setSpecies(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <ul className="aisles">
            {CATEGORIES.map((c, i) => {
              const n = PRODUCTS.filter(
                (p) => p.category === c.id && (p.species === sp.match || p.species === 'ambos'),
              ).length
              return (
                <li key={c.id}>
                  <Link
                    to="/produtos"
                    search={{ categoria: c.id, especie: species }}
                    className={`aisle aisle--${c.id}`}
                  >
                    <span className="aisle-sign">
                      Corredor <b>{String(i + 1).padStart(2, '0')}</b>
                    </span>
                    <CategoryIcon id={c.id} className="aisle-icon" />
                    <span className="aisle-name">{c.label}</span>
                    <span className="aisle-hint">{c.hint}</span>
                    <span className="aisle-count">
                      {n} {n === 1 ? 'item' : 'itens'} para {sp.label.toLowerCase()}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* ===== Ofertas ===== */}
      <section className="section section--tight" id="ofertas" aria-labelledby="ofertas-titulo">
        <div className="wrap">
          <div className="head">
            <div>
              <p className="eyebrow eyebrow--tomato">Preço de encarte</p>
              <h2 className="h2" id="ofertas-titulo">
                Ofertas da semana
              </h2>
              <p className="head-note">{OFFERS_NOTE}</p>
            </div>
            <Link to="/produtos" className="link">
              Ver todos os produtos →
            </Link>
          </div>
          <div className="shelf">
            {OFFERS.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Banho e tosa: a tabela da parede ===== */}
      <section className="groom-band" aria-labelledby="banho-titulo">
        <div className="wrap groom-band-grid">
          <div className="groom-band-text">
            <p className="eyebrow eyebrow--yolk">Banho e tosa</p>
            <h2 className="h2" id="banho-titulo">
              Banho e tosa com hora marcada
            </h2>
            <p className="lead">
              Profissionais com curso de estética animal, produtos hipoalergênicos e um pet por vez na mesa.
              Buscamos e levamos com o Táxi Dog.
            </p>
            <div className="groom-band-photos">
              <Photo k="filhote" />
              <Photo k="gato" />
            </div>
          </div>
          <div className="board">
            <div className="board-head">
              <span className="tag-hole" aria-hidden="true" />
              <h3>Tabela de preços</h3>
              <p>Por porte do pet · valores em R$</p>
            </div>
            <div className="board-scroll">
              <table>
                <caption className="sr-only">Preços de banho e tosa por serviço e porte, em reais</caption>
                <thead>
                  <tr>
                    <th scope="col">Serviço</th>
                    {SIZES.map((z) => (
                      <th key={z.id} scope="col">
                        {z.id}
                        <small>{z.hint}</small>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SERVICES.map((s) => (
                    <tr key={s.id}>
                      <th scope="row">{s.label}</th>
                      {SIZES.map((z) => (
                        <td key={z.id}>
                          {s.prices[z.id].toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="board-extras">
              Pelagem longa ou com nós + {brl(EXTRAS.longCoat)} · Táxi Dog + {brl(EXTRAS.taxi)}
            </p>
            <Link to="/banho-e-tosa" className="btn btn--yolk btn--lg board-btn">
              Calcular e agendar
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Mais pedidos ===== */}
      <section className="section" aria-labelledby="mais-pedidos">
        <div className="wrap">
          <div className="head">
            <div>
              <p className="eyebrow">Os queridinhos do bairro</p>
              <h2 className="h2" id="mais-pedidos">
                Mais pedidos
              </h2>
            </div>
            <Link to="/produtos" className="link">
              Ver catálogo completo →
            </Link>
          </div>
          <div className="shelf">
            {featured.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Como pedir ===== */}
      <section className="section section--paper2" id="como-pedir" aria-labelledby="como-pedir-titulo">
        <div className="wrap">
          <p className="eyebrow">Sem cadastro, sem app</p>
          <h2 className="h2" id="como-pedir-titulo">
            Como pedir
          </h2>
          <ol className="steps">
            {STEPS.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="areas">
            <b>Entregamos em</b>
            <ul>
              {SITE.delivery.areas.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== Dúvidas + loja ===== */}
      <section className="section" aria-labelledby="duvidas">
        <div className="wrap faq-wrap">
          <div>
            <h2 className="h2" id="duvidas">
              Dúvidas
            </h2>
            <Faq items={FAQ} />
          </div>
          <aside className="store-card" aria-label="A loja">
            <div className="store-photo">
              <Photo k="loja" />
            </div>
            <div className="store-body">
              <h3>Passe na loja</h3>
              <p>
                {SITE.address.street}
                <br />
                {SITE.address.district}, {SITE.address.city}
              </p>
              <p className="store-hours">{SITE.hours}</p>
              <a
                className="btn btn--green"
                href={whatsappLink(SITE.whatsappNumber, 'Olá! Vim pelo site e tenho uma dúvida.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chamar no WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
