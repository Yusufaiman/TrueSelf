import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { OverviewPage } from "@/components/dashboard/OverviewPage";
import { RouteProtection } from "@/components/RouteProtection";

export const metadata = {
  title: "Dashboard - TrueSelf",
  description: "Your personal dashboard and test results",
};

export default function DashboardOverview() {
  return (
    <RouteProtection>
      <DashboardLayout page="overview">
        <OverviewPage />
      </DashboardLayout>
    </RouteProtection>
  );
}
