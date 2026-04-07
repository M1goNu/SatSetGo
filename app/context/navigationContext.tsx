import React, { createContext, ReactNode, useCallback, useContext, useState } from "react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
export type ScreenName = "home" | "wishlist" | "cart" | "history" | "profile";

export interface NavigationContextType {
  currentScreen: ScreenName;
  navigate: (screen: ScreenName) => void;
  goBack: () => void;
  canGoBack: boolean;
}

// ─── CONTEXT ──────────────────────────────────────────────────────────────────
const NavigationContext = createContext<NavigationContextType | null>(null);

// ─── PROVIDER ─────────────────────────────────────────────────────────────────
export function NavigationProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<ScreenName[]>(["home"]);

  const currentScreen = history[history.length - 1];
  const canGoBack = history.length > 1;

  const navigate = useCallback((screen: ScreenName) => {
    setHistory((prev) => {
      // Avoid duplicate consecutive entries
      if (prev[prev.length - 1] === screen) return prev;
      return [...prev, screen];
    });
  }, []);

  const goBack = useCallback(() => {
    setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  return (
    <NavigationContext.Provider value={{ currentScreen, navigate, goBack, canGoBack }}>
      {children}
    </NavigationContext.Provider>
  );
}

// ─── HOOK ─────────────────────────────────────────────────────────────────────
export function useNavigation(): NavigationContextType {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error("useNavigation must be used within NavigationProvider");
  return ctx;
}