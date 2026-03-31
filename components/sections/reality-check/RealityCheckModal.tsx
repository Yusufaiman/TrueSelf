import React from "react";
import { RealityCheckType } from "@/lib/personality-engine/reality-check-types";
import { X, Eye, Zap, AlertCircle, TrendingUp } from "lucide-react";

interface RealityCheckModalProps {
  type: RealityCheckType | null;
  isOpen: boolean;
  onClose: () => void;
}

const RealityCheckModal: React.FC<RealityCheckModalProps> = ({
  type,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[85vh] rounded-2xl bg-white shadow-2xl overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          title="Close modal"
          aria-label="Close modal"
          className="sticky top-0 right-0 z-10 rounded-full bg-white p-2 text-slate-600 hover:text-slate-700 transition-colors duration-200 float-right m-4"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="p-8 pt-12">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-slate-900 mb-2">
              {type.name}
            </h2>
            <p className="text-lg text-slate-600 font-semibold italic">
              "{type.identityStatement}"
            </p>
          </div>

          {/* Sections Grid */}
          <div className="space-y-6">
            {/* Full Description */}
            <div className="rounded-lg bg-slate-50 p-6 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-3 text-lg">
                Overview
              </h3>
              <p className="text-slate-700 leading-relaxed">{type.fullDesc}</p>
            </div>

            {/* Behavioral Pattern */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Eye size={20} className="text-slate-600" />
                <h3 className="font-bold text-slate-900">Behavioral Pattern</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {type.behavioralPattern.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 items-start rounded-lg bg-slate-50 p-3 border border-slate-200"
                  >
                    <span className="flex-shrink-0 inline-flex items-center justify-center h-6 w-6 rounded-full bg-slate-200 text-slate-600 text-xs font-bold">
                      {idx + 1}
                    </span>
                    <p className="text-slate-700 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Strength */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap size={20} className="text-amber-500" />
                <h3 className="font-bold text-slate-900">Strength</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {type.strength.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 items-start rounded-lg bg-amber-50 p-3 border border-amber-200"
                  >
                    <span className="flex-shrink-0 inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-100 text-amber-600 text-xs font-bold">
                      ✓
                    </span>
                    <p className="text-slate-700 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk / Blind Spot */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle size={20} className="text-red-500" />
                <h3 className="font-bold text-slate-900">Risk / Blind Spot</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {type.risk.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 items-start rounded-lg bg-red-50 p-3 border border-red-200"
                  >
                    <span className="flex-shrink-0 inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-600 text-xs font-bold">
                      !
                    </span>
                    <p className="text-slate-700 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Improvement Direction */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={20} className="text-blue-600" />
                <h3 className="font-bold text-slate-900">
                  Improvement Direction
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {type.improvementDirection.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 items-start rounded-lg bg-blue-50 p-3 border border-blue-200"
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

export default RealityCheckModal;
