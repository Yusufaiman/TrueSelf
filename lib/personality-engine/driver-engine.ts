// Driver Scoring Engine for "What Drives You" Test

import { DriverType, DRIVER_QUESTIONS } from "./drivers-questions";

export type { DriverType };
export type AnswerValue = 1 | 2 | 3 | 4 | 5;

export interface DriverScores {
  growth: number;
  control: number;
  meaning: number;
  freedom: number;
  emotional: number;
  validation: number;
}

export interface DriverResult {
  drivers: DriverScores;
  primaryDriver: DriverType;
  secondaryDriver: DriverType;
  label: string;
  conflicts: string[];
  identityTypes: string[];
  personalityTypes: string[];
  insights: string[];
}

const DRIVER_LABELS: Record<DriverType, string> = {
  growth: "Growth",
  control: "Control",
  meaning: "Meaning",
  freedom: "Freedom",
  emotional: "Emotion",
  validation: "Validation",
};

const MAX_SCORES: Record<DriverType, number> = {
  growth: 6,
  control: 6,
  meaning: 6,
  freedom: 6,
  emotional: 4,
  validation: 4,
};

export function calculateDriverScores(
  responses: Record<number, AnswerValue>,
): DriverScores {
  const rawScores: DriverScores = {
    growth: 0,
    control: 0,
    meaning: 0,
    freedom: 0,
    emotional: 0,
    validation: 0,
  };

  // Convert answers to scores: strongly_disagree=-2, disagree=-1, neutral=0, agree=+1, strongly_agree=+2
  const scoreMap: Record<AnswerValue, number> = {
    1: -2, // strongly disagree
    2: -1, // disagree
    3: 0, // neutral
    4: 1, // agree
    5: 2, // strongly agree
  };

  // Sum scores per driver
  DRIVER_QUESTIONS.forEach((question) => {
    const answer = responses[question.id] as AnswerValue;
    if (answer !== undefined && answer !== null) {
      const score = scoreMap[answer];
      rawScores[question.driver] += score;
    }
  });

  return rawScores;
}

export function normalizeDriverScores(rawScores: DriverScores): DriverScores {
  const normalized: DriverScores = {
    growth: 0,
    control: 0,
    meaning: 0,
    freedom: 0,
    emotional: 0,
    validation: 0,
  };

  Object.entries(rawScores).forEach(([driver, score]) => {
    const driverKey = driver as DriverType;
    const max = MAX_SCORES[driverKey];
    // Normalization: ((score + max) / (2 * max)) * 100
    normalized[driverKey] = ((score + max) / (2 * max)) * 100;
  });

  return normalized;
}

function detectConflicts(drivers: DriverScores): string[] {
  const conflicts: string[] = [];

  if (drivers.growth > 70 && drivers.control > 70) {
    conflicts.push(
      "You want growth, but also seek certainty and control. This tension creates pressure.",
    );
  }

  if (drivers.freedom > 70 && drivers.control > 70) {
    conflicts.push(
      "You crave freedom, but also need structure. You're torn between spontaneity and stability.",
    );
  }

  if (drivers.emotional > 70 && drivers.control < 40) {
    conflicts.push(
      "Your emotions drive you more than your structured thinking. You lead from the heart.",
    );
  }

  if (drivers.validation > 70 && drivers.freedom > 70) {
    conflicts.push(
      "You want others' approval, but also want to be free. This can create internal struggle.",
    );
  }

  return conflicts;
}

function mapToIdentityTypes(primaryDriver: DriverType): string[] {
  const mappings: Record<DriverType, string[]> = {
    growth: ["The Becoming", "The Rebuilder"],
    control: ["The Anchored", "The Observer"],
    meaning: ["The Seeker", "The Sage"],
    freedom: ["The Shifter", "The Drifter", "The Pioneer"],
    emotional: ["The Split", "The Detached"],
    validation: ["The Masked", "The Lover", "The Caregiver"],
  };

  return mappings[primaryDriver] || [];
}

