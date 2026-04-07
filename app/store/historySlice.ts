import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "./cartSlice";

export interface Transaction {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
}

interface HistoryState {
  transactions: Transaction[];
  error: string | null;
}

const initialState: HistoryState = { transactions: [], error: null };

function generateId(): string {
  const L = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const D = "0123456789";
  return (
    Array.from({ length: 3 }, () => L[Math.floor(Math.random() * L.length)]).join("") +
    Array.from({ length: 3 }, () => D[Math.floor(Math.random() * D.length)]).join("")
  );
}

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addTransaction: {
      // Kita pakai prepare callback agar bisa return txId via action.payload
      prepare(payload: { items: CartItem[]; total: number }) {
        try {
          if (!payload.items || payload.items.length === 0)
            throw new Error("Tidak ada item untuk di-checkout.");
          if (payload.total < 0) throw new Error("Total harga tidak valid.");
          const id = generateId();
          const date = new Date().toLocaleDateString("id-ID", {
            day: "2-digit", month: "short", year: "numeric",
          });
          return { payload: { id, items: [...payload.items], total: payload.total, date }, error: false };
        } catch (e) {
          return {
            payload: { id: "", items: [], total: 0, date: "" },
            error: true,
            meta: { errorMessage: e instanceof Error ? e.message : "Gagal menyimpan transaksi." },
          };
        }
      },
      reducer(state, action: PayloadAction<Transaction>) {
        if (action.payload.id) {
          state.transactions.unshift(action.payload);
          state.error = null;
        } else {
          state.error = (action as any).meta?.errorMessage ?? "Gagal menyimpan transaksi.";
        }
      },
    },
    clearHistoryError(state) { state.error = null; },
  },
});

export const { addTransaction, clearHistoryError } = historySlice.actions;

export const selectHistory = (s: { history: HistoryState }) => s.history.transactions;
export const selectHistoryError = (s: { history: HistoryState }) => s.history.error;

export default historySlice.reducer;