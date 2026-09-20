import React, { useState } from 'react';
import { 
  X, 
  UserPlus, 
  GraduationCap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BorderBeam } from './ui/BorderBeam';
import { ShimmerButton } from './ui/ShimmerButton';

export function AddStudentModal() {
  const { 
    isAddStudentModalOpen, 
    setIsAddStudentModalOpen, 
    addStudent, 
    activeClass,
    lang 
  } = useApp();

  const [name, setName] = useState('');
  const [nameHi, setNameHi] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [age, setAge] = useState('8');
  const [gender, setGender] = useState('boy');
  const [initialLevel, setInitialLevel] = useState('Grade 1.2');
  const [status, setStatus] = useState('intervention');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLevelChange = (lvl) => {
    setInitialLevel(lvl);
    if (lvl.includes('1')) setStatus('intervention');
    else if (lvl.includes('2')) setStatus('attention');
    else if (lvl.includes('3')) setStatus('on_track');
    else setStatus('excelling');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    await addStudent({
      name: name.trim(),
      nameHi: nameHi.trim() || name.trim(),
      rollNo: rollNo ? Number(rollNo) : undefined,
      age: Number(age) || 8,
      gender,
      level: initialLevel,
      status
    });

    setIsSubmitting(false);
    setName('');
    setNameHi('');
    setRollNo('');
    setIsAddStudentModalOpen(false);
  };

  if (!isAddStudentModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl border border-white/15 shadow-2xl p-6 sm:p-8 text-left text-slate-100 overflow-hidden">
        
        {/* 21st.dev BorderBeam radiant traveling light */}
        <BorderBeam size={220} duration={6} colorFrom="#06b6d4" colorTo="#10b981" borderWidth={1.5} />

        {/* Close button */}
        <button
          onClick={() => setIsAddStudentModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-5 border-b border-slate-800/80 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-400 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold font-display text-white">
              {lang === 'hi' ? 'नया विद्यार्थी जोड़ें' : 'Register New Student'}
            </h3>
            <span className="text-xs text-cyan-400 font-mono">
              Enrolling into {activeClass?.name || 'Class 3A'}
            </span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-5 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono font-semibold text-slate-300 block mb-1">
                {lang === 'hi' ? 'विद्यार्थी का नाम (अंग्रेज़ी) *' : 'Student Full Name *'}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Karan Mehra"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-body"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-300 block mb-1">
                {lang === 'hi' ? 'नाम हिन्दी में (वैकल्पिक)' : 'Name in Hindi (Optional)'}
              </label>
              <input
                type="text"
                value={nameHi}
                onChange={(e) => setNameHi(e.target.value)}
                placeholder="e.g. करण मेहरा"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-body"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-300 block mb-1">
                {lang === 'hi' ? 'क्रमांक (रोल नंबर)' : 'Roll Number'}
              </label>
              <input
                type="number"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                placeholder="Auto-generated if blank"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-body"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-300 block mb-1">
                {lang === 'hi' ? 'आयु / लिंग' : 'Age & Gender'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="8"
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-body text-center"
                />
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-2 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-body"
                >
                  <option value="boy">Boy (छात्र)</option>
                  <option value="girl">Girl (छात्रा)</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Initial FLN Baseline / Learning Level Selection */}
          <div>
            <label className="text-xs font-mono font-semibold text-slate-300 block mb-1.5">
              {lang === 'hi' ? 'आरंभिक अधिगम स्तर (Baseline Level)' : 'Initial FLN Baseline Learning Level'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { lvl: 'Grade 1.2', label: 'Grade 1 (Critical)', color: 'border-rose-500/40 text-rose-300 bg-rose-950/20' },
                { lvl: 'Grade 2.1', label: 'Grade 2 (Developing)', color: 'border-amber-500/40 text-amber-300 bg-amber-950/20' },
                { lvl: 'Grade 3.0', label: 'Grade 3 (On Track)', color: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/20' }
              ].map((item) => (
                <button
                  key={item.lvl}
                  type="button"
                  onClick={() => handleLevelChange(item.lvl)}
                  className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                    initialLevel === item.lvl
                      ? `${item.color} shadow-lg ring-1 ring-white/30 scale-102`
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="block font-bold">{item.lvl}</span>
                  <span className="text-[10px] opacity-80 block">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddStudentModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
            >
              Cancel
            </button>
            <ShimmerButton
              type="submit"
              disabled={isSubmitting}
              shimmerColor="#06b6d4"
              className="px-6 py-2.5 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20"
            >
              <span>{isSubmitting ? 'Enrolling Child...' : 'Enroll Student →'}</span>
            </ShimmerButton>
          </div>
        </form>

      </div>
    </div>
  );
}
