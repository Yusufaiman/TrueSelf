"use client";

import { GlobalProfile } from "@/lib/psychology/dimensions";
import { Card } from "@/components/ui/Card";
import { getDimensionCategories } from "@/lib/utils/profileDataMapper";
import { BarChart } from "./BarChart";

interface CategoryBreakdownAnalyticsProps {
  profile: GlobalProfile;
}

/**
 * Breakdown of dimensions by category for analytics
 */
export function CategoryBreakdownAnalytics({
  profile,
}: CategoryBreakdownAnalyticsProps) {
  const categories = getDimensionCategories(profile.dimensions);

  const categoryDescriptions = {
    identity: "Your sense of self, stability, and authenticity in who you are",
    motivation: "Your drive, goals, and motivation toward what you want",
    performance: "Your ability to execute, adapt, and push through challenges",
    emotional: "Your emotional integration, social presence, and independence",
  };

  const categoryColors: Record<string, string> = {
    identity: "bg-blue-100",
    motivation: "bg-purple-100",
    performance: "bg-green-100",
    emotional: "bg-pink-100",
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold text-gray-900">
          Category Breakdown
        </h3>
        <p className="text-gray-600 mt-2">
          Dimensions grouped by psychological domain
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(categories).map(([category, score]) => (
          <Card
            key={category}
            className={`border ${categoryColors[category]} p-6`}
          >
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 capitalize">
                  {category}
                </h4>
                <p className="text-sm text-gray-600 mt-2">
                  {
                    categoryDescriptions[
                      category as keyof typeof categoryDescriptions
                    ]
                  }
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Category Score
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    {score}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Bar Chart View */}
      <Card className="border border-gray-100 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-6">
          Category Comparison
        </h4>
        <BarChart
          data={Object.entries(categories).map(([name, score]) => ({
            label: name.charAt(0).toUpperCase() + name.slice(1),
            value: score,
          }))}
        />
      </Card>
    </div>
  );
}
