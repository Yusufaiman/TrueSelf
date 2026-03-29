"use client";

import React from "react";
import Link from "next/link";
import { Brain, Heart, Zap, Layers, ArrowRight, Sparkles } from "lucide-react";

// ==================== TYPES ====================

interface IdentityType {
  id: number;
  name: string;
  tagline: string;
  description: string;
}

interface TraitLevel {
  name: string;
  value: number;
  color: string;
}

interface PersonalityType {
  id: number;
  name: string;
  tagline: string;
  description: string;
  category: "thinker" | "feeler" | "doer" | "adapter" | "struggler";
  traits: TraitLevel[];
  strengths: string[];
  weaknesses: string[];
}

// ==================== DATA ====================

const IDENTITY_TYPES: IdentityType[] = [
  {
    id: 1,
    name: "The Shifter",
    tagline: "Always changing, never fixed",
    description:
      "You evolve constantly. You adapt, adjust, and become different versions of yourself depending on where you are in life.",
  },
  {
    id: 2,
    name: "The Becoming",
    tagline: "Still in progress, still unfolding",
    description:
      "You feel like you're not fully there yet. You're growing, searching, and slowly shaping who you are.",
  },
  {
    id: 3,
    name: "The Drifter",
    tagline: "Moving without clear direction",
    description:
      "You explore without a fixed path. You're open, but often unsure where you truly belong.",
  },
  {
    id: 4,
    name: "The Anchored",
    tagline: "Grounded and stable",
    description:
      "You know who you are. You move with clarity and don't easily get shaken by external noise.",
  },
  {
    id: 5,
    name: "The Seeker",
    tagline: "Searching for meaning and truth",
    description:
      "You're driven by curiosity and purpose. You want to understand yourself and the world deeply.",
  },
  {
    id: 6,
    name: "The Masked",
    tagline: "Hiding behind expectations",
    description:
      "You adapt to fit in, often suppressing your true self to meet what others expect.",
  },
  {
    id: 7,
    name: "The Detached",
    tagline: "Disconnected from self and emotion",
    description:
      "You feel distant from your own thoughts or emotions, as if you're observing life from the outside.",
  },
  {
    id: 8,
    name: "The Split",
    tagline: "Conflicted between two selves",
    description:
      "You feel like you're living between different identities, unsure which one is truly you.",
  },
  {
    id: 9,
    name: "The Observer",
    tagline: "Watching more than acting",
    description:
      "You take in everything quietly. You analyze, reflect, and understand before you move.",
  },
  {
    id: 10,
    name: "The Rebuilder",
    tagline: "Recreating yourself from scratch",
    description:
      "You've gone through change, and now you're actively shaping a new version of yourself.",
  },
];

