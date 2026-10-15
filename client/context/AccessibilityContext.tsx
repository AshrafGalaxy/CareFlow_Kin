import React, { createContext, useContext, useState, useMemo } from "react";
import { Theme } from "../constants/theme";

export type FontScale = "normal" | "large" | "extraLarge";

interface AccessibilityContextType {
  isAAAMode: boolean;
  fontScale: FontScale;
  highContrastBorders: boolean;
  minTouchTarget: number;
  fontMultiplier: number;
  aaaColors: typeof Theme.accessibility.aaaColors;
  toggleAAAMode: () => void;
  setFontScale: (scale: FontScale) => void;
  cycleFontScale: () => void;
  resetToStandard: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // WCAG AAA compliance and enhanced readability enabled by default for elder comfort
  const [isAAAMode, setIsAAAMode] = useState<boolean>(true);
  const [fontScale, setFontScale] = useState<FontScale>("large");
  const [highContrastBorders, setHighContrastBorders] = useState<boolean>(true);

  const toggleAAAMode = () => {
    setIsAAAMode((prev) => {
      const next = !prev;
      if (!next) {
        // Switching to standard mode sets standard scale
        setFontScale("normal");
        setHighContrastBorders(false);
      } else {
        // Returning to AAA mode sets elder-optimized large scale
        setFontScale("large");
        setHighContrastBorders(true);
      }
      return next;
    });
  };

  const cycleFontScale = () => {
    setFontScale((prev) => {
      if (prev === "normal") return "large";
      if (prev === "large") return "extraLarge";
      return "normal";
    });
  };

  const resetToStandard = () => {
    setIsAAAMode(false);
    setFontScale("normal");
    setHighContrastBorders(false);
  };

  const fontMultiplier = useMemo(() => {
    switch (fontScale) {
      case "extraLarge":
        return 1.32;
      case "large":
        return 1.16;
      case "normal":
      default:
        return 1.0;
    }
  }, [fontScale]);

  const minTouchTarget = useMemo(() => {
    if (isAAAMode) {
      return fontScale === "extraLarge" ? 64 : 58;
    }
    return 48;
  }, [isAAAMode, fontScale]);

  const value = useMemo(
    () => ({
      isAAAMode,
      fontScale,
      highContrastBorders,
      minTouchTarget,
      fontMultiplier,
      aaaColors: Theme.accessibility.aaaColors,
      toggleAAAMode,
      setFontScale,
      cycleFontScale,
      resetToStandard,
    }),
    [isAAAMode, fontScale, highContrastBorders, minTouchTarget, fontMultiplier]
  );

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    // Graceful fallback for components mounted outside provider
    return {
      isAAAMode: false,
      fontScale: "normal",
      highContrastBorders: false,
      minTouchTarget: 48,
      fontMultiplier: 1.0,
      aaaColors: Theme.accessibility.aaaColors,
      toggleAAAMode: () => {},
      setFontScale: () => {},
      cycleFontScale: () => {},
      resetToStandard: () => {},
    };
  }
  return context;
};
