import React, { useEffect, useRef } from "react";
import { HeaderButtons } from "@/components/layout/HeaderButtons";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Index = () => {
  const worldMapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    // Initialize Map Instance
    const initializeMap = () => {
      if (!worldMapRef.current || mapInstance.current) return;

      mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

      mapInstance.current = new mapboxgl.Map({
        container: worldMapRef.current,
        style: 'mapbox://styles/mapbox/satellite-v9', // Clean satellite without labels
        center: [0, 15], // Better centered view for sphere rotation
        zoom: 0.6, // More distant for full sphere effect
        pitch: 0, // Flat view for clean background
        bearing: 0, // Starting rotation
        interactive: false,
        attributionControl: false,
        antialias: true,
      });

      // Start smooth spherical rotation animation
      const rotateWorld = () => {
        if (!mapInstance.current) return;
        
        const currentBearing = mapInstance.current.getBearing();
        mapInstance.current.setBearing(currentBearing + 0.05); // Slower, more natural rotation
        
        requestAnimationFrame(rotateWorld);
      };

      mapInstance.current.on('load', () => {
        rotateWorld();
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


    </div>
  );
};

export default Index;
