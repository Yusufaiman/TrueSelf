"use client";

import { IdentityType, IDENTITIES } from "./types";

// Image paths are now defined in the IDENTITIES object itself
// This helper component provides the image rendering functionality

interface IdentityImageProps {
  type: IdentityType;
  name: string;
  size?: "small" | "medium" | "large";
}

export function IdentityImage({
  type,
  name,
  size = "medium",
}: IdentityImageProps) {
  const identity = IDENTITIES[type];
  const imagePath = identity?.image || "/assets/identity types/placeholder.jpg";

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="aspect-video rounded-xl overflow-hidden shadow-lg border border-slate-200">
        <img
          src={imagePath}
          alt={name}
          className="w-full h-full object-contain bg-slate-100"
        />
      </div>
    </div>
  );
}
