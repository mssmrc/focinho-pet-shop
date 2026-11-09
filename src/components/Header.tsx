import { Link, useNavigate } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'
import { CATEGORIES } from '~/content/products'
import { SITE, TICKER } from '~/content/site'
import { cartTotals } from '~/lib/cart'
import { useCart } from './CartContext'
import { LogoMark } from './Logo'

export function Header() {
  const [open, setNav] = useState(false)
  const { cart, setOpen } = useCart()
  const { count } = cartTotals(cart, false, 0, 0)
  const navigate = useNavigate()
  const close = () => setNav(false)

  function onSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const busca = String(new FormData(e.currentTarget).get('busca') ?? '').trim()
    close()
    navigate({ to: '/produtos', search: busca ? { busca } : {} })
  }

  return (
    <>
      <a className="skip" href="#conteudo">
        Ir para o conteúdo
      </a>
      <div className="ticker">
        <p className="sr-only">{TICKER.join('. ')}.</p>
        <div className="ticker-track" aria-hidden="true">
          {[0, 1].map((n) => (
            <ul key={n}>
              {TICKER.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <header className="header">
        <div className="wrap header-top">
          <Link to="/" onClick={close} className="logo" aria-label={`${SITE.name}, início`}>
            <LogoMark />
            <span>
              focinho<small>pet shop · Jardim da Penha</small>
            </span>
          </Link>
          <form className="search" role="search" onSubmit={onSearch}>
            <label className="sr-only" htmlFor="busca-topo">
              Buscar produto
            </label>
            <input id="busca-topo" name="busca" type="search" placeholder="O que seu pet precisa hoje?" />
            <button type="submit" aria-label="Buscar">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
                <path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </button>
          </form>
          <button
            type="button"
            className="bag"
            onClick={() => setOpen(true)}
            aria-label={`Abrir sacola, ${count} itens`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M5 8h14l-1 12H6Z M9 8a3 3 0 0 1 6 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            <span className="bag-label">Sacola</span>
            <b>{count}</b>
          </button>
          <button
            className="burger"
            type="button"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-controls="nav"
            aria-expanded={open}
            onClick={() => setNav((o) => !o)}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
        <nav className={`aisles-nav${open ? ' open' : ''}`} id="nav" aria-label="Principal">
          <div className="wrap aisles-nav-in">
            <Link
              to="/produtos"
              search={{}}
              onClick={close}
              activeOptions={{ exact: true, includeSearch: true }}
              activeProps={{ className: 'active' }}
            >
              Todos os produtos
            </Link>
            {CATEGORIES.map((c) => (
              <Link
                key={c.id}
                to="/produtos"
                search={{ categoria: c.id }}
                onClick={close}
                activeOptions={{ includeSearch: true }}
                activeProps={{ className: 'active' }}
              >
                {c.label}
              </Link>
            ))}
            <span className="aisles-nav-gap" aria-hidden="true" />
            <a href="/#ofertas" onClick={close} className="nav-offers">
              Ofertas
            </a>
            <Link
              to="/banho-e-tosa"
              onClick={close}
              className="nav-groom"
              activeProps={{ className: 'nav-groom active' }}
            >
              Banho e tosa
            </Link>
            <a href="/#como-pedir" onClick={close}>
              Como pedir
            </a>
          </div>
        </nav>
      </header>
    </>
  )
}
