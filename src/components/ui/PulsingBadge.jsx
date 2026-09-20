import React from 'react';

/**
 * PulsingBadge component inspired by 21st.dev / Magic UI.
 * Creates a glowing badge with a live pulsating radar indicator.
 */
export function PulsingBadge({ children, variant = 'cyan', className = "" }) {
  const colorMap = {
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25 shadow-[0_0_15px_rgba(6,182,212,0.2)]',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25 shadow-[0_0_15px_rgba(16,185,129,0.2)]',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/25 shadow-[0_0_15px_rgba(245,158,11,0.2)]',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/25 shadow-[0_0_15px_rgba(244,63,94,0.2)]',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/25 shadow-[0_0_15px_rgba(168,85,247,0.2)]',
  };

  const dotMap = {
    cyan: 'bg-cyan-400',
    emerald: 'bg-emerald-400',
    amber: 'bg-amber-400',
    rose: 'bg-rose-400',
    purple: 'bg-purple-400',
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono backdrop-blur-md transition-all ${colorMap[variant] || colorMap.cyan} ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotMap[variant] || dotMap.cyan}`} />
        <span className={`relative inline-flex rounded-full h-2 w-2 ${dotMap[variant] || dotMap.cyan}`} />
      </span>
      {children}
    </div>
  );
}
