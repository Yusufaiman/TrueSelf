import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ProgressPage } from "@/components/dashboard/ProgressPage";

export const metadata = {
  title: "Progress - TrueSelf Dashboard",
  description: "Track your progress and improvements",
};

export default function ProgressPageRoute() {
  return (
    <DashboardLayout page="progress">
      <ProgressPage />
    </DashboardLayout>
  );
}
