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
    const handleScroll = () => {
      if (!worldMapRef.current || !textRef.current || !containerRef.current) return;

      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(scrollY / (maxScroll * 0.5), 1);

      // World map scaling and zoom effect
      const scale = 1 + scrollProgress * 50;
      worldMapRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;

      // Main text fade out
      const textOpacity = Math.max(0, 1 - scrollProgress * 1.5);
      textRef.current.style.opacity = textOpacity.toString();

      // Zoom to Colombia when scroll reaches certain point
      if (scrollProgress > 0.6 && mapInstance.current && !hasZoomedToColombia.current) {
        hasZoomedToColombia.current = true;
        mapInstance.current.flyTo({
          center: [-74.2973, 4.5709], // Precise center of Colombia (Bogotá coordinates)
          zoom: 6.0, // Optimal zoom to show Colombia nicely centered
          duration: 3000,
          essential: true,
          curve: 1.2, // Smoother curve transition
        });
      }

      // Background transition
      if (scrollProgress > 0.7) {
        containerRef.current.style.backgroundColor = '#ffe600';
        textRef.current.style.color = '#0f2f22';
      } else {
        containerRef.current.style.backgroundColor = '#0f2f22';
        textRef.current.style.color = '#ffe600';
      }
    };

    // Initialize Single Map Instance
    const initializeWorldMap = () => {
      if (!worldMapRef.current || mapInstance.current) return;

      mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

      mapInstance.current = new mapboxgl.Map({
        container: worldMapRef.current,
        style: 'mapbox://styles/mapbox/satellite-v9',
        center: [-20, 15], // Slightly shifted toward South America
        zoom: 1.8, // Slightly closer initial zoom
        pitch: 0,
        bearing: 0,
        interactive: false,
        attributionControl: false,
      });

      mapInstance.current.on('load', () => {
        if (!mapInstance.current) return;

        // Add Colombia highlighting immediately with fallback coordinates
        if (mapInstance.current) {
          const colombiaGeoJSON = {
            type: 'Feature',
            properties: { name: 'Colombia' },
            geometry: {
              type: 'Polygon',
              coordinates: [[
                [-81.8, 13.4], [-79.0, 12.6], [-77.2, 12.0], [-75.8, 11.8],
                [-74.0, 11.5], [-72.2, 11.2], [-70.9, 11.8], [-69.9, 12.2],
                [-69.2, 10.9], [-67.8, 10.8], [-67.1, 8.7], [-67.3, 6.1],
                [-67.8, 4.5], [-67.9, 3.0], [-67.3, 2.0], [-66.9, 1.2],
                [-66.3, 0.7], [-67.0, 0.0], [-67.8, -0.7], [-69.8, -0.9],
                [-70.0, -0.2], [-70.9, 0.9], [-72.0, 0.1], [-73.3, 0.9],
                [-74.5, 0.1], [-75.4, 0.1], [-76.3, 0.9], [-77.4, 0.4],
                [-78.2, 1.2], [-78.6, 2.3], [-79.1, 2.9], [-79.9, 4.5],
                [-80.5, 5.5], [-81.7, 8.9], [-81.8, 13.4]
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
              'fill-opacity': 0.6,
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
        }


      });
    };

    // Add content height for scrolling
    if (containerRef.current) {
      containerRef.current.style.minHeight = '400vh';
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Initialize map after a short delay to ensure DOM is ready
    setTimeout(initializeWorldMap, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0f2f22] transition-colors duration-500 relative overflow-hidden">
      <HeaderButtons />
      
      {/* World Map Container */}
      <div 
        ref={worldMapRef}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 rounded-full overflow-hidden"
        style={{ 
          transformOrigin: 'center',
          backfaceVisibility: 'hidden',
          width: '200px',
          height: '200px'
        }}
      />

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