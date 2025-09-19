'use client';

import { Category } from '@/domain/entities';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CategoryTabsProps {
  categories: Category[];
  selectedCategoryId: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

/**
 * Componente de abas para filtrar pizzas por categoria
 * Implementa animações suaves e design responsivo
 */
export function CategoryTabs({ 
  categories, 
  selectedCategoryId, 
  onCategorySelect 
}: CategoryTabsProps) {
  // Botão para mostrar todas as categorias
  const allCategoriesButton = (
    <motion.div
      key="all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        variant={selectedCategoryId === null ? "default" : "outline"}
        size="lg"
        onClick={() => onCategorySelect(null)}
        className={cn(
          "relative px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300",
          "text-xs sm:text-sm md:text-base",
          "hover:scale-105 active:scale-95",
          selectedCategoryId === null
            ? "bg-primary text-primary-foreground shadow-lg"
            : "bg-secondary/50 text-foreground hover:bg-secondary border-secondary"
        )}
      >
        <span className="hidden sm:inline">Todas as Pizzas</span>
        <span className="sm:hidden">Todas</span>
        {selectedCategoryId === null && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-primary rounded-full -z-10"
            initial={false}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </Button>
    </motion.div>
  );

  return (
    <div className="w-full">
      {/* Container das abas */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 bg-background/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-secondary/50 shadow-sm">
        {allCategoriesButton}
        
        {categories
          .sort((a, b) => a.order - b.order)
          .filter(category => category.isActive)
          .map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: (index + 1) * 0.1 }}
            >
              <Button
                variant={selectedCategoryId === category.id ? "default" : "outline"}
                size="lg"
                onClick={() => onCategorySelect(category.id)}
                className={cn(
                  "relative px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300",
                  "text-xs sm:text-sm md:text-base",
                  "hover:scale-105 active:scale-95",
                  selectedCategoryId === category.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-secondary/50 text-foreground hover:bg-secondary border-secondary"
                )}
              >
                <span className="hidden sm:inline">
                  {category.name.replace('Pizzas ', '')}
                </span>
                <span className="sm:hidden">
                  {category.name.replace('Pizzas ', '').split(' ')[0]}
                </span>
                {selectedCategoryId === category.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary rounded-full -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Button>
            </motion.div>
          ))}
      </div>

      {/* Descrição da categoria selecionada */}
      {selectedCategoryId && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-3 sm:mt-4 text-center"
        >
          <p className="text-muted-foreground text-xs sm:text-sm max-w-xl sm:max-w-2xl mx-auto px-4">
            {categories.find(cat => cat.id === selectedCategoryId)?.description}
          </p>
        </motion.div>
      )}
    </div>
  );
}