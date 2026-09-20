import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { BorderBeam } from './ui/BorderBeam';
import { NumberTicker } from './ui/NumberTicker';
import { SpotlightCard } from './ui/SpotlightCard';
import { PulsingBadge } from './ui/PulsingBadge';
import { ShimmerButton } from './ui/ShimmerButton';
import { TRANSLATIONS } from '../data/translations';

export function StudentModal({ student, onClose, lang, onStartActivity }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const [roadmap, setRoadmap] = useState(student?.recommendedPlan || []);

  useEffect(() => {
    if (student?.recommendedPlan) {
      setRoadmap(student.recommendedPlan);
    }
  }, [student]);

  const toggleTask = (index) => {
    setRoadmap((prev) => 
      prev.map((item, idx) => idx === index ? { ...item, done: !item.done } : item)
    );
  };

  if (!student) return null;

  const letterRec = student.skills?.letterRecognition ?? student.skills?.letterSound ?? 70;
  const reading = student.skills?.reading ?? student.skills?.wordDecoding ?? 65;
  const comp = student.skills?.comprehension ?? 55;
  const numRec = student.skills?.numberRecognition ?? student.skills?.numberSense ?? 85;
  const add = student.skills?.addition ?? 60;
  const sub = student.skills?.subtraction ?? student.skills?.subtractionBorrowing ?? 40;
  const probSolve = student.skills?.problemSolving ?? Math.round(((student.skills?.addition || 60) + (student.skills?.subtractionBorrowing || 40)) / 2);

  const skillBars = [
    { label: lang === 'hi' ? 'अक्षर पहचान' : 'Letter Recognition', val: letterRec, color: 'bg-amber-400' },
    { label: lang === 'hi' ? 'शब्द व वाक्य पठन' : 'Reading', val: reading, color: 'bg-cyan-400' },
    { label: lang === 'hi' ? 'अर्थ ग्रहण / समझ' : 'Comprehension', val: comp, color: 'bg-indigo-400' },
    { label: lang === 'hi' ? 'संख्या पहचान' : 'Number Recognition', val: numRec, color: 'bg-emerald-400' },
    { label: lang === 'hi' ? 'जोड़ संक्रिया' : 'Addition', val: add, color: 'bg-teal-400' },
    { label: lang === 'hi' ? 'घटाव (पुनर्समूहन)' : 'Subtraction', val: sub, color: 'bg-rose-400' },
    { label: lang === 'hi' ? 'समस्या समाधान' : 'Problem-Solving', val: probSolve, color: 'bg-purple-400' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-panel rounded-3xl border border-white/15 shadow-2xl p-6 sm:p-8 text-left text-slate-100">
        
        {/* 21st.dev BorderBeam radiant traveling light */}
        <BorderBeam 
          size={240} 
          duration={8} 
          colorFrom="#06b6d4" 
          colorTo="#f97316" 
          borderWidth={1.5}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Student Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 border-b border-slate-800/80 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-400 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-xl font-bold font-display text-white">
              {student.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-2xl font-extrabold font-display text-white">
                {lang === 'hi' ? student.nameHi : student.name}
              </h3>
              <span className="text-xs font-mono px-2 py-0.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                Roll #{student.rollNo}
              </span>
              <PulsingBadge 
                variant={student.status === 'intervention' ? 'rose' : student.status === 'attention' ? 'amber' : 'emerald'}
              >
                {student.status.toUpperCase()}
              </PulsingBadge>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-400">
              <span>{t.overallLevel}: <strong className="text-amber-400 font-semibold">{lang === 'hi' ? student.currentLevelHi : student.currentLevel}</strong></span>
              <span>•</span>
              <span>TaRL Group: <strong className="text-cyan-400 font-semibold">{lang === 'hi' ? student.tarlGroupHi : student.tarlGroup}</strong></span>
              <span>•</span>
              <span>Attendance: <strong>{student.attendance}</strong></span>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* SKILL PROGRESS BREAKDOWN BARS WITH NUMBER TICKER                     */}
        {/* ===================================================================== */}
        <div className="my-6 relative z-10">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold font-display text-white">
              Foundational Skill Map & Competency Distribution
            </h4>
            <span className="text-xs font-mono text-cyan-400">
              Benchmark: 70%
            </span>
          </div>

          <div className="space-y-3">
            {skillBars.map((skill, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">{skill.label}</span>
                  <span className="font-mono font-bold text-white">
                    <NumberTicker value={skill.val} />%
                  </span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className={`h-full ${skill.color} transition-all duration-700 shadow-sm`}
                    style={{ width: `${skill.val}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===================================================================== */}
        {/* AI DIAGNOSTIC INSIGHT CARDS WITH 21st.dev SPOTLIGHTCARDS               */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 relative z-10">
          
          <SpotlightCard 
            spotlightColor="rgba(244, 63, 94, 0.2)"
            className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/40"
          >
            <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold block mb-1">
              🔴 {t.primaryGapLabel}
            </span>
            <p className="text-xs font-semibold text-white font-display">
              {lang === 'hi' ? student.primaryGapHi : student.primaryGap}
            </p>
          </SpotlightCard>

          <SpotlightCard 
            spotlightColor="rgba(245, 158, 11, 0.2)"
            className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40"
          >
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block mb-1">
              🟡 {t.secondaryGapLabel}
            </span>
            <p className="text-xs font-semibold text-white font-display">
              {lang === 'hi' ? student.secondaryGapHi : student.secondaryGap}
            </p>
          </SpotlightCard>

        </div>

        {/* Detected Misconception Note if present */}
        {student.detectedMisconception && (
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30 mb-6 relative z-10 shadow-inner">
            <div className="flex items-center gap-2 text-cyan-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-mono font-bold uppercase">
                {t.identifiedMisconception}: {student.detectedMisconception.title}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              <span className="text-slate-400 font-mono">Student Pattern: </span>
              {student.detectedMisconception.example}
            </p>
            <p className="text-xs text-emerald-400 font-medium mt-1">
              💡 {student.detectedMisconception.remediation}
            </p>
          </div>
        )}

        {/* ===================================================================== */}
        {/* 5-DAY TARGETED REMEDIATION ROADMAP                                   */}
        {/* ===================================================================== */}
        <SpotlightCard 
          spotlightColor="rgba(6, 182, 212, 0.15)"
          className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 mb-6 relative z-10"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <h4 className="text-sm font-bold font-display text-white">
                {t.fiveDayPlan}
              </h4>
            </div>
            <span className="text-xs font-mono text-slate-400">
              15 mins/day
            </span>
          </div>

          <div className="space-y-2">
            {roadmap.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => toggleTask(idx)}
                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer text-xs transition-colors ${
                  item.done
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-[11px] px-2 py-0.5 rounded-lg bg-slate-800 text-cyan-300 border border-slate-700">
                    {item.day}
                  </span>
                  <span className={item.done ? 'line-through opacity-70' : ''}>
                    {item.task}
                  </span>
                </div>
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${item.done ? 'text-emerald-400' : 'text-slate-600'}`} />
              </div>
            ))}
          </div>
        </SpotlightCard>

        {/* Footer Actions with 21st.dev ShimmerButton */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800 relative z-10">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
          >
            {t.closeBtn}
          </button>
          
          <ShimmerButton
            onClick={() => {
              onClose();
              if (onStartActivity) onStartActivity();
            }}
            shimmerColor="#06b6d4"
            className="px-5 py-2 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
          >
            <span>Generate Activity for this Gap →</span>
          </ShimmerButton>
        </div>

      </div>

    </div>
  );
}
