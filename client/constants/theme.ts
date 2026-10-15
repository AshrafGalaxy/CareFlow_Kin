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
    lightCyan: "#CAF0F8",      // Light Cyan - Soothing Anti-glare Background Surface

    // Semantic Role Mapping (WCAG 2.1 AAA Compliant)
    primary: "#023E8A",        // French Blue (9.8:1 contrast on white)
    primaryLight: "#CAF0F8",   // Light Cyan Tint
    accent: "#0077B6",         // Bright Teal Blue
    accentLight: "#ADE8F4",    // Frosted Blue 2 Tint
    brandAccent: "#00B4D8",    // Turquoise Surf Flow
    
    // Feedback States
    success: "#15803D",        // Evergreen Affirmation
    successLight: "#DCFCE7",
    urgent: "#B91C1C",         // Urgent Attention Aid
    urgentLight: "#FEE2E2",
    
    // Surfaces & Spatial Layers
    background: "#CAF0F8",     // Anti-glare Light Cyan (Eases elder eye fatigue)
    surfaceLight: "#F0F9FD",    // Ultra-soft White-Cyan Tint
    card: "#FFFFFF",           // Crisp Pure White Card
    border: "#ADE8F4",         // 2px Frosted Blue 2 Border
    borderActive: "#0077B6",   // Focused Bright Teal Blue Border
    
    // Typography Legibility Hierarchy
    text: "#03045E",           // Deep Twilight (17.8:1 contrast ratio against white)
    textMuted: "#023E8A",      // French Blue (9.8:1 contrast ratio, high legibility)
    textInverse: "#FFFFFF",    // Pure White for Dark Button Fills
  },
  
  fonts: {
    // Multi-Font Hierarchy from Careflow Design Architecture
    brand: "Outfit, system-ui, sans-serif",
    heading: "'Plus Jakarta Sans', system-ui, sans-serif",
    body: "Manrope, system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  
  typography: {
    // Elder Ergonomics Standard (Minimum 18px body)
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
