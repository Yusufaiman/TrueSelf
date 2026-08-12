import { registerTest, TestConfig } from "@/lib/test-config";
import {
  calculateMindProfileResult,
  getMindScoresForStorage,
} from "@/lib/mind-profile/engine";
import { MIND_QUESTIONS } from "@/lib/mind-profile/data";

const answerOptions = [
  { value: 1 as const, label: "Strongly Disagree", color: "#EF4444" },
  { value: 2 as const, label: "Disagree", color: "#F97316" },
  { value: 3 as const, label: "Slightly Disagree", color: "#F59E0B" },
  { value: 4 as const, label: "Neutral / Depends", color: "#9CA3AF" },
  { value: 5 as const, label: "Slightly Agree", color: "#22C55E" },
  { value: 6 as const, label: "Agree", color: "#14B8A6" },
  { value: 7 as const, label: "Strongly Agree", color: "#06B6D4" },
];

const mindProfileConfig: TestConfig = {
  id: "mind-profile",
  title: "Mind Profile",
  description:
    "Discover how your mind processes information, solves problems, learns, decides, and responds to uncertainty.",
  path: "/assessment/mind-profile",
  questions: MIND_QUESTIONS.map((question) => ({
    id: question.id,
    text: question.text,
  })),
  answerOptions,
  scoring: (answers) => calculateMindProfileResult(answers),
  generateResult: (score) => ({
    variant: "mind-profile",
    result: score,
  }),
  persistence: {
    testType: "mind_profile",
    buildScores: (score) => getMindScoresForStorage(score),
    buildResult: (score) => ({
      title: score.pattern.name,
      pattern: score.pattern.name,
      patternId: score.pattern.id,
      tagline: score.pattern.tagline,
      description: score.pattern.description,
      matchScore: score.pattern.matchScore,
      secondaryPattern: score.secondaryPattern,
      dimensions: score.dimensions,
      processingStyle: score.processingStyle,
      learningStyle: score.learningStyle,
      decisionStyle: score.decisionStyle,
      uncertaintyStyle: score.uncertaintyStyle,
      cognitiveStrengths: score.cognitiveStrengths,
      frictionPoints: score.frictionPoints,
      insights: score.insights,
      developmentPath: score.developmentPath,
      confidence: score.confidence,
      confidenceNotes: score.confidenceNotes,
      answerEvidence: score.answerEvidence,
      category: "mind",
      domain: "mind",
    }),
  },
  startScreenContent: {
    title: "Mind Assessment",
    guidelines: [
      "Answer based on how your mind usually processes information and uncertainty",
      "This is a cognitive style assessment, not an IQ test",
      "Low focus does not diagnose ADHD, anxiety, or any clinical condition",
      "Your result adds mind signals to your unified TrueSelf profile",
    ],
    estimatedTime: "8-10 minutes",
  },
};

registerTest(mindProfileConfig);

export default mindProfileConfig;
