"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight, Sparkles, Play, School } from "lucide-react";
import React, { useRef } from "react";
import { NeevLogo } from "./ElisaLogo";

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
            
            {/* Brand Logo & Headline with WordsPullUp */}
            <div className="col-span-12 lg:col-span-8 select-none">
              <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                {/* Glowing NeevAI Kinetic Vector Logo with Auto-Run & Click-To-Replay */}
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 shrink-0 flex items-center justify-center group"
                  title="NeevAI"
                >
                  <div className="absolute inset-0 bg-cyan-400/25 rounded-full blur-xl pointer-events-none group-hover:bg-cyan-400/50 group-hover:scale-110 transition-all duration-300" />
                  <NeevLogo variant="icon" className="w-full h-full" />
                </motion.div>

                {/* Headline Typography */}
                <div className="flex flex-col">
                  <h1
                    className="font-extrabold leading-[0.92] tracking-[-0.04em] text-4xl sm:text-5xl md:text-6xl lg:text-[4.8rem] xl:text-[5.4rem] font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 drop-shadow-2xl"
                  >
                    <WordsPullUp text={isHi ? "नींव AI" : "NeevAI"} showAsterisk />
                  </h1>

                  <span className="text-xs sm:text-sm font-mono text-cyan-400 font-semibold tracking-wider uppercase mt-1">
                    {isHi ? "बुनियादी दक्षता एवं नैदानिक निर्णय प्रणाली" : "Foundational Intelligence for Every Child"}
                  </span>
                </div>
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
                  ? "40 बच्चे। 1 शिक्षक। एक ही कक्षा में छिपे 5 अलग-अलग सीखने के स्तर। नींव AI (NeevAI) शिक्षकों को सोच की वास्तविक गलती की पहचान कराकर अगले 15 मिनट की ठोस उपचारात्मक गतिविधियाँ प्रदान करता है।"
                  : "40 children. 1 teacher. 5 grade levels hidden in plain sight. NeevAI brings invisible learning gaps to light with actionable daily interventions for foundational mastery."}
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
