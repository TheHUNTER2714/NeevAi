import React, { useState } from 'react';
import { 
  X, 
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BorderBeam } from './ui/BorderBeam';
import { ShimmerButton } from './ui/ShimmerButton';

export function AddClassModal() {
  const { 
    isAddClassModalOpen, 
    setIsAddClassModalOpen, 
    addClass, 
    lang 
  } = useApp();

  const [name, setName] = useState('');
  const [grade, setGrade] = useState('Grade 3');
  const [section, setSection] = useState('B');
  const [targetFLN, setTargetFLN] = useState('FLN Foundational Recovery');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    addClass({
      name: name.trim(),
      grade,
      section,
      year: '2025-2026',
      targetFLN
    });

    setName('');
    setIsAddClassModalOpen(false);
  };

  if (!isAddClassModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md glass-panel rounded-3xl border border-white/15 shadow-2xl p-6 sm:p-8 text-left text-slate-100 overflow-hidden">
        
        {/* 21st.dev BorderBeam radiant traveling light */}
        <BorderBeam size={200} duration={6} colorFrom="#f59e0b" colorTo="#06b6d4" borderWidth={1.5} />

        {/* Close Button */}
        <button
          onClick={() => setIsAddClassModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-5 border-b border-slate-800/80 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-cyan-500 p-0.5 shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Layers className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold font-display text-white">
              {lang === 'hi' ? 'नई कक्षा जोड़ें' : 'Create New Class'}
            </h3>
            <span className="text-xs text-slate-400">
              Academic Year 2025-2026
            </span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-5 relative z-10">
          <div>
            <label className="text-xs font-mono font-semibold text-slate-300 block mb-1">
              {lang === 'hi' ? 'कक्षा का नाम *' : 'Class Name *'}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Class 3 — Section B"
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-body"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono font-semibold text-slate-300 block mb-1">
                {lang === 'hi' ? 'ग्रेड (कक्षा स्तर)' : 'Grade Level'}
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-body"
              >
                <option value="Grade 1">Grade 1 (कक्षा 1)</option>
                <option value="Grade 2">Grade 2 (कक्षा 2)</option>
                <option value="Grade 3">Grade 3 (कक्षा 3)</option>
                <option value="Grade 4">Grade 4 (कक्षा 4)</option>
                <option value="Multi-grade">Multi-grade (बहु-कक्षीय)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-300 block mb-1">
                {lang === 'hi' ? 'वर्ग (सेक्शन)' : 'Section'}
              </label>
              <input
                type="text"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                placeholder="B"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-body text-center"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono font-semibold text-slate-300 block mb-1">
              {lang === 'hi' ? 'लक्षित FLN दक्षता' : 'Target Foundational FLN Focus'}
            </label>
            <input
              type="text"
              value={targetFLN}
              onChange={(e) => setTargetFLN(e.target.value)}
              placeholder="e.g. 2-Digit Regrouping & Oral Fluency"
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-body"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddClassModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
            >
              Cancel
            </button>
            <ShimmerButton
              type="submit"
              shimmerColor="#f59e0b"
              className="px-6 py-2.5 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20"
            >
              <span>Create Class →</span>
            </ShimmerButton>
          </div>
        </form>

      </div>
    </div>
  );
}
