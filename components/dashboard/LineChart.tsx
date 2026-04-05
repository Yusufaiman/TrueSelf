"use client";

interface LineChartProps {
  data: Array<{
    date: string;
    value: number;
    label?: string;
  }>;
  height?: number;
  color?: string;
}

/**
 * Line Chart Component for progression tracking
 */
export function LineChart({
  data,
  height = 300,
  color = "#3b82f6",
}: LineChartProps) {
  if (data.length < 2) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">Not enough data points to display</p>
      </div>
    );
  }

  const padding = { top: 20, right: 20, bottom: 40, left: 40 };
  const width = 600;
  const chartHeight = height;

  const values = data.map((d) => d.value);
  const minValue = Math.min(...values, 0);
  const maxValue = Math.max(...values, 100);
  const valueRange = maxValue - minValue || 1;

  const chartWidth = width - padding.left - padding.right;
  const chartAreaHeight = chartHeight - padding.top - padding.bottom;

  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1)) * chartWidth;
    const y =
      padding.top +
      chartAreaHeight -
      ((d.value - minValue) / valueRange) * chartAreaHeight;
    return { x, y, value: d.value, date: d.date };
  });

  const pathData = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <div className="w-full overflow-x-auto">
      <svg
        width={width}
        height={chartHeight}
        viewBox={`0 0 ${width} ${chartHeight}`}
        className="mx-auto"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((gridValue) => {
          if (gridValue < minValue || gridValue > maxValue) return null;
          const y =
            padding.top +
            chartAreaHeight -
            ((gridValue - minValue) / valueRange) * chartAreaHeight;
          return (
            <g key={`grid-${gridValue}`}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="4,4"
              />
              <text
                x={padding.left - 10}
                y={y}
                fontSize="11"
                fill="#9ca3af"
                textAnchor="end"
                dy="0.3em"
              >
                {gridValue}
              </text>
            </g>
          );
        })}

        {/* Y Axis */}
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={chartHeight - padding.bottom}
          stroke="#d1d5db"
          strokeWidth="1"
        />

        {/* X Axis */}
        <line
          x1={padding.left}
          y1={chartHeight - padding.bottom}
          x2={width - padding.right}
          y2={chartHeight - padding.bottom}
          stroke="#d1d5db"
          strokeWidth="1"
        />

        {/* Area under line */}
        <path
          d={
            pathData +
            ` L ${points[points.length - 1].x} ${chartHeight - padding.bottom} L ${points[0].x} ${chartHeight - padding.bottom} Z`
          }
          fill="url(#lineGradient)"
        />

        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Points */}
        {points.map((p, i) => (
          <circle
            key={`point-${i}`}
            cx={p.x}
            cy={p.y}
            r="3.5"
            fill={color}
            stroke="white"
            strokeWidth="2"
          />
        ))}

        {/* X-axis labels */}
        {points
          .filter(
            (_, i) =>
              i === 0 ||
              i === points.length - 1 ||
              i % Math.ceil(points.length / 5) === 0,
          )
          .map((p, i) => (
            <text
              key={`label-${i}`}
              x={p.x}
              y={chartHeight - padding.bottom + 20}
              fontSize="11"
              fill="#6b7280"
              textAnchor="middle"
            >
              {p.date}
            </text>
          ))}
      </svg>
    </div>
  );
}
