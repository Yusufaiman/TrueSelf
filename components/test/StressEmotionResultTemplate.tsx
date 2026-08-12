"use client";

import React from "react";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Download,
  Heart,
  MessageCircle,
  RefreshCw,
  RotateCcw,
  Shield,
  Sparkles,
  Target,
} from "lucide-react";
import {
  STRESS_EMOTION_DIMENSION_ORDER,
  STRESS_EMOTION_DIMENSIONS,
} from "@/lib/stress-emotions-profile/data";
import type {
  EmotionalCycleStage,
  StressEmotionProfileResult,
} from "@/lib/stress-emotions-profile/types";

export interface StressEmotionResultTemplateProps {
  variant: "stress-emotions-profile";
  result: StressEmotionProfileResult;
  onRetake: () => void;
}

export default function StressEmotionResultTemplate({
  result,
  onRetake,
}: StressEmotionResultTemplateProps) {
  const handleDownloadPdf = () => {
    const originalTitle = document.title;
    document.title = `TrueSelf Stress & Emotions - ${result.stressResponsePattern.name}`;
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
            This profile describes emotional processing and stress-response tendencies. It is not a diagnosis.
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

        <header className="mb-8 rounded-[2rem] border border-rose-200 bg-white p-8 text-center shadow-sm md:p-10">
          <span className="inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
            Stress & Emotions Profile
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            {result.stressResponsePattern.name}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            {result.stressResponsePattern.description}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Badge icon={<Sparkles size={16} />}>
              Strength · {result.emotionalStrength.label}
            </Badge>
            <Badge icon={<Target size={16} />}>
              {result.emotionalBottleneck
                ? `Bottleneck · ${result.emotionalBottleneck.label}`
                : "Cycle · Balanced"}
            </Badge>
            <Badge icon={<Shield size={16} />}>
              Confidence · {result.confidence}
            </Badge>
          </div>
        </header>

        <section className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-7">
          <SectionTitle icon={<Heart size={20} />} title="Emotional Processing Cycle" />
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            Emotional processing is a cycle: notice, understand, allow, regulate,
            express, and recover. Stress reactivity is shown separately because it
            measures activation load, not emotional skill.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.values(result.processingCycle).map((stage) => (
              <CycleCard
                key={stage.key}
                stage={stage}
                isStrength={stage.key === result.emotionalStrength.key}
                isBottleneck={stage.key === result.emotionalBottleneck?.key}
              />
            ))}
          </div>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Panel title="Stress Response Pattern" icon={<Activity size={20} />}>
            <p className="text-3xl font-black text-slate-950">
              {result.stressResponsePattern.name}
            </p>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {result.stressResponsePattern.description}
            </p>
            <div className="mt-5 rounded-[1.5rem] border border-rose-100 bg-rose-50 p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-rose-700">
                Stress Sensitivity
              </p>
              <div className="mt-3 flex items-end justify-between gap-4">
                <p className="text-4xl font-black text-rose-600">
                  {result.stressSensitivity.score}%
                </p>
                <p className="text-sm font-semibold text-rose-700">
                  {result.stressSensitivity.band}
                </p>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Higher stress reactivity means stronger internal activation under
                pressure. It is not a better or worse score.
              </p>
            </div>
          </Panel>

          <Panel title="Stress & Emotion Dimensions" icon={<AlertTriangle size={20} />}>
            <div className="grid gap-3 md:grid-cols-2">
              {STRESS_EMOTION_DIMENSION_ORDER.map((dimension) => {
                const score = result.dimensions[dimension];
                const meta = STRESS_EMOTION_DIMENSIONS[dimension];
                return <MiniDimension key={dimension} score={score} color={meta.color} />;
              })}
            </div>
          </Panel>
        </section>

        <section className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-7">
          <SectionTitle icon={<RefreshCw size={20} />} title="Dimension Breakdown" />
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            These dimensions are kept separate so your profile does not become one
            misleading emotional health score.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {STRESS_EMOTION_DIMENSION_ORDER.map((dimension) => {
              const score = result.dimensions[dimension];
              const meta = STRESS_EMOTION_DIMENSIONS[dimension];
              return <DimensionCard key={dimension} score={score} meta={meta} />;
            })}
          </div>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <Panel title="Processing Insights" icon={<Sparkles size={20} />}>
            <List items={fallbackList(result.processingInsights)} />
          </Panel>
          <Panel title="Stress Insights" icon={<Activity size={20} />}>
            <List items={fallbackList(result.stressInsights)} />
          </Panel>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <Panel title="Coping Insights" icon={<MessageCircle size={20} />}>
            <List items={fallbackList(result.copingInsights)} />
          </Panel>
          <Panel title="Support Path" icon={<Target size={20} />}>
            <List items={fallbackList(result.supportPath)} />
          </Panel>
        </section>

        <section className="mb-8 rounded-[2rem] border border-rose-100 bg-rose-50 p-6 md:p-7">
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
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-5 py-3 font-semibold text-white shadow-md transition hover:from-rose-600 hover:to-pink-600"
          >
            View dashboard
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}

function fallbackList(items: string[]) {
  return items.length
    ? items
    : ["Your responses are mixed or context-dependent in this area."];
}

function Badge({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-rose-100 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700">
      {icon}
      {children}
    </span>
  );
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 text-rose-600">
      {icon}
      <h2 className="text-xl font-bold text-slate-950">{title}</h2>
    </div>
  );
}

function CycleCard({
  stage,
  isStrength,
  isBottleneck,
}: {
  stage: EmotionalCycleStage;
  isStrength: boolean;
  isBottleneck: boolean;
}) {
  return (
    <article className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-black text-slate-950">{stage.label}</h3>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            {isStrength
              ? "Emotional strength"
              : isBottleneck
                ? "Potential bottleneck"
                : "Cycle stage"}
          </p>
        </div>
        <p className="text-2xl font-black text-rose-600">{stage.score}%</p>
      </div>
      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white">
        <div className="h-full rounded-full bg-rose-500" style={{ width: `${stage.score}%` }} />
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{stage.description}</p>
    </article>
  );
}

function MiniDimension({
  score,
  color,
}: {
  score: { label: string; score: number; band: string; isLoadDimension?: boolean };
  color: string;
}) {
  return (
    <article className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-slate-950">{score.label}</h3>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            {score.isLoadDimension ? "Activation load" : score.band}
          </p>
        </div>
        <p className="text-lg font-black" style={{ color }}>
          {score.score}%
        </p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
        <div className="h-full rounded-full" style={{ width: `${score.score}%`, backgroundColor: color }} />
      </div>
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
    isLoadDimension?: boolean;
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
      {score.isLoadDimension && (
        <p className="mt-3 rounded-2xl bg-white px-3 py-2 text-xs leading-5 text-slate-500">
          This is a load/sensitivity dimension. A higher score means stronger
          activation under pressure, not a healthier or better result.
        </p>
      )}
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
          <ArrowRight size={16} className="mt-1 shrink-0 text-rose-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
