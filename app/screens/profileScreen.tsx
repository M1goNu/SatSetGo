import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Navbar } from "../components/SharedComponents";
import { Sidebar } from "../components/Sidebar";
import { useTheme } from "../context/themeContext";
import { useWishlist } from "../context/wishlistContext";
import { selectCart } from "../store/cartSlice";
import { selectHistory } from "../store/historySlice";
import { useAppSelector } from "../store/hooks";
import { profileStyles as styles } from "../styleSheets/screensStyle";

// ─── STAT CARD ────────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string | number;
  emoji: string;
}

function StatCard({ label, value, emoji }: StatCardProps) {
  const { theme } = useTheme();
  return (
    <View style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={styles.statEmoji}>{emoji}</Text>
      <Text style={[styles.statValue, { color: theme.primary }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: theme.subtext }]}>{label}</Text>
    </View>
  );
}

// ─── PROFILE SCREEN ───────────────────────────────────────────────────────────
// ⚠️  GANTI DATA BERIKUT DENGAN NIM DAN NAMA ANDA
const STUDENT_NAME = "Rifqi Aldino Amin";
const STUDENT_NIM = "00000093743";
// Ganti dengan path gambar profil Anda: require('../assets/profile.jpg')
// atau gunakan URI: { uri: 'https://...' }
const PROFILE_IMAGE = {uri: 'https://randomuser.me/api/portraits/men/9.jpg'}; // set to require('../assets/profile.jpg')

export default function ProfileScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const history = useAppSelector(selectHistory);
  const cart = useAppSelector(selectCart);
  const { wishlist } = useWishlist();

  const totalSpent = history.reduce((sum, tx) => sum + tx.total, 0);

  return (
    <View style={[styles.screen, { backgroundColor: theme.bg }]}>
      <Navbar title="Profile" onMenuPress={() => setSidebarOpen(true)}/>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* ── Profile Card ── */}
        <View style={[styles.profileCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          {/* Avatar */}
          <View style={[styles.avatarWrap, { borderColor: theme.primary }]}>
            {PROFILE_IMAGE ? (
              <Image source={PROFILE_IMAGE} style={styles.avatar} />
            ) : (
              <View style={[styles.avatarPlaceholder, { backgroundColor: theme.primaryLight }]}>
                <Text style={styles.avatarInitials}>
                  {STUDENT_NAME.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                </Text>
              </View>
            )}
          </View>

          <Text style={[styles.profileName, { color: theme.text }]}>{STUDENT_NAME}</Text>
          <Text style={[styles.profileNim, { color: theme.subtext }]}>{STUDENT_NIM}</Text>

          {/* NIM chip */}
          <View style={[styles.nimChip, { backgroundColor: theme.primaryLight, borderColor: theme.primary }]}>
            <Text style={[styles.nimChipText, { color: theme.primary }]}>🎓 Mahasiswa UMN</Text>
          </View>
        </View>

        {/* ── Stats ── */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Statistik</Text>
        <View style={styles.statsGrid}>
          <StatCard label="Transaksi" value={history.length} emoji="🧾" />
          <StatCard label="Di Wishlist" value={wishlist.length} emoji="⭐" />
          <StatCard label="Di Keranjang" value={cart.length} emoji="🛍" />
        </View>

        <View style={[styles.spentCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.spentLabel, { color: theme.subtext }]}>Total Pengeluaran</Text>
          <Text style={[styles.spentValue, { color: theme.primary }]}>
            Rp{totalSpent.toLocaleString("id-ID")}
          </Text>
        </View>

        {/* ── Settings ── */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Pengaturan</Text>
        <View style={[styles.settingsCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          {/* Dark Mode Row */}
          <TouchableOpacity
            onPress={toggleTheme}
            style={[styles.settingRow, { borderBottomColor: theme.border }]}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <Text style={styles.settingEmoji}>{isDark ? "🌙" : "🌞"}</Text>
              <View>
                <Text style={[styles.settingLabel, { color: theme.text }]}>
                  {isDark ? "Dark Mode" : "Light Mode"}
                </Text>
                <Text style={[styles.settingDesc, { color: theme.subtext }]}>
                  Tema tampilan aplikasi
                </Text>
              </View>
            </View>
            {/* Toggle */}
            <View
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
            </View>
          </TouchableOpacity>

          {/* App version row */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingEmoji}>📱</Text>
              <View>
                <Text style={[styles.settingLabel, { color: theme.text }]}>Versi Aplikasi</Text>
                <Text style={[styles.settingDesc, { color: theme.subtext }]}>IF670L UTS 2025/2026</Text>
              </View>
            </View>
            <Text style={[styles.versionBadge, { color: theme.primary }]}>v1.0.0</Text>
          </View>
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>
      <Sidebar
        visible={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </View>
  );
}

