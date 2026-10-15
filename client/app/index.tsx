import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Theme } from "../constants/theme";
import { BigButton } from "../components/BigButton";
import { ResponsiveContainer } from "../components/ResponsiveContainer";
import { Heart, Clock, Users, Sparkles, CheckCircle2 } from "lucide-react-native";
import { api, getAuthToken } from "../services/api";

export default function WelcomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleOpenDashboard = async () => {
    try {
      setLoading(true);
      // If unauthenticated, bootstrap the active demo elder session
      if (!getAuthToken()) {
        await api.auth.demoLogin();
      }
      router.push("/(elder)");
    } catch (err) {
      // In offline scenario, still proceed to demo dashboard
      router.push("/(elder)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResponsiveContainer>
      <View style={styles.header}>
        <View style={styles.logoBadge}>
          <Sparkles size={40} color={Theme.colors.primary} />
        </View>
        <Text style={styles.brandTitle}>Careflow</Text>
        <View style={styles.platformBadge}>
          <Text style={styles.platformBadgeText}>UNIVERSAL ELDER COMPANION</Text>
        </View>
        <Text style={styles.subtitle}>
          Your daily care companion — keeping you connected, on schedule, and supported.
        </Text>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.featurePill}>
          <View style={[styles.iconBox, { backgroundColor: Theme.colors.primaryLight }]}>
            <Clock size={24} color={Theme.colors.primary} />
          </View>
          <View style={styles.featureTextWrapper}>
            <Text style={styles.featureTitle}>Daily Routine & Medications</Text>
            <Text style={styles.featureSubtitle}>Clear, high-contrast reminders with 1-tap adherence tracking</Text>
          </View>
        </View>

        <View style={styles.featurePill}>
          <View style={[styles.iconBox, { backgroundColor: Theme.colors.accentLight }]}>
            <Heart size={24} color={Theme.colors.accent} />
          </View>
          <View style={styles.featureTextWrapper}>
            <Text style={styles.featureTitle}>Gentle Wellness Check-Ins</Text>
            <Text style={styles.featureSubtitle}>5-second emotive status sharing with your authorized care circle</Text>
          </View>
        </View>

        <View style={styles.featurePill}>
          <View style={[styles.iconBox, { backgroundColor: Theme.colors.successLight }]}>
            <Users size={24} color={Theme.colors.success} />
          </View>
          <View style={styles.featureTextWrapper}>
            <Text style={styles.featureTitle}>Connected Care Circle</Text>
            <Text style={styles.featureSubtitle}>Direct link to clinical appointments, family guardians, and care notes</Text>
          </View>
        </View>
      </View>

      <View style={styles.actionContainer}>
        <BigButton
          title={loading ? "Starting Session..." : "Open Elder Dashboard"}
          onPress={handleOpenDashboard}
          variant="primary"
          disabled={loading}
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
    paddingVertical: Theme.spacing.lg,
  },
  logoBadge: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Theme.colors.card,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: Theme.ergonomics.borderWidth,
    borderColor: Theme.colors.border,
    marginBottom: Theme.spacing.sm,
    shadowColor: Theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  brandTitle: {
    fontSize: Theme.typography.display + 4,
    fontWeight: "800",
    color: Theme.colors.text,
    letterSpacing: -1,
  },
  platformBadge: {
    backgroundColor: Theme.colors.card,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
    marginTop: 6,
    marginBottom: Theme.spacing.sm,
  },
  platformBadgeText: {
    fontSize: 12,
    fontWeight: "800",
    color: Theme.colors.accent,
    letterSpacing: 1.2,
  },
  subtitle: {
    fontSize: Theme.typography.bodyLarge,
    color: Theme.colors.textMuted,
    textAlign: "center",
    maxWidth: 620,
    marginTop: Theme.spacing.xs,
    lineHeight: 30,
  },
  cardContainer: {
    marginVertical: Theme.spacing.md,
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
    shadowColor: "#03045E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Theme.spacing.md,
  },
  featureTextWrapper: {
    flex: 1,
  },
  featureTitle: {
    fontSize: Theme.typography.body,
    fontWeight: "700",
    color: Theme.colors.text,
  },
  featureSubtitle: {
    fontSize: Theme.typography.bodySmall - 1,
    color: Theme.colors.textMuted,
    marginTop: 2,
    lineHeight: 20,
  },
  actionContainer: {
    marginTop: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  primaryButton: {
    marginBottom: Theme.spacing.xs,
  },
});
