import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/themeContext";
import { confirmModalStyles as styles } from "../styleSheets/componentsStyle";

interface ConfirmModalProps {
    visible: boolean;
    title: string;
    message?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmDestructive?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export function ConfirmModal({
    visible,
    title,
    message,
    confirmLabel = "Ya",
    cancelLabel = "Batal",
    confirmDestructive = false,
    onConfirm,
    onCancel,
}: ConfirmModalProps) {
    const { theme } = useTheme();

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
            <TouchableOpacity
                style={styles.backdrop}
                activeOpacity={1}
                onPress={onCancel}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { }}
                    style={[
                        styles.card,
                        { backgroundColor: theme.card, borderColor: theme.border }
                    ]}
                >
                    <Text style={[styles.title, { color: theme.text }]}>
                        {title}
                    </Text>

                    {message && (
                        <Text style={[styles.message, { color: theme.subtext }]}>
                            {message}
                        </Text>
                    )}

                    <View style={[styles.divider, { backgroundColor: theme.border }]} />

                    <View style={styles.buttonRow}>
                        {cancelLabel ? (
                            <TouchableOpacity
                                onPress={onCancel}
                                style={[
                                    styles.cancelBtn,
                                    {
                                        borderColor: theme.border,
                                        backgroundColor: theme.accent
                                    }
                                ]}
                            >
                                <Text style={[styles.cancelText, { color: theme.text }]}>
                                    {cancelLabel}
                                </Text>
                            </TouchableOpacity>
                        ) : null}

                        <TouchableOpacity
                            onPress={onConfirm}
                            style={[
                                styles.confirmBtn,
                                {
                                    backgroundColor: confirmDestructive
                                        ? "#E53935"
                                        : theme.primary
                                }
                            ]}
                        >
                            <Text style={styles.confirmText}>
                                {confirmLabel}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
}