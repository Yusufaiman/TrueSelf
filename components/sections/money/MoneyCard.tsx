import React from "react";
import { MoneyType } from "@/lib/personality-engine/money-types";

interface MoneyCardProps {
  type: MoneyType;
  onViewDetails: (type: MoneyType) => void;
}

const MoneyCard: React.FC<MoneyCardProps> = ({ type, onViewDetails }) => {
  return (
    <div className="group flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:border-green-300 hover:shadow-lg hover:shadow-green-500/10 hover:text-green-600">
      {/* Placeholder Image */}
      <div className="w-full aspect-video rounded-md bg-slate-100 border border-slate-200 transition-colors duration-300 group-hover:bg-green-50" />

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2">
        {/* Title */}
        <h3 className="font-bold text-left text-slate-900 group-hover:text-green-600 transition-colors duration-300">
          {type.name}
        </h3>

        {/* Tagline */}
        <p className="text-sm text-green-600 font-medium">{type.tagline}</p>

        {/* Description */}
        <p className="text-sm text-slate-600 text-left line-clamp-2 flex-grow">
          {type.shortDesc}
        </p>
      </div>

      {/* View Details Button */}
      <button
        onClick={() => onViewDetails(type)}
        className="w-full rounded-md bg-linear-to-r from-green-600 to-emerald-600 py-2 px-4 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 active:scale-95"
      >
        View Details
      </button>
    </div>
  );
};

export default MoneyCard;