const PERSONALITY_TYPES: PersonalityType[] = [
  // Thinkers
  {
    id: 1,
    name: "The Strategic Architect",
    tagline: "You think in systems and long-term plans",
    description:
      "You approach life with structure. You prefer clarity, planning, and understanding before taking action.",
    category: "thinker",
    traits: [
      { name: "Logic", value: 85, color: "bg-blue-500" },
      { name: "Discipline", value: 80, color: "bg-emerald-500" },
      { name: "Reflection", value: 78, color: "bg-indigo-500" },
      { name: "Flexibility", value: 50, color: "bg-orange-500" },
    ],
    strengths: ["Strategic thinking", "Long-term planning", "Clear reasoning"],
    weaknesses: ["Overthinking", "Slow execution", "Rigid mindset"],
  },
  {
    id: 2,
    name: "The Silent Analyst",
    tagline: "You observe before you act",
    description:
      "You process everything internally. You prefer understanding deeply before expressing or acting.",
    category: "thinker",
    traits: [
      { name: "Logic", value: 80, color: "bg-blue-500" },
      { name: "Reflection", value: 85, color: "bg-indigo-500" },
      { name: "Social Energy", value: 30, color: "bg-amber-500" },
      { name: "Emotional Control", value: 60, color: "bg-pink-500" },
    ],
    strengths: ["Deep analysis", "Strong observation", "Thoughtful decisions"],
    weaknesses: ["Hesitation", "Social withdrawal", "Over-processing"],
  },
  {
    id: 3,
    name: "The Pattern Decoder",
    tagline: "You see what others miss",
    description:
      "You naturally detect patterns in behavior, systems, and situations.",
    category: "thinker",
    traits: [
      { name: "Intuition", value: 80, color: "bg-purple-500" },
      { name: "Reflection", value: 75, color: "bg-indigo-500" },
      { name: "Logic", value: 70, color: "bg-blue-500" },
      { name: "Flexibility", value: 60, color: "bg-orange-500" },
    ],
    strengths: [
      "Pattern recognition",
      "Insightful thinking",
      "Fast understanding",
    ],
    weaknesses: ["Over-analysis", "Mental fatigue", "Complexity bias"],
  },

  // Feelers
  {
    id: 4,
    name: "The Emotional Navigator",
    tagline: "You understand emotions deeply",
    description:
      "You're aware of emotional shifts and can navigate them with intention.",
    category: "feeler",
    traits: [
      { name: "Emotional Sensitivity", value: 85, color: "bg-pink-500" },
      { name: "Emotional Control", value: 70, color: "bg-red-500" },
      { name: "Social Depth", value: 80, color: "bg-violet-500" },
      { name: "Logic", value: 50, color: "bg-blue-500" },
    ],
    strengths: ["Emotional awareness", "Empathy", "Strong connection"],
    weaknesses: [
      "Emotional overload",
      "Sensitivity to criticism",
      "Overthinking feelings",
    ],
  },
  {
    id: 5,
    name: "The Deep Feeler",
    tagline: "You feel everything intensely",
    description:
      "Your emotions run deep. You experience life on a more intense level than most.",
    category: "feeler",
    traits: [
      { name: "Emotional Sensitivity", value: 90, color: "bg-pink-500" },
      { name: "Reflection", value: 75, color: "bg-indigo-500" },
      { name: "Emotional Control", value: 45, color: "bg-red-500" },
      { name: "Social Energy", value: 40, color: "bg-amber-500" },
    ],
    strengths: ["Deep empathy", "Emotional richness", "Strong intuition"],
    weaknesses: ["Easily overwhelmed", "Mood swings", "Emotional fatigue"],
  },
  {
    id: 6,
    name: "The Emotional Alchemist",
    tagline: "You transform emotions into strength",
    description: "You don't just feel — you process and grow from it.",
    category: "feeler",
    traits: [
      { name: "Emotional Sensitivity", value: 80, color: "bg-pink-500" },
      { name: "Emotional Control", value: 85, color: "bg-red-500" },
      { name: "Reflection", value: 75, color: "bg-indigo-500" },
      { name: "Discipline", value: 65, color: "bg-emerald-500" },
    ],
    strengths: ["Emotional control", "Growth mindset", "Resilience"],
    weaknesses: ["Internal pressure", "Over-reflection", "Emotional weight"],
  },

  // Doers
  {
    id: 7,
    name: "The Relentless Executor",
    tagline: "You get things done no matter what",
    description: "You act with discipline and consistency.",
    category: "doer",
    traits: [
      { name: "Discipline", value: 90, color: "bg-emerald-500" },
      { name: "Decisiveness", value: 80, color: "bg-cyan-500" },
      { name: "Emotional Control", value: 70, color: "bg-red-500" },
      { name: "Flexibility", value: 40, color: "bg-orange-500" },
    ],
    strengths: ["Execution", "Discipline", "Focus"],
    weaknesses: ["Burnout risk", "Rigidity", "Ignoring emotions"],
  },
  {
    id: 8,
    name: "The Action Taker",
    tagline: "You move fast and adapt quickly",
    description: "You don't wait. You act and adjust along the way.",
    category: "doer",
    traits: [
      { name: "Decisiveness", value: 85, color: "bg-cyan-500" },
      { name: "Risk Tolerance", value: 80, color: "bg-red-600" },
      { name: "Impulsiveness", value: 70, color: "bg-yellow-500" },
      { name: "Reflection", value: 40, color: "bg-indigo-500" },
    ],
    strengths: ["Fast action", "Confidence", "Momentum"],
    weaknesses: ["Impulsiveness", "Mistakes", "Lack of reflection"],
  },
  {
    id: 9,
    name: "The Bold Initiator",
    tagline: "You start what others hesitate to begin",
    description: "You're driven to take the first step.",
    category: "doer",
    traits: [
      { name: "Risk Tolerance", value: 85, color: "bg-red-600" },
      { name: "Social Energy", value: 75, color: "bg-amber-500" },
      { name: "Decisiveness", value: 80, color: "bg-cyan-500" },
      { name: "Discipline", value: 50, color: "bg-emerald-500" },
    ],
    strengths: ["Initiative", "Courage", "Energy"],
    weaknesses: ["Inconsistency", "Lack of follow-through", "Overconfidence"],
  },

  // Adapters
  {
    id: 10,
    name: "The Adaptive Chameleon",
    tagline: "You adjust to any environment",
    description: "You blend into situations and understand people quickly.",
    category: "adapter",
    traits: [
      { name: "Flexibility", value: 90, color: "bg-orange-500" },
      { name: "Social Depth", value: 75, color: "bg-violet-500" },
      { name: "Reflection", value: 65, color: "bg-indigo-500" },
      { name: "Logic", value: 55, color: "bg-blue-500" },
    ],
    strengths: ["Flexibility", "Social awareness", "Adaptability"],
    weaknesses: ["Identity confusion", "Lack of direction", "Over-adjustment"],
  },
  {
    id: 11,
    name: "The Balanced Mind",
    tagline: "You stay in the middle of extremes",
    description: "You are stable, measured, and rarely extreme.",
    category: "adapter",
    traits: [
      { name: "Emotional Control", value: 60, color: "bg-red-500" },
      { name: "Logic", value: 60, color: "bg-blue-500" },
      { name: "Flexibility", value: 65, color: "bg-orange-500" },
      { name: "Reflection", value: 60, color: "bg-indigo-500" },
    ],
    strengths: ["Stability", "Balance", "Rational thinking"],
    weaknesses: ["Lack of intensity", "Slow growth", "Playing safe"],
  },
  {
    id: 12,
    name: "The Flow Seeker",
    tagline: "You move with life, not against it",
    description: "You prefer ease, flow, and adaptability over control.",
    category: "adapter",
    traits: [
      { name: "Flexibility", value: 85, color: "bg-orange-500" },
      { name: "Intuition", value: 75, color: "bg-purple-500" },
      { name: "Discipline", value: 45, color: "bg-emerald-500" },
      { name: "Decisiveness", value: 50, color: "bg-cyan-500" },
    ],
    strengths: ["Flexibility", "Creativity", "Calmness"],
    weaknesses: ["Lack of structure", "Inconsistency", "Avoidance"],
  },

  // Strugglers
  {
    id: 13,
    name: "The Overthinking Prisoner",
    tagline: "You think more than you act",
    description: "You're stuck in your own mind.",
    category: "struggler",
    traits: [
      { name: "Reflection", value: 90, color: "bg-indigo-500" },
      { name: "Decisiveness", value: 30, color: "bg-cyan-500" },
      { name: "Emotional Sensitivity", value: 75, color: "bg-pink-500" },
      { name: "Discipline", value: 55, color: "bg-emerald-500" },
    ],
    strengths: ["Deep thinking", "Awareness", "Careful decisions"],
    weaknesses: ["Paralysis", "Anxiety", "Delay"],
  },
  {
    id: 14,
    name: "The Self Doubter",
    tagline: "You question yourself constantly",
    description: "You struggle to trust your own decisions.",
    category: "struggler",
    traits: [
      { name: "Reflection", value: 80, color: "bg-indigo-500" },
      { name: "Emotional Sensitivity", value: 80, color: "bg-pink-500" },
      { name: "Decisiveness", value: 35, color: "bg-cyan-500" },
      { name: "Logic", value: 50, color: "bg-blue-500" },
    ],
    strengths: ["Self-awareness", "Humility", "Carefulness"],
    weaknesses: ["Low confidence", "Indecision", "Fear of mistakes"],
  },
  {
    id: 15,
    name: "The Hidden Potential",
    tagline: "You have more than you show",
    description: "You're capable, but not fully activated.",
    category: "struggler",
    traits: [
      { name: "Intuition", value: 80, color: "bg-purple-500" },
      { name: "Discipline", value: 40, color: "bg-emerald-500" },
      { name: "Decisiveness", value: 35, color: "bg-cyan-500" },
      { name: "Social Energy", value: 45, color: "bg-amber-500" },
    ],
    strengths: ["High potential", "Creativity", "Insight"],
    weaknesses: ["Lack of action", "Inconsistency", "Delay"],
  },
];

