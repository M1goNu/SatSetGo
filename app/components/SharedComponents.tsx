import React, { useEffect } from "react";
import {
  Animated,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useNavigation } from "../context/navigationContext";
import { useTheme } from "../context/themeContext";
import { selectCartCount } from "../store/cartSlice";
import { useAppSelector } from "../store/hooks";
import { sharedStyles as styles } from "../styleSheets/componentsStyle";

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
interface NavbarProps {
  title?: string;
  onMenuPress?: () => void;  // only used on Home for sidebar toggle
  showBack?: boolean;
}

export function Navbar({ title = "SatSetGo", onMenuPress, showBack = false }: NavbarProps) {
  const { theme } = useTheme();
  const cartCount  = useAppSelector(selectCartCount);
  const { goBack, navigate } = useNavigation();

  return (
    <View style={[styles.navbar, { backgroundColor: theme.navbar, borderBottomColor: theme.border }]}>
      {/* Left: back button or hamburger menu */}
      <TouchableOpacity
        onPress={showBack ? goBack : onMenuPress}
        style={styles.navBtn}
      >
        {showBack ? (
          <Text style={[styles.backText, { color: theme.primary }]}>{"< Back"}</Text>
        ) : (
          <View style={styles.menuIcon}>
            {[0, 1, 2].map((i) => (
              <View key={i} style={[styles.menuBar, { backgroundColor: theme.text }]} />
            ))}
          </View>
        )}
      </TouchableOpacity>

      {/* Title */}
      <Text style={[styles.navTitle, { color: theme.primary }]}>{title}</Text>

      {/* Right: cart icon with badge, tapping navigates to cart */}
      <TouchableOpacity onPress={() => navigate("cart")} style={styles.navBtn}>
        <View style={styles.cartWrap}>
          <Text style={[styles.cartIcon, { color: theme.text }]}>🛍</Text>
          {cartCount > 0 && (
            <View style={[styles.badge, { backgroundColor: theme.primary }]}>
              <Text style={styles.badgeText}>{cartCount > 99 ? "99+" : cartCount}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

// ─── SECTION LABEL ────────────────────────────────────────────────────────────
interface SectionLabelProps {
  text: string;
  style?: object;
}

export function SectionLabel({ text, style }: SectionLabelProps) {
  const { theme } = useTheme();
  return (
    <View style={[styles.sectionRow, style]}>
      <View style={[styles.sectionBar, { backgroundColor: theme.primary }]} />
      <Text style={[styles.sectionText, { color: theme.text }]}>{text}</Text>
    </View>
  );
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
interface ToastProps {
  message: string;
  visible: boolean;
}

export function Toast({ message, visible }: ToastProps) {
  const { theme } = useTheme();
  const opacity = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <Animated.View
      style={[
        styles.toast,
        { backgroundColor: theme.primary, opacity },
      ]}
      pointerEvents="none"
    >
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
}

// ─── EMPTY STATE ──────────────────────────────────────────────────────────────
interface EmptyStateProps {
  emoji: string;
  title: string;
  subtitle: string;
}

export function EmptyState({ emoji, title, subtitle }: EmptyStateProps) {
  const { theme } = useTheme();
  return (
    <View style={styles.emptyWrap}>
      <Text style={styles.emptyEmoji}>{emoji}</Text>
      <Text style={[styles.emptyTitle, { color: theme.text }]}>{title}</Text>
      <Text style={[styles.emptySub, { color: theme.subtext }]}>{subtitle}</Text>
    </View>
  );
}

// ─── PRIMARY BUTTON ───────────────────────────────────────────────────────────
interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  style?: object;
  disabled?: boolean;
}

export function PrimaryButton({ label, onPress, style, disabled }: PrimaryButtonProps) {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.primaryBtn,
        { backgroundColor: disabled ? theme.accent : theme.primary },
        style,
      ]}
      activeOpacity={0.8}
    >
      <Text style={styles.primaryBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

