"use client";

import React, { useMemo } from "react";
import { X } from "lucide-react";
import { PersonalityType, Dimension } from "@/lib/personality-engine/types";

interface PersonalityModalProps {
  type: PersonalityType | null;
  isOpen: boolean;
  onClose: () => void;
}

// Mock dimension scores for display (in production, these would come from actual assessment)
const generateMockDimensionScores = (
  title: string,
): Record<Dimension, number> => {
  const seed = title.length;
  return {
    logic: 50 + ((seed * 7) % 40),
    intuition: 45 + (((seed + 3) * 11) % 45),
    reflection: 55 + (((seed + 1) * 13) % 40),
    decisiveness: 60 + (((seed + 2) * 7) % 35),
    emotionalSensitivity: 40 + (((seed + 4) * 9) % 50),
    emotionalControl: 55 + (((seed + 5) * 8) % 40),
    socialEnergy: 50 + (((seed + 6) * 6) % 45),
    socialDepth: 60 + (((seed + 7) * 7) % 35),
    discipline: 65 + (((seed + 8) * 5) % 30),
    impulsiveness: 40 + (((seed + 9) * 8) % 50),
    riskTolerance: 55 + (((seed + 10) * 9) % 40),
    flexibility: 50 + (((seed + 11) * 7) % 45),
  };
};

const DIMENSIONS: { name: string; key: Dimension; color: string }[] = [
  { name: "Logic", key: "logic", color: "bg-blue-500" },
  { name: "Intuition", key: "intuition", color: "bg-purple-500" },
  { name: "Reflection", key: "reflection", color: "bg-indigo-500" },
  { name: "Decisiveness", key: "decisiveness", color: "bg-cyan-500" },
  {
    name: "Emotional Sensitivity",
    key: "emotionalSensitivity",
    color: "bg-pink-500",
  },
  { name: "Emotional Control", key: "emotionalControl", color: "bg-red-500" },
  { name: "Social Energy", key: "socialEnergy", color: "bg-amber-500" },
  { name: "Social Depth", key: "socialDepth", color: "bg-violet-500" },
  { name: "Discipline", key: "discipline", color: "bg-emerald-500" },
  { name: "Impulsiveness", key: "impulsiveness", color: "bg-orange-500" },
  { name: "Risk Tolerance", key: "riskTolerance", color: "bg-yellow-500" },
  { name: "Flexibility", key: "flexibility", color: "bg-teal-500" },
];

export function PersonalityModal({
  type,
  isOpen,
  onClose,
}: PersonalityModalProps) {
  const dimensionScores: Record<Dimension, number> = useMemo(
    () =>
      type
        ? generateMockDimensionScores(type.title)
        : {
            logic: 50,
            intuition: 50,
            reflection: 50,
            decisiveness: 50,
            emotionalSensitivity: 50,
            emotionalControl: 50,
            socialEnergy: 50,
            socialDepth: 50,
            discipline: 50,
            impulsiveness: 50,
            riskTolerance: 50,
            flexibility: 50,
          },
    [type],
  );

  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      {/* Modal Container */}
      <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-6 md:p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          title="Close modal"
          aria-label="Close modal"
          className="absolute top-6 right-6 md:top-8 md:right-8 p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 hover:text-slate-900"
        >
          <X size={24} />
        </button>

        {/* Content with spacing */}
        <div className="pr-8 space-y-8">
          {/* Header */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              {type.title}
            </h2>
            <p className="text-blue-600 font-semibold text-lg">
              {type.tagline}
            </p>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">
              Who You Are
            </h3>
            <div className="space-y-3">
              <p className="text-slate-700 leading-relaxed">{type.shortDesc}</p>
              {type.deepDesc.map((paragraph, idx) => (
                <p key={idx} className="text-slate-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Emotional Experience */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">
              How You Feel
            </h3>
            <p className="text-slate-700 leading-relaxed italic border-l-4 border-blue-300 pl-4">
              "{type.emotionalExperience}"
            </p>
          </div>

          {/* Dimensions */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Your Dimensions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DIMENSIONS.map((dim) => {
                const value = dimensionScores[dim.key] || 50;
                const percentage = Math.round(value);

                return (
                  <div key={dim.key}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-900">
                        {dim.name}
                      </span>
                      <span className="text-sm font-bold text-slate-600">
                        {percentage}%
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${dim.color}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Strengths */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">
              Your Strengths
            </h3>
            <ul className="space-y-2">
              {type.strengths.map((strength, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-emerald-500 font-bold mt-1">✓</span>
                  <span className="text-slate-700">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Blind Spots */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">
              Blind Spots
            </h3>
            <ul className="space-y-2">
              {type.blindSpots.map((blindSpot, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-amber-500 font-bold mt-1">!</span>
                  <span className="text-slate-700">{blindSpot}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">
              What to Do
            </h3>
            <ol className="space-y-3">
              {type.actions.map((action, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-blue-100 text-blue-600 font-semibold flex items-center justify-center text-sm">
                    {idx + 1}
                  </span>
                  <span className="text-slate-700 pt-0.5">{action}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Closing Line */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
            <p className="text-lg font-semibold text-slate-900 italic">
              "{type.closingLine}"
            </p>
          </div>

          {/* Footer Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={onClose}
              className="px-8 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:scale-105 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
