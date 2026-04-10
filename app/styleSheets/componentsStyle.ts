import { Platform, StyleSheet } from "react-native";
import { FONT, FONT_SIZE, RADIUS, SPACING } from "../appStyle";

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
export const sharedStyles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    ...Platform.select({
      ios:     { paddingTop: 52 },
      android: { paddingTop: SPACING.md },
      default: { paddingTop: SPACING.md },
    }),
  },
  navBtn: { width: 40, alignItems: "flex-start" },
  navTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: "800",
    fontFamily: FONT.sans,
    letterSpacing: 0.5,
  },
  backText: { fontSize: FONT_SIZE.md, fontWeight: "600" },
  menuIcon: { gap: 4 },
  menuBar: { width: 22, height: 2, borderRadius: 1 },
  cartWrap: { position: "relative" },
  cartIcon: { fontSize: 22 },
  badge: {
    position: "absolute",
    top: -6,
    right: -8,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  badgeText: { color: "#fff", fontSize: 9, fontWeight: "800" },

  // Section Label
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.sm,
  },
  sectionBar: { width: 3, height: 18, borderRadius: 2 },
  sectionText: { fontSize: FONT_SIZE.xl, fontWeight: "800" },

  // Toast
  toast: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    zIndex: 999,
  },
  toastText: { color: "#fff", fontSize: FONT_SIZE.sm, fontWeight: "700" },

  // Empty State
  emptyWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    paddingTop: 80,
  },
  emptyEmoji: { fontSize: 56 },
  emptyTitle: { fontSize: FONT_SIZE.xl, fontWeight: "700" },
  emptySub: { fontSize: FONT_SIZE.md },

  // Primary Button
  primaryBtn: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: RADIUS.full,
    alignItems: "center",
  },
  primaryBtnText: { color: "#fff", fontSize: FONT_SIZE.md, fontWeight: "800" },
});

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
export const productCardStyles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.lg,
    overflow: "hidden",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    flex: 1,
  },

  // Image area
  imgArea: {
    height: 120,
    position: "relative",
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%" },
  tag: {
    position: "absolute",
    top: 6,
    left: 6,
    borderRadius: RADIUS.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  tagText: { color: "#fff", fontSize: 8, fontWeight: "800" },

  // Info
  info: { padding: SPACING.sm },
  name: { fontSize: FONT_SIZE.xs, fontWeight: "700", marginBottom: 2 },
  price: { fontSize: FONT_SIZE.xs, fontWeight: "800", marginBottom: SPACING.sm },

  // Action buttons
  btnRow: { flexDirection: "row", gap: SPACING.xs },
  btn: {
    flex: 1,
    height: 28,
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
  },
  btnWish: { borderWidth: 1 },
  btnCart: {},
  starIcon: { fontSize: 13, fontWeight: "700" },
  plusIcon: { color: "#fff", fontSize: 16, fontWeight: "800", lineHeight: 18 },
});

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
export const sidebarStyles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.48)",
  },
  drawer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    borderRightWidth: 1,
    ...Platform.select({
      ios:     { paddingTop: 50 },
      android: { paddingTop: 0 },
      default: { paddingTop: 0 },
    }),
  },
  drawerHeader: {
    padding: SPACING.xl,
    borderBottomWidth: 1,
  },
  drawerLogo: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: "800",
  },
  drawerSub: {
    fontSize: FONT_SIZE.sm,
    marginTop: 2,
  },
  navList: { flex: 1 },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    gap: SPACING.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  navEmoji: { fontSize: 18 },
  navLabel: { fontSize: FONT_SIZE.md, fontWeight: "700" },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    borderTopWidth: 1,
  },
  toggleLeft: { flexDirection: "row", alignItems: "center", gap: SPACING.md },
  toggle: {
    width: 42,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  toggleKnob: { width: 16, height: 16, borderRadius: 8 },
});

// ─── BOTTOM TAB BAR ───────────────────────────────────────────────────────────
export const bottomTabStyles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingBottom: Platform.select({ ios: 24, android: 8, default: 8 }),
    paddingTop: 6,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 4,
    gap: 2,
  },
  iconWrap: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: { fontSize: 20 },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  badgeText: { color: "#fff", fontSize: 8, fontWeight: "800" },
  label: { fontSize: FONT_SIZE.xs, fontWeight: "700" },
});

// ─── APP NAVIGATOR ────────────────────────────────────────────────────────────
export const appNavigatorStyles = StyleSheet.create({
  container: { flex: 1 },
});


export const confirmModalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.xl,
  },

  card: {
    width: "100%",
    maxWidth: 360,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    padding: SPACING.xl,
    gap: SPACING.sm,
  },

  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: "800",
    textAlign: "center",
  },

  message: {
    fontSize: FONT_SIZE.md,
    textAlign: "center",
    lineHeight: 22,
  },

  divider: {
    height: 1,
    marginVertical: SPACING.sm,
  },

  buttonRow: {
    flexDirection: "row",
    gap: SPACING.sm,
  },

  cancelBtn: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    alignItems: "center",
  },

  confirmBtn: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.full,
    alignItems: "center",
  },

  cancelText: {
    fontSize: FONT_SIZE.md,
    fontWeight: "700",
  },

  confirmText: {
    fontSize: FONT_SIZE.md,
    fontWeight: "800",
    color: "#fff",
  },
});