import { create } from 'zustand';
import { Pizza } from '@/domain/entities/Pizza';

export interface CartItem {
  pizza: Pizza;
  quantity: number;
  size: 'pequena' | 'media' | 'grande';
  dough: 'tradicional' | 'integral' | 'sem-gluten';
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

interface CartActions {
  addItem: (pizza: Pizza, size?: CartItem['size'], dough?: CartItem['dough']) => void;
  removeItem: (pizzaId: string, size: CartItem['size'], dough: CartItem['dough']) => void;
  increaseQuantity: (pizzaId: string, size: CartItem['size'], dough: CartItem['dough']) => void;
  decreaseQuantity: (pizzaId: string, size: CartItem['size'], dough: CartItem['dough']) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

type CartStore = CartState & CartActions;

export const useCartStore = create<CartStore>((set, get) => ({
  // Estado inicial
  items: [],
  isOpen: false,

  // Ações
  addItem: (pizza, size = 'media', dough = 'tradicional') => {
    set((state) => {
      const existingItemIndex = state.items.findIndex(
        (item) => 
          item.pizza.id === pizza.id && 
          item.size === size && 
          item.dough === dough
      );

      if (existingItemIndex >= 0) {
        // Item já existe, aumenta a quantidade
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += 1;
        return { items: updatedItems };
      } else {
        // Novo item, adiciona ao carrinho
        const newItem: CartItem = {
          pizza,
          quantity: 1,
          size,
          dough,
        };
        return { items: [...state.items, newItem] };
      }
    });
  },

  removeItem: (pizzaId, size, dough) => {
    set((state) => ({
      items: state.items.filter(
        (item) => 
          !(item.pizza.id === pizzaId && item.size === size && item.dough === dough)
      ),
    }));
  },

  increaseQuantity: (pizzaId, size, dough) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.pizza.id === pizzaId && item.size === size && item.dough === dough
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    }));
  },

  decreaseQuantity: (pizzaId, size, dough) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.pizza.id === pizzaId && item.size === size && item.dough === dough
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      ),
    }));
  },

  clearCart: () => {
    set({ items: [] });
  },

  toggleCart: () => {
    set((state) => ({ isOpen: !state.isOpen }));
  },

  openCart: () => {
    set({ isOpen: true });
  },

  closeCart: () => {
    set({ isOpen: false });
  },

  getTotalItems: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((total, item) => {
      // Calcula o preço baseado no tamanho
      let price = item.pizza.price;
      
      switch (item.size) {
        case 'pequena':
          price *= 0.8; // 20% menos que o preço base
          break;
        case 'media':
          price *= 1; // Preço base
          break;
        case 'grande':
          price *= 1.3; // 30% mais que o preço base
          break;
      }

      // Adiciona custo extra para massa integral ou sem glúten
      if (item.dough === 'integral') {
        price += 3; // R$ 3 extra
      } else if (item.dough === 'sem-gluten') {
        price += 5; // R$ 5 extra
      }

      return total + (price * item.quantity);
    }, 0);
  },
}));