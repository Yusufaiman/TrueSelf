"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, X } from "lucide-react";

type AnswerValue = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface AnswerOption {
  value: AnswerValue;
  label: string;
  color: string;
}

interface TestQuestionTemplateProps {
  step: number;
  totalSteps: number;
  question: string;
  instructionText?: string;
  value: AnswerValue | null;
  onChange: (value: AnswerValue) => void;
  onNext: () => void;
  onPrevious?: () => void;
  onRestart?: () => void;
  answerOptions?: AnswerOption[];
  isBusy?: boolean;
}

const defaultAnswerOptions: AnswerOption[] = [
  {
    value: 1,
    label: "Strongly Disagree",
    color: "#EF4444",
  },
  {
    value: 2,
    label: "Disagree",
    color: "#F97316",
  },
  {
    value: 3,
    label: "Neutral",
    color: "#9CA3AF",
  },
  {
    value: 4,
    label: "Agree",
    color: "#22C55E",
  },
  {
    value: 5,
    label: "Strongly Agree",
    color: "#14B8A6",
  },
];

export default function TestQuestionTemplate({
  step,
  totalSteps,
  question,
  instructionText = "Choose how accurately each statement reflects you.",
  value,
  onChange,
  onNext,
  onPrevious,
  onRestart,
  answerOptions = defaultAnswerOptions,
  isBusy = false,
}: TestQuestionTemplateProps) {
  const [showRestartModal, setShowRestartModal] = useState(false);

  // Enter key support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && value !== null && !isBusy) {
        event.preventDefault();
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [value, isBusy, onNext]);

  const progress = (step / totalSteps) * 100;

  const handleRestart = () => {
    if (onRestart) {
      onRestart();
    }
    setShowRestartModal(false);
  };

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
                  disabled={isBusy}
                  className="px-4 py-2 rounded-lg border-2 border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                onClick={handleRestart}
                  disabled={isBusy}
                  className="px-4 py-2 rounded-lg bg-linear-to-r from-blue-500 to-cyan-500 text-white font-medium hover:shadow-lg transition"
                >
                  Restart
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Top Controls: Cancel/Back + Restart */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <Link
              href="/tests"
              className="flex shrink-0 items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-800"
              title="Cancel test"
            >
              <X size={16} />
              Cancel
            </Link>
            {onPrevious && step > 1 && (
              <button
                onClick={onPrevious}
                disabled={isBusy}
                className="flex shrink-0 items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-800"
                title="Go to previous question"
              >
                <ArrowLeft size={16} />
                Back
              </button>
            )}
          </div>
          {onRestart && (
            <button
              onClick={() => setShowRestartModal(true)}
              disabled={isBusy}
              className="flex shrink-0 items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-800"
              title="Restart test"
            >
              <RotateCcw size={16} />
              Restart
            </button>
          )}
        </div>

        {/* Progress Section */}
        <div className="mb-10">
          {/* Progress Text */}
          <div className="flex justify-between items-center mb-3 text-sm">
            <span className="text-gray-600">{Math.round(progress)}%</span>
            <span className="text-gray-600">
              Step {step} of {totalSteps}
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

        {/* Question - Centered */}
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 leading-relaxed">
            {question}
          </h2>
        </div>

        {/* Instruction Text */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-600">{instructionText}</p>
        </div>

        {/* Answer Scale - PERFECTLY LINEAR */}
        <div className="mb-12 grid grid-cols-7 items-start gap-1 px-0 sm:gap-2 sm:px-4">
          {answerOptions.map((option) => (
            <div
              key={option.value}
              className="flex min-w-0 flex-col items-center gap-2 sm:gap-3"
            >
              {/* Circle Button */}
              <button
                onClick={() => onChange(option.value)}
                disabled={isBusy}
                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-gray-300 bg-white transition-all hover:scale-110 hover:border-gray-400 sm:h-10 sm:w-10"
                style={
                  value === option.value
                    ? {
                        borderColor: option.color,
                        boxShadow: `0 0 0 2px white, 0 0 0 4px ${option.color}`,
                      }
                    : {}
                }
                title={option.label}
              >
                {/* Inner dot when selected */}
                {value === option.value && (
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: option.color }}
                  />
                )}
              </button>

              {/* Label */}
              <span className="max-w-[52px] text-center text-[10px] leading-tight text-gray-600 sm:max-w-[64px] sm:text-xs">
                {option.label}
              </span>
            </div>
          ))}
        </div>

        {/* Navigation Button */}
        <button
          onClick={onNext}
          disabled={value === null || isBusy}
          className={`w-full py-3 rounded-lg font-medium transition-all ${
            value === null || isBusy
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-md hover:shadow-lg hover:scale-105"
          }`}
        >
          {isBusy ? "Saving result..." : "Next"}
        </button>

        {/* Keyboard Hint */}
        {value !== null && !isBusy && (
          <p className="text-xs text-slate-400 text-center mt-3">
            Press Enter to continue
          </p>
        )}

        {/* Progress indicator dots */}
        <div className="flex justify-center gap-1 mt-10">
          {Array.from({ length: totalSteps }).map((_, index: number) => (
            <div
              key={index}
              className="h-2 rounded-full transition-all"
              style={{
                width: index < step ? "24px" : "8px",
                backgroundColor: index < step ? "#4399E6" : "#D1D5DB",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
