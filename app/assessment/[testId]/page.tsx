"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Clipboard, CheckCircle2 } from "lucide-react";
import TestQuestionTemplate from "@/components/test/TestQuestionTemplate";
import TestResultTemplate from "@/components/test/TestResultTemplate";
import TrueSelf16ResultTemplate from "@/components/test/TrueSelf16ResultTemplate";
import IdentityResultTemplate from "@/components/test/IdentityResultTemplate";
import RelationshipResultTemplate from "@/components/test/RelationshipResultTemplate";
import CareerResultTemplate from "@/components/test/CareerResultTemplate";
import MindResultTemplate from "@/components/test/MindResultTemplate";
import MotivationResultTemplate from "@/components/test/MotivationResultTemplate";
import GrowthResultTemplate from "@/components/test/GrowthResultTemplate";
import StressEmotionResultTemplate from "@/components/test/StressEmotionResultTemplate";
import LifeResultTemplate from "@/components/test/LifeResultTemplate";
import { getTestConfig, type AnswerValue } from "@/lib/test-config";
import "@/lib/test-configs";
import { useSubscription } from "@/hooks/useSubscription";
import { saveTestResult } from "@/utils/supabase/client-results";

interface PageProps {
  params: Promise<{
    testId: string;
  }>;
}

export default function GenericTestPage({ params }: PageProps) {
  const { testId } = React.use(params);
  const config = getTestConfig(testId);
  const router = useRouter();
  const { isSubscribed, isLoading: isSubscriptionLoading } = useSubscription();

  const [screen, setScreen] = useState<"start" | "question" | "result">(
    "start",
  );
  const [currentStep, setCurrentStep] = useState(1);
  const [currentAnswer, setCurrentAnswer] = useState<AnswerValue | null>(null);
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [result, setResult] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Test not found
          </h1>
          <p className="text-slate-600">The test "{testId}" does not exist.</p>
        </div>
      </div>
    );
  }

  const currentQuestion = config.questions[currentStep - 1];
  const isLastQuestion = currentStep === config.questions.length;

  const handleSelectAnswer = (value: AnswerValue) => {
    setCurrentAnswer(value);
  };

  const handleNext = async () => {
    if (currentAnswer === null || isSubmittingRef.current) return;

    const newAnswers = { ...answers, [currentQuestion.id]: currentAnswer };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      isSubmittingRef.current = true;
      setIsSubmitting(true);

      // PAYWALL CHECK: Block results for non-subscribers
      if (!isSubscriptionLoading && !isSubscribed) {
        console.log("[Test] Paywall: Blocking result for non-subscriber");
        router.push("/paywall?source=test-complete");
        return;
      }

      // Calculate result
      const calculatedResult = config.scoring(newAnswers);
      const resultTemplate = config.generateResult(
        calculatedResult,
        newAnswers,
      );

      if (config.persistence) {
        await saveTestResult(
          config.persistence.testType,
          config.persistence.buildScores(calculatedResult, newAnswers),
          config.persistence.buildResult(calculatedResult, newAnswers),
        );
      }

      setResult(resultTemplate);
      setScreen("result");
    } else {
      setCurrentStep(currentStep + 1);
      setCurrentAnswer(null);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      const previousAnswer =
        answers[config.questions[currentStep - 2].id] || null;
      setCurrentStep(currentStep - 1);
      setCurrentAnswer(previousAnswer as AnswerValue | null);
    }
  };

  const handleRestart = () => {
    isSubmittingRef.current = false;
    setIsSubmitting(false);
    setScreen("question");
    setCurrentStep(1);
    setCurrentAnswer(null);
    setAnswers({});
    setResult(null);
  };

  const handleRetake = () => {
    handleRestart();
  };

  // START SCREEN
  if (screen === "start") {
    const startContent = config.startScreenContent || {
      title: "Test guidelines",
      guidelines: [
        "Answer each statement based on your personal opinion",
        "You cannot skip questions, but you can return to them later",
      ],
    };

    return (
      <div className="flex items-center justify-center min-h-screen px-6 py-12 bg-white">
        <div className="max-w-xl w-full rounded-3xl border border-slate-200 shadow-sm bg-white px-8 md:px-10 py-10 md:py-12 text-center">
          {/* Icon Container */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-blue-50">
              <Clipboard size={32} className="text-blue-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mt-5">
            {startContent.title}
          </h1>

          {/* Guidelines List */}
          <div className="mt-5 space-y-4 text-sm md:text-base text-slate-600">
            {startContent.guidelines.map((guideline, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2
                  size={20}
                  style={{ color: "#5CE1E6" }}
                  className="shrink-0 mt-0.5"
                />
                <p className="text-left">{guideline}</p>
              </div>
            ))}
          </div>

          {/* Start Button */}
          <button
            onClick={() => setScreen("question")}
            className="w-full mt-6 px-6 py-3.5 rounded-lg bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
          >
            Start test
          </button>

          {/* Info Text */}
          {startContent.estimatedTime && (
            <p className="text-xs text-slate-500 mt-4">
              Takes approximately {startContent.estimatedTime} to complete
            </p>
          )}
        </div>
      </div>
    );
  }

  // RESULT SCREEN
  if (screen === "result" && result) {
    if (result.variant === "trueself-16-type") {
      return <TrueSelf16ResultTemplate {...result} onRetake={handleRetake} />;
    }

    if (result.variant === "identity-profile") {
      return <IdentityResultTemplate {...result} onRetake={handleRetake} />;
    }

    if (result.variant === "relationship-style") {
      return <RelationshipResultTemplate {...result} onRetake={handleRetake} />;
    }

    if (result.variant === "career-fit") {
      return <CareerResultTemplate {...result} onRetake={handleRetake} />;
    }

    if (result.variant === "mind-profile") {
      return <MindResultTemplate {...result} onRetake={handleRetake} />;
    }

    if (result.variant === "motivation-profile") {
      return <MotivationResultTemplate {...result} onRetake={handleRetake} />;
    }

    if (result.variant === "growth-profile") {
      return <GrowthResultTemplate {...result} onRetake={handleRetake} />;
    }

    if (result.variant === "stress-emotions-profile") {
      return <StressEmotionResultTemplate {...result} onRetake={handleRetake} />;
    }

    if (result.variant === "life-profile") {
      return <LifeResultTemplate {...result} onRetake={handleRetake} />;
    }

    return <TestResultTemplate {...result} onRetake={handleRetake} />;
  }

  // QUESTION SCREEN
  return (
    <TestQuestionTemplate
      step={currentStep}
      totalSteps={config.questions.length}
      question={currentQuestion.text}
      value={currentAnswer}
      onChange={handleSelectAnswer}
      onNext={handleNext}
      onPrevious={currentStep > 1 ? handlePrevious : undefined}
      onRestart={handleRestart}
      answerOptions={config.answerOptions}
      isBusy={isSubmitting}
    />
  );
}
