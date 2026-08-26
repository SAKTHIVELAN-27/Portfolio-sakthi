import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TargetCursor from "./bits/TargetCursor";
import { ThemeProvider } from "./components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sakthivelan — Creative Developer",
  description:
    "Creative developer specialising in AI, full-stack engineering, and interactive creative technology. Building at the intersection of intelligence and interface.",
  keywords: ["Creative Developer", "AI Engineer", "Full Stack", "React", "Next.js", "TypeScript", "Sakthivelan"],
  authors: [{ name: "Sakthivelan" }],
  openGraph: {
    title: "Sakthivelan — Creative Developer",
    description: "Building at the intersection of intelligence and interface.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sakthivelan — Creative Developer",
    description: "Building at the intersection of intelligence and interface.",
  },
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--fg)]">
        <ThemeProvider>
          <TargetCursor
            targetSelector=".cursor-target, a, button, [role='button']"
            spinDuration={2}
            hideDefaultCursor={true}
            parallaxOn={true}
            cursorColor="#ffffff"
            cursorColorOnTarget="#A78BFA"
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
