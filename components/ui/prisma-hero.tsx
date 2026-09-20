"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight, Sparkles, Play, School } from "lucide-react";
import React, { useRef } from "react";

/* ---------------- WordsPullUp ---------------- */
export interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({ text, className = "", showAsterisk = false, style }: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.45em] -right-[0.35em] text-[0.4em] text-cyan-400 font-bold">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- WordsPullUpMultiStyle ---------------- */
export interface Segment {
  text: string;
  className?: string;
}

export interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: React.CSSProperties;
}

export const WordsPullUpMultiStyle = ({ segments, className = "", style }: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const words: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block ${w.className ?? ""}`}
          style={{ marginRight: "0.25em" }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  );
};

/* ---------------- PrismaHero (LearnLens AI Edition) ---------------- */
export interface PrismaHeroProps {
  onExploreCockpit?: () => void;
  onTryAssessment?: () => void;
  onTeacherLogin?: () => void;
  lang?: string;
}

export const PrismaHero = ({
  onExploreCockpit,
  onTryAssessment,
  onTeacherLogin,
  lang = "en",
}: PrismaHeroProps) => {
  const isHi = lang === "hi";

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-end overflow-hidden">
      <div className="relative h-full w-full min-h-[92vh] sm:min-h-screen overflow-hidden rounded-2xl md:rounded-[2.5rem] border border-white/10 shadow-2xl bg-black">
        
        {/* Background video (Prisma cinematic atmosphere) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover filter brightness-[0.65] contrast-[1.12]"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />

        {/* Noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.55] mix-blend-overlay" />

        {/* Cinematic gradient overlays for maximum contrast and legibility */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />
        <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-black/20 to-black/80" />

        {/* Top Research & Policy Ribbon */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 w-full max-w-4xl px-4 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 border border-white/15 text-xs font-mono text-slate-200 shadow-xl backdrop-blur-xl">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="truncate">
              {isHi
                ? "जे-पाल TaRL, प्रथम ASER एवं निपुण भारत मिशन पर आधारित"
                : "Grounded in J-PAL TaRL, Pratham ASER & NEP NIPUN Bharat"}
            </span>
          </div>
        </div>

        {/* Hero Content Grid */}
        <div className="relative z-20 px-4 sm:px-8 md:px-12 pb-10 sm:pb-14 pt-28">
          
          {/* Subheading Motto */}
          <div className="mb-3">
            <span className="text-xs sm:text-sm md:text-base font-semibold tracking-widest uppercase text-cyan-400 font-mono">
              {isHi ? "सीखने की खाई को पहचानें • बच्चे को समझें • ठोस कदम उठाएं" : "See the Gap • Understand the Child • Take Action"}
            </span>
          </div>

          <div className="grid grid-cols-12 items-end gap-6 lg:gap-10">
            
            {/* Brand Logo & Reduced Title with WordsPullUp */}
            <div className="col-span-12 lg:col-span-8 select-none">
              <div className="flex items-center gap-3.5 sm:gap-5 flex-wrap">
                {/* Glowing Elisa Vector Logo Emblem */}
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-14 h-14 sm:w-18 sm:h-18 lg:w-20 lg:h-20 shrink-0 flex items-center justify-center cursor-pointer group"
                >
                  <div className="absolute inset-0 bg-cyan-400/25 rounded-full blur-xl pointer-events-none group-hover:bg-cyan-400/40 transition-colors" />
                  
                  <svg viewBox="0 0 60 60" className="w-full h-full relative z-10 filter drop-shadow-[0_0_18px_rgba(6,182,212,0.85)]">
                    <defs>
                      <linearGradient id="prismaHeroMasterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00f5ff" />
                        <stop offset="35%" stopColor="#38bdf8" />
                        <stop offset="70%" stopColor="#818cf8" />
                        <stop offset="100%" stopColor="#f97316" />
                      </linearGradient>
                      <linearGradient id="prismaHeroSecGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#f43f5e" />
                        <stop offset="50%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#06b6d4" />
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
                      transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Intertwined Elisa Ribbon */}
                    <motion.path
                      d="M 17,42 C 9,42 10,30 17,23 C 24,16 35,12 43,17 C 51,22 52,32 46,39 C 40,46 25,46 21,39 C 17,32 21,22 30,22 C 38,22 43,30 40,36 C 36,41 26,42 21,37"
                      fill="none"
                      stroke="url(#prismaHeroMasterGrad)"
                      strokeWidth="3.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
                    />

                    {/* Glowing Center Focal Pupil */}
                    <motion.circle
                      cx="30"
                      cy="30"
                      r="4.2"
                      fill="#06b6d4"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.3, 1] }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    />
                    <circle cx="30" cy="30" r="1.8" fill="#ffffff" />
                  </svg>
                </motion.div>

                {/* Reduced Headline Typography */}
                <h1
                  className="font-extrabold leading-[0.92] tracking-[-0.04em] text-4xl sm:text-5xl md:text-6xl lg:text-[4.8rem] xl:text-[5.4rem] font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 drop-shadow-2xl"
                >
                  <WordsPullUp text={isHi ? "लर्न-लेंस" : "LearnLens"} showAsterisk />
                </h1>
              </div>
            </div>

            {/* Description & Action CTA Buttons */}
            <div className="col-span-12 flex flex-col gap-6 lg:col-span-4 pb-2">
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed font-body drop-shadow-md"
              >
                {isHi
                  ? "40 बच्चे। 1 शिक्षक। एक ही कक्षा में छिपे 5 अलग-अलग सीखने के स्तर। लर्न-लेंस AI शिक्षकों को सोच की वास्तविक गलती की पहचान कराकर अगले 15 मिनट की ठोस उपचारात्मक गतिविधियाँ प्रदान करता है।"
                  : "40 children. 1 teacher. 5 grade levels hidden in plain sight. LearnLens AI brings invisible learning gaps to light with actionable daily interventions for foundational mastery."}
              </motion.p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <motion.button
                  onClick={onExploreCockpit}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="group inline-flex items-center gap-2 self-start rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400 py-1.5 pl-6 pr-1.5 text-sm sm:text-base font-bold text-slate-950 transition-all hover:shadow-xl hover:shadow-cyan-500/25 cursor-pointer"
                >
                  <span>{isHi ? "शिक्षक कॉकपिट खोलें" : "Enter Teacher Cockpit"}</span>
                  <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-slate-950 transition-transform group-hover:scale-110">
                    <ArrowRight className="h-4 w-4 text-cyan-400" />
                  </span>
                </motion.button>

                {onTryAssessment && (
                  <motion.button
                    onClick={onTryAssessment}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    className="px-4 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/20 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-lg backdrop-blur-md"
                  >
                    <Play className="w-3.5 h-3.5 text-orange-400 fill-orange-400/30" />
                    <span>{isHi ? "आकलन टेस्ट लें" : "Try Assessment"}</span>
                  </motion.button>
                )}

                {onTeacherLogin && (
                  <motion.button
                    onClick={onTeacherLogin}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="px-4 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-cyan-300 hover:text-white border border-cyan-500/40 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-lg backdrop-blur-md"
                  >
                    <School className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{isHi ? "शाला लॉगिन" : "School Login"}</span>
                  </motion.button>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrismaHero;
