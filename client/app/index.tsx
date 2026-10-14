import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Theme } from "../constants/theme";
import { BigButton } from "../components/BigButton";
import { ResponsiveContainer } from "../components/ResponsiveContainer";
import { Heart, ShieldCheck, Clock, Users } from "lucide-react-native";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ResponsiveContainer>
      <View style={styles.header}>
        <View style={styles.logoBadge}>
          <Heart size={36} color={Theme.colors.primary} />
        </View>
        <Text style={styles.brandTitle}>Careflow</Text>
        <Text style={styles.subtitle}>
          Your daily care companion — keeping you connected, on schedule, and supported.
        </Text>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.featurePill}>
          <Clock size={24} color={Theme.colors.primary} />
          <Text style={styles.featureText}>Daily Routine & Medication Reminders</Text>
        </View>

        <View style={styles.featurePill}>
          <Heart size={24} color={Theme.colors.accent} />
          <Text style={styles.featureText}>Gentle Wellness Check-Ins</Text>
        </View>

        <View style={styles.featurePill}>
          <Users size={24} color={Theme.colors.success} />
          <Text style={styles.featureText}>Connected Care Circle & Appointments</Text>
        </View>
      </View>

      <View style={styles.actionContainer}>
        <BigButton
          title="Open Elder Dashboard"
          onPress={() => router.push("/(elder)")}
          variant="primary"
          style={styles.primaryButton}
        />
        <BigButton
          title="Sign In with Account"
          onPress={() => router.push("/(auth)/login")}
          variant="outline"
        />
      </View>
    </ResponsiveContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingVertical: Theme.spacing.xl,
  },
  logoBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Theme.colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Theme.colors.border,
    marginBottom: Theme.spacing.md,
  },
  brandTitle: {
    fontSize: Theme.typography.display,
    fontWeight: "800",
    color: Theme.colors.primary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: Theme.typography.bodyLarge,
    color: Theme.colors.textMuted,
    textAlign: "center",
    maxWidth: 580,
    marginTop: Theme.spacing.sm,
    lineHeight: 28,
  },
  cardContainer: {
    marginVertical: Theme.spacing.lg,
    gap: Theme.spacing.md,
  },
  featurePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.card,
    borderWidth: Theme.ergonomics.borderWidth,
    borderColor: Theme.colors.border,
    borderRadius: Theme.ergonomics.cardRadius,
    padding: Theme.spacing.md,
    gap: Theme.spacing.md,
  },
  featureText: {
    fontSize: Theme.typography.body,
    fontWeight: "600",
    color: Theme.colors.text,
  },
  actionContainer: {
    marginTop: Theme.spacing.lg,
    gap: Theme.spacing.md,
  },
  primaryButton: {
    marginBottom: Theme.spacing.xs,
  },
});
