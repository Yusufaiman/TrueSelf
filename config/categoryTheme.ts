/**
 * Category Color Theme System
 * Centralized configuration for all category visual identities
 * Used across navbar, category pages, buttons, badges, and UI elements
 */

export type CategoryKey =
  | "identity"
  | "relationships"
  | "career"
  | "life-direction"
  | "mindset"
  | "emotional-health"
  | "life-patterns"
  | "money"
  | "reality-check";

export interface CategoryTheme {
  name: string;
  slug: string;
  primary: string; // Main color (e.g., "blue-500")
  light: string; // Light background (e.g., "blue-100")
  lighter: string; // Lighter background (e.g., "blue-50")
  border: string; // Border color (e.g., "blue-200")
  text: string; // Text color (e.g., "blue-700")
  icon: string; // Icon color (e.g., "blue-500")
  gradient: {
    from: string; // Gradient start (e.g., "from-blue-50")
    to: string; // Gradient end (e.g., "to-white")
  };
  rgb: string; // RGB for opacity (e.g., "59, 130, 246") - blue-500
  semanticMeaning: string; // What this color represents
}

export const categoryThemes: Record<CategoryKey, CategoryTheme> = {
  identity: {
    name: "Identity",
    slug: "identity",
    primary: "blue-500",
    light: "blue-100",
    lighter: "blue-50",
    border: "blue-200",
    text: "blue-700",
    icon: "blue-500",
    gradient: { from: "from-blue-50", to: "to-white" },
    rgb: "59, 130, 246",
    semanticMeaning: "Clarity, self-understanding, trust",
  },
  relationships: {
    name: "Relationships",
    slug: "relationships",
    primary: "pink-500",
    light: "pink-100",
    lighter: "pink-50",
    border: "pink-200",
    text: "pink-700",
    icon: "pink-500",
    gradient: { from: "from-pink-50", to: "to-white" },
    rgb: "236, 72, 153",
    semanticMeaning: "Connection, emotion, intimacy",
  },
  career: {
    name: "Career",
    slug: "career",
    primary: "indigo-500",
    light: "indigo-100",
    lighter: "indigo-50",
    border: "indigo-200",
    text: "indigo-700",
    icon: "indigo-500",
    gradient: { from: "from-indigo-50", to: "to-white" },
    rgb: "99, 102, 241",
    semanticMeaning: "Ambition, purpose, growth",
  },
  "life-direction": {
    name: "Life Direction",
    slug: "life-direction",
    primary: "purple-500",
    light: "purple-100",
    lighter: "purple-50",
    border: "purple-200",
    text: "purple-700",
    icon: "purple-500",
    gradient: { from: "from-purple-50", to: "to-white" },
    rgb: "168, 85, 247",
    semanticMeaning: "Vision, direction, meaning",
  },
  mindset: {
    name: "Mindset",
    slug: "mindset",
    primary: "cyan-500",
    light: "cyan-100",
    lighter: "cyan-50",
    border: "cyan-200",
    text: "cyan-700",
    icon: "cyan-500",
    gradient: { from: "from-cyan-50", to: "to-white" },
    rgb: "34, 211, 238",
    semanticMeaning: "Clarity, expansion, perspective",
  },
  "emotional-health": {
    name: "Emotional Health",
    slug: "emotional-health",
    primary: "red-500",
    light: "red-100",
    lighter: "red-50",
    border: "red-200",
    text: "red-700",
    icon: "red-500",
    gradient: { from: "from-red-50", to: "to-white" },
    rgb: "239, 68, 68",
    semanticMeaning: "Vitality, emotion, intensity",
  },
  "life-patterns": {
    name: "Life Patterns",
    slug: "life-patterns",
    primary: "amber-500",
    light: "amber-100",
    lighter: "amber-50",
    border: "amber-200",
    text: "amber-700",
    icon: "amber-500",
    gradient: { from: "from-amber-50", to: "to-white" },
    rgb: "245, 158, 11",
    semanticMeaning: "Cycles, rhythm, awareness",
  },
  money: {
    name: "Money",
    slug: "money",
    primary: "green-500",
    light: "green-100",
    lighter: "green-50",
    border: "green-200",
    text: "green-700",
    icon: "green-500",
    gradient: { from: "from-green-50", to: "to-white" },
    rgb: "34, 197, 94",
    semanticMeaning: "Growth, abundance, stability",
  },
  "reality-check": {
    name: "Reality Check",
    slug: "reality-check",
    primary: "slate-500",
    light: "slate-100",
    lighter: "slate-50",
    border: "slate-200",
    text: "slate-700",
    icon: "slate-500",
    gradient: { from: "from-slate-50", to: "to-white" },
    rgb: "107, 114, 128",
    semanticMeaning: "Truth, clarity, objectivity",
  },
};

/**
 * Get theme by category key
 */
export const getTheme = (category: CategoryKey): CategoryTheme => {
  return categoryThemes[category];
};

/**
 * Get all categories for mapping
 */
export const getCategories = (): Array<{
  key: CategoryKey;
  name: string;
  slug: string;
}> => {
  return Object.entries(categoryThemes).map(([key, theme]) => ({
    key: key as CategoryKey,
    name: theme.name,
    slug: theme.slug,
  }));
};

/**
 * Helper: Generate Tailwind class strings dynamically
 * Note: These must be valid Tailwind classes that exist in your config
 * Dynamic class names (with brackets) won't work in production builds
 */
export const getThemeClasses = (
  category: CategoryKey,
  type: "primary" | "light" | "lighter" | "border" | "text" | "icon",
): string => {
  return categoryThemes[category][type];
};

/**
 * Category to icon mapping with semantic colors
 */
export const categoryIcons = {
  identity: "User",
  relationships: "Users",
  career: "Briefcase",
  "life-direction": "Map",
  mindset: "Brain",
  "emotional-health": "Heart",
  "life-patterns": "RefreshCw",
  money: "Wallet",
  "reality-check": "AlertCircle",
};
