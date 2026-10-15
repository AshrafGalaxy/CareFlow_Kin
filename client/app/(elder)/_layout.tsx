import React from "react";
import { Tabs } from "expo-router";
import { Theme } from "../../constants/theme";
import { Home, Pill, CheckSquare, Smile, Clock, UserCheck } from "lucide-react-native";
import { useWindowDimensions, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, usePathname } from "expo-router";

export default function ElderLayout() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= Theme.breakpoints.medium;
  const router = useRouter();
  const pathname = usePathname();

  // Desktop Navigation Deck Header
  const renderDesktopHeader = () => (
    <View style={styles.desktopNav}>
      <View style={styles.brandGroup}>
        <View style={styles.brandLogoBox}>
          <Text style={styles.brandLogoGlyph}>CF</Text>
        </View>
        <View>
          <Text style={styles.navBrand}>Careflow</Text>
          <Text style={styles.navSub}>Elder Care Deck</Text>
        </View>
      </View>

      <View style={styles.navLinks}>
        {[
          { name: "Overview", path: "/(elder)" },
          { name: "Medications", path: "/(elder)/medications" },
          { name: "Daily Checklist", path: "/(elder)/checklist" },
          { name: "Wellness Sharing", path: "/(elder)/checkin" },
          { name: "Care Timeline", path: "/(elder)/timeline" },
        ].map((tab) => {
          const isActive = pathname === tab.path || (tab.path === "/(elder)" && pathname === "/(elder)/index");
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

      <View style={styles.profilePill}>
        <UserCheck size={18} color={Theme.colors.success} />
        <Text style={styles.profileText}>Eleanor V. (Active)</Text>
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
            tabBarIcon: ({ color, size }) => <Home color={color} size={24} />,
          }}
        />
        <Tabs.Screen
          name="medications"
          options={{
            title: "Meds",
            tabBarIcon: ({ color, size }) => <Pill color={color} size={24} />,
          }}
        />
        <Tabs.Screen
          name="checklist"
          options={{
            title: "Routine",
            tabBarIcon: ({ color, size }) => <CheckSquare color={color} size={24} />,
          }}
        />
        <Tabs.Screen
          name="checkin"
          options={{
            title: "Wellness",
            tabBarIcon: ({ color, size }) => <Smile color={color} size={24} />,
          }}
        />
        <Tabs.Screen
          name="timeline"
          options={{
            title: "Timeline",
            tabBarIcon: ({ color, size }) => <Clock color={color} size={24} />,
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
  desktopNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Theme.colors.card,
    borderBottomWidth: Theme.ergonomics.borderWidth,
    borderBottomColor: Theme.colors.border,
    paddingHorizontal: Theme.spacing.xl,
    paddingVertical: Theme.spacing.md,
    shadowColor: Theme.colors.deepTwilight,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  brandGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.sm,
  },
  brandLogoBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  brandLogoGlyph: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  navBrand: {
    fontSize: Theme.typography.subheading - 2,
    fontWeight: "800",
    color: Theme.colors.text,
    letterSpacing: -0.5,
  },
  navSub: {
    fontSize: 12,
    fontWeight: "700",
    color: Theme.colors.brightTealBlue,
    letterSpacing: 0.5,
  },
  navLinks: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  desktopTab: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: Theme.ergonomics.buttonRadius,
    backgroundColor: "transparent",
  },
  desktopTabActive: {
    backgroundColor: Theme.colors.primaryLight,
  },
  desktopTabText: {
    fontSize: 16,
    fontWeight: "600",
    color: Theme.colors.textMuted,
  },
  desktopTabTextActive: {
    color: Theme.colors.primary,
    fontWeight: "800",
  },
  profilePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Theme.colors.surfaceLight,
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  profileText: {
    fontSize: 14,
    fontWeight: "700",
    color: Theme.colors.text,
  },
  mobileTabBar: {
    minHeight: 68,
    paddingBottom: 8,
    paddingTop: 8,
    backgroundColor: Theme.colors.card,
    borderTopWidth: Theme.ergonomics.borderWidth,
    borderTopColor: Theme.colors.border,
    elevation: 8,
  },
  tabItem: {
    paddingVertical: 2,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "700",
    marginTop: 2,
  },
});
