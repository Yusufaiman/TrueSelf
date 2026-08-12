import type { AnswerValue } from "@/lib/test-config";

export type CareerDimensionKey =
  | "work_autonomy"
  | "structure_preference"
  | "social_work_orientation"
  | "problem_complexity"
  | "creative_orientation"
  | "leadership_drive"
  | "stability_orientation"
  | "achievement_drive";

export type CareerScoringDirection = "direct" | "reverse";

export interface CareerQuestion {
  id: number;
  code: string;
  text: string;
  dimension: CareerDimensionKey;
  scoring: CareerScoringDirection;
  facet: string;
  displayOrder: number;
}

export interface CareerDimensionScore {
  key: CareerDimensionKey;
  label: string;
  score: number;
  band: string;
  lowLabel: string;
  highLabel: string;
  description: string;
  consistency: number;
  confidence: "High" | "Moderate" | "Limited";
}

export interface CareerAnswerEvidence {
  questionId: number;
  questionCode: string;
  rawResponse: AnswerValue;
  scoredResponse: number;
  dimension: CareerDimensionKey;
  scoring: CareerScoringDirection;
  facet: string;
}

export interface CareerPatternResult {
  id: string;
  name: string;
  tagline: string;
  description: string;
  matchScore: number;
}

export interface CareerFamilyMatch {
  id: string;
  name: string;
  fit: number;
  examples: string[];
  why: string;
}

export interface CareerOccupationMatch {
  id: string;
  name: string;
  family: string;
  fit: number;
  why: string;
  possibleFriction: string;
}

export interface CareerFitResult {
  pattern: CareerPatternResult;
  secondaryPattern: CareerPatternResult;
  dimensions: Record<CareerDimensionKey, CareerDimensionScore>;
  workEnvironmentStyle: string;
  problemStyle: string;
  responsibilityStyle: string;
  growthStyle: string;
  bestFitEnvironments: string[];
  careerFamilies: CareerFamilyMatch[];
  occupationMatches: CareerOccupationMatch[];
  strengths: string[];
  drainers: string[];
  frictionPoints: string[];
  insights: string[];
  confidence: "High" | "Moderate" | "Limited";
  confidenceNotes: string[];
  answerEvidence: CareerAnswerEvidence[];
}
