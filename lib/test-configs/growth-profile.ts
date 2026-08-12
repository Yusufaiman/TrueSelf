import { registerTest, TestConfig } from "@/lib/test-config";
import {
  calculateGrowthProfileResult,
  getGrowthScoresForStorage,
} from "@/lib/growth-profile/engine";
import { GROWTH_QUESTIONS } from "@/lib/growth-profile/data";

const answerOptions = [
  { value: 1 as const, label: "Strongly Disagree", color: "#EF4444" },
  { value: 2 as const, label: "Disagree", color: "#F97316" },
  { value: 3 as const, label: "Slightly Disagree", color: "#F59E0B" },
  { value: 4 as const, label: "Neutral / Depends", color: "#9CA3AF" },
  { value: 5 as const, label: "Slightly Agree", color: "#22C55E" },
  { value: 6 as const, label: "Agree", color: "#14B8A6" },
  { value: 7 as const, label: "Strongly Agree", color: "#06B6D4" },
];

const growthProfileConfig: TestConfig = {
  id: "growth-profile",
  title: "Growth Profile",
  description:
    "Discover how you respond to growth, setbacks, feedback, discomfort, and personal change.",
  path: "/assessment/growth-profile",
  questions: GROWTH_QUESTIONS.map((question) => ({
    id: question.id,
    text: question.text,
  })),
  answerOptions,
  scoring: (answers) => calculateGrowthProfileResult(answers),
  generateResult: (score) => ({
    variant: "growth-profile",
    result: score,
  }),
  persistence: {
    testType: "growth_profile",
    buildScores: (score) => getGrowthScoresForStorage(score),
    buildResult: (score) => ({
      title: score.growthPattern,
      pattern: score.growthPattern,
      dimensions: score.dimensions,
      stages: score.stages,
      growthStrength: score.growthStrength,
      growthBottleneck: score.growthBottleneck,
      growthPattern: score.growthPattern,
      cycleInsight: score.cycleInsight,
      strengths: score.strengths,
      bottleneckSignals: score.bottleneckSignals,
      developmentPath: score.developmentPath,
      insights: score.insights,
      confidence: score.confidence,
      confidenceNotes: score.confidenceNotes,
      answerEvidence: score.answerEvidence,
      category: "growth",
      domain: "growth",
    }),
  },
  startScreenContent: {
    title: "Growth Assessment",
    guidelines: [
      "Answer based on how you usually respond to growth, feedback, setbacks, and change",
      "This measures development patterns, not your worth or success level",
      "Low scores are neutral descriptions, not character judgments",
      "Your result adds growth signals to your unified TrueSelf profile",
    ],
    estimatedTime: "8-10 minutes",
  },
};

registerTest(growthProfileConfig);

export default growthProfileConfig;
