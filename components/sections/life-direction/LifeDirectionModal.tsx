"use client";

import { LifeDirectionType } from "@/lib/personality-engine/life-direction-types";
import { X } from "lucide-react";

export function LifeDirectionModal({
  type,
  isOpen,
  onClose,
}: {
  type: LifeDirectionType | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen || !type) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/50 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-11/12 max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close Button */}
        <div className="sticky top-0 bg-linear-to-r from-yellow-50 to-amber-50 border-b border-yellow-200 px-8 py-6 flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              {type.name}
            </h2>
            <p className="text-lg text-yellow-700 font-semibold">
              {type.tagline}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors mt-1"
            title="Close modal"
            aria-label="Close modal"
          >
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-8 space-y-12">
          {/* Section 1: Overview */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-linear-to-b from-yellow-500 to-amber-500 rounded-full"></div>
              <h3 className="text-2xl font-bold text-slate-900">Overview</h3>
            </div>
            <p className="text-slate-700 leading-relaxed text-lg">
              {type.fullDesc}
            </p>
          </section>

          {/* Section 2: How You Decide */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-linear-to-b from-yellow-500 to-amber-500 rounded-full"></div>
              <h3 className="text-2xl font-bold text-slate-900">
                How You Decide
              </h3>
            </div>
            <ul className="space-y-3">
              {type.behavior.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-slate-700">
                  <span className="text-yellow-600 font-bold flex-shrink-0">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3: Strengths */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-linear-to-b from-yellow-500 to-amber-500 rounded-full"></div>
              <h3 className="text-2xl font-bold text-slate-900">Strengths</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {type.strengths.map((strength, idx) => (
                <div
                  key={idx}
                  className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
                >
                  <p className="text-slate-700 font-medium">{strength}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Blind Spots */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-linear-to-b from-yellow-500 to-amber-500 rounded-full"></div>
              <h3 className="text-2xl font-bold text-slate-900">Blind Spots</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {type.blindSpots.map((blindSpot, idx) => (
                <div
                  key={idx}
                  className="bg-yellow-50/50 border border-yellow-100 rounded-lg p-4"
                >
                  <p className="text-slate-700 font-medium">{blindSpot}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: What This Means For Your Life */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-linear-to-b from-yellow-500 to-amber-500 rounded-full"></div>
              <h3 className="text-2xl font-bold text-slate-900">
                What This Means For Your Life
              </h3>
            </div>
            <ul className="space-y-3">
              {type.lifeImplications.map((implication, idx) => (
                <li key={idx} className="flex gap-3 text-slate-700">
                  <span className="text-yellow-600 font-bold flex-shrink-0">
                    →
                  </span>
                  <span>{implication}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 6: What to Work On */}
          <section className="pb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-linear-to-b from-yellow-500 to-amber-500 rounded-full"></div>
              <h3 className="text-2xl font-bold text-slate-900">
                What to Work On
              </h3>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg p-6">
              <ul className="space-y-3">
                {type.actionItems.map((action, idx) => (
                  <li key={idx} className="flex gap-3 text-slate-700">
                    <span className="text-yellow-600 font-bold flex-shrink-0">
                      {idx + 1}.
                    </span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
