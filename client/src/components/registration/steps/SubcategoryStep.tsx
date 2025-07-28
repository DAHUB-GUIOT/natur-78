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
  Accessibility
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
        // 🧭 Agencias u Operadores Turísticos
        {
          id: "turismo-naturaleza",
          icon: <Map className="w-5 h-5" />,
          title: "🧭 Turismo de naturaleza y avistamiento de fauna",
          description: [
            "Diseño experiencias en contacto con la naturaleza",
            "Especializado en avistamiento de fauna silvestre"
          ]
        },
        {
          id: "turismo-comunitario",
          icon: <Users className="w-5 h-5" />,
          title: "🧭 Turismo comunitario y con enfoque territorial",
          description: [
            "Trabajo con comunidades locales",
            "Promovido experiencias territoriales auténticas"
          ]
        },
        {
          id: "turismo-rural",
          icon: <Tractor className="w-5 h-5" />,
          title: "🧭 Turismo rural y agroturismo",
          description: [
            "Ofrezco experiencias en el campo",
            "Especializado en actividades agropecuarias"
          ]
        },
        {
          id: "turismo-cultural",
          icon: <Building2 className="w-5 h-5" />,
          title: "🧭 Turismo cultural e histórico",
          description: [
            "Promociono el patrimonio cultural",
            "Especializado en sitios históricos y tradiciones"
          ]
        },
        {
          id: "turismo-bienestar",
          icon: <Heart className="w-5 h-5" />,
          title: "🧭 Turismo de bienestar y reconexión",
          description: [
            "Ofrezco experiencias de wellness",
            "Enfocado en bienestar y reconexión personal"
          ]
        },
        {
          id: "ecoturismo",
          icon: <Leaf className="w-5 h-5" />,
          title: "🧭 Ecoturismo",
          description: [
            "Especializado en turismo ecológico",
            "Promovido conservación a través del turismo"
          ]
        },
        {
          id: "viajes-regenerativos",
          icon: <Recycle className="w-5 h-5" />,
          title: "🧭 Viajes regenerativos",
          description: [
            "Diseño experiencias que regeneran territorios",
            "Enfocado en impacto positivo ambiental y social"
          ]
        },
        {
          id: "turismo-accesible",
          icon: <Accessibility className="w-5 h-5" />,
          title: "🧭 Operadores de turismo accesible e inclusivo",
          description: [
            "Especializado en turismo inclusivo",
            "Experiencias accesibles para todas las personas"
          ]
        },
        
        // 🛏️ Alojamientos Sostenibles
        {
          id: "ecohoteles",
          icon: <Hotel className="w-5 h-5" />,
          title: "🛏️ Ecohoteles y ecolodges",
          description: [
            "Ofrezco hospedaje con criterios ecológicos",
            "Especializado en alojamiento sostenible"
          ]
        },
        {
          id: "glampings",
          icon: <Tent className="w-5 h-5" />,
          title: "🛏️ Glampings sostenibles",
          description: [
            "Glamping con prácticas ambientales",
            "Hospedaje en contacto con la naturaleza"
          ]
        },
        {
          id: "hostales-impacto",
          icon: <Home className="w-5 h-5" />,
          title: "🛏️ Hostales con impacto social",
          description: [
            "Hostal que genera impacto social positivo",
            "Enfocado en comunidades locales"
          ]
        },
        {
          id: "hoteles-certificados",
          icon: <Award className="w-5 h-5" />,
          title: "🛏️ Hoteles certificados o en transición",
          description: [
            "Hotel con certificaciones ambientales",
            "En proceso de transición sostenible"
          ]
        },
        {
          id: "posadas-comunitarias",
          icon: <Users className="w-5 h-5" />,
          title: "🛏️ Posadas comunitarias",
          description: [
            "Alojamiento gestionado por comunidades",
            "Hospedaje comunitario auténtico"
          ]
        },
        {
          id: "alojamiento-rural",
          icon: <Tractor className="w-5 h-5" />,
          title: "🛏️ Alojamiento rural y agroturismo",
          description: [
            "Hospedaje en entornos rurales",
            "Experiencias agropecuarias incluidas"
          ]
        },
        
        // 🍃 Gastronomía Sostenible
        {
          id: "restaurantes-locales",
          icon: <Utensils className="w-5 h-5" />,
          title: "🍃 Restaurantes de cocina local o ancestral",
          description: [
            "Especializado en cocina tradicional",
            "Promovido sabores ancestrales y locales"
          ]
        },
        {
          id: "cocinas-comunitarias",
          icon: <Users className="w-5 h-5" />,
          title: "🍃 Cocinas comunitarias y soberanía alimentaria",
          description: [
            "Trabajo en soberanía alimentaria",
            "Gestiono cocinas comunitarias"
          ]
        },
        {
          id: "agroecologia",
          icon: <Leaf className="w-5 h-5" />,
          title: "🍃 Proyectos de agroecología y permacultura",
          description: [
            "Especializado en producción agroecológica",
            "Aplico principios de permacultura"
          ]
        },
        {
          id: "productos-organicos",
          icon: <Apple className="w-5 h-5" />,
          title: "🍃 Emprendimientos de productos naturales/orgánicos",
          description: [
            "Produzco alimentos naturales u orgánicos",
            "Especializado en productos saludables"
          ]
        },
        {
          id: "bebidas-tradicionales",
          icon: <Coffee className="w-5 h-5" />,
          title: "🍃 Bebidas tradicionales y fermentos",
          description: [
            "Especializado en bebidas tradicionales",
            "Produzco fermentos y bebidas ancestrales"
          ]
        },
        {
          id: "cafes-cacao",
          icon: <Coffee className="w-5 h-5" />,
          title: "🍃 Cafés y barras de cacao con trazabilidad",
          description: [
            "Especializado en café o cacao trazable",
            "Trabajo directo con productores"
          ]
        },
        {
          id: "cocina-impacto-social",
          icon: <Heart className="w-5 h-5" />,
          title: "🍃 Proyectos de cocina con impacto social",
          description: [
            "Cocina que genera impacto social",
            "Enfocado en transformación comunitaria"
          ]
        },
        
        // 🚲 Movilidad y Transporte Ecológico
        {
          id: "transporte-electrico",
          icon: <Zap className="w-5 h-5" />,
          title: "🚲 Transporte eléctrico (vehículos, motos, buses)",
          description: [
            "Ofrezco transporte eléctrico",
            "Especializado en movilidad limpia"
          ]
        },
        {
          id: "bicicletas-cicloturismo",
          icon: <Bike className="w-5 h-5" />,
          title: "🚲 Servicios de bicicletas y cicloturismo",
          description: [
            "Especializado en cicloturismo",
            "Ofrezco servicios de bicicletas"
          ]
        },
        {
          id: "movilidad-compartida",
          icon: <Car className="w-5 h-5" />,
          title: "🚲 Movilidad compartida o comunitaria",
          description: [
            "Gestiono sistemas de movilidad compartida",
            "Enfocado en transporte comunitario"
          ]
        },
        {
          id: "transporte-accesible",
          icon: <Accessibility className="w-5 h-5" />,
          title: "🚲 Proyectos de transporte accesible y bajo impacto",
          description: [
            "Transporte accesible y sostenible",
            "Bajo impacto ambiental"
          ]
        },
        
        // 🌱 ONG y Fundaciones
        {
          id: "conservacion-ecosistemas",
          icon: <Leaf className="w-5 h-5" />,
          title: "🌱 Conservación de ecosistemas y especies",
          description: [
            "Trabajo en conservación ambiental",
            "Especializado en protección de especies"
          ]
        },
        {
          id: "educacion-ambiental",
          icon: <GraduationCap className="w-5 h-5" />,
          title: "🌱 Educación ambiental y participación comunitaria",
          description: [
            "Especializado en educación ambiental",
            "Promuevo participación comunitaria"
          ]
        },
        {
          id: "desarrollo-territorial",
          icon: <Map className="w-5 h-5" />,
          title: "🌱 Desarrollo territorial sostenible",
          description: [
            "Trabajo en desarrollo territorial",
            "Enfocado en sostenibilidad local"
          ]
        },
        {
          id: "fortalecimiento-comunidades",
          icon: <Users className="w-5 h-5" />,
          title: "🌱 Fortalecimiento de comunidades y saberes ancestrales",
          description: [
            "Fortalezco capacidades comunitarias",
            "Protego saberes ancestrales"
          ]
        },
        {
          id: "proteccion-agua",
          icon: <Droplets className="w-5 h-5" />,
          title: "🌱 Protección del agua y gestión de cuencas",
          description: [
            "Especializado en gestión hídrica",
            "Protección de fuentes de agua"
          ]
        },
        {
          id: "cultura-arte",
          icon: <Palette className="w-5 h-5" />,
          title: "🌱 Cultura, arte y transformación social",
          description: [
            "Uso el arte para transformación social",
            "Trabajo en proyectos culturales"
          ]
        },
        
        // 📚 Educación y Sensibilización Ambiental
        {
          id: "instituciones-educativas",
          icon: <School className="w-5 h-5" />,
          title: "📚 Instituciones educativas con enfoque en turismo o ambiente",
          description: [
            "Institución educativa especializada",
            "Enfoque en turismo o ambiente"
          ]
        },
        {
          id: "escuelas-liderazgo",
          icon: <Users className="w-5 h-5" />,
          title: "📚 Escuelas de liderazgo y cambio climático",
          description: [
            "Formo líderes en cambio climático",
            "Especializado en liderazgo ambiental"
          ]
        },
        {
          id: "proyectos-pedagogicos",
          icon: <BookOpen className="w-5 h-5" />,
          title: "📚 Proyectos pedagógicos territoriales o itinerantes",
          description: [
            "Desarrollo proyectos pedagógicos",
            "Educación territorial o itinerante"
          ]
        },
        {
          id: "formacion-sostenibilidad",
          icon: <Award className="w-5 h-5" />,
          title: "📚 Programas de formación en sostenibilidad",
          description: [
            "Especializado en formación en sostenibilidad",
            "Programas educativos ambientales"
          ]
        },
        {
          id: "contenidos-educativos",
          icon: <Monitor className="w-5 h-5" />,
          title: "📚 Creadores de contenidos educativos",
          description: [
            "Creo contenidos educativos",
            "Especializado en comunicación ambiental"
          ]
        },
        
        // 💡 Tecnología para el Turismo Sostenible
        {
          id: "plataformas-reservas",
          icon: <Smartphone className="w-5 h-5" />,
          title: "💡 Plataformas de reservas responsables",
          description: [
            "Desarrollo plataformas de reservas",
            "Enfoque en turismo responsable"
          ]
        },
        {
          id: "mapas-herramientas",
          icon: <Map className="w-5 h-5" />,
          title: "💡 Mapas y herramientas digitales para viajeros conscientes",
          description: [
            "Desarrollo herramientas digitales",
            "Para viajeros conscientes"
          ]
        },
        {
          id: "tecnologias-limpias",
          icon: <Zap className="w-5 h-5" />,
          title: "💡 Tecnologías limpias aplicadas al turismo",
          description: [
            "Desarrollo tecnologías limpias",
            "Aplicadas al sector turístico"
          ]
        },
        {
          id: "medicion-impacto",
          icon: <BarChart3 className="w-5 h-5" />,
          title: "💡 Soluciones para medición de impacto",
          description: [
            "Desarrollo sistemas de medición",
            "Huella hídrica, carbono, etc."
          ]
        },
        {
          id: "innovacion-social",
          icon: <Lightbulb className="w-5 h-5" />,
          title: "💡 Innovación social y tecnológica",
          description: [
            "Especializado en innovación social",
            "Desarrollo tecnológico con impacto"
          ]
        },
        
        // 🤝 Aliados y Patrocinadores
        {
          id: "validadores-proceso",
          icon: <Shield className="w-5 h-5" />,
          title: "🤝 Validadores del proceso",
          description: [
            "Institución validadora",
            "Academia, red o institución"
          ]
        },
        {
          id: "patrocinadores-principales",
          icon: <Star className="w-5 h-5" />,
          title: "🤝 Patrocinadores principales y co-creadores",
          description: [
            "Patrocinador principal",
            "Co-creador del Festival NATUR"
          ]
        },
        {
          id: "marcas-aliadas",
          icon: <Handshake className="w-5 h-5" />,
          title: "🤝 Marcas aliadas con enfoque sostenible",
          description: [
            "Marca con enfoque sostenible",
            "Aliada del Festival NATUR"
          ]
        },
        {
          id: "medios-comunicacion",
          icon: <Radio className="w-5 h-5" />,
          title: "🤝 Medios de comunicación aliados",
          description: [
            "Medio de comunicación aliado",
            "Difundo turismo sostenible"
          ]
        },
        {
          id: "embajadores-voceros",
          icon: <Users className="w-5 h-5" />,
          title: "🤝 Embajadores y voceros del Festival",
          description: [
            "Embajador o vocero",
            "Represento el Festival NATUR"
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
