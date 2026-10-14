import React from "react";
import { Tabs } from "expo-router";
import { Theme } from "../../constants/theme";
import { Home, Pill, CheckSquare, Smile, Clock } from "lucide-react-native";
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
        <Text style={styles.navBrand}>Careflow</Text>
        <Text style={styles.navBadge}>Elder Portal</Text>
      </View>
      <View style={styles.navLinks}>
        {[
          { name: "Home", path: "/(elder)" },
          { name: "Medications", path: "/(elder)/medications" },
          { name: "Checklist", path: "/(elder)/checklist" },
          { name: "Check-In", path: "/(elder)/checkin" },
          { name: "Timeline", path: "/(elder)/timeline" },
        ].map((tab) => {
          const isActive = pathname === tab.path || (tab.path === "/(elder)" && pathname === "/(elder)/index");
          return (
            <TouchableOpacity
              key={tab.path}
              onPress={() => router.push(tab.path as any)}
              style={[styles.desktopTab, isActive && styles.desktopTabActive]}
            >
              <Text style={[styles.desktopTabText, isActive && styles.desktopTabTextActive]}>
                {tab.name}
              </Text>
            </TouchableOpacity>
          );
        })}
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
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => <Home color={color} size={size + 2} />,
          }}
        />
        <Tabs.Screen
          name="medications"
          options={{
            title: "Meds",
            tabBarIcon: ({ color, size }) => <Pill color={color} size={size + 2} />,
          }}
        />
        <Tabs.Screen
          name="checklist"
          options={{
            title: "Checklist",
            tabBarIcon: ({ color, size }) => <CheckSquare color={color} size={size + 2} />,
          }}
        />
        <Tabs.Screen
          name="checkin"
          options={{
            title: "Wellness",
            tabBarIcon: ({ color, size }) => <Smile color={color} size={size + 2} />,
          }}
        />
        <Tabs.Screen
          name="timeline"
          options={{
            title: "Timeline",
            tabBarIcon: ({ color, size }) => <Clock color={color} size={size + 2} />,
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
  },
  brandGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.sm,
  },
  navBrand: {
    fontSize: Theme.typography.subheading,
    fontWeight: "800",
    color: Theme.colors.primary,
  },
  navBadge: {
    fontSize: 14,
    fontWeight: "700",
    color: Theme.colors.accent,
    backgroundColor: Theme.colors.accentLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  navLinks: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.sm,
  },
  desktopTab: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: Theme.ergonomics.buttonRadius,
  },
  desktopTabActive: {
    backgroundColor: Theme.colors.primaryLight,
  },
  desktopTabText: {
    fontSize: Theme.typography.body,
    fontWeight: "600",
    color: Theme.colors.textMuted,
  },
  desktopTabTextActive: {
    color: Theme.colors.primary,
    fontWeight: "800",
  },
  mobileTabBar: {
    minHeight: 64,
    paddingBottom: 8,
    paddingTop: 8,
    backgroundColor: Theme.colors.card,
    borderTopWidth: Theme.ergonomics.borderWidth,
    borderTopColor: Theme.colors.border,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "700",
  },
});
