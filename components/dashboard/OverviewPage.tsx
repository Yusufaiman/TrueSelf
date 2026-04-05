"use client";

import { Sparkles, Brain } from "lucide-react";
import { useGlobalProfile } from "@/hooks/useGlobalProfile";
import { useUser } from "@/hooks/useUser";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { OverviewCards } from "./OverviewCards";
import { GlobalSelfMap } from "./GlobalSelfMap";
import { WhatsReallyGoingOn } from "./WhatsReallyGoingOn";
import { DimensionBreakdown } from "./DimensionBreakdown";
import { RecommendedTests } from "./RecommendedTests";

/**
 * Main dashboard overview page
 * Displays unified psychological profile across all tests
 */
export function OverviewPage() {
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
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold text-slate-900">Welcome!</h1>
            <Sparkles className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-base text-slate-500">
            Start your first test to unlock your psychological profile
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-16 flex flex-col items-center justify-center">
          <Brain className="w-12 h-12 text-slate-400 mb-4" />
          <p className="text-lg text-slate-700 font-medium mb-2">
            No profile yet
          </p>
          <p className="text-slate-500 text-center mb-8 max-w-sm">
            Take your first test to unlock your personalized psychological
            profile and discover unified insights about yourself.
          </p>
          <a
            href="/tests"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
          >
            Start Testing
          </a>
        </div>
      </div>
    );
  }

  // Get last activity date from test contributions
  const lastTestDate = profile.lastUpdated;

  // Get dominant pattern (highest dimension)
  const dominantDimension = Object.entries(profile.dimensions).sort(
    (a, b) => b[1] - a[1],
  )[0];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold text-slate-900">
            Welcome back!
          </h1>
          <Sparkles className="w-8 h-8 text-blue-500" />
        </div>
        <p className="text-base text-slate-500">
          Here's your unified psychological profile across all tests
        </p>
      </div>

      {/* Overview Cards */}
      <OverviewCards
        totalTests={Object.keys(profile.testContributions).length}
        lastActivityDate={lastTestDate}
        dominantPattern={dominantDimension[0]
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase())}
        consistencyScore={profile.consistencyScore}
      />

      {/* Global Self Map */}
      <GlobalSelfMap profile={profile} />

      {/* What's Really Going On */}
      <WhatsReallyGoingOn profile={profile} />

      {/* Dimension Breakdown */}
      <DimensionBreakdown profile={profile} />

      {/* Recommended Tests */}
      <RecommendedTests dimensions={profile.dimensions} />
    </div>
  );
}
