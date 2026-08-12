"use client";

import React from "react";
import { TEST_CATEGORIES } from "@/config/testCategories";
import { CategoryCard } from "@/components/sections/CategoryCard";

export const QuizCategoriesSection: React.FC = () => {
  return (
    <section id="quizzes" className="w-full bg-white px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
            Nine assessments. One profile.
          </h2>
          <p className="text-base text-gray-600 md:text-lg">
            Each category measures a different part of your life, then feeds
            the same TrueSelf dashboard instead of becoming a separate quiz
            result.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TEST_CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};
