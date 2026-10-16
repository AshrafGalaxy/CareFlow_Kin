import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { Theme, LightColors, DarkColors } from "../constants/theme";

export type FontScale = "normal" | "large" | "extraLarge";
export type ThemeMode = "light" | "dark";

interface AccessibilityContextType {
  isAAAMode: boolean;
  themeMode: ThemeMode;
  isDark: boolean;
  fontScale: FontScale;
  highContrastBorders: boolean;
  minTouchTarget: number;
  fontMultiplier: number;
  colors: typeof LightColors;
  aaaColors: typeof Theme.accessibility.aaaColors;
  toggleAAAMode: () => void;
  toggleThemeMode: () => void;
  setThemeMode: (mode: ThemeMode) => void;
  setFontScale: (scale: FontScale) => void;
  cycleFontScale: () => void;
  resetToStandard: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "careflow_theme_mode";
const AAA_STORAGE_KEY = "careflow_aaa_mode";
const FONT_STORAGE_KEY = "careflow_font_scale";

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // WCAG AAA compliance and enhanced readability enabled by default for elder comfort
  const [isAAAMode, setIsAAAMode] = useState<boolean>(true);
  const [themeMode, setThemeModeState] = useState<ThemeMode>("light");
  const [fontScale, setFontScaleState] = useState<FontScale>("large");
  const [highContrastBorders, setHighContrastBorders] = useState<boolean>(true);

  // Restore saved preferences on mount (web local storage)
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
        if (savedTheme === "light" || savedTheme === "dark") {
          setThemeModeState(savedTheme);
        }

        const savedAAA = window.localStorage.getItem(AAA_STORAGE_KEY);
        if (savedAAA !== null) {
          const isAAA = savedAAA === "true";
          setIsAAAMode(isAAA);
          setHighContrastBorders(isAAA);
        }

        const savedFont = window.localStorage.getItem(FONT_STORAGE_KEY) as FontScale | null;
        if (savedFont === "normal" || savedFont === "large" || savedFont === "extraLarge") {
          setFontScaleState(savedFont);
        }
      } catch (_) {}
    }
  }, []);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, mode);
      } catch (_) {}
    }
  };

  const toggleThemeMode = () => {
    setThemeModeState((prev) => {
      const next = prev === "light" ? "dark" : "light";
      if (typeof window !== "undefined" && window.localStorage) {
        try {
          window.localStorage.setItem(THEME_STORAGE_KEY, next);
        } catch (_) {}
      }
      return next;
    });
  };

  const setFontScale = (scale: FontScale) => {
    setFontScaleState(scale);
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        window.localStorage.setItem(FONT_STORAGE_KEY, scale);
      } catch (_) {}
    }
  };

  const toggleAAAMode = () => {
    setIsAAAMode((prev) => {
      const next = !prev;
      if (!next) {
        setFontScale("normal");
        setHighContrastBorders(false);
      } else {
        setFontScale("large");
        setHighContrastBorders(true);
      }
      if (typeof window !== "undefined" && window.localStorage) {
        try {
          window.localStorage.setItem(AAA_STORAGE_KEY, String(next));
        } catch (_) {}
      }
      return next;
    });
  };

  const cycleFontScale = () => {
    setFontScaleState((prev) => {
      let next: FontScale = "normal";
      if (prev === "normal") next = "large";
      else if (prev === "large") next = "extraLarge";
      else next = "normal";

      if (typeof window !== "undefined" && window.localStorage) {
        try {
          window.localStorage.setItem(FONT_STORAGE_KEY, next);
        } catch (_) {}
      }
      return next;
    });
  };

  const resetToStandard = () => {
    setIsAAAMode(false);
    setFontScale("normal");
    setHighContrastBorders(false);
    setThemeMode("light");
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        window.localStorage.setItem(AAA_STORAGE_KEY, "false");
        window.localStorage.setItem(THEME_STORAGE_KEY, "light");
        window.localStorage.setItem(FONT_STORAGE_KEY, "normal");
      } catch (_) {}
    }
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

  const isDark = themeMode === "dark";

  const colors = useMemo(() => {
    return isDark ? DarkColors : LightColors;
  }, [isDark]);

  const aaaColors = useMemo(() => {
    return isDark ? Theme.accessibility.aaaDarkColors : Theme.accessibility.aaaColors;
  }, [isDark]);

  const value = useMemo(
    () => ({
      isAAAMode,
      themeMode,
      isDark,
      fontScale,
      highContrastBorders,
      minTouchTarget,
      fontMultiplier,
      colors,
      aaaColors,
      toggleAAAMode,
      toggleThemeMode,
      setThemeMode,
      setFontScale,
      cycleFontScale,
      resetToStandard,
    }),
    [
      isAAAMode,
      themeMode,
      isDark,
      fontScale,
      highContrastBorders,
      minTouchTarget,
      fontMultiplier,
      colors,
      aaaColors,
    ]
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
      themeMode: "light",
      isDark: false,
      fontScale: "normal",
      highContrastBorders: false,
      minTouchTarget: 48,
      fontMultiplier: 1.0,
      colors: LightColors,
      aaaColors: Theme.accessibility.aaaColors,
      toggleAAAMode: () => {},
      toggleThemeMode: () => {},
      setThemeMode: () => {},
      setFontScale: () => {},
      cycleFontScale: () => {},
      resetToStandard: () => {},
    };
  }
  return context;
};
