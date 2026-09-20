import React, { useState, useEffect } from 'react';
import { 
  X, 
  School, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BorderBeam } from './ui/BorderBeam';
import { ShimmerButton } from './ui/ShimmerButton';

/**
 * TeacherAuthModal — Redesigned Sign In & Educator Onboarding
 * Faithfully inspired by user's reference image:
 * - Organic curved magenta/berry wave container on the left ("Welcome Back", pill button)
 * - Project-tailored Educational AI illustration and educator login/register on the right
 */
export function TeacherAuthModal() {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    teacher, 
    loginTeacher,
    registerTeacher,
    setDemoTeacher,
    setCurrentView,
    lang 
  } = useApp();

  // Mode: 'signin' or 'register'
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'register'

  // Form states
  const [name, setName] = useState(teacher?.name || '');
  const [school, setSchool] = useState(teacher?.school || '');
  const [district, setDistrict] = useState(teacher?.district || '');
  const [state, setState] = useState(teacher?.state || '');
  const [email, setEmail] = useState(teacher?.email || '');
  const [phone, setPhone] = useState(teacher?.phone || '');
  const [password, setPassword] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync if teacher changes
  useEffect(() => {
    if (teacher && teacher.isDemo) {
      setName(teacher.name || '');
      setSchool(teacher.school || '');
      setDistrict(teacher.district || '');
      setState(teacher.state || '');
      setEmail(teacher.email || '');
      setPhone(teacher.phone || '');
    }
  }, [teacher]);

  const handleDemoSwitch = () => {
    setDemoTeacher();
    setName('Sunita Devi');
    setSchool('Govt. Primary School, Kheda');
    setDistrict('Bilaspur');
    setState('Chhattisgarh');
    setEmail('sunita.devi.edu@gov.in');
    setPhone('+91 98271 45092');
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsAuthModalOpen(false);
      setCurrentView('dashboard');
    }, 600);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (authMode === 'signin') {
      await loginTeacher({
        email: email || name || 'educator@gov.in',
        name: name || 'Educator',
        password: password || 'password'
      });
    } else {
      await registerTeacher({
        name: name || 'New Educator',
        school: school || 'Primary School',
        district: district || 'District Center',
        state: state || 'State Education Board',
        email: email || `${name.toLowerCase().replace(/\s+/g, '.') || 'educator'}@school.edu`,
        phone: phone || '+91 90000 00000'
      });
    }
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsAuthModalOpen(false);
      setCurrentView('dashboard');
    }, 600);
  };

  if (!isAuthModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      
      {/* Outer Card Container */}
      <div className="relative w-full max-w-4xl bg-[#090d1f] rounded-[32px] border border-white/15 shadow-2xl overflow-hidden flex flex-col md:flex-row text-slate-100 min-h-[540px]">
        
        {/* 21st.dev BorderBeam border glow */}
        <BorderBeam 
          size={240} 
          duration={8} 
          colorFrom="#db2777" 
          colorTo="#06b6d4" 
          borderWidth={1.5}
        />

        {/* Global Modal Close button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60 transition-colors z-30"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ========================================================================= */}
        {/* LEFT PANEL: Organic Magenta Wave Banner (Matching User Reference Image)   */}
        {/* ========================================================================= */}
        <div className="relative w-full md:w-5/12 bg-gradient-to-br from-[#e11d48] via-[#be185d] to-[#831843] p-8 sm:p-10 flex flex-col justify-between text-white overflow-hidden select-none">
          
          {/* Subtle Organic Background Circles & Wave Overlay */}
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-60 h-60 rounded-full bg-rose-950/30 blur-2xl pointer-events-none" />
          <div className="absolute top-1/3 -left-8 w-32 h-32 rounded-full border border-white/15 pointer-events-none" />
          <div className="absolute bottom-1/4 right-6 w-20 h-20 rounded-full border border-white/10 pointer-events-none" />

          {/* Organic Fluid SVG Wave Divider on right edge for desktop */}
          <div className="hidden md:block absolute top-0 right-0 bottom-0 w-12 pointer-events-none overflow-hidden">
            <svg 
              className="h-full w-12 text-[#090d1f] fill-current" 
              viewBox="0 0 100 800" 
              preserveAspectRatio="none"
            >
              <path d="M 0,0 C 70,180 100,240 20,400 C -40,540 80,660 100,800 L 100,0 Z" />
            </svg>
          </div>

          {/* Top Header & Mini Brand Icon */}
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/30">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-black text-lg tracking-tight">NeevAI</span>
            </div>
          </div>

          {/* Main Welcome Message */}
          <div className="relative z-10 my-auto py-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight tracking-tight text-white mb-3">
              {authMode === 'signin' ? 'Welcome Back!' : 'Join NeevAI'}
            </h2>
            <p className="text-rose-100/90 text-sm font-body leading-relaxed max-w-xs">
              {authMode === 'signin'
                ? (lang === 'hi' 
                    ? 'अपने शिक्षण डेटा एवं कक्षा से जुड़े रहने के लिए कृपया लॉगिन करें।' 
                    : 'To keep connected with your classroom and students, please login with your educator info.')
                : (lang === 'hi' 
                    ? 'अपनी प्राथमिक शाला एवं कक्षा के लिए एक सशक्त AI निर्णय प्रणाली शुरू करें।' 
                    : 'Set up your school profile and empower your classroom with actionable FLN diagnostics.')}
            </p>

            {/* Pill Border Button inspired by reference image */}
            <div className="mt-8">
              <button
                type="button"
                onClick={() => setAuthMode(authMode === 'signin' ? 'register' : 'signin')}
                className="px-7 py-2.5 rounded-full border-2 border-white text-white font-display font-bold text-xs tracking-wider uppercase hover:bg-white hover:text-[#be185d] active:scale-95 transition-all shadow-lg"
              >
                {authMode === 'signin' ? 'SIGN UP / REGISTER' : 'SIGN IN'}
              </button>
            </div>
          </div>

          {/* Bottom Footer Note */}
          <div className="relative z-10 pt-4 text-[11px] text-rose-200/80 font-mono">
            <span>FLN Decision System • CBSE & ASER</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT PANEL: Tailored Educational Illustration & Sign In Form             */}
        {/* ========================================================================= */}
        <div className="relative w-full md:w-7/12 p-6 sm:p-10 flex flex-col justify-between bg-[#090d1f] overflow-y-auto">
          
          {/* Top Educational AI Scene / Vector Mascot (Project-specific) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{authMode === 'signin' ? 'Educator Sign In' : 'School Registration'}</span>
              </div>
              <h3 className="text-xl font-bold font-display text-white">
                {authMode === 'signin' 
                  ? (lang === 'hi' ? 'शिक्षक कॉकपिट में प्रवेश' : 'Enter Teacher Cockpit') 
                  : (lang === 'hi' ? 'शिक्षक व विद्यालय विवरण' : 'Educator & School Details')}
              </h3>
            </div>

            {/* Project-specific Educational Illustration */}
            <div className="relative w-28 h-20 sm:w-32 sm:h-24 flex items-center justify-center">
              <svg viewBox="0 0 160 120" className="w-full h-full filter drop-shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                <defs>
                  <linearGradient id="chalkboardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0f172a" />
                    <stop offset="100%" stopColor="#1e293b" />
                  </linearGradient>
                  <linearGradient id="teacherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#be185d" />
                    <stop offset="100%" stopColor="#db2777" />
                  </linearGradient>
                </defs>

                {/* Digital Learning Screen Board */}
                <rect x="25" y="10" width="110" height="75" rx="8" fill="url(#chalkboardGrad)" stroke="#38bdf8" strokeWidth="2" strokeDasharray="140" />
                
                {/* Math & Letter Icons on Board */}
                <text x="35" y="32" fill="#38bdf8" fontSize="11" fontFamily="sans-serif" fontWeight="bold">52 - 27</text>
                <text x="35" y="48" fill="#10b981" fontSize="10" fontFamily="sans-serif">अ आ इ</text>
                <text x="35" y="64" fill="#fbbf24" fontSize="10" fontFamily="sans-serif">TaRL FLN</text>

                {/* Optical Smart Lens Scanning Ring */}
                <circle cx="108" cy="45" r="16" fill="none" stroke="#06b6d4" strokeWidth="2" />
                <circle cx="108" cy="45" r="9" fill="rgba(6, 182, 212, 0.25)" />
                <line x1="120" y1="57" x2="132" y2="69" stroke="#06b6d4" strokeWidth="3.5" strokeLinecap="round" />

                {/* Teacher / Educator Figurine with Presentation Pointer */}
                <circle cx="75" cy="86" r="12" fill="#fcd34d" /> {/* Face */}
                {/* Hair */}
                <path d="M 64,84 C 64,74 86,74 86,84 Z" fill="#475569" />
                {/* Torso in Magenta Coat */}
                <path d="M 60,98 C 60,92 70,90 75,90 C 80,90 90,92 90,98 L 90,115 L 60,115 Z" fill="url(#teacherGrad)" />
                {/* Arm holding pointer toward board */}
                <line x1="65" y1="96" x2="45" y2="65" stroke="#fcd34d" strokeWidth="3" strokeLinecap="round" />
                {/* Pointer Tip */}
                <circle cx="45" cy="65" r="3" fill="#38bdf8" />

                {/* Floating Stars */}
                <path d="M 18,30 L 21,36 L 27,37 L 22,41 L 24,47 L 18,43 L 12,47 L 14,41 L 9,37 L 15,36 Z" fill="#fbbf24" />
                <path d="M 142,22 L 144,26 L 148,27 L 145,30 L 146,34 L 142,31 L 138,34 L 139,30 L 136,27 L 140,26 Z" fill="#38bdf8" />
              </svg>
            </div>
          </div>

          {/* Form Area */}
          <form onSubmit={handleSubmit} className="space-y-4 my-auto py-4">
            
            {/* If Sign In mode: Email / Teacher identifier & Password */}
            {authMode === 'signin' ? (
              <div className="space-y-3.5">
                <div>
                  <label className="text-xs font-mono font-semibold text-slate-300 block mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{lang === 'hi' ? 'शिक्षक ईमेल या नाम' : 'Educator Email or Name'}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. sunita.devi.edu@gov.in or Sunita Devi"
                    className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-body transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-semibold text-slate-300 block mb-1 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{lang === 'hi' ? 'पासवर्ड / क्रेडेंशियल' : 'Password / PIN'}</span>
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-body transition-colors"
                  />
                </div>

                {/* Remember & Demo Hint */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-rose-500 rounded" />
                    <span>{lang === 'hi' ? 'मुझे याद रखें' : 'Remember this educator profile'}</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleDemoSwitch}
                    className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-2"
                  >
                    {lang === 'hi' ? '1-क्लिक डेमो लोड करें' : '1-Click Demo Fill'}
                  </button>
                </div>
              </div>
            ) : (
              /* If Register mode: Full Profile details */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[280px] overflow-y-auto pr-1">
                <div>
                  <label className="text-xs font-mono font-semibold text-slate-300 block mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Teacher Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sunita Devi"
                    className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-semibold text-slate-300 block mb-1 flex items-center gap-1.5">
                    <School className="w-3.5 h-3.5 text-cyan-400" />
                    <span>School Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    placeholder="Govt. Primary School, Kheda"
                    className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-semibold text-slate-300 block mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-400" />
                    <span>District *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="Bilaspur"
                    className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-semibold text-slate-300 block mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-400" />
                    <span>State *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Chhattisgarh"
                    className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-semibold text-slate-300 block mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>Email ID</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sunita.devi@gov.in"
                    className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-semibold text-slate-300 block mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>Mobile Number</span>
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98271 45092"
                    className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={handleDemoSwitch}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'hi' ? 'डेमो शिक्षक (सुनीता देवी)' : 'Demo: Sunita Devi'}</span>
              </button>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <ShimmerButton
                  type="submit"
                  shimmerColor="#db2777"
                  className="px-6 py-2.5 text-white font-bold text-xs shadow-lg shadow-rose-500/25 bg-gradient-to-r from-rose-600 to-pink-600 border-none"
                >
                  <span className="flex items-center gap-1.5">
                    {savedSuccess ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                        <span>Signed In!</span>
                      </>
                    ) : authMode === 'signin' ? (
                      <>
                        <span>Sign In to Cockpit</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    ) : (
                      <>
                        <span>Save & Enter</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </span>
                </ShimmerButton>
              </div>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
}
