"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  Compass,
  Dna,
  Layers,
  Network,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { CategoryCard } from "@/components/sections/CategoryCard";
import { TEST_CATEGORIES } from "@/config/testCategories";

const architecture = [
  {
    label: "Foundation",
    title: "Start with measured evidence",
    description:
      "The master assessment gives your profile a clean starting layer: four axes, facets, clarity, and confidence.",
    icon: Dna,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "Domains",
    title: "Add the rest of your life",
    description:
      "Identity, relationships, career, mind, motivation, growth, stress, and life each add their own signals.",
    icon: Layers,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    label: "Synthesis",
    title: "Connect patterns across domains",
    description:
      "Analytics looks for repeated themes, tensions, and strengths across your completed assessments.",
    icon: Network,
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    label: "Timeline",
    title: "Separate stable traits from change",
    description:
      "Your dashboard keeps the current snapshot clear while timeline insights track what develops over time.",
    icon: BarChart3,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

const principles = [
  "Every assessment measures its own domain instead of pretending one quiz can explain everything.",
  "Results are stored as evidence: scores, dimensions, facets, confidence, and profile signals.",
  "Analytics connects repeated patterns across domains, but it does not invent insights when data is missing.",
  "The dashboard is a readable snapshot; deeper graphs, comparisons, and timelines live in Analytics.",
];

const profileLayers = [
  {
    title: "Current profile",
    description:
      "A clear snapshot of what your completed assessments currently say about you.",
    stat: "Now",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Domain patterns",
    description:
      "Nine focused areas show how you think, connect, work, grow, recover, and choose direction.",
    stat: "9",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    title: "Cross-domain reading",
    description:
      "TrueSelf compares results across assessments to show what keeps repeating in different contexts.",
    stat: "X",
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    title: "Change over time",
    description:
      "Retakes build a timeline so you can separate stable patterns from developing ones.",
    stat: "T",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-gradient-to-b from-blue-50 via-cyan-50/60 to-white px-6 py-20 text-center md:py-24">
        <div className="mx-auto max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
            <Sparkles size={16} />
            About TrueSelf
          </span>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            One connected profile for your whole self.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            TrueSelf connects your assessments across personality, identity,
            relationships, career, mind, motivation, growth, stress, and life,
            then turns them into one readable profile.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/assessment/trueself-16-type"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-md transition hover:from-blue-600 hover:to-cyan-600"
            >
              Take the master assessment
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/dashboard/analytics"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            >
              See profile analytics
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
                <Dna size={16} className="text-blue-600" />
                What TrueSelf is built for
              </span>
              <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                One profile, many parts of you.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                TrueSelf is not trying to reduce you to one label. It starts
                with measured personality evidence, then expands through the
                major domains that shape everyday life: how you see yourself,
                connect with people, work, think, act, handle pressure, grow,
                and choose direction.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {profileLayers.map((layer) => (
                <article
                  key={layer.title}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
                >
                  <p
                    className={`inline-flex rounded-2xl px-3 py-1 text-4xl font-black ${layer.bg} ${layer.color}`}
                  >
                    {layer.stat}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-slate-950">
                    {layer.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {layer.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
              <Brain size={16} className="text-blue-600" />
              The architecture
            </span>
            <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
              From assessments to usable insight.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Every test contributes structured data to the same TrueSelf
              profile. The system can then show a simple overview, detailed
              analytics, result graphs, domain type patterns, and timeline
              changes without mixing everything into one random average.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {architecture.map((item) => {
              const IconComponent = item.icon;

              return (
                <article
                  key={item.label}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full ${item.bg} ${item.color}`}
                    >
                      <IconComponent size={22} />
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${item.bg} ${item.color}`}
                    >
                      {item.label}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold leading-7 text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 md:p-8">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-blue-600" />
                <h2 className="text-3xl font-black text-slate-950">
                  Our scoring philosophy
                </h2>
              </div>
              <div className="mt-6 space-y-4">
                {principles.map((principle) => (
                  <div key={principle} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <p className="text-sm leading-6 text-slate-600">
                      {principle}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                Evidence before interpretation
              </span>
              <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                Clear results need clean data.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                The 16-type assessment uses the familiar four-letter format as
                one foundation, but TrueSelf is bigger than personality. Each
                domain has its own scoring model, result type, spider chart,
                interpretation, and profile signals.
              </p>
              <p className="mt-4 text-base leading-7 text-slate-500">
                This keeps your profile honest: personality does not overwrite
                relationship data, motivation does not pretend to explain stress,
                and Analytics only connects patterns when the evidence exists.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
              <Compass size={16} className="text-blue-600" />
              What you can explore
            </span>
            <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
              Nine assessments, one connected reading.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Each category is one complete assessment. Together, they build a
              profile that can describe your current pattern, compare domains,
              open detailed result views, and track change over time.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TEST_CATEGORIES.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">
            Build one profile that keeps getting clearer.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/85">
            Start with any assessment, then let TrueSelf connect the evidence
            across domains into overview, analytics, recommendations, and
            timeline insights.
          </p>
          <Link
            href="/assessment/trueself-16-type"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-blue-600 shadow-md transition hover:bg-blue-50"
          >
            Take the master assessment
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
