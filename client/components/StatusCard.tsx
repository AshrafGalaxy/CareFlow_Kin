import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Theme } from "../constants/theme";

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
  const getBadgeColors = () => {
    switch (badgeVariant) {
      case "success":
        return { bg: "#ECFDF5", text: "#059669", border: "#A7F3D0" };
      case "accent":
        return { bg: "#EFF6FF", text: "#0284C7", border: "#BAE6FD" };
      case "primary":
        return { bg: Theme.colors.primaryLight, text: Theme.colors.primary, border: "rgba(2, 62, 138, 0.2)" };
      default:
        return { bg: "#F1F5F9", text: Theme.colors.textMuted, border: "#E2E8F0" };
    }
  };

  const badgeColor = getBadgeColors();

  return (
    <View style={[styles.card, style]}>
      <View style={styles.headerRow}>
        <View style={styles.titleContainer}>
          {icon && <View style={styles.iconWrapper}>{icon}</View>}
          <View style={styles.textWrapper}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        </View>
        {badge && (
          <View
            style={[
              styles.badge,
              { backgroundColor: badgeColor.bg, borderColor: badgeColor.border },
            ]}
          >
            <Text style={[styles.badgeText, { color: badgeColor.text }]}>{badge}</Text>
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
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.sm,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: Theme.spacing.sm,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    flexShrink: 1,
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
  textWrapper: {
    flex: 1,
    flexShrink: 1,
    paddingRight: Theme.spacing.xs,
  },
  title: {
    fontFamily: Theme.fonts.heading,
    fontSize: Theme.typography.subheading,
    fontWeight: "700",
    color: Theme.colors.text,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontFamily: Theme.fonts.body,
    fontSize: Theme.typography.bodySmall,
    color: Theme.colors.textMuted,
    marginTop: 2,
    lineHeight: 20,
  },
  badge: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    flexShrink: 0,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  content: {
    marginTop: Theme.spacing.md,
  },
});
