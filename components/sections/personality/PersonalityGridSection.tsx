"use client";

import React from "react";
import {
  PersonalityType,
  PersonalityFamily,
} from "@/lib/personality-engine/types";
import { PersonalityCard } from "./PersonalityCard";

interface PersonalityGridSectionProps {
  title: string;
  description: string;
  family: PersonalityFamily;
  types: PersonalityType[];
  onCardClick: (type: PersonalityType) => void;
}

const familyIcons = {
  thinkers: "🧠",
  feelers: "❤️",
  doers: "⚡",
  adapters: "🔄",
  strugglers: "🌊",
};

const familyColors = {
  thinkers: "text-blue-600",
  feelers: "text-pink-600",
  doers: "text-amber-600",
  adapters: "text-purple-600",
  strugglers: "text-red-600",
};

export function PersonalityGridSection({
  title,
  description,
  family,
  types,
  onCardClick,
}: PersonalityGridSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{familyIcons[family]}</span>
            <h2
              className={`text-3xl md:text-4xl font-bold ${familyColors[family]}`}
            >
              {title}
            </h2>
          </div>
          <p className="text-slate-600 text-lg max-w-2xl">{description}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {types.map((type) => (
            <PersonalityCard
              key={type.id}
              type={type}
              onViewDetails={onCardClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
