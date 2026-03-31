"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
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
import { MindsetCard, MindsetModal } from "@/components/sections/mindset";
import {
  EmotionalHealthCard,
  EmotionalHealthModal,
} from "@/components/sections/emotional-health";
import {
  LifePatternCard,
  LifePatternModal,
} from "@/components/sections/life-patterns";
import { MoneyCard, MoneyModal } from "@/components/sections/money";
import {
  RealityCheckCard,
  RealityCheckModal,
} from "@/components/sections/reality-check";
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
import type {
  MindsetType,
  MindsetFamily,
} from "@/lib/personality-engine/mindset-types";
import { getAllMindsetTypes } from "@/lib/personality-engine/mindset-types";
import type {
  EmotionalHealthType,
  EmotionalHealthFamily,
} from "@/lib/personality-engine/emotional-health-types";
import { getAllEmotionalHealthTypes } from "@/lib/personality-engine/emotional-health-types";
import type {
  LifePatternType,
  LifePatternFamily,
} from "@/lib/personality-engine/life-pattern-types";
import { getAllLifePatternTypes } from "@/lib/personality-engine/life-pattern-types";
import type {
  MoneyType,
  MoneyFamily,
} from "@/lib/personality-engine/money-types";
import { getAllMoneyTypes } from "@/lib/personality-engine/money-types";
import type {
  RealityCheckType,
  RealityCheckFamily,
} from "@/lib/personality-engine/reality-check-types";
import { getAllRealityCheckTypes } from "@/lib/personality-engine/reality-check-types";

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
  // Convert type name to image filename format (e.g., "The Shifter" -> "the-shifter")
  const imageFileName = type.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="group bg-white rounded-xl border border-slate-200 p-6 h-full flex flex-col transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10">
      {/* Identity Type Image */}
      <div className="w-full aspect-video bg-slate-100 rounded-lg border border-slate-200 overflow-hidden flex items-center justify-center mb-6">
        <Image
          src={`/assets/identity types/${imageFileName}.jpg`}
          alt={type.name}
          width={600}
          height={337}
          className="w-full h-full object-cover"
        />
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
    | PersonalityFamily
    | RelationshipFamily
    | CareerFamily
    | LifeDirectionFamily
    | MindsetFamily
    | EmotionalHealthFamily
    | LifePatternFamily
    | MoneyFamily
    | RealityCheckFamily
    | "all"
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
  const [selectedMindset, setSelectedMindset] = useState<MindsetType | null>(
    null,
  );
  const [isMindsetModalOpen, setIsMindsetModalOpen] = useState(false);
  const [selectedEmotionalHealth, setSelectedEmotionalHealth] =
    useState<EmotionalHealthType | null>(null);
  const [isEmotionalHealthModalOpen, setIsEmotionalHealthModalOpen] =
    useState(false);
  const [selectedLifePattern, setSelectedLifePattern] =
    useState<LifePatternType | null>(null);
  const [isLifePatternModalOpen, setIsLifePatternModalOpen] = useState(false);
  const [selectedMoney, setSelectedMoney] = useState<MoneyType | null>(null);
  const [isMoneyModalOpen, setIsMoneyModalOpen] = useState(false);
  const [selectedRealityCheck, setSelectedRealityCheck] =
    useState<RealityCheckType | null>(null);
  const [isRealityCheckModalOpen, setIsRealityCheckModalOpen] = useState(false);

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

  // Get all mindset types
  const allMindsetTypes = useMemo(() => {
    return getAllMindsetTypes();
  }, []);

  // Get all emotional health types
  const allEmotionalHealthTypes = useMemo(() => {
    return getAllEmotionalHealthTypes();
  }, []);

  // Get all life pattern types
  const allLifePatternTypes = useMemo(() => {
    return getAllLifePatternTypes();
  }, []);

  // Get all money types
  const allMoneyTypes = useMemo(() => {
    return getAllMoneyTypes();
  }, []);

  // Get all reality check types
  const allRealityCheckTypes = useMemo(() => {
    return getAllRealityCheckTypes();
  }, []);

  // Filter types based on all criteria
  const filteredTypes = useMemo(() => {
    // For reality check category
    if (selectedCategory === "reality-check") {
      let types: RealityCheckType[] = allRealityCheckTypes;

      // Filter by family if not "all"
      if (selectedFamily !== "all") {
        types = types.filter(
          (t) => t.family === (selectedFamily as RealityCheckFamily),
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

    // For money category
    if (selectedCategory === "money") {
      let types: MoneyType[] = allMoneyTypes;

      // Filter by family if not "all"
      if (selectedFamily !== "all") {
        types = types.filter(
          (t) => t.family === (selectedFamily as MoneyFamily),
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

    // For life patterns category
    if (selectedCategory === "life-patterns") {
      let types: LifePatternType[] = allLifePatternTypes;

      // Filter by family if not "all"
      if (selectedFamily !== "all") {
        types = types.filter(
          (t) => t.family === (selectedFamily as LifePatternFamily),
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

    // For emotional health category
    if (selectedCategory === "emotional-health") {
      let types: EmotionalHealthType[] = allEmotionalHealthTypes;

      // Filter by family if not "all"
      if (selectedFamily !== "all") {
        types = types.filter(
          (t) => t.family === (selectedFamily as EmotionalHealthFamily),
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

    // For mindset category
    if (selectedCategory === "mindset") {
      let types: MindsetType[] = allMindsetTypes;

      // Filter by family if not "all"
      if (selectedFamily !== "all") {
        types = types.filter(
          (t) => t.family === (selectedFamily as MindsetFamily),
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
    allMindsetTypes,
    allEmotionalHealthTypes,
    allLifePatternTypes,
    allMoneyTypes,
    allRealityCheckTypes,
  ]);

  const handleCardClick = (
    type:
      | PersonalityType
      | IdentityType
      | RelationshipType
      | CareerType
      | LifeDirectionType
      | MindsetType
      | EmotionalHealthType
      | LifePatternType
      | MoneyType
      | RealityCheckType,
  ) => {
    if (selectedCategory === "reality-check") {
      setSelectedRealityCheck(type as RealityCheckType);
      setIsRealityCheckModalOpen(true);
    } else if (selectedCategory === "money") {
      setSelectedMoney(type as MoneyType);
      setIsMoneyModalOpen(true);
    } else if (selectedCategory === "life-patterns") {
      setSelectedLifePattern(type as LifePatternType);
      setIsLifePatternModalOpen(true);
    } else if (selectedCategory === "emotional-health") {
      setSelectedEmotionalHealth(type as EmotionalHealthType);
      setIsEmotionalHealthModalOpen(true);
    } else if (selectedCategory === "mindset") {
      setSelectedMindset(type as MindsetType);
      setIsMindsetModalOpen(true);
    } else if (selectedCategory === "life-direction") {
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

  const handleCloseMindsetModal = () => {
    setIsMindsetModalOpen(false);
    setTimeout(() => setSelectedMindset(null), 300);
  };

  const handleCloseEmotionalHealthModal = () => {
    setIsEmotionalHealthModalOpen(false);
    setTimeout(() => setSelectedEmotionalHealth(null), 300);
  };

  const handleCloseLifePatternModal = () => {
    setIsLifePatternModalOpen(false);
    setTimeout(() => setSelectedLifePattern(null), 300);
  };

  const handleCloseMoneyModal = () => {
    setIsMoneyModalOpen(false);
    setTimeout(() => setSelectedMoney(null), 300);
  };

  const handleCloseRealityCheckModal = () => {
    setIsRealityCheckModalOpen(false);
    setTimeout(() => setSelectedRealityCheck(null), 300);
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
        ) : selectedCategory === "life-patterns" ? (
          // Life Pattern Types System
          <>
            {/* Type System Selector (simplified for life patterns) */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wide">
                Life Pattern Types
              </p>
              <div className="inline-block bg-linear-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4">
                <p className="text-slate-700 font-semibold">
                  Understand the repeated behaviors, habits, and cycles that
                  shape your life over time
                </p>
              </div>
            </div>

            {/* Family Filter for life patterns */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wide">
                Filter by Life Pattern
              </p>
              <div className="flex flex-wrap gap-3">
                {(
                  [
                    "all",
                    "habit-formation",
                    "decision-patterns",
                    "behavioral-cycles",
                    "productivity-patterns",
                    "self-sabotage",
                    "discipline-consistency",
                    "adaptation-patterns",
                  ] as const
                ).map((family) => {
                  const labels: Record<string, string> = {
                    all: "All Types",
                    "habit-formation": "Habits",
                    "decision-patterns": "Decisions",
                    "behavioral-cycles": "Cycles",
                    "productivity-patterns": "Productivity",
                    "self-sabotage": "Self Sabotage",
                    "discipline-consistency": "Discipline",
                    "adaptation-patterns": "Adaptation",
                  };
                  return (
                    <button
                      key={family}
                      onClick={() =>
                        setSelectedFamily(
                          family === "all"
                            ? "all"
                            : (family as LifePatternFamily),
                        )
                      }
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                        selectedFamily === family
                          ? "bg-linear-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30"
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

            {/* Life Pattern Type Grid */}
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
                {(filteredTypes as LifePatternType[]).map((type) => (
                  <LifePatternCard
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
        ) : selectedCategory === "mindset" ? (
          // Mindset Types System
          <>
            {/* Type System Selector (simplified for mindset) */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wide">
                Mindset Types
              </p>
              <div className="inline-block bg-linear-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-4">
                <p className="text-slate-700 font-semibold">
                  Understand how you think, interpret situations, and shape your
                  decisions over time
                </p>
              </div>
            </div>

            {/* Family Filter for mindset */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wide">
                Filter by Mindset Pattern
              </p>
              <div className="flex flex-wrap gap-3">
                {(
                  [
                    "all",
                    "growth-orientation",
                    "belief-system",
                    "self-perception",
                    "emotional-thinking",
                    "cognitive-style",
                    "resilience-pattern",
                    "control-perspective",
                  ] as const
                ).map((family) => {
                  const labels: Record<string, string> = {
                    all: "All Types",
                    "growth-orientation": "Growth Orientation",
                    "belief-system": "Belief System",
                    "self-perception": "Self Perception",
                    "emotional-thinking": "Emotional Thinking",
                    "cognitive-style": "Cognitive Style",
                    "resilience-pattern": "Resilience Pattern",
                    "control-perspective": "Control Perspective",
                  };
                  return (
                    <button
                      key={family}
                      onClick={() =>
                        setSelectedFamily(
                          family === "all" ? "all" : (family as MindsetFamily),
                        )
                      }
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                        selectedFamily === family
                          ? "bg-linear-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/30"
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

            {/* Mindset Type Grid */}
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
                {(filteredTypes as MindsetType[]).map((type) => (
                  <MindsetCard
                    key={type.id}
                    type={type}
                    onViewDetails={handleCardClick}
                  />
                ))}
              </div>
            )}
          </>
        ) : selectedCategory === "reality-check" ? (
          // Reality Check Types System
          <>
            {/* Type System Selector (simplified for reality check) */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wide">
                Reality Check Types
              </p>
              <div className="inline-block bg-linear-to-r from-slate-50 to-slate-100 border border-slate-300 rounded-xl p-4">
                <p className="text-slate-700 font-semibold">
                  Understand how you come across to others and where your self
                  perception may differ from reality
                </p>
              </div>
            </div>

            {/* Family Filter for reality check */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wide">
                Filter by Reality Dimension
              </p>
              <div className="flex flex-wrap gap-3">
                {(
                  [
                    "all",
                    "self-awareness",
                    "perception-gap",
                    "social-impact",
                    "authenticity",
                    "communication",
                    "behavioral-consistency",
                    "blind-spots",
                    "external-influence",
                  ] as const
                ).map((family) => {
                  const labels: Record<string, string> = {
                    all: "All Types",
                    "self-awareness": "Self Awareness",
                    "perception-gap": "Perception Gap",
                    "social-impact": "Social Impact",
                    authenticity: "Authenticity",
                    communication: "Communication",
                    "behavioral-consistency": "Consistency",
                    "blind-spots": "Blind Spots",
                    "external-influence": "External Influence",
                  };
                  return (
                    <button
                      key={family}
                      onClick={() =>
                        setSelectedFamily(
                          family === "all"
                            ? "all"
                            : (family as RealityCheckFamily),
                        )
                      }
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                        selectedFamily === family
                          ? "bg-linear-to-r from-slate-600 to-slate-700 text-white shadow-lg shadow-slate-600/30"
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

            {/* Reality Check Type Grid */}
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
                {(filteredTypes as RealityCheckType[]).map((type) => (
                  <RealityCheckCard
                    key={type.id}
                    type={type}
                    onViewDetails={handleCardClick}
                  />
                ))}
              </div>
            )}
          </>
        ) : selectedCategory === "money" ? (
          // Money Types System
          <>
            {/* Type System Selector (simplified for money) */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wide">
                Money Types
              </p>
              <div className="inline-block bg-linear-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                <p className="text-slate-700 font-semibold">
                  Understand how you think, behave, and emotionally relate to
                  money
                </p>
              </div>
            </div>

            {/* Family Filter for money */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wide">
                Filter by Money Pattern
              </p>
              <div className="flex flex-wrap gap-3">
                {(
                  [
                    "all",
                    "money-mindset",
                    "spending-behavior",
                    "saving-security",
                    "earning-style",
                    "wealth-strategy",
                    "risk-investment",
                    "emotional-patterns",
                    "scarcity-abundance",
                  ] as const
                ).map((family) => {
                  const labels: Record<string, string> = {
                    all: "All Types",
                    "money-mindset": "Mindset",
                    "spending-behavior": "Spending",
                    "saving-security": "Saving",
                    "earning-style": "Earning",
                    "wealth-strategy": "Wealth Strategy",
                    "risk-investment": "Risk",
                    "emotional-patterns": "Emotional Patterns",
                    "scarcity-abundance": "Scarcity vs Abundance",
                  };
                  return (
                    <button
                      key={family}
                      onClick={() =>
                        setSelectedFamily(
                          family === "all" ? "all" : (family as MoneyFamily),
                        )
                      }
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                        selectedFamily === family
                          ? "bg-linear-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30"
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

            {/* Money Type Grid */}
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
                {(filteredTypes as MoneyType[]).map((type) => (
                  <MoneyCard
                    key={type.id}
                    type={type}
                    onViewDetails={handleCardClick}
                  />
                ))}
              </div>
            )}
          </>
        ) : selectedCategory === "emotional-health" ? (
          // Emotional Health Types System
          <>
            {/* Type System Selector (simplified for emotional health) */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wide">
                Emotional Health Types
              </p>
              <div className="inline-block bg-linear-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-xl p-4">
                <p className="text-slate-700 font-semibold">
                  Understand how you experience emotions, respond to stress, and
                  maintain your emotional balance
                </p>
              </div>
            </div>

            {/* Family Filter for emotional health */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wide">
                Filter by Emotional Pattern
              </p>
              <div className="flex flex-wrap gap-3">
                {(
                  [
                    "all",
                    "emotional-awareness",
                    "emotional-regulation",
                    "stress-response",
                    "emotional-stability",
                    "energy-burnout",
                    "trauma-sensitivity",
                    "recovery-pattern",
                  ] as const
                ).map((family) => {
                  const labels: Record<string, string> = {
                    all: "All Types",
                    "emotional-awareness": "Awareness",
                    "emotional-regulation": "Regulation",
                    "stress-response": "Stress",
                    "emotional-stability": "Stability",
                    "energy-burnout": "Energy",
                    "trauma-sensitivity": "Trauma",
                    "recovery-pattern": "Recovery",
                  };
                  return (
                    <button
                      key={family}
                      onClick={() =>
                        setSelectedFamily(
                          family === "all"
                            ? "all"
                            : (family as EmotionalHealthFamily),
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

            {/* Emotional Health Type Grid */}
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
                {(filteredTypes as EmotionalHealthType[]).map((type) => (
                  <EmotionalHealthCard
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
            categoryLabel={(selectedCategory as string)
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

      {/* Mindset Modal */}
      <MindsetModal
        type={selectedMindset}
        isOpen={isMindsetModalOpen}
        onClose={handleCloseMindsetModal}
      />

      {/* Emotional Health Modal */}
      <EmotionalHealthModal
        type={selectedEmotionalHealth}
        isOpen={isEmotionalHealthModalOpen}
        onClose={handleCloseEmotionalHealthModal}
      />

      {/* Life Pattern Modal */}
      <LifePatternModal
        type={selectedLifePattern}
        isOpen={isLifePatternModalOpen}
        onClose={handleCloseLifePatternModal}
      />

      {/* Money Modal */}
      <MoneyModal
        type={selectedMoney}
        isOpen={isMoneyModalOpen}
        onClose={handleCloseMoneyModal}
      />

      {/* Reality Check Modal */}
      <RealityCheckModal
        type={selectedRealityCheck}
        isOpen={isRealityCheckModalOpen}
        onClose={handleCloseRealityCheckModal}
      />
    </div>
  );
}
