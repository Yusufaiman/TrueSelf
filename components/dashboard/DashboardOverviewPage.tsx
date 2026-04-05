"use client";

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
 */
export function DashboardOverviewPage() {
  const { user } = useUser();
  const { profile, loading } = useGlobalProfile(user?.id);

  if (!user) {
    return (
      <SectionWrapper>
        <div className="text-center py-12">
          <p className="text-gray-600">Please log in to view your dashboard</p>
        </div>
      </SectionWrapper>
    );
  }

  if (loading) {
    return (
      <SectionWrapper>
        <div className="text-center py-12">
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </SectionWrapper>
    );
  }

  if (!profile) {
    return (
      <SectionWrapper>
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No profile data yet</p>
          <p className="text-sm text-gray-500">
            Take your first test to build your profile
          </p>
        </div>
      </SectionWrapper>
    );
  }

  // Get last activity date from test contributions
  const lastTestDate = profile.lastUpdated;

  // Get dominant pattern (highest dimension)
  const dominantDimension = Object.entries(profile.dimensions).sort(
    (a, b) => b[1] - a[1],
  )[0];

  return (
    <SectionWrapper>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="animate-fade-in">
          <h2 className="text-3xl font-semibold text-gray-900">
            Welcome back! 👋
          </h2>
          <p className="text-gray-600 mt-2">
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
    </SectionWrapper>
  );
}
