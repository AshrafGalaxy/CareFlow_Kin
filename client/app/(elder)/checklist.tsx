import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
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

  const completedCount = items.filter((i) => i.today_status === "COMPLETED").length;
  const progressPercent = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  const getIconData = (iconName: string) => {
    switch (iconName) {
      case "droplet":
        return { icon: <Droplet size={20} color="#0284C7" />, bg: "#F0F9FF" };
      case "activity":
        return { icon: <Activity size={20} color="#10B981" />, bg: "#ECFDF5" };
      case "sun":
        return { icon: <Sun size={20} color="#D97706" />, bg: "#FEF3C7" };
      case "moon":
        return { icon: <Moon size={20} color="#6366F1" />, bg: "#EEF2FF" };
      default:
        return { icon: <CheckSquare size={20} color="#0284C7" />, bg: "#F0F9FF" };
    }
  };

  return (
    <ResponsiveContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Daily Routine Checklist</Text>
        <Text style={styles.subtitle}>
          Step-by-step calm activities to keep you feeling energized and balanced.
        </Text>
      </View>

      {/* Routine Progress Summary Deck */}
      <View style={styles.progressDeck}>
        <View style={styles.progressDeckHeader}>
          <View style={styles.progressDeckInfo}>
            <Text style={styles.progressDeckTitle}>Today's Routine Completion</Text>
            <Text style={styles.progressDeckSubtitle}>
              {completedCount} of {items.length} daily wellness tasks finished
            </Text>
          </View>
          <View style={styles.progressPercentBadge}>
            <Text style={styles.progressPercentText}>{progressPercent}%</Text>
          </View>
        </View>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
        </View>
      </View>

      <View style={styles.itemsList}>
        {items.map((item) => {
          const isDone = item.today_status === "COMPLETED";
          const isSkipped = item.today_status === "SKIPPED";
          const { icon, bg } = getIconData(item.icon_name);

          return (
            <View key={item.id} style={[styles.card, isSmallMobile && { padding: 14 }]}>
              <View style={styles.cardHeader}>
                <View style={[styles.iconBox, { backgroundColor: bg }, isSmallMobile && { width: 36, height: 36, borderRadius: 10 }]}>
                  {icon}
                </View>
                <View style={styles.infoBox}>
                  <View style={styles.itemHeaderLine}>
                    <Text style={[styles.itemTitle, isDone && styles.itemDoneTitle, isSmallMobile && { fontSize: 16 }]}>
                      {item.title}
                    </Text>
                    <View style={styles.timeTag}>
                      <Text style={styles.timeTagText}>{item.time_of_day}</Text>
                    </View>
                  </View>

                  {item.description && (
                    <Text style={styles.itemDesc}>{item.description}</Text>
                  )}
                </View>
              </View>

              <View style={[styles.actionsRow, isSmallMobile && { gap: 8 }]}>
                {isDone ? (
                  <View style={styles.statusPillDone}>
                    <CheckCircle2 size={18} color="#059669" />
                    <Text style={styles.statusTextDone}>Completed for Today</Text>
                  </View>
                ) : isSkipped ? (
                  <View style={styles.statusPillSkipped}>
                    <XCircle size={18} color="#D97706" />
                    <Text style={styles.statusTextSkipped}>Skipped for Today</Text>
                  </View>
                ) : (
                  <>
                    <BigButton
                      title="Done"
                      onPress={() => completeMutation.mutate(item.id)}
                      variant="primary"
                      icon={<CheckCircle2 size={18} color="#FFF" />}
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
    fontFamily: Theme.fonts.brand,
    fontSize: 26,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: Theme.fonts.body,
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
    lineHeight: 20,
    marginBottom: Theme.spacing.sm,
  },
  progressDeck: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
    ...Platform.select({
      web: {
        boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04), 0 2px 8px rgba(15, 23, 42, 0.02)",
      },
      default: {
        ...Theme.shadows.sm,
      },
    }),
  },
  progressDeckHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  progressDeckInfo: {
    flex: 1,
  },
  progressDeckTitle: {
    fontFamily: Theme.fonts.brand,
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.2,
  },
  progressDeckSubtitle: {
    fontFamily: Theme.fonts.body,
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },
  progressPercentBadge: {
    backgroundColor: "#F0FDF4",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  progressPercentText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 13,
    fontWeight: "700",
    color: "#059669",
  },
  progressTrack: {
    height: 8,
    backgroundColor: "#F1F5F9",
    borderRadius: 9999,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#0284C7",
    borderRadius: 9999,
  },
  itemsList: {
    gap: 12,
    marginBottom: Theme.spacing.xxl,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: Theme.spacing.md,
    ...Platform.select({
      web: {
        boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04), 0 2px 8px rgba(15, 23, 42, 0.02)",
      },
      default: {
        ...Theme.shadows.sm,
      },
    }),
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  infoBox: {
    flex: 1,
  },
  itemHeaderLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  itemTitle: {
    fontFamily: Theme.fonts.brand,
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.2,
    flex: 1,
  },
  itemDoneTitle: {
    textDecorationLine: "line-through",
    color: "#94A3B8",
  },
  timeTag: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  timeTagText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 11,
    fontWeight: "600",
    color: "#475569",
    letterSpacing: 0.3,
  },
  itemDesc: {
    fontFamily: Theme.fonts.body,
    fontSize: 13,
    color: "#64748B",
    marginTop: 4,
    lineHeight: 18,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  actionBtn: {
    flex: 1,
    minHeight: 44,
  },
  statusPillDone: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#F0FDF4",
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DCFCE7",
  },
  statusTextDone: {
    fontFamily: Theme.fonts.heading,
    fontSize: 13,
    fontWeight: "700",
    color: "#059669",
  },
  statusPillSkipped: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FEF3C7",
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  statusTextSkipped: {
    fontFamily: Theme.fonts.heading,
    fontSize: 13,
    fontWeight: "700",
    color: "#B45309",
  },
});
