import { SITE } from './site'

export type LegalDoc = { title: string; sections: { heading: string; paragraphs: string[] }[] }

/** Modelo simples de política de privacidade (LGPD). Revisar com advogado antes de usar de verdade. */
export const PRIVACY_POLICY: LegalDoc = {
  title: 'Política de privacidade',
  sections: [
    {
      heading: 'Quais dados coletamos',
      paragraphs: [
        `Este site não tem cadastro nem guarda dados em servidor. Quando você usa o formulário de agendamento, as informações (nome, telefone, endereço e itens do pedido) são montadas em uma mensagem e enviadas pelo seu próprio WhatsApp para a ${SITE.name}.`,
      ],
    },
    {
      heading: 'Como usamos os dados',
      paragraphs: [
        'Usamos os dados recebidos apenas para responder ao seu contato, separar e entregar seus pedidos e agendar banho e tosa. O carrinho fica salvo só no seu navegador.',
      ],
    },
    {
      heading: 'Compartilhamento',
      paragraphs: [
        'Não vendemos nem compartilhamos seus dados com terceiros, exceto quando necessário para o atendimento (por exemplo, o entregador, só com o endereço) ou por obrigação legal.',
      ],
    },
    {
      heading: 'Seus direitos',
      paragraphs: [
        `Você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento pelo e-mail ${SITE.email} ou pelo WhatsApp ${SITE.whatsapp}.`,
      ],
    },
    {
      heading: 'Cookies',
      paragraphs: [
        'Este site não usa cookies de rastreamento ou publicidade. O mapa incorporado é fornecido pelo Google, que segue a própria política de privacidade.',
      ],
    },
  ],
}
