import React from 'react';

/**
 * Meteors component inspired by 21st.dev / Magic UI.
 * Creates smooth radiant celestial falling streaks across dark containers.
 */
export function Meteors({ number = 16, className = "" }) {
  const meteors = new Array(number).fill(true);
  
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {meteors.map((_, idx) => (
        <span
          key={"meteor" + idx}
          className={`pointer-events-none absolute left-1/2 top-1/2 h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-[9999px] bg-cyan-300 shadow-[0_0_0_1px_#ffffff15] ${className}`}
          style={{
            top: `${(idx * 7) % 95}%`,
            left: `${(idx * 13 + 10) % 90}%`,
            animationDelay: `${(idx * 0.35) % 3.5}s`,
            animationDuration: `${3 + (idx % 4)}s`,
          }}
        >
          <div className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[60px] -translate-y-1/2 bg-gradient-to-r from-cyan-400/80 via-amber-400/40 to-transparent" />
        </span>
      ))}
    </div>
  );
}
