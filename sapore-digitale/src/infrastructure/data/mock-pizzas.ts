/**
 * Mock Data: Pizzas do Sapore Digitale
 * 
 * Dados simulados de pizzas para desenvolvimento e testes.
 * Repre    price: 75.90,
        price: 49.90,
    im    price: 45.90,
        price: 42.90,
    im    price: 55.90,
        price: 53.90,
    imageUrl: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categoryId: 'cat-003',geUrl: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categoryId: 'cat-003',Url: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categoryId: 'cat-002',geUrl: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categoryId: 'cat-002',Url: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categoryId: 'cat-001',geUrl: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categoryId: 'cat-001',ta o cardápio autêntico de uma pizzaria ítalo-brasileira premium.
 */

import { Pizza, Category } from '../../domain/entities';

/**
 * Categorias do menu
 */
export const mockCategories: Category[] = [
  {
    id: 'cat-001',
    name: 'Pizzas Salgadas',
    description: 'Tradicionais receitas italianas com ingredientes premium',
    slug: 'salgadas',
    order: 1,
    isActive: true
  },
  {
    id: 'cat-002', 
    name: 'Pizzas Doces',
    description: 'Sobremesas irresistíveis em formato de pizza',
    slug: 'doces',
    order: 2,
    isActive: true
  },
  {
    id: 'cat-003',
    name: 'Pizzas Veganas',
    description: 'Opções 100% vegetais sem abrir mão do sabor',
    slug: 'veganas',
    order: 3,
    isActive: true
  },
  {
    id: 'cat-004',
    name: 'Especialidades da Casa',
    description: 'Criações exclusivas do nosso chef italiano',
    slug: 'especiais',
    order: 4,
    isActive: true
  }
];

/**
 * Menu completo de pizzas
 */
