"use client";

import React from "react";
import { RelationshipType } from "@/lib/personality-engine/relationship-types";

interface RelationshipCardProps {
  type: RelationshipType;
  onViewDetails?: (type: RelationshipType) => void;
}

export function RelationshipCard({
  type,
  onViewDetails,
}: RelationshipCardProps) {
  return (
    <div className="group bg-white rounded-xl border border-slate-200 p-6 h-full flex flex-col transition-all duration-300 hover:border-rose-300 hover:shadow-lg hover:shadow-rose-500/10">
      {/* Image Placeholder */}
      <div className="w-full aspect-video bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center mb-6 group-hover:bg-rose-50 transition-colors">
        <p className="text-xs text-slate-400">Image placeholder</p>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-rose-600 transition-colors">
          {type.name}
        </h3>
        <p className="text-sm text-rose-600 font-semibold mb-3">
          {type.tagline}
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          {type.shortDesc}
        </p>
      </div>

      {/* View Details Button */}
      <button
        onClick={() => onViewDetails?.(type)}
        className="mt-4 px-4 py-2 rounded-lg bg-linear-to-r from-rose-500 to-pink-500 text-white text-sm font-medium hover:scale-105 transition-all duration-300"
      >
        View Details
      </button>
    </div>
  );
}
