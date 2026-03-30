"use client";

import React from "react";

export type TypeSystem = "identity" | "personality";

interface TypeSystemSelectorProps {
  selectedTypeSystem: TypeSystem | null;
  onSelectTypeSystem: (system: TypeSystem) => void;
}

const TYPE_SYSTEMS: { id: TypeSystem; label: string; description: string }[] = [
  {
    id: "identity",
    label: "Identity Types",
    description: "Understand who you really are",
  },
  {
    id: "personality",
    label: "Personality Types",
    description: "How you operate & interact",
  },
];

export function TypeSystemSelector({
  selectedTypeSystem,
  onSelectTypeSystem,
}: TypeSystemSelectorProps) {
  return (
    <div className="mb-6">
      <p className="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wide">
        Type System
      </p>
      <div className="flex gap-4 flex-wrap">
        {TYPE_SYSTEMS.map((system) => (
          <button
            key={system.id}
            onClick={() => onSelectTypeSystem(system.id)}
            className={`flex-1 min-w-[200px] p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
              selectedTypeSystem === system.id
                ? "border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-md shadow-blue-500/20"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <p className="font-semibold text-slate-900">{system.label}</p>
            <p className="text-sm text-slate-600">{system.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
