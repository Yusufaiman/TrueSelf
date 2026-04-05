"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import {
  User,
  Users,
  Briefcase,
  Map,
  Brain,
  Heart,
  RefreshCw,
  Wallet,
  AlertCircle,
  ChevronDown,
  Menu,
  X,
  BarChart3,
  LogOut,
  CreditCard,
} from "lucide-react";
import { categoryThemes, type CategoryKey } from "@/config/categoryTheme";
import { getClientUser, clientSignOut } from "@/utils/supabase/client-auth";
import { useProfile } from "@/lib/profile-context";

interface TestCategory {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  categoryKey: CategoryKey;
}

const testCategories: TestCategory[] = [
  {
    title: "Identity",
    description: "Understand who you really are",
    href: "/tests/identity",
    icon: <User size={20} />,
    categoryKey: "identity",
  },
  {
    title: "Relationships",
    description: "See how you connect with others",
    href: "/tests/relationships",
    icon: <Users size={20} />,
    categoryKey: "relationships",
  },
  {
    title: "Career",
    description: "Explore the work that fits you",
    href: "/tests/career",
    icon: <Briefcase size={20} />,
    categoryKey: "career",
  },
  {
    title: "Life Direction",
    description: "Get clearer about where you are going",
    href: "/tests/life-direction",
    icon: <Map size={20} />,
    categoryKey: "life-direction",
  },
  {
    title: "Mindset",
    description: "Understand how your mind works",
    href: "/tests/mindset",
    icon: <Brain size={20} />,
    categoryKey: "mindset",
  },
  {
    title: "Emotional Health",
    description: "Understand your emotional patterns",
    href: "/tests/emotional-health",
    icon: <Heart size={20} />,
    categoryKey: "emotional-health",
  },
  {
    title: "Life Patterns",
    description: "See the loops that keep repeating",
    href: "/tests/life-patterns",
    icon: <RefreshCw size={20} />,
    categoryKey: "life-patterns",
  },
  {
    title: "Money",
    description: "Understand your financial behavior",
    href: "/tests/money",
    icon: <Wallet size={20} />,
    categoryKey: "money",
  },
  {
    title: "Reality Check",
    description: "See what might be holding you back",
    href: "/tests/reality-check",
    icon: <AlertCircle size={20} />,
    categoryKey: "reality-check",
  },
];

// Icon colors only - no background colors
const iconColorMap: Record<CategoryKey, string> = {
  identity: "#3b82f6",
  relationships: "#ec4899",
  career: "#6366f1",
  "life-direction": "#a855f7",
  mindset: "#22d3ee",
  "emotional-health": "#ef4444",
  "life-patterns": "#f59e0b",
  money: "#22c55e",
  "reality-check": "#6b7280",
};

