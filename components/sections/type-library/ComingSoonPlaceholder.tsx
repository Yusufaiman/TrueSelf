"use client";

import React from "react";
import { Sparkles } from "lucide-react";

interface ComingSoonPlaceholderProps {
  categoryLabel: string;
}

export function ComingSoonPlaceholder({
  categoryLabel,
}: ComingSoonPlaceholderProps) {
  return (
    <div className="min-h-[500px] flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
            <Sparkles className="text-blue-600" size={32} />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          {categoryLabel} is Coming Soon
        </h2>

        <p className="text-slate-600 text-lg mb-8">
          We're still building this section to give you deeper insights into
          your {categoryLabel.toLowerCase()}.
        </p>

        <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
          <p className="text-sm text-blue-700">
            Check back soon for {categoryLabel} assessments and analysis.
          </p>
        </div>
      </div>
    </div>
  );
}
