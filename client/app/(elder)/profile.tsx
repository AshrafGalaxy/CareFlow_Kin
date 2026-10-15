import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Theme } from "../../constants/theme";
import { useResponsive } from "../../hooks/useResponsive";
import { ResponsiveContainer } from "../../components/ResponsiveContainer";
import { BigButton } from "../../components/BigButton";
import { CareFlowLogo } from "../../components/CareFlowLogo";
import { useAuth } from "../../context/AuthContext";
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

  // Settings states
  const [morningReminders, setMorningReminders] = useState(true);
  const [medAlerts, setMedAlerts] = useState(true);
  const [circleSync, setCircleSync] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("English (US)");


  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  return (
    <ResponsiveContainer>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Elder Profile & Settings</Text>
        <Text style={styles.screenSubtitle}>
          Manage care preferences, guardian contacts, and notification alerts.
        </Text>
      </View>

      <View style={styles.contentStack}>
        {/* 1. Identity & Role Card */}
        <View style={[styles.profileCard, isSmallMobile && { padding: 12, gap: 12 }]}>
          <View style={[styles.avatarWrap, isSmallMobile && { width: 50, height: 50, borderRadius: 25 }]}>
            <Text style={[styles.avatarText, isSmallMobile && { fontSize: 20 }]}>
              {user?.full_name ? user.full_name.charAt(0) : "E"}
            </Text>
          </View>

          <View style={styles.identityBlock}>
            <Text style={[styles.userName, isSmallMobile && { fontSize: 17 }]}>{user?.full_name || "Eleanor Vance"}</Text>
            <Text style={styles.userEmail}>{user?.email || "eleanor@careflow.com"}</Text>

            <View style={styles.roleBadgeRow}>
              <View style={styles.roleBadge}>
                <Heart size={14} color="#0077B6" />
                <Text style={styles.roleBadgeText}>ELDER COMPANION</Text>
              </View>

              <View style={styles.activePill}>
                <View style={styles.activeDot} />
                <Text style={styles.activeText}>Active Member</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 2. Emergency & Family Guardian Support */}
        <View style={[styles.sectionCard, isSmallMobile && { padding: 12 }]}>
          <View style={styles.sectionHeader}>
            <Shield size={20} color={Theme.colors.primary} />
            <Text style={styles.sectionTitle}>Designated Family Guardian</Text>
          </View>

          <View style={[styles.contactRow, isSmallMobile && { padding: 10, gap: 10 }]}>
            <View style={[styles.contactAvatar, isSmallMobile && { width: 38, height: 38, borderRadius: 19 }]}>
              <Text style={styles.contactInitials}>RV</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>Robert Vance</Text>
              <Text style={styles.contactRelation}>Son • Primary Emergency Contact</Text>
              <Text style={styles.contactPhone}>+1 (555) 382-9014</Text>
            </View>
            <TouchableOpacity
              style={styles.contactCallBtn}
              onPress={() => Alert.alert("Emergency Dial", "Calling Robert Vance...")}
            >
              <Phone size={18} color="#059669" />
            </TouchableOpacity>
          </View>
        </View>


        {/* 3. Notification Preferences */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Bell size={20} color={Theme.colors.primary} />
            <Text style={styles.sectionTitle}>Daily Notifications & Alerts</Text>
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
    marginBottom: Theme.spacing.md,
  },
  screenTitle: {
    fontFamily: Theme.fonts.brand,
    fontSize: Theme.typography.heading,
    fontWeight: "800",
    color: Theme.colors.primaryDark,
    letterSpacing: -0.5,
  },
  screenSubtitle: {
    fontFamily: Theme.fonts.body,
    fontSize: Theme.typography.body,
    color: Theme.colors.textMuted,
    marginTop: 4,
  },
  contentStack: {
    gap: Theme.spacing.md,
    paddingBottom: Theme.spacing.xxl,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.ergonomics.cardRadius,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    padding: Theme.spacing.xl,
    ...Theme.shadows.sm,
  },
  avatarWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 26,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  identityBlock: {
    flex: 1,
  },
  userName: {
    fontFamily: Theme.fonts.heading,
    fontSize: 20,
    fontWeight: "800",
    color: Theme.colors.text,
  },
  userEmail: {
    fontFamily: Theme.fonts.body,
    fontSize: 14,
    color: Theme.colors.textMuted,
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
    gap: 6,
    backgroundColor: Theme.colors.primaryLight,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 119, 182, 0.2)",
  },
  roleBadgeText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 11,
    fontWeight: "800",
    color: Theme.colors.accent,
    letterSpacing: 0.5,
  },
  activePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#ECFDF5",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#059669",
  },
  activeText: {
    fontFamily: Theme.fonts.body,
    fontSize: 11,
    fontWeight: "700",
    color: "#059669",
  },
  sectionCard: {
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.ergonomics.cardRadius,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    padding: Theme.spacing.lg,
    ...Theme.shadows.sm,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: Theme.spacing.md,
  },
  sectionTitle: {
    fontFamily: Theme.fonts.heading,
    fontSize: 16,
    fontWeight: "800",
    color: Theme.colors.text,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    padding: Theme.spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Theme.colors.borderSubtle,
    gap: 12,
  },
  contactAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E0F2FE",
    alignItems: "center",
    justifyContent: "center",
  },
  contactInitials: {
    fontFamily: Theme.fonts.heading,
    fontSize: 14,
    fontWeight: "800",
    color: "#0284C7",
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontFamily: Theme.fonts.heading,
    fontSize: 15,
    fontWeight: "700",
    color: Theme.colors.text,
  },
  contactRelation: {
    fontFamily: Theme.fonts.body,
    fontSize: 12,
    color: Theme.colors.textMuted,
    marginTop: 2,
  },
  contactPhone: {
    fontFamily: Theme.fonts.heading,
    fontSize: 12,
    color: Theme.colors.accent,
    marginTop: 2,
  },
  contactCallBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.borderSubtle,
  },
  toggleLabelWrap: {
    flex: 1,
    paddingRight: Theme.spacing.md,
  },
  toggleTitle: {
    fontFamily: Theme.fonts.heading,
    fontSize: 14,
    fontWeight: "700",
    color: Theme.colors.text,
  },
  toggleSubtitle: {
    fontFamily: Theme.fonts.body,
    fontSize: 12,
    color: Theme.colors.textMuted,
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
    borderColor: Theme.colors.border,
    backgroundColor: "#F8FAFC",
  },
  langOptionActive: {
    borderColor: Theme.colors.primary,
    backgroundColor: Theme.colors.primaryLight,
  },
  langText: {
    fontFamily: Theme.fonts.body,
    fontSize: 14,
    fontWeight: "600",
    color: Theme.colors.text,
  },
  langTextActive: {
    fontFamily: Theme.fonts.heading,
    fontWeight: "800",
    color: Theme.colors.primaryDark,
  },
  langCheck: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  langCheckText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
  actionCard: {
    marginTop: Theme.spacing.xs,
  },
  logoutBtn: {
    borderColor: "#FECACA",
  },
});
