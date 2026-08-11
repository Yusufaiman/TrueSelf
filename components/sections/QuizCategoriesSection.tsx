"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  getColorClasses,
  getIcon,
  TEST_CATEGORIES,
} from "@/config/testCategories";

export const QuizCategoriesSection: React.FC = () => {
  return (
    <section id="quizzes" className="w-full bg-white px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
            Test Categories
          </h2>
          <p className="text-base text-gray-600 md:text-lg">
            Build one connected profile through personality, identity,
            relationships, career, mind, motivation, growth, stress, and life.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TEST_CATEGORIES.map((category) => {
            const IconComponent = getIcon(category.icon);
            const colorClasses = getColorClasses(category.color);

            return (
              <Link
                key={category.id}
                href={category.href}
                className="group block h-full"
              >
                <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${colorClasses.bg} ${colorClasses.text} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <IconComponent size={24} />
                  </div>

                  <div className="flex-grow">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {category.name}
                      </h3>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${colorClasses.bg} ${colorClasses.text}`}
                      >
                        {category.journeyStage}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {category.description}
                    </p>
                  </div>

                  <div
                    className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${colorClasses.text}`}
                  >
                    Explore
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
