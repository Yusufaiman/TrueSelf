"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, FileText } from "lucide-react";
import TrueSelf16ResultTemplate from "@/components/test/TrueSelf16ResultTemplate";
import IdentityResultTemplate from "@/components/test/IdentityResultTemplate";
import RelationshipResultTemplate from "@/components/test/RelationshipResultTemplate";
import CareerResultTemplate from "@/components/test/CareerResultTemplate";
import MindResultTemplate from "@/components/test/MindResultTemplate";
import MotivationResultTemplate from "@/components/test/MotivationResultTemplate";
import GrowthResultTemplate from "@/components/test/GrowthResultTemplate";
import StressEmotionResultTemplate from "@/components/test/StressEmotionResultTemplate";
import LifeResultTemplate from "@/components/test/LifeResultTemplate";
import type { CareerFitResult } from "@/lib/career-fit/types";
import type { GrowthProfileResult } from "@/lib/growth-profile/types";
import type { IdentityResult } from "@/lib/identity-profile/types";
import type { LifeProfileResult } from "@/lib/life-profile/types";
import type { MindProfileResult } from "@/lib/mind-profile/types";
import type { MotivationProfileResult } from "@/lib/motivation-profile/types";
import type { RelationshipStyleResult } from "@/lib/relationship-profile/types";
import type { StressEmotionProfileResult } from "@/lib/stress-emotions-profile/types";
import type { TrueSelf16Result, TypeCode } from "@/lib/trueself-16/types";
import { TRUESELF_16_PROFILES } from "@/lib/trueself-16/data";
import {
  FUNCTION_STACKS,
  TYPE_FAMILIES,
  TYPE_FAMILY_BY_CODE,
} from "@/lib/trueself-16/layers";
import { getUserResults, type TestResult } from "@/utils/supabase/client-results";

interface SavedResultDetailPageProps {
  resultId: string;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getResultTitle(result: TestResult): string {
  const payload = result.result || {};

  if (payload.typeCode && payload.typeName) {
    return `${payload.typeCode} - ${payload.typeName}`;
  }

  return (
    payload.title ||
    payload.pattern ||
    payload.primaryType ||
    payload.label ||
    "Result"
  );
}

function isTypeCode(value: unknown): value is TypeCode {
  return typeof value === "string" && value in TRUESELF_16_PROFILES;
}

function stringArray(value: unknown, fallback: string[]) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : fallback;
}

function buildTrueSelf16Result(record: TestResult): TrueSelf16Result | null {
  const payload = record.result || {};

  if (!isTypeCode(payload.typeCode) || !payload.axisScores) {
    return null;
  }

  const profile = TRUESELF_16_PROFILES[payload.typeCode];
  const family =
    payload.family || TYPE_FAMILIES[TYPE_FAMILY_BY_CODE[payload.typeCode]];

  return {
    typeCode: payload.typeCode,
    typeName: payload.typeName || profile.name,
    family,
    tagline: payload.tagline || profile.tagline,
    description: payload.description || profile.description,
    axisScores: payload.axisScores,
    confidence: payload.confidence || "low",
    confidenceScore: payload.confidenceScore ?? 0,
    closestType: isTypeCode(payload.closestType)
      ? payload.closestType
      : payload.typeCode,
    facetScores: payload.facetScores || {
      EI: [],
      SN: [],
      TF: [],
      JP: [],
    },
    answerEvidence: payload.answerEvidence || [],
    functionStack: payload.functionStack || FUNCTION_STACKS[payload.typeCode],
    functionDevelopment: payload.functionDevelopment,
    variant: payload.variant,
    behaviouralTraits: payload.behaviouralTraits,
    contextualSelf: payload.contextualSelf,
    strengths: stringArray(payload.strengths, profile.strengths),
    blindSpots: stringArray(payload.blindSpots, profile.blindSpots),
    growthPath: stringArray(payload.growthPath, profile.growthPath),
    relationshipStyle: payload.relationshipStyle || profile.relationshipStyle,
    workStyle: payload.workStyle || profile.workStyle,
    suggestedNextSteps:
      stringArray(payload.suggestedNextSteps, profile.suggestedNextSteps),
  };
}

