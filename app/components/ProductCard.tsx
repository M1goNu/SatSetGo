import React, { useRef } from "react";
import {
  Animated,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useCart } from "../context/cartContext";
import { Product } from "../context/productContext";
import { useTheme } from "../context/themeContext";
import { useWishlist } from "../context/wishlistContext";
import { productCardStyles as styles } from "../styleSheets/componentsStyle";

interface ProductCardProps {
  product: Product;
  onToast?: (msg: string) => void;
}

export function ProductCard({ product, onToast }: ProductCardProps) {
  const { theme } = useTheme();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const inWishlist = isInWishlist(product.id);
  const cartScale = useRef(new Animated.Value(1)).current;
  const wishScale = useRef(new Animated.Value(1)).current;

  const animatePop = (anim: Animated.Value) => {
    Animated.sequence([
      Animated.timing(anim, { toValue: 0.85, duration: 100, useNativeDriver: true }),
      Animated.spring(anim, { toValue: 1, useNativeDriver: true }),
    ]).start();
  };

  const handleCart = () => {
    addToCart(product);
    animatePop(cartScale);
    onToast?.(`${product.name} ditambahkan ke keranjang!`);
  };

  const handleWish = () => {
    toggleWishlist(product);
    animatePop(wishScale);
    onToast?.(
      inWishlist
        ? `${product.name} dihapus dari wishlist`
        : `${product.name} ditambahkan ke wishlist!`
    );
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      {/* ── Product image ── */}
      <View style={[styles.imgArea, { backgroundColor: theme.accent }]}>
        <Image
          source={product.image}
          style={styles.image}
          resizeMode="cover"
        />
        {product.tag ? (
          <View style={[styles.tag, { backgroundColor: theme.primary }]}>
            <Text style={styles.tagText}>{product.tag}</Text>
          </View>
        ) : null}
      </View>

      {/* ── Info ── */}
      <View style={styles.info}>
        <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={[styles.price, { color: theme.primary }]}>
          Rp{product.price.toLocaleString("id-ID")}
        </Text>

        {/* ── Buttons ── */}
        <View style={styles.btnRow}>
          {/* Wishlist */}
          <Animated.View style={{ flex: 1, transform: [{ scale: wishScale }] }}>
            <TouchableOpacity
              onPress={handleWish}
              style={[
                styles.btn,
                styles.btnWish,
                {
                  backgroundColor: inWishlist ? theme.primaryLight : "transparent",
                  borderColor: inWishlist ? theme.primary : theme.border,
                },
              ]}
              activeOpacity={0.7}
            >
              <Text style={[styles.starIcon, { color: theme.primary }]}>
                {inWishlist ? "★" : "☆"}
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Add to cart */}
          <Animated.View style={{ flex: 1, transform: [{ scale: cartScale }] }}>
            <TouchableOpacity
              onPress={handleCart}
              style={[styles.btn, styles.btnCart, { backgroundColor: theme.primary }]}
              activeOpacity={0.8}
            >
              <Text style={styles.plusIcon}>+</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

