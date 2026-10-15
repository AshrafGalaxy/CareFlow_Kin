import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Theme } from "../constants/theme";
import { Heart } from "lucide-react-native";
import { useResponsive } from "../hooks/useResponsive";

interface HeaderGreetingProps {
  greeting: string;
  date: string;
}

export const HeaderGreeting: React.FC<HeaderGreetingProps> = ({ greeting, date }) => {
  const { isSmallMobile, isMobile } = useResponsive();

  const greetingFontSize = isSmallMobile ? 21 : isMobile ? 24 : 30;

  return (
    <View style={styles.container}>
      <View style={styles.textColumn}>
        <Text style={styles.dateText}>{date}</Text>
        <Text style={[styles.greetingText, { fontSize: greetingFontSize }]}>{greeting}</Text>
      </View>
      <View style={[styles.badgeContainer, isSmallMobile && styles.badgeContainerSmall]}>
        <Heart size={isSmallMobile ? 20 : 24} color={Theme.colors.primary} />
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
    color: Theme.colors.accent,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  greetingText: {
    fontFamily: Theme.fonts.brand,
    fontWeight: "700",
    color: Theme.colors.text,
    marginTop: 2,
    letterSpacing: -0.4,
  },
  badgeContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Theme.colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Theme.colors.border,
    ...Theme.shadows.sm,
    flexShrink: 0,
  },
  badgeContainerSmall: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
});

