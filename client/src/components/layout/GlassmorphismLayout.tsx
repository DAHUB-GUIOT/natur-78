import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Leaf, Zap, Globe, Wind, Droplets } from 'lucide-react';

interface GlassBlockProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'full';
  className?: string;
  delay?: number;
  interactive?: boolean;
  icon?: React.ReactNode;
}

const GlassBlock: React.FC<GlassBlockProps> = ({ 
  children, 
  size = 'medium', 
  className = '', 
  delay = 0,
  interactive = true,
  icon
}) => {
  const sizeClasses = {
    small: 'col-span-1',
    medium: 'col-span-2',
    large: 'col-span-2 md:col-span-3',
    full: 'col-span-2 md:col-span-4'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: delay * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={interactive ? { 
        scale: 1.02, 
        y: -5,
        transition: { duration: 0.3 }
      } : {}}
      className={`
        ${sizeClasses[size]}
        glass-card relative overflow-hidden
        min-h-[160px] md:min-h-[200px]
        ${interactive ? 'cursor-pointer group' : ''}
        ${className}
      `}
    >
      {/* Solar Energy Background Effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-yellow-400/30 to-orange-400/30 rounded-full blur-xl" />
        <div className="absolute bottom-6 left-6 w-8 h-8 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-lg" />
      </div>

      {/* Interactive Shine Effect */}
      {interactive && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </div>
      )}

      {/* Icon */}
      {icon && (
        <div className="absolute top-4 left-4 text-green-400/70 group-hover:text-green-300 transition-colors duration-300">
          {icon}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-between">
        {children}
      </div>

      {/* Solar Glow Border */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/20 via-green-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
    </motion.div>
  );
};

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector(`.scroll-reveal-${Math.random()}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`scroll-reveal-${Math.random()} ${className}`}
    >
      {children}
    </motion.div>
  );
};

interface GlassmorphismLayoutProps {
  children?: React.ReactNode;
  showEcoElements?: boolean;
  backgroundVariant?: 'forest' | 'ocean' | 'mountain' | 'desert';
}

const GlassmorphismLayout: React.FC<GlassmorphismLayoutProps> = ({ 
  children, 
  showEcoElements = true,
  backgroundVariant = 'forest'
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const backgroundVariants = {
    forest: 'from-green-900/20 via-emerald-800/15 to-teal-900/20',
    ocean: 'from-blue-900/20 via-cyan-800/15 to-teal-900/20',
    mountain: 'from-slate-900/20 via-stone-800/15 to-zinc-900/20',
    desert: 'from-amber-900/20 via-orange-800/15 to-red-900/20'
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background with Mouse Following */}
      <div 
        className="fixed inset-0 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(202, 217, 94, 0.1) 0%, transparent 50%)`
        }}
      />
      
      {/* Organic Background Texture */}
      <div className={`fixed inset-0 bg-gradient-to-br ${backgroundVariants[backgroundVariant]} opacity-60`} />
      
      {/* Floating Eco Elements */}
      {showEcoElements && (
        <>
          <motion.div
            animate={{ 
              y: [0, -20, 0], 
              rotate: [0, 5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="fixed top-20 right-20 text-yellow-400/30 hidden lg:block"
          >
            <Sun size={40} />
          </motion.div>

          <motion.div
            animate={{ 
              y: [0, 15, 0], 
              x: [0, 10, 0],
              rotate: [0, -3, 0]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 2
            }}
            className="fixed bottom-32 left-16 text-green-400/25 hidden lg:block"
          >
            <Leaf size={32} />
          </motion.div>

          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
            className="fixed top-1/3 left-1/4 text-blue-400/20 hidden lg:block"
          >
            <Droplets size={28} />
          </motion.div>

          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              ease: "linear"
            }}
            className="fixed bottom-1/4 right-1/3 text-cyan-400/25 hidden lg:block"
          >
            <Wind size={36} />
          </motion.div>
        </>
      )}

      {/* Main Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Energy Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, 30, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut"
            }}
            className={`absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full blur-sm`}
            style={{
              left: `${10 + i * 15}%`,
              bottom: '10%'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export { GlassmorphismLayout, GlassBlock, ScrollReveal };