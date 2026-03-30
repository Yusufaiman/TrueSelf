"use client";

import React from "react";
import {
  Layers,
  Brain,
  Heart,
  Zap,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { PersonalityFamily } from "@/lib/personality-engine/types";

interface FamilyFilterProps {
  selectedFamily: PersonalityFamily | "all";
  onSelectFamily: (family: PersonalityFamily | "all") => void;
}

const FAMILY_OPTIONS: {
  id: PersonalityFamily | "all";
  label: string;
  icon: React.ReactNode;
}[] = [
  { id: "all", label: "All Types", icon: <Layers size={18} /> },
  { id: "thinkers", label: "Thinkers", icon: <Brain size={18} /> },
  { id: "feelers", label: "Feelers", icon: <Heart size={18} /> },
  { id: "doers", label: "Doers", icon: <Zap size={18} /> },
  { id: "adapters", label: "Adapters", icon: <RefreshCw size={18} /> },
  { id: "strugglers", label: "Strugglers", icon: <AlertTriangle size={18} /> },
];

export function FamilyFilter({
  selectedFamily,
  onSelectFamily,
}: FamilyFilterProps) {
  return (
    <div className="mb-6">
      <p className="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wide">
        Filter by Family
      </p>
      <div className="flex flex-wrap gap-3">
        {FAMILY_OPTIONS.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelectFamily(option.id)}
            className={`px-4 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 hover:scale-105 ${
              selectedFamily === option.id
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300/50"
            }`}
          >
            {option.icon}
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
