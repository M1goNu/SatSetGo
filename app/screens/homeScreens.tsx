import React, { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  View
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SPACING } from "../appStyle";
import { ProductCard } from "../components/ProductCard";
import { Navbar, SectionLabel, Toast } from "../components/SharedComponents";
import { Sidebar } from "../components/Sidebar";
import { useProducts } from "../context/productContext";
import { useTheme } from "../context/themeContext";
import { homeStyles as styles } from "../styleSheets/screensStyle";

const { width: SCREEN_W } = Dimensions.get("window");
const SLIDE_RATIO = 16 / 7;

// ─── HIGHLIGHT SLIDE ──────────────────────────────────────────────────────────
function HighlightSlide({ item }: { item: ReturnType<typeof useProducts>["highlights"][0] }) {
  return (
    <View style={[styles.slide, { backgroundColor: item.bgStart }]}>
      {/* Background foto produk — source sudah ImageSourcePropType dari require() */}
      <Image
        source={item.image}
        style={styles.slideImage}
        resizeMode="cover"
      />
      {/* Dark overlay agar teks terbaca */}
      <View style={styles.slideOverlay} />

      {/* Teks konten */}
      <View style={styles.slideContent}>
        <Text style={styles.slideTitle}>{item.name}</Text>
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{item.discount}</Text>
        </View>
      </View>
    </View>
  );
}

// ─── HOME SCREEN ──────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const { theme } = useTheme();
  const { products, highlights } = useProducts();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2000);
  }, []);

  // Pair products into rows of 3
  const productRows: typeof products[] = [];
  for (let i = 0; i < products.length; i += 3) {
    productRows.push(products.slice(i, i + 3));
  }

  return (
    <View style={[styles.screen, { backgroundColor: theme.bg }]}>
      <Navbar onMenuPress={() => setSidebarOpen(true)} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.carouselWrap}>
          <Carousel
            width={SCREEN_W - SPACING.lg * 2}
            height={(SCREEN_W - SPACING.lg * 2) / SLIDE_RATIO}
            data={highlights}
            autoPlay
            autoPlayInterval={3000}
            onSnapToItem={setActiveSlide}
            renderItem={({ item }) => <HighlightSlide item={item} />}
            loop
            style={styles.carousel}
            overscrollEnabled={false}
          />

          {/* Dots */}
          <View style={styles.dots}>
            {highlights.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  {
                    backgroundColor: i === activeSlide ? theme.primary : theme.accent,
                    width: i === activeSlide ? 18 : 6,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        {/* ── Product Grid ── */}
        <SectionLabel text="🛍️ Semua Produk" />

        <View style={styles.grid}>
          {productRows.map((row, rowIdx) => (
            <View key={rowIdx} style={styles.gridRow}>
              {row.map((product) => (
                <View key={product.id} style={styles.gridCell}>
                  <ProductCard product={product} onToast={showToast} />
                </View>
              ))}
              {/* Fill empty cells if row is not complete */}
              {row.length < 3 &&
                Array.from({ length: 3 - row.length }).map((_, i) => (
                  <View key={`empty-${i}`} style={styles.gridCell} />
                ))}
            </View>
          ))}
        </View>

        <View style={{ height: SPACING.xxl }} />
      </ScrollView>

      {/* Sidebar */}
      <Sidebar
        visible={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Toast */}
      <Toast message={toastMsg} visible={toastVisible} />
    </View>
  );
}
