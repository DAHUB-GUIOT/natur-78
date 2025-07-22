import React from "react";
export function Location() {
  return <section className="w-full font-jakarta bg-[#e6f0c1] py-0 m-0">
      <div className="flex flex-col md:flex-row max-w-full mx-auto">
        {/* Left: Background Image with headline */}
        <div className="relative w-full md:w-[47%] min-h-[420px] md:min-h-[880px] bg-black">
          <img src="/lovable-uploads/0ac8a159-001e-4075-a31f-7892520a10b2.png" alt="CEFE Chapinero Architecture" className="w-full h-full object-cover block opacity-85" style={{
          minHeight: "420px",
          maxHeight: "989px"
        }} />
          <div className="absolute inset-0 flex flex-col justify-end bg-black bg-opacity-25">
            <div className="p-6 pb-8 sm:p-10 md:p-14">
              <h1 className="font-gasoek text-center text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-normal leading-tight tracking-[2px] uppercase max-w-[90vw] mb-8 sm:mb-10 md:mb-12 text-zinc-50">
                CEFE{"\n"}CHAPINERO
              </h1>
            </div>
          </div>
        </div>
        
        {/* Right: Info Panel */}
        <div className="flex items-stretch w-full md:w-[53%] bg-[#CEDD9F] min-h-[420px]">
          <div className="flex flex-col justify-center w-full p-6 py-10 sm:p-10 md:p-12 lg:p-14">
            <h2 style={{
            letterSpacing: 2
          }} className="font-gasoek text-center text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-normal leading-tight tracking-[2px] uppercase max-w-[90vw] mb-8 sm:mb-10 md:mb-12 text-zinc-950">
              ¿Cuándo y <br className="sm:hidden" />dónde?
            </h2>
            <time className="text-base sm:text-lg md:text-xl font-medium text-[#222] tracking-wide uppercase mb-8 mt-1" dateTime="2025-11-22">
              22 Y 23 DE NOVIEMBRE / 2025
            </time>
            <div className="text-sm sm:text-base md:text-lg leading-relaxed text-[#13160c] font-medium space-y-3 max-w-[95%]">
              <p>
                El Centro de Felicidad de Chapinero será la sede del Festival NATUR 2025. Un lugar que no solo representa lo mejor de la arquitectura moderna, sino también un modelo de inclusión, cultura, bienestar y sostenibilidad.
              </p>
              <p>
                Ubicado en el corazón de la zona financiera y gastronómica de Bogotá, el CEFE es el primer parque vertical de América Latina, con 10 pisos dedicados a la recreación, el arte, el deporte y el conocimiento.
              </p>
              <p>
                Con un promedio de 2.000 visitantes diarios (sin contar eventos especiales), el CEFE de Chapinero es hoy uno de los espacios más dinámicos y emblemáticos de la ciudad. El Festival NATUR llega al lugar perfecto para inspirar, conectar y transformar el futuro del turismo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
}