"use client";

import React from "react";
import { X } from "lucide-react";

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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      {/* Modal Container */}
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-6 md:p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          title="Close modal"
          aria-label="Close modal"
          className="absolute top-6 right-6 md:top-8 md:right-8 p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 hover:text-slate-900"
        >
          <X size={24} />
        </button>

        {/* Content with spacing */}
        <div className="pr-8 space-y-6">
          {/* Image Placeholder */}
          <div className="w-full h-48 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center">
            <span className="text-slate-400 text-sm font-medium">
              Identity Type Visual
            </span>
          </div>

          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              {type.name}
            </h2>
            <p className="text-blue-600 font-semibold text-lg">
              {type.tagline}
            </p>
          </div>

          {/* Description */}
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-slate-700 leading-relaxed text-lg">
              {type.description}
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
            <p className="text-slate-700 leading-relaxed">
              This is your identity type. Understanding where you stand helps
              you navigate your personal growth journey with clarity and
              intention.
            </p>
          </div>

          {/* Footer Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={onClose}
              className="px-8 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:scale-105 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
