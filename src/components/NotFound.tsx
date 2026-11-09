import { Link } from '@tanstack/react-router'

export function NotFound() {
  return (
    <section className="section">
      <div className="wrap status-page">
        <p className="kicker">Erro 404</p>
        <h1 className="h2">Página não encontrada</h1>
        <p className="lead">
          O endereço pode ter mudado. Volte para o início ou fale com a gente pelo WhatsApp.
        </p>
        <Link to="/" className="btn btn--primary">
          Ir para o início
        </Link>
      </div>
    </section>
  )
}
