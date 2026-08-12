"use client";

import React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Compass,
  Download,
  Eye,
  RotateCcw,
  Shield,
  Sparkles,
  Sprout,
  Target,
} from "lucide-react";
import { GROWTH_DIMENSION_ORDER, GROWTH_DIMENSIONS } from "@/lib/growth-profile/data";
import type { GrowthProfileResult, GrowthStageScore } from "@/lib/growth-profile/types";

export interface GrowthResultTemplateProps {
  variant: "growth-profile";
  result: GrowthProfileResult;
  onRetake: () => void;
}

export default function GrowthResultTemplate({
  result,
  onRetake,
}: GrowthResultTemplateProps) {
  const handleDownloadPdf = () => {
    const originalTitle = document.title;
    document.title = `TrueSelf Growth - ${result.growthPattern}`;
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
            Growth describes how you develop, not how successful or valuable you are.
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

        <header className="mb-8 rounded-[2rem] border border-green-200 bg-white p-8 text-center shadow-sm md:p-10">
          <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
            Growth Profile
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            {result.growthPattern}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            {result.cycleInsight}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Badge icon={<Sparkles size={16} />}>
              Strength · {result.growthStrength.label}
            </Badge>
            <Badge icon={<Target size={16} />}>
              Bottleneck · {result.growthBottleneck.label}
            </Badge>
            <Badge icon={<Shield size={16} />}>
              Confidence · {result.confidence}
            </Badge>
          </div>
        </header>

        <section className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-7">
          <SectionTitle icon={<Sprout size={20} />} title="Your Growth Cycle" />
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            Growth is a cycle: SEE, ACCEPT, ADAPT, CONTINUE, then see again.
            These stages show where growth flows most easily and where it may get stuck.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Object.values(result.stages).map((stage) => (
              <StageCard
                key={stage.key}
                stage={stage}
                isStrength={stage.key === result.growthStrength.key}
                isBottleneck={stage.key === result.growthBottleneck.key}
              />
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-7">
          <SectionTitle icon={<Eye size={20} />} title="Growth Dimensions" />
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            These eight dimensions stay separate. There is no single growth score.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {GROWTH_DIMENSION_ORDER.map((dimension) => {
              const score = result.dimensions[dimension];
              const meta = GROWTH_DIMENSIONS[dimension];
              return <DimensionCard key={dimension} score={score} meta={meta} />;
            })}
          </div>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <Panel title="Growth Strengths" icon={<Sparkles size={20} />}>
            <TagList items={result.strengths} />
          </Panel>
          <Panel title="Bottleneck Signals" icon={<AlertTriangle size={20} />}>
            <List items={result.bottleneckSignals} />
          </Panel>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <Panel title="Development Path" icon={<Compass size={20} />}>
            <List items={result.developmentPath} />
          </Panel>
          <Panel title="Growth Insights" icon={<Sprout size={20} />}>
            <List
              items={
                result.insights.length
                  ? result.insights
                  : ["Your growth pattern appears balanced or context-dependent, so the cycle view may be the clearest signal."]
              }
            />
          </Panel>
        </section>

        <section className="mb-8 rounded-[2rem] border border-green-100 bg-green-50 p-6 md:p-7">
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
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-5 py-3 font-semibold text-white shadow-md transition hover:from-green-600 hover:to-emerald-600"
          >
            View dashboard
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}

function Badge({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
      {icon}
      {children}
    </span>
  );
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 text-green-600">
      {icon}
      <h2 className="text-xl font-bold text-slate-950">{title}</h2>
    </div>
  );
}

function StageCard({
  stage,
  isStrength,
  isBottleneck,
}: {
  stage: GrowthStageScore;
  isStrength: boolean;
  isBottleneck: boolean;
}) {
  return (
    <article className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-black text-slate-950">{stage.label}</h3>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            {isStrength ? "Growth strength" : isBottleneck ? "Growth bottleneck" : "Cycle stage"}
          </p>
        </div>
        <p className="text-2xl font-black text-green-600">{stage.score}%</p>
      </div>
      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white">
        <div className="h-full rounded-full bg-green-500" style={{ width: `${stage.score}%` }} />
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{stage.description}</p>
    </article>
  );
}

function DimensionCard({
  score,
  meta,
}: {
  score: {
    label: string;
    score: number;
    band: string;
    lowLabel: string;
    highLabel: string;
    description: string;
    consistency: number;
    confidence: string;
  };
  meta: { color: string; soft: string };
}) {
  return (
    <article className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
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
      <div className="mt-2 flex justify-between text-xs font-semibold text-slate-500">
        <span>{score.lowLabel}</span>
        <span>{score.highLabel}</span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{score.description}</p>
      <p className="mt-3 text-xs text-slate-500">
        Confidence: {score.confidence} · Consistency {score.consistency}%
      </p>
    </article>
  );
}

function Panel({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-7">
      <SectionTitle icon={icon} title={title} />
      <div className="mt-5">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
          <ArrowRight size={16} className="mt-1 shrink-0 text-green-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
