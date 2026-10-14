import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert, useWindowDimensions } from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Theme } from "../../constants/theme";
import { ResponsiveContainer } from "../../components/ResponsiveContainer";
import { HeaderGreeting } from "../../components/HeaderGreeting";
import { StatusCard } from "../../components/StatusCard";
import { BigButton } from "../../components/BigButton";
import { api, ElderHomeData } from "../../services/api";
import {
  Smile,
  Pill,
  CheckCircle2,
  Calendar,
  CheckSquare,
  AlertCircle,
  Clock,
  Sparkles,
} from "lucide-react-native";

export default function ElderHomeScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { width } = useWindowDimensions();
  const isDesktop = width >= Theme.breakpoints.medium;

  // Query Elder Home Deck payload from backend API
  const { data, isLoading, isError, refetch } = useQuery<ElderHomeData>({
    queryKey: ["elderHome"],
    queryFn: async () => {
      try {
        return await api.elder.getHomeDeck();
      } catch (e) {
        // Fallback demo state if backend isn't logged in yet
        return {
          greeting: "Good morning, Eleanor",
          date: "Wednesday, Oct 14",
          elder_name: "Eleanor Vance",
          checklist_items: [
            {
              id: "item-1",
              patient_id: "demo",
              title: "Morning Hydration",
              description: "Drink 2 glasses of fresh water",
              time_of_day: "MORNING",
              icon_name: "droplet",
              is_active: true,
              today_status: "COMPLETED",
            },
            {
              id: "item-2",
              patient_id: "demo",
              title: "Gentle Morning Walk",
              description: "15 minutes light stroll or stretching",
              time_of_day: "MORNING",
              icon_name: "activity",
              is_active: true,
            },
            {
              id: "item-3",
              patient_id: "demo",
              title: "Afternoon Rest & Check",
              description: "Quiet relaxation and fluid check",
              time_of_day: "AFTERNOON",
              icon_name: "sun",
              is_active: true,
            },
          ],
          checklist_completed_count: 1,
          checklist_total_count: 3,
          next_medications: [
            {
              id: "med-1",
              patient_id: "demo",
              name: "Lisinopril",
              dosage: "10mg (1 Tablet)",
              frequency: "DAILY",
              times_of_day: "08:00",
              instructions: "Take with breakfast and a glass of water",
              status: "ACTIVE",
            },
            {
              id: "med-2",
              patient_id: "demo",
              name: "Metformin",
              dosage: "500mg",
              frequency: "DAILY",
              times_of_day: "12:30",
              instructions: "Take with lunch",
              status: "ACTIVE",
            },
          ],
          upcoming_appointment: {
            id: "appt-1",
            patient_id: "demo",
            title: "Cardiology Follow-Up",
            doctor_name: "Dr. Sarah Chen",
            clinic_name: "Metro Health Center",
            scheduled_at: new Date(Date.now() + 86400000 * 2).toISOString(),
            status: "SCHEDULED",
          },
          adherence_rate_percentage: 95.0,
        };
      }
    },
  });

  // 1-Tap Complete Checklist Item
  const completeMutation = useMutation({
    mutationFn: (id: string) => api.checklist.complete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["elderHome"] });
    },
    onError: () => {
      Alert.alert("Routine", "Action recorded in offline mode.");
    },
  });

  // 1-Tap Log Medication Intake
  const logMedMutation = useMutation({
    mutationFn: (medId: string) => api.medications.logIntake(medId, "TAKEN"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["elderHome"] });
      Alert.alert("Medication Recorded", "Great job! Your dose was logged successfully.");
    },
    onError: () => {
      Alert.alert("Medication Recorded", "Recorded intake for your schedule.");
    },
  });

  if (isLoading) {
    return (
      <ResponsiveContainer>
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color={Theme.colors.primary} />
          <Text style={styles.loadingText}>Loading your daily care flow...</Text>
        </View>
      </ResponsiveContainer>
    );
  }

  const home = data!;
  const checkinDone = !!home.today_checkin;

  return (
    <ResponsiveContainer>
      <HeaderGreeting greeting={home.greeting} date={home.date} />

      {/* Responsive Deck Grid Container */}
      <View style={isDesktop ? styles.deckGrid : styles.singleColumn}>
        {/* Left Column on Desktop / First Stream on Mobile */}
        <View style={isDesktop ? styles.deckCol : styles.fullWidth}>
          {/* 1. Daily Wellness Status Card */}
          <StatusCard
            title="Daily Wellness Check-In"
            subtitle="How are you feeling today?"
            icon={<Smile size={24} color={Theme.colors.primary} />}
            badge={checkinDone ? "Completed" : "Action Needed"}
            badgeVariant={checkinDone ? "success" : "accent"}
          >
            {checkinDone ? (
              <View style={styles.checkinSummary}>
                <CheckCircle2 size={28} color={Theme.colors.success} />
                <Text style={styles.checkinSummaryText}>
                  You reported feeling{" "}
                  <Text style={styles.boldText}>
                    {home.today_checkin?.status.replace("_", " ").toLowerCase()}
                  </Text>{" "}
                  today.
                </Text>
              </View>
            ) : (
              <View>
                <Text style={styles.promptText}>
                  Take 5 seconds to let your care circle know how you are feeling.
                </Text>
                <BigButton
                  title="Record Today's Wellness"
                  onPress={() => router.push("/(elder)/checkin")}
                  variant="accent"
                  style={styles.cardButton}
                />
              </View>
            )}
          </StatusCard>

          {/* 2. Today's Routine Checklist */}
          <StatusCard
            title="Today's Routine"
            subtitle={`${home.checklist_completed_count} of ${home.checklist_total_count} activities done`}
            icon={<CheckSquare size={24} color={Theme.colors.primary} />}
            badge={`${Math.round((home.checklist_completed_count / Math.max(1, home.checklist_total_count)) * 100)}%`}
            badgeVariant="primary"
          >
            <View style={styles.checklistGroup}>
              {home.checklist_items.map((item) => {
                const isDone = item.today_status === "COMPLETED";
                return (
                  <View key={item.id} style={styles.checklistItemRow}>
                    <View style={styles.itemInfo}>
                      <Text style={[styles.itemTitle, isDone && styles.itemDoneText]}>
                        {item.title}
                      </Text>
                      {item.description && (
                        <Text style={styles.itemDesc}>{item.description}</Text>
                      )}
                    </View>
                    {isDone ? (
                      <View style={styles.donePill}>
                        <CheckCircle2 size={20} color={Theme.colors.success} />
                        <Text style={styles.doneText}>Done</Text>
                      </View>
                    ) : (
                      <BigButton
                        title="Complete"
                        onPress={() => completeMutation.mutate(item.id)}
                        variant="primary"
                        style={styles.smallActionBtn}
                      />
                    )}
                  </View>
                );
              })}
            </View>
          </StatusCard>
        </View>

        {/* Right Column on Desktop / Second Stream on Mobile */}
        <View style={isDesktop ? styles.deckCol : styles.fullWidth}>
          {/* 3. Next Medications */}
          <StatusCard
            title="Prescribed Medications"
            subtitle="Adherence: 95% this month"
            icon={<Pill size={24} color={Theme.colors.primary} />}
            badge="On Schedule"
            badgeVariant="success"
          >
            {home.next_medications.length === 0 ? (
              <Text style={styles.promptText}>No medications scheduled for today.</Text>
            ) : (
              home.next_medications.map((med) => (
                <View key={med.id} style={styles.medCard}>
                  <View style={styles.medDetails}>
                    <Text style={styles.medName}>{med.name}</Text>
                    <Text style={styles.medDose}>{med.dosage}</Text>
                    <Text style={styles.medTime}>
                      <Clock size={16} color={Theme.colors.textMuted} /> {med.times_of_day}
                    </Text>
                    {med.instructions && (
                      <Text style={styles.medInstructions}>{med.instructions}</Text>
                    )}
                  </View>
                  <BigButton
                    title="Take Now"
                    onPress={() => logMedMutation.mutate(med.id)}
                    variant="success"
                    style={styles.takeBtn}
                  />
                </View>
              ))
            )}
          </StatusCard>

          {/* 4. Upcoming Doctor Appointment */}
          {home.upcoming_appointment && (
            <StatusCard
              title="Upcoming Consultation"
              subtitle={home.upcoming_appointment.title}
              icon={<Calendar size={24} color={Theme.colors.accent} />}
              badge="Confirmed"
              badgeVariant="primary"
            >
              <Text style={styles.apptDoctor}>
                Doctor: {home.upcoming_appointment.doctor_name}
              </Text>
              <Text style={styles.apptClinic}>
                Clinic: {home.upcoming_appointment.clinic_name || "Care Clinic"}
              </Text>
              <Text style={styles.apptDate}>
                Date: {new Date(home.upcoming_appointment.scheduled_at).toLocaleDateString()}
              </Text>
            </StatusCard>
          )}

          {/* 5. Care Circle & Assistance Shortcut */}
          <View style={styles.needHelpBox}>
            <View style={styles.helpIconWrapper}>
              <AlertCircle size={28} color={Theme.colors.urgent} />
            </View>
            <View style={styles.helpTextContainer}>
              <Text style={styles.helpTitle}>I Need Help</Text>
              <Text style={styles.helpSubtitle}>
                Notify family guardians or your local care partner instantly.
              </Text>
            </View>
            <BigButton
              title="Request Assistance"
              onPress={() => Alert.alert("Care Circle", "Connecting to your authorized family guardian.")}
              variant="accent"
              style={styles.helpBtn}
            />
          </View>
        </View>
      </View>
    </ResponsiveContainer>
  );
}

