"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const tests = [
  {
    id: 1,
    title: "How Others See You",
    description:
      "Get honest insights into how people actually perceive you versus how you think you come across.",
    duration: "5–7 min",
    questions: "10 questions",
    href: "/tests/reality-check/how-others-see-you",
    pills: ["Perception Types", "External View"],
  },
  {
    id: 2,
    title: "Your Self-Perception Gap",
    description:
      "Discover the difference between how you see yourself and how the world actually perceives you.",
    duration: "6–8 min",
    questions: "12 questions",
    href: "/tests/reality-check/perception-gap",
    pills: ["Reality Gap", "Self vs Reality"],
  },
  {
    id: 3,
    title: "Your Impact on Others",
    description:
      "Understand the real impact you have on those around you and your influence on others.",
    duration: "7–9 min",
    questions: "14 questions",
    href: "/tests/reality-check/impact-on-others",
    pills: ["Social Impact", "Behavior Effect"],
  },
  {
    id: 4,
    title: "Reality vs. Your Story",
    description:
      "Test whether your internal narrative matches reality and what might be holding you back.",
    duration: "6–8 min",
    questions: "13 questions",
    href: "/tests/reality-check/reality-vs-story",
    pills: ["Narrative Bias", "Reality Alignment"],
  },
];

export default function RealityCheckTestsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-100 via-zinc-50 to-white py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-4">
            <span className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
              Reality Check Tests
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Get Your Reality Check
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Discover how others perceive you and where your self-perception
            might be different from reality.
          </p>
        </div>
      </section>

      {/* Test Cards Section */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tests.map((test) => (
              <Link key={test.id} href={test.href}>
                <div className="group bg-white rounded-xl border border-slate-200 p-8 h-full flex flex-col transition-all duration-300 hover:border-slate-400 hover:shadow-lg hover:shadow-slate-500/10 cursor-pointer">
                  {/* Content */}
                  <div className="flex-1">
                    {/* Label */}
                    <div className="mb-3">
                      <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Test {test.id}
                      </span>
                    </div>
                    {/* Title */}
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors">
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
                              ? "bg-slate-200 text-slate-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA Button */}
                  <button className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-slate-500 to-zinc-500 hover:from-slate-600 hover:to-zinc-600 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2">
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
      <section className="bg-gradient-to-r from-slate-500 to-zinc-500 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready for your reality check?
          </h2>
          <p className="text-slate-100 text-lg mb-8">
            Choose any test above to discover how you\'re truly perceived and
            where reality differs from your perception.
          </p>
        </div>
      </section>
    </div>
  );
}
