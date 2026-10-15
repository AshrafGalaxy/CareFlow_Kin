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
          "https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap";
        document.head.appendChild(link);
      }

      // 2. Load Google Fonts Manrope & Plus Jakarta Sans fallback
      const existingGf = document.getElementById("careflow-fonts-gf");
      if (!existingGf) {
        const link = document.createElement("link");
        link.id = "careflow-fonts-gf";
        link.rel = "stylesheet";
        link.href =
          "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap";
        document.head.appendChild(link);
      }

      // 3. Inject Sleek Minimalist Custom Scrollbar & Typography Normalization Styles
      const existingScrollbar = document.getElementById("careflow-custom-scrollbar");
      if (!existingScrollbar) {
        const style = document.createElement("style");
        style.id = "careflow-custom-scrollbar";
        style.textContent = `
          /* Global Typography Base */
          html, body, #root, div, span, p {
            font-family: 'General Sans', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          /* React Native Web default typography override (prevents fallback to Segoe UI) */
          .r-fontFamily-1qd0xha,
          [dir] .r-fontFamily-1qd0xha,
          [dir] [class*="r-fontFamily-1qd0xha"] {
            font-family: 'General Sans', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          }

          input, textarea, select, button {
            font-family: 'General Sans', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          }

          /* Global Sleek Minimalist Scrollbar */
          ::-webkit-scrollbar {
            width: 7px;
            height: 7px;
          }
          ::-webkit-scrollbar-track {
            background: transparent;
          }
          ::-webkit-scrollbar-thumb {
            background: rgba(148, 163, 184, 0.4);
            border-radius: 9999px;
            border: 2px solid transparent;
            background-clip: padding-box;
            transition: background 0.2s ease;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(100, 116, 139, 0.7);
            background-clip: padding-box;
          }
          /* Firefox scrollbar styling */
          * {
            scrollbar-width: thin;
            scrollbar-color: rgba(148, 163, 184, 0.4) transparent;
          }
        `;
        document.head.appendChild(style);
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
