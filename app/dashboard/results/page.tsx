import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MyResultsPage } from "@/components/dashboard/MyResultsPage";

export const metadata = {
  title: "My Results - TrueSelf Dashboard",
  description: "View all your test results",
};

export default function ResultsPage() {
  return (
    <DashboardLayout page="results">
      <MyResultsPage />
    </DashboardLayout>
  );
}
