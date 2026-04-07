import { StyleSheet } from "react-native";
import { FONT_SIZE, RADIUS, SPACING } from "../appStyle";

// ─────────────────────────────────────────────────────────────────────────────
// screensStyle.ts
// Berisi StyleSheet untuk seluruh file di folder /screens:
//   homeScreen  · cartScreen  · wishlistScreen  · historyScreen  · profileScreen
// ─────────────────────────────────────────────────────────────────────────────

// ─── HOME SCREEN ─────────────────────────────────────────────────────────────
export const homeStyles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { paddingBottom: 80 },

  // Carousel
  carouselWrap: {
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.sm,
  },
  carousel: {
    borderRadius: RADIUS.xl,
    overflow: "hidden",
  },
  slide: {
    flex: 1,
    borderRadius: RADIUS.xl,
    overflow: "hidden",
    justifyContent: "flex-end",
    padding: SPACING.lg,
    position: "relative",
  },
  slideImage: {
    ...StyleSheet.absoluteFillObject,
    width: "auto",
    height: "auto",
  },
  slideOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.42)",
  },
  slideContent: { gap: SPACING.xs },
  slideTitle: {
    color: "#fff",
    fontSize: FONT_SIZE.xxl,
    fontWeight: "800",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  discountBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: RADIUS.full,
    paddingHorizontal: 12,
    paddingVertical: 3,
  },
  discountText: { color: "#fff", fontSize: FONT_SIZE.sm, fontWeight: "800" },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    marginTop: SPACING.sm,
  },
  dot: { height: 5, borderRadius: 3 },

  // Product Grid
  grid: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  gridRow: { flexDirection: "row", gap: SPACING.sm },
  gridCell: { flex: 1 },
});

// ─── CART SCREEN ─────────────────────────────────────────────────────────────
export const cartStyles = StyleSheet.create({
  screen: { flex: 1 },

  // Cart Row
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: SPACING.md,
  },
  imgBox: {
    width: 60,
    height: 60,
    borderRadius: RADIUS.md,
    overflow: "hidden",
  },
  rowImage: { width: "100%", height: "100%" },
  rowInfo: { flex: 1 },
  rowName: { fontSize: FONT_SIZE.md, fontWeight: "700", marginBottom: 4 },
  rowPrice: { fontSize: FONT_SIZE.sm, fontWeight: "800" },

  // Qty control
  qtyRow: { flexDirection: "row", alignItems: "center", gap: SPACING.sm },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: RADIUS.sm,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  qtyBtnText: { fontSize: FONT_SIZE.lg, fontWeight: "700", lineHeight: 22 },
  qtyNum: {
    fontSize: FONT_SIZE.md,
    fontWeight: "800",
    minWidth: 24,
    textAlign: "center",
  },

  // Summary card
  summaryCard: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.xl,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    borderWidth: 1,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.xs,
  },
  summaryItem: { fontSize: FONT_SIZE.sm },
  summaryItemPrice: { fontSize: FONT_SIZE.sm, fontWeight: "600" },
  divider: { height: StyleSheet.hairlineWidth, marginVertical: SPACING.sm },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: { fontSize: FONT_SIZE.md, fontWeight: "700" },
  totalPrice: { fontSize: FONT_SIZE.xl, fontWeight: "800" },

  // Checkout success modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.xl,
  },
  modalCard: {
    width: "100%",
    padding: SPACING.xl,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    alignItems: "center",
    gap: SPACING.sm,
  },
  successEmoji: { fontSize: 52 },
  successTitle: { fontSize: FONT_SIZE.xl, fontWeight: "800" },
  successSub: { fontSize: FONT_SIZE.sm },
  txBox: {
    alignSelf: "stretch",
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    alignItems: "center",
    marginTop: SPACING.sm,
  },
  txLabel: { fontSize: FONT_SIZE.xs, marginBottom: 4 },
  txId: { fontSize: FONT_SIZE.xxl, fontWeight: "800", letterSpacing: 3 },
});

// ─── WISHLIST SCREEN ─────────────────────────────────────────────────────────
export const wishlistStyles = StyleSheet.create({
  screen: { flex: 1 },
  hint: {
    textAlign: "center",
    fontSize: FONT_SIZE.xs,
    paddingVertical: SPACING.sm,
  },

  // Item row
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: SPACING.md,
  },
  itemImg: {
    width: 58,
    height: 58,
    borderRadius: RADIUS.md,
    overflow: "hidden",
  },
  itemImage: { width: "100%", height: "100%" },
  itemInfo: { flex: 1 },
  itemName: { fontSize: FONT_SIZE.md, fontWeight: "700", marginBottom: 4 },
  itemPrice: { fontSize: FONT_SIZE.sm, fontWeight: "800" },
  swipeHint: { paddingLeft: SPACING.sm },
  swipeHintText: { fontSize: FONT_SIZE.xs },

  // Swipe action panels
  swipeAction: {
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  swipeLeft: { backgroundColor: "#E53935" },
  swipeRight: { backgroundColor: "#2E7D32" },
  swipeBtn: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  swipeIcon: { fontSize: 22 },
  swipeLabel: { color: "#fff", fontSize: FONT_SIZE.xs, fontWeight: "700" },
});