function buildIdentityResult(record: TestResult): IdentityResult | null {
  const payload = record.result || {};

  if (!payload.pattern || !payload.dimensions) {
    return null;
  }

  return {
    pattern: {
      id: payload.patternId || payload.pattern,
      name: payload.pattern,
      tagline: payload.tagline || "Your identity pattern",
      description: payload.description || "A saved identity profile.",
      matchScore: payload.matchScore ?? 0,
    },
    dimensions: payload.dimensions,
    coreSocialAlignment: payload.coreSocialAlignment || {
      level: "Moderate",
      description: "Saved alignment data is limited for this result.",
    },
    expressionGap: payload.expressionGap || {
      level: "Moderate",
      description: "Saved expression gap data is limited for this result.",
    },
    internalGrounding: payload.internalGrounding || {
      level: "Moderate",
      description: "Saved grounding data is limited for this result.",
    },
    coreSelf: stringArray(payload.coreSelf, []),
    socialSelf: stringArray(payload.socialSelf, []),
    groundingSignals: stringArray(payload.groundingSignals, []),
    adaptationSignals: stringArray(payload.adaptationSignals, []),
    insights: stringArray(payload.insights, []),
    confidence: payload.confidence || "Limited",
    confidenceNotes: stringArray(payload.confidenceNotes, []),
    answerEvidence: payload.answerEvidence || [],
  };
}

function buildRelationshipResult(record: TestResult): RelationshipStyleResult | null {
  const payload = record.result || {};

  if (!payload.pattern || !payload.dimensions) {
    return null;
  }

  return {
    pattern: {
      id: payload.patternId || payload.pattern,
      name: payload.pattern,
      tagline: payload.tagline || "Your relationship pattern",
      description: payload.description || "A saved relationship profile.",
      matchScore: payload.matchScore ?? 0,
    },
    dimensions: payload.dimensions,
    closenessStyle: payload.closenessStyle || "Mixed / Contextual",
    communicationStyle: payload.communicationStyle || "Mixed / Contextual",
    independenceStyle: payload.independenceStyle || "Mixed / Contextual",
    conflictStyle: payload.conflictStyle || "Mixed / Contextual",
    relationshipNeeds: stringArray(payload.relationshipNeeds, []),
    careStyle: payload.careStyle || "Moderate Care Expression",
    strengths: stringArray(payload.strengths, []),
    frictionPoints: stringArray(payload.frictionPoints, []),
    insights: stringArray(payload.insights, []),
    confidence: payload.confidence || "Limited",
    confidenceNotes: stringArray(payload.confidenceNotes, []),
    answerEvidence: payload.answerEvidence || [],
  };
}

function buildCareerResult(record: TestResult): CareerFitResult | null {
  const payload = record.result || {};

  if (!payload.pattern || !payload.dimensions) {
    return null;
  }

  return {
    pattern: {
      id: payload.patternId || payload.pattern,
      name: payload.pattern,
      tagline: payload.tagline || "Your career pattern",
      description: payload.description || "A saved career fit profile.",
      matchScore: payload.matchScore ?? 0,
    },
    secondaryPattern: payload.secondaryPattern || {
      id: "secondary",
      name: "Secondary Pattern",
      tagline: "Additional career signal",
      description: "Saved secondary career pattern data is limited.",
      matchScore: 0,
    },
    dimensions: payload.dimensions,
    workEnvironmentStyle: payload.workEnvironmentStyle || "Balanced and context-aware",
    problemStyle: payload.problemStyle || "Mixed / Contextual",
    responsibilityStyle: payload.responsibilityStyle || "Mixed / Contextual",
    growthStyle: payload.growthStyle || "Mixed / Contextual",
    bestFitEnvironments: stringArray(payload.bestFitEnvironments, []),
    careerFamilies: Array.isArray(payload.careerFamilies)
      ? payload.careerFamilies
      : [],
    occupationMatches: Array.isArray(payload.occupationMatches)
      ? payload.occupationMatches
      : [],
    strengths: stringArray(payload.strengths, []),
    drainers: stringArray(payload.drainers, []),
    frictionPoints: stringArray(payload.frictionPoints, []),
    insights: stringArray(payload.insights, []),
    confidence: payload.confidence || "Limited",
    confidenceNotes: stringArray(payload.confidenceNotes, []),
    answerEvidence: payload.answerEvidence || [],
  };
}

