import React, { createContext, ReactNode, useContext, useState } from "react";
import { Product } from "./productContext";

export interface CartItem extends Product {
  qty: number;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  totalPrice: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQty: (productId: number) => void;
  decreaseQty: (productId: number) => void;
  clearCart: () => void;
  isInCart: (productId: number) => boolean;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((x) => x.id === product.id);
      if (existing) {
        return prev.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + 1 } : x
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((x) => x.id !== productId));
  };

  const increaseQty = (productId: number) => {
    setCart((prev) =>
      prev.map((x) => (x.id === productId ? { ...x, qty: x.qty + 1 } : x))
    );
  };

  const decreaseQty = (productId: number) => {
    setCart((prev) => {
      const item = prev.find((x) => x.id === productId);
      if (!item) return prev;
      if (item.qty <= 1) return prev.filter((x) => x.id !== productId);
      return prev.map((x) =>
        x.id === productId ? { ...x, qty: x.qty - 1 } : x
      );
    });
  };

  const clearCart = () => setCart([]);

  const isInCart = (productId: number) => cart.some((x) => x.id === productId);

  const cartCount = cart.reduce((sum, x) => sum + x.qty, 0);
  const totalPrice = cart.reduce((sum, x) => sum + x.price * x.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        totalPrice,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}