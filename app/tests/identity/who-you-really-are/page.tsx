"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  Clipboard,
  ArrowLeft,
  RotateCcw,
  Activity,
  AlertCircle,
  Sparkles,
  Heart,
  Compass,
  Layers,
  Brain,
  BookOpen,
} from "lucide-react";
import {
  IDENTITY_QUESTIONS,
  calculateDimensionScores,
  DimensionScores,
  IdentityQuestion,
} from "@/lib/identity-system/questions";
import {
  IDENTITIES,
  IdentityType,
  IDENTITY_COLORS,
} from "@/lib/identity-system/types";
import {
  getCompleteResult,
  identifyType,
} from "@/lib/identity-system/profileMatching";
import { IdentityImage } from "@/lib/identity-system/identityImages";

type AnswerValue = 1 | 2 | 3 | 4 | 5;

interface DimensionMetadata {
  label: string;
  colorClass: string;
  colorText: string;
  lightBgClass: string;
  icon: React.ReactNode;
}

const dimensionMetadata: Record<string, DimensionMetadata> = {
  selfAwareness: {
    label: "Self Awareness",
    colorClass: "bg-blue-500",
    colorText: "text-blue-600",
    lightBgClass: "bg-blue-50",
    icon: <Brain size={20} />,
  },
  authenticity: {
    label: "Authenticity",
    colorClass: "bg-emerald-500",
    colorText: "text-emerald-600",
    lightBgClass: "bg-emerald-50",
    icon: <CheckCircle2 size={20} />,
  },
  externalInfluence: {
    label: "External Influence",
    colorClass: "bg-amber-500",
    colorText: "text-amber-600",
    lightBgClass: "bg-amber-50",
    icon: <Layers size={20} />,
  },
  identityStability: {
    label: "Identity Stability",
    colorClass: "bg-violet-500",
    colorText: "text-violet-600",
    lightBgClass: "bg-violet-50",
    icon: <BookOpen size={20} />,
  },
  emotionalAlignment: {
    label: "Emotional Alignment",
    colorClass: "bg-pink-500",
    colorText: "text-pink-600",
    lightBgClass: "bg-pink-50",
    icon: <Heart size={20} />,
  },
  decisionClarity: {
    label: "Decision Clarity",
    colorClass: "bg-indigo-500",
    colorText: "text-indigo-600",
    lightBgClass: "bg-indigo-50",
    icon: <Compass size={20} />,
  },
  innerConsistency: {
    label: "Inner Consistency",
    colorClass: "bg-cyan-500",
    colorText: "text-cyan-600",
    lightBgClass: "bg-cyan-50",
    icon: <Layers size={20} />,
  },
  socialExpression: {
    label: "Social Expression",
    colorClass: "bg-orange-500",
    colorText: "text-orange-600",
    lightBgClass: "bg-orange-50",
    icon: <CheckCircle2 size={20} />,
  },
};

const answerOptions = [
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
];

