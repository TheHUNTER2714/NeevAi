import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, CheckCircle2, Award, Sparkles, Lightbulb } from 'lucide-react';

/**
 * Dashboard Background Component for LearnLens AI
 * Specifically implementing:
 * https://lottiefiles.com/free-animation/exams-preparation-VogCRGZq0O
 * 
 * Features:
 * 1. LottieFiles embed iframe for animation VogCRGZq0O (Optima GFX "Exams Preparation")
 * 2. Vector animated examination scene (Desk lamp light cone, ticking clock, floating exam sheets, books, stationary)
 * 3. Reactive opacity responding to user's themeIntensity setting (subtle / balanced / vibrant)
 */
export function ExamPreparationBackground({ intensity = 'balanced' }) {
  const [useLiveEmbed, setUseLiveEmbed] = useState(true);

  const opacityClass = 
    intensity === 'vibrant' ? 'opacity-85' :
    intensity === 'subtle' ? 'opacity-30' : 'opacity-55';

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-700 ${opacityClass}`}>
      
      {/* 1. Direct LottieFiles Embed Player (VogCRGZq0O: Exams Preparation) */}
      <div className="absolute right-0 top-12 w-full max-w-2xl h-[550px] opacity-40 mix-blend-screen pointer-events-none hidden lg:block">
        <iframe
          src="https://embed.lottiefiles.com/animation/VogCRGZq0O"
          title="Exams Preparation Animation - LottieFiles"
          className="w-full h-full border-0 pointer-events-none transform scale-110"
          loading="lazy"
        />
      </div>

      {/* 2. Soft Ambient Study Lamp Conic Beam */}
      <div 
        className="absolute -top-32 right-1/4 w-[700px] h-[700px] bg-gradient-to-b from-amber-500/15 via-orange-500/5 to-transparent rounded-full blur-3xl pointer-events-none"
      />
      
      {/* 3. Deep Cyan FLN Intelligence Halo on left */}
      <div 
        className="absolute top-1/3 -left-32 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"
      />

      {/* 4. Floating Animated Exam & Study Elements */}
      <div className="absolute inset-0 w-full h-full">
        
        {/* Floating Exam Question Paper Card 1 (Subtraction 52 - 27) */}
        <motion.div
          className="absolute top-24 right-16 hidden xl:flex flex-col p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md shadow-2xl w-56 text-left"
          animate={{
            y: [-10, 10, -10],
            rotate: [-2, 2, -2],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> FLN Exam Slip
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
              A+
            </span>
          </div>
          <div className="space-y-1 text-[11px] font-mono text-slate-300">
            <div className="flex justify-between">
              <span>Q1. 52 - 27:</span>
              <span className="text-emerald-400 font-bold">25 ✓ (Regrouped)</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Reading:</span>
              <span className="text-cyan-300">42 WCPM</span>
            </div>
          </div>
        </motion.div>

        {/* Floating Exam Countdown Clock */}
        <motion.div
          className="absolute top-48 left-12 hidden lg:flex items-center gap-3 p-3 rounded-2xl bg-slate-900/50 border border-cyan-500/20 backdrop-blur-md shadow-xl"
          animate={{
            y: [8, -8, 8],
            rotate: [1, -1, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center relative">
            <Clock className="w-5 h-5 text-cyan-400" />
            {/* Animated ticking clock hand */}
            <motion.div
              className="absolute top-2 w-[1.5px] h-3 bg-cyan-300 origin-bottom"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-mono uppercase text-slate-400">Exam Window</p>
            <p className="text-xs font-bold font-mono text-white">NIPUN Baseline</p>
          </div>
        </motion.div>

        {/* Floating Stack of Textbooks & Study Notes */}
        <motion.div
          className="absolute bottom-28 left-16 hidden xl:flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md shadow-xl"
          animate={{
            y: [-6, 6, -6],
            rotate: [-1, 1, -1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-mono text-orange-300 font-semibold">TaRL Station Prep</p>
            <p className="text-xs font-bold text-slate-200">15-Min Worksheets</p>
          </div>
        </motion.div>

        {/* Floating Animated Mathematical & Literacy Symbols */}
        {[
          { sym: '52 - 27', x: '22%', y: '18%', delay: 0 },
          { sym: 'अ → शब्द', x: '82%', y: '45%', delay: 1.5 },
          { sym: '10s + 1s', x: '15%', y: '65%', delay: 3 },
          { sym: 'WCPM: 35+', x: '75%', y: '78%', delay: 2 },
          { sym: 'TaRL B', x: '48%', y: '12%', delay: 4 },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            className="absolute font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-900/40 border border-white/5 text-slate-400/70 select-none hidden md:block"
            style={{ left: item.x, top: item.y }}
            animate={{
              y: [-12, 12, -12],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 5 + idx,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
          >
            {item.sym}
          </motion.div>
        ))}

        {/* Ambient Floating Dust / Light Specks */}
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />
      </div>

      {/* Subtle Vignette Gradient so content stands out with high contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/80 to-slate-950/95 pointer-events-none" />

    </div>
  );
}
