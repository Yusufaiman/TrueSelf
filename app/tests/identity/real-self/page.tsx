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
  Target,
  Lock,
  Lightbulb,
  Wind,
  Flame,
  Eye,
} from "lucide-react";
import {
  REAL_SELF_QUESTIONS,
  RealSelfDimension,
} from "@/lib/personality-engine/real-self-questions";
import {
  calculateRealSelfResult,
  type AnswerValue,
} from "@/lib/personality-engine/real-self-engine";

interface DimensionMetadata {
  label: string;
  colorClass: string;
  colorText: string;
  lightBgClass: string;
  icon: React.ReactNode;
}

const dimensionMetadata: Record<RealSelfDimension, DimensionMetadata> = {
  self_awareness: {
    label: "Self Awareness",
    colorClass: "bg-blue-500",
    colorText: "text-blue-600",
    lightBgClass: "bg-blue-50",
    icon: <Eye size={20} />,
  },
  alignment: {
    label: "Alignment",
    colorClass: "bg-green-500",
    colorText: "text-green-600",
    lightBgClass: "bg-green-50",
    icon: <Target size={20} />,
  },
  authenticity: {
    label: "Authenticity",
    colorClass: "bg-pink-500",
    colorText: "text-pink-600",
    lightBgClass: "bg-pink-50",
    icon: <Heart size={20} />,
  },
  confidence: {
    label: "Confidence",
    colorClass: "bg-purple-500",
    colorText: "text-purple-600",
    lightBgClass: "bg-purple-50",
    icon: <Lock size={20} />,
  },
  direction: {
    label: "Direction",
    colorClass: "bg-orange-500",
    colorText: "text-orange-600",
    lightBgClass: "bg-orange-50",
    icon: <Compass size={20} />,
  },
  emotional_clarity: {
    label: "Emotional Clarity",
    colorClass: "bg-cyan-500",
    colorText: "text-cyan-600",
    lightBgClass: "bg-cyan-50",
    icon: <Brain size={20} />,
  },
  action_consistency: {
    label: "Action Consistency",
    colorClass: "bg-teal-500",
    colorText: "text-teal-600",
    lightBgClass: "bg-teal-50",
    icon: <CheckCircle2 size={20} />,
  },
  internal_conflict: {
    label: "Internal Conflict",
    colorClass: "bg-red-500",
    colorText: "text-red-600",
    lightBgClass: "bg-red-50",
    icon: <AlertCircle size={20} />,
  },
  identity_suppression: {
    label: "Identity Suppression",
    colorClass: "bg-indigo-500",
    colorText: "text-indigo-600",
    lightBgClass: "bg-indigo-50",
    icon: <Layers size={20} />,
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

export default function RealSelfPage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(AnswerValue | null)[]>(
    Array(REAL_SELF_QUESTIONS.length).fill(null),
  );
  const [showRestartModal, setShowRestartModal] = useState(false);

  const currentQuestion = REAL_SELF_QUESTIONS[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex];
  const progress =
    ((currentQuestionIndex + 1) / REAL_SELF_QUESTIONS.length) * 100;
  const isLastQuestion =
    currentQuestionIndex === REAL_SELF_QUESTIONS.length - 1;

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

  const handleRestart = () => {
    setHasStarted(false);
    setIsCompleted(false);
    setCurrentQuestionIndex(0);
    setAnswers(Array(REAL_SELF_QUESTIONS.length).fill(null));
    setShowRestartModal(false);
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
    const responses: Record<number, AnswerValue> = {};
    answers.forEach((answer, idx) => {
      if (answer !== null) {
        responses[REAL_SELF_QUESTIONS[idx].id] = answer;
      }
    });

    const result = calculateRealSelfResult(responses);

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
              Your real self vs your current self
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-4">
              {result.message}
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mt-4">
              Gap Level: <strong>{result.gapLevel}</strong>
            </p>
          </div>

          {/* Dimensions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {(
              [
                "self_awareness",
                "alignment",
                "authenticity",
                "confidence",
                "direction",
                "emotional_clarity",
                "action_consistency",
              ] as RealSelfDimension[]
            ).map((dimension) => {
              const metadata = dimensionMetadata[dimension];
              const percentage = Math.round(result.dimensions[dimension]);

              return (
                <div
                  key={dimension}
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

          {/* What's really going on */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={20} className="text-blue-600" />
              <h3 className="text-lg font-semibold text-slate-900">
                What&apos;s really going on
              </h3>
            </div>
            <p className="text-base text-slate-700 leading-relaxed">
              You are operating as {result.currentIdentity}, carrying patterns
              of suppressed identity. Your real self, {result.realIdentity}, is
              waiting beneath the surface to emerge.
            </p>
          </div>

          {/* The Gap Between You */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Brain size={20} className="text-slate-600" />
              <h3 className="text-lg font-semibold text-slate-900">
                The gap between you
              </h3>
            </div>
            <div className="space-y-3">
              <div className="bg-white rounded-xl p-4">
                <p className="text-sm text-slate-700">
                  <strong>Current Identity:</strong> {result.currentIdentity}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <p className="text-sm text-slate-700">
                  <strong>Real Identity:</strong> {result.realIdentity}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <p className="text-sm text-slate-700">
                  <strong>Gap Level:</strong> {result.gapLevel}
                </p>
              </div>
            </div>
          </div>

          {/* What You Might Not Realize */}
          {result.flips && result.flips.length > 0 && (
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Eye size={20} className="text-purple-600" />
                <h3 className="text-lg font-semibold text-slate-900">
                  What you might not realize
                </h3>
              </div>
              <div className="space-y-3">
                {result.flips.map((flip, idx) => (
                  <p key={idx} className="text-sm text-slate-700">
                    • {flip}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Hidden Strengths */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={20} className="text-emerald-500" />
              <h3 className="text-lg font-semibold text-slate-900">
                Your hidden strengths
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {result.flips && result.flips.length === 0
                ? [
                    "Self-awareness",
                    "Authenticity Potential",
                    "Personal Growth",
                    "Inner Clarity",
                    "Possibility",
                    "Courage",
                  ].map((strength, idx) => (
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
                  ))
                : [
                    "Self-knowledge",
                    "Awareness",
                    "Potential",
                    "Insight",
                    "Honesty",
                    "Evolution",
                  ].map((strength, idx) => (
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

          {/* CTA Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 text-center">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Ready to bridge the gap?
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Take this test again to track your progress toward your real self
            </p>
            <button
              onClick={() => {
                setIsCompleted(false);
                setHasStarted(false);
                setCurrentQuestionIndex(0);
                setAnswers(Array(REAL_SELF_QUESTIONS.length).fill(null));
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

          {/* Info Text */}
          <p className="text-xs text-slate-500 mt-4">
            Takes approximately 5 minutes to complete
          </p>
        </div>
      </div>
    );
  }

  // QUESTION SCREEN
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-3xl mx-auto">
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
              Step {currentQuestionIndex + 1} of {REAL_SELF_QUESTIONS.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
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
          {REAL_SELF_QUESTIONS.map(
            (_: (typeof REAL_SELF_QUESTIONS)[0], index: number) => (
              <div
                key={index}
                className="h-2 rounded-full transition-all"
                style={{
                  width: index <= currentQuestionIndex ? "24px" : "8px",
                  backgroundColor:
                    index <= currentQuestionIndex ? "#4399E6" : "#D1D5DB",
                }}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
