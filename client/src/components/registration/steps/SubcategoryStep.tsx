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
  LineChart,
  Leaf,
  Recycle,
  Tent,
  Home,
  Apple,
  Coffee,
  Zap,
  Bike,
  Car,
  Droplets,
  Palette,
  School,
  BookOpen,
  Monitor,
  Smartphone,
  BarChart3,
  Lightbulb,
  Shield,
  Radio,
  Tractor,
  Accessibility,
  Mountain
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
        // 🧭 Agencias u Operadores Turísticos
        {
          id: "turismo-naturaleza",
          icon: <Map className="w-5 h-5" />,
          title: "Turismo de naturaleza y avistamiento de fauna",
          description: [
            "Experiencias en contacto con la naturaleza",
            "Especializado en avistamiento de fauna silvestre"
          ]
        },
        {
          id: "turismo-comunitario",
          icon: <Users className="w-5 h-5" />,
          title: "Turismo comunitario",
          description: [
            "Trabajo con comunidades locales",
            "Experiencias territoriales auténticas"
          ]
        },
        {
          id: "turismo-rural",
          icon: <Tractor className="w-5 h-5" />,
          title: "Turismo rural y agroturismo",
          description: [
            "Experiencias en el campo",
            "Especializado en actividades agropecuarias"
          ]
        },
        {
          id: "turismo-cultural",
          icon: <Building2 className="w-5 h-5" />,
          title: "Turismo cultural e histórico",
          description: [
            "Promoción del patrimonio cultural",
            "Sitios históricos y tradiciones"
          ]
        },
        {
          id: "turismo-bienestar",
          icon: <Heart className="w-5 h-5" />,
          title: "Turismo de bienestar y reconexión",
          description: [
            "Experiencias de wellness",
            "Enfocado en bienestar y reconexión personal"
          ]
        },
        {
          id: "ecoturismo",
          icon: <Leaf className="w-5 h-5" />,
          title: "Ecoturismo",
          description: [
            "Turismo ecológico especializado",
            "Conservación a través del turismo"
          ]
        },
        {
          id: "turismo-regenerativo",
          icon: <Recycle className="w-5 h-5" />,
          title: "Turismo regenerativo",
          description: [
            "Experiencias que regeneran territorios",
            "Impacto positivo ambiental y social"
          ]
        },
        {
          id: "turismo-de-naturaleza",
          icon: <Leaf className="w-5 h-5" />,
          title: "Turismo de naturaleza",
          description: [
            "Experiencias en contacto directo con la naturaleza",
            "Conservación y educación ambiental"
          ]
        },
        {
          id: "turismo-accesible",
          icon: <Accessibility className="w-5 h-5" />,
          title: "Operadores de turismo accesible e inclusivo",
          description: [
            "Turismo inclusivo especializado",
            "Experiencias accesibles para todas las personas"
          ]
        }
      ];
      break;

    case "attendee":
      subcategories = [
        // 🛏️ Alojamientos Sostenibles
        {
          id: "ecohoteles-ecolodges",
          icon: <Hotel className="w-5 h-5" />,
          title: "Ecohoteles y ecolodges",
          description: [
            "Hospedaje con criterios ecológicos",
            "Alojamiento sostenible certificado"
          ]
        },
        {
          id: "glampings-sostenibles",
          icon: <Tent className="w-5 h-5" />,
          title: "Glampings sostenibles",
          description: [
            "Glamping con prácticas ambientales",
            "Hospedaje en contacto con la naturaleza"
          ]
        },
        {
          id: "hostales-impacto-social",
          icon: <Home className="w-5 h-5" />,
          title: "Hostales con impacto social",
          description: [
            "Alojamiento con componente social",
            "Impacto positivo en comunidades"
          ]
        },
        {
          id: "hoteles-certificados",
          icon: <Award className="w-5 h-5" />,
          title: "Hoteles certificados o en transición",
          description: [
            "Hoteles con certificaciones ambientales",
            "En proceso de transición sostenible"
          ]
        },
        {
          id: "posadas-comunitarias",
          icon: <Users className="w-5 h-5" />,
          title: "Posadas comunitarias",
          description: [
            "Hospedaje gestionado por comunidades",
            "Turismo comunitario auténtico"
          ]
        },
        {
          id: "alojamiento-rural",
          icon: <Tractor className="w-5 h-5" />,
          title: "Alojamiento rural y agroturismo",
          description: [
            "Hospedaje en entornos rurales",
            "Experiencias agropecuarias"
          ]
        }
      ];
      break;

    case "mentor":
      subcategories = [
        // 🍃 Gastronomía Sostenible
        {
          id: "restaurantes-cocina-local",
          icon: <Utensils className="w-5 h-5" />,
          title: "Restaurantes de cocina local o ancestral",
          description: [
            "Gastronomía tradicional y cultural",
            "Cocina ancestral y regional"
          ]
        },
        {
          id: "cocinas-comunitarias-soberania",
          icon: <Users className="w-5 h-5" />,
          title: "Cocinas comunitarias y procesos de soberanía alimentaria",
          description: [
            "Cocinas colectivas comunitarias",
            "Soberanía y seguridad alimentaria"
          ]
        },
        {
          id: "agroecologia-permacultura",
          icon: <Leaf className="w-5 h-5" />,
          title: "Proyectos de agroecología y permacultura",
          description: [
            "Producción agroecológica",
            "Sistemas de permacultura"
          ]
        },
        {
          id: "productos-naturales-organicos",
          icon: <Apple className="w-5 h-5" />,
          title: "Emprendimientos de productos naturales / orgánicos",
          description: [
            "Productos naturales certificados",
            "Alimentos orgánicos locales"
          ]
        },
        {
          id: "bebidas-tradicionales",
          icon: <Coffee className="w-5 h-5" />,
          title: "Bebidas tradicionales y fermentos",
          description: [
            "Bebidas fermentadas tradicionales",
            "Productos ancestrales"
          ]
        },
        {
          id: "cafes-cacao-trazabilidad",
          icon: <Coffee className="w-5 h-5" />,
          title: "Cafés y barras de cacao con trazabilidad",
          description: [
            "Café de origen certificado",
            "Cacao con trazabilidad social"
          ]
        },
        {
          id: "cocina-impacto-social",
          icon: <Heart className="w-5 h-5" />,
          title: "Proyectos de cocina con impacto social",
          description: [
            "Gastronomía con propósito social",
            "Cocina para la transformación"
          ]
        }
      ];
      break;

    case "investor":
      subcategories = [
        // 🚲 Movilidad y Transporte Ecológico
        {
          id: "transporte-electrico-vehiculos",
          icon: <Car className="w-5 h-5" />,
          title: "Transporte eléctrico (vehículos, motos, buses)",
          description: [
            "Vehículos eléctricos para turismo",
            "Movilidad eléctrica sostenible"
          ]
        },
        {
          id: "bicicletas-cicloturismo",
          icon: <Bike className="w-5 h-5" />,
          title: "Servicios de bicicletas y cicloturismo",
          description: [
            "Alquiler y tours en bicicleta",
            "Cicloturismo especializado"
          ]
        },
        {
          id: "movilidad-compartida",
          icon: <Users className="w-5 h-5" />,
          title: "Movilidad compartida o comunitaria",
          description: [
            "Transporte colaborativo",
            "Sistemas de movilidad comunitaria"
          ]
        },
        {
          id: "transporte-accesible",
          icon: <Accessibility className="w-5 h-5" />,
          title: "Proyectos de transporte accesible y bajo impacto",
          description: [
            "Transporte inclusivo",
            "Movilidad de bajo impacto ambiental"
          ]
        }
      ];
      break;

    case "ecosystem":
      subcategories = [
        // 🌱 ONG y Fundaciones
        {
          id: "conservacion-ecosistemas",
          icon: <Leaf className="w-5 h-5" />,
          title: "Conservación de ecosistemas y especies",
          description: [
            "Protección de biodiversidad",
            "Conservación de especies en peligro"
          ]
        },
        {
          id: "educacion-ambiental-comunitaria",
          icon: <Users className="w-5 h-5" />,
          title: "Educación ambiental y participación comunitaria",
          description: [
            "Sensibilización ambiental",
            "Participación ciudadana"
          ]
        },
        {
          id: "desarrollo-territorial",
          icon: <MapPin className="w-5 h-5" />,
          title: "Desarrollo territorial sostenible",
          description: [
            "Desarrollo local sostenible",
            "Ordenamiento territorial"
          ]
        },
        {
          id: "fortalecimiento-comunidades",
          icon: <Heart className="w-5 h-5" />,
          title: "Fortalecimiento de comunidades y saberes ancestrales",
          description: [
            "Empoderamiento comunitario",
            "Preservación de saberes tradicionales"
          ]
        },
        {
          id: "proteccion-agua",
          icon: <Droplets className="w-5 h-5" />,
          title: "Protección del agua y gestión de cuencas",
          description: [
            "Conservación de recursos hídricos",
            "Manejo integral de cuencas"
          ]
        },
        {
          id: "cultura-arte",
          icon: <Palette className="w-5 h-5" />,
          title: "Cultura, arte y transformación social",
          description: [
            "Arte para el cambio social",
            "Cultura como transformación"
          ]
        }
      ];
      break;

    case "sponsor":
      subcategories = [
        // 📚 Educación y Sensibilización Ambiental
        {
          id: "instituciones-educativas",
          icon: <School className="w-5 h-5" />,
          title: "Instituciones educativas con enfoque en turismo o ambiente",
          description: [
            "Universidades, colegios, institutos",
            "Programas académicos relacionados"
          ]
        },
        {
          id: "escuelas-liderazgo",
          icon: <Award className="w-5 h-5" />,
          title: "Escuelas de liderazgo y cambio climático",
          description: [
            "Formación en liderazgo ambiental",
            "Programas de cambio climático"
          ]
        },
        {
          id: "proyectos-pedagogicos",
          icon: <BookOpen className="w-5 h-5" />,
          title: "Proyectos pedagógicos territoriales o itinerantes",
          description: [
            "Educación territorial móvil",
            "Pedagogía innovadora en territorio"
          ]
        },
        {
          id: "formacion-sostenibilidad",
          icon: <GraduationCap className="w-5 h-5" />,
          title: "Programas de formación en sostenibilidad",
          description: [
            "Capacitación en sostenibilidad",
            "Programas especializados"
          ]
        },
        {
          id: "creadores-contenidos",
          icon: <Monitor className="w-5 h-5" />,
          title: "Creadores de contenidos educativos",
          description: [
            "Contenido educativo digital",
            "Materiales pedagógicos innovadores"
          ]
        }
      ];
      break;

    case "tour-guide":
      subcategories = [
        {
          id: "guia-naturaleza",
          icon: <Map className="w-5 h-5" />,
          title: "Guía de naturaleza y ecoturismo",
          description: [
            "Especializado en fauna y flora local",
            "Educación ambiental y conservación"
          ]
        },
        {
          id: "guia-cultural",
          icon: <Building2 className="w-5 h-5" />,
          title: "Guía cultural e histórico",
          description: [
            "Patrimonio cultural y tradiciones",
            "Historia local y sitios arqueológicos"
          ]
        },
        {
          id: "guia-aventura",
          icon: <Mountain className="w-5 h-5" />,
          title: "Guía de turismo de aventura",
          description: [
            "Actividades extremas y deportes",
            "Seguridad en actividades de riesgo"
          ]
        }
      ];
      break;

    case "interpreter":
      subcategories = [
        {
          id: "interprete-ingles",
          icon: <Globe className="w-5 h-5" />,
          title: "Intérprete Español-Inglés",
          description: [
            "Traducción simultánea y consecutiva",
            "Especializado en turismo sostenible"
          ]
        },
        {
          id: "interprete-frances",
          icon: <Globe className="w-5 h-5" />,
          title: "Intérprete Español-Francés",
          description: [
            "Comunicación intercultural",
            "Experiencias turísticas francófonas"
          ]
        },
        {
          id: "interprete-lenguas-indigenas",
          icon: <Users className="w-5 h-5" />,
          title: "Intérprete de lenguas indígenas",
          description: [
            "Preservación cultural y lingüística",
            "Turismo comunitario indígena"
          ]
        }
      ];
      break;

    case "dmc":
      subcategories = [
        {
          id: "dmc-ecoturismo",
          icon: <Leaf className="w-5 h-5" />,
          title: "DMC especializado en ecoturismo",
          description: [
            "Gestión integral de destinos naturales",
            "Programas de conservación"
          ]
        },
        {
          id: "dmc-cultural",
          icon: <Building2 className="w-5 h-5" />,
          title: "DMC de turismo cultural",
          description: [
            "Patrimonio y tradiciones locales",
            "Experiencias culturales auténticas"
          ]
        },
        {
          id: "dmc-regenerativo",
          icon: <Recycle className="w-5 h-5" />,
          title: "DMC de turismo regenerativo",
          description: [
            "Impacto positivo en comunidades",
            "Restauración de ecosistemas"
          ]
        }
      ];
      break;

    case "other":
      subcategories = [
        // 💡 Tecnología para el Turismo Sostenible
        {
          id: "plataformas-reservas-responsables",
          icon: <Monitor className="w-5 h-5" />,
          title: "Plataformas de reservas responsables",
          description: [
            "Sistemas de booking sostenible",
            "Tecnología para turismo responsable"
          ]
        },
        {
          id: "mapas-herramientas-digitales",
          icon: <MapPin className="w-5 h-5" />,
          title: "Mapas y herramientas digitales para viajeros conscientes",
          description: [
            "Herramientas digitales para turismo",
            "Mapas interactivos sostenibles"
          ]
        },
        {
          id: "tecnologias-limpias",
          icon: <Zap className="w-5 h-5" />,
          title: "Tecnologías limpias aplicadas al turismo",
          description: [
            "Energías renovables para turismo",
            "Tecnologías verdes especializadas"
          ]
        },
        {
          id: "medicion-impacto",
          icon: <BarChart3 className="w-5 h-5" />,
          title: "Soluciones para medición de impacto (huella hídrica, carbono, etc.)",
          description: [
            "Calculadoras de impacto ambiental",
            "Herramientas de medición sostenible"
          ]
        },
        {
          id: "innovacion-social-tecnologica",
          icon: <Lightbulb className="w-5 h-5" />,
          title: "Innovación social y tecnológica",
          description: [
            "Soluciones tecnológicas innovadoras",
            "Innovación para el impacto social"
          ]
        }
      ];
      break;

    case "digital-nomad":
      subcategories = [
        // 🤝 Aliados y Patrocinadores
        {
          id: "validadores-proceso",
          icon: <Award className="w-5 h-5" />,
          title: "Validadores del proceso (institucionales, académicos, redes)",
          description: [
            "Instituciones académicas",
            "Redes y organizaciones validadoras"
          ]
        },
        {
          id: "patrocinadores-principales",
          icon: <Star className="w-5 h-5" />,
          title: "Patrocinadores principales y co-creadores",
          description: [
            "Socios estratégicos principales",
            "Co-creadores del festival"
          ]
        },
        {
          id: "marcas-aliadas-sostenibles",
          icon: <Handshake className="w-5 h-5" />,
          title: "Marcas aliadas con enfoque sostenible",
          description: [
            "Empresas con propósito sostenible",
            "Marcas comprometidas con el ambiente"
          ]
        },
        {
          id: "medios-comunicacion",
          icon: <Radio className="w-5 h-5" />,
          title: "Medios de comunicación aliados",
          description: [
            "Medios especializados en sostenibilidad",
            "Canales de comunicación alternativos"
          ]
        },
        {
          id: "embajadores-voceros",
          icon: <Users className="w-5 h-5" />,
          title: "Embajadores y voceros del Festival",
          description: [
            "Representantes y voceros oficiales",
            "Embajadores de la marca NATUR"
          ]
        }
      ];
      break;

    default:
      break;
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Selecciona tu especialidad
        </h2>
        <p className="text-gray-300">
          Elige la categoría que mejor describe tu empresa o proyecto
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
        {subcategories.map((subcategory) => (
          <button
            key={subcategory.id}
            onClick={() => onSubcategorySelect(subcategory.id)}
            className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200 text-left group"
          >
            <div className="flex items-start gap-3">
              <div className="text-green-400 mt-1 group-hover:scale-110 transition-transform">
                {subcategory.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white mb-2 text-sm">
                  {subcategory.title}
                </h3>
                <div className="space-y-1">
                  {subcategory.description.map((desc, index) => (
                    <p key={index} className="text-xs text-gray-300 leading-relaxed">
                      {desc}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <Button
          onClick={onBack}
          variant="outline"
          className="bg-transparent border-white/30 text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Atrás
        </Button>
      </div>
    </div>
  );
};

export default SubcategoryStep;