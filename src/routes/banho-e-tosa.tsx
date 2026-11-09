import { createFileRoute } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'
import { Photo } from '~/components/Photo'
import { Price } from '~/components/Price'
import { SITE } from '~/content/site'
import { brl } from '~/lib/cart'
import { EXTRAS, SERVICES, SIZES, groomingPrice, type ServiceId, type SizeId } from '~/lib/grooming'
import { buildMessage, whatsappLink } from '~/lib/whatsapp'

export const Route = createFileRoute('/banho-e-tosa')({
  head: () => ({
    meta: [
      { title: `Banho e tosa · ${SITE.name}` },
      {
        name: 'description',
        content:
          'Banho e tosa para cães e gatos em Jardim da Penha, Vitória. Veja o preço pelo porte e agende pelo WhatsApp.',
      },
    ],
  }),
  component: GroomingPage,
})

function GroomingPage() {
  const [service, setService] = useState<ServiceId>('banho')
  const [size, setSize] = useState<SizeId>('P')
  const [longCoat, setLongCoat] = useState(false)
  const [taxi, setTaxi] = useState(false)
  const [error, setError] = useState('')
  const price = groomingPrice(service, size, longCoat, taxi)
  const today = new Date().toISOString().slice(0, 10)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const get = (k: string) => String(data.get(k) ?? '').trim()
    if (!get('tutor') || !get('pet')) return setError('Informe seu nome e o nome do pet.')
    setError('')
    const s = SERVICES.find((x) => x.id === service)!
    const z = SIZES.find((x) => x.id === size)!
    const message = buildMessage(`Olá! Quero agendar banho e tosa no ${SITE.name}.`, [
      ['Tutor', get('tutor')],
      ['Pet', `${get('pet')} (${get('raca') || 'raça não informada'})`],
      ['Serviço', s.label],
      ['Porte', `${z.label}, ${z.hint}`],
      ['Pelagem longa', longCoat ? 'sim' : ''],
      ['Táxi Dog', taxi ? 'sim, buscar e levar' : ''],
      ['Dia preferido', get('dia') ? new Date(`${get('dia')}T12:00:00`).toLocaleDateString('pt-BR') : ''],
      ['Período', get('periodo')],
      ['Valor estimado', brl(price)],
    ])
    window.open(whatsappLink(SITE.whatsappNumber, message), '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <section className="groom-head">
        <div className="wrap">
          <p className="eyebrow eyebrow--yolk">Serviço com hora marcada</p>
          <h1 className="h1">Banho e tosa</h1>
          <p className="lead">
            Escolha o serviço e o porte para ver o valor. O agendamento é confirmado pelo WhatsApp.
          </p>
          <ul className="groom-perks">
            <li>Produtos hipoalergênicos</li>
            <li>Um pet por vez na mesa</li>
            <li>Táxi Dog nos bairros atendidos</li>
          </ul>
        </div>
        <div className="wrap groom-strip">
          <Photo k="banho" eager />
          <Photo k="brinquedo" eager />
          <Photo k="gato" eager />
        </div>
      </section>
      <section className="section">
        <form className="wrap groom-form" onSubmit={onSubmit} noValidate>
          <div className="groom-main">
            <fieldset className="pick-grid">
              <legend>
                <span className="step-n">1</span>Serviço
              </legend>
              {SERVICES.map((s) => (
                <label key={s.id} className="pick">
                  <input
                    type="radio"
                    name="servico"
                    checked={service === s.id}
                    onChange={() => setService(s.id)}
                  />
                  <span>
                    <b>{s.label}</b>a partir de {brl(s.prices.P)}
                  </span>
                </label>
              ))}
            </fieldset>
            <fieldset className="pick-grid pick-grid--4">
              <legend>
                <span className="step-n">2</span>Porte
              </legend>
              {SIZES.map((z) => (
                <label key={z.id} className="pick">
                  <input type="radio" name="porte" checked={size === z.id} onChange={() => setSize(z.id)} />
                  <span>
                    <b>{z.label}</b>
                    {z.hint}
                  </span>
                </label>
              ))}
            </fieldset>
            <fieldset className="extras">
              <legend>
                <span className="step-n">3</span>Adicionais
              </legend>
              <label className="check">
                <input type="checkbox" checked={longCoat} onChange={(e) => setLongCoat(e.target.checked)} />
                <span>Pelagem longa ou com nós (+ {brl(EXTRAS.longCoat)})</span>
              </label>
              <label className="check">
                <input type="checkbox" checked={taxi} onChange={(e) => setTaxi(e.target.checked)} />
                <span>Táxi Dog: buscar e levar (+ {brl(EXTRAS.taxi)})</span>
              </label>
            </fieldset>
            <fieldset className="fields">
              <legend>
                <span className="step-n">4</span>Seus dados
              </legend>
              <div className="form-row">
                <label>
                  Seu nome
                  <input name="tutor" autoComplete="name" />
                </label>
                <label>
                  Nome do pet
                  <input name="pet" />
                </label>
              </div>
              <div className="form-row form-row--3">
                <label>
                  Raça
                  <input name="raca" placeholder="Ex.: shih tzu" />
                </label>
                <label>
                  Dia preferido
                  <input name="dia" type="date" min={today} />
                </label>
                <label>
                  Período
                  <select name="periodo" defaultValue="Manhã">
                    <option>Manhã</option>
                    <option>Tarde</option>
                  </select>
                </label>
              </div>
            </fieldset>
          </div>
          <aside className="ticket" aria-live="polite">
            <p className="ticket-top">Ficha de atendimento</p>
            <dl className="ticket-lines">
              <div>
                <dt>Serviço</dt>
                <dd>{SERVICES.find((x) => x.id === service)!.label}</dd>
              </div>
              <div>
                <dt>Porte</dt>
                <dd>{SIZES.find((x) => x.id === size)!.label}</dd>
              </div>
              {longCoat && (
                <div>
                  <dt>Pelagem longa</dt>
                  <dd>+ {brl(EXTRAS.longCoat)}</dd>
                </div>
              )}
              {taxi && (
                <div>
                  <dt>Táxi Dog</dt>
                  <dd>+ {brl(EXTRAS.taxi)}</dd>
                </div>
              )}
            </dl>
            <div className="ticket-total">
              <p>Valor estimado</p>
              <Price value={price} />
            </div>
            <span className="ticket-note">Confirmado na avaliação do pet, na chegada.</span>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className="btn btn--green btn--lg">
              Agendar pelo WhatsApp
            </button>
          </aside>
        </form>
      </section>
    </>
  )
}
