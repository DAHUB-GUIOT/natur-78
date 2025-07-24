
import { MessageSquare, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const CommunitySection = () => {
  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-green-700">Conecta con Personas Afines</h2>
        <Button variant="outline" className="border-green-700 text-green-700">
          Ver Todos
        </Button>
      </div>

      <div className="space-y-4">
        <Card className="border-green-100/20 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader className="bg-green-50/50">
            <CardTitle className="text-xl text-green-800">
              🧭 Juanita Ríos – Guía en Chocó
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <p className="text-gray-700">✨ Busca: aliados para avistamiento de aves</p>
            <p className="text-gray-700">🤝 Ofrece: rutas, alojamiento rural, cocina local</p>
            <div className="flex gap-3">
              <Button className="bg-green-600 text-white hover:bg-green-700 transition-all duration-300">
                <LinkIcon className="mr-2 h-4 w-4" /> Ver perfil
              </Button>
              <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-50">
                <MessageSquare className="mr-2 h-4 w-4" /> Enviar mensaje
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-100/20 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader className="bg-green-50/50">
            <CardTitle className="text-xl text-green-800">
              🛖 EcoHostal TierraViva – Boyacá
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <p className="text-gray-700">✨ Turismo regenerativo</p>
            <p className="text-gray-700">🤝 Busca: alianzas con ONGs y creativos</p>
            <Button className="bg-green-600 text-white hover:bg-green-700 transition-all duration-300 w-full">
              <LinkIcon className="mr-2 h-4 w-4" /> Ver proyecto
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
