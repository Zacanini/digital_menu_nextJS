/**
 * Infrastructure Layer: Menu API Service
 * 
 * Serviço responsável por buscar dados do menu.
 * Atualmente usa dados mockados, mas pode ser facilmente substituído
 * por uma implementação real de API sem alterar outras camadas.
 */

import { Pizza, Category } from '../../domain/entities';
import { mockPizzas, mockCategories } from '../data/mock-pizzas';

/**
 * Interface que define o contrato do serviço de menu
 * Isso permite injeção de dependência e facilita testes
 */
export interface IMenuAPIService {
  getMenuItems(): Promise<{ pizzas: Pizza[]; categories: Category[] }>;
  getPizzasByCategory(categoryId: string): Promise<Pizza[]>;
  getFeaturedPizzas(): Promise<Pizza[]>;
  getPizzaById(id: string): Promise<Pizza | null>;
  getCategories(): Promise<Category[]>;
}

/**
 * Implementação do serviço de menu que usa dados mockados
 */
export class MenuAPIService implements IMenuAPIService {
  /**
   * Simula delay de rede para tornar a experiência mais realista
   * Durante o build, usa delay mínimo para evitar timeouts
   */
  private async simulateNetworkDelay(min: number = 50, max: number = 100): Promise<void> {
    // Durante o build (processo estático), usar delay mínimo
    const isBuild = process.env.NODE_ENV === 'production' || process.env.NEXT_PHASE === 'phase-production-build';
    if (isBuild) {
      return Promise.resolve();
    }
    
    const delay = Math.random() * (max - min) + min;
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  /**
   * Busca todos os itens do menu (pizzas e categorias)
   * @returns Promise com pizzas e categorias
   */
  async getMenuItems(): Promise<{ pizzas: Pizza[]; categories: Category[] }> {
    await this.simulateNetworkDelay();
    
    // Retorna apenas pizzas disponíveis
    const availablePizzas = mockPizzas.filter(pizza => pizza.isAvailable);
    const activeCategories = mockCategories.filter(category => category.isActive);

    return {
      pizzas: availablePizzas,
      categories: activeCategories
    };
  }

  /**
   * Busca pizzas por categoria
   * @param categoryId ID da categoria
   * @returns Promise com array de pizzas da categoria
   */
  async getPizzasByCategory(categoryId: string): Promise<Pizza[]> {
    await this.simulateNetworkDelay(200, 500);

    const pizzas = mockPizzas.filter(
      pizza => pizza.categoryId === categoryId && pizza.isAvailable
    );

    return pizzas;
  }

  /**
   * Busca pizzas em destaque
   * @returns Promise com array de pizzas em destaque
   */
  async getFeaturedPizzas(): Promise<Pizza[]> {
    await this.simulateNetworkDelay(150, 400);

    const featuredPizzas = mockPizzas.filter(
      pizza => pizza.isFeatured && pizza.isAvailable
    );

    return featuredPizzas;
  }

  /**
   * Busca uma pizza específica por ID
   * @param id ID da pizza
   * @returns Promise com a pizza ou null se não encontrada
   */
  async getPizzaById(id: string): Promise<Pizza | null> {
    await this.simulateNetworkDelay(100, 300);

    const pizza = mockPizzas.find(
      pizza => pizza.id === id && pizza.isAvailable
    );

    return pizza || null;
  }

  /**
   * Busca todas as categorias ativas
   * @returns Promise com array de categorias
   */
  async getCategories(): Promise<Category[]> {
    await this.simulateNetworkDelay(100, 250);

    return mockCategories.filter(category => category.isActive);
  }
}

/**
 * Instância singleton do serviço para uso em toda a aplicação
 * Isso garante que tenhamos apenas uma instância do serviço
 */
export const menuAPIService = new MenuAPIService();