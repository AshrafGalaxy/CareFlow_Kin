import React from "react";
import { Tabs } from "expo-router";
import { Theme } from "../../constants/theme";
import { Home, Pill, CheckSquare, Smile, Clock, LogOut } from "lucide-react-native";
import { useWindowDimensions, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { CareFlowLogo } from "../../components/CareFlowLogo";
import { useAuth } from "../../context/AuthContext";

export default function ElderLayout() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= Theme.breakpoints.compact;
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  // Desktop Navigation Deck Header
  const renderDesktopHeader = () => (
    <View style={styles.desktopNavWrapper}>
      <View style={styles.desktopNav}>
        <View style={styles.brandGroup}>
          <TouchableOpacity onPress={() => router.push("/")} activeOpacity={0.8}>
            <CareFlowLogo size={36} showText={true} />
          </TouchableOpacity>
          <View style={styles.deckTag}>
            <Text style={styles.deckTagText}>ELDER DECK</Text>
          </View>
        </View>

        <View style={styles.navLinks}>
          {[
            { name: "Overview", path: "/(elder)" },
            { name: "Medications", path: "/(elder)/medications" },
            { name: "Daily Routine", path: "/(elder)/checklist" },
            { name: "Wellness Sharing", path: "/(elder)/checkin" },
            { name: "Appointments", path: "/(elder)/appointments" },
            { name: "Care Timeline", path: "/(elder)/timeline" },
          ].map((tab) => {
            const isActive =
              pathname === tab.path ||
              (tab.path === "/(elder)" && (pathname === "/(elder)/index" || pathname === "/(elder)"));
            return (
              <TouchableOpacity
                key={tab.path}
                onPress={() => router.push(tab.path as any)}
                style={[styles.desktopTab, isActive && styles.desktopTabActive]}
                activeOpacity={0.7}
              >
                <Text style={[styles.desktopTabText, isActive && styles.desktopTabTextActive]}>
                  {tab.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.userActions}>
          <TouchableOpacity
            style={styles.profilePill}
            onPress={() => router.push("/(elder)/profile")}
            activeOpacity={0.8}
            accessibilityLabel="Open Elder Profile & Settings"
          >
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarInitials}>
                {user?.full_name ? user.full_name.charAt(0) : "E"}
              </Text>
            </View>
            <View>
              <Text style={styles.profileName}>{user?.full_name || "Eleanor Vance"}</Text>
              <Text style={styles.profileStatus}>Online • Settings</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.exitBtn}
            onPress={handleLogout}
            accessibilityLabel="Log out and return to landing page"
          >
            <LogOut size={16} color={Theme.colors.textMuted} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {isDesktop && renderDesktopHeader()}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: isDesktop ? { display: "none" } : styles.mobileTabBar,
          tabBarActiveTintColor: Theme.colors.primary,
          tabBarInactiveTintColor: Theme.colors.textMuted,
          tabBarLabelStyle: styles.tabLabel,
          tabBarItemStyle: styles.tabItem,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <Home color={color} size={22} />,
          }}
        />
        <Tabs.Screen
          name="medications"
          options={{
            title: "Meds",
            tabBarIcon: ({ color }) => <Pill color={color} size={22} />,
          }}
        />
        <Tabs.Screen
          name="checklist"
          options={{
            title: "Routine",
            tabBarIcon: ({ color }) => <CheckSquare color={color} size={22} />,
          }}
        />
        <Tabs.Screen
          name="checkin"
          options={{
            title: "Wellness",
            tabBarIcon: ({ color }) => <Smile color={color} size={22} />,
          }}
        />
        <Tabs.Screen
          name="timeline"
          options={{
            title: "Timeline",
            tabBarIcon: ({ color }) => <Clock color={color} size={22} />,
          }}
        />
        {/* Hidden internal routes from tab bar */}
        <Tabs.Screen
          name="profile"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="appointments"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  desktopNavWrapper: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
    ...Theme.shadows.sm,
  },
  desktopNav: {
    maxWidth: 1200,
    width: "100%",
    marginHorizontal: "auto",
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brandGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  deckTag: {
    backgroundColor: Theme.colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(0, 119, 182, 0.2)",
  },
  deckTagText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 10,
    fontWeight: "800",
    color: Theme.colors.accent,
    letterSpacing: 0.8,
  },
  navLinks: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  desktopTab: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "transparent",
  },
  desktopTabActive: {
    backgroundColor: Theme.colors.primaryLight,
  },
  desktopTabText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 14,
    fontWeight: "600",
    color: Theme.colors.textMuted,
  },
  desktopTabTextActive: {
    color: Theme.colors.primary,
    fontWeight: "800",
  },
  userActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profilePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: Theme.colors.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 24,
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitials: {
    fontFamily: Theme.fonts.heading,
    fontSize: 13,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  profileName: {
    fontFamily: Theme.fonts.heading,
    fontSize: 13,
    fontWeight: "700",
    color: Theme.colors.text,
  },
  profileStatus: {
    fontFamily: Theme.fonts.body,
    fontSize: 11,
    color: "#059669",
    fontWeight: "600",
  },
  exitBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  mobileTabBar: {
    minHeight: 64,
    paddingBottom: 6,
    paddingTop: 6,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
    ...Theme.shadows.md,
  },
  tabItem: {
    paddingVertical: 2,
  },
  tabLabel: {
    fontFamily: Theme.fonts.heading,
    fontSize: 11,
    fontWeight: "700",
    marginTop: 2,
  },
});
