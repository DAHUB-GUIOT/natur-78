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
  return <section className="flex w-full flex-col items-center justify-center px-3 sm:px-6 md:px-20 py-8 md:py-[65px] lg:py-[92px] max-md:max-w-full font-jakarta bg-neutral-50">
      <div className="flex w-full max-w-[1251px] flex-col items-center">
        <h2 className="font-gasoek text-[#6D7A4E] text-center text-2xl sm:text-4xl md:text-7xl font-normal leading-none uppercase max-md:max-w-full max-md:text-[40px] tracking-[0]">
          nuestros aliados
        </h2>

        <div className="self-stretch grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 md:gap-5 mt-10 md:mt-24 max-md:mt-10 justify-center items-center">
          {partnerLogos.slice(0, 7).map((logo, index) => <div key={index} className="aspect-[1.74] h-[42px] sm:h-[60px] md:h-[82px] transition-colors cursor-pointer flex items-center justify-center p-2 bg-stone-50">
              <img src={logo} alt={`Partner ${index + 1}`} className="h-full w-full object-contain" />
            </div>)}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 md:gap-5 mt-8 md:mt-12 max-md:mt-10 justify-center items-center">
          {partnerLogos.slice(7).map((logo, index) => <div key={index} className="aspect-[1.74] h-[42px] sm:h-[60px] md:h-[82px] transition-colors cursor-pointer flex items-center justify-center p-2 bg-stone-50">
              <img src={logo} alt={`Partner ${index + 8}`} className="h-full w-full object-contain" />
            </div>)}
        </div>
      </div>
    </section>;
}