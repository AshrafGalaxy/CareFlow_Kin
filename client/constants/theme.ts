import { Platform } from "react-native";

export const Theme = {
  colors: {
    // Canonical 9-Color Oceanic Coolors Palette
    deepTwilight: "#03045E",   // Deepest Navy - Primary Typography & Dark Accents
    frenchBlue: "#023E8A",     // French Blue - Primary Brand & Key CTAs
    brightTealBlue: "#0077B6", // Bright Teal Blue - Secondary CTAs & Active Indicators
    blueGreen: "#0096C7",      // Blue Green - Interactive Focus & Highlights
    turquoiseSurf: "#00B4D8",  // Turquoise Surf - Flow Accents & Wellness Highlights
    skyAqua: "#48CAE4",        // Sky Aqua - Subtle Badges & Hover Fills
    frostedBlue: "#90E0EF",    // Frosted Blue - Card Container Highlights
    frostedBlue2: "#ADE8F4",   // Frosted Blue 2 - Distinct Card Borders & Dividers
    lightCyan: "#CAF0F8",      // Light Cyan - Soothing Surface Tint

    // Semantic Brand Roles
    primary: "#023E8A",
    primaryDark: "#03045E",
    primaryLight: "#EBF5FB",
    accent: "#0077B6",
    accentLight: "#E0F2FE",
    brandAccent: "#00B4D8",
    brandGradientStart: "#023E8A",
    brandGradientEnd: "#0077B6",

    // Feedback States
    success: "#059669",
    successLight: "#ECFDF5",
    urgent: "#DC2626",
    urgentLight: "#FEF2F2",
    warning: "#D97706",
    warningLight: "#FFFBEB",

    // Surfaces & Spatial Layers (Modern Clean Canvas)
    background: "#F4F8FA",
    surfaceLight: "#FFFFFF",
    card: "#FFFFFF",
    cardGlass: "rgba(255, 255, 255, 0.94)",
    border: "rgba(0, 119, 182, 0.12)",
    borderSubtle: "rgba(0, 119, 182, 0.06)",
    borderActive: "#0077B6",

    // Typography Legibility Hierarchy
    text: "#03045E",
    textSecondary: "#1E293B",
    textMuted: "#64748B",
    textLight: "#94A3B8",
    textInverse: "#FFFFFF",
  },

  fonts: {
    // Multi-Font Hierarchy with Web & Native Compatibility
    brand: Platform.select({ web: "'Outfit', sans-serif", default: "Outfit" }),
    heading: Platform.select({ web: "'Plus Jakarta Sans', sans-serif", default: "Plus Jakarta Sans" }),
    body: Platform.select({ web: "'Manrope', sans-serif", default: "Manrope" }),
    mono: Platform.select({ web: "'JetBrains Mono', monospace", default: "JetBrains Mono" }),
  },

  typography: {
    display: 36,
    heading: 26,
    subheading: 20,
    bodyLarge: 17,
    body: 15,
    bodySmall: 13,
    caption: 11,
  },

  shadows: {
    sm: {
      shadowColor: "#03045E",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 8,
      elevation: 1,
    },
    md: {
      shadowColor: "#03045E",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.06,
      shadowRadius: 20,
      elevation: 3,
    },
    lg: {
      shadowColor: "#03045E",
      shadowOffset: { width: 0, height: 16 },
      shadowOpacity: 0.08,
      shadowRadius: 32,
      elevation: 6,
    },
  },

  ergonomics: {
    minTouchTarget: 48,
    buttonRadius: 14,
    cardRadius: 18,
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

  breakpoints: {
    compact: 768,
    medium: 1024,
    expanded: 1280,
  },
};
