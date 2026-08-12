import { registerTest, TestConfig } from "@/lib/test-config";
import {
  calculateRelationshipResult,
  getRelationshipScoresForStorage,
} from "@/lib/relationship-profile/engine";
import { RELATIONSHIP_STYLE_QUESTIONS } from "@/lib/relationship-profile/data";

const answerOptions = [
  { value: 1 as const, label: "Strongly Disagree", color: "#EF4444" },
  { value: 2 as const, label: "Disagree", color: "#F97316" },
  { value: 3 as const, label: "Slightly Disagree", color: "#F59E0B" },
  { value: 4 as const, label: "Neutral / Depends", color: "#9CA3AF" },
  { value: 5 as const, label: "Slightly Agree", color: "#22C55E" },
  { value: 6 as const, label: "Agree", color: "#14B8A6" },
  { value: 7 as const, label: "Strongly Agree", color: "#06B6D4" },
];

const relationshipStyleConfig: TestConfig = {
  id: "relationship-style",
  title: "Relationship Style",
  description:
    "Discover how you connect, communicate, trust, maintain independence, show care, and handle conflict.",
  path: "/assessment/relationship-style",
  questions: RELATIONSHIP_STYLE_QUESTIONS.map((question) => ({
    id: question.id,
    text: question.text,
  })),
  answerOptions,
  scoring: (answers) => calculateRelationshipResult(answers),
  generateResult: (score) => ({
    variant: "relationship-style",
    result: score,
  }),
  persistence: {
    testType: "relationship_profile",
    buildScores: (score) => getRelationshipScoresForStorage(score),
    buildResult: (score) => ({
      title: score.pattern.name,
      pattern: score.pattern.name,
      patternId: score.pattern.id,
      tagline: score.pattern.tagline,
      description: score.pattern.description,
      matchScore: score.pattern.matchScore,
      dimensions: score.dimensions,
      closenessStyle: score.closenessStyle,
      communicationStyle: score.communicationStyle,
      independenceStyle: score.independenceStyle,
      conflictStyle: score.conflictStyle,
      relationshipNeeds: score.relationshipNeeds,
      careStyle: score.careStyle,
      strengths: score.strengths,
      frictionPoints: score.frictionPoints,
      insights: score.insights,
      confidence: score.confidence,
      confidenceNotes: score.confidenceNotes,
      answerEvidence: score.answerEvidence,
      category: "relationships",
      domain: "relationships",
    }),
  },
  startScreenContent: {
    title: "Relationship Style Assessment",
    guidelines: [
      "Answer based on your usual relationship tendencies, not one specific person",
      "High or low scores are descriptive; they are not automatic health scores",
      "This is not a clinical attachment diagnosis or compatibility rating",
      "The result adds relationship signals to your unified TrueSelf profile",
    ],
    estimatedTime: "8-10 minutes",
  },
};

registerTest(relationshipStyleConfig);

export default relationshipStyleConfig;
