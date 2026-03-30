"use client";

import React, { useState, useMemo } from "react";
import {
  PersonalityFamily,
  getTypesByFamily,
} from "@/lib/personality-engine/types";
import {
  RelationshipFamily,
  getRelationshipTypesByFamily,
  getAllRelationshipTypes,
} from "@/lib/personality-engine/relationship-types";
import {
  CareerFamily,
  getAllCareerTypes,
} from "@/lib/personality-engine/career-types";
import { PersonalityModal } from "@/components/sections/personality";
import { IdentityModal } from "@/components/sections/identity";
import {
  RelationshipCard,
  RelationshipModal,
} from "@/components/sections/relationship";
import { CareerCard, CareerModal } from "@/components/sections/career";
import {
  LifeDirectionCard,
  LifeDirectionModal,
} from "@/components/sections/life-direction";
import {
  CategorySelector,
  TestCategory,
  TypeSystemSelector,
  TypeSystem,
  FamilyFilter,
  SearchBar,
  TypeGrid,
  ComingSoonPlaceholder,
} from "@/components/sections/type-library";
import type { PersonalityType } from "@/lib/personality-engine/types";
import type { RelationshipType } from "@/lib/personality-engine/relationship-types";
import type { CareerType } from "@/lib/personality-engine/career-types";
import type {
  LifeDirectionType,
  LifeDirectionFamily,
} from "@/lib/personality-engine/life-direction-types";
import { getAllLifeDirectionTypes } from "@/lib/personality-engine/life-direction-types";

// ==================== TYPES ====================

interface IdentityType {
  id: string;
  name: string;
  tagline: string;
  description: string;
}

// ==================== DATA ====================

const IDENTITY_TYPES: IdentityType[] = [
  {
    id: "1",
    name: "The Shifter",
    tagline: "Always changing, never fixed",
    description:
      "You evolve constantly. You adapt, adjust, and become different versions of yourself depending on where you are in life.",
  },
  {
    id: "2",
    name: "The Becoming",
    tagline: "Still in progress, still unfolding",
    description:
      "You feel like you're not fully there yet. You're growing, searching, and slowly shaping who you are.",
  },
  {
    id: "3",
    name: "The Drifter",
    tagline: "Moving without clear direction",
    description:
      "You explore without a fixed path. You're open, but often unsure where you truly belong.",
  },
  {
    id: "4",
    name: "The Anchored",
    tagline: "Grounded and stable",
    description:
      "You know who you are. You move with clarity and don't easily get shaken by external noise.",
  },
  {
    id: "5",
    name: "The Seeker",
    tagline: "Searching for meaning and truth",
    description:
      "You're driven by curiosity and purpose. You want to understand yourself and the world deeply.",
  },
  {
    id: "6",
    name: "The Masked",
    tagline: "Hiding behind expectations",
    description:
      "You adapt to fit in, often suppressing your true self to meet what others expect.",
  },
  {
    id: "7",
    name: "The Detached",
    tagline: "Disconnected from self and emotion",
    description:
      "You feel distant from your own thoughts or emotions, as if you're observing life from the outside.",
  },
  {
    id: "8",
    name: "The Split",
    tagline: "Conflicted between two selves",
    description:
      "You feel like you're living between different identities, unsure which one is truly you.",
  },
  {
    id: "9",
    name: "The Observer",
    tagline: "Watching more than acting",
    description:
      "You take in everything quietly. You analyze, reflect, and understand before you move.",
  },
  {
    id: "10",
    name: "The Rebuilder",
    tagline: "Recreating yourself from scratch",
    description:
      "You've gone through change, and now you're actively shaping a new version of yourself.",
  },
  {
    id: "11",
    name: "The Pioneer",
    tagline: "Natural leader and visionary",
    description:
      "You see the big picture and inspire others to follow your vision. You're driven by purpose and impact.",
  },
  {
    id: "12",
    name: "The Sage",
    tagline: "Seeker of truth and wisdom",
    description:
      "You ask deep questions and seek to understand. Knowledge and insight drive your decisions.",
  },
  {
    id: "13",
    name: "The Creator",
    tagline: "Bringing ideas to life",
    description:
      "You turn imagination into reality. Your creativity shapes how you see and interact with the world.",
  },
  {
    id: "14",
    name: "The Caregiver",
    tagline: "Serving others with compassion",
    description:
      "You find meaning in helping and supporting others. Empathy and service guide your path.",
  },
  {
    id: "15",
    name: "The Lover",
    tagline: "Connecting through relationships",
    description:
      "You value deep connections and intimate bonds. Relationships are the center of your world.",
  },
];

