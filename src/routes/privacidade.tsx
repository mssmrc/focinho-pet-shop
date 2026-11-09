import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '~/components/LegalPage'
import { PRIVACY_POLICY } from '~/content/legal'
import { SITE } from '~/content/site'

export const Route = createFileRoute('/privacidade')({
  head: () => ({ meta: [{ title: `Política de privacidade · ${SITE.name}` }] }),
  component: () => <LegalPage doc={PRIVACY_POLICY} />,
})
