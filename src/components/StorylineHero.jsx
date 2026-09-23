import React, { useEffect, useRef } from 'react';
import { 
  Brain, 
  Target, 
  TrendingUp 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SpotlightCard } from './ui/SpotlightCard';
import { PrismaHero } from './ui/prisma-hero';
import { AboutSection } from './AboutSection';

export function StorylineHero({ onExploreCockpit, onTryAssessment, lang }) {
  const { setIsAuthModalOpen } = useApp();
  const canvasRef = useRef(null);

  // Interactive Cosmic Neural Network Canvas (Subtle ambient constellation, no clutter)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Subtle ambient network nodes on outer perimeter
    const nodes = [
      { x: width * 0.14, y: height * 0.28, color: '#38bdf8', vx: 0.1, vy: 0.08 },
      { x: width * 0.86, y: height * 0.24, color: '#06b6d4', vx: -0.08, vy: 0.1 },
      { x: width * 0.88, y: height * 0.68, color: '#f59e0b', vx: -0.09, vy: -0.08 },
      { x: width * 0.12, y: height * 0.72, color: '#10b981', vx: 0.08, vy: -0.09 },
      { x: width * 0.50, y: height * 0.06, color: '#a855f7', vx: 0.05, vy: 0.05 },
    ];

    // Background floating particle dust
    const dustParticles = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.35 + 0.15,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
    }));

    let pulseT = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      pulseT += 0.025;

      // Draw dust particles
      dustParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(148, 163, 184, ${p.alpha * 0.3})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connection lines with glowing pulses
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];

          // Fiber optic line
          ctx.strokeStyle = `rgba(56, 189, 248, 0.10)`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();

          // Moving pulse packet along line
          const packetPos = (Math.sin(pulseT + i * 2) + 1) / 2;
          const px = n1.x + (n2.x - n1.x) * packetPos;
          const py = n1.y + (n2.y - n1.y) * packetPos;
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw subtle nodes (pure glowing points, NO giant text labels)
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 50 || n.x > width - 50) n.vx *= -1;
        if (n.y < 40 || n.y > height - 40) n.vy *= -1;

        // Outer halo
        const grad = ctx.createRadialGradient(n.x, n.y, 1, n.x, n.y, 16);
        grad.addColorStop(0, n.color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 16, 0, Math.PI * 2);
        ctx.fill();

        // Solid core
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = n.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      {/* ========================================================================= */}
      {/* 1. CINEMATIC PRISMA VIDEO HERO WITH WORDS PULL UP                         */}
      {/* ========================================================================= */}
      <div className="w-full p-2 sm:p-4 md:p-6 bg-[#050816]">
        <PrismaHero
          onExploreCockpit={onExploreCockpit}
          onTryAssessment={onTryAssessment}
          onTeacherLogin={() => setIsAuthModalOpen(true)}
          lang={lang}
        />
      </div>


      {/* ========================================================================= */}
      {/* 2. THE 3 PEDAGOGICAL PILLARS (TaRL & NIPUN BHARAT FOUNDATION)            */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-[#050816] px-4 py-12 flex flex-col items-center">
        {/* Interactive Cosmic Neural Network Canvas */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-10"
        />

        <div className="relative z-20 max-w-6xl w-full flex flex-col items-center text-center animate-fade-in">
          <div className="w-full glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 text-left shadow-2xl relative overflow-hidden">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                  {lang === 'hi' ? 'नींव AI — बुनियादी शिक्षण के 3 स्तंभ' : 'NeevAI — The 3 Foundational Pillars'}
                </h3>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 font-semibold">
                  J-PAL TaRL & NIPUN Bharat
                </span>
              </div>
              <p className="text-xs text-slate-400 font-body">
                {lang === 'hi' 
                  ? 'उम्र या ग्रेड के बजाय वास्तविक सीखने की तत्परता पर आधारित उपचारात्मक पद्धति' 
                  : 'Pedagogy grouped by actual learning readiness rather than age or grade'}
              </p>
            </div>

            {/* 3 Pillars Summary with 21st.dev SpotlightCard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
              <SpotlightCard 
                spotlightColor="rgba(6, 182, 212, 0.22)"
                className="p-6 rounded-2xl border-white/10 bg-slate-950/60"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/25 flex items-center justify-center mb-3.5 shadow-inner">
                  <Brain className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1.5 font-display">1. {lang === 'hi' ? 'सटीक संज्ञानात्मक निदान' : 'Diagnose with Precision'}</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-body">
                  {lang === 'hi' 
                    ? 'अंकों के बजाय सोच की मूल भ्रांति (जैसे 52 - 27 = 35) की सटीक पहचान करता है।' 
                    : 'Identifies specific mental misconceptions (e.g. 52 - 27 = 35) instead of meaningless percentage marks.'}
                </p>
              </SpotlightCard>

              <SpotlightCard 
                spotlightColor="rgba(249, 115, 22, 0.22)"
                className="p-6 rounded-2xl border-white/10 bg-slate-950/60"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 text-orange-400 border border-orange-500/25 flex items-center justify-center mb-3.5 shadow-inner">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1.5 font-display">2. {lang === 'hi' ? '15-मिनट की ठोस गतिविधियां' : 'Actionable 15-Min Interventions'}</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-body">
                  {lang === 'hi' 
                    ? 'माचिस की तीलियों के बंडल और सिक्कों से शून्य-लागत व्यावहारिक शिक्षण सामग्री देता है।' 
                    : 'Supplies zero-cost, concrete activities with matchstick bundles and coins in Hindi & English.'}
                </p>
              </SpotlightCard>

              <SpotlightCard 
                spotlightColor="rgba(16, 185, 129, 0.22)"
                className="p-6 rounded-2xl border-white/10 bg-slate-950/60"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 flex items-center justify-center mb-3.5 shadow-inner">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1.5 font-display">3. {lang === 'hi' ? 'मापने योग्य सुधार और प्रगति' : 'Measurable Gap Closure'}</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-body">
                  {lang === 'hi' 
                    ? '4 हफ्तों में लक्षित दक्षता रिकवरी और वास्तविक सुधार को ट्रैक करता है जो जे-पाल प्रभाव से प्रमाणित है।' 
                    : 'Tracks longitudinal competency recovery and systemic gap closure aligned with J-PAL TaRL impact evidence.'}
                </p>
              </SpotlightCard>
            </div>

          </div>

        </div>

      </section>

      {/* About & Pedagogical Science Section with StackSpread & CircularGallery */}
      <AboutSection 
        onExploreCockpit={onExploreCockpit}
        onTryAssessment={onTryAssessment}
        lang={lang}
      />
    </div>
  );
}
