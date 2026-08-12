import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ClientProviders } from "@/components/ClientProviders";
import { AppChrome } from "@/components/AppChrome";
import "@/styles/globals.css";
import "@/lib/test-configs"; // Register all test configurations

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TrueSelf - Build Your Connected Self-Profile",
  description:
    "Build one connected profile across personality, identity, relationships, career, mind, motivation, growth, stress, and life.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} font-sans`}
    >
      <body className="bg-soft-white text-soft-grey antialiased">
        <ClientProviders>
          <AppChrome>{children}</AppChrome>
        </ClientProviders>
      </body>
    </html>
  );
}
