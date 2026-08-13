"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  BarChart3,
  FileText,
  TrendingUp,
  Settings,
  ArrowLeft,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { getClientUser } from "@/utils/supabase/client-auth";
import { clientSignOut } from "@/utils/supabase/client-auth";
import { useProfile } from "@/lib/profile-context";
import { Navbar } from "@/components/sections/Navbar";

interface DashboardLayoutProps {
  page:
    | "overview"
    | "results"
    | "analytics"
    | "progress"
    | "settings"
    | "billing";
  children: React.ReactNode;
}

const SIDEBAR_ITEMS = [
  {
    label: "Overview",
    page: "overview" as const,
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    label: "My Results",
    page: "results" as const,
    href: "/dashboard/results",
    icon: FileText,
  },
  {
    label: "Analytics",
    page: "analytics" as const,
    href: "/dashboard/analytics",
    icon: TrendingUp,
  },
  {
    label: "Progress",
    page: "progress" as const,
    href: "/dashboard/progress",
    icon: TrendingUp,
  },
];

// Account section - separator and links
import { CreditCard, Settings as SettingsIcon } from "lucide-react";

const ACCOUNT_ITEMS = [
  {
    label: "Settings",
    page: "settings" as const,
    href: "/dashboard/settings",
    icon: SettingsIcon,
  },
  {
    label: "Billing",
    page: "billing" as const,
    href: "/dashboard/billing",
    icon: CreditCard,
  },
];

