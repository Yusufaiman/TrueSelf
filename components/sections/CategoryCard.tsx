"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TestCategory, getColorClasses, getIcon } from "@/config/testCategories";

interface CategoryCardProps {
  category: TestCategory;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const colorClasses = getColorClasses(category.color);
  const IconComponent = getIcon(category.icon);

  return (
    <Link href={category.href}>
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer h-full flex flex-col">
        {/* Gradient Header */}
        <div className={`bg-gradient-to-r ${category.colorClass} h-24 flex items-center justify-center`}>
          <IconComponent size={28} className="text-white" />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            {category.name}
          </h3>
          <p className="text-slate-600 text-sm mb-4 flex-1">
            {category.description}
          </p>

          {/* Featured Tests */}
          {category.tests.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-medium text-slate-500 mb-2">
                Popular tests:
              </p>
              <div className="space-y-1">
                {category.tests.slice(0, 3).map((test, idx) => (
                  <div
                    key={idx}
                    className="text-xs text-slate-600 flex items-center gap-2"
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${colorClasses.bg}`}></div>
                    {test}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Button */}
          <div className={`inline-flex items-center gap-2 font-semibold ${colorClasses.text} hover:gap-3 transition-all duration-200`}>
            Explore Category
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </Link>
  );
}
