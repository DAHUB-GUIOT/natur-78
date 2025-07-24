
import React from 'react';
import { Button } from "@/components/ui/button";
import { Heart as HeartIcon } from "lucide-react";

export const HeartBanner = () => {
  return (
    <div className="relative h-[180px] w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{
          backgroundImage: "url('/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg')",
          filter: "brightness(0.7)"
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-transparent z-10" />

      <div className="relative z-20 h-full flex flex-col justify-center px-6">
        <div className="max-w-2xl">
          <h2 className="text-xl md:text-2xl text-white font-gasoek mb-2">
            Panel Corazón NATUR
          </h2>
          
          <p className="text-sm md:text-base text-white/90 mb-3 max-w-xl">
            Revisa las causas benéficas y apoya el desarrollo sostenible de comunidades
          </p>
          
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Explorar Causas <HeartIcon size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};
