import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { OverviewPage } from "@/components/dashboard/OverviewPage";

export const metadata = {
  title: "Dashboard - TrueSelf",
  description: "Your personal dashboard and test results",
};

export default function DashboardOverview() {
  return (
    <DashboardLayout page="overview">
      <OverviewPage />
    </DashboardLayout>
  );
}
