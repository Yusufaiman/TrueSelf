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
import { DRIVER_QUESTIONS } from "@/lib/personality-engine/drivers-questions";
import {
  calculateDriverResult,
  DriverType,
} from "@/lib/personality-engine/driver-engine";
import { saveTestResult } from "@/utils/supabase/client-results";

type AnswerValue = 1 | 2 | 3 | 4 | 5;

interface DriverMetadata {
  label: string;
  colorClass: string;
  colorText: string;
  lightBgClass: string;
  icon: React.ReactNode;
}

const driverMetadata: Record<DriverType, DriverMetadata> = {
  growth: {
    label: "Growth",
    colorClass: "bg-emerald-500",
    colorText: "text-emerald-600",
    lightBgClass: "bg-emerald-50",
    icon: <Target size={20} />,
  },
  control: {
    label: "Control",
    colorClass: "bg-violet-500",
    colorText: "text-violet-600",
    lightBgClass: "bg-violet-50",
    icon: <Lock size={20} />,
  },
  meaning: {
    label: "Meaning",
    colorClass: "bg-blue-500",
    colorText: "text-blue-600",
    lightBgClass: "bg-blue-50",
    icon: <Lightbulb size={20} />,
  },
  freedom: {
    label: "Freedom",
    colorClass: "bg-orange-500",
    colorText: "text-orange-600",
    lightBgClass: "bg-orange-50",
    icon: <Wind size={20} />,
  },
  emotional: {
    label: "Emotional",
    colorClass: "bg-pink-500",
    colorText: "text-pink-600",
    lightBgClass: "bg-pink-50",
    icon: <Heart size={20} />,
  },
  validation: {
    label: "Validation",
    colorClass: "bg-indigo-500",
    colorText: "text-indigo-600",
    lightBgClass: "bg-indigo-50",
    icon: <Eye size={20} />,
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

export default function WhatDrivesYouPage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(AnswerValue | null)[]>(
    Array(DRIVER_QUESTIONS.length).fill(null),
  );
  const [showRestartModal, setShowRestartModal] = useState(false);

  const currentQuestion = DRIVER_QUESTIONS[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / DRIVER_QUESTIONS.length) * 100;
  const isLastQuestion = currentQuestionIndex === DRIVER_QUESTIONS.length - 1;

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

  // Save result when completed (background, non-blocking)
  useEffect(() => {
    if (isCompleted && answers.some(a => a !== null)) {
      const saveAsync = async () => {
        const responses: Record<number, AnswerValue> = {};
        answers.forEach((answer, idx) => {
          if (answer !== null) {
            responses[DRIVER_QUESTIONS[idx].id] = answer;
          }
        });

        const result = calculateDriverResult(responses);
        
        // Save in background, don't block UI
        await saveTestResult('test_3', result.drivers, result);
      };

      saveAsync().catch(err => {
        console.error('Failed to save result:', err);
        // Silently fail - user experience not affected
      });
    }
  }, [isCompleted]);

  // RESULTS SCREEN
  if (isCompleted) {
    // Convert answers to responses object
    const responses: Record<number, AnswerValue> = {};
    answers.forEach((answer, idx) => {
      if (answer !== null) {
        responses[DRIVER_QUESTIONS[idx].id] = answer;
      }
    });

    // Calculate driver result
    const result = calculateDriverResult(responses);
    const primaryMetadata = driverMetadata[result.primaryDriver];

    return (
      <div className="min-h-screen bg-slate-50 py-12 md:py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Top Badge */}
          <div className="flex justify-center mb-6">
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
              Driver Profile
            </span>
          </div>

          {/* Main Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              You are driven by
            </h1>
            <h2
              className="text-4xl md:text-5xl font-bold mb-2"
              style={{
                color:
                  primaryMetadata.colorClass
                    .replace("bg-", "")
                    .split("-")[0] === "emerald"
                    ? "#10b981"
                    : primaryMetadata.colorClass
                          .replace("bg-", "")
                          .split("-")[0] === "violet"
                      ? "#a855f7"
                      : primaryMetadata.colorClass
                            .replace("bg-", "")
                            .split("-")[0] === "blue"
                        ? "#3b82f6"
                        : "#f97316",
              }}
            >
              {result.label}
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mt-4">
              {driverMetadata[result.primaryDriver].label} is your primary
              driver. This means you are motivated by growth, self-improvement,
              and reaching your full potential.
            </p>
          </div>

          {/* Driver Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {(Object.keys(result.drivers) as DriverType[]).map((driver) => {
              const metadata = driverMetadata[driver];
              const percentage = Math.round(result.drivers[driver]);

              return (
                <div
                  key={driver}
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
              Your psychology reveals that you are deeply motivated by{" "}
              <strong>
                {driverMetadata[result.primaryDriver].label.toLowerCase()}
              </strong>
              . This is a fundamental part of how you experience the world and
              make decisions.
            </p>
          </div>

          {/* How you make decisions */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Brain size={20} className="text-slate-600" />
              <h3 className="text-lg font-semibold text-slate-900">
                How you make decisions
              </h3>
            </div>
            <div className="space-y-3">
              {[
                `Your ${driverMetadata[result.primaryDriver].label.toLowerCase()} drive influences your decisions, often prioritizing opportunities for advancement.`,
                "You tend to evaluate choices based on potential outcomes and alignment with your core motivations.",
                "When faced with decisions, you naturally consider what will move you forward in meaningful ways.",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-xl p-4 flex gap-3 items-start"
                >
                  <CheckCircle2
                    size={16}
                    className="text-slate-400 mt-0.5 shrink-0"
                  />
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Blind Spots */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle size={20} className="text-red-500" />
              <h3 className="text-lg font-semibold text-slate-900">
                Blind spots to watch for
              </h3>
            </div>
            <div className="space-y-3">
              {[
                "You may overlook the present moment in pursuit of future goals.",
                "It's easy to dismiss different perspectives as obstacles rather than opportunities.",
                "You might prioritize your own drivers above others' needs.",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-red-50 border border-red-100 rounded-xl p-4 flex gap-3 items-start"
                >
                  <AlertCircle
                    size={16}
                    className="text-red-500 mt-0.5 shrink-0"
                  />
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hidden Strengths */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={20} className="text-emerald-500" />
              <h3 className="text-lg font-semibold text-slate-900">
                Hidden strengths
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                "Resilience",
                "Ambition",
                "Adaptability",
                "Vision",
                "Determination",
                "Self-awareness",
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

          {/* Key Insights */}
          {result.conflicts.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Heart size={20} className="text-yellow-600" />
                <h3 className="text-lg font-semibold text-slate-900">
                  Important insights
                </h3>
              </div>
              <div className="space-y-3">
                {result.conflicts.map((insight, idx) => (
                  <p key={idx} className="text-sm text-slate-700">
                    • {insight}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* What to start doing */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Compass size={20} className="text-indigo-600" />
              <h3 className="text-lg font-semibold text-slate-900">
                What to start doing
              </h3>
            </div>
            <div className="space-y-3">
              {[
                "Clarify what your drivers actually mean to you in practical terms",
                "Notice how your drives show up in different areas of your life",
                "Find ways to honor your drivers without letting them control you",
                "Explore what other people are driven by and why",
              ].map((step, idx) => (
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

          {/* Identity Type Match */}
          {result.identityTypes.length > 0 && (
            <div className="bg-slate-100 border border-slate-300 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Identity types that resonate:
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.identityTypes.map((type, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Personality Type Match */}
          {result.personalityTypes.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Related personality types:
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.personalityTypes.map((type, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-white border border-blue-200 rounded-lg text-sm font-medium text-slate-700"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 text-center">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Want to explore further?
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Take the test again to see how your drivers evolve
            </p>
            <button
              onClick={() => {
                setIsCompleted(false);
                setHasStarted(false);
                setCurrentQuestionIndex(0);
                setAnswers(Array(DRIVER_QUESTIONS.length).fill(null));
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
              Step {currentQuestionIndex + 1} of {DRIVER_QUESTIONS.length}
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
          {DRIVER_QUESTIONS.map(
            (_: (typeof DRIVER_QUESTIONS)[0], index: number) => (
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
