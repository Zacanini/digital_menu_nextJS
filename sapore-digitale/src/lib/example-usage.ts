/**
 * Exemplo de Uso das Camadas de Lógica
 * 
 * Este arquivo demonstra como as camadas interagem seguindo
 * os princípios da Clean Architecture com injeção de dependência.
 */

import { menuAPIService } from '../infrastructure/services/menu-api-service';
import { getMenuItemsUseCase, getPizzasByCategoryUseCase } from '../application/use-cases/get-menu-items';

/**
 * Exemplo de como usar o caso de uso em um Server Component do Next.js
 */
export async function exemploUsoServerComponent() {
  try {
    // A camada de apresentação chama o caso de uso da aplicação
    // passando o serviço de infraestrutura como dependência
    const menuData = await getMenuItemsUseCase(menuAPIService);
    
    console.log('📊 Dados do menu carregados:');
    console.log(`- ${menuData.metadata.totalPizzas} pizzas disponíveis`);
    console.log(`- ${menuData.metadata.totalCategories} categorias ativas`);
    console.log(`- ${menuData.featuredPizzas.length} pizzas em destaque`);
    
    return menuData;
  } catch (error) {
    console.error('❌ Erro ao carregar menu:', error);
    throw error;
  }
}

/**
 * Exemplo de como buscar pizzas de uma categoria específica
 */
export async function exemploUsoPorCategoria(categoryId: string) {
  try {
    const pizzas = await getPizzasByCategoryUseCase(menuAPIService, categoryId);
    
    console.log(`🍕 ${pizzas.length} pizzas encontradas na categoria ${categoryId}`);
    
    return pizzas;
  } catch (error) {
    console.error('❌ Erro ao carregar pizzas da categoria:', error);
    throw error;
  }
}

/**
 * Demonstração dos benefícios da arquitetura implementada:
 * 
 * 1. ✅ Injeção de Dependência: 
 *    - O caso de uso recebe o serviço como parâmetro
 *    - Facilita testes e permite trocar implementações
 * 
 * 2. ✅ Separação de Responsabilidades:
 *    - Domain: Entidades e tipos (Pizza, Category)
 *    - Application: Lógica de negócio (casos de uso)
 *    - Infrastructure: Acesso a dados (MenuAPIService)
 *    - Presentation: UI (será implementada na próxima fase)
 * 
 * 3. ✅ Testabilidade:
 *    - Cada camada pode ser testada independentemente
 *    - Mock do serviço facilita testes dos casos de uso
 * 
 * 4. ✅ Escalabilidade:
 *    - Fácil adicionar novos casos de uso
 *    - Trocar fonte de dados sem afetar UI
 *    - Adicionar cache, validações, etc.
 */