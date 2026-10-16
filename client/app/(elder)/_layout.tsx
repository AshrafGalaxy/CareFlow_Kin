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
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { useRouter, usePathname, Redirect } from "expo-router";
import { CareFlowLogo } from "../../components/CareFlowLogo";
import { useAuth } from "../../context/AuthContext";
import { useResponsive } from "../../hooks/useResponsive";
import {
  AccessibilityProvider,
  useAccessibility,
} from "../../context/AccessibilityContext";
import { NavAccessibilityControls } from "../../components/NavAccessibilityControls";

function ElderLayoutContent() {
  const { isSmallMobile, isMobile, isTablet } = useResponsive();
  const router = useRouter();
  const pathname = usePathname();
  const { user, token, isLoading, logout } = useAuth();
  const { colors, isDark, isAAAMode } = useAccessibility();

  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <Text
          style={{
            fontFamily: Theme.fonts.heading,
            fontSize: 16,
            color: colors.textMuted,
          }}
        >
          Verifying security credentials...
        </Text>
      </View>
    );
  }

  // Declarative navigation safely waits for Root Layout mounting
  if (!token || !user) {
    return <Redirect href="/(auth)/login" />;
  }

  const navItems = [
    { name: "Overview", path: "/(elder)", icon: Home },
    { name: "Medications", path: "/(elder)/medications", icon: Pill },
    { name: "Daily Routine", path: "/(elder)/checklist", icon: CheckSquare },
    { name: "Wellness Sharing", path: "/(elder)/checkin", icon: Smile },
    { name: "Appointments", path: "/(elder)/appointments", icon: Calendar },
    { name: "Care Timeline", path: "/(elder)/timeline", icon: Clock },
    { name: "Profile & Vitals", path: "/(elder)/profile", icon: User },
  ];

  const currentNavItem = navItems.find(
    (item) =>
      pathname === item.path ||
      (item.path === "/(elder)" &&
        (pathname === "/(elder)/index" || pathname === "/(elder)"))
  );
  const currentTitle = currentNavItem ? currentNavItem.name : "Elder Care Deck";

  // Render Desktop / Tablet Sidebar Navigation
  const renderSidebar = () => (
    <View
      style={[
        styles.sidebar,
        {
          backgroundColor: isDark ? "#000000" : "#FFFFFF",
          borderRightColor: isAAAMode
            ? isDark
              ? "#52525B"
              : "#CBD5E1"
            : isDark
            ? "#27272A"
            : colors.border,
          borderRightWidth: isAAAMode ? 1.5 : 1,
        },
        isTablet && styles.sidebarTablet,
      ]}
    >
      {/* Brand Header */}
      <View
        style={[
          styles.sidebarHeader,
          { borderBottomColor: isDark ? "#27272A" : Theme.colors.borderSubtle },
        ]}
      >
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
        <Text
          style={[
            styles.navSectionTitle,
            { color: isDark ? "#A1A1AA" : Theme.colors.textLight },
          ]}
        >
          NAVIGATION
        </Text>
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
                  isActive && {
                    backgroundColor: isDark
                      ? "#18181B"
                      : Theme.colors.primaryLight,
                  },
                  isTablet && styles.navItemTablet,
                ]}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={item.name}
              >
                <View
                  style={[
                    styles.navIconWrap,
                    isActive && {
                      backgroundColor: isDark ? "#27272A" : "#FFFFFF",
                      ...Theme.shadows.sm,
                    },
                  ]}
                >
                  <Icon
                    size={20}
                    color={isActive ? colors.primary : colors.textMuted}
                  />
                </View>

                {!isTablet && (
                  <Text
                    style={[
                      styles.navText,
                      { color: isActive ? colors.primary : colors.textSecondary },
                      isActive && styles.navTextActive,
                    ]}
                  >
                    {item.name}
                  </Text>
                )}

                {isActive && (
                  <View
                    style={[
                      styles.activeIndicator,
                      { backgroundColor: colors.primary },
                    ]}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Sidebar Footer: Elder Profile Card & Sign Out */}
      <View
        style={[
          styles.sidebarFooter,
          { borderTopColor: isDark ? "#27272A" : Theme.colors.borderSubtle },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.userCard,
            {
              backgroundColor: isDark ? "#121212" : colors.background,
              borderColor: isDark ? "#27272A" : colors.border,
            },
          ]}
          onPress={() => router.push("/(elder)/profile")}
          activeOpacity={0.8}
          accessibilityLabel="Open Elder Profile & Settings"
        >
          <View
            style={[
              styles.avatarCircle,
              { backgroundColor: colors.primary },
            ]}
          >
            <Text style={styles.avatarInitials}>
              {user?.full_name ? user.full_name.charAt(0) : "E"}
            </Text>
          </View>
          {!isTablet && (
            <View style={styles.userInfoWrap}>
              <Text
                style={[styles.userName, { color: colors.text }]}
                numberOfLines={1}
              >
                {user?.full_name || "Eleanor Vance"}
              </Text>
              <View style={styles.statusRow}>
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: colors.success },
                  ]}
                />
                <Text
                  style={[styles.userStatusText, { color: colors.textMuted }]}
                >
                  Vitals Monitored
                </Text>
              </View>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.sidebarLogoutBtn,
            {
              backgroundColor: isDark ? "#121212" : "#FFFFFF",
              borderColor: isDark ? "#27272A" : colors.border,
            },
          ]}
          onPress={handleLogout}
          accessibilityLabel="Sign out of deck"
          activeOpacity={0.7}
        >
          <LogOut size={16} color={colors.textMuted} />
          {!isTablet && (
            <Text style={[styles.logoutBtnText, { color: colors.textMuted }]}>
              Sign Out
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  // Render Desktop / Tablet Top Navigation Header
  const renderDesktopTopBar = () => (
    <View
      style={[
        styles.desktopTopBar,
        {
          backgroundColor: isDark ? "#000000" : "#FFFFFF",
          borderBottomColor: isAAAMode
            ? isDark
              ? "#52525B"
              : "#CBD5E1"
            : isDark
            ? "#27272A"
            : colors.border,
          borderBottomWidth: isAAAMode ? 1.5 : 1,
          justifyContent: "flex-end",
        },
      ]}
    >
      {/* Top-Right Single Accessibility & Theme Menu Trigger */}
      <View style={styles.topBarRightCluster}>
        <NavAccessibilityControls />
      </View>
    </View>
  );

  // Render Mobile Top Header
  const renderMobileHeader = () => (
    <View
      style={[
        styles.mobileTopBar,
        {
          backgroundColor: isDark ? "#000000" : "#FFFFFF",
          borderBottomColor: isAAAMode
            ? isDark
              ? "#52525B"
              : "#CBD5E1"
            : isDark
            ? "#27272A"
            : colors.border,
          borderBottomWidth: isAAAMode ? 1.5 : 1,
          paddingHorizontal: isSmallMobile ? 12 : 16,
        },
      ]}
    >
      <View style={styles.mobileBrandGroup}>
        <TouchableOpacity onPress={() => router.push("/")} activeOpacity={0.8}>
          <CareFlowLogo size={28} showText={!isSmallMobile} />
        </TouchableOpacity>
      </View>

      <View style={styles.mobileActions}>
        {/* Top-Right Navigation Accessibility Controls (Compact trigger & slide-up modal) */}
        <NavAccessibilityControls />

        <TouchableOpacity
          style={styles.mobileProfileBtn}
          onPress={() => router.push("/(elder)/profile")}
          accessibilityLabel="Elder Profile & Settings"
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.avatarCircleSmall,
              { backgroundColor: colors.primary },
            ]}
          >
            <Text style={styles.avatarInitialsSmall}>
              {user?.full_name ? user.full_name.charAt(0) : "E"}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.exitBtnSmall,
            {
              backgroundColor: isDark ? "#121212" : "#FFFFFF",
              borderColor: isDark ? "#27272A" : colors.border,
            },
          ]}
          onPress={handleLogout}
          accessibilityLabel="Log out"
        >
          <LogOut size={15} color={colors.textMuted} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
        !isMobile && styles.containerRow,
      ]}
    >
      {!isMobile ? renderSidebar() : renderMobileHeader()}

      <View style={styles.mainContentArea}>
        {!isMobile && renderDesktopTopBar()}

        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: !isMobile
              ? { display: "none" }
              : [
                  styles.mobileTabBar,
                  {
                    backgroundColor: isDark ? "#000000" : "#FFFFFF",
                    borderTopColor: isAAAMode
                      ? isDark
                        ? "#52525B"
                        : "#CBD5E1"
                      : isDark
                      ? "#27272A"
                      : colors.border,
                    borderTopWidth: isAAAMode ? 1.5 : 1,
                  },
                ],
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textMuted,
            tabBarLabelStyle: [
              styles.tabLabel,
              isSmallMobile && styles.tabLabelSmall,
            ],
            tabBarItemStyle: styles.tabItem,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => (
                <Home color={color} size={isSmallMobile ? 19 : 22} />
              ),
            }}
          />
          <Tabs.Screen
            name="medications"
            options={{
              title: "Meds",
              tabBarIcon: ({ color }) => (
                <Pill color={color} size={isSmallMobile ? 19 : 22} />
              ),
            }}
          />
          <Tabs.Screen
            name="checklist"
            options={{
              title: "Routine",
              tabBarIcon: ({ color }) => (
                <CheckSquare color={color} size={isSmallMobile ? 19 : 22} />
              ),
            }}
          />
          <Tabs.Screen
            name="checkin"
            options={{
              title: "Wellness",
              tabBarIcon: ({ color }) => (
                <Smile color={color} size={isSmallMobile ? 19 : 22} />
              ),
            }}
          />
          <Tabs.Screen
            name="timeline"
            options={{
              title: "Timeline",
              tabBarIcon: ({ color }) => (
                <Clock color={color} size={isSmallMobile ? 19 : 22} />
              ),
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

export default function ElderLayout() {
  return (
    <AccessibilityProvider>
      <ElderLayoutContent />
    </AccessibilityProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerRow: {
    flexDirection: "row",
  },
  mainContentArea: {
    flex: 1,
    height: "100%",
  },

  // Desktop / Tablet Top Bar
  desktopTopBar: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    zIndex: 20,
    ...Platform.select({
      web: {
        backdropFilter: "blur(12px)",
      },
    }),
  },
  topBarTitleArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  topBarHeading: {
    fontFamily: Theme.fonts.heading,
    fontSize: 20,
    fontWeight: "800",
  },
  liveSyncBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    backgroundColor: "transparent",
  },
  liveSyncDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  liveSyncText: {
    fontFamily: Theme.fonts.body,
    fontSize: 12,
    fontWeight: "500",
  },
  topBarRightCluster: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  topBarUserBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  topBarAvatarCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  topBarAvatarText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  topBarUserName: {
    fontFamily: Theme.fonts.heading,
    fontSize: 13,
    fontWeight: "600",
    paddingRight: 4,
  },
  topBarLogoutBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  // Desktop / Tablet Sidebar Styles
  sidebar: {
    width: 250,
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
  navIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  navText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },
  navTextActive: {
    fontWeight: "700",
  },
  activeIndicator: {
    position: "absolute",
    left: 0,
    top: 8,
    bottom: 8,
    width: 3,
    borderRadius: 2,
  },

  // Sidebar Footer
  sidebarFooter: {
    paddingTop: Theme.spacing.md,
    borderTopWidth: 1,
    gap: 10,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 8,
    borderRadius: Theme.ergonomics.buttonRadius,
    borderWidth: 1,
  },
  avatarCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
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
  },
  userStatusText: {
    fontFamily: Theme.fonts.body,
    fontSize: 10,
    fontWeight: "500",
  },
  sidebarLogoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 8,
    borderRadius: Theme.ergonomics.buttonRadius,
    borderWidth: 1,
  },
  logoutBtnText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 12,
    fontWeight: "500",
  },

  // Mobile Top Bar
  mobileTopBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
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
    width: 32,
    height: 32,
    borderRadius: 16,
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
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  // Mobile Bottom Tab Bar
  mobileTabBar: {
    minHeight: 64,
    paddingBottom: 6,
    paddingTop: 6,
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
    fontFamily: Theme.fonts.heading,
    fontSize: 10,
  },
});
