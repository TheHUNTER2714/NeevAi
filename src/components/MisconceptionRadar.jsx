import React, { useState } from 'react';
import { 
  Glasses, 
  Brain, 
  Sparkles, 
  HelpCircle, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Lightbulb, 
  Boxes, 
  RefreshCw,
  Zap
} from 'lucide-react';
import { BorderBeam } from './ui/BorderBeam';
import { AnimatedShinyText } from './ui/AnimatedShinyText';
import { SpotlightCard } from './ui/SpotlightCard';
import { Ripple } from './ui/Ripple';
import { PulsingBadge } from './ui/PulsingBadge';
import { ShimmerButton } from './ui/ShimmerButton';
import { MISCONCEPTIONS_CATALOG } from '../data/misconceptions';
import { TRANSLATIONS } from '../data/translations';

export function MisconceptionRadar({ lang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const [selectedId, setSelectedId] = useState('misc-sub-top-bottom');
  
  // Interactive Custom Sandbox for Teachers/Judges to test ANY math problem!
  const [customNumA, setCustomNumA] = useState(64);
  const [customNumB, setCustomNumB] = useState(28);
  const [customAns, setCustomAns] = useState(46);

  const selectedMisconception = MISCONCEPTIONS_CATALOG.find((m) => m.id === selectedId) || MISCONCEPTIONS_CATALOG[0];

  // Dynamic diagnostic algorithm for the custom sandbox
  const diagnoseCustomProblem = (a, b, ans) => {
    const numAns = Number(ans);
    const correct = a - b;

    if (numAns === correct) {
      return {
        status: 'correct',
        title: lang === 'hi' ? 'बिल्कुल सही उत्तर!' : 'Mathematically Accurate!',
        desc: lang === 'hi' ? `विद्यार्थी ने पुनर्समूहन (उधार) को सही ढंग से संभाला है।` : `Student correctly regrouped tens into units.`,
        fix: lang === 'hi' ? 'उन्नत बहु-चरणीय प्रश्नों की ओर आगे बढ़ें।' : 'Advance to multi-step reasoning problems.'
      };
    }

    // Check for Top-From-Bottom inversion error
    // e.g. 64 - 28. Units: 4 < 8. Inverted: 8 - 4 = 4. Tens: 6 - 2 = 4 => 44
    const aUnits = a % 10;
    const bUnits = b % 10;
    const aTens = Math.floor(a / 10);
    const bTens = Math.floor(b / 10);

    if (aUnits < bUnits) {
      const invertedUnits = bUnits - aUnits;
      const directTens = aTens - bTens;
      const invertedScore = directTens * 10 + invertedUnits;

      if (numAns === invertedScore) {
        return {
          status: 'detected',
          title: lang === 'hi' ? 'पहचाना गया: अंक उलटाव भ्रांति (उधार न लेना)' : 'Detected: Top-From-Bottom Independent Digit Subtraction',
          desc: lang === 'hi' 
            ? `विद्यार्थी ने इकाई में ${bUnits} - ${aUnits} = ${invertedUnits} किया और दहाई में ${aTens} - ${bTens} = ${directTens} किया। बच्चा ऋणात्मक संख्या से बचने के लिए अंकों को स्वतंत्र मान रहा है।`
            : `Student computed ${bUnits} - ${aUnits} = ${invertedUnits} in units and ${aTens} - ${bTens} = ${directTens} in tens. Missing base-10 regrouping.`,
          fix: lang === 'hi' ? '10 के नोट या तीलियों के बंडल से 1 दहाई खोलकर 10 इकाई बनाने की प्रत्यक्ष गतिविधि कराएं।' : 'Conduct the 10-rupee note exchange game to physically untie 1 ten.'
        };
      }

      // Check for Forgotten Borrowing Reduction
      // e.g. 64 - 28. Regroups 14 - 8 = 6. But forgets to reduce 6 to 5, does 6 - 2 = 4 => 46!
      const correctUnits = (aUnits + 10) - bUnits;
      const unreducedTens = aTens - bTens;
      const forgottenReductionScore = unreducedTens * 10 + correctUnits;

      if (numAns === forgottenReductionScore) {
        return {
          status: 'detected',
          title: lang === 'hi' ? 'पहचाना गया: दहाई कम करना भूल जाने की भ्रांति' : 'Detected: Forgotten Tens Decrement Error',
          desc: lang === 'hi' 
            ? `विद्यार्थी ने इकाई में 10 उधार लेकर 14 - 8 = 6 सही किया, लेकिन दहाई के 6 को घटाकर 5 करना भूल गया और 6 - 2 = 4 लिख दिया!`
            : `Student borrowed 10 to get 14 - 8 = 6 in units, but forgot to decrement the tens column (did 6 - 2 = 4 instead of 5 - 2 = 3).`,
          fix: lang === 'hi' ? 'स्लेट पर दहाई के अंक को लाल पेंसिल से काटकर पहले एक कम लिखने का अभ्यास कराएं।' : 'Institute the "Slash & Write First" visible bookkeeping routine.'
        };
      }
    }

    return {
      status: 'unclassified',
      title: lang === 'hi' ? 'सामान्य गणना त्रुटि' : 'Arithmetic Calculation Discrepancy',
      desc: lang === 'hi' ? `यह उत्तर किसी ज्ञात व्यवस्थित भ्रांति से मेल नहीं खाता। मूलभूत गिनती की जांच करें।` : `Response indicates potential basic counting slip or random guess.`,
      fix: lang === 'hi' ? 'संख्या रेखा पर पीछे कूदने का अभ्यास।' : 'Number-line backward jumping drill.'
    };
  };

  const customDiagnosis = diagnoseCustomProblem(customNumA, customNumB, customAns);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      
      {/* Page Heading with 21st.dev PulsingBadge */}
      <div className="mb-8">
        <PulsingBadge variant="cyan" className="mb-3">
          <Glasses className="w-3.5 h-3.5" />
          <span>Cognitive Diagnostic Architecture</span>
        </PulsingBadge>

        <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight flex items-center gap-2">
          <span>{t.misconceptionTitle}</span>
          <AnimatedShinyText className="text-sm font-mono text-cyan-400 font-normal">
            Frontline 2025 Model
          </AnimatedShinyText>
        </h2>
        <p className="text-slate-400 text-sm mt-1 max-w-2xl font-body">
          {t.misconceptionSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Preset Catalog Tabs with 21st.dev SpotlightCard */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
            {t.selectProblem}
          </span>

          {MISCONCEPTIONS_CATALOG.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <SpotlightCard
                key={item.id}
                spotlightColor={item.domain === 'numeracy' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(16, 185, 129, 0.2)'}
                onClick={() => setSelectedId(item.id)}
                className={`p-4 rounded-2xl text-left transition-all duration-200 border flex flex-col gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-950/80 to-slate-900 border-cyan-500/70 shadow-lg shadow-cyan-950/40 translate-x-1.5'
                    : 'bg-slate-900/60 hover:bg-slate-800/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg border ${
                    item.domain === 'numeracy' 
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' 
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  }`}>
                    {item.symptomProblem}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-slate-400">
                    {item.domain}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-white leading-snug">
                  {lang === 'hi' ? item.titleHi : item.title}
                </h4>
              </SpotlightCard>
            );
          })}

          {/* Interactive Custom Diagnostic Sandbox Trigger */}
          <div className="mt-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-inner relative overflow-hidden">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-white">
                {lang === 'hi' ? 'लाइव परीक्षण प्रयोगशाला' : 'Interactive Sandbox Tester'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
              {lang === 'hi' 
                ? 'कोई भी दो संख्याएं और छात्र का उत्तर डालें, AI तुरंत सोचेगा।'
                : 'Enter any 2 numbers & student answer to see the AI diagnose it live.'}
            </p>

            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono mb-3">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Num A</label>
                <input
                  type="number"
                  value={customNumA}
                  onChange={(e) => setCustomNumA(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-center text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Num B</label>
                <input
                  type="number"
                  value={customNumB}
                  onChange={(e) => setCustomNumB(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-center text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="text-[10px] text-rose-400 block mb-1">Student Ans</label>
                <input
                  type="number"
                  value={customAns}
                  onChange={(e) => setCustomAns(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-rose-500/60 rounded-lg px-2 py-1.5 text-center text-rose-300 font-bold focus:outline-none focus:border-rose-400"
                />
              </div>
            </div>

            {/* Sandbox Live Result */}
            <div className={`p-3 rounded-xl border text-xs transition-all ${
              customDiagnosis.status === 'correct' 
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200 shadow-md shadow-emerald-950/40' 
                : customDiagnosis.status === 'detected'
                ? 'bg-amber-950/60 border-amber-500/50 text-amber-200 shadow-md shadow-amber-950/40'
                : 'bg-slate-950 border-slate-800 text-slate-300'
            }`}>
              <span className="font-bold block mb-0.5 text-white">{customDiagnosis.title}</span>
              <p className="text-[11px] opacity-90 leading-relaxed">{customDiagnosis.desc}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Deep-Dive Pedagogical Diagnostic Card with 21st.dev BorderBeam */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Main Inspection Board */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
            
            {/* 21st.dev BorderBeam around the active cognitive inspection board */}
            <BorderBeam 
              size={220} 
              duration={7} 
              colorFrom="#f97316" 
              colorTo="#06b6d4" 
              borderWidth={1.5}
            />

            {/* Header with Problem & Traditional vs LearnLens Comparison */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 relative z-10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-black font-mono text-cyan-400 tracking-tight">
                    {selectedMisconception.symptomProblem}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 font-mono">
                    Incorrect Student Submission
                  </span>
                </div>
                <h3 className="text-lg font-bold font-display text-white mt-1.5">
                  {lang === 'hi' ? selectedMisconception.titleHi : selectedMisconception.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center shadow-md">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Typical Red Pen Mark</span>
                  <span className="text-xs font-bold text-rose-400">❌ -1 Mark ("Work Harder")</span>
                </div>
                <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-center shadow-md shadow-cyan-950/30">
                  <span className="text-[10px] uppercase font-mono text-cyan-400 block">LearnLens Diagnosis</span>
                  <span className="text-xs font-bold text-cyan-300">Cognitive Mental Model Identified</span>
                </div>
              </div>
            </div>

            {/* Cognitive Diagnosis with 21st.dev SpotlightCards */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              
              <SpotlightCard 
                spotlightColor="rgba(6, 182, 212, 0.2)"
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-cyan-400 mb-2">
                    <Brain className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase font-mono tracking-wider">
                      {t.cognitiveExplanation}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-body">
                    {lang === 'hi' ? selectedMisconception.cognitiveDiagnosisHi : selectedMisconception.cognitiveDiagnosis}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                  <span className="text-cyan-400 font-semibold">Root Cause: </span>
                  {lang === 'hi' ? selectedMisconception.pedagogicalRootCauseHi : selectedMisconception.pedagogicalRootCause}
                </div>
              </SpotlightCard>

              <SpotlightCard 
                spotlightColor="rgba(245, 158, 11, 0.2)"
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-amber-400 mb-2">
                    <Boxes className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase font-mono tracking-wider">
                      {t.concreteTools}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-white mb-2 font-display">
                    {lang === 'hi' ? selectedMisconception.concreteManipulativeHi : selectedMisconception.concreteManipulative}
                  </p>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-body">
                  Zero-cost materials found in any Indian government or low-resource classroom (matchsticks, rubber bands, pebbles, chalk).
                </p>
              </SpotlightCard>

            </div>

            {/* Teacher Step-by-Step Script Guide with glowing border */}
            <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/25 relative z-10 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Lightbulb className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase font-mono">
                    {t.pedagogicalFix}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-800/80">
                  Duration: 15 minutes
                </span>
              </div>

              <h4 className="text-sm font-bold text-white mb-3 font-display">
                {lang === 'hi' ? selectedMisconception.recommendedActionHi : selectedMisconception.recommendedAction}
              </h4>

              <div className="space-y-3">
                {(lang === 'hi' ? selectedMisconception.teacherStepByStepHi : selectedMisconception.teacherStepByStep).map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-cyan-500/30">
                      {idx + 1}
                    </span>
                    <p className="leading-relaxed font-body">{step}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
