// 12 Core Personality Dimensions

export interface DimensionDefinition {
  key: string;
  label: string;
  category: "thinking" | "emotion" | "social" | "action";
  description: string;
  colorClass: string;
  colorText: string;
  lightBgClass: string;
  icon: string;
}

export const DIMENSIONS: Record<string, DimensionDefinition> = {
  // THINKING CLUSTER (4 dimensions)
  logic: {
    key: "logic",
    label: "Logic",
    category: "thinking",
    description: "How much you rely on reasoning, facts, and systems",
    colorClass: "bg-blue-500",
    colorText: "text-blue-600",
    lightBgClass: "bg-blue-50",
    icon: "🧠",
  },
  intuition: {
    key: "intuition",
    label: "Intuition",
    category: "thinking",
    description: "How much you rely on gut feelings and patterns",
    colorClass: "bg-purple-500",
    colorText: "text-purple-600",
    lightBgClass: "bg-purple-50",
    icon: "✨",
  },
  reflection: {
    key: "reflection",
    label: "Reflection",
    category: "thinking",
    description: "How deeply you examine your thoughts and motives",
    colorClass: "bg-indigo-500",
    colorText: "text-indigo-600",
    lightBgClass: "bg-indigo-50",
    icon: "🪞",
  },
  decisiveness: {
    key: "decisiveness",
    label: "Decisiveness",
    category: "thinking",
    description: "How quickly and confidently you make decisions",
    colorClass: "bg-red-500",
    colorText: "text-red-600",
    lightBgClass: "bg-red-50",
    icon: "⚡",
  },

  // EMOTION CLUSTER (3 dimensions)
  emotionalSensitivity: {
    key: "emotionalSensitivity",
    label: "Emotional Sensitivity",
    category: "emotion",
    description: "How deeply you feel and are affected by emotions",
    colorClass: "bg-pink-500",
    colorText: "text-pink-600",
    lightBgClass: "bg-pink-50",
    icon: "💗",
  },
  emotionalControl: {
    key: "emotionalControl",
    label: "Emotional Control",
    category: "emotion",
    description: "How well you manage and regulate your emotions",
    colorClass: "bg-teal-500",
    colorText: "text-teal-600",
    lightBgClass: "bg-teal-50",
    icon: "🎯",
  },

  // SOCIAL CLUSTER (3 dimensions)
  socialEnergy: {
    key: "socialEnergy",
    label: "Social Energy",
    category: "social",
    description: "How much energy you get from social interaction",
    colorClass: "bg-orange-500",
    colorText: "text-orange-600",
    lightBgClass: "bg-orange-50",
    icon: "👥",
  },
  socialDepth: {
    key: "socialDepth",
    label: "Social Depth",
    category: "social",
    description: "How much you value meaningful connections",
    colorClass: "bg-cyan-500",
    colorText: "text-cyan-600",
    lightBgClass: "bg-cyan-50",
    icon: "🤝",
  },

  // ACTION CLUSTER (2 dimensions)
  discipline: {
    key: "discipline",
    label: "Discipline",
    category: "action",
    description: "How well you stick to plans and follow through",
    colorClass: "bg-green-500",
    colorText: "text-green-600",
    lightBgClass: "bg-green-50",
    icon: "💪",
  },
  impulsiveness: {
    key: "impulsiveness",
    label: "Impulsiveness",
    category: "action",
    description: "How much you act without overthinking",
    colorClass: "bg-amber-500",
    colorText: "text-amber-600",
    lightBgClass: "bg-amber-50",
    icon: "🎪",
  },

  // ADAPTATION CLUSTER (2 dimensions)
  riskTolerance: {
    key: "riskTolerance",
    label: "Risk Tolerance",
    category: "action",
    description: "How comfortable you are with uncertainty",
    colorClass: "bg-rose-500",
    colorText: "text-rose-600",
    lightBgClass: "bg-rose-50",
    icon: "🎲",
  },
  flexibility: {
    key: "flexibility",
    label: "Flexibility",
    category: "action",
    description: "How easily you adapt to change",
    colorClass: "bg-lime-500",
    colorText: "text-lime-600",
    lightBgClass: "bg-lime-50",
    icon: "🌊",
  },
};

export const ALL_DIMENSION_KEYS = Object.keys(DIMENSIONS);

// Interpretation bands for dimension scores (0-100 scale)
export function getInterpretationBand(
  score: number,
): "low" | "moderately_low" | "balanced" | "moderately_high" | "high" {
  if (score < 35) return "low";
  if (score < 50) return "moderately_low";
  if (score < 65) return "balanced";
  if (score < 80) return "moderately_high";
  return "high";
}

export function getInterpretationLabel(band: string): string {
  const labels: Record<string, string> = {
    low: "Low",
    moderately_low: "Moderately Low",
    balanced: "Balanced",
    moderately_high: "Moderately High",
    high: "High",
  };
  return labels[band] || "Unknown";
}

// Get all dimensions organized by category
export function getDimensionsByCategory(
  category: DimensionDefinition["category"],
) {
  return Object.values(DIMENSIONS).filter((d) => d.category === category);
}

// Get display dimensions (8 for UI)
export const DISPLAY_DIMENSION_KEYS = [
  "logic",
  "intuition",
  "decisiveness",
  "emotionalControl",
  "emotionalSensitivity",
  "socialEnergy",
  "discipline",
  "flexibility",
];

export const HIDDEN_DIMENSION_KEYS = [
  "reflection",
  "socialDepth",
  "impulsiveness",
  "riskTolerance",
];
