import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RefreshCw, Sparkles } from 'lucide-react';
import { AnimatedShinyText } from './AnimatedShinyText';

/**
 * NeevAI (नींव AI) — Ultra-Trendy Octopii Kinetic Vector Logo
 * Inspired by Daniel Bodea / Kreatank's Octopii (Dribbble shot 26653312).
 * 
 * Aesthetic & Symbolism:
 * - Abstract radial Octopus / Neural-Synapse geometry: 8 interweaving fluid tentacles
 *   symbolizing reaching deep into foundational FLN cognitive layers (literacy, numeracy, logic).
 * - Vivid cyber-organic neon palette: Electric Cyan (#00f5ff), Neon Violet (#8b5cf6), Hot Magenta (#ec4899), Solar Amber (#f59e0b).
 * - Kinetic animation: Staggered tentacle stroke drawing, continuous gentle wave undulation,
 *   pulsing ocular nucleus, and orbital guidance reticles.
 */

// 8 radial angles for the geometric octopus tentacles
const OCTOPII_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

// Master fluid looping tentacle path relative to origin (0, 0)
const TENTACLE_PATH = "M 0,-12 C 0,-30 -14,-46 -28,-46 C -40,-46 -48,-36 -44,-24 C -40,-12 -26,-10 -18,-18 C -12,-24 -14,-32 -20,-34";

