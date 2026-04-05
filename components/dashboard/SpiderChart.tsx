"use client";

import { useMemo } from "react";

interface DataPoint {
  name: string;
  value: number;
}

interface SpiderChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
}

/**
 * Spider Chart (Radar Chart) Component
 * Displays dimensions in a visual spider/radar format
 */
export function SpiderChart({
  data,
  width = 400,
  height = 400,
}: SpiderChartProps) {
  const padding = 50;
  const radius = Math.min(width, height) / 2 - padding;
  const angleSlice = (Math.PI * 2) / data.length;

  // Calculate points for the polygon
  const points = useMemo(() => {
    return data.map((d, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const r = (d.value / 100) * radius;
      const x = width / 2 + r * Math.cos(angle);
      const y = height / 2 + r * Math.sin(angle);
      return { x, y, angle, value: d.value };
    });
  }, [data, angleSlice, radius, width, height]);

  // Create polygon path
  const polygonPath = useMemo(() => {
    const pathData = points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
      .join(" ");
    return pathData + " Z";
  }, [points]);

  // Create grid circles
  const gridLevels = [25, 50, 75, 100];

  // Calculate axis endpoints
  const axisPoints = data.map((d, i) => {
    const angle = angleSlice * i - Math.PI / 2;
    const x = width / 2 + radius * Math.cos(angle);
    const y = height / 2 + radius * Math.sin(angle);
    return { x, y, angle };
  });

  return (
    <div className="flex justify-center">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* Grid circles */}
        {gridLevels.map((level) => {
          const r = (level / 100) * radius;
          return (
            <circle
              key={`grid-${level}`}
              cx={width / 2}
              cy={height / 2}
              r={r}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="4,4"
            />
          );
        })}

        {/* Grid labels */}
        {gridLevels.map((level) => {
          const r = (level / 100) * radius;
          return (
            <text
              key={`label-${level}`}
              x={width / 2 + 5}
              y={height / 2 - r}
              fontSize="11"
              fill="#9ca3af"
              textAnchor="start"
            >
              {level}
            </text>
          );
        })}

        {/* Axes */}
        {axisPoints.map((p, i) => (
          <line
            key={`axis-${i}`}
            x1={width / 2}
            y1={height / 2}
            x2={p.x}
            y2={p.y}
            stroke="#d1d5db"
            strokeWidth="1"
          />
        ))}

        {/* Polygon (filled) */}
        <path
          d={polygonPath}
          fill="#3b82f6"
          fillOpacity="0.15"
          stroke="#3b82f6"
          strokeWidth="2"
          filter="url(#shadow)"
        />

        {/* Data points */}
        {points.map((p, i) => (
          <circle
            key={`point-${i}`}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="#3b82f6"
            stroke="white"
            strokeWidth="2"
          />
        ))}

        {/* Labels */}
        {data.map((d, i) => {
          const angle = angleSlice * i - Math.PI / 2;
          const labelRadius = radius + 30;
          const x = width / 2 + labelRadius * Math.cos(angle);
          const y = height / 2 + labelRadius * Math.sin(angle);

          return (
            <g key={`label-${i}`}>
              <text
                x={x}
                y={y}
                fontSize="12"
                fontWeight="500"
                fill="#1f2937"
                textAnchor="middle"
                dy="0.3em"
              >
                {d.name.split(" ")[0]}
              </text>
              <text
                x={x}
                y={y + 14}
                fontSize="11"
                fill="#6b7280"
                textAnchor="middle"
                dy="0.3em"
              >
                {d.value}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
