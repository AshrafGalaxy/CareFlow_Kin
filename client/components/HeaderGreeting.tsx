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
    fontSize: Theme.typography.body,
    fontWeight: "600",
    color: Theme.colors.accent,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  greetingText: {
    fontSize: Theme.typography.display,
    fontWeight: "800",
    color: Theme.colors.primary,
    marginTop: 4,
  },
  badgeContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Theme.colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Theme.colors.border,
  },
});