function buildMindResult(record: TestResult): MindProfileResult | null {
  const payload = record.result || {};

  if (!payload.pattern || !payload.dimensions) {
    return null;
  }

  return {
    pattern: {
      id: payload.patternId || payload.pattern,
      name: payload.pattern,
      tagline: payload.tagline || "Your mind pattern",
      description: payload.description || "A saved cognitive style profile.",
      matchScore: payload.matchScore ?? 0,
    },
    secondaryPattern: payload.secondaryPattern || {
      id: "secondary",
      name: "Secondary Pattern",
      tagline: "Additional mind signal",
      description: "Saved secondary mind pattern data is limited.",
      matchScore: 0,
    },
    dimensions: payload.dimensions,
    processingStyle: payload.processingStyle || "Contextual processor",
    learningStyle: payload.learningStyle || "Balanced learner",
    decisionStyle: payload.decisionStyle || "Balanced decision-maker",
    uncertaintyStyle: payload.uncertaintyStyle || "Moderately uncertainty-tolerant",
    cognitiveStrengths: stringArray(payload.cognitiveStrengths, []),
    frictionPoints: stringArray(payload.frictionPoints, []),
    insights: stringArray(payload.insights, []),
    developmentPath: stringArray(payload.developmentPath, []),
    confidence: payload.confidence || "Limited",
    confidenceNotes: stringArray(payload.confidenceNotes, []),
    answerEvidence: payload.answerEvidence || [],
  };
}

function buildMotivationResult(record: TestResult): MotivationProfileResult | null {
  const payload = record.result || {};

  if (!payload.pattern || !payload.dimensions) {
    return null;
  }

  return {
    pattern: {
      id: payload.patternId || payload.pattern,
      name: payload.pattern,
      tagline: payload.tagline || "Your motivation pattern",
      description: payload.description || "A saved motivation profile.",
      matchScore: payload.matchScore ?? 0,
    },
    secondaryPattern: payload.secondaryPattern || {
      id: "secondary",
      name: "Secondary Pattern",
      tagline: "Additional motivation signal",
      description: "Saved secondary motivation pattern data is limited.",
      matchScore: 0,
    },
    dimensions: payload.dimensions,
    primaryDrivers: Array.isArray(payload.primaryDrivers)
      ? payload.primaryDrivers
      : [],
    supportingDrivers: Array.isArray(payload.supportingDrivers)
      ? payload.supportingDrivers
      : [],
    lowerInfluenceDrivers: Array.isArray(payload.lowerInfluenceDrivers)
      ? payload.lowerInfluenceDrivers
      : [],
    activationProfile: stringArray(payload.activationProfile, []),
    motivationTensions: stringArray(payload.motivationTensions, []),
    frictionProfile: stringArray(payload.frictionProfile, []),
    insights: stringArray(payload.insights, []),
    confidence: payload.confidence || "Limited",
    confidenceNotes: stringArray(payload.confidenceNotes, []),
    answerEvidence: payload.answerEvidence || [],
  };
}

function buildGrowthResult(record: TestResult): GrowthProfileResult | null {
  const payload = record.result || {};

  if (!payload.dimensions || !payload.stages) {
    return null;
  }

  const stageValues = Object.values(payload.stages) as any[];
  const fallbackStrength = stageValues[0] || {
    key: "see",
    label: "SEE",
    score: 0,
    description: "Saved growth stage data is limited.",
  };

  return {
    dimensions: payload.dimensions,
    stages: payload.stages,
    growthStrength: payload.growthStrength || fallbackStrength,
    growthBottleneck: payload.growthBottleneck || fallbackStrength,
    growthPattern: payload.growthPattern || payload.pattern || "Growth Profile",
    cycleInsight: payload.cycleInsight || "Saved growth cycle insight is limited for this result.",
    strengths: stringArray(payload.strengths, []),
    bottleneckSignals: stringArray(payload.bottleneckSignals, []),
    developmentPath: stringArray(payload.developmentPath, []),
    insights: stringArray(payload.insights, []),
    confidence: payload.confidence || "Limited",
    confidenceNotes: stringArray(payload.confidenceNotes, []),
    answerEvidence: payload.answerEvidence || [],
  };
}

