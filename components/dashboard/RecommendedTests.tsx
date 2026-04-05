"use client";

import {
  Brain,
  User2,
  Compass,
  Heart,
  Target,
  Users,
  RotateCw,
  MessageSquare,
  Zap,
  Shield,
  Sprout,
  Dices,
} from "lucide-react";
import { GlobalDimension } from "@/lib/psychology/dimensions";
import { Card } from "@/components/ui/Card";
import { getTopAndBottomDimensions } from "@/lib/utils/profileDataMapper";

interface RecommendedTestsProps {
  dimensions: Record<GlobalDimension, number>;
}

/**
 * Recommends tests based on lowest dimensions
 */
export function RecommendedTests({ dimensions }: RecommendedTestsProps) {
  const { bottom } = getTopAndBottomDimensions(dimensions, 2);

  const testRecommendations: Record<
    string,
    { test: string; category: string; icon: any }
  > = {
    selfAwareness: { test: "Mindset Test", category: "awareness", icon: Brain },
    identityStability: {
      test: "Identity Profile",
      category: "identity",
      icon: User2,
    },
    authenticity: {
      test: "Life Direction",
      category: "direction",
      icon: Compass,
    },
    emotionalAlignment: {
      test: "Emotional Health",
      category: "emotional",
      icon: Heart,
    },
    decisionClarity: {
      test: "Reality Check",
      category: "clarity",
      icon: Target,
    },
    externalInfluence: {
      test: "Relationships",
      category: "social",
      icon: Users,
    },
    innerConsistency: {
      test: "Life Patterns",
      category: "patterns",
      icon: RotateCw,
    },
    socialExpression: {
      test: "Relationships",
      category: "social",
      icon: MessageSquare,
    },
    motivationStrength: { test: "Motivation", category: "drive", icon: Zap },
    discipline: { test: "Life Patterns", category: "patterns", icon: Shield },
    adaptability: { test: "Mindset Test", category: "growth", icon: Sprout },
    riskTolerance: { test: "Career Test", category: "career", icon: Dices },
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Recommended Next Tests
      </h3>

      <div className="space-y-3">
        {bottom.length > 0 ? (
          bottom.map((item) => {
            const rec = testRecommendations[item.dimension];
            return (
              <Card
                key={item.dimension}
                className="border border-blue-100 bg-blue-50 p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    {rec.icon && <rec.icon className="w-6 h-6 text-blue-600" />}
                    <div>
                      <p className="text-sm font-semibold text-blue-900">
                        {rec.test}
                      </p>
                      <p className="text-xs text-blue-700 mt-0.5">
                        Improve your{" "}
                        {item.dimension
                          .replace(/([A-Z])/g, " $1")
                          .toLowerCase()}{" "}
                        (currently {item.score}%)
                      </p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                    Take Test →
                  </button>
                </div>
              </Card>
            );
          })
        ) : (
          <Card className="border border-green-100 bg-green-50 p-4">
            <p className="text-sm text-green-700">
              Great! You've taken tests covering all major areas.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
