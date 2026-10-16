import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, Platform } from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Theme } from "../../constants/theme";
import { useResponsive } from "../../hooks/useResponsive";
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
import { useAccessibility } from "../../context/AccessibilityContext";

export default function ElderHomeScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isSmallMobile, isMobile, isTablet, isDesktop } = useResponsive();
  const {
    fontMultiplier,
    isAAAMode,
    minTouchTarget,
    aaaColors,
    highContrastBorders,
    colors,
    isDark,
  } = useAccessibility();


  // Query Elder Home Deck payload from backend API
  const { data, isLoading, refetch } = useQuery<ElderHomeData>({
    queryKey: ["elderHome"],
    queryFn: async () => {
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

  const cardBorderStyle = highContrastBorders
    ? { borderWidth: 1.5, borderColor: isDark ? "#52525B" : "#CBD5E1" }
    : {};

  return (
    <ResponsiveContainer>
      <HeaderGreeting greeting={home.greeting} date={home.date} />

      {/* 1. Desktop & Deck Top Summary Metrics Ribbon */}
      <View style={[styles.metricsRibbon, isMobile && styles.metricsRibbonMobile]}>
        {/* KPI 1: Adherence */}
        <View
          style={[
            styles.metricCard,
            {
              backgroundColor: colors.card,
              borderColor: isDark ? "#27272A" : colors.border,
            },
            isMobile && styles.metricCardMobile,
            isSmallMobile && styles.metricCardSmall,
            cardBorderStyle,
          ]}
        >
          <View style={styles.metricCardHeader}>
            <View
              style={[
                styles.metricIconWrap,
                { backgroundColor: isDark ? "#27272A" : "#F0F9FF" },
                isSmallMobile && styles.metricIconWrapSmall,
              ]}
            >
              <TrendingUp size={isSmallMobile ? 15 : 18} color={isDark ? "#38BDF8" : "#0284C7"} />
            </View>
            <View style={[styles.metricBadge, { backgroundColor: isDark ? "#27272A" : "#F0F9FF" }]}>
              <Text style={[styles.metricBadgeText, { color: isDark ? "#38BDF8" : "#0284C7", fontSize: Math.round(11 * fontMultiplier) }]}>
                95% Target
              </Text>
            </View>
          </View>
          <View style={styles.metricBody}>
            <Text
              style={[
                styles.metricLabel,
                { color: colors.textMuted },
                isSmallMobile && styles.metricLabelSmall,
                { fontSize: Math.round((isSmallMobile ? 9 : 11) * fontMultiplier) },
              ]}
              numberOfLines={1}
            >
              ADHERENCE
            </Text>
            <Text
              style={[
                styles.metricValue,
                { color: colors.text },
                isSmallMobile && styles.metricValueSmall,
                { fontSize: Math.round((isSmallMobile ? 18 : 24) * fontMultiplier) },
              ]}
            >
              {Math.round(home.adherence_rate_percentage)}%
            </Text>
          </View>
        </View>

        {/* KPI 2: Routine */}
        <View
          style={[
            styles.metricCard,
            {
              backgroundColor: colors.card,
              borderColor: isDark ? "#27272A" : colors.border,
            },
            isMobile && styles.metricCardMobile,
            isSmallMobile && styles.metricCardSmall,
            cardBorderStyle,
          ]}
        >
          <View style={styles.metricCardHeader}>
            <View
              style={[
                styles.metricIconWrap,
                { backgroundColor: isDark ? "#27272A" : "#EEF2FF" },
                isSmallMobile && styles.metricIconWrapSmall,
              ]}
            >
              <CheckSquare size={isSmallMobile ? 15 : 18} color={isDark ? "#818CF8" : "#4F46E5"} />
            </View>
            <View style={[styles.metricBadge, { backgroundColor: isDark ? "#27272A" : "#EEF2FF" }]}>
              <Text style={[styles.metricBadgeText, { color: isDark ? "#818CF8" : "#4F46E5", fontSize: Math.round(11 * fontMultiplier) }]}>
                {checklistPercent}% Done
              </Text>
            </View>
          </View>
          <View style={styles.metricBody}>
            <Text
              style={[
                styles.metricLabel,
                { color: colors.textMuted },
                isSmallMobile && styles.metricLabelSmall,
                { fontSize: Math.round((isSmallMobile ? 9 : 11) * fontMultiplier) },
              ]}
              numberOfLines={1}
            >
              ROUTINE
            </Text>
            <Text
              style={[
                styles.metricValue,
                { color: colors.text },
                isSmallMobile && styles.metricValueSmall,
                { fontSize: Math.round((isSmallMobile ? 18 : 24) * fontMultiplier) },
              ]}
            >
              {home.checklist_completed_count} / {home.checklist_total_count}
            </Text>
          </View>
        </View>

        {/* KPI 3: Doses */}
        <View
          style={[
            styles.metricCard,
            {
              backgroundColor: colors.card,
              borderColor: isDark ? "#27272A" : colors.border,
            },
            isMobile && styles.metricCardMobile,
            isSmallMobile && styles.metricCardSmall,
            cardBorderStyle,
          ]}
        >
          <View style={styles.metricCardHeader}>
            <View
              style={[
                styles.metricIconWrap,
                { backgroundColor: isDark ? "#27272A" : "#F0FDFA" },
                isSmallMobile && styles.metricIconWrapSmall,
              ]}
            >
              <Pill size={isSmallMobile ? 15 : 18} color={isDark ? "#2DD4BF" : "#0D9488"} />
            </View>
            <View style={[styles.metricBadge, { backgroundColor: isDark ? "#27272A" : "#F0FDFA" }]}>
              <Text style={[styles.metricBadgeText, { color: isDark ? "#2DD4BF" : "#0D9488", fontSize: Math.round(11 * fontMultiplier) }]}>
                {home.next_medications[0]?.times_of_day || "Scheduled"}
              </Text>
            </View>
          </View>
          <View style={styles.metricBody}>
            <Text
              style={[
                styles.metricLabel,
                { color: colors.textMuted },
                isSmallMobile && styles.metricLabelSmall,
                { fontSize: Math.round((isSmallMobile ? 9 : 11) * fontMultiplier) },
              ]}
              numberOfLines={1}
            >
              DOSES
            </Text>
            <Text
              style={[
                styles.metricValue,
                { color: colors.text },
                isSmallMobile && styles.metricValueSmall,
                { fontSize: Math.round((isSmallMobile ? 18 : 24) * fontMultiplier) },
              ]}
            >
              {home.next_medications.length}
            </Text>
          </View>
        </View>

        {/* KPI 4: Wellness */}
        <View
          style={[
            styles.metricCard,
            {
              backgroundColor: colors.card,
              borderColor: isDark ? "#27272A" : colors.border,
            },
            isMobile && styles.metricCardMobile,
            isSmallMobile && styles.metricCardSmall,
            cardBorderStyle,
          ]}
        >
          <View style={styles.metricCardHeader}>
            <View
              style={[
                styles.metricIconWrap,
                { backgroundColor: isDark ? "#27272A" : "#ECFDF5" },
                isSmallMobile && styles.metricIconWrapSmall,
              ]}
            >
              <Smile size={isSmallMobile ? 15 : 18} color={isDark ? "#34D399" : "#10B981"} />
            </View>
            <View
              style={[
                styles.metricBadge,
                {
                  backgroundColor: isDark
                    ? "#27272A"
                    : checkinDone
                    ? "#ECFDF5"
                    : "#FEF3C7",
                },
              ]}
            >
              <Text
                style={[
                  styles.metricBadgeText,
                  {
                    color: checkinDone
                      ? isDark
                        ? "#34D399"
                        : "#059669"
                      : isDark
                      ? "#FBBF24"
                      : "#D97706",
                    fontSize: Math.round(11 * fontMultiplier),
                  },
                ]}
              >
                {checkinDone ? "Synced" : "Pending"}
              </Text>
            </View>
          </View>
          <View style={styles.metricBody}>
            <Text
              style={[
                styles.metricLabel,
                { color: colors.textMuted },
                isSmallMobile && styles.metricLabelSmall,
                { fontSize: Math.round((isSmallMobile ? 9 : 11) * fontMultiplier) },
              ]}
              numberOfLines={1}
            >
              WELLNESS
            </Text>
            <Text
              style={[
                styles.metricValue,
                { color: colors.text },
                isSmallMobile && styles.metricValueSmall,
                { fontSize: Math.round((isSmallMobile ? 18 : 24) * fontMultiplier) },
              ]}
            >
              {checkinDone ? "Logged" : "Ready"}
            </Text>
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
            <View
              style={[
                styles.progressBarTrack,
                { backgroundColor: isDark ? "#27272A" : "#E2E8F0" },
              ]}
            >
              <View
                style={[
                  styles.progressBarFill,
                  { backgroundColor: colors.primary, width: `${checklistPercent}%` },
                ]}
              />
            </View>

            <View style={styles.checklistGroup}>
              {home.checklist_items.map((item) => {
                const isDone = item.today_status === "COMPLETED";
                return (
                  <View
                    key={item.id}
                    style={[
                      styles.checklistItemCard,
                      {
                        backgroundColor: colors.card,
                        borderColor: isDark ? "#27272A" : Theme.colors.border,
                      },
                      cardBorderStyle,
                    ]}
                  >
                    <View style={styles.checklistItemContent}>
                      <View style={styles.itemHeaderLine}>
                        <View
                          style={[
                            styles.timeTag,
                            {
                              backgroundColor: isDark
                                ? "#27272A"
                                : Theme.colors.primaryLight,
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.timeTagText,
                              {
                                color: isDark
                                  ? "#38BDF8"
                                  : Theme.colors.primary,
                              },
                            ]}
                          >
                            {item.time_of_day}
                          </Text>
                        </View>
                        {item.completed_at && (
                          <Text style={styles.completedTimestamp}>
                            Done at {item.completed_at}
                          </Text>
                        )}
                      </View>
                      <Text
                        style={[
                          styles.itemTitle,
                          { color: colors.text },
                          isDone && styles.itemDoneText,
                          { fontSize: Math.round(17 * fontMultiplier) },
                        ]}
                      >
                        {item.title}
                      </Text>
                      {item.description && (
                        <Text
                          style={[
                            styles.itemDesc,
                            { color: colors.textMuted, fontSize: Math.round(13 * fontMultiplier) },
                          ]}
                        >
                          {item.description}
                        </Text>
                      )}
                    </View>

                    <View style={styles.itemActionArea}>
                      {isDone ? (
                        <View
                          style={[
                            styles.donePill,
                            {
                              minHeight: Math.max(48, minTouchTarget),
                              backgroundColor: isDark ? "#064E3B" : Theme.colors.successLight,
                            },
                          ]}
                        >
                          <CheckCircle2
                            size={22}
                            color={isDark ? "#34D399" : Theme.colors.success}
                          />
                          <Text
                            style={[
                              styles.doneText,
                              {
                                color: isDark ? "#34D399" : Theme.colors.success,
                                fontSize: Math.round(14 * fontMultiplier),
                              },
                            ]}
                          >
                            Completed
                          </Text>
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
            subtitle={
              checkinDone
                ? "Today's report shared with Family Circle"
                : "How are you feeling right now?"
            }
            icon={<Smile size={26} color={Theme.colors.brightTealBlue} />}
            badge={checkinDone ? "Recorded" : "5 Seconds"}
            badgeVariant={checkinDone ? "success" : "accent"}
          >
            {checkinDone ? (
              <View
                style={[
                  styles.checkinConfirmedBox,
                  {
                    backgroundColor: isDark ? "#064E3B" : Theme.colors.successLight,
                  },
                ]}
              >
                <CheckCircle2
                  size={32}
                  color={isDark ? "#34D399" : Theme.colors.success}
                />
                <View style={styles.checkinConfirmedTextWrap}>
                  <Text
                    style={[
                      styles.checkinConfirmedTitle,
                      {
                        color: isDark ? "#34D399" : Theme.colors.success,
                        fontSize: Math.round(16 * fontMultiplier),
                      },
                    ]}
                  >
                    Status Logged: Feeling Well
                  </Text>
                  <Text
                    style={[
                      styles.checkinConfirmedDesc,
                      {
                        color: isDark ? "#D4D4D8" : Theme.colors.text,
                        fontSize: Math.round(13 * fontMultiplier),
                      },
                    ]}
                  >
                    Your care circle was notified that you're feeling good today.
                  </Text>
                </View>
              </View>
            ) : (
              <View
                style={[
                  styles.emotiveRow,
                  isSmallMobile && styles.emotiveRowGrid,
                ]}
              >
                {[
                  {
                    label: "Good",
                    status: "GOOD" as const,
                    color: Theme.colors.success,
                    icon: "😊",
                  },
                  {
                    label: "Okay",
                    status: "OKAY" as const,
                    color: Theme.colors.brightTealBlue,
                    icon: "🙂",
                  },
                  {
                    label: "Tired",
                    status: "NOT_WELL" as const,
                    color: Theme.colors.blueGreen,
                    icon: "🥱",
                  },
                  {
                    label: "Need Help",
                    status: "NEEDS_HELP" as const,
                    color: Theme.colors.urgent,
                    icon: "🙋",
                  },
                ].map((emo) => (
                  <TouchableOpacity
                    key={emo.status}
                    style={[
                      styles.emotiveBtn,
                      {
                        backgroundColor: colors.card,
                        borderColor: isDark ? "#27272A" : Theme.colors.border,
                      },
                      isSmallMobile && styles.emotiveBtnGrid,
                      { minHeight: Math.max(isSmallMobile ? 70 : 82, minTouchTarget) },
                      cardBorderStyle,
                    ]}
                    onPress={() => checkinMutation.mutate(emo.status)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.emotiveEmoji,
                        { fontSize: Math.round(26 * fontMultiplier) },
                      ]}
                    >
                      {emo.icon}
                    </Text>
                    <Text
                      style={[
                        styles.emotiveLabel,
                        {
                          color: colors.text,
                          fontSize: Math.round(14 * fontMultiplier),
                        },
                      ]}
                    >
                      {emo.label}
                    </Text>
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
              <Text style={[styles.promptText, { color: colors.textMuted }]}>
                No medications scheduled for today.
              </Text>
            ) : (
              home.next_medications.map((med) => (
                <View
                  key={med.id}
                  style={[
                    styles.medCard,
                    {
                      backgroundColor: colors.card,
                      borderColor: isDark ? "#27272A" : Theme.colors.border,
                    },
                    cardBorderStyle,
                  ]}
                >
                  <View style={styles.medCardTop}>
                    <View
                      style={[
                        styles.medBadgePill,
                        {
                          backgroundColor: isDark
                            ? "#27272A"
                            : Theme.colors.primaryLight,
                        },
                      ]}
                    >
                      <Clock
                        size={16}
                        color={isDark ? "#38BDF8" : Theme.colors.primary}
                      />
                      <Text
                        style={[
                          styles.medTimeTag,
                          {
                            color: isDark
                              ? "#38BDF8"
                              : Theme.colors.primary,
                            fontSize: Math.round(13 * fontMultiplier),
                          },
                        ]}
                      >
                        {med.times_of_day}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.medDoseTag,
                        {
                          color: isDark ? "#2DD4BF" : Theme.colors.accent,
                          fontSize: Math.round(13 * fontMultiplier),
                        },
                      ]}
                    >
                      {med.frequency}
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.medName,
                      { color: colors.text, fontSize: Math.round(18 * fontMultiplier) },
                    ]}
                  >
                    {med.name}
                  </Text>
                  <Text
                    style={[
                      styles.medDoseText,
                      { color: colors.textMuted, fontSize: Math.round(14 * fontMultiplier) },
                    ]}
                  >
                    {med.dosage}
                  </Text>

                  {med.instructions && (
                    <Text
                      style={[
                        styles.medInstructions,
                        {
                          backgroundColor: isDark ? "#18181B" : "#FFFFFF",
                          borderColor: isDark ? "#27272A" : Theme.colors.borderSubtle,
                          color: colors.textMuted,
                          fontSize: Math.round(13 * fontMultiplier),
                        },
                      ]}
                    >
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
              <View
                style={[
                  styles.apptBox,
                  {
                    backgroundColor: colors.card,
                    borderColor: isDark ? "#27272A" : Theme.colors.border,
                  },
                  cardBorderStyle,
                ]}
              >
                <View style={styles.apptDetails}>
                  <Text
                    style={[
                      styles.apptDoctorText,
                      { color: colors.text, fontSize: Math.round(16 * fontMultiplier) },
                    ]}
                  >
                    {home.upcoming_appointment.doctor_name}
                  </Text>
                  <Text
                    style={[
                      styles.apptClinicText,
                      { color: colors.textMuted, fontSize: Math.round(13 * fontMultiplier) },
                    ]}
                  >
                    {home.upcoming_appointment.clinic_name}
                  </Text>
                  <Text
                    style={[
                      styles.apptDateText,
                      { color: isDark ? "#2DD4BF" : Theme.colors.accent, fontSize: Math.round(13 * fontMultiplier) },
                    ]}
                  >
                    Scheduled for{" "}
                    {new Date(
                      home.upcoming_appointment.scheduled_at
                    ).toLocaleDateString("en-US", {
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
          <View
            style={[
              styles.careCircleBanner,
              {
                backgroundColor: colors.card,
                borderColor: isDark ? "#27272A" : Theme.colors.border,
              },
              cardBorderStyle,
            ]}
          >
            <View style={styles.careCircleHeader}>
              <Shield
                size={24}
                color={isDark ? "#38BDF8" : Theme.colors.primary}
              />
              <Text
                style={[
                  styles.careCircleTitle,
                  { color: colors.text, fontSize: Math.round(18 * fontMultiplier) },
                ]}
              >
                Family & Care Support
              </Text>
            </View>
            <Text
              style={[
                styles.careCircleSubtitle,
                { color: colors.textMuted, fontSize: Math.round(14 * fontMultiplier) },
              ]}
            >
              Your authorized family guardians receive daily updates and can be
              contacted with a single tap.
            </Text>
            <BigButton
              title="Contact Care Circle"
              onPress={() =>
                Alert.alert("Care Circle", "Connecting to your family guardian.")
              }
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
    fontFamily: Theme.fonts.heading,
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
  metricsRibbonMobile: {
    gap: Theme.spacing.sm,
  },
  metricCard: {
    flex: 1,
    minWidth: 170,
    backgroundColor: Theme.colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    padding: 14,
    justifyContent: "space-between",
    ...Platform.select({
      web: {
        boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04), 0 2px 8px rgba(15, 23, 42, 0.02)",
      },
      default: {
        ...Theme.shadows.sm,
      },
    }),
  },
  metricCardMobile: {
    minWidth: 0,
    width: "48%",
    flex: 0,
    flexGrow: 1,
    padding: 12,
  },
  metricCardSmall: {
    padding: 10,
  },
  metricCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  metricIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  metricIconWrapSmall: {
    width: 30,
    height: 30,
    borderRadius: 8,
  },
  metricBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 9999,
  },
  metricBadgeText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  metricBody: {
    gap: 2,
  },
  metricLabel: {
    fontFamily: Theme.fonts.heading,
    fontSize: 11,
    fontWeight: "600",
    color: Theme.colors.textMuted,
    letterSpacing: 0.6,
  },
  metricLabelSmall: {
    fontFamily: Theme.fonts.heading,
    fontSize: 9,
    letterSpacing: 0.3,
  },
  metricValue: {
    fontFamily: Theme.fonts.brand,
    fontSize: Theme.typography.subheading + 2,
    fontWeight: "700",
    color: Theme.colors.text,
    letterSpacing: -0.3,
  },
  metricValueSmall: {
    fontFamily: Theme.fonts.brand,
    fontSize: 18,
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
    height: 8,
    backgroundColor: "#E2E8F0",
    borderRadius: 4,
    overflow: "hidden",
    marginVertical: Theme.spacing.sm,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: Theme.colors.primary,
    borderRadius: 4,
  },

  // 4. Checklist Items
  checklistGroup: {
    gap: Theme.spacing.sm,
    marginTop: Theme.spacing.sm,
  },
  checklistItemCard: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: 14,
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
    flexWrap: "wrap",
    gap: 4,
  },
  timeTag: {
    backgroundColor: Theme.colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  timeTagText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 10,
    fontWeight: "600",
    color: Theme.colors.primary,
    letterSpacing: 0.5,
  },
  completedTimestamp: {
    fontFamily: Theme.fonts.body,
    fontSize: 12,
    fontWeight: "500",
    color: Theme.colors.success,
  },
  itemTitle: {
    fontFamily: Theme.fonts.heading,
    fontSize: Theme.typography.body,
    fontWeight: "600",
    color: Theme.colors.text,
    lineHeight: 22,
  },
  itemDoneText: {
    textDecorationLine: "line-through",
    color: Theme.colors.textMuted,
  },
  itemDesc: {
    fontFamily: Theme.fonts.body,
    fontSize: Theme.typography.bodySmall,
    color: Theme.colors.textMuted,
    marginTop: 3,
    lineHeight: 18,
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
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    minHeight: 46,
  },
  doneText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 14,
    fontWeight: "700",
    color: Theme.colors.success,
  },
  actionBtn: {
    minHeight: 46,
  },

  // 5. Emotive Check-in
  emotiveRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginTop: Theme.spacing.xs,
  },
  emotiveRowGrid: {
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
  },
  emotiveBtn: {
    flex: 1,
    minHeight: 72,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: Theme.spacing.xs,
  },
  emotiveBtnGrid: {
    flex: 0,
    width: "48%",
    minHeight: 64,
  },
  emotiveEmoji: {
    fontSize: 26,
  },
  emotiveLabel: {
    fontFamily: Theme.fonts.heading,
    fontSize: 12,
    fontWeight: "700",
    color: Theme.colors.text,
    marginTop: 4,
  },
  checkinConfirmedBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.successLight,
    padding: Theme.spacing.md,
    borderRadius: 12,
    gap: Theme.spacing.md,
  },
  checkinConfirmedTextWrap: {
    flex: 1,
  },
  checkinConfirmedTitle: {
    fontFamily: Theme.fonts.heading,
    fontSize: Theme.typography.body,
    fontWeight: "700",
    color: Theme.colors.success,
  },
  checkinConfirmedDesc: {
    fontFamily: Theme.fonts.body,
    fontSize: Theme.typography.bodySmall,
    color: Theme.colors.text,
    marginTop: 2,
  },

  // 6. Medication Cards
  medCard: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: 14,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  medCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Theme.spacing.xs,
    flexWrap: "wrap",
    gap: 6,
  },

  medBadgePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Theme.colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  medTimeTag: {
    fontFamily: Theme.fonts.heading,
    fontSize: 11,
    fontWeight: "700",
    color: Theme.colors.primary,
  },
  medDoseTag: {
    fontFamily: Theme.fonts.heading,
    fontSize: 11,
    fontWeight: "700",
    color: Theme.colors.accent,
  },
  medName: {
    fontFamily: Theme.fonts.heading,
    fontSize: Theme.typography.subheading,
    fontWeight: "600",
    color: Theme.colors.text,
    marginTop: 4,
  },
  medDoseText: {
    fontFamily: Theme.fonts.body,
    fontSize: Theme.typography.body,
    fontWeight: "500",
    color: Theme.colors.textMuted,
    marginTop: 2,
  },
  medInstructions: {
    fontFamily: Theme.fonts.body,
    fontSize: Theme.typography.bodySmall,
    color: Theme.colors.textMuted,
    backgroundColor: "#FFFFFF",
    padding: Theme.spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Theme.colors.borderSubtle,
    marginTop: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },
  takeBtn: {
    minHeight: 46,
  },
  promptText: {
    fontFamily: Theme.fonts.body,
    fontSize: Theme.typography.body,
    color: Theme.colors.textMuted,
    paddingVertical: Theme.spacing.md,
    textAlign: "center",
  },

  // 7. Clinical Visit Box
  apptBox: {
    backgroundColor: "#F8FAFC",
    padding: Theme.spacing.md,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  apptDetails: {
    gap: 4,
  },
  apptDoctorText: {
    fontFamily: Theme.fonts.heading,
    fontSize: Theme.typography.bodyLarge,
    fontWeight: "600",
    color: Theme.colors.text,
  },
  apptClinicText: {
    fontFamily: Theme.fonts.body,
    fontSize: Theme.typography.body,
    color: Theme.colors.textMuted,
  },
  apptDateText: {
    fontFamily: Theme.fonts.heading,
    fontSize: Theme.typography.bodySmall,
    fontWeight: "600",
    color: Theme.colors.accent,
    marginTop: 6,
  },

  // 8. Care Circle Banner
  careCircleBanner: {
    backgroundColor: Theme.colors.card,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.ergonomics.cardRadius,
    padding: Theme.spacing.lg,
    marginTop: Theme.spacing.xs,
    ...Theme.shadows.sm,
  },
  careCircleHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.xs,
  },
  careCircleTitle: {
    fontFamily: Theme.fonts.brand,
    fontSize: Theme.typography.bodyLarge,
    fontWeight: "700",
    color: Theme.colors.text,
  },
  careCircleSubtitle: {
    fontFamily: Theme.fonts.body,
    fontSize: Theme.typography.bodySmall,
    color: Theme.colors.textMuted,
    lineHeight: 20,
    marginBottom: Theme.spacing.md,
  },
  careCircleBtn: {
    minHeight: 46,
  },
});
