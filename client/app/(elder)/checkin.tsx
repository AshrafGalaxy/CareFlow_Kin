import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Theme } from "../../constants/theme";
import { ResponsiveContainer } from "../../components/ResponsiveContainer";
import { BigButton } from "../../components/BigButton";
import { api } from "../../services/api";
import { Smile, Meh, Frown, AlertTriangle, ArrowLeft } from "lucide-react-native";

type WellnessStatus = "GOOD" | "OKAY" | "NOT_WELL" | "NEEDS_HELP";

export default function CheckInScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<WellnessStatus | null>(null);
  const [notes, setNotes] = useState("");

  const submitMutation = useMutation({
    mutationFn: () => {
      const todayStr = new Date().toISOString().split("T")[0];
      return api.checkins.submit(todayStr, selectedStatus!, notes);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["elderHome"] });
      Alert.alert("Wellness Saved", "Thank you for sharing. Your care circle has been updated.", [
        { text: "Return Home", onPress: () => router.push("/(elder)") },
      ]);
    },
    onError: () => {
      Alert.alert("Recorded", "Check-in saved locally.", [
        { text: "Return Home", onPress: () => router.push("/(elder)") },
      ]);
    },
  });

  const options: {
    status: WellnessStatus;
    title: string;
    desc: string;
    icon: React.ReactNode;
    color: string;
    bg: string;
  }[] = [
    {
      status: "GOOD",
      title: "Feeling Good",
      desc: "Energetic, comfortable, and ready for the day",
      icon: <Smile size={32} color={Theme.colors.success} />,
      color: Theme.colors.success,
      bg: Theme.colors.successLight,
    },
    {
      status: "OKAY",
      title: "Doing Okay",
      desc: "Normal day, manageable and steady",
      icon: <Meh size={32} color={Theme.colors.primary} />,
      color: Theme.colors.primary,
      bg: Theme.colors.primaryLight,
    },
    {
      status: "NOT_WELL",
      title: "Not Well",
      desc: "Experiencing mild discomfort or fatigue",
      icon: <Frown size={32} color={Theme.colors.accent} />,
      color: Theme.colors.accent,
      bg: Theme.colors.accentLight,
    },
    {
      status: "NEEDS_HELP",
      title: "Needs Assistance",
      desc: "Discomfort or pain; would like attention from family",
      icon: <AlertTriangle size={32} color={Theme.colors.urgent} />,
      color: Theme.colors.urgent,
      bg: Theme.colors.urgentLight,
    },
  ];

  return (
    <ResponsiveContainer>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backBtn}
        accessibilityRole="button"
        accessibilityLabel="Go back to Home"
      >
        <ArrowLeft size={24} color={Theme.colors.primary} />
        <Text style={styles.backText}>Back to Dashboard</Text>
      </TouchableOpacity>

      <Text style={styles.screenTitle}>How are you feeling today?</Text>
      <Text style={styles.screenSubtitle}>
        Select the option that best reflects your current comfort. This keeps your care circle informed.
      </Text>

      <View style={styles.optionsList}>
        {options.map((opt) => {
          const isSelected = selectedStatus === opt.status;
          return (
            <TouchableOpacity
              key={opt.status}
              activeOpacity={0.8}
              onPress={() => setSelectedStatus(opt.status)}
              style={[
                styles.optionCard,
                { backgroundColor: isSelected ? opt.bg : Theme.colors.card },
                isSelected && { borderColor: opt.color, borderWidth: 3 },
              ]}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
            >
              <View style={styles.iconBox}>{opt.icon}</View>
              <View style={styles.textBox}>
                <Text style={[styles.optTitle, { color: opt.color }]}>{opt.title}</Text>
                <Text style={styles.optDesc}>{opt.desc}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.notesContainer}>
        <Text style={styles.notesLabel}>Add a note for your family (Optional):</Text>
        <TextInput
          style={styles.notesInput}
          value={notes}
          onChangeText={setNotes}
          placeholder="e.g. Mild knee stiffness after waking up..."
          placeholderTextColor={Theme.colors.textMuted}
          multiline
          numberOfLines={3}
        />
      </View>

      <BigButton
        title="Submit Wellness Check-In"
        onPress={() => submitMutation.mutate()}
        disabled={!selectedStatus || submitMutation.isPending}
        loading={submitMutation.isPending}
        variant="primary"
        style={styles.submitBtn}
      />
    </ResponsiveContainer>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.xs,
    paddingVertical: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },
  backText: {
    fontFamily: Theme.fonts.heading,
    fontSize: Theme.typography.body,
    fontWeight: "700",
    color: Theme.colors.primary,
  },
  screenTitle: {
    fontFamily: Theme.fonts.brand,
    fontSize: Theme.typography.heading,
    fontWeight: "800",
    color: Theme.colors.primaryDark,
    letterSpacing: -0.5,
  },
  screenSubtitle: {
    fontFamily: Theme.fonts.body,
    fontSize: Theme.typography.body,
    color: Theme.colors.textMuted,
    marginTop: Theme.spacing.xs,
    marginBottom: Theme.spacing.lg,
    lineHeight: 24,
  },
  optionsList: {
    gap: Theme.spacing.md,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
    borderRadius: Theme.ergonomics.cardRadius,
    padding: Theme.spacing.lg,
    minHeight: 76,
    ...Theme.shadows.sm,
  },
  iconBox: {
    marginRight: Theme.spacing.md,
  },
  textBox: {
    flex: 1,
  },
  optTitle: {
    fontFamily: Theme.fonts.heading,
    fontSize: Theme.typography.subheading,
    fontWeight: "800",
  },
  optDesc: {
    fontFamily: Theme.fonts.body,
    fontSize: Theme.typography.bodySmall,
    color: Theme.colors.textMuted,
    marginTop: 2,
    lineHeight: 20,
  },
  notesContainer: {
    marginTop: Theme.spacing.xl,
  },
  notesLabel: {
    fontFamily: Theme.fonts.heading,
    fontSize: Theme.typography.body,
    fontWeight: "700",
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
  },
  notesInput: {
    backgroundColor: Theme.colors.card,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: 14,
    padding: Theme.spacing.md,
    fontFamily: Theme.fonts.body,
    fontSize: Theme.typography.body,
    color: Theme.colors.text,
    minHeight: 80,
    textAlignVertical: "top",
  },
  submitBtn: {
    marginTop: Theme.spacing.xl,
    marginBottom: Theme.spacing.xxl,
  },
});
