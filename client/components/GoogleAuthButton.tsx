import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  StyleProp,
  ViewStyle,
  Platform,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { useRouter } from "expo-router";
import { Theme } from "../constants/theme";
import { useAuth } from "../context/AuthContext";

export interface GoogleAuthButtonProps {
  variant?: "signin" | "signup" | "continue";
  onPress?: () => void | Promise<void>;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  variant = "signin",
  onPress,
  disabled = false,
  style,
}) => {
  const router = useRouter();
  const { signInWithGoogle } = useAuth();
  const [internalLoading, setInternalLoading] = useState(false);

  const getLabel = () => {
    switch (variant) {
      case "signup":
        return "Sign up with Google";
      case "continue":
        return "Continue with Google";
      case "signin":
      default:
        return "Sign in with Google";
    }
  };

  const handlePress = async () => {
    if (disabled || internalLoading) return;

    if (onPress) {
      await onPress();
      return;
    }

    setInternalLoading(true);
    try {
      await signInWithGoogle();
      router.replace("/(elder)");
    } catch (e) {
      console.error("Google authentication error:", e);
    } finally {
      setInternalLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled, style]}
      onPress={handlePress}
      activeOpacity={0.82}
      disabled={disabled || internalLoading}
      accessibilityRole="button"
      accessibilityLabel={getLabel()}
    >
      <View style={styles.contentRow}>
        {internalLoading ? (
          <ActivityIndicator size="small" color={Theme.colors.primary} style={styles.spinner} />
        ) : (
          <View style={styles.iconContainer}>
            <Svg width={20} height={20} viewBox="0 0 24 24">
              {/* Blue */}
              <Path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              {/* Green */}
              <Path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              {/* Yellow */}
              <Path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              {/* Red */}
              <Path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </Svg>
          </View>
        )}
        <Text style={styles.buttonText}>{getLabel()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: Theme.ergonomics.buttonRadius,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginVertical: 6,
    ...Platform.select({
      web: {
        cursor: "pointer",
        transition: "all 0.15s ease",
        boxShadow: "0 1px 3px rgba(15, 23, 42, 0.05)",
      },
      default: {
        elevation: 1,
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
    }),
  },
  buttonDisabled: {
    opacity: 0.6,
    borderColor: "#CBD5E1",
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginRight: 12,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    marginRight: 12,
  },
  buttonText: {
    fontFamily: Theme.fonts.body,
    fontSize: 15,
    fontWeight: "500",
    color: "#0F172A",
    letterSpacing: -0.1,
  },
});