export default function WhoYouReallyArePage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(AnswerValue | null)[]>(
    Array(IDENTITY_QUESTIONS.length).fill(null),
  );
  const [showRestartModal, setShowRestartModal] = useState(false);

  const currentQuestion = IDENTITY_QUESTIONS[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex];
  const progress =
    ((currentQuestionIndex + 1) / IDENTITY_QUESTIONS.length) * 100;
  const isLastQuestion = currentQuestionIndex === IDENTITY_QUESTIONS.length - 1;

  const handleSelectAnswer = (value: AnswerValue) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentAnswer === null) return;

    if (isLastQuestion) {
      setIsCompleted(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Enter key support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "Enter" &&
        hasStarted &&
        !isCompleted &&
        currentAnswer !== null
      ) {
        event.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    currentAnswer,
    currentQuestionIndex,
    isLastQuestion,
    hasStarted,
    isCompleted,
  ]);

  // RESULTS SCREEN
  if (isCompleted) {
    // Convert answers to responses object
    const responses: Record<number, number> = {};
    answers.forEach((answer, idx) => {
      if (answer !== null) {
        responses[IDENTITY_QUESTIONS[idx].id] = answer;
      }
    });

    // Calculate dimensions and get complete result
    const dimensionScores = calculateDimensionScores(responses);
    const completeResult = getCompleteResult(dimensionScores);
    const primaryIdentity = IDENTITIES[completeResult.primary.type];

    return (
      <div className="min-h-screen bg-slate-50 py-12 md:py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Top Badge */}
          <div className="flex justify-center mb-6">
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
              Identity Profile
            </span>
          </div>

          {/* Main Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              You are
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              {completeResult.primary.name}
            </h2>
            <p className="text-lg md:text-xl text-slate-500 italic mb-4">
              "{primaryIdentity.tagline}"
            </p>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
              {completeResult.primary.description}
            </p>

            {/* Identity Image */}
            <div className="flex justify-center mb-12">
              <IdentityImage
                type={completeResult.primary.type}
                name={completeResult.primary.name}
                size="large"
              />
            </div>
          </div>

          {/* Dimensions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {Object.entries(dimensionScores).map(([key, value]) => {
              const metadata =
                dimensionMetadata[key as keyof typeof dimensionMetadata];
              const percentage = Math.min(100, Math.max(0, Math.round(value)));

              return (
                <div
                  key={key}
                  className={`${metadata.lightBgClass} border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className={`w-8 h-8 rounded-md ${metadata.lightBgClass} flex items-center justify-center`}
                      >
                        <div className={`${metadata.colorText} w-4 h-4`}>
                          {metadata.icon}
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-slate-900">
                        {metadata.label}
                      </span>
                    </div>
                    <span
                      className={`${metadata.lightBgClass} px-3 py-1 rounded-lg text-slate-900 font-bold text-lg`}
                    >
                      {percentage}%
                    </span>
                  </div>

                  <div className="w-full h-3 rounded-full bg-white border border-slate-200 overflow-hidden">
                    {/* eslint-disable-next-line */}
                    <div
                      className={`h-full rounded-full transition-all duration-500 ease-out ${metadata.colorClass}`}
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Core Pattern Section */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={20} className="text-blue-600" />
              <h3 className="text-lg font-semibold text-slate-900">
                Your core pattern
              </h3>
            </div>
            <p className="text-base text-slate-700 leading-relaxed">
              {primaryIdentity.corePattern}
            </p>
          </div>

          {/* Key Traits */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Brain size={20} className="text-slate-600" />
              <h3 className="text-lg font-semibold text-slate-900">
                Psychological traits
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {primaryIdentity.psychologicalTraits.map((trait, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-xl p-4 flex gap-3 items-start"
                >
                  <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center mt-0.5 shrink-0">
                    <CheckCircle2 size={14} className="text-slate-600" />
                  </div>
                  <p className="text-sm text-slate-600">{trait}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={20} className="text-emerald-500" />
              <h3 className="text-lg font-semibold text-slate-900">
                Your strengths
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {primaryIdentity.strengths.map((strength, idx) => (
                <div
                  key={idx}
                  className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 flex items-start gap-2"
                >
                  <CheckCircle2
                    size={16}
                    className="text-emerald-500 mt-0.5 shrink-0"
                  />
                  <p className="text-xs text-slate-700 font-medium">
                    {strength}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Weaknesses */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle size={20} className="text-red-500" />
              <h3 className="text-lg font-semibold text-slate-900">
                Areas for growth
              </h3>
            </div>
            <div className="space-y-3">
              {primaryIdentity.weaknesses.map((weakness, idx) => (
                <div
                  key={idx}
                  className="bg-red-50 border border-red-100 rounded-xl p-4 flex gap-3 items-start"
                >
                  <AlertCircle
                    size={16}
                    className="text-red-500 mt-0.5 shrink-0"
                  />
                  <p className="text-sm text-slate-700">{weakness}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Insights */}
          {completeResult.keyInsights.length > 0 && (
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Heart size={20} className="text-blue-600" />
                <h3 className="text-lg font-semibold text-slate-900">
                  Key insights
                </h3>
              </div>
              <div className="space-y-3">
                {completeResult.keyInsights.map((insight, idx) => (
                  <p key={idx} className="text-sm text-slate-700">
                    • {insight}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Compass size={20} className="text-indigo-600" />
              <h3 className="text-lg font-semibold text-slate-900">
                Next steps for growth
              </h3>
            </div>
            <div className="space-y-3">
              {completeResult.nextSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-xl p-4 flex gap-4 items-start"
                >
                  <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                    <span className="text-xs font-bold text-blue-600">
                      {idx + 1}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Identity Match */}
          {completeResult.secondary && (
            <div className="bg-slate-100 border border-slate-300 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                You also align with:{" "}
                <span className="text-blue-600">
                  {completeResult.secondary.name}
                </span>
              </h3>
              <p className="text-sm text-slate-700">
                {completeResult.secondary.description}
              </p>
              <p className="text-xs text-slate-600 mt-3">
                Match score: {completeResult.secondary.similarityScore}%
              </p>
            </div>
          )}

          {/* CTA Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 text-center">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Want to explore further?
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Take the test again to see how your identity evolves
            </p>
            <button
              onClick={() => {
                setIsCompleted(false);
                setHasStarted(false);
                setCurrentQuestionIndex(0);
                setAnswers(Array(IDENTITY_QUESTIONS.length).fill(null));
              }}
              className="px-8 py-3 rounded-lg bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            >
              Retake Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  // GUIDELINES SCREEN
  if (!hasStarted) {
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
            Test guidelines
          </h1>

          {/* Guidelines List */}
          <div className="mt-5 space-y-4 text-sm md:text-base text-slate-600">
            <div className="flex items-start gap-3">
              <CheckCircle2
                size={20}
                style={{ color: "#5CE1E6" }}
                className="shrink-0 mt-0.5"
              />
              <p className="text-left">
                Answer each statement based on your personal opinion
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2
                size={20}
                style={{ color: "#5CE1E6" }}
                className="shrink-0 mt-0.5"
              />
              <p className="text-left">
                You cannot skip questions, but you can return to them later
              </p>
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={() => setHasStarted(true)}
            className="w-full mt-6 px-6 py-3.5 rounded-lg bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
          >
            Start test
          </button>
        </div>
      </div>
    );
  }

  // TEST SCREEN
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Restart Modal */}
        {showRestartModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Restart test?
              </h2>
              <p className="text-slate-600 mb-8">
                You will lose your current progress.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowRestartModal(false)}
                  className="px-4 py-2 rounded-lg border-2 border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setCurrentQuestionIndex(0);
                    setAnswers(Array(IDENTITY_QUESTIONS.length).fill(null));
                    setShowRestartModal(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-linear-to-r from-blue-500 to-cyan-500 text-white font-medium hover:shadow-lg transition"
                >
                  Restart
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Top Controls: Back + Restart */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {currentQuestionIndex > 0 && (
              <button
                onClick={handlePrevious}
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
                title="Go to previous question"
              >
                <ArrowLeft size={16} />
                Back
              </button>
            )}
          </div>
          <button
            onClick={() => setShowRestartModal(true)}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
            title="Restart test"
          >
            <RotateCcw size={16} />
            Restart
          </button>
        </div>

        {/* Progress Section */}
        <div className="mb-10">
          {/* Progress Text */}
          <div className="flex justify-between items-center mb-3 text-sm">
            <span className="text-gray-600">{Math.round(progress)}%</span>
            <span className="text-gray-600">
              Step {currentQuestionIndex + 1} of {IDENTITY_QUESTIONS.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            {/* eslint-disable-next-line */}
            <div
              className="h-full rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${progress}%`,
                backgroundImage: "linear-gradient(to right, #3b82f6, #06b6d4)",
              }}
            />
          </div>
        </div>

        {/* Question - Moved ABOVE Answer Scale */}
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 leading-relaxed">
            {currentQuestion.text}
          </h2>
        </div>

        {/* Instruction Text */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-600">
            Choose how accurately each statement reflects you.
          </p>
        </div>

        {/* Answer Scale - PERFECTLY LINEAR */}
        <div className="flex justify-between items-center gap-2 mb-12 px-4">
          {answerOptions.map((option) => (
            <div
              key={option.value}
              className="flex flex-col items-center gap-3"
            >
              {/* Circle Button */}
              {/* eslint-disable-next-line */}
              <button
                onClick={() => handleSelectAnswer(option.value)}
                className="shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all border-gray-300 hover:border-gray-400 hover:scale-110 bg-white"
                style={
                  currentAnswer === option.value
                    ? {
                        borderColor: option.color,
                        boxShadow: `0 0 0 2px white, 0 0 0 4px ${option.color}`,
                      }
                    : {}
                }
                title={option.label}
              >
                {/* Inner dot when selected */}
                {currentAnswer === option.value && (
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: option.color }}
                  />
                )}
              </button>

              {/* Label */}
              <span className="text-xs text-gray-600 text-center whitespace-normal max-w-13.75">
                {option.label}
              </span>
            </div>
          ))}
        </div>

        {/* Navigation Button */}
        <button
          onClick={handleNext}
          disabled={currentAnswer === null}
          className={`w-full py-3 rounded-lg font-medium transition-all ${
            currentAnswer === null
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-md hover:shadow-lg hover:scale-105"
          }`}
        >
          {isLastQuestion ? "Complete Test" : "Next"}
        </button>

        {/* Keyboard Hint */}
        {currentAnswer !== null && (
          <p className="text-xs text-slate-400 text-center mt-3">
            Press Enter to continue
          </p>
        )}

        {/* Progress indicator dots */}
        <div className="flex justify-center gap-1 mt-10">
          {IDENTITY_QUESTIONS.map((_: IdentityQuestion, index: number) => (
            <div
              key={index}
              className="h-2 rounded-full transition-all"
              style={{
                width: index <= currentQuestionIndex ? "24px" : "8px",
                backgroundColor:
                  index <= currentQuestionIndex ? "#4399E6" : "#D1D5DB",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
