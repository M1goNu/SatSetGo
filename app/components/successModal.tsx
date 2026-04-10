import React from "react";
import { Modal, Text, View } from "react-native";
import { SPACING } from "../appStyle";
import { useTheme } from "../context/themeContext";
import { cartStyles as styles } from "../styleSheets/screensStyle";
import { PrimaryButton } from "./SharedComponents";


interface SuccessModalProps {
  visible: boolean;
  txId: string;
  onClose: () => void;
}

export function SuccessModal({ visible, txId, onClose }: SuccessModalProps) {
  const { theme } = useTheme();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={styles.successEmoji}>🎉</Text>
          <Text style={[styles.successTitle, { color: theme.text }]}>Checkout Berhasil!</Text>
          <Text style={[styles.successSub, { color: theme.subtext }]}>
            Transaksi disimpan di History
          </Text>

          <View
            style={[
              styles.txBox,
              { backgroundColor: theme.primaryLight, borderColor: theme.primary },
            ]}
          >
            <Text style={[styles.txLabel, { color: theme.subtext }]}>Kode Transaksi</Text>
            <Text style={[styles.txId, { color: theme.primary }]}>{txId}</Text>
          </View>

          <PrimaryButton
            label="Oke, Tutup"
            onPress={onClose}
            style={{ marginTop: SPACING.lg }}
          />
        </View>
      </View>
    </Modal>
  );
}