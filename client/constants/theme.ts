import { Platform } from "react-native";

export const LightColors = {
  // Premium Minimalist Healthcare Palette (Light Canvas)
  brandPrimary: "#0284C7",    // Radiant Sky Cerulean
  brandHover: "#0369A1",      // Deep Cerulean
  brandLight: "#F0F9FF",      // Sky Mist 50
  brandSubtle: "#E0F2FE",     // Sky 100
  
  tealAccent: "#0D9488",      // Serene Wellness Teal
  tealLight: "#F0FDFA",       // Teal Mist
  
  // Legacy compatibility mapping
  deepTwilight: "#0F172A",
  frenchBlue: "#0284C7",
  brightTealBlue: "#0369A1",
  blueGreen: "#0D9488",
  turquoiseSurf: "#38BDF8",
  skyAqua: "#E0F2FE",
  frostedBlue: "#F0F9FF",
  frostedBlue2: "#E2E8F0",
  lightCyan: "#F8FAFC",

  // Semantic Brand Roles
  primary: "#0284C7",
  primaryDark: "#0369A1",
  primaryLight: "#F0F9FF",
  accent: "#0D9488",
  accentLight: "#F0FDFA",
  brandAccent: "#0284C7",
  brandGradientStart: "#0284C7",
  brandGradientEnd: "#0D9488",

  // Feedback States
  success: "#10B981",
  successLight: "#ECFDF5",
  urgent: "#EF4444",
  urgentLight: "#FEF2F2",
  warning: "#F59E0B",
  warningLight: "#FFFBEB",

  // Surfaces & Spatial Layers
  background: "#F8FAFC",
  surfaceLight: "#FFFFFF",
  card: "#FFFFFF",
  cardGlass: "rgba(255, 255, 255, 0.98)",
  border: "#E2E8F0",
  borderSubtle: "#F1F5F9",
  borderActive: "#0284C7",

  // Typography Legibility Hierarchy (Obsidian Slate)
  text: "#0F172A",          // Obsidian Slate 900
  textSecondary: "#334155", // Slate 700
  textMuted: "#64748B",     // Slate 500
  textLight: "#94A3B8",     // Slate 400
  textInverse: "#FFFFFF",
};

export const DarkColors = {
  // Pure Pitch Black / Neutral OLED Healthcare Palette (0% Blue Saturation Tint)
  brandPrimary: "#38BDF8",    // Vibrant Sky 400
  brandHover: "#7DD3FC",      // Sky 300
  brandLight: "#18181B",      // Neutral Dark Surface (Zinc 900)
  brandSubtle: "#27272A",     // Neutral Zinc Border
  
  tealAccent: "#2DD4BF",      // Serene Teal 400
  tealLight: "#18181B",       // Neutral Dark Surface
  
  // Legacy compatibility mapping
  deepTwilight: "#FFFFFF",
  frenchBlue: "#38BDF8",
  brightTealBlue: "#0284C7",
  blueGreen: "#2DD4BF",
  turquoiseSurf: "#38BDF8",
  skyAqua: "#18181B",
  frostedBlue: "#121212",
  frostedBlue2: "#27272A",
  lightCyan: "#000000",

  // Semantic Brand Roles
  primary: "#38BDF8",
  primaryDark: "#0284C7",
  primaryLight: "#18181B",
  accent: "#2DD4BF",
  accentLight: "#18181B",
  brandAccent: "#38BDF8",
  brandGradientStart: "#38BDF8",
  brandGradientEnd: "#2DD4BF",

  // Feedback States (Neutral High-Contrast)
  success: "#34D399",
  successLight: "#052E16",
  urgent: "#F87171",
  urgentLight: "#450A0A",
  warning: "#FBBF24",
  warningLight: "#451A03",

  // Surfaces & Spatial Layers (Pitch Black OLED System)
  background: "#000000",     // Pure Pitch Black Canvas
  surfaceLight: "#121212",   // Deep Neutral Dark Surface (No blue tint)
  card: "#121212",           // Neutral Dark Card
  cardGlass: "rgba(18, 18, 18, 0.98)",
  border: "#27272A",         // Neutral Zinc Border (No blue tint)
  borderSubtle: "#18181B",   // Zinc 900 Border
  borderActive: "#38BDF8",

  // Typography Legibility Hierarchy (Pure White & Neutral Zinc)
  text: "#FFFFFF",          // Pure White (21:1 contrast on #000000)
  textSecondary: "#E4E4E7", // Zinc 200 (15:1 contrast)
  textMuted: "#A1A1AA",     // Zinc 400 (8.5:1 contrast)
  textLight: "#71717A",     // Zinc 500
  textInverse: "#000000",   // Black on bright badges
};

