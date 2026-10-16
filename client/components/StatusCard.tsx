import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Theme } from "../constants/theme";
import { useResponsive } from "../hooks/useResponsive";
import { useAccessibility } from "../context/AccessibilityContext";

interface StatusCardProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  badge?: string;
  badgeVariant?: "success" | "accent" | "primary" | "muted";
  style?: object;
}

export const StatusCard: React.FC<StatusCardProps> = ({
  title,
  subtitle,
  children,
  icon,
  badge,
  badgeVariant = "muted",
  style,
}) => {
  const { isSmallMobile, cardPadding } = useResponsive();
  const { isAAAMode, isDark, colors, aaaColors, highContrastBorders, fontMultiplier } = useAccessibility();

  const getBadgeColors = () => {
    if (isDark) {
      switch (badgeVariant) {
        case "success":
          return { bg: "#064E3B", text: "#34D399", border: "#059669" };
        case "accent":
          return { bg: "#18181B", text: "#38BDF8", border: "#27272A" };
        case "primary":
          return { bg: "#18181B", text: "#38BDF8", border: "#27272A" };
        default:
          return { bg: "#18181B", text: "#A1A1AA", border: "#27272A" };
      }
    }
    if (isAAAMode) {
      switch (badgeVariant) {
        case "success":
          return { bg: "#F0FDF4", text: aaaColors.success, border: "#BBF7D0" };
        case "accent":
          return { bg: "#F0F9FF", text: aaaColors.primary, border: "#BAE6FD" };
        case "primary":
          return { bg: "#F0F9FF", text: aaaColors.primary, border: "#BAE6FD" };
        default:
          return { bg: "#F1F5F9", text: aaaColors.textMuted, border: "#CBD5E1" };
      }
    }
    switch (badgeVariant) {
      case "success":
        return { bg: "#ECFDF5", text: "#059669", border: "#A7F3D0" };
      case "accent":
        return { bg: "#EFF6FF", text: "#0284C7", border: "#BAE6FD" };
      case "primary":
        return { bg: colors.primaryLight, text: colors.primary, border: colors.borderActive };
      default:
        return { bg: "#F1F5F9", text: colors.textMuted, border: "#E2E8F0" };
    }
  };

  const badgeColor = getBadgeColors();
  const dynamicTitleSize = Math.round((isSmallMobile ? 17 : Theme.typography.subheading) * fontMultiplier);
  const dynamicSubtitleSize = Math.round(Theme.typography.bodySmall * fontMultiplier);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          padding: cardPadding,
        },
        highContrastBorders && {
          borderWidth: 1.5,
          borderColor: aaaColors.borderHighContrast,
        },
        style,
      ]}
    >
      <View style={styles.headerRow}>
        <View style={styles.titleContainer}>
          {icon && (
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: isDark ? "#18181B" : colors.primaryLight },
                isSmallMobile && styles.iconWrapperSmall,
              ]}
            >
              {icon}
            </View>
          )}
          <View style={styles.textWrapper}>
            <Text
              style={[
                styles.title,
                { color: colors.text },
                isSmallMobile && styles.titleSmall,
                { fontSize: dynamicTitleSize, lineHeight: Math.round(dynamicTitleSize * 1.3) },
              ]}
            >
              {title}
            </Text>
            {subtitle && (
              <Text
                style={[
                  styles.subtitle,
                  { color: colors.textMuted },
                  { fontSize: dynamicSubtitleSize, lineHeight: Math.round(dynamicSubtitleSize * 1.4) },
                ]}
              >
                {subtitle}
              </Text>
            )}
          </View>
        </View>
        {badge && (
          <View
            style={[
              styles.badge,
              isSmallMobile && styles.badgeSmall,
              { backgroundColor: badgeColor.bg, borderColor: badgeColor.border },
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                isSmallMobile && styles.badgeTextSmall,
                { color: badgeColor.text, fontSize: Math.round(11 * fontMultiplier) },
              ]}
            >
              {badge}
            </Text>
          </View>
        )}
      </View>
      {children && <View style={styles.content}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: Theme.ergonomics.cardRadius,
    borderWidth: 1,
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.sm,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: Theme.spacing.sm,
    flexWrap: "wrap",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    minWidth: 180,
  },
  iconWrapper: {
    marginRight: Theme.spacing.md,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  iconWrapperSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: Theme.spacing.sm,
  },
  textWrapper: {
    flex: 1,
    paddingRight: Theme.spacing.xs,
  },
  title: {
    fontFamily: Theme.fonts.brand,
    fontSize: Theme.typography.subheading,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  titleSmall: {
    fontFamily: Theme.fonts.brand,
    fontSize: 17,
    lineHeight: 22,
  },
  subtitle: {
    fontFamily: Theme.fonts.body,
    fontSize: Theme.typography.bodySmall,
    marginTop: 2,
    lineHeight: 18,
  },
  badge: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    flexShrink: 0,
    alignSelf: "flex-start",
  },
  badgeSmall: {
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  badgeText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  badgeTextSmall: {
    fontFamily: Theme.fonts.heading,
    fontSize: 10,
  },
  content: {
    marginTop: Theme.spacing.md,
  },
});
