"use client";

interface BarChartProps {
  data: Array<{
    label: string;
    value: number;
    color?: string;
  }>;
  height?: number;
  showPercentage?: boolean;
}

/**
 * Horizontal Bar Chart Component
 */
export function BarChart({
  data,
  height = 24,
  showPercentage = true,
}: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 100);

  return (
    <div className="space-y-4">
      {data.map((item, i) => (
        <div key={i} className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              {item.label}
            </label>
            {showPercentage && (
              <span className="text-sm font-semibold text-blue-600">
                {item.value}%
              </span>
            )}
          </div>
          <div className="w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`${item.color || "bg-blue-500"} h-${height === 24 ? "1.5" : "1"} rounded-full transition-all duration-500`}
              style={{
                width: `${(item.value / maxValue) * 100}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
