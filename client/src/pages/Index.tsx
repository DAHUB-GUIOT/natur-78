import React, { useEffect, useRef } from "react";
import { HeaderButtons } from "@/components/layout/HeaderButtons";

const Index = () => {
  const planetRef = useRef<SVGSVGElement>(null);
  const cloudsRef = useRef<SVGGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollProgress = Math.min(scrollY / windowHeight, 1);

      // Planet rotation effect
      if (planetRef.current) {
        const rotation = scrollProgress * 360;
        planetRef.current.style.transform = `rotate(${rotation}deg) scale(${1 - scrollProgress * 0.3})`;
        planetRef.current.style.opacity = (1 - scrollProgress * 0.5).toString();
      }

      // Clouds parallax movement
      if (cloudsRef.current) {
        const cloudMovement = scrollProgress * 100;
        cloudsRef.current.style.transform = `translateX(${cloudMovement}px) translateY(${-cloudMovement * 0.5}px)`;
        cloudsRef.current.style.opacity = (1 - scrollProgress * 0.7).toString();
      }

      // Text fade and movement
      if (textRef.current) {
        const textOpacity = scrollProgress < 0.3 ? 1 : Math.max(0, 1 - (scrollProgress - 0.3) * 2);
        const textTranslate = scrollProgress * 50;
        textRef.current.style.opacity = textOpacity.toString();
        textRef.current.style.transform = `translateY(${textTranslate}px)`;
      }
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
        
        .data-box {
          background: #ffe600;
          color: #0f2f22;
          padding: 12px 20px;
          margin: 16px 0;
          transform: rotate(-1deg);
          display: inline-block;
          font-weight: bold;
        }
        
        .quote-text {
          font-style: italic;
          font-size: 1.1em;
          line-height: 1.4;
          margin: 24px 0;
          padding: 20px;
          border-left: 4px solid #ffe600;
          background: rgba(255, 230, 0, 0.05);
        }

        .planet-container {
          will-change: transform, opacity;
        }
        
        .clouds-container {
          will-change: transform, opacity;
        }
        
        .text-container {
          will-change: transform, opacity;
        }
      `}</style>

      {/* ESCENA 1: EL MUNDO */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background stars/space dots */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#ffe600] rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animation: `twinkle ${2 + Math.random() * 2}s ease-in-out infinite alternate`
              }}
            />
          ))}
        </div>

        {/* Planet Earth with clouds */}
        <div className="relative z-10">
          <svg 
            ref={planetRef}
            className="planet-container w-[400px] h-[400px] md:w-[500px] md:h-[500px]" 
            viewBox="0 0 400 400"
          >
            {/* Earth outline circle */}
            <circle 
              cx="200" 
              cy="200" 
              r="150" 
              fill="none" 
              stroke="#ffe600" 
              strokeWidth="2"
            />
            
            {/* Equator line */}
            <ellipse 
              cx="200" 
              cy="200" 
              rx="150" 
              ry="30" 
              fill="none" 
              stroke="#ffe600" 
              strokeWidth="1" 
              opacity="0.6"
            />
            
            {/* Meridian lines */}
            <ellipse 
              cx="200" 
              cy="200" 
              rx="75" 
              ry="150" 
              fill="none" 
              stroke="#ffe600" 
              strokeWidth="1" 
              opacity="0.6"
            />
            <line 
              x1="200" 
              y1="50" 
              x2="200" 
              y2="350" 
              stroke="#ffe600" 
              strokeWidth="1" 
              opacity="0.6"
            />
            
            {/* Continents - simplified Mercator projection outlines */}
            {/* North America */}
            <path 
              d="M120,120 L140,110 L160,115 L170,130 L165,145 L150,150 L130,140 Z" 
              fill="none" 
              stroke="#ffe600" 
              strokeWidth="1.5"
            />
            
            {/* South America */}
            <path 
              d="M140,200 L150,190 L155,210 L160,240 L155,270 L145,280 L135,265 L138,240 Z" 
              fill="none" 
              stroke="#ffe600" 
              strokeWidth="1.5"
            />
            
            {/* Africa */}
            <path 
              d="M190,160 L210,155 L220,170 L225,200 L220,230 L210,250 L195,245 L185,220 L188,180 Z" 
              fill="none" 
              stroke="#ffe600" 
              strokeWidth="1.5"
            />
            
            {/* Europe */}
            <path 
              d="M190,140 L205,135 L215,145 L210,155 L195,150 Z" 
              fill="none" 
              stroke="#ffe600" 
              strokeWidth="1.5"
            />
            
            {/* Asia */}
            <path 
              d="M220,130 L260,125 L280,140 L275,170 L260,180 L240,175 L225,160 Z" 
              fill="none" 
              stroke="#ffe600" 
              strokeWidth="1.5"  
            />
            
            {/* Australia */}
            <ellipse 
              cx="270" 
              cy="250" 
              rx="15" 
              ry="8" 
              fill="none" 
              stroke="#ffe600" 
              strokeWidth="1.5"
            />
          </svg>

          {/* Clouds with parallax movement */}
          <svg 
            className="absolute inset-0 w-full h-full clouds-container" 
            viewBox="0 0 400 400"
          >
            <g ref={cloudsRef}>
              {/* Cloud 1 */}
              <path 
                d="M80,100 Q90,90 100,95 Q115,85 130,95 Q140,90 150,100 Q145,110 130,105 Q115,115 100,105 Q85,110 80,100" 
                fill="none" 
                stroke="#ffe600" 
                strokeWidth="1" 
                opacity="0.4"
              />
              
              {/* Cloud 2 */}
              <path 
                d="M250,80 Q260,70 270,75 Q285,65 300,75 Q310,70 320,80 Q315,90 300,85 Q285,95 270,85 Q255,90 250,80" 
                fill="none" 
                stroke="#ffe600" 
                strokeWidth="1" 
                opacity="0.5"
              />
              
              {/* Cloud 3 */}
              <path 
                d="M320,180 Q330,170 340,175 Q355,165 370,175 Q380,170 390,180 Q385,190 370,185 Q355,195 340,185 Q325,190 320,180" 
                fill="none" 
                stroke="#ffe600" 
                strokeWidth="1" 
                opacity="0.3"
              />
              
              {/* Cloud 4 */}
              <path 
                d="M30,250 Q40,240 50,245 Q65,235 80,245 Q90,240 100,250 Q95,260 80,255 Q65,265 50,255 Q35,260 30,250" 
                fill="none" 
                stroke="#ffe600" 
                strokeWidth="1" 
                opacity="0.4"
              />
            </g>
          </svg>
        </div>

        {/* Text content */}
        <div 
          ref={textRef}
          className="absolute bottom-0 left-0 right-0 text-container p-6 md:p-12"
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="brutalist-text text-2xl md:text-4xl lg:text-5xl mb-8 text-center">
              "EL TURISMO DEVORA<br/>
              LO QUE VINO A VER"
            </h1>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="data-box">
                8% DE EMISIONES GLOBALES<br/>
                PROVIENEN DEL TURISMO
              </div>
              
              <div className="data-box">
                80% DE ECOSISTEMAS TURÍSTICOS<br/>
                CON ESTRÉS ECOLÓGICO SEVERO
              </div>
            </div>

            <div className="text-center mb-6">
              <p className="text-sm md:text-base">
                Para 2030, se proyectan entre <strong>2.5 y 3.5 gigatoneladas de CO₂/año</strong><br/>
                emitidas por el sector turístico (UNWTO, IPCC)
              </p>
            </div>

            <div className="quote-text text-center">
              El planeta no es un fondo de pantalla.<br/>
              Es un ser vivo que está siendo consumido<br/>
              por la velocidad de nuestros deseos.
            </div>

            <div className="text-xs opacity-60 mt-8 text-center">
              <p>Fuentes científicas:</p>
              <p>UNWTO & ITF (2019) • Nature Climate Change (2018) • IPBES Report (2023)</p>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes twinkle {
            0% { opacity: 0.3; transform: scale(1); }
            100% { opacity: 0.8; transform: scale(1.2); }
          }
        `}</style>
      </section>
    </div>
  );
};

export default Index;