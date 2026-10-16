import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Theme } from "../constants/theme";
import { Heart } from "lucide-react-native";
import { useResponsive } from "../hooks/useResponsive";
import { useAccessibility } from "../context/AccessibilityContext";

interface HeaderGreetingProps {
  greeting: string;
  date: string;
}

export const HeaderGreeting: React.FC<HeaderGreetingProps> = ({ greeting, date }) => {
  const { isSmallMobile, isMobile } = useResponsive();
  const { colors, isDark } = useAccessibility();

  const greetingFontSize = isSmallMobile ? 21 : isMobile ? 24 : 30;

  return (
    <View style={styles.container}>
      <View style={styles.textColumn}>
        <Text style={[styles.dateText, { color: colors.accent }]}>{date}</Text>
        <Text style={[styles.greetingText, { fontSize: greetingFontSize, color: colors.text }]}>
          {greeting}
        </Text>
      </View>
      <View
        style={[
          styles.badgeContainer,
          {
            backgroundColor: isDark ? "#18181B" : colors.primaryLight,
            borderColor: colors.border,
          },
          isSmallMobile && styles.badgeContainerSmall,
        ]}
      >
        <Heart size={isSmallMobile ? 20 : 24} color={colors.primary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  textColumn: {
    flex: 1,
  },
  dateText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  greetingText: {
    fontFamily: Theme.fonts.brand,
    fontWeight: "700",
    marginTop: 2,
    letterSpacing: -0.4,
  },
  badgeContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    ...Theme.shadows.sm,
    flexShrink: 0,
  },
  badgeContainerSmall: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
});
