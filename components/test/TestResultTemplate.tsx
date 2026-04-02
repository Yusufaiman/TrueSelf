"use client";

import React from "react";
import {
  BookOpen,
  Brain,
  Sparkles,
  AlertCircle,
  Heart,
  Compass,
  CheckCircle2,
  Target,
  Lock,
  Lightbulb,
  Wind,
  Eye,
} from "lucide-react";

function getIconByName(iconName?: string): React.ReactNode {
  switch (iconName) {
    case "Brain":
      return <Brain size={20} />;
    case "CheckCircle2":
      return <CheckCircle2 size={20} />;
    case "Sparkles":
      return <Sparkles size={20} />;
    case "BookOpen":
      return <BookOpen size={20} />;
    case "Heart":
      return <Heart size={20} />;
    case "Compass":
      return <Compass size={20} />;
    case "Target":
      return <Target size={20} />;
    case "Lock":
      return <Lock size={20} />;
    case "Lightbulb":
      return <Lightbulb size={20} />;
    case "Wind":
      return <Wind size={20} />;
    case "Eye":
      return <Eye size={20} />;
    default:
      return <BookOpen size={20} />;
  }
}

interface TraitBar {
  label: string;
  value: number;
  colorClass: string;
  colorText: string;
  lightBgClass: string;
  iconName?: string;
}

type SectionType = "normal" | "warning" | "highlight" | "dark";

interface Section {
  title: string;
  content: string | string[];
  type?: SectionType;
  icon?: React.ReactNode;
}

interface TestResultTemplateProps {
  badgeText?: string;
  preTitle?: string;
  title: string;
  subtitle?: string;
  description: string;
  traits: TraitBar[];
  sections?: Section[];
  strengths?: string[];
  secondaryMatch?: {
    name: string;
    description: string;
    matchScore?: number;
  };
  shadowMatch?: {
    name: string;
    description: string;
  };
  growthMatch?: {
    name: string;
    description: string;
  };
  onRetake: () => void;
}

export type { TestResultTemplateProps };

