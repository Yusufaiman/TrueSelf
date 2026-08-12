"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Compass,
  Dna,
  LineChart,
  Network,
  ShieldCheck,
} from "lucide-react";

const layers = [
  {
    label: "Foundation",
    title: "Start with a clear personality base",
    description:
      "Your 16-Type result gives the first structured layer: type, axes, confidence, facets, and neighbouring type.",
    icon: Dna,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "Domains",
    title: "Measure the rest of your real life",
    description:
      "Identity, relationships, career, mind, motivation, growth, stress, and life add evidence beyond personality.",
    icon: Brain,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    label: "Analytics",
    title: "Turn results into a whole-self pattern",
    description:
      "TrueSelf synthesizes your domains into profile coverage, confidence, whole-self axes, tensions, and key signals.",
    icon: Network,
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    label: "Timeline",
    title: "Separate core traits from life changes",
    description:
      "Retakes show what stays stable, what is developing, and what shifts with your current situation.",
    icon: Compass,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

export const ValueSection: React.FC = () => {
  return (
    <section className="bg-white px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
            <ShieldCheck size={16} className="text-blue-600" />
            Built as one evidence system
          </span>
          <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
            TrueSelf gets clearer because every result contributes evidence.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Personality is the starting layer, not the whole story. TrueSelf
            combines nine domains into a current profile, then tracks how that
            profile changes as you retake assessments over time.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {layers.map((layer) => {
            const IconComponent = layer.icon;
            return (
              <article
                key={layer.label}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
              >
                <div className="flex items-center justify-between gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full ${layer.bg} ${layer.color}`}
                  >
                    <IconComponent size={22} />
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${layer.bg} ${layer.color}`}
                  >
                    {layer.label}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold leading-7 text-slate-950">
                  {layer.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {layer.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6 md:flex md:items-center md:justify-between md:gap-8">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
              <LineChart size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-950">
                Your dashboard becomes your living self-profile.
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Overview gives the snapshot. Analytics gives the deeper pattern.
                Timeline shows what stayed core, what developed, and what moved
                with your life context.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard"
            className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-600 md:mt-0"
          >
            View dashboard
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};
