import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GlassBlock } from './GlassmorphismLayout';

interface EcoGridProps {
  children: React.ReactNode;
  className?: string;
  enableParallax?: boolean;
  staggerDelay?: number;
}

const EcoGrid: React.FC<EcoGridProps> = ({ 
  children, 
  className = '', 
  enableParallax = true,
  staggerDelay = 0.1 
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!enableParallax) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [enableParallax]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`grid-2x4 ${className}`}
      style={enableParallax ? {
        transform: `translateY(${scrollY * 0.1}px)`
      } : {}}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type === GlassBlock) {
          return React.cloneElement(child as React.ReactElement<any>, {
            delay: index * staggerDelay,
            ...child.props
          });
        }
        return child;
      })}
    </motion.div>
  );
};

export default EcoGrid;