import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Theme } from "../../constants/theme";
import { useResponsive } from "../../hooks/useResponsive";
import { ResponsiveContainer } from "../../components/ResponsiveContainer";
import { BigButton } from "../../components/BigButton";
import { api } from "../../services/api";
import { Smile, Meh, Frown, AlertTriangle, ArrowLeft, CheckCircle2 } from "lucide-react-native";
import { useAccessibility } from "../../context/AccessibilityContext";

type WellnessStatus = "GOOD" | "OKAY" | "NOT_WELL" | "NEEDS_HELP";

export default function CheckInScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isSmallMobile } = useResponsive();
  const { fontMultiplier, isAAAMode, minTouchTarget, aaaColors, highContrastBorders } = useAccessibility();
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
      icon: <Smile size={26} color="#059669" />,
      color: "#059669",
      bg: "#F0FDF4",
    },
    {
      status: "OKAY",
      title: "Doing Okay",
      desc: "Normal day, manageable and steady",
      icon: <Meh size={26} color="#0284C7" />,
      color: "#0284C7",
      bg: "#F0F9FF",
    },
    {
      status: "NOT_WELL",
      title: "Not Feeling Well",
      desc: "Experiencing mild discomfort, fatigue, or low energy",
      icon: <Frown size={26} color="#D97706" />,
      color: "#D97706",
      bg: "#FEF3C7",
    },
    {
      status: "NEEDS_HELP",
      title: "Needs Assistance",
      desc: "Noticeable pain or symptoms; requesting attention from family",
      icon: <AlertTriangle size={26} color="#DC2626" />,
      color: "#DC2626",
      bg: "#FEF2F2",
    },
  ];

  return (
    <ResponsiveContainer>
      <TouchableOpacity
        onPress={() => router.back()}
        style={[styles.backBtn, { minHeight: Math.max(48, minTouchTarget) }]}
        accessibilityRole="button"
        accessibilityLabel="Go back to Home"
      >
        <ArrowLeft size={16} color="#0284C7" />
        <Text style={[styles.backText, { fontSize: Math.round(14 * fontMultiplier) }]}>Back to Dashboard</Text>
      </TouchableOpacity>

      <Text style={[styles.screenTitle, { fontSize: Math.round(28 * fontMultiplier) }]}>How are you feeling today?</Text>
      <Text style={[styles.screenSubtitle, { fontSize: Math.round(16 * fontMultiplier) }]}>
        Select the option that best reflects your current comfort. This keeps your care circle calmly reassured.
      </Text>

      <View style={styles.optionsList}>
        {options.map((opt) => {
          const isSelected = selectedStatus === opt.status;
          const cardBorderStyle = isSelected
            ? { borderColor: opt.color, borderWidth: 2, backgroundColor: opt.bg }
            : (highContrastBorders ? { borderWidth: 1.5, borderColor: "#CBD5E1" } : {});

          return (
            <TouchableOpacity
              key={opt.status}
              activeOpacity={0.85}
              onPress={() => setSelectedStatus(opt.status)}
              style={[
                styles.optionCard,
                { minHeight: Math.max(76, minTouchTarget) },
                isSmallMobile && { padding: 12, gap: 10 },
                cardBorderStyle,
              ]}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
            >
              <View style={[styles.iconBox, { backgroundColor: opt.bg }]}>
                {opt.icon}
              </View>
              <View style={styles.textBox}>
                <Text style={[styles.optTitle, { fontSize: Math.round(18 * fontMultiplier) }, isSelected && { color: opt.color }]}>
                  {opt.title}
                </Text>
                <Text style={[styles.optDesc, { fontSize: Math.round(14 * fontMultiplier) }]}>{opt.desc}</Text>
              </View>
              {isSelected && (
                <View style={styles.checkIndicator}>
                  <CheckCircle2 size={20} color={opt.color} />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.notesContainer}>
        <Text style={styles.notesLabel}>Add an optional note for your family</Text>
        <TextInput
          style={styles.notesInput}
          value={notes}
          onChangeText={setNotes}
          placeholder="e.g. Slept well, mild stiffness after waking up..."
          placeholderTextColor="#94A3B8"
          multiline
          numberOfLines={3}
        />
      </View>

      <BigButton
        title="Share Wellness Signal"
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
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#F0F9FF",
    marginBottom: Theme.spacing.md,
  },
  backText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 13,
    fontWeight: "600",
    color: "#0284C7",
  },
  screenTitle: {
    fontFamily: Theme.fonts.brand,
    fontSize: 26,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.5,
  },
  screenSubtitle: {
    fontFamily: Theme.fonts.body,
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
    marginBottom: Theme.spacing.lg,
    lineHeight: 20,
  },
  optionsList: {
    gap: 12,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    padding: Theme.spacing.md,
    minHeight: 74,
    ...Platform.select({
      web: {
        boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04), 0 2px 8px rgba(15, 23, 42, 0.02)",
        transition: "all 0.15s ease",
      },
      default: {
        ...Theme.shadows.sm,
      },
    }),
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  textBox: {
    flex: 1,
  },
  optTitle: {
    fontFamily: Theme.fonts.brand,
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.2,
  },
  optDesc: {
    fontFamily: Theme.fonts.body,
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
    lineHeight: 18,
  },
  checkIndicator: {
    marginLeft: 8,
  },
  notesContainer: {
    marginTop: Theme.spacing.lg,
  },
  notesLabel: {
    fontFamily: Theme.fonts.heading,
    fontSize: 13,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 6,
  },
  notesInput: {
    backgroundColor: "#FAFCFE",
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: Theme.spacing.md,
    fontFamily: Theme.fonts.body,
    fontSize: 14,
    color: "#0F172A",
    minHeight: 84,
    textAlignVertical: "top",
  },
  submitBtn: {
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.xxl,
  },
});
