"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";
import { categoryThemes, type CategoryKey } from "@/config/categoryTheme";

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
  const pathname = usePathname();

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

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {/* Sign In Button */}
            <button className="hidden sm:block text-gray-700 font-medium px-5 py-2 rounded-lg border border-slate-300 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">
              Sign In
            </button>

            {/* Sign Up Button */}
            <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium px-5 py-2 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-200">
              Sign Up
            </button>

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
                        onClick={() => setShowTestsMenu(!showTestsMenu)}
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
