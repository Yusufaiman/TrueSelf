"use client";

import React from "react";
import Image from "next/image";
import { X, Compass } from "lucide-react";

export interface IdentityType {
  id: string;
  name: string;
  tagline: string;
  description: string;
}

interface IdentityModalProps {
  type: IdentityType | null;
  isOpen: boolean;
  onClose: () => void;
}

export function IdentityModal({ type, isOpen, onClose }: IdentityModalProps) {
  if (!isOpen || !type) return null;

  // Convert type name to image filename format (e.g., "The Shifter" -> "the-shifter")
  const imageFileName = type.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      {/* Modal Container */}
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          title="Close modal"
          aria-label="Close modal"
          className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 hover:text-slate-900"
        >
          <X size={24} />
        </button>

        {/* Content with spacing */}
        <div className="pr-8 space-y-8">
          {/* Identity Type Image */}
          <div className="w-full h-64 bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center">
            <Image
              src={`/assets/identity types/${imageFileName}.jpg`}
              alt={type.name}
              width={600}
              height={256}
              priority
              className="w-full h-full object-cover"
            />
          </div>

          {/* Header */}
          <div className="text-center border-b border-slate-200 pb-6">
            <h2 className="text-4xl font-bold text-slate-900 mb-2">
              {type.name}
            </h2>
            <p className="text-blue-600 font-semibold text-lg">
              {type.tagline}
            </p>
          </div>

          {/* Overview Section */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Overview
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              {type.description}
            </p>
          </div>

          {/* Growth Insight Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Compass className="text-blue-500" size={20} />
              Your Growth Path
            </h3>
            <div className="flex gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100/50 transition-colors">
              <p className="text-slate-700 leading-relaxed">
                Understanding your identity type helps you recognize your core
                values, natural tendencies, and how you navigate the world. This
                awareness is the foundation for intentional personal growth and
                meaningful relationships.
              </p>
            </div>
          </div>

          {/* Key Insight Box */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6 space-y-2">
            <p className="text-slate-700 leading-relaxed">
              <span className="font-semibold text-slate-900">Remember:</span>{" "}
              Your identity is not fixed. You can grow, evolve, and develop new
              aspects of yourself over time while honoring who you fundamentally
              are.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
