"use client";

import React, { useEffect } from "react";
import { TEST_CATEGORIES } from "@/config/testCategories";
import { CategoryCard } from "@/components/sections/CategoryCard";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function TestsPage() {
  useEffect(() => {
    document.documentElement.classList.add("tests-scrollbar-hidden");
    document.body.classList.add("tests-scrollbar-hidden");

    return () => {
      document.documentElement.classList.remove("tests-scrollbar-hidden");
      document.body.classList.remove("tests-scrollbar-hidden");
    };
  }, []);

  return (
    <div className="tests-page-root min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-gradient-to-b from-blue-50 via-cyan-50/50 to-white px-6 py-20 text-center md:py-24">
        <div className="mx-auto max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
            <Sparkles size={16} />
            9 Connected TrueSelf Tests
          </span>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            Explore all TrueSelf assessments
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Each domain is one focused assessment. Complete personality,
            identity, relationships, career, mind, motivation, growth, stress,
            and life to build one connected TrueSelf profile.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEST_CATEGORIES.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-t border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 p-1">
            <div className="rounded-xl bg-white p-12 md:p-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Start with the master assessment
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                The Personality test is still the foundation, but each card
                above now represents one complete assessment.
              </p>
              <Link
                href="/assessment/trueself-16-type"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-md transition hover:from-blue-600 hover:to-cyan-600"
              >
                Take TrueSelf 16-Type
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
