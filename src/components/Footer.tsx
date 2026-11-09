import { Link } from '@tanstack/react-router'
import { CATEGORIES } from '~/content/products'
import { DEMO_NOTICE, DEV_CREDIT, SITE } from '~/content/site'
import { whatsappLink } from '~/lib/whatsapp'
import { LogoMark, RunaMark } from './Logo'

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <p className="footer-name">
            <LogoMark />
            focinho
          </p>
          <p>{SITE.tagline}</p>
          <a
            className="btn btn--yolk"
            href={whatsappLink(SITE.whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar no WhatsApp
          </a>
        </div>
        <nav aria-label="Corredores">
          <h2>Corredores</h2>
          {CATEGORIES.map((c) => (
            <Link key={c.id} to="/produtos" search={{ categoria: c.id }}>
              {c.label}
            </Link>
          ))}
        </nav>
        <div>
          <h2>Loja</h2>
          <span>{SITE.address.street}</span>
          <span>
            {SITE.address.district}, {SITE.address.city}
          </span>
          <span>{SITE.hours}</span>
        </div>
        <div>
          <h2>Contato</h2>
          <a href={whatsappLink(SITE.whatsappNumber)} target="_blank" rel="noopener noreferrer">
            WhatsApp {SITE.whatsapp}
          </a>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <span>Instagram {SITE.instagram}</span>
          <Link to="/banho-e-tosa">Banho e tosa</Link>
          <Link to="/privacidade">Política de privacidade</Link>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <p>
          © {new Date().getFullYear()} {SITE.name} · CNPJ {SITE.cnpj}. {DEMO_NOTICE}
        </p>
        <a className="credit" href={DEV_CREDIT.url} target="_blank" rel="noopener">
          <span>{DEV_CREDIT.text}</span>
          <RunaMark />
          <strong>{DEV_CREDIT.name}</strong>
        </a>
      </div>
    </footer>
  )
}
