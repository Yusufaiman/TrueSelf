"use client";

import React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Compass,
  Download,
  Flame,
  Gauge,
  RotateCcw,
  Shield,
  Sparkles,
  Target,
} from "lucide-react";
import {
  MOTIVATION_DIMENSION_ORDER,
  MOTIVATION_DIMENSIONS,
} from "@/lib/motivation-profile/data";
import type {
  MotivationDriver,
  MotivationProfileResult,
} from "@/lib/motivation-profile/types";

export interface MotivationResultTemplateProps {
  variant: "motivation-profile";
  result: MotivationProfileResult;
  onRetake: () => void;
}

export default function MotivationResultTemplate({
  result,
  onRetake,
}: MotivationResultTemplateProps) {
  const handleDownloadPdf = () => {
    const originalTitle = document.title;
    document.title = `TrueSelf Motivation - ${result.pattern.name}`;
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
            Motivation describes what activates effort, not how lazy or capable you are.
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

        <header className="mb-8 rounded-[2rem] border border-orange-200 bg-white p-8 text-center shadow-sm md:p-10">
          <span className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
            Motivation Profile
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            {result.pattern.name}
          </h1>
          <p className="mt-3 text-lg italic text-orange-600">
            {result.pattern.tagline}
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            {result.pattern.description}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Badge icon={<Sparkles size={16} />}>
              Pattern fit · {result.pattern.matchScore}%
            </Badge>
            <Badge icon={<Target size={16} />}>
              Secondary · {result.secondaryPattern.name}
            </Badge>
            <Badge icon={<Shield size={16} />}>
              Confidence · {result.confidence}
            </Badge>
          </div>
        </header>

        <section className="mb-8 grid gap-6 lg:grid-cols-3">
          <DriverPanel title="Primary Drivers" drivers={result.primaryDrivers} tone="orange" />
          <DriverPanel title="Supporting Drivers" drivers={result.supportingDrivers} tone="amber" />
          <DriverPanel title="Lower-Influence Drivers" drivers={result.lowerInfluenceDrivers} tone="slate" />
        </section>

        <section className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-7">
          <SectionTitle icon={<Flame size={20} />} title="Your Motivation Systems" />
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            These are separate motivation sources. Several can be high at the
            same time, and lower influence does not mean weakness.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {MOTIVATION_DIMENSION_ORDER.map((dimension) => {
              const score = result.dimensions[dimension];
              const meta = MOTIVATION_DIMENSIONS[dimension];
              return <DimensionCard key={dimension} score={score} meta={meta} />;
            })}
          </div>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <Panel title="Activation Profile" icon={<Gauge size={20} />}>
            <List
              items={
                result.activationProfile.length
                  ? result.activationProfile
                  : ["Your strongest motivation sources appear more independent than combined, so your driver hierarchy may be the clearest signal."]
              }
            />
          </Panel>
          <Panel title="Motivation Tensions" icon={<Compass size={20} />}>
            <List items={result.motivationTensions} />
          </Panel>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <Panel title="What May Reduce Motivation" icon={<AlertTriangle size={20} />}>
            <List items={result.frictionProfile} />
          </Panel>
          <Panel title="Motivation Insights" icon={<Sparkles size={20} />}>
            <List items={result.insights} />
          </Panel>
        </section>

        <section className="mb-8 rounded-[2rem] border border-orange-100 bg-orange-50 p-6 md:p-7">
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
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3 font-semibold text-white shadow-md transition hover:from-orange-600 hover:to-amber-600"
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
    <span className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
      {icon}
      {children}
    </span>
  );
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 text-orange-600">
      {icon}
      <h2 className="text-xl font-bold text-slate-950">{title}</h2>
    </div>
  );
}

function DriverPanel({
  title,
  drivers,
  tone,
}: {
  title: string;
  drivers: MotivationDriver[];
  tone: "orange" | "amber" | "slate";
}) {
  const toneClasses = {
    orange: "border-orange-200 bg-orange-50 text-orange-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    slate: "border-slate-200 bg-slate-50 text-slate-700",
  };

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-950">{title}</h2>
      <div className="mt-5 space-y-3">
        {drivers.map((driver, index) => (
          <div
            key={driver.key}
            className={`rounded-[1.25rem] border p-4 ${toneClasses[tone]}`}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-bold">
                {index + 1}. {driver.label}
              </p>
              <span className="font-black">{driver.score}%</span>
            </div>
            <p className="mt-1 text-xs font-semibold opacity-80">
              {driver.band}
            </p>
          </div>
        ))}
      </div>
    </section>
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
      <p className="mt-4 text-sm leading-6 text-slate-600">
        {score.description}
      </p>
      <p className="mt-3 text-xs text-slate-500">
        Confidence: {score.confidence} · Consistency {score.consistency}%
      </p>
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
      <div className="mt-5">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
          <ArrowRight size={16} className="mt-1 shrink-0 text-orange-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
