import { registerTest, TestConfig } from "@/lib/test-config";
import {
  calculateDriverResult,
  DriverType,
} from "@/lib/personality-engine/driver-engine";
import { DRIVER_QUESTIONS } from "@/lib/personality-engine/drivers-questions";

const driverMetadata = {
  growth: {
    label: "Growth",
    colorClass: "bg-emerald-500",
    colorText: "text-emerald-600",
    lightBgClass: "bg-emerald-50",
    iconName: "Target",
  },
  control: {
    label: "Control",
    colorClass: "bg-violet-500",
    colorText: "text-violet-600",
    lightBgClass: "bg-violet-50",
    iconName: "Lock",
  },
  meaning: {
    label: "Meaning",
    colorClass: "bg-blue-500",
    colorText: "text-blue-600",
    lightBgClass: "bg-blue-50",
    iconName: "Lightbulb",
  },
  freedom: {
    label: "Freedom",
    colorClass: "bg-orange-500",
    colorText: "text-orange-600",
    lightBgClass: "bg-orange-50",
    iconName: "Wind",
  },
  emotional: {
    label: "Emotional",
    colorClass: "bg-pink-500",
    colorText: "text-pink-600",
    lightBgClass: "bg-pink-50",
    iconName: "Heart",
  },
  validation: {
    label: "Validation",
    colorClass: "bg-indigo-500",
    colorText: "text-indigo-600",
    lightBgClass: "bg-indigo-50",
    iconName: "Eye",
  },
};

const test3Config: TestConfig = {
  id: "identity-what-drives-you",
  title: "What Drives You",
  description: "Discover your psychological drivers",
  path: "/assessment/identity-what-drives-you",
  questions: DRIVER_QUESTIONS,
  scoring: (answers) => {
    return calculateDriverResult(answers as Record<number, 1 | 2 | 3 | 4 | 5>);
  },
  generateResult: (score, answers) => {
    const primaryMetadata =
      driverMetadata[score.primaryDriver as keyof typeof driverMetadata];

    return {
      badgeText: "Driver Profile",
      preTitle: "You are driven by",
      title: score.label,
      description: `Your psychology reveals that you are deeply motivated by ${primaryMetadata.label.toLowerCase()}. This is a fundamental part of how you experience the world and make decisions.`,
      traits: (Object.keys(score.drivers) as DriverType[]).map((driver) => {
        const metadata = driverMetadata[driver];
        return {
          label: metadata.label,
          value: score.drivers[driver],
          colorClass: metadata.colorClass,
          colorText: metadata.colorText,
          lightBgClass: metadata.lightBgClass,
          iconName: metadata.iconName,
        };
      }),
      sections: [
        {
          title: "What's really going on",
          content: `Your psychology reveals a deep motivation toward ${primaryMetadata.label.toLowerCase()}.`,
          type: "normal" as const,
        },
      ],
      strengths: [
        "Resilience",
        "Ambition",
        "Adaptability",
        "Vision",
        "Determination",
        "Self-awareness",
      ],
      secondaryMatch: {
        name: score.primaryDriver.toUpperCase(),
        description: `Your primary driver is ${primaryMetadata.label}.`,
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

registerTest(test3Config);

export default test3Config;
