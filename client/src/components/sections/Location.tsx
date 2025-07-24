import React from "react";
export function Location() {
  return <section className="w-full font-jakarta bg-[#e6f0c1] py-0 m-0">
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
        {/* Left: Background Image with headline */}
        <div className="relative w-full lg:w-[45%] min-h-[300px] md:min-h-[400px] lg:min-h-[500px] bg-black">
          <img src="/lovable-uploads/0ac8a159-001e-4075-a31f-7892520a10b2.png" alt="CEFE Chapinero Architecture" className="w-full h-full object-cover block opacity-85" />
          <div className="absolute inset-0 flex flex-col justify-end bg-black bg-opacity-25">
            <div className="p-4 pb-6 sm:p-6 md:p-8">
              <h1 className="font-gasoek text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal leading-tight tracking-wide uppercase text-zinc-50">
                CEFE CHAPINERO
              </h1>
            </div>
          </div>
        </div>
        
        {/* Right: Info Panel */}
        <div className="flex items-stretch w-full lg:w-[55%] bg-[#CEDD9F] min-h-[300px]">
          <div className="flex flex-col justify-center w-full p-4 py-6 sm:p-6 md:p-8 lg:p-10">
            <h2 style={{
            letterSpacing: 1.5
          }} className="font-gasoek text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal leading-tight tracking-wide uppercase mb-4 sm:mb-6 md:mb-8 text-zinc-950">
              ¿Cuándo y dónde?
            </h2>
            
            <div className="backdrop-blur-sm bg-white/20 rounded-xl p-4 sm:p-6 border border-[#191C0F]/10 mb-4">
              <time className="text-sm sm:text-base md:text-lg font-bold text-[#222] tracking-wide uppercase block text-center" dateTime="2025-11-22">
                22 Y 23 DE NOVIEMBRE / 2025
              </time>
            </div>
            
            <div className="text-xs sm:text-sm md:text-base leading-relaxed text-[#13160c] font-medium space-y-3">
              <div className="backdrop-blur-sm bg-white/20 rounded-lg p-3 sm:p-4 border border-[#191C0F]/10">
                <p>
                  El Centro de Felicidad de Chapinero será la sede del Festival NATUR 2025. Un lugar que no solo representa lo mejor de la arquitectura moderna, sino también un modelo de inclusión, cultura, bienestar y sostenibilidad.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/20 rounded-lg p-3 sm:p-4 border border-[#191C0F]/10">
                <p>
                  Ubicado en el corazón de la zona financiera y gastronómica de Bogotá, el CEFE es el primer parque vertical de América Latina, con 10 pisos dedicados a la recreación, el arte, el deporte y el conocimiento.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/20 rounded-lg p-3 sm:p-4 border border-[#191C0F]/10">
                <p>
                  Con un promedio de 2.000 visitantes diarios (sin contar eventos especiales), el CEFE de Chapinero es hoy uno de los espacios más dinámicos y emblemáticos de la ciudad. El Festival NATUR llega al lugar perfecto para inspirar, conectar y transformar el futuro del turismo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}