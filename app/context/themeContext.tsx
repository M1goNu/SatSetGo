import React, { createContext, ReactNode, useContext, useState } from "react";

export const LIGHT_THEME = {
  bg: "#FFFFFF",
  card: "#F5F5F5",
  navbar: "#FFFFFF",
  sidebar: "#FAFAFA",
  text: "#1A1A1A",
  subtext: "#666666",
  primary: "#FF6B00",
  primaryLight: "rgba(255,107,0,0.08)",
  accent: "#E8E8E8",
  border: "#EBEBEB",
  shadow: "rgba(0,0,0,0.08)",
  isDark: false,
};

export const DARK_THEME = {
  bg: "#121212",
  card: "#1E1E1E",
  navbar: "#1A1A1A",
  sidebar: "#161616",
  text: "#F0F0F0",
  subtext: "#888888",
  primary: "#FF8C42",
  primaryLight: "rgba(255,140,66,0.12)",
  accent: "#2A2A2A",
  border: "#2C2C2C",
  shadow: "rgba(0,0,0,0.4)",
  isDark: true,
};

export type Theme = typeof LIGHT_THEME;

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? DARK_THEME : LIGHT_THEME;

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}