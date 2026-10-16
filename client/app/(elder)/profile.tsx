import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Theme } from "../../constants/theme";
import { useResponsive } from "../../hooks/useResponsive";
import { ResponsiveContainer } from "../../components/ResponsiveContainer";
import { BigButton } from "../../components/BigButton";
import { CareFlowLogo } from "../../components/CareFlowLogo";
import { useAuth } from "../../context/AuthContext";
import { useAccessibility } from "../../context/AccessibilityContext";
import {
  User,
  Shield,
  Phone,
  Mail,
  Bell,
  Globe,
  LogOut,
  Heart,
  ChevronRight,
  Sparkles,
} from "lucide-react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { isSmallMobile } = useResponsive();
  const { fontMultiplier, isAAAMode, minTouchTarget, aaaColors, highContrastBorders } = useAccessibility();
  const cardBorderStyle = highContrastBorders ? { borderWidth: 1.5, borderColor: "#CBD5E1" } : {};

  // Settings states
  const [morningReminders, setMorningReminders] = useState(true);
  const [medAlerts, setMedAlerts] = useState(true);
  const [circleSync, setCircleSync] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("English (US)");


  const handleLogout = () => {
    logout();
    router.replace("/(auth)/login");
  };

  return (
    <ResponsiveContainer>
      <View style={styles.header}>
        <Text style={[styles.screenTitle, { fontSize: Math.round(26 * fontMultiplier) }]}>Elder Profile & Settings</Text>
        <Text style={[styles.screenSubtitle, { fontSize: Math.round(15 * fontMultiplier) }]}>
          Manage care preferences, guardian contacts, and notification alerts.
        </Text>
      </View>

      <View style={styles.contentStack}>
        {/* 1. Identity & Role Card */}
        <View style={[styles.profileCard, isSmallMobile && { padding: 14, gap: 12 }, cardBorderStyle]}>
          <View style={[styles.avatarWrap, isSmallMobile && { width: 48, height: 48, borderRadius: 12 }]}>
            <Text style={[styles.avatarText, isSmallMobile && { fontSize: 20 }]}>
              {user?.full_name ? user.full_name.charAt(0) : "E"}
            </Text>
          </View>

          <View style={styles.identityBlock}>
            <Text style={[styles.userName, { fontSize: Math.round((isSmallMobile ? 17 : 20) * fontMultiplier) }]}>{user?.full_name || "Eleanor Vance"}</Text>
            <Text style={[styles.userEmail, { fontSize: Math.round(14 * fontMultiplier) }]}>{user?.email || "eleanor@careflow.com"}</Text>

            <View style={styles.roleBadgeRow}>
              <View style={styles.roleBadge}>
                <Heart size={13} color="#0284C7" />
                <Text style={[styles.roleBadgeText, { fontSize: Math.round(12 * fontMultiplier) }]}>Elder Companion</Text>
              </View>

              <View style={styles.activePill}>
                <View style={styles.activeDot} />
                <Text style={[styles.activeText, { fontSize: Math.round(12 * fontMultiplier) }]}>Active Member</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 2. Emergency & Family Guardian Support */}
        <View style={[styles.sectionCard, isSmallMobile && { padding: 14 }, cardBorderStyle]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconSquircle}>
              <Shield size={18} color="#0284C7" />
            </View>
            <Text style={[styles.sectionTitle, { fontSize: Math.round(16 * fontMultiplier) }]}>Designated Family Guardian</Text>
          </View>

          <View style={[styles.contactRow, isSmallMobile && { padding: 10, gap: 10 }]}>
            <View style={[styles.contactAvatar, isSmallMobile && { width: 36, height: 36, borderRadius: 10 }]}>
              <Text style={styles.contactInitials}>RV</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={[styles.contactName, { fontSize: Math.round(16 * fontMultiplier) }]}>Robert Vance</Text>
              <Text style={[styles.contactRelation, { fontSize: Math.round(13 * fontMultiplier) }]}>Son • Primary Emergency Contact</Text>
              <Text style={[styles.contactPhone, { fontSize: Math.round(14 * fontMultiplier) }]}>+1 (555) 382-9014</Text>
            </View>
            <TouchableOpacity
              style={[styles.contactCallBtn, { minHeight: Math.max(48, minTouchTarget), minWidth: Math.max(48, minTouchTarget) }]}
              onPress={() => Alert.alert("Emergency Dial", "Calling Robert Vance...")}
            >
              <Phone size={18} color="#059669" />
            </TouchableOpacity>
          </View>
        </View>


        {/* 3. Notification Preferences */}
        <View style={[styles.sectionCard, cardBorderStyle]}>
          <View style={styles.sectionHeader}>
            <Bell size={20} color={Theme.colors.primary} />
            <Text style={[styles.sectionTitle, { fontSize: Math.round(16 * fontMultiplier) }]}>Daily Notifications & Alerts</Text>
          </View>

          <View style={styles.toggleRow}>
            <View style={styles.toggleLabelWrap}>
              <Text style={styles.toggleTitle}>Morning Routine Prompts</Text>
              <Text style={styles.toggleSubtitle}>Gentle notification for breakfast and hydration</Text>
            </View>
            <Switch
              value={morningReminders}
              onValueChange={setMorningReminders}
              trackColor={{ false: "#E2E8F0", true: Theme.colors.primaryLight }}
              thumbColor={morningReminders ? Theme.colors.primary : "#94A3B8"}
            />
          </View>

          <View style={styles.toggleRow}>
            <View style={styles.toggleLabelWrap}>
              <Text style={styles.toggleTitle}>Medication Reminders</Text>
              <Text style={styles.toggleSubtitle}>Sound alert when prescription dose is due</Text>
            </View>
            <Switch
              value={medAlerts}
              onValueChange={setMedAlerts}
              trackColor={{ false: "#E2E8F0", true: Theme.colors.primaryLight }}
              thumbColor={medAlerts ? Theme.colors.primary : "#94A3B8"}
            />
          </View>

          <View style={styles.toggleRow}>
            <View style={styles.toggleLabelWrap}>
              <Text style={styles.toggleTitle}>Care Circle Wellness Sync</Text>
              <Text style={styles.toggleSubtitle}>Notify family guardians when check-in is logged</Text>
            </View>
            <Switch
              value={circleSync}
              onValueChange={setCircleSync}
              trackColor={{ false: "#E2E8F0", true: Theme.colors.primaryLight }}
              thumbColor={circleSync ? Theme.colors.primary : "#94A3B8"}
            />
          </View>
        </View>

        {/* 4. Language & Display */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Globe size={20} color={Theme.colors.primary} />
            <Text style={styles.sectionTitle}>Language & Region</Text>
          </View>

          <View style={styles.langList}>
            {["English (US)", "Español (ES)", "Français (FR)"].map((lang) => (
              <TouchableOpacity
                key={lang}
                style={[
                  styles.langOption,
                  selectedLanguage === lang && styles.langOptionActive,
                ]}
                onPress={() => setSelectedLanguage(lang)}
              >
                <Text
                  style={[
                    styles.langText,
                    selectedLanguage === lang && styles.langTextActive,
                  ]}
                >
                  {lang}
                </Text>
                {selectedLanguage === lang && (
                  <View style={styles.langCheck}>
                    <Text style={styles.langCheckText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 5. Account Actions */}
        <View style={styles.actionCard}>
          <BigButton
            title="Sign Out of Careflow"
            onPress={handleLogout}
            variant="outline"
            icon={<LogOut size={18} color={Theme.colors.urgent} />}
            style={styles.logoutBtn}
          />
        </View>
      </View>
    </ResponsiveContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: Theme.spacing.md,
    marginBottom: Theme.spacing.xs,
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
    lineHeight: 20,
  },
  contentStack: {
    gap: 12,
    paddingBottom: Theme.spacing.xxl,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: Theme.spacing.lg,
    ...Platform.select({
      web: {
        boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04), 0 2px 8px rgba(15, 23, 42, 0.02)",
      },
      default: {
        ...Theme.shadows.sm,
      },
    }),
  },
  avatarWrap: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: "#0284C7",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontFamily: Theme.fonts.brand,
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  identityBlock: {
    flex: 1,
  },
  userName: {
    fontFamily: Theme.fonts.brand,
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.2,
  },
  userEmail: {
    fontFamily: Theme.fonts.body,
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },
  roleBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
    flexWrap: "wrap",
  },
  roleBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#F0F9FF",
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 6,
  },
  roleBadgeText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 11,
    fontWeight: "600",
    color: "#0284C7",
    letterSpacing: 0.2,
  },
  activePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#ECFDF5",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#059669",
  },
  activeText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 11,
    fontWeight: "600",
    color: "#059669",
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: Theme.spacing.lg,
    ...Platform.select({
      web: {
        boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04), 0 2px 8px rgba(15, 23, 42, 0.02)",
      },
      default: {
        ...Theme.shadows.sm,
      },
    }),
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: Theme.spacing.md,
  },
  sectionIconSquircle: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: "#F0F9FF",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontFamily: Theme.fonts.brand,
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.2,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    padding: Theme.spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 12,
  },
  contactAvatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F0F9FF",
    alignItems: "center",
    justifyContent: "center",
  },
  contactInitials: {
    fontFamily: Theme.fonts.brand,
    fontSize: 14,
    fontWeight: "700",
    color: "#0284C7",
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontFamily: Theme.fonts.brand,
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },
  contactRelation: {
    fontFamily: Theme.fonts.body,
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  contactPhone: {
    fontFamily: Theme.fonts.heading,
    fontSize: 12,
    fontWeight: "600",
    color: "#0284C7",
    marginTop: 2,
  },
  contactCallBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center",
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  toggleLabelWrap: {
    flex: 1,
    paddingRight: Theme.spacing.md,
  },
  toggleTitle: {
    fontFamily: Theme.fonts.heading,
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  toggleSubtitle: {
    fontFamily: Theme.fonts.body,
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  langList: {
    gap: 8,
  },
  langOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    backgroundColor: "#FAFCFE",
  },
  langOptionActive: {
    borderColor: "#0284C7",
    backgroundColor: "#F0F9FF",
  },
  langText: {
    fontFamily: Theme.fonts.body,
    fontSize: 14,
    fontWeight: "500",
    color: "#334155",
  },
  langTextActive: {
    fontFamily: Theme.fonts.heading,
    fontWeight: "700",
    color: "#0284C7",
  },
  langCheck: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#0284C7",
    alignItems: "center",
    justifyContent: "center",
  },
  langCheckText: {
    fontFamily: Theme.fonts.heading,
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  actionCard: {
    marginTop: 4,
  },
  logoutBtn: {
    borderColor: "#FECACA",
  },
});
