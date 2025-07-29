import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Map, 
  Hotel, 
  Utensils, 
  Bike, 
  Heart, 
  GraduationCap, 
  Lightbulb, 
  Handshake 
} from "lucide-react";
import { CategoryType } from "../RegistrationForm";

interface CategoryStepProps {
  onCategorySelect: (category: CategoryType) => void;
}

const CategoryStep = ({ onCategorySelect }: CategoryStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          Registro Festival NATUR 2025
        </h2>
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 text-left">
          <p className="text-gray-300 text-sm leading-relaxed">
            Este formulario está dirigido a <strong className="text-white">empresas, fundaciones, emprendimientos y proyectos</strong> vinculados al turismo sostenible y regenerativo que deseen participar en la Plataforma y Festival NATUR 2025.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed mt-3">
            La información será utilizada para construir un directorio nacional, fomentar conexiones y visibilizar propuestas alineadas con este propósito.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4">
          🧭 Categoría de Participación
        </h3>
        <p className="text-gray-300 text-sm mb-6">
          Selecciona una categoría principal. Al elegirla, podrás desplegar y seleccionar subcategorías específicas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => onCategorySelect("startup")}
            className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200 text-left group"
          >
            <div className="flex items-start gap-3">
              <Map className="w-6 h-6 text-green-400 mt-1 group-hover:scale-110 transition-transform" />
              <div className="flex-1">
                <h4 className="font-medium text-white text-sm mb-2">
                  🧭 Agencia u Operador Turístico
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Empresas que diseñan, comercializan y/o operan experiencias turísticas con enfoque sostenible o regenerativo.
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onCategorySelect("attendee")}
            className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200 text-left group"
          >
            <div className="flex items-start gap-3">
              <Hotel className="w-6 h-6 text-green-400 mt-1 group-hover:scale-110 transition-transform" />
              <div className="flex-1">
                <h4 className="font-medium text-white text-sm mb-2">
                  🛏️ Alojamiento Sostenible
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Empresas que ofrecen hospedaje con buenas prácticas ambientales, sociales y culturales.
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onCategorySelect("mentor")}
            className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200 text-left group"
          >
            <div className="flex items-start gap-3">
              <Utensils className="w-6 h-6 text-green-400 mt-1 group-hover:scale-110 transition-transform" />
              <div className="flex-1">
                <h4 className="font-medium text-white text-sm mb-2">
                  🍃 Gastronomía Sostenible
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Proyectos que promueven una alimentación consciente, de origen local, saludable y con identidad.
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onCategorySelect("investor")}
            className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200 text-left group"
          >
            <div className="flex items-start gap-3">
              <Bike className="w-6 h-6 text-green-400 mt-1 group-hover:scale-110 transition-transform" />
              <div className="flex-1">
                <h4 className="font-medium text-white text-sm mb-2">
                  🚲 Movilidad y Transporte Ecológico
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Empresas que ofrecen soluciones de movilidad sostenible para el turismo y la vida diaria.
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onCategorySelect("ecosystem")}
            className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200 text-left group"
          >
            <div className="flex items-start gap-3">
              <Heart className="w-6 h-6 text-green-400 mt-1 group-hover:scale-110 transition-transform" />
              <div className="flex-1">
                <h4 className="font-medium text-white text-sm mb-2">
                  🌱 ONG y Fundaciones
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Organizaciones que trabajan por la conservación, el desarrollo sostenible y el fortalecimiento comunitario.
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onCategorySelect("sponsor")}
            className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200 text-left group"
          >
            <div className="flex items-start gap-3">
              <GraduationCap className="w-6 h-6 text-green-400 mt-1 group-hover:scale-110 transition-transform" />
              <div className="flex-1">
                <h4 className="font-medium text-white text-sm mb-2">
                  📚 Educación y Sensibilización Ambiental
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Proyectos dedicados a formar, educar y sensibilizar en torno al turismo responsable y la sostenibilidad.
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onCategorySelect("other")}
            className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200 text-left group"
          >
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-green-400 mt-1 group-hover:scale-110 transition-transform" />
              <div className="flex-1">
                <h4 className="font-medium text-white text-sm mb-2">
                  💡 Tecnología para el Turismo Sostenible
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Soluciones tecnológicas que apoyan la transformación sostenible del sector turístico.
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onCategorySelect("digital-nomad")}
            className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200 text-left group"
          >
            <div className="flex items-start gap-3">
              <Handshake className="w-6 h-6 text-green-400 mt-1 group-hover:scale-110 transition-transform" />
              <div className="flex-1">
                <h4 className="font-medium text-white text-sm mb-2">
                  🤝 Aliado o Patrocinador
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Empresas, instituciones o marcas que respaldan y validan la construcción del Festival NATUR.
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryStep;