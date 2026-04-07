import React, { createContext, ReactNode, useCallback, useContext, useState } from "react";
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
  cartError: string | null;
  clearCartError: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartError, setCartError] = useState<string | null>(null);

  const clearCartError = useCallback(() => setCartError(null), []);

  const addToCart = useCallback((product: Product) => {
    try {
      if (!product || product.id == null) {
        throw new Error("Produk tidak valid.");
      }
      setCart((prev) => {
        const existing = prev.find((x) => x.id === product.id);
        if (existing) {
          return prev.map((x) =>
            x.id === product.id ? { ...x, qty: x.qty + 1 } : x
          );
        }
        return [...prev, { ...product, qty: 1 }];
      });
    } catch (e) {
      setCartError(e instanceof Error ? e.message : "Gagal menambahkan produk.");
    }
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    try {
      if (productId == null) throw new Error("ID produk tidak valid.");
      setCart((prev) => prev.filter((x) => x.id !== productId));
    } catch (e) {
      setCartError(e instanceof Error ? e.message : "Gagal menghapus produk.");
    }
  }, []);

  const increaseQty = useCallback((productId: number) => {
    try {
      if (productId == null) throw new Error("ID produk tidak valid.");
      setCart((prev) =>
        prev.map((x) => (x.id === productId ? { ...x, qty: x.qty + 1 } : x))
      );
    } catch (e) {
      setCartError(e instanceof Error ? e.message : "Gagal menambah jumlah.");
    }
  }, []);

  const decreaseQty = useCallback((productId: number) => {
    try {
      if (productId == null) throw new Error("ID produk tidak valid.");
      setCart((prev) => {
        const item = prev.find((x) => x.id === productId);
        if (!item) return prev;
        if (item.qty <= 1) return prev.filter((x) => x.id !== productId);
        return prev.map((x) =>
          x.id === productId ? { ...x, qty: x.qty - 1 } : x
        );
      });
    } catch (e) {
      setCartError(e instanceof Error ? e.message : "Gagal mengurangi jumlah.");
    }
  }, []);

  const clearCart = useCallback(() => {
    try {
      setCart([]);
    } catch (e) {
      setCartError(e instanceof Error ? e.message : "Gagal mengosongkan keranjang.");
    }
  }, []);

  const isInCart = useCallback(
    (productId: number) => cart.some((x) => x.id === productId),
    [cart]
  );

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
        cartError,
        clearCartError,
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