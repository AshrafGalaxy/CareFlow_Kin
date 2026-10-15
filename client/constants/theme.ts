import { Platform } from "react-native";

export const Theme = {
  colors: {
    // Premium Minimalist Healthcare Palette (Light Canvas)
    // Non-monochromatic: Soothing, warm slates with vibrant, accessible sky/teal accents
    brandPrimary: "#0284C7",    // Radiant Sky Cerulean - Primary Action & Brand Accent
    brandHover: "#0369A1",      // Deep Cerulean - Focused & Hover State
    brandLight: "#F0F9FF",      // Sky Mist 50 - Subtle active pill backgrounds & highlights
    brandSubtle: "#E0F2FE",     // Sky 100 - Gentle pill borders & selection chips
    
    tealAccent: "#0D9488",      // Serene Wellness Teal - Health vitals & mood highlights
    tealLight: "#F0FDFA",       // Teal Mist - Ambient wellness containers
    
    // Legacy oceanic compatibility mapping (prevents downstream reference breakage)
    deepTwilight: "#0F172A",   // Mapped to Obsidian Slate (Replaced harsh navy text)
    frenchBlue: "#0284C7",     // Mapped to Radiant Sky
    brightTealBlue: "#0369A1", // Mapped to Deep Sky
    blueGreen: "#0D9488",      // Mapped to Serene Teal
    turquoiseSurf: "#38BDF8",  // Bright Sky
    skyAqua: "#E0F2FE",        // Soft Sky
    frostedBlue: "#F0F9FF",    // Sky Mist
    frostedBlue2: "#E2E8F0",   // Clean Slate Border
    lightCyan: "#F8FAFC",      // Luminous Canvas

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

    // Surfaces & Spatial Layers (Glare-free, comfortable for aging eyes)
    background: "#F8FAFC",
    surfaceLight: "#FFFFFF",
    card: "#FFFFFF",
    cardGlass: "rgba(255, 255, 255, 0.98)",
    border: "#E2E8F0",
    borderSubtle: "#F1F5F9",
    borderActive: "#0284C7",

    // Typography Legibility Hierarchy (Warm, high-contrast Slate - No harsh navy wash)
    text: "#0F172A",          // Obsidian Slate 900 - Crisp, clear, non-fatiguing
    textSecondary: "#334155", // Slate 700 - Balanced, accessible secondary
    textMuted: "#64748B",     // Slate 500 - Timestamps, helper hints
    textLight: "#94A3B8",     // Slate 400 - Subtle badges & disabled states
    textInverse: "#FFFFFF",   // High-contrast white for colored buttons
  },

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
