"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";

type AnswerValue = 1 | 2 | 3 | 4 | 5;

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
}: TestQuestionTemplateProps) {
  const [showRestartModal, setShowRestartModal] = useState(false);

  // Enter key support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && value !== null) {
        event.preventDefault();
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [value, onNext]);

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
                  className="px-4 py-2 rounded-lg border-2 border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRestart}
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
            {onPrevious && step > 1 && (
              <button
                onClick={onPrevious}
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
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
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
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
        <div className="flex justify-between items-center gap-2 mb-12 px-4">
          {answerOptions.map((option) => (
            <div
              key={option.value}
              className="flex flex-col items-center gap-3"
            >
              {/* Circle Button */}
              <button
                onClick={() => onChange(option.value)}
                className="shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all border-gray-300 hover:border-gray-400 hover:scale-110 bg-white"
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
              <span className="text-xs text-gray-600 text-center whitespace-normal max-w-13.75">
                {option.label}
              </span>
            </div>
          ))}
        </div>

        {/* Navigation Button */}
        <button
          onClick={onNext}
          disabled={value === null}
          className={`w-full py-3 rounded-lg font-medium transition-all ${
            value === null
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-md hover:shadow-lg hover:scale-105"
          }`}
        >
          Next
        </button>

        {/* Keyboard Hint */}
        {value !== null && (
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
