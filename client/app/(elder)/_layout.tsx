import React from "react";
import { Tabs } from "expo-router";
import { Theme } from "../../constants/theme";
import {
  Home,
  Pill,
  CheckSquare,
  Smile,
  Clock,
  Calendar,
  User,
  LogOut,
} from "lucide-react-native";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { CareFlowLogo } from "../../components/CareFlowLogo";
import { useAuth } from "../../context/AuthContext";
import { useResponsive } from "../../hooks/useResponsive";

export default function ElderLayout() {
  const { isSmallMobile, isMobile, isTablet, isDesktop } = useResponsive();
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  const navItems = [
    { name: "Overview", path: "/(elder)", icon: Home },
    { name: "Medications", path: "/(elder)/medications", icon: Pill },
    { name: "Daily Routine", path: "/(elder)/checklist", icon: CheckSquare },
    { name: "Wellness Sharing", path: "/(elder)/checkin", icon: Smile },
    { name: "Appointments", path: "/(elder)/appointments", icon: Calendar },
    { name: "Care Timeline", path: "/(elder)/timeline", icon: Clock },
    { name: "Profile & Vitals", path: "/(elder)/profile", icon: User },
  ];

  // Render Desktop / Tablet Sidebar Navigation
  const renderSidebar = () => (
    <View style={[styles.sidebar, isTablet && styles.sidebarTablet]}>
      {/* Brand Header */}
      <View style={styles.sidebarHeader}>
        <TouchableOpacity
          onPress={() => router.push("/")}
          activeOpacity={0.8}
          style={styles.brandRow}
        >
          <CareFlowLogo size={32} showText={!isTablet} />
        </TouchableOpacity>
      </View>

      {/* Navigation List */}
      <View style={styles.navSection}>
        <Text style={styles.navSectionTitle}>NAVIGATION</Text>
        <ScrollView
          style={styles.navScroll}
          contentContainerStyle={styles.navScrollContent}
          showsVerticalScrollIndicator={false}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.path ||
              (item.path === "/(elder)" &&
                (pathname === "/(elder)/index" || pathname === "/(elder)"));

            return (
              <TouchableOpacity
                key={item.path}
                onPress={() => router.push(item.path as any)}
                style={[
                  styles.navItem,
                  isActive && styles.navItemActive,
                  isTablet && styles.navItemTablet,
                ]}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={item.name}
              >
                <View
                  style={[
                    styles.navIconWrap,
                    isActive && styles.navIconWrapActive,
                  ]}
                >
                  <Icon
                    size={20}
                    color={isActive ? Theme.colors.primary : Theme.colors.textMuted}
                  />
                </View>

                {!isTablet && (
                  <Text
                    style={[
                      styles.navText,
                      isActive && styles.navTextActive,
                    ]}
                  >
                    {item.name}
                  </Text>
                )}

                {isActive && <View style={styles.activeIndicator} />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Sidebar Footer: Elder Profile Card & Sign Out */}
      <View style={styles.sidebarFooter}>
        <TouchableOpacity
          style={styles.userCard}
          onPress={() => router.push("/(elder)/profile")}
          activeOpacity={0.8}
          accessibilityLabel="Open Elder Profile & Settings"
        >
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitials}>
              {user?.full_name ? user.full_name.charAt(0) : "E"}
            </Text>
          </View>
          {!isTablet && (
            <View style={styles.userInfoWrap}>
              <Text style={styles.userName} numberOfLines={1}>
                {user?.full_name || "Eleanor Vance"}
              </Text>
              <View style={styles.statusRow}>
                <View style={styles.statusDot} />
                <Text style={styles.userStatusText}>Vitals Monitored</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sidebarLogoutBtn}
          onPress={handleLogout}
          accessibilityLabel="Sign out of deck"
          activeOpacity={0.7}
        >
          <LogOut size={16} color={Theme.colors.textMuted} />
          {!isTablet && <Text style={styles.logoutBtnText}>Sign Out</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );

  // Render Mobile Top Header
  const renderMobileHeader = () => (
    <View style={[styles.mobileTopBar, { paddingHorizontal: isSmallMobile ? 12 : 16 }]}>
      <View style={styles.mobileBrandGroup}>
        <TouchableOpacity onPress={() => router.push("/")} activeOpacity={0.8}>
          <CareFlowLogo size={28} showText={!isSmallMobile} />
        </TouchableOpacity>
      </View>

      <View style={styles.mobileActions}>
        <TouchableOpacity
          style={styles.mobileProfileBtn}
          onPress={() => router.push("/(elder)/profile")}
          accessibilityLabel="Elder Profile & Settings"
          activeOpacity={0.8}
        >
          <View style={styles.avatarCircleSmall}>
            <Text style={styles.avatarInitialsSmall}>
              {user?.full_name ? user.full_name.charAt(0) : "E"}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.exitBtnSmall}
          onPress={handleLogout}
          accessibilityLabel="Log out"
        >
          <LogOut size={15} color={Theme.colors.textMuted} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, !isMobile && styles.containerRow]}>
      {!isMobile ? renderSidebar() : renderMobileHeader()}

      <View style={styles.mainContentArea}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: !isMobile ? { display: "none" } : styles.mobileTabBar,
            tabBarActiveTintColor: Theme.colors.primary,
            tabBarInactiveTintColor: Theme.colors.textMuted,
            tabBarLabelStyle: [styles.tabLabel, isSmallMobile && styles.tabLabelSmall],
            tabBarItemStyle: styles.tabItem,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => <Home color={color} size={isSmallMobile ? 19 : 22} />,
            }}
          />
          <Tabs.Screen
            name="medications"
            options={{
              title: "Meds",
              tabBarIcon: ({ color }) => <Pill color={color} size={isSmallMobile ? 19 : 22} />,
            }}
          />
          <Tabs.Screen
            name="checklist"
            options={{
              title: "Routine",
              tabBarIcon: ({ color }) => <CheckSquare color={color} size={isSmallMobile ? 19 : 22} />,
            }}
          />
          <Tabs.Screen
            name="checkin"
            options={{
              title: "Wellness",
              tabBarIcon: ({ color }) => <Smile color={color} size={isSmallMobile ? 19 : 22} />,
            }}
          />
          <Tabs.Screen
            name="timeline"
            options={{
              title: "Timeline",
              tabBarIcon: ({ color }) => <Clock color={color} size={isSmallMobile ? 19 : 22} />,
            }}
          />

          {/* Internal routes hidden from mobile bottom bar */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  containerRow: {
    flexDirection: "row",
  },
  mainContentArea: {
    flex: 1,
    height: "100%",
  },

  // Desktop / Tablet Sidebar Styles
  sidebar: {
    width: 250,
    backgroundColor: "#FFFFFF",
    borderRightWidth: 1,
    borderRightColor: Theme.colors.border,
    paddingVertical: Theme.spacing.lg,
    paddingHorizontal: Theme.spacing.md,
    justifyContent: "space-between",
    ...Theme.shadows.sm,
  },
  sidebarTablet: {
    width: 80,
    paddingHorizontal: Theme.spacing.sm,
    alignItems: "center",
  },
  sidebarHeader: {
    marginBottom: Theme.spacing.lg,
    paddingBottom: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.borderSubtle,
    alignItems: "flex-start",
  },
  brandRow: {
    marginBottom: 0,
  },

  navSection: {
    flex: 1,
  },
  navSectionTitle: {
    fontFamily: Theme.fonts.heading,
    fontSize: 11,
    fontWeight: "600",
    color: Theme.colors.textLight,
    letterSpacing: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  navScroll: {
    flex: 1,
  },
  navScrollContent: {
    gap: 4,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: Theme.ergonomics.buttonRadius,
    backgroundColor: "transparent",
    position: "relative",
  },
  navItemTablet: {
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  navItemActive: {
    backgroundColor: Theme.colors.primaryLight,
  },
  navIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  navIconWrapActive: {
    backgroundColor: "#FFFFFF",
    ...Theme.shadows.sm,
  },
  navText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 14,
    fontWeight: "500",
    color: Theme.colors.textSecondary,
    flex: 1,
  },
  navTextActive: {
    color: Theme.colors.primary,
    fontWeight: "600",
  },
  activeIndicator: {
    position: "absolute",
    left: 0,
    top: 8,
    bottom: 8,
    width: 3,
    borderRadius: 2,
    backgroundColor: Theme.colors.primary,
  },

  // Sidebar Footer
  sidebarFooter: {
    paddingTop: Theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.borderSubtle,
    gap: 10,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 8,
    borderRadius: Theme.ergonomics.buttonRadius,
    backgroundColor: Theme.colors.background,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  avatarCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitials: {
    fontFamily: Theme.fonts.heading,
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  userInfoWrap: {
    flex: 1,
  },
  userName: {
    fontFamily: Theme.fonts.heading,
    fontSize: 13,
    fontWeight: "600",
    color: Theme.colors.text,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Theme.colors.success,
  },
  userStatusText: {
    fontFamily: Theme.fonts.body,
    fontSize: 10,
    color: Theme.colors.textMuted,
    fontWeight: "500",
  },
  sidebarLogoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 8,
    borderRadius: Theme.ergonomics.buttonRadius,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  logoutBtnText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 12,
    fontWeight: "500",
    color: Theme.colors.textMuted,
  },

  // Mobile Top Bar
  mobileTopBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
    ...Theme.shadows.sm,
  },
  mobileBrandGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  mobileActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  mobileProfileBtn: {
    padding: 2,
  },
  avatarCircleSmall: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitialsSmall: {
    fontFamily: Theme.fonts.heading,
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  exitBtnSmall: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  // Mobile Bottom Tab Bar
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
    fontWeight: "600",
    marginTop: 2,
  },
  tabLabelSmall: {
    fontSize: 10,
  },
});
