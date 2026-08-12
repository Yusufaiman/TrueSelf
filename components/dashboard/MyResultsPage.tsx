"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getUserResults } from "@/utils/supabase/client-results";
import { Calendar, ExternalLink } from "lucide-react";

interface TestResult {
  id: string;
  test_type: string;
  created_at: string;
  result: any;
}

export function MyResultsPage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const testNames: Record<string, string> = {
    trueself_16_type: "TrueSelf 16 Types",
    identity_profile: "Identity Profile",
    relationship_profile: "Relationship Profile",
    career_profile: "Career Fit",
    mind_profile: "Mind Profile",
    motivation_profile: "Motivation Profile",
    growth_profile: "Growth Profile",
    stress_emotions_profile: "Stress & Emotions Profile",
    life_profile: "Life Profile",
    test_1: "Identity Profile",
    test_2: "Personality Type",
    test_3: "Life Drivers",
    test_4: "Strengths & Weaknesses",
  };

  const testBadgeColors: Record<string, string> = {
    trueself_16_type: "bg-blue-100 text-blue-800",
    identity_profile: "bg-indigo-100 text-indigo-800",
    relationship_profile: "bg-pink-100 text-pink-800",
    career_profile: "bg-violet-100 text-violet-800",
    mind_profile: "bg-cyan-100 text-cyan-800",
    motivation_profile: "bg-orange-100 text-orange-800",
    growth_profile: "bg-green-100 text-green-800",
    stress_emotions_profile: "bg-rose-100 text-rose-800",
    life_profile: "bg-teal-100 text-teal-800",
    test_1: "bg-blue-100 text-blue-800",
    test_2: "bg-purple-100 text-purple-800",
    test_3: "bg-amber-100 text-amber-800",
    test_4: "bg-red-100 text-red-800",
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        console.log("Fetching results for MyResultsPage...");
        const allResults = await getUserResults();
        console.log("Fetched:", allResults.length, "results");
        setResults(allResults);
      } catch (err) {
        console.error("Error fetching results:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getResultTitle = (testType: string, result: any): string => {
    if (result.typeCode && result.typeName) {
      return `${result.typeCode} - ${result.typeName}`;
    }
    if (result.title) return result.title;
    if (result.pattern) return result.pattern;
    if (result.primaryType) return result.primaryType;
    if (result.label) return result.label;
    return "Result";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">My Results</h1>
        <p className="text-slate-600">All your test results in one place</p>
      </div>

      {results.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
          <p className="text-slate-600 mb-6">
            You haven't taken any tests yet.
          </p>
          <Link
            href="/tests"
            className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
          >
            Start Testing
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((result) => (
            <Link
              key={result.id}
              href={`/dashboard/results/${result.id}`}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      testBadgeColors[result.test_type] ||
                      "bg-slate-100 text-slate-800"
                    }`}
                  >
                    {testNames[result.test_type] || result.test_type}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {getResultTitle(result.test_type, result.result)}
                </h3>
                <div className="flex items-center gap-2 text-slate-500 text-sm mt-2">
                  <Calendar size={16} />
                  <span>{formatDate(result.created_at)}</span>
                </div>
              </div>

              <span
                className="rounded-full bg-blue-50 p-3 text-blue-600 transition-colors"
                title="View result"
              >
                <ExternalLink size={20} />
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
