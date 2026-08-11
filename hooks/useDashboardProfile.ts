"use client";

import { useEffect, useState } from "react";
import { getUserResults, type TestResult } from "@/utils/supabase/client-results";
import {
  buildDashboardProfileSummary,
  type DashboardProfileSummary,
} from "@/lib/dashboard/profileSummary";

interface UseDashboardProfileReturn {
  summary: DashboardProfileSummary;
  loading: boolean;
  error: string | null;
  results: TestResult[];
}

const emptySummary = buildDashboardProfileSummary([]);

export function useDashboardProfile(): UseDashboardProfileReturn {
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadResults = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedResults = await getUserResults();
        setResults(fetchedResults);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load dashboard data",
        );
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, []);

  return {
    summary: results.length
      ? buildDashboardProfileSummary(results)
      : emptySummary,
    loading,
    error,
    results,
  };
}
