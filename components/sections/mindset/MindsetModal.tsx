"use client";

import React from "react";
import { X, Brain, Zap, Lightbulb, AlertCircle, Target } from "lucide-react";
import { MindsetType } from "@/lib/personality-engine/mindset-types";

interface MindsetModalProps {
  type: MindsetType | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MindsetModal({
  type,
  isOpen,
  onClose,
}: MindsetModalProps) {
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
          <div className="w-full h-64 bg-linear-to-br from-purple-100 to-violet-100 rounded-xl flex items-center justify-center">
            <span className="text-purple-400 text-sm font-medium">
              Mindset Type Visual
            </span>
          </div>

          {/* Header */}
          <div className="text-center border-b border-slate-200 pb-6">
            <h2 className="text-4xl font-bold text-slate-900 mb-2">
              {type.name}
            </h2>
            <p className="text-purple-600 font-semibold text-lg">
              {type.tagline}
            </p>
          </div>

          {/* Overview Section */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              Overview
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              {type.fullDesc}
            </p>
          </div>

          {/* How This Shows Up Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Brain className="text-purple-500" size={20} />
              How This Shows Up
            </h3>
            <div className="grid gap-3">
              {type.howItShowsUp.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-3 bg-slate-50 rounded-lg hover:bg-purple-50/30 transition-colors"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-xs font-semibold text-purple-600">
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
              <Lightbulb className="text-purple-500" size={20} />
              Strengths
            </h3>
            <div className="grid gap-3">
              {type.strengths.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100/50 transition-colors"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-200 flex items-center justify-center">
                    <span className="text-xs font-bold text-purple-700">+</span>
                  </div>
                  <p className="text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Blind Spots Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle className="text-violet-500" size={20} />
              Blind Spots
            </h3>
            <div className="grid gap-3">
              {type.blindSpots.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-3 bg-violet-50 rounded-lg hover:bg-violet-100/50 transition-colors"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-200 flex items-center justify-center">
                    <span className="text-xs font-bold text-violet-700">!</span>
                  </div>
                  <p className="text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What to Work On Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Target className="text-blue-500" size={20} />
              What to Work On
            </h3>
            <div className="grid gap-3">
              {type.actionItems.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100/50 transition-colors"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-700">✓</span>
                  </div>
                  <p className="text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
