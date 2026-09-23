import React, { useState } from 'react';
import { 
  Flame, 
  Sparkles, 
  Printer, 
  Copy, 
  Check, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  BookOpen, 
  HelpCircle,
  Package,
  Mic,
  MessageSquare,
  Home,
  Users
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BorderBeam } from './ui/BorderBeam';
import { AnimatedShinyText } from './ui/AnimatedShinyText';
import { SpotlightCard } from './ui/SpotlightCard';
import { PulsingBadge } from './ui/PulsingBadge';
import { ShimmerButton } from './ui/ShimmerButton';
import { ACTIVITIES_DATABASE, SKILLS_LIST } from '../data/activitiesData';
import { TRANSLATIONS } from '../data/translations';

export function ActivityGenerator({ lang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const { students, activeClass, setSelectedStudent, setCurrentView } = useApp();

  // Form selections
  const [selectedSkill, setSelectedSkill] = useState('subtraction-borrow');
  const [selectedLevel, setSelectedLevel] = useState('Beginner');
  const [selectedDuration, setSelectedDuration] = useState('15 min');
  const [selectedLang, setSelectedLang] = useState(lang); // 'en' or 'hi'
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Default active activity
  const [activeActivity, setActiveActivity] = useState(ACTIVITIES_DATABASE[0]);

  // Handle generation simulation
  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      // Find or dynamically map activity based on skill
      let matched = ACTIVITIES_DATABASE.find((a) => {
        if (selectedSkill.includes('subtraction')) return a.id === 'act-subtraction-borrow';
        if (selectedSkill.includes('reading') || selectedSkill.includes('phonics')) return a.id === 'act-reading-fluency';
        if (selectedSkill.includes('word-problems')) return a.id === 'act-accelerated';
        return a.id === 'act-foundation-1';
      });

      if (!matched) matched = ACTIVITIES_DATABASE[0];
      setActiveActivity(matched);
      setIsGenerating(false);
    }, 600);
  };

  const handleCopyScript = () => {
    const textToCopy = selectedLang === 'hi' ? activeActivity.teacherHookScriptHi : activeActivity.teacherHookScriptEn;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const isHindi = selectedLang === 'hi';

  // Target cohort calculation derived from live active roster
  const targetStudents = (students || []).filter(s => {
    if (!s) return false;
    const gap = (s.primaryGap || '').toLowerCase();
    const misc = (s.detectedMisconception || '').toLowerCase();
    const skill = (selectedSkill || '').toLowerCase();

    if (skill.includes('subtraction')) {
      return (s.skills && s.skills.subtractionBorrowing < 70) ||
        gap.includes('subtraction') || gap.includes('borrow') ||
        misc.includes('subtraction') || misc.includes('borrow');
    }
    if (skill.includes('reading') || skill.includes('phonics')) {
      return (s.skills && s.skills.readingFluency < 70) ||
        gap.includes('reading') || gap.includes('fluency') || gap.includes('phonics') ||
        misc.includes('reading') || misc.includes('fluency');
    }
    if (skill.includes('word-problems')) {
      return (s.skills && s.skills.wordProblems < 70) ||
        gap.includes('word') || gap.includes('problem');
    }
    if (skill.includes('number') || skill.includes('place')) {
      return (s.skills && s.skills.numberSense < 70) ||
        gap.includes('place') || gap.includes('number');
    }
    return s.status === 'intervention' || s.status === 'remediation';
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      
      {/* Page Header with 21st.dev PulsingBadge */}
      <div className="mb-8">
        <PulsingBadge variant="amber" className="mb-3">
          <Flame className="w-3.5 h-3.5" />
          <span>Zero-Cost Micro-Pedagogy Engine</span>
        </PulsingBadge>

        <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight flex items-center gap-2">
          <span>{t.generatorTitle}</span>
          <AnimatedShinyText className="text-sm font-mono text-amber-400 font-normal">
            15-Min Station Cards
          </AnimatedShinyText>
        </h2>
        <p className="text-slate-400 text-sm mt-1 max-w-2xl font-body">
          {t.generatorSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Configuration Controls */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-xl space-y-5">
            
            {/* Skill Selector */}
            <div>
              <label className="text-xs font-mono font-semibold text-slate-300 block mb-1.5">
                {t.selectSkill}
              </label>
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-medium"
              >
                {SKILLS_LIST.map((s) => (
                  <option key={s.id} value={s.id}>
                    {lang === 'hi' ? s.labelHi : s.labelEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Selector */}
            <div>
              <label className="text-xs font-mono font-semibold text-slate-300 block mb-1.5">
                {t.selectLevel}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedLevel(lvl)}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                      selectedLevel === lvl
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60 shadow-sm'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Selector */}
            <div>
              <label className="text-xs font-mono font-semibold text-slate-300 block mb-1.5">
                {t.selectDuration}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['10 min', '15 min', '20 min'].map((dur) => (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => setSelectedDuration(dur)}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                      selectedDuration === dur
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-sm'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {dur}
                  </button>
                ))}
              </div>
            </div>

            {/* Instruction Language Switcher */}
            <div>
              <label className="text-xs font-mono font-semibold text-slate-300 block mb-1.5">
                {t.selectLanguage}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedLang('en')}
                  className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                    selectedLang === 'en'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLang('hi')}
                  className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                    selectedLang === 'hi'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400'
                  }`}
                >
                  हिन्दी (Hindi)
                </button>
              </div>
            </div>

            {/* Generate Action Button with 21st.dev ShimmerButton */}
            <div className="pt-2">
              <ShimmerButton
                onClick={handleGenerate}
                disabled={isGenerating}
                shimmerColor="#f59e0b"
                className="w-full py-3.5 text-slate-950 font-bold text-xs shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isGenerating ? 'Synthesizing Pedagogy...' : t.generateBtn}</span>
              </ShimmerButton>
            </div>

          </div>

          {/* Zero-Cost Commitment note in 21st.dev SpotlightCard */}
          <SpotlightCard 
            spotlightColor="rgba(6, 182, 212, 0.15)"
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400"
          >
            <span className="text-cyan-400 font-semibold block mb-1">
              🌱 Zero-Cost Commitment:
            </span>
            All activities generated are strictly designed with everyday items (matchsticks, pebbles, bottle caps, slates) to guarantee 100% feasibility in Indian government and rural classrooms.
          </SpotlightCard>
        </div>

        {/* Right Column: Generated Activity Card with 21st.dev BorderBeam */}
        <div className="lg:col-span-8">
          
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
            
            {/* 21st.dev BorderBeam radiant traveling light */}
            <BorderBeam 
              size={220} 
              duration={7} 
              colorFrom="#f59e0b" 
              colorTo="#06b6d4" 
              borderWidth={1.5}
            />

            {/* Header with Title & Action Icons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {activeActivity.duration}
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-lg bg-slate-800 text-slate-300">
                    {activeActivity.level}
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {isHindi ? 'हिन्दी निर्देश' : 'English Instructions'}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                  {isHindi ? activeActivity.titleHi : activeActivity.titleEn}
                </h3>
              </div>

              {/* Utility actions: Copy & Print */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyScript}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
                  title="Copy Teacher Hook Script"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Script'}</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{t.printBtn}</span>
                </button>
              </div>
            </div>

            {/* Live Target Cohort Banner */}
            <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Users className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-mono font-bold text-indigo-300 uppercase tracking-wider">
                    Live Targeted Cohort ({targetStudents.length} Students Flagged in {activeClass?.name || 'Class 3A'})
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 items-center">
                  {targetStudents.length === 0 ? (
                    <span className="text-xs text-emerald-400 font-mono">
                      ✓ All students currently on-track for this skill in {activeClass?.name || 'Class 3A'}.
                    </span>
                  ) : (
                    targetStudents.map(student => (
                      <button
                        key={student.id}
                        onClick={() => {
                          setSelectedStudent(student);
                          setCurrentView('cycle');
                        }}
                        className="px-2 py-0.5 rounded-md bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-500/40 text-indigo-200 text-xs font-medium transition-colors flex items-center gap-1"
                        title="Launch Remediation Cycle"
                      >
                        <span>{student.name}</span>
                        <span className="text-[10px] text-indigo-400 font-mono">({student.rollNo})</span>
                      </button>
                    ))
                  )}
                </div>
              </div>
              {targetStudents.length > 0 && (
                <button
                  onClick={() => {
                    setSelectedStudent(targetStudents[0]);
                    setCurrentView('cycle');
                  }}
                  className="shrink-0 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium font-mono transition-colors shadow-sm"
                >
                  Launch Station in Learning Cycle →
                </button>
              )}
            </div>

            {/* Card Body with 21st.dev SpotlightCards */}
            <div className="mt-6 space-y-6 relative z-10">
              
              {/* 1. Learning Objective */}
              <SpotlightCard 
                spotlightColor="rgba(6, 182, 212, 0.2)"
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800"
              >
                <span className="text-xs font-mono font-bold text-cyan-400 block mb-1">
                  🎯 {isHindi ? 'सीखने का उद्देश्य (Learning Objective)' : 'Target Learning Objective'}
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-body">
                  {isHindi ? activeActivity.objectiveHi : activeActivity.objectiveEn}
                </p>
              </SpotlightCard>

              {/* 2. Zero-Cost Materials */}
              <SpotlightCard 
                spotlightColor="rgba(245, 158, 11, 0.2)"
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800"
              >
                <span className="text-xs font-mono font-bold text-amber-400 block mb-1">
                  📦 {isHindi ? 'शून्य लागत सामग्री (Zero-Cost Materials)' : 'Required Zero-Cost Materials'}
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-body">
                  {isHindi ? activeActivity.materialsHi : activeActivity.materialsEn}
                </p>
              </SpotlightCard>

              {/* 3. Teacher's Hook Script */}
              <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 shadow-inner">
                <div className="flex items-center gap-2 text-cyan-300 mb-1.5">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">
                    {isHindi ? 'शिक्षक के शुरुआती बोल (Teacher Hook Script)' : 'Teacher Hook Script (Opening Words)'}
                  </span>
                </div>
                <p className="text-xs text-slate-200 italic leading-relaxed font-body">
                  "{isHindi ? activeActivity.teacherHookScriptHi : activeActivity.teacherHookScriptEn}"
                </p>
              </div>

              {/* 4. Step-by-Step Hands-on Flow */}
              <div>
                <span className="text-xs font-mono font-bold text-slate-400 block mb-2.5">
                  🎲 {isHindi ? 'चरणबद्ध गतिविधि प्रवाह (Step-by-Step Flow)' : 'Guided Classroom Flow'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(isHindi ? activeActivity.stepByStepHi : activeActivity.stepByStepEn).map((st, i) => (
                    <SpotlightCard 
                      key={i} 
                      spotlightColor="rgba(245, 158, 11, 0.15)"
                      className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs"
                    >
                      <span className="font-bold text-amber-300 block mb-1">
                        {st.step}
                      </span>
                      <p className="text-slate-300 text-[11px] leading-relaxed font-body">
                        {st.desc}
                      </p>
                    </SpotlightCard>
                  ))}
                </div>
              </div>

              {/* 5. 30-Second Formative Check & Take-Home Mission */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                <SpotlightCard 
                  spotlightColor="rgba(16, 185, 129, 0.2)"
                  className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30"
                >
                  <span className="text-xs font-mono font-bold text-emerald-400 block mb-1">
                    ⚡ {isHindi ? '30-सेकंड त्वरित जांच (Quick Check)' : '30-Second Formative Check'}
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed font-body">
                    {isHindi ? activeActivity.formativeCheckHi : activeActivity.formativeCheckEn}
                  </p>
                </SpotlightCard>

                <SpotlightCard 
                  spotlightColor="rgba(168, 85, 247, 0.2)"
                  className="p-5 rounded-2xl bg-purple-950/30 border border-purple-500/30"
                >
                  <span className="text-xs font-mono font-bold text-purple-400 block mb-1">
                    🏠 {isHindi ? 'घरेलू मिशन (Take-Home Mission)' : 'Take-Home Family Mission'}
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed font-body">
                    {isHindi ? activeActivity.homeworkMissionHi : activeActivity.homeworkMissionEn}
                  </p>
                </SpotlightCard>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
