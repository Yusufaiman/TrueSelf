import type { AnswerValue } from "@/lib/test-config";

export type StressEmotionDimensionKey =
  | "emotional_awareness"
  | "emotional_clarity"
  | "emotional_regulation"
  | "stress_reactivity"
  | "stress_recovery"
  | "emotional_expression"
  | "emotional_acceptance"
  | "coping_flexibility";

export type EmotionalCycleStageKey =
  | "notice"
  | "understand"
  | "allow"
  | "regulate"
  | "express"
  | "recover";

export type StressEmotionScoringDirection = "direct" | "reverse";

export interface StressEmotionQuestion {
  id: number;
  code: string;
  text: string;
  dimension: StressEmotionDimensionKey;
  scoring: StressEmotionScoringDirection;
  facet: string;
  displayOrder: number;
}

export interface StressEmotionDimensionScore {
  key: StressEmotionDimensionKey;
  label: string;
  score: number;
  band: string;
  lowLabel: string;
  highLabel: string;
  description: string;
  isLoadDimension?: boolean;
  consistency: number;
  confidence: "High" | "Moderate" | "Limited";
}

export interface EmotionalCycleStage {
  key: EmotionalCycleStageKey;
  label: string;
  score: number;
  description: string;
}

export interface StressResponsePattern {
  id: string;
  name: string;
  description: string;
}

export interface StressEmotionAnswerEvidence {
  questionId: number;
  questionCode: string;
  rawResponse: AnswerValue;
  scoredResponse: number;
  dimension: StressEmotionDimensionKey;
  scoring: StressEmotionScoringDirection;
  facet: string;
}

export interface StressEmotionProfileResult {
  dimensions: Record<StressEmotionDimensionKey, StressEmotionDimensionScore>;
  processingCycle: Record<EmotionalCycleStageKey, EmotionalCycleStage>;
  stressResponsePattern: StressResponsePattern;
  emotionalStrength: EmotionalCycleStage;
  emotionalBottleneck: EmotionalCycleStage | null;
  stressSensitivity: StressEmotionDimensionScore;
  processingInsights: string[];
  stressInsights: string[];
  copingInsights: string[];
  supportPath: string[];
  confidence: "High" | "Moderate" | "Limited";
  confidenceNotes: string[];
  answerEvidence: StressEmotionAnswerEvidence[];
}
