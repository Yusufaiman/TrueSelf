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
} from "lucide-react";
import { getClientUser } from "@/utils/supabase/client-auth";

interface DashboardLayoutProps {
  page: "overview" | "results" | "analytics" | "progress" | "settings";
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
  {
    label: "Settings",
    page: "settings" as const,
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function DashboardLayout({ page, children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getClientUser();
        if (!currentUser) {
          router.push("/auth/login");
          return;
        }
        setUser(currentUser);
      } catch (err) {
        console.error("Error checking auth:", err);
        router.push("/auth/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header - Mobile Menu Only */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-black/5 lg:hidden">
        <div className="px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setShowMobileSidebar(!showMobileSidebar)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {showMobileSidebar ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition">
            <ArrowLeft size={18} />
            <span className="text-sm">Back</span>
          </Link>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex lg:w-64 bg-white border-r border-slate-200 flex-col shadow-sm">
          {/* User Info */}
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
                {user?.email?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">
                  {user?.email?.split("@")[0] || "User"}
                </p>
                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2">
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.page}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-600 border border-blue-200"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Sidebar - Mobile */}
        {showMobileSidebar && (
          <aside className="fixed inset-0 z-30 lg:hidden pt-20 bg-white border-r border-slate-200 w-64">
            {/* User Info */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
                  {user?.email?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {user?.email?.split("@")[0] || "User"}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-6 space-y-2">
              {SIDEBAR_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.page}
                    href={item.href}
                    onClick={() => setShowMobileSidebar(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-600 border border-blue-200"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50">
          <div className="p-6 max-w-6xl mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
