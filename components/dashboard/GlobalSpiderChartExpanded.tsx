"use client";

import { GlobalProfile } from "@/lib/psychology/dimensions";
import { Card } from "@/components/ui/Card";
import { SpiderChart } from "./SpiderChart";
import { dimensionsToSpiderChart } from "@/lib/utils/profileDataMapper";

interface GlobalSpiderChartExpandedProps {
  profile: GlobalProfile;
}

/**
 * Expanded spider chart for analytics page
 */
export function GlobalSpiderChartExpanded({
  profile,
}: GlobalSpiderChartExpandedProps) {
  const spiderData = dimensionsToSpiderChart(profile.dimensions);

  return (
    <Card className="border border-gray-100 p-8">
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900">
            Your Global Psychology
          </h3>
          <p className="text-gray-600 mt-2">
            Unified analysis across{" "}
            {Object.keys(profile.testContributions).length} test
            {Object.keys(profile.testContributions).length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex justify-center py-6">
          <SpiderChart data={spiderData} width={550} height={550} />
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-6 border-t border-gray-200">
          {spiderData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-xs font-medium text-gray-700">
                {item.name}: {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
