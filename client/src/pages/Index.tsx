import React, { useEffect, useRef } from "react";
import { HeaderButtons } from "@/components/layout/HeaderButtons";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const worldMapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const hasZoomedToColombia = useRef(false);

  useEffect(() => {
    // Initialize Single Map Instance
    const initializeMap = () => {
      if (!worldMapRef.current || mapInstance.current) return;

      mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

      mapInstance.current = new mapboxgl.Map({
        container: worldMapRef.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [0, 20], // Center on world view
        zoom: 1.5, // Show world clearly but distant
        pitch: 0, // Flat view for full background
        bearing: 0, // No rotation for clean background
        interactive: false,
        attributionControl: false,
        antialias: true, // Better rendering quality
      });

      // Map loads without any overlays - clean and distant view
    };

    initializeMap();
    
    const setupScrollHandling = () => {
      const handleScroll = () => {
        if (!worldMapRef.current || !textRef.current) return;

        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollProgress = Math.min(scrollY / (maxScroll * 0.5), 1);

        // World map zoom effect for background
        const scale = 1 + scrollProgress * 3;
        worldMapRef.current.style.transform = `scale(${scale})`;
        worldMapRef.current.style.filter = `brightness(${0.7 + scrollProgress * 0.5}) contrast(${1 + scrollProgress * 0.3})`;

        // Main text fade out
        const textOpacity = Math.max(0, 1 - scrollProgress * 1.5);
        textRef.current.style.opacity = textOpacity.toString();



        // Zoom to Colombia when scroll reaches certain point
        if (scrollProgress > 0.6 && mapInstance.current && !hasZoomedToColombia.current) {
          hasZoomedToColombia.current = true;
          mapInstance.current.flyTo({
            center: [-74.2973, 4.5709], // Precise center of Colombia (Bogotá coordinates)
            zoom: 6.5, // Higher zoom for better detail
            pitch: 45, // More dramatic 3D angle
            bearing: 0, // Straighten rotation for Colombia view
            duration: 4000,
            essential: true,
            curve: 1.5, // More dramatic curve
          });
        }
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial call

      return () => window.removeEventListener('scroll', handleScroll);
    };

    const cleanup = setupScrollHandling();
    return cleanup;
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
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

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Main Title Section */}
        <div ref={textRef} className="text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-gasoek text-white font-black tracking-tight drop-shadow-2xl">
            FESTIVAL
          </h1>
          <h2 className="text-4xl md:text-6xl font-gasoek text-[#ffe600] font-bold tracking-wide drop-shadow-2xl">
            NATUR
          </h2>
          <p className="text-xl md:text-2xl text-white font-light leading-relaxed mt-8 drop-shadow-lg">
            Narrativa visual del mundo al corazón
          </p>
        </div>
      </div>

      {/* Extended Spacer for Scroll Effect */}
      <div style={{ height: '200vh' }} />
    </div>
  );
};

export default Index;
