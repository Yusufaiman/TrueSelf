import type { AnswerValue } from "@/lib/test-config";

export type RelationshipDimensionKey =
  | "emotional_closeness"
  | "communication_openness"
  | "trust_orientation"
  | "relational_independence"
  | "care_expression"
  | "relationship_security"
  | "conflict_direct"
  | "conflict_avoidance"
  | "conflict_accommodation"
  | "conflict_escalation";

export type RelationshipScoringDirection = "direct" | "reverse";

export interface RelationshipQuestion {
  id: number;
  code: string;
  text: string;
  dimension: RelationshipDimensionKey;
  scoring: RelationshipScoringDirection;
  facet: string;
  displayOrder: number;
}

export interface RelationshipDimensionScore {
  key: RelationshipDimensionKey;
  label: string;
  score: number;
  band: string;
  description: string;
  consistency: number;
  confidence: "High" | "Moderate" | "Limited";
}

export interface RelationshipAnswerEvidence {
  questionId: number;
  questionCode: string;
  rawResponse: AnswerValue;
  scoredResponse: number;
  dimension: RelationshipDimensionKey;
  scoring: RelationshipScoringDirection;
  facet: string;
}

export interface RelationshipPatternResult {
  id: string;
  name: string;
  tagline: string;
  description: string;
  matchScore: number;
}

export interface RelationshipStyleResult {
  pattern: RelationshipPatternResult;
  dimensions: Record<RelationshipDimensionKey, RelationshipDimensionScore>;
  closenessStyle: string;
  communicationStyle: string;
  independenceStyle: string;
  conflictStyle: string;
  relationshipNeeds: string[];
  careStyle: string;
  strengths: string[];
  frictionPoints: string[];
  insights: string[];
  confidence: "High" | "Moderate" | "Limited";
  confidenceNotes: string[];
  answerEvidence: RelationshipAnswerEvidence[];
}
