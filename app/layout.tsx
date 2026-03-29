import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TrueSelf - Understand How Your Life Actually Works",
  description:
    "Discover your patterns through structured quizzes. Understand why you think, act, and feel the way you do.",
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
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
