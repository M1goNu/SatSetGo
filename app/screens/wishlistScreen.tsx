import React, { useCallback, useRef } from "react";
import {
  Animated,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import { EmptyState, Navbar, Toast } from "../components/SharedComponents";
import { Sidebar } from "../components/Sidebar";
import { Product } from "../context/productContext";
import { useTheme } from "../context/themeContext";
import { useWishlist } from "../context/wishlistContext";
import { addToCart } from "../store/cartSlice";
import { useAppDispatch } from "../store/hooks";
import { wishlistStyles as styles } from "../styleSheets/screensStyle";


// ─── SWIPEABLE WISHLIST ITEM ──────────────────────────────────────────────────
interface WishlistItemProps {
  product: Product;
  onDelete: (id: number) => void;
  onAddToCart: (product: Product) => void;
}

function WishlistItem({ product, onDelete, onAddToCart }: WishlistItemProps) {
  const { theme } = useTheme();
  const swipeRef = useRef<Swipeable>(null);

  // Right swipe action → Add to Cart (green)
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const translateX = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [0, 80],
      extrapolate: "clamp",
    });
    const opacity = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    return (
      <Animated.View style={[styles.swipeAction, styles.swipeRight, { opacity, transform: [{ translateX }] }]}>
        <TouchableOpacity
          onPress={() => {
            onAddToCart(product);
            swipeRef.current?.close();
          }}
          style={styles.swipeBtn}
        >
          <Text style={styles.swipeIcon}>🛍</Text>
          <Text style={styles.swipeLabel}>Add to Cart</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // Left swipe action → Delete (red)
  const renderLeftActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const translateX = dragX.interpolate({
      inputRange: [0, 80],
      outputRange: [-80, 0],
      extrapolate: "clamp",
    });
    const opacity = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    return (
      <Animated.View style={[styles.swipeAction, styles.swipeLeft, { opacity, transform: [{ translateX }] }]}>
        <TouchableOpacity
          onPress={() => {
            onDelete(product.id);
            swipeRef.current?.close();
          }}
          style={styles.swipeBtn}
        >
          <Text style={styles.swipeIcon}>🗑️</Text>
          <Text style={styles.swipeLabel}>Hapus</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Swipeable
      ref={swipeRef}
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      friction={2}
      leftThreshold={60}
      rightThreshold={60}
      overshootLeft={false}
      overshootRight={false}
    >
      <View style={[styles.item, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <View style={[styles.itemImg, { backgroundColor: theme.accent }]}>
          <Image
            source={product.image}
            style={styles.itemImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.itemInfo}>
          <Text style={[styles.itemName, { color: theme.text }]}>{product.name}</Text>
          <Text style={[styles.itemPrice, { color: theme.primary }]}>
            Rp{product.price.toLocaleString("id-ID")}
          </Text>
        </View>
        {/* Swipe hint indicator */}
        <View style={styles.swipeHint}>
          <Text style={[styles.swipeHintText, { color: theme.subtext }]}>⟵ ⟶</Text>
        </View>
      </View>
    </Swipeable>
  );
}

// ─── WISHLIST SCREEN ──────────────────────────────────────────────────────────
export default function WishlistScreen() {
  const { theme } = useTheme();
  const { wishlist, removeFromWishlist } = useWishlist();
  const dispatch = useAppDispatch(); 
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const [toastMsg, setToastMsg] = React.useState("");
  const [toastVisible, setToastVisible] = React.useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2000);
  }, []);

  const handleDelete = (id: number) => {
    removeFromWishlist(id);
    showToast("Item dihapus dari wishlist");
  };

  const handleAddToCart = (product: Product) => {
    removeFromWishlist(product.id);
    dispatch(addToCart(product));
    showToast(`${product.name} ditambahkan ke keranjang!`);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={[styles.screen, { backgroundColor: theme.bg }]}>
        <Navbar title="Wishlist" showBack={false} onMenuPress={() => setSidebarOpen(true)}/>

        {wishlist.length === 0 ? (
          <EmptyState
            emoji="⭐"
            title="Wishlist kosong"
            subtitle="Tap ★ pada produk untuk menambahkan"
          />
        ) : (
          <>
            <Text style={[styles.hint, { color: theme.subtext }]}>
              Geser kiri untuk hapus • Geser kanan untuk ke keranjang
            </Text>
            <FlatList
              data={wishlist}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <WishlistItem
                  product={item}
                  onDelete={handleDelete}
                  onAddToCart={handleAddToCart}
                />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 80 }}
            />
          </>
        )}

        <Toast message={toastMsg} visible={toastVisible} />
        <Sidebar
        visible={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        />
      </View>
    </GestureHandlerRootView>
  );
}
