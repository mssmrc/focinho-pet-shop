# Especificação — Focinho Pet Shop (case)

## Objetivo

Exemplo do **plano Catálogo**: mostrar a lojas de bairro como vender pelo site sem pagamento online,
com sacola de compras e pedido completo chegando pelo WhatsApp.

## Público do site

Tutores de cães e gatos de Vitória (ES) que querem comprar ração e itens do dia a dia com entrega
rápida e agendar banho e tosa.

## Páginas

| Página       | Conteúdo principal                                                                                                                                 |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Início       | Vitrine (ofertas, banho e tosa, entrega), corredores, ofertas da semana, tabela de banho e tosa, mais pedidos, como pedir, bairros, dúvidas e loja |
| Produtos     | Catálogo com corredores na lateral, filtro cão/gato e busca (tudo na URL)                                                                          |
| Banho e tosa | Escolha de serviço e porte, adicionais, valor estimado e agendamento                                                                               |
| Privacidade  | Modelo de política (LGPD)                                                                                                                          |

## Funcionalidades

- **Sacola**: adicionar, alterar quantidade e remover; o contador aparece no cabeçalho e a sacola
  fica salva no navegador.
- **Pedido pelo WhatsApp** com itens, entrega ou retirada, endereço, forma de pagamento, frete
  (grátis acima de R$ 150) e total.
- **Banho e tosa**: preço por serviço e porte, com pelagem longa e Táxi Dog.
- **Busca no cabeçalho** que abre o catálogo filtrado (`/produtos?busca=...`).
- **Ofertas**: produtos com `oldPrice` mostram preço "de/por" e o selo com o % de desconto.

## Identidade visual: "vitrine de bairro"

Cara de loja, inspirada em encarte de mercado de bairro com acabamento caprichado (referências estudadas:
Petz, Cobasi, Petlove e Zee.Dog; inspiração, não cópia).

| Token          | Valor     | Uso                                        |
| -------------- | --------- | ------------------------------------------ |
| `--paper`      | `#fbf6ec` | Fundo (papel creme)                        |
| `--green`      | `#12543f` | Botões, logo, placas dos corredores        |
| `--green-dark` | `#0b3a2b` | Letreiro, faixa de banho e tosa, rodapé    |
| `--yolk`       | `#ffc928` | Encarte da vitrine, selo de oferta, sacola |
| `--tomato`     | `#d63c22` | Preço promocional, números dos passos      |
| `--ink`        | `#1b2a23` | Texto                                      |

- **Tipografia:** Bricolage Grotesque (títulos e preços) e Figtree (texto).
- **Assinaturas:** letreiro corrido no topo; vitrine em mosaico (encarte com ofertas + banho e tosa + entrega);
  corredores numerados; preço estilo encarte (R$ 189,⁹⁰); selo amarelo de desconto; etiqueta de preço com
  furinho; tabela de banho e tosa como "placa da parede"; sacola com borda de cupom; ficha de atendimento
  picotada na página de banho e tosa.
- **Evitar:** o padrão "título à esquerda + foto em moldura/arco à direita" usado em outros cases.
