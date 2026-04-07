import React from "react";
import { StatusBar, View } from "react-native";
import { Provider } from "react-redux";
import { shell } from "./appStyle";
import { store } from "./store";

// ── Context Providers ──────────────────────────────────────────────────────
import { NavigationProvider } from "./context/navigationContext";
import { ProductProvider } from "./context/productContext";
import { ThemeProvider, useTheme } from "./context/themeContext";
import { WishlistProvider } from "./context/wishlistContext";

// ── Navigation ─────────────────────────────────────────────────────────────
import { AppNavigator } from "./components/appNavigator";
import { BottomTabBar } from "./components/Bottomtabbar";

function AppShell() {
  const { theme } = useTheme();

  return (
    <View style={[shell, { backgroundColor: theme.bg }]}>
      <StatusBar
        barStyle={theme.isDark ? "light-content" : "dark-content"}
        backgroundColor={theme.navbar}
        translucent={false}
      />
      <AppNavigator />
      <BottomTabBar />
    </View>
  );
}

// ─── ROOT LAYOUT ──────────────────────────────────────────────────────────────
export default function RootLayout() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ProductProvider>
          <WishlistProvider>
              <NavigationProvider>
                <AppShell />
              </NavigationProvider>
          </WishlistProvider>
        </ProductProvider>
      </ThemeProvider>
    </Provider>
  );
}