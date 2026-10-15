import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Theme } from "../../constants/theme";
import { useResponsive } from "../../hooks/useResponsive";
import { ResponsiveContainer } from "../../components/ResponsiveContainer";
import { api, TimelineEvent } from "../../services/api";
import { Clock, Pill, Smile, CheckSquare, Calendar, ShieldCheck } from "lucide-react-native";
import { useAccessibility } from "../../context/AccessibilityContext";

export default function TimelineScreen() {
  const { isSmallMobile } = useResponsive();
  const { fontMultiplier, isAAAMode, minTouchTarget, aaaColors, highContrastBorders } = useAccessibility();
  const cardBorderStyle = highContrastBorders ? { borderWidth: 1.5, borderColor: "#CBD5E1" } : {};
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

  const getEventData = (type: string) => {
    switch (type) {
      case "MEDICATION":
        return { icon: <Pill size={18} color="#0284C7" />, bg: "#F0F9FF", textColor: "#0284C7" };
      case "CHECKIN":
        return { icon: <Smile size={18} color="#059669" />, bg: "#ECFDF5", textColor: "#059669" };
      case "CHECKLIST":
        return { icon: <CheckSquare size={18} color="#4F46E5" />, bg: "#EEF2FF", textColor: "#4F46E5" };
      case "APPOINTMENT":
        return { icon: <Calendar size={18} color="#0D9488" />, bg: "#F0FDFA", textColor: "#0D9488" };
      default:
        return { icon: <Clock size={18} color="#64748B" />, bg: "#F8FAFC", textColor: "#64748B" };
    }
  };

  return (
    <ResponsiveContainer>
      <View style={styles.header}>
        <Text style={[styles.title, { fontSize: Math.round(26 * fontMultiplier) }]}>Care Timeline</Text>
        <Text style={[styles.subtitle, { fontSize: Math.round(15 * fontMultiplier) }]}>
          Your unified history of completed routines, medications, and clinical logs.
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
          const { icon, bg, textColor } = getEventData(ev.event_type);

          return (
            <View key={ev.id} style={styles.timelineItem}>
              <View style={[styles.indicatorCol, isSmallMobile && { width: 34, marginRight: 10 }]}>
                <View style={[styles.iconSquircle, { backgroundColor: bg }, isSmallMobile && { width: 32, height: 32, borderRadius: 8 }]}>
                  {icon}
                </View>
                {index < events.length - 1 && <View style={styles.connectorLine} />}
              </View>

              <View style={[styles.contentCard, isSmallMobile && { padding: 12 }, cardBorderStyle]}>
                <View style={styles.timestampRow}>
                  <View style={[styles.badgePill, { backgroundColor: bg }]}>
                    <Text style={[styles.badgeText, { color: textColor, fontSize: Math.round(11 * fontMultiplier) }]}>{ev.event_type}</Text>
                  </View>
                  <Text style={[styles.timeText, { fontSize: Math.round(13 * fontMultiplier) }]}>{`${dayStr} • ${dateStr}`}</Text>
                </View>
                <Text style={[styles.eventTitle, { fontSize: Math.round((isSmallMobile ? 15 : 17) * fontMultiplier) }]}>{ev.title}</Text>
                {ev.description && (
                  <Text style={[styles.eventDesc, { fontSize: Math.round((isSmallMobile ? 12 : 14) * fontMultiplier) }]}>{ev.description}</Text>
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
    marginBottom: Theme.spacing.lg,
    lineHeight: 20,
  },
  timelineList: {
    paddingBottom: Theme.spacing.xxl,
  },
  timelineItem: {
    flexDirection: "row",
    marginBottom: 12,
  },
  indicatorCol: {
    alignItems: "center",
    width: 44,
    marginRight: 12,
  },
  iconSquircle: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  connectorLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#E2E8F0",
    marginTop: 6,
  },
  contentCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
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
  timestampRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
    gap: 8,
  },
  badgePill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  timeText: {
    fontFamily: Theme.fonts.body,
    fontSize: 12,
    color: "#64748B",
  },
  eventTitle: {
    fontFamily: Theme.fonts.brand,
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.2,
  },
  eventDesc: {
    fontFamily: Theme.fonts.body,
    fontSize: 13,
    color: "#64748B",
    marginTop: 4,
    lineHeight: 18,
  },
});
