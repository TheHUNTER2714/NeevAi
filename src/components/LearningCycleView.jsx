import React, { useState } from 'react';
import { 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Target, 
  Zap, 
  Flame,
  Award,
  ChevronRight,
  BookOpen,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { BorderBeam } from './ui/BorderBeam';
import { ShimmerButton } from './ui/ShimmerButton';
import { SpotlightCard } from './ui/SpotlightCard';
import { NumberTicker } from './ui/NumberTicker';
import { PulsingBadge } from './ui/PulsingBadge';
import { AnimatedShinyText } from './ui/AnimatedShinyText';

export function LearningCycleView() {
  const { learningCycles, advanceLearningCycle, lang, setCurrentView } = useApp();
  const [reassessModalCycle, setReassessModalCycle] = useState(null);
  const [reassessScore, setReassessScore] = useState(86);

  const cycleStages = [
    { num: 1, name: 'Assess', nameHi: 'आकलन', desc: 'Screener across FLN competencies', icon: '📝' },
    { num: 2, name: 'Analyze', nameHi: 'विश्लेषण', desc: 'AI cognitive model diagnosis', icon: '🧠' },
    { num: 3, name: 'Identify Gaps', nameHi: 'खाई की पहचान', desc: 'TaRL ability grouping', icon: '🎯' },
    { num: 4, name: 'Intervene', nameHi: 'ठोस हस्तक्षेप', desc: '15-min zero-cost activity', icon: '🌱' },
    { num: 5, name: 'Reassess', nameHi: 'पुनः आकलन', desc: '30-sec formative slate check', icon: '⚡' },
    { num: 6, name: 'Measure Improvement', nameHi: 'प्रगति मापन', desc: 'Documented longitudinal gain', icon: '📈' },
  ];

  const handleAdvance = (cycleId) => {
    advanceLearningCycle(cycleId, reassessScore);
    confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 } });
    setReassessModalCycle(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div>
        <PulsingBadge variant="cyan" className="mb-3">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Pedagogical Feedback Loop</span>
        </PulsingBadge>

        <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight flex items-center gap-2">
          <span>{lang === 'hi' ? 'सीखने का सुधार चक्र (Learning Improvement Cycle)' : 'The Learning Improvement Cycle'}</span>
          <AnimatedShinyText className="text-sm font-mono text-cyan-400 font-normal">
            6-Stage Loop
          </AnimatedShinyText>
        </h2>
        <p className="text-slate-400 text-sm mt-1 max-w-3xl font-body">
          {lang === 'hi' 
            ? 'आकलन → विश्लेषण → खाई की पहचान → हस्तक्षेप → पुनः आकलन → प्रगति मापन। जानिए कैसे हर बच्चे की भ्रांति को दूर करके स्तर सुधारा जाता है।'
            : 'Assess → Analyze → Identify Gaps → Intervene → Reassess → Measure Improvement. The scientific engine turning diagnosis into permanent foundational mastery.'}
        </p>
      </div>

      {/* 6-Stage Visual Interactive Pipeline with 21st.dev BorderBeam */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
        <BorderBeam size={220} duration={8} colorFrom="#f97316" colorTo="#06b6d4" borderWidth={1.5} />
        
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-4">
          Core Methodological Architecture
        </span>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
          {cycleStages.map((st, idx) => (
            <SpotlightCard
              key={st.num}
              spotlightColor="rgba(6, 182, 212, 0.2)"
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-7 h-7 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-orange-500/20 border border-white/10 text-xs font-mono font-bold text-cyan-300 flex items-center justify-center">
                    {st.num}
                  </span>
                  <span className="text-base">{st.icon}</span>
                </div>
                <h4 className="text-xs font-bold text-white font-display mb-1">
                  {lang === 'hi' ? st.nameHi : st.name}
                </h4>
                <p className="text-[11px] text-slate-400 leading-snug font-body">
                  {st.desc}
                </p>
              </div>

              {idx < 5 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 text-slate-600">
                  <ChevronRight className="w-4 h-4" />
                </div>
              )}
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* Active Student Cycles List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold font-display text-white">
              {lang === 'hi' ? 'कक्षा 3-अ सक्रिय सुधार चक्र ट्रैकर' : 'Class 3A Active Improvement Trackers'}
            </h3>
            <span className="text-xs text-slate-400">
              {learningCycles.length} case studies undergoing the 6-stage transformation loop
            </span>
          </div>
        </div>

        {learningCycles.length === 0 ? (
          <div className="py-14 px-6 text-center flex flex-col items-center justify-center bg-slate-950/40 rounded-3xl border border-dashed border-slate-800">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3 shadow-lg">
              <RotateCcw className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-white font-display mb-1">
              {lang === 'hi' ? 'अभी कोई सुधार चक्र सक्रिय नहीं है' : 'No Improvement Cycles Tracked Yet'}
            </h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto mb-5 font-body leading-relaxed">
              {lang === 'hi' 
                ? 'कक्षा के किसी भी छात्र के लिए नैदानिक जांच (अंक तुलना, घटाव या पठन) दर्ज करें। भ्रांति की पहचान होने पर नींव AI स्वतः 6-चरणीय सुधार चक्र आरंभ करेगा।' 
                : 'Conduct an initial assessment for any enrolled student. Detected misconceptions will automatically initiate their personalized 6-stage transformation cycle.'}
            </p>
            <button
              onClick={() => setCurrentView('assessment')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-sky-400 transition-all cursor-pointer"
            >
              <span>{lang === 'hi' ? 'नैदानिक जांच शुरू करें' : 'Start Diagnostic Assessment'}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {learningCycles.map((cycle) => {
              const isCompleted = cycle.status === 'gap_closed';
              return (
                <SpotlightCard
                  key={cycle.id}
                  spotlightColor={isCompleted ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)'}
                  className={`p-6 rounded-3xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                    isCompleted 
                      ? 'bg-slate-950/70 border-emerald-500/40 shadow-xl shadow-emerald-950/20' 
                      : 'bg-slate-950/70 border-amber-500/40 shadow-xl shadow-amber-950/20'
                  }`}
                >
                <div>
                  {/* Top Bar: Student Name & Status */}
                  <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-800/80">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono px-2 py-0.5 rounded-lg bg-slate-800 text-slate-300">
                          Roll #{cycle.rollNo}
                        </span>
                        <h4 className="text-lg font-bold font-display text-white">
                          {lang === 'hi' ? cycle.studentNameHi : cycle.studentName}
                        </h4>
                      </div>
                      <span className="text-xs text-cyan-400 font-medium block mt-1">
                        {lang === 'hi' ? cycle.cycleNameHi : cycle.cycleName}
                      </span>
                    </div>

                    <PulsingBadge variant={isCompleted ? 'emerald' : 'amber'}>
                      {isCompleted ? 'Gap Closed' : 'Intervention Active'}
                    </PulsingBadge>
                  </div>

                  {/* 2-Column Baseline vs Reassessment Stats */}
                  <div className="grid grid-cols-2 gap-3 my-4">
                    {/* Baseline */}
                    <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block mb-0.5">
                        Stage 1: Baseline
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-black font-display text-white">
                          <NumberTicker value={cycle.baselineScore} />%
                        </span>
                        <span className="text-[11px] text-amber-400 font-mono font-bold">
                          {cycle.baselineLevel}
                        </span>
                      </div>
                      <span className="text-[11px] text-rose-300 block mt-1 leading-snug">
                        ⚠️ {lang === 'hi' ? cycle.targetGapHi : cycle.targetGap}
                      </span>
                    </div>

                    {/* Reassessment */}
                    <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block mb-0.5">
                        Stage 5: Reassessment
                      </span>
                      {cycle.reassessmentScore ? (
                        <div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-2xl font-black font-display text-emerald-400">
                              <NumberTicker value={cycle.reassessmentScore} />%
                            </span>
                            <span className="text-[11px] text-emerald-300 font-mono font-bold">
                              {cycle.reassessmentLevel}
                            </span>
                          </div>
                          <span className="text-[11px] text-emerald-300 font-mono font-bold block mt-1">
                            🚀 {cycle.growth}
                          </span>
                        </div>
                      ) : (
                        <div className="py-2 text-slate-500 font-mono text-xs">
                          Pending 30-sec slate re-test...
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Targeted Zero-Cost Intervention Applied */}
                  <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block mb-1">
                      Stage 4 Intervention: Zero-Cost Activity
                    </span>
                    <p className="text-slate-200 font-medium">
                      🌱 {lang === 'hi' ? cycle.interventionHi : cycle.intervention}
                    </p>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">
                    Cycle Progress: Stage {cycle.step} of 6
                  </span>

                  {!isCompleted ? (
                    <ShimmerButton
                      onClick={() => setReassessModalCycle(cycle)}
                      shimmerColor="#f59e0b"
                      className="px-4 py-1.5 text-slate-950 font-bold text-xs shadow-md"
                    >
                      <span>Record Reassessment →</span>
                    </ShimmerButton>
                  ) : (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Mastery Documented</span>
                    </span>
                  )}
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      )}
    </div>

      {/* Modal to Record Reassessment for an in-progress cycle */}
      {reassessModalCycle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md glass-panel rounded-3xl border border-white/15 shadow-2xl p-6 text-left text-slate-100">
            <BorderBeam size={180} duration={6} colorFrom="#10b981" colorTo="#06b6d4" borderWidth={1.5} />

            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold font-display text-white">
                Record Reassessment for {reassessModalCycle.studentName}
              </h3>
              <button 
                onClick={() => setReassessModalCycle(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              <p className="text-xs text-slate-300">
                After conducting <strong>{reassessModalCycle.intervention}</strong>, what was the student's re-test score?
              </p>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">
                  Reassessment Mastery Score (0 - 100%)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="40"
                    max="100"
                    value={reassessScore}
                    onChange={(e) => setReassessScore(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-xl font-bold font-mono text-emerald-400 w-16 text-right">
                    {reassessScore}%
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-200">
                Calculated Growth Recovery:{' '}
                <strong>+{reassessScore - reassessModalCycle.baselineScore}%</strong> from baseline.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-800">
              <button
                onClick={() => setReassessModalCycle(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
              >
                Cancel
              </button>
              <ShimmerButton
                onClick={() => handleAdvance(reassessModalCycle.id)}
                shimmerColor="#10b981"
                className="px-5 py-2 text-slate-950 font-bold text-xs"
              >
                <span>Confirm & Close Gap →</span>
              </ShimmerButton>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
