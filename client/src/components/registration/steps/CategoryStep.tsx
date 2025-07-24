
import React from "react";
import { Button } from "@/components/ui/button";
import { Briefcase, UserPlus, Rocket } from "lucide-react";
import { CategoryType } from "../RegistrationForm";

interface CategoryStepProps {
  onCategorySelect: (category: CategoryType) => void;
}

const CategoryStep = ({ onCategorySelect }: CategoryStepProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center bg-gradient-to-r from-green-600 to-green-700 text-white p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-gasoek tracking-wide">
          ¿QUÉ TIPO DE EMPRESA TIENES?
        </h2>
        <p className="text-xl font-medium">
          Selecciona la categoría que mejor describe tu organización
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div 
          className="p-8 border-4 border-green-600 hover:border-green-800 bg-white hover:bg-green-50 rounded-xl cursor-pointer transition-all duration-300 shadow-lg hover:shadow-2xl"
          onClick={() => onCategorySelect("sponsor")}
        >
          <div className="flex flex-col items-center text-center gap-6">
            <div className="text-white p-6 bg-gradient-to-br from-green-600 to-green-700 rounded-full shadow-xl">
              <Briefcase className="w-12 h-12" />
            </div>
            <h3 className="text-black font-bold text-2xl">
              Empresa de Turismo Sostenible
            </h3>
            <p className="text-black text-lg font-medium">
              Ofrezco experiencias de ecoturismo, turismo rural o sostenible
            </p>
          </div>
        </div>
        
        <div 
          className="p-8 border-4 border-green-600 hover:border-green-800 bg-white hover:bg-green-50 rounded-xl cursor-pointer transition-all duration-300 shadow-lg hover:shadow-2xl"
          onClick={() => onCategorySelect("ecosystem")}
        >
          <div className="flex flex-col items-center text-center gap-6">
            <div className="text-white p-6 bg-gradient-to-br from-green-600 to-green-700 rounded-full shadow-xl">
              <UserPlus className="w-12 h-12" />
            </div>
            <h3 className="text-black font-bold text-2xl">
              Organización del Ecosistema
            </h3>
            <p className="text-black text-lg font-medium">
              NGO, agencia, operador o institución en turismo regenerativo
            </p>
          </div>
        </div>
        
        <div 
          className="p-8 border-4 border-green-600 hover:border-green-800 bg-white hover:bg-green-50 rounded-xl cursor-pointer transition-all duration-300 shadow-lg hover:shadow-2xl"
          onClick={() => onCategorySelect("startup")}
        >
          <div className="flex flex-col items-center text-center gap-6">
            <div className="text-white p-6 bg-gradient-to-br from-green-600 to-green-700 rounded-full shadow-xl">
              <Rocket className="w-12 h-12" />
            </div>
            <h3 className="text-black font-bold text-2xl">
              Startup o Emprendimiento
            </h3>
            <p className="text-black text-lg font-medium">
              Tengo una startup innovadora con componente sostenible en turismo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryStep;
