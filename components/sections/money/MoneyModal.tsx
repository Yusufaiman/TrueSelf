import React from "react";
import { MoneyType } from "@/lib/personality-engine/money-types";
import { X, Brain, Lightbulb, AlertCircle, Target } from "lucide-react";

interface MoneyModalProps {
  type: MoneyType | null;
  isOpen: boolean;
  onClose: () => void;
}

const MoneyModal: React.FC<MoneyModalProps> = ({ type, isOpen, onClose }) => {
  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl bg-white shadow-2xl overflow-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          title="Close modal"
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 rounded-full bg-white p-2 text-slate-600 hover:text-green-600 transition-colors duration-200"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Image Placeholder */}
          <div className="w-full h-64 rounded-lg bg-linear-to-br from-green-100 to-emerald-100 border border-green-200 mb-6" />

          {/* Header */}
          <div className="border-b border-slate-200 pb-6 mb-6">
            <h2 className="text-4xl font-bold text-slate-900 mb-2">
              {type.name}
            </h2>
            <p className="text-lg text-green-600 font-semibold">
              {type.tagline}
            </p>
          </div>

          {/* Section Grid */}
          <div className="grid grid-cols-1 gap-6">
            {/* Overview Section */}
            <div className="rounded-lg bg-green-50 p-4 border border-green-100">
              <p className="text-slate-700 leading-relaxed">{type.fullDesc}</p>
            </div>

            {/* How You Think About Money */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Brain size={20} className="text-green-600" />
                <h3 className="font-bold text-slate-900">
                  How You Think About Money
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {type.thinking.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 items-start rounded-lg bg-green-50 p-3 border border-green-100"
                  >
                    <span className="flex-shrink-0 inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600 text-xs font-bold">
                      {idx + 1}
                    </span>
                    <p className="text-slate-700 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* How You Behave */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Brain size={20} className="text-green-600" />
                <h3 className="font-bold text-slate-900">How You Behave</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {type.behavior.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 items-start rounded-lg bg-green-50 p-3 border border-green-100"
                  >
                    <span className="flex-shrink-0 inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600 text-xs font-bold">
                      {idx + 1}
                    </span>
                    <p className="text-slate-700 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb size={20} className="text-green-600" />
                <h3 className="font-bold text-slate-900">Strengths</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {type.strengths.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 items-start rounded-lg bg-green-50 p-3 border border-green-100"
                  >
                    <span className="flex-shrink-0 inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600 text-xs font-bold">
                      ✓
                    </span>
                    <p className="text-slate-700 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Blind Spots */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle size={20} className="text-amber-500" />
                <h3 className="font-bold text-slate-900">Blind Spots</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {type.blindSpots.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 items-start rounded-lg bg-amber-50 p-3 border border-amber-100"
                  >
                    <span className="flex-shrink-0 inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-100 text-amber-600 text-xs font-bold">
                      !
                    </span>
                    <p className="text-slate-700 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* What to Improve */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Target size={20} className="text-blue-600" />
                <h3 className="font-bold text-slate-900">What to Improve</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {type.actionItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 items-start rounded-lg bg-blue-50 p-3 border border-blue-100"
                  >
                    <span className="flex-shrink-0 inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold">
                      →
                    </span>
                    <p className="text-slate-700 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoneyModal;
