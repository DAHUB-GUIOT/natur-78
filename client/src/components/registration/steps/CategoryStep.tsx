
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
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
        ¿Qué tipo de empresa o iniciativa tienes?
      </h2>
      
      <div className="grid grid-cols-1 gap-4">
        <div 
          className="p-6 border-2 border-gray-200 hover:border-green-400 bg-white hover:bg-green-50 rounded-lg cursor-pointer transition-all duration-300"
          onClick={() => onCategorySelect("sponsor")}
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="text-green-600 p-3 bg-green-100 rounded-full">
              <Briefcase className="w-8 h-8" />
            </div>
            <h3 className="text-gray-900 font-semibold text-xl">
              Empresa de Turismo Sostenible
            </h3>
            <p className="text-gray-600 text-sm">
              Ofrezco experiencias de ecoturismo, turismo rural o sostenible
            </p>
          </div>
        </div>
        
        <div 
          className="p-6 border-2 border-gray-200 hover:border-green-400 bg-white hover:bg-green-50 rounded-lg cursor-pointer transition-all duration-300"
          onClick={() => onCategorySelect("ecosystem")}
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="text-green-600 p-3 bg-green-100 rounded-full">
              <UserPlus className="w-8 h-8" />
            </div>
            <h3 className="text-gray-900 font-semibold text-xl">
              Organización del Ecosistema
            </h3>
            <p className="text-gray-600 text-sm">
              NGO, agencia, operador o institución en turismo regenerativo
            </p>
          </div>
        </div>
        
        <div 
          className="p-6 border-2 border-gray-200 hover:border-green-400 bg-white hover:bg-green-50 rounded-lg cursor-pointer transition-all duration-300"
          onClick={() => onCategorySelect("startup")}
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="text-green-600 p-3 bg-green-100 rounded-full">
              <Rocket className="w-8 h-8" />
            </div>
            <h3 className="text-gray-900 font-semibold text-xl">
              Startup o Emprendimiento
            </h3>
            <p className="text-gray-600 text-sm">
              Tengo una startup innovadora con componente sostenible en turismo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryStep;
