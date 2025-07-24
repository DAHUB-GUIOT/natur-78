
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export const AcceleradoraBanner = () => {
  return (
    <div className="relative h-[220px] w-full overflow-hidden mb-8">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{
          backgroundImage: "url('/lovable-uploads/77c65fac-fd99-4467-8049-68be605c4770.png')",
          filter: "brightness(0.7)"
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-transparent z-10" />

      <div className="relative z-20 h-full flex flex-col justify-center px-6">
        <div className="max-w-2xl">
          <h2 className="text-xl md:text-3xl text-white font-gasoek mb-2">
            Acceleradora NATUR
          </h2>
          
          <p className="text-sm md:text-base text-white/90 mb-4 max-w-xl">
            Impulsamos emprendimientos sostenibles y regenerativos, proporcionando herramientas, mentorías y capital para transformar ideas en proyectos de alto impacto.
          </p>
          
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Aplica ahora <FileText className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
