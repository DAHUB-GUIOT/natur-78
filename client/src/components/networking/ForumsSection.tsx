
import { MessageSquare, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ForumsSection = () => {
  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-green-700">Foros de Conversación</h2>
        <Button variant="outline" className="border-green-700 text-green-700">
          Ver Todos
        </Button>
      </div>

      <div className="space-y-4">
        <Card className="border-green-100/20 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader className="bg-green-50/50">
            <CardTitle className="text-xl text-green-800">
              🧭 Buenas prácticas de turismo sostenible
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <p className="text-gray-700">Experiencias que inspiran. 📌 Comparte ideas sobre ecoturismo, economía circular, gestión ambiental.</p>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-green-600 text-white hover:bg-green-700 transition-all duration-300 flex-grow">
                <MessageSquare className="mr-2 h-4 w-4" /> Participar en el chat en vivo
              </Button>
              <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-50 flex-grow">
                <Users className="mr-2 h-4 w-4" /> Ver participantes
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-100/20 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader className="bg-green-50/50">
            <CardTitle className="text-xl text-green-800">
              🛠 Aliados y colaboraciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <p className="text-gray-700">Haz equipo. Encuentra sinergias.</p>
            <p className="text-gray-700">💡 Ejemplo: "Busco diseñador para señalética ecológica en la Sierra Nevada."</p>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-green-600 text-white hover:bg-green-700 transition-all duration-300 flex-grow">
                <MessageSquare className="mr-2 h-4 w-4" /> Unirse al chat del foro
              </Button>
              <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-50 flex-grow">
                Quiero colaborar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
