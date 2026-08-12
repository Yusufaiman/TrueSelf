import { registerTest, TestConfig } from "@/lib/test-config";
import {
  calculateIdentityResult,
  getIdentityScoresForStorage,
} from "@/lib/identity-profile/engine";
import { IDENTITY_PROFILE_QUESTIONS } from "@/lib/identity-profile/data";

const answerOptions = [
  { value: 1 as const, label: "Strongly Disagree", color: "#EF4444" },
  { value: 2 as const, label: "Disagree", color: "#F97316" },
  { value: 3 as const, label: "Slightly Disagree", color: "#F59E0B" },
  { value: 4 as const, label: "Neutral / Depends", color: "#9CA3AF" },
  { value: 5 as const, label: "Slightly Agree", color: "#22C55E" },
  { value: 6 as const, label: "Agree", color: "#14B8A6" },
  { value: 7 as const, label: "Strongly Agree", color: "#06B6D4" },
];

const identityConfig: TestConfig = {
  id: "identity-who-you-really-are",
  title: "Who You Really Are",
  description:
    "Discover how clearly you understand, maintain, and express your identity across different environments.",
  path: "/assessment/identity-who-you-really-are",
  questions: IDENTITY_PROFILE_QUESTIONS.map((question) => ({
    id: question.id,
    text: question.text,
  })),
  answerOptions,
  scoring: (answers) => calculateIdentityResult(answers),
  generateResult: (score) => ({
    variant: "identity-profile",
    result: score,
  }),
  persistence: {
    testType: "identity_profile",
    buildScores: (score) => getIdentityScoresForStorage(score),
    buildResult: (score) => ({
      title: score.pattern.name,
      pattern: score.pattern.name,
      patternId: score.pattern.id,
      tagline: score.pattern.tagline,
      description: score.pattern.description,
      matchScore: score.pattern.matchScore,
      dimensions: score.dimensions,
      coreSocialAlignment: score.coreSocialAlignment,
      expressionGap: score.expressionGap,
      internalGrounding: score.internalGrounding,
      coreSelf: score.coreSelf,
      socialSelf: score.socialSelf,
      groundingSignals: score.groundingSignals,
      adaptationSignals: score.adaptationSignals,
      insights: score.insights,
      confidence: score.confidence,
      confidenceNotes: score.confidenceNotes,
      answerEvidence: score.answerEvidence,
      category: "identity",
      domain: "identity",
    }),
  },
  startScreenContent: {
    title: "Who You Really Are",
    guidelines: [
      "Answer based on how you usually experience yourself, not who you think you should be",
      "Neutral is valid when your answer genuinely depends on the situation",
      "High social adaptation or external influence is descriptive, not automatically bad",
      "This test does not overwrite your 16-type personality result; it adds identity signals to your TrueSelf profile",
    ],
    estimatedTime: "6-8 minutes",
  },
};

registerTest(identityConfig);

export default identityConfig;
