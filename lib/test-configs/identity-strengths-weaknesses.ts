import { registerTest, TestConfig } from "@/lib/test-config";
import {
  calculateStrengthsWeaknessesResult,
  type AnswerValue,
} from "@/lib/personality-engine/strengths-weaknesses-engine";
import {
  STRENGTHS_WEAKNESSES_QUESTIONS,
  type StrengthsTrait,
} from "@/lib/personality-engine/strengths-weaknesses-questions";

const traitMetadata: Record<
  StrengthsTrait,
  {
    label: string;
    colorClass: string;
    colorText: string;
    lightBgClass: string;
    iconName: string;
  }
> = {
  strategic_thinking: {
    label: "Strategic Thinking",
    colorClass: "bg-blue-500",
    colorText: "text-blue-600",
    lightBgClass: "bg-blue-50",
    iconName: "Brain",
  },
  emotional_awareness: {
    label: "Emotional Awareness",
    colorClass: "bg-pink-500",
    colorText: "text-pink-600",
    lightBgClass: "bg-pink-50",
    iconName: "Heart",
  },
  discipline: {
    label: "Discipline",
    colorClass: "bg-emerald-500",
    colorText: "text-emerald-600",
    lightBgClass: "bg-emerald-50",
    iconName: "Target",
  },
  adaptability: {
    label: "Adaptability",
    colorClass: "bg-orange-500",
    colorText: "text-orange-600",
    lightBgClass: "bg-orange-50",
    iconName: "Wind",
  },
  decision_making: {
    label: "Decision Making",
    colorClass: "bg-indigo-500",
    colorText: "text-indigo-600",
    lightBgClass: "bg-indigo-50",
    iconName: "Compass",
  },
  social_energy: {
    label: "Social Energy",
    colorClass: "bg-cyan-500",
    colorText: "text-cyan-600",
    lightBgClass: "bg-cyan-50",
    iconName: "Sparkles",
  },
  consistency: {
    label: "Consistency",
    colorClass: "bg-violet-500",
    colorText: "text-violet-600",
    lightBgClass: "bg-violet-50",
    iconName: "BookOpen",
  },
  risk_handling: {
    label: "Risk Handling",
    colorClass: "bg-amber-500",
    colorText: "text-amber-600",
    lightBgClass: "bg-amber-50",
    iconName: "Zap",
  },
};

const test4Config: TestConfig = {
  id: "identity-strengths-weaknesses",
  title: "Your Strengths & Weaknesses",
  description: "Discover how you function in real life",
  path: "/assessment/identity-strengths-weaknesses",
  questions: STRENGTHS_WEAKNESSES_QUESTIONS as any,
  answerOptions: [
    {
      value: 1 as AnswerValue,
      label: "Strongly Disagree",
      color: "#EF4444",
    },
    {
      value: 2 as AnswerValue,
      label: "Disagree",
      color: "#F97316",
    },
    {
      value: 3 as AnswerValue,
      label: "Neutral",
      color: "#9CA3AF",
    },
    {
      value: 4 as AnswerValue,
      label: "Agree",
      color: "#22C55E",
    },
    {
      value: 5 as AnswerValue,
      label: "Strongly Agree",
      color: "#14B8A6",
    },
  ],
  scoring: (answers) => {
    return calculateStrengthsWeaknessesResult(
      answers as Record<number, AnswerValue>,
    );
  },
  generateResult: (score, answers) => {
    const result = score as any;
    const traitKeys = Object.keys(result.traits) as StrengthsTrait[];

    return {
      badgeText: "Performance Profile",
      preTitle: "You operate as",
      title: result.personality,
      description: result.title,
      traits: traitKeys.map((trait) => {
        const metadata = traitMetadata[trait];
        return {
          label: metadata.label,
          value: result.traits[trait],
          colorClass: metadata.colorClass,
          colorText: metadata.colorText,
          lightBgClass: metadata.lightBgClass,
          iconName: metadata.iconName,
        };
      }),
      sections: [
        {
          title: "What's really going on",
          content: `Your pattern reveals that you operate as ${result.personality}. Your combination of strengths enables a distinct behavioral style, while your weaknesses show where growth is needed.`,
          type: "normal" as const,
        },
        {
          title: "Your hidden strengths",
          content: result.strengths
            .map(
              (s: StrengthsTrait) =>
                `${traitMetadata[s].label} (${result.traits[s]}% — Your competitive advantage)`,
            )
            .join(" • "),
          type: "normal" as const,
        },
        {
          title: "Where you might struggle",
          content: result.weaknesses
            .map(
              (w: StrengthsTrait) =>
                `${traitMetadata[w].label} (${result.traits[w]}% — Requires attention)`,
            )
            .join(" • "),
          type: "normal" as const,
        },
        ...(result.flips.length > 0
          ? [
              {
                title: "What you might not realize",
                content: result.flips.join(" "),
                type: "warning" as const,
              },
            ]
          : []),
      ],
      strengths: result.strengths.map(
        (s: StrengthsTrait) =>
          `${traitMetadata[s].label} (${result.traits[s]}%)`,
      ),
      secondaryMatch: {
        name: result.personality.toUpperCase(),
        description: `Your psychological profile matches ${result.personality}. This type naturally excels at specific tasks but may overlook others.`,
      },
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

registerTest(test4Config);

export default test4Config;
