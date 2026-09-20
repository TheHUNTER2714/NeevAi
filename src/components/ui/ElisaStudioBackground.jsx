import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * ElisaStudioBackground
 * Inspired by Ali Nazari's Elisa Logo Animation on Dribbble (Shot 17653027):
 * - Deep velvet obsidian studio stage (#020409 / #030712)
 * - Volumetric overhead spotlight bloom centered behind the logo
 * - 3D receding perspective studio floor grid
 * - Concentric optical radar rings & calibration guides
 * - Floating atmospheric stardust & bokeh particles
 * - Cinematic softbox volumetric diagonal light rays
 */
export function ElisaStudioBackground({ className = '' }) {
  const canvasRef = useRef(null);

  // Canvas for floating stardust particles & studio ambient dust
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

    // Particle field
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.45 + 0.15,
      speedY: -(Math.random() * 0.25 + 0.08),
      speedX: (Math.random() - 0.5) * 0.2,
      color: Math.random() > 0.4 ? '#38bdf8' : (Math.random() > 0.5 ? '#818cf8' : '#f59e0b'),
      pulse: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulse += 0.02;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const currentAlpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));

        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
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
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#02040a] ${className}`}>
      
      {/* 1. Volumetric Overhead Studio Spotlight Bloom (Ali Nazari Elisa Centerpiece) */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[750px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 55% at 50% 32%, rgba(14, 165, 233, 0.18) 0%, rgba(99, 102, 241, 0.12) 38%, rgba(244, 63, 94, 0.04) 60%, transparent 75%)',
          filter: 'blur(30px)',
        }}
      />

      {/* 2. Secondary Ambient Violet-Amber Core Halo */}
      <div 
        className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.16) 0%, rgba(129, 140, 248, 0.12) 40%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* 3. Soft Volumetric Studio Light Rays (Cinematic Softbox Cone) */}
      <div 
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none opacity-40"
        style={{
          background: 'conic-gradient(from 260deg at 50% 0%, transparent 0deg, rgba(14, 165, 233, 0.08) 15deg, rgba(99, 102, 241, 0.06) 30deg, transparent 45deg)',
          filter: 'blur(40px)',
        }}
      />

      {/* 4. Concentric Studio Optical Radar / Soundwave Rings */}
      <svg 
        viewBox="0 0 1000 1000" 
        className="absolute top-[32%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] pointer-events-none opacity-30"
      >
        <circle cx="500" cy="500" r="180" fill="none" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" strokeDasharray="4 8" />
        <circle cx="500" cy="500" r="280" fill="none" stroke="rgba(99, 102, 241, 0.12)" strokeWidth="1" />
        <circle cx="500" cy="500" r="380" fill="none" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1" strokeDasharray="3 12" />
        <circle cx="500" cy="500" r="460" fill="none" stroke="rgba(14, 165, 233, 0.08)" strokeWidth="1" />

        {/* Crosshair alignment lines */}
        <line x1="500" y1="20" x2="500" y2="980" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" strokeDasharray="6 6" />
        <line x1="20" y1="500" x2="980" y2="500" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" strokeDasharray="6 6" />
      </svg>

      {/* 5. Receding 3D Perspective Studio Floor Grid (Ali Nazari Studio Stage) */}
      <div 
        className="absolute bottom-0 inset-x-0 h-[480px] pointer-events-none overflow-hidden"
        style={{
          perspective: '600px',
          transformStyle: 'preserve-3d',
        }}
      >
        <div 
          className="w-[200%] -left-[50%] h-[800px] absolute bottom-0"
          style={{
            transform: 'rotateX(72deg) translateY(120px)',
            transformOrigin: '50% 100%',
            backgroundImage: `
              linear-gradient(to right, rgba(56, 189, 248, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(99, 102, 241, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 60% 50% at 50% 30%, black 20%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 30%, black 20%, transparent 85%)',
          }}
        />

        {/* Horizon Glow Line */}
        <div 
          className="absolute top-[28%] inset-x-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.35), rgba(99, 102, 241, 0.35), transparent)',
            boxShadow: '0 0 20px 2px rgba(56, 189, 248, 0.25)',
          }}
        />
      </div>

      {/* 6. Interactive Floating Particle Stardust Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 7. Subtle Vignette Edge Fade for Studio Focus */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 45%, transparent 40%, rgba(2, 4, 10, 0.6) 80%, #02040a 100%)',
        }}
      />

    </div>
  );
}
