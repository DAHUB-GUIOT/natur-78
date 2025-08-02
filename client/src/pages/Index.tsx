import React, { useEffect, useRef } from "react";
import { HeaderButtons } from "@/components/layout/HeaderButtons";

const Index = () => {
  const sectionsRef = useRef<HTMLElement[]>([]);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Advanced parallax effects for each scene
      const parallaxElements = document.querySelectorAll('.parallax-scene');
      parallaxElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementHeight = rect.height;
        
        const scrollProgress = (windowHeight - elementTop) / (windowHeight + elementHeight);
        const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
        
        const svgElement = element.querySelector('.scene-svg');
        const textElement = element.querySelector('.scene-text');
        
        if (svgElement) {
          const sceneEffects = [
            // 1. World: Planet rotation with clouds parallax
            () => {
              const planet = svgElement.querySelector('.planet');
              const clouds = svgElement.querySelector('.clouds');
              if (planet) (planet as HTMLElement).style.transform = `rotate(${clampedProgress * 360}deg)`;
              if (clouds) (clouds as HTMLElement).style.transform = `translateX(${clampedProgress * 100}px) translateY(${-clampedProgress * 50}px)`;
              return `scale(${0.8 + clampedProgress * 0.4})`;
            },
            // 2. Colombia: Map fragmentation
            () => {
              const mapParts = svgElement.querySelectorAll('.map-fragment');
              mapParts.forEach((part, i) => {
                const offset = clampedProgress * (20 + i * 10);
                (part as HTMLElement).style.transform = `translate(${Math.cos(i) * offset}px, ${Math.sin(i) * offset}px)`;
              });
              return `scale(${0.7 + clampedProgress * 0.6})`;
            },
            // 3. Bird: Growing and wing flapping
            () => {
              const wings = svgElement.querySelectorAll('.wing');
              const flapAmount = Math.sin(Date.now() * 0.01) * 5;
              wings.forEach((wing, i) => {
                (wing as HTMLElement).style.transform = `rotate(${(i === 0 ? -1 : 1) * flapAmount}deg)`;
              });
              return `scale(${0.5 + clampedProgress * 1.5})`;
            },
            // 4. Person: Face wireframe drawing
            () => {
              const lines = svgElement.querySelectorAll('.face-line');
              lines.forEach((line, i) => {
                const delay = i * 0.1;
                const lineProgress = Math.max(0, Math.min(1, (clampedProgress - delay) * 2));
                (line as HTMLElement).style.strokeDasharray = `${lineProgress * 100} 100`;
              });
              return `scale(${0.6 + clampedProgress * 0.8})`;
            },
            // 5. Heart: Heartbeat pulse
            () => {
              const pulse = 1 + Math.sin(Date.now() * 0.008) * 0.1;
              return `scale(${(0.7 + clampedProgress * 0.6) * pulse})`;
            },
            // 6. Atom: Orbital rotation
            () => {
              const orbits = svgElement.querySelectorAll('.orbit');
              orbits.forEach((orbit, i) => {
                (orbit as HTMLElement).style.transform = `rotate(${Date.now() * (0.001 + i * 0.0005)}rad)`;
              });
              return `scale(${0.6 + clampedProgress * 0.8})`;
            },
            // 7. Stories: Book opening
            () => {
              const curves = svgElement.querySelectorAll('.story-curve');
              curves.forEach((curve, i) => {
                const rotation = clampedProgress * (15 + i * 10);
                (curve as HTMLElement).style.transform = `rotate(${i % 2 === 0 ? -1 : 1}deg) scale(${1 + clampedProgress * 0.5})`;
              });
              return `scale(${0.8 + clampedProgress * 0.4})`;
            }
          ];
          
          const transform = sceneEffects[index] ? sceneEffects[index]() : `scale(${0.8 + clampedProgress * 0.4})`;
          (svgElement as HTMLElement).style.transform = transform;
          (svgElement as HTMLElement).style.opacity = Math.max(0.1, Math.min(1, clampedProgress * 2)).toString();
        }
        
        if (textElement) {
          const textOpacity = clampedProgress > 0.3 ? Math.min(1, (clampedProgress - 0.3) * 2) : 0;
          const textTranslate = (1 - clampedProgress) * 50;
          (textElement as HTMLElement).style.opacity = textOpacity.toString();
          (textElement as HTMLElement).style.transform = `translateY(${textTranslate}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#0f2f22] text-[#ffe600] font-mono">
      <HeaderButtons showPortalButtons={true} />
      
      <style>{`
        .brutalist-text {
          font-family: 'Courier New', monospace;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
          line-height: 1.2;
        }
        
        .data-highlight {
          background: #ffe600;
          color: #0f2f22;
          padding: 8px 16px;
          margin: 8px 0;
          transform: rotate(-1deg);
          display: inline-block;
          font-weight: bold;
        }
        
        .parallax-scene {
          will-change: transform, opacity;
          position: relative;
          overflow: hidden;
        }
        
        .scene-svg {
          will-change: transform, opacity;
          transform-origin: center;
        }
        
        .scene-text {
          will-change: transform, opacity;
          opacity: 0;
        }

        .face-line {
          stroke-dasharray: 0 100;
          transition: stroke-dasharray 0.3s ease;
        }
      `}</style>

      {/* Scene 1: EL MUNDO 🌍 */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative parallax-scene">
        <div className="relative z-10">
          <svg className="scene-svg w-[400px] h-[400px]" viewBox="0 0 400 400">
            <g className="planet">
              {/* Earth outline */}
              <circle cx="200" cy="200" r="120" fill="none" stroke="#ffe600" strokeWidth="2"/>
              
              {/* Continents */}
              <path d="M140,160 L180,150 L190,180 L160,190 Z" fill="none" stroke="#ffe600" strokeWidth="1.5"/>
              <path d="M180,220 L220,210 L230,240 L200,250 Z" fill="none" stroke="#ffe600" strokeWidth="1.5"/>
              <path d="M240,170 L270,160 L280,190 L250,200 Z" fill="none" stroke="#ffe600" strokeWidth="1.5"/>
            </g>
            
            <g className="clouds">
              {/* Cloud 1 */}
              <path d="M80,120 Q90,110 100,115 Q115,105 130,115 Q140,110 150,120 Q145,130 130,125 Q115,135 100,125 Q85,130 80,120" 
                    fill="none" stroke="#ffe600" strokeWidth="1" opacity="0.4"/>
              
              {/* Cloud 2 */}
              <path d="M250,100 Q260,90 270,95 Q285,85 300,95 Q310,90 320,100 Q315,110 300,105 Q285,115 270,105 Q255,110 250,100" 
                    fill="none" stroke="#ffe600" strokeWidth="1" opacity="0.5"/>
              
              {/* Cloud 3 */}
              <path d="M320,250 Q330,240 340,245 Q355,235 370,245 Q380,240 390,250 Q385,260 370,255 Q355,265 340,255 Q325,260 320,250" 
                    fill="none" stroke="#ffe600" strokeWidth="1" opacity="0.3"/>
            </g>
          </svg>
        </div>
        
        <div className="absolute bottom-20 left-0 right-0 scene-text text-center px-6">
          <h1 className="brutalist-text text-3xl md:text-5xl mb-6">
            "EL TURISMO DEVORA<br/>LO QUE VINO A VER"
          </h1>
          <div className="data-highlight mb-4">8% DE EMISIONES GLOBALES VIENEN DEL TURISMO</div>
          <p className="text-base md:text-lg max-w-2xl mx-auto">
            La velocidad con la que viajamos<br/>borra lo que buscamos.
          </p>
        </div>
      </section>

      {/* Scene 2: COLOMBIA 🗺️ */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative parallax-scene">
        <div className="relative z-10">
          <svg className="scene-svg w-[350px] h-[450px]" viewBox="0 0 300 400">
            {/* Colombia map outline - fragmented */}
            <path className="map-fragment" d="M150,50 L200,40 L240,60 L270,100 L280,140" 
                  fill="none" stroke="#ffe600" strokeWidth="3"/>
            <path className="map-fragment" d="M280,140 L275,180 L270,220 L260,260" 
                  fill="none" stroke="#ffe600" strokeWidth="3"/>
            <path className="map-fragment" d="M260,260 L240,300 L200,320 L150,330" 
                  fill="none" stroke="#ffe600" strokeWidth="3"/>
            <path className="map-fragment" d="M150,330 L100,320 L60,300 L40,260" 
                  fill="none" stroke="#ffe600" strokeWidth="3"/>
            <path className="map-fragment" d="M40,260 L30,220 L35,180 L50,140" 
                  fill="none" stroke="#ffe600" strokeWidth="3"/>
            <path className="map-fragment" d="M50,140 L80,100 L120,70 L150,50" 
                  fill="none" stroke="#ffe600" strokeWidth="3"/>
            
            {/* COLOMBIA text */}
            <text x="150" y="380" textAnchor="middle" className="brutalist-text" fontSize="24" fill="#ffe600">
              COLOMBIA
            </text>
          </svg>
        </div>
        
        <div className="absolute bottom-20 left-0 right-0 scene-text text-center px-6">
          <h2 className="brutalist-text text-3xl md:text-5xl mb-6">
            "UNA JOYA BIODIVERSA<br/>EN PELIGRO"
          </h2>
          <div className="data-highlight mb-4">UNO DE LOS PAÍSES MÁS BIODIVERSOS DEL PLANETA</div>
          <p className="text-base md:text-lg max-w-2xl mx-auto">
            Pero con 1,200 especies en riesgo.
          </p>
        </div>
      </section>

      {/* Scene 3: AVE NATIVA 🕊️ */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative parallax-scene">
        <div className="relative z-10">
          <svg className="scene-svg w-[500px] h-[300px]" viewBox="0 0 500 300">
            {/* Bird silhouette */}
            {/* Left wing */}
            <path className="wing" d="M250,120 L150,100 L100,130 L120,150 L180,160 L220,140 Z" 
                  fill="none" stroke="#ffe600" strokeWidth="3" style={{transformOrigin: '180px 140px'}}/>
            
            {/* Right wing */}
            <path className="wing" d="M250,120 L350,100 L400,130 L380,150 L320,160 L280,140 Z" 
                  fill="none" stroke="#ffe600" strokeWidth="3" style={{transformOrigin: '320px 140px'}}/>
            
            {/* Body */}
            <ellipse cx="250" cy="160" rx="15" ry="35" fill="none" stroke="#ffe600" strokeWidth="3"/>
            
            {/* Head */}
            <circle cx="250" cy="110" r="12" fill="none" stroke="#ffe600" strokeWidth="3"/>
            
            {/* Beak */}
            <path d="M250,100 L265,95 L260,105" fill="none" stroke="#ffe600" strokeWidth="2"/>
            
            {/* Tail */}
            <path d="M250,195 L240,225 L250,245 L260,225 Z" fill="none" stroke="#ffe600" strokeWidth="2"/>
          </svg>
        </div>
        
        <div className="absolute bottom-20 left-0 right-0 scene-text text-center px-6">
          <h2 className="brutalist-text text-3xl md:text-5xl mb-6">
            "NO ES SÍMBOLO.<br/>ES VIDA."
          </h2>
          <div className="data-highlight mb-4">EL CÓNDOR ANDINO: 3 METROS DE ENVERGADURA</div>
          <p className="text-base md:text-lg max-w-2xl mx-auto">
            Solo quedan unos cientos.
          </p>
        </div>
      </section>

      {/* Scene 4: PERSONA 🧍 */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative parallax-scene">
        <div className="relative z-10">
          <svg className="scene-svg w-[300px] h-[400px]" viewBox="0 0 300 400">
            {/* Face wireframe */}
            <g transform="translate(150,200)">
              {/* Face outline */}
              <ellipse className="face-line" cx="0" cy="0" rx="60" ry="80" fill="none" stroke="#ffe600" strokeWidth="2"/>
              
              {/* Eyes */}
              <circle className="face-line" cx="-20" cy="-20" r="8" fill="none" stroke="#ffe600" strokeWidth="2"/>
              <circle className="face-line" cx="20" cy="-20" r="8" fill="none" stroke="#ffe600" strokeWidth="2"/>
              
              {/* Pupils */}
              <circle cx="-20" cy="-20" r="3" fill="#ffe600"/>
              <circle cx="20" cy="-20" r="3" fill="#ffe600"/>
              
              {/* Nose */}
              <line className="face-line" x1="0" y1="-5" x2="0" y2="15" stroke="#ffe600" strokeWidth="2"/>
              
              {/* Mouth */}
              <path className="face-line" d="M-15,25 Q0,35 15,25" fill="none" stroke="#ffe600" strokeWidth="2"/>
              
              {/* Geometric lines from center */}
              <line className="face-line" x1="0" y1="0" x2="-30" y2="-30" stroke="#ffe600" strokeWidth="1" opacity="0.6"/>
              <line className="face-line" x1="0" y1="0" x2="30" y2="-30" stroke="#ffe600" strokeWidth="1" opacity="0.6"/>
              <line className="face-line" x1="0" y1="0" x2="-40" y2="0" stroke="#ffe600" strokeWidth="1" opacity="0.6"/>
              <line className="face-line" x1="0" y1="0" x2="40" y2="0" stroke="#ffe600" strokeWidth="1" opacity="0.6"/>
              <line className="face-line" x1="0" y1="0" x2="0" y2="-50" stroke="#ffe600" strokeWidth="1" opacity="0.6"/>
              <line className="face-line" x1="0" y1="0" x2="0" y2="50" stroke="#ffe600" strokeWidth="1" opacity="0.6"/>
            </g>
          </svg>
        </div>
        
        <div className="absolute bottom-20 left-0 right-0 scene-text text-center px-6">
          <h2 className="brutalist-text text-3xl md:text-5xl mb-6">
            "EL VIAJE EMPIEZA<br/>EN LOS OJOS DEL OTRO"
          </h2>
          <div className="data-highlight mb-4">EL TURISMO SIN RESPETO COSIFICA</div>
          <p className="text-base md:text-lg max-w-2xl mx-auto">
            Cada cultura es una forma viva<br/>de ver el mundo.
          </p>
        </div>
      </section>

      {/* Scene 5: CORAZÓN ❤️ */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative parallax-scene">
        <div className="relative z-10">
          <svg className="scene-svg w-[300px] h-[300px]" viewBox="0 0 300 300">
            {/* Anatomical heart */}
            <path d="M150,80 C120,50 80,60 80,100 C80,140 150,200 150,200 C150,200 220,140 220,100 C220,60 180,50 150,80 Z" 
                  fill="none" stroke="#ffe600" strokeWidth="3"/>
            
            {/* Heart chambers */}
            <path d="M150,100 C130,85 110,95 110,115 C110,135 150,170 150,170" 
                  fill="none" stroke="#ffe600" strokeWidth="2" opacity="0.7"/>
            <path d="M150,100 C170,85 190,95 190,115 C190,135 150,170 150,170" 
                  fill="none" stroke="#ffe600" strokeWidth="2" opacity="0.7"/>
            
            {/* Arteries */}
            <line x1="150" y1="80" x2="150" y2="60" stroke="#ffe600" strokeWidth="2"/>
            <line x1="120" y1="90" x2="100" y2="80" stroke="#ffe600" strokeWidth="2"/>
            <line x1="180" y1="90" x2="200" y2="80" stroke="#ffe600" strokeWidth="2"/>
          </svg>
        </div>
        
        <div className="absolute bottom-20 left-0 right-0 scene-text text-center px-6">
          <h2 className="brutalist-text text-3xl md:text-5xl mb-6">
            "NO ES SOLO UN VIAJE.<br/>ES UNA RELACIÓN."
          </h2>
          <div className="data-highlight mb-4">TURISMO RESPONSABLE SIGNIFICA EMPATÍA</div>
          <p className="text-base md:text-lg max-w-2xl mx-auto">
            Significa dar tiempo,<br/>no solo dinero.
          </p>
        </div>
      </section>

      {/* Scene 6: ÁTOMO ⚛️ */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative parallax-scene">
        <div className="relative z-10">
          <svg className="scene-svg w-[400px] h-[400px]" viewBox="0 0 400 400">
            {/* Nucleus */}
            <circle cx="200" cy="200" r="8" fill="#ffe600"/>
            
            {/* Electron orbits */}
            <ellipse className="orbit" cx="200" cy="200" rx="80" ry="30" fill="none" stroke="#ffe600" strokeWidth="2" opacity="0.7"/>
            <ellipse className="orbit" cx="200" cy="200" rx="30" ry="80" fill="none" stroke="#ffe600" strokeWidth="2" opacity="0.7"/>
            <ellipse className="orbit" cx="200" cy="200" rx="60" ry="60" fill="none" stroke="#ffe600" strokeWidth="2" opacity="0.7"/>
            
            {/* Electrons */}
            <circle cx="280" cy="200" r="4" fill="#ffe600"/>
            <circle cx="200" cy="120" r="4" fill="#ffe600"/>
            <circle cx="260" cy="240" r="4" fill="#ffe600"/>
          </svg>
        </div>
        
        <div className="absolute bottom-20 left-0 right-0 scene-text text-center px-6">
          <h2 className="brutalist-text text-3xl md:text-5xl mb-6">
            "TODO IMPACTO EMPIEZA<br/>EN LO INVISIBLE"
          </h2>
          <div className="data-highlight mb-4">DESDE EL CARBONO HASTA EL ALMA</div>
          <p className="text-base md:text-lg max-w-2xl mx-auto">
            ¿Qué dejamos detrás<br/>cuando nos vamos?
          </p>
        </div>
      </section>

      {/* Scene 7: INTRO A LAS 50 HISTORIAS ✨ */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative parallax-scene">
        <div className="relative z-10">
          <svg className="scene-svg w-[400px] h-[300px]" viewBox="0 0 400 300">
            {/* Book/wave curves */}
            <path className="story-curve" d="M100,150 Q200,100 300,150" fill="none" stroke="#ffe600" strokeWidth="3" opacity="0.8"/>
            <path className="story-curve" d="M100,150 Q200,120 300,150" fill="none" stroke="#ffe600" strokeWidth="2" opacity="0.6"/>
            <path className="story-curve" d="M100,150 Q200,180 300,150" fill="none" stroke="#ffe600" strokeWidth="2" opacity="0.6"/>
            
            {/* Central binding */}
            <line x1="200" y1="120" x2="200" y2="180" stroke="#ffe600" strokeWidth="4"/>
            
            {/* Decorative dots */}
            <circle cx="150" cy="130" r="2" fill="#ffe600" opacity="0.7"/>
            <circle cx="250" cy="130" r="2" fill="#ffe600" opacity="0.7"/>
            <circle cx="150" cy="170" r="2" fill="#ffe600" opacity="0.7"/>
            <circle cx="250" cy="170" r="2" fill="#ffe600" opacity="0.7"/>
          </svg>
        </div>
        
        <div className="absolute bottom-20 left-0 right-0 scene-text text-center px-6">
          <h2 className="brutalist-text text-2xl md:text-4xl mb-8">
            "ESTAS SON 50 HISTORIAS<br/>DE OTRO TIPO DE TURISMO"
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
            Que no extrae, sino siembra.<br/>
            Que no consume, sino transforma.
          </p>
          <div className="data-highlight text-xl">
            DESCÚBRELAS.<br/>
            Y REESCRIBE EL VIAJE.
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;