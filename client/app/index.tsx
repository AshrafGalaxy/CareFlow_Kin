import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Theme } from "../constants/theme";
import { useResponsive } from "../hooks/useResponsive";
import { CareFlowLogo } from "../components/CareFlowLogo";
import { GoogleAuthButton } from "../components/GoogleAuthButton";
import {
  MedicationDeckVisual,
  WellnessCheckinVisual,
  DailyRoutineVisual,
  CareCircleVisual,
  IsometricCard,
} from "../components/illustrations/IsometricShowcase";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Heart,
  Activity,
  Calendar,
  Lock,
  CheckCircle2,
  AlertCircle,
  Clock,
  Eye,
  Users,
} from "lucide-react-native";

export default function LandingPage() {
  const router = useRouter();
  const { isSmallMobile, isMobile, isTablet, isDesktop, horizontalPadding } = useResponsive();
  const scrollRef = useRef<ScrollView>(null);

  const heroTitleFontSize = isSmallMobile ? 26 : isMobile ? 32 : isTablet ? 42 : 52;
  const heroTitleLineHeight = isSmallMobile ? 34 : isMobile ? 40 : isTablet ? 50 : 62;
  const heroSubtitleFontSize = isSmallMobile ? 14 : isMobile ? 15 : 17;
  const heroSubtitleLineHeight = isSmallMobile ? 22 : isMobile ? 24 : 28;

  const scrollToSection = (id: string) => {
    if (Platform.OS === "web" && typeof document !== "undefined") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* =========================================================================
          1. PUBLIC MARKETING NAVBAR (Decoupled from internal app routes)
         ========================================================================= */}
      <View style={styles.navBarWrapper}>
        <View style={[styles.navBar, { paddingHorizontal: horizontalPadding }]}>
          <CareFlowLogo size={isSmallMobile ? 32 : 38} showText={!isSmallMobile} />

          {/* Desktop Product Showcase Anchor Links */}
          {isDesktop && (
            <View style={styles.navLinks}>
              <TouchableOpacity
                onPress={() => scrollToSection("why-careflow")}
                accessibilityRole="link"
              >
                <Text style={styles.navLinkItem}>Why Careflow</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => scrollToSection("features")}
                accessibilityRole="link"
              >
                <Text style={styles.navLinkItem}>Features</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => scrollToSection("how-it-works")}
                accessibilityRole="link"
              >
                <Text style={styles.navLinkItem}>How It Works</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => scrollToSection("dignity-safety")}
                accessibilityRole="link"
              >
                <Text style={styles.navLinkItem}>Dignity & Privacy</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Authentication Actions */}
          <View style={styles.navActions}>
            <TouchableOpacity
              style={[styles.navSignInBtn, isSmallMobile && styles.navBtnSmall]}
              onPress={() => router.push("/(auth)/login")}
              accessibilityLabel="Sign In"
            >
              <Text style={[styles.navSignInText, isSmallMobile && styles.navBtnTextSmall]}>
                Sign In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navRegisterBtn, isSmallMobile && styles.navBtnSmall]}
              onPress={() => router.push("/(auth)/register")}
              accessibilityLabel="Create Free Account"
            >
              <Text style={[styles.navRegisterText, isSmallMobile && styles.navBtnTextSmall]}>
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* =========================================================================
          2. HERO SECTION: VALUE PROPOSITION & SHOWCASE
         ========================================================================= */}
      <View style={[styles.heroSection, { paddingHorizontal: horizontalPadding }]}>
        <View style={styles.heroBadge}>
          <Sparkles size={15} color={Theme.colors.brandPrimary} />
          <Text style={styles.heroBadgeText}>INDEPENDENT LIVING • CONNECTED CARE CIRCLE</Text>
        </View>

        <Text
          style={[
            styles.heroTitle,
            { fontSize: heroTitleFontSize, lineHeight: heroTitleLineHeight },
          ]}
        >
          Daily Care, Reimagined with <Text style={styles.heroTitleHighlight}>Dignity</Text> & Modern Simplicity.
        </Text>

        <Text
          style={[
            styles.heroSubtitle,
            { fontSize: heroSubtitleFontSize, lineHeight: heroSubtitleLineHeight },
          ]}
        >
          The serene companion for daily medication tracking, gentle wellness check-ins, and trusted family care circles — engineered for clarity without cognitive fatigue.
        </Text>

        {/* Primary CTA and Google Authentication Handshake */}
        <View style={[styles.heroActionCluster, isDesktop && styles.heroActionClusterDesktop]}>
          <TouchableOpacity
            style={styles.heroPrimaryBtn}
            onPress={() => router.push("/(auth)/register")}
            activeOpacity={0.88}
          >
            <Text style={styles.heroPrimaryBtnText}>Create Your Account</Text>
            <ArrowRight size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
          </TouchableOpacity>

          <View style={styles.heroGoogleWrapper}>
            <GoogleAuthButton variant="continue" />
          </View>
        </View>

        <TouchableOpacity
          style={styles.heroSecondaryPrompt}
          onPress={() => router.push("/(auth)/login")}
        >
          <Text style={styles.heroSecondaryPromptText}>
            Already coordinate care with CareFlow? <Text style={styles.heroSecondaryLink}>Sign In here</Text>
          </Text>
        </TouchableOpacity>

        {/* Ergonomic & Trust Highlights Banner */}
        <View style={styles.trustPillRow}>
          <View style={styles.trustPill}>
            <CheckCircle2 size={14} color={Theme.colors.success} />
            <Text style={styles.trustPillText}>48px+ Touch Boundaries</Text>
          </View>
          <View style={styles.trustPill}>
            <CheckCircle2 size={14} color={Theme.colors.success} />
            <Text style={styles.trustPillText}>WCAG AAA High-Contrast</Text>
          </View>
          <View style={styles.trustPill}>
            <CheckCircle2 size={14} color={Theme.colors.success} />
            <Text style={styles.trustPillText}>Zero Confusing Advertisements</Text>
          </View>
          <View style={styles.trustPill}>
            <CheckCircle2 size={14} color={Theme.colors.success} />
            <Text style={styles.trustPillText}>Server-Authoritative Security</Text>
          </View>
        </View>
      </View>

      {/* =========================================================================
          3. THE TENSION: WHAT EXACTLY WE ARE SOLVING (Before vs. After)
         ========================================================================= */}
      <View
        id="why-careflow"
        style={[styles.sectionContainer, styles.tensionSection, { paddingHorizontal: horizontalPadding }]}
      >
        <View style={styles.sectionHeader}>
          <View style={styles.sectionBadge}>
            <Heart size={14} color={Theme.colors.brandPrimary} />
            <Text style={styles.sectionBadgeText}>THE PROBLEM WE SOLVE</Text>
          </View>
          <Text style={styles.sectionTitle}>
            Care Should Bring Reassurance, Not Anxious Friction.
          </Text>
          <Text style={styles.sectionSubtitle}>
            Older adults treasure independence and self-worth. Families desire reassurance without intrusive questioning. CareFlow replaces daily anxiety with ambient, dignified clarity.
          </Text>
        </View>

        <View style={[styles.tensionGrid, isDesktop && styles.tensionGridDesktop]}>
          {/* Tension Card 1: Medications */}
          <View style={styles.tensionCard}>
            <View style={styles.tensionPainBox}>
              <View style={styles.tensionHeaderRow}>
                <AlertCircle size={18} color="#EF4444" />
                <Text style={styles.tensionPainTag}>THE DAILY FRICTION</Text>
              </View>
              <Text style={styles.tensionPainTitle}>Disjointed Pill Boxes & Missed Doses</Text>
              <Text style={styles.tensionPainDesc}>
                Plastic organizers with faded letters, confusing multi-bottle regimens, and constant doubt over whether a critical dose was taken or forgotten.
              </Text>
            </View>
            <View style={styles.tensionDivider}>
              <View style={styles.tensionDividerLine} />
              <View style={styles.tensionDividerPill}>
                <Text style={styles.tensionDividerPillText}>SOLVED BY CAREFLOW</Text>
              </View>
              <View style={styles.tensionDividerLine} />
            </View>
            <View style={styles.tensionSolutionBox}>
              <View style={styles.tensionHeaderRow}>
                <CheckCircle2 size={18} color={Theme.colors.success} />
                <Text style={styles.tensionSolutionTag}>THE CAREFLOW STANDARD</Text>
              </View>
              <Text style={styles.tensionSolutionTitle}>Synchronized Precision Medication Vault</Text>
              <Text style={styles.tensionSolutionDesc}>
                A clear, chronological schedule with distinct color-coded slots, large pill labels, single-tap confirmation, and an instant audit ledger.
              </Text>
            </View>
          </View>

          {/* Tension Card 2: Check-ins */}
          <View style={styles.tensionCard}>
            <View style={styles.tensionPainBox}>
              <View style={styles.tensionHeaderRow}>
                <AlertCircle size={18} color="#EF4444" />
                <Text style={styles.tensionPainTag}>THE DAILY FRICTION</Text>
              </View>
              <Text style={styles.tensionPainTitle}>Anxious & Interrogating Check-In Calls</Text>
              <Text style={styles.tensionPainDesc}>
                Adult children calling with tense questions ("Did you eat? Did you take your pills?"), making parents feel managed, monitored, and patronized.
              </Text>
            </View>
            <View style={styles.tensionDivider}>
              <View style={styles.tensionDividerLine} />
              <View style={styles.tensionDividerPill}>
                <Text style={styles.tensionDividerPillText}>SOLVED BY CAREFLOW</Text>
              </View>
              <View style={styles.tensionDividerLine} />
            </View>
            <View style={styles.tensionSolutionBox}>
              <View style={styles.tensionHeaderRow}>
                <CheckCircle2 size={18} color={Theme.colors.success} />
                <Text style={styles.tensionSolutionTag}>THE CAREFLOW STANDARD</Text>
              </View>
              <Text style={styles.tensionSolutionTitle}>Ambient 1-Tap Emotive Telemetry</Text>
              <Text style={styles.tensionSolutionDesc}>
                One peaceful tap shares how they feel and logs morning wellness. Family members view ambient updates without hovering or demanding explanations.
              </Text>
            </View>
          </View>

          {/* Tension Card 3: Schedules */}
          <View style={styles.tensionCard}>
            <View style={styles.tensionPainBox}>
              <View style={styles.tensionHeaderRow}>
                <AlertCircle size={18} color="#EF4444" />
                <Text style={styles.tensionPainTag}>THE DAILY FRICTION</Text>
              </View>
              <Text style={styles.tensionPainTitle}>Scattered Paper Slips & Missed Consults</Text>
              <Text style={styles.tensionPainDesc}>
                Paper reminder slips stuck to refrigerators, missed clinical checkups, and disjointed coordination between siblings, helpers, and specialists.
              </Text>
            </View>
            <View style={styles.tensionDivider}>
              <View style={styles.tensionDividerLine} />
              <View style={styles.tensionDividerPill}>
                <Text style={styles.tensionDividerPillText}>SOLVED BY CAREFLOW</Text>
              </View>
              <View style={styles.tensionDividerLine} />
            </View>
            <View style={styles.tensionSolutionBox}>
              <View style={styles.tensionHeaderRow}>
                <CheckCircle2 size={18} color={Theme.colors.success} />
                <Text style={styles.tensionSolutionTag}>THE CAREFLOW STANDARD</Text>
              </View>
              <Text style={styles.tensionSolutionTitle}>Unified Clinical & Care Timeline</Text>
              <Text style={styles.tensionSolutionDesc}>
                Doctor appointments, routine milestones, and clinical prescriptions unified in a real-time, shared timeline accessible from any device.
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* =========================================================================
          4. THE FOUR FEATURE SHOWCASES (DOMAIN-AUTHENTIC ISOMETRIC VISUALS)
         ========================================================================= */}
      <View
        id="features"
        style={[styles.sectionContainer, { paddingHorizontal: horizontalPadding }]}
      >
        <View style={styles.sectionHeader}>
          <View style={styles.sectionBadge}>
            <Activity size={14} color={Theme.colors.brandPrimary} />
            <Text style={styles.sectionBadgeText}>CORE HEALTHCARE CAPABILITIES</Text>
          </View>
          <Text style={styles.sectionTitle}>
            Thoughtfully Designed for Every Daily Health Need.
          </Text>
          <Text style={styles.sectionSubtitle}>
            From time-critical prescriptions to daily hydration and ambient family communication, CareFlow transforms fragmented routines into serene, dependable habits.
          </Text>
        </View>

        {/* 2x2 Showcase Grid */}
        <View style={[styles.showcaseGrid, isDesktop && styles.showcaseGridDesktop]}>
          {/* Card 1: Medication Deck */}
          <View style={[styles.showcaseCol, isDesktop && styles.showcaseColDesktop]}>
            <IsometricCard
              category="MEDICATION SCHEDULE"
              title="Daily Medication Dock & Ledger"
              interactionHint="Chronological color-coded dosage slots with instant taken verification"
              liveReadout="98.4% ADHERENCE • 0 MISSED"
              readoutStatus="success"
            >
              <MedicationDeckVisual width={isSmallMobile ? 300 : isMobile ? 340 : 380} height={230} />
            </IsometricCard>
            <View style={styles.featureDetails}>
              <Text style={styles.featureItemTitle}>Precision Medication Dispensing & Tracking</Text>
              <Text style={styles.featureItemDesc}>
                No more confusing medication schedules. CareFlow organizes morning, afternoon, evening, and bedtime prescriptions into intuitive chronological cards with dosage instructions and single-tap logging.
              </Text>
            </View>
          </View>

          {/* Card 2: Emotive Check-In */}
          <View style={[styles.showcaseCol, isDesktop && styles.showcaseColDesktop]}>
            <IsometricCard
              category="WELLNESS CHECK-IN"
              title="One-Tap Daily Wellness Console"
              interactionHint="Large tactile emotion cards with ambient sinus rhythm tracking"
              liveReadout="STATUS: GOOD • 1-TAP RECORDED"
              readoutStatus="active"
            >
              <WellnessCheckinVisual width={isSmallMobile ? 300 : isMobile ? 340 : 380} height={230} />
            </IsometricCard>
            <View style={styles.featureDetails}>
              <Text style={styles.featureItemTitle}>One-Tap Emotive Check-Ins</Text>
              <Text style={styles.featureItemDesc}>
                Seniors can express their morning wellness with one gentle tap between four reassuring states: Great, Good, Okay, or Needs Attention. Fast, dignified, and completely free of typing stress.
              </Text>
            </View>
          </View>

          {/* Card 3: Daily Routine & Hydration */}
          <View style={[styles.showcaseCol, isDesktop && styles.showcaseColDesktop]}>
            <IsometricCard
              category="ROUTINE & HYDRATION"
              title="Daily Care & Habit Station"
              interactionHint="Crystal graduated hydration goal with stepped milestone cards"
              liveReadout="3 OF 4 MILESTONES COMPLETED"
              readoutStatus="active"
            >
              <DailyRoutineVisual width={isSmallMobile ? 300 : isMobile ? 340 : 380} height={230} />
            </IsometricCard>
            <View style={styles.featureDetails}>
              <Text style={styles.featureItemTitle}>Daily Routine & Wellness Checklist</Text>
              <Text style={styles.featureItemDesc}>
                From morning walks to hydration tracking and vitals monitoring, each daily task provides visible accomplishment. Progress bars advance smoothly throughout the day, reinforcing positive habits.
              </Text>
            </View>
          </View>

          {/* Card 4: Care Circle */}
          <View style={[styles.showcaseCol, isDesktop && styles.showcaseColDesktop]}>
            <IsometricCard
              category="CARE CIRCLE NETWORK"
              title="Family & Doctor Care Circle"
              interactionHint="Luminous privacy-gated telemetry connecting elder, family & physician"
              liveReadout="FAMILY & CLINIC NODES SYNCED"
              readoutStatus="success"
            >
              <CareCircleVisual width={isSmallMobile ? 300 : isMobile ? 340 : 380} height={230} />
            </IsometricCard>
            <View style={styles.featureDetails}>
              <Text style={styles.featureItemTitle}>Connected Family & Clinical Circle</Text>
              <Text style={styles.featureItemDesc}>
                Bridges the elder deck with loved ones and attending clinicians. Strict server-authoritative consent ensures only authorized family members view wellness summaries, preserving personal privacy.
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* =========================================================================
          5. HOW IT WORKS: THE 3-STEP SENIOR JOURNEY
         ========================================================================= */}
      <View
        id="how-it-works"
        style={[styles.sectionContainer, styles.journeySection, { paddingHorizontal: horizontalPadding }]}
      >
        <View style={styles.sectionHeader}>
          <View style={styles.sectionBadge}>
            <Activity size={14} color={Theme.colors.brandPrimary} />
            <Text style={styles.sectionBadgeText}>THE EXPERIENCE</Text>
          </View>
          <Text style={styles.sectionTitle}>
            Designed for Simplicity in Three Gentle Steps.
          </Text>
          <Text style={styles.sectionSubtitle}>
            Healthcare software should never require a manual. CareFlow operates smoothly from sunrise to bedtime.
          </Text>
        </View>

        <View style={[styles.stepGrid, isDesktop && styles.stepGridDesktop]}>
          {/* Step 1 */}
          <View style={styles.stepCard}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>01</Text>
            </View>
            <Text style={styles.stepTitle}>Glanceable Morning Deck</Text>
            <Text style={styles.stepDesc}>
              Upon waking, a calm greeting, weather summary, and immediate view of today's morning medications greet the elder on a glare-free canvas.
            </Text>
          </View>

          {/* Step 2 */}
          <View style={styles.stepCard}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>02</Text>
            </View>
            <Text style={styles.stepTitle}>Single-Tap Confirmation</Text>
            <Text style={styles.stepDesc}>
              Taking medication or recording a mood takes a single tap on a generous 48px+ touch button, accompanied by clear visual confirmation.
            </Text>
          </View>

          {/* Step 3 */}
          <View style={styles.stepCard}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>03</Text>
            </View>
            <Text style={styles.stepTitle}>Ambient Family Assurance</Text>
            <Text style={styles.stepDesc}>
              Family members receive serene ambient reassurance on their phones. If assistance is ever needed, the circle is notified seamlessly.
            </Text>
          </View>
        </View>
      </View>

      {/* =========================================================================
          6. CLINICAL TRUST, SECURITY & DIGNITY BANNER
         ========================================================================= */}
      <View
        id="dignity-safety"
        style={[styles.sectionContainer, { paddingHorizontal: horizontalPadding }]}
      >
        <View style={styles.trustBanner}>
          <View style={styles.trustBannerHeader}>
            <ShieldCheck size={28} color={Theme.colors.brandPrimary} />
            <Text style={styles.trustBannerTitle}>
              Built to Rigorous Clinical & Accessibility Standards
            </Text>
          </View>

          <View style={[styles.trustGrid, isDesktop && styles.trustGridDesktop]}>
            <View style={styles.trustItem}>
              <View style={styles.trustIconWrap}>
                <Lock size={20} color={Theme.colors.brandPrimary} />
              </View>
              <Text style={styles.trustItemTitle}>Server-Authoritative Security</Text>
              <Text style={styles.trustItemDesc}>
                Role-based access control, cryptographic token verification, and strict tenant isolation verified on the backend.
              </Text>
            </View>

            <View style={styles.trustItem}>
              <View style={styles.trustIconWrap}>
                <Eye size={20} color={Theme.colors.brandPrimary} />
              </View>
              <Text style={styles.trustItemTitle}>Geriatric WCAG AAA Contrast</Text>
              <Text style={styles.trustItemDesc}>
                Obsidian slate typography and vibrant Sky/Teal accents tested for effortless legibility across diverse eye conditions.
              </Text>
            </View>

            <View style={styles.trustItem}>
              <View style={styles.trustIconWrap}>
                <Heart size={20} color={Theme.colors.brandPrimary} />
              </View>
              <Text style={styles.trustItemTitle}>Zero Cognitive Friction</Text>
              <Text style={styles.trustItemDesc}>
                Generous touch boundaries, familiar icons, and plain English descriptions eliminate confusion and anxiety.
              </Text>
            </View>

            <View style={styles.trustItem}>
              <View style={styles.trustIconWrap}>
                <Users size={20} color={Theme.colors.brandPrimary} />
              </View>
              <Text style={styles.trustItemTitle}>Patient Data Sovereignty</Text>
              <Text style={styles.trustItemDesc}>
                Health records remain private. No advertising tracking, no data brokers, and full patient ownership of all health history.
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* =========================================================================
          7. BOTTOM CONVERSION CTA CARD
         ========================================================================= */}
      <View style={[styles.bottomCtaSection, { paddingHorizontal: horizontalPadding }]}>
        <View style={styles.bottomCtaCard}>
          <Text style={styles.bottomCtaTitle}>
            Give Your Loved Ones the Gift of Dignity and Serenity.
          </Text>
          <Text style={styles.bottomCtaSubtitle}>
            Join the modern standard in compassionate elder care coordination. Set up your care circle in minutes.
          </Text>

          <View style={[styles.bottomCtaBtnRow, isDesktop && styles.bottomCtaBtnRowDesktop]}>
            <TouchableOpacity
              style={styles.bottomCtaPrimaryBtn}
              onPress={() => router.push("/(auth)/register")}
              activeOpacity={0.88}
            >
              <Text style={styles.bottomCtaPrimaryText}>Create Free Account</Text>
              <ArrowRight size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bottomCtaSecondaryBtn}
              onPress={() => router.push("/(auth)/login")}
              activeOpacity={0.8}
            >
              <Text style={styles.bottomCtaSecondaryText}>Sign In to Existing Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* =========================================================================
          8. ENTERPRISE MULTI-COLUMN FOOTER
         ========================================================================= */}
      <View style={styles.footerWrapper}>
        <View style={[styles.footerContainer, { paddingHorizontal: horizontalPadding }]}>
          <View style={[styles.footerColumns, isDesktop && styles.footerColumnsDesktop]}>
            {/* Column 1: Brand & Mission */}
            <View style={styles.footerBrandCol}>
              <CareFlowLogo size={34} showText={true} />
              <Text style={styles.footerMissionText}>
                Empowering older adults with dignity, autonomy, and serene connection to loved ones and healthcare specialists.
              </Text>
              <View style={styles.systemStatusPill}>
                <View style={styles.systemStatusDot} />
                <Text style={styles.systemStatusText}>All Systems Operational • API v1.0</Text>
              </View>
            </View>

            {/* Column 2: Platform Views */}
            <View style={styles.footerCol}>
              <Text style={styles.footerColHeading}>Platform Experience</Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                <Text style={styles.footerLink}>Elder Daily Care Deck</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                <Text style={styles.footerLink}>Medication Ledger</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                <Text style={styles.footerLink}>Daily Routine Rail</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                <Text style={styles.footerLink}>Care Timeline & Events</Text>
              </TouchableOpacity>
            </View>

            {/* Column 3: Product & Design */}
            <View style={styles.footerCol}>
              <Text style={styles.footerColHeading}>Product Showcase</Text>
              <TouchableOpacity onPress={() => scrollToSection("why-careflow")}>
                <Text style={styles.footerLink}>Why Careflow</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection("features")}>
                <Text style={styles.footerLink}>Feature Instruments</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection("how-it-works")}>
                <Text style={styles.footerLink}>How It Works</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection("dignity-safety")}>
                <Text style={styles.footerLink}>Geriatric UX Principles</Text>
              </TouchableOpacity>
            </View>

            {/* Column 4: Trust, Security & Legal */}
            <View style={styles.footerCol}>
              <Text style={styles.footerColHeading}>Trust & Compliance</Text>
              <Text style={styles.footerStaticItem}>Server-Authoritative Auth</Text>
              <Text style={styles.footerStaticItem}>HIPAA Compliance Ready</Text>
              <Text style={styles.footerStaticItem}>WCAG AAA Contrast Standards</Text>
              <Text style={styles.footerStaticItem}>Zero Third-Party Trackers</Text>
            </View>
          </View>

          {/* Bottom Copyright & Disclaimer Bar */}
          <View style={styles.footerBottomBar}>
            <Text style={styles.footerCopyright}>
              © 2026 CareFlow Health Inc. All rights reserved.
            </Text>
            <Text style={styles.footerMedicalNotice}>
              CareFlow is a compassionate care-coordination platform. In medical emergencies, always dial 911 or your local emergency services directly.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    paddingBottom: 0,
  },

  // 1. Navbar Styles
  navBarWrapper: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    position: "relative",
    zIndex: 100,
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 70,
    maxWidth: 1240,
    width: "100%",
    alignSelf: "center",
  },
  navLinks: {
    flexDirection: "row",
    alignItems: "center",
    gap: 32,
  },
  navLinkItem: {
    fontFamily: Theme.fonts.heading,
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
    letterSpacing: -0.1,
    ...Platform.select({
      web: {
        cursor: "pointer",
        transition: "color 0.15s ease",
      },
    }),
  },
  navActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  navSignInBtn: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: Theme.ergonomics.buttonRadius,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    ...Platform.select({
      web: { cursor: "pointer" },
    }),
  },
  navSignInText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 13,
    fontWeight: "600",
    color: "#0F172A",
  },
  navRegisterBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: Theme.ergonomics.buttonRadius,
    backgroundColor: Theme.colors.brandPrimary,
    ...Platform.select({
      web: { cursor: "pointer" },
    }),
  },
  navRegisterText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  navBtnSmall: {
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  navBtnTextSmall: {
    fontSize: 12,
  },

  // 2. Hero Section
  heroSection: {
    alignItems: "center",
    paddingTop: 56,
    paddingBottom: 48,
    maxWidth: 960,
    alignSelf: "center",
    width: "100%",
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F0F9FF",
    borderWidth: 1,
    borderColor: "#BAE6FD",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 100,
    marginBottom: 20,
  },
  heroBadgeText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 11,
    fontWeight: "700",
    color: Theme.colors.brandPrimary,
    letterSpacing: 0.6,
  },
  heroTitle: {
    fontFamily: Theme.fonts.brand,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 18,
    letterSpacing: -0.8,
  },
  heroTitleHighlight: {
    color: Theme.colors.brandPrimary,
  },
  heroSubtitle: {
    fontFamily: Theme.fonts.body,
    color: "#475569",
    textAlign: "center",
    maxWidth: 720,
    marginBottom: 32,
  },
  heroActionCluster: {
    width: "100%",
    maxWidth: 480,
    gap: 12,
    marginBottom: 16,
  },
  heroActionClusterDesktop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 580,
  },
  heroPrimaryBtn: {
    flex: 1,
    minHeight: 50,
    backgroundColor: Theme.colors.brandPrimary,
    borderRadius: Theme.ergonomics.buttonRadius,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 22,
    ...Platform.select({
      web: {
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(2, 132, 199, 0.25)",
      },
      default: {
        elevation: 3,
        shadowColor: Theme.colors.brandPrimary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
    }),
  },
  heroPrimaryBtnText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.1,
  },
  heroGoogleWrapper: {
    flex: 1,
  },
  heroSecondaryPrompt: {
    marginTop: 6,
    marginBottom: 32,
  },
  heroSecondaryPromptText: {
    fontFamily: Theme.fonts.body,
    fontSize: 13,
    color: "#64748B",
  },
  heroSecondaryLink: {
    fontFamily: Theme.fonts.heading,
    fontWeight: "600",
    color: Theme.colors.brandPrimary,
    textDecorationLine: "underline",
  },
  trustPillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
    marginTop: 8,
  },
  trustPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  trustPillText: {
    fontFamily: Theme.fonts.body,
    fontSize: 12,
    color: "#334155",
    fontWeight: "500",
  },

  // Common Section Styling
  sectionContainer: {
    paddingVertical: 56,
    maxWidth: 1200,
    width: "100%",
    alignSelf: "center",
  },
  sectionHeader: {
    alignItems: "center",
    marginBottom: 44,
  },
  sectionBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#F0F9FF",
    borderWidth: 1,
    borderColor: "#BAE6FD",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
    marginBottom: 12,
  },
  sectionBadgeText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 11,
    fontWeight: "700",
    color: Theme.colors.brandPrimary,
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontFamily: Theme.fonts.brand,
    fontSize: 32,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  sectionSubtitle: {
    fontFamily: Theme.fonts.body,
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
    maxWidth: 700,
    lineHeight: 24,
  },

  // 3. Tension Section
  tensionSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingVertical: 56,
    marginVertical: 24,
  },
  tensionGrid: {
    gap: 24,
  },
  tensionGridDesktop: {
    flexDirection: "row",
  },
  tensionCard: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 20,
  },
  tensionPainBox: {
    paddingBottom: 16,
  },
  tensionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  tensionPainTag: {
    fontFamily: Theme.fonts.heading,
    fontSize: 10,
    fontWeight: "700",
    color: "#EF4444",
    letterSpacing: 0.5,
  },
  tensionPainTitle: {
    fontFamily: Theme.fonts.heading,
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 6,
  },
  tensionPainDesc: {
    fontFamily: Theme.fonts.body,
    fontSize: 13,
    color: "#64748B",
    lineHeight: 19,
  },
  tensionDivider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  tensionDividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#CBD5E1",
  },
  tensionDividerPill: {
    backgroundColor: "#E0F2FE",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  tensionDividerPillText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 9,
    fontWeight: "700",
    color: "#0369A1",
    letterSpacing: 0.5,
  },
  tensionSolutionBox: {
    paddingTop: 4,
  },
  tensionSolutionTag: {
    fontFamily: Theme.fonts.heading,
    fontSize: 10,
    fontWeight: "700",
    color: Theme.colors.success,
    letterSpacing: 0.5,
  },
  tensionSolutionTitle: {
    fontFamily: Theme.fonts.heading,
    fontSize: 16,
    fontWeight: "700",
    color: "#0369A1",
    marginBottom: 6,
  },
  tensionSolutionDesc: {
    fontFamily: Theme.fonts.body,
    fontSize: 13,
    color: "#334155",
    lineHeight: 19,
  },

  // 4. Showcase Section
  showcaseGrid: {
    gap: 24,
  },
  showcaseGridDesktop: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  showcaseCol: {
    width: "100%",
  },
  showcaseColDesktop: {
    width: "48%",
  },
  featureDetails: {
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 16,
  },
  featureItemTitle: {
    fontFamily: Theme.fonts.heading,
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  featureItemDesc: {
    fontFamily: Theme.fonts.body,
    fontSize: 14,
    color: "#475569",
    lineHeight: 21,
  },

  // 5. Journey Section
  journeySection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingVertical: 56,
    marginVertical: 24,
  },
  stepGrid: {
    gap: 20,
  },
  stepGridDesktop: {
    flexDirection: "row",
  },
  stepCard: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 24,
  },
  stepBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E0F2FE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  stepBadgeText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 14,
    fontWeight: "700",
    color: "#0284C7",
  },
  stepTitle: {
    fontFamily: Theme.fonts.heading,
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
  },
  stepDesc: {
    fontFamily: Theme.fonts.body,
    fontSize: 14,
    color: "#64748B",
    lineHeight: 22,
  },

  // 6. Trust Banner
  trustBanner: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 36,
  },
  trustBannerHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    paddingBottom: 20,
  },
  trustBannerTitle: {
    fontFamily: Theme.fonts.brand,
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.3,
  },
  trustGrid: {
    gap: 24,
  },
  trustGridDesktop: {
    flexDirection: "row",
  },
  trustItem: {
    flex: 1,
  },
  trustIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#F0F9FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  trustItemTitle: {
    fontFamily: Theme.fonts.heading,
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 6,
  },
  trustItemDesc: {
    fontFamily: Theme.fonts.body,
    fontSize: 13,
    color: "#64748B",
    lineHeight: 20,
  },

  // 7. Bottom CTA
  bottomCtaSection: {
    paddingVertical: 48,
    maxWidth: 1080,
    width: "100%",
    alignSelf: "center",
  },
  bottomCtaCard: {
    backgroundColor: "#0F172A",
    borderRadius: 24,
    padding: 44,
    alignItems: "center",
  },
  bottomCtaTitle: {
    fontFamily: Theme.fonts.brand,
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: -0.4,
  },
  bottomCtaSubtitle: {
    fontFamily: Theme.fonts.body,
    fontSize: 16,
    color: "#94A3B8",
    textAlign: "center",
    maxWidth: 620,
    marginBottom: 28,
    lineHeight: 24,
  },
  bottomCtaBtnRow: {
    width: "100%",
    maxWidth: 460,
    gap: 12,
  },
  bottomCtaBtnRowDesktop: {
    flexDirection: "row",
    justifyContent: "center",
  },
  bottomCtaPrimaryBtn: {
    flex: 1,
    minHeight: 50,
    backgroundColor: Theme.colors.brandPrimary,
    borderRadius: Theme.ergonomics.buttonRadius,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    ...Platform.select({
      web: { cursor: "pointer" },
    }),
  },
  bottomCtaPrimaryText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  bottomCtaSecondaryBtn: {
    flex: 1,
    minHeight: 50,
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#334155",
    borderRadius: Theme.ergonomics.buttonRadius,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    ...Platform.select({
      web: { cursor: "pointer" },
    }),
  },
  bottomCtaSecondaryText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 14,
    fontWeight: "600",
    color: "#E2E8F0",
  },

  // 8. Multi-Column Enterprise Footer
  footerWrapper: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingTop: 56,
    paddingBottom: 40,
  },
  footerContainer: {
    maxWidth: 1200,
    width: "100%",
    alignSelf: "center",
  },
  footerColumns: {
    gap: 36,
  },
  footerColumnsDesktop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerBrandCol: {
    maxWidth: 320,
  },
  footerMissionText: {
    fontFamily: Theme.fonts.body,
    fontSize: 13,
    color: "#64748B",
    lineHeight: 20,
    marginTop: 14,
    marginBottom: 20,
  },
  systemStatusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
    alignSelf: "flex-start",
  },
  systemStatusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#10B981",
  },
  systemStatusText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 11,
    fontWeight: "600",
    color: "#15803D",
  },
  footerCol: {
    gap: 12,
  },
  footerColHeading: {
    fontFamily: Theme.fonts.heading,
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.1,
    marginBottom: 4,
  },
  footerLink: {
    fontFamily: Theme.fonts.body,
    fontSize: 13,
    color: "#475569",
    ...Platform.select({
      web: {
        cursor: "pointer",
        transition: "color 0.15s ease",
      },
    }),
  },
  footerStaticItem: {
    fontFamily: Theme.fonts.body,
    fontSize: 13,
    color: "#64748B",
  },
  footerBottomBar: {
    marginTop: 48,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    flexDirection: "column",
    gap: 12,
  },
  footerCopyright: {
    fontFamily: Theme.fonts.body,
    fontSize: 12,
    color: "#94A3B8",
  },
  footerMedicalNotice: {
    fontFamily: Theme.fonts.body,
    fontSize: 11,
    color: "#94A3B8",
    lineHeight: 16,
  },
});
