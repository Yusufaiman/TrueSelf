"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  Briefcase,
  CheckCircle2,
  Download,
  GitBranch,
  GraduationCap,
  Heart,
  Layers,
  Lightbulb,
  MessageCircle,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingUp,
  Users,
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
import { getTypeDetailData } from "@/lib/trueself-16/type-detail-data";
import { getTypeColor, type TrueSelfTypeColor } from "@/lib/trueself-16/colors";

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
  const [showAllFacets, setShowAllFacets] = React.useState(false);
  const baseProfile = TRUESELF_16_PROFILES[result.typeCode];
  const detail = getTypeDetailData(baseProfile);
  const family =
    result.family ?? TYPE_FAMILIES[TYPE_FAMILY_BY_CODE[result.typeCode]];
  const functionStack = result.functionStack ?? FUNCTION_STACKS[result.typeCode];
  const closestProfile = TRUESELF_16_PROFILES[result.closestType];
  const color = getTypeColor(result.typeCode);
  const expression = result.expression;
  const enneagram = result.enneagram;
  const facetEntries = result.facetScores
    ? Object.entries(result.facetScores).flatMap(([axis, facets]) =>
        facets.map((facet) => ({
          ...facet,
          axisLabel: AXES[axis as AxisKey].summary,
        })),
      )
    : [];
  const visibleFacetEntries = showAllFacets
    ? facetEntries
    : facetEntries.slice(0, 6);

  const handleDownloadPdf = () => {
    const originalTitle = document.title;
    document.title = `TrueSelf ${result.typeCode} Result`;
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
            Your result is ready. Save it, revisit it, or keep exploring.
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

        <header
          className="mb-8 rounded-[2rem] border bg-white p-8 text-center shadow-sm md:p-10"
          style={{ borderColor: color.border }}
        >
          <span
            className="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
            style={{ backgroundColor: color.soft, color: color.accent }}
          >
            TrueSelf 16 Types
          </span>
          <h1
            className="mt-5 text-6xl font-black tracking-tight md:text-8xl"
            style={{ color: color.accent }}
          >
            {result.typeCode}
          </h1>
          <h2 className="mt-3 text-3xl font-bold text-slate-950 md:text-4xl">
            {result.typeName}
          </h2>
          <p className="mt-2 text-lg italic text-slate-500">
            {result.tagline}
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            {detail.overview.summary}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Badge color={color} icon={<Sparkles size={16} />}>
              {confidenceLabel[result.confidence]} · {result.confidenceScore}%
            </Badge>
            <Badge color={color} icon={<Layers size={16} />}>
              {family.code} · {family.name}
            </Badge>
            {expression && (
              <Badge color={color} icon={<GitBranch size={16} />}>
                Expression · {expression.code}
              </Badge>
            )}
            {enneagram && (
              <Badge color={color} icon={<Target size={16} />}>
                Enneagram · {enneagram.code}
              </Badge>
            )}
          </div>
          {(expression || enneagram) && (
            <div
              className="mx-auto mt-6 max-w-2xl rounded-[1.5rem] border p-4"
              style={{ borderColor: color.border, backgroundColor: color.soft }}
            >
              <p
                className="text-xs font-bold uppercase tracking-wide"
                style={{ color: color.accent }}
              >
                Detected profile fingerprint
              </p>
              <p className="mt-1 text-2xl font-black text-slate-950 md:text-3xl">
                {expression?.code ?? result.typeCode}
                {enneagram ? ` · ${enneagram.code}` : ""}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                {expression?.archetype}
                {expression && enneagram ? " with " : ""}
                {enneagram ? `Enneagram ${enneagram.code} motivation` : ""}
              </p>
            </div>
          )}
        </header>

        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          {expression ? (
            <Panel>
              <SectionTitle
                icon={<GitBranch size={20} />}
                color={color}
                title="TrueSelf 64 Expression"
              />
              <p className="mt-2 text-sm text-slate-500">
                This layer shows how your core type tends to express itself.
                It is measured separately from the four-letter type.
              </p>
              <div
                className="mt-5 rounded-[1.75rem] border p-5"
                style={{
                  borderColor: color.border,
                  backgroundColor: color.soft,
                }}
              >
                <p
                  className="text-sm font-bold"
                  style={{ color: color.accent }}
                >
                  {expression.code}
                </p>
                <h3 className="mt-1 text-3xl font-black text-slate-950">
                  {expression.archetype}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {expression.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {expression.chips.map((chip) => (
                    <Pill key={chip} color={color}>
                      {chip}
                    </Pill>
                  ))}
                </div>
              </div>
              <div className="mt-5 space-y-4">
                <MetricBar
                  color={color}
                  label="A / O axis"
                  value={expression.assertion.preferencePercent}
                  valueLabel={`${expression.assertion.preferenceLabel} ${expression.assertion.preferencePercent}%`}
                  caption={`${expression.assertion.firstLabel} to ${expression.assertion.secondLabel} · ${expression.assertion.strengthLabel}`}
                />
                <MetricBar
                  color={color}
                  label="C / H axis"
                  value={expression.orientation.preferencePercent}
                  valueLabel={`${expression.orientation.preferenceLabel} ${expression.orientation.preferencePercent}%`}
                  caption={`${expression.orientation.firstLabel} to ${expression.orientation.secondLabel} · ${expression.orientation.strengthLabel}`}
                />
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <MiniStat
                  label="Expression clarity"
                  value={`${expression.confidenceScore}%`}
                  text={expression.confidence}
                  color={color}
                />
                <MiniStat
                  label="Closest expression"
                  value={expression.closestExpression}
                  text="Nearest neighbouring subtype"
                  color={color}
                />
              </div>
            </Panel>
          ) : (
            <Panel>
              <SectionTitle
                icon={<GitBranch size={20} />}
                color={color}
                title="TrueSelf 64 Expression"
              />
              <p className="mt-4 text-sm leading-7 text-slate-600">
                This saved result was created before expression scoring was
                added. Retake the assessment to detect AC, AH, OC, or OH from
                your answers.
              </p>
            </Panel>
          )}

          {enneagram ? (
            <Panel>
              <SectionTitle
                icon={<Target size={20} />}
                color={color}
                title="Enneagram Motivation"
              />
              <p className="mt-2 text-sm text-slate-500">
                This layer reads motivation, fear, coping style, and behaviour
                signals. The wing is chosen only from the two adjacent types.
              </p>
              <div
                className="mt-5 rounded-[1.75rem] border p-5"
                style={{
                  borderColor: color.border,
                  backgroundColor: color.soft,
                }}
              >
                <p
                  className="text-sm font-bold"
                  style={{ color: color.accent }}
                >
                  Enneagram {enneagram.code}
                </p>
                <h3 className="mt-1 text-3xl font-black text-slate-950">
                  Type {enneagram.coreType} with wing {enneagram.wing}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  <strong>Drive:</strong> {enneagram.drive}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-700">
                  <strong>Fear:</strong> {enneagram.fear}
                </p>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <MiniStat
                  label="Core score"
                  value={`${enneagram.coreScore}%`}
                  text={`Type ${enneagram.coreType}`}
                  color={color}
                />
                <MiniStat
                  label="Wing score"
                  value={`${enneagram.wingScore}%`}
                  text={`Wing ${enneagram.wing}`}
                  color={color}
                />
                <MiniStat
                  label="Confidence"
                  value={`${enneagram.confidenceScore}%`}
                  text={enneagram.confidence}
                  color={color}
                />
              </div>
              <div className="mt-5 space-y-3">
                {enneagram.typeScores.slice(0, 5).map((score) => (
                  <MetricBar
                    key={score.type}
                    color={color}
                    label={`Type ${score.type}`}
                    value={score.score}
                    valueLabel={`${score.score}%`}
                    caption={`Desire ${score.desire}% · Fear ${score.fear}% · Coping ${score.coping}% · Behaviour ${score.behavior}%`}
                  />
                ))}
              </div>
              <div className="mt-5 rounded-[1.5rem] bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">
                  Under pressure
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {enneagram.pressure}
                </p>
              </div>
            </Panel>
          ) : (
            <Panel>
              <SectionTitle
                icon={<Target size={20} />}
                color={color}
                title="Enneagram Motivation"
              />
              <p className="mt-4 text-sm leading-7 text-slate-600">
                This saved result was created before Enneagram scoring was
                added. Retake the assessment to detect your core Enneagram and
                wing from motivation-based answers.
              </p>
            </Panel>
          )}
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Panel>
            <SectionTitle
              icon={<Target size={20} />}
              color={color}
              title="Personality Overview"
            />
            <p className="mt-4 text-sm leading-7 text-slate-600">
              {detail.overview.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {detail.overview.tendencies.map((tendency) => (
                <Pill key={tendency} color={color}>
                  {tendency}
                </Pill>
              ))}
            </div>
          </Panel>

          <Panel>
            <SectionTitle
              icon={<BarChart3 size={20} />}
              color={color}
              title="Your Four-Axis Profile"
            />
            <p className="mt-2 text-sm text-slate-500">
              These scores show your measured preference direction, not ability
              or worth.
            </p>
            <div className="mt-5 space-y-5">
              {axisOrder.map((axis) => {
                const score = result.axisScores[axis];
                const definition = AXES[axis];

                return (
                  <div key={axis}>
                    <div className="mb-2 flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-950">
                          {score.firstCode}/{score.secondCode}
                        </p>
                        <p className="text-xs text-slate-500">
                          {definition.summary}
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className="text-sm font-bold"
                          style={{ color: color.accent }}
                        >
                          {score.preferencePercent}% {score.preferenceLabel}
                        </p>
                        <p className="text-xs text-slate-500">
                          {score.strengthLabel}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-[4.5rem_1fr_4.5rem] items-center gap-3">
                      <span className="text-xs font-medium text-slate-500">
                        {score.firstLabel}
                      </span>
                      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${score.firstPercent}%`,
                            background: `linear-gradient(90deg, ${color.accent}, #06b6d4)`,
                          }}
                        />
                      </div>
                      <span className="text-right text-xs font-medium text-slate-500">
                        {score.secondLabel}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>
        </section>

        <section
          className="mb-8 rounded-[2rem] border p-6 shadow-sm md:p-7"
          style={{ borderColor: color.border, backgroundColor: color.soft }}
        >
          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <p className="text-sm font-semibold" style={{ color: color.accent }}>
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
              <p className="text-sm font-semibold" style={{ color: color.accent }}>
                Closest neighbouring type
              </p>
              <h3 className="mt-1 text-3xl font-black text-slate-950">
                {result.closestType}
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                {closestProfile?.name ?? "A nearby 16-type pattern"}
              </p>
            </div>
            <p className="text-sm leading-6 text-slate-700">
              If one axis is close to balanced, this neighbouring type may also
              feel familiar. Your final type still uses your strongest measured
              preference on each axis.
            </p>
          </div>
        </section>

        <Panel className="mb-8">
          <SectionTitle
            icon={<Brain size={20} />}
            color={color}
            title="Cognitive Function Stack"
          />
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            This is the cognitive-function model associated with your type. It
            is shown as a structural pattern, not as separately measured function
            scores.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {functionStack.map((item) => {
              const definition = COGNITIVE_FUNCTIONS[item.function];

              return (
                <article
                  key={`${item.role}-${item.function}`}
                  className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {ROLE_LABELS[item.role]}
                  </p>
                  <p
                    className="mt-2 text-3xl font-black"
                    style={{ color: color.accent }}
                  >
                    {item.function}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-950">
                    {definition.name}
                  </p>
                  <p className="mt-3 text-xs leading-5 text-slate-500">
                    {definition.summary}
                  </p>
                </article>
              );
            })}
          </div>
        </Panel>

        {facetEntries.length > 0 && (
          <Panel className="mb-8">
            <SectionTitle
              icon={<Layers size={20} />}
              color={color}
              title="Measured Facets"
            />
            <p className="mt-2 text-sm text-slate-500">
              These are the smaller behavioural signals behind your four
              letters. They come directly from the core axis answers.
            </p>
            {facetEntries.length > 6 && (
              <button
                type="button"
                onClick={() => setShowAllFacets((current) => !current)}
                className="mt-4 inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                {showAllFacets
                  ? "Show less"
                  : `Show all ${facetEntries.length} facets`}
              </button>
            )}
            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {visibleFacetEntries.map((facet) => (
                <article
                  key={`${facet.axis}-${facet.facet}`}
                  className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold capitalize text-slate-950">
                        {facet.facet.replace(/_/g, " ")}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {facet.axisLabel}
                      </p>
                    </div>
                    <p
                      className="text-sm font-bold"
                      style={{ color: color.accent }}
                    >
                      {facet.percent}%
                    </p>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-white">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${facet.percent}%`,
                        background: `linear-gradient(90deg, ${color.accent}, #06b6d4)`,
                      }}
                    />
                  </div>
                  <p className="mt-3 text-xs font-medium text-slate-500">
                    {facet.preferredPole} · {facet.strengthLabel}
                  </p>
                </article>
              ))}
            </div>
          </Panel>
        )}

        <Panel className="mb-8">
          <SectionTitle
            icon={<BookOpen size={20} />}
            color={color}
            title="Background Pattern"
          />
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600">
            {detail.background.introduction}
          </p>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <CardListBlock title="Natural temperament" items={detail.background.naturalTemperament} />
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <h4 className="font-bold text-slate-950">Nature and environment</h4>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {detail.background.familyEnvironment}
              </p>
            </div>
          </div>
          <CardGrid
            className="mt-5"
            cards={detail.background.childhoodRoles}
            color={color}
          />
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <DetailBlock title="Environments that may reinforce this type" items={detail.background.reinforcingEnvironment} />
            <DetailBlock title="Environments that may challenge this type" items={detail.background.challengingEnvironment} />
          </div>
          <CardGrid
            className="mt-5"
            cards={detail.background.developmentalPaths}
            color={color}
          />
          <CardGrid
            className="mt-5"
            cards={detail.background.natureVsEnvironment}
            color={color}
          />
        </Panel>

        <Panel className="mb-8">
          <SectionTitle
            icon={<Heart size={20} />}
            color={color}
            title="Life Expression"
          />
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <InfoCard icon={<Heart size={18} />} title="Relationship style" text={detail.life.relationships} color={color} />
            <InfoCard icon={<MessageCircle size={18} />} title="Communication style" text={detail.life.communication} color={color} />
            <InfoCard icon={<Users size={18} />} title="Friendship style" text={detail.life.friendship} color={color} />
            <InfoCard icon={<Briefcase size={18} />} title="Work style" text={detail.life.work} color={color} />
            <InfoCard icon={<GraduationCap size={18} />} title="Learning style" text={detail.life.learning} color={color} />
          </div>
          <CardGrid className="mt-5" cards={detail.life.stress} color={color} />
        </Panel>

        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <Panel>
            <SectionTitle
              icon={<Lightbulb size={20} />}
              color={color}
              title="Strengths"
            />
            <div className="mt-5 flex flex-wrap gap-2">
              {detail.growth.strengths.map((item) => (
                <Pill key={item} color={color}>
                  {item}
                </Pill>
              ))}
            </div>
          </Panel>

          <Panel>
            <SectionTitle
              icon={<ShieldAlert size={20} />}
              color={color}
              title="Potential Blind Spots"
            />
            <div className="mt-5 space-y-3">
              {detail.growth.blindSpots.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.25rem] border border-amber-100 bg-amber-50 p-4"
                >
                  <p className="font-semibold text-amber-900">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-amber-800">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </Panel>
        </section>

        <Panel className="mb-8">
          <SectionTitle
            icon={<TrendingUp size={20} />}
            color={color}
            title="Healthy vs Overextended"
          />
          <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-slate-200">
            {detail.growth.healthyVsOverextended.map((row, index) => (
              <div
                key={row.tendency}
                className={`grid gap-4 p-4 md:grid-cols-3 ${
                  index === 0 ? "" : "border-t border-slate-200"
                }`}
              >
                <p className="font-semibold text-slate-950">{row.tendency}</p>
                <p className="text-sm leading-6 text-emerald-700">
                  {row.healthy}
                </p>
                <p className="text-sm leading-6 text-amber-700">
                  {row.overextended}
                </p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="mb-8">
          <SectionTitle
            icon={<ArrowRight size={20} />}
            color={color}
            title="Growth Path"
          />
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[...detail.growth.growthPath, ...result.suggestedNextSteps].map(
              (item) => (
                <div key={item} className="flex gap-3 rounded-[1.25rem] bg-slate-50 p-4">
                  <ArrowRight
                    size={16}
                    className="mt-1 shrink-0"
                    style={{ color: color.accent }}
                  />
                  <span className="text-sm leading-6 text-slate-600">{item}</span>
                </div>
              ),
            )}
          </div>
        </Panel>

        <Panel>
          <SectionTitle
            icon={<Sparkles size={20} />}
            color={color}
            title="Misconceptions and Reminder"
          />
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {detail.growth.misconceptions.map((item) => (
              <p key={item} className="rounded-[1.25rem] bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                {item}
              </p>
            ))}
          </div>
          <p
            className="mt-5 rounded-[1.5rem] border p-5 text-sm font-semibold leading-7"
            style={{
              borderColor: color.border,
              backgroundColor: color.soft,
              color: color.accent,
            }}
          >
            Your type is a map, not your biography. Use this result to notice
            patterns, not to limit what you can become.
          </p>
        </Panel>

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
            href="/types"
            className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold text-white shadow-md transition"
            style={{
              background: `linear-gradient(90deg, ${color.accent}, #06b6d4)`,
            }}
          >
            Explore all 16 types
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}

function Badge({
  color,
  icon,
  children,
}: {
  color: TrueSelfTypeColor;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold"
      style={{
        borderColor: color.border,
        backgroundColor: color.soft,
        color: color.accent,
      }}
    >
      {icon}
      {children}
    </span>
  );
}

function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-7 ${className}`}
    >
      {children}
    </section>
  );
}

function SectionTitle({
  icon,
  color,
  title,
}: {
  icon: React.ReactNode;
  color: TrueSelfTypeColor;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span style={{ color: color.accent }}>{icon}</span>
      <h3 className="text-xl font-bold text-slate-950">{title}</h3>
    </div>
  );
}

function Pill({
  color,
  children,
}: {
  color: TrueSelfTypeColor;
  children: React.ReactNode;
}) {
  return (
    <span
      className="rounded-full px-3 py-1 text-xs font-semibold capitalize"
      style={{ backgroundColor: color.soft, color: color.accent }}
    >
      {children}
    </span>
  );
}

function MetricBar({
  color,
  label,
  value,
  valueLabel,
  caption,
}: {
  color: TrueSelfTypeColor;
  label: string;
  value: number;
  valueLabel: string;
  caption: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-950">{label}</p>
          <p className="text-xs leading-5 text-slate-500">{caption}</p>
        </div>
        <p className="text-sm font-black" style={{ color: color.accent }}>
          {valueLabel}
        </p>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full"
          style={{
            width: `${Math.max(0, Math.min(100, value))}%`,
            background: `linear-gradient(90deg, ${color.accent}, #06b6d4)`,
          }}
        />
      </div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  text,
  color,
}: {
  label: string;
  value: string;
  text: string;
  color: TrueSelfTypeColor;
}) {
  return (
    <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-black" style={{ color: color.accent }}>
        {value}
      </p>
      <p className="mt-1 text-xs capitalize text-slate-500">{text}</p>
    </div>
  );
}

function DetailBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
      <h4 className="font-bold text-slate-950">{title}</h4>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="text-sm leading-6 text-slate-600">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CardListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
      <h4 className="font-bold text-slate-950">{title}</h4>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item}
            className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
            <p className="text-sm leading-6 text-slate-600">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CardGrid({
  cards,
  color,
  className = "",
}: {
  cards: Array<{ title: string; text: string }>;
  color: TrueSelfTypeColor;
  className?: string;
}) {
  return (
    <div className={`grid gap-4 md:grid-cols-3 ${className}`}>
      {cards.map((card) => (
        <article
          key={card.title}
          className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5"
        >
          <p className="font-bold text-slate-950">{card.title}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{card.text}</p>
          <div
            className="mt-4 h-1 w-12 rounded-full"
            style={{ backgroundColor: color.accent }}
          />
        </article>
      ))}
    </div>
  );
}

function InfoCard({
  icon,
  title,
  text,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  color: TrueSelfTypeColor;
}) {
  return (
    <article className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-center gap-2">
        <span style={{ color: color.accent }}>{icon}</span>
        <h4 className="font-bold text-slate-950">{title}</h4>
      </div>
      <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
    </article>
  );
}
