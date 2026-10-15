import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Theme } from "../constants/theme";
import { Heart } from "lucide-react-native";

interface HeaderGreetingProps {
  greeting: string;
  date: string;
}

export const HeaderGreeting: React.FC<HeaderGreetingProps> = ({ greeting, date }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textColumn}>
        <Text style={styles.dateText}>{date}</Text>
        <Text style={styles.greetingText}>{greeting}</Text>
      </View>
      <View style={styles.badgeContainer}>
        <Heart size={24} color={Theme.colors.primary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  textColumn: {
    flex: 1,
  },
  dateText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 12,
    fontWeight: "700",
    color: Theme.colors.accent,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  greetingText: {
    fontFamily: Theme.fonts.brand,
    fontSize: Theme.typography.display,
    fontWeight: "800",
    color: Theme.colors.primaryDark,
    marginTop: 4,
    letterSpacing: -0.5,
  },
  badgeContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Theme.colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 119, 182, 0.2)",
    ...Theme.shadows.sm,
  },
});
