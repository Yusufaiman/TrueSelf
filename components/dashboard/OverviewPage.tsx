"use client";

import React, { useState, useEffect } from "react";
import {
  getLatestResults,
  getUserResults,
} from "@/utils/supabase/client-results";
import { getClientUser } from "@/utils/supabase/client-auth";
import { TrendingUp, Calendar, Zap, Target } from "lucide-react";

interface TestResult {
  id: string;
  test_type: string;
  created_at: string;
  result: any;
}

export function OverviewPage() {
  const [user, setUser] = useState<any>(null);
  const [latestResults, setLatestResults] = useState<
    Record<string, TestResult>
  >({});
  const [allResults, setAllResults] = useState<TestResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const testNames: Record<string, string> = {
    test_1: "Identity Profile",
    test_2: "Personality Type",
    test_3: "Life Drivers",
    test_4: "Strengths & Weaknesses",
  };

  const testColors: Record<string, string> = {
    test_1: "bg-blue-50 border-blue-200",
    test_2: "bg-purple-50 border-purple-200",
    test_3: "bg-amber-50 border-amber-200",
    test_4: "bg-red-50 border-red-200",
  };

  const testIcons: Record<string, any> = {
    test_1: <Target size={24} className="text-blue-600" />,
    test_2: <TrendingUp size={24} className="text-purple-600" />,
    test_3: <Zap size={24} className="text-amber-600" />,
    test_4: <TrendingUp size={24} className="text-red-600" />,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = await getClientUser();
        if (!currentUser) {
          console.log("User not authenticated, skipping data fetch");
          setIsLoading(false);
          return;
        }
        setUser(currentUser);

        console.log("User authenticated, fetching results...");
        const latest = await getLatestResults();
        const allRes = await getUserResults();

        console.log(
          "Data fetched - latest:",
          Object.keys(latest).length,
          "all:",
          allRes.length,
        );
        setLatestResults(latest);
        setAllResults(allRes);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getResultTitle = (testType: string, result: any): string => {
    if (result.title) return result.title;
    if (result.pattern) return result.pattern;
    if (result.primaryType) return result.primaryType;
    if (result.label) return result.label;
    return testNames[testType] || "Test Result";
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-slate-900 mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-base text-slate-500">
          Here's what you've discovered about yourself
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Tests Taken */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-slate-600 text-sm font-medium">
                Total Tests Taken
              </p>
              <p className="text-3xl font-bold text-slate-900 mt-2">
                {allResults.length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <TrendingUp size={24} className="text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-slate-500">
            You've completed {allResults.length} test
            {allResults.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Last Test Taken */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-slate-600 text-sm font-medium">Last Test</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">
                {allResults.length > 0
                  ? formatDate(allResults[0].created_at)
                  : "—"}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <Calendar size={24} className="text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-slate-500">
            {allResults.length > 0
              ? "Keep exploring yourself"
              : "Time to take your first test"}
          </p>
        </div>

        {/* Most Frequent Pattern */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-slate-600 text-sm font-medium">Top Pattern</p>
              <p className="text-2xl font-bold text-slate-900 mt-2 truncate">
                {Object.values(latestResults).length > 0
                  ? getResultTitle(
                      Object.keys(latestResults)[0],
                      Object.values(latestResults)[0].result,
                    )
                  : "—"}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
              <Zap size={24} className="text-amber-600" />
            </div>
          </div>
          <p className="text-xs text-slate-500">From your latest results</p>
        </div>
      </div>

      {/* Latest Results Cards */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">
          Your Latest Results
        </h2>

        {Object.keys(testNames).length === 0 ||
        Object.keys(latestResults).length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-16 flex flex-col items-center justify-center">
            <div className="text-5xl mb-4">🧠</div>
            <p className="text-lg text-slate-700 font-medium mb-2">
              No insights yet
            </p>
            <p className="text-slate-500 text-center mb-8 max-w-sm">
              Start your first test to unlock your personalized profile and
              discover insights about yourself.
            </p>
            <a
              href="/tests"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            >
              Start Testing
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(testNames).map(([testType, testName]) => {
              const result = latestResults[testType];
              const resultTitle = result
                ? getResultTitle(testType, result.result)
                : null;

              return (
                <div
                  key={testType}
                  className={`border-2 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 ${
                    testColors[testType] || "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {testName}
                      </h3>
                      {resultTitle && (
                        <p className="text-sm text-slate-600 mt-2">
                          {resultTitle}
                        </p>
                      )}
                    </div>
                    {testIcons[testType]}
                  </div>

                  {result && (
                    <div className="flex items-center justify-between pt-4 border-t border-current border-opacity-10">
                      <span className="text-xs font-medium text-slate-500">
                        {formatDate(result.created_at)}
                      </span>
                      <a
                        href={`/tests/${testType}`}
                        className="text-sm font-semibold text-blue-600 hover:underline"
                      >
                        View Details →
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
