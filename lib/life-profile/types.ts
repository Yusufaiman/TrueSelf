import type { AnswerValue } from "@/lib/test-config";

export type LifeDimensionKey =
  | "life_direction"
  | "meaning_fulfillment"
  | "life_balance"
  | "personal_agency"
  | "life_satisfaction"
  | "connection_belonging"
  | "lifestyle_alignment"
  | "future_outlook";

export type LifeStageKey = "direction" | "alignment" | "experience" | "future";
export type LifeScoringDirection = "direct" | "reverse";

export interface LifeQuestion {
  id: number;
  code: string;
  text: string;
  dimension: LifeDimensionKey;
  scoring: LifeScoringDirection;
  facet: string;
  displayOrder: number;
}

export interface LifeDimensionScore {
  key: LifeDimensionKey;
  label: string;
  score: number;
  band: string;
  lowLabel: string;
  highLabel: string;
  description: string;
  consistency: number;
  confidence: "High" | "Moderate" | "Limited";
}

export interface LifeStageScore {
  key: LifeStageKey;
  label: string;
  score: number;
  description: string;
}

export interface LifePattern {
  id: string;
  name: string;
  tagline: string;
  description: string;
  matchScore: number;
}

export interface LifeInsight {
  id: string;
  title: string;
  description: string;
}

export interface LifeAnswerEvidence {
  questionId: number;
  questionCode: string;
  rawResponse: AnswerValue;
  scoredResponse: number;
  dimension: LifeDimensionKey;
  scoring: LifeScoringDirection;
  facet: string;
}

export interface LifeProfileResult {
  dimensions: Record<LifeDimensionKey, LifeDimensionScore>;
  stages: Record<LifeStageKey, LifeStageScore>;
  lifeStrength: LifeDimensionScore;
  attentionArea: LifeDimensionScore;
  primaryPattern: LifePattern;
  secondaryPattern: LifePattern;
  lifeGaps: LifeInsight[];
  lifeTensions: LifeInsight[];
  lifeSupports: LifeInsight[];
  priorityPath: string[];
  currentStateSummary: string;
  confidence: "High" | "Moderate" | "Limited";
  confidenceNotes: string[];
  assessmentVersion: number;
  completedAt: string;
  answerEvidence: LifeAnswerEvidence[];
}
