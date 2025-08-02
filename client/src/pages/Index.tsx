import React, { useEffect, useRef } from "react";
import { HeaderButtons } from "@/components/layout/HeaderButtons";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Index = () => {
  const worldMapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    // Initialize Map Instance
    const initializeMap = () => {
      if (!worldMapRef.current || mapInstance.current) return;

      mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

      mapInstance.current = new mapboxgl.Map({
        container: worldMapRef.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [0, 20], // Center on world view
        zoom: 1.2, // Show world distant but visible
        pitch: 0, // Flat view for clean background
        bearing: 0, // No rotation
        interactive: false,
        attributionControl: false,
        antialias: true,
      });
    };

    initializeMap();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
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

      {/* Simple Text Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div ref={textRef} className="text-center">
          <h1 className="text-6xl md:text-8xl font-gasoek text-white font-black tracking-tight drop-shadow-2xl">
            FESTIVAL NATUR
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Index;
