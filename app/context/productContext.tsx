import React, { createContext, ReactNode, useContext } from "react";
import { ImageSourcePropType } from "react-native";

// ─── TYPE ─────────────────────────────────────────────────────────────────────
export interface Product {
  id: number;
  name: string;
  price: number;
  image: ImageSourcePropType;   // require('../assets/images/xxx.png')
  tag: string;
  description: string;
}

export interface Highlight {
  id: number;
  name: string;
  discount: string;
  image: ImageSourcePropType;   // require('../assets/images/xxx.png')
  bgStart: string;
  bgEnd: string;
}

// ─── PRODUK ───────────────────────────────────────────────────────────────────
// Letakkan foto di: app/assets/images/
// Ganti setiap require() dengan path foto yang sesuai
export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Indomie Goreng",
    price: 3500,
    image: require("../assets/indomieGoreng.png"),
    tag: "Best Seller",
    description: "Mie goreng sachet paling legendaris, rasa original gurih dengan bumbu lengkap",
  },
  {
    id: 2,
    name: "Indomie Goreng Pedas",
    price: 3800,
    image: require("../assets/indomiePedas.png"),
    tag: "Pedas",
    description: "Varian mie goreng extra pedas dengan bumbu cabai yang nendang",
  },
  {
    id: 3,
    name: "Indomie Rendang",
    price: 4000,
    image: require("../assets/indomieRendang.png"),
    tag: "Favorit",
    description: "Mie goreng dengan cita rasa rendang Padang yang kaya rempah",
  },
  {
    id: 4,
    name: "Mie Sedaap Ayam",
    price: 3200,
    image: require("../assets/sedaapAyam.png"),
    tag: "Hot",
    description: "Mie kuah rasa ayam bawang dengan kuah gurih dan aroma sedap",
  },
  {
    id: 5,
    name: "Mie Sedaap Goreng",
    price: 3300,
    image: require("../assets/sedaapGoreng.png"),
    tag: "New",
    description: "Mie goreng Sedaap dengan bumbu kecap manis dan bawang goreng renyah",
  },
  {
    id: 6,
    name: "Pop Mie Baso",
    price: 5500,
    image: require("../assets/popBakso.png"),
    tag: "Praktis",
    description: "Mie cup rasa baso, cukup seduh air panas langsung siap dimakan",
  },
  {
    id: 7,
    name: "Pop Mie Ayam",
    price: 5500,
    image: require("../assets/popAyam.png"),
    tag: "Promo",
    description: "Cup noodle rasa ayam spesial dengan topping sayuran dan potongan ayam",
  },
  {
    id: 8,
    name: "Sarimi Soto Ayam",
    price: 2800,
    image: require("../assets/sarimiSoto.png"),
    tag: "Hemat",
    description: "Mie kuah soto ayam dengan rempah khas Indonesia, cocok sarapan pagi",
  },
];

// ─── HIGHLIGHTS SLIDER ────────────────────────────────────────────────────────
// Gunakan foto landscape (rasio 2:1) untuk tampilan terbaik di carousel
export const HIGHLIGHTS: Highlight[] = [
  {
    id: 1,
    name: "Indomie Spesial",
    discount: "Beli 5 Gratis 1",
    image: require("../assets/indomieBanner.png"),
    bgStart: "#C0392B",
    bgEnd:   "#E74C3C",
  },
  {
    id: 2,
    name: "Mie Pedas Series",
    discount: "Diskon 20%",
    image: require("../assets/pedasBanner.png"),
    bgStart: "#E67E22",
    bgEnd:   "#F39C12",
  },
  {
    id: 3,
    name: "Cup Noodle Bundle",
    discount: "Hemat Rp5.000",
    image: require("../assets/popBanner.png"),
    bgStart: "#2980B9",
    bgEnd:   "#3498DB",
  },
  {
    id: 4,
    name: "Mie Kuah Hangat",
    discount: "50% off",
    image: require("../assets/kuahBanner.png"),
    bgStart: "#27AE60",
    bgEnd:   "#2ECC71",
  },
  {
    id: 5,
    name: "Paket Sahur Hemat",
    discount: "Mulai Rp2.800",
    image: require("../assets/indomieGoreng.png"),
    bgStart: "#8E44AD",
    bgEnd:   "#9B59B6",
  },
];

// ─── CONTEXT ──────────────────────────────────────────────────────────────────
interface ProductContextType {
  products: Product[];
  highlights: Highlight[];
  getProductById: (id: number) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({ children }: { children: ReactNode }) {
  const getProductById = (id: number) => PRODUCTS.find((p) => p.id === id);

  return (
    <ProductContext.Provider value={{ products: PRODUCTS, highlights: HIGHLIGHTS, getProductById }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts(): ProductContextType {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used within ProductProvider");
  return ctx;
}