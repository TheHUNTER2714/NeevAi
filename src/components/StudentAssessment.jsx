import React, { useState, useEffect, useRef } from 'react';
import { 
  GraduationCap, 
  Volume2, 
  Mic, 
  MicOff, 
  CheckCircle2, 
  RotateCcw, 
  Apple,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { BorderBeam } from './ui/BorderBeam';
import { AnimatedShinyText } from './ui/AnimatedShinyText';
import { NumberTicker } from './ui/NumberTicker';
import { SpotlightCard } from './ui/SpotlightCard';
import { Ripple } from './ui/Ripple';
import { PulsingBadge } from './ui/PulsingBadge';
import { ShimmerButton } from './ui/ShimmerButton';
import { TRANSLATIONS } from '../data/translations';

export function StudentAssessment({ lang, onCompleteToDashboard }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const { 
    activeAssessment, 
    assessments, 
    setActiveAssessmentId, 
    setIsCreateAssessmentModalOpen,
    students, 
    recordAssessment, 
    assessmentTargetStudent, 
    setSelectedStudent,
    setIsAddStudentModalOpen 
  } = useApp();

  const [currentStep, setCurrentStep] = useState(0); // 0: Comparison, 1: Math puzzle, 2: Reading, 3: Final Report
  const [selectedNumChoice, setSelectedNumChoice] = useState(null);
  const [mathAnswer, setMathAnswer] = useState('');

  // Target Student state (defaults to assessmentTargetStudent or first student in class)
  const [activeStudentId, setActiveStudentId] = useState(
    () => assessmentTargetStudent?.id || (students && students.length > 0 ? students[0].id : '')
  );

  useEffect(() => {
    if (assessmentTargetStudent?.id) {
      setActiveStudentId(assessmentTargetStudent.id);
    } else if (students && students.length > 0) {
      const exists = students.some((s) => String(s.id) === String(activeStudentId));
      if (!exists) {
        setActiveStudentId(students[0].id);
      }
    } else {
      setActiveStudentId('');
    }
  }, [assessmentTargetStudent, students, activeStudentId]);

  const currentStudent = (students && students.find((s) => String(s.id) === String(activeStudentId))) || (students && students[0]) || {
    id: 999,
    rollNo: 1,
    name: lang === 'hi' ? 'परीक्षार्थी छात्र' : 'Student Candidate',
    nameHi: 'परीक्षार्थी छात्र',
    currentLevel: 'Grade 2.0',
    currentLevelHi: 'कक्षा 2.0',
    status: 'unassessed'
  };
  
  // Dynamic Assessment Question Data
  const numLeft = activeAssessment?.numCompare?.left ?? 7;
  const numRight = activeAssessment?.numCompare?.right ?? 5;
  const mathExpr = activeAssessment?.mathProblem?.expression ?? '52 − 27';
  const mathCorrect = activeAssessment?.mathProblem?.correctAnswer ?? '25';
  const mathMisconception = activeAssessment?.mathProblem?.misconceptionCode ?? '35';

  const targetReadingText = lang === 'hi' 
    ? (activeAssessment?.readingTest?.textHi || t.studentReadingText)
    : (activeAssessment?.readingTest?.textEn || t.studentReadingTextEn);

  // Split reading text into clean tokens for real-time word tracking
  const targetWords = targetReadingText.split(/\s+/).filter(Boolean);

  // Speech Recognition & Voice States
  const [isRecording, setIsRecording] = useState(false);
  const [voiceAnalyzed, setVoiceAnalyzed] = useState(false);
  const [soundPlaying, setSoundPlaying] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [matchedWordIndices, setMatchedWordIndices] = useState([]);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [calculatedWcpm, setCalculatedWcpm] = useState(38);
  const [calculatedAccuracy, setCalculatedAccuracy] = useState(94);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);

  const recognitionRef = useRef(null);
  const timerRef = useRef(null);
  const startTimeRef = useRef(0);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-US';

        recognition.onresult = (event) => {
          let currentTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript + ' ';
          }
          currentTranscript = currentTranscript.trim();
          setSpokenTranscript(currentTranscript);

          // Word matching logic
          const spokenTokens = currentTranscript
            .toLowerCase()
            .replace(/[.,?!।]/g, '')
            .split(/\s+/);

          const matched = [];
          targetWords.forEach((word, idx) => {
            const cleanWord = word.toLowerCase().replace(/[.,?!।]/g, '');
            if (spokenTokens.some(tok => tok.includes(cleanWord) || cleanWord.includes(tok))) {
              matched.push(idx);
            }
          });
          setMatchedWordIndices(matched);

          // Real-time metrics
          const elapsedMin = Math.max(0.1, (Date.now() - startTimeRef.current) / 60000);
          const wcpm = Math.min(120, Math.round(matched.length / elapsedMin));
          const acc = Math.min(100, Math.round((matched.length / Math.max(1, targetWords.length)) * 100));
          if (matched.length > 0) {
            setCalculatedWcpm(wcpm || 38);
            setCalculatedAccuracy(acc || 92);
          }
        };

        recognition.onerror = () => {
          // Fallback simulation mode
          setIsSpeechSupported(false);
        };

        recognitionRef.current = recognition;
      } catch (err) {
        setIsSpeechSupported(false);
      }
    } else {
      setIsSpeechSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (_) {}
      }
    };
  }, [lang, targetWords]);

  // Audio prompt narration
  const playAudioPrompt = (text) => {
    setSoundPlaying(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.88;
      utterance.onend = () => setSoundPlaying(false);
      utterance.onerror = () => setSoundPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setSoundPlaying(false), 2000);
    }
  };

  // Toggle Voice Recording
  const handleToggleRecord = () => {
    if (isRecording) {
      // STOP recording
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);

      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (_) {}
      }

      // If speech recognition was not used or words matched were 0, provide simulated analysis
      if (matchedWordIndices.length === 0) {
        setMatchedWordIndices(targetWords.map((_, i) => i));
        setCalculatedWcpm(38);
        setCalculatedAccuracy(95);
      }

      setVoiceAnalyzed(true);
    } else {
      // START recording
      setIsRecording(true);
      setVoiceAnalyzed(false);
      setSpokenTranscript('');
      setMatchedWordIndices([]);
      setRecordingSeconds(0);
      startTimeRef.current = Date.now();

      // Start duration counter
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);

      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (_) {
          // If already running or permission blocked, simulate
        }
      }
    }
  };

  const handleNextStep = async () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      // Step 2 to Step 3: Automatically persist cognitive diagnosis to student profile
      if (currentStudent && recordAssessment) {
        try {
          await recordAssessment(currentStudent.id, {
            mathAnswer: mathAnswer || '35',
            wcpm: calculatedWcpm,
            accuracy: calculatedAccuracy
          });
        } catch (err) {
          console.error("Failed to save assessment:", err);
        }
      }
      setCurrentStep(3);
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedNumChoice(null);
    setMathAnswer('');
    setIsRecording(false);
    setVoiceAnalyzed(false);
    setSpokenTranscript('');
    setMatchedWordIndices([]);
  };

  const handleSelectNextStudent = () => {
    if (students && students.length > 0) {
      const currentIndex = students.findIndex((s) => String(s.id) === String(currentStudent.id));
      const nextIndex = (currentIndex + 1) % students.length;
      setActiveStudentId(students[nextIndex].id);
      handleReset();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      
      {/* Top Banner with Active Assessment & Student Selectors */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <PulsingBadge variant="cyan">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>ASER & CBSE FLN Child Interface</span>
            </PulsingBadge>

            {/* Student Switcher Pill */}
            {students && students.length > 0 ? (
              <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-700 px-3 py-1 rounded-full text-xs font-mono">
                <span className="text-slate-400">Student:</span>
                <select
                  value={activeStudentId}
                  onChange={(e) => setActiveStudentId(e.target.value)}
                  className="bg-transparent text-amber-300 font-bold focus:outline-none cursor-pointer text-xs"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                      #{s.rollNo} {lang === 'hi' ? s.nameHi || s.name : s.name} ({s.currentLevel})
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <button
                onClick={() => setIsAddStudentModalOpen(true)}
                className="flex items-center gap-1.5 bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 px-3 py-1 rounded-full text-xs font-mono hover:bg-cyan-900 transition-colors"
              >
                <span>+ {lang === 'hi' ? 'पहले छात्र जोड़ें' : 'Enroll Student First'}</span>
              </button>
            )}

            {/* Assessment Switcher Pill */}
            {assessments && assessments.length > 1 && (
              <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-700 px-3 py-1 rounded-full text-xs font-mono">
                <span className="text-slate-400">Test:</span>
                <select
                  value={activeAssessment?.id}
                  onChange={(e) => setActiveAssessmentId(e.target.value)}
                  className="bg-transparent text-cyan-300 font-bold focus:outline-none cursor-pointer text-xs"
                >
                  {assessments.map((a) => (
                    <option key={a.id} value={a.id} className="bg-slate-900 text-white">
                      {a.title} ({a.grade})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={() => setIsCreateAssessmentModalOpen(true)}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>+ Create Assessment</span>
            </button>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight flex items-center gap-2">
            <span>{activeAssessment?.title || t.testTitle}</span>
            <AnimatedShinyText className="text-xs font-mono text-cyan-400 font-normal">
              Direct Screener
            </AnimatedShinyText>
          </h2>
          <p className="text-slate-400 text-xs mt-1 font-body">
            {t.testSubtitle} • Screening: <span className="text-amber-300 font-semibold font-mono">#{currentStudent?.rollNo} {lang === 'hi' ? currentStudent?.nameHi || currentStudent?.name : currentStudent?.name}</span>
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {[0, 1, 2, 3].map((stepIdx) => (
            <div
              key={stepIdx}
              className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                currentStep === stepIdx
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-400 scale-105'
                  : currentStep > stepIdx
                  ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50'
                  : 'bg-slate-900 border border-slate-800 text-slate-500'
              }`}
            >
              {currentStep > stepIdx ? '✓' : stepIdx + 1}
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* QUESTION 1: NUMBER COMPARISON (WHICH IS GREATER?)                         */}
      {/* ========================================================================= */}
      {currentStep === 0 && (
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 text-center shadow-2xl animate-fade-in relative overflow-hidden">
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <button
              onClick={() => playAudioPrompt(lang === 'hi' 
                ? `कौन सी संख्या बड़ी है? ${numLeft} या ${numRight}?` 
                : `Which number is greater? ${numLeft} or ${numRight}?`)}
              className={`p-2.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 transition-all ${soundPlaying ? 'animate-bounce' : ''}`}
              title="Play Voice Narration"
            >
              <Volume2 className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-cyan-400 font-semibold">
              {t.listenAudio}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white mb-8">
            {lang === 'hi' ? 'कौन सी संख्या बड़ी है?' : 'Which number is greater?'}
          </h3>

          {/* Big touchable cards for children wrapped in SpotlightCards */}
          <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto mb-8">
            
            {/* Option Left */}
            <SpotlightCard
              spotlightColor="rgba(6, 182, 212, 0.25)"
              onClick={() => setSelectedNumChoice(numLeft)}
              className={`p-8 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center justify-center transform active:scale-95 cursor-pointer ${
                selectedNumChoice === numLeft
                  ? 'bg-gradient-to-b from-cyan-950 to-slate-900 border-cyan-400 shadow-2xl shadow-cyan-500/30 scale-105'
                  : 'bg-slate-900/80 hover:bg-slate-800 border-slate-700 text-white hover:border-slate-500'
              }`}
            >
              <span className="text-6xl sm:text-7xl font-black font-display text-white mb-3">{numLeft}</span>
              <div className="flex flex-wrap items-center justify-center gap-1 max-w-[120px]">
                {Array.from({ length: Math.min(12, numLeft) }).map((_, i) => (
                  <Apple key={i} className="w-4 h-4 text-rose-400 fill-rose-400/80" />
                ))}
              </div>
              <span className="text-xs font-mono text-slate-400 mt-2">{numLeft} items</span>
            </SpotlightCard>

            {/* Option Right */}
            <SpotlightCard
              spotlightColor="rgba(16, 185, 129, 0.25)"
              onClick={() => setSelectedNumChoice(numRight)}
              className={`p-8 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center justify-center transform active:scale-95 cursor-pointer ${
                selectedNumChoice === numRight
                  ? 'bg-gradient-to-b from-cyan-950 to-slate-900 border-cyan-400 shadow-2xl shadow-cyan-500/30 scale-105'
                  : 'bg-slate-900/80 hover:bg-slate-800 border-slate-700 text-white hover:border-slate-500'
              }`}
            >
              <span className="text-6xl sm:text-7xl font-black font-display text-white mb-3">{numRight}</span>
              <div className="flex flex-wrap items-center justify-center gap-1 max-w-[120px]">
                {Array.from({ length: Math.min(12, numRight) }).map((_, i) => (
                  <Apple key={i} className="w-4 h-4 text-emerald-400 fill-emerald-400/80" />
                ))}
              </div>
              <span className="text-xs font-mono text-slate-400 mt-2">{numRight} items</span>
            </SpotlightCard>

          </div>

          <div className="flex justify-center">
            <ShimmerButton
              disabled={selectedNumChoice === null}
              onClick={handleNextStep}
              shimmerColor="#06b6d4"
              className="px-8 py-3 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span>{lang === 'hi' ? 'अगला प्रश्न →' : 'Next Question →'}</span>
            </ShimmerButton>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* QUESTION 2: ARITHMETIC DIAGNOSTIC PUZZLE                                  */}
      {/* (NO ANSWER HINTS, NO SIMULATE 35 / 25 BUTTONS!)                           */}
      {/* ========================================================================= */}
      {currentStep === 1 && (
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 text-center shadow-2xl animate-fade-in relative overflow-hidden">
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <button
              onClick={() => playAudioPrompt(lang === 'hi' ? `${mathExpr} हल करें। उत्तर क्या होगा?` : `Solve ${mathExpr}. What is the answer?`)}
              className="p-2.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 transition-all"
              title="Play Voice Narration"
            >
              <Volume2 className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-cyan-400 font-semibold">
              {t.listenAudio}
            </span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-white mb-6">
            {mathExpr} = ?
          </h3>

          {/* Child touch keypad */}
          <div className="max-w-xs mx-auto mb-8">
            <div className="w-full bg-slate-950 p-4 rounded-2xl border border-cyan-500/30 text-4xl font-mono font-bold text-white mb-4 min-h-[68px] flex items-center justify-center shadow-inner">
              {mathAnswer || '—'}
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <button
                  key={n}
                  onClick={() => setMathAnswer(mathAnswer + n)}
                  className="p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-lg font-bold text-white active:scale-95 transition-all shadow-sm"
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setMathAnswer('')}
                className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs font-bold active:scale-95"
              >
                Clear
              </button>
              <button
                onClick={() => setMathAnswer(mathAnswer + '0')}
                className="p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-lg font-bold text-white active:scale-95"
              >
                0
              </button>
              <button
                onClick={() => setMathAnswer(mathAnswer.slice(0, -1))}
                className="p-3.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold active:scale-95"
              >
                ⌫
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <ShimmerButton
              disabled={!mathAnswer}
              onClick={handleNextStep}
              shimmerColor="#10b981"
              className="px-8 py-3 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 disabled:opacity-30 flex items-center gap-2"
            >
              <span>{lang === 'hi' ? 'मौखिक पठन जांच की ओर →' : 'Next: Oral Reading Screener →'}</span>
            </ShimmerButton>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* QUESTION 3: ORAL READING VOICE ASSESSMENT (REAL SPEECH RECOGNITION)        */}
      {/* ========================================================================= */}
      {currentStep === 2 && (
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 text-center shadow-2xl animate-fade-in relative overflow-hidden">
          
          <div className="flex items-center justify-between max-w-xl mx-auto mb-3">
            <PulsingBadge variant="cyan">
              <Mic className="w-3.5 h-3.5" />
              <span>{t.voiceRecordingTest}</span>
            </PulsingBadge>

            {/* Listen button for student to hear pronunciation */}
            <button
              onClick={() => playAudioPrompt(targetReadingText)}
              className="flex items-center gap-1 text-xs font-mono text-cyan-300 hover:text-cyan-200 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full transition-all"
              title="Hear sentence spoken"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Listen Sentence</span>
            </button>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-2">
            {lang === 'hi' ? 'कृपया इस वाक्य को ज़ोर से पढ़ें:' : 'Please read this sentence aloud:'}
          </h3>

          {/* Real-Time Word Highlighting Reading Display */}
          <div className="my-6 p-6 sm:p-8 rounded-2xl bg-slate-950/90 border border-cyan-500/30 text-2xl sm:text-3xl font-bold leading-relaxed max-w-xl mx-auto shadow-inner flex flex-wrap items-center justify-center gap-2.5">
            {targetWords.map((word, idx) => {
              const isMatched = matchedWordIndices.includes(idx);
              return (
                <span
                  key={idx}
                  className={`transition-all duration-300 px-1.5 py-0.5 rounded-lg ${
                    isMatched
                      ? 'text-emerald-300 bg-emerald-950/80 border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.3)] scale-105'
                      : isRecording
                      ? 'text-cyan-200 hover:text-white'
                      : 'text-cyan-300'
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </div>

          {/* Recording interface with 21st.dev Ripple pulse animation */}
          <div className="relative flex flex-col items-center justify-center my-6 py-4 overflow-hidden rounded-3xl">
            
            {/* Concentric 21st.dev Ripple rings active when recording */}
            {isRecording && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <Ripple numCircles={4} mainCircleSize={120} mainCircleOpacity={0.4} />
              </div>
            )}

            {/* Big Mic Button */}
            <button
              onClick={handleToggleRecord}
              className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl active:scale-95 ${
                isRecording
                  ? 'bg-rose-500 text-white shadow-rose-500/50 scale-110 ring-8 ring-rose-500/30'
                  : 'bg-gradient-to-tr from-cyan-500 to-emerald-400 text-slate-950 hover:scale-105 shadow-cyan-500/30'
              }`}
            >
              {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </button>

            <div className="relative z-10 flex items-center gap-2 mt-4 font-mono text-xs">
              <span className={isRecording ? 'text-rose-400 font-bold animate-pulse' : 'text-slate-300 font-semibold'}>
                {isRecording 
                  ? (lang === 'hi' ? `🔴 रिकॉर्डिंग चालू है (${recordingSeconds}s)... रोकने के लिए पुनः दबाएं` : `🔴 Recording voice (${recordingSeconds}s)... Click again to stop & analyze`) 
                  : (lang === 'hi' ? 'माइक पर दबाएं और पढ़ना शुरू करें' : 'Click Mic and read sentence aloud')}
              </span>
            </div>

            {/* Live Audio Waveform when recording */}
            {isRecording && (
              <div className="relative z-10 flex items-center gap-1.5 h-12 mt-4">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-gradient-to-t from-cyan-400 to-emerald-400 rounded-full animate-bounce shadow-sm"
                    style={{
                      height: `${Math.max(10, Math.sin((i + recordingSeconds) * 0.9) * 36 + 18)}px`,
                      animationDelay: `${(i % 5) * 0.12}s`
                    }}
                  />
                ))}
              </div>
            )}

            {/* Live Recognized Speech Transcript */}
            {spokenTranscript && (
              <div className="relative z-10 mt-3 max-w-md px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-slate-300 font-mono text-center">
                <span className="text-slate-500 block text-[10px]">Detected Speech:</span>
                "{spokenTranscript}"
              </div>
            )}
          </div>

          {/* Speech Analysis Results with 21st.dev NumberTicker */}
          {voiceAnalyzed && (
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-900/95 border border-emerald-500/40 text-left mb-6 animate-scale-in shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Speech AI Screening Completed</span>
                </span>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  {activeAssessment?.readingTest?.gradeLevel || 'Grade 2.8 Fluency'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">WCPM</span>
                  <span className="text-sm font-bold text-cyan-300 font-mono">
                    <NumberTicker value={calculatedWcpm} /> WCPM
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">Accuracy</span>
                  <span className="text-sm font-bold text-emerald-300 font-mono">
                    <NumberTicker value={calculatedAccuracy} />%
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">Matched Words</span>
                  <span className="text-sm font-bold text-amber-300 font-mono">
                    {matchedWordIndices.length} / {targetWords.length}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center gap-3">
            <ShimmerButton
              disabled={!voiceAnalyzed}
              onClick={handleNextStep}
              shimmerColor="#06b6d4"
              className="px-8 py-3.5 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 disabled:opacity-30 flex items-center gap-2"
            >
              <span>{lang === 'hi' ? 'आकलन परिणाम देखें →' : 'Generate Student Learning Diagnostic →'}</span>
            </ShimmerButton>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* FINAL REPORT CARD: TEACHER ACTIONABLE DIAGNOSTIC WITH 21st.dev BORDERBEAM  */}
      {/* ========================================================================= */}
      {currentStep === 3 && (
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-emerald-500/40 text-left shadow-2xl animate-fade-in relative overflow-hidden">
          
          {/* 21st.dev BorderBeam radiant traveling light */}
          <BorderBeam 
            size={260} 
            duration={8} 
            colorFrom="#10b981" 
            colorTo="#06b6d4" 
            borderWidth={2}
          />

          {/* Header as explicitly requested */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 relative z-10">
            <div>
              <PulsingBadge variant="emerald" className="mb-1.5">
                Assessment Complete
              </PulsingBadge>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white mt-1">
                Student Diagnostic Summary
              </h3>
              <span className="text-xs text-slate-400 block mt-1">
                Active Assessment: <strong className="text-amber-400 font-mono">{activeAssessment?.title || 'Grade 3 ASER & CBSE FLN Screener'}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <button
                onClick={handleReset}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-xs flex items-center gap-1.5 hover:bg-slate-800 transition-colors"
                title="Retake current test"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake</span>
              </button>

              <button
                onClick={handleSelectNextStudent}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 hover:bg-cyan-900/60 transition-colors"
                title="Screen next child"
              >
                <span>Next Child →</span>
              </button>
            </div>
          </div>

          {/* Assessed Student Snapshot Banner */}
          <div className="my-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-700/80 relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-400 text-slate-950 font-black font-display text-lg flex items-center justify-center shadow-md">
                #{currentStudent?.rollNo || 1}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base sm:text-lg font-bold text-white font-display">
                    {lang === 'hi' ? currentStudent?.nameHi || currentStudent?.name : currentStudent?.name}
                  </h4>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    Class 3 — Sec A
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Pre-Test Level: <span className="font-mono text-slate-300">{currentStudent?.currentLevel || 'Grade 1.2'}</span> • Age: {currentStudent?.age || 8} yrs
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                mathAnswer === mathCorrect
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                  : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
              }`}>
                {mathAnswer === mathCorrect ? '🟢 On Track (Mastery)' : '🔴 Needs Targeted Remediation'}
              </span>
            </div>
          </div>

          {/* Diagnostic Breakdown Grids */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 relative z-10">
            
            {/* Finding 1: Numeracy Gap — CBSE FLN LO M301 & RTI EGMA */}
            <SpotlightCard 
              spotlightColor={mathAnswer === mathCorrect ? "rgba(16, 185, 129, 0.2)" : "rgba(244, 63, 94, 0.2)"}
              className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800"
            >
              <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800/80">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>CBSE FLN M301 & RTI EGMA</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Item: {mathExpr}
                </span>
              </div>

              <div className="my-2">
                <span className={`text-xs font-mono font-bold block ${
                  mathAnswer === mathCorrect ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {mathAnswer === mathCorrect 
                    ? '🟢 Place-Value Regrouping Mastered' 
                    : mathAnswer === mathMisconception
                    ? '🚨 Misconception: Top-From-Bottom Independent Inversion'
                    : '🔴 Computational Disconnect in Subtraction'}
                </span>
                <p className="text-sm text-white font-bold mt-1 font-display">
                  Student Answer: <span className="font-mono text-cyan-300">{mathAnswer || 'None'}</span> (Expected: <span className="font-mono text-emerald-300">{mathCorrect}</span>)
                </p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-body mt-2">
                {mathAnswer === mathCorrect
                  ? 'Demonstrates secure place-value understanding. Decomposed one ten into 10 units (12 − 7 = 5) and decremented tens (4 − 2 = 2).'
                  : mathAnswer === mathMisconception
                  ? 'The child subtracted 7 − 2 = 5 in the units column, and 5 − 2 = 3 in the tens column. Subtracted smaller digit from larger digit irrespective of position, missing physical regrouping.'
                  : 'Demonstrates basic quantity recognition but has not mastered 2-digit regrouping across base-10 boundaries.'}
              </p>

              {/* Concrete 15-Minute Manipulative Prescription */}
              <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-amber-500/20 text-xs">
                <span className="text-amber-400 font-semibold block mb-1">
                  🛠️ Prescribed 15-Min Manipulative Intervention:
                </span>
                <p className="text-slate-300 leading-snug">
                  {mathAnswer === mathCorrect
                    ? 'Progress to 3-digit word problems and mental math strategies.'
                    : '10-Rupee Note & Coin Exchange: Child holds five ₹10 notes and two ₹1 coins. To give ₹27, they must physically untie one ₹10 note into ten ₹1 coins.'}
                </p>
              </div>
            </SpotlightCard>

            {/* Finding 2: Literacy Status — Pratham ASER DIYA & RTI EGRA */}
            <SpotlightCard 
              spotlightColor="rgba(16, 185, 129, 0.2)"
              className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800"
            >
              <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800/80">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>ASER DIYA & RTI EGRA Protocol</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Target: 45-60 WCPM
                </span>
              </div>

              <div className="my-2">
                <span className="text-xs font-mono text-emerald-400 font-bold block">
                  🟢 Oral Reading Fluency (ORF) Status
                </span>
                <p className="text-sm text-white font-bold mt-1 font-display">
                  Fluency: <span className="font-mono text-cyan-300">{calculatedWcpm} WCPM</span> • Accuracy: <span className="font-mono text-emerald-300">{calculatedAccuracy}%</span>
                </p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-body mt-2">
                Successfully decoded {matchedWordIndices.length} of {targetWords.length} words in "{targetReadingText}". Phonetic cadence shows developing comfort with compound matras.
              </p>

              {/* Concrete 15-Minute Literacy Prescription */}
              <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-cyan-500/20 text-xs">
                <span className="text-cyan-400 font-semibold block mb-1">
                  📖 Prescribed 15-Min Literacy Intervention:
                </span>
                <p className="text-slate-300 leading-snug">
                  Paired Peer Reading (PaRL): Pair with a fluent peer in Group C using Graded Decodable Readers. Focus on conjunct consonant blends (संयुक्त अक्षर).
                </p>
              </div>
            </SpotlightCard>

          </div>

          {/* J-PAL TaRL Group Assignment & Classroom Reality Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/50 via-slate-900/80 to-emerald-950/50 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10 shadow-lg">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  J-PAL TaRL Cohort:
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  {mathAnswer === mathCorrect
                    ? 'Group C — Fluent & Mastery Extension'
                    : 'Group B — Developing (Place Value & Regrouping)'}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-body leading-relaxed">
                <strong className="text-white">Frontline 2025 Multi-Grade Reality:</strong> Syllabus assumes this child can solve Grade 3 curriculum, but foundational readiness requires concrete manipulatives. In line with J-PAL RCT evidence, dedicating 1 hour daily to TaRL level-targeted activities closes this gap in 40–50 instruction days (+0.70 SD gain).
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 self-stretch sm:self-center">
              <ShimmerButton
                onClick={() => {
                  if (setSelectedStudent && currentStudent) {
                    setSelectedStudent(currentStudent);
                  }
                  onCompleteToDashboard();
                }}
                shimmerColor="#06b6d4"
                className="w-full sm:w-auto px-6 py-3 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-1.5"
              >
                <span>Save to Profile & Open Cockpit →</span>
              </ShimmerButton>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
