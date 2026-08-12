import type { AnswerValue } from "@/lib/test-config";

export type MindDimensionKey =
  | "analytical_processing"
  | "intuitive_processing"
  | "cognitive_flexibility"
  | "depth_processing"
  | "decision_deliberation"
  | "uncertainty_tolerance"
  | "learning_exploration"
  | "mental_focus";

export type MindScoringDirection = "direct" | "reverse";

export interface MindQuestion {
  id: number;
  code: string;
  text: string;
  dimension: MindDimensionKey;
  scoring: MindScoringDirection;
  facet: string;
  displayOrder: number;
}

export interface MindDimensionScore {
  key: MindDimensionKey;
  label: string;
  score: number;
  band: string;
  lowLabel: string;
  highLabel: string;
  description: string;
  consistency: number;
  confidence: "High" | "Moderate" | "Limited";
}

export interface MindAnswerEvidence {
  questionId: number;
  questionCode: string;
  rawResponse: AnswerValue;
  scoredResponse: number;
  dimension: MindDimensionKey;
  scoring: MindScoringDirection;
  facet: string;
}

export interface MindPatternResult {
  id: string;
  name: string;
  tagline: string;
  description: string;
  matchScore: number;
}

export interface MindProfileResult {
  pattern: MindPatternResult;
  secondaryPattern: MindPatternResult;
  dimensions: Record<MindDimensionKey, MindDimensionScore>;
  processingStyle: string;
  learningStyle: string;
  decisionStyle: string;
  uncertaintyStyle: string;
  cognitiveStrengths: string[];
  frictionPoints: string[];
  insights: string[];
  developmentPath: string[];
  confidence: "High" | "Moderate" | "Limited";
  confidenceNotes: string[];
  answerEvidence: MindAnswerEvidence[];
}
