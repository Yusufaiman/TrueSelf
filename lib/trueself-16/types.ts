export type AxisKey = "EI" | "SN" | "TF" | "JP";
export type AxisPole = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
export type TrueSelfQuestionLayer = "core" | "expression" | "enneagram";
export type ExpressionAxisKey = "AO" | "CH";
export type ExpressionPole = "A" | "O" | "C" | "H";
export type ExpressionSuffix = "AC" | "AH" | "OC" | "OH";
export type EnneagramCoreType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type EnneagramComponent = "desire" | "fear" | "coping" | "behavior";
export type EnneagramCode =
  | "1w9"
  | "1w2"
  | "2w1"
  | "2w3"
  | "3w2"
  | "3w4"
  | "4w3"
  | "4w5"
  | "5w4"
  | "5w6"
  | "6w5"
  | "6w7"
  | "7w6"
  | "7w8"
  | "8w7"
  | "8w9"
  | "9w1"
  | "9w8";
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
  layer: TrueSelfQuestionLayer;
  axis?: AxisKey;
  keyedPole?: AxisPole;
  positivePole?: AxisPole;
  negativePole?: AxisPole;
  facet: string;
  expressionAxis?: ExpressionAxisKey;
  expressionKeyedPole?: ExpressionPole;
  enneagramType?: EnneagramCoreType;
  enneagramComponent?: EnneagramComponent;
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

export interface ExpressionAxisScore {
  axis: ExpressionAxisKey;
  firstCode: ExpressionPole;
  secondCode: ExpressionPole;
  firstLabel: string;
  secondLabel: string;
  firstPercent: number;
  secondPercent: number;
  preference: ExpressionPole;
  preferenceLabel: string;
  preferencePercent: number;
  clarity: number;
  rawScore: number;
  maxScore: number;
  strengthLabel: string;
  confidence: "high" | "medium" | "low";
}

export interface TrueSelfExpressionResult {
  code: `${TypeCode}-${ExpressionSuffix}`;
  suffix: ExpressionSuffix;
  archetype: string;
  description: string;
  tendency: string;
  chips: string[];
  assertion: ExpressionAxisScore;
  orientation: ExpressionAxisScore;
  confidence: "high" | "medium" | "low";
  confidenceScore: number;
  closestExpression: `${TypeCode}-${ExpressionSuffix}`;
}

export interface EnneagramTypeScore {
  type: EnneagramCoreType;
  score: number;
  desire: number;
  fear: number;
  coping: number;
  behavior: number;
}

export interface TrueSelfEnneagramResult {
  code: EnneagramCode;
  coreType: EnneagramCoreType;
  wing: EnneagramCoreType;
  coreScore: number;
  wingScore: number;
  wingBalance: number;
  confidence: "high" | "medium" | "low";
  confidenceScore: number;
  typeScores: EnneagramTypeScore[];
  drive: string;
  fear: string;
  decision: string;
  pressure: string;
  socialStyle: string;
  contribution: string[];
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
  expression?: TrueSelfExpressionResult;
  enneagram?: TrueSelfEnneagramResult;
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
