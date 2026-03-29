"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";

export default function TestPage() {
  const params = useParams();
  const category = params?.category as string;
  const slug = params?.slug as string;

  // Format category name for display
  const categoryName = category
    ? category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Test";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-6 py-20">
      <div className="max-w-md text-center">
        <div className="mb-6">
          <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
            Test Coming Soon
          </span>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          This Assessment is Being Prepared
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          We're carefully crafting this psychological assessment to provide you
          with meaningful insights. Check back soon!
        </p>
        <div className="space-y-3">
          <Link href={`/tests/${category}`} className="block">
            <button className="w-full py-3 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg">
              <ArrowLeft size={18} />
              Back to {categoryName} Tests
            </button>
          </Link>
          <Link href="/" className="block">
            <button className="w-full py-3 px-4 rounded-lg border border-slate-200 hover:border-slate-400 text-slate-700 font-medium transition-all duration-300 hover:shadow-md">
              Return to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
