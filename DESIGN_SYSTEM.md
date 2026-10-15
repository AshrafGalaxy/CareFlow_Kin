# Careflow Design System Specification

## 1. Overview & Architecture

In modern software engineering, an industry-standard Design System is constructed across three complementary layers:

1. **Specification & Governance Layer (`DESIGN_SYSTEM.md`)**: A canonical human-readable manifesto articulating design principles, chromatic roles, mathematical contrast ratios, ergonomic parameters, and accessibility guarantees.
2. **Executable Token Layer (`client/constants/theme.ts`)**: Strongly typed TypeScript token definitions serving as the Single Source of Truth consumed across all viewport targets (Desktop Web, Decks, Android, iOS).
3. **Component Primitive Layer (`client/components/`)**: Self-contained UI building blocks (`BigButton`, `StatusCard`, `ResponsiveContainer`) enforcing token usage and preventing ad-hoc styling.

---

## 2. Color Palette & Chromatic Architecture

The Careflow color system is derived from an oceanic cool-spectrum palette engineered for calm cognitive processing, low glare, and high legibility for older adults.

### Canonical Swatches

| Name | Hex Code | RGB | CMYK | Semantic Role | WCAG AAA Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Deep Twilight** | `#03045e` | `rgb(3, 4, 94)` | `97, 96, 0, 63` | Primary Typography, Key Headings | **17.8:1** (vs White), **14.2:1** (vs Light Cyan) |
| **French Blue** | `#023e8a` | `rgb(2, 62, 138)` | `99, 55, 0, 46` | Primary Brand CTAs, Active Deck Headers | **9.8:1** (vs White), **7.9:1** (vs Light Cyan) |
| **Bright Teal Blue** | `#0077b6` | `rgb(0, 119, 182)` | `100, 35, 0, 29` | Secondary Actions, Active Border Focus, Links | **4.6:1** (vs White), **7.4:1** (vs Deep Twilight) |
| **Blue Green** | `#0096c7` | `rgb(0, 150, 199)` | `100, 25, 0, 22` | Focus Rings, Status Badges, Progress Accents | **8.1:1** (vs Deep Twilight) |
| **Turquoise Surf** | `#00b4d8` | `rgb(0, 180, 216)` | `100, 17, 0, 15` | Core Flow Accents, Brand Illustration Highlights | Decorative & Accent Elements |
| **Sky Aqua** | `#48cae4` | `rgb(72, 202, 228)` | `68, 11, 0, 11` | Secondary Badges, Active Pill Tints | Container Accents |
| **Frosted Blue** | `#90e0ef` | `rgb(144, 224, 239)` | `40, 6, 0, 6` | Highlighted Card Containers, Tint Fills | Surface Fills |
| **Frosted Blue 2** | `#ade8f4` | `rgb(173, 232, 244)` | `29, 5, 0, 4` | Subtle Dividers, Inactive Borders, Pill Backgrounds | Boundary Definition |
| **Light Cyan** | `#caf0f8` | `rgb(202, 240, 248)` | `19, 3, 0, 3` | Primary Base Background (Anti-glare Surface) | Base Surface (Eye-strain Reduction) |

### Semantic Role Assignment

```
┌─────────────────────────────────────────────────────────────┐
│  Light Cyan (#caf0f8) - Anti-glare Screen Base              │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Pure White (#FFFFFF) - Card Container Surface        │  │
│  │  Border: 2px Frosted Blue 2 (#ade8f4)                 │  │
│  │                                                       │  │
│  │  Headline: Deep Twilight (#03045e) [17.8:1 Contrast]   │  │
│  │  Body Text: Deep Twilight (#03045e) [17.8:1 Contrast]  │  │
│  │  Supporting: French Blue (#023e8a) [9.8:1 Contrast]   │  │
│  │                                                       │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ [Take Medicine] Primary CTA: French Blue        │  │  │
│  │  │ Text: #FFFFFF, Height: >= 56px, Radius: 16px    │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                                                       │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ [View Details] Secondary CTA: Light Cyan Fill   │  │  │
│  │  │ Border: 2px French Blue, Text: French Blue      │  │  │
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
