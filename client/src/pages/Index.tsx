import React, { useEffect, useRef } from "react";
import { HeaderButtons } from "@/components/layout/HeaderButtons";
import { Button } from "@/components/ui/button";

const Index = () => {
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Progressive parallax effects for each scene
      const parallaxElements = document.querySelectorAll('.parallax-scene');
      parallaxElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementHeight = rect.height;
        
        // Calculate scroll progress for this element (0 to 1)
        const scrollProgress = Math.max(0, Math.min(1, 
          (windowHeight - elementTop) / (windowHeight + elementHeight)
        ));
        
        // Apply different effects based on scene
        const svgElement = element.querySelector('.scene-svg');
        if (svgElement) {
          const transform = `scale(${0.5 + scrollProgress * 1.5}) rotate(${scrollProgress * 360}deg)`;
          (svgElement as HTMLElement).style.transform = transform;
          (svgElement as HTMLElement).style.opacity = (0.3 + scrollProgress * 0.7).toString();
        }
      });

      // Zoom effects for progressive scenes
      const zoomScenes = document.querySelectorAll('.zoom-scene');
      zoomScenes.forEach((scene, index) => {
        const rect = scene.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(centerY - windowHeight / 2);
        const maxDistance = windowHeight;
        
        // Scale factor based on proximity to viewport center
        const scaleFactor = Math.max(0.2, 1 - (distanceFromCenter / maxDistance));
        const finalScale = 0.3 + (scaleFactor * 2);
        
        (scene as HTMLElement).style.transform = `scale(${finalScale})`;
        (scene as HTMLElement).style.opacity = scaleFactor.toString();
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1E0C] text-[#FFD600] overflow-x-hidden">
      <HeaderButtons showPortalButtons={true} />
      
      {/* Global CSS for brutalist animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@700;900&display=swap');
        
        .grotesk-text {
          font-family: 'Work Sans', 'Arial Black', Arial, sans-serif;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          line-height: 0.9;
        }
        
        .parallax-scene {
          will-change: transform, opacity;
          transition: all 0.1s ease-out;
        }
        
        .zoom-scene {
          will-change: transform, opacity;
          transition: all 0.2s ease-out;
          transform-origin: center;
        }
        
        .scene-svg {
          transition: all 0.3s ease-out;
          transform-origin: center;
        }
        
        @keyframes slowRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes slowPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes flicker {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        .slow-rotate { animation: slowRotate 60s linear infinite; }
        .slow-pulse { animation: slowPulse 4s ease-in-out infinite; }
        .orbit { animation: orbit 10s linear infinite; }
        .flicker { animation: flicker 2s ease-in-out infinite; }
      `}</style>

      {/* Scene 1: Earth 🌍 */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative parallax-scene overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="zoom-scene">
            <svg className="scene-svg slow-rotate w-96 h-96" viewBox="0 0 400 400">
              {/* Wireframe Earth */}
              <circle cx="200" cy="200" r="180" fill="none" stroke="#FFD600" strokeWidth="3"/>
              
              {/* Latitude lines */}
              <ellipse cx="200" cy="200" rx="180" ry="90" fill="none" stroke="#FFD600" strokeWidth="2" opacity="0.7"/>
              <ellipse cx="200" cy="200" rx="180" ry="45" fill="none" stroke="#FFD600" strokeWidth="2" opacity="0.7"/>
              <line x1="20" y1="200" x2="380" y2="200" stroke="#FFD600" strokeWidth="2" opacity="0.7"/>
              
              {/* Longitude lines */}
              <ellipse cx="200" cy="200" rx="90" ry="180" fill="none" stroke="#FFD600" strokeWidth="2" opacity="0.7"/>
              <ellipse cx="200" cy="200" rx="45" ry="180" fill="none" stroke="#FFD600" strokeWidth="2" opacity="0.7"/>
              <line x1="200" y1="20" x2="200" y2="380" stroke="#FFD600" strokeWidth="2" opacity="0.7"/>
              
              {/* South America highlight */}
              <path d="M160,240 L180,220 L190,260 L200,300 L180,320 L160,300 Z" 
                    fill="none" stroke="#FFD600" strokeWidth="4" opacity="0.9"/>
            </svg>
          </div>
        </div>
        
        <div className="text-center px-4 z-10 max-w-4xl">
          <h1 className="grotesk-text text-3xl md:text-6xl mb-8 leading-tight">
            EL TURISMO REPRESENTA<br/>
            MÁS DEL 10% DEL PIB GLOBAL...<br/>
            <span className="opacity-80">PERO TAMBIÉN AMENAZA<br/>LOS ECOSISTEMAS</span>
          </h1>
        </div>
      </section>

      {/* Scene 2: Colombia 🇨🇴 */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative parallax-scene overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="zoom-scene">
            <svg className="scene-svg w-[400px] h-[500px]" viewBox="0 0 300 400">
              {/* Colombia outline */}
              <path d="M150,50 L180,60 L200,90 L220,120 L240,160 L250,200 L240,240 L220,280 L200,320 L180,350 L150,370 L120,350 L100,320 L80,280 L70,240 L80,200 L90,160 L110,120 L130,90 L150,50 Z"
                    fill="none" stroke="#FFD600" strokeWidth="4"/>
              
              {/* Mountains (Andes) */}
              <path d="M120,120 L140,100 L160,120 L180,100 L200,120" 
                    fill="none" stroke="#FFD600" strokeWidth="2" opacity="0.8"/>
              <path d="M110,180 L130,160 L150,180 L170,160 L190,180" 
                    fill="none" stroke="#FFD600" strokeWidth="2" opacity="0.8"/>
              
              {/* Rivers */}
              <path d="M140,100 Q160,150 180,200 Q160,250 140,300" 
                    fill="none" stroke="#FFD600" strokeWidth="2" opacity="0.7"/>
              <path d="M180,120 Q200,170 220,220 Q200,270 180,320" 
                    fill="none" stroke="#FFD600" strokeWidth="2" opacity="0.7"/>
              
              {/* Jungle areas */}
              <circle cx="120" cy="200" r="15" fill="none" stroke="#FFD600" strokeWidth="1" opacity="0.6"/>
              <circle cx="160" cy="240" r="20" fill="none" stroke="#FFD600" strokeWidth="1" opacity="0.6"/>
              <circle cx="200" cy="180" r="18" fill="none" stroke="#FFD600" strokeWidth="1" opacity="0.6"/>
            </svg>
          </div>
        </div>
        
        <div className="text-center px-4 z-10 max-w-4xl">
          <h2 className="grotesk-text text-3xl md:text-6xl mb-8 leading-tight">
            COLOMBIA:<br/>
            EL SEGUNDO PAÍS<br/>
            MÁS BIODIVERSO DEL PLANETA...<br/>
            <span className="opacity-80">Y UNO DE LOS<br/>MÁS VULNERABLES</span>
          </h2>
        </div>
      </section>

      {/* Scene 3: Ave 🕊️ */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative parallax-scene overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="zoom-scene slow-pulse">
            <svg className="scene-svg w-[500px] h-[300px]" viewBox="0 0 500 300">
              {/* Condor/Tucán minimal lines */}
              <path d="M250,100 L220,80 L180,90 L140,110 L120,130 L160,140 L200,145 L240,140 L250,120 Z" 
                    fill="none" stroke="#FFD600" strokeWidth="3"/>
              <path d="M250,100 L280,80 L320,90 L360,110 L380,130 L340,140 L300,145 L260,140 L250,120 Z" 
                    fill="none" stroke="#FFD600" strokeWidth="3"/>
              
              {/* Body */}
              <ellipse cx="250" cy="150" rx="30" ry="60" fill="none" stroke="#FFD600" strokeWidth="3"/>
              
              {/* Head */}
              <circle cx="250" cy="100" r="25" fill="none" stroke="#FFD600" strokeWidth="3"/>
              
              {/* Beak */}
              <path d="M250,85 L270,75 L265,85" fill="none" stroke="#FFD600" strokeWidth="2"/>
              
              {/* Tail */}
              <path d="M250,210 L240,250 L250,280 L260,250 Z" fill="none" stroke="#FFD600" strokeWidth="2"/>
              
              {/* Wing details */}
              <line x1="150" y1="120" x2="130" y2="140" stroke="#FFD600" strokeWidth="2" opacity="0.7"/>
              <line x1="170" y1="125" x2="150" y2="145" stroke="#FFD600" strokeWidth="2" opacity="0.7"/>
              <line x1="350" y1="120" x2="370" y2="140" stroke="#FFD600" strokeWidth="2" opacity="0.7"/>
              <line x1="330" y1="125" x2="350" y2="145" stroke="#FFD600" strokeWidth="2" opacity="0.7"/>
            </svg>
          </div>
        </div>
        
        <div className="text-center px-4 z-10 max-w-4xl">
          <h2 className="grotesk-text text-3xl md:text-6xl mb-8 leading-tight">
            CADA ESPECIE<br/>
            ES UNA HISTORIA<br/>
            <span className="opacity-80">QUE AÚN PODEMOS<br/>PROTEGER</span>
          </h2>
        </div>
      </section>

      {/* Scene 4: Persona 🧍 */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative parallax-scene overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="zoom-scene">
            <svg className="scene-svg w-[400px] h-[500px]" viewBox="0 0 400 500">
              {/* Human silhouette */}
              <path d="M200,50 C190,50 185,60 185,70 C185,80 190,90 200,90 C210,90 215,80 215,70 C215,60 210,50 200,50 Z" 
                    fill="none" stroke="#FFD600" strokeWidth="3"/>
              
              {/* Body */}
              <rect x="180" y="90" width="40" height="100" fill="none" stroke="#FFD600" strokeWidth="3"/>
              
              {/* Arms */}
              <line x1="180" y1="120" x2="150" y2="140" stroke="#FFD600" strokeWidth="3"/>
              <line x1="150" y1="140" x2="140" y2="170" stroke="#FFD600" strokeWidth="3"/>
              <line x1="220" y1="120" x2="250" y2="140" stroke="#FFD600" strokeWidth="3"/>
              <line x1="250" y1="140" x2="260" y2="170" stroke="#FFD600" strokeWidth="3"/>
              
              {/* Legs */}
              <line x1="185" y1="190" x2="175" y2="250" stroke="#FFD600" strokeWidth="3"/>
              <line x1="175" y1="250" x2="165" y2="300" stroke="#FFD600" strokeWidth="3"/>
              <line x1="215" y1="190" x2="225" y2="250" stroke="#FFD600" strokeWidth="3"/>
              <line x1="225" y1="250" x2="235" y2="300" stroke="#FFD600" strokeWidth="3"/>
              
              {/* Wind lines (moving) */}
              <path d="M50,100 Q100,90 150,100" fill="none" stroke="#FFD600" strokeWidth="1" opacity="0.5">
                <animate attributeName="d" values="M50,100 Q100,90 150,100;M60,105 Q110,95 160,105;M50,100 Q100,90 150,100" dur="3s" repeatCount="indefinite"/>
              </path>
              <path d="M250,120 Q300,110 350,120" fill="none" stroke="#FFD600" strokeWidth="1" opacity="0.5">
                <animate attributeName="d" values="M250,120 Q300,110 350,120;M240,125 Q290,115 340,125;M250,120 Q300,110 350,120" dur="3s" repeatCount="indefinite"/>
              </path>
              
              {/* Water drops */}
              <circle cx="80" cy="200" r="3" fill="#FFD600" opacity="0.6">
                <animate attributeName="cy" values="200;220;200" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="320" cy="180" r="3" fill="#FFD600" opacity="0.6">
                <animate attributeName="cy" values="180;200;180" dur="2.5s" repeatCount="indefinite"/>
              </circle>
              
              {/* Tree elements */}
              <line x1="70" y1="250" x2="70" y2="300" stroke="#FFD600" strokeWidth="2" opacity="0.4"/>
              <circle cx="70" cy="245" r="8" fill="none" stroke="#FFD600" strokeWidth="1" opacity="0.4"/>
              <line x1="330" y1="270" x2="330" y2="320" stroke="#FFD600" strokeWidth="2" opacity="0.4"/>
              <circle cx="330" cy="265" r="8" fill="none" stroke="#FFD600" strokeWidth="1" opacity="0.4"/>
            </svg>
          </div>
        </div>
        
        <div className="text-center px-4 z-10 max-w-4xl">
          <h2 className="grotesk-text text-3xl md:text-6xl mb-8 leading-tight">
            SOMOS PARTE<br/>
            DEL ENTORNO.<br/>
            <span className="opacity-80">SOMOS PARTE<br/>DEL CAMBIO</span>
          </h2>
        </div>
      </section>

      {/* Scene 5: Corazón ❤️ */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative parallax-scene overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="zoom-scene slow-pulse">
            <svg className="scene-svg w-[400px] h-[400px]" viewBox="0 0 400 400">
              {/* Heart made of river curves and tree branches */}
              <path d="M200,120 C180,100 140,100 120,140 C120,180 200,260 200,320 C200,260 280,180 280,140 C280,100 240,100 220,120"
                    fill="none" stroke="#FFD600" strokeWidth="4"/>
              
              {/* River-like internal curves */}
              <path d="M160,140 Q180,160 200,180 Q220,160 240,140" 
                    fill="none" stroke="#FFD600" strokeWidth="2" opacity="0.7"/>
              <path d="M140,160 Q170,190 200,200 Q230,190 260,160" 
                    fill="none" stroke="#FFD600" strokeWidth="2" opacity="0.7"/>
              
              {/* Branch-like veins */}
              <line x1="200" y1="180" x2="180" y2="200" stroke="#FFD600" strokeWidth="1" opacity="0.6"/>
              <line x1="180" y1="200" x2="170" y2="220" stroke="#FFD600" strokeWidth="1" opacity="0.6"/>
              <line x1="180" y1="200" x2="190" y2="220" stroke="#FFD600" strokeWidth="1" opacity="0.6"/>
              
              <line x1="200" y1="180" x2="220" y2="200" stroke="#FFD600" strokeWidth="1" opacity="0.6"/>
              <line x1="220" y1="200" x2="230" y2="220" stroke="#FFD600" strokeWidth="1" opacity="0.6"/>
              <line x1="220" y1="200" x2="210" y2="220" stroke="#FFD600" strokeWidth="1" opacity="0.6"/>
              
              {/* Small leaves at branch ends */}
              <ellipse cx="170" cy="220" rx="3" ry="6" fill="none" stroke="#FFD600" strokeWidth="1" opacity="0.5"/>
              <ellipse cx="190" cy="220" rx="3" ry="6" fill="none" stroke="#FFD600" strokeWidth="1" opacity="0.5"/>
              <ellipse cx="230" cy="220" rx="3" ry="6" fill="none" stroke="#FFD600" strokeWidth="1" opacity="0.5"/>
              <ellipse cx="210" cy="220" rx="3" ry="6" fill="none" stroke="#FFD600" strokeWidth="1" opacity="0.5"/>
            </svg>
          </div>
        </div>
        
        <div className="text-center px-4 z-10 max-w-4xl">
          <h2 className="grotesk-text text-3xl md:text-6xl mb-8 leading-tight">
            EL TURISMO SOSTENIBLE<br/>
            NACE DESDE EL CORAZÓN:<br/>
            <span className="opacity-80">CUIDAR, COMPARTIR,<br/>REGENERAR</span>
          </h2>
        </div>
      </section>

      {/* Scene 6: Átomo ⚛️ */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative parallax-scene overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="zoom-scene">
            <svg className="scene-svg w-[500px] h-[500px]" viewBox="0 0 500 500">
              {/* Atom center */}
              <circle cx="250" cy="250" r="20" fill="none" stroke="#FFD600" strokeWidth="3"/>
              
              {/* Orbits */}
              <ellipse cx="250" cy="250" rx="100" ry="40" fill="none" stroke="#FFD600" strokeWidth="2" opacity="0.7" className="orbit"/>
              <ellipse cx="250" cy="250" rx="80" ry="60" fill="none" stroke="#FFD600" strokeWidth="2" opacity="0.7" 
                       style={{animation: 'orbit 12s linear infinite reverse'}}/>
              <ellipse cx="250" cy="250" rx="120" ry="30" fill="none" stroke="#FFD600" strokeWidth="2" opacity="0.7"
                       style={{animation: 'orbit 8s linear infinite'}}/>
              
              {/* Orbiting icons */}
              {/* Tree */}
              <g className="orbit" style={{transformOrigin: '250px 250px'}}>
                <line x1="350" y1="240" x2="350" y2="260" stroke="#FFD600" strokeWidth="2"/>
                <circle cx="350" cy="235" r="8" fill="none" stroke="#FFD600" strokeWidth="1"/>
              </g>
              
              {/* House */}
              <g className="orbit" style={{transformOrigin: '250px 250px', animation: 'orbit 12s linear infinite reverse'}}>
                <rect x="175" y="185" width="15" height="15" fill="none" stroke="#FFD600" strokeWidth="2"/>
                <path d="M170,185 L182.5,175 L195,185" fill="none" stroke="#FFD600" strokeWidth="2"/>
              </g>
              
              {/* Person */}
              <g className="orbit" style={{transformOrigin: '250px 250px', animation: 'orbit 8s linear infinite'}}>
                <circle cx="370" cy="250" r="4" fill="none" stroke="#FFD600" strokeWidth="1"/>
                <line x1="370" y1="254" x2="370" y2="270" stroke="#FFD600" strokeWidth="2"/>
                <line x1="365" y1="260" x2="375" y2="260" stroke="#FFD600" strokeWidth="1"/>
              </g>
              
              {/* Water drop */}
              <g className="orbit" style={{transformOrigin: '250px 250px', animation: 'orbit 10s linear infinite reverse'}}>
                <path d="M250,150 C245,155 245,165 250,170 C255,165 255,155 250,150" fill="none" stroke="#FFD600" strokeWidth="2"/>
              </g>
            </svg>
          </div>
        </div>
        
        <div className="text-center px-4 z-10 max-w-4xl">
          <h2 className="grotesk-text text-3xl md:text-6xl mb-8 leading-tight">
            LA SOSTENIBILIDAD<br/>
            NO ES UNA IDEA.<br/>
            <span className="opacity-80">ES UNA RED VIVA</span>
          </h2>
        </div>
      </section>

      {/* Final Scene: 50 Historias */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative parallax-scene overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="zoom-scene">
            <svg className="scene-svg w-[600px] h-[700px]" viewBox="0 0 400 500">
              {/* Colombia map outline */}
              <path d="M200,50 L230,60 L250,90 L270,120 L290,160 L300,200 L290,240 L270,280 L250,320 L230,350 L200,370 L170,350 L150,320 L130,280 L120,240 L130,200 L140,160 L160,120 L180,90 L200,50 Z"
                    fill="none" stroke="#FFD600" strokeWidth="3"/>
              
              {/* 50 glowing dots scattered across Colombia */}
              {[...Array(50)].map((_, i) => {
                const x = 140 + (Math.random() * 120);
                const y = 80 + (Math.random() * 260);
                const delay = Math.random() * 3;
                
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="2"
                    fill="#FFD600"
                    opacity="0.8"
                    className="flicker"
                    style={{animationDelay: `${delay}s`}}
                  />
                );
              })}
            </svg>
          </div>
        </div>
        
        <div className="text-center px-4 z-10 max-w-4xl">
          <h1 className="grotesk-text text-3xl md:text-6xl mb-8 leading-tight">
            50 HISTORIAS<br/>
            DE TURISMO SOSTENIBLE<br/>
            <span className="opacity-80">ESTÁN POR CONTARSE</span>
          </h1>
          
          <p className="grotesk-text text-xl md:text-3xl mb-12 opacity-90">
            HISTORIAS REALES.<br/>
            LUGARES REALES.<br/>
            PERSONAS REALES.
          </p>
          
          <Button className="grotesk-text bg-[#FFD600] text-[#0B1E0C] hover:bg-[#FFD600]/90 text-lg md:text-2xl px-12 py-6 border-4 border-[#FFD600] transform hover:scale-105 transition-all duration-300">
            SÉ EL PRIMERO EN DESCUBRIRLAS →
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;