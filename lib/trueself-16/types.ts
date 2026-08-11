export type AxisKey = "EI" | "SN" | "TF" | "JP";
export type AxisPole = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
export type TypeFamily = "NT" | "NF" | "SJ" | "SP";
export type CognitiveFunction = "Se" | "Si" | "Ne" | "Ni" | "Te" | "Ti" | "Fe" | "Fi";
export type FunctionRole = "dominant" | "auxiliary" | "tertiary" | "inferior";
export type FunctionHealth = "developed" | "balanced" | "overused" | "underdeveloped";
export type PersonalityVariant = "Stable" | "Adaptive";
export type BehaviouralTraitKey =
  | "emotionalStability"
  | "socialExpression"
  | "adaptability"
  | "discipline"
  | "stressResponse"
  | "confidence";
export type ContextualSelfKey =
  | "core"
  | "social"
  | "work"
  | "relationship"
  | "stress"
  | "growth";
export type TypeCode =
  | "ISTJ"
  | "ISFJ"
  | "INFJ"
  | "INTJ"
  | "ISTP"
  | "ISFP"
  | "INFP"
  | "INTP"
  | "ESTP"
  | "ESFP"
  | "ENFP"
  | "ENTP"
  | "ESTJ"
  | "ESFJ"
  | "ENFJ"
  | "ENTJ";

export type AnswerValue = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface AxisDefinition {
  key: AxisKey;
  firstCode: string;
  secondCode: string;
  positiveCode: AxisPole;
  negativeCode: AxisPole;
  firstLabel: string;
  secondLabel: string;
  summary: string;
}

export interface TrueSelf16Question {
  id: number;
  code: string;
  text: string;
  axis: AxisKey;
  keyedPole: AxisPole;
  positivePole: AxisPole;
  negativePole: AxisPole;
  facet: string;
  displayOrder: number;
  weight: number;
  version: number;
}

export interface AxisScore {
  axis: AxisKey;
  firstCode: string;
  secondCode: string;
  firstLabel: string;
  secondLabel: string;
  firstPercent: number;
  secondPercent: number;
  preference: string;
  preferenceLabel: string;
  clarity: number;
  rawScore: number;
  maxScore: number;
  preferencePercent: number;
  strengthLabel: string;
  confidence: "high" | "medium" | "low";
  consistency: number;
}

export interface FacetScore {
  axis: AxisKey;
  facet: string;
  preferredPole: AxisPole;
  score: number;
  percent: number;
  strengthLabel: string;
}

export interface AnswerEvidence {
  questionId: number;
  questionCode: string;
  response: AnswerValue;
  normalizedScore: number;
  directionalScore: number;
  axis: AxisKey;
  facet: string;
  keyedPole: AxisPole;
}

export interface TrueSelf16Profile {
  code: TypeCode;
  name: string;
  family?: TypeFamily;
  tagline: string;
  description: string;
  strengths: string[];
  blindSpots: string[];
  growthPath: string[];
  relationshipStyle: string;
  workStyle: string;
  suggestedNextSteps: string[];
}

export interface TypeFamilyDefinition {
  code: TypeFamily;
  name: string;
  summary: string;
}

export interface CognitiveFunctionDefinition {
  code: CognitiveFunction;
  name: string;
  summary: string;
}

export interface FunctionStackItem {
  role: FunctionRole;
  function: CognitiveFunction;
}

export type FunctionStack = [
  FunctionStackItem,
  FunctionStackItem,
  FunctionStackItem,
  FunctionStackItem,
];

export interface FunctionDevelopment {
  role: FunctionRole;
  function: CognitiveFunction;
  name: string;
  score: number;
  health: FunctionHealth;
  insight: string;
}

export type BehaviouralTraitScores = Record<BehaviouralTraitKey, number>;

export interface ContextualSelfItem {
  key: ContextualSelfKey;
  title: string;
  summary: string;
  score: number;
}

export type ContextualSelfProfile = Record<ContextualSelfKey, ContextualSelfItem>;

export interface TrueSelf16Result {
  typeCode: TypeCode;
  typeName: string;
  family: TypeFamilyDefinition;
  tagline: string;
  description: string;
  axisScores: Record<AxisKey, AxisScore>;
  confidence: "high" | "medium" | "low";
  confidenceScore: number;
  closestType: TypeCode;
  facetScores: Record<AxisKey, FacetScore[]>;
  answerEvidence: AnswerEvidence[];
  functionStack: FunctionStack;
  functionDevelopment?: FunctionDevelopment[];
  variant?: PersonalityVariant;
  behaviouralTraits?: BehaviouralTraitScores;
  contextualSelf?: ContextualSelfProfile;
  strengths: string[];
  blindSpots: string[];
  growthPath: string[];
  relationshipStyle: string;
  workStyle: string;
  suggestedNextSteps: string[];
}
