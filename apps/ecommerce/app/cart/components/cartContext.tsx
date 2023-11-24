'use client';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type Product = {
  id: number;
  item: number;
  title: string;
  images: string[];
  color: string;
  size: string;
  price: number;
  inStock: any;
  leadTime: any;
  quantity: any;
};

type CartProductType = Partial<Product & { quantity: number }>;

type CartState = {
  items: CartProductType[];
};

type CartContextType = {
  state: CartState;
  addToCart: (product: CartProductType) => void;
  removeFromCart: (id: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartContextProviderProps {
  children: React.ReactNode;
}

const CartContextProvider: React.FC<CartContextProviderProps> = ({
  children,
}) => {
  const isLocalStorageAvailable =
    typeof window !== 'undefined' && window.localStorage;

  const initialCartItems: CartProductType[] = isLocalStorageAvailable
    ? JSON.parse(localStorage.getItem('cartItems') || '[]')
    : [];

  const [state, setState] = useState<CartState>({ items: initialCartItems });

  const addToCart = useCallback((product: CartProductType) => {
    setState((prev) => {
      const existingItem = prev.items.find((item) => item.id === product.id);

      if (existingItem) {
        const updatedItems = prev.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        return { ...prev, items: updatedItems };
      } else {
        return { ...prev, items: [...prev.items, { ...product, quantity: 1 }] };
      }
    });
  }, []);

  const removeFromCart = (id: number) => {
    setState((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  useEffect(() => {
    if (isLocalStorageAvailable) {
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    }
  }, [state.items, isLocalStorageAvailable]);

  return (
    <CartContext.Provider value={{ state, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartContextProvider');
  }

  return context;
};

export { CartContext, CartContextProvider, useCart };
