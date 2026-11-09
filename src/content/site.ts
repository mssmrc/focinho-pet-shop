/** Dados gerais (FICTÍCIOS — troque pelos dados reais do cliente). */
export const SITE = {
  name: 'Focinho Pet Shop',
  tagline: 'Ração, petiscos, brinquedos e banho e tosa, com entrega no mesmo dia em Vitória.',
  description:
    'Pet shop em Vitória (ES) com ração, petiscos, brinquedos e higiene para cães e gatos. Monte o pedido no site e finalize pelo WhatsApp. Banho e tosa com hora marcada.',
  cnpj: '00.000.000/0001-00',
  whatsapp: '(27) 99999-0000',
  whatsappNumber: '5527999990000',
  email: 'contato@exemplo.com.br',
  instagram: '@focinho.petshop',
  address: {
    street: 'Rua Exemplo, 88',
    district: 'Jardim da Penha',
    city: 'Vitória — ES',
    mapQuery: 'Jardim da Penha, Vitória - ES',
  },
  hours: 'Segunda a sábado, 8h às 19h · Domingo, 9h às 13h',
  /** Regras de entrega (FICTÍCIAS). */
  delivery: {
    fee: 8,
    freeFrom: 150,
    areas: [
      'Jardim da Penha',
      'Mata da Praia',
      'Praia do Canto',
      'Jardim Camburi',
      'Bento Ferreira',
      'Centro',
    ],
  },
} as const

/** Texto obrigatório nos sites de case. */
export const DEMO_NOTICE = 'Site demonstrativo. Loja, produtos, preços e contatos são fictícios.'
export const DEV_CREDIT = {
  name: 'Runa Web',
  text: 'Desenvolvido por',
  url: 'https://runaweb.com.br',
} as const

/** Letreiro corrido do topo (some com "reduzir movimento" ligado: aí fica parado). */
export const TICKER = [
  'Entrega hoje para pedidos até 16h',
  `Grátis acima de R$ ${SITE.delivery.freeFrom}`,
  'Táxi Dog R$ 20 ida e volta',
  'Pague na entrega com Pix ou cartão',
  'Banho e tosa com hora marcada',
]

/** Validade das ofertas mostrada na vitrine (FICTÍCIA). */
export const OFFERS_NOTE = 'Válidas até domingo ou enquanto durar o estoque.'

export const STEPS = [
  {
    title: 'Monte a sacola',
    text: 'Escolha os produtos e as quantidades. A sacola fica salva enquanto você navega.',
  },
  {
    title: 'Envie pelo WhatsApp',
    text: 'Informe entrega ou retirada e a forma de pagamento. O pedido chega pronto para a loja.',
  },
  {
    title: 'Receba hoje',
    text: 'Pedidos até 16h são entregues no mesmo dia. Pague na entrega com Pix ou cartão.',
  },
]

export const FAQ: [string, string][] = [
  [
    'Qual o valor da entrega?',
    'R$ 8 nos bairros atendidos, grátis em pedidos a partir de R$ 150. Para outros bairros, consulte pelo WhatsApp.',
  ],
  ['Posso pagar na entrega?', 'Sim. Aceitamos Pix, cartão de débito e crédito na maquininha do entregador.'],
  [
    'O preço do site é o mesmo da loja?',
    'Sim. Os valores podem mudar sem aviso; confirmamos tudo na resposta do WhatsApp antes de separar o pedido.',
  ],
  [
    'Vocês buscam o pet para o banho?',
    'Sim, com o Táxi Dog (R$ 20 ida e volta nos bairros atendidos). É só marcar no agendamento.',
  ],
]
