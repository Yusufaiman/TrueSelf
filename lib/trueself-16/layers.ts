import type {
  BehaviouralTraitKey,
  CognitiveFunction,
  CognitiveFunctionDefinition,
  ContextualSelfKey,
  FunctionRole,
  FunctionStack,
  TypeCode,
  TypeFamily,
  TypeFamilyDefinition,
} from "./types";

export const TYPE_FAMILIES: Record<TypeFamily, TypeFamilyDefinition> = {
  NT: {
    code: "NT",
    name: "Analysts",
    summary: "Strategic, conceptual, logical, and systems-oriented.",
  },
  NF: {
    code: "NF",
    name: "Diplomats",
    summary: "Meaning-driven, people-aware, idealistic, and emotionally perceptive.",
  },
  SJ: {
    code: "SJ",
    name: "Sentinels",
    summary: "Stable, responsible, structured, reliable, and duty-aware.",
  },
  SP: {
    code: "SP",
    name: "Explorers",
    summary: "Action-oriented, adaptive, experiential, spontaneous, and present-focused.",
  },
};

export const TYPE_FAMILY_BY_CODE: Record<TypeCode, TypeFamily> = {
  INTJ: "NT",
  INTP: "NT",
  ENTJ: "NT",
  ENTP: "NT",
  INFJ: "NF",
  INFP: "NF",
  ENFJ: "NF",
  ENFP: "NF",
  ISTJ: "SJ",
  ISFJ: "SJ",
  ESTJ: "SJ",
  ESFJ: "SJ",
  ISTP: "SP",
  ISFP: "SP",
  ESTP: "SP",
  ESFP: "SP",
};

export const COGNITIVE_FUNCTIONS: Record<
  CognitiveFunction,
  CognitiveFunctionDefinition
> = {
  Se: {
    code: "Se",
    name: "Extraverted Sensing",
    summary: "Real-time environment, experience, action, and responsiveness.",
  },
  Si: {
    code: "Si",
    name: "Introverted Sensing",
    summary: "Past experience, familiarity, detail, stability, and continuity.",
  },
  Ne: {
    code: "Ne",
    name: "Extraverted Intuition",
    summary: "Possibilities, connections, ideas, novelty, and divergent thinking.",
  },
  Ni: {
    code: "Ni",
    name: "Introverted Intuition",
    summary: "Patterns, direction, underlying meaning, and long-range vision.",
  },
  Te: {
    code: "Te",
    name: "Extraverted Thinking",
    summary: "Efficiency, systems, measurable results, and external execution.",
  },
  Ti: {
    code: "Ti",
    name: "Introverted Thinking",
    summary: "Internal logic, accuracy, frameworks, and independent analysis.",
  },
  Fe: {
    code: "Fe",
    name: "Extraverted Feeling",
    summary: "Social harmony, emotional atmosphere, people, and shared values.",
  },
  Fi: {
    code: "Fi",
    name: "Introverted Feeling",
    summary: "Personal values, authenticity, internal morality, and identity.",
  },
};

const stack = (
  dominant: CognitiveFunction,
  auxiliary: CognitiveFunction,
  tertiary: CognitiveFunction,
  inferior: CognitiveFunction,
): FunctionStack => [
  { role: "dominant", function: dominant },
  { role: "auxiliary", function: auxiliary },
  { role: "tertiary", function: tertiary },
  { role: "inferior", function: inferior },
];

export const FUNCTION_STACKS: Record<TypeCode, FunctionStack> = {
  ISTJ: stack("Si", "Te", "Fi", "Ne"),
  ISFJ: stack("Si", "Fe", "Ti", "Ne"),
  INFJ: stack("Ni", "Fe", "Ti", "Se"),
  INTJ: stack("Ni", "Te", "Fi", "Se"),
  ISTP: stack("Ti", "Se", "Ni", "Fe"),
  ISFP: stack("Fi", "Se", "Ni", "Te"),
  INFP: stack("Fi", "Ne", "Si", "Te"),
  INTP: stack("Ti", "Ne", "Si", "Fe"),
  ESTP: stack("Se", "Ti", "Fe", "Ni"),
  ESFP: stack("Se", "Fi", "Te", "Ni"),
  ENFP: stack("Ne", "Fi", "Te", "Si"),
  ENTP: stack("Ne", "Ti", "Fe", "Si"),
  ESTJ: stack("Te", "Si", "Ne", "Fi"),
  ESFJ: stack("Fe", "Si", "Ne", "Ti"),
  ENFJ: stack("Fe", "Ni", "Se", "Ti"),
  ENTJ: stack("Te", "Ni", "Se", "Fi"),
};

export const ROLE_LABELS: Record<FunctionRole, string> = {
  dominant: "Dominant",
  auxiliary: "Auxiliary",
  tertiary: "Tertiary",
  inferior: "Inferior",
};

export const TRAIT_LABELS: Record<BehaviouralTraitKey, string> = {
  emotionalStability: "Emotional Stability",
  socialExpression: "Social Expression",
  adaptability: "Adaptability",
  discipline: "Discipline",
  stressResponse: "Stress Response",
  confidence: "Confidence",
};

export const CONTEXT_LABELS: Record<ContextualSelfKey, string> = {
  core: "Core Self",
  social: "Social Self",
  work: "Work Self",
  relationship: "Relationship Self",
  stress: "Stress Self",
  growth: "Growth Self",
};

export const TRAIT_QUESTION_WEIGHTS: Record<
  number,
  Partial<Record<BehaviouralTraitKey, number>>
> = {
  1: { socialExpression: 1 },
  2: { emotionalStability: 0.8, stressResponse: -0.8 },
  7: { discipline: 1, stressResponse: -0.3 },
  8: { adaptability: 0.8, confidence: 0.4 },
  9: { socialExpression: 1, confidence: 0.5 },
  10: { emotionalStability: 0.4, confidence: 0.4 },
  13: { emotionalStability: 0.8, confidence: 0.6 },
  15: { discipline: 0.9 },
  16: { adaptability: 1 },
  17: { socialExpression: 1, confidence: 0.4 },
  18: { stressResponse: -1, emotionalStability: -0.6 },
  20: { adaptability: 0.8 },
  23: { discipline: 0.9, confidence: 0.3 },
  24: { adaptability: 0.8, discipline: -0.3 },
  25: { socialExpression: 0.9 },
  26: { emotionalStability: 0.6 },
  27: { discipline: 0.7, emotionalStability: 0.3 },
  28: { adaptability: 0.8, confidence: 0.3 },
  30: { emotionalStability: 0.6, socialExpression: 0.4 },
  31: { discipline: 1 },
  32: { adaptability: 1, discipline: -0.3 },
  33: { socialExpression: 1, confidence: 0.5 },
  34: { stressResponse: -0.4, emotionalStability: 0.5 },
  36: { adaptability: 0.6 },
  37: { confidence: 0.7, emotionalStability: 0.2 },
  38: { emotionalStability: 0.7, confidence: 0.3 },
  39: { discipline: 0.8, stressResponse: -0.5 },
  40: { adaptability: 0.8, confidence: 0.2 },
};
