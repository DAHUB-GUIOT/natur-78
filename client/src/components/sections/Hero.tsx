
import React from "react";
import { Link } from "wouter";

export function Hero() {
  return (
    <header className="flex flex-col relative min-h-[600px] sm:min-h-[690px] md:min-h-[860px] lg:min-h-[975px] w-full items-center text-white font-light text-center tracking-[1.92px] justify-center px-3 sm:px-8 md:px-20 py-12 sm:py-16 md:py-[115px] max-md:max-w-full font-jakarta">
      <img 
        alt="Festival NATUR Landscape" 
        className="absolute h-full w-full object-cover inset-0" 
        src="/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg" 
      />
      <div className="relative flex w-full max-w-[1069px] flex-col items-center z-10 my-0">
        <img 
          src="/lovable-uploads/850ef1ad-80eb-4c12-8ffc-c619372b301f.png" 
          alt="Festival NATUR Logo" 
          className="
            w-[280px] h-auto mb-6
            sm:w-[460px] sm:mb-8 
            md:w-[570px] md:mb-10
            lg:w-[700px] lg:mb-12
            max-w-[90vw]
            object-contain
            transition-all
          " 
        />
        <Link 
          to="/reserva"
          className="
            bg-[#EDFF60] w-full max-w-[90vw] sm:max-w-[401px] 
            text-sm sm:text-base text-[#222408] 
            font-medium uppercase tracking-[-0.3px] 
            px-6 py-4 sm:px-8 sm:py-6 
            hover:bg-[#E5F73D] transition-colors 
            font-jakarta
          " 
        >
          ¡QUIERO SER PARTE!
        </Link>
      </div>
    </header>
  );
}
