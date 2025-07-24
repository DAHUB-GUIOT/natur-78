import React from "react";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Users,
  GraduationCap,
  UserPlus,
  Briefcase,
  Handshake,
  Star,
  MapPin,
  ChartBar,
  Building2,
  Map,
  Hotel,
  Heart,
  Utensils,
  GraduationCap as Education,
  ArrowLeft,
  Rocket,
  TrendingUp,
  Network,
  Earth,
  Laptop,
  Camera,
  Compass,
  DollarSign,
  Award,
  LineChart
} from "lucide-react";
import { CategoryType } from "../RegistrationForm";

interface SubcategoryStepProps {
  category: CategoryType;
  onSubcategorySelect: (subcategory: string) => void;
  onBack: () => void;
}

const SubcategoryStep = ({ category, onSubcategorySelect, onBack }: SubcategoryStepProps) => {
  let subcategories: {
    id: string;
    title: string;
    icon: React.ReactNode;
    description: string[];
  }[] = [];

  switch (category) {
    case "startup":
      subcategories = [
        {
          id: "idea",
          icon: <Briefcase className="w-5 h-5" />,
          title: "Idea validada",
          description: [
            "Tengo una idea de negocio validada",
            "Busco apoyo para desarrollarla"
          ]
        },
        {
          id: "mvp",
          icon: <Rocket className="w-5 h-5" />,
          title: "Producto mínimo viable",
          description: [
            "Ya tengo un MVP funcionando",
            "Busco primeros usuarios y validación"
          ]
        },
        {
          id: "growth",
          icon: <TrendingUp className="w-5 h-5" />,
          title: "En crecimiento",
          description: [
            "Tengo usuarios y tracción",
            "Busco escalar y nuevas alianzas"
          ]
        },
        {
          id: "established",
          icon: <Network className="w-5 h-5" />,
          title: "Ya consolidada",
          description: [
            "Startup en operación",
            "Busco expandir red y oportunidades"
          ]
        },
        {
          id: "investor",
          icon: <DollarSign className="w-5 h-5" />,
          title: "Inversionista",
          description: [
            "Busco proyectos prometedores para invertir",
            "Interesado en oportunidades de inversión sostenible"
          ]
        },
        {
          id: "angel",
          icon: <Star className="w-5 h-5" />,
          title: "Inversionista Ángel",
          description: [
            "Proveo capital semilla a startups tempranas",
            "Ofrezco mentoría y red de contactos"
          ]
        },
        {
          id: "mentor",
          icon: <Award className="w-5 h-5" />,
          title: "Mentor",
          description: [
            "Comparto mi experiencia y conocimientos",
            "Apoyo a emprendedores en su desarrollo"
          ]
        },
        {
          id: "venture-capital",
          icon: <LineChart className="w-5 h-5" />,
          title: "Capital de riesgo",
          description: [
            "Represento un fondo de inversión",
            "Busco startups con potencial de crecimiento"
          ]
        }
      ];
      break;
    case "attendee":
      subcategories = [
        {
          id: "tourist-national",
          icon: <MapPin className="w-5 h-5" />,
          title: "Turista nacional",
          description: [
            "Interesado en experiencias sostenibles",
            "Busco conectar con naturaleza y cultura"
          ]
        },
        {
          id: "tourist-international",
          icon: <Globe className="w-5 h-5" />,
          title: "Turista internacional",
          description: [
            "Viajo a Colombia por turismo regenerativo",
            "Quiero conocer proyectos y comunidades"
          ]
        },
        {
          id: "student",
          icon: <GraduationCap className="w-5 h-5" />,
          title: "Estudiante o investigador",
          description: [
            "Estoy en proceso de formación",
            "Quiero participar en talleres o conferencias"
          ]
        },
        {
          id: "citizen",
          icon: <Users className="w-5 h-5" />,
          title: "Ciudadano interesado",
          description: [
            "Vivo en Colombia",
            "Me interesa aprender y participar en la transformación del turismo"
          ]
        }
      ];
      break;
    case "sponsor":
      subcategories = [
        {
          id: "commercial",
          icon: <Briefcase className="w-5 h-5" />,
          title: "Marca comercial",
          description: [
            "Busco visibilidad durante el evento",
            "Quiero patrocinar actividades o instalar un stand"
          ]
        },
        {
          id: "allied",
          icon: <Handshake className="w-5 h-5" />,
          title: "Empresa aliada",
          description: [
            "Ya trabajamos en turismo sostenible",
            "Queremos asociarnos con NATUR"
          ]
        },
        {
          id: "startup",
          icon: <Star className="w-5 h-5" />,
          title: "Emprendimiento emergente",
          description: [
            "Quiero dar a conocer mi proyecto",
            "Busco conexiones y posicionamiento"
          ]
        },
        {
          id: "institution",
          icon: <ChartBar className="w-5 h-5" />,
          title: "Institución pública o privada",
          description: [
            "Quiero apoyar el festival como parte de nuestras políticas",
            "Busco articulación territorial"
          ]
        }
      ];
      break;
    case "ecosystem":
      subcategories = [
        {
          id: "agency",
          icon: <Building2 className="w-5 h-5" />,
          title: "Agencia de viajes",
          description: [
            "Ofrezco paquetes y servicios turísticos",
            "Quiero aparecer en la app y obtener el Sello NATUR"
          ]
        },
        {
          id: "operator",
          icon: <Map className="w-5 h-5" />,
          title: "Operador turístico",
          description: [
            "Ofrezco experiencias sostenibles en terreno",
            "Quiero conectar con agencias y viajeros"
          ]
        },
        {
          id: "guide",
          icon: <Map className="w-5 h-5" />,
          title: "Guía turístico",
          description: [
            "Trabajo con comunidades o naturaleza",
            "Me interesa formarme y conectarme"
          ]
        },
        {
          id: "accommodation",
          icon: <Hotel className="w-5 h-5" />,
          title: "Alojamiento responsable",
          description: [
            "Ecohotel, hostal o alojamiento rural",
            "Busco visibilidad y alianzas"
          ]
        },
        {
          id: "ngo",
          icon: <Heart className="w-5 h-5" />,
          title: "ONG o fundación",
          description: [
            "Trabajo en conservación, comunidad o cultura",
            "Quiero compartir proyectos y alianzas"
          ]
        },
        {
          id: "artist",
          icon: <Utensils className="w-5 h-5" />,
          title: "Artista, chef o artesano",
          description: [
            "Hago parte del turismo cultural o creativo",
            "Quiero visibilizar mi trabajo"
          ]
        },
        {
          id: "educator",
          icon: <Education className="w-5 h-5" />,
          title: "Educador o formador",
          description: [
            "Trabajo en formación de turismo responsable",
            "Busco compartir contenidos o participar en la sección educativa"
          ]
        },
        {
          id: "digital-nomad",
          icon: <Globe className="w-5 h-5" />,
          title: "Nómada digital",
          description: [
            "Trabajo de forma remota desde diferentes destinos",
            "Busco conectar con comunidades y proyectos sostenibles"
          ]
        },
        {
          id: "consultant",
          icon: <Earth className="w-5 h-5" />,
          title: "Consultor ambiental",
          description: [
            "Asesoro en temas de sostenibilidad y medio ambiente",
            "Busco expandir mi red profesional"
          ]
        }
      ];
      break;
  }

  let title = "";
  switch (category) {
    case "startup":
      title = "¿Cuál es tu rol en el ecosistema de startups?";
      break;
    case "attendee":
      title = "¿Cuál de estos perfiles te describe mejor?";
      break;
    case "sponsor":
      title = "¿Cuál es el tipo de organización que representas?";
      break;
    case "ecosystem":
      title = "¿Cuál es tu rol principal en el ecosistema?";
      break;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="hover:bg-transparent p-0 mr-4"
          style={{ color: '#EDFF60' }}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl sm:text-2xl font-gasoek tracking-wide uppercase font-bold" style={{ color: '#EDFF60' }}>
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subcategories.map((subcategory) => (
          <div
            key={subcategory.id}
            className="p-4 sm:p-6 border-2 border-[#EDFF60] bg-transparent rounded-xl cursor-pointer transition-all duration-300 hover:border-[#EDFF60] hover:bg-[#EDFF60]/5 backdrop-blur-sm"
            onClick={() => onSubcategorySelect(subcategory.id)}
          >
            <div className="flex items-start gap-4">
              <div className="mt-1" style={{ color: '#EDFF60' }}>
                {subcategory.icon}
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg" style={{ color: '#EDFF60' }}>
                  {subcategory.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {subcategory.description.map((item, index) => (
                    <li
                      key={index}
                      className="font-medium text-sm flex items-center gap-2"
                      style={{ color: '#EDFF60' }}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#EDFF60' }}></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubcategoryStep;
