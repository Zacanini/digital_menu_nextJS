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
        y: -8,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card 
        className="group cursor-pointer transition-all duration-300 hover:shadow-xl bg-card border-secondary/50 h-full flex flex-col"
        onClick={handleCardClick}
      >
      {/* Imagem da Pizza */}
      <div className="relative overflow-hidden rounded-t-lg">
        <div className="aspect-square relative bg-secondary/20">
          <Image
            src={pizza.imageUrl}
            alt={pizza.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {pizza.isFeatured && (
              <Badge variant="default" className="bg-accent text-accent-foreground">
                🌟 Destaque
              </Badge>
            )}
            {pizza.tags.includes('vegetariana') && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                🌱 Vegetariana
              </Badge>
            )}
            {pizza.tags.includes('vegana') && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                🌿 Vegana
              </Badge>
            )}
            {pizza.tags.includes('picante') && (
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                🌶️ Picante
              </Badge>
            )}
          </div>

          {/* Preço */}
          <div className="absolute top-3 right-3">
            <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full font-semibold text-lg">
              {formatPrice(pizza.price)}
            </div>
          </div>

          {/* Tempo de preparo */}
          <div className="absolute bottom-3 right-3">
            <div className="bg-black/70 text-white px-2 py-1 rounded text-sm">
              ⏱️ {pizza.preparationTime}min
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Nome da Pizza */}
        <h3 className="font-heading text-xl font-bold text-foreground mb-2 line-clamp-1">
          {pizza.name}
        </h3>

        {/* Descrição */}
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2 leading-relaxed">
          {pizza.description}
        </p>

        {/* Ingredientes */}
        <div className="mb-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            INGREDIENTES PRINCIPAIS:
          </p>
          <div className="flex flex-wrap gap-1">
            {pizza.ingredients.slice(0, 4).map((ingredient, index) => (
              <span
                key={index}
                className="text-xs bg-secondary/50 text-foreground px-2 py-1 rounded-full"
              >
                {ingredient}
              </span>
            ))}
            {pizza.ingredients.length > 4 && (
              <span className="text-xs bg-secondary/50 text-muted-foreground px-2 py-1 rounded-full">
                +{pizza.ingredients.length - 4} mais
              </span>
            )}
          </div>
        </div>

        {/* Informações Nutricionais (se disponível) */}
        {pizza.nutritionalInfo && (
          <div className="text-xs text-muted-foreground mb-3 bg-secondary/20 p-2 rounded">
            <span className="font-medium">
              {pizza.nutritionalInfo.caloriesPerSlice} cal/fatia
            </span>
            <span className="ml-3">
              {pizza.nutritionalInfo.protein}g proteína
            </span>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={!pizza.isAvailable}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-colors"
          size="lg"
        >
          {pizza.isAvailable ? (
            <>
              🛒 Adicionar ao Carrinho
            </>
          ) : (
            <>
              😔 Indisponível
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
    </motion.div>
  );
}