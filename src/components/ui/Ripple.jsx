import React from 'react';

/**
 * Ripple component inspired by 21st.dev.
 * Renders concentric animated wave rings expanding outwards.
 */
export function Ripple({
  mainCircleSize = 120,
  mainCircleOpacity = 0.24,
  numCircles = 5,
  className = "",
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 select-none [mask-image:radial-gradient(circle_at_center,white,transparent_80%)] ${className}`}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 40;
        const opacity = mainCircleOpacity - i * 0.04;
        const animationDelay = `${i * 0.3}s`;

        return (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/40 bg-cyan-400/5 animate-ripple"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity: Math.max(0, opacity),
              animationDelay,
            }}
          />
        );
      })}
    </div>
  );
}