export default function TestResultTemplate({
  badgeText = "Profile",
  preTitle = "You are",
  title,
  subtitle,
  description,
  traits,
  sections = [],
  strengths = [],
  secondaryMatch,
  shadowMatch,
  growthMatch,
  onRetake,
}: TestResultTemplateProps) {
  const getSectionStyles = (type?: SectionType) => {
    switch (type) {
      case "warning":
        return {
          container: "bg-red-50 border border-red-100",
          title: "text-red-600",
        };
      case "highlight":
        return {
          container: "bg-blue-50 border border-blue-100",
          title: "text-blue-600",
        };
      case "dark":
        return {
          container: "bg-slate-100 border border-slate-300",
          title: "text-slate-900",
        };
      default:
        return {
          container: "bg-white border border-slate-200",
          title: "text-slate-900",
        };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Top Badge */}
        <div className="flex justify-center mb-6">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
            {badgeText}
          </span>
        </div>

        {/* Main Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            {preTitle}
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold mb-2 text-blue-600">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg md:text-xl text-slate-500 italic mb-4">
              "{subtitle}"
            </p>
          )}
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Traits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {traits.map((trait, idx) => {
            const percentage = Math.min(
              100,
              Math.max(0, Math.round(trait.value)),
            );

            return (
              <div
                key={idx}
                className={`${trait.lightBgClass} border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className={`w-8 h-8 rounded-md ${trait.lightBgClass} flex items-center justify-center`}
                    >
                      <div className={`${trait.colorText} w-4 h-4`}>
                        {getIconByName(trait.iconName)}
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-slate-900">
                      {trait.label}
                    </span>
                  </div>
                  <span
                    className={`${trait.lightBgClass} px-3 py-1 rounded-lg text-slate-900 font-bold text-lg`}
                  >
                    {percentage}%
                  </span>
                </div>

                <div className="w-full h-3 rounded-full bg-white border border-slate-200 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ease-out ${trait.colorClass}`}
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Sections */}
        {sections.map((section, idx) => {
          const styles = getSectionStyles(section.type);

          if (section.type === "normal" && !section.icon) {
            // Normal card with content
            return (
              <div
                key={idx}
                className={`${styles.container} rounded-2xl p-6 mb-8`}
              >
                <div className="flex items-center gap-2 mb-4">
                  {section.icon || (
                    <BookOpen size={20} className="text-blue-600" />
                  )}
                  <h3 className="text-lg font-semibold text-slate-900">
                    {section.title}
                  </h3>
                </div>
                {typeof section.content === "string" ? (
                  <p className="text-base text-slate-700 leading-relaxed">
                    {section.content}
                  </p>
                ) : (
                  <div className="space-y-3">
                    {section.content.map((item, i) => (
                      <div
                        key={i}
                        className="bg-white border border-slate-200 rounded-xl p-4 flex gap-3 items-start"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-slate-400 mt-0.5 shrink-0"
                        />
                        <p className="text-sm text-slate-700">{item}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          if (section.type === "warning") {
            // Red warning box
            return (
              <div
                key={idx}
                className={`${styles.container} rounded-xl p-4 mb-8 flex gap-3 items-start`}
              >
                <AlertCircle
                  size={16}
                  className="text-red-500 mt-0.5 shrink-0"
                />
                <p className="text-sm text-slate-700">{section.content}</p>
              </div>
            );
          }

          if (section.type === "highlight") {
            // Blue highlight box
            return (
              <div
                key={idx}
                className={`${styles.container} rounded-2xl p-6 mb-8`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Heart size={20} className="text-blue-600" />
                  <h3 className="text-lg font-semibold text-slate-900">
                    {section.title}
                  </h3>
                </div>
                {typeof section.content === "string" ? (
                  <p className="text-sm text-slate-700">{section.content}</p>
                ) : (
                  <div className="space-y-3">
                    {section.content.map((item, i) => (
                      <p key={i} className="text-sm text-slate-700">
                        • {item}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          if (section.type === "dark") {
            // Dark gray box
            return (
              <div
                key={idx}
                className={`${styles.container} rounded-2xl p-6 mb-8`}
              >
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  {section.title}
                </h3>
                {typeof section.content === "string" ? (
                  <p className="text-sm text-slate-700">{section.content}</p>
                ) : (
                  <p className="text-sm text-slate-700">
                    {section.content.join(". ")}.
                  </p>
                )}
              </div>
            );
          }

          return null;
        })}

        {/* Strengths Grid */}
        {strengths.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={20} className="text-emerald-500" />
              <h3 className="text-lg font-semibold text-slate-900">
                Your strengths
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {strengths.map((strength, idx) => (
                <div
                  key={idx}
                  className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 flex items-start gap-2"
                >
                  <CheckCircle2
                    size={16}
                    className="text-emerald-500 mt-0.5 shrink-0"
                  />
                  <p className="text-xs text-slate-700 font-medium">
                    {strength}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Secondary Match */}
        {secondaryMatch && (
          <div className="bg-slate-100 border border-slate-300 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              You also align with:{" "}
              <span className="text-blue-600">{secondaryMatch.name}</span>
            </h3>
            <p className="text-sm text-slate-700">
              {secondaryMatch.description}
            </p>
            {secondaryMatch.matchScore && (
              <p className="text-xs text-slate-600 mt-3">
                Match score: {secondaryMatch.matchScore}%
              </p>
            )}
          </div>
        )}

        {/* Shadow Match */}
        {shadowMatch && (
          <div className="bg-slate-100 border border-slate-300 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Your shadow type:{" "}
              <span className="text-blue-600">{shadowMatch.name}</span>
            </h3>
            <p className="text-sm text-slate-700">{shadowMatch.description}</p>
          </div>
        )}

        {/* Growth Match */}
        {growthMatch && (
          <div className="bg-slate-100 border border-slate-300 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Your growth path:{" "}
              <span className="text-blue-600">{growthMatch.name}</span>
            </h3>
            <p className="text-sm text-slate-700">{growthMatch.description}</p>
          </div>
        )}

        {/* CTA Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 text-center">
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Want to explore further?
          </h3>
          <p className="text-sm text-slate-600 mb-6">
            Take the test again to see how your results evolve
          </p>
          <button
            onClick={onRetake}
            className="px-8 py-3 rounded-lg bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
          >
            Retake Test
          </button>
        </div>
      </div>
    </div>
  );
}
