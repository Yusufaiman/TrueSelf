import type { AnswerValue } from "@/lib/test-config";

export type IdentityDimensionKey =
  | "self_clarity"
  | "authenticity"
  | "values_alignment"
  | "social_adaptation"
  | "external_influence"
  | "identity_stability";

export type IdentityScoringDirection = "direct" | "reverse";

export interface IdentityQuestion {
  id: number;
  code: string;
  text: string;
  dimension: IdentityDimensionKey;
  scoring: IdentityScoringDirection;
  facet: string;
  displayOrder: number;
}

export interface IdentityDimensionScore {
  key: IdentityDimensionKey;
  label: string;
  score: number;
  band: string;
  description: string;
  consistency: number;
  confidence: "High" | "Moderate" | "Limited";
}

export interface IdentityAnswerEvidence {
  questionId: number;
  questionCode: string;
  rawResponse: AnswerValue;
  scoredResponse: number;
  dimension: IdentityDimensionKey;
  scoring: IdentityScoringDirection;
  facet: string;
}

export interface IdentityPatternResult {
  id: string;
  name: string;
  tagline: string;
  description: string;
  matchScore: number;
}

export interface IdentityResult {
  pattern: IdentityPatternResult;
  dimensions: Record<IdentityDimensionKey, IdentityDimensionScore>;
  coreSocialAlignment: {
    level: "High" | "Moderate" | "Low";
    description: string;
  };
  expressionGap: {
    level: "Low" | "Moderate" | "High";
    description: string;
  };
  internalGrounding: {
    level: "Emerging" | "Moderate" | "Strong";
    description: string;
  };
  coreSelf: string[];
  socialSelf: string[];
  groundingSignals: string[];
  adaptationSignals: string[];
  insights: string[];
  confidence: "High" | "Moderate" | "Limited";
  confidenceNotes: string[];
  answerEvidence: IdentityAnswerEvidence[];
}
