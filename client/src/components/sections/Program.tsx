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
  return <section className="bg-[#222408] flex w-full flex-col items-center text-[#AEC32D] font-normal uppercase justify-center px-4 sm:px-6 md:px-12 py-12 md:py-16 lg:py-20 max-md:max-w-full">
      <div className="flex w-full max-w-5xl flex-col items-center">
        <h2 style={{
        lineHeight: 1.1,
        fontWeight: 700,
        letterSpacing: 1.5
      }} className="font-gasoek text-[#EDFF60] text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal leading-tight tracking-wide uppercase max-w-[90vw] mb-6 sm:mb-8 md:mb-10">
          ¿QUÉ VAS A ENCONTRAR?
        </h2>

        <div className="self-stretch text-sm sm:text-base md:text-lg font-light tracking-wide leading-relaxed mt-4 sm:mt-6 md:mt-8 max-md:max-w-full">
          {programSections.map((section, index) => <div key={index} className="items-stretch backdrop-blur-sm bg-white/5 flex w-full flex-col justify-center mt-3 md:mt-4 p-4 sm:p-6 md:p-8 rounded-xl border border-[#AEC32D]/30 hover:border-[#EDFF60]/60 transition-all duration-300 cursor-pointer hover:bg-white/10" onClick={() => setOpenSection(openSection === index ? null : index)}>
              <div className="flex w-full items-center gap-3 sm:gap-4 md:gap-5 flex-wrap max-md:max-w-full">
                <img src={section.icon} alt="" className="aspect-[1] object-contain w-8 sm:w-10 md:w-12 self-stretch shrink-0 my-auto" />
                <h3 className="font-unbounded text-sm sm:text-base md:text-lg text-[#EDFF60] font-medium uppercase flex-1 shrink basis-[0%] my-auto max-md:max-w-full tracking-wide">
                  {section.title}
                </h3>
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/6dd45f1f46a91f08b2a1c1c9537d3dc186db8cf6?placeholderIfAbsent=true" alt="Toggle" className={`aspect-[1] object-contain w-6 sm:w-7 md:w-8 self-stretch shrink-0 my-auto transform transition-transform ${openSection === index ? "rotate-180" : ""}`} />
              </div>
              {openSection === index && <p className="font-jakarta-light mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-[#FCF8EE] normal-case leading-relaxed">
                  {section.content}
                </p>}
            </div>)}
        </div>

        <div className="mt-6 sm:mt-8 md:mt-10 max-w-4xl mx-auto">
          <h4 className="font-unbounded text-[#EDFF60] text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight tracking-wide">CONÉCTATE, APRENDE, INSPÍRATE, DISFRUTA.</h4>
        </div>
      </div>
    </section>;
}