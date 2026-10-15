# Careflow Design System Specification

## 1. Overview & Architecture

In modern software engineering, an industry-standard Design System is constructed across three complementary layers:

1. **Specification & Governance Layer (`DESIGN_SYSTEM.md`)**: A canonical human-readable manifesto articulating design principles, chromatic roles, mathematical contrast ratios, ergonomic parameters, and accessibility guarantees.
2. **Executable Token Layer (`client/constants/theme.ts`)**: Strongly typed TypeScript token definitions serving as the Single Source of Truth consumed across all viewport targets (Desktop Web, Decks, Android, iOS).
3. **Component Primitive Layer (`client/components/`)**: Self-contained UI building blocks (`BigButton`, `StatusCard`, `ResponsiveContainer`) enforcing token usage and preventing ad-hoc styling.

---

## 2. Color Palette & Chromatic Architecture

The Careflow design language couples the Coolors oceanic palette with modern glassmorphism, refined elevation, and serene micro-interactions.

### Canonical Swatches

| Name | Hex Code | RGB | Semantic Role | Aesthetic Application |
| :--- | :--- | :--- | :--- | :--- |
| **Deep Twilight** | `#03045E` | `rgb(3, 4, 94)` | Primary Typography, Contrast Accents | High-definition titles, bold headers, dark pill fills |
| **French Blue** | `#023E8A` | `rgb(2, 62, 138)` | Primary Brand CTAs, Navigation Gradient | Gradient stops, primary interactive triggers, deck badges |
| **Bright Teal Blue** | `#0077B6` | `rgb(0, 119, 182)` | Secondary Actions, Active Highlights | Vibrant buttons, active pill rings, progress indicators |
| **Blue Green** | `#0096C7` | `rgb(0, 150, 199)` | Glowing Rings, State Transitions | Status icons, card glow accents, subtle hover rings |
| **Turquoise Surf** | `#00B4D8` | `rgb(0, 180, 216)` | Brand Vector Nodes, Electric Accents | Hero illustrations, electric badges, wellness highlights |
| **Sky Aqua** | `#48CAE4` | `rgb(72, 202, 228)` | Light Pill Highlights, Micro-badges | Soft badge backgrounds, subtle divider highlights |
| **Frosted Blue** | `#90E0EF` | `rgb(144, 224, 239)` | Glassmorphism Frost, Card Tints | Translucent card fills, subtle ambient backdrops |
| **Frosted Blue 2** | `#ADE8F4` | `rgb(173, 232, 244)` | Delicate Hairline Borders | 1px polished glass borders, clean divider rules |
| **Light Cyan** | `#CAF0F8` | `rgb(202, 240, 248)` | Soft Accent Tints & Pill Fills | Gentle chip fills, status indicator backgrounds |

### Premium Visual Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Soft Canvas Base (#F5F9FC) - Modern Clean Neutral          │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Pure White Glass Card (#FFFFFF / 95% Opacity)        │  │
│  │  Border: 1px hairline Frosted Blue 2 (rgba(0,119,182,0.1))│
│  │  Shadow: 0 12px 32px -4px rgba(3, 4, 94, 0.06)        │  │
│  │                                                       │  │
│  │  Headline: Deep Twilight (#03045E) [Outfit Bold]      │  │
│  │  Body Text: Deep Twilight (#03045E) [Manrope Medium]  │  │
│  │  Subtitle: French Blue (#023E8A) [Plus Jakarta Sans]   │  │
│  │                                                       │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ [Take Medicine] Primary Gradient CTA            │  │  │
│  │  │ Gradient: #023E8A -> #0077B6, Shadow: Teal Glow │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                                                       │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ [View Details] Secondary Frosted CTA            │  │  │
│  │  │ Fill: #FFFFFF, Border: 1.5px #0077B6, Text Blue  │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Typography Architecture

The typographic hierarchy preserves continuity with Careflow's established multi-font taxonomy, combining high-legibility geometric sans-serifs with clear structural character distinctions:

| Category | Typeface | Weights | Semantic Purpose |
| :--- | :--- | :--- | :--- |
| **Brand & Display** | **Outfit** | SemiBold (600), Bold (700) | App headers, top deck branding, prominent hero elements. |
| **Structural Headings** | **Plus Jakarta Sans** | Medium (500), SemiBold (600), Bold (700) | Card headings, section dividers, modal titles. |
| **Body & UI Controls** | **Manrope** | Regular (400), Medium (500), SemiBold (600) | Body reading text, checklist descriptions, button labels. |
| **Numerical & Vitals** | **JetBrains Mono** | Medium (500), Bold (700) | Timestamps, dosage metrics (`500 mg`), vital statistics. |

### Scale Matrix (Elder Ergonomics)

All body typography begins at 18px to maintain comfort for users with diminished visual acuity:

- **Display**: 36px (Line-height: 44px, Letter-spacing: -0.5px)
- **Heading**: 30px (Line-height: 38px, Letter-spacing: -0.3px)
- **Subheading**: 24px (Line-height: 32px)
- **Body Large**: 22px (Line-height: 30px)
- **Body Standard**: 18px (Line-height: 26px)
- **Caption / Meta**: 16px (Line-height: 22px)

---

## 4. Spacing, Geometry & Ergonomics

1. **Touch Targets**:
   - Minimum tap surface: **56px × 56px** across all interactive elements.
   - Separation padding between clickable targets: minimum **16px** to prevent accidental mis-taps caused by hand tremors.
2. **Corner Radii**:
   - Cards & Containers: **20px**
   - Action Buttons: **16px**
   - Small Badges & Chips: **10px**
3. **Boundary Enclosure**:
   - All interactive cards must feature an explicit **2px solid border** (`#ade8f4` resting, `#0077b6` focused) ensuring clear optical separation regardless of ambient lighting conditions.

---

## 5. Viewport Breakpoints

- **Compact (Phones)**: `< 768px` — Single-column vertical stream, persistent bottom action tray.
- **Medium (Tablets)**: `768px – 1024px` — Dual-column layout (routine checklist on left, health vitals on right).
- **Expanded (Desktop & Presentation Decks)**: `> 1024px` — Persistent side navigation bar and responsive multi-card dashboard deck.
