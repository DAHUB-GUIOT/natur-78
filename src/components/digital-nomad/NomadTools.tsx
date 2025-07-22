
import { Globe, Laptop, Camera, Users, Map, Calendar, Compass, Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface NomadToolsProps {
  subcategory?: string;
}

export const NomadTools = ({ subcategory = "remote-worker" }: NomadToolsProps) => {
  // Get tools based on nomad subcategory
  const getToolsBySubcategory = () => {
    switch(subcategory) {
      case "content-creator":
        return [
          {
            title: "Plataformas de Contenido",
            description: "Herramientas para distribuir y monetizar tu contenido en diferentes plataformas.",
            icon: Camera
          },
          {
            title: "Edición Móvil",
            description: "Apps de edición de foto y video optimizadas para creadores en movimiento.",
            icon: Laptop
          },
          {
            title: "Comunidad Creativa",
            description: "Conexión con otros creadores de contenido en destinos de ecoturismo.",
            icon: Users
          },
          {
            title: "Calendario Editorial",
            description: "Planifica tu contenido alineado con eventos de turismo sostenible.",
            icon: Calendar
          }
        ];
      case "remote-worker":
        return [
          {
            title: "Espacios de Trabajo",
            description: "Directorio de coworkings y espacios de trabajo en destinos sostenibles.",
            icon: Laptop
          },
          {
            title: "Conectividad",
            description: "Recursos para asegurar buena conexión a internet en destinos remotos.",
            icon: Globe
          },
          {
            title: "Comunidades Nómadas",
            description: "Grupos de teletrabajadores en diferentes destinos para networking.",
            icon: Users
          },
          {
            title: "Productividad Remota",
            description: "Herramientas para mantener alta productividad mientras viajas.",
            icon: Calendar
          }
        ];
      case "travel-blogger":
        return [
          {
            title: "Planificación de Rutas",
            description: "Crea itinerarios sostenibles y compártelos con tu audiencia.",
            icon: Map
          },
          {
            title: "SEO para Viajes",
            description: "Optimiza tu contenido para ser descubierto por viajeros conscientes.",
            icon: Compass
          },
          {
            title: "Monetización",
            description: "Estrategias para generar ingresos con tu blog de viajes sostenibles.",
            icon: Wallet
          },
          {
            title: "Comunidad de Bloggers",
            description: "Conecta con otros bloggers de turismo responsable.",
            icon: Users
          }
        ];
      case "nomad-community":
      case "nomad-entrepreneur":
      default:
        return [
          {
            title: "Eventos Nómadas",
            description: "Calendario de eventos y encuentros para nómadas digitales en la región.",
            icon: Calendar
          },
          {
            title: "Rutas Nómadas",
            description: "Itinerarios populares entre la comunidad de nómadas digitales.",
            icon: Map
          },
          {
            title: "Recursos Comunitarios",
            description: "Herramientas para construir y mantener comunidades nómadas.",
            icon: Users
          },
          {
            title: "Visados Digitales",
            description: "Información sobre visados para nómadas digitales en diferentes países.",
            icon: Globe
          }
        ];
    }
  };

  const toolsData = getToolsBySubcategory();
  
  // Get title based on subcategory
  const getTitle = () => {
    switch(subcategory) {
      case "content-creator":
        return "Herramientas para Creadores";
      case "remote-worker":
        return "Recursos para Teletrabajadores";
      case "travel-blogger":
        return "Recursos para Bloggers de Viaje";
      case "nomad-community":
        return "Recursos para Comunidades Nómadas";
      case "nomad-entrepreneur":
        return "Herramientas para Emprendedores Nómadas";
      default:
        return "Recursos para Nómadas Digitales";
    }
  };

  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold text-purple-800 mb-4">{getTitle()}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {toolsData.map((tool, index) => (
          <Card key={index} className="bg-white shadow hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <div className="bg-purple-100 p-2 rounded-md mr-3">
                  <tool.icon className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-purple-700">{tool.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{tool.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
