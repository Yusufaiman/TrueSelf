import { ReactNode } from "react";
import type { TestResultTemplateProps } from "@/components/test/TestResultTemplate";
import type { TrueSelf16ResultTemplateProps } from "@/components/test/TrueSelf16ResultTemplate";

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
  ) => TestResultTemplateProps | Omit<TrueSelf16ResultTemplateProps, "onRetake">;
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
