// app/screens/cartScreen.tsx
import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SPACING } from "../appStyle";
import { ConfirmModal } from "../components/confirmModal";
import { EmptyState, Navbar, PrimaryButton } from "../components/SharedComponents";
import { Sidebar } from "../components/Sidebar";
import { SuccessModal } from "../components/successModal";
import { useTheme } from "../context/themeContext";
import { CartItem, clearCart, clearCartError, decreaseQty, increaseQty, selectCart, selectCartError, selectTotalPrice, } from "../store/cartSlice";
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
      <View style={[styles.imgBox, { backgroundColor: theme.accent }]}>
        <Image source={item.image} style={styles.rowImage} resizeMode="cover" />
      </View>
      <View style={styles.rowInfo}>
        <Text style={[styles.rowName, { color: theme.text }]} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={[styles.rowPrice, { color: theme.primary }]}>
          Rp{item.price.toLocaleString("id-ID")}
        </Text>
      </View>
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

// ─── CART SCREEN ──────────────────────────────────────────────────────────────
export default function CartScreen() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);
  const totalPrice = useAppSelector(selectTotalPrice);
  const cartError = useAppSelector(selectCartError);
  const historyError = useAppSelector(selectHistoryError);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastTxId, setLastTxId] = useState("");
  const [errorModal, setErrorModal] = useState<{ title: string; message: string } | null>(null);

  // Error dari Redux ditampilkan via ConfirmModal (web-safe, tidak pakai Alert)
  React.useEffect(() => {
    if (cartError) {
      setErrorModal({ title: "Kesalahan Keranjang", message: cartError });
      dispatch(clearCartError());
    }
  }, [cartError]);

  React.useEffect(() => {
    if (historyError) {
      setErrorModal({ title: "Kesalahan Transaksi", message: historyError });
      dispatch(clearHistoryError());
    }
  }, [historyError]);

  const handleCheckout = () => {
    if (cart.length === 0) {
      setErrorModal({
        title: "Keranjang Kosong",
        message: "Tambahkan produk dari halaman utama terlebih dahulu.",
      });
      return;
    }
    setShowConfirm(true);
  };

  const handleConfirmed = () => {
    try {
      setShowConfirm(false);
      const action = addTransaction({ items: cart, total: totalPrice });
      dispatch(action);
      const txId = action.payload.id;
      if (!txId) throw new Error("Gagal membuat ID transaksi.");
      setLastTxId(txId);
      dispatch(clearCart());
      setShowSuccess(true);
    } catch (e) {
      setErrorModal({
        title: "Checkout Gagal",
        message: e instanceof Error ? e.message : "Terjadi kesalahan.",
      });
    }
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.bg }]}>
      <Navbar title="Keranjang" onMenuPress={() => setSidebarOpen(true)} />

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
                onIncrease={() => dispatch(increaseQty(item.id))}
                onDecrease={() => dispatch(decreaseQty(item.id))}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 200 }}
          />

          <View
            style={[
              styles.summaryCard,
              { backgroundColor: theme.card, borderColor: theme.border, shadowColor: theme.shadow },
            ]}
          >
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

      {/* ── Konfirmasi checkout ── */}
      <ConfirmModal
        visible={showConfirm}
        title="Konfirmasi Checkout"
        message={`Total pembayaran\nRp${totalPrice.toLocaleString("id-ID")}`}
        confirmLabel="Checkout Sekarang"
        cancelLabel="Batal"
        onConfirm={handleConfirmed}
        onCancel={() => setShowConfirm(false)}
      />

      {/* ── Error modal (ganti Alert.alert) ── */}
      <ConfirmModal
        visible={!!errorModal}
        title={errorModal?.title ?? ""}
        message={errorModal?.message}
        confirmLabel="OK"
        cancelLabel=""
        onConfirm={() => setErrorModal(null)}
        onCancel={() => setErrorModal(null)}
      />

      {/* ── Sukses ── */}
      <SuccessModal
        visible={showSuccess}
        txId={lastTxId}
        onClose={() => setShowSuccess(false)}
      />

      <Sidebar visible={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </View>
  );
}