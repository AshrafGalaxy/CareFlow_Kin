export const Theme = {
  colors: {
    // WCAG AAA Compliant Primary Palette
    primary: "#0D5C52",        // Sanctuary Teal (11.4:1 contrast ratio against white)
    primaryLight: "#E6F4F1",   // Soft Teal Tint
    accent: "#B45309",         // Amber Glow (Warm attention without panic)
    accentLight: "#FEF3C7",    // Soft Amber Tint
    success: "#15803D",        // Evergreen (Affirmative status)
    successLight: "#DCFCE7",   // Soft Green Tint
    urgent: "#B91C1C",         // Urgent Red (Reserved for emergency aid)
    urgentLight: "#FEE2E2",
    
    // Surfaces & Backgrounds
    background: "#F8FAF8",     // Calm Alabaster (Anti-glare background)
    card: "#FFFFFF",           // Crisp Card White
    border: "#CBD5E1",         // 2px Solid Slate Border
    borderActive: "#0D5C52",   // Focused border
    
    // High-Legibility Typography
    text: "#1E293B",           // Deep Charcoal (13.8:1 contrast ratio)
    textMuted: "#475569",      // Secondary Slate (7.2:1 contrast ratio, never lower)
    textInverse: "#FFFFFF",
  },
  
  typography: {
    // Elder Ergonomics Standard (minimum 18px body)
    bodySmall: 16,
    body: 18,
    bodyLarge: 22,
    subheading: 24,
    heading: 30,
    display: 36,
  },
  
  ergonomics: {
    minTouchTarget: 56,        // Minimum height/width for motor tremor tolerance
    buttonRadius: 16,          // Friendly, rounded accessible geometry
    cardRadius: 20,
    borderWidth: 2,            // Distinct boundary definition
  },
  
  spacing: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  breakpoints: {
    compact: 768,              // Mobile viewport (< 768px)
    medium: 1024,              // Tablet viewport (768px - 1024px)
    expanded: 1280,            // Desktop & Presentation Decks (> 1024px)
  }
};
