import React from "react";
import {
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useCart } from "../context/cartContext";
import { ScreenName, useNavigation } from "../context/navigationContext";
import { useTheme } from "../context/themeContext";
import { bottomTabStyles as styles } from "../styleSheets/componentsStyle";

// ─── TAB CONFIG ───────────────────────────────────────────────────────────────
const TABS: { screen: ScreenName; label: string; emoji: string }[] = [
  { screen: "home",     label: "Home",    emoji: "🏠" },
  { screen: "wishlist", label: "Wishlist", emoji: "⭐" },
  { screen: "cart",     label: "Cart",    emoji: "🛍" },
  { screen: "history",  label: "History", emoji: "🕐" },
  { screen: "profile",  label: "Profile", emoji: "👤" },
];

// ─── SINGLE TAB BUTTON ────────────────────────────────────────────────────────
interface TabButtonProps {
  tab: typeof TABS[number];
  isActive: boolean;
  onPress: () => void;
}

function TabButton({ tab, isActive, onPress }: TabButtonProps) {
  const { theme } = useTheme();
  const { cartCount } = useCart();

  const showBadge = tab.screen === "cart" && cartCount > 0;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.tab,
        isActive && {
          borderTopColor: theme.primary,
          borderTopWidth: 2,
        },
      ]}
    >
      {/* Icon container */}
      <View
        style={[
          styles.iconWrap,
          isActive && { backgroundColor: theme.primaryLight },
        ]}
      >
        <Text style={styles.emoji}>{tab.emoji}</Text>

        {/* Cart badge on tab */}
        {showBadge && (
          <View style={[styles.badge, { backgroundColor: theme.primary }]}>
            <Text style={styles.badgeText}>
              {cartCount > 99 ? "99+" : cartCount}
            </Text>
          </View>
        )}
      </View>

      {/* Label */}
      <Text
        style={[
          styles.label,
          { color: isActive ? theme.primary : theme.subtext },
        ]}
      >
        {tab.label}
      </Text>
    </TouchableOpacity>
  );
}

// ─── BOTTOM TAB BAR ───────────────────────────────────────────────────────────
export function BottomTabBar() {
  const { theme } = useTheme();
  const { currentScreen, navigate } = useNavigation();

  return (
    <View
      style={[
        styles.tabBar,
        {
          backgroundColor: theme.navbar,
          borderTopColor: theme.border,
        },
      ]}
    >
      {TABS.map((tab) => (
        <TabButton
          key={tab.screen}
          tab={tab}
          isActive={currentScreen === tab.screen}
          onPress={() => navigate(tab.screen)}
        />
      ))}
    </View>
  );
}
