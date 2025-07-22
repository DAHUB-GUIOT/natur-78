import React, { useState } from "react";
export function Program() {
  const [openSection, setOpenSection] = useState<number | null>(null);
  const programSections = [{
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/9aa4c09513a8f8b7186acc435c2e81b4e2093a2e?placeholderIfAbsent=true",
    title: "Agenda académica",
    content: "Conferencias, talleres y paneles sobre turismo sostenible"
  }, {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5719a2e82cbd26f2a191685bd082642b93367bae?placeholderIfAbsent=true",
    title: "rueda de negocios y networking",
    content: "Espacios para conectar con otros profesionales del sector"
  }, {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/9736459f098ac64cbf12406f750d1af2e38b7397?placeholderIfAbsent=true",
    title: "Actividades culturales y esparcimiento",
    content: "Experiencias únicas que celebran nuestra cultura"
  }];
  return <section className="bg-[#222408] flex w-full flex-col items-center text-[#AEC32D] font-normal uppercase justify-center px-3 sm:px-6 md:px-20 py-10 md:py-[100px] lg:py-[109px] max-md:max-w-full max-md:pt-[100px]">
      <div className="flex w-full max-w-[1298px] flex-col items-center">
        <h2 style={{
        lineHeight: 1.02,
        fontWeight: 700,
        letterSpacing: 2
      }} className="font-gasoek text-[#EDFF60] text-center text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-normal leading-tight tracking-[2px] uppercase max-w-[90vw] mb-8 sm:mb-10 md:mb-12">
          ¿qué vas a encontrar?
        </h2>

        <div className="self-stretch text-lg sm:text-2xl md:text-[32px] font-light tracking-[1.2px] md:tracking-[2.56px] leading-[35px] sm:leading-[45px] md:leading-[51px] mt-8 md:mt-[93px] max-md:max-w-full max-md:mt-10">
          {programSections.map((section, index) => <div key={index} className="items-stretch bg-[#222408] flex w-full flex-col justify-center mt-5 md:mt-6 p-5 sm:p-10 md:p-12 rounded-2xl md:rounded-3xl border border-[#AEC32D] hover:border-[#EDFF60] transition-colors cursor-pointer" onClick={() => setOpenSection(openSection === index ? null : index)}>
              <div className="flex w-full items-center gap-4 sm:gap-6 flex-wrap max-md:max-w-full">
                <img src={section.icon} alt="" className="aspect-[1] object-contain w-[45px] sm:w-[60px] md:w-[82px] self-stretch shrink-0 my-auto" />
                <h3 className="font-unbounded text-base sm:text-lg md:text-2xl text-[#EDFF60] font-light uppercase flex-1 shrink basis-[0%] my-auto max-md:max-w-full tracking-[8%]">
                  {section.title}
                </h3>
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/6dd45f1f46a91f08b2a1c1c9537d3dc186db8cf6?placeholderIfAbsent=true" alt="Toggle" className={`aspect-[1] object-contain w-9 sm:w-[50px] md:w-[70px] self-stretch shrink-0 my-auto transform transition-transform ${openSection === index ? "rotate-180" : ""}`} />
              </div>
              {openSection === index && <p className="font-jakarta mt-4 md:mt-6 text-base sm:text-lg md:text-xl font-light text-[#FCF8EE] normal-case">
                  {section.content}
                </p>}
            </div>)}
        </div>

        <h1 style={{
        lineHeight: 1.02,
        fontWeight: 700,
        letterSpacing: 0
      }} className="font-gasoek text-[#EDFF60] text-center text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-normal leading-tight tracking-[2px] uppercase max-w-[90vw] mb-8 sm:mb-10 md:mb-12 px-[46px] py-[52px]">CONÉCTATE, APRENDE, INSPÍRATE, DISFRUTA.</h1>
      </div>
    </section>;
}