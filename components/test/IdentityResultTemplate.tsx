"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Download,
  Eye,
  Layers,
  RotateCcw,
  Shield,
  Sparkles,
  UserRound,
} from "lucide-react";
import { IDENTITY_DIMENSIONS } from "@/lib/identity-profile/data";
import type { IdentityDimensionKey, IdentityResult } from "@/lib/identity-profile/types";

export interface IdentityResultTemplateProps {
  variant: "identity-profile";
  result: IdentityResult;
  onRetake: () => void;
}

const dimensionOrder: IdentityDimensionKey[] = [
  "self_clarity",
  "authenticity",
  "values_alignment",
  "social_adaptation",
  "external_influence",
  "identity_stability",
];

export default function IdentityResultTemplate({
  result,
  onRetake,
}: IdentityResultTemplateProps) {
  const handleDownloadPdf = () => {
    const originalTitle = document.title;
    document.title = `TrueSelf Identity - ${result.pattern.name}`;
    window.print();
    window.setTimeout(() => {
      document.title = originalTitle;
    }, 500);
  };

  return (
    <main className="trueself-result-page min-h-screen bg-slate-50 px-6 py-10 md:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="pdf-hide mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-slate-500">
            Identity describes how you understand, maintain, and express who you are.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <Download size={17} />
              Download PDF
            </button>
            <button
              type="button"
              onClick={onRetake}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <RotateCcw size={17} />
              Retake
            </button>
          </div>
        </div>

        <header className="mb-8 rounded-[2rem] border border-indigo-200 bg-white p-8 text-center shadow-sm md:p-10">
          <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            Who You Really Are
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            {result.pattern.name}
          </h1>
          <p className="mt-3 text-lg italic text-indigo-600">
            {result.pattern.tagline}
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            {result.pattern.description}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Badge icon={<Sparkles size={16} />}>
              Match strength · {result.pattern.matchScore}%
            </Badge>
            <Badge icon={<Shield size={16} />}>
              Result confidence · {result.confidence}
            </Badge>
          </div>
        </header>

        <section className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-7">
          <SectionTitle icon={<Layers size={20} />} title="Your Identity Map" />
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            There is no single identity score. These six dimensions describe
            different parts of how your identity forms and expresses itself.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dimensionOrder.map((dimension) => {
              const score = result.dimensions[dimension];
              const meta = IDENTITY_DIMENSIONS[dimension];

              return (
                <article
                  key={dimension}
                  className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-slate-950">{score.label}</h3>
                      <p className="mt-1 text-xs font-semibold" style={{ color: meta.color }}>
                        {score.band}
                      </p>
                    </div>
                    <p className="text-2xl font-black" style={{ color: meta.color }}>
                      {score.score}%
                    </p>
                  </div>
                  <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${score.score}%`, backgroundColor: meta.color }}
                    />
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {score.description}
                  </p>
                  <p className="mt-3 text-xs text-slate-500">
                    Confidence: {score.confidence} · Consistency {score.consistency}%
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-3">
          <MetricCard
            icon={<UserRound size={20} />}
            title="Core-Social Alignment"
            value={result.coreSocialAlignment.level}
            text={result.coreSocialAlignment.description}
          />
          <MetricCard
            icon={<Eye size={20} />}
            title="Expression Gap"
            value={result.expressionGap.level}
            text={result.expressionGap.description}
          />
          <MetricCard
            icon={<Compass size={20} />}
            title="Internal Grounding"
            value={result.internalGrounding.level}
            text={result.internalGrounding.description}
          />
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <Panel title="Core Self" icon={<Shield size={20} />}>
            <p className="text-sm leading-7 text-slate-600">
              The parts of you that appear more internally stable or self-defining.
            </p>
            <ChipList items={result.coreSelf.length ? result.coreSelf : ["Still developing"]} />
          </Panel>
          <Panel title="Social Self" icon={<UserRound size={20} />}>
            <p className="text-sm leading-7 text-slate-600">
              How your identity is most likely to adapt or become visible around others.
            </p>
            <ChipList items={result.socialSelf.length ? result.socialSelf : ["Context-dependent expression"]} />
          </Panel>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <Panel title="What Grounds You" icon={<CheckCircle2 size={20} />}>
            <ChipList items={result.groundingSignals.length ? result.groundingSignals : ["More data needed"]} />
          </Panel>
          <Panel title="Where You Adapt" icon={<Layers size={20} />}>
            <ChipList items={result.adaptationSignals.length ? result.adaptationSignals : ["More data needed"]} />
          </Panel>
        </section>

        <section className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-7">
          <SectionTitle icon={<Sparkles size={20} />} title="Identity Insights" />
          {result.insights.length > 0 ? (
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {result.insights.map((insight) => (
                <p
                  key={insight}
                  className="rounded-[1.25rem] bg-indigo-50 p-4 text-sm leading-6 text-slate-700"
                >
                  {insight}
                </p>
              ))}
            </div>
          ) : (
            <p className="mt-5 rounded-[1.25rem] bg-slate-50 p-5 text-sm leading-6 text-slate-600">
              Your identity profile appears balanced or context-dependent, so
              stronger insights will become clearer as you complete more tests.
            </p>
          )}
        </section>

        <section className="mb-8 rounded-[2rem] border border-indigo-100 bg-indigo-50 p-6 md:p-7">
          <SectionTitle icon={<Shield size={20} />} title="Result Confidence" />
          <p className="mt-3 text-3xl font-black text-slate-950">
            {result.confidence}
          </p>
          <div className="mt-4 space-y-2">
            {result.confidenceNotes.map((note) => (
              <p key={note} className="text-sm leading-6 text-slate-600">
                {note}
              </p>
            ))}
          </div>
        </section>

        <div className="pdf-hide mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onRetake}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <RotateCcw size={18} />
            Retake assessment
          </button>
          <Link
            href="/tests/relationships"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 px-5 py-3 font-semibold text-white shadow-md transition hover:from-indigo-600 hover:to-blue-600"
          >
            Continue to Relationship Style
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}

function Badge({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
      {icon}
      {children}
    </span>
  );
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 text-indigo-600">
      {icon}
      <h2 className="text-xl font-bold text-slate-950">{title}</h2>
    </div>
  );
}

function MetricCard({
  icon,
  title,
  value,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  text: string;
}) {
  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 text-indigo-600">
        {icon}
        <h3 className="font-bold text-slate-950">{title}</h3>
      </div>
      <p className="mt-4 text-3xl font-black text-slate-950">{value}</p>
      <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
    </article>
  );
}

function Panel({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-7">
      <SectionTitle icon={icon} title={title} />
      <div className="mt-4">{children}</div>
    </section>
  );
}

function ChipList({ items }: { items: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
