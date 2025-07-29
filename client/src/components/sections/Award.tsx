import React from "react";
export function Award() {
  return <section className="w-full bg-[#F5F4E4] font-jakarta">
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
        {/* Left: Hero */}
        <div className="relative w-full lg:w-1/2 flex min-h-[350px] md:min-h-[450px]">
          {/* New Background Image */}
          <img src="/lovable-uploads/c3a75ff8-9113-437d-a3a4-4229e6ee5fcd.png" alt="Premio Natur fondo" className="absolute inset-0 w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 flex flex-col justify-center h-full w-full px-4 sm:px-6 md:px-8 py-6 md:py-8">
            <h1 className="font-gasoek text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal leading-tight tracking-wide uppercase mb-6 sm:mb-8 text-slate-50">
              POSTÚLATE<br />
              AL PREMIO<br />
              NATUR
            </h1>
            <div className="backdrop-blur-sm bg-white/10 rounded-xl p-4 sm:p-5 border border-white/20 mb-6">
              <h4 className="text-[#FCF8EE] text-xs sm:text-sm md:text-base font-unbounded tracking-wide leading-relaxed">
                MÁS QUE UN PREMIO, UN RECONOCIMIENTO QUE INSPIRA Y VISIBILIZA LO QUE MERECE MULTIPLICARSE. PORQUE OTRO TURISMO ES POSIBLE… Y YA ESTÁ PASANDO.
              </h4>
            </div>
            <a href="#" className="inline-block bg-[#cad95e] hover:bg-[#cad95e]/90 transition text-[#191C0F] text-xs sm:text-sm font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-lg shadow-md font-jakarta tracking-tight uppercase text-center">
              RESERVA TU STAND PARA PARTICIPAR
            </a>
          </div>
        </div>

        {/* Right: Content */}
        <div className="w-full lg:w-1/2 flex flex-col p-4 sm:p-6 md:p-8 lg:p-10 justify-center">
          <div className="backdrop-blur-sm bg-white/20 rounded-xl p-4 sm:p-6 border border-[#202111]/10 mb-6">
            <p className="text-[#202111] text-sm sm:text-base md:text-lg font-medium">
              El Premio NATUR nace para celebrar a las personas, empresas y territorios que están transformando el turismo en Colombia. Queremos reconocer lo valiente, lo innovador, lo auténtico y lo sostenible.
            </p>
          </div>

          <div className="backdrop-blur-sm bg-white/20 rounded-xl p-4 sm:p-6 border border-[#202111]/10 mb-4">
            <h2 className="font-jakarta text-[#202111] text-base sm:text-lg md:text-xl font-bold mb-3 tracking-[0]">
              ¿QUÉ RECONOCE EL PREMIO NATUR?
            </h2>
            <ul className="list-disc pl-4 text-xs sm:text-sm md:text-base text-[#202111] font-medium leading-relaxed space-y-1">
              <li>Experiencias turísticas sostenibles y regenerativas.</li>
              <li>Proyectos comunitarios que conectan cultura, naturaleza y educación.</li>
              <li>Empresas que han hecho de la sostenibilidad su propósito.</li>
              <li>Iniciativas de conservación lideradas por guías, fundaciones o colectivos.</li>
            </ul>
          </div>

          <div className="backdrop-blur-sm bg-white/20 rounded-xl p-4 sm:p-6 border border-[#202111]/10 mb-4">
            <h2 className="font-jakarta text-[#202111] text-base sm:text-lg md:text-xl font-bold mb-3 tracking-[0]">
              UN JURADO CON PROPÓSITO:
            </h2>
            <p className="text-[#202111] text-xs sm:text-sm md:text-base font-medium mb-4">
              El premio contará con el respaldo y la evaluación de:
            </p>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
              {/* Jury slots for layout visual only */}
              {Array(4).fill(null).map((_, i) => <div key={i} className="bg-[#cad95e] h-[40px] sm:h-[50px] w-full rounded-lg"></div>)}
            </div>
          </div>
          
          <a href="#download" className="block bg-[#cad95e] hover:bg-[#cad95e]/90 transition text-[#191C0F] text-xs sm:text-sm font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg text-center font-jakarta tracking-tight uppercase">
            DESCARGA AQUÍ EL INSTRUCTIVO PARA PARTICIPAR
          </a>
        </div>
      </div>
    </section>;
}