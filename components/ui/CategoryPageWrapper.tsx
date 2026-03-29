/**
 * CategoryPageWrapper Component
 * Applies themed styles based on category to ensure consistent visual identity
 * Usage: Wrap your category page content with this component
 */

"use client";

import React from "react";
import { categoryThemes, type CategoryKey } from "@/config/categoryTheme";

interface CategoryPageWrapperProps {
  category: CategoryKey;
  children: React.ReactNode;
  pageTitle?: string;
  pageDescription?: string;
}

export const CategoryPageWrapper: React.FC<CategoryPageWrapperProps> = ({
  category,
  children,
  pageTitle,
  pageDescription,
}) => {
  const theme = categoryThemes[category];

  // Hex color mappings for inline styles
  const colorHex: Record<string, Record<string, string>> = {
    blue: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      500: "#3b82f6",
      700: "#1d4ed8",
    },
    pink: {
      50: "#fdf2f8",
      100: "#fce7f3",
      200: "#fbcfe8",
      500: "#ec4899",
      700: "#be185d",
    },
    indigo: {
      50: "#eef2ff",
      100: "#e0e7ff",
      200: "#c7d2fe",
      500: "#6366f1",
      700: "#4338ca",
    },
    purple: {
      50: "#faf5ff",
      100: "#f3e8ff",
      200: "#e9d5ff",
      500: "#a855f7",
      700: "#7e22ce",
    },
    cyan: {
      50: "#ecf9ff",
      100: "#cffafe",
      200: "#a5f3fc",
      500: "#22d3ee",
      700: "#0891b2",
    },
    red: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      500: "#ef4444",
      700: "#b91c1c",
    },
    amber: {
      50: "#fffbeb",
      100: "#fef3c7",
      200: "#fde68a",
      500: "#f59e0b",
      700: "#b45309",
    },
    green: {
      50: "#f0fdf4",
      100: "#dcfce7",
      200: "#bbf7d0",
      500: "#22c55e",
      700: "#15803d",
    },
    slate: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      500: "#6b7280",
      700: "#374151",
    },
  };

  const colorName = theme.primary.split("-")[0] as keyof typeof colorHex;
  const colors = colorHex[colorName] || colorHex.slate;

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, ${colors[50]}, white)`,
      }}
      className="min-h-screen transition-colors duration-300"
    >
      {/* Optional Header Section */}
      {pageTitle && (
        <div className="border-b" style={{ borderColor: colors[200] }}>
          <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
            {/* Category Badge */}
            <div
              className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
              style={{
                backgroundColor: colors[100],
                color: colors[700],
              }}
            >
              {theme.name}
            </div>

            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: colors[700] }}
            >
              {pageTitle}
            </h1>

            {pageDescription && (
              <p className="text-lg text-slate-600 max-w-2xl">
                {pageDescription}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 md:py-12">{children}</div>

      {/* Optional Footer Accent */}
      <div
        className="mt-20 h-1 bg-gradient-to-r"
        style={{
          backgroundImage: `linear-gradient(to right, ${colors[50]}, ${colors[500]}, ${colors[50]})`,
        }}
      />
    </div>
  );
};

/**
 * CategoryBadge Component
 * Small reusable badge with category theme colors
 */
interface CategoryBadgeProps {
  category: CategoryKey;
  className?: string;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  category,
  className = "",
}) => {
  const theme = categoryThemes[category];

  const colorHex: Record<string, Record<string, string>> = {
    blue: { 100: "#dbeafe", 700: "#1d4ed8" },
    pink: { 100: "#fce7f3", 700: "#be185d" },
    indigo: { 100: "#e0e7ff", 700: "#4338ca" },
    purple: { 100: "#f3e8ff", 700: "#7e22ce" },
    cyan: { 100: "#cffafe", 700: "#0891b2" },
    red: { 100: "#fee2e2", 700: "#b91c1c" },
    amber: { 100: "#fef3c7", 700: "#b45309" },
    green: { 100: "#dcfce7", 700: "#15803d" },
    slate: { 100: "#f3f4f6", 700: "#374151" },
  };

  const colorName = theme.primary.split("-")[0] as keyof typeof colorHex;
  const colors = colorHex[colorName] || colorHex.slate;

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${className}`}
      style={{
        backgroundColor: colors[100],
        color: colors[700],
      }}
    >
      {theme.name}
    </span>
  );
};

/**
 * CategoryButton Component
 * Primary button with category theme colors
 */
interface CategoryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  category: CategoryKey;
  children: React.ReactNode;
}

export const CategoryButton: React.FC<CategoryButtonProps> = ({
  category,
  children,
  className = "",
  ...props
}) => {
  const theme = categoryThemes[category];

  const colorHex: Record<string, Record<string, string>> = {
    blue: { 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8" },
    pink: { 500: "#ec4899", 600: "#db2777", 700: "#be185d" },
    indigo: { 500: "#6366f1", 600: "#4f46e5", 700: "#4338ca" },
    purple: { 500: "#a855f7", 600: "#9333ea", 700: "#7e22ce" },
    cyan: { 500: "#22d3ee", 600: "#06b6d4", 700: "#0891b2" },
    red: { 500: "#ef4444", 600: "#dc2626", 700: "#b91c1c" },
    amber: { 500: "#f59e0b", 600: "#d97706", 700: "#b45309" },
    green: { 500: "#22c55e", 600: "#16a34a", 700: "#15803d" },
    slate: { 500: "#6b7280", 600: "#4b5563", 700: "#374151" },
  };

  const colorName = theme.primary.split("-")[0] as keyof typeof colorHex;
  const colors = colorHex[colorName] || colorHex.slate;

  return (
    <button
      className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 text-white ${className}`}
      style={{
        backgroundColor: colors[500],
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = colors[600];
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = colors[500];
      }}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * CategoryCard Component
 * Card with subtle category color tint
 */
interface CategoryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  category: CategoryKey;
  children: React.ReactNode;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  children,
  className = "",
  ...props
}) => {
  const theme = categoryThemes[category];

  const colorHex: Record<string, Record<string, string>> = {
    blue: { 50: "#eff6ff", 200: "#bfdbfe" },
    pink: { 50: "#fdf2f8", 200: "#fbcfe8" },
    indigo: { 50: "#eef2ff", 200: "#c7d2fe" },
    purple: { 50: "#faf5ff", 200: "#e9d5ff" },
    cyan: { 50: "#ecf9ff", 200: "#a5f3fc" },
    red: { 50: "#fef2f2", 200: "#fecaca" },
    amber: { 50: "#fffbeb", 200: "#fde68a" },
    green: { 50: "#f0fdf4", 200: "#bbf7d0" },
    slate: { 50: "#f9fafb", 200: "#e5e7eb" },
  };

  const colorName = theme.primary.split("-")[0] as keyof typeof colorHex;
  const colors = colorHex[colorName] || colorHex.slate;

  return (
    <div
      className={`rounded-xl p-6 border transition-all duration-200 ${className}`}
      style={{
        backgroundColor: colors[50],
        borderColor: colors[200],
      }}
      {...props}
    >
      {children}
    </div>
  );
};