// ─── HISTORY SCREEN ───────────────────────────────────────────────────────────
export const historyStyles = StyleSheet.create({
  screen: { flex: 1 },

  // Filter
  filterBar: {
    flexDirection: "row",
    gap: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    fontSize: FONT_SIZE.sm,
    borderWidth: 1,
  },
  sortBtn: {
    paddingHorizontal: SPACING.md,
    height: 40,
    borderRadius: RADIUS.full,
    alignItems: "center",
    justifyContent: "center",
  },
  sortBtnText: { color: "#fff", fontSize: FONT_SIZE.xs, fontWeight: "800" },

  // History Card
  list: { padding: SPACING.lg, gap: SPACING.md, paddingBottom: 80 },
  card: {
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    gap: SPACING.sm,
  },
  cardTop: { flexDirection: "row", justifyContent: "space-between" },
  cardCode: { fontSize: FONT_SIZE.md, fontWeight: "700", marginBottom: 2 },
  cardDate: { fontSize: FONT_SIZE.xs, marginBottom: 4 },
  cardTotal: { fontSize: FONT_SIZE.sm, fontWeight: "600" },
  detailBtn: { alignSelf: "flex-start", paddingVertical: SPACING.sm, paddingHorizontal: SPACING.lg },

  // Detail Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  detailCard: {
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    borderWidth: 1,
    padding: SPACING.xl,
    maxHeight: "85%",
    gap: SPACING.md,
  },
  backRow: { marginBottom: SPACING.xs },
  backBtn: { fontSize: FONT_SIZE.md, fontWeight: "700" },
  txIdBox: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: SPACING.lg,
    alignItems: "center",
    gap: 2,
  },
  txIdLabel: { fontSize: FONT_SIZE.xs },
  txIdValue: { fontSize: FONT_SIZE.xxl, fontWeight: "800", letterSpacing: 3 },
  txDate: { fontSize: FONT_SIZE.xs },
  detailSectionTitle: { fontSize: FONT_SIZE.md, fontWeight: "700", marginTop: SPACING.sm },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: SPACING.sm,
  },
  detailIdx: { fontSize: FONT_SIZE.sm, width: 20 },
  detailInfo: { flex: 1 },
  detailName: { fontSize: FONT_SIZE.sm, fontWeight: "600" },
  detailQtyPrice: { fontSize: FONT_SIZE.xs, marginTop: 2 },
  detailItemTotal: { fontSize: FONT_SIZE.sm, fontWeight: "700" },
  divider: { height: StyleSheet.hairlineWidth, marginVertical: SPACING.sm },
  totalRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  totalLabel: { fontSize: FONT_SIZE.md, fontWeight: "700" },
  totalValue: { fontSize: FONT_SIZE.xl, fontWeight: "800" },
});

// ─── PROFILE SCREEN ───────────────────────────────────────────────────────────
export const profileStyles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { padding: SPACING.lg },

  // Profile card
  profileCard: {
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    padding: SPACING.xl,
    alignItems: "center",
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  avatarWrap: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    overflow: "hidden",
    marginBottom: SPACING.sm,
  },
  avatar: { width: "100%", height: "100%" },
  avatarPlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitials: { fontSize: 36, fontWeight: "800", color: "#FF6B00" },
  profileName: { fontSize: FONT_SIZE.xxl, fontWeight: "800" },
  profileNim: { fontSize: FONT_SIZE.md, letterSpacing: 1 },
  nimChip: {
    borderRadius: RADIUS.full,
    borderWidth: 1,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    marginTop: SPACING.xs,
  },
  nimChipText: { fontSize: FONT_SIZE.sm, fontWeight: "700" },

  // Section title
  sectionTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: "700",
    marginBottom: SPACING.sm,
    marginTop: SPACING.xs,
  },

  // Stats grid
  statsGrid: {
    flexDirection: "row",
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  statCard: {
    flex: 1,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: SPACING.md,
    alignItems: "center",
    gap: 4,
  },
  statEmoji: { fontSize: 24 },
  statValue: { fontSize: FONT_SIZE.xl, fontWeight: "800" },
  statLabel: { fontSize: FONT_SIZE.xs, textAlign: "center" },

  // Spent card
  spentCard: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: SPACING.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  spentLabel: { fontSize: FONT_SIZE.sm },
  spentValue: { fontSize: FONT_SIZE.xl, fontWeight: "800" },

  // Settings card
  settingsCard: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    overflow: "hidden",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SPACING.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    flex: 1,
  },
  settingEmoji: { fontSize: 22 },
  settingLabel: { fontSize: FONT_SIZE.sm, fontWeight: "700" },
  settingDesc: { fontSize: FONT_SIZE.xs, marginTop: 2 },
  toggle: {
    width: 42,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  toggleKnob: { width: 16, height: 16, borderRadius: 8 },
  versionBadge: { fontSize: FONT_SIZE.sm, fontWeight: "700" },
});