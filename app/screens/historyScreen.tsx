import React, { useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { EmptyState, Navbar, PrimaryButton } from "../components/SharedComponents";
import { Sidebar } from "../components/Sidebar";
import { Transaction } from "../context/historyContext";
import { useTheme } from "../context/themeContext";
import { selectHistory } from "../store/historySlice";
import { useAppSelector } from "../store/hooks";
import { historyStyles as styles } from "../styleSheets/screensStyle";

// ─── TRANSACTION DETAIL MODAL ─────────────────────────────────────────────────
interface DetailModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

function DetailModal({ transaction, onClose }: DetailModalProps) {
  const { theme } = useTheme();
  if (!transaction) return null;

  return (
    <Modal visible={!!transaction} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={[styles.detailCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          {/* Header */}
          <TouchableOpacity onPress={onClose} style={styles.backRow}>
            <Text style={[styles.backBtn, { color: theme.primary }]}>{"< Kembali"}</Text>
          </TouchableOpacity>

          <View style={[styles.txIdBox, { backgroundColor: theme.primaryLight, borderColor: theme.primary }]}>
            <Text style={[styles.txIdLabel, { color: theme.subtext }]}>Kode Transaksi</Text>
            <Text style={[styles.txIdValue, { color: theme.primary }]}>{transaction.id}</Text>
            <Text style={[styles.txDate, { color: theme.subtext }]}>{transaction.date}</Text>
          </View>

          <Text style={[styles.detailSectionTitle, { color: theme.text }]}>Produk yang Dibeli</Text>

          {/* Items list */}
          {transaction.items.map((item, idx) => (
            <View key={item.id} style={[styles.detailRow, { borderBottomColor: theme.border }]}>
              <Text style={[styles.detailIdx, { color: theme.subtext }]}>{idx + 1}.</Text>
              <View style={styles.detailInfo}>
                <Text style={[styles.detailName, { color: theme.text }]}>
                  {item.name} ({item.qty}x)
                </Text>
                <Text style={[styles.detailQtyPrice, { color: theme.subtext }]}>
                  Rp{item.price.toLocaleString("id-ID")} × {item.qty}
                </Text>
              </View>
              <Text style={[styles.detailItemTotal, { color: theme.primary }]}>
                = Rp{(item.price * item.qty).toLocaleString("id-ID")}
              </Text>
            </View>
          ))}

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: theme.text }]}>Total</Text>
            <Text style={[styles.totalValue, { color: theme.primary }]}>
              Rp{transaction.total.toLocaleString("id-ID")}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// ─── HISTORY ITEM CARD ────────────────────────────────────────────────────────
interface HistoryCardProps {
  transaction: Transaction;
  onDetail: () => void;
}

function HistoryCard({ transaction, onDetail }: HistoryCardProps) {
  const { theme } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={styles.cardTop}>
        <View>
          <Text style={[styles.cardCode, { color: theme.text }]}>
            Code: <Text style={{ color: theme.primary }}>{transaction.id}</Text>
          </Text>
          <Text style={[styles.cardDate, { color: theme.subtext }]}>{transaction.date}</Text>
          <Text style={[styles.cardTotal, { color: theme.text }]}>
            Total: Rp{transaction.total.toLocaleString("id-ID")}
          </Text>
        </View>
      </View>
      <PrimaryButton label="Detail" onPress={onDetail} style={styles.detailBtn} />
    </View>
  );
}

// ─── HISTORY SCREEN ───────────────────────────────────────────────────────────
export default function HistoryScreen() {
  const { theme } = useTheme();
  const history = useAppSelector(selectHistory);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = useMemo(() => {
    let result = [...history];
    if (query.trim()) {
      result = result.filter((tx) =>
        tx.id.toLowerCase().includes(query.toLowerCase())
      );
    }
    result.sort((a, b) =>
      sortAsc ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
    );
    return result;
  }, [history, query, sortAsc]);

  return (
    <View style={[styles.screen, { backgroundColor: theme.bg }]}>
      <Navbar title="History" onMenuPress={() => setSidebarOpen(true)}/>

      {/* Filter bar */}
      <View style={[styles.filterBar, { borderBottomColor: theme.border }]}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Cari kode transaksi..."
          placeholderTextColor={theme.subtext}
          style={[
            styles.searchInput,
            { backgroundColor: theme.card, color: theme.text, borderColor: theme.border },
          ]}
        />
        <TouchableOpacity
          onPress={() => setSortAsc((p) => !p)}
          style={[styles.sortBtn, { backgroundColor: theme.primary }]}
          activeOpacity={0.8}
        >
          <Text style={styles.sortBtnText}>{sortAsc ? "A→Z" : "Z→A"}</Text>
        </TouchableOpacity>
      </View>

      {history.length === 0 ? (
        <EmptyState
          emoji="🕐"
          title="Belum ada transaksi"
          subtitle="Lakukan checkout untuk melihat riwayat"
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          emoji="🔍"
          title="Tidak ditemukan"
          subtitle={`Tidak ada transaksi dengan kode "${query}"`}
        />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(tx) => tx.id}
          renderItem={({ item }) => (
            <HistoryCard
              transaction={item}
              onDetail={() => setSelectedTx(item)}
            />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

      <DetailModal transaction={selectedTx} onClose={() => setSelectedTx(null)} />

      <Sidebar
        visible={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />  
    </View>
  );
}

