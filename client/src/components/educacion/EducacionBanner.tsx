
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const EducacionBanner = () => {
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

      <div className="relative z-20 h-full flex flex-col justify-center">
        <div className="px-4 md:px-6">
          <h2 className="text-xl md:text-2xl text-white font-gasoek mb-2">
            Educación NATUR
          </h2>
          
          <p className="text-sm md:text-base text-white/90 mb-3 max-w-xl">
            Aprender para regenerar.
          </p>
          
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Explorar Recursos <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