// ==================== COMPONENTS ====================

// Identity Card Component
export function IdentityCard({
  type,
  onClick,
}: {
  type: IdentityType;
  onClick?: (type: IdentityType) => void;
}) {
  return (
    <div className="group bg-white rounded-xl border border-slate-200 p-6 h-full flex flex-col transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10">
      {/* Image Placeholder */}
      <div className="w-full aspect-video bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center mb-6">
        <p className="text-xs text-slate-400">Image placeholder</p>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
          {type.name}
        </h3>
        <p className="text-sm text-blue-600 font-semibold mb-3">
          {type.tagline}
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          {type.description}
        </p>
      </div>

      {/* View Details Button */}
      <button
        onClick={() => onClick?.(type)}
        className="mt-4 px-4 py-2 rounded-lg bg-linear-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium hover:scale-105 transition-all duration-300"
      >
        View Details
      </button>
    </div>
  );
}

// ==================== FILTERING LOGIC ====================

function filterTypes(
  identityTypes: IdentityType[],
  personalityTypes: PersonalityType[],
  selectedCategory: TestCategory,
  selectedTypeSystem: TypeSystem | null,
  selectedFamily: PersonalityFamily | "all",
  searchQuery: string,
): (IdentityType | PersonalityType)[] {
  if (!selectedTypeSystem) return [];

  let types: (IdentityType | PersonalityType)[] = [];

  // Get types based on type system
  if (selectedTypeSystem === "identity") {
    types = identityTypes;
  } else if (selectedTypeSystem === "personality") {
    types = personalityTypes;

    // Filter by family if personality
    if (selectedFamily !== "all") {
      types = types.filter(
        (t) => (t as PersonalityType).family === selectedFamily,
      );
    }
  }

  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    types = types.filter((type) => {
      const isIdentity = selectedTypeSystem === "identity";
      const name = isIdentity
        ? (type as IdentityType).name.toLowerCase()
        : (type as PersonalityType).title.toLowerCase();
      const tagline = type.tagline.toLowerCase();
      const desc = isIdentity
        ? (type as IdentityType).description.toLowerCase()
        : (type as PersonalityType).shortDesc.toLowerCase();

      return (
        name.includes(query) || tagline.includes(query) || desc.includes(query)
      );
    });
  }

  return types;
}

// ==================== PAGE ====================

