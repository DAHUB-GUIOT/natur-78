import React, { useEffect, useRef } from "react";
import { HeaderButtons } from "@/components/layout/HeaderButtons";
import { Globe, Map, Bird, User, Heart, Atom, BookOpen, Cloud, Mountain, Trees, Waves } from "lucide-react";

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

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-float-slow {
          animation: float-slow 5s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
      `}</style>

      {/* Scene 1: EL MUNDO 🌍 */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative parallax-scene">
        <div className="relative z-10">
          <div className="scene-svg relative w-[400px] h-[400px] flex items-center justify-center">
            <div className="planet relative">
              <Globe size={240} color="#ffe600" strokeWidth={2} className="animate-spin-slow" />
              
              {/* Overlay pollution indicators */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute top-8 left-16">
                  <Cloud size={32} color="#ffe600" className="opacity-60 animate-pulse" />
                </div>
                <div className="absolute bottom-12 right-20">
                  <Cloud size={24} color="#ffe600" className="opacity-40 animate-bounce" />
                </div>
                <div className="absolute top-16 right-12">
                  <Waves size={20} color="#ffe600" className="opacity-50" />
                </div>
              </div>
            </div>
            
            <div className="clouds absolute inset-0">
              {/* Floating cloud elements */}
              <div className="absolute top-20 left-8 animate-float">
                <Cloud size={28} color="#ffe600" className="opacity-30" />
              </div>
              <div className="absolute bottom-16 left-12 animate-float-delayed">
                <Cloud size={20} color="#ffe600" className="opacity-25" />
              </div>
              <div className="absolute top-32 right-8 animate-float-slow">
                <Cloud size={24} color="#ffe600" className="opacity-35" />
              </div>
            </div>
          </div>
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
          <div className="scene-svg relative w-[350px] h-[450px] flex items-center justify-center">
            <div className="relative">
              <Map size={280} color="#ffe600" strokeWidth={2.5} className="animate-pulse" />
              
              {/* Biodiversity indicators around the map */}
              <div className="absolute inset-0">
                <div className="map-fragment absolute top-8 left-12 animate-bounce-slow">
                  <Trees size={24} color="#ffe600" className="opacity-70" />
                </div>
                <div className="map-fragment absolute top-16 right-8 animate-float">
                  <Mountain size={20} color="#ffe600" className="opacity-60" />
                </div>
                <div className="map-fragment absolute bottom-20 left-8 animate-pulse">
                  <Waves size={18} color="#ffe600" className="opacity-50" />
                </div>
                <div className="map-fragment absolute bottom-12 right-12 animate-float-delayed">
                  <Trees size={16} color="#ffe600" className="opacity-65" />
                </div>
                <div className="map-fragment absolute top-1/2 left-4 animate-bounce">
                  <Mountain size={22} color="#ffe600" className="opacity-55" />
                </div>
                <div className="map-fragment absolute top-1/3 right-4 animate-float-slow">
                  <Trees size={20} color="#ffe600" className="opacity-60" />
                </div>
              </div>
              
              {/* COLOMBIA text overlay */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <h3 className="brutalist-text text-2xl text-[#ffe600]">COLOMBIA</h3>
              </div>
            </div>
          </div>
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
          <div className="scene-svg relative w-[500px] h-[300px] flex items-center justify-center">
            <div className="relative">
              <Bird size={200} color="#ffe600" strokeWidth={2} className="wing animate-pulse" />
              
              {/* Flying motion trail */}
              <div className="absolute -top-4 -left-8 animate-float">
                <div className="w-2 h-2 bg-[#ffe600] rounded-full opacity-30"></div>
              </div>
              <div className="absolute -top-8 -left-16 animate-float-delayed">
                <div className="w-1 h-1 bg-[#ffe600] rounded-full opacity-20"></div>
              </div>
              <div className="absolute -top-12 -left-24 animate-float-slow">
                <div className="w-1 h-1 bg-[#ffe600] rounded-full opacity-15"></div>
              </div>
              
              {/* Wind currents */}
              <div className="absolute top-8 right-12 animate-pulse">
                <Waves size={16} color="#ffe600" className="opacity-30 rotate-45" />
              </div>
              <div className="absolute bottom-8 left-12 animate-float">
                <Waves size={12} color="#ffe600" className="opacity-25 rotate-12" />
              </div>
            </div>
          </div>
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
          <div className="scene-svg relative w-[300px] h-[400px] flex items-center justify-center">
            <div className="relative">
              <User size={180} color="#ffe600" strokeWidth={2} className="face-line animate-pulse" />
              
              {/* Geometric connection lines emanating from center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="face-line absolute w-16 h-px bg-[#ffe600] opacity-40 rotate-45 animate-pulse"></div>
                <div className="face-line absolute w-16 h-px bg-[#ffe600] opacity-40 -rotate-45 animate-pulse"></div>
                <div className="face-line absolute w-px h-16 bg-[#ffe600] opacity-40 animate-pulse"></div>
                <div className="face-line absolute w-16 h-px bg-[#ffe600] opacity-40 animate-pulse"></div>
                <div className="face-line absolute w-20 h-px bg-[#ffe600] opacity-30 rotate-12 animate-float"></div>
                <div className="face-line absolute w-20 h-px bg-[#ffe600] opacity-30 -rotate-12 animate-float-delayed"></div>
              </div>
              
              {/* Cultural symbols around the person */}
              <div className="absolute -top-4 -left-8 animate-float">
                <div className="w-2 h-2 border border-[#ffe600] rounded-full opacity-50"></div>
              </div>
              <div className="absolute -top-8 right-4 animate-float-delayed">
                <div className="w-1 h-1 bg-[#ffe600] rounded-full opacity-40"></div>
              </div>
            </div>
          </div>
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
          <div className="scene-svg relative w-[300px] h-[300px] flex items-center justify-center">
            <div className="relative">
              <Heart size={160} color="#ffe600" strokeWidth={3} className="animate-pulse" style={{animationDuration: '2s'}} />
              
              {/* Heartbeat lines */}
              <div className="absolute -left-20 top-1/2 animate-pulse">
                <div className="w-16 h-px bg-[#ffe600] opacity-60"></div>
              </div>
              <div className="absolute -right-20 top-1/2 animate-pulse">
                <div className="w-16 h-px bg-[#ffe600] opacity-60"></div>
              </div>
              
              {/* Pulse rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-40 h-40 border border-[#ffe600] rounded-full opacity-20 animate-ping"></div>
                <div className="absolute w-52 h-52 border border-[#ffe600] rounded-full opacity-15 animate-ping" style={{animationDelay: '0.5s'}}></div>
              </div>
            </div>
          </div>
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
          <div className="scene-svg relative w-[400px] h-[400px] flex items-center justify-center">
            <div className="relative">
              <Atom size={200} color="#ffe600" strokeWidth={2} className="orbit animate-spin" style={{animationDuration: '8s'}} />
              
              {/* Orbital electrons */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-32 h-32 border border-[#ffe600] rounded-full opacity-40 orbit animate-spin" style={{animationDuration: '4s'}}></div>
                <div className="absolute w-24 h-24 border border-[#ffe600] rounded-full opacity-50 orbit animate-spin" style={{animationDuration: '6s', animationDirection: 'reverse'}}></div>
                
                {/* Electron dots */}
                <div className="absolute top-12 w-2 h-2 bg-[#ffe600] rounded-full animate-spin" style={{animationDuration: '3s'}}></div>
                <div className="absolute bottom-12 w-2 h-2 bg-[#ffe600] rounded-full animate-spin" style={{animationDuration: '5s'}}></div>
                <div className="absolute left-12 w-2 h-2 bg-[#ffe600] rounded-full animate-spin" style={{animationDuration: '4s'}}></div>
              </div>
            </div>
          </div>
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
          <div className="scene-svg relative w-[400px] h-[300px] flex items-center justify-center">
            <div className="relative">
              <BookOpen size={180} color="#ffe600" strokeWidth={2.5} className="story-curve animate-pulse" />
              
              {/* Story particles emanating */}
              <div className="absolute inset-0">
                <div className="story-curve absolute top-8 left-12 animate-float">
                  <div className="w-1 h-1 bg-[#ffe600] rounded-full opacity-60"></div>
                </div>
                <div className="story-curve absolute top-16 right-8 animate-float-delayed">
                  <div className="w-1 h-1 bg-[#ffe600] rounded-full opacity-50"></div>
                </div>
                <div className="story-curve absolute bottom-12 left-8 animate-float-slow">
                  <div className="w-1 h-1 bg-[#ffe600] rounded-full opacity-70"></div>
                </div>
                <div className="story-curve absolute bottom-16 right-12 animate-float">
                  <div className="w-1 h-1 bg-[#ffe600] rounded-full opacity-45"></div>
                </div>
                <div className="story-curve absolute top-1/3 left-4 animate-pulse">
                  <div className="w-1 h-1 bg-[#ffe600] rounded-full opacity-55"></div>
                </div>
                <div className="story-curve absolute bottom-1/3 right-4 animate-float-delayed">
                  <div className="w-1 h-1 bg-[#ffe600] rounded-full opacity-65"></div>
                </div>
              </div>
            </div>
          </div>
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