import { registerTest, TestConfig } from "@/lib/test-config";
import {
  calculateTrueSelf16Result,
  getTrueSelf16ScoresForStorage,
} from "@/lib/trueself-16/engine";
import { TRUESELF_16_QUESTIONS } from "@/lib/trueself-16/data";

const trueSelf16TypeConfig: TestConfig = {
  id: "trueself-16-type",
  title: "TrueSelf 16-Type Assessment",
  description:
    "Discover your TrueSelf 16-type code across energy, information, judgment, and life-structure patterns.",
  path: "/assessment/trueself-16-type",
  questions: TRUESELF_16_QUESTIONS.map((question) => ({
    id: question.id,
    text: question.text,
  })),
  answerOptions: [
    { value: 1, label: "Strongly Disagree", color: "#EF4444" },
    { value: 2, label: "Disagree", color: "#F97316" },
    { value: 3, label: "Slightly Disagree", color: "#F59E0B" },
    { value: 4, label: "Neutral / Depends", color: "#9CA3AF" },
    { value: 5, label: "Slightly Agree", color: "#22C55E" },
    { value: 6, label: "Agree", color: "#14B8A6" },
    { value: 7, label: "Strongly Agree", color: "#06B6D4" },
  ],
  scoring: (answers) => calculateTrueSelf16Result(answers),
  generateResult: (score) => ({
    variant: "trueself-16-type",
    result: score,
  }),
  persistence: {
    testType: "trueself_16_type",
    buildScores: (score) => getTrueSelf16ScoresForStorage(score),
    buildResult: (score) => ({
      title: `${score.typeCode} - ${score.typeName}`,
      typeCode: score.typeCode,
      typeName: score.typeName,
      tagline: score.tagline,
      description: score.description,
      family: score.family,
      confidence: score.confidence,
      confidenceScore: score.confidenceScore,
      closestType: score.closestType,
      axisScores: score.axisScores,
      facetScores: score.facetScores,
      answerEvidence: score.answerEvidence,
      functionStack: score.functionStack,
      strengths: score.strengths,
      blindSpots: score.blindSpots,
      growthPath: score.growthPath,
      relationshipStyle: score.relationshipStyle,
      workStyle: score.workStyle,
      suggestedNextSteps: score.suggestedNextSteps,
    }),
  },
  startScreenContent: {
    title: "TrueSelf 16-Type Assessment",
    guidelines: [
      "Answer based on your natural pattern, not who you think you should be",
      "Use the full 7-point scale; neutral is valid when the answer truly depends",
      "There are no good or bad types; each type has strengths and blind spots",
      "Your result is a self-reflection tool, not an official MBTI assessment",
    ],
    estimatedTime: "10 minutes",
  },
};

registerTest(trueSelf16TypeConfig);

export default trueSelf16TypeConfig;
