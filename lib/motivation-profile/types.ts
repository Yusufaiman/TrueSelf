import type { AnswerValue } from "@/lib/test-config";

export type MotivationDimensionKey =
  | "growth_mastery"
  | "purpose_meaning"
  | "autonomy_drive"
  | "achievement_progress"
  | "recognition_validation"
  | "connection_contribution"
  | "security_motivation"
  | "challenge_activation";

export type MotivationScoringDirection = "direct" | "reverse";

export interface MotivationQuestion {
  id: number;
  code: string;
  text: string;
  dimension: MotivationDimensionKey;
  scoring: MotivationScoringDirection;
  facet: string;
  displayOrder: number;
}

export interface MotivationDimensionScore {
  key: MotivationDimensionKey;
  label: string;
  score: number;
  band: string;
  lowLabel: string;
  highLabel: string;
  description: string;
  consistency: number;
  confidence: "High" | "Moderate" | "Limited";
}

export interface MotivationAnswerEvidence {
  questionId: number;
  questionCode: string;
  rawResponse: AnswerValue;
  scoredResponse: number;
  dimension: MotivationDimensionKey;
  scoring: MotivationScoringDirection;
  facet: string;
}

export interface MotivationPatternResult {
  id: string;
  name: string;
  tagline: string;
  description: string;
  matchScore: number;
}

export interface MotivationDriver {
  key: MotivationDimensionKey;
  label: string;
  score: number;
  band: string;
}

export interface MotivationProfileResult {
  pattern: MotivationPatternResult;
  secondaryPattern: MotivationPatternResult;
  dimensions: Record<MotivationDimensionKey, MotivationDimensionScore>;
  primaryDrivers: MotivationDriver[];
  supportingDrivers: MotivationDriver[];
  lowerInfluenceDrivers: MotivationDriver[];
  activationProfile: string[];
  motivationTensions: string[];
  frictionProfile: string[];
  insights: string[];
  confidence: "High" | "Moderate" | "Limited";
  confidenceNotes: string[];
  answerEvidence: MotivationAnswerEvidence[];
}