export function NeevLogo({ 
  variant = 'hero', 
  showTagline = true,
  lang = 'en',
  className = '',
  onReplay = null
}) {
  const [animationKey, setAnimationKey] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleReplay = (e) => {
    if (e) e.stopPropagation();
    setAnimationKey((prev) => prev + 1);
    if (onReplay) onReplay();
  };

  // =========================================================================
  // 0. COMPACT ICON VARIANT (variant === 'icon' for buttons and drawers)
  // =========================================================================
  if (variant === 'icon') {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="absolute inset-0 bg-cyan-400/30 rounded-full blur-[3px] pointer-events-none animate-pulse" />
        <svg viewBox="0 0 60 60" className="w-full h-full relative z-10 filter drop-shadow-[0_0_10px_rgba(6,182,212,0.9)]">
          <defs>
            <linearGradient id="octoIconGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f5ff" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <linearGradient id="octoIconGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#00f5ff" />
            </linearGradient>
          </defs>
          {/* Subtle Outer Guide Ring */}
          <circle cx="30" cy="30" r="26" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 4" />
          
          {/* 8 Compact Radial Tentacles scaled to 60x60 */}
          <g transform="translate(30, 30) scale(0.42)">
            {OCTOPII_ANGLES.map((angle, idx) => (
              <path
                key={angle}
                d={TENTACLE_PATH}
                fill="none"
                stroke={idx % 2 === 0 ? "url(#octoIconGrad1)" : "url(#octoIconGrad2)"}
                strokeWidth="4.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform={`rotate(${angle})`}
              />
            ))}
            {/* Center Core Nucleus */}
            <circle cx="0" cy="0" r="7" fill="#00f5ff" className="drop-shadow-[0_0_6px_#00f5ff]" />
            <circle cx="0" cy="0" r="3" fill="#ffffff" />
          </g>
        </svg>
      </div>
    );
  }

  // =========================================================================
  // 1. NAVBAR COMPACT EMBLEM VARIANT (variant === 'nav')
  // =========================================================================
  if (variant === 'nav') {
    return (
      <div 
        key={animationKey}
        className={`flex items-center gap-3 select-none group cursor-pointer ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleReplay}
        title={lang === 'hi' ? 'नींव AI — एनिमेशन फिर से चलाएं' : 'NeevAI — Click to replay animation'}
      >
        <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
          <div className="absolute inset-0 bg-cyan-500/25 rounded-full blur-md group-hover:bg-cyan-400/40 group-hover:scale-110 transition-all duration-300 pointer-events-none" />

          <svg viewBox="0 0 60 60" className="w-11 h-11 relative z-10 filter drop-shadow-[0_0_12px_rgba(6,182,212,0.85)]">
            <defs>
              <linearGradient id="octoNavGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f5ff" />
                <stop offset="50%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <linearGradient id="octoNavGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#00f5ff" />
              </linearGradient>
            </defs>

            {/* Rotating Guide Ring */}
            <motion.circle
              cx="30"
              cy="30"
              r="26"
              fill="none"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="1.2"
              strokeDasharray="3 5"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />

            {/* 8 Radial Octopii Tentacles with Rotation & Breathing */}
            <motion.g 
              transform="translate(30, 30) scale(0.42)"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              {OCTOPII_ANGLES.map((angle, idx) => (
                <motion.path
                  key={angle}
                  d={TENTACLE_PATH}
                  fill="none"
                  stroke={idx % 2 === 0 ? "url(#octoNavGrad1)" : "url(#octoNavGrad2)"}
                  strokeWidth="4.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform={`rotate(${angle})`}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: idx * 0.08, ease: "easeOut" }}
                />
              ))}
              
              {/* Luminous Core Orb */}
              <motion.circle 
                cx="0" 
                cy="0" 
                r="7" 
                fill="#00f5ff" 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <circle cx="0" cy="0" r="3" fill="#ffffff" />
            </motion.g>
          </svg>
        </div>

        {/* Brand Name Typography with Custom Octopii Stylized Letter Terminals */}
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-black text-xl tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              Neev
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-amber-500/30 text-cyan-300 border border-cyan-500/40 font-bold shadow-sm">
              AI
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono tracking-tight -mt-0.5">
            {lang === 'hi' ? 'कक्षा FLN निर्णय प्रणाली' : 'FLN Decision System'}
          </span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. HERO SHOWCASE MASTER LOGO VARIANT (variant === 'hero')
  // =========================================================================
  return (
    <div 
      key={animationKey} 
      className={`relative flex flex-col items-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Volumetric Soft Radiant Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-gradient-to-tr from-cyan-500/20 via-violet-600/15 to-amber-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />

      {/* Main Vector Stage with Click-To-Replay */}
      <div 
        onClick={handleReplay}
        className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-center justify-center cursor-pointer group"
        title="NeevAI — Click to replay Octopii logo animation"
      >
        <svg 
          viewBox="0 0 140 140" 
          className="w-full h-full filter drop-shadow-[0_0_35px_rgba(6,182,212,0.85)] transform transition-transform duration-700 group-hover:scale-105"
        >
          <defs>
            {/* Master Octopii Cyan -> Violet -> Fuchsia Gradient */}
            <linearGradient id="octoMasterGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f5ff" />
              <stop offset="30%" stopColor="#38bdf8" />
              <stop offset="65%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>

            {/* Radiant Octopii Amber -> Magenta -> Cyan Gradient */}
            <linearGradient id="octoMasterGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="35%" stopColor="#ec4899" />
              <stop offset="70%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>

            {/* Glowing Core Radial Gradient */}
            <radialGradient id="octoCoreRadial" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#00f5ff" />
              <stop offset="75%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* 1. Precision Corner Brackets [ ] */}
          <g stroke="rgba(56, 189, 248, 0.45)" strokeWidth="1.5" fill="none">
            <path d="M 12,26 L 12,12 L 26,12" />
            <path d="M 114,12 L 128,12 L 128,26" />
            <path d="M 12,114 L 12,128 L 26,128" />
            <path d="M 114,128 L 128,128 L 128,114" />
          </g>

          {/* 2. Outer Precision Optical Guide Ring (Clockwise Rotation) */}
          <motion.circle
            cx="70"
            cy="70"
            r="62"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            animate={{ rotate: 360 }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          />

          {/* 3. Middle Concentric Alignment Ring (Counter-Clockwise Rotation) */}
          <motion.circle
            cx="70"
            cy="70"
            r="54"
            fill="none"
            stroke="rgba(6, 182, 212, 0.3)"
            strokeWidth="1"
            strokeDasharray="2 8"
            animate={{ rotate: -360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          />

          {/* 4. THE OCTOPII RADIAL KINETIC MANDALA (8 Interweaving Fluid Tentacles) */}
          <motion.g
            transform="translate(70, 70)"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.03, 1] 
            }}
            transition={{ 
              rotate: { duration: 50, repeat: Infinity, ease: "linear" },
              scale: { duration: 3.6, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            {OCTOPII_ANGLES.map((angle, idx) => (
              <g key={angle} transform={`rotate(${angle})`}>
                {/* Fluid Tentacle Ribbon with Staggered Kinetic Path Drawing */}
                <motion.path
                  d={TENTACLE_PATH}
                  fill="none"
                  stroke={idx % 2 === 0 ? "url(#octoMasterGrad1)" : "url(#octoMasterGrad2)"}
                  strokeWidth="3.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ 
                    duration: 1.4, 
                    delay: 0.15 + idx * 0.08, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                />

                {/* Suction Disc Glowing Orb at Loop Terminal */}
                <motion.circle
                  cx="-20"
                  cy="-34"
                  r="3.2"
                  fill={idx % 2 === 0 ? "#00f5ff" : "#f59e0b"}
                  className="filter drop-shadow-[0_0_6px_#00f5ff]"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.4, 1] }}
                  transition={{ delay: 0.8 + idx * 0.08, duration: 0.5 }}
                />
              </g>
            ))}

            {/* 5. Center Ocular Aperture & Starburst Nucleus */}
            {/* Ambient Core Glow */}
            <circle cx="0" cy="0" r="16" fill="url(#octoCoreRadial)" opacity="0.6" />
            
            {/* Core Reticle Ring */}
            <circle cx="0" cy="0" r="11" fill="#050816" stroke="#00f5ff" strokeWidth="2.2" />
            <motion.circle
              cx="0"
              cy="0"
              r="6.5"
              fill="#00f5ff"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <circle cx="0" cy="0" r="2.5" fill="#ffffff" />

            {/* Starburst Lens Flare */}
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.4, 0], opacity: [0, 1, 0] }}
              transition={{ delay: 1.6, duration: 0.9, repeat: Infinity, repeatDelay: 4 }}
            >
              <path d="M 0,-10 L 2.2,-2.2 L 10,0 L 2.2,2.2 L 0,10 L -2.2,2.2 L -10,0 L -2.2,-2.2 Z" fill="#ffffff" />
            </motion.g>
          </motion.g>

          {/* 6. Orbiting Celestial Photon Comets */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            style={{ originX: '70px', originY: '70px' }}
          >
            <circle cx="70" cy="16" r="3.2" fill="#00f5ff" className="drop-shadow-[0_0_8px_#00f5ff]" />
            <circle cx="70" cy="124" r="2.6" fill="#f59e0b" className="drop-shadow-[0_0_8px_#f59e0b]" />
          </motion.g>
        </svg>

        {/* Hover Hint */}
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-2 px-3 py-1 rounded-full bg-slate-950/90 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 backdrop-blur-md shadow-lg"
          >
            <span>Click to Replay Kinetic Animation</span>
          </motion.div>
        )}
      </div>

      {/* Brand Title & Fluid Typography */}
      <motion.div
        className="text-center mt-2 flex flex-col items-center"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-slate-200 drop-shadow-2xl">
            {lang === 'hi' ? 'नींव AI' : 'NeevAI'}
          </h1>
          <span className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-amber-500/20 border border-cyan-400/40 text-cyan-300 text-xs sm:text-sm font-mono font-extrabold tracking-wider shadow-lg">
            FLN 2.0
          </span>
        </div>

        <p className="text-xs sm:text-sm font-mono text-cyan-400 font-semibold tracking-wider uppercase mt-2">
          {lang === 'hi' 
            ? 'बुनियादी साक्षरता एवं संख्याज्ञान • नैदानिक निर्णय प्रणाली' 
            : 'Foundational Intelligence • Precision Diagnostic System'}
        </p>
      </motion.div>

      {/* Project Motto */}
      {showTagline && (
        <motion.div
          className="mt-4 text-center max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <div className="inline-block px-5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 shadow-xl backdrop-blur-xl">
            <AnimatedShinyText className="text-xs sm:text-sm font-semibold font-body tracking-wide text-amber-200">
              {lang === 'hi' 
                ? '“कमी को पहचानें। बच्चे को समझें। सही कदम उठाएं।”'
                : '“See the Gap. Understand the Child. Take Action.”'}
            </AnimatedShinyText>
          </div>
        </motion.div>
      )}

      {/* Explicit Replay Control Button */}
      <motion.div
        className="mt-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <button
          onClick={handleReplay}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white text-xs font-mono transition-all shadow-md hover:shadow-cyan-500/20 active:scale-95 cursor-pointer group"
          title="Click to trigger logo animation from the start"
        >
          <Play className="w-3 h-3 text-amber-400 fill-amber-400/40 group-hover:scale-110 transition-transform" />
          <span>{lang === 'hi' ? 'लोगो एनिमेशन फिर से चलाएं' : 'Run Logo Animation'}</span>
          <RefreshCw className="w-3 h-3 text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
        </button>
      </motion.div>
    </div>
  );
}

// Export both names for backwards compatibility
export const ElisaLogo = NeevLogo;
export default NeevLogo;
