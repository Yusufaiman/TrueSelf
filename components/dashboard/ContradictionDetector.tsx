"use client";

import { CheckCircle2, AlertTriangle, Zap, Info } from "lucide-react";
import { GlobalProfile } from "@/lib/psychology/dimensions";
import { Card } from "@/components/ui/Card";
import { detectContradictions } from "@/lib/psychology/contradictions";

interface ContradictionDetectorProps {
  profile: GlobalProfile;
}

/**
 * Displays internal contradictions and psychological tensions
 */
export function ContradictionDetector({ profile }: ContradictionDetectorProps) {
  const contradictions = detectContradictions(profile.dimensions);

  if (contradictions.length === 0) {
    return (
      <Card className="border border-green-100 bg-green-50 p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-green-900">
              No Major Contradictions
            </h4>
            <p className="text-sm text-green-700 mt-1">
              Your psychological profile shows strong internal alignment
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        Internal Contradictions
      </h3>

      {contradictions.map((contradiction, index) => {
        const bgColor =
          contradiction.severity === "high"
            ? "bg-red-50 border-red-200"
            : contradiction.severity === "medium"
              ? "bg-amber-50 border-amber-200"
              : "bg-blue-50 border-blue-200";

        const textColor =
          contradiction.severity === "high"
            ? "text-red-900"
            : contradiction.severity === "medium"
              ? "text-amber-900"
              : "text-blue-900";

        const iconComponent =
          contradiction.severity === "high" ? (
            <AlertTriangle className="w-5 h-5 text-red-600" />
          ) : contradiction.severity === "medium" ? (
            <Zap className="w-5 h-5 text-amber-600" />
          ) : (
            <Info className="w-5 h-5 text-blue-600" />
          );

        return (
          <Card key={index} className={`border ${bgColor} p-4`}>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">{iconComponent}</div>
                <div className="flex-1">
                  <h4 className={`font-semibold ${textColor}`}>
                    {contradiction.message}
                  </h4>
                  <p className={`text-sm ${textColor} opacity-80 mt-1`}>
                    {contradiction.insight}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
