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

      sectionsRef.current.forEach((section, index) => {
        if (!section) return;
        
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        
        // Calculate progress through this section
        const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)));
        
        // Apply scene-specific effects
        const sceneElement = section.querySelector('.scene-element');
        const textElement = section.querySelector('.scene-text');
        
        if (sceneElement && textElement) {
          applySceneEffects(sceneElement as HTMLElement, textElement as HTMLElement, progress, index);
        }
      });
    };

    const applySceneEffects = (sceneEl: HTMLElement, textEl: HTMLElement, progress: number, sceneIndex: number) => {
      switch(sceneIndex) {
        case 0: // World Point
          const scale = 1 + progress * 50;
          sceneEl.style.transform = `scale(${scale})`;
          if (progress > 0.7) {
            sceneEl.style.opacity = `${1 - (progress - 0.7) * 3}`;
            (sceneEl.parentElement as HTMLElement).style.backgroundColor = '#ffe600';
          }
          textEl.style.opacity = `${1 - progress}`;
          break;
          
        case 1: // Colombia Map
          const mapParts = sceneEl.querySelectorAll('.map-part');
          mapParts.forEach((part, i) => {
            const offset = progress * 20 * (i + 1);
            (part as HTMLElement).style.transform = `translate(${Math.cos(i) * offset}px, ${Math.sin(i) * offset}px)`;
          });
          textEl.style.opacity = `${Math.max(0.3, 1 - progress * 0.5)}`;
          break;
          
        case 2: // Bird
          const birdScale = 0.5 + progress * 1.5;
          const wingFlap = Math.sin(Date.now() * 0.005) * (10 + progress * 20);
          sceneEl.style.transform = `scale(${birdScale})`;
          const wings = sceneEl.querySelectorAll('.wing');
          wings.forEach((wing, i) => {
            (wing as HTMLElement).style.transform = `rotate(${(i === 0 ? -1 : 1) * wingFlap}deg)`;
          });
          break;
          
        case 3: // Person
          const lines = sceneEl.querySelectorAll('.face-line');
          lines.forEach((line, i) => {
            const lineProgress = Math.max(0, Math.min(1, (progress - i * 0.1) * 2));
            (line as HTMLElement).style.strokeDasharray = `${lineProgress * 100} 100`;
          });
          break;
          
        case 4: // Heart
          const heartbeat = 1 + Math.sin(Date.now() * 0.008) * 0.2;
          sceneEl.style.transform = `scale(${heartbeat})`;
          if (progress > 0.5) {
            (sceneEl.parentElement as HTMLElement).style.backgroundColor = `rgba(15, 47, 34, ${progress - 0.5})`;
          }
          break;
          
        case 5: // Atom
          const electrons = sceneEl.querySelectorAll('.electron');
          electrons.forEach((electron, i) => {
            (electron as HTMLElement).style.transform = `rotate(${Date.now() * 0.001 * (i + 1)}deg)`;
          });
          break;
          
        case 6: // Final Scene
          if (progress > 0.3) {
            (sceneEl.parentElement as HTMLElement).style.backgroundColor = '#ffe600';
            textEl.style.opacity = `${(progress - 0.3) * 1.5}`;
            textEl.style.color = '#0f2f22';
          }
          break;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#0f2f22] text-[#ffe600] overflow-x-hidden">
      <HeaderButtons />
      
      <style dangerouslySetInnerHTML={{
        __html: `
        .brutalist-text {
          font-family: 'IBM Plex Mono', 'Space Grotesk', monospace;
          font-weight: bold;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          line-height: 1.2;
        }
        
        .scene-container {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: background-color 0.5s ease;
        }
        
        .scene-element {
          transition: transform 0.1s ease-out, opacity 0.1s ease-out;
          will-change: transform, opacity;
        }
        
        .scene-text {
          position: absolute;
          bottom: 10vh;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          transition: opacity 0.3s ease, color 0.3s ease;
          max-width: 80vw;
        }
        
        .face-line {
          stroke-dasharray: 0 100;
          transition: stroke-dasharray 0.3s ease;
        }
        `
      }} />

      {/* Scene 1: EL MUNDO COMO PUNTO */}
      <section ref={addToRefs} className="scene-container">
        <div className="scene-element">
          <svg width="20" height="20" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="10" fill="#ffe600" />
          </svg>
        </div>
        <div className="scene-text">
          <h1 className="brutalist-text text-3xl md:text-5xl mb-4">
            EL TURISMO DEVORA<br/>LO QUE VINO A VER
          </h1>
          <p className="text-sm md:text-base opacity-80">
            10% del PIB global • 8% de emisiones CO₂ • Sobrecarga ecológica
          </p>
        </div>
      </section>

      {/* Scene 2: COLOMBIA */}
      <section ref={addToRefs} className="scene-container">
        <div className="scene-element">
          <svg width="300" height="400" viewBox="0 0 300 400">
            {/* Simplified Colombia outline */}
            <path className="map-part" d="M150,50 L200,40 L240,60 L270,100 L280,140 L275,180 L270,220 L260,260 L240,300 L200,320 L150,330" 
                  fill="none" stroke="#ffe600" strokeWidth="3"/>
            <path className="map-part" d="M150,330 L100,320 L60,300 L40,260 L30,220 L35,180 L50,140 L80,100 L120,70 L150,50" 
                  fill="none" stroke="#ffe600" strokeWidth="3"/>
          </svg>
        </div>
        <div className="scene-text">
          <h2 className="brutalist-text text-3xl md:text-4xl mb-4">
            UNA JOYA BIODIVERSA<br/>EN PELIGRO
          </h2>
          <p className="text-sm md:text-base opacity-80">
            País más biodiverso por km² • 314 ecosistemas • 60M hectáreas boscosas<br/>
            80% del turismo en zonas sensibles
          </p>
        </div>
      </section>

      {/* Scene 3: AVE NATIVA */}
      <section ref={addToRefs} className="scene-container">
        <div className="scene-element">
          <svg width="400" height="250" viewBox="0 0 400 250">
            {/* Simplified condor/bird */}
            <path className="wing" d="M200,125 L120,100 L80,130 L100,150 L160,160 L180,140 Z" 
                  fill="none" stroke="#ffe600" strokeWidth="3"/>
            <path className="wing" d="M200,125 L280,100 L320,130 L300,150 L240,160 L220,140 Z" 
                  fill="none" stroke="#ffe600" strokeWidth="3"/>
            <ellipse cx="200" cy="160" rx="12" ry="25" fill="none" stroke="#ffe600" strokeWidth="3"/>
            <circle cx="200" cy="115" r="8" fill="none" stroke="#ffe600" strokeWidth="3"/>
            <path d="M200,107 L210,102 L208,112" fill="none" stroke="#ffe600" strokeWidth="2"/>
          </svg>
        </div>
        <div className="scene-text">
          <h2 className="brutalist-text text-3xl md:text-4xl mb-4">
            NO ES SÍMBOLO.<br/>ES VIDA.
          </h2>
          <p className="text-sm md:text-base opacity-80">
            Cóndor andino: peligro crítico • Indicadores ecológicos clave<br/>
            Turismo masivo reduce hábitats
          </p>
        </div>
      </section>

      {/* Scene 4: PERSONA */}
      <section ref={addToRefs} className="scene-container">
        <div className="scene-element">
          <svg width="200" height="250" viewBox="0 0 200 250">
            <ellipse className="face-line" cx="100" cy="125" rx="50" ry="70" fill="none" stroke="#ffe600" strokeWidth="2"/>
            <circle className="face-line" cx="85" cy="105" r="6" fill="none" stroke="#ffe600" strokeWidth="2"/>
            <circle className="face-line" cx="115" cy="105" r="6" fill="none" stroke="#ffe600" strokeWidth="2"/>
            <line className="face-line" x1="100" y1="120" x2="100" y2="135" stroke="#ffe600" strokeWidth="2"/>
            <path className="face-line" d="M85,145 Q100,155 115,145" fill="none" stroke="#ffe600" strokeWidth="2"/>
            <line className="face-line" x1="100" y1="125" x2="70" y2="95" stroke="#ffe600" strokeWidth="1" opacity="0.6"/>
            <line className="face-line" x1="100" y1="125" x2="130" y2="95" stroke="#ffe600" strokeWidth="1" opacity="0.6"/>
            <line className="face-line" x1="100" y1="125" x2="60" y2="125" stroke="#ffe600" strokeWidth="1" opacity="0.6"/>
            <line className="face-line" x1="100" y1="125" x2="140" y2="125" stroke="#ffe600" strokeWidth="1" opacity="0.6"/>
          </svg>
        </div>
        <div className="scene-text">
          <h2 className="brutalist-text text-3xl md:text-4xl mb-4">
            EL VIAJE EMPIEZA<br/>ADENTRO
          </h2>
          <p className="text-sm md:text-base opacity-80">
            Transformación interna • Educación emocional<br/>
            76% quiere viajar sostenible pero no sabe cómo
          </p>
        </div>
      </section>

      {/* Scene 5: CORAZÓN */}
      <section ref={addToRefs} className="scene-container">
        <div className="scene-element">
          <svg width="200" height="180" viewBox="0 0 200 180">
            <path d="M100,50 C80,30 50,35 50,65 C50,95 100,140 100,140 C100,140 150,95 150,65 C150,35 120,30 100,50 Z" 
                  fill="none" stroke="#ffe600" strokeWidth="3"/>
            <path d="M100,70 C85,60 70,65 70,80 C70,95 100,120 100,120" 
                  fill="none" stroke="#ffe600" strokeWidth="2" opacity="0.7"/>
            <path d="M100,70 C115,60 130,65 130,80 C130,95 100,120 100,120" 
                  fill="none" stroke="#ffe600" strokeWidth="2" opacity="0.7"/>
          </svg>
        </div>
        <div className="scene-text">
          <h2 className="brutalist-text text-3xl md:text-4xl mb-4">
            VIAJAR TAMBIÉN<br/>ES CUIDAR
          </h2>
          <p className="text-sm md:text-base opacity-80">
            Mejora bienestar comunitario • 1 de cada 10 empleos globales<br/>
            El impacto depende de decisiones individuales
          </p>
        </div>
      </section>

      {/* Scene 6: ÁTOMO / INTERCONEXIÓN */}
      <section ref={addToRefs} className="scene-container">
        <div className="scene-element">
          <svg width="300" height="300" viewBox="0 0 300 300">
            <circle cx="150" cy="150" r="6" fill="#ffe600"/>
            <ellipse className="electron" cx="150" cy="150" rx="60" ry="20" fill="none" stroke="#ffe600" strokeWidth="2" opacity="0.7">
              <circle cx="210" cy="150" r="3" fill="#ffe600"/>
            </ellipse>
            <ellipse className="electron" cx="150" cy="150" rx="20" ry="60" fill="none" stroke="#ffe600" strokeWidth="2" opacity="0.7">
              <circle cx="150" cy="90" r="3" fill="#ffe600"/>
            </ellipse>
            <ellipse className="electron" cx="150" cy="150" rx="45" ry="45" fill="none" stroke="#ffe600" strokeWidth="2" opacity="0.7">
              <circle cx="182" cy="182" r="3" fill="#ffe600"/>
            </ellipse>
          </svg>
        </div>
        <div className="scene-text">
          <h2 className="brutalist-text text-3xl md:text-4xl mb-4">
            TODO ESTÁ<br/>CONECTADO
          </h2>
          <p className="text-sm md:text-base opacity-80">
            Impacto en redes sociales, ecológicas y económicas<br/>
            Efecto mariposa • La sostenibilidad es sistémica o no es
          </p>
        </div>
      </section>

      {/* Scene 7: 50 HISTORIAS */}
      <section ref={addToRefs} className="scene-container">
        <div className="scene-element">
          <svg width="200" height="150" viewBox="0 0 200 150">
            <path d="M50,75 Q100,50 150,75" fill="none" stroke="#ffe600" strokeWidth="3"/>
            <path d="M50,75 Q100,60 150,75" fill="none" stroke="#ffe600" strokeWidth="2" opacity="0.6"/>
            <path d="M50,75 Q100,90 150,75" fill="none" stroke="#ffe600" strokeWidth="2" opacity="0.6"/>
            <line x1="100" y1="60" x2="100" y2="90" stroke="#ffe600" strokeWidth="4"/>
          </svg>
        </div>
        <div className="scene-text">
          <h2 className="brutalist-text text-2xl md:text-4xl mb-6">
            MUY PRONTO...<br/>50 HISTORIAS REALES<br/>DE TURISMO SOSTENIBLE<br/>EN COLOMBIA
          </h2>
          <p className="text-base md:text-lg opacity-90 leading-relaxed">
            Contadas por quienes habitan,<br/>
            cuidan y transforman sus territorios.<br/><br/>
            <strong>Únete a este viaje que apenas comienza.</strong>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;