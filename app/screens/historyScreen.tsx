import React, { useMemo, useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { DetailModal } from "../components/detailModal";
import { HistoryCard } from "../components/historyCard";
import { EmptyState, Navbar } from "../components/SharedComponents";
import { Sidebar } from "../components/Sidebar";
import { useTheme } from "../context/themeContext";
import { Transaction, selectHistory } from "../store/historySlice";
import { useAppSelector } from "../store/hooks";
import { historyStyles as styles } from "../styleSheets/screensStyle";

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

