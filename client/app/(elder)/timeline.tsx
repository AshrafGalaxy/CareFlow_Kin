import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Theme } from "../../constants/theme";
import { ResponsiveContainer } from "../../components/ResponsiveContainer";
import { api, TimelineEvent } from "../../services/api";
import { Clock, Pill, Smile, CheckSquare, Calendar, ShieldCheck } from "lucide-react-native";

export default function TimelineScreen() {
  const { data: events = [] } = useQuery<TimelineEvent[]>({
    queryKey: ["careTimeline"],
    queryFn: async () => {
      try {
        return await api.timeline.getEvents();
      } catch {
        return [
          {
            id: "t-1",
            patient_id: "demo",
            event_type: "MEDICATION",
            title: "Lisinopril taken",
            description: "Dosage: 10mg (1 Tablet). Scheduled morning routine.",
            timestamp: new Date().toISOString(),
            privacy_level: "CARE_CIRCLE",
          },
          {
            id: "t-2",
            patient_id: "demo",
            event_type: "CHECKIN",
            title: "Wellness Check-In: Good",
            description: "Reported feeling energized and comfortable today.",
            timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
            privacy_level: "CARE_CIRCLE",
          },
          {
            id: "t-3",
            patient_id: "demo",
            event_type: "CHECKLIST",
            title: "Routine Completed: Morning Hydration",
            description: "Completed 2 glasses of fresh water.",
            timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
            privacy_level: "CARE_CIRCLE",
          },
          {
            id: "t-4",
            patient_id: "demo",
            event_type: "APPOINTMENT",
            title: "Appointment Scheduled: Cardiology Follow-Up",
            description: "With Dr. Sarah Chen at Metro Health Center.",
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            privacy_level: "CARE_CIRCLE",
          },
        ];
      }
    },
  });

  const getEventIcon = (type: string) => {
    switch (type) {
      case "MEDICATION":
        return <Pill size={22} color={Theme.colors.primary} />;
      case "CHECKIN":
        return <Smile size={22} color={Theme.colors.success} />;
      case "CHECKLIST":
        return <CheckSquare size={22} color={Theme.colors.accent} />;
      case "APPOINTMENT":
        return <Calendar size={22} color={Theme.colors.primary} />;
      default:
        return <Clock size={22} color={Theme.colors.textMuted} />;
    }
  };

  return (
    <ResponsiveContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Care Timeline</Text>
        <Text style={styles.subtitle}>
          Your unified history of completed routines, medications, and wellness records.
        </Text>
      </View>

      <View style={styles.timelineList}>
        {events.map((ev, index) => {
          const dateStr = new Date(ev.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          const dayStr = new Date(ev.timestamp).toLocaleDateString([], {
            month: "short",
            day: "numeric",
          });

          return (
            <View key={ev.id} style={styles.timelineItem}>
              <View style={styles.indicatorCol}>
                <View style={styles.iconCircle}>{getEventIcon(ev.event_type)}</View>
                {index < events.length - 1 && <View style={styles.connectorLine} />}
              </View>

              <View style={styles.contentCard}>
                <View style={styles.timestampRow}>
                  <Text style={styles.badgeText}>{ev.event_type}</Text>
                  <Text style={styles.timeText}>{`${dayStr} • ${dateStr}`}</Text>
                </View>
                <Text style={styles.eventTitle}>{ev.title}</Text>
                {ev.description && (
                  <Text style={styles.eventDesc}>{ev.description}</Text>
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
    marginBottom: Theme.spacing.lg,
  },
  timelineList: {
    paddingBottom: Theme.spacing.xxl,
  },
  timelineItem: {
    flexDirection: "row",
    marginBottom: Theme.spacing.md,
  },
  indicatorCol: {
    alignItems: "center",
    width: 48,
    marginRight: Theme.spacing.md,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Theme.colors.card,
    borderWidth: 2,
    borderColor: Theme.colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  connectorLine: {
    width: 2,
    flex: 1,
    backgroundColor: Theme.colors.border,
    marginTop: 4,
  },
  contentCard: {
    flex: 1,
    backgroundColor: Theme.colors.card,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: 14,
    padding: Theme.spacing.md,
    ...Theme.shadows.sm,
  },
  timestampRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  badgeText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 11,
    fontWeight: "700",
    color: Theme.colors.accent,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  timeText: {
    fontFamily: Theme.fonts.mono,
    fontSize: 11,
    color: Theme.colors.textMuted,
  },
  eventTitle: {
    fontFamily: Theme.fonts.heading,
    fontSize: Theme.typography.body,
    fontWeight: "800",
    color: Theme.colors.text,
  },
  eventDesc: {
    fontFamily: Theme.fonts.body,
    fontSize: Theme.typography.bodySmall,
    color: Theme.colors.textMuted,
    marginTop: 4,
    lineHeight: 20,
  },
});
