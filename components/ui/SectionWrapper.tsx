import React from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  className = "",
  id,
}) => {
  return (
    <section
      id={id}
      className={`w-full px-6 md:px-8 lg:px-10 py-20 md:py-24 ${className}`}
    >
      {children}
    </section>
  );
};
