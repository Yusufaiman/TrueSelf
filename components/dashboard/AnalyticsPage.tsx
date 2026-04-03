"use client";

import React, { useState, useEffect } from "react";
import { getUserResults } from "@/utils/supabase/client-results";
import { BarChart3, TrendingUp } from "lucide-react";

interface TestResult {
  id: string;
  test_type: string;
  created_at: string;
  result: any;
  scores?: Record<string, number>;
}

export function AnalyticsPage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const testNames: Record<string, string> = {
    test_1: "Identity Profile",
    test_2: "Personality Type",
    test_3: "Life Drivers",
    test_4: "Strengths & Weaknesses",
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        console.log("Fetching results for Analytics...");
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

  const getTestFrequency = () => {
    const frequency: Record<string, number> = {};
    results.forEach((result) => {
      frequency[result.test_type] = (frequency[result.test_type] || 0) + 1;
    });
    return frequency;
  };

  const getAverageScores = () => {
    if (results.length === 0) return {};
    // This is a simplified version - in production you'd aggregate scores properly
    return {};
  };

  const frequency = getTestFrequency();

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
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Analytics</h1>
        <p className="text-slate-600">Insights from your test performance</p>
      </div>

      {/* Test Frequency */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 size={24} className="text-blue-600" />
          <h2 className="text-2xl font-bold text-slate-900">Test Frequency</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(testNames).map(([testType, testName]) => (
            <div
              key={testType}
              className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center"
            >
              <div className="text-2xl font-bold text-blue-600">
                {frequency[testType] || 0}
              </div>
              <div className="text-sm text-slate-600 mt-2">{testName}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp size={24} className="text-green-600" />
            <h3 className="text-lg font-bold text-slate-900">Most Attempted</h3>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {Object.entries(frequency).length > 0
              ? testNames[
                  Object.entries(frequency).sort(
                    ([, a], [, b]) => b - a,
                  )[0]?.[0] || "test_1"
                ]
              : "—"}
          </p>
          <p className="text-sm text-slate-600 mt-2">
            You've engaged most with this test category
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp size={24} className="text-purple-600" />
            <h3 className="text-lg font-bold text-slate-900">
              Total Engagement
            </h3>
          </div>
          <p className="text-2xl font-bold text-slate-900">{results.length}</p>
          <p className="text-sm text-slate-600 mt-2">
            Total number of tests completed
          </p>
        </div>
      </div>

      {/* Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <p className="text-slate-700">
          💡 <strong>Tip:</strong> Keep taking tests to unlock more detailed
          analytics and insights about your patterns!
        </p>
      </div>
    </div>
  );
}
