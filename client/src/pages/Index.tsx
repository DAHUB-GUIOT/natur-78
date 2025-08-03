import React, { useEffect, useRef } from "react";
import { HeaderButtons } from "@/components/layout/HeaderButtons";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Index = () => {
  const worldMapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);

  const colombiaMapRef = useRef<HTMLDivElement>(null);
  const colombiaMapInstance = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    // Initialize World Map Instance
    const initializeWorldMap = () => {
      if (!worldMapRef.current || mapInstance.current) return;

      mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

      mapInstance.current = new mapboxgl.Map({
        container: worldMapRef.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [-75, 0], // Center on Latin America
        zoom: 0.8, // Much more distant world view
        pitch: 0,
        bearing: 0,
        interactive: false,
        attributionControl: false,
        antialias: true,
      });

      // Add slow rotation on Y-axis (bearing)
      mapInstance.current.on('load', () => {
        const rotateWorld = () => {
          if (mapInstance.current) {
            const currentBearing = mapInstance.current.getBearing();
            const newBearing = (currentBearing + 1) % 360;
            mapInstance.current.easeTo({ 
              bearing: newBearing, 
              duration: 100,
              easing: (t) => t
            });
          }
        };
        
        setInterval(rotateWorld, 100);
      });
    };

    // Initialize Colombia Map Instance
    const initializeColombiaMap = () => {
      if (!colombiaMapRef.current || colombiaMapInstance.current) return;

      colombiaMapInstance.current = new mapboxgl.Map({
        container: colombiaMapRef.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [-74.2973, 4.5709], // Center on Colombia (Bogotá)
        zoom: 5.5,
        pitch: 0,
        bearing: 0,
        interactive: false,
        attributionControl: false,
        antialias: true,
      });
    };

    // Setup scroll handling for parallax effect
    const setupScrollHandling = () => {
      const handleScroll = () => {
        if (!worldMapRef.current || !textRef.current || !colombiaMapRef.current) return;

        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const scrollProgress = Math.min(scrollY / (windowHeight * 0.8), 1);

        // Main text fade out
        const textOpacity = Math.max(0, 1 - scrollProgress * 2);
        textRef.current.style.opacity = textOpacity.toString();

        // World map fade out and scale
        const worldMapOpacity = Math.max(0, 1 - scrollProgress * 1.5);
        const worldMapScale = 1 + scrollProgress * 2;
        worldMapRef.current.style.opacity = worldMapOpacity.toString();
        worldMapRef.current.style.transform = `scale(${worldMapScale})`;

        // Colombia map fade in
        const colombiaMapOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.3) * 3));
        colombiaMapRef.current.style.opacity = colombiaMapOpacity.toString();

        // Animate content sections with sequential fade in/out
        const sections = document.querySelectorAll('.content-section');
        const totalSections = sections.length;
        const sectionScrollRange = windowHeight * 1.5; // Each section needs 1.5 screen heights
        
        sections.forEach((section, index) => {
          const sectionElement = section as HTMLElement;
          const startScroll = windowHeight + (index * sectionScrollRange);
          const endScroll = startScroll + sectionScrollRange;
          const currentSectionProgress = Math.max(0, Math.min(1, (scrollY - startScroll) / sectionScrollRange));
          
          let opacity = 0;
          let translateY = 50;
          let scale = 0.9;
          
          // Fade in when entering
          if (scrollY >= startScroll && scrollY <= startScroll + sectionScrollRange * 0.3) {
            const fadeInProgress = (scrollY - startScroll) / (sectionScrollRange * 0.3);
            opacity = fadeInProgress;
            translateY = 50 * (1 - fadeInProgress);
            scale = 0.9 + (0.1 * fadeInProgress);
          }
          // Stay visible in the middle
          else if (scrollY > startScroll + sectionScrollRange * 0.3 && scrollY < startScroll + sectionScrollRange * 0.7) {
            opacity = 1;
            translateY = 0;
            scale = 1;
          }
          // Fade out when leaving
          else if (scrollY >= startScroll + sectionScrollRange * 0.7 && scrollY <= endScroll) {
            const fadeOutProgress = (scrollY - (startScroll + sectionScrollRange * 0.7)) / (sectionScrollRange * 0.3);
            opacity = 1 - fadeOutProgress;
            translateY = -50 * fadeOutProgress;
            scale = 1 - (0.1 * fadeOutProgress);
          }
          
          const content = sectionElement.querySelector('.section-content') as HTMLElement;
          if (content) {
            content.style.transform = `translateY(${translateY}px) scale(${scale})`;
            content.style.opacity = opacity.toString();
            content.style.transition = 'all 0.1s ease-out';
          }
        });
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll();

      return () => window.removeEventListener('scroll', handleScroll);
    };

    initializeWorldMap();
    initializeColombiaMap();
    const cleanup = setupScrollHandling();
    
    return cleanup;
  }, []);

  return (
    <div className="relative">
      {/* Top Menu */}
      <HeaderButtons />
      
      {/* Full Background World Map */}
      <div 
        ref={worldMapRef}
        className="fixed inset-0 w-full h-full z-0"
        style={{ 
          transformOrigin: 'center',
          backfaceVisibility: 'hidden',
        }}
      />

      {/* Colombia Map - Initially Hidden */}
      <div 
        ref={colombiaMapRef}
        className="fixed inset-0 w-full h-full z-0"
        style={{ 
          opacity: 0,
          transformOrigin: 'center',
          backfaceVisibility: 'hidden',
        }}
      />

      {/* First Section - Festival NATUR */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div ref={textRef} className="text-center">
          <h1 className="text-6xl md:text-8xl font-gasoek text-yellow-400 font-black tracking-tight drop-shadow-2xl">
            FESTIVAL NATUR
          </h1>
        </div>
      </div>

      {/* Content Sections with Colombia Background */}
      <div className="relative z-10" style={{ height: '600vh' }}>
        {/* Slide 1 — Potencia en peligro */}
        <section className="content-section fixed inset-0 flex items-center justify-center px-8">
          <div className="section-content max-w-4xl text-center text-white bg-black/80 backdrop-blur-sm rounded-3xl p-12 border border-yellow-400/20"
               style={{ transform: 'translateY(50px) scale(0.9)', opacity: 0 }}>
            <h2 className="text-4xl md:text-6xl font-gasoek text-yellow-400 mb-8 font-black drop-shadow-2xl">
              Slide 1 — Potencia en peligro
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed mb-6 drop-shadow-lg">
              Colombia es el país con mayor biodiversidad por kilómetro cuadrado del mundo, alberga más de 54 000 especies y 314 ecosistemas únicos.
            </p>
            <p className="text-xl md:text-2xl leading-relaxed text-red-400 drop-shadow-lg font-semibold">
              Sin embargo, el turismo que llega buscando "naturaleza" está acelerando su degradación.
            </p>
          </div>
        </section>

        {/* Slide 2 — Turismo mal entendido */}
        <section className="content-section fixed inset-0 flex items-center justify-center px-8">
          <div className="section-content max-w-4xl text-center text-white bg-black/80 backdrop-blur-sm rounded-3xl p-12 border border-yellow-400/20"
               style={{ transform: 'translateY(50px) scale(0.9)', opacity: 0 }}>
            <h2 className="text-4xl md:text-6xl font-gasoek text-yellow-400 mb-8 font-black drop-shadow-2xl">
              Slide 2 — Turismo mal entendido
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed mb-6 drop-shadow-lg">
              El 57 % de los turistas en Colombia no sabe qué significa turismo sostenible.
            </p>
            <p className="text-xl md:text-2xl leading-relaxed drop-shadow-lg">
              El interés por experiencias "eco" creció un 400 % en la última década, pero 1 de cada 5 proyectos se anuncia sostenible sin serlo realmente, convirtiendo la biodiversidad en mercancía.
            </p>
          </div>
        </section>

        {/* Slide 3 — Consumo vs. conservación */}
        <section className="content-section fixed inset-0 flex items-center justify-center px-8">
          <div className="section-content max-w-4xl text-center text-white bg-black/80 backdrop-blur-sm rounded-3xl p-12 border border-yellow-400/20"
               style={{ transform: 'translateY(50px) scale(0.9)', opacity: 0 }}>
            <h2 className="text-4xl md:text-6xl font-gasoek text-yellow-400 mb-8 font-black drop-shadow-2xl">
              Slide 3 — Consumo vs. conservación
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed mb-6 drop-shadow-lg">
              Playas saturadas, montañas con basura, comunidades desplazadas y ecosistemas en riesgo → 42 % de los destinos naturales ya muestran señales de colapso.
            </p>
            <p className="text-xl md:text-2xl leading-relaxed mb-6 drop-shadow-lg">
              El turismo como está planteado consume lo que promete proteger.
            </p>
            <p className="text-xl md:text-2xl leading-relaxed text-yellow-400 font-bold drop-shadow-lg">
              Es urgente un reinicio del modelo.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
