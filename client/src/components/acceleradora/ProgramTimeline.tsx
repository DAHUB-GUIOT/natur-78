
import { CalendarDays } from "lucide-react";

const timelineSteps = [
  {
    phase: "Aplicación",
    description: "Completa el formulario y presenta tu proyecto sostenible.",
    icon: CalendarDays
  },
  {
    phase: "Selección",
    description: "Evaluación y entrevistas con los proyectos más prometedores.",
    icon: CalendarDays
  },
  {
    phase: "Incubación",
    description: "Tres meses de desarrollo intensivo con mentores y recursos.",
    icon: CalendarDays
  },
  {
    phase: "Demo Day",
    description: "Presentación a inversionistas y socios potenciales.",
    icon: CalendarDays
  },
  {
    phase: "Seguimiento",
    description: "Apoyo continuo y acceso a la red NATUR post-programa.",
    icon: CalendarDays
  }
];

export const ProgramTimeline = () => {
  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Línea de Tiempo del Programa</h2>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-green-200 hidden md:block"></div>
        
        {/* Timeline steps */}
        <div className="space-y-8">
          {timelineSteps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row">
              <div className="flex items-center md:w-1/4 mb-4 md:mb-0">
                <div className="bg-green-600 rounded-full p-2 z-10 mr-4 hidden md:block">
                  <step.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold text-green-700">{step.phase}</h3>
              </div>
              <div className="md:w-3/4 bg-white rounded-lg shadow p-4 md:ml-6">
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
