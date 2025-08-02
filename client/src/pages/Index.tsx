import React, { useEffect, useRef } from "react";
import { HeaderButtons } from "@/components/layout/HeaderButtons";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const yellowDotRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!yellowDotRef.current || !textRef.current || !containerRef.current || !infoRef.current) return;

      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(scrollY / (maxScroll * 0.4), 1);

      // Enhanced dot scaling with better interpolation to prevent pixelation
      const scale = 1 + scrollProgress * 150;
      const blur = scrollProgress > 0.8 ? (scrollProgress - 0.8) * 50 : 0;
      
      yellowDotRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
      yellowDotRef.current.style.filter = `blur(${blur}px)`;
      yellowDotRef.current.style.willChange = 'transform, filter';

      // Main text fade out
      const textOpacity = Math.max(0, 1 - scrollProgress * 1.5);
      textRef.current.style.opacity = textOpacity.toString();

      // Info section with bigger text and fade echo effect
      const infoOpacity = scrollProgress > 0.3 ? Math.min(1, (scrollProgress - 0.3) * 2) : 0;
      const infoScale = 1 + scrollProgress * 0.5; // Bigger scaling
      const echoOffset = Math.sin(scrollProgress * Math.PI * 4) * 2; // Echo effect
      
      infoRef.current.style.opacity = infoOpacity.toString();
      infoRef.current.style.transform = `scale(${infoScale}) translateY(${echoOffset}px)`;
      infoRef.current.style.textShadow = `
        0 0 20px rgba(255, 230, 0, ${infoOpacity * 0.8}),
        ${echoOffset}px ${echoOffset}px 0 rgba(255, 230, 0, ${infoOpacity * 0.3}),
        ${-echoOffset}px ${-echoOffset}px 0 rgba(255, 230, 0, ${infoOpacity * 0.3})
      `;

      // Enhanced background transition
      if (scrollProgress > 0.7) {
        containerRef.current.style.backgroundColor = '#ffe600';
        textRef.current.style.color = '#0f2f22';
        infoRef.current.style.color = '#0f2f22';
      } else {
        containerRef.current.style.backgroundColor = '#0f2f22';
        textRef.current.style.color = '#ffe600';
        infoRef.current.style.color = '#ffe600';
      }
    };

    // Add content height for scrolling
    if (containerRef.current) {
      containerRef.current.style.minHeight = '400vh';
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0f2f22] transition-colors duration-500 relative overflow-hidden">
      <HeaderButtons />
      
      {/* Enhanced Yellow Dot with better rendering */}
      <div 
        ref={yellowDotRef}
        className="fixed top-1/2 left-1/2 w-5 h-5 bg-[#ffe600] rounded-full transform -translate-x-1/2 -translate-y-1/2 z-0"
        style={{ 
          transformOrigin: 'center',
          backfaceVisibility: 'hidden',
          perspective: '1000px',
          imageRendering: 'crisp-edges'
        }}
      />

      {/* Main Text Content */}
      <div ref={textRef} className="fixed inset-0 flex items-center justify-center text-[#ffe600] transition-opacity duration-300 z-10 pointer-events-none">
        <div className="text-center max-w-4xl px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 uppercase tracking-wide" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
            EL TURISMO DEVORA<br/>LO QUE VINO A VER
          </h1>
        </div>
      </div>

      {/* Enhanced Info Section with Echo Effect */}
      <div ref={infoRef} className="fixed inset-0 flex items-center justify-center text-[#ffe600] z-20 pointer-events-none opacity-0">
        <div className="text-center max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left text-lg md:text-2xl lg:text-3xl font-mono font-bold">
            <div className="space-y-6">
              <p className="transform transition-all duration-300">
                <span className="text-3xl md:text-4xl">🌍</span>
                <strong className="block text-2xl md:text-3xl">$9 BILLONES USD/AÑO</strong>
                <span className="text-lg md:text-xl opacity-80">WTTC, 2023</span>
              </p>
              <p className="transform transition-all duration-300">
                <span className="text-3xl md:text-4xl">📊</span>
                <strong className="block text-2xl md:text-3xl">10.4% DEL PIB GLOBAL</strong>
                <span className="text-lg md:text-xl opacity-80">Representación económica</span>
              </p>
              <p className="transform transition-all duration-300">
                <span className="text-3xl md:text-4xl">👥</span>
                <strong className="block text-2xl md:text-3xl">1 DE CADA 10 EMPLEOS</strong>
                <span className="text-lg md:text-xl opacity-80">Dependencia directa/indirecta</span>
              </p>
              <p className="transform transition-all duration-300">
                <span className="text-3xl md:text-4xl">🛩️</span>
                <strong className="block text-2xl md:text-3xl">GASTO EN TRANSPORTE &gt; COMUNIDADES</strong>
                <span className="text-lg md:text-xl opacity-80">Distribución desigual</span>
              </p>
            </div>
            <div className="space-y-6">
              <p className="transform transition-all duration-300">
                <span className="text-3xl md:text-4xl">💸</span>
                <strong className="block text-2xl md:text-3xl">80% GANANCIAS SE FUGAN</strong>
                <span className="text-lg md:text-xl opacity-80">Hacia corporaciones internacionales</span>
              </p>
              <p className="transform transition-all duration-300">
                <span className="text-3xl md:text-4xl">🇨🇴</span>
                <strong className="block text-2xl md:text-3xl">70% TURISMO EN 5 CIUDADES</strong>
                <span className="text-lg md:text-xl opacity-80">Concentración en Colombia</span>
              </p>
              <p className="transform transition-all duration-300">
                <span className="text-3xl md:text-4xl">🔄</span>
                <strong className="block text-2xl md:text-3xl">BENEFICIA INTERMEDIARIOS</strong>
                <span className="text-lg md:text-xl opacity-80">No a los territorios</span>
              </p>
              <p className="transform transition-all duration-300">
                <span className="text-3xl md:text-4xl">🏨</span>
                <strong className="block text-2xl md:text-3xl">HOTELERAS, AEROLÍNEAS, PLATAFORMAS</strong>
                <span className="text-lg md:text-xl opacity-80">Capturan valor</span>
              </p>
            </div>
          </div>
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