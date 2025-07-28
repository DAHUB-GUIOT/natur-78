import React from "react";
const partnerLogos = ["/lovable-uploads/04700395-8fa8-4aaa-8e0f-2499715a6016.png",
// Camara de Comercio
"/lovable-uploads/82486c47-640c-497b-a6e3-7e218da4868a.png",
// Capital Turismo
"/lovable-uploads/a966ce20-3e42-4f79-bb18-32bdb9aef310.png",
// El Tiempo
"/lovable-uploads/029db5e8-a1fb-4c6c-ab9f-a6c2cefaa99a.png",
// EE
"/lovable-uploads/88f36f50-dff1-4c0c-a909-e6e073b6b80e.png",
// Prosierra
"/lovable-uploads/fbe328a3-9693-4e98-aba3-6915b86a23b4.png",
// Live Happy
"/lovable-uploads/c42792d2-c891-4c5f-9e17-5e10c02dd85c.png",
// Cerros Bogota
"/lovable-uploads/b5b37f28-840d-4fcf-97c7-79446d8d7767.png",
// RTVC
"/lovable-uploads/5fa2b81d-c76e-4674-8146-eb35c5acd256.png" // IDARTES
];
export function Partners() {
  return <section className="flex w-full flex-col items-center justify-center px-4 sm:px-6 md:px-12 py-12 md:py-16 lg:py-20 max-md:max-w-full font-jakarta bg-neutral-50">
      <div className="flex w-full max-w-6xl flex-col items-center">
        <h2 className="font-gasoek text-[#6D7A4E] text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal leading-none uppercase mb-8 sm:mb-10 md:mb-12 tracking-wide">
          NUESTROS ALIADOS
        </h2>

        <div className="backdrop-blur-sm bg-white/20 rounded-2xl p-4 sm:p-6 md:p-8 border border-[#6D7A4E]/10 w-full">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 sm:gap-4 justify-center items-center">
            {partnerLogos.slice(0, 7).map((logo, index) => <div key={index} className="aspect-[1.6] h-[35px] sm:h-[45px] md:h-[55px] transition-all duration-300 cursor-pointer flex items-center justify-center p-2 bg-white rounded-lg shadow-sm hover:shadow-md hover:scale-105">
                <img src={logo} alt={`Partner ${index + 1}`} className="h-full w-full object-contain" />
              </div>)}
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 sm:gap-4 mt-4 sm:mt-6 justify-center items-center">
            {partnerLogos.slice(7).map((logo, index) => <div key={index} className="aspect-[1.6] h-[35px] sm:h-[45px] md:h-[55px] transition-all duration-300 cursor-pointer flex items-center justify-center p-2 bg-white rounded-lg shadow-sm hover:shadow-md hover:scale-105">
                <img src={logo} alt={`Partner ${index + 8}`} className="h-full w-full object-contain" />
              </div>)}
          </div>
        </div>
        
        <div className="backdrop-blur-sm bg-[#EDFF60]/20 rounded-xl p-4 sm:p-6 mt-6 sm:mt-8 border border-[#6D7A4E]/10 max-w-4xl">
          <p className="text-center text-xs sm:text-sm md:text-base text-[#6D7A4E] font-medium leading-relaxed">
            Trabajamos junto a organizaciones comprometidas con el turismo sostenible y la conservación ambiental en Colombia.
          </p>
        </div>
      </div>
    </section>;
}