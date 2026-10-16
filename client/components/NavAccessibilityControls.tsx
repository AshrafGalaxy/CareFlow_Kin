import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Platform,
  Pressable,
} from "react-native";
import {
  Sun,
  Moon,
  Type,
  Eye,
  Check,
  Sparkles,
  Sliders,
  X,
} from "lucide-react-native";
import { Theme } from "../constants/theme";
import { useAccessibility, FontScale } from "../context/AccessibilityContext";
import { useResponsive } from "../hooks/useResponsive";

export const NavAccessibilityControls: React.FC = () => {
  const {
    isAAAMode,
    themeMode,
    isDark,
    fontScale,
    colors,
    toggleThemeMode,
    setThemeMode,
    toggleAAAMode,
    setFontScale,
    cycleFontScale,
  } = useAccessibility();

  const { isMobile, isTablet, isDesktop, isSmallMobile } = useResponsive();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // Tablet Font Label
  const fontBadgeLabel = fontScale === "normal" ? "A" : fontScale === "large" ? "A+" : "A++";

  // Render Desktop Glassmorphic Cluster (>= 1024px)
  const renderDesktop = () => (
    <View
      style={[
        styles.desktopCluster,
        {
          backgroundColor: isDark ? "rgba(21, 29, 46, 0.9)" : "rgba(255, 255, 255, 0.92)",
          borderColor: isAAAMode ? (isDark ? "#475569" : "#CBD5E1") : colors.border,
          borderWidth: isAAAMode ? 1.5 : 1,
        },
      ]}
      accessibilityRole="toolbar"
      accessibilityLabel="Accessibility Controls"
    >
      {/* 1-Tap Theme Switcher Button */}
      <TouchableOpacity
        onPress={toggleThemeMode}
        activeOpacity={0.75}
        style={[
          styles.themePill,
          {
            backgroundColor: isDark ? "#1E293B" : "#F1F5F9",
            borderColor: isDark ? "#334155" : "#E2E8F0",
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel={`Current theme is ${themeMode}. Click to switch to ${isDark ? "Light" : "Dark"} mode.`}
      >
        <View style={styles.iconBox}>
          {isDark ? (
            <Sun size={16} color="#FBBF24" strokeWidth={2.2} />
          ) : (
            <Moon size={16} color="#0284C7" strokeWidth={2.2} />
          )}
        </View>
        <Text
          style={[
            styles.pillText,
            { color: isDark ? "#F8FAFC" : "#0F172A" },
          ]}
        >
          {isDark ? "Dark" : "Light"}
        </Text>
      </TouchableOpacity>

      <View style={[styles.clusterDivider, { backgroundColor: colors.border }]} />

      {/* Font Scale Selector: A / A+ / A++ */}
      <View
        style={[
          styles.fontSegmentGroup,
          {
            backgroundColor: isDark ? "#162032" : "#F1F5F9",
            borderColor: isDark ? "#1E293B" : "#E2E8F0",
          },
        ]}
      >
        {(["normal", "large", "extraLarge"] as FontScale[]).map((scale) => {
          const isActive = fontScale === scale;
          const label = scale === "normal" ? "A" : scale === "large" ? "A+" : "A++";
          const title =
            scale === "normal"
              ? "Standard text size"
              : scale === "large"
              ? "Large text size"
              : "Extra large text size";

          return (
            <TouchableOpacity
              key={scale}
              onPress={() => setFontScale(scale)}
              activeOpacity={0.8}
              style={[
                styles.fontSegmentBtn,
                isActive && [
                  styles.fontSegmentBtnActive,
                  {
                    backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
                    borderColor: isDark ? "#38BDF8" : "#0284C7",
                  },
                ],
              ]}
              accessibilityRole="button"
              accessibilityLabel={title}
              accessibilityState={{ selected: isActive }}
            >
              <Text
                style={[
                  styles.fontSegmentText,
                  { color: isDark ? "#94A3B8" : "#64748B" },
                  isActive && {
                    color: isDark ? "#38BDF8" : "#0284C7",
                    fontWeight: "800",
                  },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={[styles.clusterDivider, { backgroundColor: colors.border }]} />

      {/* WCAG AAA High-Contrast Toggle Button */}
      <TouchableOpacity
        onPress={toggleAAAMode}
        activeOpacity={0.75}
        style={[
          styles.aaaToggleBtn,
          isAAAMode
            ? {
                backgroundColor: isDark ? "#064E3B" : "#ECFDF5",
                borderColor: isDark ? "#34D399" : "#059669",
              }
            : {
                backgroundColor: isDark ? "#1E293B" : "#F8FAFC",
                borderColor: isDark ? "#334155" : "#E2E8F0",
              },
        ]}
        accessibilityRole="button"
        accessibilityLabel={`WCAG AAA Contrast mode is currently ${isAAAMode ? "active" : "inactive"}. Click to toggle.`}
      >
        <View style={styles.iconBox}>
          {isAAAMode ? (
            <Check size={14} color={isDark ? "#34D399" : "#059669"} strokeWidth={3} />
          ) : (
            <Eye size={14} color={isDark ? "#94A3B8" : "#64748B"} strokeWidth={2} />
          )}
        </View>
        <Text
          style={[
            styles.aaaBtnText,
            {
              color: isAAAMode
                ? isDark
                  ? "#34D399"
                  : "#047857"
                : isDark
                ? "#CBD5E1"
                : "#475569",
            },
          ]}
        >
          {isAAAMode ? "WCAG AAA" : "Contrast"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  // Render Tablet High-Tactile Buttons (768px - 1024px)
  const renderTablet = () => (
    <View style={styles.tabletCluster}>
      {/* 1-Tap Theme Switcher */}
      <TouchableOpacity
        onPress={toggleThemeMode}
        activeOpacity={0.75}
        style={[
          styles.tactileBtn,
          {
            backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
            borderColor: isDark ? "#334155" : "#E2E8F0",
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel={`Switch to ${isDark ? "Light" : "Dark"} mode`}
      >
        {isDark ? (
          <Sun size={20} color="#FBBF24" strokeWidth={2.2} />
        ) : (
          <Moon size={20} color="#0284C7" strokeWidth={2.2} />
        )}
      </TouchableOpacity>

      {/* Font Scale Cycle Button */}
      <TouchableOpacity
        onPress={cycleFontScale}
        activeOpacity={0.75}
        style={[
          styles.tactileBtn,
          {
            backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
            borderColor: isDark ? "#334155" : "#E2E8F0",
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel={`Cycle text size. Currently ${fontBadgeLabel}.`}
      >
        <Type size={18} color={isDark ? "#38BDF8" : "#0284C7"} strokeWidth={2.2} />
        <View
          style={[
            styles.tabletBadge,
            { backgroundColor: isDark ? "#0C243B" : "#E0F2FE" },
          ]}
        >
          <Text
            style={[
              styles.tabletBadgeText,
              { color: isDark ? "#38BDF8" : "#0284C7" },
            ]}
          >
            {fontBadgeLabel}
          </Text>
        </View>
      </TouchableOpacity>

      {/* WCAG AAA Toggle Button */}
      <TouchableOpacity
        onPress={toggleAAAMode}
        activeOpacity={0.75}
        style={[
          styles.tactileBtn,
          isAAAMode
            ? {
                backgroundColor: isDark ? "#064E3B" : "#ECFDF5",
                borderColor: isDark ? "#34D399" : "#059669",
              }
            : {
                backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
                borderColor: isDark ? "#334155" : "#E2E8F0",
              },
        ]}
        accessibilityRole="button"
        accessibilityLabel={`Toggle WCAG AAA mode. Currently ${isAAAMode ? "enabled" : "disabled"}.`}
      >
        {isAAAMode ? (
          <Sparkles size={18} color={isDark ? "#34D399" : "#047857"} strokeWidth={2.2} />
        ) : (
          <Eye size={18} color={isDark ? "#94A3B8" : "#64748B"} strokeWidth={2} />
        )}
      </TouchableOpacity>
    </View>
  );

  // Render Mobile Compact Trigger & Accessible Slide-up Sheet (< 768px)
  const renderMobile = () => (
    <>
      {/* Compact Top-Right Header Trigger Button */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
        style={[
          styles.mobileTriggerBtn,
          {
            backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
            borderColor: isAAAMode ? (isDark ? "#34D399" : "#059669") : colors.border,
            borderWidth: isAAAMode ? 1.5 : 1,
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel="Open Accessibility, Theme and Display Settings"
      >
        <Sliders size={18} color={isDark ? "#38BDF8" : "#0284C7"} strokeWidth={2} />
        {/* Status Indicators Pill */}
        <View style={styles.mobileTriggerBadge}>
          <Text
            style={[
              styles.mobileTriggerBadgeText,
              { color: isDark ? "#38BDF8" : "#0284C7" },
            ]}
          >
            {fontBadgeLabel}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Accessible Slide-Up Bottom Sheet Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <Pressable
            style={styles.backdropDismissArea}
            onPress={() => setModalVisible(false)}
            accessibilityLabel="Close accessibility sheet"
          />

          <View
            style={[
              styles.sheetContent,
              {
                backgroundColor: isDark ? "#111827" : "#FFFFFF",
                borderColor: isAAAMode ? (isDark ? "#475569" : "#CBD5E1") : colors.border,
              },
            ]}
          >
            {/* Sheet Handle */}
            <View
              style={[
                styles.sheetHandle,
                { backgroundColor: isDark ? "#374151" : "#CBD5E1" },
              ]}
            />

            {/* Sheet Header */}
            <View style={styles.sheetHeaderRow}>
              <View>
                <Text
                  style={[
                    styles.sheetTitle,
                    { color: isDark ? "#F8FAFC" : "#0F172A" },
                  ]}
                >
                  Accessibility & Comfort
                </Text>
                <Text
                  style={[
                    styles.sheetSubtitle,
                    { color: isDark ? "#94A3B8" : "#64748B" },
                  ]}
                >
                  Customise display for comfort and vision
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[
                  styles.sheetCloseBtn,
                  {
                    backgroundColor: isDark ? "#1F2937" : "#F1F5F9",
                    borderColor: isDark ? "#374151" : "#E2E8F0",
                  },
                ]}
                accessibilityRole="button"
                accessibilityLabel="Close accessibility dialog"
              >
                <X size={20} color={isDark ? "#F8FAFC" : "#0F172A"} />
              </TouchableOpacity>
            </View>

            {/* Section 1: Theme Switcher Cards (>= 64px touch target) */}
            <View style={styles.sheetSection}>
              <Text
                style={[
                  styles.sectionLabel,
                  { color: isDark ? "#94A3B8" : "#475569" },
                ]}
              >
                DISPLAY THEME
              </Text>
              <View style={styles.themeOptionsGrid}>
                {/* Light Mode Option */}
                <TouchableOpacity
                  onPress={() => setThemeMode("light")}
                  activeOpacity={0.8}
                  style={[
                    styles.themeOptionCard,
                    {
                      backgroundColor: !isDark ? "#F0F9FF" : "#1F2937",
                      borderColor: !isDark ? "#0284C7" : "#374151",
                      borderWidth: !isDark ? 2 : 1,
                    },
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel="Switch to Light Mode"
                  accessibilityState={{ selected: !isDark }}
                >
                  <View style={styles.themeOptionLeft}>
                    <View
                      style={[
                        styles.themeOptionIconWrap,
                        { backgroundColor: !isDark ? "#BAE6FD" : "#374151" },
                      ]}
                    >
                      <Sun size={24} color="#0284C7" strokeWidth={2.2} />
                    </View>
                    <View>
                      <Text
                        style={[
                          styles.themeOptionName,
                          { color: isDark ? "#F8FAFC" : "#0F172A" },
                        ]}
                      >
                        Light Canvas
                      </Text>
                      <Text
                        style={[
                          styles.themeOptionDesc,
                          { color: isDark ? "#94A3B8" : "#64748B" },
                        ]}
                      >
                        Clean & high daylight contrast
                      </Text>
                    </View>
                  </View>
                  {!isDark && (
                    <View style={styles.selectedCheckCircle}>
                      <Check size={16} color="#FFFFFF" strokeWidth={3} />
                    </View>
                  )}
                </TouchableOpacity>

                {/* Obsidian Dark Option */}
                <TouchableOpacity
                  onPress={() => setThemeMode("dark")}
                  activeOpacity={0.8}
                  style={[
                    styles.themeOptionCard,
                    {
                      backgroundColor: isDark ? "#0C243B" : "#F8FAFC",
                      borderColor: isDark ? "#38BDF8" : "#E2E8F0",
                      borderWidth: isDark ? 2 : 1,
                    },
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel="Switch to Obsidian Dark Mode"
                  accessibilityState={{ selected: isDark }}
                >
                  <View style={styles.themeOptionLeft}>
                    <View
                      style={[
                        styles.themeOptionIconWrap,
                        { backgroundColor: isDark ? "#163859" : "#E2E8F0" },
                      ]}
                    >
                      <Moon size={24} color="#38BDF8" strokeWidth={2.2} />
                    </View>
                    <View>
                      <Text
                        style={[
                          styles.themeOptionName,
                          { color: isDark ? "#F8FAFC" : "#0F172A" },
                        ]}
                      >
                        Obsidian Dark
                      </Text>
                      <Text
                        style={[
                          styles.themeOptionDesc,
                          { color: isDark ? "#94A3B8" : "#64748B" },
                        ]}
                      >
                        Zero eye glare & deep blacks
                      </Text>
                    </View>
                  </View>
                  {isDark && (
                    <View style={[styles.selectedCheckCircle, { backgroundColor: "#38BDF8" }]}>
                      <Check size={16} color="#0F172A" strokeWidth={3} />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Section 2: Font Scale Selection (>= 60px touch target) */}
            <View style={styles.sheetSection}>
              <Text
                style={[
                  styles.sectionLabel,
                  { color: isDark ? "#94A3B8" : "#475569" },
                ]}
              >
                TEXT READING SIZE
              </Text>
              <View style={styles.fontSizeGrid}>
                {[
                  { scale: "normal" as FontScale, label: "A", name: "Standard", percent: "100%" },
                  { scale: "large" as FontScale, label: "A+", name: "Large (Recommended)", percent: "116%" },
                  { scale: "extraLarge" as FontScale, label: "A++", name: "Maximum", percent: "132%" },
                ].map((item) => {
                  const isActive = fontScale === item.scale;
                  return (
                    <TouchableOpacity
                      key={item.scale}
                      onPress={() => setFontScale(item.scale)}
                      activeOpacity={0.8}
                      style={[
                        styles.fontScaleCard,
                        {
                          backgroundColor: isActive
                            ? isDark
                              ? "#1E293B"
                              : "#F0F9FF"
                            : isDark
                            ? "#1F2937"
                            : "#F8FAFC",
                          borderColor: isActive
                            ? isDark
                              ? "#38BDF8"
                              : "#0284C7"
                            : isDark
                            ? "#374151"
                            : "#E2E8F0",
                          borderWidth: isActive ? 2 : 1,
                        },
                      ]}
                      accessibilityRole="button"
                      accessibilityLabel={`${item.name} text size`}
                      accessibilityState={{ selected: isActive }}
                    >
                      <View style={styles.fontCardLeft}>
                        <View
                          style={[
                            styles.fontLabelCircle,
                            {
                              backgroundColor: isActive
                                ? isDark
                                  ? "#0C243B"
                                  : "#E0F2FE"
                                : isDark
                                ? "#374151"
                                : "#E2E8F0",
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.fontLabelText,
                              {
                                color: isActive
                                  ? isDark
                                    ? "#38BDF8"
                                    : "#0284C7"
                                  : isDark
                                  ? "#CBD5E1"
                                  : "#64748B",
                              },
                            ]}
                          >
                            {item.label}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={[
                              styles.fontNameText,
                              { color: isDark ? "#F8FAFC" : "#0F172A" },
                              isActive && { fontWeight: "700" },
                            ]}
                          >
                            {item.name}
                          </Text>
                          <Text
                            style={[
                              styles.fontPercentText,
                              { color: isDark ? "#94A3B8" : "#64748B" },
                            ]}
                          >
                            Scale {item.percent}
                          </Text>
                        </View>
                      </View>
                      {isActive && (
                        <Check
                          size={18}
                          color={isDark ? "#38BDF8" : "#0284C7"}
                          strokeWidth={2.5}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Section 3: WCAG AAA High-Contrast Toggle (>= 64px touch target) */}
            <View style={styles.sheetSection}>
              <Text
                style={[
                  styles.sectionLabel,
                  { color: isDark ? "#94A3B8" : "#475569" },
                ]}
              >
                CONTRAST & ERGONOMICS
              </Text>
              <TouchableOpacity
                onPress={toggleAAAMode}
                activeOpacity={0.8}
                style={[
                  styles.aaaSettingRow,
                  {
                    backgroundColor: isAAAMode
                      ? isDark
                        ? "#064E3B"
                        : "#ECFDF5"
                      : isDark
                      ? "#1F2937"
                      : "#F8FAFC",
                    borderColor: isAAAMode
                      ? isDark
                        ? "#34D399"
                        : "#059669"
                      : isDark
                      ? "#374151"
                      : "#E2E8F0",
                    borderWidth: isAAAMode ? 2 : 1,
                  },
                ]}
                accessibilityRole="button"
                accessibilityLabel="Toggle WCAG AAA 7:1 Contrast & Big Touch Targets"
                accessibilityState={{ checked: isAAAMode }}
              >
                <View style={styles.aaaRowLeft}>
                  <View
                    style={[
                      styles.aaaIconCircle,
                      {
                        backgroundColor: isAAAMode
                          ? isDark
                            ? "#047857"
                            : "#D1FAE5"
                          : isDark
                          ? "#374151"
                          : "#E2E8F0",
                      },
                    ]}
                  >
                    {isAAAMode ? (
                      <Check size={20} color={isDark ? "#34D399" : "#047857"} strokeWidth={3} />
                    ) : (
                      <Eye size={20} color={isDark ? "#94A3B8" : "#64748B"} strokeWidth={2} />
                    )}
                  </View>
                  <View style={styles.aaaTextWrap}>
                    <Text
                      style={[
                        styles.aaaTitle,
                        { color: isDark ? "#F8FAFC" : "#0F172A" },
                      ]}
                    >
                      WCAG AAA High-Contrast
                    </Text>
                    <Text
                      style={[
                        styles.aaaDescription,
                        { color: isDark ? "#94A3B8" : "#64748B" },
                      ]}
                    >
                      7:1+ contrast ratios and 58px+ touch boundaries
                    </Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.toggleSwitchPill,
                    {
                      backgroundColor: isAAAMode
                        ? isDark
                          ? "#34D399"
                          : "#059669"
                        : isDark
                        ? "#4B5563"
                        : "#CBD5E1",
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.toggleSwitchThumb,
                      isAAAMode && styles.toggleSwitchThumbActive,
                    ]}
                  />
                </View>
              </TouchableOpacity>
            </View>

            {/* Sheet Done Button */}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              activeOpacity={0.8}
              style={[
                styles.sheetDoneBtn,
                {
                  backgroundColor: isDark ? "#38BDF8" : "#0284C7",
                },
              ]}
              accessibilityRole="button"
              accessibilityLabel="Confirm and close settings"
            >
              <Text
                style={[
                  styles.sheetDoneText,
                  { color: isDark ? "#0F172A" : "#FFFFFF" },
                ]}
              >
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );

  if (isDesktop) {
    return renderDesktop();
  }

  if (isTablet) {
    return renderTablet();
  }

  return renderMobile();
};

const styles = StyleSheet.create({
  // Desktop Cluster (>= 1024px)
  desktopCluster: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 8,
    gap: 8,
    ...Platform.select({
      web: {
        boxShadow: "0 2px 8px rgba(15, 23, 42, 0.06)",
        backdropFilter: "blur(12px)",
      },
      default: {
        ...Theme.shadows.sm,
      },
    }),
  },
  themePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    minHeight: 34,
  },
  iconBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  pillText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  clusterDivider: {
    width: 1,
    height: 20,
  },
  fontSegmentGroup: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    padding: 2,
    gap: 2,
  },
  fontSegmentBtn: {
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 16,
    minWidth: 30,
    minHeight: 28,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },
  fontSegmentBtnActive: {
    ...Platform.select({
      web: {
        boxShadow: "0 1px 3px rgba(15, 23, 42, 0.08)",
      },
    }),
  },
  fontSegmentText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 12,
    fontWeight: "600",
  },
  aaaToggleBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    minHeight: 34,
  },
  aaaBtnText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.2,
  },

  // Tablet Cluster (768px - 1024px)
  tabletCluster: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tactileBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  tabletBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    borderRadius: 6,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  tabletBadgeText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 9,
    fontWeight: "800",
  },

  // Mobile Top-Right Trigger (< 768px)
  mobileTriggerBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    minWidth: 44,
    minHeight: 44,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  mobileTriggerBadge: {
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  mobileTriggerBadgeText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 10,
    fontWeight: "800",
  },

  // Slide-up Bottom Sheet Modal Styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    justifyContent: "flex-end",
  },
  backdropDismissArea: {
    flex: 1,
  },
  sheetContent: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 38 : 28,
    paddingHorizontal: 20,
    maxHeight: "85%",
  },
  sheetHandle: {
    width: 44,
    height: 5,
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 16,
  },
  sheetHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  sheetTitle: {
    fontFamily: Theme.fonts.heading,
    fontSize: 18,
    fontWeight: "800",
  },
  sheetSubtitle: {
    fontFamily: Theme.fonts.body,
    fontSize: 13,
    marginTop: 2,
  },
  sheetCloseBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sheetSection: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontFamily: Theme.fonts.heading,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 10,
  },
  themeOptionsGrid: {
    gap: 10,
  },
  themeOptionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 64,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  themeOptionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  themeOptionIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  themeOptionName: {
    fontFamily: Theme.fonts.heading,
    fontSize: 15,
    fontWeight: "700",
  },
  themeOptionDesc: {
    fontFamily: Theme.fonts.body,
    fontSize: 12,
    marginTop: 2,
  },
  selectedCheckCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#0284C7",
    alignItems: "center",
    justifyContent: "center",
  },
  fontSizeGrid: {
    gap: 8,
  },
  fontScaleCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 60,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
  },
  fontCardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  fontLabelCircle: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  fontLabelText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 15,
    fontWeight: "800",
  },
  fontNameText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 14,
    fontWeight: "600",
  },
  fontPercentText: {
    fontFamily: Theme.fonts.body,
    fontSize: 11,
    marginTop: 2,
  },
  aaaSettingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 66,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  aaaRowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    flex: 1,
    paddingRight: 10,
  },
  aaaIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  aaaTextWrap: {
    flex: 1,
  },
  aaaTitle: {
    fontFamily: Theme.fonts.heading,
    fontSize: 15,
    fontWeight: "700",
  },
  aaaDescription: {
    fontFamily: Theme.fonts.body,
    fontSize: 11,
    marginTop: 2,
  },
  toggleSwitchPill: {
    width: 50,
    height: 30,
    borderRadius: 15,
    padding: 3,
    justifyContent: "center",
  },
  toggleSwitchThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
  },
  toggleSwitchThumbActive: {
    alignSelf: "flex-end",
  },
  sheetDoneBtn: {
    minHeight: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  sheetDoneText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 16,
    fontWeight: "700",
  },
});
