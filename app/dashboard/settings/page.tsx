import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { SettingsPage } from "@/components/dashboard/SettingsPage";

export const metadata = {
  title: "Settings - TrueSelf Dashboard",
  description: "Manage your account settings",
};

export default function SettingsPageRoute() {
  return (
    <DashboardLayout page="settings">
      <SettingsPage />
    </DashboardLayout>
  );
}
