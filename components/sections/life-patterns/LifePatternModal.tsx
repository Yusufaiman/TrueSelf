"use client";

import React from "react";
import { X, Brain, Lightbulb, AlertCircle, Target } from "lucide-react";
import { LifePatternType } from "@/lib/personality-engine/life-pattern-types";

interface LifePatternModalProps {
  type: LifePatternType | null;
  isOpen: boolean;
  onClose: () => void;
}

export const LifePatternModal: React.FC<LifePatternModalProps> = ({
  type,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-slate-600" />
        </button>

        {/* Image Placeholder */}
        <div className="w-full h-64 bg-linear-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center mb-8">
          <span className="text-orange-300 text-sm">
            Life Pattern Type Visual
          </span>
        </div>

        {/* Header */}
        <div className="text-center border-b border-slate-200 pb-6 mb-8">
          <h2 className="text-4xl font-bold text-slate-900 mb-1">
            {type.name}
          </h2>
          <p className="text-lg text-orange-600 font-semibold">
            {type.tagline}
          </p>
        </div>

        <div className="space-y-8 pr-8">
          {/* Overview Section */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <h3 className="text-lg font-semibold text-slate-900">Overview</h3>
            </div>
            <p className="text-base text-slate-700 leading-relaxed">
              {type.fullDesc}
            </p>
          </div>

          {/* How This Shows Up Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-slate-900">
                How This Shows Up
              </h3>
            </div>
            <div className="grid gap-3">
              {type.behavior.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100/50 transition-colors duration-200"
                >
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-orange-600">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-slate-900">
                Strengths
              </h3>
            </div>
            <div className="grid gap-3">
              {type.strengths.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100/50 transition-colors duration-200"
                >
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-orange-600">
                      ✓
                    </span>
                  </div>
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Blind Spots Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-semibold text-slate-900">
                Blind Spots
              </h3>
            </div>
            <div className="grid gap-3">
              {type.blindSpots.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-3 bg-amber-50 rounded-lg hover:bg-amber-100/50 transition-colors duration-200"
                >
                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-amber-600">
                      !
                    </span>
                  </div>
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What to Do Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-slate-900">
                What to Do
              </h3>
            </div>
            <div className="grid gap-3">
              {type.actionItems.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100/50 transition-colors duration-200"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-blue-600">
                      →
                    </span>
                  </div>
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
