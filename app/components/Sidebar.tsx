import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { ScreenName, useNavigation } from "../context/navigationContext";
import { useTheme } from "../context/themeContext";
import { sidebarStyles as styles } from "../styleSheets/componentsStyle";

const { width: SCREEN_W } = Dimensions.get("window");
const SIDEBAR_W = Math.min(260, SCREEN_W * 0.75);


interface SidebarProps {
  visible: boolean;
  onClose: () => void;
}

const NAV_ITEMS: { label: string; emoji: string; screen: ScreenName }[] = [
  { label: "Home",     emoji: "🏠", screen: "home"     },
  { label: "Wishlist", emoji: "⭐", screen: "wishlist" },
  { label: "History",  emoji: "🕐", screen: "history"  },
  { label: "Profile",  emoji: "👤", screen: "profile"  },
];

export function Sidebar({ visible, onClose }: SidebarProps) {
  const { theme, isDark, toggleTheme } = useTheme();
  const { navigate, currentScreen } = useNavigation();
  const slideAnim = useRef(new Animated.Value(-SIDEBAR_W)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;
  // Track whether sidebar has ever been opened — avoids rendering before first open
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 65,
          friction: 11,
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -SIDEBAR_W,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnim, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleNav = (screen: ScreenName) => {
    onClose();
    setTimeout(() => navigate(screen), 150);
  };

  // Don't render at all until first open
  if (!mounted) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents={visible ? "auto" : "none"}>
      {/* Overlay */}
      <Animated.View
        style={[styles.overlay, { opacity: overlayAnim }]}
        pointerEvents={visible ? "auto" : "none"}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      {/* Drawer */}
      <Animated.View
        style={[
          styles.drawer,
          {
            width: SIDEBAR_W,
            backgroundColor: theme.sidebar,
            borderRightColor: theme.border,
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        {/* Header */}
        <View style={[styles.drawerHeader, { borderBottomColor: theme.border }]}>
          <Text style={[styles.drawerLogo, { color: theme.primary }]}>SatSetGo</Text>
          <Text style={[styles.drawerSub, { color: theme.subtext }]}>SatSet Lapar Hilang</Text>
        </View>

        {/* Nav Links */}
        <View style={styles.navList}>
          {NAV_ITEMS
          .filter((item) => item.screen !== currentScreen)
          .map((item) => (
            <TouchableOpacity
              key={item.screen}
              onPress={() => handleNav(item.screen)}
              style={[styles.navItem, { borderBottomColor: theme.border }]}
              activeOpacity={0.65}
            >
              <Text style={styles.navEmoji}>{item.emoji}</Text>
              <Text style={[styles.navLabel, { color: theme.text }]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Dark Theme Toggle */}
        <View style={[styles.toggleRow, { borderTopColor: theme.border }]}>
          <View style={styles.toggleLeft}>
            <Text style={styles.navEmoji}>{isDark ? "🌙" : "🌞"}</Text>
            <Text style={[styles.navLabel, { color: theme.text }]}>Dark Theme</Text>
          </View>
          <TouchableOpacity
            onPress={toggleTheme}
            activeOpacity={0.8}
            style={[
              styles.toggle,
              {
                backgroundColor: isDark ? theme.primary : theme.accent,
                borderColor: isDark ? theme.primary : theme.border,
              },
            ]}
          >
            <View
              style={[
                styles.toggleKnob,
                {
                  backgroundColor: isDark ? "#fff" : theme.subtext,
                  transform: [{ translateX: isDark ? 18 : 0 }],
                },
              ]}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}