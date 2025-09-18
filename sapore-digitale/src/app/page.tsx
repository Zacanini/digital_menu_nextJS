/**
 * Home Page - Sapore Digitale
 * 
 * Página principal do menu digital da pizzaria.
 * Server Component que busca dados usando Clean Architecture.
 */

import { menuAPIService } from '../infrastructure/services/menu-api-service';
import { getMenuItemsUseCase } from '../application/use-cases/get-menu-items';
import { PizzaCard } from '../components/shared/PizzaCard';

export default async function Home() {
  // Busca dados usando Clean Architecture - injeção de dependência
  const menuData = await getMenuItemsUseCase(menuAPIService);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-12 mb-12">
        <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-4">
          Benvenuti alla
          <span className="block text-primary">Sapore Digitale</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
          Experimente o autêntico sabor da Itália no coração de São Paulo.
          Tradição napolitana desde 1947.
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            🍕 <span>{menuData.metadata.totalPizzas} pizzas disponíveis</span>
          </div>
          <div className="flex items-center gap-2">
            ⭐ <span>{menuData.featuredPizzas.length} especialidades</span>
          </div>
          <div className="flex items-center gap-2">
            📂 <span>{menuData.metadata.totalCategories} categorias</span>
          </div>
        </div>
      </section>

      {/* Pizzas em Destaque */}
      {menuData.featuredPizzas.length > 0 && (
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-2">
              ⭐ Nossas Especialidades
            </h2>
            <p className="text-muted-foreground">
              As criações mais amadas pelos nossos clientes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {menuData.featuredPizzas.map((pizza) => (
              <PizzaCard
                key={pizza.id}
                pizza={pizza}
              />
            ))}
          </div>
        </section>
      )}

      {/* Menu Completo por Categorias */}
      <section>
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-2">
            🍕 Nosso Cardápio Completo
          </h2>
          <p className="text-muted-foreground">
            Explore todas as nossas deliciosas criações organizadas por categoria
          </p>
        </div>

        {menuData.categories.map((category) => {
          const categoryPizzas = menuData.pizzasByCategory[category.id] || [];
          
          if (categoryPizzas.length === 0) return null;

          return (
            <div key={category.id} className="mb-16">
              {/* Header da Categoria */}
              <div className="mb-8">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                )}
              </div>

              {/* Grid de Pizzas da Categoria */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryPizzas.map((pizza) => (
                  <PizzaCard
                    key={pizza.id}
                    pizza={pizza}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-secondary/20 rounded-lg mt-16">
        <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
          🇮🇹 Sabor Autêntico Italiano
        </h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Todas as nossas pizzas são preparadas com ingredientes importados da Itália 
          e massa fermentada naturalmente por 48 horas. Uma experiência gastronômica única!
        </p>
        <div className="flex items-center justify-center gap-8 text-sm">
          <div className="text-center">
            <div className="text-2xl mb-2">🕐</div>
            <p className="font-medium">15-25 min</p>
            <p className="text-muted-foreground">Tempo de preparo</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🍃</div>
            <p className="font-medium">Ingredientes frescos</p>
            <p className="text-muted-foreground">Diariamente</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🎯</div>
            <p className="font-medium">Qualidade premium</p>
            <p className="text-muted-foreground">Desde 1947</p>
          </div>
        </div>
      </section>
    </div>
  );
}