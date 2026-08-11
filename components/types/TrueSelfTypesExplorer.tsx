"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Brain,
  Briefcase,
  Compass,
  HeartHandshake,
  Layers,
  Lightbulb,
  ShieldAlert,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import type {
  BehaviouralTraitKey,
  TrueSelf16Profile,
  TypeCode,
  TypeFamily,
} from "@/lib/trueself-16/types";
import {
  COGNITIVE_FUNCTIONS,
  FUNCTION_STACKS,
  ROLE_LABELS,
  TRAIT_LABELS,
  TYPE_FAMILIES,
  TYPE_FAMILY_BY_CODE,
} from "@/lib/trueself-16/layers";

interface TrueSelfTypesExplorerProps {
  profiles: TrueSelf16Profile[];
  families: Array<
    typeof TYPE_FAMILIES[TypeFamily] & { profiles: TrueSelf16Profile[] }
  >;
}

const axisRows = [
  { key: "energy", first: "E", second: "I", label: "Energy" },
  { key: "information", first: "S", second: "N", label: "Information" },
  { key: "judgment", first: "T", second: "F", label: "Judgment" },
  { key: "structure", first: "J", second: "P", label: "Life Structure" },
] as const;

const traitExplanations: Record<BehaviouralTraitKey, string> = {
  emotionalStability: "How steadily this type usually regulates emotion and pressure.",
  socialExpression: "How visibly this type tends to express energy around people.",
  adaptability: "How naturally this type shifts direction when new information appears.",
  discipline: "How strongly this type prefers structure, completion, and follow-through.",
  stressResponse: "How composed this type tends to remain under strain.",
  confidence: "How directly this type tends to trust and act on its own judgment.",
};

const familyColors: Record<
  TypeFamily,
  { accent: string; soft: string; border: string }
> = {
  NT: { accent: "#2563eb", soft: "#dbeafe", border: "#bfdbfe" },
  NF: { accent: "#db2777", soft: "#fce7f3", border: "#fbcfe8" },
  SJ: { accent: "#0f766e", soft: "#ccfbf1", border: "#99f6e4" },
  SP: { accent: "#ea580c", soft: "#ffedd5", border: "#fed7aa" },
};

const typeColors: Record<
  TypeCode,
  { accent: string; soft: string; border: string }
> = {
  ISTJ: { accent: "#0f766e", soft: "#ccfbf1", border: "#99f6e4" },
  ISFJ: { accent: "#059669", soft: "#dcfce7", border: "#bbf7d0" },
  INFJ: { accent: "#7c3aed", soft: "#ede9fe", border: "#ddd6fe" },
  INTJ: { accent: "#2563eb", soft: "#dbeafe", border: "#bfdbfe" },
  ISTP: { accent: "#475569", soft: "#f1f5f9", border: "#cbd5e1" },
  ISFP: { accent: "#16a34a", soft: "#dcfce7", border: "#bbf7d0" },
  INFP: { accent: "#c026d3", soft: "#fae8ff", border: "#f5d0fe" },
  INTP: { accent: "#4f46e5", soft: "#e0e7ff", border: "#c7d2fe" },
  ESTP: { accent: "#dc2626", soft: "#fee2e2", border: "#fecaca" },
  ESFP: { accent: "#f97316", soft: "#ffedd5", border: "#fed7aa" },
  ENFP: { accent: "#ec4899", soft: "#fce7f3", border: "#fbcfe8" },
  ENTP: { accent: "#0891b2", soft: "#cffafe", border: "#a5f3fc" },
  ESTJ: { accent: "#9333ea", soft: "#f3e8ff", border: "#e9d5ff" },
  ESFJ: { accent: "#e11d48", soft: "#ffe4e6", border: "#fecdd3" },
  ENFJ: { accent: "#0284c7", soft: "#e0f2fe", border: "#bae6fd" },
  ENTJ: { accent: "#1d4ed8", soft: "#dbeafe", border: "#bfdbfe" },
};

function getAxisValue(typeCode: TypeCode, first: string) {
  return typeCode.includes(first) ? 76 : 24;
}

