"use client";

import { BarChart3, Calendar, Target, Scale } from "lucide-react";
import { Card } from "@/components/ui/Card";
import {
  getConsistencyColor,
  getConsistencyTextColor,
} from "@/lib/utils/profileDataMapper";

interface OverviewCardsProps {
  totalTests: number;
  lastActivityDate: string | null;
  dominantPattern: string | null;
  consistencyScore: number;
}

/**
 * Top overview cards showing key metrics
 */
export function OverviewCards({
  totalTests,
  lastActivityDate,
  dominantPattern,
  consistencyScore,
}: OverviewCardsProps) {
  const getConsistencyLabel = (score: number) => {
    if (score >= 75) return "High";
    if (score >= 50) return "Moderate";
    return "Developing";
  };

  const formatDate = (date: string | null) => {
    if (!date) return "Never";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Tests */}
      <Card className="border border-gray-100 p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">Total Tests</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {totalTests}
            </p>
            <p className="text-xs text-gray-500 mt-2">Tests completed</p>
          </div>
          <BarChart3 className="w-6 h-6 text-slate-400" />
        </div>
      </Card>

      {/* Last Activity */}
      <Card className="border border-gray-100 p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">Last Test</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {formatDate(lastActivityDate)}
            </p>
            <p className="text-xs text-gray-500 mt-2">Latest activity</p>
          </div>
          <Calendar className="w-6 h-6 text-slate-400" />
        </div>
      </Card>

      {/* Dominant Pattern */}
      <Card className="border border-gray-100 p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">Core Pattern</p>
            <p className="text-xl font-bold text-gray-900 mt-2">
              {dominantPattern || "Multi-faceted"}
            </p>
            <p className="text-xs text-gray-500 mt-2">Your primary archetype</p>
          </div>
          <Target className="w-6 h-6 text-slate-400" />
        </div>
      </Card>

      {/* Consistency Score */}
      <Card className={`border p-4 ${getConsistencyColor(consistencyScore)}`}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium opacity-75 capitalize">
              Profile Consistency
            </p>
            <p
              className={`text-3xl font-bold mt-2 ${getConsistencyTextColor(consistencyScore)}`}
            >
              {consistencyScore}%
            </p>
            <p className={`text-xs mt-2 opacity-75`}>
              {getConsistencyLabel(consistencyScore)}
            </p>
          </div>
          <Scale className="w-6 h-6 text-slate-400" />
        </div>
      </Card>
    </div>
  );
}
