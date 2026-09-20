import React from 'react';

/**
 * AnimatedShinyText inspired by 21st.dev / Magic UI.
 * Creates an animated gradient sheen sweeping across the text.
 */
export function AnimatedShinyText({
  children,
  className = "",
  shimmerWidth = 100,
}) {
  return (
    <span
      style={{
        "--shimmer-width": `${shimmerWidth}px`,
      }}
      className={`inline-block bg-clip-text text-transparent bg-[linear-gradient(110deg,#94a3b8,45%,#ffffff,55%,#94a3b8)] bg-[length:250%_100%] animate-shiny-text ${className}`}
    >
      {children}
    </span>
  );
}