export const Navbar: React.FC = () => {
  const [showTestsMenu, setShowTestsMenu] = useState(false);
  const [activeNav, setActiveNav] = useState<string>("home");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { profile } = useProfile();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getClientUser();
        if (user) {
          setIsLoggedIn(true);
          // In production, fetch subscription status from Supabase
          // For now, set to true if user exists (demo purposes)
          setIsSubscribed(true);
        } else {
          setIsLoggedIn(false);
          setIsSubscribed(false);
        }
      } catch (err) {
        console.error("Error checking auth:", err);
        setIsLoggedIn(false);
        setIsSubscribed(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname]);

  const handleLogout = async () => {
    const success = await clientSignOut();
    if (success) {
      setIsLoggedIn(false);
      router.push("/");
    }
  };

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Tests", href: "/tests", hasDropdown: true },
    { label: "Types", href: "/types" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
  ];

  const handleNavClick = (label: string) => {
    setActiveNav(label.toLowerCase());
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight hover:opacity-70 transition-opacity"
          >
            TrueSelf
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => {
              const isItemActive = item.hasDropdown
                ? showTestsMenu || pathname.startsWith("/tests")
                : isActive(item.href);

              return (
                <div key={item.label} className="relative">
                  {item.hasDropdown ? (
                    <button
                      onClick={() => router.push("/tests")}
                      className={`flex items-center gap-2 text-base font-medium transition-all duration-200 ${
                        isItemActive
                          ? "text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                      onMouseEnter={() => setShowTestsMenu(true)}
                      onMouseLeave={() => setShowTestsMenu(false)}
                    >
                      Tests
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${showTestsMenu ? "rotate-180" : ""}`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`text-base font-medium transition-all duration-200 ${
                        isItemActive
                          ? "text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                      onClick={() => handleNavClick(item.label)}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {item.hasDropdown && showTestsMenu && (
                    <div
                      className="absolute left-0 top-full mt-0 rounded-2xl border border-slate-200 bg-white shadow-lg p-4 min-w-[320px] animate-in fade-in zoom-in-95 duration-200"
                      onMouseEnter={() => setShowTestsMenu(true)}
                      onMouseLeave={() => setShowTestsMenu(false)}
                    >
                      {/* View All Tests Link */}
                      <Link
                        href="/tests"
                        className="flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-150 cursor-pointer hover:bg-blue-50 group mb-2 border border-blue-200 bg-blue-50"
                      >
                        <div className="flex-1 text-left">
                          <div className="text-sm font-semibold text-blue-600">
                            View All Tests
                          </div>
                          <div className="text-xs mt-0.5 text-blue-500">
                            Explore all available assessments
                          </div>
                        </div>
                      </Link>

                      {/* Divider */}
                      <div className="my-2 border-t border-slate-200"></div>

                      {/* Categories */}
                      <div className="space-y-1">
                        {testCategories.map((category) => {
                          const iconColor = iconColorMap[category.categoryKey];

                          return (
                            <Link key={category.href} href={category.href}>
                              <div className="flex items-start gap-3 px-3 py-3 rounded-lg transition-all duration-150 cursor-pointer hover:bg-slate-50 group">
                                <div
                                  className="flex-shrink-0 mt-0.5"
                                  style={{ color: iconColor }}
                                >
                                  {category.icon}
                                </div>

                                <div className="flex-1 text-left">
                                  <div className="text-sm font-medium text-gray-900">
                                    {category.title}
                                  </div>
                                  <div className="text-xs mt-0.5 text-gray-500">
                                    {category.description}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Auth Buttons / User Menu */}
          <div className="flex items-center gap-3">
            {isLoading ? (
              // Loading state
              <div className="hidden sm:flex items-center gap-2 px-3 py-2">
                <div className="h-8 w-8 rounded-full bg-slate-200 animate-pulse"></div>
              </div>
            ) : isLoggedIn && isSubscribed ? (
              <>
                {/* Dashboard Button - Desktop (For Subscribed Users) */}
                <Link
                  href="/dashboard"
                  className="hidden md:flex items-center gap-2 text-gray-700 font-medium px-5 py-2 rounded-lg border border-slate-300 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                >
                  <BarChart3 size={18} />
                  Dashboard
                </Link>

                {/* Profile Menu - Desktop */}
                <div className="relative hidden sm:block">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                    title="Profile menu"
                  >
                    {profile?.avatar_url ? (
                      <img
                        src={profile.avatar_url}
                        alt={profile.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm">
                        {profile?.name?.[0]?.toUpperCase() || "U"}
                      </div>
                    )}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        showProfileMenu ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Profile Dropdown */}
                  {showProfileMenu && (
                    <div
                      className="absolute right-0 top-full mt-1 rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 w-48"
                      onMouseLeave={() => setShowProfileMenu(false)}
                    >
                      <div className="px-4 py-3 border-b border-slate-200">
                        <div className="text-xs font-medium text-slate-500">
                          Logged in as
                        </div>
                        <div className="text-sm font-medium text-slate-900 truncate">
                          {profile?.name || profile?.email || "User"}
                        </div>
                      </div>
                      <Link
                        href="/dashboard/profile"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-slate-700 hover:text-blue-600"
                      >
                        <User size={16} />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        href="/dashboard"
                        className="md:hidden flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-slate-700 hover:text-blue-600"
                      >
                        <BarChart3 size={16} />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        href="/dashboard/billing"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-slate-700 hover:text-blue-600"
                      >
                        <CreditCard size={16} />
                        <span>Billing</span>
                      </Link>
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-red-600 border-t border-slate-200"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : isLoggedIn && !isSubscribed ? (
              <>
                {/* Get Started Button - For Logged In but Not Subscribed */}
                <Link
                  href="/pricing"
                  className="hidden sm:block text-gray-700 font-medium px-5 py-2 rounded-lg border border-slate-300 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                >
                  View Plans
                </Link>

                {/* Subscribe Button */}
                <Link
                  href="/pricing"
                  className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium px-5 py-2 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-200"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                {/* Sign In Button */}
                <Link
                  href="/auth/login"
                  className="hidden sm:block text-gray-700 font-medium px-5 py-2 rounded-lg border border-slate-300 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                >
                  Sign In
                </Link>

                {/* Sign Up Button */}
                <Link
                  href="/auth/signup"
                  className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium px-5 py-2 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Hamburger Menu Button - Mobile Only */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 hover:text-slate-900"
              aria-label="Toggle menu"
              title="Toggle menu"
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <nav className="md:hidden pb-4 border-t border-slate-200">
            <div className="space-y-1 pt-4">
              {navLinks.map((item) => {
                const isItemActive = item.hasDropdown
                  ? pathname.startsWith("/tests")
                  : isActive(item.href);

                return (
                  <div key={item.label}>
                    {item.hasDropdown ? (
                      <button
                        onClick={() => {
                          router.push("/tests");
                          setShowTestsMenu(!showTestsMenu);
                        }}
                        className={`w-full text-left px-4 py-2 font-medium text-base transition-all duration-200 flex items-center justify-between ${
                          isItemActive
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-600 hover:text-blue-600 hover:bg-slate-50"
                        }`}
                      >
                        Tests
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${showTestsMenu ? "rotate-180" : ""}`}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => {
                          handleNavClick(item.label);
                          setShowMobileMenu(false);
                        }}
                        className={`block px-4 py-2 font-medium text-base transition-all duration-200 ${
                          isItemActive
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-600 hover:text-blue-600 hover:bg-slate-50"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}

                    {/* Mobile Tests Dropdown */}
                    {item.hasDropdown && showTestsMenu && (
                      <div className="bg-slate-50 border-t border-slate-200">
                        {testCategories.map((category) => {
                          const iconColor = iconColorMap[category.categoryKey];

                          return (
                            <Link
                              key={category.href}
                              href={category.href}
                              onClick={() => {
                                setShowMobileMenu(false);
                                setShowTestsMenu(false);
                              }}
                            >
                              <div className="flex items-start gap-3 px-6 py-3 hover:bg-white transition-colors border-b border-slate-200 last:border-b-0">
                                <div
                                  className="flex-shrink-0 mt-0.5"
                                  style={{ color: iconColor }}
                                >
                                  {category.icon}
                                </div>

                                <div className="flex-1 text-left">
                                  <div className="text-sm font-medium text-gray-900">
                                    {category.title}
                                  </div>
                                  <div className="text-xs mt-0.5 text-gray-500">
                                    {category.description}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
