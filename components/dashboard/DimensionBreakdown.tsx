"use client";

import { GlobalProfile } from "@/lib/psychology/dimensions";
import { Card } from "@/components/ui/Card";
import { BarChart } from "./BarChart";
import {
  dimensionsToBarChart,
  getTopAndBottomDimensions,
} from "@/lib/utils/profileDataMapper";

interface DimensionBreakdownProps {
  profile: GlobalProfile;
}

/**
 * Displays all dimensions with scores and contributing tests
 */
export function DimensionBreakdown({ profile }: DimensionBreakdownProps) {
  const chartData = dimensionsToBarChart(profile.dimensions);
  const { top, bottom } = getTopAndBottomDimensions(profile.dimensions, 4);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Dimension Breakdown
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Dimensions */}
          <Card className="border border-green-100 bg-green-50 p-6">
            <h4 className="text-sm font-semibold text-green-900 mb-4">
              Your Strengths
            </h4>
            <div className="space-y-3">
              {top.map((item) => (
                <div key={item.dimension} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700">
                      {item.dimension
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </label>
                    <span className="text-sm font-bold text-green-700">
                      {item.score}%
                    </span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Bottom Dimensions */}
          <Card className="border border-amber-100 bg-amber-50 p-6">
            <h4 className="text-sm font-semibold text-amber-900 mb-4">
              Areas for Growth
            </h4>
            <div className="space-y-3">
              {bottom.map((item) => (
                <div key={item.dimension} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700">
                      {item.dimension
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </label>
                    <span className="text-sm font-bold text-amber-700">
                      {item.score}%
                    </span>
                  </div>
                  <div className="w-full bg-amber-200 rounded-full h-2">
                    <div
                      className="bg-amber-600 h-2 rounded-full transition-all"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* All Dimensions Chart */}
      <Card className="border border-gray-100 p-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">
          All Dimensions
        </h4>
        <BarChart
          data={chartData.map((item) => ({
            ...item,
            color:
              item.value >= 70
                ? "bg-green-500"
                : item.value >= 50
                  ? "bg-blue-500"
                  : "bg-amber-500",
          }))}
        />
      </Card>
    </div>
  );
}
