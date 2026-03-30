"use client";

import React from "react";

export type TestCategory =
  | "identity"
  | "relationships"
  | "career"
  | "life-direction"
  | "mindset"
  | "emotional-health"
  | "life-patterns"
  | "money"
  | "reality-check";

interface CategorySelectorProps {
  selectedCategory: TestCategory;
  onSelectCategory: (category: TestCategory) => void;
}

const CATEGORIES: { id: TestCategory; label: string }[] = [
  { id: "identity", label: "Identity" },
  { id: "relationships", label: "Relationships" },
  { id: "career", label: "Career" },
  { id: "life-direction", label: "Life Direction" },
  { id: "mindset", label: "Mindset" },
  { id: "emotional-health", label: "Emotional Health" },
  { id: "life-patterns", label: "Life Patterns" },
  { id: "money", label: "Money" },
  { id: "reality-check", label: "Reality Check" },
];

export function CategorySelector({
  selectedCategory,
  onSelectCategory,
}: CategorySelectorProps) {
  return (
    <div className="mb-6">
      <p className="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wide">
        Select Category
      </p>
      <div className="flex flex-wrap gap-3">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
              selectedCategory === category.id
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300/50"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}
