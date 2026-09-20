import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Layers, 
  ChevronRight, 
  SunMedium,
  UserPlus,
  ClipboardPen,
  RotateCcw,
  Database,
  Trash2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TARL_GROUPS } from '../data/classroomData';
import { PriorityAction } from './PriorityAction';
import { TRANSLATIONS } from '../data/translations';
import { NumberTicker } from './ui/NumberTicker';
import { SpotlightCard } from './ui/SpotlightCard';
import { PulsingBadge } from './ui/PulsingBadge';
import { ShimmerButton } from './ui/ShimmerButton';
import { KidWiseAnimatedBackground } from './ui/KidWiseAnimatedBackground';

export function TeacherDashboard({ onSelectStudent, onOpenMisconception, onOpenActivityStudio, lang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const { 
    teacher, 
    classes, 
    activeClass, 
    setActiveClassId, 
    assessments,
    activeAssessmentId,
    setActiveAssessmentId,
    students, 
    deleteStudent,
    resetToDemoData,
    themeIntensity, 
    setThemeIntensity,
    setIsAuthModalOpen,
    setIsAddStudentModalOpen,
    setIsAddClassModalOpen,
    setIsAssessmentModalOpen,
    setIsCreateAssessmentModalOpen,
    setAssessmentTargetStudent,
    setCurrentView,
    supabaseConfig
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'intervention', 'attention', 'on_track', 'excelling', 'unassessed'

  // Dynamic greeting based on actual time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return {
        prefix: lang === 'hi' ? 'शुभ प्रभात' : 'Good Morning',
        icon: '🌅',
        gradient: 'from-amber-200 via-orange-100 to-cyan-200'
      };
    } else if (hour >= 12 && hour < 17) {
      return {
        prefix: lang === 'hi' ? 'शुभ दोपहर' : 'Good Afternoon',
        icon: '☀️',
        gradient: 'from-amber-300 via-yellow-100 to-cyan-200'
      };
    } else {
      return {
        prefix: lang === 'hi' ? 'शुभ संध्या' : 'Good Evening',
        icon: '🌆',
        gradient: 'from-rose-200 via-purple-200 to-cyan-200'
      };
    }
  };

  const greetingData = getGreeting();

  // Filter students based on search and status
  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (s.nameHi && s.nameHi.includes(searchQuery)) ||
                          s.rollNo?.toString().includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalStudents = students.length;
  const countIntervention = students.filter(s => s.status === 'intervention').length;
  const countAttention = students.filter(s => s.status === 'attention').length;
  const countOnTrack = students.filter(s => s.status === 'on_track').length;
  const countExcelling = students.filter(s => s.status === 'excelling').length;
  const countUnassessed = students.filter(s => s.status === 'unassessed').length;
  const assessedStudents = totalStudents - countUnassessed;


  return (
    <div className="relative w-full min-h-screen">
      
      {/* KidWise Kids Education Animated Background (Dribbble 26730071) */}
      <KidWiseAnimatedBackground intensity={themeIntensity} />

      {/* Main Dashboard Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
        
        {/* Top Welcome & Classroom Context Header */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl backdrop-blur-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          {/* Subtle accent glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-500/15 via-violet-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <PulsingBadge variant="cyan">
                <span>Active FLN Cockpit | {activeClass?.year || '2025-2026'}</span>
              </PulsingBadge>

              {/* Class Switcher Pill */}
              <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-700 px-3 py-1 rounded-full text-xs font-mono">
                <span className="text-slate-400">Class:</span>
                <select
                  value={activeClass?.id}
                  onChange={(e) => setActiveClassId(e.target.value)}
                  className="bg-transparent text-amber-300 font-bold focus:outline-none cursor-pointer"
                >
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id} className="bg-slate-900 text-white">
                      {cls.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => setIsAddClassModalOpen(true)}
                  className="text-amber-400 hover:text-amber-300 font-bold ml-1"
                  title="Create New Class"
                >
                  + New
                </button>
              </div>

              {/* Assessment Switcher Pill */}
              {assessments && (
                <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-700 px-3 py-1 rounded-full text-xs font-mono">
                  <span className="text-slate-400">Test:</span>
                  <select
                    value={activeAssessmentId}
                    onChange={(e) => setActiveAssessmentId(e.target.value)}
                    className="bg-transparent text-cyan-300 font-bold focus:outline-none cursor-pointer max-w-[130px] truncate"
                  >
                    {assessments.map((asmt) => (
                      <option key={asmt.id} value={asmt.id} className="bg-slate-900 text-white">
                        {asmt.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Cloud Sync Status */}
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                title="Manage Teacher & School Profile"
              >
                <Database className="w-3 h-3 text-emerald-400" />
                <span>{supabaseConfig.isConfigured ? 'Cloud Synced' : 'Offline / Local-First'}</span>
              </button>
            </div>

            {/* Dynamic Time-Sensitive Greeting with Professional Educator Typography */}
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white flex items-center gap-2">
                <span className="text-2xl sm:text-3xl filter drop-shadow-md">{greetingData.icon}</span>
                <span className={`bg-gradient-to-r ${greetingData.gradient} bg-clip-text text-transparent`}>
                  {greetingData.prefix}, {teacher.name}
                </span>
              </h1>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="text-xs text-amber-400 hover:text-amber-300 hover:underline font-mono"
                title="Edit Educator Profile"
              >
                (Edit)
              </button>
            </div>

            <p className="text-slate-300 text-sm mt-1 font-body">
              {activeClass?.name} | {teacher.school}, {teacher.district} ({teacher.state})
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className="text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1 rounded-full shadow-sm">
                Target: {activeClass?.targetFLN || 'FLN Foundational Recovery'}
              </span>

              <button
                onClick={() => setCurrentView('cycle')}
                className="text-xs font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 px-3 py-1 rounded-full hover:bg-cyan-900/60 transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Learning Cycle Tracker →</span>
              </button>
            </div>
          </div>

          {/* Quick Top Counters & Action Buttons */}
          <div className="flex flex-col items-start sm:items-end gap-3">
            
            {/* Action Buttons: Add Student, Create Assessment & Enter Screener Data */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsCreateAssessmentModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/25 to-orange-500/25 hover:from-amber-500/35 hover:to-orange-500/35 border border-amber-500/40 text-amber-300 text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/10 active:scale-95"
                title="Create a new FLN assessment test"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'hi' ? '+ नई जांच बनाएं' : '+ New Assessment'}</span>
              </button>

              <ShimmerButton
                onClick={() => setIsAddStudentModalOpen(true)}
                shimmerColor="#06b6d4"
                className="px-3.5 py-1.5 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'नया छात्र जोड़ें' : '+ Add Student'}</span>
              </ShimmerButton>

              <button
                onClick={() => {
                  setAssessmentTargetStudent(null);
                  setIsAssessmentModalOpen(true);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <ClipboardPen className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'आकलन दर्ज करें' : 'Enter Test Data'}</span>
              </button>

              <button
                onClick={resetToDemoData}
                className="px-2.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs transition-colors"
                title="Reset to Class 3A 42 Students Demo Data"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Background Mood Switcher */}
            <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-xl">
              <span className="text-[10px] font-mono text-slate-400 px-2 flex items-center gap-1">
                <SunMedium className="w-3 h-3 text-orange-400" />
                <span>Theme:</span>
              </span>
              {(['subtle', 'balanced', 'vibrant']).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setThemeIntensity(mode)}
                  className={`px-2 py-1 text-[10px] font-mono uppercase font-bold rounded-lg transition-all ${
                    themeIntensity === mode 
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-md' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Metric counters */}
            <div className="flex items-center gap-2">
              <div className="p-3 rounded-2xl bg-slate-900/90 border border-white/10 text-center min-w-[80px] backdrop-blur-md shadow-lg">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Total</span>
                <span className="text-xl font-bold font-mono text-white">
                  <NumberTicker value={totalStudents} />
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-center min-w-[80px] backdrop-blur-md shadow-lg shadow-cyan-950/30">
                <span className="text-[10px] uppercase font-mono text-cyan-400 block">Assessed</span>
                <span className="text-xl font-bold font-mono text-cyan-300">
                  <NumberTicker value={assessedStudents} />
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-center min-w-[80px] backdrop-blur-md shadow-lg shadow-rose-950/30">
                <span className="text-[10px] uppercase font-mono text-rose-400 block">Support</span>
                <span className="text-xl font-bold font-mono text-rose-300">
                  <NumberTicker value={countIntervention + countAttention} />
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 🔴 PRIORITY ACTION RECOMMENDATION BANNER & RUNNER                         */}
        {/* ========================================================================= */}
        <PriorityAction lang={lang} onOpenMisconception={onOpenMisconception} />

        {/* ========================================================================= */}
        {/* 4 LEARNING-LEVEL STATUS CARDS WITH 21st.dev SPOTLIGHT & NUMBER TICKER    */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* On Track */}
          <SpotlightCard 
            spotlightColor="rgba(16, 185, 129, 0.22)"
            onClick={() => setStatusFilter(statusFilter === 'on_track' ? 'all' : 'on_track')}
            className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
              statusFilter === 'on_track' 
                ? 'border-emerald-500 ring-2 ring-emerald-500/40 scale-[1.02] shadow-xl shadow-emerald-950/40' 
                : 'border-white/10 hover:border-emerald-500/40'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
              <span className="text-xs font-mono text-slate-400">
                {totalStudents > 0 ? Math.round(((countOnTrack + countExcelling) / totalStudents) * 100) : 0}% of class
              </span>
            </div>
            <span className="text-3xl sm:text-4xl font-black font-display text-white block">
              <NumberTicker value={countOnTrack + countExcelling} />
            </span>
            <span className="text-xs font-bold text-emerald-300 mt-1 block">
              🟢 {t.statusOnTrack}
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">
              At or above Grade 3 competencies
            </span>
          </SpotlightCard>

          {/* Needs Attention */}
          <SpotlightCard 
            spotlightColor="rgba(245, 158, 11, 0.22)"
            onClick={() => setStatusFilter(statusFilter === 'attention' ? 'all' : 'attention')}
            className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
              statusFilter === 'attention' 
                ? 'border-amber-500 ring-2 ring-amber-500/40 scale-[1.02] shadow-xl shadow-amber-950/40' 
                : 'border-white/10 hover:border-amber-500/40'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="w-3 h-3 rounded-full bg-amber-400 shadow-sm shadow-amber-400" />
              <span className="text-xs font-mono text-slate-400">
                {totalStudents > 0 ? Math.round((countAttention / totalStudents) * 100) : 0}% of class
              </span>
            </div>
            <span className="text-3xl sm:text-4xl font-black font-display text-white block">
              <NumberTicker value={countAttention} />
            </span>
            <span className="text-xs font-bold text-amber-300 mt-1 block">
              🟡 {t.statusNeedsAttention}
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Grade 2 level (1-year learning gap)
            </span>
          </SpotlightCard>

          {/* Critical Intervention */}
          <SpotlightCard 
            spotlightColor="rgba(244, 63, 94, 0.22)"
            onClick={() => setStatusFilter(statusFilter === 'intervention' ? 'all' : 'intervention')}
            className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
              statusFilter === 'intervention' 
                ? 'border-rose-500 ring-2 ring-rose-500/40 scale-[1.02] shadow-xl shadow-rose-950/40' 
                : 'border-white/10 hover:border-rose-500/40'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="w-3 h-3 rounded-full bg-rose-400 shadow-sm shadow-rose-400" />
              <span className="text-xs font-mono text-slate-400">
                {totalStudents > 0 ? Math.round((countIntervention / totalStudents) * 100) : 0}% of class
              </span>
            </div>
            <span className="text-3xl sm:text-4xl font-black font-display text-white block">
              <NumberTicker value={countIntervention} />
            </span>
            <span className="text-xs font-bold text-rose-300 mt-1 block">
              🔴 {t.statusCritical}
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Grade 1 level (2+ years behind)
            </span>
          </SpotlightCard>

          {/* Unassessed */}
          <SpotlightCard 
            spotlightColor="rgba(148, 163, 184, 0.15)"
            onClick={() => setStatusFilter(statusFilter === 'unassessed' ? 'all' : 'unassessed')}
            className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
              statusFilter === 'unassessed' 
                ? 'border-slate-400 ring-2 ring-slate-400/40 scale-[1.02] shadow-xl shadow-slate-900/40' 
                : 'border-white/10 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="w-3 h-3 rounded-full bg-slate-500" />
              <span className="text-xs font-mono text-slate-400">
                {totalStudents > 0 ? Math.round((countUnassessed / totalStudents) * 100) : 0}% of class
              </span>
            </div>
            <span className="text-3xl sm:text-4xl font-black font-display text-white block">
              <NumberTicker value={countUnassessed} />
            </span>
            <span className="text-xs font-bold text-slate-400 mt-1 block">
              ⚪ {t.statusUnassessed}
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Pending baseline screener
            </span>
          </SpotlightCard>

        </div>

        {/* ========================================================================= */}
        {/* 6. INTELLIGENT TaRL STUDENT GROUPING                                      */}
        {/* ========================================================================= */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xl font-bold font-display text-white">
                  {t.groupingTitle}
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-body">
                {t.groupingSubtitle}
              </p>
            </div>

            <button
              onClick={onOpenActivityStudio}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-cyan-300 flex items-center gap-1.5 transition-colors self-start shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate Group Activities</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {TARL_GROUPS.map((group) => {
              return (
                <SpotlightCard 
                  key={group.id}
                  spotlightColor="rgba(6, 182, 212, 0.15)"
                  className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                        group.color === 'rose' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                        group.color === 'amber' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        group.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                        'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {group.count} Students
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">TaRL Station</span>
                    </div>

                    <h4 className="text-sm font-bold text-white mb-1">
                      {lang === 'hi' ? group.nameHi : group.name}
                    </h4>

                    <p className="text-xs font-medium text-cyan-400 mb-2">
                      🎯 {lang === 'hi' ? group.focusSkillHi : group.focusSkill}
                    </p>

                    <p className="text-[11px] text-slate-400 leading-relaxed font-body mb-3">
                      {lang === 'hi' ? group.targetGoalHi : group.targetGoal}
                    </p>

                    {/* Student list preview */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {group.students.slice(0, 4).map((name, i) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                          {name.split(' ')[0]}
                        </span>
                      ))}
                      {group.students.length > 4 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-500">
                          +{group.students.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={onOpenActivityStudio}
                    className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition-colors flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span>{t.startGroupActivity}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </SpotlightCard>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COMPLETE STUDENT ROSTER & SEARCH TABLE                                    */}
        {/* ========================================================================= */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold font-display text-white">
                Student Diagnostic Roster ({filteredStudents.length} Students)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 font-body">
                Click any row to inspect deep-dive learning profile, conduct tests, or manage enrollment.
              </p>
            </div>

            {/* Search bar & status filter */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search student or roll #..."
                  className="bg-slate-900 border border-slate-700/80 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 w-48 sm:w-60 font-body"
                />
              </div>

              {statusFilter !== 'all' && (
                <button
                  onClick={() => setStatusFilter('all')}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-mono"
                >
                  Reset Filter
                </button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                  <th className="pb-3 font-semibold">Roll #</th>
                  <th className="pb-3 font-semibold">Student Name</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Actual Level</th>
                  <th className="pb-3 font-semibold">Identified Primary Gap</th>
                  <th className="pb-3 font-semibold">TaRL Group</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-slate-900/60 transition-colors group"
                  >
                    <td 
                      onClick={() => onSelectStudent(student)}
                      className="py-3 font-mono text-slate-400 cursor-pointer"
                    >
                      #{student.rollNo}
                    </td>

                    <td 
                      onClick={() => onSelectStudent(student)}
                      className="py-3 cursor-pointer"
                    >
                      <span className="font-bold text-white group-hover:text-cyan-400 transition-colors block">
                        {lang === 'hi' ? student.nameHi : student.name}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        Age {student.age || 8} • Attendance {student.attendance}
                      </span>
                    </td>

                    <td 
                      onClick={() => onSelectStudent(student)}
                      className="py-3 cursor-pointer"
                    >
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                        student.status === 'intervention' ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' :
                        student.status === 'attention' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                        student.status === 'excelling' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' :
                        student.status === 'unassessed' ? 'bg-slate-800 text-slate-400 border-slate-700' :
                        'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      }`}>
                        {student.status.toUpperCase()}
                      </span>
                    </td>

                    <td 
                      onClick={() => onSelectStudent(student)}
                      className="py-3 text-slate-300 font-medium cursor-pointer"
                    >
                      {lang === 'hi' ? student.currentLevelHi : student.currentLevel}
                    </td>

                    <td 
                      onClick={() => onSelectStudent(student)}
                      className="py-3 text-slate-400 max-w-xs truncate cursor-pointer"
                    >
                      {lang === 'hi' ? student.primaryGapHi : student.primaryGap}
                    </td>

                    <td 
                      onClick={() => onSelectStudent(student)}
                      className="py-3 text-xs font-mono font-semibold text-cyan-300 cursor-pointer"
                    >
                      {lang === 'hi' ? student.tarlGroupHi?.split('—')[0] : student.tarlGroup?.split('—')[0]}
                    </td>

                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setAssessmentTargetStudent(student);
                            setIsAssessmentModalOpen(true);
                          }}
                          className="px-2 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 text-[11px] font-semibold transition-all border border-cyan-500/30"
                          title="Record FLN Screener for this student"
                        >
                          Assess
                        </button>
                        
                        <button 
                          onClick={() => onSelectStudent(student)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold transition-all border border-slate-700"
                        >
                          Profile
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteStudent(student.id);
                          }}
                          className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                          title="Delete student"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
}
