import { registerTest, TestConfig } from "@/lib/test-config";
import {
  calculateStressEmotionProfileResult,
  getStressEmotionScoresForStorage,
} from "@/lib/stress-emotions-profile/engine";
import { STRESS_EMOTION_QUESTIONS } from "@/lib/stress-emotions-profile/data";

const answerOptions = [
  { value: 1 as const, label: "Strongly Disagree", color: "#EF4444" },
  { value: 2 as const, label: "Disagree", color: "#F97316" },
  { value: 3 as const, label: "Slightly Disagree", color: "#F59E0B" },
  { value: 4 as const, label: "Neutral / Depends", color: "#9CA3AF" },
  { value: 5 as const, label: "Slightly Agree", color: "#22C55E" },
  { value: 6 as const, label: "Agree", color: "#14B8A6" },
  { value: 7 as const, label: "Strongly Agree", color: "#06B6D4" },
];

const stressEmotionsProfileConfig: TestConfig = {
  id: "stress-emotions-profile",
  title: "Stress & Emotions Profile",
  description:
    "Understand how you experience, regulate, express, and recover from emotional pressure.",
  path: "/assessment/stress-emotions-profile",
  questions: STRESS_EMOTION_QUESTIONS.map((question) => ({
    id: question.id,
    text: question.text,
  })),
  answerOptions,
  scoring: (answers) => calculateStressEmotionProfileResult(answers),
  generateResult: (score) => ({
    variant: "stress-emotions-profile",
    result: score,
  }),
  persistence: {
    testType: "stress_emotions_profile",
    buildScores: (score) => getStressEmotionScoresForStorage(score),
    buildResult: (score) => ({
      title: score.stressResponsePattern.name,
      pattern: score.stressResponsePattern.name,
      stressResponsePattern: score.stressResponsePattern,
      dimensions: score.dimensions,
      processingCycle: score.processingCycle,
      emotionalStrength: score.emotionalStrength,
      emotionalBottleneck: score.emotionalBottleneck,
      stressSensitivity: score.stressSensitivity,
      processingInsights: score.processingInsights,
      stressInsights: score.stressInsights,
      copingInsights: score.copingInsights,
      supportPath: score.supportPath,
      confidence: score.confidence,
      confidenceNotes: score.confidenceNotes,
      answerEvidence: score.answerEvidence,
      category: "stress-emotions",
      domain: "stress-emotions",
    }),
  },
  startScreenContent: {
    title: "Stress & Emotions Assessment",
    guidelines: [
      "Answer based on how you usually experience, understand, express, and recover from emotional pressure",
      "This assessment is not a clinical diagnosis and does not measure anxiety, depression, ADHD, trauma, burnout, or any mental-health condition",
      "Stress reactivity is treated as activation load, not as a better-or-worse score",
      "Your result adds stress and emotion signals to your unified TrueSelf profile",
    ],
    estimatedTime: "8-10 minutes",
  },
};

registerTest(stressEmotionsProfileConfig);

export default stressEmotionsProfileConfig;
