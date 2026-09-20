import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  GraduationCap, 
  BookOpen, 
  Calculator, 
  Mic, 
  CheckCircle2, 
  Plus, 
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { BorderBeam } from './ui/BorderBeam';
import { ShimmerButton } from './ui/ShimmerButton';

export function CreateAssessmentModal() {
  const { 
    isCreateAssessmentModalOpen, 
    setIsCreateAssessmentModalOpen, 
    createAssessment, 
    setCurrentView,
    lang 
  } = useApp();

  const [title, setTitle] = useState('');
  const [grade, setGrade] = useState('Grade 3');
  const [subject, setSubject] = useState('Combined FLN');
  
  // Question 1: Number comparison
  const [numLeft, setNumLeft] = useState('8');
  const [numRight, setNumRight] = useState('6');

  // Question 2: Math problem
  const [expression, setExpression] = useState('43 − 18');
  const [correctAnswer, setCorrectAnswer] = useState('25');
  const [misconceptionCode, setMisconceptionCode] = useState('35');
  const [misconceptionTitle, setMisconceptionTitle] = useState('Top-From-Bottom Subtraction (Missing Regrouping)');

  // Question 3: Reading test
  const [readingTextHi, setReadingTextHi] = useState('सूरज पूर्व से निकलता है और बच्चे स्कूल जाते हैं।');
  const [readingTextEn, setReadingTextEn] = useState('The morning sun shines bright and children walk to school.');
  const [targetWcpm, setTargetWcpm] = useState('35');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdSuccess, setCreatedSuccess] = useState(false);

  // Preset quick templates
  const applyPreset = (presetType) => {
    if (presetType === 'subtraction') {
      setTitle('Grade 3 Subtraction Regrouping Diagnostic');
      setGrade('Grade 3');
      setNumLeft('8');
      setNumRight('6');
      setExpression('43 − 18');
      setCorrectAnswer('25');
      setMisconceptionCode('35');
      setMisconceptionTitle('Independent Digit Inversion (8 - 3 = 5, 4 - 1 = 3)');
      setReadingTextHi('सूरज पूर्व से निकलता है और बच्चे स्कूल जाते हैं।');
      setReadingTextEn('The morning sun shines bright and children walk to school.');
      setTargetWcpm('38');
    } else if (presetType === 'addition') {
      setTitle('Grade 2 Addition with Carry Screener');
      setGrade('Grade 2');
      setNumLeft('9');
      setNumRight('4');
      setExpression('27 + 15');
      setCorrectAnswer('42');
      setMisconceptionCode('312');
      setMisconceptionTitle('Concatenation without carrying tens (2+1=3, 7+5=12 -> 312)');
      setReadingTextHi('कमल घर चल कर मीठे फल खा।');
      setReadingTextEn('Mina plays with a friendly brown puppy.');
      setTargetWcpm('30');
    } else if (presetType === 'multidigit') {
      setTitle('Grade 3 Place-Value & Borrowing Mastery Check');
      setGrade('Grade 3');
      setNumLeft('12');
      setNumRight('9');
      setExpression('61 − 34');
      setCorrectAnswer('27');
      setMisconceptionCode('33');
      setMisconceptionTitle('Subtracting smaller digit from larger digit ignoring place value');
      setReadingTextHi('चिड़िया पेड़ पर मीठा गीत गाती है।');
      setReadingTextEn('The little bird sings a happy song in the big green tree.');
      setTargetWcpm('40');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() && !expression.trim()) return;

    setIsSubmitting(true);

    const asmt = createAssessment({
      title: title.trim() || `${grade} FLN Diagnostic Screener`,
      grade,
      subject,
      numLeft,
      numRight,
      expression,
      correctAnswer,
      misconceptionCode,
      misconceptionTitle,
      readingTextHi,
      readingTextEn,
      targetWcpm
    });

    setCreatedSuccess(true);
    confetti({ particleCount: 80, spread: 65, origin: { y: 0.6 } });

    setTimeout(() => {
      setIsSubmitting(false);
      setCreatedSuccess(false);
      setIsCreateAssessmentModalOpen(false);
      // Auto redirect to test if desired
      setCurrentView('assessment');
    }, 1000);
  };

  if (!isCreateAssessmentModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#070b19] rounded-3xl border border-white/15 shadow-2xl p-6 sm:p-8 text-left text-slate-100">
        
        {/* 21st.dev BorderBeam radiant traveling light */}
        <BorderBeam size={220} duration={7} colorFrom="#f59e0b" colorTo="#06b6d4" borderWidth={1.5} />

        {/* Close Button */}
        <button
          onClick={() => setIsCreateAssessmentModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 pb-5 border-b border-white/10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-cyan-500 p-0.5 shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-[#070b19] rounded-[14px] flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold font-display text-white">
              {lang === 'hi' ? 'नई FLN नैदानिक जांच तैयार करें' : 'Create New FLN Diagnostic Assessment'}
            </h3>
            <p className="text-xs text-slate-400 font-body mt-0.5">
              {lang === 'hi' 
                ? 'अपनी कक्षा के अनुसार नए गणित सवाल, मौखिक पठन वाक्य व भ्रांति नियम जोड़ें' 
                : 'Author custom numeracy puzzles, oral reading passages & cognitive diagnostic benchmarks'}
            </p>
          </div>
        </div>

        {/* Quick Template Presets */}
        <div className="my-5 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'hi' ? 'त्वरित टेम्पलेट्स:' : 'Quick Templates:'}</span>
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => applyPreset('subtraction')}
              className="px-2.5 py-1 rounded-lg bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold hover:bg-cyan-900/80 transition-colors"
            >
              Grade 3 Subtraction
            </button>
            <button
              type="button"
              onClick={() => applyPreset('addition')}
              className="px-2.5 py-1 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-semibold hover:bg-emerald-900/80 transition-colors"
            >
              Grade 2 Addition Carry
            </button>
            <button
              type="button"
              onClick={() => applyPreset('multidigit')}
              className="px-2.5 py-1 rounded-lg bg-purple-950/70 border border-purple-500/40 text-purple-300 text-xs font-mono font-semibold hover:bg-purple-900/80 transition-colors"
            >
              2-Digit Regrouping
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* General Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="sm:col-span-2">
              <label className="text-xs font-mono font-semibold text-slate-300 block mb-1">
                {lang === 'hi' ? 'आकलन का नाम *' : 'Assessment Title *'}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Term 1 FLN Foundational Screener"
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-body transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-300 block mb-1">
                {lang === 'hi' ? 'लक्षित कक्षा *' : 'Target Grade *'}
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-body transition-colors cursor-pointer"
              >
                <option value="Grade 1">Grade 1</option>
                <option value="Grade 2">Grade 2</option>
                <option value="Grade 3">Grade 3</option>
                <option value="Grade 4">Grade 4</option>
                <option value="Grade 5">Grade 5</option>
              </select>
            </div>
          </div>

          {/* Section 1: Number Sense Comparison */}
          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300">
              <Layers className="w-3.5 h-3.5" />
              <span>Step 1: Number Comparison Screener</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Option A (Left Number)</label>
                <input
                  type="number"
                  value={numLeft}
                  onChange={(e) => setNumLeft(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Option B (Right Number)</label>
                <input
                  type="number"
                  value={numRight}
                  onChange={(e) => setNumRight(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Math Problem & Cognitive Diagnosis */}
          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300">
              <Calculator className="w-3.5 h-3.5" />
              <span>Step 2: Arithmetic Diagnostic Problem</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Math Expression (e.g. 43 − 18)</label>
                <input
                  type="text"
                  required
                  value={expression}
                  onChange={(e) => setExpression(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] text-emerald-400 block mb-1 font-semibold">Correct Answer (Mastery)</label>
                <input
                  type="text"
                  required
                  value={correctAnswer}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                  className="w-full bg-slate-950 border border-emerald-500/50 rounded-xl px-3 py-2 text-xs text-emerald-300 font-mono font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
              <div>
                <label className="text-[11px] text-rose-400 block mb-1 font-semibold">Misconception Code</label>
                <input
                  type="text"
                  value={misconceptionCode}
                  onChange={(e) => setMisconceptionCode(e.target.value)}
                  placeholder="e.g. 35"
                  className="w-full bg-slate-950 border border-rose-500/40 rounded-xl px-3 py-2 text-xs text-rose-300 font-mono"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[11px] text-slate-400 block mb-1">Detected Cognitive Gap Name</label>
                <input
                  type="text"
                  value={misconceptionTitle}
                  onChange={(e) => setMisconceptionTitle(e.target.value)}
                  placeholder="e.g. Independent digit inversion without regrouping"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Oral Reading Passage */}
          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-300">
              <Mic className="w-3.5 h-3.5" />
              <span>Step 3: Oral Reading Fluency Screener</span>
            </div>
            
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Reading Passage (Hindi)</label>
              <input
                type="text"
                value={readingTextHi}
                onChange={(e) => setReadingTextHi(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Reading Passage (English)</label>
              <input
                type="text"
                value={readingTextEn}
                onChange={(e) => setReadingTextEn(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div className="w-48">
              <label className="text-[11px] text-slate-400 block mb-1">Target Fluency (WCPM)</label>
              <input
                type="number"
                value={targetWcpm}
                onChange={(e) => setTargetWcpm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-cyan-300 font-mono font-bold"
              />
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIsCreateAssessmentModalOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
            >
              Cancel
            </button>

            <ShimmerButton
              type="submit"
              disabled={isSubmitting}
              shimmerColor="#f59e0b"
              className="px-6 py-2.5 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/25 bg-gradient-to-r from-amber-400 to-orange-400"
            >
              <span className="flex items-center gap-1.5">
                {createdSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-950" />
                    <span>Assessment Published!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Publish & Launch Screener →</span>
                  </>
                )}
              </span>
            </ShimmerButton>
          </div>

        </form>

      </div>
    </div>
  );
}
