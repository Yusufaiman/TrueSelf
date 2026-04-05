/**
 * Global Dimension System for TrueSelf
 * Defines all psychological dimensions used across all tests
 */

export type GlobalDimension =
  | "selfAwareness"
  | "identityStability"
  | "authenticity"
  | "emotionalAlignment"
  | "decisionClarity"
  | "externalInfluence"
  | "innerConsistency"
  | "socialExpression"
  | "motivationStrength"
  | "discipline"
  | "adaptability"
  | "riskTolerance";

export const GLOBAL_DIMENSIONS: GlobalDimension[] = [
  "selfAwareness",
  "identityStability",
  "authenticity",
  "emotionalAlignment",
  "decisionClarity",
  "externalInfluence",
  "innerConsistency",
  "socialExpression",
  "motivationStrength",
  "discipline",
  "adaptability",
  "riskTolerance",
];

export const DIMENSION_DESCRIPTIONS: Record<GlobalDimension, string> = {
  selfAwareness:
    "Understanding of your own thoughts, feelings, and motivations",
  identityStability:
    "Consistency and coherence of your core identity across situations",
  authenticity: "Living in alignment with your true values and beliefs",
  emotionalAlignment: "Integration of emotions with thoughts and actions",
  decisionClarity: "Clarity in how you make decisions and solve problems",
  externalInfluence: "Degree to which external factors influence your choices",
  innerConsistency: "Alignment between different aspects of your personality",
  socialExpression: "How you express yourself and engage with others",
  motivationStrength: "Drive and motivation toward your goals",
  discipline: "Ability to maintain focus and follow through on commitments",
  adaptability: "Flexibility in responding to change and new situations",
  riskTolerance: "Comfort level with uncertainty and taking risks",
};

export interface GlobalProfile {
  userId: string;
  dimensions: Record<GlobalDimension, number>;
  testContributions: Record<string, Partial<Record<GlobalDimension, number>>>;
  consistencyScore: number;
  insights: {
    summary: string;
    strengths: string[];
    weaknesses: string[];
    blindSpots: string[];
  };
  lastUpdated: string;
}

export interface TestResult {
  testId: string;
  testType: string;
  scores: Record<string, number>;
  result: {
    title: string;
    pattern?: string;
    [key: string]: any;
  };
  createdAt: string;
}
