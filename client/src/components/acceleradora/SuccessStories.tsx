
import { Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const successStoriesData = [
  {
    name: "EcoViajes Colombia",
    description: "Plataforma de turismo regenerativo que conecta viajeros con experiencias de impacto positivo. Recaudó $500,000 USD después del programa.",
    impact: "Ha regenerado más de 200 hectáreas de bosque y apoyado a 15 comunidades locales."
  },
  {
    name: "RegenFarms",
    description: "Startup de agricultura regenerativa que desarrolló un sistema de cultivo que restaura suelos degradados. Actualmente operando en 3 departamentos.",
    impact: "Ha regenerado más de 500 hectáreas de suelo y aumentado la productividad agrícola en un 35%."
  },
  {
    name: "BioHábitat",
    description: "Empresa de construcción sostenible que utiliza materiales locales y técnicas regenerativas. Ganadora de premios internacionales de innovación.",
    impact: "Ha reducido la huella de carbono en construcciones en un 60% y creado 45 empleos verdes."
  }
];

export const SuccessStories = () => {
  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
        <Award className="mr-2 h-6 w-6 text-green-600" />
        Historias de Éxito
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {successStoriesData.map((story, index) => (
          <Card key={index} className="bg-white shadow hover:shadow-md transition-shadow h-full">
            <CardContent className="p-6 h-full flex flex-col">
              <h3 className="text-xl font-semibold text-green-700 mb-2">{story.name}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{story.description}</p>
              <div className="bg-green-50 p-3 rounded-md">
                <p className="text-sm font-medium text-green-800">Impacto:</p>
                <p className="text-sm text-gray-600">{story.impact}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
