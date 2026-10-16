import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { useRouter, Redirect } from "expo-router";
import { Theme } from "../../constants/theme";
import { useResponsive } from "../../hooks/useResponsive";
import { BigButton } from "../../components/BigButton";
import { CareFlowLogo } from "../../components/CareFlowLogo";
import { GoogleAuthButton } from "../../components/GoogleAuthButton";
import { useAuth } from "../../context/AuthContext";
import { LogIn, ArrowLeft } from "lucide-react-native";

export default function LoginScreen() {
  const router = useRouter();
  const { login, user, token, isLoading } = useAuth();
  const { isSmallMobile, isMobile, horizontalPadding } = useResponsive();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Declarative navigation safely waits for Root Layout mounting
  if (!isLoading && token && user) {
    return <Redirect href="/(elder)" />;
  }

  const handleLogin = async (overrideEmail?: string, overridePass?: string) => {
    setErrorMsg("");
    const targetEmail = (overrideEmail || email).trim().toLowerCase();
    const targetPass = overridePass || password;

    if (!targetEmail || !targetPass) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      await login(targetEmail, targetPass);
      router.replace("/(elder)");
    } catch (err: any) {
      const detail =
        err.response?.data?.detail || "Invalid email or password. Please verify your credentials.";
      setErrorMsg(typeof detail === "string" ? detail : "Unable to sign in.");
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
          <Text style={[styles.title, isSmallMobile && { fontSize: 22 }]}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Sign in to access your daily care deck, medication reminders, and wellness updates.
          </Text>
        </View>


        {/* Google Authentication Option */}
        <GoogleAuthButton variant="signin" />

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or continue with email</Text>
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
            <View style={styles.labelRow}>
              <Text style={styles.inputLabel}>Password</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor={Theme.colors.textLight}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {/* Submit Action */}
          <BigButton
            title={loading ? "Authenticating..." : "Sign In to Careflow"}
            onPress={() => handleLogin()}
            disabled={loading}
            style={styles.submitBtn}
            icon={<LogIn size={20} color="#FFFFFF" />}
          />
        </View>

        {/* Footer Navigation */}
        <View style={styles.footerRow}>
          <Text style={styles.footerPrompt}>Need a new Careflow account?</Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
            <Text style={styles.registerLink}>Create Account</Text>
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
    maxWidth: 480,
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
  inputGroup: {
    gap: 4,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  registerLink: {
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
