import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  Users, 
  ArrowUpRight, 
  RotateCcw,
  Target,
  Clock,
  HeartHandshake
} from 'lucide-react';
import { BorderBeam } from './ui/BorderBeam';
import { AnimatedShinyText } from './ui/AnimatedShinyText';
import { NumberTicker } from './ui/NumberTicker';
import { SpotlightCard } from './ui/SpotlightCard';
import { PulsingBadge } from './ui/PulsingBadge';
import { TRANSLATIONS } from '../data/translations';

export function ImpactDashboard({ lang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const [selectedCase, setSelectedCase] = useState('rahul'); // 'rahul', 'priya', 'class3a'

  const impactCases = {
    rahul: {
      name: lang === 'hi' ? 'राहुल शर्मा (रोल #1)' : 'Rahul Sharma (Roll #1)',
      gapTitle: lang === 'hi' ? 'घटाव में उधार लेने की भ्रांति (52 - 27 = 35)' : 'Subtraction with Borrowing Gap (52 - 27 = 35)',
      timeline: [
        { period: 'Baseline (W0)', score: 35, level: 'Grade 1.2', note: 'Independent digit subtraction error' },
        { period: 'Week 2 (Post-Bundles)', score: 62, level: 'Grade 2.4', note: 'After 10-Rupee Note Exchange game' },
        { period: 'Week 4 (Current)', score: 84, level: 'Grade 3.1', note: 'Mastered abstract 2-digit regrouping' }
      ],
      growthValue: 49,
      growth: '+49% Mastery Recovery'
    },
    priya: {
      name: lang === 'hi' ? 'प्रिया पटेल (रोल #2)' : 'Priya Patel (Roll #2)',
      gapTitle: lang === 'hi' ? 'पठन धाराप्रवाह एवं संयुक्त मात्राएं' : 'Oral Reading Fluency & Matra Blends',
      timeline: [
        { period: 'Baseline (W0)', score: 22, level: '18 WCPM', note: 'Spelling letter-by-letter with long pauses' },
        { period: 'Week 2 (Echo Reading)', score: 48, level: '32 WCPM', note: 'After choral echo reading sessions' },
        { period: 'Week 4 (Current)', score: 76, level: '44 WCPM', note: 'Reads Grade 3 sentences smoothly' }
      ],
      growthValue: 54,
      growth: '+54% Fluency Gain'
    },
    class3a: {
      name: lang === 'hi' ? 'कक्षा 3 — वर्ग अ (समग्र 42 छात्र)' : 'Class 3 — Section A (All 42 Students)',
      gapTitle: lang === 'hi' ? 'बुनियादी साक्षरता एवं संख्या ज्ञान (FLN)' : 'Overall FLN Foundational Competency Recovery',
      timeline: [
        { period: 'Baseline (W0)', score: 42, level: '16 at Grade 1', note: '38% students lagging behind grade level' },
        { period: 'Week 2 (Mid-Cycle)', score: 68, level: '8 at Grade 1', note: 'TaRL station rotations active' },
        { period: 'Week 4 (Current)', score: 86, level: '2 at Grade 1', note: '14 of 16 critical learning gaps resolved' }
      ],
      growthValue: 44,
      growth: '+44% Class-wide FLN Mastery'
    }
  };

  const currentData = impactCases[selectedCase];

  const caseTabs = [
    { id: 'rahul', label: 'Case 1: Rahul Sharma (Subtraction Borrowing)' },
    { id: 'priya', label: 'Case 2: Priya Patel (Reading Fluency)' },
    { id: 'class3a', label: 'Class 3A Aggregate (42 Students)' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header with 21st.dev PulsingBadge & AnimatedShinyText */}
      <div>
        <PulsingBadge variant="emerald" className="mb-3">
          <span>Longitudinal Evidence & Gap Closure</span>
        </PulsingBadge>
        
        <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight flex items-center gap-2">
          <span>{t.impactTitle}</span>
          <AnimatedShinyText className="text-sm font-mono text-cyan-400 font-normal">
            J-PAL TaRL Metric
          </AnimatedShinyText>
        </h2>
        <p className="text-slate-400 text-sm mt-1 max-w-2xl font-body">
          {t.impactSubtitle}
        </p>
      </div>

      {/* Case selector tabs with 21st.dev smooth sliding indicator */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/80 pb-4">
        {caseTabs.map((tab) => {
          const active = selectedCase === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedCase(tab.id)}
              className={`relative px-4 py-2 rounded-xl text-xs font-semibold transition-colors duration-200 ${
                active ? 'text-slate-950 font-bold' : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800'
              }`}
            >
              {active && (
                <motion.div
                  layoutId="impact-case-pill"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 shadow-lg shadow-cyan-500/25 -z-10"
                />
              )}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Longitudinal Visualizer with 21st.dev BorderBeam */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
        
        {/* Continuous BorderBeam glowing light traveling around this showcase card */}
        <BorderBeam 
          size={240} 
          duration={8} 
          colorFrom="#06b6d4" 
          colorTo="#10b981" 
          borderWidth={1.5}
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div>
            <span className="text-xs font-mono text-cyan-400 font-semibold block mb-1">
              Active Case Study
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              {currentData.name}
            </h3>
            <span className="text-xs text-slate-400">
              Target Competency: <strong className="text-slate-200">{currentData.gapTitle}</strong>
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-center shadow-lg shadow-emerald-950/40">
            <span className="text-[10px] font-mono uppercase text-emerald-400 block tracking-wider font-bold">Total Growth</span>
            <span className="text-xl font-bold font-mono text-emerald-300 flex items-center justify-center gap-1">
              <ArrowUpRight className="w-5 h-5 text-emerald-400" />
              <span>+<NumberTicker value={currentData.growthValue} />%</span>
            </span>
          </div>
        </div>

        {/* 3-Stage Progress Progression Cards wrapped in 21st.dev SpotlightCard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          {currentData.timeline.map((stage, idx) => (
            <SpotlightCard 
              key={idx}
              spotlightColor={idx === 2 ? 'rgba(16, 185, 129, 0.25)' : 'rgba(6, 182, 212, 0.15)'}
              className={`relative p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                idx === 2
                  ? 'bg-gradient-to-b from-emerald-950/40 via-slate-900 to-slate-950 border-emerald-500/50 shadow-xl shadow-emerald-950/30'
                  : 'bg-slate-950/70 border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-slate-400 font-semibold">
                    {stage.period}
                  </span>
                  <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                    idx === 2 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {stage.level}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-black font-display text-white">
                    <NumberTicker value={stage.score} />%
                  </span>
                  <span className="text-xs text-slate-400">Mastery Index</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mb-3 border border-slate-800">
                  <div 
                    className={`h-full transition-all duration-1000 ${
                      idx === 2 ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-[0_0_12px_#34d399]' :
                      idx === 1 ? 'bg-amber-400 shadow-[0_0_12px_#fbbf24]' : 'bg-rose-400 shadow-[0_0_12px_#fb7185]'
                    }`}
                    style={{ width: `${stage.score}%` }}
                  />
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-body">
                  {stage.note}
                </p>
              </div>

              {idx < 2 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 text-cyan-400 text-xs font-bold flex items-center justify-center shadow-lg">
                  →
                </div>
              )}
            </SpotlightCard>
          ))}
        </div>

        {/* The Killer Demo Quote Box with subtle animated glow */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-emerald-950/40 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
          <div className="flex items-start gap-3">
            <HeartHandshake className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white font-display flex items-center gap-2">
                <span>Social Impact Verification Statement</span>
                <span className="text-[10px] px-2 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">Frontline 2025</span>
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed font-body italic">
                "We don't measure success by how many assessments were administered. We measure it by how many learning gaps were closed before they compounded into lifelong dropout risks."
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono px-3.5 py-2 rounded-xl bg-slate-900/90 border border-emerald-500/40 text-emerald-400 font-bold shadow-md">
              14 of 16 Gaps Closed
            </span>
          </div>
        </div>

      </div>

      {/* Why LearnLens Impact Metrics in 21st.dev SpotlightCards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <SpotlightCard 
          spotlightColor="rgba(6, 182, 212, 0.2)"
          className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/30 transition-all"
        >
          <span className="text-xs font-mono text-cyan-400 font-bold block mb-1">
            Zero Extra Teacher Hours
          </span>
          <p className="text-xs text-slate-300 leading-relaxed font-body">
            Replaces unfocused lectures with 15-minute daily station rotations, fitting neatly inside the mandatory first period of school.
          </p>
        </SpotlightCard>

        <SpotlightCard 
          spotlightColor="rgba(245, 158, 11, 0.2)"
          className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/30 transition-all"
        >
          <span className="text-xs font-mono text-amber-400 font-bold block mb-1">
            Zero Hardware Dependency
          </span>
          <p className="text-xs text-slate-300 leading-relaxed font-body">
            Child activities use matchsticks, bottle caps, slates, and pebbles. Designed specifically for low-resource government schools.
          </p>
        </SpotlightCard>

        <SpotlightCard 
          spotlightColor="rgba(16, 185, 129, 0.2)"
          className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/30 transition-all"
        >
          <span className="text-xs font-mono text-emerald-400 font-bold block mb-1">
            Pedagogically Proven
          </span>
          <p className="text-xs text-slate-300 leading-relaxed font-body">
            Directly replicates the J-PAL TaRL randomized evaluation findings, demonstrating 2x faster foundational literacy acquisition.
          </p>
        </SpotlightCard>

      </div>

    </div>
  );
}
