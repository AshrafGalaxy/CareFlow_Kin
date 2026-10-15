import React, { useRef, useState } from "react";
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
  Pill,
  Sun,
  Stethoscope,
  UserCheck,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Shield,
  EyeOff,
  Check,
  HeartHandshake,
} from "lucide-react-native";

export default function LandingPage() {
  const router = useRouter();
  const { isSmallMobile, isMobile, isTablet, isDesktop, horizontalPadding } = useResponsive();
  const scrollRef = useRef<ScrollView>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

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

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqItems = [
    {
      q: "What if my parent has never used a computer, tablet, or smartphone?",
      a: "CareFlow was co-designed alongside geriatric UX specialists specifically for non-tech-savvy seniors. There are zero multi-level menus, gestures, or tiny text. If they can tap a large high-contrast button on a screen, they can use CareFlow with total independence.",
    },
    {
      q: "Can multiple siblings and family members join the same care circle?",
      a: "Yes. Unlimited family members, spouses, and trusted helpers can join the circle. When your parent confirms their morning medication or shares their mood, everyone sees the update simultaneously—eliminating repetitive, anxious phone calls.",
    },
    {
      q: "How difficult is it to set up prescriptions and daily routines?",
      a: "It takes under 3 minutes. A family caregiver enters the medication names and dosage schedules once from their phone or laptop. The schedule instantly appears on the elder's deck in color-coded morning, afternoon, and evening slots.",
    },
    {
      q: "Does CareFlow replace emergency medical services or 911?",
      a: "No. CareFlow is an ambient daily care coordination platform designed for routine adherence, gentle wellness tracking, and family peace of mind. For sudden acute medical crises, always call 911 or your local emergency services directly.",
    },
    {
      q: "What devices are supported? Do we need to purchase proprietary hardware?",
      a: "No special hardware is required. CareFlow works seamlessly on any iPad, Android tablet, smartphone, or desktop web browser. Most families simply place an inexpensive dedicated tablet in the kitchen or on a bedside table.",
    },
  ];

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
                <Text style={styles.navLinkItem}>Capabilities</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => scrollToSection("both-sides")}
                accessibilityRole="link"
              >
                <Text style={styles.navLinkItem}>Both Sides of Care</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => scrollToSection("day-in-life")}
                accessibilityRole="link"
              >
                <Text style={styles.navLinkItem}>A Day in the Life</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => scrollToSection("dignity-manifesto")}
                accessibilityRole="link"
              >
                <Text style={styles.navLinkItem}>Dignity Standard</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => scrollToSection("faq")}
                accessibilityRole="link"
              >
                <Text style={styles.navLinkItem}>FAQ</Text>
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

        {/* =========================================================================
            3. THE 4 DOMAIN-CENTERED HEALTHCARE PILLARS (Replaces technical tags)
           ========================================================================= */}
        <View style={[styles.assuranceGrid, isDesktop && styles.assuranceGridDesktop]}>
          {/* Pillar 1: Zero-Missed Prescriptions */}
          <View style={styles.assuranceCard}>
            <View style={[styles.assuranceIconBadge, { backgroundColor: "#E0F2FE" }]}>
              <Pill size={18} color="#0284C7" />
            </View>
            <Text style={styles.assuranceTitle}>Zero-Missed Prescriptions</Text>
            <Text style={styles.assuranceDesc}>
              Chronological dosage slots with single-tap taken verification.
            </Text>
          </View>

          {/* Pillar 2: One-Tap Morning Check-In */}
          <View style={styles.assuranceCard}>
            <View style={[styles.assuranceIconBadge, { backgroundColor: "#FEF3C7" }]}>
              <Sun size={18} color="#D97706" />
            </View>
            <Text style={styles.assuranceTitle}>One-Tap Morning Check-In</Text>
            <Text style={styles.assuranceDesc}>
              Gentle wellness signal that reassures family without interrogation calls.
            </Text>
          </View>

          {/* Pillar 3: Cataract-Safe Visual Clarity */}
          <View style={styles.assuranceCard}>
            <View style={[styles.assuranceIconBadge, { backgroundColor: "#CCFBF1" }]}>
              <Eye size={18} color="#0D9488" />
            </View>
            <Text style={styles.assuranceTitle}>Cataract-Safe Visual Clarity</Text>
            <Text style={styles.assuranceDesc}>
              High-contrast, glare-free canvas designed for aging eyes and arthritic hands.
            </Text>
          </View>

          {/* Pillar 4: Doctor-Ready Health History */}
          <View style={styles.assuranceCard}>
            <View style={[styles.assuranceIconBadge, { backgroundColor: "#EDE9FE" }]}>
              <Stethoscope size={18} color="#7C3AED" />
            </View>
            <Text style={styles.assuranceTitle}>Doctor-Ready Health History</Text>
            <Text style={styles.assuranceDesc}>
              Verifiable 30-day compliance timeline ready for clinic appointments and telemedicine.
            </Text>
          </View>
        </View>
      </View>

      {/* =========================================================================
          4. THE TENSION: WHAT EXACTLY WE ARE SOLVING (Before vs. After)
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
          5. THE FOUR FEATURE SHOWCASES (DOMAIN-AUTHENTIC ISOMETRIC VISUALS)
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
          6. BUILT FOR BOTH SIDES OF CARE (Generational Dual-Perspective Matrix)
         ========================================================================= */}
      <View
        id="both-sides"
        style={[styles.sectionContainer, styles.bothSidesSection, { paddingHorizontal: horizontalPadding }]}
      >
        <View style={styles.sectionHeader}>
          <View style={styles.sectionBadge}>
            <Users size={14} color={Theme.colors.brandPrimary} />
            <Text style={styles.sectionBadgeText}>DUAL-PERSPECTIVE CARE</Text>
          </View>
          <Text style={styles.sectionTitle}>
            Built for Both Sides of Care: Dignity for Elders, Serenity for Families.
          </Text>
          <Text style={styles.sectionSubtitle}>
            Elderly tech fails when it treats seniors like patients or burdens adult children with false alarms. CareFlow provides two synchronized lenses on the exact same daily routine.
          </Text>
        </View>

        <View style={[styles.bothSidesGrid, isDesktop && styles.bothSidesGridDesktop]}>
          {/* Side 1: The Elder Experience */}
          <View style={styles.bothSidesCard}>
            <View style={styles.perspectiveBadgeRow}>
              <View style={[styles.perspectivePill, { backgroundColor: "#F0FDF4", borderColor: "#BBF7D0" }]}>
                <UserCheck size={14} color="#16A34A" />
                <Text style={[styles.perspectivePillText, { color: "#15803D" }]}>FOR OLDER ADULTS</Text>
              </View>
              <Text style={styles.perspectiveRoleTag}>The Daily Morning Companion</Text>
            </View>
            <Text style={styles.perspectiveCardTitle}>Autonomy, Clarity & Reverence</Text>
            <Text style={styles.perspectiveCardSubtitle}>
              An analog-simple digital sanctuary that honors personal rhythm and eliminates feelings of helplessness.
            </Text>

            <View style={styles.perspectiveFeatureList}>
              <View style={styles.perspectiveItem}>
                <CheckCircle2 size={18} color="#16A34A" style={styles.perspectiveItemIcon} />
                <View style={styles.perspectiveItemContent}>
                  <Text style={styles.perspectiveItemHeader}>Glanceable Morning Deck</Text>
                  <Text style={styles.perspectiveItemDesc}>
                    Wakes to warm greetings, weather summaries, and immediate medication clarity without password confusion.
                  </Text>
                </View>
              </View>

              <View style={styles.perspectiveItem}>
                <CheckCircle2 size={18} color="#16A34A" style={styles.perspectiveItemIcon} />
                <View style={styles.perspectiveItemContent}>
                  <Text style={styles.perspectiveItemHeader}>Single-Tap Mood Affirmation</Text>
                  <Text style={styles.perspectiveItemDesc}>
                    Check in with one gentle tap between Great, Good, Okay, or Need Help. No typing, no swiping hurdles.
                  </Text>
                </View>
              </View>

              <View style={styles.perspectiveItem}>
                <CheckCircle2 size={18} color="#16A34A" style={styles.perspectiveItemIcon} />
                <View style={styles.perspectiveItemContent}>
                  <Text style={styles.perspectiveItemHeader}>Zero Patronizing Alarms</Text>
                  <Text style={styles.perspectiveItemDesc}>
                    Replaces shrill sirens with polite, dignified visual cues that maintain calm throughout the living space.
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Side 2: The Family Caregiver Experience */}
          <View style={styles.bothSidesCard}>
            <View style={styles.perspectiveBadgeRow}>
              <View style={[styles.perspectivePill, { backgroundColor: "#F0F9FF", borderColor: "#BAE6FD" }]}>
                <HeartHandshake size={14} color="#0284C7" />
                <Text style={[styles.perspectivePillText, { color: "#0369A1" }]}>FOR ADULT CHILDREN & SIBLINGS</Text>
              </View>
              <Text style={styles.perspectiveRoleTag}>The Ambient Reassurance Dashboard</Text>
            </View>
            <Text style={styles.perspectiveCardTitle}>Quiet Peace of Mind Without Nagging</Text>
            <Text style={styles.perspectiveCardSubtitle}>
              Stay fully informed and coordinated without turning every phone call into a tense medical interrogation.
            </Text>

            <View style={styles.perspectiveFeatureList}>
              <View style={styles.perspectiveItem}>
                <CheckCircle2 size={18} color="#0284C7" style={styles.perspectiveItemIcon} />
                <View style={styles.perspectiveItemContent}>
                  <Text style={styles.perspectiveItemHeader}>Ambient Morning Confirmation</Text>
                  <Text style={styles.perspectiveItemDesc}>
                    Receive a calm push alert the moment mom logs her morning meds and check-in, freeing your workday from anxiety.
                  </Text>
                </View>
              </View>

              <View style={styles.perspectiveItem}>
                <CheckCircle2 size={18} color="#0284C7" style={styles.perspectiveItemIcon} />
                <View style={styles.perspectiveItemContent}>
                  <Text style={styles.perspectiveItemHeader}>Unified Sibling Synchronization</Text>
                  <Text style={styles.perspectiveItemDesc}>
                    Brothers and sisters see the exact same real-time ledger, ending duplicate phone calls and coordination friction.
                  </Text>
                </View>
              </View>

              <View style={styles.perspectiveItem}>
                <CheckCircle2 size={18} color="#0284C7" style={styles.perspectiveItemIcon} />
                <View style={styles.perspectiveItemContent}>
                  <Text style={styles.perspectiveItemHeader}>Doctor-Ready Adherence Timeline</Text>
                  <Text style={styles.perspectiveItemDesc}>
                    Walk into medical consults with 30-day verified adherence histories rather than vague memory estimates.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* =========================================================================
          7. A DAY IN THE LIFE WITH CAREFLOW (Chronological Scenario Walkthrough)
         ========================================================================= */}
      <View
        id="day-in-life"
        style={[styles.sectionContainer, { paddingHorizontal: horizontalPadding }]}
      >
        <View style={styles.sectionHeader}>
          <View style={styles.sectionBadge}>
            <Clock size={14} color={Theme.colors.brandPrimary} />
            <Text style={styles.sectionBadgeText}>A TYPICAL TUESDAY</Text>
          </View>
          <Text style={styles.sectionTitle}>
            A Day in the Life with CareFlow
          </Text>
          <Text style={styles.sectionSubtitle}>
            Watch how CareFlow silently weaves into a family's daily rhythm, replacing anxious check-in friction with seamless, ambient certainty.
          </Text>
        </View>

        <View style={[styles.timelineContainer, isDesktop && styles.timelineContainerDesktop]}>
          {/* Event 1 */}
          <View style={styles.timelineItem}>
            <View style={styles.timelineMarkerCol}>
              <View style={styles.timelineDot}>
                <Sun size={16} color="#0284C7" />
              </View>
              <View style={styles.timelineConnectorLine} />
            </View>
            <View style={styles.timelineCard}>
              <View style={styles.timelineHeaderRow}>
                <Text style={styles.timelineTime}>08:00 AM</Text>
                <Text style={styles.timelineTag}>MORNING WAKE</Text>
              </View>
              <Text style={styles.timelineTitle}>Eleanor's Morning Deck Lights Up</Text>
              <Text style={styles.timelineDesc}>
                Eleanor walks into her kitchen. Her dedicated tablet displays a warm greeting, local weather, and a crisp view of her morning heart prescription in high contrast.
              </Text>
            </View>
          </View>

          {/* Event 2 */}
          <View style={styles.timelineItem}>
            <View style={styles.timelineMarkerCol}>
              <View style={[styles.timelineDot, { backgroundColor: "#DCFCE7", borderColor: "#86EFAC" }]}>
                <Check size={16} color="#16A34A" />
              </View>
              <View style={styles.timelineConnectorLine} />
            </View>
            <View style={styles.timelineCard}>
              <View style={styles.timelineHeaderRow}>
                <Text style={styles.timelineTime}>08:02 AM</Text>
                <Text style={[styles.timelineTag, { color: "#16A34A", backgroundColor: "#F0FDF4" }]}>1-TAP LOG</Text>
              </View>
              <Text style={styles.timelineTitle}>Single-Tap Confirmation</Text>
              <Text style={styles.timelineDesc}>
                Eleanor takes her Atorvastatin, taps "Taken" with one touch, and taps "Feeling Good 😊". The pill slot turns soothing green with audible verification.
              </Text>
            </View>
          </View>

          {/* Event 3 */}
          <View style={styles.timelineItem}>
            <View style={styles.timelineMarkerCol}>
              <View style={[styles.timelineDot, { backgroundColor: "#FEF3C7", borderColor: "#FDE68A" }]}>
                <Heart size={16} color="#D97706" />
              </View>
              <View style={styles.timelineConnectorLine} />
            </View>
            <View style={styles.timelineCard}>
              <View style={styles.timelineHeaderRow}>
                <Text style={styles.timelineTime}>08:05 AM</Text>
                <Text style={[styles.timelineTag, { color: "#D97706", backgroundColor: "#FFFBEB" }]}>AMBIENT PING</Text>
              </View>
              <Text style={styles.timelineTitle}>Daughter Sarah Receives Quiet Relief</Text>
              <Text style={styles.timelineDesc}>
                25 miles away, daughter Sarah's phone lights up with a subtle notification: "Mom checked in and took her morning meds." Sarah smiles and heads into her work meeting with complete peace of mind.
              </Text>
            </View>
          </View>

          {/* Event 4 */}
          <View style={styles.timelineItem}>
            <View style={styles.timelineMarkerCol}>
              <View style={[styles.timelineDot, { backgroundColor: "#EDE9FE", borderColor: "#DDD6FE" }]}>
                <Stethoscope size={16} color="#7C3AED" />
              </View>
            </View>
            <View style={styles.timelineCard}>
              <View style={styles.timelineHeaderRow}>
                <Text style={styles.timelineTime}>02:30 PM</Text>
                <Text style={[styles.timelineTag, { color: "#7C3AED", backgroundColor: "#F5F3FF" }]}>CLINIC VISIT</Text>
              </View>
              <Text style={styles.timelineTitle}>Doctor Reviews 30-Day Verifiable History</Text>
              <Text style={styles.timelineDesc}>
                At Eleanor's cardiology appointment, Dr. Martinez opens the clinical compliance ledger. Seeing a 98.4% verified adherence streak, he refines Eleanor's dosage with clinical confidence.
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* =========================================================================
          8. DIGNITY OVER SURVEILLANCE: ETHICAL MANIFESTO
         ========================================================================= */}
      <View
        id="dignity-manifesto"
        style={[styles.sectionContainer, styles.manifestoSection, { paddingHorizontal: horizontalPadding }]}
      >
        <View style={styles.sectionHeader}>
          <View style={styles.sectionBadge}>
            <ShieldCheck size={14} color={Theme.colors.brandPrimary} />
            <Text style={styles.sectionBadgeText}>ETHICAL HEALTHCARE MANIFESTO</Text>
          </View>
          <Text style={styles.sectionTitle}>
            Dignity Over Surveillance: Why We Reject Intrusive Monitoring.
          </Text>
          <Text style={styles.sectionSubtitle}>
            Older adults reject technology when they feel spied on or infantilized. CareFlow is built as an empowering self-directed companion, strictly honoring human sovereignty and privacy.
          </Text>
        </View>

        <View style={[styles.manifestoGrid, isDesktop && styles.manifestoGridDesktop]}>
          <View style={styles.manifestoCard}>
            <View style={[styles.manifestoIconWrap, { backgroundColor: "#FEE2E2" }]}>
              <EyeOff size={22} color="#DC2626" />
            </View>
            <Text style={[styles.manifestoCardTag, { color: "#DC2626" }]}>SANCTUARY GUARANTEE</Text>
            <Text style={styles.manifestoCardTitle}>Zero Webcams or Microphones</Text>
            <Text style={styles.manifestoCardDesc}>
              We never install intrusive cameras, microphones, or wearable tracking beacons. Your parent's living space remains their sacred, unmonitored home.
            </Text>
          </View>

          <View style={styles.manifestoCard}>
            <View style={[styles.manifestoIconWrap, { backgroundColor: "#DCFCE7" }]}>
              <UserCheck size={22} color="#16A34A" />
            </View>
            <Text style={[styles.manifestoCardTag, { color: "#16A34A" }]}>PATIENT SOVEREIGNTY</Text>
            <Text style={styles.manifestoCardTitle}>Sovereign Self-Reporting</Text>
            <Text style={styles.manifestoCardDesc}>
              CareFlow empowers the senior as an autonomous agent. They self-report their mood and medications on their own schedule rather than being subjected to passive surveillance.
            </Text>
          </View>

          <View style={styles.manifestoCard}>
            <View style={[styles.manifestoIconWrap, { backgroundColor: "#E0F2FE" }]}>
              <Lock size={22} color="#0284C7" />
            </View>
            <Text style={[styles.manifestoCardTag, { color: "#0284C7" }]}>ZERO DATA BROKERING</Text>
            <Text style={styles.manifestoCardTitle}>Zero Data Commercialization</Text>
            <Text style={styles.manifestoCardDesc}>
              Health logs are strictly isolated by cryptographic server authorization. We will never sell, broker, or monetize your family's health history to third parties or advertisers.
            </Text>
          </View>
        </View>
      </View>

      {/* =========================================================================
          9. FREQUENTLY ASKED QUESTIONS (Interactive Accordion)
         ========================================================================= */}
      <View
        id="faq"
        style={[styles.sectionContainer, { paddingHorizontal: horizontalPadding }]}
      >
        <View style={styles.sectionHeader}>
          <View style={styles.sectionBadge}>
            <HelpCircle size={14} color={Theme.colors.brandPrimary} />
            <Text style={styles.sectionBadgeText}>COMMON QUESTIONS</Text>
          </View>
          <Text style={styles.sectionTitle}>
            Frequently Asked Questions
          </Text>
          <Text style={styles.sectionSubtitle}>
            Everything you need to know about setting up CareFlow for your parent or family circle.
          </Text>
        </View>

        <View style={styles.faqList}>
          {faqItems.map((item, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <View key={idx} style={[styles.faqItem, isOpen && styles.faqItemActive]}>
                <TouchableOpacity
                  style={styles.faqQuestionRow}
                  onPress={() => toggleFaq(idx)}
                  activeOpacity={0.8}
                  accessibilityRole="button"
                  accessibilityState={{ expanded: isOpen }}
                >
                  <Text style={[styles.faqQuestionText, isOpen && styles.faqQuestionTextActive]}>
                    {item.q}
                  </Text>
                  <View style={styles.faqIconContainer}>
                    {isOpen ? (
                      <ChevronUp size={20} color={Theme.colors.brandPrimary} />
                    ) : (
                      <ChevronDown size={20} color="#64748B" />
                    )}
                  </View>
                </TouchableOpacity>

                {isOpen && (
                  <View style={styles.faqAnswerContainer}>
                    <Text style={styles.faqAnswerText}>{item.a}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </View>

      {/* =========================================================================
          10. BOTTOM CONVERSION CTA CARD WITH RISK REVERSAL
         ========================================================================= */}
      <View style={[styles.bottomCtaSection, { paddingHorizontal: horizontalPadding }]}>
        <View style={styles.bottomCtaCard}>
          <View style={styles.bottomCtaBadge}>
            <Sparkles size={14} color={Theme.colors.brandPrimary} />
            <Text style={styles.bottomCtaBadgeText}>ZERO-RISK FAMILY SETUP</Text>
          </View>

          <Text style={styles.bottomCtaTitle}>
            Give Your Loved Ones the Gift of Dignity and Serenity.
          </Text>
          <Text style={styles.bottomCtaSubtitle}>
            Join the modern standard in compassionate elder care coordination. Set up your care circle in under 3 minutes with zero commitment.
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

          {/* Risk Reversal Assurance Strip */}
          <View style={styles.riskReversalStrip}>
            <View style={styles.riskReversalItem}>
              <CheckCircle2 size={14} color="#16A34A" />
              <Text style={styles.riskReversalText}>Free 30-Day Family Circle</Text>
            </View>
            <View style={styles.riskReversalItem}>
              <CheckCircle2 size={14} color="#16A34A" />
              <Text style={styles.riskReversalText}>No Credit Card Required</Text>
            </View>
            <View style={styles.riskReversalItem}>
              <CheckCircle2 size={14} color="#16A34A" />
              <Text style={styles.riskReversalText}>3-Minute Tablet Setup</Text>
            </View>
            <View style={styles.riskReversalItem}>
              <CheckCircle2 size={14} color="#16A34A" />
              <Text style={styles.riskReversalText}>Invite Unlimited Relatives</Text>
            </View>
          </View>
        </View>
      </View>

      {/* =========================================================================
          11. ENTERPRISE MULTI-COLUMN FOOTER
         ========================================================================= */}
      <View style={styles.footerWrapper}>
        <View style={[styles.footerContainer, { paddingHorizontal: horizontalPadding }]}>
          <View style={[styles.footerColumns, isDesktop && styles.footerColumnsDesktop]}>
            {/* Column 1: Brand & Mission */}
            <View style={styles.footerBrandCol}>
              <CareFlowLogo size={34} showText={true} />
              <Text style={styles.footerMissionText}>
                Empowering older adults with dignity, autonomy, and serene connection to loved ones and attending healthcare physicians.
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

            {/* Column 3: Product Showcase */}
            <View style={styles.footerCol}>
              <Text style={styles.footerColHeading}>Product Showcase</Text>
              <TouchableOpacity onPress={() => scrollToSection("why-careflow")}>
                <Text style={styles.footerLink}>Why Careflow</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection("features")}>
                <Text style={styles.footerLink}>Capabilities</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection("both-sides")}>
                <Text style={styles.footerLink}>Dual-Perspective Care</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection("day-in-life")}>
                <Text style={styles.footerLink}>A Day in the Life</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection("dignity-manifesto")}>
                <Text style={styles.footerLink}>Ethical Manifesto</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection("faq")}>
                <Text style={styles.footerLink}>Family FAQ</Text>
              </TouchableOpacity>
            </View>

            {/* Column 4: Trust, Security & Standards */}
            <View style={styles.footerCol}>
              <Text style={styles.footerColHeading}>Trust & Compliance</Text>
              <Text style={styles.footerStaticItem}>Server-Authoritative Security</Text>
              <Text style={styles.footerStaticItem}>Cataract-Safe Visual Legibility</Text>
              <Text style={styles.footerStaticItem}>HIPAA Compliance Ready</Text>
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
    gap: 28,
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
    maxWidth: 1100,
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
    marginBottom: 36,
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

  // 3. Assurance Pillars Grid (Replaces old tech tags)
  assuranceGrid: {
    width: "100%",
    gap: 16,
    marginTop: 8,
  },
  assuranceGridDesktop: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  assuranceCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 18,
    alignItems: "flex-start",
    ...Platform.select({
      web: {
        boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
      },
    }),
  },
  assuranceIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  assuranceTitle: {
    fontFamily: Theme.fonts.heading,
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
    letterSpacing: -0.1,
  },
  assuranceDesc: {
    fontFamily: Theme.fonts.body,
    fontSize: 12,
    color: "#64748B",
    lineHeight: 18,
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
    maxWidth: 720,
    lineHeight: 24,
  },

  // 4. Tension Section
  tensionSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingVertical: 56,
    marginVertical: 20,
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

  // 5. Showcase Section
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

  // 6. Built for Both Sides Section
  bothSidesSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingVertical: 56,
    marginVertical: 20,
  },
  bothSidesGrid: {
    gap: 24,
  },
  bothSidesGridDesktop: {
    flexDirection: "row",
  },
  bothSidesCard: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 28,
  },
  perspectiveBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  perspectivePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    borderWidth: 1,
  },
  perspectivePillText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  perspectiveRoleTag: {
    fontFamily: Theme.fonts.body,
    fontSize: 12,
    color: "#64748B",
  },
  perspectiveCardTitle: {
    fontFamily: Theme.fonts.brand,
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  perspectiveCardSubtitle: {
    fontFamily: Theme.fonts.body,
    fontSize: 14,
    color: "#475569",
    lineHeight: 21,
    marginBottom: 24,
  },
  perspectiveFeatureList: {
    gap: 18,
  },
  perspectiveItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  perspectiveItemIcon: {
    marginTop: 2,
  },
  perspectiveItemContent: {
    flex: 1,
  },
  perspectiveItemHeader: {
    fontFamily: Theme.fonts.heading,
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 2,
  },
  perspectiveItemDesc: {
    fontFamily: Theme.fonts.body,
    fontSize: 13,
    color: "#64748B",
    lineHeight: 19,
  },

  // 7. Timeline Section (A Day in the Life)
  timelineContainer: {
    gap: 20,
  },
  timelineContainerDesktop: {
    maxWidth: 900,
    alignSelf: "center",
    width: "100%",
  },
  timelineItem: {
    flexDirection: "row",
    gap: 18,
  },
  timelineMarkerCol: {
    alignItems: "center",
    width: 36,
  },
  timelineDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E0F2FE",
    borderWidth: 1.5,
    borderColor: "#BAE6FD",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  timelineConnectorLine: {
    flex: 1,
    width: 2,
    backgroundColor: "#E2E8F0",
    marginVertical: 4,
  },
  timelineCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 20,
    marginBottom: 12,
    ...Platform.select({
      web: {
        boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
      },
    }),
  },
  timelineHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  timelineTime: {
    fontFamily: Theme.fonts.heading,
    fontSize: 14,
    fontWeight: "700",
    color: Theme.colors.brandPrimary,
  },
  timelineTag: {
    fontFamily: Theme.fonts.heading,
    fontSize: 10,
    fontWeight: "700",
    color: "#0284C7",
    backgroundColor: "#F0F9FF",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    letterSpacing: 0.5,
  },
  timelineTitle: {
    fontFamily: Theme.fonts.heading,
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 6,
  },
  timelineDesc: {
    fontFamily: Theme.fonts.body,
    fontSize: 14,
    color: "#64748B",
    lineHeight: 21,
  },

  // 8. Ethical Manifesto Section
  manifestoSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingVertical: 56,
    paddingHorizontal: 24,
    marginVertical: 20,
    ...Platform.select({
      web: {
        boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
      },
    }),
  },
  manifestoGrid: {
    gap: 20,
  },
  manifestoGridDesktop: {
    flexDirection: "row",
  },
  manifestoCard: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 24,
  },
  manifestoIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  manifestoCardTag: {
    fontFamily: Theme.fonts.heading,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  manifestoCardTitle: {
    fontFamily: Theme.fonts.heading,
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
    letterSpacing: -0.2,
  },
  manifestoCardDesc: {
    fontFamily: Theme.fonts.body,
    fontSize: 14,
    color: "#64748B",
    lineHeight: 21,
  },

  // 9. FAQ Section
  faqList: {
    maxWidth: 860,
    width: "100%",
    alignSelf: "center",
    gap: 12,
  },
  faqItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
  },
  faqItemActive: {
    borderColor: Theme.colors.brandPrimary,
  },
  faqQuestionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 18,
    ...Platform.select({
      web: { cursor: "pointer" },
    }),
  },
  faqQuestionText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
    flex: 1,
    paddingRight: 16,
  },
  faqQuestionTextActive: {
    color: Theme.colors.brandPrimary,
    fontWeight: "700",
  },
  faqIconContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  faqAnswerContainer: {
    paddingHorizontal: 18,
    paddingBottom: 18,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  faqAnswerText: {
    fontFamily: Theme.fonts.body,
    fontSize: 14,
    color: "#475569",
    lineHeight: 22,
    marginTop: 12,
  },

  // 10. Bottom CTA
  bottomCtaSection: {
    paddingVertical: 48,
    maxWidth: 1080,
    width: "100%",
    alignSelf: "center",
  },
  bottomCtaCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "#BAE6FD",
    padding: 44,
    alignItems: "center",
    ...Platform.select({
      web: {
        boxShadow: "0 10px 30px rgba(2, 132, 199, 0.08)",
      },
    }),
  },
  bottomCtaBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#F0F9FF",
    borderWidth: 1,
    borderColor: "#BAE6FD",
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 100,
    marginBottom: 20,
  },
  bottomCtaBadgeText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 11,
    fontWeight: "700",
    color: Theme.colors.brandPrimary,
    letterSpacing: 0.6,
  },
  bottomCtaTitle: {
    fontFamily: Theme.fonts.brand,
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: -0.4,
  },
  bottomCtaSubtitle: {
    fontFamily: Theme.fonts.body,
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
    maxWidth: 620,
    marginBottom: 28,
    lineHeight: 24,
  },
  bottomCtaBtnRow: {
    width: "100%",
    maxWidth: 460,
    gap: 12,
    marginBottom: 28,
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
    paddingHorizontal: 22,
    ...Platform.select({
      web: {
        cursor: "pointer",
        boxShadow: "0 4px 14px rgba(2, 132, 199, 0.25)",
      },
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
    backgroundColor: "#F8FAFC",
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    borderRadius: Theme.ergonomics.buttonRadius,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 22,
    ...Platform.select({
      web: { cursor: "pointer" },
    }),
  },
  bottomCtaSecondaryText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  riskReversalStrip: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingTop: 24,
    width: "100%",
  },
  riskReversalItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  riskReversalText: {
    fontFamily: Theme.fonts.body,
    fontSize: 13,
    color: "#334155",
    fontWeight: "500",
  },

  // 11. Multi-Column Enterprise Footer
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
