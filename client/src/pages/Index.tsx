import React, { useEffect, useRef } from "react";
import { HeaderButtons } from "@/components/layout/HeaderButtons";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const yellowDotRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!yellowDotRef.current || !textRef.current || !containerRef.current) return;

      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(scrollY / (maxScroll * 0.3), 1);

      // SVG circle scaling - no pixelation
      const scale = 1 + scrollProgress * 100;
      yellowDotRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;

      // Main text fade out
      const textOpacity = Math.max(0, 1 - scrollProgress * 2);
      textRef.current.style.opacity = textOpacity.toString();

      // Background transition
      if (scrollProgress > 0.7) {
        containerRef.current.style.backgroundColor = '#ffe600';
        textRef.current.style.color = '#0f2f22';
      } else {
        containerRef.current.style.backgroundColor = '#0f2f22';
        textRef.current.style.color = '#ffe600';
      }
    };

    // Add content height for scrolling
    if (containerRef.current) {
      containerRef.current.style.minHeight = '300vh';
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0f2f22] transition-colors duration-500 relative overflow-hidden">
      <HeaderButtons />
      
      {/* SVG Circle - No Pixelation */}
      <svg 
        ref={yellowDotRef}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
        style={{ 
          transformOrigin: 'center',
          backfaceVisibility: 'hidden',
          width: '20px',
          height: '20px'
        }}
        viewBox="0 0 20 20"
      >
        <circle cx="10" cy="10" r="10" fill="#ffe600" />
      </svg>

      {/* Main Text Content */}
      <div ref={textRef} className="fixed inset-0 flex items-center justify-center text-[#ffe600] transition-opacity duration-300 z-10 pointer-events-none">
        <div className="text-center max-w-4xl px-6">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-gasoek font-bold mb-12 uppercase tracking-wider">
            FESTIVAL<br/>NATUR
          </h1>
          <p className="text-xl md:text-3xl font-mono uppercase tracking-wide opacity-90">
            DESCUBRE EL FUTURO DEL TURISMO SOSTENIBLE
          </p>
        </div>
      </div>



      {/* Scroll indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-[#ffe600] text-xs font-mono opacity-60 animate-bounce z-30">
        SCROLL PARA CONTINUAR
      </div>
    </div>
  );
};

export default Index;