function buildStressEmotionResult(record: TestResult): StressEmotionProfileResult | null {
  const payload = record.result || {};

  if (!payload.dimensions || !payload.processingCycle || !payload.stressResponsePattern) {
    return null;
  }

  const stageValues = Object.values(payload.processingCycle) as any[];
  const fallbackStage = stageValues[0] || {
    key: "notice",
    label: "NOTICE",
    score: 0,
    description: "Saved emotional processing stage data is limited.",
  };
  const fallbackStressSensitivity =
    payload.stressSensitivity ||
    payload.dimensions.stress_reactivity ||
    {
      key: "stress_reactivity",
      label: "Stress Reactivity",
      score: 0,
      band: "Saved data limited",
      lowLabel: "Lower Reactivity",
      highLabel: "Higher Reactivity",
      description: "Saved stress reactivity data is limited.",
      isLoadDimension: true,
      consistency: 0,
      confidence: "Limited",
    };

  return {
    dimensions: payload.dimensions,
    processingCycle: payload.processingCycle,
    stressResponsePattern: payload.stressResponsePattern,
    emotionalStrength: payload.emotionalStrength || fallbackStage,
    emotionalBottleneck: payload.emotionalBottleneck || null,
    stressSensitivity: fallbackStressSensitivity,
    processingInsights: stringArray(payload.processingInsights, []),
    stressInsights: stringArray(payload.stressInsights, []),
    copingInsights: stringArray(payload.copingInsights, []),
    supportPath: stringArray(payload.supportPath, []),
    confidence: payload.confidence || "Limited",
    confidenceNotes: stringArray(payload.confidenceNotes, []),
    answerEvidence: payload.answerEvidence || [],
  };
}

function buildLifeResult(record: TestResult): LifeProfileResult | null {
  const payload = record.result || {};

  if (!payload.dimensions || !payload.stages || !payload.primaryPattern) {
    return null;
  }

  const dimensionValues = Object.values(payload.dimensions) as any[];
  const fallbackDimension = dimensionValues[0] || {
    key: "life_direction",
    label: "Life Direction",
    score: 0,
    band: "Saved data limited",
    lowLabel: "Exploring Direction",
    highLabel: "Directionally Clear",
    description: "Saved life dimension data is limited.",
    consistency: 0,
    confidence: "Limited",
  };

  return {
    dimensions: payload.dimensions,
    stages: payload.stages,
    lifeStrength: payload.lifeStrength || fallbackDimension,
    attentionArea: payload.attentionArea || fallbackDimension,
    primaryPattern: payload.primaryPattern,
    secondaryPattern: payload.secondaryPattern || payload.primaryPattern,
    lifeGaps: Array.isArray(payload.lifeGaps) ? payload.lifeGaps : [],
    lifeTensions: Array.isArray(payload.lifeTensions) ? payload.lifeTensions : [],
    lifeSupports: Array.isArray(payload.lifeSupports) ? payload.lifeSupports : [],
    priorityPath: stringArray(payload.priorityPath, []),
    currentStateSummary:
      payload.currentStateSummary || "Saved life profile summary is limited for this result.",
    confidence: payload.confidence || "Limited",
    confidenceNotes: stringArray(payload.confidenceNotes, []),
    assessmentVersion: payload.assessmentVersion || 1,
    completedAt: payload.completedAt || record.created_at,
    answerEvidence: payload.answerEvidence || [],
  };
}

