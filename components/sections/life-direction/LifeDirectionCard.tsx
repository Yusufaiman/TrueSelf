"use client";

import { LifeDirectionType } from "@/lib/personality-engine/life-direction-types";

export function LifeDirectionCard({
  type,
  onViewDetails,
}: {
  type: LifeDirectionType;
  onViewDetails?: (type: LifeDirectionType) => void;
}) {
  return (
    <div className="group bg-white rounded-xl border border-slate-200 p-6 h-full flex flex-col transition-all duration-300 hover:border-yellow-300 hover:shadow-lg hover:shadow-yellow-500/10">
      {/* Image Placeholder */}
      <div className="w-full aspect-video bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg border border-yellow-200 flex items-center justify-center mb-6">
        <p className="text-xs text-slate-400">Image placeholder</p>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-yellow-700 transition-colors">
          {type.name}
        </h3>
        <p className="text-sm text-yellow-600 font-semibold mb-3">
          {type.tagline}
        </p>
        <p className="text-sm text-slate-600 line-clamp-3 mb-6">
          {type.shortDesc}
        </p>
      </div>

      {/* View Details Button */}
      <button
        onClick={() => onViewDetails?.(type)}
        className="bg-linear-to-r from-yellow-500 to-amber-500 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/30 group-hover:scale-105"
      >
        View Details
      </button>
    </div>
  );
}
