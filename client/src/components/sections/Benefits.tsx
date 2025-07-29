import React from "react";
import { Link } from "wouter";
export function Benefits() {
  const benefits = [{
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c69e9adba6c070477cebd9fa2a2d900202f74818?placeholderIfAbsent=true",
    text: "Conecta con miles de viajeros nacionales e internacionales"
  }, {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/77da086c458e7a055f711533f153729396cdc857?placeholderIfAbsent=true",
    text: "Posiciona tu marca como líder en turismo responsable"
  }, {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/9967137825a6f453e31c4fc499e6729f62911763?placeholderIfAbsent=true",
    text: "Logra visibilidad en medios, redes y plataformas especializadas"
  }, {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8bcac0a4de12f1365c5f69d00ad8ff01bee9300e?placeholderIfAbsent=true",
    text: "Obtén el Premio NATUR de sostenibilidad"
  }, {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8f87935114a9bd2b9c7e0f05fd2788725034ada5?placeholderIfAbsent=true",
    text: "Accede a ruedas de negocio y oportunidades comerciales"
  }, {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d6a793563b4e94b8666faeecc1dbe1a8188a48d2?placeholderIfAbsent=true",
    text: "Sé parte del movimiento que está cambiando el turismo en Colombia"
  }];
  return <section className="bg-[#222408] flex w-full flex-col text-base sm:text-lg md:text-xl text-[#FCF8EE] font-medium justify-center px-4 sm:px-6 md:px-12 py-12 md:py-16 lg:py-20 max-md:max-w-full font-jakarta">
      <div className="flex w-full max-w-6xl mx-auto flex-col items-center">
        <h2 style={{
        letterSpacing: 1.5
      }} className="font-gasoek text-[#EDFF60] text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal leading-tight tracking-wide uppercase max-w-[90vw] mb-6 sm:mb-8 md:mb-10">¿POR QUÉ SER PARTE DE ESTA TRIBU?</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full mt-4 sm:mt-6 md:mt-8">
          {benefits.map((benefit, index) => <div key={index} className="backdrop-blur-sm bg-white/5 border border-[#EDFF60]/20 rounded-xl p-4 sm:p-5 md:p-6 hover:border-[#EDFF60]/40 transition-all duration-300 hover:bg-white/10">
              <div className="flex items-start gap-3 md:gap-4">
                <img src={benefit.icon} alt="" className="w-8 sm:w-10 md:w-12 aspect-square object-contain shrink-0 mt-1" />
                <div className="grow font-jakarta text-xs sm:text-sm md:text-base text-[#FCF8EE] leading-relaxed">
                  {benefit.text}
                </div>
              </div>
            </div>)}
        </div>

        <Link to="/reserva" className="
            bg-[#EDFF60] text-black w-full max-w-[90vw] sm:max-w-[320px] 
            text-sm sm:text-base
            text-center uppercase tracking-wide font-bold
            mt-6 sm:mt-8 md:mt-10
            px-6 py-3 sm:px-8 sm:py-4 
            hover:bg-[#EDFF60]/90 transition-all duration-300
            font-unbounded rounded-lg shadow-lg
          ">
          ¡Reserva tu stand o patrocina!
        </Link>

        <div className="backdrop-blur-sm bg-white/5 border border-[#EDFF60]/20 rounded-xl p-4 sm:p-6 mt-6 sm:mt-8 md:mt-10 max-w-4xl">
          <h4 className="text-center leading-5 sm:leading-6 md:leading-7 tracking-wide font-unbounded text-xs sm:text-sm md:text-base text-[#EDFF60]">
            El Festival NATUR es el punto de encuentro entre la sostenibilidad, el turismo y la innovación. Aquí convergen viajeros, empresas y destinos que creen en el turismo como fuerza transformadora.
          </h4>
        </div>
      </div>
    </section>;
}