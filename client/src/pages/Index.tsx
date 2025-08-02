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
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const globalScrollProgress = scrollY / documentHeight;
      
      // Advanced parallax effects for each scene
      const parallaxElements = document.querySelectorAll('.parallax-scene');
      parallaxElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementHeight = rect.height;
        
        const scrollProgress = (windowHeight - elementTop) / (windowHeight + elementHeight);
        const extendedProgress = Math.max(-1, Math.min(2, scrollProgress));
        
        const backgroundLayer = element.querySelector('.bg-layer');
        const midgroundLayer = element.querySelector('.mid-layer');
        const foregroundLayer = element.querySelector('.fg-layer');
        const svgElement = element.querySelector('.scene-svg');
        
        if (backgroundLayer) {
          const bgTransform = `translateY(${scrollY * 0.1}px) scale(${0.8 + extendedProgress * 0.4})`;
          (backgroundLayer as HTMLElement).style.transform = bgTransform;
          (backgroundLayer as HTMLElement).style.opacity = (0.1 + Math.abs(extendedProgress) * 0.2).toString();
        }
        
        if (midgroundLayer) {
          const midTransform = `translateY(${scrollY * 0.3}px) scale(${0.9 + extendedProgress * 0.3})`;
          (midgroundLayer as HTMLElement).style.transform = midTransform;
          (midgroundLayer as HTMLElement).style.opacity = (0.2 + Math.abs(extendedProgress) * 0.3).toString();
        }
        
        if (foregroundLayer) {
          const fgTransform = `translateY(${scrollY * 0.5}px) scale(${1 + extendedProgress * 0.2})`;
          (foregroundLayer as HTMLElement).style.transform = fgTransform;
          (foregroundLayer as HTMLElement).style.opacity = (0.4 + Math.abs(extendedProgress) * 0.6).toString();
        }
        
        if (svgElement) {
          const sceneEffects = [
            // 1. World: Continuous rotation
            () => `scale(${0.5 + scrollProgress * 2}) rotate(${globalScrollProgress * 360}deg)`,
            // 2. Colombia: Fragmentation effect
            () => `scale(${0.4 + scrollProgress * 2.2}) rotate(${scrollProgress * 90}deg) translateY(${-scrollProgress * 30}px)`,
            // 3. Bird: Flight motion
            () => `scale(${0.6 + scrollProgress * 1.8}) translateY(${Math.sin(globalScrollProgress * 8) * 30}px) rotate(${Math.sin(globalScrollProgress * 4) * 10}deg)`,
            // 4. Person: Emergence
            () => `scale(${0.3 + scrollProgress * 2.4}) translateY(${(1-scrollProgress) * 80}px)`,
            // 5. Heart: Heartbeat pulse
            () => `scale(${0.5 + scrollProgress * 2 + Math.sin(globalScrollProgress * 15) * 0.15}) rotate(${scrollProgress * 30}deg)`,
            // 6. Atom: Orbital motion
            () => `scale(${0.4 + scrollProgress * 2.3}) rotate(${globalScrollProgress * 720}deg) translateX(${Math.cos(globalScrollProgress * 6) * 20}px)`,
            // 7. Stories: Network convergence
            () => `scale(${0.3 + scrollProgress * 2.5}) rotate(${globalScrollProgress * 180}deg)`
          ];
          
          const transform = sceneEffects[index] ? sceneEffects[index]() : `scale(${0.5 + scrollProgress * 1.5})`;
          (svgElement as HTMLElement).style.transform = transform;
          
          const opacityFactor = Math.max(0.1, Math.min(1, 
            scrollProgress < 0.1 ? scrollProgress * 10 :
            scrollProgress > 0.9 ? (1 - scrollProgress) * 10 : 1
          ));
          (svgElement as HTMLElement).style.opacity = opacityFactor.toString();
        }
      });

      // Text animation based on scroll
      const textElements = document.querySelectorAll('.scroll-text');
      textElements.forEach((text, index) => {
        const rect = text.getBoundingClientRect();
        const textProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight));
        
        if (textProgress > 0.1) {
          const translateX = (1 - textProgress) * (index % 2 === 0 ? -100 : 100);
          const scale = 0.8 + textProgress * 0.2;
          (text as HTMLElement).style.transform = `translateX(${translateX}px) scale(${scale})`;
          (text as HTMLElement).style.opacity = textProgress.toString();
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
        .parallax-scene {
          will-change: transform, opacity, filter;
          position: relative;
          overflow: hidden;
        }
        
        .scene-svg {
          will-change: transform, opacity;
          transform-origin: center;
        }
        
        .bg-layer, .mid-layer, .fg-layer {
          will-change: transform, opacity;
          position: absolute;
          inset: 0;
        }
        
        .bg-layer { z-index: 1; }
        .mid-layer { z-index: 2; }
        .fg-layer { z-index: 3; }
        
        .scroll-text {
          will-change: transform, opacity;
          opacity: 0;
        }
        
        .brutalist-text {
          font-family: 'Courier New', monospace;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
          line-height: 1.1;
        }
        
        .data-highlight {
          background: #ffe600;
          color: #0f2f22;
          padding: 8px 16px;
          transform: rotate(-1deg);
          display: inline-block;
          margin: 8px;
        }
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        .heartbeat { animation: heartbeat 2s ease-in-out infinite; }
        
        @keyframes orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .orbit { animation: orbit 8s linear infinite; }
      `}</style>

      {/* Scene 1: EL MUNDO 🌍 */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative parallax-scene">
        {/* Background cosmic dust */}
        <div className="bg-layer">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#ffe600] rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        
        {/* Midground orbital rings */}
        <div className="mid-layer flex items-center justify-center">
          <div className="absolute w-[600px] h-[600px] border border-[#ffe600] rounded-full opacity-10 orbit"></div>
          <div className="absolute w-[400px] h-[400px] border border-[#ffe600] rounded-full opacity-15" style={{animation: 'orbit 12s linear infinite reverse'}}></div>
        </div>
        
        {/* Foreground Earth */}
        <div className="fg-layer flex items-center justify-center">
          <div className="relative">
            <svg className="scene-svg w-96 h-96" viewBox="0 0 400 400">
              {/* Earth outline */}
              <circle cx="200" cy="200" r="150" fill="none" stroke="#ffe600" strokeWidth="3"/>
              
              {/* Continents as simple shapes */}
              <path d="M120,140 L160,120 L180,160 L140,180 Z" fill="none" stroke="#ffe600" strokeWidth="2"/>
              <path d="M160,220 L200,200 L220,240 L180,260 Z" fill="none" stroke="#ffe600" strokeWidth="2"/>
              <path d="M240,160 L280,140 L300,180 L260,200 Z" fill="none" stroke="#ffe600" strokeWidth="2"/>
              
              {/* Pollution clouds */}
              <ellipse cx="180" cy="120" rx="30" ry="15" fill="none" stroke="#ffe600" strokeWidth="1" opacity="0.6">
                <animate attributeName="rx" values="30;40;30" dur="4s" repeatCount="indefinite"/>
              </ellipse>
              <ellipse cx="250" cy="280" rx="25" ry="12" fill="none" stroke="#ffe600" strokeWidth="1" opacity="0.6">
                <animate attributeName="rx" values="25;35;25" dur="3s" repeatCount="indefinite"/>
              </ellipse>
            </svg>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center scroll-text max-w-lg px-6">
                <h1 className="brutalist-text text-3xl md:text-5xl mb-8">
                  EL TURISMO DEVORA<br/>
                  LO QUE VINO A VER
                </h1>
                
                <div className="space-y-4 text-sm md:text-base">
                  <p className="data-highlight">
                    80% DE ECOSISTEMAS VISITADOS<br/>
                    YA PRESENTAN ESTRÉS ECOLÓGICO
                  </p>
                  <p>
                    Las emisiones de turismo internacional<br/>
                    podrían alcanzar <strong>2.5–3.5 Gt CO₂/año para 2030</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scene 2: COLOMBIA 🗺️ */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative parallax-scene">
        {/* Background geographic patterns */}
        <div className="bg-layer">
          <svg className="w-full h-full" viewBox="0 0 800 600">
            <path d="M100,100 L300,120 L500,300 L300,500 L100,450 Z" fill="none" stroke="#ffe600" strokeWidth="1" opacity="0.1"/>
          </svg>
        </div>
        
        {/* Midground fragmentation lines */}
        <div className="mid-layer">
          <svg className="w-full h-full" viewBox="0 0 800 600">
            {[...Array(8)].map((_, i) => (
              <line
                key={i}
                x1={i * 100}
                y1="0"
                x2={i * 100 + 200}
                y2="600"
                stroke="#ffe600"
                strokeWidth="1"
                opacity="0.2"
              >
                <animate
                  attributeName="opacity"
                  values="0.2;0.6;0.2"
                  dur={`${3 + i}s`}
                  repeatCount="indefinite"
                />
              </line>
            ))}
          </svg>
        </div>
        
        {/* Foreground Colombia map */}
        <div className="fg-layer flex items-center justify-center">
          <div className="relative">
            <svg className="scene-svg w-[400px] h-[500px]" viewBox="0 0 300 400">
              {/* Colombia outline - fragmented */}
              <path d="M150,50 L200,40 L240,60 L270,100 L280,140 L275,180" 
                    fill="none" stroke="#ffe600" strokeWidth="4"/>
              <path d="M275,180 L270,220 L260,260 L240,300" 
                    fill="none" stroke="#ffe600" strokeWidth="4">
                <animate attributeName="stroke-dasharray" values="0,20;20,0;0,20" dur="4s" repeatCount="indefinite"/>
              </path>
              <path d="M240,300 L200,320 L150,330 L100,320 L60,300" 
                    fill="none" stroke="#ffe600" strokeWidth="4"/>
              <path d="M60,300 L40,260 L30,220 L35,180 L50,140" 
                    fill="none" stroke="#ffe600" strokeWidth="4"/>
              <path d="M50,140 L80,100 L120,70 L150,50" 
                    fill="none" stroke="#ffe600" strokeWidth="4"/>
              
              {/* Biodiversity hotspots */}
              <circle cx="100" cy="150" r="3" fill="#ffe600">
                <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="180" cy="200" r="3" fill="#ffe600">
                <animate attributeName="r" values="3;6;3" dur="2.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="220" cy="120" r="3" fill="#ffe600">
                <animate attributeName="r" values="3;6;3" dur="3s" repeatCount="indefinite"/>
              </circle>
            </svg>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center scroll-text max-w-lg px-6">
                <h2 className="brutalist-text text-3xl md:text-5xl mb-8">
                  UNA JOYA BIODIVERSA<br/>
                  EN PELIGRO
                </h2>
                
                <div className="space-y-4 text-sm md:text-base">
                  <p className="data-highlight">
                    PAÍS MÁS BIODIVERSO<br/>
                    POR KM² DEL PLANETA
                  </p>
                  <p className="data-highlight">
                    +1.900 ESPECIES ENDÉMICAS
                  </p>
                  <p>
                    Sin embargo, pierde <strong>230.000 hectáreas</strong><br/>
                    de bosque al año (IDEAM, 2023)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scene 3: AVE NATIVA 🕊️ */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative parallax-scene">
        {/* Background wind currents */}
        <div className="bg-layer">
          <svg className="w-full h-full" viewBox="0 0 800 600">
            {[...Array(6)].map((_, i) => (
              <path
                key={i}
                d={`M0,${100 + i * 80} Q400,${80 + i * 80} 800,${100 + i * 80}`}
                fill="none"
                stroke="#ffe600"
                strokeWidth="1"
                opacity="0.1"
              >
                <animate
                  attributeName="d"
                  values={`M0,${100 + i * 80} Q400,${80 + i * 80} 800,${100 + i * 80};M0,${120 + i * 80} Q400,${60 + i * 80} 800,${120 + i * 80};M0,${100 + i * 80} Q400,${80 + i * 80} 800,${100 + i * 80}`}
                  dur={`${8 + i * 2}s`}
                  repeatCount="indefinite"
                />
              </path>
            ))}
          </svg>
        </div>
        
        {/* Foreground bird */}
        <div className="fg-layer flex items-center justify-center">
          <div className="relative">
            <svg className="scene-svg w-[500px] h-[300px]" viewBox="0 0 500 300">
              {/* Condor/Guacamaya outline */}
              {/* Left wing */}
              <path d="M250,120 L150,100 L100,130 L120,150 L180,160 L220,140 Z" 
                    fill="none" stroke="#ffe600" strokeWidth="3"/>
              
              {/* Right wing */}
              <path d="M250,120 L350,100 L400,130 L380,150 L320,160 L280,140 Z" 
                    fill="none" stroke="#ffe600" strokeWidth="3"/>
              
              {/* Body */}
              <ellipse cx="250" cy="160" rx="20" ry="40" fill="none" stroke="#ffe600" strokeWidth="3"/>
              
              {/* Head */}
              <circle cx="250" cy="110" r="15" fill="none" stroke="#ffe600" strokeWidth="3"/>
              
              {/* Eye */}
              <circle cx="245" cy="105" r="2" fill="#ffe600"/>
              
              {/* Beak */}
              <path d="M250,100 L265,95 L260,105" fill="none" stroke="#ffe600" strokeWidth="2"/>
              
              {/* Tail */}
              <path d="M250,200 L240,230 L250,250 L260,230 Z" fill="none" stroke="#ffe600" strokeWidth="2"/>
              
              {/* Wing details */}
              <line x1="170" y1="120" x2="150" y2="140" stroke="#ffe600" strokeWidth="1"/>
              <line x1="190" y1="125" x2="170" y2="145" stroke="#ffe600" strokeWidth="1"/>
              <line x1="330" y1="120" x2="350" y2="140" stroke="#ffe600" strokeWidth="1"/>
              <line x1="310" y1="125" x2="330" y2="145" stroke="#ffe600" strokeWidth="1"/>
            </svg>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center scroll-text max-w-lg px-6">
                <h2 className="brutalist-text text-3xl md:text-5xl mb-8">
                  NO ES SÍMBOLO.<br/>
                  ES VIDA.
                </h2>
                
                <div className="space-y-4 text-sm md:text-base">
                  <p className="data-highlight">
                    CÓNDOR ANDINO:<br/>
                    ESPECIE VULNERABLE
                  </p>
                  <p>
                    Colombia alberga más del <strong>20%</strong><br/>
                    de todas las especies de aves del mundo
                  </p>
                  <p>
                    El ecoturismo mal gestionado ha reducido<br/>
                    poblaciones en santuarios naturales
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scene 4: PERSONA 🧍 */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative parallax-scene">
        {/* Background consciousness waves */}
        <div className="bg-layer">
          <svg className="w-full h-full" viewBox="0 0 800 600">
            {[...Array(5)].map((_, i) => (
              <circle
                key={i}
                cx="400"
                cy="300"
                r={50 + i * 60}
                fill="none"
                stroke="#ffe600"
                strokeWidth="1"
                opacity="0.1"
              >
                <animate
                  attributeName="r"
                  values={`${50 + i * 60};${100 + i * 60};${50 + i * 60}`}
                  dur={`${4 + i}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </svg>
        </div>
        
        {/* Foreground human */}
        <div className="fg-layer flex items-center justify-center">
          <div className="relative">
            <svg className="scene-svg w-[300px] h-[400px]" viewBox="0 0 300 400">
              {/* Human outline emerging from center */}
              <g transform="translate(150,200)">
                {/* Head */}
                <circle cx="0" cy="-80" r="25" fill="none" stroke="#ffe600" strokeWidth="3"/>
                
                {/* Eyes */}
                <circle cx="-8" cy="-85" r="3" fill="#ffe600"/>
                <circle cx="8" cy="-85" r="3" fill="#ffe600"/>
                
                {/* Body */}
                <line x1="0" y1="-55" x2="0" y2="50" stroke="#ffe600" strokeWidth="3"/>
                
                {/* Arms */}
                <line x1="0" y1="-20" x2="-40" y2="10" stroke="#ffe600" strokeWidth="2"/>
                <line x1="0" y1="-20" x2="40" y2="10" stroke="#ffe600" strokeWidth="2"/>
                
                {/* Legs */}
                <line x1="0" y1="50" x2="-30" y2="100" stroke="#ffe600" strokeWidth="2"/>
                <line x1="0" y1="50" x2="30" y2="100" stroke="#ffe600" strokeWidth="2"/>
                
                {/* Radiating lines from center */}
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30) * Math.PI / 180;
                  const x2 = Math.cos(angle) * 60;
                  const y2 = Math.sin(angle) * 60;
                  return (
                    <line
                      key={i}
                      x1="0"
                      y1="-20"
                      x2={x2}
                      y2={y2 - 20}
                      stroke="#ffe600"
                      strokeWidth="1"
                      opacity="0.4"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.4;0.8;0.4"
                        dur={`${2 + i * 0.1}s`}
                        repeatCount="indefinite"
                      />
                    </line>
                  );
                })}
              </g>
            </svg>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center scroll-text max-w-lg px-6">
                <h2 className="brutalist-text text-3xl md:text-5xl mb-8">
                  EL VIAJE EMPIEZA<br/>
                  DENTRO
                </h2>
                
                <div className="space-y-4 text-sm md:text-base">
                  <p>
                    El turismo regenerativo no solo observa:<br/>
                    <strong>transforma al viajero</strong>
                  </p>
                  <p className="data-highlight">
                    EXPERIENCIAS INMERSIVAS<br/>
                    REDUCEN CORTISOL 34%
                  </p>
                  <p>
                    60% de turistas responsables reporta<br/>
                    cambios de comportamiento a largo plazo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scene 5: CORAZÓN ❤️ */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative parallax-scene">
        {/* Background pulse waves */}
        <div className="bg-layer">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute border border-[#ffe600] opacity-10"
              style={{
                left: '50%',
                top: '50%',
                width: `${(i + 1) * 80}px`,
                height: `${(i + 1) * 80}px`,
                marginLeft: `${-(i + 1) * 40}px`,
                marginTop: `${-(i + 1) * 40}px`,
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                animation: `heartbeat ${2 + i * 0.3}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
        
        {/* Foreground heart */}
        <div className="fg-layer flex items-center justify-center">
          <div className="relative">
            <svg className="scene-svg w-[300px] h-[300px] heartbeat" viewBox="0 0 300 300">
              {/* Anatomical heart outline */}
              <path d="M150,80 C120,50 80,60 80,100 C80,140 150,200 150,200 C150,200 220,140 220,100 C220,60 180,50 150,80 Z" 
                    fill="none" stroke="#ffe600" strokeWidth="4"/>
              
              {/* Heart chambers */}
              <path d="M150,100 C130,85 110,95 110,115 C110,135 150,170 150,170" 
                    fill="none" stroke="#ffe600" strokeWidth="2" opacity="0.7"/>
              <path d="M150,100 C170,85 190,95 190,115 C190,135 150,170 150,170" 
                    fill="none" stroke="#ffe600" strokeWidth="2" opacity="0.7"/>
              
              {/* Pulse lines */}
              <line x1="50" y1="150" x2="100" y2="150" stroke="#ffe600" strokeWidth="2" opacity="0.8">
                <animate attributeName="x2" values="100;120;100" dur="1s" repeatCount="indefinite"/>
              </line>
              <line x1="200" y1="150" x2="250" y2="150" stroke="#ffe600" strokeWidth="2" opacity="0.8">
                <animate attributeName="x1" values="200;180;200" dur="1s" repeatCount="indefinite"/>
              </line>
            </svg>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center scroll-text max-w-lg px-6">
                <h2 className="brutalist-text text-3xl md:text-5xl mb-8">
                  SOLO LO QUE SE CUIDA,<br/>
                  PERMANECE
                </h2>
                
                <div className="space-y-4 text-sm md:text-base">
                  <p className="data-highlight">
                    1 DE CADA 4 DESTINOS NATURALES<br/>
                    EN RIESGO POR FALTA DE PROTECCIÓN
                  </p>
                  <p>
                    El turismo comunitario genera hasta<br/>
                    <strong>3 veces más impacto positivo local</strong>
                  </p>
                  <p className="italic">
                    ¿Qué late en ti cuando recorres<br/>
                    una tierra ajena?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scene 6: ÁTOMO ⚛️ */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative parallax-scene">
        {/* Background quantum field */}
        <div className="bg-layer">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#ffe600] rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `orbit ${4 + Math.random() * 6}s linear infinite`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        {/* Foreground atom */}
        <div className="fg-layer flex items-center justify-center">
          <div className="relative">
            <svg className="scene-svg w-[400px] h-[400px]" viewBox="0 0 400 400">
              {/* Nucleus */}
              <circle cx="200" cy="200" r="8" fill="#ffe600"/>
              
              {/* Electron orbits */}
              <ellipse cx="200" cy="200" rx="80" ry="30" fill="none" stroke="#ffe600" strokeWidth="2" opacity="0.7" className="orbit"/>
              <ellipse cx="200" cy="200" rx="30" ry="80" fill="none" stroke="#ffe600" strokeWidth="2" opacity="0.7" style={{animation: 'orbit 6s linear infinite reverse'}}/>
              <circle cx="200" cy="200" r="60" fill="none" stroke="#ffe600" strokeWidth="2" opacity="0.7" style={{animation: 'orbit 10s linear infinite'}}/>
              
              {/* Electrons */}
              <circle cx="280" cy="200" r="4" fill="#ffe600" className="orbit">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="0 200 200;360 200 200"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="200" cy="120" r="4" fill="#ffe600">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="0 200 200;-360 200 200"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="260" cy="200" r="4" fill="#ffe600">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="0 200 200;360 200 200"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </circle>
              
              {/* Connection lines */}
              {[...Array(8)].map((_, i) => {
                const angle = (i * 45) * Math.PI / 180;
                const x2 = 200 + Math.cos(angle) * 120;
                const y2 = 200 + Math.sin(angle) * 120;
                return (
                  <line
                    key={i}
                    x1="200"
                    y1="200"
                    x2={x2}
                    y2={y2}
                    stroke="#ffe600"
                    strokeWidth="1"
                    opacity="0.3"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.3;0.7;0.3"
                      dur={`${3 + i * 0.2}s`}
                      repeatCount="indefinite"
                    />
                  </line>
                );
              })}
            </svg>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center scroll-text max-w-lg px-6">
                <h2 className="brutalist-text text-3xl md:text-5xl mb-8">
                  TODO ESTÁ CONECTADO.<br/>
                  TAMBIÉN TÚ.
                </h2>
                
                <div className="space-y-4 text-sm md:text-base">
                  <p>
                    Desde el CO₂ emitido por un vuelo<br/>
                    hasta el colibrí que desaparece.
                  </p>
                  <p className="data-highlight">
                    TURISMO: 8% DE EMISIONES<br/>
                    GLOBALES DE CO₂
                  </p>
                  <p>
                    Cada decisión afecta<br/>
                    <strong>la red completa</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scene 7: HISTORIAS NO CONTADAS 🌀 */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative parallax-scene">
        {/* Background network pattern */}
        <div className="bg-layer">
          <svg className="w-full h-full" viewBox="0 0 800 600">
            {/* Network nodes */}
            {[...Array(15)].map((_, i) => {
              const x = 100 + (i % 5) * 150;
              const y = 100 + Math.floor(i / 5) * 150;
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r="3" fill="#ffe600" opacity="0.3"/>
                  {i < 14 && (
                    <line
                      x1={x}
                      y1={y}
                      x2={100 + ((i + 1) % 5) * 150}
                      y2={100 + Math.floor((i + 1) / 5) * 150}
                      stroke="#ffe600"
                      strokeWidth="1"
                      opacity="0.2"
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>
        
        {/* Foreground convergence */}
        <div className="fg-layer flex items-center justify-center">
          <div className="relative">
            <svg className="scene-svg w-[400px] h-[400px]" viewBox="0 0 400 400">
              {/* Central convergence point */}
              <circle cx="200" cy="200" r="20" fill="none" stroke="#ffe600" strokeWidth="4"/>
              
              {/* Stories radiating outward */}
              {[...Array(50)].map((_, i) => {
                const angle = (i * 7.2) * Math.PI / 180; // 360/50 = 7.2 degrees
                const radius = 80 + (i % 3) * 40;
                const x = 200 + Math.cos(angle) * radius;
                const y = 200 + Math.sin(angle) * radius;
                
                return (
                  <g key={i}>
                    <circle cx={x} cy={y} r="2" fill="#ffe600" opacity="0.6">
                      <animate
                        attributeName="r"
                        values="2;4;2"
                        dur={`${2 + (i % 5)}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                    <line
                      x1="200"
                      y1="200"
                      x2={x}
                      y2={y}
                      stroke="#ffe600"
                      strokeWidth="1"
                      opacity="0.3"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.3;0.7;0.3"
                        dur={`${3 + (i % 4)}s`}
                        repeatCount="indefinite"
                      />
                    </line>
                  </g>
                );
              })}
              
              {/* Spiral pattern */}
              <path d="M200,200 Q220,180 240,200 Q220,220 200,200 Q180,180 160,200 Q180,220 200,200" 
                    fill="none" stroke="#ffe600" strokeWidth="2" opacity="0.8">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="0 200 200;360 200 200"
                  dur="20s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center scroll-text max-w-lg px-6">
                <h2 className="brutalist-text text-4xl md:text-6xl mb-8">
                  50 HISTORIAS<br/>
                  AÚN NO CONTADAS
                </h2>
                
                <div className="space-y-6 text-sm md:text-base">
                  <p>
                    Relatos reales de comunidades que reinventan<br/>
                    el turismo desde la <strong>dignidad</strong><br/>
                    y la <strong>sostenibilidad</strong>
                  </p>
                  <p>
                    Desde la Amazonía<br/>
                    hasta la Sierra Nevada
                  </p>
                  <div className="data-highlight text-xl">
                    MUY PRONTO:<br/>
                    EXPLORA LAS HISTORIAS
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;