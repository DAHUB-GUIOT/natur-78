import React from "react";
export function Award() {
  return <section className="w-full bg-[#F5F4E4] font-jakarta">
      <div className="flex flex-col md:flex-row max-md:items-stretch">
        {/* Left: Hero */}
        <div className="relative w-full md:w-1/2 flex min-h-[540px] max-md:min-h-[420px]">
          {/* New Background Image */}
          <img src="/lovable-uploads/c3a75ff8-9113-437d-a3a4-4229e6ee5fcd.png" alt="Premio Natur fondo" className="absolute inset-0 w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 flex flex-col justify-center h-full w-full px-6 sm:px-10 md:px-12 py-10 md:py-0">
            <h1 className="font-gasoek text-center text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-normal leading-tight tracking-[2px] uppercase max-w-[90vw] mb-8 sm:mb-10 md:mb-12 text-slate-50">
              POSTÚLATE<br />
              AL PREMIO<br />
              NATUR
            </h1>
            <div className="text-[#FCF8EE] text-sm md:text-base font-jakarta font-normal tracking-wide leading-relaxed mb-8 md:mb-10 max-w-[400px]">
              MÁS QUE UN PREMIO, UN RECONOCIMIENTO QUE INSPIRA Y VISIBILIZA LO QUE MERECE MULTIPLICARSE. PORQUE OTRO TURISMO ES POSIBLE… Y YA ESTÁ PASANDO.
            </div>
            <a href="#" className="inline-block bg-[#E6EF92] hover:bg-[#e1f85b] transition text-[#191C0F] text-sm sm:text-base font-bold py-3 px-8 rounded-none shadow-md font-jakarta tracking-tight uppercase">
              RESERVA TU STAND PARA PARTICIPAR
            </a>
          </div>
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-1/2 flex flex-col p-6 sm:p-10 md:p-14 justify-center max-md:mt-0">
          <p className="text-[#202111] text-base sm:text-lg md:text-xl font-medium mb-10 max-w-[600px]">
            El Premio NATUR nace para celebrar a las personas, empresas y territorios que están transformando el turismo en Colombia. Queremos reconocer lo valiente, lo innovador, lo auténtico y lo sostenible.
          </p>

          <h2 className="font-jakarta text-[#202111] text-xl sm:text-2xl md:text-3xl font-bold mb-3 tracking-[0]">
            ¿QUÉ RECONOCE EL PREMIO NATUR?
          </h2>
          <ul className="list-disc pl-6 mb-10 text-base sm:text-lg md:text-xl text-[#202111] font-medium leading-[1.8]">
            <li>Experiencias turísticas sostenibles y regenerativas.</li>
            <li>Proyectos comunitarios que conectan cultura, naturaleza y educación.</li>
            <li>Empresas que han hecho de la sostenibilidad su propósito.</li>
            <li>Iniciativas de conservación lideradas por guías, fundaciones o colectivos.</li>
          </ul>

          <h2 className="font-jakarta text-[#202111] text-xl sm:text-2xl md:text-3xl font-bold mb-3 mt-6 tracking-[0]">
            UN JURADO CON PROPÓSITO:
          </h2>
          <p className="text-[#202111] text-base sm:text-lg font-medium mb-7 max-w-[500px]">
            El premio contará con el respaldo y la evaluación de:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 max-w-[400px]">
            {/* Jury slots for layout visual only */}
            {Array(4).fill(null).map((_, i) => <div key={i} className="bg-[#E6EF92] h-[72px] sm:h-[80px] w-full rounded-lg"></div>)}
          </div>
          <a href="#download" className="block underline text-[#c9201a] text-base sm:text-lg font-bold font-jakarta mt-3 hover:text-[#a51813] transition">
            DESCARGA AQUÍ EL INSTRUCTIVO PARA PARTICIPAR
          </a>
        </div>
      </div>
    </section>;
}