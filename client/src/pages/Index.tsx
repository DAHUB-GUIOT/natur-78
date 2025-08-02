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
        style: 'mapbox://styles/mapbox/satellite-streets-v12', // Better contrast for rotation
        center: [-75, 0], // Center on Latin America
        zoom: 0.8, // Much more distant world view
        pitch: 0, // Starting pitch for X-axis rotation
        bearing: 0, // No bearing rotation
        interactive: false,
        attributionControl: false,
        antialias: true,
      });

      // Add slow rotation on Y-axis (bearing)
      mapInstance.current.on('load', () => {
        const rotateWorld = () => {
          if (mapInstance.current) {
            const currentBearing = mapInstance.current.getBearing();
            const newBearing = (currentBearing + 1) % 360; // Faster rotation
            mapInstance.current.easeTo({ 
              bearing: newBearing, 
              duration: 100,
              easing: (t) => t // Linear easing for smooth rotation
            });
          }
        };
        
        // Rotate every 100ms for faster Y-axis rotation
        setInterval(rotateWorld, 100);
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
          <h1 className="text-6xl md:text-8xl font-gasoek text-yellow-400 font-black tracking-tight drop-shadow-2xl">
            FESTIVAL NATUR
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Index;
