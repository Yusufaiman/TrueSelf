import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: "#FFFFFF",
      transparent: "transparent",
      slate: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        900: "#111827",
      },
      blue: {
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
      },
      pink: {
        50: "#fdf2f8",
        100: "#fce7f3",
        200: "#fbcfe8",
        500: "#ec4899",
        600: "#db2777",
        700: "#be185d",
      },
      indigo: {
        50: "#eef2ff",
        100: "#e0e7ff",
        200: "#c7d2fe",
        500: "#6366f1",
        600: "#4f46e5",
        700: "#4338ca",
      },
      purple: {
        50: "#faf5ff",
        100: "#f3e8ff",
        200: "#e9d5ff",
        500: "#a855f7",
        600: "#9333ea",
        700: "#7e22ce",
      },
      cyan: {
        50: "#ecf9ff",
        100: "#cffafe",
        200: "#a5f3fc",
        500: "#22d3ee",
        600: "#06b6d4",
        700: "#0891b2",
      },
      red: {
        50: "#fef2f2",
        100: "#fee2e2",
        200: "#fecaca",
        500: "#ef4444",
        600: "#dc2626",
        700: "#b91c1c",
      },
      amber: {
        50: "#fffbeb",
        100: "#fef3c7",
        200: "#fde68a",
        500: "#f59e0b",
        600: "#d97706",
        700: "#b45309",
      },
      green: {
        50: "#f0fdf4",
        100: "#dcfce7",
        200: "#bbf7d0",
        500: "#22c55e",
        600: "#16a34a",
        700: "#15803d",
      },
    },
    extend: {
      colors: {
        "dark-grey": "#545454",
        "soft-grey": "#8b8b8b",
        turquoise: "#5CE1E6",
        azure: "#4399E6",
        "azure-dark": "#3B82F6",
        "soft-white": "#F9FAFB",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
