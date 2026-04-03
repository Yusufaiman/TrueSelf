// Test 5: Real Self vs Current Self - Configuration

import { REAL_SELF_QUESTIONS } from "@/lib/personality-engine/real-self-questions";
import {
  calculateRealSelfResult,
  type AnswerValue,
  type RealSelfResult,
} from "@/lib/personality-engine/real-self-engine";
import { registerTest, type TestConfig } from "@/lib/test-config";

type RealSelfDimension =
  | "self_awareness"
  | "alignment"
  | "authenticity"
  | "confidence"
  | "direction"
  | "emotional_clarity"
  | "action_consistency"
  | "internal_conflict"
  | "identity_suppression";

const dimensionMetadata: Record<
  RealSelfDimension,
  { label: string; colorClass: string; colorText: string; lightBgClass: string }
> = {
  self_awareness: {
    label: "Self Awareness",
    colorClass: "bg-blue-500",
    colorText: "text-blue-600",
    lightBgClass: "bg-blue-50",
  },
  alignment: {
    label: "Alignment",
    colorClass: "bg-green-500",
    colorText: "text-green-600",
    lightBgClass: "bg-green-50",
  },
  authenticity: {
    label: "Authenticity",
    colorClass: "bg-pink-500",
    colorText: "text-pink-600",
    lightBgClass: "bg-pink-50",
  },
  confidence: {
    label: "Confidence",
    colorClass: "bg-purple-500",
    colorText: "text-purple-600",
    lightBgClass: "bg-purple-50",
  },
  direction: {
    label: "Direction",
    colorClass: "bg-orange-500",
    colorText: "text-orange-600",
    lightBgClass: "bg-orange-50",
  },
  emotional_clarity: {
    label: "Emotional Clarity",
    colorClass: "bg-cyan-500",
    colorText: "text-cyan-600",
    lightBgClass: "bg-cyan-50",
  },
  action_consistency: {
    label: "Action Consistency",
    colorClass: "bg-teal-500",
    colorText: "text-teal-600",
    lightBgClass: "bg-teal-50",
  },
  internal_conflict: {
    label: "Internal Conflict",
    colorClass: "bg-red-500",
    colorText: "text-red-600",
    lightBgClass: "bg-red-50",
  },
  identity_suppression: {
    label: "Identity Suppression",
    colorClass: "bg-indigo-500",
    colorText: "text-indigo-600",
    lightBgClass: "bg-indigo-50",
  },
};

const answerOptions = [
  { value: 1 as AnswerValue, label: "Strongly Disagree", color: "#EF4444" },
  { value: 2 as AnswerValue, label: "Disagree", color: "#F97316" },
  { value: 3 as AnswerValue, label: "Neutral", color: "#9CA3AF" },
  { value: 4 as AnswerValue, label: "Agree", color: "#22C55E" },
  { value: 5 as AnswerValue, label: "Strongly Agree", color: "#14B8A6" },
];

const test5Config: TestConfig = {
  id: "identity-real-self",
  title: "Real Self vs Current Self",
  description: "Discover the gap between your real self and current identity",
  path: "/assessment/identity-real-self",
  questions: REAL_SELF_QUESTIONS as any,
  answerOptions,
  scoring: (answers: Record<number, AnswerValue>) => {
    return calculateRealSelfResult(answers);
  },
  generateResult: (score: RealSelfResult) => {
    const result = score as RealSelfResult;

    return {
      badgeText: "Identity Profile",
      title: "Your real self vs your current self",
      subtitle: result.message,
      description: `Gap Level: ${result.gapLevel}`,
      traits: (Object.keys(result.dimensions) as RealSelfDimension[])
        .filter(
          (dim) =>
            dim !== "internal_conflict" && dim !== "identity_suppression",
        )
        .map((dim) => {
          const metadata = dimensionMetadata[dim];
          return {
            label: metadata.label,
            value: result.dimensions[dim],
            colorClass: metadata.colorClass,
            colorText: metadata.colorText,
            lightBgClass: metadata.lightBgClass,
          };
        }),
      sections: [
        {
          title: "What's really going on",
          content: `You are operating as ${result.currentIdentity}, carrying patterns of ${
            result.dimensions.internal_conflict > 50
              ? "internal conflict"
              : "suppressed identity"
          }. Your real self, ${result.realIdentity}, is waiting beneath the surface.`,
          type: "normal" as const,
        },
        {
          title: "The gap between you",
          content: `Current identity gap: ${result.gapLevel}. This means there's ${
            result.gapLevel === "High"
              ? "significant misalignment between your authentic self and how you're living"
              : result.gapLevel === "Moderate"
                ? "noticeable distance between who you are and who you're becoming"
                : "relatively good alignment, though room for deeper authenticity exists"
          }.`,
          type:
            result.gapLevel === "High"
              ? ("warning" as const)
              : result.gapLevel === "Moderate"
                ? ("normal" as const)
                : ("highlight" as const),
        },
        {
          title: "What you might not realize",
          content:
            result.flips && result.flips.length > 0
              ? result.flips.join(" • ")
              : "The distance between your current and real self is not a permanent condition—it's a signal that change is possible.",
          type: "normal" as const,
        },
        {
          title: "Your hidden strengths",
          content:
            result.dimensions.authenticity > 50 &&
            result.dimensions.self_awareness > 50
              ? "You have the self-knowledge and potential authenticity to bridge this gap. Your challenge is translating awareness into action."
              : "Your journey begins with self-discovery. Every step toward authenticity is a step toward your real self.",
          type: "normal" as const,
        },
        {
          title: "If nothing changes",
          content:
            result.gapLevel === "High"
              ? "Sustained suppression leads to burnout, resentment, and disconnection from your own life. The longer you live as your current self, the harder authentic living becomes."
              : "Small gaps tend to grow. Without intentional alignment, you risk drifting further from your real self.",
          type: "warning" as const,
        },
        {
          title: "What you should start doing",
          content: generateActionSteps(result),
          type: "normal" as const,
        },
      ],
      strengths: generateStrengths(result),
      secondaryMatch: {
        name: `Real Self: ${result.realIdentity}`,
        description: `Your authentic identity waiting to express itself`,
      },
      shadowMatch: {
        name: `Current Pattern: ${result.currentIdentity}`,
        description: `How you're currently operating`,
      },
      onRetake: () => {
        // Will be overridden in component
      },
    };
  },
};

