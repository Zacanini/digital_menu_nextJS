/**
 * PizzaCard Component - Sapore
 * 
 * Card elegante para exibição de pizzas no menu digital.
 * Design premium seguindo a identidade visual italiana.
 */

'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Pizza } from '../../domain/entities';
import { INGREDIENTS_DISPLAY_COUNT } from '@/config/ui';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { useCartStore } from '@/store/cart-store';

interface PizzaCardProps {
  pizza: Pizza;
  onPizzaClick?: (pizza: Pizza) => void;
}

export function PizzaCard({ pizza, onPizzaClick }: PizzaCardProps) {
  const { addItem, openCart } = useCartStore();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleCardClick = () => {
    if (onPizzaClick) {
      onPizzaClick(pizza);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Adiciona a pizza ao carrinho (tamanho médio, massa tradicional por padrão)
    addItem(pizza);
    // Abre o carrinho para mostrar que foi adicionado
    openCart();
  };

  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card 
        className="group cursor-pointer transition-all duration-300 hover:shadow-lg sm:hover:shadow-xl bg-card border-secondary/50 h-full flex flex-col overflow-hidden"
        onClick={handleCardClick}
        style={{ minHeight: '280px' }}
      >
      {/* Imagem Quadrada no Topo - Mobile First */}
      <div className="relative aspect-square overflow-hidden bg-secondary/20">
        <Image
          src={pizza.imageUrl}
          alt={pizza.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
        />
        
        {/* Badges Compactos - Mobile */}
        <div className="absolute top-1 left-1 sm:top-3 sm:left-3 flex flex-wrap gap-1">
          {pizza.isFeatured && (
            <Badge variant="default" className="bg-accent text-accent-foreground text-xs px-1 py-0.5 sm:px-2 sm:py-1">
              <span className="hidden sm:inline">🌟 Destaque</span>
              <span className="sm:hidden">⭐</span>
            </Badge>
          )}
          {pizza.tags.includes('vegetariana') && (
            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs px-1 py-0.5 sm:px-2 sm:py-1 hidden sm:inline-flex">
              🌱 Vegetariana
            </Badge>
          )}
          {pizza.tags.includes('vegana') && (
            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs px-1 py-0.5 sm:px-2 sm:py-1 hidden sm:inline-flex">
              🌿 Vegana
            </Badge>
          )}
          {pizza.tags.includes('picante') && (
            <Badge variant="secondary" className="bg-red-100 text-red-800 text-xs px-1 py-0.5 sm:px-2 sm:py-1 hidden sm:inline-flex">
              🌶️ Picante
            </Badge>
          )}
        </div>

        {/* Preço Sobre a Imagem */}
        <div className="absolute bottom-1 right-1 sm:bottom-3 sm:right-3">
          <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-2 py-1 rounded-full font-bold text-xs sm:text-base shadow-lg">
            {formatPrice(pizza.price)}
          </div>
        </div>

        {/* Tempo de preparo - Só no desktop */}
        <div className="absolute bottom-1 left-1 sm:bottom-3 sm:left-3 hidden sm:block">
          <div className="bg-black/70 text-white px-2 py-1 rounded text-xs">
            ⏱️ {pizza.preparationTime}min
          </div>
        </div>
      </div>

        {/* Conteúdo Compacto com altura fixa */}
        <div className="p-2 sm:p-4 flex-1 flex flex-col" style={{ minHeight: '120px' }}>
          {/* Área de Conteúdo que expande */}
          <div className="flex-1">
            {/* Nome da Pizza */}
            <h3 className="font-heading text-sm sm:text-xl font-bold text-foreground mb-1 sm:mb-2 truncate sm:line-clamp-2 leading-tight">
              {pizza.name}
            </h3>

            {/* Descrição Resumida */}
            <p className="text-muted-foreground text-xs sm:text-sm mb-2 sm:mb-3 leading-tight line-clamp-2">
              {pizza.description}
            </p>

            {/* Ingredientes - Escondidos no Mobile */}
            <div className="mb-2 sm:mb-4 hidden sm:block">
              <p className="text-xs font-medium text-muted-foreground mb-2">
                INGREDIENTES PRINCIPAIS:
              </p>
              <div className="flex flex-wrap gap-1">
                {pizza.ingredients.slice(0, INGREDIENTS_DISPLAY_COUNT).map((ingredient, index) => (
                  <span
                    key={index}
                    className="text-xs bg-secondary/50 text-foreground px-2 py-1 rounded-full"
                  >
                    {ingredient}
                  </span>
                ))}
                {pizza.ingredients.length > INGREDIENTS_DISPLAY_COUNT && (
                  <span className="text-xs bg-secondary/50 text-muted-foreground px-2 py-1 rounded-full">
                    +{pizza.ingredients.length - INGREDIENTS_DISPLAY_COUNT} mais
                  </span>
                )}
              </div>
            </div>

            {/* Informações Nutricionais - Escondidas no Mobile */}
            {pizza.nutritionalInfo && (
              <div className="text-xs text-muted-foreground mb-3 bg-secondary/20 p-2 rounded hidden sm:block">
                <span className="font-medium">
                  {pizza.nutritionalInfo.caloriesPerSlice} cal/fatia
                </span>
                <span className="ml-3">
                  {pizza.nutritionalInfo.protein}g proteína
                </span>
              </div>
            )}
          </div>

          {/* Botão de Ação - SEMPRE na base */}
          <div className="mt-auto pt-2">
            <Button
              onClick={handleAddToCart}
              disabled={!pizza.isAvailable}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-colors text-xs sm:text-base py-2 sm:py-3 h-8 sm:h-10"
              size="sm"
            >
              {pizza.isAvailable ? (
                <>
                  <span className="sm:hidden">🛒 Adicionar</span>
                  <span className="hidden sm:inline">🛒 Adicionar ao Carrinho</span>
                </>
              ) : (
                <>
                  <span className="sm:hidden">😔 Indisponível</span>
                  <span className="hidden sm:inline">😔 Indisponível</span>
                </>
              )}
            </Button>
          </div>
        </div>
    </Card>
    </motion.div>
  );
}