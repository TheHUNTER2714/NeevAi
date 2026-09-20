import React from 'react';

/**
 * ShimmerButton inspired by 21st.dev.
 * Button with an animated glowing conic gradient border that spins continuously.
 */
export function ShimmerButton({
  children,
  className = "",
  shimmerColor = "#38bdf8",
  shimmerSize = "0.08em",
  borderRadius = "12px",
  shimmerDuration = "3s",
  background = "rgba(10, 16, 30, 0.9)",
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      style={{
        borderRadius,
      }}
      className={`group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden p-[1px] font-semibold transition-all duration-300 active:scale-95 ${className}`}
    >
      {/* Rotating conic gradient beam */}
      <div
        className="absolute inset-0 z-[-1] animate-spin-slow"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, ${shimmerColor} 60deg, transparent 120deg)`,
        }}
      />

      {/* Inner glass button body */}
      <div
        style={{
          borderRadius: `calc(${borderRadius} - 1px)`,
          background,
        }}
        className="relative z-10 flex h-full w-full items-center justify-center px-4 py-2 text-xs font-semibold text-slate-100 backdrop-blur-xl transition-colors group-hover:bg-slate-900/70"
      >
        {children}
      </div>
    </button>
  );
}
