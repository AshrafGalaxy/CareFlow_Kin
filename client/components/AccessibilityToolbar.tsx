import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Theme } from "../constants/theme";
import { useAccessibility, FontScale } from "../context/AccessibilityContext";
import { Eye, Check, Type, Sparkles } from "lucide-react-native";

export const AccessibilityToolbar: React.FC = () => {
  const {
    isAAAMode,
    fontScale,
    toggleAAAMode,
    setFontScale,
    resetToStandard,
  } = useAccessibility();

  return (
    <View
      style={[
        styles.container,
        isAAAMode && styles.containerAAA,
      ]}
      accessibilityRole="toolbar"
      accessibilityLabel="Senior Accessibility Controls"
    >
      <View style={styles.leftCluster}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={toggleAAAMode}
          style={[
            styles.modePill,
            isAAAMode ? styles.modePillAAA : styles.modePillStandard,
          ]}
          accessibilityRole="button"
          accessibilityLabel={
            isAAAMode
              ? "WCAG AAA Enhanced Mode is currently active. Click to switch to Standard Mode."
              : "Standard Mode is active. Click to activate WCAG AAA Enhanced Mode."
          }
        >
          <View style={[styles.badgeIcon, isAAAMode && styles.badgeIconAAA]}>
            {isAAAMode ? (
              <Check size={14} color="#047857" strokeWidth={3} />
            ) : (
              <Eye size={14} color="#64748B" />
            )}
          </View>
          <Text
            style={[
              styles.modeText,
              isAAAMode ? styles.modeTextAAA : styles.modeTextStandard,
            ]}
          >
            {isAAAMode ? "WCAG AAA Enhanced" : "Standard Mode"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.subHint}>
          {isAAAMode ? "Bigger touch targets & 7:1+ contrast active" : "Normal compact view"}
        </Text>
      </View>

      <View style={styles.rightCluster}>
        <View style={styles.fontScaleGroup}>
          {(["normal", "large", "extraLarge"] as FontScale[]).map((scale) => {
            const isActive = fontScale === scale;
            const label = scale === "normal" ? "A" : scale === "large" ? "A+" : "A++";
            const accessibilityTitle =
              scale === "normal"
                ? "Standard text size"
                : scale === "large"
                ? "Large text size"
                : "Extra large text size";

            return (
              <TouchableOpacity
                key={scale}
                activeOpacity={0.8}
                onPress={() => setFontScale(scale)}
                style={[
                  styles.scaleBtn,
                  isActive && styles.scaleBtnActive,
                ]}
                accessibilityRole="button"
                accessibilityLabel={accessibilityTitle}
                accessibilityState={{ selected: isActive }}
              >
                <Text
                  style={[
                    styles.scaleBtnText,
                    isActive && styles.scaleBtnTextActive,
                    scale === "extraLarge" && { fontSize: 13, fontWeight: "800" },
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {isAAAMode ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={resetToStandard}
            style={styles.resetBtn}
            accessibilityRole="button"
            accessibilityLabel="Reset to standard view"
          >
            <Text style={styles.resetBtnText}>Normal</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleAAAMode}
            style={styles.enableAaaBtn}
            accessibilityRole="button"
            accessibilityLabel="Enable AAA Accessibility"
          >
            <Sparkles size={12} color="#0369A1" />
            <Text style={styles.enableAaaText}>AAA</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: Theme.spacing.md,
    flexWrap: "wrap",
    gap: 10,
    ...Platform.select({
      web: {
        boxShadow: "0 1px 2px rgba(15, 23, 42, 0.03)",
      },
      default: {
        ...Theme.shadows.sm,
      },
    }),
  },
  containerAAA: {
    borderColor: "#CBD5E1",
    borderWidth: 1.5,
    backgroundColor: "#FFFFFF",
  },
  leftCluster: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  modePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    minHeight: 34,
  },
  modePillAAA: {
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  modePillStandard: {
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  badgeIcon: {
    width: 20,
    height: 20,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E2E8F0",
  },
  badgeIconAAA: {
    backgroundColor: "#DCFCE7",
  },
  modeText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.1,
  },
  modeTextAAA: {
    color: "#047857",
  },
  modeTextStandard: {
    color: "#475569",
  },
  subHint: {
    fontFamily: Theme.fonts.body,
    fontSize: 11,
    color: "#64748B",
    fontWeight: "500",
  },
  rightCluster: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  fontScaleGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 8,
    padding: 2,
    gap: 2,
  },
  scaleBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    minWidth: 28,
    minHeight: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  scaleBtnActive: {
    backgroundColor: "#FFFFFF",
    ...Platform.select({
      web: {
        boxShadow: "0 1px 2px rgba(15, 23, 42, 0.08)",
      },
    }),
  },
  scaleBtnText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
  },
  scaleBtnTextActive: {
    color: "#0F172A",
    fontWeight: "700",
  },
  resetBtn: {
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    minHeight: 32,
    justifyContent: "center",
  },
  resetBtnText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
  },
  enableAaaBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 7,
    backgroundColor: "#F0F9FF",
    borderWidth: 1,
    borderColor: "#BAE6FD",
    minHeight: 32,
  },
  enableAaaText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 11,
    fontWeight: "700",
    color: "#0369A1",
  },
});
