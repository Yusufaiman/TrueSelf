"use client";

import { GlobalProfile } from "@/lib/psychology/dimensions";
import { Card } from "@/components/ui/Card";

interface GlobalBlindSpotsProps {
  profile: GlobalProfile;
}

/**
 * Shows blind spots based on entire profile analysis
 */
export function GlobalBlindSpots({ profile }: GlobalBlindSpotsProps) {
  const blindSpots = profile.insights.blindSpots;

  if (blindSpots.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-2xl font-semibold text-gray-900">
          Blind Spots & Growth Areas
        </h3>
        <p className="text-gray-600 mt-2">
          Patterns that appear across all your tests
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {blindSpots.map((blindSpot, index) => (
          <Card key={index} className="border border-amber-200 bg-amber-50 p-5">
            <div className="flex items-start gap-4">
              <div className="text-2xl leading-none">💡</div>
              <div>
                <p className="text-sm font-semibold text-amber-900">
                  {blindSpot}
                </p>
                <p className="text-xs text-amber-700 mt-2">
                  This pattern emerged from analyzing all your test results
                  together
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
