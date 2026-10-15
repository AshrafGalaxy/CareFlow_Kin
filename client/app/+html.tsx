import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Careflow - Connected Daily Care</title>

        {/* Strict 2-Font System: Fontshare General Sans & Google Fonts Manrope (+ Plus Jakarta Sans fallback) */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        <ScrollViewStyleReset />

        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body, #root {
                margin: 0;
                padding: 0;
                background-color: #F8FAFC;
                color: #0F172A;
                font-family: 'General Sans', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
              * {
                box-sizing: border-box;
              }
              /* React Native Web default typography normalization */
              .r-fontFamily-1qd0xha,
              [dir] .r-fontFamily-1qd0xha,
              [dir] [class*="r-fontFamily-1qd0xha"] {
                font-family: 'General Sans', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
              }
              input, textarea, select, button {
                font-family: 'General Sans', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
              }
              /* Premium minimalist scrollbar */
              ::-webkit-scrollbar {
                width: 6px;
                height: 6px;
              }
              ::-webkit-scrollbar-track {
                background: #F1F5F9;
              }
              ::-webkit-scrollbar-thumb {
                background: #CBD5E1;
                border-radius: 3px;
              }
              ::-webkit-scrollbar-thumb:hover {
                background: #94A3B8;
              }
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
