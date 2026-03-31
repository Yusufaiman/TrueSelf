"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const tests = [
  {
    id: 1,
    title: "Your Life Patterns",
    description:
      "Discover the recurring patterns that show up repeatedly in your life and relationships.",
    duration: "6–8 min",
    questions: "12 questions",
    href: "/tests/life-patterns/life-patterns",
    pills: ["Life Patterns", "Behavior Cycles"],
  },
  {
    id: 2,
    title: "What Cycles You Through Life",
    description:
      "Understand the natural cycles and seasons you go through and how to work with them.",
    duration: "7–9 min",
    questions: "14 questions",
    href: "/tests/life-patterns/life-cycles",
    pills: ["Cycle Types", "Life Phases"],
  },
  {
    id: 3,
    title: "Your Behavioral Loops",
    description:
      "Identify the behaviors and habits that repeat and either help or hinder your progress.",
    duration: "6–8 min",
    questions: "13 questions",
    href: "/tests/life-patterns/behavioral-loops",
    pills: ["Habit Loops", "Repetition Pattern"],
  },
  {
    id: 4,
    title: "Are You Stuck in a Pattern",
    description:
      "Discover if you're repeating the same patterns and how to break free from them.",
    duration: "7–9 min",
    questions: "15 questions",
    href: "/tests/life-patterns/stuck-pattern",
    pills: ["Stuck Patterns", "Loop Detection"],
  },
];

export default function LifePatternsTestsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-amber-100 via-yellow-50 to-white py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-4">
            <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">
              Life Patterns Tests
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Understand Your Life Patterns
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Discover the repeating patterns, cycles, and behaviors that shape
            your life.
          </p>
        </div>
      </section>

      {/* Test Cards Section */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tests.map((test) => (
              <Link key={test.id} href={test.href}>
                <div className="group bg-white rounded-xl border border-slate-200 p-8 h-full flex flex-col transition-all duration-300 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-500/10 cursor-pointer">
                  {/* Content */}
                  <div className="flex-1">
                    {/* Label */}
                    <div className="mb-3">
                      <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                        Test {test.id}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
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
                              ? "bg-amber-100 text-amber-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA Button */}
                  <button className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2">
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
      <section className="bg-gradient-to-r from-amber-500 to-yellow-500 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to understand your patterns?
          </h2>
          <p className="text-amber-100 text-lg mb-8">
            Choose any test above to explore the patterns, cycles, and behaviors
            that shape your life.
          </p>
        </div>
      </section>
    </div>
  );
}
