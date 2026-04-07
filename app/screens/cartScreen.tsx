import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SPACING } from "../appStyle";
import { EmptyState, Navbar, PrimaryButton } from "../components/SharedComponents";
import { Sidebar } from "../components/Sidebar";
import { CartItem } from "../context/cartContext";
import { useTheme } from "../context/themeContext";
import {
  clearCart, clearCartError,
  decreaseQty,
  increaseQty,
  selectCart,
  selectCartError,
  selectTotalPrice
} from "../store/cartSlice";
import { addTransaction, clearHistoryError, selectHistoryError } from "../store/historySlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { cartStyles as styles } from "../styleSheets/screensStyle";

// ─── CART ITEM ROW ────────────────────────────────────────────────────────────
interface CartRowProps {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
}

function CartRow({ item, onIncrease, onDecrease }: CartRowProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.row, { borderBottomColor: theme.border }]}>
      
      {/* Product image */}
      <View style={[styles.imgBox, { backgroundColor: theme.accent }]}>
        <Image
          source={item.image}
          style={styles.rowImage}
          resizeMode="cover"
        />
      </View>

      {/* Info */}
      <View style={styles.rowInfo}>
        <Text style={[styles.rowName, { color: theme.text }]} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={[styles.rowPrice, { color: theme.primary }]}>
          Rp{item.price.toLocaleString("id-ID")}
        </Text>
      </View>

      {/* Qty control */}
      <View style={styles.qtyRow}>
        <TouchableOpacity
          onPress={onDecrease}
          style={[styles.qtyBtn, { backgroundColor: theme.accent, borderColor: theme.border }]}
          activeOpacity={0.7}
        >
          <Text style={[styles.qtyBtnText, { color: theme.text }]}>−</Text>
        </TouchableOpacity>

        <Text style={[styles.qtyNum, { color: theme.text }]}>{item.qty}</Text>

        <TouchableOpacity
          onPress={onIncrease}
          style={[styles.qtyBtn, { backgroundColor: theme.primary }]}
          activeOpacity={0.7}
        >
          <Text style={[styles.qtyBtnText, { color: "#fff" }]}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── CHECKOUT SUCCESS MODAL ────────────────────────────────────────────────────
interface SuccessModalProps {
  visible: boolean;
  txId: string;
  onClose: () => void;
  theme: ReturnType<typeof useTheme>["theme"];
}

function SuccessModal({ visible, txId, onClose, theme }: SuccessModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={styles.successEmoji}>🎉</Text>
          <Text style={[styles.successTitle, { color: theme.text }]}>Checkout Berhasil!</Text>
          <Text style={[styles.successSub, { color: theme.subtext }]}>
            Transaksi disimpan di History
          </Text>
          <View style={[styles.txBox, { backgroundColor: theme.primaryLight, borderColor: theme.primary }]}>
            <Text style={[styles.txLabel, { color: theme.subtext }]}>Kode Transaksi</Text>
            <Text style={[styles.txId, { color: theme.primary }]}>{txId}</Text>
          </View>
          <PrimaryButton label="Oke, Tutup" onPress={onClose} style={{ marginTop: SPACING.lg, alignSelf: "stretch" }} />
        </View>
      </View>
    </Modal>
  );
}

// ─── CART SCREEN ──────────────────────────────────────────────────────────────
export default function CartScreen() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);
  const totalPrice = useAppSelector(selectTotalPrice);
  const cartError = useAppSelector(selectCartError);
  const historyError = useAppSelector(selectHistoryError);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lastTxId, setLastTxId] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Error alerts
  useEffect(() => {
    if (cartError) {
      Alert.alert("Kesalahan Keranjang", cartError, [
        { text: "OK", onPress: () => dispatch(clearCartError()) },
      ]);
    }
  }, [cartError]);

  useEffect(() => {
    if (historyError) {
      Alert.alert("Kesalahan Transaksi", historyError, [
        { text: "OK", onPress: () => dispatch(clearHistoryError()) },
      ]);
    }
  }, [historyError]);

  const handleCheckout = () => {
    try {
      if (cart.length === 0) {
        Alert.alert("Keranjang Kosong", "Tambahkan produk terlebih dahulu.");
        return;
      }
      Alert.alert(
        "Konfirmasi Checkout",
        `Total: Rp${totalPrice.toLocaleString("id-ID")}\n\nLanjutkan checkout?`,
        [
          { text: "Batal", style: "cancel" },
          {
            text: "Checkout",
            onPress: () => {
              try {
                const action = addTransaction({ items: cart, total: totalPrice });
                dispatch(action);
                const txId = action.payload.id;
                if (!txId) throw new Error("Gagal membuat ID transaksi.");
                setLastTxId(txId);
                dispatch(clearCart());
                setShowSuccess(true);
              } catch (e) {
                Alert.alert("Checkout Gagal", e instanceof Error ? e.message : "Terjadi kesalahan.");
              }
            },
          },
        ]
      );
    } catch (e) {
      Alert.alert("Kesalahan", e instanceof Error ? e.message : "Terjadi kesalahan.");
    }
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.bg }]}>
      <Navbar title="Keranjang" onMenuPress={() => setSidebarOpen(true)}/>

      {cart.length === 0 ? (
        <EmptyState
          emoji="🛍️"
          title="Keranjang kosong"
          subtitle="Tambahkan produk dari halaman utama"
        />
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CartRow
                item={item}
                onIncrease={() => increaseQty(item.id)}
                onDecrease={() => decreaseQty(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 200 }}
          />

          {/* Summary & Checkout */}
          <View
            style={[
              styles.summaryCard,
              { backgroundColor: theme.card, borderColor: theme.border, shadowColor: theme.shadow },
            ]}
          >
            {/* Price breakdown */}
            {cart.map((item) => (
              <View key={item.id} style={styles.summaryRow}>
                <Text style={[styles.summaryItem, { color: theme.subtext }]}>
                  {item.name} ({item.qty}x)
                </Text>
                <Text style={[styles.summaryItemPrice, { color: theme.text }]}>
                  Rp{(item.price * item.qty).toLocaleString("id-ID")}
                </Text>
              </View>
            ))}

            <View style={[styles.divider, { backgroundColor: theme.border }]} />

            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { color: theme.text }]}>Total</Text>
              <Text style={[styles.totalPrice, { color: theme.primary }]}>
                Rp{totalPrice.toLocaleString("id-ID")}
              </Text>
            </View>

            <PrimaryButton
              label="Checkout"
              onPress={handleCheckout}
              style={{ marginTop: SPACING.md }}
            />
          </View>
        </>
      )}

      <SuccessModal
        visible={showSuccess}
        txId={lastTxId}
        onClose={() => setShowSuccess(false)}
        theme={theme}
      />

      <Sidebar
        visible={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </View>
  );
}

