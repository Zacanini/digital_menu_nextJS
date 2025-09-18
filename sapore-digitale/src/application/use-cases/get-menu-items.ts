/**
 * Application Layer: Get Menu Items Use Case
 * 
 * Caso de uso responsável por orquestrar a busca de itens do menu.
 * Implementa injeção de dependência recebendo o serviço como parâmetro.
 * Esta camada contém a lógica de negócio da aplicação.
 */

import { Pizza, Category } from '../../domain/entities';
import { IMenuAPIService } from '../../infrastructure/services/menu-api-service';

/**
 * Resultado do caso de uso getMenuItems
 */
export interface GetMenuItemsResult {
  pizzas: Pizza[];
  categories: Category[];
  featuredPizzas: Pizza[];
  pizzasByCategory: Record<string, Pizza[]>;
  metadata: {
    totalPizzas: number;
    totalCategories: number;
    lastUpdated: Date;
  };
}

/**
 * Parâmetros opcionais para o caso de uso
 */
export interface GetMenuItemsParams {
  includeUnavailable?: boolean;
  categoryFilter?: string;
  onlyFeatured?: boolean;
}

/**
 * Caso de uso para buscar itens do menu
 * 
 * Este caso de uso orquestra a busca de dados do menu,
 * aplicando regras de negócio e organizando os dados
 * de forma otimizada para a camada de apresentação.
 * 
 * @param menuService - Serviço de menu injetado como dependência
 * @param params - Parâmetros opcionais para filtrar resultados
 */
export async function getMenuItemsUseCase(
  menuService: IMenuAPIService,
  params: GetMenuItemsParams = {}
): Promise<GetMenuItemsResult> {
  try {
    // Busca dados básicos do menu
    const { pizzas, categories } = await menuService.getMenuItems();

    // Aplica filtros se especificados
    let filteredPizzas = pizzas;
    
    if (params.categoryFilter) {
      filteredPizzas = pizzas.filter(pizza => pizza.categoryId === params.categoryFilter);
    }

    if (params.onlyFeatured) {
      filteredPizzas = pizzas.filter(pizza => pizza.isFeatured);
    }

    // Busca pizzas em destaque se não estiver filtrando por categoria específica
    const featuredPizzas = params.onlyFeatured 
      ? filteredPizzas 
      : await menuService.getFeaturedPizzas();

    // Organiza pizzas por categoria para otimizar renderização
    const pizzasByCategory: Record<string, Pizza[]> = {};
    categories.forEach(category => {
      pizzasByCategory[category.id] = filteredPizzas.filter(
        pizza => pizza.categoryId === category.id
      );
    });

    // Ordena categorias por ordem definida
    const sortedCategories = categories.sort((a, b) => a.order - b.order);

    // Ordena pizzas em destaque por nome
    const sortedFeaturedPizzas = featuredPizzas.sort((a, b) => a.name.localeCompare(b.name));

    return {
      pizzas: filteredPizzas,
      categories: sortedCategories,
      featuredPizzas: sortedFeaturedPizzas,
      pizzasByCategory,
      metadata: {
        totalPizzas: filteredPizzas.length,
        totalCategories: sortedCategories.length,
        lastUpdated: new Date()
      }
    };
  } catch (error) {
    // Log do erro para monitoramento (em produção seria enviado para serviço de logs)
    console.error('Erro ao buscar itens do menu:', error);
    
    // Re-lança o erro para que a camada de apresentação possa tratá-lo
    throw new Error('Não foi possível carregar o menu. Tente novamente em alguns instantes.');
  }
}

/**
 * Caso de uso especializado para buscar apenas pizzas de uma categoria
 * 
 * @param menuService - Serviço de menu injetado como dependência
 * @param categoryId - ID da categoria desejada
 */
export async function getPizzasByCategoryUseCase(
  menuService: IMenuAPIService,
  categoryId: string
): Promise<Pizza[]> {
  try {
    if (!categoryId.trim()) {
      throw new Error('ID da categoria é obrigatório');
    }

    const pizzas = await menuService.getPizzasByCategory(categoryId);
    
    // Ordena pizzas por destaque primeiro, depois por nome
    return pizzas.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return a.name.localeCompare(b.name);
    });
  } catch (error) {
    console.error('Erro ao buscar pizzas da categoria:', error);
    throw new Error('Não foi possível carregar as pizzas desta categoria.');
  }
}

/**
 * Caso de uso para buscar detalhes de uma pizza específica
 * 
 * @param menuService - Serviço de menu injetado como dependência
 * @param pizzaId - ID da pizza desejada
 */
export async function getPizzaDetailsUseCase(
  menuService: IMenuAPIService,
  pizzaId: string
): Promise<Pizza> {
  try {
    if (!pizzaId.trim()) {
      throw new Error('ID da pizza é obrigatório');
    }

    const pizza = await menuService.getPizzaById(pizzaId);
    
    if (!pizza) {
      throw new Error('Pizza não encontrada');
    }

    return pizza;
  } catch (error) {
    console.error('Erro ao buscar detalhes da pizza:', error);
    
    if (error instanceof Error && error.message === 'Pizza não encontrada') {
      throw error;
    }
    
    throw new Error('Não foi possível carregar os detalhes da pizza.');
  }
}