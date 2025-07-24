
import React from "react";

export function About() {
  return (
    <section className="bg-[#CEDD9F] flex w-full flex-col items-center justify-center px-4 sm:px-6 md:px-12 py-12 md:py-16 lg:py-20 max-md:max-w-full font-jakarta">
      <div className="mb-0 w-full max-w-5xl max-md:max-w-full">
        <div className="gap-8 flex max-md:flex-col max-md:items-stretch">
          <div className="w-full md:w-[40%] max-md:w-full max-md:ml-0">
            <h1
              style={{
                letterSpacing: 1.5
              }}
              className="font-gasoek
                text-[#191C0F] 
                font-normal 
                uppercase 
                text-2xl leading-[2.2rem]
                sm:text-3xl sm:leading-[2.8rem]
                md:text-4xl md:leading-[3.2rem]
                lg:text-5xl lg:leading-[4rem]
                xl:text-6xl xl:leading-[4.8rem]
                max-md:max-w-full 
                max-md:mt-0
                tracking-wide"
            >
              ¿Quienes somos?
            </h1>
          </div>
          <div className="w-full md:w-[60%] md:ml-5 max-md:w-full max-md:ml-0">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-[#191C0F]/10">
              <p className="text-[#191C0F] text-sm sm:text-base md:text-lg font-medium leading-6 sm:leading-7 md:leading-8 tracking-[-0.1px] max-md:max-w-full font-jakarta">
                Nacemos con la convicción de que viajar puede ser un acto de conservación, aprendizaje y regeneración. Promovemos un turismo que protege la biodiversidad, honra las culturas locales y genera bienestar para comunidades y territorios.
              </p>
              <div className="w-full h-px bg-[#191C0F]/20 my-4"></div>
              <p className="text-[#191C0F] text-sm sm:text-base md:text-lg font-medium leading-6 sm:leading-7 md:leading-8 tracking-[-0.1px] max-md:max-w-full font-jakarta">
                El turismo en Colombia debe convertirse en una herramienta para salvaguardar nuestro patrimonio natural y cultural, y sabemos que la difusión, la educación y el trabajo colectivo son las claves para lograrlo.
              </p>
              <div className="w-full h-px bg-[#191C0F]/20 my-4"></div>
              <p className="text-[#191C0F] text-sm sm:text-base md:text-lg font-medium leading-6 sm:leading-7 md:leading-8 tracking-[-0.1px] max-md:max-w-full font-jakarta">
                Así nace el Festival NATUR: una plataforma donde confluyen agencias, destinos, viajeros, organizaciones, emprendedores y soñadores que creen en un modelo de turismo más consciente, humano y sostenible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
