import { Link } from '@tanstack/react-router'
import type { LegalDoc } from '~/content/legal'

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <section className="section">
      <div className="wrap legal-page">
        <h1 className="h2">{doc.title}</h1>
        {doc.sections.map((s) => (
          <div key={s.heading}>
            <h2>{s.heading}</h2>
            {s.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        ))}
        <p>
          <Link className="link" to="/">
            Voltar ao início
          </Link>
        </p>
      </div>
    </section>
  )
}
