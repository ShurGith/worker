export const MENU_CATEGORIES = [
  { id: 'all', label: 'Toda la Carta' },
  { id: 'entrantes', label: 'Entrantes' },
  { id: 'principales', label: 'Carnes & Pescados' },
  { id: 'arroces', label: 'Arroces & Brasas' },
  { id: 'postres', label: 'Postres Artesanales' },
  { id: 'bodega', label: 'Vinos & Coctelería' },
];

export const MENU_ITEMS = [
  {
    id: 1,
    category: 'entrantes',
    name: 'Croquetas Melosas de Jamón Ibérico',
    description: 'Croquetas caseras con jamón 100% de bellota y crujiente de panko japonés, sobre velo ibérico.',
    price: '14.50 €',
    tag: 'Clásico de la casa',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80',
    dietary: ['Recomendado']
  },
  {
    id: 2,
    category: 'entrantes',
    name: 'Tartar de Atún Rojo de Almadraba',
    description: 'Con aguacate hass ahumado, emulsión de soja y yuzu, y crujientes de alga nori.',
    price: '19.80 €',
    tag: 'Fresco',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=700&q=80',
    dietary: ['Sin Gluten', 'Omega 3']
  },
  {
    id: 3,
    category: 'entrantes',
    name: 'Burrata Trufada con Tomates Confitados',
    description: 'Burrata pugliese D.O.P., pesto genovés de albahaca fresca, reducción de módena y piñones tostados.',
    price: '16.00 €',
    tag: 'Vegetariano',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=700&q=80',
    dietary: ['Vegetariano']
  },
  {
    id: 4,
    category: 'principales',
    name: 'Solomillo de Vaca Madurada (45 días)',
    description: 'A la brasa de carbón de encina, acompañado de chalotas glaseadas y milhojas de patata trufada.',
    price: '28.50 €',
    tag: 'Corte Premium',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=700&q=80',
    dietary: ['Sin Gluten']
  },
  {
    id: 5,
    category: 'principales',
    name: 'Lubina Salvaje a la Espalda',
    description: 'Con refrito tradicional de ajos tiernos, guindilla de caserío y bilbaína suave sobre lecho de verduras al vapor.',
    price: '26.00 €',
    tag: 'Lonja del día',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=700&q=80',
    dietary: ['Sin Gluten']
  },
  {
    id: 6,
    category: 'arroces',
    name: 'Arroz del Senyoret de Marisco',
    description: 'Arroz bomba en paella con socarrat perfecto, gamba roja, calamar de potera y cigalitas peladas.',
    price: '23.50 € / ración',
    tag: 'Especialidad',
    image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=700&q=80',
    dietary: ['Mín. 2 personas']
  },
  {
    id: 7,
    category: 'arroces',
    name: 'Risotto de Setas Silvestres y Foie',
    description: 'Arroz carnaroli con boletus edulis, queso parmesano curado 24 meses y lascas de foie fresco a la plancha.',
    price: '21.00 €',
    tag: 'Intenso',
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=700&q=80',
    dietary: ['Vegetariano adaptable']
  },
  {
    id: 8,
    category: 'postres',
    name: 'Tarta de Queso Fluida elRest',
    description: 'Elaborada con quesos artesanos de caserío, base de galleta sablé y helado de frutos rojos silvestres.',
    price: '8.50 €',
    tag: 'Imprescindible',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80',
    dietary: ['Casero']
  },
  {
    id: 9,
    category: 'postres',
    name: 'Coulant de Chocolate Belga 70%',
    description: 'Corazón fundente de cacao, crumble de avellanas tostadas y helado artesanal de vainilla Bourbon.',
    price: '8.90 €',
    tag: 'Para golosos',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80',
    dietary: ['Casero']
  },
  {
    id: 10,
    category: 'bodega',
    name: 'Cóctel Signature: Mediterranean Mist',
    description: 'Ginebra botánica premium, licor de saúco, albahaca fresca machacada, zumo de lima y tónica artesana.',
    price: '11.00 €',
    tag: 'Autor',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=700&q=80',
    dietary: ['Coctelería']
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Marta Delgado',
    role: 'Crítica gastronómica',
    comment: 'Una experiencia sublime en elRest. El arroz del senyoret tiene el punto de cocción y el socarrat más perfecto que he probado este año.',
    rating: 5,
    date: 'Hace 1 semana'
  },
  {
    id: 2,
    name: 'Carlos Mendoza',
    role: 'Cliente habitual',
    comment: 'El trato del personal es impecable y la atmósfera íntima y acogedora. La tarta de queso fluida es sencillamente de otra galaxia.',
    rating: 5,
    date: 'Hace 2 semanas'
  },
  {
    id: 3,
    name: 'Elena & Javier',
    role: 'Celebración de aniversario',
    comment: 'Celebramos aquí nuestro aniversario y cuidaron cada detalle con mimo. El maridaje de vinos propuesto por el sumiller fue espectacular.',
    rating: 5,
    date: 'Hace 1 mes'
  }
];
