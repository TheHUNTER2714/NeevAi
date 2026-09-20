import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';

// A simple utility for conditional class names
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Define the type for a single gallery item
export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string; 
    text: string;
    pos?: string;
    by: string;
  };
}

// Default project-related gallery data for LearnLens AI
export const LEARNLENS_GALLERY_DATA: GalleryItem[] = [
  {
    common: 'Teaching at the Right Level',
    binomial: 'J-PAL & Pratham Framework',
    photo: {
      url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      text: 'Grouping children by actual learning readiness rather than age or grade',
      pos: '50% 35%',
      by: 'J-PAL Global Evidence'
    }
  },
  {
    common: 'Cognitive Misconception Radar',
    binomial: 'Deep Diagnostic Error Analysis',
    photo: {
      url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
      text: 'Identifies why 52 - 27 becomes 35 instead of assigning empty percentages',
      pos: '50% 40%',
      by: 'NeevAI Diagnostic Engine'
    }
  },
  {
    common: '15-Min Action Studio',
    binomial: 'Concrete Manipulatives (CPA)',
    photo: {
      url: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=800&q=80',
      text: 'Zero-cost micro-activities with matchsticks, stone counters and currency tokens',
      pos: '50% 50%',
      by: 'Pratham FLN Toolkit'
    }
  },
  {
    common: 'Voice Reading Screener',
    binomial: 'Speech Fluency (WCPM)',
    photo: {
      url: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=800&q=80',
      text: 'Real-time vocal analysis measuring words correct per minute in Hindi & English',
      pos: '50% 30%',
      by: 'CBSE FLN Screener'
    }
  },
  {
    common: 'Classroom Reality Simulator',
    binomial: 'Multi-Grade Ground Reality',
    photo: {
      url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
      text: 'Exposing 5 hidden grade levels in a single classroom of 40 Grade 3 students',
      pos: '50% 45%',
      by: 'Frontline 2025 Study'
    }
  },
  {
    common: 'Measurable Gap Closure',
    binomial: 'Longitudinal Competency Impact',
    photo: {
      url: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=800&q=80',
      text: 'Rapid recovery from 42% to 78% foundational competency mastery in 4 weeks',
      pos: '50% 35%',
      by: 'NEP NIPUN Bharat Mission'
    }
  },
];

// Define the props for the CircularGallery component
export interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items?: GalleryItem[];
  /** Controls how far the items are from the center. */
  radius?: number;
  /** Controls the speed of auto-rotation when not scrolling. */
  autoRotateSpeed?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items = LEARNLENS_GALLERY_DATA, className, radius = 540, autoRotateSpeed = 0.02, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    // Effect to handle scroll-based rotation
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        const scrollRotation = scrollProgress * 360;
        setRotation(scrollRotation);

        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 150);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, []);

    // Effect for auto-rotation when not scrolling
    useEffect(() => {
      const autoRotate = () => {
        if (!isScrolling) {
          setRotation(prev => prev + autoRotateSpeed);
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [isScrolling, autoRotateSpeed]);

    const anglePerItem = 360 / items.length;
    
    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn("relative w-full h-full flex items-center justify-center select-none", className)}
        style={{ perspective: '2000px' }}
        {...props}
      >
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            const opacity = Math.max(0.25, 1 - (normalizedAngle / 180));

            return (
              <div
                key={item.photo.url} 
                role="group"
                aria-label={item.common}
                className="absolute w-[260px] sm:w-[290px] h-[360px] sm:h-[390px]"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: '-130px',
                  marginTop: '-180px',
                  opacity: opacity,
                  transition: 'opacity 0.3s linear'
                }}
              >
                <div className="relative w-full h-full rounded-2xl shadow-2xl overflow-hidden group border border-white/20 bg-slate-900/80 backdrop-blur-xl hover:border-cyan-400/60 transition-colors">
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    className="absolute inset-0 w-full h-full object-cover filter brightness-[0.9] contrast-[1.05] group-hover:scale-105 transition-transform duration-500"
                    style={{ objectPosition: item.photo.pos || 'center' }}
                  />
                  
                  {/* Glassmorphic Gradient Content Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-5 text-white">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold mb-1">
                      Pillar 0{i + 1}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold font-display leading-tight text-white group-hover:text-cyan-300 transition-colors">
                      {item.common}
                    </h3>
                    <p className="text-xs text-slate-300 italic opacity-90 mt-1 font-body">
                      {item.binomial}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed font-body">
                      {item.photo.text}
                    </p>
                    <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>Source: {item.photo.by}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
export default CircularGallery;
