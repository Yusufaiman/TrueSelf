"use client";

import { GlobalProfile } from "@/lib/psychology/dimensions";
import { Card } from "@/components/ui/Card";
import { SpiderChart } from "./SpiderChart";
import { dimensionsToSpiderChart } from "@/lib/utils/profileDataMapper";

interface GlobalSelfMapProps {
  profile: GlobalProfile;
}

/**
 * Large spider chart showing the user's global psychological profile
 */
export function GlobalSelfMap({ profile }: GlobalSelfMapProps) {
  const spiderData = dimensionsToSpiderChart(profile.dimensions);

  return (
    <Card className="border border-gray-100 p-8">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Your Global Self Map
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            A unified view of your psychological profile across all tests you've
            taken
          </p>
        </div>

        <div className="flex justify-center py-4">
          <SpiderChart data={spiderData} width={450} height={450} />
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Based on {Object.keys(profile.testContributions).length} test
            {Object.keys(profile.testContributions).length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </Card>
  );
}