function mapToPersonalityTypes(primaryDriver: DriverType): string[] {
  const mappings: Record<DriverType, string[]> = {
    growth: ["The Strategic Architect", "The Relentless Executor"],
    control: ["The Systems Builder", "The Calculated Planner"],
    meaning: ["The Silent Analyst", "The Pattern Decoder"],
    freedom: ["The Risk Runner", "The Bold Initiator"],
    emotional: ["The Emotional Navigator", "The Deep Feeler"],
    validation: ["The Social Shapeshifter", "The Adaptive Chameleon"],
  };

  return mappings[primaryDriver] || [];
}

function generateInsights(
  drivers: DriverScores,
  primaryDriver: DriverType,
): string[] {
  const insights: string[] = [];

  // Growth insights
  if (drivers.growth > 75) {
    insights.push(
      "You are driven by self-improvement and reaching your potential. Stagnation feels unbearable.",
    );
  } else if (drivers.growth < 25) {
    insights.push(
      "You're less focused on personal growth and more on stability. That's strength, not weakness.",
    );
  }

  // Control insights
  if (drivers.control > 75) {
    insights.push(
      "You crave predictability and clear systems. Uncertainty creates anxiety for you.",
    );
  } else if (drivers.control < 25) {
    insights.push(
      "You're comfortable with ambiguity and can adapt quickly to change.",
    );
  }

  // Meaning insights
  if (drivers.meaning > 75) {
    insights.push(
      "Purpose and deeper understanding are essential to your well-being.",
    );
  } else if (drivers.meaning < 25) {
    insights.push(
      "You're practical and don't need philosophical meaning to feel satisfied.",
    );
  }

  // Freedom insights
  if (drivers.freedom > 75) {
    insights.push(
      "You feel most alive when you have autonomy and options. Rigid structures drain you.",
    );
  } else if (drivers.freedom < 25) {
    insights.push(
      "You thrive with clear boundaries and structure. Freedom can feel overwhelming.",
    );
  }

  // Emotional insights
  if (drivers.emotional > 75) {
    insights.push(
      "Your emotions are your compass. They drive most of your decisions and actions.",
    );
  } else if (drivers.emotional < 25) {
    insights.push(
      "You lead with logic rather than emotion. This gives you clarity in difficult situations.",
    );
  }

  // Validation insights
  if (drivers.validation > 75) {
    insights.push(
      "Others' opinions matter significantly to you. You work hard to meet expectations.",
    );
  } else if (drivers.validation < 25) {
    insights.push(
      "You're independent in your thinking and not overly swayed by others' judgments.",
    );
  }

  return insights;
}

export function calculateDriverResult(
  responses: Record<number, AnswerValue>,
): DriverResult {
  // Calculate raw scores
  const rawScores = calculateDriverScores(responses);

  // Normalize to 0-100 scale
  const drivers = normalizeDriverScores(rawScores);

  // Find primary and secondary drivers
  const sortedDrivers = Object.entries(drivers).sort(([, a], [, b]) => b - a);
  const primaryDriver = sortedDrivers[0][0] as DriverType;
  const secondaryDriver = sortedDrivers[1][0] as DriverType;

  // Create label
  const label = `${DRIVER_LABELS[primaryDriver]} & ${DRIVER_LABELS[secondaryDriver]}`;

  // Detect conflicts
  const conflicts = detectConflicts(drivers);

  // Map to identity and personality types
  const identityTypes = mapToIdentityTypes(primaryDriver);
  const personalityTypes = mapToPersonalityTypes(primaryDriver);

  // Generate insights
  const insights = generateInsights(drivers, primaryDriver);

  return {
    drivers,
    primaryDriver,
    secondaryDriver,
    label,
    conflicts,
    identityTypes,
    personalityTypes,
    insights,
  };
}