function getTraitValue(typeCode: TypeCode, trait: BehaviouralTraitKey) {
  const family = TYPE_FAMILY_BY_CODE[typeCode];
  const has = (letter: string) => typeCode.includes(letter);

  const values: Record<BehaviouralTraitKey, number> = {
    emotionalStability: 58,
    socialExpression: has("E") ? 78 : 36,
    adaptability: has("P") ? 78 : 42,
    discipline: has("J") ? 78 : 44,
    stressResponse: family === "SJ" || family === "NT" ? 68 : 56,
    confidence: has("T") || has("E") ? 72 : 60,
  };

  if (family === "NF") {
    values.emotionalStability -= 4;
    values.socialExpression += has("E") ? 4 : 0;
  }

  if (family === "SP") {
    values.adaptability += 6;
    values.discipline -= 4;
  }

  if (family === "NT") {
    values.confidence += 4;
    values.stressResponse += 2;
  }

  return Math.max(18, Math.min(92, values[trait]));
}

function getStackStrength(index: number) {
  return [96, 82, 58, 36][index];
}

function getFunctionRoleSummary(role: string) {
  const summaries: Record<string, string> = {
    dominant:
      "The main lens. This is usually the most natural and automatic way the type reads life.",
    auxiliary:
      "The support system. This balances the dominant function and helps the type act more maturely.",
    tertiary:
      "The playful edge. This can be useful, but often needs intention and maturity.",
    inferior:
      "The growth edge. Under stress this can feel awkward, but it also points to development.",
  };

  return summaries[role] ?? "";
}

function getContextDetails(profile: TrueSelf16Profile) {
  return [
    {
      title: "Core Self",
      text: profile.description,
    },
    {
      title: "Social Self",
      text: profile.relationshipStyle,
    },
    {
      title: "Work Self",
      text: profile.workStyle,
    },
    {
      title: "Stress Self",
      text: profile.blindSpots.join(", "),
    },
    {
      title: "Growth Self",
      text: profile.growthPath.join(" "),
    },
  ];
}

