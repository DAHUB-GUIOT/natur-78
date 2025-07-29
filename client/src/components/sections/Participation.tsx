
import React from "react";
import { Link } from "wouter";
const PARTICIPANTS = ["Agencias y operadores", "Hoteles y hostales", "Emprendimientos de turismo comunitario o local", "Guías turísticos", "Proyectos, fundaciones y organizaciones", "Empresas comprometidos con la sostenibilidad", "Instituciones gubernamentales y atractivos turísticos", "Restaurantes con proposito", "Startups"];
export function Participation() {
  return <section className="w-full px-4 sm:px-6 md:px-12 py-12 md:py-16 lg:py-20 flex justify-center items-center font-jakarta bg-[#191c0f]">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 md:gap-8">
          <h1 style={{
          lineHeight: 1.1,
          fontWeight: 700,
          letterSpacing: 1.5
        }} className="font-gasoek text-[#cad95e] text-center lg:text-left text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal leading-tight tracking-wide uppercase mb-4 sm:mb-6">
            BUSCAMOS INICIATIVAS QUE HAGAN TURISMO SOSTENIBLE
          </h1>

          <div className="lg:w-[40%]">
            <h4 className="text-[#CEDD9F] text-xs sm:text-sm md:text-base tracking-wide leading-relaxed"
                style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: '300' }}>
              Si haces parte de la cadena turística y quieres aprender del turismo con propósito, este festival es para ti
            </h4>
          </div>
        </div>

        {/* Participants Grid */}
        <div className="w-full mt-8 md:mt-12 flex flex-col items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 w-full">
            {PARTICIPANTS.map((label, idx) => <div key={idx} className="backdrop-blur-sm bg-white/5 border border-[#CEDD9F]/30 rounded-none text-[#CEDD9F] text-center font-jakarta text-sm sm:text-base md:text-lg font-medium px-4 py-6 sm:px-6 sm:py-8 flex items-center justify-center hover:border-[#cad95e]/60 hover:bg-white/10 transition-all duration-300">
                {label}
              </div>)}
          </div>
        </div>

        {/* Button */}
        <div className="w-full flex justify-center mt-8 md:mt-12">
          <Link to="/reserva" className="w-full max-w-[400px] bg-[#cad95e] text-[#232611] rounded-none text-sm sm:text-base md:text-lg font-bold uppercase px-6 py-3 sm:px-8 sm:py-4 tracking-tight hover:bg-[#cad95e]/90 transition-all duration-300 shadow-lg text-center" style={{
          letterSpacing: 0,
          fontFamily: 'Unbounded, sans-serif',
          fontWeight: '300'
        }}>
            ¡Reserva tu stand o patrocina!
          </Link>
        </div>
      </div>
    </section>;
}
