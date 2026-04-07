// app/context/historyContext.tsx
import React, { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { CartItem } from "./cartContext";

export interface Transaction {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
}

interface HistoryContextType {
  history: Transaction[];
  addTransaction: (items: CartItem[], total: number) => string;
  getTransactionById: (id: string) => Transaction | undefined;
  historyError: string | null;
  clearHistoryError: () => void;
}

const HistoryContext = createContext<HistoryContextType | null>(null);

function generateTransactionId(): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  let result = "";
  for (let i = 0; i < 3; i++) result += letters[Math.floor(Math.random() * letters.length)];
  for (let i = 0; i < 3; i++) result += digits[Math.floor(Math.random() * digits.length)];
  return result;
}

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<Transaction[]>([]);
  const [historyError, setHistoryError] = useState<string | null>(null);

  const clearHistoryError = useCallback(() => setHistoryError(null), []);

  const addTransaction = useCallback((items: CartItem[], total: number): string => {
    try {
      if (!items || items.length === 0) {
        throw new Error("Tidak ada item untuk di-checkout.");
      }
      if (total < 0) {
        throw new Error("Total harga tidak valid.");
      }
      const txId = generateTransactionId();
      const newTx: Transaction = {
        id: txId,
        items: [...items],
        total,
        date: new Date().toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      };
      setHistory((prev) => [newTx, ...prev]);
      return txId;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Gagal menyimpan transaksi.";
      setHistoryError(msg);
      return "";
    }
  }, []);

  const getTransactionById = useCallback(
    (id: string) => history.find((tx) => tx.id === id),
    [history]
  );

  return (
    <HistoryContext.Provider
      value={{ history, addTransaction, getTransactionById, historyError, clearHistoryError }}
    >
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory(): HistoryContextType {
  const ctx = useContext(HistoryContext);
  if (!ctx) throw new Error("useHistory must be used within HistoryProvider");
  return ctx;
}