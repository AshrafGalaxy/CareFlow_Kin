import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator } from "react-native";
import { Theme } from "../constants/theme";

interface BigButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "accent" | "success" | "outline";
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  style?: object;
}

export const BigButton: React.FC<BigButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  icon,
  loading = false,
  disabled = false,
  style,
}) => {
  const getBackgroundColor = () => {
    if (disabled) return Theme.colors.border;
    switch (variant) {
      case "primary":
        return Theme.colors.primary;
      case "accent":
        return Theme.colors.accent;
      case "success":
        return Theme.colors.success;
      case "outline":
        return Theme.colors.card;
      default:
        return Theme.colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return Theme.colors.textMuted;
    if (variant === "outline") return Theme.colors.primary;
    return Theme.colors.textInverse;
  };

  const isOutline = variant === "outline";

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: isOutline ? Theme.colors.primary : "transparent",
          borderWidth: isOutline ? Theme.ergonomics.borderWidth : 0,
        },
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled, busy: loading }}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <View style={styles.contentRow}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={[styles.text, { color: getTextColor() }]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: Theme.ergonomics.minTouchTarget,
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
    borderRadius: Theme.ergonomics.buttonRadius,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginRight: Theme.spacing.sm,
  },
  text: {
    fontSize: Theme.typography.bodyLarge,
    fontWeight: "700",
    textAlign: "center",
  },
});