interface GeneratedResult {
  badge: string;
  title: string;
  subtitle: string;
  traits: Array<{ name: string; value: number; label: string }>;
  sections: Array<{
    title: string;
    content: string;
    type: "normal" | "warning" | "success";
  }>;
  strengths: string[];
  secondary?: string;
  shadow?: string;
}

function generateResult(result: RealSelfResult): GeneratedResult {
  return {
    badge: "Identity Profile",
    title: "Your real self vs your current self",
    subtitle: result.message,
    traits: (Object.keys(result.dimensions) as RealSelfDimension[])
      .filter(
        (dim) => dim !== "internal_conflict" && dim !== "identity_suppression",
      )
      .map((dim) => ({
        name: dim,
        value: result.dimensions[dim],
        label: dimensionMetadata[dim].label,
      })),
    sections: [
      {
        title: "What's really going on",
        content: `You are operating as ${result.currentIdentity}, carrying patterns of ${
          result.dimensions.internal_conflict > 50
            ? "internal conflict"
            : "suppressed identity"
        }. Your real self, ${result.realIdentity}, is waiting beneath the surface.`,
        type: "normal",
      },
      {
        title: "The gap between you",
        content: `Current identity gap: ${result.gapLevel}. This means there's ${
          result.gapLevel === "High Gap"
            ? "significant misalignment between your authentic self and how you're living"
            : result.gapLevel === "Moderate Gap"
              ? "noticeable distance between who you are and who you're becoming"
              : "relatively good alignment, though room for deeper authenticity exists"
        }.`,
        type:
          result.gapLevel === "High Gap"
            ? "warning"
            : result.gapLevel === "Moderate Gap"
              ? "normal"
              : "success",
      },
      {
        title: "What you might not realize",
        content:
          result.flips && result.flips.length > 0
            ? result.flips.join(" • ")
            : "The distance between your current and real self is not a permanent condition—it's a signal that change is possible.",
        type: "normal",
      },
      {
        title: "Your hidden strengths",
        content:
          result.dimensions.authenticity > 50 &&
          result.dimensions.self_awareness > 50
            ? "You have the self-knowledge and potential authenticity to bridge this gap. Your challenge is translating awareness into action."
            : "Your journey begins with self-discovery. Every step toward authenticity is a step toward your real self.",
        type: "success",
      },
      {
        title: "If nothing changes",
        content:
          result.gapLevel === "High Gap"
            ? "Sustained suppression leads to burnout, resentment, and disconnection from your own life. The longer you live as your current self, the harder authentic living becomes."
            : "Small gaps tend to grow. Without intentional alignment, you risk drifting further from your real self.",
        type: "warning",
      },
      {
        title: "What you should start doing",
        content: generateActionSteps(result),
        type: "normal",
      },
    ],
    strengths: generateStrengths(result),
    secondary: `Real self: ${result.realIdentity}`,
    shadow: `Current pattern: ${result.currentIdentity}`,
  };
}

function generateActionSteps(result: RealSelfResult): string {
  const steps = [];

  if (result.dimensions.self_awareness < 60) {
    steps.push("Deep self-inquiry: Spend time understanding your core values");
  }

  if (result.dimensions.alignment < 60) {
    steps.push(
      "Audit your daily life: Notice where you're not living aligned with your values",
    );
  }

  if (result.dimensions.authenticity < 60) {
    steps.push(
      "Start small: Express one honest thought or feeling today that you normally suppress",
    );
  }

  if (result.dimensions.action_consistency < 60) {
    steps.push(
      "Choose one area: Commit to follow-through on one small decision",
    );
  }

  if (steps.length === 0) {
    steps.push(
      "The gap is closing: Continue building consistency between your values and actions",
    );
  }

  return steps.map((s, i) => `${i + 1}. ${s}`).join(" • ");
}

function generateStrengths(result: RealSelfResult): string[] {
  const strengths = [];

  if (result.dimensions.self_awareness > 60) {
    strengths.push(
      `Strong self-awareness (${result.dimensions.self_awareness}%)`,
    );
  }

  if (result.dimensions.emotional_clarity > 60) {
    strengths.push(
      `Emotional clarity (${result.dimensions.emotional_clarity}%)`,
    );
  }

  if (result.dimensions.authenticity > 60) {
    strengths.push(
      `Authenticity potential (${result.dimensions.authenticity}%)`,
    );
  }

  if (result.dimensions.confidence > 60) {
    strengths.push(`Inner confidence (${result.dimensions.confidence}%)`);
  }

  if (strengths.length === 0) {
    strengths.push("Awareness of the gap is your first strength");
  }

  return strengths;
}

// Register the test
registerTest(test5Config);