export function DashboardLayout({ page, children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { profile } = useProfile();

  useEffect(() => {
    const savedState = window.localStorage.getItem(
      "dashboard-sidebar-collapsed",
    );

    if (savedState) {
      setIsSidebarCollapsed(savedState === "true");
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getClientUser();
        if (!currentUser) {
          router.push("/auth/login");
          return;
        }
      } catch (err) {
        console.error("Error checking auth:", err);
        router.push("/auth/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((current) => {
      const nextState = !current;
      window.localStorage.setItem(
        "dashboard-sidebar-collapsed",
        String(nextState),
      );
      return nextState;
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-slate-50">
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <div className="flex h-screen flex-col overflow-hidden bg-slate-50 lg:h-[calc(100vh-80px)]">
      {/* Header - Mobile Menu Only */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-black/5 lg:hidden">
        <div className="flex h-16 items-center justify-between px-6">
          <Link
            href="/"
            className="flex h-10 w-40 items-center transition-opacity hover:opacity-70"
            aria-label="TrueSelf home"
          >
            <img
              src="/assets/logo/trueself-logo-navbar.png"
              alt="TrueSelf"
              className="h-full w-full object-contain"
            />
          </Link>
          <button
            onClick={() => setShowMobileSidebar(!showMobileSidebar)}
            className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            aria-label="Toggle dashboard menu"
            title="Toggle dashboard menu"
          >
            {showMobileSidebar ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* Sidebar - Desktop */}
        <aside
          className={`hidden bg-white border-r border-slate-200 flex-col shadow-sm transition-all duration-300 ease-in-out lg:flex ${
            isSidebarCollapsed ? "lg:w-20" : "lg:w-64"
          }`}
        >
          {/* User Info */}
          <div className="p-4 border-b border-slate-200">
            <div
              className={`flex items-center gap-3 ${
                isSidebarCollapsed ? "flex-col justify-center" : "justify-between"
              }`}
            >
              <div
                className={`flex items-center gap-3 min-w-0 ${
                  isSidebarCollapsed ? "justify-center" : "flex-1"
                }`}
              >
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
                    {profile?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
                <div
                  className={`min-w-0 transition-opacity duration-200 ${
                    isSidebarCollapsed ? "hidden" : "block"
                  }`}
                >
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {profile?.name || "User"}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {profile?.email}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleSidebar}
                className="h-9 w-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                aria-label={
                  isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
                }
                title={
                  isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
                }
              >
                <Menu size={20} />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav
            className={`scrollbar-hidden flex-1 space-y-2 flex flex-col overflow-y-auto ${
              isSidebarCollapsed ? "p-3" : "p-6"
            }`}
          >
            {/* Main Navigation */}
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.page}
                  href={item.href}
                  title={isSidebarCollapsed ? item.label : undefined}
                  className={`flex items-center rounded-lg font-medium transition-all duration-200 ${
                    isSidebarCollapsed
                      ? "h-11 justify-center px-0"
                      : "gap-3 px-4 py-3"
                  } ${
                    isActive
                      ? "bg-blue-50 text-blue-600 border border-blue-200"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {!isSidebarCollapsed && <span>{item.label}</span>}
                </Link>
              );
            })}

            {/* Separator */}
            <div className="h-px bg-slate-200 my-2"></div>

            {/* Account Items */}
            {ACCOUNT_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.page}
                  href={item.href}
                  title={isSidebarCollapsed ? item.label : undefined}
                  className={`flex items-center rounded-lg font-medium transition-all duration-200 ${
                    isSidebarCollapsed
                      ? "h-11 justify-center px-0"
                      : "gap-3 px-4 py-3"
                  } ${
                    isActive
                      ? "bg-blue-50 text-blue-600 border border-blue-200"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {!isSidebarCollapsed && <span>{item.label}</span>}
                </Link>
              );
            })}

            {/* Logout */}
            <div className="mt-auto pt-2 border-t border-slate-200">
              <button
                onClick={async () => {
                  await clientSignOut();
                  router.push("/auth/login");
                }}
                className={`w-full flex items-center rounded-lg font-medium text-red-600 hover:bg-red-50 transition-all duration-200 ${
                  isSidebarCollapsed
                    ? "h-11 justify-center px-0"
                    : "gap-3 px-4 py-3"
                }`}
                title={isSidebarCollapsed ? "Logout" : undefined}
              >
                <LogOut size={20} className="flex-shrink-0" />
                {!isSidebarCollapsed && <span>Logout</span>}
              </button>
            </div>
          </nav>
        </aside>

        {/* Sidebar - Mobile */}
        {showMobileSidebar && (
          <nav className="fixed inset-x-0 bottom-0 top-16 z-30 overflow-y-auto border-t border-slate-200 bg-white px-6 pb-8 pt-4 lg:hidden">
            <div className="space-y-1">
              <Link
                href="/"
                onClick={() => setShowMobileSidebar(false)}
                className="flex items-center gap-2 rounded-full px-4 py-2 text-base font-medium text-gray-600 transition-all duration-200 hover:bg-slate-50 hover:text-blue-600"
              >
                <ArrowLeft size={16} />
                Back
              </Link>

              {SIDEBAR_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.page}
                    href={item.href}
                    onClick={() => setShowMobileSidebar(false)}
                    className={`block rounded-full px-4 py-2 text-base font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-slate-50 hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {ACCOUNT_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.page}
                    href={item.href}
                    onClick={() => setShowMobileSidebar(false)}
                    className={`block rounded-full px-4 py-2 text-base font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-slate-50 hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="my-3 border-t border-slate-200 pt-3">
                <div className="flex items-center justify-between rounded-full px-4 py-3 text-gray-600">
                  <div className="flex min-w-0 items-center gap-2">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
                    {profile?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
                    <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {profile?.name || "User"}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    {profile?.email}
                  </p>
                </div>
              </div>
                </div>
            </div>

              <div className="border-t border-slate-200 pt-3">
                <button
                  onClick={async () => {
                    setShowMobileSidebar(false);
                    await clientSignOut();
                    router.push("/auth/login");
                  }}
                  className="block w-full rounded-full px-4 py-2 text-left text-base font-medium text-red-600 transition-all duration-200 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </div>
          </nav>
        )}

        {/* Main Content */}
        <main className="scrollbar-hidden flex-1 overflow-y-auto bg-slate-50/50">
          <div className="p-6 max-w-6xl mx-auto w-full">{children}</div>
        </main>
      </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
