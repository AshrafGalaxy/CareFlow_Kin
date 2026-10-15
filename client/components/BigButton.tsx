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
    if (disabled) return "#E2E8F0";
    switch (variant) {
      case "primary":
        return Theme.colors.primary;
      case "accent":
        return Theme.colors.accent;
      case "success":
        return Theme.colors.success;
      case "outline":
        return "#FFFFFF";
      default:
        return Theme.colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return "#94A3B8";
    if (variant === "outline") return Theme.colors.primary;
    return "#FFFFFF";
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
          borderWidth: isOutline ? 1.5 : 0,
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
    minHeight: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: Theme.ergonomics.buttonRadius,
    justifyContent: "center",
    alignItems: "center",
    ...Theme.shadows.sm,
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginRight: 8,
  },
  text: {
    fontFamily: Theme.fonts.heading,
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 0.1,
  },
});
