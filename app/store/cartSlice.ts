// app/store/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../context/productContext";

export interface CartItem extends Product {
  qty: number;
}

interface CartState {
  items: CartItem[];
  error: string | null;
}

const initialState: CartState = { items: [], error: null };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      try {
        const product = action.payload;
        if (!product || product.id == null) throw new Error("Produk tidak valid.");
        const existing = state.items.find((x) => x.id === product.id);
        if (existing) {
          existing.qty += 1;
        } else {
          state.items.push({ ...product, qty: 1 });
        }
        state.error = null;
      } catch (e) {
        state.error = e instanceof Error ? e.message : "Gagal menambahkan produk.";
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      try {
        if (action.payload == null) throw new Error("ID tidak valid.");
        state.items = state.items.filter((x) => x.id !== action.payload);
        state.error = null;
      } catch (e) {
        state.error = e instanceof Error ? e.message : "Gagal menghapus produk.";
      }
    },
    increaseQty(state, action: PayloadAction<number>) {
      try {
        const item = state.items.find((x) => x.id === action.payload);
        if (!item) throw new Error("Produk tidak ada di keranjang.");
        item.qty += 1;
        state.error = null;
      } catch (e) {
        state.error = e instanceof Error ? e.message : "Gagal menambah jumlah.";
      }
    },
    decreaseQty(state, action: PayloadAction<number>) {
      try {
        const idx = state.items.findIndex((x) => x.id === action.payload);
        if (idx === -1) throw new Error("Produk tidak ada di keranjang.");
        if (state.items[idx].qty <= 1) {
          state.items.splice(idx, 1);
        } else {
          state.items[idx].qty -= 1;
        }
        state.error = null;
      } catch (e) {
        state.error = e instanceof Error ? e.message : "Gagal mengurangi jumlah.";
      }
    },
    clearCart(state) {
      state.items = [];
      state.error = null;
    },
    clearCartError(state) {
      state.error = null;
    },
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart, clearCartError } =
  cartSlice.actions;

// Selectors
export const selectCart = (state: { cart: CartState }) => state.cart.items;
export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, x) => sum + x.qty, 0);
export const selectTotalPrice = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, x) => sum + x.price * x.qty, 0);
export const selectCartError = (state: { cart: CartState }) => state.cart.error;

export default cartSlice.reducer;