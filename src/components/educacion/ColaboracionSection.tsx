
import { Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const ColaboracionSection = () => {
  return (
    <Card className="p-6 border border-green-100 shadow-sm mb-8">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="inline-flex justify-center items-center p-3 rounded-full bg-green-100 text-green-700 mb-2">
          <Handshake size={24} />
        </div>
        
        <h3 className="text-xl font-gasoek text-green-700">
          ¿Te gustaría colaborar con nosotros?
        </h3>
        
        <p className="text-foreground/90 leading-relaxed max-w-2xl mx-auto mb-2">
          Si tienes conocimientos que quisieras compartir con la comunidad o deseas contribuir 
          en la creación de guías y eventos educativos, nos encantaría saber de ti.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button className="bg-green-600 text-white hover:bg-green-700">
            Proponer una guía o taller
          </Button>
          <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-50">
            Conocer más sobre NATUR Lab
          </Button>
        </div>
      </div>
    </Card>
  );
};
