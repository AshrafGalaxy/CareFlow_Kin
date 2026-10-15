import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Theme } from "../../constants/theme";
import { useResponsive } from "../../hooks/useResponsive";
import { BigButton } from "../../components/BigButton";
import { CareFlowLogo } from "../../components/CareFlowLogo";
import { GoogleAuthButton } from "../../components/GoogleAuthButton";
import { useAuth } from "../../context/AuthContext";
import { UserPlus, ArrowLeft, CheckCircle2, Shield, Heart, Stethoscope } from "lucide-react-native";

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const { isSmallMobile, isMobile, horizontalPadding } = useResponsive();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ELDER");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const roles = [
    {
      id: "ELDER",
      label: "Elder Companion",
      shortLabel: "Elder",
      desc: "Daily routine, medications, and wellness check-in deck",
      icon: Heart,
    },
    {
      id: "FAMILY_GUARDIAN",
      label: "Family Guardian",
      shortLabel: "Family",
      desc: "Care circle monitoring, adherence alerts, and peace-of-mind",
      icon: Shield,
    },
    {
      id: "DOCTOR",
      label: "Doctor / Clinician",
      shortLabel: "Doctor",
      desc: "Clinical consults, medication prescriptions, and timelines",
      icon: Stethoscope,
    },
  ];

  const handleRegister = async () => {
    setErrorMsg("");
    if (!fullName.trim() || !email.trim() || !password) {
      setErrorMsg("Please complete all required fields.");
      return;
    }

    if (password.length < 8) {
      setErrorMsg("Password must contain at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      await register(email.trim().toLowerCase(), password, fullName.trim(), role);
      router.replace("/(elder)");
    } catch (err: any) {
      const detail =
        err.response?.data?.detail || "Registration failed. An account with this email may already exist.";
      setErrorMsg(typeof detail === "string" ? detail : "Unable to register.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.scrollContent, { paddingHorizontal: horizontalPadding }]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={[styles.cardContainer, { padding: isSmallMobile ? 14 : isMobile ? 18 : 28 }]}>
        {/* Top Header Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.push("/")}
            accessibilityLabel="Back to Home"
          >
            <ArrowLeft size={18} color={Theme.colors.primary} />
            <Text style={styles.backBtnText}>Home</Text>
          </TouchableOpacity>

          <CareFlowLogo size={isSmallMobile ? 30 : 36} showText={!isSmallMobile} />
        </View>

        {/* Heading */}
        <View style={styles.header}>
          <Text style={[styles.title, isSmallMobile && { fontSize: 22 }]}>Create Your Account</Text>
          <Text style={styles.subtitle}>
            Join Careflow to coordinate medication routines, daily wellness, and clinical connectivity.
          </Text>
        </View>


        {/* Google Authentication Option */}
        <GoogleAuthButton variant="signup" />

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or register with email</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Error notification */}
        {errorMsg ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{errorMsg}</Text>
          </View>
        ) : null}

        {/* Form Fields */}
        <View style={styles.form}>
          {/* Two-column layout on Desktop/Tablet for Name & Email */}
          <View style={[styles.inputRow, !isMobile && styles.inputRowDesktop]}>
            <View style={[styles.inputGroup, !isMobile && styles.inputCol]}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Eleanor Vance"
                placeholderTextColor={Theme.colors.textLight}
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>

            <View style={[styles.inputGroup, !isMobile && styles.inputCol]}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="eleanor@careflow.com"
                placeholderTextColor={Theme.colors.textLight}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="At least 8 characters"
              placeholderTextColor={Theme.colors.textLight}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {/* Horizontal 3-Way Role Selection */}
          <View style={styles.roleGroup}>
            <Text style={styles.inputLabel}>Select Your Primary Role</Text>
            <View style={styles.roleGrid}>
              {roles.map((r) => {
                const IconComponent = r.icon;
                const isSelected = role === r.id;
                return (
                  <TouchableOpacity
                    key={r.id}
                    style={[
                      styles.rolePill,
                      isSelected && styles.rolePillActive,
                    ]}
                    onPress={() => setRole(r.id)}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                  >
                    <IconComponent
                      size={15}
                      color={isSelected ? "#FFFFFF" : Theme.colors.primary}
                    />
                    <Text
                      style={[
                        styles.rolePillText,
                        isSelected && styles.rolePillTextActive,
                      ]}
                    >
                      {r.shortLabel}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text style={styles.roleDescText}>
              {roles.find((r) => r.id === role)?.desc}
            </Text>
          </View>

          {/* Submit Action */}
          <BigButton
            title={loading ? "Creating Account..." : "Create Account & Start"}
            onPress={handleRegister}
            disabled={loading}
            style={styles.submitBtn}
            icon={<UserPlus size={18} color="#FFFFFF" />}
          />
        </View>

        {/* Footer Navigation */}
        <View style={styles.footerRow}>
          <Text style={styles.footerPrompt}>Already have a Careflow account?</Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
            <Text style={styles.signInLink}>Sign In Here</Text>
          </TouchableOpacity>
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
    flexGrow: 1,
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    width: "100%",
    maxWidth: 540,
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.ergonomics.cardRadius + 4,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    padding: Theme.spacing.lg,
    ...Theme.shadows.lg,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Theme.spacing.sm,
    paddingBottom: Theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.borderSubtle,
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 8,
    backgroundColor: Theme.colors.primaryLight,
  },
  backBtnText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 13,
    fontWeight: "600",
    color: Theme.colors.primary,
  },
  header: {
    marginBottom: Theme.spacing.sm,
  },
  title: {
    fontFamily: Theme.fonts.brand,
    fontSize: 22,
    fontWeight: "700",
    color: Theme.colors.text,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontFamily: Theme.fonts.body,
    fontSize: 13,
    color: Theme.colors.textMuted,
    marginTop: 4,
    lineHeight: 18,
  },
  errorBox: {
    backgroundColor: Theme.colors.urgentLight,
    borderWidth: 1,
    borderColor: Theme.colors.urgent,
    borderRadius: 10,
    padding: Theme.spacing.sm,
    marginBottom: Theme.spacing.sm,
  },
  errorText: {
    fontFamily: Theme.fonts.body,
    fontSize: 13,
    color: Theme.colors.urgent,
    fontWeight: "600",
  },
  form: {
    gap: 10,
  },
  inputRow: {
    gap: 10,
  },
  inputRowDesktop: {
    flexDirection: "row",
  },
  inputCol: {
    flex: 1,
  },
  inputGroup: {
    gap: 4,
  },
  inputLabel: {
    fontFamily: Theme.fonts.heading,
    fontSize: 12,
    fontWeight: "600",
    color: Theme.colors.text,
    letterSpacing: 0.1,
  },
  input: {
    minHeight: 46,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
    backgroundColor: "#FAFCFE",
    paddingHorizontal: 14,
    fontFamily: Theme.fonts.body,
    fontSize: 14,
    color: Theme.colors.text,
  },
  roleGroup: {
    gap: 6,
    marginTop: 2,
  },
  roleGrid: {
    flexDirection: "row",
    gap: 8,
  },
  rolePill: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    minHeight: 44,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
    backgroundColor: "#FAFCFE",
    paddingHorizontal: 6,
    ...Platform.select({
      web: { cursor: "pointer" },
    }),
  },
  rolePillActive: {
    borderColor: Theme.colors.primary,
    backgroundColor: Theme.colors.primary,
  },
  rolePillText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 13,
    fontWeight: "600",
    color: Theme.colors.text,
  },
  rolePillTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  roleDescText: {
    fontFamily: Theme.fonts.body,
    fontSize: 11,
    color: Theme.colors.textMuted,
    textAlign: "center",
    marginTop: 2,
    lineHeight: 16,
  },
  submitBtn: {
    marginTop: 4,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: Theme.spacing.md,
    paddingTop: Theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.borderSubtle,
  },
  footerPrompt: {
    fontFamily: Theme.fonts.body,
    fontSize: 13,
    color: Theme.colors.textMuted,
  },
  signInLink: {
    fontFamily: Theme.fonts.heading,
    fontSize: 13,
    fontWeight: "600",
    color: Theme.colors.primary,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Theme.colors.borderSubtle,
  },
  dividerText: {
    marginHorizontal: 12,
    fontFamily: Theme.fonts.body,
    fontSize: 12,
    color: Theme.colors.textMuted,
  },
});
