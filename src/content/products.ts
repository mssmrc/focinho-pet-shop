/** Categorias = corredores da loja (o número do corredor é a ordem desta lista). */
export const CATEGORIES = [
  { id: 'racao', label: 'Ração', hint: 'Seca, úmida e sachês' },
  { id: 'petiscos', label: 'Petiscos', hint: 'Bifinhos, ossos e cremosos' },
  { id: 'brinquedos', label: 'Brinquedos', hint: 'Bolinhas, pelúcias e arranhadores' },
  { id: 'higiene', label: 'Higiene', hint: 'Shampoo, tapete e areia' },
  { id: 'acessorios', label: 'Acessórios', hint: 'Coleiras e comedouros' },
] as const
export type CategoryId = (typeof CATEGORIES)[number]['id']
export type Species = 'cão' | 'gato' | 'ambos'

export type Product = {
  id: string
  name: string
  detail: string
  price: number
  /** Preço "de" quando o produto está em oferta (aparece riscado). */
  oldPrice?: number
  category: CategoryId
  species: Species
  /** Aparece na prateleira "Mais pedidos" da página inicial. */
  featured?: boolean
}

/** Produtos e preços FICTÍCIOS, só para o case. Sem marcas reais. */
export const PRODUCTS: Product[] = [
  {
    id: 'racao-adulto-15',
    name: 'Ração Premium Cão Adulto',
    detail: 'Frango e arroz · 15 kg',
    price: 189.9,
    oldPrice: 219.9,
    category: 'racao',
    species: 'cão',
    featured: true,
  },
  {
    id: 'racao-filhote-3',
    name: 'Ração Premium Filhote',
    detail: 'Raças pequenas · 3 kg',
    price: 64.9,
    category: 'racao',
    species: 'cão',
  },
  {
    id: 'racao-gato-10',
    name: 'Ração Gato Castrado',
    detail: 'Salmão · 10 kg',
    price: 159.9,
    oldPrice: 184.9,
    category: 'racao',
    species: 'gato',
    featured: true,
  },
  {
    id: 'sache-gato',
    name: 'Sachê Gato Adulto',
    detail: 'Carne ao molho · caixa com 12',
    price: 34.9,
    oldPrice: 41.9,
    category: 'racao',
    species: 'gato',
  },
  {
    id: 'bifinho',
    name: 'Bifinho de Carne',
    detail: 'Pacote 500 g',
    price: 22.9,
    category: 'petiscos',
    species: 'cão',
    featured: true,
  },
  {
    id: 'osso-natural',
    name: 'Osso Natural Defumado',
    detail: 'Unidade grande',
    price: 18.5,
    category: 'petiscos',
    species: 'cão',
  },
  {
    id: 'petisco-gato',
    name: 'Petisco Cremoso para Gatos',
    detail: '4 sachês de 15 g',
    price: 15.9,
    category: 'petiscos',
    species: 'gato',
  },
  {
    id: 'bolinha',
    name: 'Bolinha de Borracha Resistente',
    detail: 'Com guizo · 6 cm',
    price: 19.9,
    category: 'brinquedos',
    species: 'cão',
  },
  {
    id: 'pelucia',
    name: 'Pelúcia com Apito',
    detail: 'Elefante · 25 cm',
    price: 29.9,
    category: 'brinquedos',
    species: 'cão',
    featured: true,
  },
  {
    id: 'varinha',
    name: 'Varinha com Penas',
    detail: 'Para gatos',
    price: 14.9,
    category: 'brinquedos',
    species: 'gato',
  },
  {
    id: 'arranhador',
    name: 'Arranhador Torre',
    detail: '3 andares · 70 cm',
    price: 149.9,
    oldPrice: 179.9,
    category: 'brinquedos',
    species: 'gato',
  },
  {
    id: 'shampoo',
    name: 'Shampoo Neutro',
    detail: 'Pelagem sensível · 500 ml',
    price: 27.9,
    category: 'higiene',
    species: 'ambos',
  },
  {
    id: 'tapete',
    name: 'Tapete Higiênico',
    detail: 'Pacote com 30',
    price: 54.9,
    oldPrice: 64.9,
    category: 'higiene',
    species: 'cão',
  },
  {
    id: 'areia',
    name: 'Areia Sílica para Gatos',
    detail: '1,8 kg',
    price: 39.9,
    category: 'higiene',
    species: 'gato',
    featured: true,
  },
  {
    id: 'coleira',
    name: 'Coleira com Plaquinha',
    detail: 'Nylon · tamanho M',
    price: 32.9,
    category: 'acessorios',
    species: 'cão',
  },
  {
    id: 'comedouro',
    name: 'Comedouro Inox Duplo',
    detail: '2 × 300 ml',
    price: 44.9,
    category: 'acessorios',
    species: 'ambos',
  },
]

/** Produtos em oferta (com preço "de"). */
export const OFFERS = PRODUCTS.filter((p) => p.oldPrice && p.oldPrice > p.price)
