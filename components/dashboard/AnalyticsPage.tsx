"use client";

import { TrendingUp } from "lucide-react";
import { useGlobalProfile } from "@/hooks/useGlobalProfile";
import { useUser } from "@/hooks/useUser";
import { GlobalSpiderChartExpanded } from "./GlobalSpiderChartExpanded";
import { CategoryBreakdownAnalytics } from "./CategoryBreakdownAnalytics";
import { ContradictionDetector } from "./ContradictionDetector";
import { BehaviorProfile } from "./BehaviorProfile";
import { GlobalBlindSpots } from "./GlobalBlindSpots";

/**
 * Analytics page - Deep dive into global profile
 */
export function AnalyticsPage() {
  const { user } = useUser();
  const { profile, loading } = useGlobalProfile(user?.id);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Analytics</h1>
          <p className="text-slate-600">
            Deep insights from your psychological profile
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-16 flex flex-col items-center justify-center">
          <TrendingUp className="w-12 h-12 text-slate-400 mb-4" />
          <p className="text-lg text-slate-700 font-medium mb-2">
            No analytics yet
          </p>
          <p className="text-slate-500 text-center mb-8 max-w-sm">
            Take more tests to unlock detailed analytics and deeper insights
            about your patterns
          </p>
          <a
            href="/tests"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
          >
            Take More Tests
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Analytics</h1>
        <p className="text-slate-600">
          Deep insights from your unified psychological profile
        </p>
      </div>

      {/* Global Spider Chart */}
      <GlobalSpiderChartExpanded profile={profile} />

      {/* Category Breakdown */}
      <CategoryBreakdownAnalytics profile={profile} />

      {/* Behavior Profile */}
      <BehaviorProfile profile={profile} />

      {/* Contradictions */}
      <div>
        <h3 className="text-2xl font-semibold text-slate-900 mb-4">
          Internal Patterns
        </h3>
        <ContradictionDetector profile={profile} />
      </div>

      {/* Blind Spots */}
      {profile.insights.blindSpots.length > 0 && (
        <GlobalBlindSpots profile={profile} />
      )}
    </div>
  );
}
