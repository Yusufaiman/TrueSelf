"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const tests = [
  {
    id: 1,
    title: "What Career Fits You",
    description:
      "Identify the career path that aligns with your strengths and how you naturally function.",
    duration: "6–9 min",
    questions: "12 questions",
    href: "/tests/career/career-fit",
  },
  {
    id: 2,
    title: "Your Work Style",
    description:
      "Understand how you prefer to work, whether independently or as part of a team.",
    duration: "5–7 min",
    questions: "10 questions",
    href: "/tests/career/work-style",
  },
  {
    id: 3,
    title: "Are You a Leader or Follower",
    description:
      "Discover your natural inclination to lead or support others in a work environment.",
    duration: "7–9 min",
    questions: "14 questions",
    href: "/tests/career/leader-follower",
  },
  {
    id: 4,
    title: "Why You Feel Lost in Your Career",
    description:
      "Understand the real reasons why you feel unclear or stuck about your career direction.",
    duration: "8–10 min",
    questions: "16 questions",
    href: "/tests/career/career-lost",
  },
  {
    id: 5,
    title: "Work Environments That Don't Suit You",
    description:
      "Identify workplace settings that may cause stress, burnout, or dissatisfaction.",
    duration: "6–8 min",
    questions: "13 questions",
    href: "/tests/career/wrong-environments",
  },
  {
    id: 6,
    title: "Jobs That Will Drain You",
    description:
      "Discover types of work that will exhaust your energy and aren't right for you.",
    duration: "7–9 min",
    questions: "15 questions",
    href: "/tests/career/draining-jobs",
  },
];

export default function CareerTestsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-indigo-100 via-blue-50 to-white py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-4">
            <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
              Career Tests
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Understand Your Career Direction
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Explore what career truly fits you, how you work best, and why you
            might feel stuck or drained in your current path.
          </p>
        </div>
      </section>

      {/* Test Cards Section */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tests.map((test) => (
              <Link key={test.id} href={test.href}>
                <div className="group bg-white rounded-xl border border-slate-200 p-8 h-full flex flex-col transition-all duration-300 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/10 cursor-pointer">
                  {/* Content */}
                  <div className="flex-1">
                    {/* Label */}
                    <div className="mb-3">
                      <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                        Test {test.id}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
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

                  {/* CTA Button */}
                  <button className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2">
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
      <section className="bg-gradient-to-r from-indigo-500 to-blue-500 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to find your career fit?
          </h2>
          <p className="text-indigo-100 text-lg mb-8">
            Choose any test above to explore your work style, strengths, and
            ideal career path.
          </p>
        </div>
      </section>
    </div>
  );
}
