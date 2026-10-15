import React, { useEffect } from "react";
import { Platform } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../context/AuthContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS === "web" && typeof document !== "undefined") {
      // 1. Load Fontshare General Sans
      const existingGs = document.getElementById("careflow-fonts-gs");
      if (!existingGs) {
        const link = document.createElement("link");
        link.id = "careflow-fonts-gs";
        link.rel = "stylesheet";
        link.href =
          "https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap";
        document.head.appendChild(link);
      }

      // 2. Load Google Fonts Manrope & JetBrains Mono
      const existingGf = document.getElementById("careflow-fonts-gf");
      if (!existingGf) {
        const link = document.createElement("link");
        link.id = "careflow-fonts-gf";
        link.rel = "stylesheet";
        link.href =
          "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Manrope:wght@400;500;600;700&display=swap";
        document.head.appendChild(link);
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(elder)" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </QueryClientProvider>
  );
}
