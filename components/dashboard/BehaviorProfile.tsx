"use client";

import { GlobalProfile } from "@/lib/psychology/dimensions";
import { Card } from "@/components/ui/Card";
import { getDimensionCategories } from "@/lib/utils/profileDataMapper";

interface BehaviorProfileProps {
  profile: GlobalProfile;
}

/**
 * Generates and displays auto-derived behavior profiles from dimension combinations
 */
export function BehaviorProfile({ profile }: BehaviorProfileProps) {
  const categories = getDimensionCategories(profile.dimensions);

  // Determine decision style
  const decisionStyle =
    profile.dimensions.decisionClarity > 70
      ? "Clear, intentional, and values-driven"
      : profile.dimensions.decisionClarity > 50
        ? "Balanced between intuition and logic"
        : "Influenced by circumstances and others";

  // Determine emotional pattern
  const emotionalPattern =
    profile.dimensions.emotionalAlignment > 70
      ? "Emotionally integrated—feelings align with actions"
      : profile.dimensions.emotionalAlignment > 50
        ? "Moderately integrated with some emotional complexity"
        : "Emotional disconnect—feelings often override logic";

  // Determine social pattern
  const socialPattern =
    profile.dimensions.socialExpression > 70
      ? "Openly expressive and authentic in social contexts"
      : profile.dimensions.socialExpression > 50
        ? "Selective in how you express yourself"
        : "Guarded or restrained in social expression";

  // Determine risk pattern
  const riskPattern =
    profile.dimensions.riskTolerance > 70
      ? "Comfortable with uncertainty and experimentation"
      : profile.dimensions.riskTolerance > 50
        ? "Balanced risk-taking with caution"
        : "Prefer predictability and avoid risk";

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        Your Behavior Profile
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Decision Style */}
        <Card className="border border-blue-100 bg-blue-50 p-4">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">
            Decision Style
          </h4>
          <p className="text-sm text-blue-800">{decisionStyle}</p>
        </Card>

        {/* Emotional Pattern */}
        <Card className="border border-purple-100 bg-purple-50 p-4">
          <h4 className="text-sm font-semibold text-purple-900 mb-2">
            Emotional Pattern
          </h4>
          <p className="text-sm text-purple-800">{emotionalPattern}</p>
        </Card>

        {/* Social Pattern */}
        <Card className="border border-pink-100 bg-pink-50 p-4">
          <h4 className="text-sm font-semibold text-pink-900 mb-2">
            Social Pattern
          </h4>
          <p className="text-sm text-pink-800">{socialPattern}</p>
        </Card>

        {/* Risk Pattern */}
        <Card className="border border-orange-100 bg-orange-50 p-4">
          <h4 className="text-sm font-semibold text-orange-900 mb-2">
            Risk Pattern
          </h4>
          <p className="text-sm text-orange-800">{riskPattern}</p>
        </Card>
      </div>

      {/* Category Scores */}
      <Card className="border border-gray-100 p-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">
          Category Scores
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(categories).map(([name, score]) => (
            <div key={name} className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xs font-medium text-gray-600 capitalize mb-1">
                {name}
              </p>
              <p className="text-2xl font-bold text-blue-600">{score}%</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
