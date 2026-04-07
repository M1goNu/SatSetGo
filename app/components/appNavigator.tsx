import React from "react";
import { View } from "react-native";
import { useNavigation } from "../context/navigationContext";
import { appNavigatorStyles as styles } from "../styleSheets/componentsStyle";
// ─── SCREENS ──────────────────────────────────────────────────────────────────
import CartScreen from "../screens/cartScreen";
import HistoryScreen from "../screens/historyScreen";
import HomeScreen from "../screens/homeScreens";
import ProfileScreen from "../screens/profileScreen";
import WishlistScreen from "../screens/wishlistScreen";

// ─── APP NAVIGATOR ────────────────────────────────────────────────────────────
// Reads currentScreen from NavigationContext and renders the matching screen.
// To switch screens from anywhere in the app: call useNavigation().navigate(screenName)
export function AppNavigator() {
  const { currentScreen } = useNavigation();

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":     return <HomeScreen />;
      case "wishlist": return <WishlistScreen />;
      case "cart":     return <CartScreen />;
      case "history":  return <HistoryScreen />;
      case "profile":  return <ProfileScreen />;
      default:         return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
    </View>
  );
}
