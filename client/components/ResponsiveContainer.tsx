import React from "react";
import { View, StyleSheet, useWindowDimensions, ScrollView, Platform } from "react-native";
import { Theme } from "../constants/theme";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  scrollable = true,
}) => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= Theme.breakpoints.medium;

  const content = (
    <View
      style={[
        styles.inner,
        isDesktop ? styles.desktopWidth : styles.mobileWidth,
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
          isDesktop && styles.desktopCenter,
        ]}
        showsVerticalScrollIndicator={Platform.OS === "web"}
      >
        {content}
      </ScrollView>
    );
  }

  return (
    <View style={[styles.staticView, isDesktop && styles.desktopCenter]}>
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
    padding: Theme.spacing.lg,
  },
  staticView: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    padding: Theme.spacing.lg,
  },
  desktopCenter: {
    alignItems: "center",
  },
  inner: {
    width: "100%",
  },
  mobileWidth: {
    maxWidth: "100%",
  },
  desktopWidth: {
    maxWidth: 1200,
    paddingHorizontal: Theme.spacing.xl,
  },
});
