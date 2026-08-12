import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { SavedResultDetailPage } from "@/components/dashboard/SavedResultDetailPage";
import { RouteProtection } from "@/components/RouteProtection";

interface ResultDetailRouteProps {
  params: Promise<{
    resultId: string;
  }>;
}

export const metadata = {
  title: "Saved Result - TrueSelf Dashboard",
  description: "View your saved TrueSelf assessment result",
};

export default async function ResultDetailRoute({
  params,
}: ResultDetailRouteProps) {
  const { resultId } = await params;

  return (
    <RouteProtection>
      <DashboardLayout page="results">
        <SavedResultDetailPage resultId={resultId} />
      </DashboardLayout>
    </RouteProtection>
  );
}