export const mockPizzas: Pizza[] = [
  // === PIZZAS SALGADAS ===
  {
    id: 'pizza-001',
    name: 'Margherita Clássica',
    description: 'A rainha das pizzas! Molho de tomate San Marzano, mozzarella di bufala, manjericão fresco e azeite extra virgem.',
    ingredients: ['Molho de tomate San Marzano', 'Mozzarella di Bufala', 'Manjericão fresco', 'Azeite extra virgem'],
    price: 52.90,
    imageUrl: 'https://images.unsplash.com/photo-1564128442383-9201fcc740eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categoryId: 'cat-001',
    isAvailable: true,
    isFeatured: true,
    preparationTime: 15,
    nutritionalInfo: {
      caloriesPerSlice: 280,
      protein: 12,
      carbohydrates: 35,
      fat: 10,
      fiber: 2
    },
    tags: ['vegetariana', 'tradicional'],
    slug: 'margherita-classica'
  },
  {
    id: 'pizza-002',
    name: 'Quattro Formaggi',
    description: 'Harmonia perfeita de quatro queijos nobres: gorgonzola, parmesão, mozzarella e fontina italiana.',
    ingredients: ['Gorgonzola DOP', 'Parmigiano Reggiano', 'Mozzarella', 'Fontina'],
    price: 68.90,
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categoryId: 'cat-001',
    isAvailable: true,
    isFeatured: true,
    preparationTime: 18,
    nutritionalInfo: {
      caloriesPerSlice: 350,
      protein: 18,
      carbohydrates: 32,
      fat: 18,
      fiber: 1
    },
    tags: ['vegetariana', 'queijos'],
    slug: 'quattro-formaggi'
  },
  {
    id: 'pizza-003',
    name: 'Pepperoni Premium',
    description: 'Pepperoni artesanal italiano, mozzarella especial e orégano siciliano sobre molho de tomate encorpado.',
    ingredients: ['Pepperoni artesanal', 'Mozzarella especial', 'Molho de tomate', 'Orégano siciliano'],
    price: 58.90,
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categoryId: 'cat-001',
    isAvailable: true,
    isFeatured: false,
    preparationTime: 20,
    nutritionalInfo: {
      caloriesPerSlice: 320,
      protein: 15,
      carbohydrates: 33,
      fat: 14,
      fiber: 2
    },
    tags: ['picante', 'carne'],
    slug: 'pepperoni-premium'
  },
  {
    id: 'pizza-004',
    name: 'Prosciutto e Rúcula',
    description: 'Prosciutto di Parma DOP, rúcula selvagem, tomate cereja, mozzarella e redução de aceto balsâmico.',
    ingredients: ['Prosciutto di Parma DOP', 'Rúcula selvagem', 'Tomate cereja', 'Mozzarella', 'Aceto balsâmico'],
    price: 74.90,
    imageUrl: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categoryId: 'cat-001',
    isAvailable: true,
    isFeatured: true,
    preparationTime: 22,
    nutritionalInfo: {
      caloriesPerSlice: 290,
      protein: 16,
      carbohydrates: 30,
      fat: 12,
      fiber: 3
    },
    tags: ['premium', 'carne'],
    slug: 'prosciutto-rucula'
  },
  {
    id: 'pizza-005',
    name: 'Brasileirinha',
    description: 'Nossa homenagem ao Brasil: catupiry original, frango desfiado temperado, milho doce e azeitona verde.',
    ingredients: ['Catupiry original', 'Frango desfiado', 'Milho doce', 'Azeitona verde'],
    price: 56.90,
    imageUrl: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categoryId: 'cat-001',
    isAvailable: true,
    isFeatured: false,
    preparationTime: 25,
    nutritionalInfo: {
      caloriesPerSlice: 310,
      protein: 20,
      carbohydrates: 28,
      fat: 13,
      fiber: 2
    },
    tags: ['brasileira', 'frango'],
    slug: 'brasileirinha'
  },

  // === PIZZAS DOCES ===
  {
    id: 'pizza-006',
    name: 'Nutella com Morango',
    description: 'Massa doce artesanal coberta com Nutella original, morangos frescos e açúcar de confeiteiro.',
    ingredients: ['Nutella original', 'Morangos frescos', 'Açúcar de confeiteiro', 'Massa doce'],
    price: 48.90,
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categoryId: 'cat-002',
    isAvailable: true,
    isFeatured: true,
    preparationTime: 15,
    nutritionalInfo: {
      caloriesPerSlice: 380,
      protein: 8,
      carbohydrates: 52,
      fat: 16,
      fiber: 3
    },
    tags: ['doce', 'frutas'],
    slug: 'nutella-morango'
  },
  {
    id: 'pizza-007',
    name: 'Romeu e Julieta Premium',
    description: 'Queijo minas artesanal derretido com goiabada cremosa de primeira qualidade.',
    ingredients: ['Queijo Minas artesanal', 'Goiabada cremosa premium', 'Canela em pó'],
    price: 44.90,
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categoryId: 'cat-002',
    isAvailable: true,
    isFeatured: false,
    preparationTime: 18,
    nutritionalInfo: {
      caloriesPerSlice: 340,
      protein: 12,
      carbohydrates: 45,
      fat: 12,
      fiber: 1
    },
    tags: ['doce', 'brasileira', 'tradicional'],
    slug: 'romeu-julieta-premium'
  },

  // === PIZZAS VEGANAS ===
  {
    id: 'pizza-008',
    name: 'Vegana Mediterranean',
    description: 'Molho de tomate especial, queijo vegano artesanal, abobrinha, berinjela, pimentão e azeitonas Kalamata.',
    ingredients: ['Queijo vegano artesanal', 'Abobrinha grelhada', 'Berinjela', 'Pimentão', 'Azeitonas Kalamata'],
    price: 62.90,
    imageUrl: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categoryId: 'cat-003',
    isAvailable: true,
    isFeatured: true,
    preparationTime: 20,
    nutritionalInfo: {
      caloriesPerSlice: 240,
      protein: 8,
      carbohydrates: 35,
      fat: 8,
      fiber: 6
    },
    tags: ['vegana', 'mediterrânea', 'low-carb'],
    slug: 'vegana-mediterranean'
  },
  {
    id: 'pizza-009',
    name: 'Vegana Tropical',
    description: 'Queijo vegano, abacaxi grelhado, tomate cereja, cebola roxa e coentro fresco.',
    ingredients: ['Queijo vegano', 'Abacaxi grelhado', 'Tomate cereja', 'Cebola roxa', 'Coentro fresco'],
    price: 58.90,
    imageUrl: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categoryId: 'cat-003',
    isAvailable: true,
    isFeatured: false,
    preparationTime: 18,
    nutritionalInfo: {
      caloriesPerSlice: 220,
      protein: 6,
      carbohydrates: 38,
      fat: 6,
      fiber: 4
    },
    tags: ['vegana', 'tropical', 'frutas'],
    slug: 'vegana-tropical'
  },

  // === ESPECIALIDADES DA CASA ===
  {
    id: 'pizza-010',
    name: 'Tartufo Nero',
    description: 'Nossa criação mais exclusiva: trufa negra italiana, queijo taleggio, cogumelos porcini e azeite trufado.',
    ingredients: ['Trufa negra italiana', 'Queijo Taleggio', 'Cogumelos Porcini', 'Azeite trufado'],
    price: 128.90,
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categoryId: 'cat-004',
    isAvailable: true,
    isFeatured: true,
    preparationTime: 25,
    nutritionalInfo: {
      caloriesPerSlice: 420,
      protein: 20,
      carbohydrates: 30,
      fat: 25,
      fiber: 2
    },
    tags: ['premium', 'exclusiva', 'trufa'],
    slug: 'tartufo-nero'
  },
  {
    id: 'pizza-011',
    name: 'Salmão Defumado',
    description: 'Base de cream cheese, salmão defumado norueguês, alcaparras, cebola roxa e endro fresco.',
    ingredients: ['Cream cheese', 'Salmão defumado norueguês', 'Alcaparras', 'Cebola roxa', 'Endro fresco'],
    price: 89.90,
    imageUrl: 'https://images.unsplash.com/photo-1605854648909-458d5b95bf5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categoryId: 'cat-004',
    isAvailable: true,
    isFeatured: true,
    preparationTime: 20,
    nutritionalInfo: {
      caloriesPerSlice: 360,
      protein: 22,
      carbohydrates: 28,
      fat: 18,
      fiber: 1
    },
    tags: ['premium', 'peixe', 'sofisticada'],
    slug: 'salmao-defumado'
  },
  {
    id: 'pizza-012',
    name: 'Burrata Speciale',
    description: 'Molho de tomate San Marzano, burrata fresca, tomate cereja confitado, manjericão roxo e redução de vinho tinto.',
    ingredients: ['Burrata fresca', 'Tomate cereja confitado', 'Manjericão roxo', 'Redução de vinho tinto'],
    price: 84.90,
    imageUrl: 'https://images.unsplash.com/photo-1506280754576-f6fa8a873550?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categoryId: 'cat-004',
    isAvailable: true,
    isFeatured: true,
    preparationTime: 22,
    nutritionalInfo: {
      caloriesPerSlice: 320,
      protein: 16,
      carbohydrates: 32,
      fat: 14,
      fiber: 3
    },
    tags: ['premium', 'queijo', 'gourmet'],
    slug: 'burrata-speciale'
  }
];

/**
 * Função helper para obter pizzas por categoria
 */
export function getPizzasByCategory(categoryId: string): Pizza[] {
  return mockPizzas.filter(pizza => pizza.categoryId === categoryId);
}

/**
 * Função helper para obter pizzas em destaque
 */
export function getFeaturedPizzas(): Pizza[] {
  return mockPizzas.filter(pizza => pizza.isFeatured);
}

/**
 * Função helper para obter pizza por slug
 */
export function getPizzaBySlug(slug: string): Pizza | undefined {
  return mockPizzas.find(pizza => pizza.slug === slug);
}

/**
 * Função helper para obter categoria por slug
 */
export function getCategoryBySlug(slug: string): Category | undefined {
  return mockCategories.find(category => category.slug === slug);
}