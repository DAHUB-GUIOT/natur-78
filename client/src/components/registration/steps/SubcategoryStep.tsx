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
        // 1. Alojamientos Sostenibles
        {
          id: "ecohoteles",
          icon: <Hotel className="w-5 h-5" />,
          title: "🌱 Ecohoteles",
          description: [
            "Hotel con prácticas ambientales y sostenibles",
            "Certificación ecológica y gestión responsable"
          ]
        },
        {
          id: "glampings",
          icon: <Tent className="w-5 h-5" />,
          title: "🌱 Glampings",
          description: [
            "Glamping con enfoque ecológico",
            "Hospedaje en contacto con la naturaleza"
          ]
        },
        {
          id: "hostales-rurales",
          icon: <Home className="w-5 h-5" />,
          title: "🌱 Hostales rurales",
          description: [
            "Hospedaje rural sostenible",
            "Experiencia auténtica en el campo"
          ]
        },
        {
          id: "reservas-naturales",
          icon: <Leaf className="w-5 h-5" />,
          title: "🌱 Reservas naturales con hospedaje",
          description: [
            "Alojamiento en reservas de conservación",
            "Turismo de naturaleza y biodiversidad"
          ]
        },
        {
          id: "cabanas-autosuficientes",
          icon: <Zap className="w-5 h-5" />,
          title: "🌱 Cabañas autosuficientes",
          description: [
            "Alojamiento con energías renovables",
            "Sistemas de autoabastecimiento sostenible"
          ]
        },

        // 2. Agencias y Operadores de Turismo
        {
          id: "agencias-ecologicas",
          icon: <Map className="w-5 h-5" />,
          title: "🧭 Agencias de turismo ecológico",
          description: [
            "Tours con enfoque de conservación",
            "Experiencias de bajo impacto ambiental"
          ]
        },
        {
          id: "tours-comunitarios",
          icon: <Users className="w-5 h-5" />,
          title: "🧭 Tours comunitarios o indígenas",
          description: [
            "Experiencias con comunidades locales",
            "Turismo cultural y territorial"
          ]
        },
        {
          id: "turismo-cientifico",
          icon: <BookOpen className="w-5 h-5" />,
          title: "🧭 Turismo científico / de naturaleza",
          description: [
            "Experiencias educativas y de investigación",
            "Avistamiento de fauna y flora"
          ]
        },
        {
          id: "rutas-culturales",
          icon: <Building2 className="w-5 h-5" />,
          title: "🧭 Rutas culturales sostenibles",
          description: [
            "Recorridos por patrimonio cultural",
            "Turismo histórico responsable"
          ]
        },

        // 3. Gastronomía Local y Sostenible
        {
          id: "restaurantes-km0",
          icon: <Utensils className="w-5 h-5" />,
          title: "🍃 Restaurantes de kilómetro cero",
          description: [
            "Cocina con ingredientes locales",
            "Cadena de suministro sostenible"
          ]
        },
        {
          id: "cocinas-comunitarias",
          icon: <Apple className="w-5 h-5" />,
          title: "🍃 Cocinas comunitarias o tradicionales",
          description: [
            "Gastronomía tradicional y cultural",
            "Recetas ancestrales y locales"
          ]
        },
        {
          id: "productos-organicos",
          icon: <Droplets className="w-5 h-5" />,
          title: "🍃 Productos orgánicos y locales",
          description: [
            "Alimentos orgánicos certificados",
            "Producción local y sostenible"
          ]
        },
        {
          id: "cafes-sostenibles",
          icon: <Coffee className="w-5 h-5" />,
          title: "🍃 Cafés y bares con prácticas sostenibles",
          description: [
            "Establecimientos con criterios ambientales",
            "Comercio justo y responsable"
          ]
        },

        // 4. Movilidad y Transporte Ecológico
        {
          id: "alquiler-bicicletas",
          icon: <Bike className="w-5 h-5" />,
          title: "🚲 Alquiler de bicicletas",
          description: [
            "Movilidad sostenible y turística",
            "Transporte libre de emisiones"
          ]
        },
        {
          id: "transporte-electrico",
          icon: <Car className="w-5 h-5" />,
          title: "🚲 Transporte eléctrico o híbrido",
          description: [
            "Vehículos de bajas emisiones",
            "Movilidad ecológica turística"
          ]
        },
        {
          id: "carpooling",
          icon: <Users className="w-5 h-5" />,
          title: "🚲 Carpooling o transporte colaborativo",
          description: [
            "Transporte compartido y eficiente",
            "Reducción de huella de carbono"
          ]
        },
        {
          id: "caminatas-guiadas",
          icon: <Compass className="w-5 h-5" />,
          title: "🚲 Caminatas o rutas a pie guiadas",
          description: [
            "Senderismo y turismo a pie",
            "Conexión directa con la naturaleza"
          ]
        },

        // 5. Artesanías y Productos Locales
        {
          id: "artesanos-locales",
          icon: <Palette className="w-5 h-5" />,
          title: "🎨 Artesanos locales",
          description: [
            "Productos artesanales tradicionales",
            "Preservación de técnicas ancestrales"
          ]
        },
        {
          id: "cooperativas-mujeres",
          icon: <Users className="w-5 h-5" />,
          title: "🎨 Cooperativas de mujeres o comunidades",
          description: [
            "Emprendimientos colectivos sostenibles",
            "Empoderamiento económico comunitario"
          ]
        },
        {
          id: "moda-sostenible",
          icon: <Shield className="w-5 h-5" />,
          title: "🎨 Moda sostenible",
          description: [
            "Ropa y accesorios ecológicos",
            "Producción ética y responsable"
          ]
        },
        {
          id: "cosmetica-natural",
          icon: <Droplets className="w-5 h-5" />,
          title: "🎨 Cosmética natural / productos biodegradables",
          description: [
            "Productos de cuidado personal naturales",
            "Ingredientes orgánicos y biodegradables"
          ]
        },

        // 6. Educación y Sensibilización Ambiental
        {
          id: "escuelas-verdes",
          icon: <School className="w-5 h-5" />,
          title: "📚 Escuelas verdes",
          description: [
            "Educación ambiental y sostenibilidad",
            "Programas pedagógicos ecológicos"
          ]
        },
        {
          id: "ongs-ambientales",
          icon: <Heart className="w-5 h-5" />,
          title: "📚 ONGs y fundaciones ambientales",
          description: [
            "Organizaciones de conservación",
            "Proyectos de protección ambiental"
          ]
        },
        {
          id: "talleres-permacultura",
          icon: <Leaf className="w-5 h-5" />,
          title: "📚 Talleres y cursos (permacultura, reciclaje, bioconstrucción)",
          description: [
            "Formación en prácticas sostenibles",
            "Capacitación ambiental especializada"
          ]
        },
        {
          id: "investigacion-ecologica",
          icon: <BookOpen className="w-5 h-5" />,
          title: "📚 Proyectos de investigación ecológica",
          description: [
            "Investigación científica ambiental",
            "Estudios de biodiversidad y conservación"
          ]
        },

        // 7. Tecnología para el Turismo Sostenible
        {
          id: "apps-rutas",
          icon: <Smartphone className="w-5 h-5" />,
          title: "💡 Apps de rutas y senderos",
          description: [
            "Aplicaciones de navegación ecológica",
            "Tecnología para senderismo sostenible"
          ]
        },
        {
          id: "plataformas-reserva",
          icon: <Monitor className="w-5 h-5" />,
          title: "💡 Plataformas de reserva ecológica",
          description: [
            "Sistemas de booking sostenible",
            "Tecnología para turismo responsable"
          ]
        },
        {
          id: "medicion-carbono",
          icon: <BarChart3 className="w-5 h-5" />,
          title: "💡 Herramientas de medición de huella de carbono",
          description: [
            "Calculadoras de impacto ambiental",
            "Tecnología de sostenibilidad"
          ]
        },
        {
          id: "energias-renovables",
          icon: <Lightbulb className="w-5 h-5" />,
          title: "💡 Energías renovables para turismo",
          description: [
            "Soluciones energéticas sostenibles",
            "Tecnología verde para hospedaje"
          ]
        },

        // 8. Bienestar y Experiencias Holísticas
        {
          id: "centros-meditacion",
          icon: <Heart className="w-5 h-5" />,
          title: "🧘 Centros de meditación y yoga",
          description: [
            "Espacios de bienestar y reconexión",
            "Prácticas de mindfulness en naturaleza"
          ]
        },
        {
          id: "spa-naturales",
          icon: <Droplets className="w-5 h-5" />,
          title: "🧘 Spa naturales o con productos orgánicos",
          description: [
            "Tratamientos con ingredientes naturales",
            "Terapias holísticas sostenibles"
          ]
        },
        {
          id: "terapias-naturaleza",
          icon: <Leaf className="w-5 h-5" />,
          title: "🧘 Terapias en la naturaleza (baños de bosque, sonido, etc.)",
          description: [
            "Experiencias terapéuticas al aire libre",
            "Sanación a través del contacto natural"
          ]
        },

        // 9. Emprendimientos Sociales y Comunitarios
        {
          id: "turismo-indigena",
          icon: <Users className="w-5 h-5" />,
          title: "🤝 Turismo con comunidades indígenas",
          description: [
            "Experiencias culturales auténticas",
            "Turismo étnico responsable"
          ]
        },
        {
          id: "empresas-b",
          icon: <Award className="w-5 h-5" />,
          title: "🤝 Empresas B / certificadas en sostenibilidad",
          description: [
            "Empresas con certificación B Corp",
            "Negocios con triple impacto"
          ]
        },
        {
          id: "proyectos-colaborativos",
          icon: <Network className="w-5 h-5" />,
          title: "🤝 Proyectos colaborativos o de impacto social",
          description: [
            "Iniciativas de economía colaborativa",
            "Proyectos de transformación social"
          ]
        },

        // 10. Aliados y Patrocinadores
        {
          id: "instituciones-gubernamentales",
          icon: <Building2 className="w-5 h-5" />,
          title: "🏛️ Instituciones gubernamentales",
          description: [
            "Entidades del sector público",
            "Políticas de turismo sostenible"
          ]
        },
        {
          id: "marcas-conscientes",
          icon: <Star className="w-5 h-5" />,
          title: "🏛️ Marcas conscientes / sostenibles",
          description: [
            "Empresas con propósito ambiental",
            "Marcas comprometidas con sostenibilidad"
          ]
        },
        {
          id: "bancos-verdes",
          icon: <DollarSign className="w-5 h-5" />,
          title: "🏛️ Bancos o fintech verdes",
          description: [
            "Entidades financieras sostenibles",
            "Productos financieros verdes"
          ]
        },
        {
          id: "fundaciones-internacionales",
          icon: <Globe className="w-5 h-5" />,
          title: "🏛️ Fundaciones y cooperación internacional",
          description: [
            "Organizaciones de desarrollo sostenible",
            "Cooperación internacional ambiental"
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