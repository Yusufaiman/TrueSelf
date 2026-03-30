"use client";

import React from "react";
import { X, Lightbulb, Target, AlertCircle, TrendingUp } from "lucide-react";
import { RelationshipType } from "@/lib/personality-engine/relationship-types";

interface RelationshipModalProps {
  type: RelationshipType | null;
  isOpen: boolean;
  onClose: () => void;
}

export function RelationshipModal({
  type,
  isOpen,
  onClose,
}: RelationshipModalProps) {
  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      {/* Modal Container */}
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          title="Close modal"
          aria-label="Close modal"
          className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 hover:text-slate-900"
        >
          <X size={24} />
        </button>

        {/* Content with spacing */}
        <div className="pr-8 space-y-8">
          {/* Image Placeholder */}
          <div className="w-full h-64 bg-linear-to-br from-rose-100 to-pink-100 rounded-xl flex items-center justify-center">
            <span className="text-rose-400 text-sm font-medium">
              Relationship Type Visual
            </span>
          </div>

          {/* Header */}
          <div className="text-center border-b border-slate-200 pb-6">
            <h2 className="text-4xl font-bold text-slate-900 mb-2">
              {type.name}
            </h2>
            <p className="text-rose-600 font-semibold text-lg">
              {type.tagline}
            </p>
          </div>

          {/* Overview Section */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              Overview
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              {type.fullDesc}
            </p>
          </div>

          {/* How You Behave Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Target className="text-rose-500" size={20} />
              How You Behave
            </h3>
            <div className="grid gap-3">
              {type.behavior.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-3 bg-slate-50 rounded-lg hover:bg-rose-50/30 transition-colors"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center">
                    <span className="text-xs font-semibold text-rose-600">
                      ✓
                    </span>
                  </div>
                  <p className="text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Lightbulb className="text-rose-500" size={20} />
              Strengths
            </h3>
            <div className="grid gap-3">
              {type.strengths.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-3 bg-rose-50 rounded-lg hover:bg-rose-100/50 transition-colors"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-200 flex items-center justify-center">
                    <span className="text-xs font-bold text-rose-700">+</span>
                  </div>
                  <p className="text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Blind Spots Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle className="text-amber-500" size={20} />
              Blind Spots
            </h3>
            <div className="grid gap-3">
              {type.blindSpots.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-3 bg-amber-50 rounded-lg hover:bg-amber-100/50 transition-colors"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center">
                    <span className="text-xs font-bold text-amber-700">!</span>
                  </div>
                  <p className="text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What to Work On Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="text-blue-500" size={20} />
              What to Work On
            </h3>
            <div className="grid gap-3">
              {type.actionItems.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100/50 transition-colors"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-700">→</span>
                  </div>
                  <p className="text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-linear-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-xl p-6 space-y-2">
            <p className="text-slate-700 leading-relaxed">
              <span className="font-semibold text-slate-900">Remember:</span>{" "}
              Understanding your relationship patterns is the first step toward
              building healthier, more fulfilling connections. Everyone has
              multiple relationship types, and your unique combination is what
              makes you who you are.
            </p>
          </div>

          {/* Footer Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={onClose}
              className="px-8 py-2.5 rounded-lg bg-linear-to-r from-rose-500 to-pink-500 text-white font-medium hover:scale-105 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
