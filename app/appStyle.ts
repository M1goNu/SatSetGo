import { Platform, StyleSheet } from "react-native";

export const FONT = {
  regular: Platform.select({ ios: "Georgia", android: "serif", default: "serif" }),
  sans: Platform.select({ ios: "Helvetica Neue", android: "sans-serif", default: "sans-serif" }),
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

export const FONT_SIZE = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 22,
  hero: 28,
};

export const SHADOW = {
  light: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
};

export const shell = { flex: 1 };

export const globalStyles = StyleSheet.create({
  flex1: { flex: 1 },
  row: { flexDirection: "row", alignItems: "center" },
  center: { alignItems: "center", justifyContent: "center" },
  screenPadding: { paddingHorizontal: SPACING.lg },
});