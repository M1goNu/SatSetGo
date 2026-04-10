import { Modal, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/themeContext";
import { Transaction } from "../store/historySlice";
import { historyStyles as styles } from "../styleSheets/screensStyle";

interface DetailModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export function DetailModal({ transaction, onClose }: DetailModalProps) {
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