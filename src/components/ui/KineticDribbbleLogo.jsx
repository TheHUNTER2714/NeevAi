import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Sparkles } from 'lucide-react';

/**
 * KineticDribbbleLogo — Faithful Recreation of Dribbble Video Animation
 * Reference: https://cdn.dribbble.com/userupload/48374745/file/9bcf199737e734e7f6d0f405fe50cc4a.mp4
 *
 * Visual Stages:
 * 0.0s - 0.8s: Solid deep royal violet background. Minimal geometric corner shape emerges in center.
 * 0.6s - 1.8s: Architectural crosshair lines (horizontal & vertical) shoot across the viewport.
 *              Top-left lilac quadrant accent appears with precise negative-space curved cuts.
 * 1.8s - 2.4s: Crosshair alignment lines cleanly retract into the emblem.
 * 2.4s - 3.2s: Geometric 4-point sparkle emblem glides left with smooth spring physics.
 * 2.6s - 3.6s: Adjacent brand typography ("NEEV AI") reveals with a clean masked slide-in wipe.
 * 3.6s+: Settled lockup with interactive replay trigger.
 */
export function KineticDribbbleLogo({
  lang = 'en',
  autoplay = true,
  onComplete = null,
  showControls = true,
  className = ''
}) {
  const [key, setKey] = useState(0);
  const [phase, setPhase] = useState(0); // 0: start, 1: crosshairs & expand, 2: retract, 3: slide & text, 4: settled

  const isHi = lang === 'hi';

  const handleReplay = (e) => {
    if (e) e.stopPropagation();
    setKey((prev) => prev + 1);
    setPhase(0);
  };

  useEffect(() => {
    // Stage choreography timeline matching the reference video (0 to 3.8s)
    const t1 = setTimeout(() => setPhase(1), 500);   // Crosshairs & quadrant
    const t2 = setTimeout(() => setPhase(2), 1700);  // Crosshairs retract
    const t3 = setTimeout(() => setPhase(3), 2300);  // Emblem slides left, text reveals
    const t4 = setTimeout(() => {
      setPhase(4);
      if (onComplete) onComplete();
    }, 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [key, onComplete]);

  return (
    <div 
      key={key}
      onClick={handleReplay}
      className={`relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center select-none cursor-pointer group ${className}`}
      title={isHi ? 'एनिमेशन फिर से चलाने के लिए क्लिक करें' : 'Click anywhere to replay animation'}
    >
      {/* ========================================================================= */}
      {/* 1. CINEMATIC ROYAL VIOLET AMBIENT STAGE (Matching Dribbble Video)          */}
      {/* ========================================================================= */}
      <div className="relative w-full min-h-[380px] sm:min-h-[440px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#2f0857] via-[#20053e] to-[#140227] border border-violet-500/25 shadow-[0_0_60px_rgba(76,29,149,0.45)] flex items-center justify-center p-6 sm:p-12">
        
        {/* Soft Volumetric Radiant Violet & Cyan Backlight */}
        <div className="absolute inset-0 bg-radial from-violet-600/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

        {/* ======================================================================= */}
        {/* 2. ARCHITECTURAL ALIGNMENT CROSSHAIR LINES (Phase 1 to 2)              */}
        {/* ======================================================================= */}
        <AnimatePresence>
          {phase >= 1 && phase < 3 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 pointer-events-none flex items-center justify-center z-10"
            >
              {/* Full Horizontal Hairline Coordinate Line */}
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-full h-[1px] bg-white/40 shadow-[0_0_8px_rgba(255,255,255,0.4)]"
              />

              {/* Full Vertical Hairline Coordinate Line */}
              <motion.div 
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0, opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute h-full w-[1px] bg-white/40 shadow-[0_0_8px_rgba(255,255,255,0.4)]"
              />

              {/* Technical Calibration Tick Marks along crosshairs */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Horizontal ticks */}
                {[-180, -120, -60, 60, 120, 180].map((offset) => (
                  <motion.div 
                    key={`h-tick-${offset}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    className="absolute w-[1px] h-3 bg-white/50"
                    style={{ transform: `translateX(${offset}px)` }}
                  />
                ))}

                {/* Vertical ticks */}
                {[-140, -80, 80, 140].map((offset) => (
                  <motion.div 
                    key={`v-tick-${offset}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    className="absolute h-[1px] w-3 bg-white/50"
                    style={{ transform: `translateY(${offset}px)` }}
                  />
                ))}

                {/* Corner Technical Crosses */}
                <div className="absolute top-8 left-8 text-[10px] font-mono text-violet-300/60 font-semibold tracking-widest">
                  FLN_GRID // 01
                </div>
                <div className="absolute bottom-8 right-8 text-[10px] font-mono text-cyan-300/60 font-semibold tracking-widest">
                  SYS_LOCK :: 52° 27′
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ======================================================================= */}
        {/* 3. LOGO MARK & BRAND LOCKUP (Slide left + masked typography reveal)    */}
        {/* ======================================================================= */}
        <div className="relative z-20 flex items-center justify-center">
          
          {/* Main Container: glides left during Phase 3 & 4 */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ 
              x: phase >= 3 ? (window.innerWidth < 640 ? -50 : -90) : 0 
            }}
            transition={{ 
              duration: 0.85, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="flex items-center"
          >
            
            {/* The Geometric 4-Point Sparkle Logo Vector Mark */}
            <motion.div
              initial={{ scale: 0, rotate: -45, opacity: 0 }}
              animate={{ 
                scale: 1, 
                rotate: 0, 
                opacity: 1 
              }}
              transition={{ 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center shrink-0 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.7)]"
            >
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full"
              >
                <defs>
                  {/* Subtle Linear Gradients */}
                  <linearGradient id="dribbbleWhiteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#f8fafc" />
                  </linearGradient>
                  <linearGradient id="dribbbleLilacGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>

                {/* --- Top-Left Lilac Accent Quadrant Block (Matching Frame 00:02 of video) --- */}
                <motion.path
                  d="M 16,16 L 36,16 C 36,27 27,36 16,36 Z"
                  fill="url(#dribbbleLilacGrad)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: phase >= 1 ? 1 : 0, 
                    opacity: phase >= 1 ? 1 : 0 
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* --- The Master Geometric Sparkle / Modular Star --- */}
                {/* 
                  Formed by two opposing curved corner wedges with negative-space arcs 
                  as seen in Dribbble reference video (Kreatank / Daniel Bodea style):
                  - Upper-Left Wedge: starts from (50, 16), curves inward to (50, 50), curves outward to (16, 50).
                  - Lower-Right Wedge: starts from (50, 84), curves inward to (50, 50), curves outward to (84, 50).
                */}
                <motion.g
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {/* Primary 4-Point Geometric Sparkle / Compass Mark */}
                  <path
                    d="M 50,14 
                       C 50,34 34,50 14,50 
                       C 34,50 50,66 50,86 
                       C 50,66 66,50 86,50 
                       C 66,50 50,34 50,14 Z"
                    fill="url(#dribbbleWhiteGrad)"
                  />

                  {/* Opposing Organic Cutaway Accent for modular depth */}
                  <path
                    d="M 50,14 C 50,34 34,50 14,50 L 14,14 Z"
                    fill="#ffffff"
                    opacity={phase >= 2 ? 0 : 0.25}
                    className="transition-opacity duration-500"
                  />

                  {/* Luminous Center Point */}
                  <circle cx="50" cy="50" r="2.5" fill="#2e0854" />
                </motion.g>
              </svg>
            </motion.div>

            {/* =================================================================== */}
            {/* 4. BRAND NAME & TYPOGRAPHY WIPE REVEAL (Matching Frame 00:04)        */}
            {/* =================================================================== */}
            <motion.div
              initial={{ opacity: 0, x: -20, clipPath: 'inset(0% 100% 0% 0%)' }}
              animate={{
                opacity: phase >= 3 ? 1 : 0,
                x: phase >= 3 ? 0 : -20,
                clipPath: phase >= 3 ? 'inset(0% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)'
              }}
              transition={{
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1
              }}
              className="ml-4 sm:ml-6 flex flex-col text-left overflow-hidden"
            >
              {/* Bold Title "NEEV AI" / "NeevAI" matching typography style of video */}
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-white uppercase drop-shadow-lg">
                  {isHi ? 'नींव' : 'NEEV'}
                </span>
                <span className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-cyan-200 to-white uppercase">
                  AI
                </span>
              </div>

              {/* Clean Monospace Subtitle / Mission Tagline */}
              <motion.div 
                initial={{ opacity: 0, y: 8 }}
                animate={{ 
                  opacity: phase >= 3 ? 1 : 0, 
                  y: phase >= 3 ? 0 : 8 
                }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-1 flex flex-col"
              >
                <span className="text-[10px] sm:text-xs md:text-sm font-mono font-semibold tracking-widest text-violet-200/90 uppercase">
                  {isHi 
                    ? 'बुनियादी साक्षरता एवं संख्याज्ञान निर्णय प्रणाली' 
                    : 'FLN Precision Decision System'}
                </span>
                <span className="text-[9px] sm:text-[11px] font-mono text-cyan-400 font-medium tracking-wide mt-0.5">
                  CBSE FLN • Pratham ASER • J-PAL Validated
                </span>
              </motion.div>
            </motion.div>

          </motion.div>

        </div>

        {/* Replay Hint Pill at bottom */}
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 4 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-4 sm:bottom-6 flex items-center gap-2"
          >
            <button
              onClick={handleReplay}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-mono transition-all backdrop-blur-md shadow-lg active:scale-95 group/btn"
              title="Replay Logo Animation"
            >
              <RotateCcw className="w-3.5 h-3.5 text-violet-300 group-hover/btn:-rotate-90 transition-transform duration-300" />
              <span>{isHi ? 'एनिमेशन फिर से चलाएं' : 'Replay Logo Animation'}</span>
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
}

export default KineticDribbbleLogo;
