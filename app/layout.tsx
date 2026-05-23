import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";

const montserrat = localFont({
  src: [
    { path: "./fonts/Montserrat-VariableFont_wght.ttf", weight: "100 900", style: "normal" },
    { path: "./fonts/Montserrat-Italic-VariableFont_wght.ttf", weight: "100 900", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orchelix | AI Agents for Revenue Operations",
  description:
    "AI agents that actually run your revenue operations. Multi-agent systems for sales, marketing, and finance.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${jetbrainsMono.variable}`}
      style={{ fontFamily: "var(--font-display), ui-sans-serif, system-ui, sans-serif" }}
    >
      <body>{children}</body>
    </html>
  );
}