export default function TypesPage() {
  // Filter state
  const [selectedCategory, setSelectedCategory] =
    useState<TestCategory>("identity");
  const [selectedTypeSystem, setSelectedTypeSystem] =
    useState<TypeSystem | null>("identity");
  const [selectedFamily, setSelectedFamily] = useState<
    PersonalityFamily | RelationshipFamily | CareerFamily | LifeDirectionFamily | "all"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal state
  const [selectedType, setSelectedType] = useState<PersonalityType | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIdentity, setSelectedIdentity] = useState<IdentityType | null>(
    null,
  );
  const [isIdentityModalOpen, setIsIdentityModalOpen] = useState(false);
  const [selectedRelationship, setSelectedRelationship] =
    useState<RelationshipType | null>(null);
  const [isRelationshipModalOpen, setIsRelationshipModalOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<CareerType | null>(null);
  const [isCareerModalOpen, setIsCareerModalOpen] = useState(false);
  const [selectedLifeDirection, setSelectedLifeDirection] =
    useState<LifeDirectionType | null>(null);
  const [isLifeDirectionModalOpen, setIsLifeDirectionModalOpen] =
    useState(false);

  // Get all personality types
  const allPersonalityTypes = useMemo(() => {
    const families: PersonalityFamily[] = [
      "thinkers",
      "feelers",
      "doers",
      "adapters",
      "strugglers",
    ];
    return families.flatMap((family) => getTypesByFamily(family));
  }, []);

  // Get all relationship types
  const allRelationshipTypes = useMemo(() => {
    return getAllRelationshipTypes();
  }, []);

  // Get all career types
  const allCareerTypes = useMemo(() => {
    return getAllCareerTypes();
  }, []);

  // Get all life direction types
  const allLifeDirectionTypes = useMemo(() => {
    return getAllLifeDirectionTypes();
  }, []);

  // Filter types based on all criteria
  const filteredTypes = useMemo(() => {
    // For life direction category
    if (selectedCategory === "life-direction") {
      let types: LifeDirectionType[] = allLifeDirectionTypes;

      // Filter by family if not "all"
      if (selectedFamily !== "all") {
        types = types.filter(
          (t) => t.family === (selectedFamily as LifeDirectionFamily),
        );
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        types = types.filter((type) => {
          const name = type.name.toLowerCase();
          const tagline = type.tagline.toLowerCase();
          const desc = type.shortDesc.toLowerCase();

          return (
            name.includes(query) ||
            tagline.includes(query) ||
            desc.includes(query)
          );
        });
      }

      return types;
    }

    // For career category
    if (selectedCategory === "career") {
      let types: CareerType[] = allCareerTypes;

      // Filter by family if not "all"
      if (selectedFamily !== "all") {
        types = types.filter(
          (t) => t.family === (selectedFamily as CareerFamily),
        );
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        types = types.filter((type) => {
          const name = type.name.toLowerCase();
          const tagline = type.tagline.toLowerCase();
          const desc = type.shortDesc.toLowerCase();

          return (
            name.includes(query) ||
            tagline.includes(query) ||
            desc.includes(query)
          );
        });
      }

      return types;
    }

    // For relationships category
    if (selectedCategory === "relationships") {
      let types: RelationshipType[] = allRelationshipTypes;

      // Filter by family if not "all"
      if (selectedFamily !== "all") {
        types = types.filter(
          (t) => t.family === (selectedFamily as RelationshipFamily),
        );
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        types = types.filter((type) => {
          const name = type.name.toLowerCase();
          const tagline = type.tagline.toLowerCase();
          const desc = type.shortDesc.toLowerCase();

          return (
            name.includes(query) ||
            tagline.includes(query) ||
            desc.includes(query)
          );
        });
      }

      return types;
    }

    // For identity category (existing logic)
    let types: (IdentityType | PersonalityType)[] = [];

    // Get types based on type system
    if (selectedTypeSystem === "identity") {
      types = IDENTITY_TYPES;
    } else if (selectedTypeSystem === "personality") {
      types = allPersonalityTypes;

      // Filter by family if personality
      if (selectedFamily !== "all") {
        types = types.filter(
          (t) => (t as PersonalityType).family === selectedFamily,
        );
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      types = types.filter((type) => {
        const isIdentity = selectedTypeSystem === "identity";
        const name = isIdentity
          ? (type as IdentityType).name.toLowerCase()
          : (type as PersonalityType).title.toLowerCase();
        const tagline = type.tagline.toLowerCase();
        const desc = isIdentity
          ? (type as IdentityType).description.toLowerCase()
          : (type as PersonalityType).shortDesc.toLowerCase();

        return (
          name.includes(query) ||
          tagline.includes(query) ||
          desc.includes(query)
        );
      });
    }

    return types;
  }, [
    selectedCategory,
    selectedTypeSystem,
    selectedFamily,
    searchQuery,
    allPersonalityTypes,
    allRelationshipTypes,
    allCareerTypes,
    allLifeDirectionTypes,
  ]);

  const handleCardClick = (
    type:
      | PersonalityType
      | IdentityType
      | RelationshipType
      | CareerType
      | LifeDirectionType,
  ) => {
    if (selectedCategory === "life-direction") {
      setSelectedLifeDirection(type as LifeDirectionType);
      setIsLifeDirectionModalOpen(true);
    } else if (selectedCategory === "career") {
      setSelectedCareer(type as CareerType);
      setIsCareerModalOpen(true);
    } else if (selectedCategory === "relationships") {
      setSelectedRelationship(type as RelationshipType);
      setIsRelationshipModalOpen(true);
    } else if (selectedTypeSystem === "personality") {
      setSelectedType(type as PersonalityType);
      setIsModalOpen(true);
    } else if (selectedTypeSystem === "identity") {
      setSelectedIdentity(type as IdentityType);
      setIsIdentityModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedType(null), 300);
  };

  const handleCloseIdentityModal = () => {
    setIsIdentityModalOpen(false);
    setTimeout(() => setSelectedIdentity(null), 300);
  };

  const handleCloseRelationshipModal = () => {
    setIsRelationshipModalOpen(false);
    setTimeout(() => setSelectedRelationship(null), 300);
  };

  const handleCloseCareerModal = () => {
    setIsCareerModalOpen(false);
    setTimeout(() => setSelectedCareer(null), 300);
  };

  const handleCloseLifeDirectionModal = () => {
    setIsLifeDirectionModalOpen(false);
    setTimeout(() => setSelectedLifeDirection(null), 300);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-linear-to-b from-blue-50 via-cyan-50/50 to-white border-b border-slate-200 pt-24 pb-16 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
            Type Library
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover your types across different dimensions of your life
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Category Selector */}
        <CategorySelector
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Content based on category */}
        {selectedCategory === "relationships" ? (
          // Relationship Types System
          <>
            {/* Type System Selector (simplified for relationships) */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wide">
                Relationship Types
              </p>
              <div className="inline-block bg-linear-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-xl p-4">
                <p className="text-slate-700 font-semibold">
                  Understand how you connect, behave, and repeat patterns in
                  relationships
                </p>
              </div>
            </div>

            {/* Family Filter for relationships */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wide">
                Filter by Relationship Pattern
              </p>
              <div className="flex flex-wrap gap-3">
                {(
                  [
                    "all",
                    "attachment",
                    "emotional-roles",
                    "communication",
                    "toxic-patterns",
                    "healthy-patterns",
                    "attraction",
                    "conflict",
                  ] as const
                ).map((family) => {
                  const labels: Record<string, string> = {
                    all: "All Types",
                    attachment: "Attachment",
                    "emotional-roles": "Emotional Roles",
                    communication: "Communication",
                    "toxic-patterns": "Toxic Patterns",
                    "healthy-patterns": "Healthy Patterns",
                    attraction: "Attraction",
                    conflict: "Conflict",
                  };
                  return (
                    <button
                      key={family}
                      onClick={() =>
                        setSelectedFamily(
                          family === "all"
                            ? "all"
                            : (family as RelationshipFamily),
                        )
                      }
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                        selectedFamily === family
                          ? "bg-linear-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300/50"
                      }`}
                    >
                      {labels[family]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search */}
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* Results Info */}
            <div className="text-sm text-slate-600 mb-6">
              Showing{" "}
              <span className="font-semibold text-slate-900">
                {filteredTypes.length}
              </span>{" "}
              type{filteredTypes.length !== 1 ? "s" : ""}
            </div>

            {/* Relationship Type Grid */}
            {filteredTypes.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-xl font-semibold text-slate-900 mb-2">
                  No types found
                </p>
                <p className="text-slate-600">
                  Try adjusting your filters or search criteria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(filteredTypes as RelationshipType[]).map((type) => (
                  <RelationshipCard
                    key={type.id}
                    type={type}
                    onViewDetails={handleCardClick}
                  />
                ))}
              </div>
            )}
          </>
        ) : selectedCategory === "career" ? (
          // Career Archetypes System
          <>
            {/* Type System Selector (simplified for career) */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wide">
                Career Archetypes
              </p>
              <div className="inline-block bg-linear-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
                <p className="text-slate-700 font-semibold">
                  Discover your career style, work preferences, and professional
                  fit
                </p>
              </div>
            </div>

            {/* Family Filter for career */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wide">
                Filter by Career Dimension
              </p>
              <div className="flex flex-wrap gap-3">
                {(
                  [
                    "all",
                    "thinking-style",
                    "work-style",
                    "motivation",
                    "energy",
                    "leadership",
                    "career-direction",
                  ] as const
                ).map((family) => {
                  const labels: Record<string, string> = {
                    all: "All Types",
                    "thinking-style": "Thinking Style",
                    "work-style": "Work Style",
                    motivation: "Motivation",
                    energy: "Energy",
                    leadership: "Leadership",
                    "career-direction": "Career Direction",
                  };
                  return (
                    <button
                      key={family}
                      onClick={() =>
                        setSelectedFamily(
                          family === "all" ? "all" : (family as CareerFamily),
                        )
                      }
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                        selectedFamily === family
                          ? "bg-linear-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300/50"
                      }`}
                    >
                      {labels[family]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search */}
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* Results Info */}
            <div className="text-sm text-slate-600 mb-6">
              Showing{" "}
              <span className="font-semibold text-slate-900">
                {filteredTypes.length}
              </span>{" "}
              type{filteredTypes.length !== 1 ? "s" : ""}
            </div>

            {/* Career Type Grid */}
            {filteredTypes.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-xl font-semibold text-slate-900 mb-2">
                  No types found
                </p>
                <p className="text-slate-600">
                  Try adjusting your filters or search criteria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(filteredTypes as CareerType[]).map((type) => (
                  <CareerCard
                    key={type.id}
                    type={type}
                    onViewDetails={handleCardClick}
                  />
                ))}
              </div>
            )}
          </>
        ) : selectedCategory === "life-direction" ? (
          // Life Direction Archetypes System
          <>
            {/* Type System Selector (simplified for life direction) */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wide">
                Life Direction Archetypes
              </p>
              <div className="inline-block bg-linear-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4">
                <p className="text-slate-700 font-semibold">
                  Understand where you are, how you decide, and where your life
                  is heading
                </p>
              </div>
            </div>

            {/* Family Filter for life direction */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wide">
                Filter by Life Dimension
              </p>
              <div className="flex flex-wrap gap-3">
                {(
                  [
                    "all",
                    "clarity-state",
                    "decision-style",
                    "purpose-relationship",
                    "growth-trajectory",
                    "internal-external-control",
                    "life-phase",
                  ] as const
                ).map((family) => {
                  const labels: Record<string, string> = {
                    all: "All Types",
                    "clarity-state": "Clarity State",
                    "decision-style": "Decision Style",
                    "purpose-relationship": "Purpose Relationship",
                    "growth-trajectory": "Growth Trajectory",
                    "internal-external-control": "Internal vs External Control",
                    "life-phase": "Life Phase",
                  };
                  return (
                    <button
                      key={family}
                      onClick={() =>
                        setSelectedFamily(
                          family === "all"
                            ? "all"
                            : (family as LifeDirectionFamily),
                        )
                      }
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                        selectedFamily === family
                          ? "bg-linear-to-r from-yellow-500 to-amber-500 text-white shadow-lg shadow-yellow-500/30"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300/50"
                      }`}
                    >
                      {labels[family]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search */}
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* Results Info */}
            <div className="text-sm text-slate-600 mb-6">
              Showing{" "}
              <span className="font-semibold text-slate-900">
                {filteredTypes.length}
              </span>{" "}
              type{filteredTypes.length !== 1 ? "s" : ""}
            </div>

            {/* Life Direction Type Grid */}
            {filteredTypes.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-xl font-semibold text-slate-900 mb-2">
                  No types found
                </p>
                <p className="text-slate-600">
                  Try adjusting your filters or search criteria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(filteredTypes as LifeDirectionType[]).map((type) => (
                  <LifeDirectionCard
                    key={type.id}
                    type={type}
                    onViewDetails={handleCardClick}
                  />
                ))}
              </div>
            )}
          </>
        ) : selectedCategory !== "identity" ? (
          // Coming Soon Placeholder for other categories
          <ComingSoonPlaceholder
            categoryLabel={selectedCategory
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          />
        ) : (
          // Full Type Library System (Identity)
          <>
            {/* Type System Selector */}
            <TypeSystemSelector
              selectedTypeSystem={selectedTypeSystem}
              onSelectTypeSystem={setSelectedTypeSystem}
            />

            {/* Family Filter (only for personality) */}
            {selectedTypeSystem === "personality" && (
              <FamilyFilter
                selectedFamily={selectedFamily as PersonalityFamily | "all"}
                onSelectFamily={(f) => setSelectedFamily(f)}
              />
            )}

            {/* Search */}
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* Results Info */}
            <div className="text-sm text-slate-600 mb-6">
              Showing{" "}
              <span className="font-semibold text-slate-900">
                {filteredTypes.length}
              </span>{" "}
              type{filteredTypes.length !== 1 ? "s" : ""}
            </div>

            {/* Type Grid */}
            <TypeGrid
              types={filteredTypes as (PersonalityType | IdentityType)[]}
              typeSystem={selectedTypeSystem || "identity"}
              onCardClick={handleCardClick}
              IdentityCard={IdentityCard}
            />
          </>
        )}
      </div>

      {/* Modal */}
      <PersonalityModal
        type={selectedType}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Identity Modal */}
      <IdentityModal
        type={selectedIdentity}
        isOpen={isIdentityModalOpen}
        onClose={handleCloseIdentityModal}
      />

      {/* Relationship Modal */}
      <RelationshipModal
        type={selectedRelationship}
        isOpen={isRelationshipModalOpen}
        onClose={handleCloseRelationshipModal}
      />

      {/* Career Modal */}
      <CareerModal
        type={selectedCareer}
        isOpen={isCareerModalOpen}
        onClose={handleCloseCareerModal}
      />

      {/* Life Direction Modal */}
      <LifeDirectionModal
        type={selectedLifeDirection}
        isOpen={isLifeDirectionModalOpen}
        onClose={handleCloseLifeDirectionModal}
      />
    </div>
  );
}
