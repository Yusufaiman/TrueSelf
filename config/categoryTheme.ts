/**
 * Category Color Theme System
 * Centralized configuration for all category visual identities.
 */

export type CategoryKey =
  | "personality"
  | "identity"
  | "relationships"
  | "career"
  | "mind"
  | "motivation"
  | "growth"
  | "stress-emotions"
  | "life";

export interface CategoryTheme {
  name: string;
  slug: string;
  primary: string;
  light: string;
  lighter: string;
  border: string;
  text: string;
  icon: string;
  gradient: {
    from: string;
    to: string;
  };
  rgb: string;
  semanticMeaning: string;
}

export const categoryThemes: Record<CategoryKey, CategoryTheme> = {
  personality: {
    name: "Personality",
    slug: "personality",
    primary: "blue-500",
    light: "blue-100",
    lighter: "blue-50",
    border: "blue-200",
    text: "blue-700",
    icon: "blue-500",
    gradient: { from: "from-blue-50", to: "to-white" },
    rgb: "59, 130, 246",
    semanticMeaning: "Core type, self-map, cognitive pattern",
  },
  identity: {
    name: "Identity",
    slug: "identity",
    primary: "indigo-500",
    light: "indigo-100",
    lighter: "indigo-50",
    border: "indigo-200",
    text: "indigo-700",
    icon: "indigo-500",
    gradient: { from: "from-indigo-50", to: "to-white" },
    rgb: "99, 102, 241",
    semanticMeaning: "Authenticity, self-concept, social mask",
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
    semanticMeaning: "Connection, communication, conflict, love",
  },
  career: {
    name: "Career",
    slug: "career",
    primary: "violet-500",
    light: "violet-100",
    lighter: "violet-50",
    border: "violet-200",
    text: "violet-700",
    icon: "violet-500",
    gradient: { from: "from-violet-50", to: "to-white" },
    rgb: "139, 92, 246",
    semanticMeaning: "Work fit, leadership, role alignment",
  },
  mind: {
    name: "Mind",
    slug: "mind",
    primary: "cyan-500",
    light: "cyan-100",
    lighter: "cyan-50",
    border: "cyan-200",
    text: "cyan-700",
    icon: "cyan-500",
    gradient: { from: "from-cyan-50", to: "to-white" },
    rgb: "34, 211, 238",
    semanticMeaning: "Thinking, learning, attention, creativity",
  },
  motivation: {
    name: "Motivation",
    slug: "motivation",
    primary: "orange-500",
    light: "orange-100",
    lighter: "orange-50",
    border: "orange-200",
    text: "orange-700",
    icon: "orange-500",
    gradient: { from: "from-orange-50", to: "to-white" },
    rgb: "249, 115, 22",
    semanticMeaning: "Drive, discipline, reward, procrastination",
  },
  growth: {
    name: "Growth",
    slug: "growth",
    primary: "green-500",
    light: "green-100",
    lighter: "green-50",
    border: "green-200",
    text: "green-700",
    icon: "green-500",
    gradient: { from: "from-green-50", to: "to-white" },
    rgb: "34, 197, 94",
    semanticMeaning: "Strengths, blind spots, resilience, potential",
  },
  "stress-emotions": {
    name: "Stress & Emotions",
    slug: "stress-emotions",
    primary: "red-500",
    light: "red-100",
    lighter: "red-50",
    border: "red-200",
    text: "red-700",
    icon: "red-500",
    gradient: { from: "from-red-50", to: "to-white" },
    rgb: "239, 68, 68",
    semanticMeaning: "Stress, emotional processing, burnout, recovery",
  },
  life: {
    name: "Life",
    slug: "life",
    primary: "teal-500",
    light: "teal-100",
    lighter: "teal-50",
    border: "teal-200",
    text: "teal-700",
    icon: "teal-500",
    gradient: { from: "from-teal-50", to: "to-white" },
    rgb: "20, 184, 166",
    semanticMeaning: "Purpose, direction, lifestyle, priorities",
  },
};

export const getTheme = (category: CategoryKey): CategoryTheme => {
  return categoryThemes[category];
};

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

export const getThemeClasses = (
  category: CategoryKey,
  type: "primary" | "light" | "lighter" | "border" | "text" | "icon",
): string => {
  return categoryThemes[category][type];
};

export const categoryIcons: Record<CategoryKey, string> = {
  personality: "Dna",
  identity: "UserRound",
  relationships: "Users",
  career: "Briefcase",
  mind: "Brain",
  motivation: "Flame",
  growth: "Sprout",
  "stress-emotions": "Heart",
  life: "Compass",
};
