import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Users, 
  Clock, 
  Sparkles, 
  ArrowRight,
  HelpCircle,
  Award,
  Volume2,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BorderBeam } from './ui/BorderBeam';
import { ShimmerButton } from './ui/ShimmerButton';
import { SpotlightCard } from './ui/SpotlightCard';
import { PulsingBadge } from './ui/PulsingBadge';
import { NumberTicker } from './ui/NumberTicker';
import { TRANSLATIONS } from '../data/translations';

export function PriorityAction({ lang, onOpenMisconception }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Active classroom runner mode
  const [isActiveSession, setIsActiveSession] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 mins
  const [timerRunning, setTimerRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // 8 target students struggling with Subtraction with Borrowing
  const [studentsChecklist, setStudentsChecklist] = useState([
    { id: 's1', name: 'Rahul Sharma (रोहित शर्मा)', checked: false, scoreBefore: 35 },
    { id: 's2', name: 'Neha Gupta (नेहा गुप्ता)', checked: false, scoreBefore: 32 },
    { id: 's3', name: 'Deepak Verma (दीपक वर्मा)', checked: false, scoreBefore: 30 },
    { id: 's4', name: 'Kavita Soni (कविता सोनी)', checked: false, scoreBefore: 38 },
    { id: 's5', name: 'Amit Rawat (अमित रावत)', checked: false, scoreBefore: 35 },
    { id: 's6', name: 'Pooja Devi (पूजा देवी)', checked: false, scoreBefore: 28 },
    { id: 's7', name: 'Manoj Tiwari (मनोज तिवारी)', checked: false, scoreBefore: 36 },
    { id: 's8', name: 'Sonam Bano (सोनम बानो)', checked: false, scoreBefore: 34 },
  ]);

  // Timer countdown
  useEffect(() => {
    let interval = null;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerRunning) {
      setTimerRunning(false);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  const toggleStudent = (id) => {
    const updated = studentsChecklist.map((s) => 
      s.id === id ? { ...s, checked: !s.checked } : s
    );
    setStudentsChecklist(updated);

    // If all students checked, trigger confetti
    if (updated.every((s) => s.checked)) {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const steps = lang === 'hi' ? [
    { title: "कदम 1: मूर्त सामग्री बांटें (2 मिनट)", prompt: "प्रत्येक छात्र को 10-10 तीलियों के 5 बंडल और 2 खुली तीलियां दें। कुल संख्या 52 बनी।" },
    { title: "कदम 2: समस्या महसूस कराएं (3 मिनट)", prompt: "पूछें: 'क्या 2 खुली तीलियों में से 7 तीलियां बिना बंडल खोले दी जा सकती हैं?' बच्चे 'नहीं' कहेंगे।" },
    { title: "कदम 3: बंडल खोलना (5 मिनट)", prompt: "1 बंडल खुलवाएं। 'अब खुली तीलियां कितनी हुईं? 10 + 2 = 12!' अब 12 में से 7 तीलियां अलग करवाएं।" },
    { title: "कदम 4: स्लेट पर जांच (5 मिनट)", prompt: "स्लेट पर 52 - 27 हल करवाएं। प्रत्येक बच्चे का अवलोकन करें और तालिका में टिक लगाएं।" },
  ] : [
    { title: "Step 1: Distribute Concrete Objects (2 mins)", prompt: "Hand each child 5 bundles of ten matchsticks and 2 single sticks. Representing 52." },
    { title: "Step 2: Create Cognitive Need (3 mins)", prompt: "Ask: 'Can you hand me 7 single sticks from just your 2 loose sticks?' Guide them to see they need to untie a bundle." },
    { title: "Step 3: The Regrouping Trade (5 mins)", prompt: "Untie ONE bundle of 10. 'Now how many loose sticks? 10 + 2 = 12!' Now remove 7. Count the remaining 5." },
    { title: "Step 4: Slate Transfer & Check (5 mins)", prompt: "Have children write 52 - 27 on their slates, crossing out the tens digit. Check off each child." }
  ];

  const masteredCount = studentsChecklist.filter((s) => s.checked).length;

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-rose-500/30 bg-gradient-to-r from-rose-950/50 via-slate-950/90 to-amber-950/40 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl">
      
      {/* 21st.dev BorderBeam continuous glowing border animation */}
      <BorderBeam size={250} duration={6} colorFrom="#f43f5e" colorTo="#f59e0b" borderWidth={2} />

      {/* Top Header Badge */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse shadow-lg shadow-rose-950/40">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <PulsingBadge variant="rose">
                {lang === 'hi' ? 'प्राथमिकता 1' : 'Top Priority Action'}
              </PulsingBadge>
              <span className="text-xs text-slate-400">
                {lang === 'hi' ? 'आज की कक्षा के लिए' : 'Recommended for Tomorrow Morning'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-1.5 tracking-tight">
              {lang === 'hi' ? '8 बच्चे घटाव में उधार लेने में अटक रहे हैं' : '8 Students are Struggling with Subtraction Borrowing'}
            </h3>
          </div>
        </div>

        {/* 21st.dev Shimmer Button to open interactive session */}
        {!isActiveSession ? (
          <ShimmerButton
            onClick={() => {
              setIsActiveSession(true);
              setTimerRunning(true);
            }}
            shimmerColor="#f43f5e"
            borderRadius="16px"
            className="shadow-xl shadow-rose-950/50 group"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-white px-2 py-1">
              <Play className="w-4 h-4 fill-rose-400 text-rose-400 group-hover:scale-110 transition-transform" />
              <span>{lang === 'hi' ? '▶ 15-मिनट गतिविधि शुरू करें' : '▶ Start 15-Min Activity Session'}</span>
            </div>
          </ShimmerButton>
        ) : (
          <button
            onClick={() => {
              setIsActiveSession(false);
              setTimerRunning(false);
            }}
            className="px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-white/10 transition-all"
          >
            <X className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'सत्र बंद करें' : 'Minimize Runner'}</span>
          </button>
        )}
      </div>

      {/* Brief explanation before launching runner with 21st.dev SpotlightCards */}
      {!isActiveSession ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 relative z-10">
          
          <SpotlightCard 
            spotlightColor="rgba(244, 63, 94, 0.2)"
            className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80"
          >
            <span className="text-[11px] font-mono text-slate-400 block mb-1">
              {lang === 'hi' ? 'पहचाना गया मानसिक भ्रम' : 'Identified Misconception'}
            </span>
            <p className="text-xs font-semibold text-rose-300">
              52 - 27 = 35 <br />
              <span className="font-normal text-slate-300 text-[11px]">
                {lang === 'hi' 
                  ? 'इकाई में 7 - 2 = 5 और दहाई में 5 - 2 = 3 करके उलटा घटाव।' 
                  : 'Independent digit subtraction (7 - 2 = 5, 5 - 2 = 3) without borrowing.'}
              </span>
            </p>
          </SpotlightCard>

          <SpotlightCard 
            spotlightColor="rgba(245, 158, 11, 0.2)"
            className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80"
          >
            <span className="text-[11px] font-mono text-slate-400 block mb-1">
              {lang === 'hi' ? 'सुझाई गई 15-मिनट गतिविधि' : 'Targeted 15-Min Intervention'}
            </span>
            <p className="text-xs font-semibold text-amber-300">
              {lang === 'hi' ? 'दुकानदार और 10 के नोट की अदला-बदली' : 'The 10-Rupee Note & Coin Exchange'}
            </p>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              {lang === 'hi' ? 'मूर्त तीलियों और 10 के बंडल का उपयोग' : 'Using physical bundles of 10 matchsticks'}
            </span>
          </SpotlightCard>

          <SpotlightCard 
            spotlightColor="rgba(6, 182, 212, 0.2)"
            className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between"
          >
            <div>
              <span className="text-[11px] font-mono text-slate-400 block mb-1">
                {lang === 'hi' ? 'लक्षित विद्यार्थी' : 'Target Small Group'}
              </span>
              <span className="text-xs font-bold text-white">
                8 {lang === 'hi' ? 'छात्र (राहुल, नेहा, दीपक आदि)' : 'Students (Rahul, Neha, Deepak, etc.)'}
              </span>
            </div>
            <button
              onClick={onOpenMisconception}
              className="mt-2 text-xs font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <span>{lang === 'hi' ? 'गहन भ्रांति विश्लेषण देखें' : 'Inspect Misconception Root'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </SpotlightCard>

        </div>
      ) : (
        /* ========================================================================= */
        /* LIVE 15-MINUTE CLASSROOM GUIDED RUNNER                                    */
        /* ========================================================================= */
        <div className="mt-4 pt-4 border-t border-slate-800 animate-fade-in">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Left: Timer & Step Navigator */}
            <div className="lg:col-span-7 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-mono font-black text-cyan-400 bg-slate-900 px-3 py-1 rounded-lg border border-cyan-500/30">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setTimerRunning(!timerRunning)}
                      className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                        timerRunning 
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{timerRunning ? 'Pause' : 'Resume'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setTimerRunning(false);
                        setTimeLeft(15 * 60);
                      }}
                      className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                      title="Reset Timer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-mono text-slate-400">Class Progress</span>
                  <p className="text-xs font-bold text-emerald-400">
                    {masteredCount} of 8 Mastered
                  </p>
                </div>
              </div>

              {/* Current Guided Step */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-amber-400 font-semibold">
                    {steps[currentStepIndex].title}
                  </span>
                  <div className="flex items-center gap-1">
                    {steps.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentStepIndex(idx)}
                        className={`w-5 h-5 rounded-full text-[10px] font-mono font-bold flex items-center justify-center transition-colors ${
                          idx === currentStepIndex 
                            ? 'bg-amber-400 text-slate-950 font-black' 
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 leading-relaxed font-body">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p>{steps[currentStepIndex].prompt}</p>
                  </div>
                </div>

                <div className="flex justify-between mt-3">
                  <button
                    disabled={currentStepIndex === 0}
                    onClick={() => setCurrentStepIndex(currentStepIndex - 1)}
                    className="px-3 py-1 rounded bg-slate-800 text-xs text-slate-300 disabled:opacity-40"
                  >
                    Previous Step
                  </button>
                  <button
                    disabled={currentStepIndex === steps.length - 1}
                    onClick={() => setCurrentStepIndex(currentStepIndex + 1)}
                    className="px-3 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white disabled:opacity-40"
                  >
                    Next Step →
                  </button>
                </div>
              </div>

            </div>

            {/* Right: Live 8-Student Mastery Tally */}
            <div className="lg:col-span-5 bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold font-display text-white">
                    {lang === 'hi' ? 'छात्र समझ जांच तालिका' : 'Check off as Child Grasps Borrowing'}
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400">
                    {Math.round((masteredCount / 8) * 100)}%
                  </span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-3">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full transition-all duration-300"
                    style={{ width: `${(masteredCount / 8) * 100}%` }}
                  />
                </div>

                {/* Student clickable pills */}
                <div className="grid grid-cols-2 gap-2 max-h-44 overflow-y-auto pr-1">
                  {studentsChecklist.map((student) => (
                    <button
                      key={student.id}
                      onClick={() => toggleStudent(student.id)}
                      className={`p-2 rounded-lg text-left text-xs transition-all flex items-center justify-between border ${
                        student.checked
                          ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="truncate pr-1 font-medium">{student.name}</span>
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${student.checked ? 'text-emerald-400' : 'text-slate-600'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {masteredCount === 8 && (
                <div className="mt-3 p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-center animate-bounce">
                  <span className="text-xs font-bold text-emerald-300">
                    🎉 Outstanding! All 8 students resolved the borrowing gap!
                  </span>
                </div>
              )}
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
