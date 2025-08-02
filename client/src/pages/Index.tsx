import React, { useEffect, useRef } from "react";
import { HeaderButtons } from "@/components/layout/HeaderButtons";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const worldMapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const yellowDotRef = useRef<HTMLDivElement>(null);
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
        center: [-74.2973, 4.5709], // Start centered on Colombia (Bogotá)
        zoom: 2.5, // Wide enough to show world context but centered on Colombia
        pitch: 15, // Slight 3D angle for depth
        bearing: -10, // Slight rotation for dynamic feel
        interactive: false,
        attributionControl: false,
        antialias: true, // Better rendering quality
      });

      mapInstance.current.on('load', () => {
        if (!mapInstance.current) return;

        // Add Colombia highlighting with precise outline
        const colombiaGeoJSON = {
          type: 'Feature',
          properties: { name: 'Colombia' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [-81.7, 13.3], [-79.0, 12.6], [-77.2, 12.0], [-75.8, 11.8],
              [-74.0, 11.5], [-72.2, 11.2], [-70.9, 11.8], [-69.9, 12.2],
              [-69.2, 10.9], [-67.8, 10.8], [-67.1, 8.7], [-67.3, 6.1],
              [-67.8, 4.5], [-67.9, 3.0], [-67.3, 2.0], [-66.9, 1.2],
              [-66.3, 0.7], [-67.0, 0.0], [-67.8, -0.7], [-69.8, -0.9],
              [-70.0, -0.2], [-70.9, 0.9], [-72.0, 0.1], [-73.3, 0.9],
              [-74.5, 0.1], [-75.4, 0.1], [-76.3, 0.9], [-77.4, 0.4],
              [-78.2, 1.2], [-78.6, 2.3], [-79.1, 2.9], [-79.9, 4.5],
              [-80.5, 5.5], [-81.7, 8.9], [-81.7, 13.3]
            ]]
          }
        };

        mapInstance.current.addSource('colombia', {
          type: 'geojson',
          data: colombiaGeoJSON
        });

        // Add Colombia fill layer first
        mapInstance.current.addLayer({
          id: 'colombia-fill',
          type: 'fill',
          source: 'colombia',
          layout: {},
          paint: {
            'fill-color': '#cad95e', // NATUR brand green
            'fill-opacity': 0.8,
          },
        });

        // Add Colombia outline layer on top
        mapInstance.current.addLayer({
          id: 'colombia-outline',
          type: 'line',
          source: 'colombia',
          layout: {},
          paint: {
            'line-color': '#ffe600', // Yellow outline for better visibility
            'line-width': 3,
            'line-opacity': 1,
          },
        });
      });
    };

    initializeMap();
    
    const setupScrollHandling = () => {
      const handleScroll = () => {
        if (!worldMapRef.current || !textRef.current) return;

        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollProgress = Math.min(scrollY / (maxScroll * 0.5), 1);

        // World map scaling and zoom effect with rotation
        const scale = 1 + scrollProgress * 25;
        const rotation = scrollProgress * 360;
        worldMapRef.current.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`;
        worldMapRef.current.style.filter = `brightness(${1 + scrollProgress * 0.3}) contrast(${1 + scrollProgress * 0.2})`;

        // Main text fade out
        const textOpacity = Math.max(0, 1 - scrollProgress * 1.5);
        textRef.current.style.opacity = textOpacity.toString();

        // Yellow dot scaling animation with anti-pixelation
        if (yellowDotRef.current) {
          const dotScale = 1 + scrollProgress * 50;
          const time = Date.now() * 0.001;
          const sinusoidalOffset = Math.sin(time * 2) * 5;
          
          yellowDotRef.current.style.transform = `translate(calc(-50% + ${sinusoidalOffset}px), -50%) scale(${dotScale})`;
          yellowDotRef.current.style.opacity = Math.max(0, 1 - scrollProgress * 1.2).toString();
          yellowDotRef.current.style.textShadow = `0 0 ${10 + scrollProgress * 20}px rgba(255, 230, 0, 0.8)`;
        }

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
    <div ref={containerRef} className="min-h-screen bg-[#0f2f22] transition-colors duration-500 relative overflow-hidden">
      <HeaderButtons />
      
      {/* World Map Container */}
      <div 
        ref={worldMapRef}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 rounded-full overflow-hidden shadow-2xl border-4 border-[#ffe600]/30"
        style={{ 
          transformOrigin: 'center',
          backfaceVisibility: 'hidden',
          width: '300px',
          height: '300px',
          boxShadow: '0 0 60px rgba(255, 230, 0, 0.3), inset 0 0 30px rgba(0, 0, 0, 0.2)'
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Main Title Section */}
        <div ref={textRef} className="text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-gasoek text-[#cad95e] font-black tracking-tight">
            FESTIVAL
          </h1>
          <h2 className="text-4xl md:text-6xl font-gasoek text-[#ffe600] font-bold tracking-wide">
            NATUR
          </h2>
          <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed mt-8">
            Narrativa visual del mundo al corazón
          </p>
        </div>

        {/* Yellow Dot Animation */}
        <div 
          ref={yellowDotRef}
          className="absolute top-1/2 left-1/2 w-4 h-4 bg-[#ffe600] rounded-full transform -translate-x-1/2 -translate-y-1/2 z-30"
          style={{
            filter: 'drop-shadow(0 0 10px rgba(255, 230, 0, 0.8))',
            transformOrigin: 'center',
            backfaceVisibility: 'hidden',
          }}
        />
      </div>

      {/* Extended Spacer for Scroll Effect */}
      <div style={{ height: '200vh' }} />
    </div>
  );
};

export default Index;
