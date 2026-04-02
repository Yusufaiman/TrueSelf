import { registerTest, TestConfig } from "@/lib/test-config";
import {
  IDENTITY_QUESTIONS,
  calculateDimensionScores,
} from "@/lib/identity-system/questions";
import { IDENTITIES } from "@/lib/identity-system/types";
import { getCompleteResult } from "@/lib/identity-system/profileMatching";

const dimensionMetadata = {
  selfAwareness: {
    label: "Self Awareness",
    colorClass: "bg-blue-500",
    colorText: "text-blue-600",
    lightBgClass: "bg-blue-50",
    iconName: "Brain",
  },
  authenticity: {
    label: "Authenticity",
    colorClass: "bg-emerald-500",
    colorText: "text-emerald-600",
    lightBgClass: "bg-emerald-50",
    iconName: "CheckCircle2",
  },
  externalInfluence: {
    label: "External Influence",
    colorClass: "bg-amber-500",
    colorText: "text-amber-600",
    lightBgClass: "bg-amber-50",
    iconName: "Sparkles",
  },
  identityStability: {
    label: "Identity Stability",
    colorClass: "bg-violet-500",
    colorText: "text-violet-600",
    lightBgClass: "bg-violet-50",
    iconName: "BookOpen",
  },
  emotionalAlignment: {
    label: "Emotional Alignment",
    colorClass: "bg-pink-500",
    colorText: "text-pink-600",
    lightBgClass: "bg-pink-50",
    iconName: "Heart",
  },
  decisionClarity: {
    label: "Decision Clarity",
    colorClass: "bg-indigo-500",
    colorText: "text-indigo-600",
    lightBgClass: "bg-indigo-50",
    iconName: "Compass",
  },
  innerConsistency: {
    label: "Inner Consistency",
    colorClass: "bg-cyan-500",
    colorText: "text-cyan-600",
    lightBgClass: "bg-cyan-50",
    iconName: "Sparkles",
  },
  socialExpression: {
    label: "Social Expression",
    colorClass: "bg-orange-500",
    colorText: "text-orange-600",
    lightBgClass: "bg-orange-50",
    iconName: "CheckCircle2",
  },
};

const test1Config: TestConfig = {
  id: "identity-who-you-really-are",
  title: "Who You Really Are",
  description: "Discover your core identity",
  path: "/assessment/identity-who-you-really-are",
  questions: IDENTITY_QUESTIONS,
  scoring: (answers) => {
    const responses: Record<number, number> = {};
    Object.entries(answers).forEach(([key, value]) => {
      responses[parseInt(key)] = value;
    });
    const dimensionScores = calculateDimensionScores(responses);
    return getCompleteResult(dimensionScores);
  },
  generateResult: (score: any, answers) => {
    const primaryType = score.primary.type as any as string;
    // @ts-ignore
    const primaryIdentity = IDENTITIES[primaryType];
    const dimensionScores = calculateDimensionScores(
      Object.fromEntries(
        Object.entries(answers).map(([k, v]) => [parseInt(k), v]),
      ),
    );

    return {
      badgeText: "Identity Profile",
      preTitle: "You are",
      title: score.primary.name,
      subtitle: primaryIdentity.tagline,
      description: score.primary.description,
      traits: Object.entries(dimensionScores).map(([key, value]) => {
        const metadata =
          dimensionMetadata[key as keyof typeof dimensionMetadata];
        return {
          label: metadata.label,
          value,
          colorClass: metadata.colorClass,
          colorText: metadata.colorText,
          lightBgClass: metadata.lightBgClass,
          iconName: metadata.iconName,
        };
      }),
      sections: [
        {
          title: "Your core pattern",
          content: primaryIdentity.corePattern,
          type: "normal" as const,
        },
        {
          title: "Psychological traits",
          content: primaryIdentity.psychologicalTraits.map((t: any) => t),
          type: "normal" as const,
        },
      ],
      strengths: primaryIdentity.strengths,
      secondaryMatch: score.secondary
        ? {
            name: score.secondary.name,
            description: score.secondary.description,
            matchScore: score.secondary.similarityScore,
          }
        : undefined,
      onRetake: () => {
        // Will be overridden in component
      },
    };
  },
  startScreenContent: {
    title: "Test guidelines",
    guidelines: [
      "Answer each statement based on your personal opinion",
      "You cannot skip questions, but you can return to them later",
    ],
    estimatedTime: "5 minutes",
  },
};

registerTest(test1Config);

export default test1Config;
