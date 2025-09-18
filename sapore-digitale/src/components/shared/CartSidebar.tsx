/**
 * CartSidebar Component - Sapore Digitale
 * 
 * Sidebar elegante que exibe os itens do carrinho usando Sheet do Shadcn.
 * Inclui funcionalidades de adicionar/remover itens e exibir total.
 */

'use client';

import { useCartStore, CartItem } from '@/store/cart-store';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle 
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

export function CartSidebar() {
  const {
    items,
    isOpen,
    closeCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    getTotalPrice,
    getTotalItems,
    clearCart,
  } = useCartStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const getItemPrice = (item: CartItem) => {
    let price = item.pizza.price;
    
    // Ajusta preço baseado no tamanho
    switch (item.size) {
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
    if (item.dough === 'integral') {
      price += 3;
    } else if (item.dough === 'sem-gluten') {
      price += 5;
    }

    return price;
  };

  const getSizeLabel = (size: CartItem['size']) => {
    const labels = {
      pequena: 'P',
      media: 'M', 
      grande: 'G'
    };
    return labels[size];
  };

  const getDoughLabel = (dough: CartItem['dough']) => {
    const labels = {
      tradicional: 'Tradicional',
      integral: 'Integral (+R$ 3)',
      'sem-gluten': 'Sem Glúten (+R$ 5)'
    };
    return labels[dough];
  };

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-xl font-heading">
            <ShoppingBag className="w-5 h-5" />
            Carrinho ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'})
          </SheetTitle>
          <SheetDescription>
            Revise seus itens antes de finalizar o pedido
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-full pt-6">
          {/* Lista de Itens */}
          <div className="flex-1 overflow-auto space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg text-muted-foreground mb-2">
                  Carrinho vazio
                </h3>
                <p className="text-muted-foreground text-sm">
                  Adicione algumas pizzas deliciosas ao seu carrinho!
                </p>
              </div>
            ) : (
              items.map((item, index) => (
                <div
                  key={`${item.pizza.id}-${item.size}-${item.dough}-${index}`}
                  className="border rounded-lg p-4 bg-card"
                >
                  <div className="flex gap-3">
                    {/* Imagem */}
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-secondary/20 flex-shrink-0">
                      <Image
                        src={item.pizza.imageUrl}
                        alt={item.pizza.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>

                    {/* Informações */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm line-clamp-1 mb-1">
                        {item.pizza.name}
                      </h4>
                      
                      {/* Tamanho e Massa */}
                      <div className="flex gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          Tamanho {getSizeLabel(item.size)}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {getDoughLabel(item.dough)}
                        </Badge>
                      </div>

                      {/* Preço e Controles */}
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-primary">
                          {formatPrice(getItemPrice(item))}
                        </span>
                        
                        <div className="flex items-center gap-2">
                          {/* Controles de Quantidade */}
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-8 h-8 p-0"
                              onClick={() => decreaseQuantity(item.pizza.id, item.size, item.dough)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            
                            <span className="mx-2 font-semibold min-w-[2ch] text-center">
                              {item.quantity}
                            </span>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-8 h-8 p-0"
                              onClick={() => increaseQuantity(item.pizza.id, item.size, item.dough)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>

                          {/* Botão Remover */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-8 h-8 p-0 text-destructive hover:text-destructive"
                            onClick={() => removeItem(item.pizza.id, item.size, item.dough)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Subtotal do Item */}
                      <div className="text-right mt-1">
                        <span className="text-sm text-muted-foreground">
                          Subtotal: {formatPrice(getItemPrice(item) * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer com Total e Ações */}
          {items.length > 0 && (
            <div className="border-t pt-4 space-y-4">
              {/* Total */}
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span className="text-primary text-xl">
                  {formatPrice(getTotalPrice())}
                </span>
              </div>

              {/* Botões de Ação */}
              <div className="space-y-2">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  size="lg"
                >
                  🚀 Finalizar Pedido
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={clearCart}
                >
                  🗑️ Limpar Carrinho
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}