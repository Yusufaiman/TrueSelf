"use client";

import React, { useState, useEffect } from "react";
import { getUserResults } from "@/utils/supabase/client-results";
import { TrendingUp, Calendar } from "lucide-react";

interface TestResult {
  id: string;
  test_type: string;
  created_at: string;
  result: any;
}

export function ProgressPage() {
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
        console.log("Fetching results for Progress...");
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
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getResultsByTestType = () => {
    const grouped: Record<string, TestResult[]> = {};
    results.forEach((result) => {
      if (!grouped[result.test_type]) {
        grouped[result.test_type] = [];
      }
      grouped[result.test_type].push(result);
    });
    return grouped;
  };

  const resultsByType = getResultsByTestType();

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
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Progress</h1>
        <p className="text-slate-600">
          Track your evolution and improvements over time
        </p>
      </div>

      {results.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
          <p className="text-slate-600">
            No test results yet. Take a test to begin tracking your progress!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(resultsByType).map(([testType, testResults]) => (
            <div
              key={testType}
              className="bg-white border border-slate-200 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp size={24} className="text-blue-600" />
                <h2 className="text-xl font-bold text-slate-900">
                  {testNames[testType] || testType}
                </h2>
              </div>

              <div className="space-y-3">
                <p className="text-slate-600">
                  Completed <strong>{testResults.length}</strong> time
                  {testResults.length !== 1 ? "s" : ""}
                </p>

                {/* Timeline of attempts */}
                <div className="mt-4 space-y-2">
                  {testResults.map((result, index) => (
                    <div
                      key={result.id}
                      className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg"
                    >
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                        {testResults.length - index}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-slate-500" />
                          <span className="text-sm text-slate-600">
                            {formatDate(result.created_at)}
                          </span>
                        </div>
                        {result.result?.title && (
                          <p className="text-sm font-medium text-slate-900 mt-1">
                            {result.result.title}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6">
        <h3 className="font-bold text-slate-900 mb-3">💡 Growth Tips</h3>
        <ul className="space-y-2 text-slate-700 text-sm">
          <li>• Retake tests periodically to track how you evolve</li>
          <li>• Notice patterns in your results over time</li>
          <li>• Use insights to guide personal development</li>
          <li>• Share progress with mentors or coaches</li>
        </ul>
      </div>
    </div>
  );
}
