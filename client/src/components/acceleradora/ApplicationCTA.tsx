
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const ApplicationCTA = () => {
  return (
    <div className="my-12">
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-6">
            <h2 className="text-2xl font-bold text-green-800 mb-2">Postula tu Proyecto</h2>
            <p className="text-gray-600 max-w-md">
              Estamos buscando proyectos innovadores con enfoque en sostenibilidad y regeneración. 
              Si tienes una idea o startup en etapa temprana, aplica a nuestra próxima cohorte.
            </p>
          </div>
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white shadow-md">
            Completar Aplicación <FileText className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
