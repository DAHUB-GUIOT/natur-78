import React from "react";
import { Link } from "react-router-dom";
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
  return <section className="bg-[#222408] flex w-full flex-col text-base sm:text-lg md:text-xl text-[#FCF8EE] font-medium justify-center px-4 sm:px-6 md:px-20 py-8 sm:py-10 md:py-[100px] lg:py-[131px] max-md:max-w-full font-jakarta">
      <div className="flex w-full max-w-[1476px] flex-col items-center">
        <h2 style={{
        letterSpacing: 2
      }} className="font-gasoek text-[#EDFF60] text-center text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-normal leading-tight tracking-[2px] uppercase max-w-[90vw] mb-8 sm:mb-10 md:mb-12">¿POR QUÉ SER PARTE DE ESTA TRIBU ?</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 w-full mt-6 sm:mt-8 md:mt-16 lg:mt-32">
          {benefits.map((benefit, index) => <div key={index} className="flex items-start gap-4 md:gap-6 lg:gap-10 p-4 sm:p-6 md:p-8 rounded-none bg-transparent">
              <img src={benefit.icon} alt="" className="w-[40px] sm:w-[50px] md:w-[70px] lg:w-[82px] aspect-square object-contain shrink-0" />
              <div className="grow shrink my-auto font-jakarta text-sm sm:text-base md:text-lg lg:text-xl text-[#FCF8EE] leading-snug sm:leading-relaxed">
                {benefit.text}
              </div>
            </div>)}
        </div>

        <Link to="/reserva" className="
            bg-[#B92F09] w-full max-w-[90vw] sm:max-w-[401px] 
            text-sm sm:text-base text-[#FFD5C7] 
            text-center uppercase tracking-[-0.3px] 
            mt-8 sm:mt-10 md:mt-16 lg:mt-24
            px-6 py-4 sm:px-8 sm:py-6 
            hover:bg-[#A62A08] transition-colors 
            font-unbounded font-bold
          ">
          ¡Reserva tu stand o patrocina!
        </Link>

        <p className="text-center leading-6 sm:leading-7 md:leading-8 tracking-[1.6px] uppercase mt-8 sm:mt-10 md:mt-16 max-w-[90vw] font-unbounded text-sm sm:text-base font-light">
          El Festival NATUR es el punto de encuentro entre la sostenibilidad, el turismo y la innovación. Aquí convergen viajeros, empresas y destinos que creen en el turismo como fuerza transformadora.
        </p>
      </div>
    </section>;
}