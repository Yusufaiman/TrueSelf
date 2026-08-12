import { ReactNode } from "react";
import type { TestResultTemplateProps } from "@/components/test/TestResultTemplate";
import type { TrueSelf16ResultTemplateProps } from "@/components/test/TrueSelf16ResultTemplate";
import type { IdentityResultTemplateProps } from "@/components/test/IdentityResultTemplate";
import type { RelationshipResultTemplateProps } from "@/components/test/RelationshipResultTemplate";
import type { CareerResultTemplateProps } from "@/components/test/CareerResultTemplate";
import type { MindResultTemplateProps } from "@/components/test/MindResultTemplate";
import type { MotivationResultTemplateProps } from "@/components/test/MotivationResultTemplate";
import type { GrowthResultTemplateProps } from "@/components/test/GrowthResultTemplate";
import type { StressEmotionResultTemplateProps } from "@/components/test/StressEmotionResultTemplate";
import type { LifeResultTemplateProps } from "@/components/test/LifeResultTemplate";

export type AnswerValue = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface TestQuestion {
  id: number;
  text: string;
}

export interface TestAnswerOption {
  value: AnswerValue;
  label: string;
  color: string;
}

export interface TestConfig {
  id: string;
  title: string;
  description: string;
  path: string;
  questions: TestQuestion[];
  answerOptions?: TestAnswerOption[];
  scoring: (answers: Record<number, any>) => any;
  generateResult: (
    score: any,
    answers: Record<number, any>,
  ) =>
    | TestResultTemplateProps
    | Omit<TrueSelf16ResultTemplateProps, "onRetake">
    | Omit<IdentityResultTemplateProps, "onRetake">
    | Omit<RelationshipResultTemplateProps, "onRetake">
    | Omit<CareerResultTemplateProps, "onRetake">
    | Omit<MindResultTemplateProps, "onRetake">
    | Omit<MotivationResultTemplateProps, "onRetake">
    | Omit<GrowthResultTemplateProps, "onRetake">
    | Omit<StressEmotionResultTemplateProps, "onRetake">
    | Omit<LifeResultTemplateProps, "onRetake">;
  persistence?: {
    testType: string;
    buildScores: (
      score: any,
      answers: Record<number, any>,
    ) => Record<string, number>;
    buildResult: (
      score: any,
      answers: Record<number, any>,
    ) => Record<string, any>;
  };
  startScreenContent?: {
    title: string;
    guidelines: string[];
    estimatedTime?: string;
  };
}

// Registry of all available tests
export const TEST_REGISTRY: Record<string, TestConfig> = {};

export function registerTest(config: TestConfig) {
  TEST_REGISTRY[config.id] = config;
}

export function getTestConfig(testId: string): TestConfig | null {
  return TEST_REGISTRY[testId] || null;
}

export function getAllTests(): TestConfig[] {
  return Object.values(TEST_REGISTRY);
}
