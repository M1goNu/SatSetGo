import { Text, View } from "react-native";
import { PrimaryButton } from "../components/SharedComponents";
import { useTheme } from "../context/themeContext";
import { Transaction } from "../store/historySlice";
import { historyStyles as styles } from "../styleSheets/screensStyle";

interface HistoryCardProps {
  transaction: Transaction;
  onDetail: () => void;
}

export function HistoryCard({ transaction, onDetail }: HistoryCardProps) {
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