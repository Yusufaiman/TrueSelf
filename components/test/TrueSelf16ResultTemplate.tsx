"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Layers,
  Lightbulb,
  RotateCcw,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import type { AxisKey, TrueSelf16Result } from "@/lib/trueself-16/types";
import { AXES, TRUESELF_16_PROFILES } from "@/lib/trueself-16/data";
import {
  COGNITIVE_FUNCTIONS,
  FUNCTION_STACKS,
  ROLE_LABELS,
  TYPE_FAMILIES,
  TYPE_FAMILY_BY_CODE,
} from "@/lib/trueself-16/layers";

export interface TrueSelf16ResultTemplateProps {
  variant: "trueself-16-type";
  result: TrueSelf16Result;
  onRetake: () => void;
}

const axisOrder: AxisKey[] = ["EI", "SN", "TF", "JP"];

const confidenceLabel: Record<TrueSelf16Result["confidence"], string> = {
  high: "High clarity",
  medium: "Moderate clarity",
  low: "Low clarity",
};

export default function TrueSelf16ResultTemplate({
  result,
  onRetake,
}: TrueSelf16ResultTemplateProps) {
  const family =
    result.family ?? TYPE_FAMILIES[TYPE_FAMILY_BY_CODE[result.typeCode]];
  const functionStack = result.functionStack ?? FUNCTION_STACKS[result.typeCode];
  const closestProfile = TRUESELF_16_PROFILES[result.closestType];
  const facetEntries = result.facetScores
    ? Object.entries(result.facetScores).flatMap(([axis, facets]) =>
        facets.map((facet) => ({
          ...facet,
          axisLabel: AXES[axis as AxisKey].summary,
        })),
      )
    : [];

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            TrueSelf 16 Types
          </span>
          <h1 className="mt-5 text-6xl font-black tracking-tight text-slate-950 md:text-8xl">
            {result.typeCode}
          </h1>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
            {result.typeName}
          </h2>
          <p className="mt-2 text-lg italic text-slate-500">
            {result.tagline}
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            {result.description}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
            <Sparkles size={16} className="text-blue-600" />
            {confidenceLabel[result.confidence]} · {result.confidenceScore}%
          </div>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            <Layers size={16} />
            {family.code} · {family.name}
          </div>
        </div>

        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h3 className="text-xl font-bold text-slate-900">
              Your four-axis profile
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              These scores show your preference direction, not ability or worth.
            </p>
          </div>
          <div className="space-y-5">
            {axisOrder.map((axis) => {
              const score = result.axisScores[axis];
              const definition = AXES[axis];

              return (
                <div key={axis}>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {score.firstCode}/{score.secondCode}
                      </p>
                      <p className="text-xs text-slate-500">
                        {definition.summary}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-blue-600">
                        {score.preferencePercent}% {score.preferenceLabel}
                      </p>
                      <p className="text-xs text-slate-500">
                        {score.strengthLabel}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
                    <span className="w-28 text-xs font-medium text-slate-500">
                      {score.firstLabel}
                    </span>
                    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                        style={{ width: `${score.firstPercent}%` }}
                      />
                    </div>
                    <span className="w-28 text-right text-xs font-medium text-slate-500">
                      {score.secondLabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <Brain size={20} className="text-blue-600" />
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Cognitive stack
              </h3>
              <p className="text-sm text-slate-500">{family.summary}</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {functionStack.map((item) => {
              const definition = COGNITIVE_FUNCTIONS[item.function];

              return (
                <div
                  key={`${item.role}-${item.function}`}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {ROLE_LABELS[item.role]}
                  </p>
                  <p className="mt-2 text-2xl font-black text-blue-600">
                    {item.function}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {definition.name}
                  </p>
                  <p className="mt-3 text-xs leading-5 text-slate-500">
                    {definition.summary}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-8 rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-blue-700">
                Result clarity
              </p>
              <h3 className="mt-1 text-3xl font-black text-slate-950">
                {result.confidenceScore}%
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                {confidenceLabel[result.confidence]}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-700">
                Closest neighbouring type
              </p>
              <h3 className="mt-1 text-3xl font-black text-slate-950">
                {result.closestType}
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                {closestProfile?.name ?? "A nearby 16-type pattern"}
              </p>
            </div>
            <p className="text-sm leading-6 text-slate-700 md:col-span-1">
              If one axis is close to balanced, this neighbouring type may also
              feel familiar. Your result still uses your strongest measured
              preference on each axis.
            </p>
          </div>
        </section>

        {facetEntries.length > 0 && (
          <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h3 className="text-xl font-bold text-slate-900">
                Measured facets
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                These are the smaller behavioural signals behind your four
                letters. They come directly from the 48 assessment answers.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {facetEntries.map((facet) => (
                <div
                  key={`${facet.axis}-${facet.facet}`}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold capitalize text-slate-900">
                        {facet.facet.replace(/_/g, " ")}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {facet.axisLabel}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-blue-600">
                      {facet.percent}%
                    </p>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-white">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                      style={{ width: `${facet.percent}%` }}
                    />
                  </div>
                  <p className="mt-3 text-xs font-medium text-slate-500">
                    {facet.preferredPole} · {facet.strengthLabel}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-emerald-600">
              <Lightbulb size={20} />
              <h3 className="font-bold text-slate-900">Strengths</h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-600">
              {result.strengths.map((item) => (
                <li key={item} className="rounded-lg bg-emerald-50 p-3">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-amber-600">
              <ShieldAlert size={20} />
              <h3 className="font-bold text-slate-900">Blind spots</h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-600">
              {result.blindSpots.map((item) => (
                <li key={item} className="rounded-lg bg-amber-50 p-3">
                  {item}
                </li>
              ))}
            </ul>
          </section>

        </div>

        <section className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h3 className="text-lg font-bold text-slate-900">Growth path</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            {[...result.growthPath, ...result.suggestedNextSteps].map(
              (item) => (
                <li key={item} className="flex gap-3">
                  <ArrowRight size={16} className="mt-0.5 shrink-0 text-blue-600" />
                  <span>{item}</span>
                </li>
              ),
            )}
          </ul>
        </section>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onRetake}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <RotateCcw size={18} />
            Retake assessment
          </button>
          <Link
            href="/types"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-3 font-semibold text-white shadow-md transition hover:from-blue-600 hover:to-cyan-600"
          >
            Explore all 16 types
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
