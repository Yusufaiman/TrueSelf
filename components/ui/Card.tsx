import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  style = {},
}) => {
  const [hovering, setHovering] = React.useState(false);

  return (
    <div
      className={`rounded-2xl bg-white p-6 transition-all duration-200 ease-out ${className}`}
      style={{
        borderColor: hovering ? "#5CE1E6" : "#e5e7eb",
        borderWidth: "1px",
        boxShadow: hovering
          ? "0 10px 25px rgba(0,0,0,0.1)"
          : "0 1px 3px rgba(0,0,0,0.05)",
        transform: hovering ? "translateY(-6px)" : "translateY(0)",
        ...style,
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {children}
    </div>
  );
};
