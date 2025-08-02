import React, { useEffect, useRef } from "react";
import { HeaderButtons } from "@/components/layout/HeaderButtons";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const yellowDotRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!yellowDotRef.current || !textRef.current || !containerRef.current) return;

      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(scrollY / (maxScroll * 0.3), 1); // Use 30% of total scroll

      // Scale the yellow dot from 20px to full screen
      const scale = 1 + scrollProgress * 100;
      yellowDotRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;

      // Fade out text as dot grows
      const textOpacity = Math.max(0, 1 - scrollProgress * 2);
      textRef.current.style.opacity = textOpacity.toString();

      // Change background to yellow when dot is large enough
      if (scrollProgress > 0.7) {
        containerRef.current.style.backgroundColor = '#ffe600';
        textRef.current.style.color = '#0f2f22';
      } else {
        containerRef.current.style.backgroundColor = '#0f2f22';
        textRef.current.style.color = '#ffe600';
      }
    };

    // Add some content height for scrolling
    if (containerRef.current) {
      containerRef.current.style.minHeight = '300vh';
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0f2f22] transition-colors duration-500 relative">
      <HeaderButtons />
      
      {/* Yellow Dot */}
      <div 
        ref={yellowDotRef}
        className="fixed top-1/2 left-1/2 w-5 h-5 bg-[#ffe600] rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
        style={{ transformOrigin: 'center' }}
      />

      {/* Main Text Content */}
      <div ref={textRef} className="fixed inset-0 flex items-center justify-center text-[#ffe600] transition-opacity duration-300 z-10 pointer-events-none">
        <div className="text-center max-w-4xl px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 uppercase tracking-wide" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
            EL TURISMO DEVORA<br/>LO QUE VINO A VER
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left text-sm md:text-base font-mono">
            <div className="space-y-3">
              <p><strong>🌍 $9 billones USD/año</strong><br/>WTTC, 2023</p>
              <p><strong>📊 10.4% del PIB global</strong><br/>Representación económica</p>
              <p><strong>👥 1 de cada 10 empleos</strong><br/>Dependencia directa/indirecta</p>
              <p><strong>🛩️ Gasto en transporte > comunidades</strong><br/>Distribución desigual</p>
            </div>
            <div className="space-y-3">
              <p><strong>💸 80% ganancias se fugan</strong><br/>Hacia corporaciones internacionales</p>
              <p><strong>🇨🇴 70% turismo en 5 ciudades</strong><br/>Concentración en Colombia</p>
              <p><strong>🔄 Beneficia intermediarios</strong><br/>No a los territorios</p>
              <p><strong>🏨 Hoteleras, aerolíneas, plataformas</strong><br/>Capturan valor</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-[#ffe600] text-xs font-mono opacity-60 animate-bounce">
        SCROLL PARA CONTINUAR
      </div>
    </div>
  );
};

export default Index;