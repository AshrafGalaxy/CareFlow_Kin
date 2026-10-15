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
        return { bg: Theme.colors.successLight, text: Theme.colors.success };
      case "accent":
        return { bg: Theme.colors.accentLight, text: Theme.colors.accent };
      case "primary":
        return { bg: Theme.colors.primaryLight, text: Theme.colors.primary };
      default:
        return { bg: Theme.colors.frostedBlue2, text: Theme.colors.textMuted };
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
          <View style={[styles.badge, { backgroundColor: badgeColor.bg }]}>
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
    borderWidth: Theme.ergonomics.borderWidth,
    borderColor: Theme.colors.border,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
    elevation: 2,
    shadowColor: Theme.colors.deepTwilight,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
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
    width: 48,
    height: 48,
    borderRadius: 24,
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
    fontSize: Theme.typography.subheading,
    fontWeight: "700",
    color: Theme.colors.text,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: Theme.typography.bodySmall,
    color: Theme.colors.textMuted,
    marginTop: 2,
    lineHeight: 20,
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    flexShrink: 0,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  content: {
    marginTop: Theme.spacing.md,
  },
});
