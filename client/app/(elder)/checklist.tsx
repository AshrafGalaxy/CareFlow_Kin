import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Theme } from "../../constants/theme";
import { useResponsive } from "../../hooks/useResponsive";
import { ResponsiveContainer } from "../../components/ResponsiveContainer";
import { BigButton } from "../../components/BigButton";
import { api, ChecklistItem } from "../../services/api";
import { CheckSquare, CheckCircle2, XCircle, Droplet, Activity, Sun, Moon } from "lucide-react-native";

export default function ChecklistScreen() {
  const queryClient = useQueryClient();
  const { isSmallMobile } = useResponsive();


  const { data: items = [] } = useQuery<ChecklistItem[]>({
    queryKey: ["checklistToday"],
    queryFn: async () => {
      try {
        return await api.checklist.getToday();
      } catch {
        return [
          {
            id: "i-1",
            patient_id: "demo",
            title: "Morning Hydration",
            description: "Drink 2 glasses of fresh water",
            time_of_day: "MORNING",
            icon_name: "droplet",
            is_active: true,
            today_status: "COMPLETED",
          },
          {
            id: "i-2",
            patient_id: "demo",
            title: "Gentle Morning Walk",
            description: "15 minutes light stroll or stretching",
            time_of_day: "MORNING",
            icon_name: "activity",
            is_active: true,
          },
          {
            id: "i-3",
            patient_id: "demo",
            title: "Afternoon Rest & Check",
            description: "Quiet relaxation and fluid check",
            time_of_day: "AFTERNOON",
            icon_name: "sun",
            is_active: true,
          },
          {
            id: "i-4",
            patient_id: "demo",
            title: "Evening Reading or Music",
            description: "Wind down with calm activities",
            time_of_day: "EVENING",
            icon_name: "moon",
            is_active: true,
          },
        ];
      }
    },
  });

  const completeMutation = useMutation({
    mutationFn: (id: string) => api.checklist.complete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checklistToday"] });
      queryClient.invalidateQueries({ queryKey: ["elderHome"] });
    },
  });

  const skipMutation = useMutation({
    mutationFn: (id: string) => api.checklist.skip(id, "Skipped by user"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checklistToday"] });
      queryClient.invalidateQueries({ queryKey: ["elderHome"] });
    },
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "droplet":
        return <Droplet size={24} color={Theme.colors.primary} />;
      case "activity":
        return <Activity size={24} color={Theme.colors.accent} />;
      case "sun":
        return <Sun size={24} color={Theme.colors.accent} />;
      case "moon":
        return <Moon size={24} color={Theme.colors.primary} />;
      default:
        return <CheckSquare size={24} color={Theme.colors.primary} />;
    }
  };

  return (
    <ResponsiveContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Daily Routine Checklist</Text>
        <Text style={styles.subtitle}>
          Step-by-step calm activities to keep you feeling your best.
        </Text>
      </View>

      <View style={styles.itemsList}>
        {items.map((item) => {
          const isDone = item.today_status === "COMPLETED";
          const isSkipped = item.today_status === "SKIPPED";

          return (
            <View key={item.id} style={[styles.card, isSmallMobile && { padding: 12 }]}>
              <View style={styles.cardHeader}>
                <View style={[styles.iconBox, isSmallMobile && { width: 38, height: 38, borderRadius: 19, marginRight: 10 }]}>
                  {getIcon(item.icon_name)}
                </View>
                <View style={styles.infoBox}>
                  <Text style={[styles.itemTitle, isDone && styles.itemDoneTitle, isSmallMobile && { fontSize: 16 }]}>
                    {item.title}
                  </Text>
                  <Text style={styles.timeBadge}>{item.time_of_day}</Text>
                  {item.description && (
                    <Text style={styles.itemDesc}>{item.description}</Text>
                  )}
                </View>
              </View>

              <View style={[styles.actionsRow, isSmallMobile && { gap: 8 }]}>

                {isDone ? (
                  <View style={styles.statusPillDone}>
                    <CheckCircle2 size={22} color={Theme.colors.success} />
                    <Text style={styles.statusTextDone}>Completed for Today</Text>
                  </View>
                ) : isSkipped ? (
                  <View style={styles.statusPillSkipped}>
                    <XCircle size={22} color={Theme.colors.accent} />
                    <Text style={styles.statusTextSkipped}>Skipped for Today</Text>
                  </View>
                ) : (
                  <>
                    <BigButton
                      title="Done"
                      onPress={() => completeMutation.mutate(item.id)}
                      variant="primary"
                      icon={<CheckCircle2 size={20} color="#FFF" />}
                      style={styles.actionBtn}
                    />
                    <BigButton
                      title="Skip"
                      onPress={() => skipMutation.mutate(item.id)}
                      variant="outline"
                      style={styles.actionBtn}
                    />
                  </>
                )}
              </View>
            </View>
          );
        })}
      </View>
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
  itemsList: {
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.xxl,
  },
  card: {
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.ergonomics.cardRadius,
    borderWidth: Theme.ergonomics.borderWidth,
    borderColor: Theme.colors.border,
    padding: Theme.spacing.lg,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Theme.colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Theme.spacing.md,
  },
  infoBox: {
    flex: 1,
  },
  itemTitle: {
    fontFamily: Theme.fonts.heading,
    fontSize: Theme.typography.subheading,
    fontWeight: "800",
    color: Theme.colors.text,
  },
  itemDoneTitle: {
    textDecorationLine: "line-through",
    color: Theme.colors.textMuted,
  },
  timeBadge: {
    fontFamily: Theme.fonts.heading,
    fontSize: 11,
    fontWeight: "700",
    color: Theme.colors.accent,
    textTransform: "uppercase",
    marginTop: 2,
    letterSpacing: 0.5,
  },
  itemDesc: {
    fontFamily: Theme.fonts.body,
    fontSize: Theme.typography.bodySmall,
    color: Theme.colors.textMuted,
    marginTop: 4,
    lineHeight: 20,
  },
  actionsRow: {
    flexDirection: "row",
    gap: Theme.spacing.md,
    marginTop: Theme.spacing.md,
  },
  actionBtn: {
    flex: 1,
    minHeight: 46,
  },
  statusPillDone: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Theme.colors.successLight,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.ergonomics.buttonRadius,
    minHeight: 46,
  },
  statusTextDone: {
    fontFamily: Theme.fonts.heading,
    fontSize: Theme.typography.body,
    fontWeight: "700",
    color: Theme.colors.success,
  },
  statusPillSkipped: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Theme.colors.accentLight,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.ergonomics.buttonRadius,
    minHeight: 46,
  },
  statusTextSkipped: {
    fontFamily: Theme.fonts.heading,
    fontSize: Theme.typography.body,
    fontWeight: "700",
    color: Theme.colors.accent,
  },
});
