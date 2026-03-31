"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const tests = [
  {
    id: 1,
    title: "Your Emotional Pattern",
    description:
      "Understand how your emotions show up and affect your daily life.",
    duration: "6–8 min",
    questions: "12 questions",
    href: "/tests/emotional-health/emotional-pattern",
    pills: ["Emotional Types", "Response Pattern"],
  },
  {
    id: 2,
    title: "How You Handle Stress",
    description:
      "See how you react under pressure and what affects your stress levels.",
    duration: "5–8 min",
    questions: "11 questions",
    href: "/tests/emotional-health/handle-stress",
    pills: ["Stress Response", "Coping Style"],
  },
  {
    id: 3,
    title: "Your Emotional Awareness",
    description: "Learn how aware you are of your own emotions and reactions.",
    duration: "7–9 min",
    questions: "13 questions",
    href: "/tests/emotional-health/emotional-awareness",
    pills: ["Emotional Awareness", "Self Regulation"],
  },
  {
    id: 4,
    title: "Your Emotional Triggers",
    description: "Identify what causes strong emotional reactions and why.",
    duration: "6–8 min",
    questions: "12 questions",
    href: "/tests/emotional-health/emotional-triggers",
    pills: ["Trigger Patterns", "Sensitivity Map"],
  },
  {
    id: 5,
    title: "Why You Feel Drained",
    description: "Understand what is quietly draining your energy day to day.",
    duration: "5–7 min",
    questions: "10 questions",
    href: "/tests/emotional-health/feel-drained",
    pills: ["Energy Drain", "Emotional Load"],
  },
];

export default function EmotionalHealthTestsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-red-100 via-pink-50 to-white py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-4">
            <span className="text-sm font-semibold text-red-600 uppercase tracking-wider">
              Emotional Health Tests
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Understand Your Emotional Patterns
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Explore your emotional world, understand what triggers you, and
            discover what truly supports your wellbeing and inner peace.
          </p>
        </div>
      </section>

      {/* Test Cards Section */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tests.map((test) => (
              <Link key={test.id} href={test.href}>
                <div className="group bg-white rounded-xl border border-slate-200 p-8 h-full flex flex-col transition-all duration-300 hover:border-red-300 hover:shadow-lg hover:shadow-red-500/10 cursor-pointer">
                  {/* Content */}
                  <div className="flex-1">
                    {/* Label */}
                    <div className="mb-3">
                      <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">
                        Test {test.id}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-red-600 transition-colors">
                      {test.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {test.description}
                    </p>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-6">
                    <span>⏱ {test.duration}</span>
                    <span>•</span>
                    <span>{test.questions}</span>
                  </div>

                  {/* Pills */}
                  {test.pills && test.pills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {test.pills.map((pill, idx) => (
                        <span
                          key={idx}
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            idx === 0
                              ? "bg-red-100 text-red-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA Button */}
                  <button className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2">
                    Start Test
                    <ArrowRight size={16} />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-red-500 to-pink-500 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start understanding your emotions
          </h2>
          <p className="text-red-100 text-lg mb-8">
            Choose any test above to explore your emotional patterns and
            wellbeing.
          </p>
        </div>
      </section>
    </div>
  );
}
