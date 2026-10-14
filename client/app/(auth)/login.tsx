import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Theme } from "../../constants/theme";
import { BigButton } from "../../components/BigButton";
import { ResponsiveContainer } from "../../components/ResponsiveContainer";
import { useAuth } from "../../context/AuthContext";
import { LogIn, UserCheck } from "lucide-react-native";

export default function LoginScreen() {
  const router = useRouter();
  const { login, register } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password || (isRegistering && !fullName)) {
      Alert.alert("Missing Details", "Please fill in all requested fields.");
      return;
    }

    setLoading(true);
    try {
      if (isRegistering) {
        await register(email, password, fullName, "ELDER");
      } else {
        await login(email, password);
      }
      router.replace("/(elder)");
    } catch (err: any) {
      const msg = err.response?.data?.detail || "Could not sign in. Please check your credentials.";
      Alert.alert("Authentication", msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setEmail("eleanor@careflow.org");
    setPassword("SecurePassword123!");
    setFullName("Eleanor Vance");
  };

  return (
    <ResponsiveContainer>
      <View style={styles.formContainer}>
        <Text style={styles.title}>{isRegistering ? "Create Careflow Account" : "Sign In to Careflow"}</Text>
        <Text style={styles.subtitle}>
          {isRegistering
            ? "Register to begin tracking your medications, routine, and care network."
            : "Enter your credentials to access your daily care dashboard."}
        </Text>

        <View style={styles.fieldGroup}>
          {isRegistering && (
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholder="e.g. Eleanor Vance"
                placeholderTextColor={Theme.colors.textMuted}
                accessibilityLabel="Full Name input"
              />
            </View>
          )}

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="e.g. eleanor@careflow.org"
              placeholderTextColor={Theme.colors.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              accessibilityLabel="Email input"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Your secure password"
              placeholderTextColor={Theme.colors.textMuted}
              secureTextEntry
              accessibilityLabel="Password input"
            />
          </View>
        </View>

        <BigButton
          title={isRegistering ? "Create Account" : "Sign In"}
          onPress={handleSubmit}
          loading={loading}
          icon={<LogIn size={22} color="#FFF" />}
          style={styles.submitBtn}
        />

        <TouchableOpacity
          onPress={handleDemoFill}
          style={styles.demoFillBtn}
          accessibilityRole="button"
          accessibilityLabel="Auto-fill Eleanor demo credentials"
        >
          <UserCheck size={20} color={Theme.colors.primary} />
          <Text style={styles.demoFillText}>Auto-fill Eleanor Demo Credentials</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsRegistering(!isRegistering)}
          style={styles.switchModeBtn}
        >
          <Text style={styles.switchModeText}>
            {isRegistering
              ? "Already have an account? Sign In"
              : "Need a new account? Register here"}
          </Text>
        </TouchableOpacity>
      </View>
    </ResponsiveContainer>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    paddingVertical: Theme.spacing.lg,
  },
  title: {
    fontSize: Theme.typography.heading,
    fontWeight: "800",
    color: Theme.colors.primary,
  },
  subtitle: {
    fontSize: Theme.typography.body,
    color: Theme.colors.textMuted,
    marginTop: Theme.spacing.xs,
    marginBottom: Theme.spacing.xl,
    lineHeight: 26,
  },
  fieldGroup: {
    gap: Theme.spacing.md,
  },
  inputWrapper: {
    marginBottom: Theme.spacing.sm,
  },
  label: {
    fontSize: Theme.typography.body,
    fontWeight: "700",
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
  },
  input: {
    minHeight: Theme.ergonomics.minTouchTarget,
    borderWidth: Theme.ergonomics.borderWidth,
    borderColor: Theme.colors.border,
    borderRadius: Theme.ergonomics.buttonRadius,
    paddingHorizontal: Theme.spacing.md,
    fontSize: Theme.typography.bodyLarge,
    color: Theme.colors.text,
    backgroundColor: Theme.colors.card,
  },
  submitBtn: {
    marginTop: Theme.spacing.lg,
  },
  demoFillBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Theme.spacing.xs,
    marginTop: Theme.spacing.md,
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.primaryLight,
    borderRadius: Theme.ergonomics.buttonRadius,
    borderWidth: 1,
    borderColor: Theme.colors.primary,
  },
  demoFillText: {
    fontSize: Theme.typography.body,
    fontWeight: "700",
    color: Theme.colors.primary,
  },
  switchModeBtn: {
    marginTop: Theme.spacing.lg,
    alignItems: "center",
    padding: Theme.spacing.sm,
  },
  switchModeText: {
    fontSize: Theme.typography.body,
    color: Theme.colors.accent,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});
