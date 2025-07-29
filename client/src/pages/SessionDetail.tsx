import { useParams, useLocation } from "wouter";
import { Clock, MapPin, Users, ArrowLeft, Calendar, User, Play, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

// Import the complete agenda data - this should match exactly with Agenda.tsx
// For simplicity, we'll create a function that can be shared between components
const createAgendaData = () => ({
  "vive-natur": {
    title: "VIVE NATUR - Agenda Abierta",
    subtitle: "Charlas NATUR • Rooftop + Zona de Comidas • Emprendimientos Sostenibles • Zona Chill • Foro Colombia Sostenible 2025",
    horario: "9:00 a.m. – 6:00 p.m.",
    lugar: "Acceso Libre - Todos los Espacios",
    color: "#cad95e",
    days: [
      {
        day: "Día 1: Sábado 15 de marzo",
        sessions: [
          {
            time: "9:00 - 9:30",
            title: "Charlas NATUR: Apertura del Festival",
            speakers: ["Brigitte Baptiste", "Equipo Festival NATUR"],
            type: "charla",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            description: "Ceremonia de apertura del Festival NATUR 2025 con la participación especial de Brigitte Baptiste, reconocida bióloga y experta en biodiversidad. Un momento histórico para dar inicio a la celebración del turismo sostenible en Colombia.",
            id: "charlas-apertura-festival"
          },
          {
            time: "10:00 - 11:30",
            title: "Rooftop + Zona de Comidas: Networking Gastronómico",
            speakers: ["Chefs Sostenibles", "Productores Locales"],
            type: "experiencia",
            image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            description: "Experiencia gastronómica única en el rooftop del CEFE Chapinero. Degusta productos locales y conoce a productores sostenibles mientras disfrutas de una vista panorámica de Bogotá. Networking con enfoque en gastronomía responsable.",
            id: "rooftop-networking-gastronomico"
          }
        ]
      }
    ]
  }
  // Note: In production, this would include ALL sessions from all agenda types
});

const agendaData = createAgendaData();

interface Session {
  time: string;
  title: string;
  speakers: string[];
  type: string;
  image: string;
  description?: string;
  moderator?: string;
  id: string;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'ceremonia': return <Calendar className="w-5 h-5" />;
    case 'panel': case 'conversatorio': case 'mesa-redonda': return <Users className="w-5 h-5" />;
    case 'charla': case 'ponencia': return <User className="w-5 h-5" />;
    case 'relatos': case 'demo': case 'musica': return <Play className="w-5 h-5" />;
    case 'ritual': case 'arte': return <Star className="w-5 h-5" />;
    case 'taller': case 'actividad': case 'juego': return <Users className="w-5 h-5" />;
    case 'vip': case 'startup': case 'wellness': case 'experiencia': case 'rumba': case 'gastronomia': 
    case 'showcase': case 'entretenimiento': case 'foro': case 'pitch': case 'bienestar': 
      return <Star className="w-5 h-5" />;
    default: return <Calendar className="w-5 h-5" />;
  }
};

const getTypeLabel = (type: string) => {
  const labels: { [key: string]: string } = {
    'charla': 'Charla',
    'experiencia': 'Experiencia',
    'showcase': 'Showcase',
    'entretenimiento': 'Entretenimiento',
    'foro': 'Foro',
    'pitch': 'Pitch',
    'gastronomia': 'Gastronomía',
    'bienestar': 'Bienestar',
    'ceremonia': 'Ceremonia',
    'vip': 'VIP',
    'arte': 'Arte',
    'taller': 'Taller',
    'startup': 'Startup',
    'wellness': 'Wellness',
    'rumba': 'Rumba',
    'ritual': 'Ritual',
    'musica': 'Música',
    'actividad': 'Actividad',
    'juego': 'Juego',
    'conversatorio': 'Conversatorio'
  };
  return labels[type] || type.charAt(0).toUpperCase() + type.slice(1);
};

