import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Theme, FontPairingId, FONT_PAIRING_PRESETS, applyFontPairing, getActiveFontPairing } from "../constants/theme";
import { Type } from "lucide-react-native";

interface FontPairingSwitcherProps {
  compact?: boolean;
  style?: object;
}

export const FontPairingSwitcher: React.FC<FontPairingSwitcherProps> = ({
  compact = false,
  style,
}) => {
  const [activeId, setActiveId] = useState<FontPairingId>("option1");

  useEffect(() => {
    setActiveId(getActiveFontPairing());
  }, []);

  const handleSelect = (id: FontPairingId) => {
    setActiveId(id);
    applyFontPairing(id);
  };

  return (
    <View style={[styles.container, compact && styles.containerCompact, style]}>
      <View style={styles.labelGroup}>
        <Type size={14} color={Theme.colors.primary} />
        {!compact && <Text style={styles.titleText}>Typography Pairings:</Text>}
      </View>

      <View style={styles.toggleRow}>
        <TouchableOpacity
          onPress={() => handleSelect("option1")}
          style={[
            styles.toggleBtn,
            activeId === "option1" && styles.toggleBtnActive,
            compact && styles.toggleBtnCompact,
          ]}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Switch to Option 1: Manrope Headings and General Sans Body"
        >
          <Text
            style={[
              styles.toggleText,
              activeId === "option1" && styles.toggleTextActive,
              compact && styles.toggleTextCompact,
            ]}
          >
            {compact ? "1. Manrope / GenSans" : "1. Manrope (H) + GenSans (B)"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSelect("option2")}
          style={[
            styles.toggleBtn,
            activeId === "option2" && styles.toggleBtnActive,
            compact && styles.toggleBtnCompact,
          ]}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Switch to Option 2: General Sans Headings and Manrope Body"
        >
          <Text
            style={[
              styles.toggleText,
              activeId === "option2" && styles.toggleTextActive,
              compact && styles.toggleTextCompact,
            ]}
          >
            {compact ? "2. GenSans / Manrope" : "2. GenSans (H) + Manrope (B)"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    gap: 8,
    ...Theme.shadows.sm,
  },
  containerCompact: {
    paddingVertical: 3,
    paddingHorizontal: 6,
    gap: 4,
  },
  labelGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingLeft: 4,
  },
  titleText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 11,
    fontWeight: "600",
    color: Theme.colors.textMuted,
    letterSpacing: 0.3,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.background,
    borderRadius: 14,
    padding: 2,
    borderWidth: 1,
    borderColor: Theme.colors.borderSubtle,
    gap: 2,
  },
  toggleBtn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: "transparent",
  },
  toggleBtnCompact: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  toggleBtnActive: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: Theme.colors.border,
    ...Theme.shadows.sm,
  },
  toggleText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 11,
    fontWeight: "500",
    color: Theme.colors.textMuted,
  },
  toggleTextCompact: {
    fontSize: 10,
  },
  toggleTextActive: {
    fontWeight: "600",
    color: Theme.colors.primary,
  },
});
