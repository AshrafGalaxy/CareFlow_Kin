import React, { useState } from "react";
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
import { BigButton } from "../components/BigButton";
import { CareFlowLogo } from "../components/CareFlowLogo";
import { api, getAuthToken } from "../services/api";
import {
  Clock,
  Heart,
  Users,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Activity,
  Smile,
  Pill,
  Lock,
} from "lucide-react-native";

export default function LandingPage() {
  const router = useRouter();
  const { isSmallMobile, isMobile, isTablet, isDesktop, horizontalPadding } = useResponsive();

  const [demoLoading, setDemoLoading] = useState(false);

  const heroTitleFontSize = isSmallMobile ? 24 : isMobile ? 30 : isTablet ? 38 : 48;
  const heroTitleLineHeight = isSmallMobile ? 32 : isMobile ? 38 : isTablet ? 46 : 58;
  const heroSubtitleFontSize = isSmallMobile ? 14 : isMobile ? 15 : 17;
  const heroSubtitleLineHeight = isSmallMobile ? 22 : isMobile ? 24 : 28;

  const handleLaunchElderDeck = async () => {
    try {
      setDemoLoading(true);
      if (!getAuthToken()) {
        await api.auth.demoLogin();
      }
      router.push("/(elder)");
    } catch (_) {
      router.push("/(elder)");
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Global Navigation Bar */}
      <View style={styles.navBarWrapper}>
        <View style={[styles.navBar, { paddingHorizontal: horizontalPadding }]}>
          <CareFlowLogo size={isSmallMobile ? 32 : 38} showText={!isSmallMobile} />

          {isDesktop && (
            <View style={styles.navLinks}>
              <Text style={styles.navLinkItem}>Daily Routine</Text>
              <Text style={styles.navLinkItem}>Medications</Text>
              <Text style={styles.navLinkItem}>Care Circle</Text>
              <Text style={styles.navLinkItem}>Clinical Security</Text>
            </View>
          )}

          <View style={styles.navActions}>
            <TouchableOpacity
              style={[styles.navSignInBtn, isSmallMobile && styles.navBtnSmall]}
              onPress={() => router.push("/(auth)/login")}
              accessibilityLabel="Sign In"
            >
              <Text style={[styles.navSignInText, isSmallMobile && styles.navBtnTextSmall]}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navRegisterBtn, isSmallMobile && styles.navBtnSmall]}
              onPress={() => router.push("/(auth)/register")}
              accessibilityLabel="Create Account"
            >
              <Text style={[styles.navRegisterText, isSmallMobile && styles.navBtnTextSmall]}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>


      {/* 2. Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.heroBadge}>
          <Sparkles size={16} color={Theme.colors.accent} />
          <Text style={styles.heroBadgeText}>CONNECTED ELDER CARE & WELLNESS DECK</Text>
        </View>

        <Text style={[styles.heroTitle, { fontSize: heroTitleFontSize, lineHeight: heroTitleLineHeight }]}>
          Daily Care, Reimagined with <Text style={styles.heroTitleHighlight}>Dignity</Text> & Simplicity.
        </Text>

        <Text style={[styles.heroSubtitle, { fontSize: heroSubtitleFontSize, lineHeight: heroSubtitleLineHeight }]}>
          The serene, unified companion for daily medication tracking, gentle wellness check-ins, and trusted care circles — designed for ease of use without cognitive fatigue.
        </Text>

        {/* Dual CTA Actions */}
        <View style={[styles.heroActions, isDesktop && styles.heroActionsDesktop]}>
          <BigButton
            title={demoLoading ? "Starting Session..." : "Launch Live Elder Deck"}
            onPress={handleLaunchElderDeck}
            disabled={demoLoading}
            variant="primary"
            style={styles.heroPrimaryBtn}
            icon={<ArrowRight size={20} color="#FFFFFF" />}
          />

          <TouchableOpacity
            style={styles.heroSecondaryBtn}
            onPress={() => router.push("/(auth)/register")}
          >
            <Text style={styles.heroSecondaryBtnText}>Create Free Account</Text>
          </TouchableOpacity>
        </View>

        {/* 3. Hero Visual Preview / Live Care Deck Mockup */}
        <View style={styles.deckTeaserCard}>
          <View style={styles.deckTeaserTop}>
            <View style={styles.deckTeaserProfile}>
              <View style={styles.teaserAvatar}>
                <Text style={styles.teaserAvatarText}>EV</Text>
              </View>
              <View style={styles.profileTextWrap}>
                <Text style={styles.teaserName}>Eleanor Vance</Text>
                <Text style={styles.teaserStatus} numberOfLines={1}>Care Deck • Saint Jude Clinic</Text>
              </View>
            </View>

            <View style={styles.teaserAdherencePill}>
              <Activity size={15} color="#059669" />
              <Text style={styles.teaserAdherenceText}>100% Adherence</Text>
            </View>
          </View>

          {/* Teaser 2-Column or Stacked Preview */}
          <View style={[styles.teaserBody, isDesktop && styles.teaserBodyDesktop]}>
            {/* Left mini preview */}
            <View style={styles.teaserCol}>
              <Text style={styles.teaserColTitle}>Today's Routine (3 of 4 Completed)</Text>
              <View style={styles.teaserTaskRow}>
                <CheckCircle2 size={18} color="#059669" />
                <Text style={[styles.teaserTaskText, styles.teaserTaskDone]}>Morning Lisinopril 10mg</Text>
                <Text style={styles.teaserTaskTime}>08:00 AM</Text>
              </View>
              <View style={styles.teaserTaskRow}>
                <CheckCircle2 size={18} color="#059669" />
                <Text style={[styles.teaserTaskText, styles.teaserTaskDone]}>500ml Hydration Goal</Text>
                <Text style={styles.teaserTaskTime}>09:30 AM</Text>
              </View>
              <View style={styles.teaserTaskRow}>
                <Clock size={18} color="#0077B6" />
                <Text style={styles.teaserTaskText}>Afternoon Metformin 500mg</Text>
                <Text style={styles.teaserTaskTime}>06:00 PM</Text>
              </View>
            </View>


            {/* Right mini preview */}
            <View style={styles.teaserCol}>
              <Text style={styles.teaserColTitle}>Wellness & Care Circle Status</Text>
              <View style={styles.teaserWellnessBox}>
                <Smile size={24} color="#0284C7" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.teaserWellnessState}>Status: Feeling Great Today</Text>
                  <Text style={styles.teaserWellnessSub}>Shared with Dr. Sarah Jenkins & Family</Text>
                </View>
              </View>
              <View style={styles.teaserApptRow}>
                <Calendar size={18} color="#0077B6" />
                <Text style={styles.teaserApptText}>Cardiology Follow-up: June 15 at 10:00 AM</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* 4. Three Core Pillars Grid */}
      <View style={styles.featuresSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionBadge}>CORE CAPABILITIES</Text>
          <Text style={styles.sectionTitle}>Engineered for Peace of Mind</Text>
          <Text style={styles.sectionSubtitle}>
            Every feature is purpose-built to eliminate cognitive fatigue and keep loved ones informed in real time.
          </Text>
        </View>

        <View style={[styles.featureGrid, isDesktop && styles.featureGridDesktop]}>
          {/* Card 1 */}
          <View style={styles.featureCard}>
            <View style={[styles.featureIconBox, { backgroundColor: "#E0F2FE" }]}>
              <Pill size={28} color="#0284C7" />
            </View>
            <Text style={styles.featureCardTitle}>Medication Adherence</Text>
            <Text style={styles.featureCardDesc}>
              Clear dosage tags, timing guidance, and 1-tap logging. Calculate live adherence scores without complex menus or confusion.
            </Text>
          </View>

          {/* Card 2 */}
          <View style={styles.featureCard}>
            <View style={[styles.featureIconBox, { backgroundColor: "#DCFCE7" }]}>
              <Heart size={28} color="#15803D" />
            </View>
            <Text style={styles.featureCardTitle}>Emotive Wellness Sharing</Text>
            <Text style={styles.featureCardDesc}>
              5-second emotive check-ins (Great, Okay, Tired, Need Help). Instant notifications to family guardians without intrusive calls.
            </Text>
          </View>

          {/* Card 3 */}
          <View style={styles.featureCard}>
            <View style={[styles.featureIconBox, { backgroundColor: "#EDE9FE" }]}>
              <Users size={28} color="#6D28D9" />
            </View>
            <Text style={styles.featureCardTitle}>Connected Care Circle</Text>
            <Text style={styles.featureCardDesc}>
              Direct coordination between elders, family guardians, and clinical doctors with unified appointment management and timeline tracking.
            </Text>
          </View>
        </View>
      </View>

      {/* 5. Trust & Quality Banner */}
      <View style={styles.trustBanner}>
        <View style={[styles.trustGrid, isDesktop && styles.trustGridDesktop]}>
          <View style={styles.trustItem}>
            <ShieldCheck size={28} color={Theme.colors.primary} />
            <Text style={styles.trustTitle}>Server-Authoritative RBAC</Text>
            <Text style={styles.trustDesc}>Strict data boundaries between patients and providers</Text>
          </View>

          <View style={styles.trustItem}>
            <Sparkles size={28} color={Theme.colors.primary} />
            <Text style={styles.trustTitle}>Universal Responsive Parity</Text>
            <Text style={styles.trustDesc}>Identical ease on Android phones, iPhones, tablets, and web decks</Text>
          </View>

          <View style={styles.trustItem}>
            <Lock size={28} color={Theme.colors.primary} />
            <Text style={styles.trustTitle}>Private by Design</Text>
            <Text style={styles.trustDesc}>No commercial tracking. Your medical routine stays strictly confidential</Text>
          </View>
        </View>
      </View>

      {/* 6. Call to Action Banner */}
      <View style={[styles.ctaBanner, { padding: isSmallMobile ? 20 : isMobile ? 28 : 44 }]}>
        <CareFlowLogo size={isSmallMobile ? 38 : 48} showText={false} withContainer={true} />
        <Text style={[styles.ctaTitle, { fontSize: isSmallMobile ? 22 : isMobile ? 26 : 34 }]}>
          Experience the Calmer Daily Care Flow
        </Text>
        <Text style={[styles.ctaSubtitle, { fontSize: isSmallMobile ? 14 : 16 }]}>
          Start immediately with our live interactive elder session, or create a personalized account for your family.
        </Text>

        <View style={[styles.ctaActions, isDesktop && styles.ctaActionsDesktop]}>
          <BigButton
            title={demoLoading ? "Opening..." : "Launch Live Elder Deck"}
            onPress={handleLaunchElderDeck}
            disabled={demoLoading}
            variant="primary"
            style={styles.ctaPrimaryBtn}
          />
          <TouchableOpacity
            style={styles.ctaSecondaryBtn}
            onPress={() => router.push("/(auth)/login")}
          >
            <Text style={styles.ctaSecondaryText}>Sign In to Existing Account</Text>
          </TouchableOpacity>
        </View>
      </View>


      {/* 7. Footer */}
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <CareFlowLogo size={32} showText={true} />
          <Text style={styles.footerCopy}>
            Careflow • Connected Daily Care Companion • Universal Platform Parity
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  scrollContent: {
    paddingBottom: Theme.spacing.xxl,
  },

  // 1. Navigation Bar
  navBarWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  navBar: {
    maxWidth: 1200,
    width: "100%",
    marginHorizontal: "auto",
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navLinks: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  navLinkItem: {
    fontFamily: Theme.fonts.heading,
    fontSize: 14,
    fontWeight: "600",
    color: Theme.colors.textMuted,
  },
  navActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  navSignInBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
    backgroundColor: "#FFFFFF",
  },
  navSignInText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 14,
    fontWeight: "700",
    color: Theme.colors.primary,
  },
  navRegisterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: Theme.colors.primary,
  },
  navRegisterText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  navBtnSmall: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  navBtnTextSmall: {
    fontSize: 12,
  },
  profileTextWrap: {
    flexShrink: 1,
  },

  // 2. Hero Section
  heroSection: {
    maxWidth: 1100,
    width: "100%",
    marginHorizontal: "auto",
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.xxl,
    alignItems: "center",
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: Theme.colors.accentLight,
    borderWidth: 1,
    borderColor: "rgba(0, 119, 182, 0.2)",
    marginBottom: Theme.spacing.md,
  },
  heroBadgeText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 12,
    fontWeight: "800",
    color: Theme.colors.accent,
    letterSpacing: 0.8,
  },
  heroTitle: {
    fontFamily: Theme.fonts.brand,
    fontSize: Platform.select({ web: 48, default: 32 }),
    fontWeight: "900",
    color: Theme.colors.primaryDark,
    textAlign: "center",
    maxWidth: 860,
    lineHeight: Platform.select({ web: 58, default: 40 }),
    letterSpacing: -1,
  },
  heroTitleHighlight: {
    color: Theme.colors.accent,
  },
  heroSubtitle: {
    fontFamily: Theme.fonts.body,
    fontSize: Theme.typography.bodyLarge,
    color: Theme.colors.textMuted,
    textAlign: "center",
    maxWidth: 680,
    marginTop: Theme.spacing.md,
    lineHeight: 28,
  },
  heroActions: {
    width: "100%",
    maxWidth: 520,
    marginTop: Theme.spacing.xl,
    gap: 12,
  },
  heroActionsDesktop: {
    flexDirection: "row",
    alignItems: "center",
  },
  heroPrimaryBtn: {
    flex: 1,
  },
  heroSecondaryBtn: {
    flex: 1,
    minHeight: 52,
    borderRadius: Theme.ergonomics.buttonRadius,
    borderWidth: 1.5,
    borderColor: Theme.colors.primary,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Theme.spacing.lg,
  },
  heroSecondaryBtnText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 15,
    fontWeight: "700",
    color: Theme.colors.primary,
  },

  // 3. Deck Teaser Card (Mockup)
  deckTeaserCard: {
    width: "100%",
    marginTop: Theme.spacing.xxl,
    backgroundColor: "#FFFFFF",
    borderRadius: Theme.ergonomics.cardRadius + 6,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    padding: Theme.spacing.lg,
    ...Theme.shadows.lg,
  },
  deckTeaserTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.borderSubtle,
    paddingBottom: Theme.spacing.md,
    flexWrap: "wrap",
    gap: 12,
  },
  deckTeaserProfile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  teaserAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  teaserAvatarText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  teaserName: {
    fontFamily: Theme.fonts.heading,
    fontSize: 16,
    fontWeight: "800",
    color: Theme.colors.text,
  },
  teaserStatus: {
    fontFamily: Theme.fonts.body,
    fontSize: 12,
    color: Theme.colors.textMuted,
  },
  teaserAdherencePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#ECFDF5",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },
  teaserAdherenceText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 12,
    fontWeight: "700",
    color: "#059669",
  },
  teaserBody: {
    marginTop: Theme.spacing.md,
    gap: Theme.spacing.md,
  },
  teaserBodyDesktop: {
    flexDirection: "row",
    gap: 24,
  },
  teaserCol: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    padding: Theme.spacing.md,
    borderWidth: 1,
    borderColor: Theme.colors.borderSubtle,
  },
  teaserColTitle: {
    fontFamily: Theme.fonts.heading,
    fontSize: 13,
    fontWeight: "800",
    color: Theme.colors.text,
    marginBottom: Theme.spacing.sm,
    letterSpacing: 0.3,
  },
  teaserTaskRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  teaserTaskText: {
    flex: 1,
    fontFamily: Theme.fonts.body,
    fontSize: 13,
    fontWeight: "600",
    color: Theme.colors.text,
  },
  teaserTaskDone: {
    color: Theme.colors.textMuted,
    textDecorationLine: "line-through",
  },
  teaserTaskTime: {
    fontFamily: Theme.fonts.mono,
    fontSize: 11,
    fontWeight: "600",
    color: Theme.colors.textLight,
  },
  teaserWellnessBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#E0F2FE",
    padding: 12,
    borderRadius: 10,
    marginBottom: Theme.spacing.sm,
  },
  teaserWellnessState: {
    fontFamily: Theme.fonts.heading,
    fontSize: 13,
    fontWeight: "700",
    color: "#0284C7",
  },
  teaserWellnessSub: {
    fontFamily: Theme.fonts.body,
    fontSize: 11,
    color: "#0369A1",
    marginTop: 2,
  },
  teaserApptRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 6,
  },
  teaserApptText: {
    fontFamily: Theme.fonts.body,
    fontSize: 12,
    fontWeight: "600",
    color: Theme.colors.textSecondary,
  },

  // 4. Features Section
  featuresSection: {
    maxWidth: 1200,
    width: "100%",
    marginHorizontal: "auto",
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.xxl + 20,
  },
  sectionHeader: {
    alignItems: "center",
    marginBottom: Theme.spacing.xl,
  },
  sectionBadge: {
    fontFamily: Theme.fonts.heading,
    fontSize: 12,
    fontWeight: "800",
    color: Theme.colors.accent,
    letterSpacing: 1,
    marginBottom: 6,
  },
  sectionTitle: {
    fontFamily: Theme.fonts.brand,
    fontSize: Platform.select({ web: 36, default: 28 }),
    fontWeight: "800",
    color: Theme.colors.primaryDark,
    textAlign: "center",
  },
  sectionSubtitle: {
    fontFamily: Theme.fonts.body,
    fontSize: Theme.typography.body,
    color: Theme.colors.textMuted,
    textAlign: "center",
    maxWidth: 620,
    marginTop: 8,
    lineHeight: 24,
  },
  featureGrid: {
    gap: Theme.spacing.lg,
  },
  featureGridDesktop: {
    flexDirection: "row",
  },
  featureCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: Theme.ergonomics.cardRadius,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    padding: Theme.spacing.xl,
    ...Theme.shadows.md,
  },
  featureIconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Theme.spacing.md,
  },
  featureCardTitle: {
    fontFamily: Theme.fonts.heading,
    fontSize: 18,
    fontWeight: "800",
    color: Theme.colors.text,
    marginBottom: 8,
  },
  featureCardDesc: {
    fontFamily: Theme.fonts.body,
    fontSize: 14,
    color: Theme.colors.textMuted,
    lineHeight: 22,
  },

  // 5. Trust Section
  trustBanner: {
    maxWidth: 1200,
    width: "100%",
    marginHorizontal: "auto",
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.xxl,
  },
  trustGrid: {
    backgroundColor: "#FFFFFF",
    borderRadius: Theme.ergonomics.cardRadius,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    padding: Theme.spacing.xl,
    gap: Theme.spacing.lg,
    ...Theme.shadows.sm,
  },
  trustGridDesktop: {
    flexDirection: "row",
  },
  trustItem: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    paddingHorizontal: Theme.spacing.sm,
  },
  trustTitle: {
    fontFamily: Theme.fonts.heading,
    fontSize: 15,
    fontWeight: "800",
    color: Theme.colors.text,
    marginTop: Theme.spacing.sm,
    marginBottom: 4,
    textAlign: "center",
  },
  trustDesc: {
    fontFamily: Theme.fonts.body,
    fontSize: 13,
    color: Theme.colors.textMuted,
    textAlign: "center",
    lineHeight: 20,
  },

  // 6. Call to Action Banner
  ctaBanner: {
    maxWidth: 960,
    width: "100%",
    marginHorizontal: "auto",
    marginTop: Theme.spacing.xxl + 20,
    backgroundColor: Theme.colors.primaryDark,
    borderRadius: Theme.ergonomics.cardRadius + 8,
    padding: Theme.spacing.xxl,
    alignItems: "center",
    textAlign: "center",
    ...Theme.shadows.lg,
  },
  ctaTitle: {
    fontFamily: Theme.fonts.brand,
    fontSize: Platform.select({ web: 32, default: 24 }),
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: Theme.spacing.md,
    textAlign: "center",
    letterSpacing: -0.5,
  },
  ctaSubtitle: {
    fontFamily: Theme.fonts.body,
    fontSize: Theme.typography.body,
    color: "#90E0EF",
    textAlign: "center",
    maxWidth: 580,
    marginTop: Theme.spacing.xs,
    lineHeight: 24,
  },
  ctaActions: {
    width: "100%",
    maxWidth: 480,
    marginTop: Theme.spacing.xl,
    gap: 12,
  },
  ctaActionsDesktop: {
    flexDirection: "row",
    alignItems: "center",
  },
  ctaPrimaryBtn: {
    flex: 1,
  },
  ctaSecondaryBtn: {
    flex: 1,
    minHeight: 52,
    borderRadius: Theme.ergonomics.buttonRadius,
    borderWidth: 1.5,
    borderColor: "#48CAE4",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Theme.spacing.md,
  },
  ctaSecondaryText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  // 7. Footer
  footer: {
    marginTop: Theme.spacing.xxl,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
    paddingVertical: Theme.spacing.xl,
    paddingHorizontal: Theme.spacing.lg,
  },
  footerContent: {
    maxWidth: 1200,
    width: "100%",
    marginHorizontal: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 16,
  },
  footerCopy: {
    fontFamily: Theme.fonts.body,
    fontSize: 13,
    color: Theme.colors.textLight,
  },
});
