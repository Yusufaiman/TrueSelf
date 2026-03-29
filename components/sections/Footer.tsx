"use client";

import React from "react";

const footerLinks = {
  product: [
    { name: "Features", href: "#" },
    { name: "Pricing", href: "#pricing" },
    { name: "Quizzes", href: "#quizzes" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Contact", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
};

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200/80 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold" style={{ color: "#545454" }}>
              TrueSelf
            </h3>
            <p className="mt-2 text-base" style={{ color: "#8b8b8b" }}>
              Understand your life patterns.
            </p>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 md:col-span-3 gap-8">
            <FooterColumn title="Product" links={footerLinks.product} />
            <FooterColumn title="Company" links={footerLinks.company} />
            <FooterColumn title="Legal" links={footerLinks.legal} />
          </div>
        </div>

        <div className="border-t border-slate-200/80 mt-8 pt-8 text-center">
          <p className="text-sm text-slate-500">
            © 2026 TrueSelf. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

interface FooterColumnProps {
  title: string;
  links: { name: string; href: string }[];
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => (
  <div>
    <h4 className="font-semibold" style={{ color: "#545454" }}>
      {title}
    </h4>
    <ul className="mt-4 space-y-3">
      {links.map((link) => (
        <li key={link.name}>
          <a
            href={link.href}
            className="text-base transition-colors"
            style={{ color: "#8b8b8b" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#545454")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8b8b8b")}
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);
