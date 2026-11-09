import { Link, type ErrorComponentProps } from '@tanstack/react-router'

/** Tela de erro amigável. Não mostra detalhes técnicos ao visitante (eles ficam no log do Worker). */
export function ErrorPage({ reset }: ErrorComponentProps) {
  return (
    <section className="section">
      <div className="wrap status-page">
        <p className="kicker">Algo deu errado</p>
        <h1 className="h2">Não foi possível carregar esta página</h1>
        <p className="lead">
          Tente de novo em alguns instantes. Se continuar, fale com a gente pelo WhatsApp.
        </p>
        <div className="ctas">
          <button type="button" className="btn btn--primary" onClick={reset}>
            Tentar de novo
          </button>
          <Link to="/" className="btn btn--ghost">
            Ir para o início
          </Link>
        </div>
      </div>
    </section>
  )
}
