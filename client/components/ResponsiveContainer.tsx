import React from "react";
import { View, StyleSheet, ScrollView, Platform } from "react-native";
import { Theme } from "../constants/theme";
import { useResponsive } from "../hooks/useResponsive";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  scrollable = true,
}) => {
  const { isMobile, isTablet, isDesktop, horizontalPadding, contentMaxWidth } = useResponsive();

  const content = (
    <View
      style={[
        styles.inner,
        {
          maxWidth: isMobile ? "100%" : contentMaxWidth,
          paddingHorizontal: isMobile ? 0 : horizontalPadding,
        },
      ]}
    >
      {children}
    </View>
  );

  if (scrollable) {
    return (
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: isMobile ? horizontalPadding : 0 },
          !isMobile && styles.centerContainer,
        ]}
        showsVerticalScrollIndicator={Platform.OS === "web"}
      >
        {content}
      </ScrollView>
    );
  }

  return (
    <View
      style={[
        styles.staticView,
        { paddingHorizontal: isMobile ? horizontalPadding : 0 },
        !isMobile && styles.centerContainer,
      ]}
    >
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: Theme.spacing.md,
  },
  staticView: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    paddingVertical: Theme.spacing.md,
  },
  centerContainer: {
    alignItems: "center",
  },
  inner: {
    width: "100%",
  },
});
