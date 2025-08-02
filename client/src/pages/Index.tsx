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
              {/* Simplified Earth circle */}
              <circle cx="200" cy="200" r="180" fill="none" stroke="#FFD600" strokeWidth="6"/>
              
              {/* Main continents as simple shapes */}
              {/* North America */}
              <path d="M120,120 L160,100 L180,140 L140,160 Z" fill="#FFD600" opacity="0.8"/>
              
              {/* South America - highlighted */}
              <path d="M160,240 L180,220 L200,260 L190,320 L170,300 Z" fill="#FFD600"/>
              
              {/* Europe/Africa */}
              <path d="M220,140 L260,130 L280,180 L250,200 Z" fill="#FFD600" opacity="0.8"/>
              
              {/* Asia */}
              <path d="M280,100 L320,110 L340,150 L310,160 Z" fill="#FFD600" opacity="0.8"/>
              
              {/* Equator line */}
              <line x1="20" y1="200" x2="380" y2="200" stroke="#FFD600" strokeWidth="3" opacity="0.9" strokeDasharray="10,5"/>
              
              {/* Simplified grid */}
              <line x1="200" y1="20" x2="200" y2="380" stroke="#FFD600" strokeWidth="2" opacity="0.6"/>
              <ellipse cx="200" cy="200" rx="180" ry="90" fill="none" stroke="#FFD600" strokeWidth="2" opacity="0.6"/>
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
              {/* Simplified Colombia outline - more recognizable shape */}
              <path d="M150,50 L200,40 L240,60 L260,100 L270,140 L280,180 L275,220 L270,260 L260,300 L240,340 L200,360 L150,370 L100,360 L60,340 L40,300 L30,260 L25,220 L30,180 L40,140 L60,100 L100,60 L150,50 Z"
                    fill="none" stroke="#FFD600" strokeWidth="6"/>
              
              {/* Caribbean coast - distinctive feature */}
              <path d="M80,80 L160,70 L220,80 L260,100" 
                    fill="none" stroke="#FFD600" strokeWidth="4" opacity="0.9"/>
              
              {/* Pacific coast */}
              <path d="M50,120 L40,160 L35,200 L40,240 L50,280 L70,320" 
                    fill="none" stroke="#FFD600" strokeWidth="4" opacity="0.9"/>
              
              {/* Amazon region (simple rectangle) */}
              <rect x="180" y="280" width="80" height="60" fill="none" stroke="#FFD600" strokeWidth="3" opacity="0.7"/>
              
              {/* Andes mountains (simple triangles) */}
              <polygon points="100,120 110,100 120,120" fill="#FFD600" opacity="0.8"/>
              <polygon points="130,140 140,120 150,140" fill="#FFD600" opacity="0.8"/>
              <polygon points="160,160 170,140 180,160" fill="#FFD600" opacity="0.8"/>
              
              {/* Major cities as dots */}
              <circle cx="150" cy="180" r="4" fill="#FFD600"/>
              <text x="155" y="175" fill="#FFD600" fontSize="12" opacity="0.8">BOGOTÁ</text>
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
              {/* Simplified bird silhouette - more recognizable */}
              {/* Left wing */}
              <path d="M250,120 L150,100 L100,120 L120,140 L180,150 L220,140 Z" 
                    fill="#FFD600" stroke="#FFD600" strokeWidth="2"/>
              
              {/* Right wing */}
              <path d="M250,120 L350,100 L400,120 L380,140 L320,150 L280,140 Z" 
                    fill="#FFD600" stroke="#FFD600" strokeWidth="2"/>
              
              {/* Body - simple oval */}
              <ellipse cx="250" cy="160" rx="25" ry="50" fill="#FFD600"/>
              
              {/* Head - circle */}
              <circle cx="250" cy="110" r="20" fill="#FFD600"/>
              
              {/* Eye */}
              <circle cx="245" cy="105" r="3" fill="#0B1E0C"/>
              
              {/* Beak - simple triangle */}
              <polygon points="250,100 270,95 260,105" fill="#FFD600"/>
              
              {/* Tail - simple diamond */}
              <polygon points="250,210 240,240 250,260 260,240" fill="#FFD600"/>
              
              {/* Wing feather lines for detail */}
              <line x1="180" y1="120" x2="160" y2="135" stroke="#0B1E0C" strokeWidth="2"/>
              <line x1="200" y1="125" x2="180" y2="140" stroke="#0B1E0C" strokeWidth="2"/>
              <line x1="320" y1="120" x2="340" y2="135" stroke="#0B1E0C" strokeWidth="2"/>
              <line x1="300" y1="125" x2="320" y2="140" stroke="#0B1E0C" strokeWidth="2"/>
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
              {/* Simplified human figure */}
              {/* Head */}
              <circle cx="200" cy="70" r="25" fill="#FFD600"/>
              
              {/* Body */}
              <rect x="175" y="95" width="50" height="80" fill="#FFD600" rx="5"/>
              
              {/* Arms */}
              <rect x="135" y="115" width="40" height="15" fill="#FFD600" rx="7"/>
              <rect x="225" y="115" width="40" height="15" fill="#FFD600" rx="7"/>
              
              {/* Legs */}
              <rect x="180" y="175" width="15" height="70" fill="#FFD600" rx="7"/>
              <rect x="205" y="175" width="15" height="70" fill="#FFD600" rx="7"/>
              
              {/* Feet */}
              <ellipse cx="187" cy="255" rx="12" ry="8" fill="#FFD600"/>
              <ellipse cx="213" cy="255" rx="12" ry="8" fill="#FFD600"/>
              
              {/* Simple environmental elements around the person */}
              {/* Wind lines */}
              <path d="M50,120 L120,110" stroke="#FFD600" strokeWidth="3" opacity="0.6">
                <animate attributeName="d" values="M50,120 L120,110;M60,125 L130,115;M50,120 L120,110" dur="3s" repeatCount="indefinite"/>
              </path>
              <path d="M280,130 L350,120" stroke="#FFD600" strokeWidth="3" opacity="0.6">
                <animate attributeName="d" values="M280,130 L350,120;M270,135 L340,125;M280,130 L350,120" dur="2.5s" repeatCount="indefinite"/>
              </path>
              
              {/* Trees */}
              <rect x="65" y="220" width="8" height="40" fill="#FFD600"/>
              <circle cx="69" cy="210" r="15" fill="#FFD600"/>
              
              <rect x="325" y="240" width="8" height="40" fill="#FFD600"/>
              <circle cx="329" cy="230" r="15" fill="#FFD600"/>
              
              {/* Water drops */}
              <circle cx="100" cy="180" r="4" fill="#FFD600" opacity="0.7">
                <animate attributeName="cy" values="180;200;180" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="300" cy="160" r="4" fill="#FFD600" opacity="0.7">
                <animate attributeName="cy" values="160;180;160" dur="2.3s" repeatCount="indefinite"/>
              </circle>
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