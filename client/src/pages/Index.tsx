import React, { useEffect, useRef } from "react";
import { HeaderButtons } from "@/components/layout/HeaderButtons";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const Index = () => {
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Parallax effects for background elements
      const parallaxElements = document.querySelectorAll('.parallax');
      parallaxElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.1);
        const yPos = -(scrollY * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });

      // Scroll reveal animations
      sectionsRef.current.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          
          if (isVisible) {
            section.classList.add('animate-in');
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f2f22] text-[#ffe600] overflow-x-hidden">
      <HeaderButtons showPortalButtons={true} />
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInRight {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-in {
          animation: fadeInUp 1s ease-out forwards;
        }
        
        .slide-left {
          animation: slideInLeft 1s ease-out forwards;
        }
        
        .slide-right {
          animation: slideInRight 1s ease-out forwards;
        }
        
        .brutalist-text {
          font-family: 'Arial Black', Arial, sans-serif;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          line-height: 0.9;
        }
        
        .grain-overlay {
          background-image: 
            radial-gradient(circle at 20% 50%, rgba(255, 230, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 230, 0, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(255, 230, 0, 0.08) 0%, transparent 50%);
          position: relative;
        }
        
        .noise-texture::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(255, 230, 0, 0.03) 2px,
              rgba(255, 230, 0, 0.03) 4px
            );
          pointer-events: none;
        }
      `}</style>

      {/* Section 1: El Problema Global */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative grain-overlay noise-texture">
        <div className="parallax absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 800 600">
            <circle cx="400" cy="300" r="150" fill="none" stroke="#ffe600" strokeWidth="2" opacity="0.3">
              <animateTransform 
                attributeName="transform" 
                type="rotate" 
                values="0 400 300;360 400 300" 
                dur="20s" 
                repeatCount="indefinite"
              />
            </circle>
            <path d="M300,200 L500,200 L400,400 Z" fill="#ffe600" opacity="0.1">
              <animateTransform 
                attributeName="transform" 
                type="rotate" 
                values="0 400 300;-360 400 300" 
                dur="30s" 
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
        
        <div className="text-center px-6 z-10 max-w-4xl">
          <h1 className="brutalist-text text-4xl md:text-7xl mb-8 tracking-tight">
            EL TURISMO MASIVO ESTÁ<br/>
            <span className="text-red-500">DESTRUYENDO</span><br/>
            LO QUE VINO A ADMIRAR
          </h1>
          
          <svg className="w-32 h-32 mx-auto animate-pulse" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#ffe600" strokeWidth="2"/>
            <path d="M30,30 L70,70 M70,30 L30,70" stroke="#ff0000" strokeWidth="3"/>
            <animateTransform 
              attributeName="transform" 
              type="rotate" 
              values="0 50 50;360 50 50" 
              dur="5s" 
              repeatCount="indefinite"
            />
          </svg>
        </div>
      </section>

      {/* Section 2: Colombia Biodiversa */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative grain-overlay">
        <div className="parallax absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 800 600">
            <path 
              d="M200,150 C250,100 350,120 400,180 C450,120 550,140 600,200 C580,280 520,350 450,400 C400,450 350,440 300,400 C250,380 180,300 200,150 Z" 
              fill="#ffe600" 
              opacity="0.1"
            >
              <animate attributeName="opacity" values="0.1;0.3;0.1" dur="4s" repeatCount="indefinite"/>
            </path>
          </svg>
        </div>
        
        <div className="text-center px-6 z-10 max-w-4xl">
          <h2 className="brutalist-text text-3xl md:text-6xl mb-8">
            UNA JOYA BIOLÓGICA<br/>
            AL BORDE DEL <span className="text-red-500">ABISMO</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 text-2xl font-bold">
            <div className="bg-[#ffe600] text-[#0f2f22] p-6 transform -rotate-2">
              <div className="text-4xl">+10%</div>
              <div>ESPECIES DEL MUNDO</div>
            </div>
            <div className="bg-red-500 text-white p-6 transform rotate-2">
              <div className="text-4xl">2º</div>
              <div>PAÍS MÁS BIODIVERSO</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: ¿Qué es Turismo Sostenible? */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative grain-overlay">
        <div className="text-center px-6 z-10 max-w-4xl">
          <h2 className="brutalist-text text-3xl md:text-6xl mb-12">
            ¿QUÉ ES TURISMO<br/>
            <span className="text-green-400">SOSTENIBLE?</span>
          </h2>
          
          <div className="relative">
            <svg className="w-80 h-80 mx-auto" viewBox="0 0 200 200">
              <polygon 
                points="100,20 180,160 20,160" 
                fill="none" 
                stroke="#ffe600" 
                strokeWidth="4"
                className="hover:fill-[#ffe600] hover:fill-opacity-20 transition-all duration-300 cursor-pointer"
              />
              
              <text x="100" y="80" textAnchor="middle" fill="#ffe600" fontSize="12" fontWeight="bold">
                AMBIENTAL
              </text>
              <text x="60" y="150" textAnchor="middle" fill="#ffe600" fontSize="12" fontWeight="bold">
                SOCIAL
              </text>
              <text x="140" y="150" textAnchor="middle" fill="#ffe600" fontSize="12" fontWeight="bold">
                ECONÓMICO
              </text>
              
              <circle cx="100" cy="100" r="30" fill="#ffe600" opacity="0.2">
                <animate attributeName="r" values="25;35;25" dur="3s" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>
        </div>
      </section>

      {/* Section 4: Historias de Regeneración */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative grain-overlay">
        <div className="text-center px-6 z-10 max-w-4xl">
          <h2 className="brutalist-text text-3xl md:text-6xl mb-12">
            HISTORIAS DE<br/>
            <span className="text-green-400">REGENERACIÓN</span>
          </h2>
          
          <div className="relative">
            <svg className="w-64 h-64 mx-auto" viewBox="0 0 200 200">
              {/* Manos plantando */}
              <path d="M80,120 C85,115 95,115 100,120 C105,115 115,115 120,120 L110,140 L90,140 Z" fill="#8B4513" opacity="0.8"/>
              
              {/* Semilla -> Brote -> Árbol (animado con scroll) */}
              <circle cx="100" cy="140" r="3" fill="#654321">
                <animate attributeName="r" values="3;0;3" dur="6s" repeatCount="indefinite"/>
              </circle>
              
              <line x1="100" y1="140" x2="100" y2="120" stroke="#22c55e" strokeWidth="2">
                <animate attributeName="y2" values="140;120;100;80" dur="6s" repeatCount="indefinite"/>
              </line>
              
              <circle cx="95" cy="100" r="0" fill="#22c55e">
                <animate attributeName="r" values="0;8;15;20" dur="6s" repeatCount="indefinite"/>
              </circle>
              <circle cx="105" cy="95" r="0" fill="#22c55e">
                <animate attributeName="r" values="0;5;10;15" dur="6s" repeatCount="indefinite" begin="1s"/>
              </circle>
            </svg>
          </div>
          
          <p className="text-xl mt-8 max-w-2xl mx-auto">
            Una comunidad indígena planta una ceiba gigante.<br/>
            <span className="text-green-400">Del suelo nace la esperanza.</span>
          </p>
        </div>
      </section>

      {/* Section 5: Rutas de Esperanza */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative grain-overlay">
        <div className="text-center px-6 z-10 max-w-4xl">
          <h2 className="brutalist-text text-3xl md:text-6xl mb-12">
            RUTAS DE<br/>
            <span className="text-blue-400">ESPERANZA</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto mb-4" viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" fill="#22c55e" opacity="0.8">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
                </circle>
                <path d="M15,25 Q25,15 35,25 Q25,35 15,25" fill="#0f2f22"/>
              </svg>
              <div className="font-bold">SELVA</div>
            </div>
            
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto mb-4" viewBox="0 0 50 50">
                <path d="M10,30 Q25,20 40,30 Q25,40 10,30" fill="#3b82f6" opacity="0.8">
                  <animateTransform 
                    attributeName="transform" 
                    type="scale" 
                    values="1;1.1;1" 
                    dur="3s" 
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
              <div className="font-bold">RÍO</div>
            </div>
            
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto mb-4" viewBox="0 0 50 50">
                <circle cx="25" cy="30" r="8" fill="#f59e0b"/>
                <circle cx="20" cy="25" r="6" fill="#f59e0b" opacity="0.8"/>
                <circle cx="30" cy="25" r="6" fill="#f59e0b" opacity="0.6"/>
                <animateTransform 
                  attributeName="transform" 
                  type="rotate" 
                  values="0 25 25;10 25 25;0 25 25" 
                  dur="4s" 
                  repeatCount="indefinite"
                />
              </svg>
              <div className="font-bold">CULTURA</div>
            </div>
            
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto mb-4" viewBox="0 0 50 50">
                <polygon points="25,10 35,30 15,30" fill="#6b7280" opacity="0.8">
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="5s" repeatCount="indefinite"/>
                </polygon>
              </svg>
              <div className="font-bold">MONTAÑA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Convocatoria al Festival */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative grain-overlay">
        <div className="text-center px-6 z-10 max-w-4xl">
          <div className="bg-[#ffe600] text-[#0f2f22] p-8 transform -rotate-1 mb-12 relative">
            <div className="absolute inset-0 bg-[#0f2f22] transform translate-x-2 translate-y-2"></div>
            <div className="relative bg-[#ffe600] p-8">
              <h2 className="brutalist-text text-4xl md:text-7xl mb-4">
                FESTIVAL<br/>NATUR
              </h2>
              <p className="text-xl font-bold">
                14-15 NOVIEMBRE 2025<br/>
                BOGOTÁ, COLOMBIA
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="brutalist-text text-2xl md:text-4xl">
              ÚNETE • PARTICIPA • TRANSFORMA
            </h3>
            
            <Link href="/registro">
              <Button className="bg-[#ffe600] text-[#0f2f22] hover:bg-[#ffed4a] text-xl font-black px-12 py-6 transform hover:scale-105 transition-all duration-300 brutalist-text">
                <span className="animate-pulse">⚡</span>
                CONECTAR AHORA
                <span className="animate-pulse">⚡</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;