export function SavedResultDetailPage({ resultId }: SavedResultDetailPageProps) {
  const router = useRouter();
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const fetchedResults = await getUserResults();
        setResults(fetchedResults);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const result = useMemo(
    () => results.find((item) => item.id === resultId) || null,
    [resultId, results],
  );
  const trueSelfResult =
    result?.test_type === "trueself_16_type"
      ? buildTrueSelf16Result(result)
      : null;
  const identityResult =
    result?.test_type === "identity_profile" ? buildIdentityResult(result) : null;
  const relationshipResult =
    result?.test_type === "relationship_profile"
      ? buildRelationshipResult(result)
      : null;
  const careerResult =
    result?.test_type === "career_profile" ? buildCareerResult(result) : null;
  const mindResult =
    result?.test_type === "mind_profile" ? buildMindResult(result) : null;
  const motivationResult =
    result?.test_type === "motivation_profile"
      ? buildMotivationResult(result)
      : null;
  const growthResult =
    result?.test_type === "growth_profile" ? buildGrowthResult(result) : null;
  const stressEmotionResult =
    result?.test_type === "stress_emotions_profile"
      ? buildStressEmotionResult(result)
      : null;
  const lifeResult =
    result?.test_type === "life_profile" ? buildLifeResult(result) : null;

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
        <FileText className="mx-auto mb-4 h-10 w-10 text-slate-400" />
        <h1 className="text-2xl font-bold text-slate-950">Result not found</h1>
        <p className="mt-2 text-slate-500">
          This saved result may have been removed or is no longer available.
        </p>
        <Link
          href="/dashboard/results"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 font-semibold text-white"
        >
          <ArrowLeft size={18} />
          Back to My Results
        </Link>
      </div>
    );
  }

  if (trueSelfResult) {
    return (
      <div>
        <div className="pdf-hide mb-5">
          <Link
            href="/dashboard/results"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
            Back to My Results
          </Link>
        </div>
        <TrueSelf16ResultTemplate
          variant="trueself-16-type"
          result={trueSelfResult}
          onRetake={() => router.push("/assessment/trueself-16-type")}
        />
      </div>
    );
  }

  if (identityResult) {
    return (
      <div>
        <div className="pdf-hide mb-5">
          <Link
            href="/dashboard/results"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
            Back to My Results
          </Link>
        </div>
        <IdentityResultTemplate
          variant="identity-profile"
          result={identityResult}
          onRetake={() => router.push("/assessment/identity-who-you-really-are")}
        />
      </div>
    );
  }

  if (relationshipResult) {
    return (
      <div>
        <div className="pdf-hide mb-5">
          <Link
            href="/dashboard/results"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
            Back to My Results
          </Link>
        </div>
        <RelationshipResultTemplate
          variant="relationship-style"
          result={relationshipResult}
          onRetake={() => router.push("/assessment/relationship-style")}
        />
      </div>
    );
  }

  if (careerResult) {
    return (
      <div>
        <div className="pdf-hide mb-5">
          <Link
            href="/dashboard/results"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
            Back to My Results
          </Link>
        </div>
        <CareerResultTemplate
          variant="career-fit"
          result={careerResult}
          onRetake={() => router.push("/assessment/career-fit")}
        />
      </div>
    );
  }

  if (mindResult) {
    return (
      <div>
        <div className="pdf-hide mb-5">
          <Link
            href="/dashboard/results"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
            Back to My Results
          </Link>
        </div>
        <MindResultTemplate
          variant="mind-profile"
          result={mindResult}
          onRetake={() => router.push("/assessment/mind-profile")}
        />
      </div>
    );
  }

  if (motivationResult) {
    return (
      <div>
        <div className="pdf-hide mb-5">
          <Link
            href="/dashboard/results"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
            Back to My Results
          </Link>
        </div>
        <MotivationResultTemplate
          variant="motivation-profile"
          result={motivationResult}
          onRetake={() => router.push("/assessment/motivation-profile")}
        />
      </div>
    );
  }

  if (growthResult) {
    return (
      <div>
        <div className="pdf-hide mb-5">
          <Link
            href="/dashboard/results"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
            Back to My Results
          </Link>
        </div>
        <GrowthResultTemplate
          variant="growth-profile"
          result={growthResult}
          onRetake={() => router.push("/assessment/growth-profile")}
        />
      </div>
    );
  }

  if (stressEmotionResult) {
    return (
      <div>
        <div className="pdf-hide mb-5">
          <Link
            href="/dashboard/results"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
            Back to My Results
          </Link>
        </div>
        <StressEmotionResultTemplate
          variant="stress-emotions-profile"
          result={stressEmotionResult}
          onRetake={() => router.push("/assessment/stress-emotions-profile")}
        />
      </div>
    );
  }

  if (lifeResult) {
    return (
      <div>
        <div className="pdf-hide mb-5">
          <Link
            href="/dashboard/results"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
            Back to My Results
          </Link>
        </div>
        <LifeResultTemplate
          variant="life-profile"
          result={lifeResult}
          onRetake={() => router.push("/assessment/life-profile")}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/results"
        className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
      >
        <ArrowLeft size={16} />
        Back to My Results
      </Link>

      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          {result.test_type}
        </span>
        <h1 className="mt-5 text-3xl font-bold text-slate-950">
          {getResultTitle(result)}
        </h1>
        <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
          <Calendar size={16} />
          {formatDate(result.created_at)}
        </div>
        {result.result?.description && (
          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600">
            {result.result.description}
          </p>
        )}
      </section>
    </div>
  );
}
