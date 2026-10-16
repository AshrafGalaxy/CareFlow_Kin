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
  Sliders,
  Check,
  X,
  RotateCcw,
  Sun,
  Moon,
} from "lucide-react-native";
import { Theme } from "../constants/theme";
import { useAccessibility, FontScale } from "../context/AccessibilityContext";

export const NavAccessibilityControls: React.FC = () => {
  const {
    isAAAMode,
    isDark,
    fontScale,
    colors,
    setThemeMode,
    toggleAAAMode,
    setFontScale,
    resetToStandard,
  } = useAccessibility();

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <>
      {/* Single Control Icon Trigger Button on Navbar */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
        style={[
          styles.singleTriggerBtn,
          {
            backgroundColor: isDark ? "#121212" : "#FFFFFF",
            borderColor: isAAAMode
              ? isDark
                ? "#52525B"
                : "#CBD5E1"
              : isDark
              ? "#27272A"
              : colors.border,
            borderWidth: isAAAMode ? 1.5 : 1,
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel="Display and accessibility settings"
      >
        <Sliders
          size={18}
          color={isDark ? "#FFFFFF" : "#0F172A"}
          strokeWidth={2}
        />
      </TouchableOpacity>

      {/* Clean, Non-Scrolling Settings Modal Dialog */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <Pressable
            style={styles.backdropDismissArea}
            onPress={() => setModalVisible(false)}
            accessibilityLabel="Close dialog"
          />

          <View
            style={[
              styles.modalDialogCard,
              {
                backgroundColor: isDark ? "#121212" : "#FFFFFF",
                borderColor: isDark ? "#27272A" : colors.border,
              },
            ]}
          >
            {/* Modal Header */}
            <View
              style={[
                styles.modalHeaderRow,
                { borderBottomColor: isDark ? "#27272A" : "#F1F5F9" },
              ]}
            >
              <Text
                style={[
                  styles.modalTitle,
                  { color: isDark ? "#FFFFFF" : "#0F172A" },
                ]}
              >
                Settings
              </Text>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[
                  styles.modalCloseBtn,
                  {
                    backgroundColor: isDark ? "#18181B" : "#F1F5F9",
                    borderColor: isDark ? "#27272A" : "#E2E8F0",
                  },
                ]}
                accessibilityRole="button"
                accessibilityLabel="Close settings modal"
              >
                <X size={18} color={isDark ? "#FFFFFF" : "#0F172A"} />
              </TouchableOpacity>
            </View>

            {/* Modal Body - Fixed, Compact, Zero-Scroll */}
            <View style={styles.modalBody}>
              {/* 1. Theme Selection */}
              <View style={styles.settingGroup}>
                <Text
                  style={[
                    styles.groupLabel,
                    { color: isDark ? "#A1A1AA" : "#64748B" },
                  ]}
                >
                  THEME
                </Text>
                <View style={styles.segmentedRow}>
                  <TouchableOpacity
                    onPress={() => setThemeMode("dark")}
                    activeOpacity={0.8}
                    style={[
                      styles.segmentBtn,
                      {
                        backgroundColor: isDark
                          ? "#000000"
                          : isDark
                          ? "#18181B"
                          : "#F8FAFC",
                        borderColor: isDark ? "#38BDF8" : isDark ? "#27272A" : "#E2E8F0",
                        borderWidth: isDark ? 2 : 1,
                      },
                    ]}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isDark }}
                  >
                    <Moon
                      size={16}
                      color={isDark ? "#38BDF8" : "#64748B"}
                      strokeWidth={2}
                    />
                    <Text
                      style={[
                        styles.segmentText,
                        { color: isDark ? "#FFFFFF" : "#64748B" },
                        isDark && styles.segmentTextActive,
                      ]}
                    >
                      Dark
                    </Text>
                    {isDark && (
                      <Check size={14} color="#38BDF8" strokeWidth={3} />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setThemeMode("light")}
                    activeOpacity={0.8}
                    style={[
                      styles.segmentBtn,
                      {
                        backgroundColor: !isDark
                          ? "#F0F9FF"
                          : isDark
                          ? "#000000"
                          : "#F8FAFC",
                        borderColor: !isDark ? "#0284C7" : isDark ? "#27272A" : "#E2E8F0",
                        borderWidth: !isDark ? 2 : 1,
                      },
                    ]}
                    accessibilityRole="button"
                    accessibilityState={{ selected: !isDark }}
                  >
                    <Sun
                      size={16}
                      color={!isDark ? "#0284C7" : "#A1A1AA"}
                      strokeWidth={2}
                    />
                    <Text
                      style={[
                        styles.segmentText,
                        { color: !isDark ? "#0F172A" : "#A1A1AA" },
                        !isDark && styles.segmentTextActive,
                      ]}
                    >
                      Light
                    </Text>
                    {!isDark && (
                      <Check size={14} color="#0284C7" strokeWidth={3} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* 2. Text Size */}
              <View style={styles.settingGroup}>
                <Text
                  style={[
                    styles.groupLabel,
                    { color: isDark ? "#A1A1AA" : "#64748B" },
                  ]}
                >
                  TEXT SIZE
                </Text>
                <View style={styles.segmentedRow}>
                  {[
                    { scale: "normal" as FontScale, label: "Standard" },
                    { scale: "large" as FontScale, label: "Large" },
                    { scale: "extraLarge" as FontScale, label: "Maximum" },
                  ].map((item) => {
                    const isActive = fontScale === item.scale;
                    return (
                      <TouchableOpacity
                        key={item.scale}
                        onPress={() => setFontScale(item.scale)}
                        activeOpacity={0.8}
                        style={[
                          styles.segmentBtn,
                          {
                            backgroundColor: isActive
                              ? isDark
                                ? "#18181B"
                                : "#F0F9FF"
                              : isDark
                              ? "#000000"
                              : "#F8FAFC",
                            borderColor: isActive
                              ? isDark
                                ? "#38BDF8"
                                : "#0284C7"
                              : isDark
                              ? "#27272A"
                              : "#E2E8F0",
                            borderWidth: isActive ? 2 : 1,
                          },
                        ]}
                        accessibilityRole="button"
                        accessibilityState={{ selected: isActive }}
                      >
                        <Text
                          style={[
                            styles.segmentText,
                            { color: isActive ? (isDark ? "#FFFFFF" : "#0F172A") : (isDark ? "#A1A1AA" : "#64748B") },
                            isActive && styles.segmentTextActive,
                          ]}
                        >
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* 3. WCAG AAA High-Contrast Toggle */}
              <View style={styles.settingGroup}>
                <Text
                  style={[
                    styles.groupLabel,
                    { color: isDark ? "#A1A1AA" : "#64748B" },
                  ]}
                >
                  CONTRAST
                </Text>
                <TouchableOpacity
                  onPress={toggleAAAMode}
                  activeOpacity={0.8}
                  style={[
                    styles.contrastRow,
                    {
                      backgroundColor: isAAAMode
                        ? isDark
                          ? "#052E16"
                          : "#ECFDF5"
                        : isDark
                        ? "#000000"
                        : "#F8FAFC",
                      borderColor: isAAAMode
                        ? isDark
                          ? "#34D399"
                          : "#059669"
                        : isDark
                        ? "#27272A"
                        : "#E2E8F0",
                      borderWidth: isAAAMode ? 2 : 1,
                    },
                  ]}
                  accessibilityRole="button"
                  accessibilityState={{ checked: isAAAMode }}
                >
                  <View style={styles.contrastLeft}>
                    <Text
                      style={[
                        styles.contrastTitle,
                        { color: isDark ? "#FFFFFF" : "#0F172A" },
                      ]}
                    >
                      High Contrast Mode
                    </Text>
                    <Text
                      style={[
                        styles.contrastDesc,
                        { color: isDark ? "#A1A1AA" : "#64748B" },
                      ]}
                    >
                      Enhanced 7:1 borders & touch targets
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.toggleTrack,
                      {
                        backgroundColor: isAAAMode
                          ? isDark
                            ? "#34D399"
                            : "#059669"
                          : isDark
                          ? "#3F3F46"
                          : "#CBD5E1",
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.toggleThumb,
                        isAAAMode && styles.toggleThumbActive,
                      ]}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* Modal Footer */}
            <View
              style={[
                styles.modalFooterRow,
                { borderTopColor: isDark ? "#27272A" : "#F1F5F9" },
              ]}
            >
              <TouchableOpacity
                onPress={resetToStandard}
                style={[
                  styles.resetBtn,
                  {
                    backgroundColor: isDark ? "#18181B" : "#F1F5F9",
                    borderColor: isDark ? "#27272A" : "#E2E8F0",
                  },
                ]}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Reset to standard defaults"
              >
                <RotateCcw size={14} color={isDark ? "#A1A1AA" : "#64748B"} />
                <Text
                  style={[
                    styles.resetBtnText,
                    { color: isDark ? "#A1A1AA" : "#64748B" },
                  ]}
                >
                  Reset
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[
                  styles.doneBtn,
                  { backgroundColor: isDark ? "#38BDF8" : "#0284C7" },
                ]}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Done"
              >
                <Text
                  style={[
                    styles.doneBtnText,
                    { color: isDark ? "#000000" : "#FFFFFF" },
                  ]}
                >
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  // Single Icon Button on Navbar
  singleTriggerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      web: {
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
      },
      default: {
        ...Theme.shadows.sm,
      },
    }),
  },

  // Modal Backdrop & Compact Card
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  backdropDismissArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalDialogCard: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
    ...Platform.select({
      web: {
        boxShadow: "0 16px 36px rgba(0, 0, 0, 0.5)",
      },
    }),
  },
  modalHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontFamily: Theme.fonts.heading,
    fontSize: 16,
    fontWeight: "800",
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  // Modal Body - Compact, No Scrolling
  modalBody: {
    padding: 18,
    gap: 16,
  },
  settingGroup: {
    gap: 8,
  },
  groupLabel: {
    fontFamily: Theme.fonts.heading,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  segmentedRow: {
    flexDirection: "row",
    gap: 8,
  },
  segmentBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
    minHeight: 42,
  },
  segmentText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 13,
    fontWeight: "600",
  },
  segmentTextActive: {
    fontWeight: "800",
  },

  // Contrast Row
  contrastRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 12,
  },
  contrastLeft: {
    flex: 1,
    paddingRight: 8,
  },
  contrastTitle: {
    fontFamily: Theme.fonts.heading,
    fontSize: 14,
    fontWeight: "700",
  },
  contrastDesc: {
    fontFamily: Theme.fonts.body,
    fontSize: 12,
    marginTop: 2,
  },
  toggleTrack: {
    width: 44,
    height: 26,
    borderRadius: 13,
    padding: 2,
    justifyContent: "center",
  },
  toggleThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
  },
  toggleThumbActive: {
    alignSelf: "flex-end",
  },

  // Modal Footer
  modalFooterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderTopWidth: 1,
    gap: 10,
  },
  resetBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
  },
  resetBtnText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 13,
    fontWeight: "600",
  },
  doneBtn: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  doneBtnText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 13,
    fontWeight: "800",
  },
});
