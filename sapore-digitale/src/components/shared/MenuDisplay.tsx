/**
 * MenuDisplay Component - Sapore
 * 
 * Client Component que gerencia o estado do modal de detalhes
 * e renderiza o menu completo da pizzaria com filtros de categoria.
 */

'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Pizza } from '@/domain/entities/Pizza';
import { GetMenuItemsResult } from '@/application/use-cases/get-menu-items';
import { PizzaCard } from './PizzaCard';
import { PizzaDetailModal } from './PizzaDetailModal';
import { CategoryTabs } from './CategoryTabs';
import { INGREDIENTS_DISPLAY_COUNT } from '@/config/ui';

interface MenuDisplayProps {
  menuData: GetMenuItemsResult;
}

export function MenuDisplay({ menuData }: MenuDisplayProps) {
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const handlePizzaClick = (pizza: Pizza) => {
    setSelectedPizza(pizza);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPizza(null);
  };

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategoryId(categoryId);
  };

  // Filtrar pizzas com base na categoria selecionada
  const filteredPizzas = useMemo(() => {
    if (!selectedCategoryId) {
      return menuData.pizzas;
    }
    return menuData.pizzas.filter(pizza => pizza.categoryId === selectedCategoryId);
  }, [menuData.pizzas, selectedCategoryId]);

  // Variáveis de animação
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <>
      <motion.div 
        className="container mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.section 
          className="text-center py-8 sm:py-12 mb-8 sm:mb-12"
          variants={heroVariants}
        >
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4">
            Bem Vindo a
            <span className="block text-primary">Sapore</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4 sm:mb-6 max-w-xl sm:max-w-2xl mx-auto px-4">
            Experimente o autêntico sabor da Itália no coração de São Paulo.
            Tradição napolitana desde 1947.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
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
        </motion.section>

        {/* Pizzas em Destaque - SEMPRE VISÍVEIS */}
        {menuData.featuredPizzas.length > 0 && (
          <motion.section 
            className="mb-12 sm:mb-16"
            variants={itemVariants}
          >
            {/* Header das Especialidades */}
            <div className="text-center mb-8 sm:mb-12">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mb-6 shadow-lg"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="text-2xl">👑</span>
              </motion.div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
                Nossa Especialidade
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mb-4"></div>
              <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                Três obras-primas culinárias que definem a excelência da nossa tradição napolitana.
                Cada uma conta uma história de sabor e paixão.
              </p>
            </div>
            
            {/* Grid Especialidades */}
            <div className="max-w-7xl mx-auto">
              {/* Layout responsivo especial: 3 quadrados bem distribuídos no mobile */}
              <div className="grid grid-cols-3 gap-2 sm:gap-6 md:gap-8 lg:gap-10">
                {menuData.featuredPizzas.map((pizza, index) => (
                  <motion.div
                    key={pizza.id}
                    className="group relative"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    whileHover={{ y: -8 }}
                  >
                    {/* Card Redesenhado para Mobile - Formato Retangular com altura fixa */}
                    <div className="relative bg-white dark:bg-gray-900 rounded-lg sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 sm:duration-500 border border-gray-200 dark:border-gray-800 h-full flex flex-col" style={{ minHeight: '320px' }}>
                      
                      {/* Badges - Compactos no Mobile */}
                      <div className="absolute top-2 left-2 z-10">
                        <span className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                          <span className="mr-1">⭐</span>
                          <span className="hidden sm:inline">ESPECIALIDADE</span>
                          <span className="sm:hidden">#{index + 1}</span>
                        </span>
                      </div>

                      {/* Imagem Quadrada no Topo */}
                      <div className="relative aspect-square overflow-hidden bg-gray-100">
                        <img
                          src={pizza.imageUrl}
                          alt={pizza.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Overlay sutil */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                        
                        {/* Preço - Posicionado sobre a imagem */}
                        <div className="absolute bottom-2 right-2">
                          <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-2 py-1 rounded-full font-bold text-sm sm:text-base shadow-lg">
                            R$ {pizza.price.toFixed(2).replace('.', ',')}
                          </div>
                        </div>
                      </div>

                      {/* Conteúdo Compacto com altura controlada */}
                      <div className="p-2 sm:p-4 flex-1 flex flex-col" style={{ minHeight: '140px' }}>
                        {/* Área de Conteúdo que expande */}
                        <div className="flex-1">
                          {/* Nome - Sempre visível */}
                          <h3 className="font-heading text-sm sm:text-xl font-bold text-foreground mb-1 sm:mb-2 truncate sm:line-clamp-2 leading-tight">
                            {pizza.name}
                          </h3>
                          
                          {/* Descrição - Resumida no mobile */}
                          <p className="text-muted-foreground text-xs sm:text-base leading-tight mb-2 sm:mb-4 line-clamp-2">
                            {pizza.description}
                          </p>

                          {/* Ingredientes - Só no desktop */}
                          <div className="hidden sm:block mb-4">
                            <div className="flex flex-wrap gap-1">
                              {pizza.ingredients.slice(0, INGREDIENTS_DISPLAY_COUNT).map((ingredient, idx) => (
                                <span
                                  key={idx}
                                  className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded-full text-muted-foreground"
                                >
                                  {ingredient}
                                </span>
                              ))}
                              {pizza.ingredients.length > INGREDIENTS_DISPLAY_COUNT && (
                                <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded-full text-muted-foreground">
                                  +{pizza.ingredients.length - INGREDIENTS_DISPLAY_COUNT}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Botão de Ação - SEMPRE no final */}
                        <div className="mt-auto pt-2">
                          <motion.button
                            onClick={() => handlePizzaClick(pizza)}
                            className="w-full bg-gradient-to-r from-primary to-orange-500 text-white px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-full font-semibold text-xs sm:text-sm hover:shadow-lg transition-all duration-300 h-8 sm:h-10"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="sm:hidden">Ver</span>
                            <span className="hidden sm:inline">Ver Detalhes</span>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Decoração Final */}
            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-2 text-muted-foreground text-sm">
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-gray-300"></div>
                <span className="italic">Criadas com paixão e tradição italiana</span>
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-gray-300"></div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Filtros de Categoria */}
        <motion.section 
          className="mb-8 sm:mb-12"
          variants={itemVariants}
        >
          <div className="text-center mb-6">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
              🍕 Explore Nosso Menu
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base px-4">
              Navegue pelas categorias e descubra sabores únicos
            </p>
          </div>
          <CategoryTabs
            categories={menuData.categories}
            selectedCategoryId={selectedCategoryId}
            onCategorySelect={handleCategorySelect}
          />
        </motion.section>

        {/* Menu Filtrado - SÓ ESSA SEÇÃO É AFETADA PELOS FILTROS */}
        <motion.section variants={itemVariants}>
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-2">
              {selectedCategoryId 
                ? menuData.categories.find(cat => cat.id === selectedCategoryId)?.name || 'Pizzas Selecionadas'
                : 'Cardápio Completo'
              }
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base px-4">
              {selectedCategoryId 
                ? menuData.categories.find(cat => cat.id === selectedCategoryId)?.description
                : 'Todas as nossas deliciosas criações'
              }
            </p>
          </div>

          {/* Grid de Pizzas Filtradas - 3 quadrados no mobile */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 xl:grid-cols-4">
            {filteredPizzas.map((pizza) => (
              <motion.div
                key={pizza.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <PizzaCard
                  pizza={pizza}
                  onPizzaClick={handlePizzaClick}
                />
              </motion.div>
            ))}
          </div>

          {/* Mensagem quando não há pizzas */}
          {filteredPizzas.length === 0 && (
            <motion.div 
              className="text-center py-12 sm:py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-4xl sm:text-6xl mb-4">🍕</div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground mb-2">
                Nenhuma pizza encontrada
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base px-4">
                Tente selecionar outra categoria ou visualizar todas as pizzas.
              </p>
            </motion.div>
          )}
        </motion.section>

        {/* Call to Action */}
        <motion.section 
          className="text-center py-12 sm:py-16 bg-secondary/20 rounded-lg mt-12 sm:mt-16 mx-2 sm:mx-0"
          variants={itemVariants}
        >
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-4">
            🇮🇹 Sabor Autêntico Italiano
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-xl sm:max-w-2xl mx-auto px-4">
            Todas as nossas pizzas são preparadas com ingredientes importados da Itália 
            e massa fermentada naturalmente por 48 horas. Uma experiência gastronômica única!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm">
            <div className="text-center">
              <div className="text-xl sm:text-2xl mb-2">🕐</div>
              <p className="font-medium">15-25 min</p>
              <p className="text-muted-foreground">Tempo de preparo</p>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl mb-2">🍃</div>
              <p className="font-medium">Ingredientes frescos</p>
              <p className="text-muted-foreground">Diariamente</p>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl mb-2">🎯</div>
              <p className="font-medium">Qualidade premium</p>
              <p className="text-muted-foreground">Desde 1947</p>
            </div>
          </div>
        </motion.section>
      </motion.div>

      {/* Modal de Detalhes da Pizza */}
      <PizzaDetailModal
        pizza={selectedPizza}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}