// ==================== COMPONENTS ====================

// Identity Card Component
function IdentityCard({ type }: { type: IdentityType }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
      {/* Image Placeholder */}
      <div className="w-full aspect-video bg-gradient-to-br from-blue-50 to-cyan-50 border-b border-slate-200 flex items-center justify-center">
        <div className="text-slate-300 text-center">
          <Sparkles size={40} className="mx-auto mb-2 opacity-20" />
          <p className="text-sm text-slate-400">Image placeholder</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-1">{type.name}</h3>
        <p className="text-sm text-blue-600 font-semibold mb-3">
          {type.tagline}
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          {type.description}
        </p>
      </div>
    </div>
  );
}

// Personality Card Component
function PersonalityCard({ type }: { type: PersonalityType }) {
  const categoryColors = {
    thinker: "from-blue-50 to-slate-50",
    feeler: "from-pink-50 to-slate-50",
    doer: "from-amber-50 to-slate-50",
    adapter: "from-purple-50 to-slate-50",
    struggler: "from-red-50 to-slate-50",
  };

  return (
    <div
      className={`bg-gradient-to-br ${categoryColors[type.category]} border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
    >
      {/* Image Placeholder */}
      <div className="w-full aspect-video bg-gradient-to-br from-slate-100 to-slate-200 border-b border-slate-200 flex items-center justify-center">
        <div className="text-slate-400 text-center">
          <Sparkles size={40} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm text-slate-500">Image placeholder</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-7 space-y-4">
        {/* Header */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">{type.name}</h3>
          <p className="text-sm text-blue-600 font-semibold">{type.tagline}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600">{type.description}</p>

        {/* Trait Bars */}
        <div className="space-y-3 pt-2">
          {type.traits.map((trait, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-900">
                  {trait.name}
                </span>
                <span className="text-xs font-bold text-slate-600">
                  {trait.value}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white border border-slate-200 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${trait.color}`}
                  style={{ width: `${trait.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200">
          <div>
            <h4 className="text-xs font-bold text-emerald-700 mb-2 uppercase tracking-wide">
              Strengths
            </h4>
            <ul className="space-y-1">
              {type.strengths.map((s, idx) => (
                <li key={idx} className="text-xs text-slate-600">
                  • {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-red-700 mb-2 uppercase tracking-wide">
              Weaknesses
            </h4>
            <ul className="space-y-1">
              {type.weaknesses.map((w, idx) => (
                <li key={idx} className="text-xs text-slate-600">
                  • {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== PAGE ====================

export default function TypesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-6 bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              Type Library
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Explore All Personality Types
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Discover the different identities and personality systems that shape
            how people think, feel, and act.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tests/identity/who-you-really-are"
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              Start Test <ArrowRight size={18} />
            </Link>
            <button className="px-8 py-3 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Test Explanation Section */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Identity Types Card */}
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 border border-blue-100 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Layers size={24} className="text-blue-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Identity Types
              </h2>
              <p className="text-sm text-blue-700 font-semibold mb-4">
                Who you are
              </p>
              <p className="text-slate-600 leading-relaxed">
                These types reflect your core identity. They describe how you
                see yourself, your direction in life, and how you relate to who
                you are becoming.
              </p>
            </div>

            {/* Personality Types Card */}
            <div className="bg-gradient-to-br from-cyan-50 to-slate-50 border border-cyan-100 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center">
                  <Brain size={24} className="text-cyan-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Personality Types
              </h2>
              <p className="text-sm text-cyan-700 font-semibold mb-4">
                How you operate
              </p>
              <p className="text-slate-600 leading-relaxed">
                These types describe how your mind works. They show how you
                think, make decisions, handle emotions, and respond to
                situations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Identity Types Section */}
      <section className="py-16 md:py-24 px-6 bg-gradient-to-br from-blue-50/30 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <Layers size={28} className="text-blue-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Identity Types
              </h2>
            </div>
            <p className="text-slate-600 max-w-2xl">
              10 different ways people relate to themselves and their identity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {IDENTITY_TYPES.map((type) => (
              <IdentityCard key={type.id} type={type} />
            ))}
          </div>
        </div>
      </section>

      {/* Personality Types Section */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <Brain size={28} className="text-cyan-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Personality Types
              </h2>
            </div>
            <p className="text-slate-600 max-w-2xl">
              15 personality archetypes showing different ways people think,
              feel, and act.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PERSONALITY_TYPES.map((type) => (
              <PersonalityCard key={type.id} type={type} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-6 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Discover Your Type
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Take the test to understand how you think, feel, and operate.
          </p>
          <Link
            href="/tests/identity"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white text-blue-600 font-bold hover:bg-slate-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Start Your First Test <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
