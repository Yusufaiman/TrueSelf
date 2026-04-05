"use client";

import { CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";
import { GlobalProfile } from "@/lib/psychology/dimensions";
import { Card } from "@/components/ui/Card";

interface WhatsReallyGoingOnProps {
  profile: GlobalProfile;
}

/**
 * Multi-dimensional insight section
 * Combines multiple dimensions to create human, actionable summary
 */
export function WhatsReallyGoingOn({ profile }: WhatsReallyGoingOnProps) {
  if (!profile.insights.summary) {
    return null;
  }

  return (
    <Card className="border border-gray-100 bg-gradient-to-br from-slate-50 to-gray-50 p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          What's really going on
        </h3>

        {/* Dynamic summary */}
        <p className="text-base text-gray-700 leading-relaxed">
          {profile.insights.summary}
        </p>

        {/* Key insights boxes */}
        {(profile.insights.strengths.length > 0 ||
          profile.insights.weaknesses.length > 0 ||
          profile.insights.blindSpots.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-200">
            {/* Strengths */}
            {profile.insights.strengths.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <h4 className="text-sm font-semibold text-green-700">
                    Strengths
                  </h4>
                </div>
                <p className="text-sm text-gray-600">
                  {profile.insights.strengths[0]}
                </p>
              </div>
            )}

            {/* Weaknesses */}
            {profile.insights.weaknesses.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <h4 className="text-sm font-semibold text-amber-700">
                    Challenges
                  </h4>
                </div>
                <p className="text-sm text-gray-600">
                  {profile.insights.weaknesses[0]}
                </p>
              </div>
            )}

            {/* Blind Spots */}
            {profile.insights.blindSpots.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-red-600" />
                  <h4 className="text-sm font-semibold text-red-700">
                    Blind Spots
                  </h4>
                </div>
                <p className="text-sm text-gray-600">
                  {profile.insights.blindSpots[0]}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
