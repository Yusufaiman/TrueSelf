import { AXES, TRUESELF_16_PROFILES, TRUESELF_16_QUESTIONS } from "./data";
import { ENNEAGRAM_CORE_PATTERNS } from "./enneagram";
import { TRUESELF_64_EXPRESSIONS } from "./expressions";
import {
  COGNITIVE_FUNCTIONS,
  CONTEXT_LABELS,
  FUNCTION_STACKS,
  ROLE_LABELS,
  TRAIT_QUESTION_WEIGHTS,
  TYPE_FAMILIES,
  TYPE_FAMILY_BY_CODE,
} from "./layers";
import type {
  AnswerValue,
  AxisKey,
  AxisScore,
  BehaviouralTraitKey,
  BehaviouralTraitScores,
  CognitiveFunction,
  ContextualSelfItem,
  ContextualSelfKey,
  ContextualSelfProfile,
  EnneagramCode,
  EnneagramComponent,
  EnneagramCoreType,
  EnneagramTypeScore,
  ExpressionAxisKey,
  ExpressionAxisScore,
  ExpressionPole,
  ExpressionSuffix,
  FacetScore,
  FunctionDevelopment,
  FunctionHealth,
  PersonalityVariant,
  TrueSelfEnneagramResult,
  TrueSelfExpressionResult,
  TrueSelf16Result,
  TypeCode,
} from "./types";

