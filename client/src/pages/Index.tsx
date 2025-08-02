import React, { useEffect, useRef } from "react";
import { HeaderButtons } from "@/components/layout/HeaderButtons";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const Index = () => {
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Advanced parallax effects for progressive SVG animations
      const parallaxElements = document.querySelectorAll('.parallax-layer');
      parallaxElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementHeight = rect.height;
        
        // Calculate scroll progress for this element (0 to 1)
        const scrollProgress = Math.max(0, Math.min(1, 
          (windowHeight - elementTop) / (windowHeight + elementHeight)
        ));
        
        // Different parallax speeds for layers
        const speed = 0.2 + (index * 0.15);
        const yPos = -(scrollY * speed);
        
        // Apply transforms based on scroll progress
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
        (element as HTMLElement).style.setProperty('--scroll-progress', scrollProgress.toString());
      });

      // Progressive SVG scaling and animation
      const svgScenes = document.querySelectorAll('.svg-scene');
      svgScenes.forEach((scene, index) => {
        const rect = scene.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(centerY - windowHeight / 2);
        const maxDistance = windowHeight;
        
        // Scale factor based on proximity to viewport center
        const scaleFactor = Math.max(0.3, 1 - (distanceFromCenter / maxDistance));
        const finalScale = 0.5 + (scaleFactor * 1.5);
        
        // Rotation and additional effects
        const rotation = (scrollY * (0.1 + index * 0.05)) % 360;
        
        (scene as HTMLElement).style.transform = 
          `scale(${finalScale}) rotate(${rotation}deg)`;
        (scene as HTMLElement).style.opacity = scaleFactor.toString();
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
      
      {/* Custom CSS for advanced animations and parallax */}
      <style>{`
        @keyframes fadeInUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes planetRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes wingFlap {
          0%, 100% { transform: scaleX(1) scaleY(1); }
          50% { transform: scaleX(1.1) scaleY(0.95); }
        }
        
        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes atomOrbit {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        
        @keyframes glitchStars {
          0%, 100% { opacity: 0.8; transform: translateX(0); }
          25% { opacity: 0.4; transform: translateX(2px); }
          75% { opacity: 1; transform: translateX(-2px); }
        }
        
        .animate-in {
          animation: fadeInUp 1s ease-out forwards;
        }
        
        .brutalist-text {
          font-family: 'Arial Black', Arial, sans-serif;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          line-height: 0.9;
          text-shadow: 2px 2px 0px rgba(0,0,0,0.8);
        }
        
        .svg-scene {
          transition: all 0.1s ease-out;
          transform-origin: center;
        }
        
        .parallax-layer {
          will-change: transform;
        }
        
        .planet-scene {
          animation: planetRotate 60s linear infinite;
        }
        
        .bird-wings {
          animation: wingFlap 4s ease-in-out infinite;
          transform-origin: center;
        }
        
        .heart-beat {
          animation: heartBeat 2s ease-in-out infinite;
        }
        
        .atom-orbit {
          animation: atomOrbit 8s linear infinite;
        }
        
        .glitch-stars {
          animation: glitchStars 3s ease-in-out infinite;
        }
        
        .concrete-texture {
          background: linear-gradient(45deg, #1d1d1d 25%, transparent 25%), 
                      linear-gradient(-45deg, #1d1d1d 25%, transparent 25%),
                      linear-gradient(45deg, transparent 75%, #1d1d1d 75%), 
                      linear-gradient(-45deg, transparent 75%, #1d1d1d 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        }
        
        .neon-glow {
          filter: drop-shadow(0 0 10px #ffd900) drop-shadow(0 0 20px #ffd900);
        }
        
        .stencil-text {
          background: #ffd900;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: contrast(2) brightness(1.2);
        }
      `}</style>

      {/* Scene 1: The Planet 🌍 */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative bg-[#0f1f0f] overflow-hidden">
        <div className="parallax-layer absolute inset-0">
          {/* Glitch stars background */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="glitch-stars absolute w-1 h-1 bg-[#ffd900] rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              />
            ))}
          </div>
          
          {/* Brutalist Earth SVG */}
          <div className="svg-scene planet-scene absolute inset-0 flex items-center justify-center">
            <svg className="w-96 h-96" viewBox="0 0 400 400">
              {/* Earth base */}
              <circle cx="200" cy="200" r="180" fill="#1d1d1d" stroke="#ffd900" strokeWidth="4"/>
              
              {/* Brutalist continents */}
              <polygon points="120,120 180,100 200,150 160,180 130,160" fill="#0f1f0f" stroke="#ffd900" strokeWidth="2"/>
              <polygon points="220,130 280,110 300,160 260,190 230,170" fill="#0f1f0f" stroke="#ffd900" strokeWidth="2"/>
              <polygon points="150,220 210,200 230,250 190,280 160,260" fill="#0f1f0f" stroke="#ffd900" strokeWidth="2"/>
              <polygon points="250,240 310,220 330,270 290,300 260,280" fill="#0f1f0f" stroke="#ffd900" strokeWidth="2"/>
              
              {/* Tectonic lines */}
              <path d="M50,200 Q200,150 350,200" stroke="#ff0000" strokeWidth="3" fill="none" opacity="0.8"/>
              <path d="M100,100 Q250,200 300,300" stroke="#ff0000" strokeWidth="2" fill="none" opacity="0.6"/>
            </svg>
          </div>
        </div>
        
        <div className="text-center px-6 z-10 max-w-4xl">
          <h1 className="brutalist-text stencil-text text-4xl md:text-7xl mb-8 tracking-tight">
            EL TURISMO MASIVO ESTÁ<br/>
            <span className="text-red-500">DESTRUYENDO</span><br/>
            LO QUE VINO A ADMIRAR
          </h1>
        </div>
      </section>

      {/* Scene 2: Colombia 🇨🇴 */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative bg-[#0f1f0f] overflow-hidden">
        <div className="parallax-layer absolute inset-0">
          {/* Brutalist Colombia map */}
          <div className="svg-scene absolute inset-0 flex items-center justify-center">
            <svg className="w-[500px] h-[600px]" viewBox="0 0 300 400">
              {/* Colombia brutalist outline */}
              <path 
                d="M150,50 L180,60 L200,90 L220,120 L240,160 L250,200 L240,240 L220,280 L200,320 L180,350 L150,370 L120,350 L100,320 L80,280 L70,240 L80,200 L90,160 L110,120 L130,90 L150,50 Z"
                fill="#ffd900" 
                stroke="#1d1d1d" 
                strokeWidth="4"
                className="concrete-texture"
              />
              
              {/* Terrain mesh lines */}
              <g stroke="#1d1d1d" strokeWidth="2" opacity="0.7">
                <line x1="100" y1="100" x2="200" y2="120"/>
                <line x1="90" y1="150" x2="210" y2="180"/>
                <line x1="85" y1="200" x2="215" y2="230"/>
                <line x1="95" y1="250" x2="205" y2="280"/>
                <line x1="110" y1="300" x2="190" y2="320"/>
              </g>
              
              {/* Animated rivers */}
              <path d="M120,100 Q150,150 180,200 Q150,250 120,300" 
                    stroke="#00bfff" strokeWidth="3" fill="none" opacity="0.8">
                <animate attributeName="stroke-dasharray" values="0,20;20,0;0,20" dur="3s" repeatCount="indefinite"/>
              </path>
              
              {/* Mountains (triangular) */}
              <polygon points="130,120 140,100 150,120" fill="#1d1d1d"/>
              <polygon points="160,140 170,120 180,140" fill="#1d1d1d"/>
              <polygon points="140,180 150,160 160,180" fill="#1d1d1d"/>
              
              {/* Endangered zones (pulsing red) */}
              <circle cx="130" cy="200" r="8" fill="#ff0000" opacity="0.7">
                <animate attributeName="r" values="6;12;6" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="180" cy="250" r="6" fill="#ff0000" opacity="0.7">
                <animate attributeName="r" values="4;10;4" dur="2.5s" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>
        </div>
        
        <div className="text-center px-6 z-10 max-w-4xl">
          <h2 className="brutalist-text stencil-text text-3xl md:text-6xl mb-8">
            UNA JOYA BIOLÓGICA<br/>
            AL BORDE DEL <span className="text-red-500">ABISMO</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 text-2xl font-bold">
            <div className="bg-[#ffd900] text-[#1d1d1d] p-6 transform -rotate-2 concrete-texture">
              <div className="text-4xl brutalist-text">+10%</div>
              <div className="brutalist-text">ESPECIES DEL MUNDO</div>
            </div>
            <div className="bg-red-500 text-white p-6 transform rotate-2 concrete-texture">
              <div className="text-4xl brutalist-text">2º</div>
              <div className="brutalist-text">PAÍS MÁS BIODIVERSO</div>
            </div>
          </div>
        </div>
      </section>

      {/* Scene 3: The Bird 🐦 */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative bg-[#0f1f0f] overflow-hidden">
        <div className="parallax-layer absolute inset-0">
          {/* Massive brutalist condor */}
          <div className="svg-scene absolute inset-0 flex items-center justify-center">
            <svg className="w-[600px] h-[400px]" viewBox="0 0 600 400">
              {/* Bird body */}
              <ellipse cx="300" cy="200" rx="60" ry="100" fill="#1d1d1d" stroke="#ffd900" strokeWidth="3"/>
              
              {/* Wings - animated */}
              <g className="bird-wings">
                {/* Left wing */}
                <path d="M240,150 L120,100 L80,140 L100,180 L140,200 L200,190 L240,170 Z" 
                      fill="#1d1d1d" stroke="#ffd900" strokeWidth="3"/>
                {/* Wing feathers (angular) */}
                <polygon points="120,120 100,100 110,140" fill="#ffd900"/>
                <polygon points="140,130 120,110 130,150" fill="#ffd900"/>
                <polygon points="160,140 140,120 150,160" fill="#ffd900"/>
                
                {/* Right wing */}
                <path d="M360,150 L480,100 L520,140 L500,180 L460,200 L400,190 L360,170 Z" 
                      fill="#1d1d1d" stroke="#ffd900" strokeWidth="3"/>
                {/* Wing feathers (angular) */}
                <polygon points="480,120 500,100 490,140" fill="#ffd900"/>
                <polygon points="460,130 480,110 470,150" fill="#ffd900"/>
                <polygon points="440,140 460,120 450,160" fill="#ffd900"/>
              </g>
              
              {/* Head */}
              <circle cx="300" cy="120" r="40" fill="#1d1d1d" stroke="#ffd900" strokeWidth="3"/>
              {/* Beak */}
              <polygon points="300,100 320,80 310,100" fill="#ffd900"/>
              {/* Eye */}
              <circle cx="285" cy="110" r="8" fill="#ffd900"/>
              
              {/* Tail feathers */}
              <polygon points="300,300 280,350 300,380 320,350" fill="#1d1d1d" stroke="#ffd900" strokeWidth="2"/>
              <polygon points="290,310 270,360 290,390 310,360" fill="#ffd900" opacity="0.7"/>
            </svg>
          </div>
        </div>
        
        <div className="text-center px-6 z-10 max-w-4xl">
          <h2 className="brutalist-text stencil-text text-3xl md:text-6xl mb-12">
            ¿QUÉ ES TURISMO<br/>
            <span className="text-green-400 neon-glow">SOSTENIBLE?</span>
          </h2>
          
          <div className="brutalist-text text-lg md:text-2xl text-[#ffd900] space-y-4">
            <div className="bg-[#1d1d1d] p-4 border-2 border-[#ffd900] transform -rotate-1">
              AMBIENTAL • SOCIAL • ECONÓMICO
            </div>
          </div>
        </div>
      </section>

      {/* Scene 4: The Human 🧍 */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative bg-[#0f1f0f] overflow-hidden">
        <div className="parallax-layer absolute inset-0">
          {/* Brutalist human figure */}
          <div className="svg-scene absolute inset-0 flex items-center justify-center">
            <svg className="w-[300px] h-[500px]" viewBox="0 0 300 500">
              {/* Head (geometric) */}
              <rect x="125" y="50" width="50" height="60" fill="#1d1d1d" stroke="#ffd900" strokeWidth="3" className="concrete-texture"/>
              
              {/* Torso (concrete-like) */}
              <rect x="110" y="110" width="80" height="120" fill="#1d1d1d" stroke="#ffd900" strokeWidth="3" className="concrete-texture"/>
              
              {/* Arms (geometric joints) */}
              <rect x="70" y="130" width="40" height="15" fill="#1d1d1d" stroke="#ffd900" strokeWidth="2"/>
              <rect x="50" y="145" width="15" height="40" fill="#1d1d1d" stroke="#ffd900" strokeWidth="2"/>
              <rect x="45" y="185" width="25" height="15" fill="#1d1d1d" stroke="#ffd900" strokeWidth="2"/>
              
              <rect x="190" y="130" width="40" height="15" fill="#1d1d1d" stroke="#ffd900" strokeWidth="2"/>
              <rect x="235" y="145" width="15" height="40" fill="#1d1d1d" stroke="#ffd900" strokeWidth="2"/>
              <rect x="230" y="185" width="25" height="15" fill="#1d1d1d" stroke="#ffd900" strokeWidth="2"/>
              
              {/* Legs (assembling with scroll) */}
              <rect x="125" y="230" width="20" height="80" fill="#1d1d1d" stroke="#ffd900" strokeWidth="2"/>
              <rect x="155" y="230" width="20" height="80" fill="#1d1d1d" stroke="#ffd900" strokeWidth="2"/>
              
              <rect x="120" y="310" width="30" height="15" fill="#1d1d1d" stroke="#ffd900" strokeWidth="2"/>
              <rect x="150" y="310" width="30" height="15" fill="#1d1d1d" stroke="#ffd900" strokeWidth="2"/>
              
              <rect x="115" y="325" width="40" height="60" fill="#1d1d1d" stroke="#ffd900" strokeWidth="2"/>
              <rect x="145" y="325" width="40" height="60" fill="#1d1d1d" stroke="#ffd900" strokeWidth="2"/>
              
              {/* Feet */}
              <rect x="110" y="385" width="50" height="20" fill="#1d1d1d" stroke="#ffd900" strokeWidth="2"/>
              <rect x="140" y="385" width="50" height="20" fill="#1d1d1d" stroke="#ffd900" strokeWidth="2"/>
              
              {/* Joints (circles) */}
              <circle cx="150" cy="137" r="8" fill="#ffd900"/>
              <circle cx="150" cy="187" r="8" fill="#ffd900"/>
              <circle cx="135" cy="237" r="8" fill="#ffd900"/>
              <circle cx="165" cy="237" r="8" fill="#ffd900"/>
              <circle cx="135" cy="317" r="6" fill="#ffd900"/>
              <circle cx="165" cy="317" r="6" fill="#ffd900"/>
            </svg>
          </div>
        </div>
        
        <div className="text-center px-6 z-10 max-w-4xl">
          <h2 className="brutalist-text stencil-text text-3xl md:text-6xl mb-12">
            HISTORIAS DE<br/>
            <span className="text-green-400 neon-glow">REGENERACIÓN</span>
          </h2>
          
          <p className="brutalist-text text-xl text-[#ffd900] max-w-2xl mx-auto bg-[#1d1d1d] p-6 border-2 border-[#ffd900] transform rotate-1">
            Una comunidad indígena planta una ceiba gigante.<br/>
            <span className="text-green-400">DEL SUELO NACE LA ESPERANZA.</span>
          </p>
        </div>
      </section>

      {/* Scene 5: The Heart ❤️ */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative bg-[#0f1f0f] overflow-hidden">
        <div className="parallax-layer absolute inset-0">
          {/* Brutalist anatomical heart */}
          <div className="svg-scene heart-beat absolute inset-0 flex items-center justify-center">
            <svg className="w-[400px] h-[400px]" viewBox="0 0 400 400">
              {/* Heart main body (chunky, blocky 3D style) */}
              <path d="M200,120 C180,100 140,100 120,140 C120,180 200,260 200,320 C200,260 280,180 280,140 C280,100 240,100 220,120 Z" 
                    fill="#1d1d1d" stroke="#ffd900" strokeWidth="4" className="concrete-texture"/>
              
              {/* Heart chambers (geometric) */}
              <rect x="160" y="140" width="80" height="100" fill="#ff0000" opacity="0.7" stroke="#ffd900" strokeWidth="2"/>
              <rect x="170" y="150" width="60" height="80" fill="#1d1d1d" stroke="#ffd900" strokeWidth="1"/>
              
              {/* Veins as pipes (brutalist) */}
              <rect x="140" y="120" width="12" height="80" fill="#ffd900"/>
              <rect x="248" y="120" width="12" height="80" fill="#ffd900"/>
              <rect x="180" y="100" width="40" height="8" fill="#ffd900"/>
              
              {/* Pipe connections (joints) */}
              <circle cx="146" cy="120" r="8" fill="#1d1d1d" stroke="#ffd900" strokeWidth="2"/>
              <circle cx="254" cy="120" r="8" fill="#1d1d1d" stroke="#ffd900" strokeWidth="2"/>
              
              {/* Pulsing rings (heart beats) */}
              <circle cx="200" cy="200" r="50" fill="none" stroke="#ff0000" strokeWidth="3" opacity="0.5">
                <animate attributeName="r" values="50;80;50" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="200" cy="200" r="70" fill="none" stroke="#ff0000" strokeWidth="2" opacity="0.3">
                <animate attributeName="r" values="70;100;70" dur="2s" repeatCount="indefinite" begin="0.5s"/>
                <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" begin="0.5s"/>
              </circle>
            </svg>
          </div>
        </div>
        
        <div className="text-center px-6 z-10 max-w-4xl">
          <h2 className="brutalist-text stencil-text text-3xl md:text-6xl mb-12">
            RUTAS DE<br/>
            <span className="text-blue-400 neon-glow">ESPERANZA</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center bg-[#1d1d1d] p-4 border-2 border-[#ffd900] transform -rotate-2">
              <div className="brutalist-text text-[#ffd900] text-2xl mb-2">SELVA</div>
            </div>
            <div className="text-center bg-[#1d1d1d] p-4 border-2 border-[#ffd900] transform rotate-1">
              <div className="brutalist-text text-[#ffd900] text-2xl mb-2">RÍO</div>
            </div>
            <div className="text-center bg-[#1d1d1d] p-4 border-2 border-[#ffd900] transform -rotate-1">
              <div className="brutalist-text text-[#ffd900] text-2xl mb-2">CULTURA</div>
            </div>
            <div className="text-center bg-[#1d1d1d] p-4 border-2 border-[#ffd900] transform rotate-2">
              <div className="brutalist-text text-[#ffd900] text-2xl mb-2">MONTAÑA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Scene 6: The Atom ⚛️ */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative bg-[#0f1f0f] overflow-hidden">
        <div className="parallax-layer absolute inset-0">
          {/* Brutalist atom model */}
          <div className="svg-scene atom-orbit absolute inset-0 flex items-center justify-center">
            <svg className="w-[500px] h-[500px]" viewBox="0 0 500 500">
              {/* Outer orbit ring */}
              <ellipse cx="250" cy="250" rx="200" ry="80" fill="none" stroke="#ffd900" strokeWidth="6" opacity="0.8" className="neon-glow">
                <animateTransform 
                  attributeName="transform" 
                  type="rotate" 
                  values="0 250 250;360 250 250" 
                  dur="8s" 
                  repeatCount="indefinite"
                />
              </ellipse>
              
              {/* Middle orbit ring */}
              <ellipse cx="250" cy="250" rx="150" ry="60" fill="none" stroke="#00ff00" strokeWidth="4" opacity="0.6" className="neon-glow">
                <animateTransform 
                  attributeName="transform" 
                  type="rotate" 
                  values="60 250 250;420 250 250" 
                  dur="6s" 
                  repeatCount="indefinite"
                />
              </ellipse>
              
              {/* Inner orbit ring */}
              <ellipse cx="250" cy="250" rx="100" ry="40" fill="none" stroke="#ff00ff" strokeWidth="3" opacity="0.7" className="neon-glow">
                <animateTransform 
                  attributeName="transform" 
                  type="rotate" 
                  values="120 250 250;480 250 250" 
                  dur="4s" 
                  repeatCount="indefinite"
                />
              </ellipse>
              
              {/* Nucleus (center) */}
              <circle cx="250" cy="250" r="30" fill="#1d1d1d" stroke="#ffd900" strokeWidth="4" className="concrete-texture"/>
              <circle cx="240" cy="240" r="8" fill="#ffd900" className="neon-glow"/>
              <circle cx="260" cy="240" r="8" fill="#ffd900" className="neon-glow"/>
              <circle cx="250" cy="260" r="8" fill="#ffd900" className="neon-glow"/>
              
              {/* Electrons (orbiting spheres) */}
              <circle cx="450" cy="250" r="12" fill="#00ff00" className="neon-glow">
                <animateTransform 
                  attributeName="transform" 
                  type="rotate" 
                  values="0 250 250;360 250 250" 
                  dur="8s" 
                  repeatCount="indefinite"
                />
              </circle>
              
              <circle cx="400" cy="250" r="10" fill="#ff00ff" className="neon-glow">
                <animateTransform 
                  attributeName="transform" 
                  type="rotate" 
                  values="60 250 250;420 250 250" 
                  dur="6s" 
                  repeatCount="indefinite"
                />
              </circle>
              
              <circle cx="350" cy="250" r="8" fill="#00ffff" className="neon-glow">
                <animateTransform 
                  attributeName="transform" 
                  type="rotate" 
                  values="120 250 250;480 250 250" 
                  dur="4s" 
                  repeatCount="indefinite"
                />
              </circle>
              
              {/* Light particles breaking apart */}
              {[...Array(12)].map((_, i) => (
                <circle 
                  key={i}
                  cx={250 + Math.cos(i * 30 * Math.PI / 180) * 100}
                  cy={250 + Math.sin(i * 30 * Math.PI / 180) * 100}
                  r="3" 
                  fill="#ffd900" 
                  opacity="0.8"
                  className="neon-glow"
                >
                  <animate 
                    attributeName="r" 
                    values="3;8;3" 
                    dur="2s" 
                    repeatCount="indefinite"
                    begin={`${i * 0.2}s`}
                  />
                  <animate 
                    attributeName="opacity" 
                    values="0.8;0.2;0.8" 
                    dur="2s" 
                    repeatCount="indefinite"
                    begin={`${i * 0.2}s`}
                  />
                </circle>
              ))}
            </svg>
          </div>
        </div>
        
        <div className="text-center px-6 z-10 max-w-4xl">
          <div className="bg-[#ffd900] text-[#1d1d1d] p-8 transform -rotate-1 mb-12 relative concrete-texture border-4 border-[#1d1d1d]">
            <div className="absolute inset-0 bg-[#1d1d1d] transform translate-x-3 translate-y-3"></div>
            <div className="relative bg-[#ffd900] p-8">
              <h2 className="brutalist-text text-4xl md:text-7xl mb-4">
                FESTIVAL<br/>NATUR
              </h2>
              <p className="brutalist-text text-xl">
                14-15 NOVIEMBRE 2025<br/>
                BOGOTÁ, COLOMBIA
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="brutalist-text stencil-text text-2xl md:text-4xl neon-glow">
              ÚNETE • PARTICIPA • TRANSFORMA
            </h3>
            
            <Link href="/auth/empresas">
              <Button className="bg-[#ffd900] text-[#1d1d1d] hover:bg-[#ffed4a] text-xl brutalist-text px-12 py-6 transform hover:scale-105 transition-all duration-300 border-4 border-[#1d1d1d] concrete-texture neon-glow">
                <span className="animate-pulse">⚡</span>
                CONECTAR AHORA
                <span className="animate-pulse">⚡</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final Section: 50 Untold Stories */}
      <section ref={addToRefs} className="min-h-screen flex items-center justify-center relative bg-[#0f1f0f] overflow-hidden">
        <div className="parallax-layer absolute inset-0">
          {/* Concrete textured background with glitch lines */}
          <div className="absolute inset-0 concrete-texture opacity-20"></div>
          
          {/* Animated glitch lines drawing Colombia silhouette */}
          <div className="absolute inset-0">
            <svg className="w-full h-full opacity-30" viewBox="0 0 800 600">
              <path 
                d="M300,100 L360,120 L400,180 L440,240 L480,320 L460,400 L420,460 L380,500 L340,520 L300,500 L260,460 L240,400 L220,320 L240,240 L280,180 L300,100 Z"
                fill="none" 
                stroke="#ffd900" 
                strokeWidth="2"
                strokeDasharray="10,5"
                className="glitch-lines"
              />
              
              {/* Glitch animation lines */}
              <line x1="200" y1="150" x2="600" y2="180" stroke="#ffd900" strokeWidth="1" opacity="0.4">
                <animate attributeName="x1" values="200;220;200" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite"/>
              </line>
              <line x1="180" y1="250" x2="620" y2="280" stroke="#ffd900" strokeWidth="1" opacity="0.3">
                <animate attributeName="x1" values="180;200;180" dur="2.5s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.5s" repeatCount="indefinite"/>
              </line>
              <line x1="220" y1="350" x2="580" y2="380" stroke="#ffd900" strokeWidth="1" opacity="0.5">
                <animate attributeName="x1" values="220;240;220" dur="1.8s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.5;0.9;0.5" dur="1.8s" repeatCount="indefinite"/>
              </line>
            </svg>
          </div>
          
          {/* 50 glowing dots scattered across the map */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => {
              const x = 200 + (Math.random() * 400);
              const y = 100 + (Math.random() * 400);
              const delay = Math.random() * 5;
              
              return (
                <div
                  key={i}
                  className="absolute w-3 h-3 cursor-pointer group transition-all duration-300 hover:scale-150"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    animationDelay: `${delay}s`
                  }}
                >
                  <div className="w-full h-full bg-[#ffd900] rounded-full animate-pulse neon-glow opacity-60 hover:opacity-100">
                    <div className="absolute inset-0 bg-[#ffd900] rounded-full animate-ping"></div>
                  </div>
                  
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <div className="bg-[#1d1d1d] border-2 border-[#ffd900] px-3 py-2 rounded brutalist-text text-[#ffd900] text-xs whitespace-nowrap">
                      Historia #{String(i + 1).padStart(2, '0')} — 🌿 Silencio, aún en construcción...
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Floating seeds effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-[#ffd900] rounded-full opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${3 + Math.random() * 2}s ease-in-out infinite ${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center px-6 z-10 max-w-4xl">
          <h1 className="brutalist-text stencil-text text-4xl md:text-7xl mb-8 tracking-tight neon-glow">
            50 HISTORIAS<br/>
            AÚN NO CONTADAS
          </h1>
          
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-lg md:text-xl text-[#ffd900] leading-relaxed bg-[#1d1d1d] p-6 border-2 border-[#ffd900] transform -rotate-1 concrete-texture">
              <span className="brutalist-text">
                "El turismo sostenible no es una tendencia. Es un cambio de perspectiva. 
                Estas historias lo demuestran. Pronto, podrás escucharlas, sentirlas y caminar dentro de ellas."
              </span>
            </p>
          </div>
          
          {/* Emerging text effect */}
          <div className="mb-8">
            <p className="brutalist-text text-2xl md:text-3xl text-[#ffd900] opacity-80 animate-pulse">
              Cuando estés listo para verlas,<br/>
              <span className="stencil-text neon-glow">las historias aparecerán.</span>
            </p>
          </div>
          
          {/* Big brutalist CTA button */}
          <div className="relative">
            <Button className="bg-[#ffd900] text-[#1d1d1d] hover:bg-[#ffed4a] text-xl md:text-2xl brutalist-text px-16 py-8 transform hover:scale-105 transition-all duration-300 border-4 border-[#1d1d1d] concrete-texture neon-glow relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#1d1d1d] transform translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></div>
              <div className="relative flex items-center gap-4">
                <span className="animate-pulse text-2xl">🎯</span>
                QUIERO SER DE LOS PRIMEROS EN VERLAS
                <span className="animate-pulse text-2xl">🎯</span>
              </div>
            </Button>
          </div>
        </div>
        
        {/* Additional CSS for this section */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-10px) rotate(120deg); }
            66% { transform: translateY(10px) rotate(240deg); }
          }
          
          .glitch-lines {
            animation: glitchDraw 4s ease-in-out infinite;
          }
          
          @keyframes glitchDraw {
            0%, 100% { stroke-dashoffset: 0; }
            50% { stroke-dashoffset: 20; }
          }
        `}</style>
      </section>
    </div>
  );
};

export default Index;