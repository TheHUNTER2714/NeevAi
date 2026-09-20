import React, { useState, useEffect } from 'react';
import { 
  X, 
  GraduationCap, 
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { BorderBeam } from './ui/BorderBeam';
import { ShimmerButton } from './ui/ShimmerButton';
import { SpotlightCard } from './ui/SpotlightCard';
import { PulsingBadge } from './ui/PulsingBadge';

export function AssessmentEntryModal() {
  const { 
    isAssessmentModalOpen, 
    setIsAssessmentModalOpen, 
    assessmentTargetStudent,
    students, 
    recordAssessment, 
    lang 
  } = useApp();

  // Selected student
  const [selectedStudentId, setSelectedStudentId] = useState(
    assessmentTargetStudent?.id || (students[0]?.id || 1)
  );

  // Math test data
  const [mathAnswer, setMathAnswer] = useState('35');
  const [canRecognize1Digit, setCanRecognize1Digit] = useState(true);

  // Literacy test data
  const [wcpm, setWcpm] = useState('38');
  const [canReadLetters, setCanReadLetters] = useState(true);
  const [comprehensionPass, setComprehensionPass] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultSummary, setResultSummary] = useState(null);

  // Sync if target student changed
  useEffect(() => {
    if (assessmentTargetStudent?.id) {
      setSelectedStudentId(assessmentTargetStudent.id);
    }
  }, [assessmentTargetStudent]);

  // Live cognitive diagnostic feedback
  const getCognitivePreview = (ans) => {
    const num = Number(ans);
    if (num === 25) {
      return {
        status: 'correct',
        title: lang === 'hi' ? '✅ पुनर्समूहन सही (Grade 3 On Track)' : '✅ Accurately Regrouped (Grade 3 On Track)',
        desc: lang === 'hi' ? 'दहाई से इकाई में सही उधार लिया।' : 'Mastered base-10 borrowing.',
        color: 'text-emerald-300 border-emerald-500/40 bg-emerald-950/30'
      };
    } else if (num === 35) {
      return {
        status: 'misconception',
        title: lang === 'hi' ? '🚨 अंक उलटाव भ्रांति (उधार न लेना)' : '🚨 Top-From-Bottom Independent Inversion',
        desc: lang === 'hi' ? 'इकाई में 7 - 2 = 5 और दहाई में 5 - 2 = 3 किया।' : 'Computed 7 - 2 = 5 and 5 - 2 = 3. Missing base-10 regrouping.',
        color: 'text-rose-300 border-rose-500/40 bg-rose-950/30'
      };
    } else if (num === 46) {
      return {
        status: 'misconception',
        title: lang === 'hi' ? '⚠️ दहाई कम करना भूल जाने की त्रुटि' : '⚠️ Forgotten Decrement Error',
        desc: lang === 'hi' ? 'इकाई में 12 - 7 = 5 सही, लेकिन दहाई में 5 - 2 = 3 की जगह 6 - 2 = 4 किया।' : 'Regrouped units but failed to decrement tens.',
        color: 'text-amber-300 border-amber-500/40 bg-amber-950/30'
      };
    }
    return {
      status: 'neutral',
      title: lang === 'hi' ? 'सामान्य गणना' : 'Standard Calculation',
      desc: lang === 'hi' ? 'मानक अंकगणितीय उत्तर।' : 'Arithmetic response.',
      color: 'text-slate-300 border-slate-700 bg-slate-900'
    };
  };

  const preview = getCognitivePreview(mathAnswer);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updated = await recordAssessment(Number(selectedStudentId), {
      mathAnswer,
      canRecognize1Digit,
      wcpm: Number(wcpm),
      canReadLetters,
      comprehensionPass
    });

    setIsSubmitting(false);
    setResultSummary(updated);
    confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });

    setTimeout(() => {
      setResultSummary(null);
      setIsAssessmentModalOpen(false);
    }, 1800);
  };

  const targetStudentObj = students.find((s) => s.id === Number(selectedStudentId)) || students[0];

  if (!isAssessmentModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto glass-panel rounded-3xl border border-white/15 shadow-2xl p-6 sm:p-8 text-left text-slate-100">
        
        {/* 21st.dev BorderBeam radiant traveling light */}
        <BorderBeam size={240} duration={7} colorFrom="#10b981" colorTo="#06b6d4" borderWidth={1.5} />

        {/* Close Button */}
        <button
          onClick={() => setIsAssessmentModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-5 border-b border-slate-800/80 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-400 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold font-display text-white">
                {lang === 'hi' ? 'त्वरित FLN आकलन दर्ज करें' : 'Conduct / Record FLN Screener'}
              </h3>
              <PulsingBadge variant="cyan">ASER & CBSE FLN</PulsingBadge>
            </div>
            <p className="text-xs text-slate-400 font-body mt-0.5">
              {lang === 'hi' ? 'बच्चे के उत्तर दर्ज करें, AI तुरंत सीखने के स्तर का विश्लेषण करेगा' : 'Input student responses to trigger instant cognitive diagnostic & TaRL grouping'}
            </p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-5 mt-5 relative z-10">
          
          {/* Student Selector */}
          <div>
            <label className="text-xs font-mono font-semibold text-slate-300 block mb-1.5">
              {lang === 'hi' ? 'विद्यार्थी चुनें *' : 'Select Target Student *'}
            </label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white font-medium focus:outline-none focus:border-cyan-400"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  Roll #{s.rollNo}: {s.name} ({s.currentLevel}) — {s.tarlGroup}
                </option>
              ))}
            </select>
          </div>

          {/* Section A: Numeracy Diagnostic Screener */}
          <SpotlightCard 
            spotlightColor="rgba(6, 182, 212, 0.15)"
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Brain className="w-4 h-4" />
                <span>Numeracy Competency (CBSE Class 3 Standard)</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">Problem: 52 − 27</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  {lang === 'hi' ? 'विद्यार्थी का उत्तर (52 - 27) *' : 'Student Response to 52 − 27 *'}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    required
                    value={mathAnswer}
                    onChange={(e) => setMathAnswer(e.target.value)}
                    placeholder="e.g. 35"
                    className="w-28 bg-slate-950 border border-cyan-500/50 rounded-xl px-3 py-2 text-center text-lg font-mono font-bold text-cyan-300 focus:outline-none focus:border-cyan-400"
                  />
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setMathAnswer('35')}
                      className="px-2.5 py-1 text-[11px] rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30"
                      title="Test Misconception 35"
                    >
                      35 (Bug)
                    </button>
                    <button
                      type="button"
                      onClick={() => setMathAnswer('25')}
                      className="px-2.5 py-1 text-[11px] rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30"
                      title="Test Correct 25"
                    >
                      25 (Correct)
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  1-Digit Number Sense
                </label>
                <label className="flex items-center gap-2 cursor-pointer pt-1 text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={canRecognize1Digit}
                    onChange={(e) => setCanRecognize1Digit(e.target.checked)}
                    className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400"
                  />
                  <span>Recognizes 1-9 & compares quantities accurately</span>
                </label>
              </div>
            </div>

            {/* Live Cognitive Feedback Banner */}
            <div className={`p-3 rounded-xl border text-xs transition-all ${preview.color}`}>
              <div className="font-bold flex items-center gap-1.5">
                <span>{preview.title}</span>
              </div>
              <p className="text-[11px] mt-0.5 opacity-90">{preview.desc}</p>
            </div>
          </SpotlightCard>

          {/* Section B: Foundational Literacy Screener */}
          <SpotlightCard 
            spotlightColor="rgba(16, 185, 129, 0.15)"
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Foundational Literacy Screener (ASER Standard)</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">Oral Fluency</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  {lang === 'hi' ? 'मौखिक पठन गति (WCPM)' : 'Oral Reading Fluency (WCPM)'}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={wcpm}
                    onChange={(e) => setWcpm(e.target.value)}
                    placeholder="38"
                    className="w-28 bg-slate-950 border border-emerald-500/50 rounded-xl px-3 py-2 text-center text-lg font-mono font-bold text-emerald-300 focus:outline-none focus:border-emerald-400"
                  />
                  <span className="text-xs text-slate-400">Words / Min (Benchmark: 40+)</span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={canReadLetters}
                    onChange={(e) => setCanReadLetters(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400"
                  />
                  <span>Recognizes basic consonants & simple matras</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={comprehensionPass}
                    onChange={(e) => setComprehensionPass(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400"
                  />
                  <span>Answers 2 simple factual comprehension questions</span>
                </label>
              </div>
            </div>
          </SpotlightCard>

          {/* Success Banner */}
          {resultSummary && (
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs animate-scale-in">
              <span className="font-bold block mb-1 text-white">✓ Assessment Logged Successfully!</span>
              <p className="text-[11px]">
                Updated {resultSummary.name} to <strong>{resultSummary.currentLevel}</strong> in{' '}
                <strong className="text-cyan-300">{resultSummary.tarlGroup}</strong>.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsAssessmentModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
            >
              Cancel
            </button>
            <ShimmerButton
              type="submit"
              disabled={isSubmitting}
              shimmerColor="#06b6d4"
              className="px-6 py-2.5 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{isSubmitting ? 'Analyzing & Syncing...' : 'Save Assessment & Update Cockpit'}</span>
            </ShimmerButton>
          </div>
        </form>

      </div>
    </div>
  );
}
