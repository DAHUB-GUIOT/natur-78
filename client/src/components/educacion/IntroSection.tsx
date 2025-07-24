
import { Sprout } from "lucide-react";
import { Card } from "@/components/ui/card";

export const IntroSection = () => {
  return (
    <Card className="p-6 border border-green-100 shadow-sm">
      <div className="flex flex-col space-y-4">
        <h3 className="text-xl font-gasoek text-green-700">¿Qué es la Educación NATUR?</h3>
        
        <p className="text-foreground/90 leading-relaxed">
          Es un espacio abierto donde compartimos saberes ancestrales, herramientas modernas y estrategias 
          sostenibles para fortalecer iniciativas regenerativas. Aquí encuentras guías prácticas, 
          talleres y cursos gratuitos co-creados por la red NATUR.
        </p>
        
        <div className="flex items-center gap-2 text-green-700">
          <Sprout size={18} />
          <span className="font-semibold">Aprende, comparte, regenera</span>
        </div>
      </div>
    </Card>
  );
};
