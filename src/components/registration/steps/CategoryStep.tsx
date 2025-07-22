
import React from "react";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, UserPlus, Rocket } from "lucide-react";
import { CategoryType } from "../RegistrationForm";

interface CategoryStepProps {
  onCategorySelect: (category: CategoryType) => void;
}

const CategoryStep = ({ onCategorySelect }: CategoryStepProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-gasoek text-[#EDFF60] tracking-wide uppercase text-center">
        ¿Cómo quieres participar en NATUR?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          className="p-6 border border-[#FCF8EE]/20 hover:border-[#EDFF60] rounded-lg cursor-pointer transition-all duration-300"
          onClick={() => onCategorySelect("attendee")}
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="text-[#EDFF60] p-3 bg-[#EDFF60]/10 rounded-full">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-[#FCF8EE] font-semibold text-xl">
              Asistir al evento
            </h3>
            <p className="text-[#FCF8EE]/80 text-sm">
              Quiero aprender más sobre turismo regenerativo
            </p>
          </div>
        </div>
        
        <div 
          className="p-6 border border-[#FCF8EE]/20 hover:border-[#EDFF60] rounded-lg cursor-pointer transition-all duration-300"
          onClick={() => onCategorySelect("sponsor")}
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="text-[#EDFF60] p-3 bg-[#EDFF60]/10 rounded-full">
              <Briefcase className="w-8 h-8" />
            </div>
            <h3 className="text-[#FCF8EE] font-semibold text-xl">
              Ser sponsor o patrocinador
            </h3>
            <p className="text-[#FCF8EE]/80 text-sm">
              Quiero poner un stand o apoyar el evento
            </p>
          </div>
        </div>
        
        <div 
          className="p-6 border border-[#FCF8EE]/20 hover:border-[#EDFF60] rounded-lg cursor-pointer transition-all duration-300"
          onClick={() => onCategorySelect("ecosystem")}
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="text-[#EDFF60] p-3 bg-[#EDFF60]/10 rounded-full">
              <UserPlus className="w-8 h-8" />
            </div>
            <h3 className="text-[#FCF8EE] font-semibold text-xl">
              Hacer parte del ecosistema
            </h3>
            <p className="text-[#FCF8EE]/80 text-sm">
              Soy parte del turismo regenerativo
            </p>
          </div>
        </div>
        
        <div 
          className="p-6 border border-[#FCF8EE]/20 hover:border-[#EDFF60] rounded-lg cursor-pointer transition-all duration-300"
          onClick={() => onCategorySelect("startup")}
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="text-[#EDFF60] p-3 bg-[#EDFF60]/10 rounded-full">
              <Rocket className="w-8 h-8" />
            </div>
            <h3 className="text-[#FCF8EE] font-semibold text-xl">
              Registrar mi startup
            </h3>
            <p className="text-[#FCF8EE]/80 text-sm">
              Tengo una startup con componente sostenible en turismo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryStep;
