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
        return { bg: "#E2E8F0", text: Theme.colors.textMuted };
    }
  };

  const badgeColor = getBadgeColors();

  return (
    <View style={[styles.card, style]}>
      <View style={styles.headerRow}>
        <View style={styles.titleContainer}>
          {icon && <View style={styles.iconWrapper}>{icon}</View>}
          <View>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconWrapper: {
    marginRight: Theme.spacing.md,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Theme.colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: Theme.typography.subheading,
    fontWeight: "700",
    color: Theme.colors.text,
  },
  subtitle: {
    fontSize: Theme.typography.bodySmall,
    color: Theme.colors.textMuted,
    marginTop: 2,
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "700",
  },
  content: {
    marginTop: Theme.spacing.md,
  },
});
