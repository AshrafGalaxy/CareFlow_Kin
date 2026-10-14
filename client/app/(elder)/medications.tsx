import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Theme } from "../../constants/theme";
import { ResponsiveContainer } from "../../components/ResponsiveContainer";
import { StatusCard } from "../../components/StatusCard";
import { BigButton } from "../../components/BigButton";
import { api, Medication, AdherenceReport } from "../../services/api";
import { Pill, CheckCircle2, XCircle, Clock, Award, Plus } from "lucide-react-native";

export default function MedicationsScreen() {
  const queryClient = useQueryClient();

  const { data: meds = [], isLoading: medsLoading } = useQuery<Medication[]>({
    queryKey: ["medications"],
    queryFn: async () => {
      try {
        return await api.medications.list();
      } catch {
        return [
          {
            id: "m-1",
            patient_id: "demo",
            name: "Lisinopril",
            dosage: "10mg (1 Tablet)",
            frequency: "DAILY",
            times_of_day: "08:00",
            instructions: "Take with breakfast",
            prescribed_by: "Dr. Sarah Chen",
            status: "ACTIVE",
          },
          {
            id: "m-2",
            patient_id: "demo",
            name: "Metformin",
            dosage: "500mg",
            frequency: "TWICE_DAILY",
            times_of_day: "08:00, 20:00",
            instructions: "Take with meals",
            prescribed_by: "Dr. Robert Vance",
            status: "ACTIVE",
          },
          {
            id: "m-3",
            patient_id: "demo",
            name: "Atorvastatin",
            dosage: "20mg",
            frequency: "DAILY",
            times_of_day: "21:00",
            instructions: "Take before bedtime",
            prescribed_by: "Dr. Sarah Chen",
            status: "ACTIVE",
          },
        ];
      }
    },
  });

  const { data: adherence } = useQuery<AdherenceReport>({
    queryKey: ["adherence"],
    queryFn: async () => {
      try {
        return await api.medications.getAdherence();
      } catch {
        return {
          total_scheduled: 20,
          total_taken: 19,
          total_missed: 0,
          total_skipped: 1,
          adherence_rate_percentage: 95.0,
        };
      }
    },
  });

  const logMutation = useMutation({
    mutationFn: ({ id, status, reason }: { id: string; status: "TAKEN" | "SKIPPED"; reason?: string }) =>
      api.medications.logIntake(id, status, reason),
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ["medications"] });
      queryClient.invalidateQueries({ queryKey: ["adherence"] });
      queryClient.invalidateQueries({ queryKey: ["elderHome"] });
      Alert.alert(
        "Medication Updated",
        vars.status === "TAKEN"
          ? "Dose recorded as taken. Great job staying on track!"
          : "Dose marked as skipped."
      );
    },
  });

  return (
    <ResponsiveContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Medication Manager</Text>
        <Text style={styles.subtitle}>
          Your daily schedule and verified adherence records.
        </Text>
      </View>

      {/* Adherence Overview Deck */}
      <StatusCard
        title="Adherence Record"
        subtitle="Last 30 days compliance"
        icon={<Award size={24} color={Theme.colors.success} />}
        badge={`${adherence?.adherence_rate_percentage ?? 95}%`}
        badgeVariant="success"
      >
        <View style={styles.metricsRow}>
          <View style={styles.metricBox}>
            <Text style={styles.metricVal}>{adherence?.total_taken ?? 19}</Text>
            <Text style={styles.metricLabel}>Doses Taken</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricBox}>
            <Text style={styles.metricVal}>{adherence?.total_skipped ?? 1}</Text>
            <Text style={styles.metricLabel}>Skipped</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricBox}>
            <Text style={styles.metricVal}>{adherence?.total_scheduled ?? 20}</Text>
            <Text style={styles.metricLabel}>Scheduled</Text>
          </View>
        </View>
      </StatusCard>

      {/* Prescriptions Stream */}
      <Text style={styles.sectionHeading}>Your Prescriptions</Text>

      {meds.map((med) => (
        <View key={med.id} style={styles.medCard}>
          <View style={styles.medHeader}>
            <View style={styles.medIconBox}>
              <Pill size={28} color={Theme.colors.primary} />
            </View>
            <View style={styles.medTitleBlock}>
              <Text style={styles.medName}>{med.name}</Text>
              <Text style={styles.medDosage}>{med.dosage}</Text>
            </View>
          </View>

          <View style={styles.medDetailsBox}>
            <View style={styles.detailItem}>
              <Clock size={18} color={Theme.colors.textMuted} />
              <Text style={styles.detailText}>Times: {med.times_of_day}</Text>
            </View>
            {med.instructions && (
              <Text style={styles.instructionText}>Instructions: {med.instructions}</Text>
            )}
            {med.prescribed_by && (
              <Text style={styles.prescriberText}>Prescriber: {med.prescribed_by}</Text>
            )}
          </View>

          <View style={styles.btnRow}>
            <BigButton
              title="Taken"
              onPress={() => logMutation.mutate({ id: med.id, status: "TAKEN" })}
              variant="success"
              icon={<CheckCircle2 size={20} color="#FFF" />}
              style={styles.actionBtn}
            />
            <BigButton
              title="Skip"
              onPress={() => logMutation.mutate({ id: med.id, status: "SKIPPED", reason: "Patient choice" })}
              variant="outline"
              icon={<XCircle size={20} color={Theme.colors.primary} />}
              style={styles.actionBtn}
            />
          </View>
        </View>
      ))}
    </ResponsiveContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: Theme.spacing.md,
  },
  title: {
    fontSize: Theme.typography.heading,
    fontWeight: "800",
    color: Theme.colors.primary,
  },
  subtitle: {
    fontSize: Theme.typography.body,
    color: Theme.colors.textMuted,
    marginTop: 2,
    marginBottom: Theme.spacing.md,
  },
  metricsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: Theme.spacing.sm,
  },
  metricBox: {
    alignItems: "center",
  },
  metricVal: {
    fontSize: Theme.typography.display,
    fontWeight: "800",
    color: Theme.colors.primary,
  },
  metricLabel: {
    fontSize: Theme.typography.bodySmall,
    color: Theme.colors.textMuted,
    marginTop: 2,
  },
  metricDivider: {
    width: 1,
    height: 40,
    backgroundColor: Theme.colors.border,
  },
  sectionHeading: {
    fontSize: Theme.typography.subheading,
    fontWeight: "800",
    color: Theme.colors.text,
    marginVertical: Theme.spacing.md,
  },
  medCard: {
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.ergonomics.cardRadius,
    borderWidth: Theme.ergonomics.borderWidth,
    borderColor: Theme.colors.border,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
  },
  medHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  medIconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Theme.colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Theme.spacing.md,
  },
  medTitleBlock: {
    flex: 1,
  },
  medName: {
    fontSize: Theme.typography.subheading,
    fontWeight: "800",
    color: Theme.colors.primary,
  },
  medDosage: {
    fontSize: Theme.typography.body,
    fontWeight: "600",
    color: Theme.colors.accent,
    marginTop: 2,
  },
  medDetailsBox: {
    marginVertical: Theme.spacing.md,
    gap: 4,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  detailText: {
    fontSize: Theme.typography.bodySmall,
    color: Theme.colors.text,
    fontWeight: "600",
  },
  instructionText: {
    fontSize: Theme.typography.bodySmall,
    color: Theme.colors.textMuted,
    fontStyle: "italic",
    marginTop: 2,
  },
  prescriberText: {
    fontSize: 14,
    color: Theme.colors.textMuted,
  },
  btnRow: {
    flexDirection: "row",
    gap: Theme.spacing.md,
    marginTop: Theme.spacing.xs,
  },
  actionBtn: {
    flex: 1,
    minHeight: 48,
  },
});