const findSession = (sessionId: string): { session: Session | null, agendaType: string, color: string } => {
  for (const [agendaType, agenda] of Object.entries(agendaData)) {
    for (const day of agenda.days) {
      const session = day.sessions.find(s => s.id === sessionId);
      if (session) {
        return { session, agendaType, color: agenda.color };
      }
    }
  }
  return { session: null, agendaType: '', color: '#cad95e' };
};

export default function SessionDetail() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [, navigate] = useLocation();
  
  if (!sessionId) {
    return <div>Session not found</div>;
  }

  const { session, agendaType, color } = findSession(sessionId);

  if (!session) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4 text-white">Sesión no encontrada</h1>
          <Link href="/agenda">
            <Button className="bg-white text-black hover:bg-gray-100 rounded-none">
              Volver a la Agenda
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Image */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={session.image} 
          alt={session.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {/* Back Button */}
        <Link href="/agenda">
          <Button 
            className="absolute top-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 rounded-none"
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Agenda
          </Button>
        </Link>

        {/* Session Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Type Badge */}
            <div className="flex items-center mb-4">
              <div 
                className="flex items-center px-4 py-2 rounded-none text-black font-light text-sm"
                style={{ backgroundColor: color }}
              >
                {getTypeIcon(session.type)}
                <span className="ml-2 uppercase tracking-wider">{getTypeLabel(session.type)}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
              {session.title}
            </h1>

            {/* Time and Speakers */}
            <div className="flex flex-wrap items-center gap-6 text-white/80 text-lg">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                {session.time}
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                {session.speakers.join(", ")}
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Centro de Felicidad Chapinero
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-light text-white mb-6">Descripción</h2>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                {session.description}
              </p>

              {/* Additional Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-light text-white mb-3">¿Qué aprenderás?</h3>
                  <ul className="text-white/80 space-y-2">
                    <li className="flex items-start">
                      <ChevronRight className="w-5 h-5 mr-2 mt-0.5 text-white/60" />
                      Principios fundamentales del turismo sostenible
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-5 h-5 mr-2 mt-0.5 text-white/60" />
                      Estrategias de implementación práctica
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-5 h-5 mr-2 mt-0.5 text-white/60" />
                      Casos de éxito en Colombia y Latinoamérica
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-5 h-5 mr-2 mt-0.5 text-white/60" />
                      Herramientas para medir impacto ambiental
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-light text-white mb-3">Dirigido a</h3>
                  <p className="text-white/80">
                    Emprendedores turísticos, operadores, guías, estudiantes de turismo, 
                    profesionales del sector hotelero, funcionarios públicos, investigadores 
                    y cualquier persona interesada en el desarrollo sostenible del turismo.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl">
                <h3 className="text-xl font-light text-white mb-4">Información del Evento</h3>
                <div className="space-y-4 text-white/80">
                  <div>
                    <span className="block text-white font-light mb-1">Horario</span>
                    {session.time}
                  </div>
                  <div>
                    <span className="block text-white font-light mb-1">Ubicación</span>
                    Centro de Felicidad Chapinero
                  </div>
                  <div>
                    <span className="block text-white font-light mb-1">Modalidad</span>
                    Presencial
                  </div>
                  <div>
                    <span className="block text-white font-light mb-1">Idioma</span>
                    Español
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl">
                <h3 className="text-xl font-light text-white mb-4">Ponentes</h3>
                <div className="space-y-4">
                  {session.speakers.map((speaker, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3">
                        <User className="w-5 h-5 text-white/60" />
                      </div>
                      <div>
                        <div className="text-white font-light">{speaker}</div>
                        <div className="text-white/60 text-sm">Experto en Sostenibilidad</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl">
                <h3 className="text-xl font-light text-white mb-4">Acciones</h3>
                <div className="space-y-3">
                  <Button 
                    className="w-full rounded-none text-black font-light"
                    style={{ backgroundColor: color }}
                  >
                    Agregar a mi Agenda
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full bg-transparent border-white/20 text-white hover:bg-white/10 rounded-none font-light"
                  >
                    Compartir Sesión
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full bg-transparent border-white/20 text-white hover:bg-white/10 rounded-none font-light"
                  >
                    Descargar Información
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}