const axisOrder: AxisKey[] = ["EI", "SN", "TF", "JP"];
const traitKeys: BehaviouralTraitKey[] = [
  "emotionalStability",
  "socialExpression",
  "adaptability",
  "discipline",
  "stressResponse",
  "confidence",
];
const expressionAxisOrder: ExpressionAxisKey[] = ["AO", "CH"];
const enneagramTypes: EnneagramCoreType[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const enneagramComponents: EnneagramComponent[] = [
  "desire",
  "fear",
  "coping",
  "behavior",
];

const expressionAxes: Record<
  ExpressionAxisKey,
  {
    firstCode: ExpressionPole;
    secondCode: ExpressionPole;
    positiveCode: ExpressionPole;
    negativeCode: ExpressionPole;
    firstLabel: string;
    secondLabel: string;
  }
> = {
  AO: {
    firstCode: "A",
    secondCode: "O",
    positiveCode: "A",
    negativeCode: "O",
    firstLabel: "Assertive",
    secondLabel: "Observant",
  },
  CH: {
    firstCode: "C",
    secondCode: "H",
    positiveCode: "C",
    negativeCode: "H",
    firstLabel: "Controlled",
    secondLabel: "Harmonizing",
  },
};

const adjacentWings: Record<EnneagramCoreType, [EnneagramCoreType, EnneagramCoreType]> = {
  1: [9, 2],
  2: [1, 3],
  3: [2, 4],
  4: [3, 5],
  5: [4, 6],
  6: [5, 7],
  7: [6, 8],
  8: [7, 9],
  9: [8, 1],
};

const enneagramWeights: Record<EnneagramComponent, number> = {
  desire: 0.35,
  fear: 0.3,
  coping: 0.2,
  behavior: 0.15,
};

function clampPercent(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function getStrengthLabel(percent: number) {
  if (percent >= 85) return "Very strong preference";
  if (percent >= 75) return "Clear preference";
  if (percent >= 65) return "Moderate preference";
  if (percent >= 55) return "Slight preference";
  return "Very balanced";
}

function getAxisConfidence(clarity: number, consistency: number) {
  const confidenceScore = Math.round((clarity * 0.75 + consistency * 0.25));
  if (confidenceScore >= 70) return "high";
  if (confidenceScore >= 40) return "medium";
  return "low";
}

function getSimpleConfidence(score: number): "high" | "medium" | "low" {
  if (score >= 70) return "high";
  if (score >= 40) return "medium";
  return "low";
}

function getConfidence(clarityScores: number[]): {
  confidence: TrueSelf16Result["confidence"];
  confidenceScore: number;
} {
  const confidenceScore = Math.round(
    clarityScores.reduce((sum, score) => sum + score, 0) / clarityScores.length,
  );

  if (confidenceScore >= 55) {
    return { confidence: "high", confidenceScore };
  }

  if (confidenceScore >= 28) {
    return { confidence: "medium", confidenceScore };
  }

  return { confidence: "low", confidenceScore };
}

function average(values: number[]) {
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function averageOrNeutral(values: number[]) {
  if (!values.length) return 50;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function calculateExpressionAxis(
  answers: Record<number, AnswerValue>,
  axis: ExpressionAxisKey,
): ExpressionAxisScore {
  const definition = expressionAxes[axis];
  let total = 0;
  let max = 0;

  TRUESELF_16_QUESTIONS.forEach((question) => {
    if (
      question.layer !== "expression" ||
      question.expressionAxis !== axis ||
      !question.expressionKeyedPole
    ) {
      return;
    }

    const answer = answers[question.id] ?? 4;
    const normalizedScore = answer - 4;
    const keyedPositive =
      question.expressionKeyedPole === definition.positiveCode;
    const directionalScore = keyedPositive ? normalizedScore : -normalizedScore;

    total += directionalScore * question.weight;
    max += 3 * question.weight;
  });

  const safeMax = max || 1;
  const positivePercent = ((total / safeMax + 1) / 2) * 100;
  const firstPercent =
    definition.firstCode === definition.positiveCode
      ? clampPercent(positivePercent)
      : clampPercent(100 - positivePercent);
  const secondPercent = 100 - firstPercent;
  const preference =
    total >= 0 ? definition.positiveCode : definition.negativeCode;
  const preferencePercent =
    preference === definition.firstCode ? firstPercent : secondPercent;
  const preferenceLabel =
    preference === definition.firstCode
      ? definition.firstLabel
      : definition.secondLabel;
  const clarity = Math.abs(preferencePercent - 50) * 2;

  return {
    axis,
    firstCode: definition.firstCode,
    secondCode: definition.secondCode,
    firstLabel: definition.firstLabel,
    secondLabel: definition.secondLabel,
    firstPercent,
    secondPercent,
    preference,
    preferenceLabel,
    preferencePercent,
    clarity,
    rawScore: total,
    maxScore: safeMax,
    strengthLabel: getStrengthLabel(preferencePercent),
    confidence: getSimpleConfidence(clarity),
  };
}

function getExpressionResult(
  answers: Record<number, AnswerValue>,
  typeCode: TypeCode,
): TrueSelfExpressionResult {
  const assertion = calculateExpressionAxis(answers, "AO");
  const orientation = calculateExpressionAxis(answers, "CH");
  const suffix = `${assertion.preference}${orientation.preference}` as ExpressionSuffix;
  const expressions = TRUESELF_64_EXPRESSIONS[typeCode];
  const expression =
    expressions.find((item) => item.suffix === suffix) ?? expressions[0];
  const confidenceScore = average([assertion.clarity, orientation.clarity]);
  const weakestAxis = assertion.clarity <= orientation.clarity ? "AO" : "CH";
  const closestSuffix =
    weakestAxis === "AO"
      ? `${assertion.preference === "A" ? "O" : "A"}${orientation.preference}`
      : `${assertion.preference}${orientation.preference === "C" ? "H" : "C"}`;
  const closestExpression = `${typeCode}-${closestSuffix}` as `${TypeCode}-${ExpressionSuffix}`;

  return {
    code: expression.code,
    suffix,
    archetype: expression.archetype,
    description: expression.description,
    tendency: expression.tendency,
    chips: expression.chips,
    assertion,
    orientation,
    confidence: getSimpleConfidence(confidenceScore),
    confidenceScore,
    closestExpression,
  };
}

function getEnneagramCode(
  coreType: EnneagramCoreType,
  wing: EnneagramCoreType,
): EnneagramCode {
  return `${coreType}w${wing}` as EnneagramCode;
}

function getEnneagramResult(
  answers: Record<number, AnswerValue>,
): TrueSelfEnneagramResult {
  const buckets = enneagramTypes.reduce((result, type) => {
    result[type] = {
      desire: [],
      fear: [],
      coping: [],
      behavior: [],
    };
    return result;
  }, {} as Record<EnneagramCoreType, Record<EnneagramComponent, number[]>>);

  TRUESELF_16_QUESTIONS.forEach((question) => {
    if (
      question.layer !== "enneagram" ||
      !question.enneagramType ||
      !question.enneagramComponent
    ) {
      return;
    }

    const answer = answers[question.id] ?? 4;
    const score = ((answer - 1) / 6) * 100;
    buckets[question.enneagramType][question.enneagramComponent].push(score);
  });

  const typeScores = enneagramTypes
    .map((type): EnneagramTypeScore => {
      const componentScores = enneagramComponents.reduce((result, component) => {
        result[component] = averageOrNeutral(buckets[type][component]);
        return result;
      }, {} as Record<EnneagramComponent, number>);
      const score = clampPercent(
        enneagramComponents.reduce(
          (sum, component) =>
            sum + componentScores[component] * enneagramWeights[component],
          0,
        ),
      );

      return {
        type,
        score,
        desire: componentScores.desire,
        fear: componentScores.fear,
        coping: componentScores.coping,
        behavior: componentScores.behavior,
      };
    })
    .sort((a, b) => b.score - a.score);

  const core = typeScores[0] ?? {
    type: 9 as EnneagramCoreType,
    score: 50,
    desire: 50,
    fear: 50,
    coping: 50,
    behavior: 50,
  };
  const second = typeScores[1] ?? core;
  const wingOptions = adjacentWings[core.type];
  const leftWing = typeScores.find((item) => item.type === wingOptions[0]) ?? core;
  const rightWing = typeScores.find((item) => item.type === wingOptions[1]) ?? core;
  const wing = leftWing.score >= rightWing.score ? leftWing.type : rightWing.type;
  const wingScore = Math.max(leftWing.score, rightWing.score);
  const wingTotal = Math.max(1, leftWing.score + rightWing.score);
  const wingBalance = clampPercent((wingScore / wingTotal) * 100);
  const code = getEnneagramCode(core.type, wing);
  const pattern = ENNEAGRAM_CORE_PATTERNS[code];
  const margin = Math.max(0, core.score - second.score);
  const confidenceScore = clampPercent(core.score * 0.75 + Math.min(25, margin * 2.5));

  return {
    code,
    coreType: core.type,
    wing,
    coreScore: core.score,
    wingScore,
    wingBalance,
    confidence: getSimpleConfidence(confidenceScore),
    confidenceScore,
    typeScores,
    drive: pattern.drive,
    fear: pattern.fear,
    decision: pattern.decision,
    pressure: pattern.pressure,
    socialStyle: pattern.socialStyle,
    contribution: pattern.contribution,
  };
}

function getAxisSidePercent(axisScores: Record<AxisKey, AxisScore>, code: string) {
  const axis = axisOrder.find(
    (candidate) =>
      axisScores[candidate].firstCode === code ||
      axisScores[candidate].secondCode === code,
  );

  if (!axis) {
    return 50;
  }

  return axisScores[axis].firstCode === code
    ? axisScores[axis].firstPercent
    : axisScores[axis].secondPercent;
}

function calculateBehaviouralTraits(
  answers: Record<number, AnswerValue>,
): BehaviouralTraitScores {
  const totals = traitKeys.reduce(
    (result, key) => ({ ...result, [key]: 0 }),
    {} as Record<BehaviouralTraitKey, number>,
  );
  const max = traitKeys.reduce(
    (result, key) => ({ ...result, [key]: 0 }),
    {} as Record<BehaviouralTraitKey, number>,
  );

  TRUESELF_16_QUESTIONS.forEach((question) => {
    const weights = TRAIT_QUESTION_WEIGHTS[question.id];

    if (!weights) {
      return;
    }

    const answer = answers[question.id] ?? 4;
    const centered = (answer - 4) / 3;

    Object.entries(weights).forEach(([trait, weight]) => {
      const key = trait as BehaviouralTraitKey;
      totals[key] += centered * weight;
      max[key] += Math.abs(weight);
    });
  });

  return traitKeys.reduce((result, key) => {
    result[key] =
      max[key] > 0 ? clampPercent(((totals[key] / max[key] + 1) / 2) * 100) : 50;
    return result;
  }, {} as BehaviouralTraitScores);
}

function getFunctionScore(
  func: CognitiveFunction,
  axisScores: Record<AxisKey, AxisScore>,
  traits: BehaviouralTraitScores,
) {
  const scores: Record<CognitiveFunction, number> = {
    Se: average([
      getAxisSidePercent(axisScores, "S"),
      getAxisSidePercent(axisScores, "E"),
      getAxisSidePercent(axisScores, "P"),
      traits.adaptability,
      traits.socialExpression,
    ]),
    Si: average([
      getAxisSidePercent(axisScores, "S"),
      getAxisSidePercent(axisScores, "I"),
      getAxisSidePercent(axisScores, "J"),
      traits.discipline,
      traits.emotionalStability,
    ]),
    Ne: average([
      getAxisSidePercent(axisScores, "N"),
      getAxisSidePercent(axisScores, "E"),
      getAxisSidePercent(axisScores, "P"),
      traits.adaptability,
      traits.confidence,
    ]),
    Ni: average([
      getAxisSidePercent(axisScores, "N"),
      getAxisSidePercent(axisScores, "I"),
      getAxisSidePercent(axisScores, "J"),
      traits.confidence,
      traits.discipline,
    ]),
    Te: average([
      getAxisSidePercent(axisScores, "T"),
      getAxisSidePercent(axisScores, "E"),
      getAxisSidePercent(axisScores, "J"),
      traits.discipline,
      traits.confidence,
    ]),
    Ti: average([
      getAxisSidePercent(axisScores, "T"),
      getAxisSidePercent(axisScores, "I"),
      getAxisSidePercent(axisScores, "P"),
      traits.confidence,
      traits.emotionalStability,
    ]),
    Fe: average([
      getAxisSidePercent(axisScores, "F"),
      getAxisSidePercent(axisScores, "E"),
      traits.socialExpression,
      traits.emotionalStability,
      traits.stressResponse,
    ]),
    Fi: average([
      getAxisSidePercent(axisScores, "F"),
      getAxisSidePercent(axisScores, "I"),
      traits.emotionalStability,
      traits.confidence,
      100 - traits.socialExpression / 2,
    ]),
  };

  return scores[func];
}

function getFunctionHealth(role: FunctionDevelopment["role"], score: number): FunctionHealth {
  if (role === "dominant" && score >= 84) {
    return "overused";
  }

  if (score >= 72) {
    return role === "inferior" ? "balanced" : "developed";
  }

  if (score >= 48) {
    return "balanced";
  }

  return "underdeveloped";
}

function getFunctionInsight(
  role: FunctionDevelopment["role"],
  func: CognitiveFunction,
  score: number,
  health: FunctionHealth,
) {
  const roleLabel = ROLE_LABELS[role].toLowerCase();
  const definition = COGNITIVE_FUNCTIONS[func];

  if (health === "overused") {
    return `Your ${roleLabel} ${func} is very active. It gives you power, but may crowd out your lower functions.`;
  }

  if (health === "underdeveloped") {
    return `Your ${roleLabel} ${func} needs more conscious practice. Start with small, low-pressure situations.`;
  }

  if (score >= 72) {
    return `Your ${roleLabel} ${func} is a reliable strength: ${definition.summary}`;
  }

  return `Your ${roleLabel} ${func} is present but situational. It works best when supported by your stronger functions.`;
}

function buildFunctionDevelopment(
  typeCode: TypeCode,
  axisScores: Record<AxisKey, AxisScore>,
  traits: BehaviouralTraitScores,
): FunctionDevelopment[] {
  return FUNCTION_STACKS[typeCode].map((stackItem) => {
    const score = getFunctionScore(stackItem.function, axisScores, traits);
    const health = getFunctionHealth(stackItem.role, score);

    return {
      role: stackItem.role,
      function: stackItem.function,
      name: COGNITIVE_FUNCTIONS[stackItem.function].name,
      score,
      health,
      insight: getFunctionInsight(stackItem.role, stackItem.function, score, health),
    };
  });
}

function getVariant(traits: BehaviouralTraitScores): PersonalityVariant {
  const stableIndex = average([
    traits.emotionalStability,
    traits.confidence,
    traits.discipline,
    traits.stressResponse,
  ]);
  const adaptiveIndex = average([
    traits.adaptability,
    traits.socialExpression,
    100 - Math.abs(traits.stressResponse - 55),
    100 - Math.abs(traits.confidence - 55),
  ]);

  return stableIndex >= adaptiveIndex ? "Stable" : "Adaptive";
}

function contextItem(
  key: ContextualSelfKey,
  score: number,
  summary: string,
): ContextualSelfItem {
  return {
    key,
    title: CONTEXT_LABELS[key],
    score: clampPercent(score),
    summary,
  };
}

function buildContextualSelf(
  typeCode: TypeCode,
  variant: PersonalityVariant,
  axisScores: Record<AxisKey, AxisScore>,
  traits: BehaviouralTraitScores,
  functionDevelopment: FunctionDevelopment[],
): ContextualSelfProfile {
  const dominant = functionDevelopment[0];
  const inferior = functionDevelopment[3];
  const eScore = getAxisSidePercent(axisScores, "E");
  const fScore = getAxisSidePercent(axisScores, "F");
  const tScore = getAxisSidePercent(axisScores, "T");
  const jScore = getAxisSidePercent(axisScores, "J");

  return {
    core: contextItem(
      "core",
      average([traits.confidence, dominant.score, axisScores.EI.clarity]),
      `Your core pattern is ${typeCode}: led by ${dominant.function}, with a ${variant.toLowerCase()} expression style.`,
    ),
    social: contextItem(
      "social",
      average([traits.socialExpression, eScore, traits.emotionalStability]),
      eScore >= 55
        ? "Around people, you tend to externalize energy, test ideas aloud, and respond to the room."
        : "Around people, you tend to conserve energy, observe carefully, and choose depth over volume.",
    ),
    work: contextItem(
      "work",
      average([traits.discipline, traits.confidence, tScore, jScore]),
      "At work, your best output comes when your natural decision style is paired with enough structure to finish.",
    ),
    relationship: contextItem(
      "relationship",
      average([traits.emotionalStability, traits.socialExpression, fScore]),
      "In relationships, your pattern shows how emotional awareness and expression shape trust, conflict, and closeness.",
    ),
    stress: contextItem(
      "stress",
      average([traits.stressResponse, traits.emotionalStability, 100 - inferior.score / 2]),
      `Under pressure, your inferior ${inferior.function} can become the growth edge that needs patience and support.`,
    ),
    growth: contextItem(
      "growth",
      average([traits.adaptability, traits.confidence, inferior.score]),
      `Your growth path is not changing type, but developing ${inferior.function} without losing your dominant ${dominant.function}.`,
    ),
  };
}

export function calculateTrueSelf16Result(
  answers: Record<number, AnswerValue>,
): TrueSelf16Result {
  const axisTotals: Record<AxisKey, number> = {
    EI: 0,
    SN: 0,
    TF: 0,
    JP: 0,
  };

  const axisMax: Record<AxisKey, number> = {
    EI: 0,
    SN: 0,
    TF: 0,
    JP: 0,
  };
  const facetTotals: Record<AxisKey, Record<string, number>> = {
    EI: {},
    SN: {},
    TF: {},
    JP: {},
  };
  const facetMax: Record<AxisKey, Record<string, number>> = {
    EI: {},
    SN: {},
    TF: {},
    JP: {},
  };
  const answerEvidence: TrueSelf16Result["answerEvidence"] = [];

  TRUESELF_16_QUESTIONS.forEach((question) => {
    if (
      question.layer !== "core" ||
      !question.axis ||
      !question.keyedPole ||
      !question.positivePole ||
      !question.negativePole
    ) {
      return;
    }

    const answer = answers[question.id] ?? 4;
    const normalizedScore = answer - 4;
    const keyedPositive = question.keyedPole === question.positivePole;
    const directionalScore = keyedPositive ? normalizedScore : -normalizedScore;

    axisTotals[question.axis] += directionalScore * question.weight;
    axisMax[question.axis] += 3 * question.weight;
    facetTotals[question.axis][question.facet] =
      (facetTotals[question.axis][question.facet] ?? 0) +
      directionalScore * question.weight;
    facetMax[question.axis][question.facet] =
      (facetMax[question.axis][question.facet] ?? 0) + 3 * question.weight;
    answerEvidence.push({
      questionId: question.id,
      questionCode: question.code,
      response: answer,
      normalizedScore,
      directionalScore,
      axis: question.axis,
      facet: question.facet,
      keyedPole: question.keyedPole,
    });
  });

  const axisScores = axisOrder.reduce(
    (scores, axis) => {
      const definition = AXES[axis];
      const max = axisMax[axis] || 1;
      const positivePercent = ((axisTotals[axis] / max + 1) / 2) * 100;
      const firstPercent =
        definition.firstCode === definition.positiveCode
          ? clampPercent(positivePercent)
          : clampPercent(100 - positivePercent);
      const secondPercent = 100 - firstPercent;
      const preference =
        axisTotals[axis] >= 0
          ? definition.positiveCode
          : definition.negativeCode;
      const preferencePercent =
        preference === definition.firstCode ? firstPercent : secondPercent;
      const preferenceLabel =
        preference === definition.firstCode
          ? definition.firstLabel
          : definition.secondLabel;
      const clarity = Math.abs(preferencePercent - 50) * 2;
      const consistency = 100;

      scores[axis] = {
        axis,
        firstCode: definition.firstCode,
        secondCode: definition.secondCode,
        firstLabel: definition.firstLabel,
        secondLabel: definition.secondLabel,
        firstPercent,
        secondPercent,
        preference,
        preferenceLabel,
        clarity,
        rawScore: axisTotals[axis],
        maxScore: max,
        preferencePercent,
        strengthLabel: getStrengthLabel(preferencePercent),
        confidence: getAxisConfidence(clarity, consistency),
        consistency,
      };

      return scores;
    },
    {} as Record<AxisKey, AxisScore>,
  );

  const typeCode = axisOrder
    .map((axis) => axisScores[axis].preference)
    .join("") as TypeCode;
  const closestAxis = [...axisOrder].sort(
    (a, b) => axisScores[a].clarity - axisScores[b].clarity,
  )[0];
  const closestType = axisOrder
    .map((axis) => {
      if (axis !== closestAxis) return axisScores[axis].preference;
      const definition = AXES[axis];
      return axisScores[axis].preference === definition.firstCode
        ? definition.secondCode
        : definition.firstCode;
    })
    .join("") as TypeCode;
  const facetScores = axisOrder.reduce((result, axis) => {
    const definition = AXES[axis];
    result[axis] = Object.entries(facetTotals[axis]).map(([facet, score]) => {
      const max = facetMax[axis][facet] || 1;
      const positivePercent = ((score / max + 1) / 2) * 100;
      const preferredPole =
        score >= 0 ? definition.positiveCode : definition.negativeCode;
      const percent =
        preferredPole === definition.positiveCode
          ? positivePercent
          : 100 - positivePercent;

      return {
        axis,
        facet,
        preferredPole,
        score,
        percent: clampPercent(percent),
        strengthLabel: getStrengthLabel(percent),
      };
    });
    return result;
  }, {} as Record<AxisKey, FacetScore[]>);
  const profile = TRUESELF_16_PROFILES[typeCode];
  const family = TYPE_FAMILIES[TYPE_FAMILY_BY_CODE[typeCode]];
  const functionStack = FUNCTION_STACKS[typeCode];
  const { confidence, confidenceScore } = getConfidence(
    axisOrder.map((axis) => axisScores[axis].clarity),
  );
  const expression = getExpressionResult(answers, typeCode);
  const enneagram = getEnneagramResult(answers);

  return {
    typeCode,
    typeName: profile.name,
    family,
    tagline: profile.tagline,
    description: profile.description,
    axisScores,
    confidence,
    confidenceScore,
    closestType,
    facetScores,
    answerEvidence,
    functionStack,
    expression,
    enneagram,
    strengths: profile.strengths,
    blindSpots: profile.blindSpots,
    growthPath: profile.growthPath,
    relationshipStyle: profile.relationshipStyle,
    workStyle: profile.workStyle,
    suggestedNextSteps: profile.suggestedNextSteps,
  };
}

export function getTrueSelf16ScoresForStorage(result: TrueSelf16Result) {
  return {
    EI: result.axisScores.EI.firstPercent,
    SN: result.axisScores.SN.firstPercent,
    TF: result.axisScores.TF.firstPercent,
    JP: result.axisScores.JP.firstPercent,
    confidenceScore: result.confidenceScore,
    expressionConfidenceScore: result.expression?.confidenceScore ?? 0,
    enneagramConfidenceScore: result.enneagram?.confidenceScore ?? 0,
  };
}

export function getAllTrueSelf16Profiles() {
  return Object.values(TRUESELF_16_PROFILES);
}