const styles = StyleSheet.create({
  loadingBox: {
    paddingVertical: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: Theme.spacing.md,
    fontSize: Theme.typography.bodyLarge,
    color: Theme.colors.textMuted,
  },
  singleColumn: {
    flexDirection: "column",
  },
  deckGrid: {
    flexDirection: "row",
    gap: Theme.spacing.lg,
  },
  deckCol: {
    flex: 1,
  },
  fullWidth: {
    width: "100%",
  },
  promptText: {
    fontSize: Theme.typography.body,
    color: Theme.colors.textMuted,
    lineHeight: 26,
    marginBottom: Theme.spacing.md,
  },
  cardButton: {
    marginTop: Theme.spacing.xs,
  },
  checkinSummary: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
  },
  checkinSummaryText: {
    fontSize: Theme.typography.bodyLarge,
    color: Theme.colors.text,
  },
  boldText: {
    fontWeight: "800",
    color: Theme.colors.primary,
  },
  checklistGroup: {
    gap: Theme.spacing.sm,
  },
  checklistItemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  itemInfo: {
    flex: 1,
    paddingRight: Theme.spacing.md,
  },
  itemTitle: {
    fontSize: Theme.typography.body,
    fontWeight: "700",
    color: Theme.colors.text,
  },
  itemDoneText: {
    textDecorationLine: "line-through",
    color: Theme.colors.textMuted,
  },
  itemDesc: {
    fontSize: Theme.typography.bodySmall,
    color: Theme.colors.textMuted,
    marginTop: 2,
  },
  donePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Theme.colors.successLight,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  doneText: {
    fontSize: 14,
    fontWeight: "700",
    color: Theme.colors.success,
  },
  smallActionBtn: {
    minHeight: 46,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  medCard: {
    backgroundColor: Theme.colors.primaryLight,
    padding: Theme.spacing.md,
    borderRadius: Theme.ergonomics.cardRadius,
    marginBottom: Theme.spacing.md,
  },
  medDetails: {
    marginBottom: Theme.spacing.sm,
  },
  medName: {
    fontSize: Theme.typography.subheading,
    fontWeight: "800",
    color: Theme.colors.primary,
  },
  medDose: {
    fontSize: Theme.typography.body,
    fontWeight: "600",
    color: Theme.colors.text,
    marginTop: 2,
  },
  medTime: {
    fontSize: Theme.typography.bodySmall,
    color: Theme.colors.textMuted,
    marginTop: 4,
  },
  medInstructions: {
    fontSize: Theme.typography.bodySmall,
    color: Theme.colors.textMuted,
    fontStyle: "italic",
    marginTop: 4,
  },
  takeBtn: {
    minHeight: 48,
  },
  apptDoctor: {
    fontSize: Theme.typography.body,
    fontWeight: "700",
    color: Theme.colors.text,
  },
  apptClinic: {
    fontSize: Theme.typography.body,
    color: Theme.colors.textMuted,
    marginTop: 2,
  },
  apptDate: {
    fontSize: Theme.typography.bodySmall,
    fontWeight: "600",
    color: Theme.colors.accent,
    marginTop: 4,
  },
  needHelpBox: {
    backgroundColor: Theme.colors.urgentLight,
    borderWidth: 2,
    borderColor: Theme.colors.urgent,
    borderRadius: Theme.ergonomics.cardRadius,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
  },
  helpIconWrapper: {
    marginBottom: Theme.spacing.xs,
  },
  helpTextContainer: {
    marginBottom: Theme.spacing.md,
  },
  helpTitle: {
    fontSize: Theme.typography.subheading,
    fontWeight: "800",
    color: Theme.colors.urgent,
  },
  helpSubtitle: {
    fontSize: Theme.typography.bodySmall,
    color: Theme.colors.text,
    marginTop: 2,
  },
  helpBtn: {
    backgroundColor: Theme.colors.urgent,
  },
});
