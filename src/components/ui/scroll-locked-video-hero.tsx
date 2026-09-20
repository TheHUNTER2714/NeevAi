"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Sparkles, 
  Compass, 
  LayoutDashboard, 
  GraduationCap,
  Brain,
  Play,
  Pause,
  RotateCcw,
  ChevronRight
} from "lucide-react";
import { KineticDribbbleLogo } from "./KineticDribbbleLogo";

export interface ScrollLockedVideoHeroProps {
  onEnterOverview?: () => void;
  onExploreCockpit?: () => void;
  onTryAssessment?: () => void;
  lang?: string;
}

/**
 * ScrollLockedVideoHero (21st.dev @gughigug/scroll-locked-video-hero)
 * 
 * High-Impact Full-Screen Cinematic Intro Experience for NeevAI:
 * - Ultra-trendy Octopii-inspired kinetic vector logo & fluid multi-tentacle animation
 * - Zero bottom empty space (fixed viewport container, perfectly fitted)
 * - Auto-advances through 3 cinematic stages (~9.5s total) and automatically transitions to Overview
 * - Full user controls: instant "Skip to Overview", interactive stage scrubbers, pause/resume
 */
export function ScrollLockedVideoHero({
  onEnterOverview,
  onExploreCockpit,
  onTryAssessment,
  lang = "en",
}: ScrollLockedVideoHeroProps) {
  const isHi = lang === "hi";

  // Active stage (1: Logo, 2: Reality, 3: Action)
  const [stage, setStage] = useState<1 | 2 | 3>(1);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [isPaused, setIsPaused] = useState(false);
  const [hasAutoTransitioned, setHasAutoTransitioned] = useState(false);

  // Total intro sequence duration in milliseconds (approx 9.6 seconds total)
  const TOTAL_DURATION = 9600;
  const TICK_INTERVAL = 50;

  // Auto-progression timer
  useEffect(() => {
    if (isPaused || hasAutoTransitioned) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (TICK_INTERVAL / TOTAL_DURATION) * 100;
        if (next >= 100) {
          clearInterval(interval);
          setHasAutoTransitioned(true);
          if (onEnterOverview) {
            onEnterOverview();
          }
          return 100;
        }

        // Determine current stage based on progress
        if (next < 33) {
          setStage(1);
        } else if (next < 68) {
          setStage(2);
        } else {
          setStage(3);
        }

        return next;
      });
    }, TICK_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused, hasAutoTransitioned, onEnterOverview]);

  // Jump directly to a stage
  const jumpToStage = (targetStage: 1 | 2 | 3) => {
    setStage(targetStage);
    if (targetStage === 1) setProgress(5);
    if (targetStage === 2) setProgress(40);
    if (targetStage === 3) setProgress(75);
  };

  // Wheel listener to allow smooth navigation via mouse wheel or touchpad
  const lastWheelTime = useRef(0);
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 450) return; // Debounce wheel
    lastWheelTime.current = now;

    if (e.deltaY > 25) {
      // Wheel down: advance
      if (stage === 1) jumpToStage(2);
      else if (stage === 2) jumpToStage(3);
      else if (stage === 3 && onEnterOverview) {
        onEnterOverview();
      }
    } else if (e.deltaY < -25) {
      // Wheel up: rewind
      if (stage === 3) jumpToStage(2);
      else if (stage === 2) jumpToStage(1);
    }
  };

  // Video background scaling based on overall progress
  const videoScale = 1 + (progress / 100) * 0.18;

  // Calculate seconds remaining until auto-transition
  const secondsRemaining = Math.max(1, Math.ceil(((100 - progress) / 100) * (TOTAL_DURATION / 1000)));

  return (
    <div 
      onWheel={handleWheel}
      className="relative w-full h-[100dvh] overflow-hidden flex flex-col justify-between bg-black text-slate-100 selection:bg-cyan-500 selection:text-white select-none"
    >
      {/* ========================================================================= */}
      {/* CINEMATIC BACKGROUND VIDEO & ATMOSPHERIC VIGNETTES                         */}
      {/* ========================================================================= */}
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        style={{ scale: videoScale }}
        className="absolute inset-0 h-full w-full object-cover filter contrast-[1.12] transition-transform duration-300 pointer-events-none"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
      />

      {/* Dynamic Deep Dark Vignette Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/50 to-black/90" />
      <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-black/40 to-black/95" />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-overlay" />

      {/* Top Auto-Play Linear Progress Indicator */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-40">
        <motion.div 
          className="h-full bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400 shadow-[0_0_8px_#00f5ff]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ========================================================================= */}
      {/* TOP HEADER HUD                                                            */}
      {/* ========================================================================= */}
      <header className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 flex items-center justify-between">
        {/* Status Pill & Auto-Advance Countdown */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-white/15 backdrop-blur-xl shadow-lg">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-mono font-semibold text-slate-200">
              {isHi ? "नींव AI • प्रारंभिक परिचय" : "NeevAI • Intro Showcase"}
            </span>
          </div>

          {/* Pause / Play Control */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all backdrop-blur-md"
            title={isPaused ? "Resume Auto-Play" : "Pause Auto-Play"}
          >
            {isPaused ? (
              <>
                <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                <span className="hidden sm:inline">{isHi ? "चलाएं" : "Resume"}</span>
              </>
            ) : (
              <>
                <Pause className="w-3 h-3 text-amber-400" />
                <span className="hidden sm:inline">{isHi ? "रोकें" : "Pause"}</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Skip to Overview Button */}
        <div className="flex items-center gap-2">
          <span className="hidden md:inline text-[11px] font-mono text-slate-400">
            {isHi ? `${secondsRemaining}s में अवलोकन स्वतः खुलेगा` : `Auto-entering Overview in ${secondsRemaining}s`}
          </span>

          <button
            onClick={onEnterOverview}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 hover:border-cyan-400 text-xs font-semibold text-cyan-300 hover:text-white transition-all shadow-md active:scale-95 cursor-pointer backdrop-blur-xl"
            title="Skip directly to Overview"
          >
            <span>{isHi ? "सीधे अवलोकन पर जाएं" : "Skip to Overview"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN STAGE CONTENT (ANIMATED STAGES 1, 2, 3)                               */}
      {/* ========================================================================= */}
      <main className="relative z-20 flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-center text-center">
        <AnimatePresence mode="wait">
          {/* ------------------------------------------------------------------- */}
          {/* STAGE 1: KINETIC LOGO REVELATION & BRAND IDENTITY                    */}
          {/* ------------------------------------------------------------------- */}
          {stage === 1 && (
            <motion.div
              key="stage-1"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -20 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center p-2 w-full"
            >
              {/* Master Kinetic Dribbble Vector Logo */}
              <div className="mb-2 w-full max-w-xl flex justify-center">
                <KineticDribbbleLogo 
                  lang={lang} 
                  showControls={true} 
                  className="w-full"
                />
              </div>

              {/* Progress Hint */}
              <div className="mt-4 flex items-center gap-2 text-xs font-mono text-cyan-400/80 bg-slate-950/60 px-4 py-1 rounded-full border border-cyan-500/20 backdrop-blur-md">
                <span>{isHi ? "कक्षा की वास्तविकता देखने के लिए आगे बढ़ें" : "Unfolding classroom cognitive roots..."}</span>
                <button 
                  onClick={() => jumpToStage(2)}
                  className="text-white hover:text-cyan-300 underline font-bold flex items-center gap-0.5 ml-1"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ------------------------------------------------------------------- */}
          {/* STAGE 2: THE COGNITIVE REALITY OF THE CLASSROOM (J-PAL & ASER)       */}
          {/* ------------------------------------------------------------------- */}
          {stage === 2 && (
            <motion.div
              key="stage-2"
              initial={{ opacity: 0, scale: 0.92, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -25 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center justify-center p-2"
            >
              <div className="max-w-3xl glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl backdrop-blur-2xl text-center">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-mono font-bold mb-3">
                  <Brain className="w-3.5 h-3.5" />
                  <span>{isHi ? "जे-पाल एवं प्रथम ASER राष्ट्रीय शोध" : "J-PAL & Pratham ASER Ground Reality"}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-display tracking-tight text-white leading-tight mb-3">
                  {isHi 
                    ? "पाठ्यक्रम कक्षा 3 मानता है। सच्चाई 5 अलग स्तर छिपाए रखती है।" 
                    : "The Syllabus Assumes Grade 3. Reality Conceals 5 Distinct Levels."}
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 font-body leading-relaxed mb-6 max-w-2xl mx-auto">
                  {isHi
                    ? "जब शिक्षक पूरी कक्षा को एक समान गति से पढ़ाते हैं, तो बुनियादी कमियों वाले बच्चे स्थायी रूप से पीछे छूट जाते हैं। नींव AI अंकों के बजाय सोच की मूल भ्रांति को उजागर करता है।"
                    : "When a primary educator teaches the textbook at a uniform pace, children with fundamental misconceptions fall permanently behind. NeevAI transforms invisible learning gaps into precision interventions."}
                </p>

                {/* 3 Diagnostic Insight Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                  <div className="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-500/40 shadow-inner">
                    <span className="text-[10px] font-mono text-rose-300 font-bold uppercase tracking-wider block">Critical Support</span>
                    <span className="text-xs font-bold text-white block mt-1">Grade 1.2 Level</span>
                    <span className="text-[11px] text-slate-300 mt-1 block">Independent digit subtraction bug (52 - 27 = 35)</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-amber-950/60 border border-amber-500/40 shadow-inner">
                    <span className="text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider block">Regrouping Needed</span>
                    <span className="text-xs font-bold text-white block mt-1">Grade 2.1 Level</span>
                    <span className="text-[11px] text-slate-300 mt-1 block">Letter-by-letter reading pause & phonics lag</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 shadow-inner">
                    <span className="text-[10px] font-mono text-emerald-300 font-bold uppercase tracking-wider block">On-Track Fluency</span>
                    <span className="text-xs font-bold text-white block mt-1">Grade 3.0+ Mastery</span>
                    <span className="text-[11px] text-slate-300 mt-1 block">Ready for curriculum acceleration & word problems</span>
                  </div>
                </div>
              </div>

              {/* Advance CTA */}
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => jumpToStage(1)}
                  className="text-xs text-slate-400 hover:text-white font-mono px-3 py-1 rounded-full bg-slate-900/60 border border-white/10"
                >
                  ← {isHi ? "लोगो देखें" : "Back to Logo"}
                </button>
                <button
                  onClick={() => jumpToStage(3)}
                  className="text-xs text-cyan-300 hover:text-cyan-200 font-mono px-4 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 flex items-center gap-1 font-bold"
                >
                  <span>{isHi ? "कार्यवाही पोर्टल पर जाएं" : "Action Portal"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ------------------------------------------------------------------- */}
          {/* STAGE 3: ACTION PORTAL & TRANSITION COUNTDOWN                        */}
          {/* ------------------------------------------------------------------- */}
          {stage === 3 && (
            <motion.div
              key="stage-3"
              initial={{ opacity: 0, scale: 0.92, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -25 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center justify-center p-2"
            >
              <div className="max-w-3xl glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl backdrop-blur-2xl text-center">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isHi ? "नींव AI • शिक्षक सशक्तीकरण पोर्टल" : "NeevAI • Foundational Decision Engine"}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-display tracking-tight text-white leading-tight mb-2">
                  {isHi ? "सटीक निदान से 15-मिनट की दैनिक कार्यवाही" : "From Diagnosis to 15-Min Daily Action"}
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 font-body leading-relaxed mb-6 max-w-xl mx-auto">
                  {isHi
                    ? "शून्य-लागत ठोस सामग्री (माचिस तीलियां और सिक्के), अनुकूलित TaRL समूह और एआई सहायक के साथ कक्षा में प्रवेश करें।"
                    : "Equipping elementary teachers with zero-cost concrete manipulatives, adaptive TaRL groups, and AI assistance for every child."}
                </p>

                {/* Main Overview Entry Button with Glowing Rings */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={onEnterOverview}
                    className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400 py-2.5 pl-7 pr-2.5 text-base font-bold text-slate-950 transition-all hover:shadow-2xl hover:shadow-cyan-500/50 cursor-pointer active:scale-95 animate-pulse"
                  >
                    <span>{isHi ? "मुख्य अवलोकन पृष्ठ खोलें" : "Enter Overview Storyline"}</span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 transition-transform group-hover:scale-110">
                      <Compass className="h-4 w-4 text-cyan-400" />
                    </span>
                  </button>

                  {onExploreCockpit && (
                    <button
                      onClick={onExploreCockpit}
                      className="px-5 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/20 text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-lg backdrop-blur-md active:scale-95"
                    >
                      <LayoutDashboard className="w-4 h-4 text-cyan-400" />
                      <span>{isHi ? "शिक्षक कॉकपिट" : "Teacher Cockpit"}</span>
                    </button>
                  )}

                  {onTryAssessment && (
                    <button
                      onClick={onTryAssessment}
                      className="px-5 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-orange-300 hover:text-white border border-orange-500/40 text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-lg backdrop-blur-md active:scale-95"
                    >
                      <GraduationCap className="w-4 h-4 text-orange-400" />
                      <span>{isHi ? "आकलन टेस्ट लें" : "Try Assessment"}</span>
                    </button>
                  )}
                </div>

                {/* Auto-transition live counter */}
                <div className="mt-5 text-[11px] font-mono text-cyan-300">
                  <span>
                    {isHi 
                      ? `⏳ अवलोकन पृष्ठ पर स्वतः जा रहे हैं: ${secondsRemaining} सेकंड...` 
                      : `⏳ Automatically opening Overview page in ${secondsRemaining}s...`}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ========================================================================= */}
      {/* BOTTOM HUD: 3-STAGE INTERACTIVE PROGRESS CONTROLS (NO EMPTY SPACE VOID)   */}
      {/* ========================================================================= */}
      <footer className="relative z-30 w-full max-w-4xl mx-auto px-4 sm:px-6 pb-5 pt-1">
        {/* Stage Selector Pills */}
        <div className="grid grid-cols-3 gap-2 text-xs font-mono mb-2">
          <button 
            onClick={() => jumpToStage(1)}
            className={`py-1 px-2 rounded-lg transition-all text-center cursor-pointer border ${
              stage === 1 
                ? 'bg-cyan-500/25 border-cyan-400 text-white font-bold shadow-md shadow-cyan-500/20' 
                : 'bg-slate-950/60 border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            1. {isHi ? "नींव लोगो" : "Neev Identity"}
          </button>

          <button 
            onClick={() => jumpToStage(2)}
            className={`py-1 px-2 rounded-lg transition-all text-center cursor-pointer border ${
              stage === 2 
                ? 'bg-rose-500/25 border-rose-400 text-white font-bold shadow-md shadow-rose-500/20' 
                : 'bg-slate-950/60 border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            2. {isHi ? "अदृश्य खाई" : "The Gap"}
          </button>

          <button 
            onClick={() => jumpToStage(3)}
            className={`py-1 px-2 rounded-lg transition-all text-center cursor-pointer border ${
              stage === 3 
                ? 'bg-amber-500/25 border-amber-400 text-white font-bold shadow-md shadow-amber-500/20' 
                : 'bg-slate-950/60 border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            3. {isHi ? "समाधान" : "Action Portal"}
          </button>
        </div>

        {/* Dynamic Progress Line */}
        <div className="relative w-full h-1.5 bg-slate-900/90 rounded-full overflow-hidden border border-white/10">
          <motion.div 
            className="h-full bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400"
            style={{ width: `${progress}%` }}
          />
        </div>
      </footer>
    </div>
  );
}

export default ScrollLockedVideoHero;
