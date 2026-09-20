import React from 'react';
import { motion } from 'framer-motion';

/**
 * AnimatedFontText
 * Playful, lively animated typography for LearnLens AI & KidWise educational theme:
 * - Staggered wave letter bouncing
 * - Continuous vibrant multi-color gradient shimmer
 * - Interactive hover kinetic wobble
 * - Powered by 'Fredoka' and 'Outfit' fonts
 */
export function AnimatedFontText({ 
  text = '', 
  className = '', 
  variant = 'wave', // 'wave', 'shimmer', 'rainbow', 'bouncy'
  as: Component = 'span' 
}) {
  if (!text) return null;

  // Split text into words and letters for smooth staggered physics
  const words = text.split(' ');

  // Variant 1: Continuous Multi-Color Gradient Shimmer
  if (variant === 'shimmer') {
    return (
      <Component className={`inline-block font-kidwise animate-font-shimmer text-transparent bg-clip-text bg-[linear-gradient(110deg,#f59e0b,30%,#8b5cf6,50%,#06b6d4,70%,#10b981,90%,#f59e0b)] bg-[length:250%_100%] ${className}`}>
        {text}
      </Component>
    );
  }

  // Variant 2: Rainbow Colored Letters with Bouncy Stagger
  if (variant === 'rainbow') {
    const rainbowColors = ['#f59e0b', '#ec4899', '#8b5cf6', '#38bdf8', '#10b981', '#fbbf24'];

    return (
      <Component className={`inline-flex flex-wrap items-center gap-x-2 font-kidwise ${className}`}>
        {words.map((word, wordIdx) => (
          <span key={wordIdx} className="inline-flex whitespace-nowrap">
            {Array.from(word).map((char, charIdx) => {
              const color = rainbowColors[(wordIdx * 3 + charIdx) % rainbowColors.length];
              return (
                <motion.span
                  key={charIdx}
                  className="inline-block transition-transform hover:scale-125 cursor-default"
                  style={{ color }}
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (wordIdx * 0.15) + (charIdx * 0.06),
                  }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        ))}
      </Component>
    );
  }

  // Variant 3: Playful Wavy Stagger Bounce (Default)
  return (
    <Component className={`inline-flex flex-wrap items-center gap-x-1.5 font-kidwise ${className}`}>
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-flex whitespace-nowrap">
          {Array.from(word).map((char, charIdx) => (
            <motion.span
              key={charIdx}
              className="inline-block transition-transform hover:-translate-y-1"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (wordIdx * 0.12) + (charIdx * 0.05),
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </Component>
  );
}
