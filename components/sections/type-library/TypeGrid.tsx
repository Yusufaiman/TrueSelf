"use client";

import React from "react";
import { PersonalityType } from "@/lib/personality-engine/types";
import { PersonalityCard } from "../personality/PersonalityCard";

interface IdentityType {
  id: string;
  name: string;
  tagline: string;
  description: string;
}

interface IdentityCardProps {
  type: IdentityType;
  onClick?: (type: IdentityType) => void;
}

interface TypeGridProps {
  types: (PersonalityType | IdentityType)[];
  typeSystem: "identity" | "personality";
  onCardClick: (type: PersonalityType | IdentityType) => void;
  IdentityCard: React.ComponentType<IdentityCardProps>;
}

export function TypeGrid({
  types,
  typeSystem,
  onCardClick,
  IdentityCard,
}: TypeGridProps) {
  if (types.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-xl font-semibold text-slate-900 mb-2">
          No types found
        </p>
        <p className="text-slate-600">
          Try adjusting your filters or search criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {types.map((type) => (
        <div key={type.id}>
          {typeSystem === "personality" ? (
            <PersonalityCard
              type={type as PersonalityType}
              onViewDetails={() => onCardClick(type as PersonalityType)}
            />
          ) : (
            <IdentityCard
              type={type as IdentityType}
              onClick={() => onCardClick(type as IdentityType)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
