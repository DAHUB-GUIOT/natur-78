
import { Wrench, Briefcase, Award, MessageSquare, LineChart, Compass, Globe, Sparkles, Lightbulb, TestTube, Users, PieChart, BarChart3, DollarSign, Star, Search, FileText, TrendingUp, Network, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StartupToolsProps {
  subcategory?: string;
}

export const StartupTools = ({ subcategory = "established" }: StartupToolsProps) => {
  // Get tools based on startup subcategory
  const getToolsBySubcategory = () => {
    switch(subcategory) {
      case "idea":
        return [
          {
            title: "Validación de Idea",
            description: "Herramientas para validar tu concepto con usuarios potenciales y analizar la viabilidad.",
            icon: Lightbulb
          },
          {
            title: "Business Model Canvas",
            description: "Plantillas y recursos para crear un modelo de negocio efectivo y validado.",
            icon: PieChart
          },
          {
            title: "Plan de Negocio",
            description: "Guías y estructuras para elaborar un plan de negocio sólido y atractivo.",
            icon: Compass
          },
          {
            title: "Comunidad de Mentores",
            description: "Conexión con expertos que pueden guiarte en la validación y desarrollo de tu idea.",
            icon: Users
          }
        ];
      case "mvp":
        return [
          {
            title: "TestingTools",
            description: "Plataformas para realizar pruebas de usabilidad y obtener feedback de usuarios reales.",
            icon: TestTube
          },
          {
            title: "Métricas de Producto",
            description: "Herramientas para medir y analizar el desempeño de tu MVP con indicadores clave.",
            icon: BarChart3
          },
          {
            title: "Desarrollo de Cliente",
            description: "Metodologías y recursos para entrevistar clientes y validar tu solución en el mercado.",
            icon: Users
          },
          {
            title: "Plataforma de Pitch",
            description: "Recursos para crear presentaciones efectivas de tu MVP para inversores iniciales.",
            icon: Award
          }
        ];
      case "growth":
        return [
          {
            title: "Escalabilidad",
            description: "Estrategias y herramientas para escalar tu startup y aumentar tu base de clientes.",
            icon: LineChart
          },
          {
            title: "Acceso a Inversión",
            description: "Conexión con redes de inversionistas interesados en startups en fase de crecimiento.",
            icon: Briefcase
          },
          {
            title: "Marketing Growth",
            description: "Estrategias y herramientas para optimizar tu adquisición y retención de usuarios.",
            icon: Sparkles
          },
          {
            title: "Comunidad de Founders",
            description: "Red de emprendedores en fase de crecimiento para compartir experiencias y consejos.",
            icon: MessageSquare
          }
        ];
      case "investor":
        return [
          {
            title: "Análisis de Inversiones",
            description: "Herramientas para evaluar el potencial de retorno y riesgo de diferentes startups.",
            icon: LineChart
          },
          {
            title: "Screening de Proyectos",
            description: "Sistema para filtrar y clasificar oportunidades de inversión según tus criterios.",
            icon: Search
          },
          {
            title: "Due Diligence",
            description: "Recursos para realizar investigación exhaustiva sobre startups antes de invertir.",
            icon: FileText
          },
          {
            title: "Red de Co-inversión",
            description: "Conexión con otros inversores para compartir oportunidades y distribuir riesgos.",
            icon: Network
          }
        ];
      case "angel":
        return [
          {
            title: "Deal Flow",
            description: "Acceso a un flujo constante de startups tempranas buscando capital semilla.",
            icon: TrendingUp
          },
          {
            title: "Evaluación de Startups",
            description: "Metodologías para valorar startups en etapas iniciales con información limitada.",
            icon: Target
          },
          {
            title: "Sindicación de Inversiones",
            description: "Plataforma para formar grupos de inversión con otros ángeles inversores.",
            icon: Users
          },
          {
            title: "Mentoring Tracker",
            description: "Sistema para seguir el progreso de las startups en las que has invertido y mentoreado.",
            icon: LineChart
          }
        ];
      case "mentor":
        return [
          {
            title: "Programa de Mentoría",
            description: "Estructura y recursos para desarrollar un programa de mentoría efectivo.",
            icon: Award
          },
          {
            title: "Recursos Educativos",
            description: "Biblioteca de materiales para compartir con emprendedores según sus necesidades.",
            icon: FileText
          },
          {
            title: "Seguimiento de Progreso",
            description: "Herramientas para monitorear el avance de tus mentoreados y establecer objetivos.",
            icon: LineChart
          },
          {
            title: "Red de Mentores",
            description: "Comunidad de expertos para intercambiar mejores prácticas de mentoría.",
            icon: Users
          }
        ];
      case "venture-capital":
        return [
          {
            title: "Análisis de Portfolio",
            description: "Dashboards para evaluar el desempeño de tu cartera de inversiones en startups.",
            icon: PieChart
          },
          {
            title: "Market Intelligence",
            description: "Informes de tendencias de mercado y sectores emergentes para inversión.",
            icon: Globe
          },
          {
            title: "LP Management",
            description: "Herramientas para gestionar relaciones con limited partners e informes de rendimiento.",
            icon: Briefcase
          },
          {
            title: "Deal Sourcing",
            description: "Plataforma para identificar startups prometedoras que se alinean con tu tesis de inversión.",
            icon: Search
          }
        ];
      case "established":
      default:
        return [
          {
            title: "Expansión Internacional",
            description: "Consultoría y recursos para extender tu operación a nuevos mercados.",
            icon: Globe
          },
          {
            title: "M&A y Alianzas",
            description: "Soporte para fusiones, adquisiciones y alianzas estratégicas con otras empresas.",
            icon: Briefcase
          },
          {
            title: "Plan de Inversión",
            description: "Herramientas avanzadas para rondas de inversión series A, B y posteriores.",
            icon: LineChart
          },
          {
            title: "Programas de Aceleración",
            description: "Acceso a programas exclusivos para startups establecidas en busca de mayor crecimiento.",
            icon: Wrench
          }
        ];
    }
  };

  const toolsData = getToolsBySubcategory();
  
  // Get title based on subcategory
  const getTitle = () => {
    switch(subcategory) {
      case "idea":
        return "Herramientas para Validar tu Idea";
      case "mvp":
        return "Herramientas para tu MVP";
      case "growth":
        return "Herramientas de Crecimiento";
      case "investor":
        return "Herramientas de Inversión";
      case "angel":
        return "Herramientas para Inversionistas Ángel";
      case "mentor":
        return "Herramientas de Mentoría";
      case "venture-capital":
        return "Herramientas de Capital de Riesgo";
      case "established":
      default:
        return "Herramientas para Startups";
    }
  };

  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold text-green-800 mb-4">{getTitle()}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {toolsData.map((tool, index) => (
          <Card key={index} className="bg-white shadow hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <div className="bg-green-100 p-2 rounded-md mr-3">
                  <tool.icon className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-green-700">{tool.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{tool.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