export function TrueSelfTypesExplorer({
  profiles,
  families,
}: TrueSelfTypesExplorerProps) {
  const [selectedType, setSelectedType] = useState<TrueSelf16Profile | null>(
    null,
  );

  const selectedFamily = selectedType
    ? TYPE_FAMILIES[TYPE_FAMILY_BY_CODE[selectedType.code]]
    : null;
  const selectedTypeColor = selectedType ? typeColors[selectedType.code] : null;

  const selectedStack = useMemo(
    () => (selectedType ? FUNCTION_STACKS[selectedType.code] : []),
    [selectedType],
  );

  useEffect(() => {
    document.body.style.overflow = selectedType ? "hidden" : "";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedType(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedType]);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-gradient-to-b from-blue-50 via-cyan-50/50 to-white px-6 py-20 text-center md:py-24">
        <div className="mx-auto max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
            <Sparkles size={16} />
            TrueSelf 16 Types
          </span>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            A clearer personality map
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            TrueSelf now uses a familiar 16-type structure built around four
            connected axes, four personality families, cognitive stacks, and
            growth patterns.
          </p>
          <Link
            href="/assessment/trueself-16-type"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-md transition hover:from-blue-600 hover:to-cyan-600"
          >
            Take the assessment
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Explore all 16 types
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Tap any type to open a deeper profile with cognitive functions,
              baseline graphs, behavioural dimensions, and growth notes.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600">
            <Compass size={16} className="text-slate-500" />
            4 axes · 16 outcomes
          </div>
        </div>

        <div className="mb-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {families.map((family) => {
            const color = familyColors[family.code];

            return (
            <article
              key={family.code}
              className="rounded-2xl border bg-white p-5 shadow-sm"
              style={{ borderColor: color.border }}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className="text-3xl font-black"
                  style={{ color: color.accent }}
                >
                  {family.code}
                </span>
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ backgroundColor: color.soft, color: color.accent }}
                >
                  {family.name}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {family.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {family.profiles.map((profile) => (
                  <span
                    key={profile.code}
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: typeColors[profile.code].soft,
                      color: typeColors[profile.code].accent,
                    }}
                  >
                    {profile.code}
                  </span>
                ))}
              </div>
            </article>
          );
          })}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {profiles.map((profile) => {
            const family = TYPE_FAMILIES[TYPE_FAMILY_BY_CODE[profile.code]];
            const color = typeColors[profile.code];

            return (
              <article
                key={profile.code}
                tabIndex={0}
                onClick={() => setSelectedType(profile)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedType(profile);
                  }
                }}
                className="flex h-full cursor-pointer flex-col rounded-2xl border bg-white p-6 shadow-sm outline-none transition hover:-translate-y-1 hover:shadow-lg focus:ring-4"
                style={{
                  borderColor: color.border,
                  ["--tw-ring-color" as string]: color.soft,
                }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className="text-3xl font-black tracking-tight"
                    style={{ color: color.accent }}
                  >
                    {profile.code}
                  </span>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ backgroundColor: color.soft, color: color.accent }}
                  >
                    {family.code} · {family.name}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {profile.name}
                </h3>
                <p className="mt-1 text-sm italic text-slate-500">
                  {profile.tagline}
                </p>
                <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">
                  {profile.description}
                </p>
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Core strengths
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {profile.strengths.map((strength) => (
                      <span
                        key={strength}
                        className="rounded-full px-3 py-1 text-xs font-medium"
                        style={{ backgroundColor: color.soft, color: color.accent }}
                      >
                        {strength}
                      </span>
                    ))}
                  </div>
                  <p
                    className="mt-4 text-sm font-semibold"
                    style={{ color: color.accent }}
                  >
                    View full profile
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {selectedType && selectedFamily && selectedTypeColor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedType(null)}
        >
          <div
            className="types-modal-scrollbar-hidden scrollbar-hidden max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur md:px-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="rounded-full px-3 py-1 text-xs font-bold"
                      style={{
                        backgroundColor: selectedTypeColor.soft,
                        color: selectedTypeColor.accent,
                      }}
                    >
                      {selectedFamily.code} · {selectedFamily.name}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      TrueSelf 16 Types
                    </span>
                  </div>
                  <h2
                    className="mt-3 text-4xl font-black tracking-tight md:text-6xl"
                    style={{ color: selectedTypeColor.accent }}
                  >
                    {selectedType.code}
                  </h2>
                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {selectedType.name}
                  </p>
                  <p className="mt-1 text-sm italic text-slate-500">
                    {selectedType.tagline}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedType(null)}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
                  aria-label="Close personality detail"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-6 p-5 md:p-8">
              <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <Target size={20} style={{ color: selectedTypeColor.accent }} />
                    <h3 className="text-lg font-bold text-slate-900">
                      Personality overview
                    </h3>
                  </div>
                  <p className="text-sm leading-7 text-slate-700">
                    {selectedType.description}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {selectedFamily.summary}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <BarChart3
                      size={20}
                      style={{ color: selectedTypeColor.accent }}
                    />
                    <h3 className="text-lg font-bold text-slate-900">
                      Axis graph
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {axisRows.map((axis) => {
                      const value = getAxisValue(selectedType.code, axis.first);
                      const preferred =
                        value >= 50 ? axis.first : axis.second;

                      return (
                        <div key={axis.key}>
                          <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="font-semibold text-slate-900">
                              {axis.label}
                            </span>
                            <span
                              className="font-bold"
                              style={{ color: selectedTypeColor.accent }}
                            >
                              {preferred} · {Math.max(value, 100 - value)}%
                            </span>
                          </div>
                          <div className="grid grid-cols-[2rem_1fr_2rem] items-center gap-3">
                            <span className="text-xs font-bold text-slate-500">
                              {axis.first}
                            </span>
                            <div className="relative h-3 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${value}%`,
                                  backgroundColor: selectedTypeColor.accent,
                                }}
                              />
                              <div className="absolute left-1/2 top-0 h-full w-px bg-white/80" />
                            </div>
                            <span className="text-right text-xs font-bold text-slate-500">
                              {axis.second}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="mb-5 flex items-center gap-2">
                  <Brain size={20} style={{ color: selectedTypeColor.accent }} />
                  <h3 className="text-lg font-bold text-slate-900">
                    Cognitive function stack
                  </h3>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {selectedStack.map((item, index) => {
                    const definition = COGNITIVE_FUNCTIONS[item.function];

                    return (
                      <div
                        key={`${item.role}-${item.function}`}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                      >
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {ROLE_LABELS[item.role]}
                        </p>
                        <div className="mt-3 flex items-end justify-between gap-3">
                          <span
                            className="text-3xl font-black"
                            style={{ color: selectedTypeColor.accent }}
                          >
                            {item.function}
                          </span>
                          <span
                            className="rounded-full bg-white px-3 py-1 text-xs font-bold"
                            style={{ color: selectedTypeColor.accent }}
                          >
                            {getStackStrength(index)}%
                          </span>
                        </div>
                        <p className="mt-2 text-sm font-bold text-slate-900">
                          {definition.name}
                        </p>
                        <p className="mt-3 text-xs leading-5 text-slate-600">
                          {definition.summary}
                        </p>
                        <p className="mt-3 border-t border-slate-200 pt-3 text-xs leading-5 text-slate-500">
                          {getFunctionRoleSummary(item.role)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="mb-5 flex items-center gap-2">
                    <Layers size={20} style={{ color: selectedTypeColor.accent }} />
                    <h3 className="text-lg font-bold text-slate-900">
                      Stack graph
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {selectedStack.map((item, index) => (
                      <div key={`${item.function}-graph`}>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-semibold text-slate-900">
                            {item.function} · {ROLE_LABELS[item.role]}
                          </span>
                          <span
                            className="text-sm font-bold"
                            style={{ color: selectedTypeColor.accent }}
                          >
                            {getStackStrength(index)}%
                          </span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${getStackStrength(index)}%`,
                              backgroundColor: selectedTypeColor.accent,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="mb-5 flex items-center gap-2">
                    <BarChart3
                      size={20}
                      style={{ color: selectedTypeColor.accent }}
                    />
                    <h3 className="text-lg font-bold text-slate-900">
                      Behavioural dimensions
                    </h3>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {(Object.keys(TRAIT_LABELS) as BehaviouralTraitKey[]).map(
                      (trait) => {
                        const value = getTraitValue(selectedType.code, trait);

                        return (
                          <div
                            key={trait}
                            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                          >
                            <div className="mb-2 flex items-center justify-between gap-3">
                              <span className="text-sm font-bold text-slate-900">
                                {TRAIT_LABELS[trait]}
                              </span>
                              <span
                                className="text-sm font-black"
                                style={{ color: selectedTypeColor.accent }}
                              >
                                {value}%
                              </span>
                            </div>
                            <div className="h-2.5 overflow-hidden rounded-full bg-white">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${value}%`,
                                  backgroundColor: selectedTypeColor.accent,
                                }}
                              />
                            </div>
                            <p className="mt-3 text-xs leading-5 text-slate-500">
                              {traitExplanations[trait]}
                            </p>
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
              </section>

              <section className="grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="mb-4 flex items-center gap-2 text-emerald-600">
                    <Lightbulb size={20} />
                    <h3 className="text-lg font-bold text-slate-900">
                      Strengths
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedType.strengths.map((strength) => (
                      <span
                        key={strength}
                        className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700"
                      >
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="mb-4 flex items-center gap-2 text-amber-600">
                    <ShieldAlert size={20} />
                    <h3 className="text-lg font-bold text-slate-900">
                      Blind spots
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedType.blindSpots.map((spot) => (
                      <span
                        key={spot}
                        className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700"
                      >
                        {spot}
                      </span>
                    ))}
                  </div>
                </div>
              </section>

              <section className="grid gap-5 lg:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div
                    className="mb-3 flex items-center gap-2"
                    style={{ color: selectedTypeColor.accent }}
                  >
                    <HeartHandshake size={20} />
                    <h3 className="font-bold text-slate-900">
                      Relationship style
                    </h3>
                  </div>
                  <p className="text-sm leading-6 text-slate-600">
                    {selectedType.relationshipStyle}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="mb-3 flex items-center gap-2 text-indigo-600">
                    <Briefcase size={20} />
                    <h3 className="font-bold text-slate-900">Work style</h3>
                  </div>
                  <p className="text-sm leading-6 text-slate-600">
                    {selectedType.workStyle}
                  </p>
                </div>
                <div
                  className="rounded-2xl border p-5"
                  style={{
                    borderColor: selectedTypeColor.border,
                    backgroundColor: selectedTypeColor.soft,
                  }}
                >
                  <div
                    className="mb-3 flex items-center gap-2"
                    style={{ color: selectedTypeColor.accent }}
                  >
                    <ArrowRight size={20} />
                    <h3 className="font-bold text-slate-900">Growth path</h3>
                  </div>
                  <p className="text-sm leading-6 text-slate-700">
                    {selectedType.growthPath.join(" ")}
                  </p>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-lg font-bold text-slate-900">
                  Contextual self details
                </h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                  {getContextDetails(selectedType).map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <p className="text-sm font-bold text-slate-900">
                        {item.title}
                      </p>
                      <p className="mt-2 text-xs leading-5 text-slate-600">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
