"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Dna,
  HeartHandshake,
  Layers,
  Sparkles,
  UserRound,
  Zap,
} from "lucide-react";

const signals = [
  {
    icon: Dna,
    title: "A single result cannot explain the whole person",
    description:
      "Your type matters, but it is only one layer. TrueSelf connects type, traits, context, behaviour, pressure, and direction.",
    accent: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: UserRound,
    title: "Your inner self and outer life do not always match",
    description:
      "Identity data shows where your real self, social expression, values, and external expectations line up or pull apart.",
    accent: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: HeartHandshake,
    title: "Relationships reveal patterns you cannot see alone",
    description:
      "Connection, communication, trust, care, and conflict add real-life evidence to your profile.",
    accent: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    icon: Briefcase,
    title: "Career fit is about environment, not job labels",
    description:
      "TrueSelf looks at autonomy, structure, social work, creativity, leadership drive, stability, and how you operate.",
    accent: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: Zap,
    title: "Stress and emotion change how your patterns show up",
    description:
      "Pressure, recovery, regulation, and emotional processing are measured directly instead of being guessed from one result.",
    accent: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: Layers,
    title: "Every assessment should add to the same profile",
    description:
      "Each completed domain contributes signals to your overview, analytics, timeline, and recommendations.",
    accent: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

export const ProblemSection: React.FC = () => {
  return (
    <section className="w-full bg-slate-50 px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
              <Sparkles size={16} />
              Connected self-profile system
            </span>
            <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
              Most self-tests give you pieces. TrueSelf connects them.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              TrueSelf is built around one profile that grows with evidence.
              Your results are not scattered quiz labels; they become a living
              map of who you are right now, what stays consistent, and what is
              changing over time.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              What TrueSelf connects
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {["Profile coverage", "Domain signals", "Whole-self pattern", "Timeline changes"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                  >
                    <p className="text-sm font-bold text-slate-900">{item}</p>
                  </div>
                ),
              )}
            </div>
            <Link
              href="/assessment/trueself-16-type"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-600"
            >
              Start your profile
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {signals.map((signal) => {
            const IconComponent = signal.icon;
            return (
              <article
                key={signal.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
              >
                <div
                  className={`mb-5 flex h-11 w-11 items-center justify-center rounded-full ${signal.bg} ${signal.accent}`}
                >
                  <IconComponent size={22} />
                </div>
                <h3 className="text-lg font-bold leading-7 text-slate-950">
                  {signal.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {signal.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
