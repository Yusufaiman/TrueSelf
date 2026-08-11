"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  TestCategory,
  getColorClasses,
  getIcon,
} from "@/config/testCategories";

interface CategoryCardProps {
  category: TestCategory;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const colorClasses = getColorClasses(category.color);
  const IconComponent = getIcon(category.icon);

  return (
    <Link href={category.href}>
      <div className="flex h-full cursor-pointer flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg">
        <div className="mb-5 flex items-center justify-between gap-3">
          <span
            className={`flex h-11 w-11 items-center justify-center rounded-full ${colorClasses.bg} ${colorClasses.text}`}
          >
            <IconComponent size={22} />
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${colorClasses.bg} ${colorClasses.text}`}
          >
            {category.journeyStage}
          </span>
        </div>

        <p className={`text-3xl font-black tracking-tight ${colorClasses.text}`}>
          {category.name}
        </p>
        <h3 className="mt-3 text-xl font-bold text-slate-900">
          {category.testName}
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {category.description}
        </p>

        <div className="mt-5 border-t border-slate-100 pt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            This test discovers
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {category.discover}
          </p>
        </div>

        <div
          className={`mt-5 inline-flex items-center gap-2 font-semibold ${colorClasses.text} transition-all duration-200 hover:gap-3`}
        >
          Start Test
          <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
}
