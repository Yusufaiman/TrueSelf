import React from "react";

interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  onClick,
}) => {
  const baseStyle = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }[size];

  if (variant === "primary") {
    return (
      <button
        className={`rounded-xl font-medium transition-all duration-200 ease-out inline-flex items-center justify-center whitespace-nowrap text-white hover:shadow-lg active:scale-[0.98] ${baseStyle} ${className}`}
        style={{ backgroundColor: "#4399E6" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#3B82F6";
          e.currentTarget.style.boxShadow = "0 0 30px rgba(67, 153, 230, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#4399E6";
          e.currentTarget.style.boxShadow = "none";
        }}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={`rounded-xl font-medium border transition-all duration-200 ease-out inline-flex items-center justify-center whitespace-nowrap ${baseStyle} ${className}`}
      style={{
        backgroundColor: "#FFFFFF",
        color: "#545454",
        borderColor: "#d1d5db",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#f0feff";
        e.currentTarget.style.borderColor = "#5CE1E6";
        e.currentTarget.style.boxShadow = "0 0 20px rgba(92, 225, 230, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#FFFFFF";
        e.currentTarget.style.borderColor = "#d1d5db";
        e.currentTarget.style.boxShadow = "none";
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
