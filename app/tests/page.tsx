"use client";

import React from "react";
import { TEST_CATEGORIES } from "@/config/testCategories";
import { CategoryCard } from "@/components/sections/CategoryCard";

export default function TestsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Explore All Tests
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Discover different aspects of yourself across identity, behavior, mindset, and life patterns. Each test takes just a few minutes and provides personalized insights.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEST_CATEGORIES.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-20 border-t border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-1">
            <div className="bg-white rounded-xl p-12 md:p-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Start Your Self-Discovery Journey
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Take any test above to unlock personalized insights about yourself. No sign-up required to get started.
              </p>
              <p className="text-sm text-slate-500">
                💡 Tip: Start with the Identity test if you're new to TrueSelf
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
