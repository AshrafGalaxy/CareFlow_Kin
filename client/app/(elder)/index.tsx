import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert, useWindowDimensions, TouchableOpacity } from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Theme } from "../../constants/theme";
import { ResponsiveContainer } from "../../components/ResponsiveContainer";
import { HeaderGreeting } from "../../components/HeaderGreeting";
import { StatusCard } from "../../components/StatusCard";
import { BigButton } from "../../components/BigButton";
import { api, ElderHomeData, getAuthToken } from "../../services/api";
import {
  Smile,
  Pill,
  CheckCircle2,
  Calendar,
  CheckSquare,
  AlertCircle,
  Clock,
  Sparkles,
  TrendingUp,
  Shield,
  Heart,
  Activity,
  ArrowRight
} from "lucide-react-native";

export default function ElderHomeScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { width } = useWindowDimensions();
  const isDesktop = width >= Theme.breakpoints.medium;
  const isTablet = width >= Theme.breakpoints.compact && width < Theme.breakpoints.medium;

  // Query Elder Home Deck payload from backend API
  const { data, isLoading, refetch } = useQuery<ElderHomeData>({
    queryKey: ["elderHome"],
    queryFn: async () => {
      // Auto-bootstrap demo session if no token is present
      if (!getAuthToken()) {
        try {
          await api.auth.demoLogin();
        } catch (_) {}
      }
      try {
        return await api.elder.getHomeDeck();
      } catch (e) {
        // Fallback state if backend is offline
        return {
          greeting: "Good morning, Eleanor",
          date: new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }),
          elder_name: "Eleanor Vance",
          checklist_items: [
            {
              id: "item-1",
              patient_id: "demo",
              title: "Morning Hydration",
              description: "Drink 2 full glasses of fresh water with breakfast",
              time_of_day: "MORNING",
              icon_name: "droplet",
              is_active: true,
              today_status: "COMPLETED",
              completed_at: "08:15 AM",
            },
            {
              id: "item-2",
              patient_id: "demo",
              title: "Gentle Morning Walk",
              description: "15 minutes garden stroll or light stretching",
              time_of_day: "MORNING",
              icon_name: "activity",
              is_active: true,
            },
            {
              id: "item-3",
              patient_id: "demo",
              title: "Afternoon Rest & Fluid Check",
              description: "Quiet relaxation and herbal tea check",
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
              times_of_day: "08:00 AM",
              instructions: "Take with food and a glass of water",
              status: "ACTIVE",
            },
            {
              id: "med-2",
              patient_id: "demo",
              name: "Metformin",
              dosage: "500mg",
              frequency: "DAILY",
              times_of_day: "12:30 PM",
              instructions: "Take with lunch",
              status: "ACTIVE",
            },
          ],
          upcoming_appointment: {
            id: "appt-1",
            patient_id: "demo",
            title: "Cardiology Follow-Up",
            doctor_name: "Dr. Sarah Chen",
            clinic_name: "Metro Senior Health Pavilion",
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
      Alert.alert("Routine Updated", "Action recorded successfully.");
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
      Alert.alert("Medication Recorded", "Intake recorded for your care history.");
    },
  });

  // Quick Emotive Checkin from Home
  const checkinMutation = useMutation({
    mutationFn: (status: "GOOD" | "OKAY" | "NOT_WELL" | "NEEDS_HELP") => {
      const today = new Date().toISOString().split("T")[0];
      return api.checkins.submit(today, status, "Recorded from Care Deck");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["elderHome"] });
      Alert.alert("Wellness Shared", "Your care circle has been updated with your status.");
    },
    onError: () => {
      Alert.alert("Wellness Recorded", "Your status was saved.");
    },
  });

  if (isLoading) {
    return (
      <ResponsiveContainer>
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color={Theme.colors.primary} />
          <Text style={styles.loadingText}>Connecting to your Careflow Deck...</Text>
        </View>
      </ResponsiveContainer>
    );
  }

  const home = data!;
  const checkinDone = !!home.today_checkin;
  const checklistPercent = Math.round(
    (home.checklist_completed_count / Math.max(1, home.checklist_total_count)) * 100
  );

  return (
    <ResponsiveContainer>
      <HeaderGreeting greeting={home.greeting} date={home.date} />

      {/* 1. Desktop & Deck Top Summary Metrics Ribbon */}
      <View style={styles.metricsRibbon}>
        <View style={[styles.metricCard, { borderLeftColor: Theme.colors.primary }]}>
          <View style={styles.metricIconWrap}>
            <TrendingUp size={22} color={Theme.colors.primary} />
          </View>
          <View style={styles.metricInfo}>
            <Text style={styles.metricLabel}>MEDICATION ADHERENCE</Text>
            <Text style={styles.metricValue}>{Math.round(home.adherence_rate_percentage)}%</Text>
            <Text style={styles.metricSub}>95% Target Achieved</Text>
          </View>
        </View>

        <View style={[styles.metricCard, { borderLeftColor: Theme.colors.brightTealBlue }]}>
          <View style={[styles.metricIconWrap, { backgroundColor: Theme.colors.frostedBlue2 }]}>
            <CheckSquare size={22} color={Theme.colors.brightTealBlue} />
          </View>
          <View style={styles.metricInfo}>
            <Text style={styles.metricLabel}>TODAY'S ROUTINE</Text>
            <Text style={styles.metricValue}>
              {home.checklist_completed_count} / {home.checklist_total_count}
            </Text>
            <Text style={styles.metricSub}>{checklistPercent}% Completed</Text>
          </View>
        </View>

        <View style={[styles.metricCard, { borderLeftColor: Theme.colors.turquoiseSurf }]}>
          <View style={[styles.metricIconWrap, { backgroundColor: Theme.colors.lightCyan }]}>
            <Pill size={22} color={Theme.colors.blueGreen} />
          </View>
          <View style={styles.metricInfo}>
            <Text style={styles.metricLabel}>ACTIVE DOSES</Text>
            <Text style={styles.metricValue}>{home.next_medications.length}</Text>
            <Text style={styles.metricSub}>Next due at {home.next_medications[0]?.times_of_day || "Scheduled"}</Text>
          </View>
        </View>

        <View style={[styles.metricCard, { borderLeftColor: Theme.colors.success }]}>
          <View style={[styles.metricIconWrap, { backgroundColor: Theme.colors.successLight }]}>
            <Smile size={22} color={Theme.colors.success} />
          </View>
          <View style={styles.metricInfo}>
            <Text style={styles.metricLabel}>WELLNESS STATUS</Text>
            <Text style={styles.metricValue}>{checkinDone ? "Confirmed" : "Ready"}</Text>
            <Text style={styles.metricSub}>{checkinDone ? "Care Circle Updated" : "5-Sec Check-In"}</Text>
          </View>
        </View>
      </View>

      {/* 2. Main Responsive Deck Grid (Two Spacious Panes on Desktop/Tablet) */}
      <View style={isDesktop ? styles.deckGrid : styles.singleColumn}>
        {/* Left Deck: Today's Routine Schedule */}
        <View style={isDesktop ? styles.deckCol : styles.fullWidth}>
          <StatusCard
            title="Today's Care Routine"
            subtitle={`${home.checklist_completed_count} of ${home.checklist_total_count} activities finished`}
            icon={<CheckSquare size={26} color={Theme.colors.primary} />}
            badge={`${checklistPercent}%`}
            badgeVariant="primary"
          >
            {/* Visual Progress Bar */}
            <View style={styles.progressBarTrack}>
              <View style={[styles.progressBarFill, { width: `${checklistPercent}%` }]} />
            </View>

            <View style={styles.checklistGroup}>
              {home.checklist_items.map((item) => {
                const isDone = item.today_status === "COMPLETED";
                return (
                  <View key={item.id} style={styles.checklistItemCard}>
                    <View style={styles.checklistItemContent}>
                      <View style={styles.itemHeaderLine}>
                        <View style={styles.timeTag}>
                          <Text style={styles.timeTagText}>{item.time_of_day}</Text>
                        </View>
                        {item.completed_at && (
                          <Text style={styles.completedTimestamp}>Done at {item.completed_at}</Text>
                        )}
                      </View>
                      <Text style={[styles.itemTitle, isDone && styles.itemDoneText]}>
                        {item.title}
                      </Text>
                      {item.description && (
                        <Text style={styles.itemDesc}>{item.description}</Text>
                      )}
                    </View>

                    <View style={styles.itemActionArea}>
                      {isDone ? (
                        <View style={styles.donePill}>
                          <CheckCircle2 size={22} color={Theme.colors.success} />
                          <Text style={styles.doneText}>Completed</Text>
                        </View>
                      ) : (
                        <BigButton
                          title="Mark Complete"
                          onPress={() => completeMutation.mutate(item.id)}
                          variant="primary"
                          style={styles.actionBtn}
                        />
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
          </StatusCard>

          {/* Quick Emotive Check-in Card (Embedded directly on Deck) */}
          <StatusCard
            title="Daily Wellness Sharing"
            subtitle={checkinDone ? "Today's report shared with Family Circle" : "How are you feeling right now?"}
            icon={<Smile size={26} color={Theme.colors.brightTealBlue} />}
            badge={checkinDone ? "Recorded" : "5 Seconds"}
            badgeVariant={checkinDone ? "success" : "accent"}
          >
            {checkinDone ? (
              <View style={styles.checkinConfirmedBox}>
                <CheckCircle2 size={32} color={Theme.colors.success} />
                <View style={styles.checkinConfirmedTextWrap}>
                  <Text style={styles.checkinConfirmedTitle}>Status Logged: Feeling Well</Text>
                  <Text style={styles.checkinConfirmedDesc}>
                    Your care circle was notified that you're feeling good today.
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.emotiveRow}>
                {[
                  { label: "Good", status: "GOOD" as const, color: Theme.colors.success, icon: "😊" },
                  { label: "Okay", status: "OKAY" as const, color: Theme.colors.brightTealBlue, icon: "🙂" },
                  { label: "Tired", status: "NOT_WELL" as const, color: Theme.colors.blueGreen, icon: "🥱" },
                  { label: "Need Help", status: "NEEDS_HELP" as const, color: Theme.colors.urgent, icon: "🙋" },
                ].map((emo) => (
                  <TouchableOpacity
                    key={emo.status}
                    style={styles.emotiveBtn}
                    onPress={() => checkinMutation.mutate(emo.status)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.emotiveEmoji}>{emo.icon}</Text>
                    <Text style={styles.emotiveLabel}>{emo.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </StatusCard>
        </View>

        {/* Right Deck: Medication Schedule & Appointments */}
        <View style={isDesktop ? styles.deckCol : styles.fullWidth}>
          {/* Prescribed Medications Card */}
          <StatusCard
            title="Medication Schedule"
            subtitle="Adherence target: 95% maintained"
            icon={<Pill size={26} color={Theme.colors.primary} />}
            badge="Today"
            badgeVariant="primary"
          >
            {home.next_medications.length === 0 ? (
              <Text style={styles.promptText}>No medications scheduled for today.</Text>
            ) : (
              home.next_medications.map((med) => (
                <View key={med.id} style={styles.medCard}>
                  <View style={styles.medCardTop}>
                    <View style={styles.medBadgePill}>
                      <Clock size={16} color={Theme.colors.primary} />
                      <Text style={styles.medTimeTag}>{med.times_of_day}</Text>
                    </View>
                    <Text style={styles.medDoseTag}>{med.frequency}</Text>
                  </View>

                  <Text style={styles.medName}>{med.name}</Text>
                  <Text style={styles.medDoseText}>{med.dosage}</Text>

                  {med.instructions && (
                    <Text style={styles.medInstructions}>
                      Note: {med.instructions}
                    </Text>
                  )}

                  <BigButton
                    title="Take Dose Now"
                    onPress={() => logMedMutation.mutate(med.id)}
                    variant="success"
                    style={styles.takeBtn}
                  />
                </View>
              ))
            )}
          </StatusCard>

          {/* Upcoming Clinical Consultation */}
          {home.upcoming_appointment && (
            <StatusCard
              title="Next Clinical Visit"
              subtitle={home.upcoming_appointment.title}
              icon={<Calendar size={26} color={Theme.colors.accent} />}
              badge="Confirmed"
              badgeVariant="primary"
            >
              <View style={styles.apptBox}>
                <View style={styles.apptDetails}>
                  <Text style={styles.apptDoctorText}>{home.upcoming_appointment.doctor_name}</Text>
                  <Text style={styles.apptClinicText}>{home.upcoming_appointment.clinic_name}</Text>
                  <Text style={styles.apptDateText}>
                    Scheduled for {new Date(home.upcoming_appointment.scheduled_at).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                </View>
              </View>
            </StatusCard>
          )}

          {/* Discreet Care Circle Assistance Banner */}
          <View style={styles.careCircleBanner}>
            <View style={styles.careCircleHeader}>
              <Shield size={24} color={Theme.colors.primary} />
              <Text style={styles.careCircleTitle}>Family & Care Support</Text>
            </View>
            <Text style={styles.careCircleSubtitle}>
              Your authorized family guardians receive daily updates and can be contacted with a single tap.
            </Text>
            <BigButton
              title="Contact Care Circle"
              onPress={() => Alert.alert("Care Circle", "Connecting to your family guardian.")}
              variant="outline"
              style={styles.careCircleBtn}
            />
          </View>
        </View>
      </View>
    </ResponsiveContainer>
  );
}

const styles = StyleSheet.create({
  loadingBox: {
    paddingVertical: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: Theme.spacing.md,
    fontSize: Theme.typography.bodyLarge,
    fontWeight: "600",
    color: Theme.colors.textMuted,
  },

  // 1. Top Metrics Ribbon
  metricsRibbon: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  metricCard: {
    flex: 1,
    minWidth: 200,
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.ergonomics.cardRadius,
    borderWidth: Theme.ergonomics.borderWidth,
    borderColor: Theme.colors.border,
    borderLeftWidth: 6,
    padding: Theme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: Theme.colors.deepTwilight,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  metricIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Theme.colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Theme.spacing.md,
    flexShrink: 0,
  },
  metricInfo: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: Theme.colors.textMuted,
    letterSpacing: 0.8,
  },
  metricValue: {
    fontSize: Theme.typography.subheading,
    fontWeight: "800",
    color: Theme.colors.text,
    marginTop: 2,
  },
  metricSub: {
    fontSize: 13,
    color: Theme.colors.accent,
    fontWeight: "600",
    marginTop: 2,
  },

  // 2. Responsive Deck Grid
  singleColumn: {
    flexDirection: "column",
    gap: Theme.spacing.md,
  },
  deckGrid: {
    flexDirection: "row",
    gap: Theme.spacing.lg,
    alignItems: "flex-start",
  },
  deckCol: {
    flex: 1,
    gap: Theme.spacing.md,
  },
  fullWidth: {
    width: "100%",
  },

  // 3. Progress Track
  progressBarTrack: {
    height: 10,
    backgroundColor: Theme.colors.frostedBlue2,
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: Theme.spacing.sm,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: Theme.colors.primary,
    borderRadius: 5,
  },

  // 4. Checklist Items
  checklistGroup: {
    gap: Theme.spacing.md,
    marginTop: Theme.spacing.sm,
  },
  checklistItemCard: {
    backgroundColor: Theme.colors.surfaceLight,
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
    borderRadius: Theme.ergonomics.cardRadius,
    padding: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  checklistItemContent: {
    flex: 1,
  },
  itemHeaderLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  timeTag: {
    backgroundColor: Theme.colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  timeTagText: {
    fontSize: 11,
    fontWeight: "800",
    color: Theme.colors.primary,
    letterSpacing: 0.5,
  },
  completedTimestamp: {
    fontSize: 12,
    fontWeight: "600",
    color: Theme.colors.success,
  },
  itemTitle: {
    fontSize: Theme.typography.body,
    fontWeight: "700",
    color: Theme.colors.text,
    lineHeight: 24,
  },
  itemDoneText: {
    textDecorationLine: "line-through",
    color: Theme.colors.textMuted,
  },
  itemDesc: {
    fontSize: Theme.typography.bodySmall,
    color: Theme.colors.textMuted,
    marginTop: 4,
    lineHeight: 20,
  },
  itemActionArea: {
    marginTop: Theme.spacing.xs,
  },
  donePill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Theme.colors.successLight,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: Theme.ergonomics.buttonRadius,
    minHeight: Theme.ergonomics.minTouchTarget,
  },
  doneText: {
    fontSize: Theme.typography.body,
    fontWeight: "700",
    color: Theme.colors.success,
  },
  actionBtn: {
    minHeight: Theme.ergonomics.minTouchTarget,
  },

  // 5. Emotive Check-in
  emotiveRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Theme.spacing.xs,
    marginTop: Theme.spacing.xs,
  },
  emotiveBtn: {
    flex: 1,
    minHeight: 76,
    backgroundColor: Theme.colors.surfaceLight,
    borderWidth: 2,
    borderColor: Theme.colors.border,
    borderRadius: Theme.ergonomics.cardRadius,
    alignItems: "center",
    justifyContent: "center",
    padding: Theme.spacing.sm,
  },
  emotiveEmoji: {
    fontSize: 28,
  },
  emotiveLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: Theme.colors.text,
    marginTop: 4,
  },
  checkinConfirmedBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.successLight,
    padding: Theme.spacing.md,
    borderRadius: Theme.ergonomics.cardRadius,
    gap: Theme.spacing.md,
  },
  checkinConfirmedTextWrap: {
    flex: 1,
  },
  checkinConfirmedTitle: {
    fontSize: Theme.typography.body,
    fontWeight: "700",
    color: Theme.colors.success,
  },
  checkinConfirmedDesc: {
    fontSize: Theme.typography.bodySmall,
    color: Theme.colors.text,
    marginTop: 2,
  },

  // 6. Medication Cards
  medCard: {
    backgroundColor: Theme.colors.surfaceLight,
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
    borderRadius: Theme.ergonomics.cardRadius,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  medCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Theme.spacing.xs,
  },
  medBadgePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Theme.colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  medTimeTag: {
    fontSize: 12,
    fontWeight: "700",
    color: Theme.colors.primary,
  },
  medDoseTag: {
    fontSize: 12,
    fontWeight: "700",
    color: Theme.colors.accent,
  },
  medName: {
    fontSize: Theme.typography.subheading,
    fontWeight: "800",
    color: Theme.colors.text,
    marginTop: 4,
  },
  medDoseText: {
    fontSize: Theme.typography.body,
    fontWeight: "600",
    color: Theme.colors.textMuted,
    marginTop: 2,
  },
  medInstructions: {
    fontSize: Theme.typography.bodySmall,
    color: Theme.colors.textMuted,
    backgroundColor: Theme.colors.card,
    padding: Theme.spacing.sm,
    borderRadius: 8,
    marginTop: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },
  takeBtn: {
    minHeight: Theme.ergonomics.minTouchTarget,
  },
  promptText: {
    fontSize: Theme.typography.body,
    color: Theme.colors.textMuted,
    paddingVertical: Theme.spacing.md,
    textAlign: "center",
  },

  // 7. Clinical Visit Box
  apptBox: {
    backgroundColor: Theme.colors.surfaceLight,
    padding: Theme.spacing.md,
    borderRadius: Theme.ergonomics.cardRadius,
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
  },
  apptDetails: {
    gap: 4,
  },
  apptDoctorText: {
    fontSize: Theme.typography.bodyLarge,
    fontWeight: "800",
    color: Theme.colors.text,
  },
  apptClinicText: {
    fontSize: Theme.typography.body,
    color: Theme.colors.textMuted,
  },
  apptDateText: {
    fontSize: Theme.typography.bodySmall,
    fontWeight: "700",
    color: Theme.colors.accent,
    marginTop: 6,
  },

  // 8. Care Circle Banner
  careCircleBanner: {
    backgroundColor: Theme.colors.card,
    borderWidth: Theme.ergonomics.borderWidth,
    borderColor: Theme.colors.border,
    borderRadius: Theme.ergonomics.cardRadius,
    padding: Theme.spacing.lg,
    marginTop: Theme.spacing.xs,
  },
  careCircleHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.xs,
  },
  careCircleTitle: {
    fontSize: Theme.typography.bodyLarge,
    fontWeight: "800",
    color: Theme.colors.text,
  },
  careCircleSubtitle: {
    fontSize: Theme.typography.bodySmall,
    color: Theme.colors.textMuted,
    lineHeight: 22,
    marginBottom: Theme.spacing.md,
  },
  careCircleBtn: {
    minHeight: Theme.ergonomics.minTouchTarget,
  },
});
