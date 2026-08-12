"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
} from "lucide-react";

const steps = [
  {
    number: "01",
    label: "Start",
    title: "Begin with your foundation",
    description:
      "Take the 48-question 16-Type assessment to create the first layer of your TrueSelf profile.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    number: "02",
    label: "Connect",
    title: "Add the major life domains",
    description:
      "Identity, relationships, career, mind, motivation, growth, stress, and life each add their own evidence.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    number: "03",
    label: "Analyze",
    title: "See your whole-self pattern",
    description:
      "Analytics turns your results into a connected profile: axes, domain graphs, patterns, tensions, and signals.",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
  {
    number: "04",
    label: "Track",
    title: "Watch what stays and what changes",
    description:
      "Your dashboard shows your current profile while Timeline separates stable traits from developing and changing ones.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="bg-white px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
            <Compass size={16} className="text-blue-600" />
            How TrueSelf works
          </span>
          <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
            One profile. Nine domains. A clearer history of you.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            TrueSelf is not a stack of disconnected tests. Each assessment adds
            evidence to the same profile, then your dashboard turns that data
            into overview, analytics, recommendations, and timeline insights.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            return (
              <article
                key={step.number}
                className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-2xl bg-slate-100 px-3 py-1 text-4xl font-black text-slate-400">
                    {step.number}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${step.bg} ${step.color}`}
                  >
                    {step.label}
                  </span>
                </div>
                <h3 className="mt-8 text-xl font-bold leading-7 text-slate-950">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/assessment/trueself-16-type"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-md transition hover:from-blue-600 hover:to-cyan-600 hover:shadow-lg"
          >
            Start your first assessment
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};
