import type { TypeCode, TypeFamily } from "./types";

export type TrueSelfTypeColor = {
  accent: string;
  soft: string;
  border: string;
};

export const FAMILY_COLORS: Record<TypeFamily, TrueSelfTypeColor> = {
  NT: { accent: "#2563eb", soft: "#dbeafe", border: "#bfdbfe" },
  NF: { accent: "#db2777", soft: "#fce7f3", border: "#fbcfe8" },
  SJ: { accent: "#0f766e", soft: "#ccfbf1", border: "#99f6e4" },
  SP: { accent: "#ea580c", soft: "#ffedd5", border: "#fed7aa" },
};

export const TYPE_COLORS: Record<TypeCode, TrueSelfTypeColor> = {
  ISTJ: { accent: "#0f766e", soft: "#ccfbf1", border: "#99f6e4" },
  ISFJ: { accent: "#059669", soft: "#dcfce7", border: "#bbf7d0" },
  INFJ: { accent: "#7c3aed", soft: "#ede9fe", border: "#ddd6fe" },
  INTJ: { accent: "#2563eb", soft: "#dbeafe", border: "#bfdbfe" },
  ISTP: { accent: "#475569", soft: "#f1f5f9", border: "#cbd5e1" },
  ISFP: { accent: "#16a34a", soft: "#dcfce7", border: "#bbf7d0" },
  INFP: { accent: "#c026d3", soft: "#fae8ff", border: "#f5d0fe" },
  INTP: { accent: "#4f46e5", soft: "#e0e7ff", border: "#c7d2fe" },
  ESTP: { accent: "#dc2626", soft: "#fee2e2", border: "#fecaca" },
  ESFP: { accent: "#f97316", soft: "#ffedd5", border: "#fed7aa" },
  ENFP: { accent: "#ec4899", soft: "#fce7f3", border: "#fbcfe8" },
  ENTP: { accent: "#0891b2", soft: "#cffafe", border: "#a5f3fc" },
  ESTJ: { accent: "#9333ea", soft: "#f3e8ff", border: "#e9d5ff" },
  ESFJ: { accent: "#e11d48", soft: "#ffe4e6", border: "#fecdd3" },
  ENFJ: { accent: "#0284c7", soft: "#e0f2fe", border: "#bae6fd" },
  ENTJ: { accent: "#1d4ed8", soft: "#dbeafe", border: "#bfdbfe" },
};

export function getTypeColor(typeCode?: string | null): TrueSelfTypeColor {
  if (typeCode && typeCode in TYPE_COLORS) {
    return TYPE_COLORS[typeCode as TypeCode];
  }

  return { accent: "#2563eb", soft: "#dbeafe", border: "#bfdbfe" };
}
