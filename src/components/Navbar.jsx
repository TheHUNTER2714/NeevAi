import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Glasses, 
  Flame, 
  TrendingUp, 
  GraduationCap, 
  Bot,
  RotateCcw,
  Compass,
  BookOpen,
  MoreVertical,
  X,
  Globe,
  Check,
  Sparkles,
  LogOut,
  LogIn
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BorderBeam } from './ui/BorderBeam';
import { ShimmerButton } from './ui/ShimmerButton';
import { ElisaLogo } from './ui/ElisaLogo';
import { TRANSLATIONS } from '../data/translations';

export function Navbar({ currentView, setCurrentView, lang, setLang, openAssistant }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const { teacher, setIsAuthModalOpen, logoutTeacher } = useApp();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);

  const navItems = [
    { id: 'intro', label: lang === 'hi' ? 'प्रारंभिक परिचय' : 'Intro Page', icon: Sparkles },
    { id: 'storyline', label: t.navStoryline || 'Overview', icon: Compass },
    { id: 'about', label: t.navAbout || (lang === 'hi' ? 'शोध व मिशन' : 'About & Mission'), icon: BookOpen },
    { id: 'dashboard', label: t.navDashboard || 'Teacher Cockpit', icon: LayoutDashboard },
    { id: 'cycle', label: lang === 'hi' ? 'सुधार चक्र' : 'Learning Cycle', icon: RotateCcw },
    { id: 'assessment', label: t.navAssessment || 'FLN Diagnostic Test', icon: GraduationCap },
    { id: 'misconceptions', label: t.navMisconceptions || 'Misconception Radar', icon: Glasses },
    { id: 'activities', label: t.navActivities || '15-Min Activity Studio', icon: Flame },
    { id: 'impact', label: t.navImpact || 'Impact Tracking', icon: TrendingUp },
  ];

  const handleNavClick = (id) => {
    if (id === 'about') {
      setCurrentView('storyline');
      setTimeout(() => {
        const el = document.getElementById('about');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      setCurrentView(id);
    }
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Handle scroll elevation
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const currentItem = navItems.find((item) => item.id === currentView) || navItems[0];
  const CurrentIcon = currentItem.icon;

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/90 backdrop-blur-2xl border-b border-cyan-500/25 shadow-2xl shadow-cyan-950/40' 
          : 'bg-slate-950/60 backdrop-blur-xl border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand Logo with Elisa Animation & Kinetic Hover */}
        <motion.div 
          onClick={() => setCurrentView('intro')}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="cursor-pointer flex items-center gap-3"
          title={lang === 'hi' ? 'नींव AI प्रारंभिक पृष्ठ' : 'NeevAI Intro Page'}
        >
          <ElisaLogo variant="nav" lang={lang} />
          
          {/* Active View Breadcrumb Indicator on Desktop */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-white/10 text-xs font-medium text-slate-300">
            <CurrentIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-white font-semibold">{currentItem.label}</span>
          </div>
        </motion.div>

        {/* Right Section: Teacher Badge, AI Assistant, and 3-Dot Navigation Menu */}
        <div className="flex items-center gap-2.5">
          
          {/* Educator Sign In & Profile / Logout */}
          {!teacher?.isAuthenticated ? (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-rose-950/50 via-slate-900/90 to-slate-900/90 border border-rose-500/40 hover:border-rose-400 hover:bg-slate-800/90 rounded-xl text-xs font-bold text-rose-300 hover:text-white transition-all shadow-sm cursor-pointer group"
              title={lang === 'hi' ? 'शिक्षक साइन इन करें' : 'Educator Sign In'}
            >
              <LogIn className="w-3.5 h-3.5 text-rose-400 group-hover:scale-110 transition-transform" />
              <span>{lang === 'hi' ? 'साइन इन करें' : 'Educator Sign In'}</span>
            </button>
          ) : (
            <div className="flex items-center gap-1 bg-gradient-to-r from-rose-950/40 via-slate-900/90 to-slate-900/90 border border-rose-500/40 rounded-xl p-0.5">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-800/80 rounded-lg text-xs transition-all cursor-pointer group"
                title={lang === 'hi' ? 'शिक्षक प्रोफ़ाइल' : 'Educator Profile'}
              >
                <div className={`w-2 h-2 rounded-full ${teacher?.isDemo ? 'bg-amber-400' : 'bg-emerald-400'} group-hover:scale-125 transition-transform animate-pulse`} />
                <span className={`font-bold text-xs ${teacher?.isDemo ? 'text-amber-200' : 'text-emerald-200'} group-hover:text-white`}>
                  {teacher?.isDemo ? (lang === 'hi' ? 'सुनीता देवी (डेमो)' : 'Sunita Devi (Demo)') : teacher?.name}
                </span>
                <span className="text-[10px] text-slate-400 hidden sm:inline border-l border-slate-700 pl-2">
                  {teacher?.school ? teacher.school.slice(0, 18) + (teacher.school.length > 18 ? '...' : '') : 'Primary School'}
                </span>
              </button>

              {/* Logout button (Works for demo and real accounts) */}
              <button
                onClick={logoutTeacher}
                className="flex items-center gap-1 px-2 py-1 text-slate-400 hover:text-rose-300 hover:bg-rose-950/70 rounded-lg transition-colors text-[11px] font-mono cursor-pointer"
                title={teacher?.isDemo 
                  ? (lang === 'hi' ? 'डेमो अकाउंट से लॉगआउट करें' : 'Log out from Demo Account')
                  : (lang === 'hi' ? 'लॉगआउट' : 'Logout')}
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline text-rose-300 font-semibold">{lang === 'hi' ? 'लॉगआउट' : 'Logout'}</span>
              </button>
            </div>
          )}

          {/* 21st.dev Shimmer Button for AI Assistant with NeevAI Logo */}
          <ShimmerButton
            onClick={openAssistant}
            shimmerColor="#06b6d4"
            borderRadius="14px"
            className="shadow-lg shadow-cyan-950/40 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ElisaLogo variant="icon" className="w-4 h-4 shrink-0 animate-pulse" />
              <span className="hidden sm:inline font-bold text-xs bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-white">
                {t.askLearnLens}
              </span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
          </ShimmerButton>

          {/* ===================================================================== */}
          {/* 3-DOT MENU BUTTON: HOUSES ALL 8 NAVIGATION VIEWS PLUS LANGUAGE TOGGLE */}
          {/* ===================================================================== */}
          <div className="relative" ref={menuRef}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-xl border transition-all duration-200 flex items-center justify-center cursor-pointer shadow-sm ${
                isMenuOpen 
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-cyan-500/20 ring-2 ring-cyan-500/20' 
                  : 'bg-slate-900/90 text-slate-200 hover:text-white border-white/15 hover:border-cyan-500/40'
              }`}
              title={lang === 'hi' ? 'सभी अनुभाग एवं भाषा' : 'All Sections & Language'}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-cyan-400" />
              ) : (
                <MoreVertical className="w-5 h-5" />
              )}
            </motion.button>

            {/* Animated 3-Dot Dropdown Panel */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 mt-3 w-72 sm:w-80 rounded-2xl bg-slate-950/95 border border-cyan-500/30 shadow-2xl shadow-cyan-950/80 backdrop-blur-2xl p-3 z-50 overflow-hidden text-left"
                >
                  <BorderBeam size={90} duration={8} colorFrom="#06b6d4" colorTo="#f97316" borderWidth={1.2} />
                  
                  {/* Header */}
                  <div className="px-3 py-1.5 text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>{lang === 'hi' ? 'लर्न-लेंस अनुभाग' : 'Platform Navigation'}</span>
                    <span className="text-[10px] text-cyan-400 font-mono">8 Views</span>
                  </div>

                  {/* Navigation Item List */}
                  <div className="space-y-1 my-1 max-h-[55vh] overflow-y-auto pr-1">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const active = currentView === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick(item.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                            active 
                              ? 'bg-gradient-to-r from-orange-500/20 via-cyan-500/20 to-emerald-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' 
                              : 'text-slate-300 hover:text-white hover:bg-slate-900/90'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
                            <span className="truncate">{item.label}</span>
                          </div>
                          {active && (
                            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400 animate-pulse" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Separator */}
                  <div className="my-2.5 border-t border-white/10" />

                  {/* Language Selector Section */}
                  <div className="px-3 py-1 text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>{lang === 'hi' ? 'भाषा (Language)' : 'Language (भाषा)'}</span>
                    <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 p-1 mt-1 bg-slate-900/90 rounded-xl border border-slate-800">
                    <button
                      onClick={() => setLang('en')}
                      className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        lang === 'en' 
                          ? 'bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 shadow-md shadow-cyan-500/30' 
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>English</span>
                      {lang === 'en' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>
                    
                    <button
                      onClick={() => setLang('hi')}
                      className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        lang === 'hi' 
                          ? 'bg-gradient-to-r from-orange-400 to-amber-400 text-slate-950 shadow-md shadow-orange-500/30' 
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>हिन्दी</span>
                      {lang === 'hi' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </motion.header>
  );
}

export default Navbar;
