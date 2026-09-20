import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * KidWiseAnimatedBackground
 * Faithfully inspired by Bikash Chandra's KidWise Kids Education Website on Dribbble (Shot 26730071):
 * - Playful, joyful educational atmosphere with vibrant modern KidWise colors:
 *   Sunshine Amber (#f59e0b), Electric Violet (#8b5cf6), Fresh Mint (#10b981),
 *   Sky Cyan (#06b6d4), and Playful Coral (#f43f5e).
 * - Animated floating math symbols (+, −, ×, ÷, =), alphabet blocks (A, B, C, 1, 2, 3)
 * - Drifting doodle stars, lightbulbs, pencils, and puzzle shapes
 * - Morphing pastel/neon organic gradient energy orbs
 * - Modern notebook micro-dot pattern
 * - Gentle floating physics for all educational elements
 */
export function KidWiseAnimatedBackground({ className = '', intensity = 'normal' }) {
  const canvasRef = useRef(null);

  // Floating background sparkles canvas
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

    const colors = ['#f59e0b', '#8b5cf6', '#10b981', '#06b6d4', '#f43f5e', '#fbbf24'];

    // Interactive floating confetti and sparkle particles
    const particles = Array.from({ length: 42 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.45 + 0.15,
      speedY: -(Math.random() * 0.35 + 0.1),
      speedX: (Math.random() - 0.5) * 0.25,
      pulse: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulse += 0.025;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));

        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
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

  // Subtle floating educational & mathematical accents (tastefully positioned on periphery)
  const educationalElements = [
    // Delicate Math & Logic Glyphs
    { symbol: '+', top: '14%', left: '7%', color: '#f59e0b', size: '22px', delay: 0, duration: 6, opacity: 0.35 },
    { symbol: '×', top: '24%', right: '9%', color: '#8b5cf6', size: '24px', delay: 1, duration: 7, opacity: 0.3 },
    { symbol: '÷', top: '72%', left: '5%', color: '#06b6d4', size: '24px', delay: 2, duration: 8, opacity: 0.35 },
    { symbol: '=', top: '84%', right: '12%', color: '#10b981', size: '22px', delay: 0.5, duration: 6.5, opacity: 0.3 },
    { symbol: '−', top: '52%', right: '5%', color: '#38bdf8', size: '22px', delay: 1.5, duration: 7.5, opacity: 0.25 },

    // Twinkling Celestial Sparkles on margins
    { symbol: '✦', top: '22%', left: '12%', color: '#fbbf24', size: '16px', delay: 0.7, duration: 5, opacity: 0.4 },
    { symbol: '★', top: '60%', left: '10%', color: '#38bdf8', size: '14px', delay: 1.2, duration: 5.5, opacity: 0.35 },
    { symbol: '✦', top: '38%', right: '14%', color: '#a855f7', size: '18px', delay: 2.0, duration: 6, opacity: 0.35 },
    { symbol: '★', top: '78%', right: '22%', color: '#34d399', size: '14px', delay: 1.6, duration: 4.8, opacity: 0.3 },
    { symbol: '●', top: '32%', left: '18%', color: '#06b6d4', size: '7px', delay: 0.4, duration: 5.2, opacity: 0.4 },
    { symbol: '▲', top: '68%', right: '7%', color: '#f59e0b', size: '10px', delay: 2.1, duration: 6.4, opacity: 0.3 },
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#050816] ${className}`}>
      
      {/* 1. Subtle KidWise Dotted Learning Grid */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(139, 92, 246, 0.22) 1.2px, transparent 1.2px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* 2. KidWise Morphing Ambient Gradient Energy Blobs */}
      {/* Sunshine Amber Glow Orb (Top Right) */}
      <motion.div 
        className="absolute -top-24 right-[-5%] w-[550px] h-[550px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.16) 0%, rgba(249, 115, 22, 0.08) 45%, transparent 70%)',
          filter: 'blur(55px)',
        }}
        animate={{
          scale: [1, 1.12, 1],
          x: [0, -25, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Electric Violet / Lavender Glow Orb (Center Left) */}
      <motion.div 
        className="absolute top-[30%] left-[-8%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, rgba(99, 102, 241, 0.10) 45%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.18, 1],
          x: [0, 35, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Spring Mint / Emerald Glow Orb (Bottom Right) */}
      <motion.div 
        className="absolute bottom-[-10%] right-[10%] w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.08) 45%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -20, 0],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Coral Pink Radiant Center Bloom */}
      <motion.div 
        className="absolute top-[60%] left-[45%] -translate-x-1/2 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(244, 63, 94, 0.10) 0%, rgba(236, 72, 153, 0.05) 45%, transparent 70%)',
          filter: 'blur(55px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* 3. Floating Animated Educational Math & Alphabet Elements */}
      {educationalElements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute font-display font-bold select-none pointer-events-none flex items-center justify-center"
          style={{
            top: el.top,
            left: el.left,
            right: el.right,
            color: el.color,
            fontSize: el.size,
            opacity: el.opacity || 0.35,
            filter: `drop-shadow(0 0 10px ${el.color}40)`,
          }}
          initial={{ y: 0, rotate: 0 }}
          animate={{
            y: [-12, 12, -12],
            rotate: [-8, 8, -8],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: el.delay,
          }}
        >
          {el.symbol}
        </motion.div>
      ))}

      {/* 4. Canvas for Floating Confetti & Stardust Particles */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 5. Smooth Vignette so text stays razor-sharp in foreground */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 40%, transparent 45%, rgba(5, 8, 22, 0.65) 85%, #050816 100%)',
        }}
      />

    </div>
  );
}
