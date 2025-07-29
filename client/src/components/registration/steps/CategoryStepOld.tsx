
import React from "react";
import { Button } from "@/components/ui/button";
import { Briefcase, UserPlus, Rocket } from "lucide-react";
import { CategoryType } from "../RegistrationForm";

interface CategoryStepProps {
  onCategorySelect: (category: CategoryType) => void;
}

const CategoryStep = ({ onCategorySelect }: CategoryStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 font-gasoek tracking-wide" style={{ color: '#EDFF60' }}>
          ¿QUÉ TIPO DE EMPRESA TIENES?
        </h2>
        <p className="text-lg font-medium" style={{ color: '#EDFF60' }}>
          Selecciona la categoría que mejor describe tu organización
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <div 
          className="p-6 border-2 border-[#EDFF60] hover:border-[#EDFF60] bg-transparent hover:bg-[#EDFF60]/5 rounded-xl cursor-pointer transition-all duration-300 backdrop-blur-sm"
          onClick={() => onCategorySelect("sponsor")}
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="p-4 border-2 border-[#EDFF60] rounded-full" style={{ backgroundColor: '#EDFF60' }}>
              <Briefcase className="w-8 h-8 text-black" />
            </div>
            <h3 className="font-bold text-xl" style={{ color: '#EDFF60' }}>
              Empresa de Turismo Sostenible
            </h3>
            <p className="text-base font-medium" style={{ color: '#EDFF60' }}>
              Ofrezco experiencias de ecoturismo, turismo rural o sostenible
            </p>
          </div>
        </div>
        
        <div 
          className="p-6 border-2 border-[#EDFF60] hover:border-[#EDFF60] bg-transparent hover:bg-[#EDFF60]/5 rounded-xl cursor-pointer transition-all duration-300 backdrop-blur-sm"
          onClick={() => onCategorySelect("ecosystem")}
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="p-4 border-2 border-[#EDFF60] rounded-full" style={{ backgroundColor: '#EDFF60' }}>
              <UserPlus className="w-8 h-8 text-black" />
            </div>
            <h3 className="font-bold text-xl" style={{ color: '#EDFF60' }}>
              Organización del Ecosistema
            </h3>
            <p className="text-base font-medium" style={{ color: '#EDFF60' }}>
              NGO, agencia, operador o institución en turismo regenerativo
            </p>
          </div>
        </div>
        
        <div 
          className="p-6 border-2 border-[#EDFF60] hover:border-[#EDFF60] bg-transparent hover:bg-[#EDFF60]/5 rounded-xl cursor-pointer transition-all duration-300 backdrop-blur-sm"
          onClick={() => onCategorySelect("startup")}
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="p-4 border-2 border-[#EDFF60] rounded-full" style={{ backgroundColor: '#EDFF60' }}>
              <Rocket className="w-8 h-8 text-black" />
            </div>
            <h3 className="font-bold text-xl" style={{ color: '#EDFF60' }}>
              Startup o Emprendimiento
            </h3>
            <p className="text-base font-medium" style={{ color: '#EDFF60' }}>
              Tengo una startup innovadora con componente sostenible en turismo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryStep;
