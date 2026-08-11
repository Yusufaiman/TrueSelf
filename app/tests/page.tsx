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
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14 animate-fade-in">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
              <Sparkles size={16} />
              9 Connected TrueSelf Tests
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Explore All Tests
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Each category is now one complete test. No extra sub-sections, no
              scattered quizzes, just one focused assessment for each major part
              of your TrueSelf profile.
            </p>
          </div>

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
