import React from "react";
import { StatusBar, View } from "react-native";
import { shell } from "./appStyle";

// ── Context Providers ──────────────────────────────────────────────────────
import { CartProvider } from "./context/cartContext";
import { HistoryProvider } from "./context/historyContext";
import { NavigationProvider } from "./context/navigationContext";
import { ProductProvider } from "./context/productContext";
import { ThemeProvider, useTheme } from "./context/themeContext";
import { WishlistProvider } from "./context/wishlistContext";

// ── Navigation ─────────────────────────────────────────────────────────────
import { AppNavigator } from "./components/appNavigator";
import { BottomTabBar } from "./components/Bottomtabbar";

// ─── INNER SHELL ──────────────────────────────────────────────────────────────
// Separated so it can consume ThemeContext for StatusBar colors
function AppShell() {
  const { theme } = useTheme();

  return (
    <View style={[shell, { backgroundColor: theme.bg }]}>
      <StatusBar
        barStyle={theme.isDark ? "light-content" : "dark-content"}
        backgroundColor={theme.navbar}
        translucent={false}
      />

      {/* Active screen rendered here */}
      <AppNavigator />

      {/* Persistent bottom tab bar */}
      <BottomTabBar />
    </View>
  );
}

// ─── ROOT LAYOUT ──────────────────────────────────────────────────────────────
export default function RootLayout() {
  return (
    <ThemeProvider>
      <ProductProvider>
        <CartProvider>
          <WishlistProvider>
            <HistoryProvider>
              <NavigationProvider>
                <AppShell />
              </NavigationProvider>
            </HistoryProvider>
          </WishlistProvider>
        </CartProvider>
      </ProductProvider>
    </ThemeProvider>
  );
}