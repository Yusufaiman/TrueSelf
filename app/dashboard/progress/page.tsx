import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ProgressPage } from "@/components/dashboard/ProgressPage";
import { RouteProtection } from "@/components/RouteProtection";

export const metadata = {
  title: "Progress - TrueSelf Dashboard",
  description: "Track your assessment progress",
};

export default function ProgressPageRoute() {
  return (
    <RouteProtection>
      <DashboardLayout page="progress">
        <ProgressPage />
      </DashboardLayout>
    </RouteProtection>
  );
}
