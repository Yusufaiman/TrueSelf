"use client";

import React from "react";
import { BookOpen } from "lucide-react";
import { PersonalityType } from "@/lib/personality-engine/types";

interface PersonalityCardProps {
  type: PersonalityType;
  onViewDetails: (type: PersonalityType) => void;
}

export function PersonalityCard({ type, onViewDetails }: PersonalityCardProps) {
  return (
    <div className="group bg-white rounded-xl border border-slate-200 p-6 h-full flex flex-col transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10">
      {/* Image Placeholder */}
      <div className="w-full aspect-video bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center mb-6">
        <p className="text-xs text-slate-400">Image placeholder</p>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
          {type.title}
        </h3>

        {/* Tagline */}
        <p className="text-sm text-blue-600 font-semibold mb-3">
          {type.tagline}
        </p>

        {/* Short Description */}
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          {type.shortDesc}
        </p>
      </div>

      {/* View Details Button */}
      <button
        onClick={() => onViewDetails(type)}
        className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2"
      >
        <BookOpen size={16} />
        View Details
      </button>
    </div>
  );
}
