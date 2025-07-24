
import React from "react";

export function About() {
  return (
    <section className="bg-[#CEDD9F] flex w-full flex-col items-center justify-center px-3 sm:px-6 md:px-[70px] py-14 md:py-[100px] lg:py-[125px] max-md:max-w-full font-jakarta">
      <div className="mb-0 w-full max-w-[1294px] max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-full md:w-[45%] max-md:w-full max-md:ml-0">
            <h1
              style={{
                letterSpacing: 2
              }}
              className="font-gasoek
                text-[#191C0F] 
                font-normal 
                uppercase 
                text-[2rem] leading-[2.8rem]
                sm:text-3xl sm:leading-[2.6rem]
                md:text-5xl md:leading-[3.6rem]
                lg:text-7xl lg:leading-[5.5rem]
                2xl:text-8xl 2xl:leading-[6.2rem]
                max-md:max-w-full 
                max-md:mt-10
                tracking-[2px]"
            >
              ¿Quienes somos?
            </h1>
          </div>
          <div className="w-full md:w-[55%] md:ml-5 max-md:w-full max-md:ml-0">
            <p className="text-[#191C0F] text-base sm:text-lg md:text-xl font-medium leading-7 sm:leading-[30px] md:leading-[35px] tracking-[-0.22px] max-md:max-w-full max-md:mt-10 font-jakarta">
              Nacemos con la convicción de que viajar puede ser un acto de conservación, aprendizaje y regeneración. Promovemos un turismo que protege la biodiversidad, honra las culturas locales y genera bienestar para comunidades y territorios.
              <br /><br />
              El turismo en Colombia debe convertirse en una herramienta para salvaguardar nuestro patrimonio natural y cultural, y sabemos que la difusión, la educación y el trabajo colectivo son las claves para lograrlo.
              <br /><br />
              Así nace el Festival NATUR: una plataforma donde confluyen agencias, destinos, viajeros, organizaciones, emprendedores y soñadores que creen en un modelo de turismo más consciente, humano y sostenible.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
