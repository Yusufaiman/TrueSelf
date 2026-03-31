"use client";

import React from "react";
import { EmotionalHealthType } from "@/lib/personality-engine/emotional-health-types";

interface EmotionalHealthCardProps {
  type: EmotionalHealthType;
  onViewDetails: (type: EmotionalHealthType) => void;
}

export const EmotionalHealthCard: React.FC<EmotionalHealthCardProps> = ({
  type,
  onViewDetails,
}) => {
  return (
    <div className="group bg-white border border-slate-200 rounded-xl p-6 flex flex-col h-full hover:border-rose-300 hover:shadow-lg hover:shadow-rose-500/10 transition-all duration-200">
      {/* Image Placeholder */}
      <div className="w-full aspect-video bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center mb-4">
        <span className="text-slate-300 text-sm">Image placeholder</span>
      </div>

      {/* Content */}
      <div className="flex-1">
        {/* Type Name */}
        <h3 className="text-lg font-semibold text-slate-900 mb-1 group-hover:text-rose-600 transition-colors duration-200">
          {type.name}
        </h3>

        {/* Tagline */}
        <p className="text-sm text-rose-600 font-medium mb-2">{type.tagline}</p>

        {/* Description */}
        <p className="text-sm text-slate-600 line-clamp-3">{type.shortDesc}</p>
      </div>

      {/* Button */}
      <button
        onClick={() => onViewDetails(type)}
        className="mt-4 px-4 py-2 bg-linear-to-r from-rose-600 to-pink-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-rose-500/20 transition-all duration-200 w-full"
      >
        View Details
      </button>
    </div>
  );
};
