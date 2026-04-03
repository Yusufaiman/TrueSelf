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
    test_1: "Identity Profile",
    test_2: "Personality Type",
    test_3: "Life Drivers",
    test_4: "Strengths & Weaknesses",
  };

  const testBadgeColors: Record<string, string> = {
    test_1: "bg-blue-100 text-blue-800",
    test_2: "bg-purple-100 text-purple-800",
    test_3: "bg-amber-100 text-amber-800",
    test_4: "bg-red-100 text-red-800",
  };

  const testRoutes: Record<string, string> = {
    test_1: "/tests/identity/who-you-really-are",
    test_2: "/tests/identity/personality-type",
    test_3: "/tests/identity/what-drives-you",
    test_4: "/tests/identity/strengths-weaknesses",
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
        <p className="text-slate-600">
          All your test results in one place
        </p>
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
            <div
              key={result.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-all duration-200 flex items-center justify-between"
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

              <Link
                href={testRoutes[result.test_type] || "/tests"}
                className="p-3 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                title="View result"
              >
                <ExternalLink size={20} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
