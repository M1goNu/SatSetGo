import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "../context/themeContext";
import { profileStyles as styles } from "../styleSheets/screensStyle";

// ─── STAT CARD ────────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string | number;
  emoji: string;
}

export function StatCard({ label, value, emoji }: StatCardProps) {
  const { theme } = useTheme();
  return (
    <View style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={styles.statEmoji}>{emoji}</Text>
      <Text style={[styles.statValue, { color: theme.primary }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: theme.subtext }]}>{label}</Text>
    </View>
  );
}