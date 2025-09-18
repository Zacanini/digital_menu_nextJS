/**
 * PizzaDetailModal Component - Sapore Digitale
 * 
 * Modal elegante que exibe detalhes completos de uma pizza com opções
 * de customização (tamanho, massa) e funcionalidade de adicionar ao carrinho.
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Pizza } from '@/domain/entities/Pizza';
import { useCartStore, CartItem } from '@/store/cart-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Clock, Users, Flame, Star, ShoppingCart } from 'lucide-react';

interface PizzaDetailModalProps {
  pizza: Pizza | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PizzaDetailModal({ pizza, isOpen, onClose }: PizzaDetailModalProps) {
  const { addItem, openCart } = useCartStore();
  const [selectedSize, setSelectedSize] = useState<CartItem['size']>('media');
  const [selectedDough, setSelectedDough] = useState<CartItem['dough']>('tradicional');

  if (!pizza) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const calculatePrice = () => {
    let price = pizza.price;
    
    // Ajusta preço baseado no tamanho
    switch (selectedSize) {
      case 'pequena':
        price *= 0.8;
        break;
      case 'media':
        price *= 1;
        break;
      case 'grande':
        price *= 1.3;
        break;
    }

    // Adiciona custo extra para massa especial
    if (selectedDough === 'integral') {
      price += 3;
    } else if (selectedDough === 'sem-gluten') {
      price += 5;
    }

    return price;
  };

  const getSizeInfo = (size: CartItem['size']) => {
    const sizeInfo = {
      pequena: { label: 'Pequena (25cm)', description: '4-6 fatias' },
      media: { label: 'Média (30cm)', description: '6-8 fatias' },
      grande: { label: 'Grande (35cm)', description: '8-10 fatias' }
    };
    return sizeInfo[size];
  };

  const getDoughInfo = (dough: CartItem['dough']) => {
    const doughInfo = {
      tradicional: { label: 'Tradicional', description: 'Massa clássica italiana', extra: 0 },
      integral: { label: 'Integral', description: 'Mais fibras e nutrientes', extra: 3 },
      'sem-gluten': { label: 'Sem Glúten', description: 'Para celíacos', extra: 5 }
    };
    return doughInfo[dough];
  };

  const handleAddToCart = () => {
    addItem(pizza, selectedSize, selectedDough);
    openCart();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="font-heading text-2xl text-center">
            {pizza.name}
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Personalize sua pizza e adicione ao carrinho
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Lado Esquerdo - Imagem e Informações Básicas */}
          <div className="space-y-4">
            {/* Imagem Principal */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary/20">
              <Image
                src={pizza.imageUrl}
                alt={pizza.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              
              {/* Badges Sobrepostos */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {pizza.isFeatured && (
                  <Badge className="bg-accent text-accent-foreground">
                    <Star className="w-3 h-3 mr-1" />
                    Destaque
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
            </div>

            {/* Informações Rápidas */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-secondary/30 rounded-lg p-3">
                <Clock className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-sm font-semibold">{pizza.preparationTime} min</p>
                <p className="text-xs text-muted-foreground">Preparo</p>
              </div>
              <div className="bg-secondary/30 rounded-lg p-3">
                <Users className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-sm font-semibold">2-3 pessoas</p>
                <p className="text-xs text-muted-foreground">Serve</p>
              </div>
              <div className="bg-secondary/30 rounded-lg p-3">
                <Flame className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-sm font-semibold">
                  {pizza.nutritionalInfo?.caloriesPerSlice || 350} cal
                </p>
                <p className="text-xs text-muted-foreground">Por fatia</p>
              </div>
            </div>

            {/* Descrição */}
            <div>
              <h4 className="font-semibold mb-2">Descrição</h4>
              <p className="text-muted-foreground leading-relaxed">
                {pizza.description}
              </p>
            </div>

            {/* Ingredientes */}
            <div>
              <h4 className="font-semibold mb-3">Ingredientes</h4>
              <div className="flex flex-wrap gap-2">
                {pizza.ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="text-sm bg-secondary/50 text-foreground px-3 py-1 rounded-full"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Lado Direito - Customização e Compra */}
          <div className="space-y-6">
            {/* Seleção de Tamanho */}
            <div>
              <h4 className="font-semibold mb-3">Escolha o Tamanho</h4>
              <div className="space-y-2">
                {(['pequena', 'media', 'grande'] as const).map((size) => {
                  const sizeInfo = getSizeInfo(size);
                  const isSelected = selectedSize === size;
                  
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                        isSelected
                          ? 'border-primary bg-primary/5'
                          : 'border-secondary hover:border-primary/50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{sizeInfo.label}</p>
                          <p className="text-sm text-muted-foreground">{sizeInfo.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary">
                            {size === 'pequena' && '- 20%'}
                            {size === 'media' && 'Padrão'}
                            {size === 'grande' && '+ 30%'}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Seleção de Massa */}
            <div>
              <h4 className="font-semibold mb-3">Tipo de Massa</h4>
              <div className="space-y-2">
                {(['tradicional', 'integral', 'sem-gluten'] as const).map((dough) => {
                  const doughInfo = getDoughInfo(dough);
                  const isSelected = selectedDough === dough;
                  
                  return (
                    <button
                      key={dough}
                      onClick={() => setSelectedDough(dough)}
                      className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                        isSelected
                          ? 'border-primary bg-primary/5'
                          : 'border-secondary hover:border-primary/50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{doughInfo.label}</p>
                          <p className="text-sm text-muted-foreground">{doughInfo.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary">
                            {doughInfo.extra > 0 ? `+${formatPrice(doughInfo.extra)}` : 'Incluído'}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Informações Nutricionais (se disponível) */}
            {pizza.nutritionalInfo && (
              <div className="bg-secondary/20 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Informações Nutricionais (por fatia)</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Calorias</p>
                    <p className="font-semibold">{pizza.nutritionalInfo.caloriesPerSlice}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Proteínas</p>
                    <p className="font-semibold">{pizza.nutritionalInfo.protein}g</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Carboidratos</p>
                    <p className="font-semibold">{pizza.nutritionalInfo.carbohydrates}g</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Gorduras</p>
                    <p className="font-semibold">{pizza.nutritionalInfo.fat}g</p>
                  </div>
                </div>
              </div>
            )}

            {/* Preço Final e Botão de Compra */}
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground mb-1">Preço Total</p>
                <p className="text-3xl font-bold text-primary font-heading">
                  {formatPrice(calculatePrice())}
                </p>
              </div>
              
              <Button
                onClick={handleAddToCart}
                disabled={!pizza.isAvailable}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg py-3"
                size="lg"
              >
                {pizza.isAvailable ? (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Adicionar ao Carrinho
                  </>
                ) : (
                  <>
                    😔 Pizza Indisponível
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}