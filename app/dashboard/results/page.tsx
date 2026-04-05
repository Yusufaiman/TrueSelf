import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MyResultsPage } from "@/components/dashboard/MyResultsPage";
import { RouteProtection } from "@/components/RouteProtection";

export const metadata = {
  title: "My Results - TrueSelf Dashboard",
  description: "View all your test results and scores",
};

export default function ResultsPage() {
  return (
    <RouteProtection>
      <DashboardLayout page="results">
        <MyResultsPage />
      </DashboardLayout>
    </RouteProtection>
  );
}
