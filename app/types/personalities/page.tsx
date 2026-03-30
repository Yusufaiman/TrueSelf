"use client";

import React, { useState, useMemo } from "react";
import { Brain, Zap, Heart, RotateCw, Waves } from "lucide-react";
import {
  PersonalityType,
  PersonalityFamily,
  getAllTypes,
  getTypesByFamily,
} from "@/lib/personality-engine/types";
import { PersonalityGridSection } from "@/components/sections/personality/PersonalityGridSection";
import { PersonalityModal } from "@/components/sections/personality/PersonalityModal";

export default function PersonalityTypesPage() {
  const [selectedType, setSelectedType] = useState<PersonalityType | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Group types by family
  const familyGroups = useMemo(() => {
    const families: PersonalityFamily[] = [
      "thinkers",
      "feelers",
      "doers",
      "adapters",
      "strugglers",
    ];
    return families.map((family) => ({
      family,
      types: getTypesByFamily(family),
    }));
  }, []);

  const handleCardClick = (type: PersonalityType) => {
    setSelectedType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedType(null), 300); // Give animation time to complete
  };

  const sectionConfig = {
    thinkers: {
      title: "The Thinkers",
      description:
        "People who lead with logic, analysis, and systematic thinking. They see patterns, plan strategically, and trust their reasoning.",
      icon: Brain,
    },
    feelers: {
      title: "The Feelers",
      description:
        "People who lead with emotions, empathy, and intuition. They navigate life through feelings, values, and deep connections.",
      icon: Heart,
    },
    doers: {
      title: "The Doers",
      description:
        "People who lead with action and momentum. They move fast, seize opportunities, and drive results through direct engagement.",
      icon: Zap,
    },
    adapters: {
      title: "The Adapters",
      description:
        "People who lead with flexibility and balance. They flow with circumstances, adjust strategies, and find equilibrium.",
      icon: RotateCw,
    },
    strugglers: {
      title: "The Strugglers",
      description:
        "People who face internal conflicts or external pressures. They're navigating complexity, change, or personal challenges.",
      icon: Waves,
    },
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 via-cyan-50 to-white py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-4">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              Personality Types
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            40 Ways to Think, Feel & Act
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Explore how different minds work. From strategic thinkers to
            emotional feelers, from action-takers to adaptive spirits. Discover
            where you fit.
          </p>
        </div>
      </section>

      {/* Family Groups */}
      {familyGroups.map(({ family, types }) => {
        const config = sectionConfig[family];
        if (!types.length) return null;

        return (
          <PersonalityGridSection
            key={family}
            title={config.title}
            description={config.description}
            family={family}
            types={types}
            onCardClick={handleCardClick}
          />
        );
      })}

      {/* Modal */}
      <PersonalityModal
        type={selectedType}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
