import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Theme } from "../constants/theme";

import { useResponsive } from "../hooks/useResponsive";

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

  const getBadgeColors = () => {
    switch (badgeVariant) {
      case "success":
        return { bg: "#ECFDF5", text: "#059669", border: "#A7F3D0" };
      case "accent":
        return { bg: "#EFF6FF", text: "#0284C7", border: "#BAE6FD" };
      case "primary":
        return { bg: Theme.colors.primaryLight, text: Theme.colors.primary, border: Theme.colors.borderActive };
      default:
        return { bg: "#F1F5F9", text: Theme.colors.textMuted, border: "#E2E8F0" };
    }
  };

  const badgeColor = getBadgeColors();

  return (
    <View style={[styles.card, { padding: cardPadding }, style]}>
      <View style={styles.headerRow}>
        <View style={styles.titleContainer}>
          {icon && (
            <View
              style={[
                styles.iconWrapper,
                isSmallMobile && styles.iconWrapperSmall,
              ]}
            >
              {icon}
            </View>
          )}
          <View style={styles.textWrapper}>
            <Text style={[styles.title, isSmallMobile && styles.titleSmall]}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
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
            <Text style={[styles.badgeText, isSmallMobile && styles.badgeTextSmall, { color: badgeColor.text }]}>
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
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.ergonomics.cardRadius,
    borderWidth: 1,
    borderColor: Theme.colors.border,
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
    backgroundColor: Theme.colors.primaryLight,
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
    fontFamily: Theme.fonts.heading,
    fontSize: Theme.typography.subheading,
    fontWeight: "600",
    color: Theme.colors.text,
    letterSpacing: -0.2,
  },
  titleSmall: {
    fontSize: 17,
    lineHeight: 22,
  },
  subtitle: {
    fontFamily: Theme.fonts.body,
    fontSize: Theme.typography.bodySmall,
    color: Theme.colors.textMuted,
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
    fontSize: 10,
  },
  content: {
    marginTop: Theme.spacing.md,
  },
});

