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
      desc: "Daily routine, medications, and wellness check-in deck",
      icon: Heart,
    },
    {
      id: "FAMILY_GUARDIAN",
      label: "Family Guardian",
      desc: "Care circle monitoring, adherence alerts, and peace-of-mind",
      icon: Shield,
    },
    {
      id: "DOCTOR",
      label: "Doctor / Clinician",
      desc: "Clinical appointments, medication prescriptions, and timelines",
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


        {/* Error notification */}
        {errorMsg ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{errorMsg}</Text>
          </View>
        ) : null}

        {/* Form Fields */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
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

          <View style={styles.inputGroup}>
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

          {/* Role Selection */}
          <View style={styles.roleGroup}>
            <Text style={styles.inputLabel}>Select Your Primary Role</Text>
            <View style={styles.roleList}>
              {roles.map((r) => {
                const IconComponent = r.icon;
                const isSelected = role === r.id;
                return (
                  <TouchableOpacity
                    key={r.id}
                    style={[
                      styles.roleCard,
                      isSmallMobile && { padding: 10, gap: 10 },
                      isSelected && styles.roleCardActive,
                    ]}
                    onPress={() => setRole(r.id)}
                    activeOpacity={0.8}
                  >
                    <View
                      style={[
                        styles.roleIconWrap,
                        isSmallMobile && { width: 34, height: 34 },
                        isSelected && { backgroundColor: Theme.colors.primary },
                      ]}
                    >
                      <IconComponent
                        size={isSmallMobile ? 18 : 20}
                        color={isSelected ? "#FFFFFF" : Theme.colors.primary}
                      />
                    </View>
                    <View style={styles.roleTextWrap}>
                      <Text
                        style={[
                          styles.roleTitle,
                          isSmallMobile && { fontSize: 13 },
                          isSelected && { color: Theme.colors.primaryDark },
                        ]}
                      >
                        {r.label}
                      </Text>
                      <Text style={[styles.roleDesc, isSmallMobile && { fontSize: 11, lineHeight: 15 }]}>{r.desc}</Text>
                    </View>
                    {isSelected && (
                      <CheckCircle2 size={isSmallMobile ? 18 : 20} color={Theme.colors.primary} />
                    )}
                  </TouchableOpacity>

                );
              })}
            </View>
          </View>

          {/* Submit Action */}
          <BigButton
            title={loading ? "Creating Account..." : "Create Account & Start"}
            onPress={handleRegister}
            disabled={loading}
            style={styles.submitBtn}
            icon={<UserPlus size={20} color="#FFFFFF" />}
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
    paddingVertical: Theme.spacing.xl,
    paddingHorizontal: Theme.spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    width: "100%",
    maxWidth: 580,
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.ergonomics.cardRadius + 4,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    padding: Theme.spacing.xl,
    ...Theme.shadows.lg,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Theme.spacing.lg,
    paddingBottom: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.borderSubtle,
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: Theme.colors.primaryLight,
  },
  backBtnText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 14,
    fontWeight: "600",
    color: Theme.colors.primary,
  },
  header: {
    marginBottom: Theme.spacing.lg,
  },
  title: {
    fontFamily: Theme.fonts.brand,
    fontSize: Theme.typography.heading,
    fontWeight: "700",
    color: Theme.colors.text,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontFamily: Theme.fonts.body,
    fontSize: Theme.typography.body,
    color: Theme.colors.textMuted,
    marginTop: 6,
    lineHeight: 22,
  },
  errorBox: {
    backgroundColor: Theme.colors.urgentLight,
    borderWidth: 1,
    borderColor: Theme.colors.urgent,
    borderRadius: 10,
    padding: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },
  errorText: {
    fontFamily: Theme.fonts.body,
    fontSize: 13,
    color: Theme.colors.urgent,
    fontWeight: "600",
  },
  form: {
    gap: Theme.spacing.md,
  },
  inputGroup: {
    gap: 6,
  },
  inputLabel: {
    fontFamily: Theme.fonts.heading,
    fontSize: 13,
    fontWeight: "600",
    color: Theme.colors.text,
    letterSpacing: 0.2,
  },
  input: {
    minHeight: 50,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
    backgroundColor: "#FAFCFE",
    paddingHorizontal: Theme.spacing.md,
    fontFamily: Theme.fonts.body,
    fontSize: 15,
    color: Theme.colors.text,
  },
  roleGroup: {
    marginTop: Theme.spacing.xs,
    gap: 8,
  },
  roleList: {
    gap: 8,
  },
  roleCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
    backgroundColor: "#FAFCFE",
    gap: 12,
  },
  roleCardActive: {
    borderColor: Theme.colors.primary,
    backgroundColor: Theme.colors.primaryLight,
  },
  roleIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: Theme.colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  roleTextWrap: {
    flex: 1,
  },
  roleTitle: {
    fontFamily: Theme.fonts.heading,
    fontSize: 14,
    fontWeight: "600",
    color: Theme.colors.text,
  },
  roleDesc: {
    fontFamily: Theme.fonts.body,
    fontSize: 12,
    color: Theme.colors.textMuted,
    marginTop: 2,
  },
  submitBtn: {
    marginTop: Theme.spacing.md,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: Theme.spacing.xl,
    paddingTop: Theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.borderSubtle,
  },
  footerPrompt: {
    fontFamily: Theme.fonts.body,
    fontSize: 14,
    color: Theme.colors.textMuted,
  },
  signInLink: {
    fontFamily: Theme.fonts.heading,
    fontSize: 14,
    fontWeight: "600",
    color: Theme.colors.primary,
  },
});