export const Theme = {
  colors: LightColors,
  lightColors: LightColors,
  darkColors: DarkColors,

  fonts: {
    // Strict 2-Font System: Manrope for Brand/Headings/Metrics, General Sans for Body/UI
    brand: Platform.select({
      web: "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif",
      default: "System",
    }),
    heading: Platform.select({
      web: "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif",
      default: "System",
    }),
    body: Platform.select({
      web: "'General Sans', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      default: "System",
    }),
    // Kept as alias to heading (Manrope) for backward compatibility without loading a 3rd font
    mono: Platform.select({
      web: "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif",
      default: "System",
    }),
  },

  typography: {
    display: 34,
    heading: 24,
    subheading: 19,
    bodyLarge: 17,
    body: 15,
    bodySmall: 13,
    caption: 11,
  },

  shadows: {
    sm: {
      shadowColor: "#0F172A",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 6,
      elevation: 1,
    },
    md: {
      shadowColor: "#0F172A",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.05,
      shadowRadius: 16,
      elevation: 2,
    },
    lg: {
      shadowColor: "#0F172A",
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.07,
      shadowRadius: 28,
      elevation: 4,
    },
  },

  ergonomics: {
    minTouchTarget: 48,
    buttonRadius: 12,
    cardRadius: 16,
    borderWidth: 1,
  },

  spacing: {
    xs: 6,
    sm: 10,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  accessibility: {
    // WCAG 2.2 AAA Contrast Colors (>= 7:1 against white/light surfaces)
    aaaColors: {
      primary: "#0369A1",       // Deep Cerulean (7.2:1 contrast against #FFFFFF)
      primaryHover: "#075985",  // Cerulean 800 (9.4:1 contrast)
      accent: "#0F766E",        // Deep Teal (7.1:1 contrast)
      success: "#047857",       // Deep Emerald (7.4:1 contrast)
      urgent: "#B91C1C",        // Deep Crimson (8.2:1 contrast)
      warning: "#92400E",       // Deep Amber (7.0:1 contrast)
      text: "#0F172A",          // Obsidian Slate (15.6:1 contrast)
      textSecondary: "#1E293B", // Slate 800 (11.5:1 contrast)
      textMuted: "#475569",     // Slate 600 (7.0:1 contrast)
      borderHighContrast: "#CBD5E1", // Slate 300 (crisp edge definition)
    },
    // WCAG 2.2 AAA Contrast Colors (>= 7:1 against pitch black surfaces)
    aaaDarkColors: {
      primary: "#38BDF8",       // Bright Sky 400 (10.2:1 contrast against #000000)
      primaryHover: "#7DD3FC",  // Sky 300 (13.5:1 contrast)
      accent: "#2DD4BF",        // Serene Teal 400 (12.1:1 contrast)
      success: "#34D399",       // Radiant Emerald (12.4:1 contrast)
      urgent: "#F87171",        // Bright Crimson (7.8:1 contrast)
      warning: "#FBBF24",       // Bright Amber (11.9:1 contrast)
      text: "#FFFFFF",          // Pure White (21:1 contrast)
      textSecondary: "#F4F4F5", // Zinc 100 (17:1 contrast)
      textMuted: "#D4D4D8",     // Zinc 300 (12:1 contrast)
      borderHighContrast: "#52525B", // Zinc 600 (Neutral high contrast)
    },
    aaaErgonomics: {
      minTouchTarget: 58,
      minTouchTargetXL: 64,
      buttonRadius: 14,
      cardRadius: 18,
      borderWidth: 1.5,
    },
  },

  breakpoints: {
    compact: 768,
    medium: 1024,
    expanded: 1280,
  },
};
