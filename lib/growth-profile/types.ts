import type { AnswerValue } from "@/lib/test-config";

export type GrowthDimensionKey =
  | "growth_mindset"
  | "growth_self_awareness"
  | "feedback_receptivity"
  | "setback_recovery"
  | "discomfort_tolerance"
  | "adaptive_change"
  | "self_discipline"
  | "reflective_learning";

export type GrowthStageKey = "see" | "accept" | "adapt" | "continue";
export type GrowthScoringDirection = "direct" | "reverse";

export interface GrowthQuestion {
  id: number;
  code: string;
  text: string;
  dimension: GrowthDimensionKey;
  scoring: GrowthScoringDirection;
  facet: string;
  displayOrder: number;
}

export interface GrowthDimensionScore {
  key: GrowthDimensionKey;
  label: string;
  score: number;
  band: string;
  lowLabel: string;
  highLabel: string;
  description: string;
  consistency: number;
  confidence: "High" | "Moderate" | "Limited";
}

export interface GrowthStageScore {
  key: GrowthStageKey;
  label: string;
  score: number;
  description: string;
}

export interface GrowthAnswerEvidence {
  questionId: number;
  questionCode: string;
  rawResponse: AnswerValue;
  scoredResponse: number;
  dimension: GrowthDimensionKey;
  scoring: GrowthScoringDirection;
  facet: string;
}

export interface GrowthProfileResult {
  dimensions: Record<GrowthDimensionKey, GrowthDimensionScore>;
  stages: Record<GrowthStageKey, GrowthStageScore>;
  growthStrength: GrowthStageScore;
  growthBottleneck: GrowthStageScore;
  growthPattern: string;
  cycleInsight: string;
  strengths: string[];
  bottleneckSignals: string[];
  developmentPath: string[];
  insights: string[];
  confidence: "High" | "Moderate" | "Limited";
  confidenceNotes: string[];
  answerEvidence: GrowthAnswerEvidence[];
}
