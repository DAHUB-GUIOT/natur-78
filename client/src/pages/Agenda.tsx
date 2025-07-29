import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, MapPin, Users, Calendar, ChevronRight, Play, User, Star, Filter, X, Eye } from "lucide-react";
import { Link } from "wouter";

// Session type definition
interface Session {
  time: string;
  title: string;
  speakers: string[];
  type: string;
  image: string;
  description?: string;
  moderator?: string;
}

// Agenda data structure
const agendaData = {
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
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "10:00 - 11:30",
            title: "Rooftop + Zona de Comidas: Networking Gastronómico",
            speakers: ["Chefs Sostenibles", "Productores Locales"],
            type: "experiencia",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "11:30 - 13:00",
            title: "Emprendimientos Sostenibles: Showcase de Proyectos",
            speakers: ["Startups Verdes", "Emprendedores Locales"],
            type: "showcase",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "14:00 - 15:30",
            title: "Zona Chill: Música y Relajación",
            speakers: ["Artistas Locales", "DJs Orgánicos"],
            type: "entretenimiento",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "16:00 - 18:00",
            title: "Foro Colombia Sostenible 2025: Panel Nacional",
            speakers: ["Expertos en Sostenibilidad", "Gobierno Nacional", "Academia"],
            type: "foro",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          }
        ]
      },
      {
        day: "Día 2: Domingo 16 de marzo",
        sessions: [
          {
            time: "9:00 - 10:30",
            title: "Charlas NATUR: Turismo Regenerativo",
            speakers: ["Expertos Internacionales", "Comunidades Locales"],
            type: "charla",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "11:00 - 12:30",
            title: "Emprendimientos Sostenibles: Pitch Session",
            speakers: ["Emprendedores", "Inversionistas"],
            type: "pitch",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "13:00 - 14:30",
            title: "Rooftop + Zona de Comidas: Almuerzo Sostenible",
            speakers: ["Restaurantes Km0", "Cocineros Tradicionales"],
            type: "gastronomia",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "15:00 - 16:30",
            title: "Zona Chill: Actividades de Cierre",
            speakers: ["Artistas", "Facilitadores Wellness"],
            type: "bienestar",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "17:00 - 18:00",
            title: "Ceremonia de Clausura VIVE NATUR",
            speakers: ["Equipo Festival NATUR", "Participantes"],
            type: "ceremonia",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          }
        ]
      }
    ]
  },
  "natur-pro": {
    title: "NATUR PRO - Agenda Especializada",
    subtitle: "Todo VIVE NATUR + Cartel de Artistas • Talleres • Zona Startups • Coffee Talks • Rumba • Zona Wellness • Experiencia NATUR • Zona VIP",
    horario: "8:00 a.m. – 10:00 p.m.",
    lugar: "Acceso VIP - Experiencia Completa",
    color: "#aa3b1e",
    days: [
      {
        day: "Día 1: Sábado 15 de marzo",
        sessions: [
          {
            time: "8:00 - 9:00",
            title: "Desayuno VIP + Coffee Talks Exclusivos",
            description: "Networking privado con líderes del sector turístico y sostenibilidad",
            speakers: ["Expertos VIP", "CEOs Turismo Sostenible"],
            type: "vip",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "9:00 - 10:30",
            title: "Cartel de Artistas: Presentaciones Matutinas",
            description: "Música en vivo y performances artísticas exclusivas para NATUR PRO",
            speakers: ["Artistas Nacionales", "Músicos Sostenibles"],
            type: "arte",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "10:30 - 12:00",
            title: "Talleres Especializados: Turismo Regenerativo",
            description: "Workshops prácticos sobre implementación de turismo regenerativo",
            speakers: ["Facilitadores Expertos", "Consultores Internacionales"],
            type: "taller",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "12:00 - 13:30",
            title: "Zona Startups: Pitch y Demo Day",
            description: "Presentaciones de startups de turismo sostenible y networking con inversionistas",
            speakers: ["Startups Seleccionadas", "Fondos de Inversión"],
            type: "startup",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "14:00 - 15:30",
            title: "Zona Wellness: Experiencias de Bienestar",
            description: "Sesiones de yoga, meditación y conexión con la naturaleza",
            speakers: ["Instructores Wellness", "Terapeutas Holísticos"],
            type: "wellness",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "16:00 - 17:30",
            title: "Experiencia NATUR: Actividad Inmersiva",
            description: "Experiencia única de turismo sostenible in situ",
            speakers: ["Guías Especializados", "Comunidades Locales"],
            type: "experiencia",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "19:00 - 22:00",
            title: "Rumba y Manifestaciones Culturales",
            description: "Fiesta exclusiva con música tradicional y contemporánea",
            speakers: ["DJs", "Grupos Folclóricos"],
            type: "rumba",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          }
        ]
      },

      {
        day: "Día 2: Domingo 16 de marzo",
        sessions: [
          {
            time: "8:00 - 9:00",
            title: "Coffee Talks VIP: Desayuno de Cierre",
            description: "Reflexiones y networking final con líderes del sector",
            speakers: ["Panelistas Destacados", "Invitados Especiales"],
            type: "vip",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "9:00 - 10:30",
            title: "Talleres Especializados: Implementación de Proyectos",
            description: "Sesiones prácticas para llevar las ideas a la realidad",
            speakers: ["Mentores Expertos", "Facilitadores"],
            type: "taller",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "10:30 - 12:00",
            title: "Zona Startups: Demo Final y Premiación",
            description: "Presentaciones finales y reconocimientos a mejores proyectos",
            speakers: ["Jurado de Expertos", "Startups Finalistas"],
            type: "startup",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "12:00 - 13:30",
            title: "Experiencia NATUR: Inmersión Completa",
            description: "Actividad experimental de turismo regenerativo",
            speakers: ["Guías Especializados", "Comunidades Anfitrionas"],
            type: "experiencia",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "14:00 - 15:30",
            title: "Zona Wellness: Sesión de Integración",
            description: "Mindfulness, yoga y reflexión sobre el impacto del festival",
            speakers: ["Terapeutas", "Instructores Certificados"],
            type: "wellness",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "16:00 - 17:30",
            title: "Cartel de Artistas: Presentaciones de Cierre",
            description: "Conciertos y performances para concluir el festival",
            speakers: ["Artistas Principales", "Invitados Especiales"],
            type: "arte",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "18:00 - 22:00",
            title: "Zona VIP: Cena de Gala y After Party",
            description: "Evento exclusivo de clausura con cena de gala y rumba final",
            speakers: ["Chefs Estrella", "DJs Internacionales"],
            type: "vip",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          }
        ]
      }
    ]
  },
  "agenda-cultural": {
    title: "Agenda Cultural NATUR",
    subtitle: "Festival NATUR CEFE Chapinero | 14 Y 15 de noviembre",
    horario: "9:00 a.m. – 6:00 p.m.",
    lugar: "Centro de Felicidad Chapinero",
    color: "#ff6b9d",
    days: [
      {
        day: "Día 1: Jueves 14 de noviembre",
        sessions: [
          {
            time: "4:00 p.m.",
            title: "Ritual colectivo del agua",
            description: "Ceremonia simbólica para agradecer y proteger el agua, guiada por sabedores.",
            speakers: ["Sabedores del agua"],
            type: "ritual",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "9:00 - 11:00 a.m.",
            title: "Taller Bombas de Semillas",
            description: "Aprende a crear bombas de vida con barro y semillas nativas para reforestar.",
            speakers: ["Facilitadores ambientales"],
            type: "taller",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "11:00 a.m.",
            title: "Taller Crea tu propio terrario",
            description: "Diseña tu ecosistema en miniatura con plantas, tierra y piedras. Te llevas tu terrario.",
            speakers: ["Jardineros urbanos"],
            type: "taller",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "10:00 a.m.",
            title: "Taller Tintes naturales y estampados",
            description: "Extrae pigmentos de plantas y estampa con elementos botánicos. Diseña tu tela inspirada en los colores de la tierra.",
            speakers: ["Artesanos textiles"],
            type: "taller",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "11:00 a.m.",
            title: "Origami del agua",
            description: "Plegado artístico con mensajes por el agua, la vida y el territorio.",
            speakers: ["Artistas del papel"],
            type: "arte",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "2:00 p.m.",
            title: "Círculo de tambores",
            description: "Toca, escucha y siente el ritmo colectivo con instrumentos de percusión.",
            speakers: ["Músicos tradicionales"],
            type: "musica",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          }
        ]
      },
      {
        day: "Día 2: Viernes 15 de noviembre",
        sessions: [
          {
            time: "9:00 a.m.",
            title: "Coffee Talks",
            description: "Conversaciones íntimas con actores del turismo y la sostenibilidad. Café en mano, sin micrófono.",
            speakers: ["Líderes del turismo sostenible"],
            type: "conversatorio",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "10:00 a.m.",
            title: "Calorías por el planeta",
            description: "Rutina divertida de ejercicio físico para activar el cuerpo con causa ambiental.",
            speakers: ["Entrenadores eco-conscientes"],
            type: "actividad",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "11:00 a.m.",
            title: "Bingo ecológico",
            description: "Juego interactivo con palabras, animales y símbolos del planeta.",
            speakers: ["Animadores ambientales"],
            type: "juego",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "12:00 p.m.",
            title: "Taller de trueque",
            description: "Intercambia saberes, ropa, libros o historias sin dinero.",
            speakers: ["Facilitadores de economía circular"],
            type: "taller",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "2:00 p.m.",
            title: "Yoga acuático",
            description: "Clase suave de relajación en el agua, apta para todos los cuerpos.",
            speakers: ["Instructores de yoga"],
            type: "bienestar",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "6:00 p.m.",
            title: "Observación del cielo y relatos de cosmovisiones",
            description: "Cerramos el día mirando las estrellas y escuchando mitos, saberes indígenas y relatos celestes sobre el agua y la vida.",
            speakers: ["Sabedores ancestrales", "Astrónomos"],
            type: "ceremonia",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          }
        ]
      }
    ]
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'ceremonia': return <Calendar className="w-4 h-4" />;
    case 'panel': return <Users className="w-4 h-4" />;
    case 'conversatorio': return <Users className="w-4 h-4" />;
    case 'charla': return <User className="w-4 h-4" />;
    case 'ponencia': return <User className="w-4 h-4" />;
    case 'relatos': return <Play className="w-4 h-4" />;
    case 'mesa-redonda': return <Users className="w-4 h-4" />;
    case 'demo': return <Play className="w-4 h-4" />;
    case 'ritual': return <Star className="w-4 h-4" />;
    case 'taller': return <Users className="w-4 h-4" />;
    case 'arte': return <Star className="w-4 h-4" />;
    case 'musica': return <Play className="w-4 h-4" />;
    case 'actividad': return <Users className="w-4 h-4" />;
    case 'juego': return <Play className="w-4 h-4" />;
    case 'bienestar': return <User className="w-4 h-4" />;
    default: return <Clock className="w-4 h-4" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'ceremonia': return 'bg-purple-100 text-purple-800';
    case 'panel': return 'bg-blue-100 text-blue-800';
    case 'conversatorio': return 'bg-green-100 text-green-800';
    case 'charla': return 'bg-orange-100 text-orange-800';
    case 'ponencia': return 'bg-red-100 text-red-800';
    case 'relatos': return 'bg-yellow-100 text-yellow-800';
    case 'mesa-redonda': return 'bg-indigo-100 text-indigo-800';
    case 'demo': return 'bg-pink-100 text-pink-800';
    case 'ritual': return 'bg-pink-100 text-pink-800';
    case 'taller': return 'bg-orange-100 text-orange-800';
    case 'arte': return 'bg-purple-100 text-purple-800';
    case 'musica': return 'bg-green-100 text-green-800';
    case 'actividad': return 'bg-cyan-100 text-cyan-800';
    case 'juego': return 'bg-yellow-100 text-yellow-800';
    case 'bienestar': return 'bg-teal-100 text-teal-800';
    case 'vip': return 'bg-yellow-100 text-yellow-800';
    case 'startup': return 'bg-blue-100 text-blue-800';
    case 'wellness': return 'bg-teal-100 text-teal-800';
    case 'experiencia': return 'bg-green-100 text-green-800';
    case 'rumba': return 'bg-pink-100 text-pink-800';
    case 'gastronomia': return 'bg-orange-100 text-orange-800';
    case 'showcase': return 'bg-purple-100 text-purple-800';
    case 'entretenimiento': return 'bg-cyan-100 text-cyan-800';
    case 'foro': return 'bg-indigo-100 text-indigo-800';
    case 'pitch': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export function Agenda() {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [activeTab, setActiveTab] = useState('vive-natur');
  const [filterType, setFilterType] = useState<string>('all');
  const [myAgenda, setMyAgenda] = useState<Set<string>>(new Set());

  const addToAgenda = (sessionTitle: string) => {
    const newAgenda = new Set(myAgenda);
    if (newAgenda.has(sessionTitle)) {
      newAgenda.delete(sessionTitle);
    } else {
      newAgenda.add(sessionTitle);
    }
    setMyAgenda(newAgenda);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Organic Background Textures */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="organic" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M20,50 Q50,20 80,50 Q50,80 20,50" fill="none" stroke="#cad95e" strokeWidth="0.5" opacity="0.3"/>
                <circle cx="30" cy="30" r="2" fill="#cad95e" opacity="0.2"/>
                <path d="M60,70 L80,60 L70,80 Z" fill="#181c0d" opacity="0.1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#organic)"/>
          </svg>
        </div>
        
        {/* Nature background with heavy blur */}
        <img 
          src="/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg" 
          alt="Festival NATUR Background"
          className="w-full h-full object-cover opacity-10 blur-3xl"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90"></div>
      </div>

      {/* Floating Header */}
      <header className="relative z-20 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <Link to="/">
              <Button 
                variant="ghost" 
                className="text-white/70 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/10 px-6 py-3 rounded-none font-mono text-sm tracking-wider"
              >
                ← VOLVER
              </Button>
            </Link>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black border-2 border-white/20 flex items-center justify-center font-bold text-2xl tracking-widest" style={{ color: '#cad95e' }}>
                N
              </div>
            </div>
          </div>
          
          <div className="text-center mb-16">
            <div className="inline-block">
              <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none" style={{ color: '#cad95e', textShadow: '0 0 20px rgba(202, 217, 94, 0.3)' }}>
                AGENDA
              </h1>
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent mb-4"></div>
              <h2 className="text-2xl md:text-3xl font-light text-white/80 tracking-wide">
                ACADÉMICA INTERACTIVA
              </h2>
            </div>
            <p className="text-lg text-white/60 max-w-2xl mx-auto mt-8 font-mono">
              Festival NATUR 2025 • Turismo Sostenible • Marzo 15-17
            </p>
          </div>
        </div>
      </header>

      {/* Controls Bar */}
      <div className="relative z-20 px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-none">
            
            {/* Agenda Tabs - Brutalist Style */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full lg:w-auto">
              <TabsList className="grid w-full grid-cols-3 bg-transparent border border-white/20 p-1 rounded-none">
                <TabsTrigger 
                  value="vive-natur" 
                  className="data-[state=active]:bg-white data-[state=active]:text-black text-white/70 font-mono text-sm tracking-wide rounded-none border-r border-white/20"
                >
                  VIVE NATUR
                </TabsTrigger>
                <TabsTrigger 
                  value="natur-pro"
                  className="data-[state=active]:bg-white data-[state=active]:text-black text-white/70 font-mono text-sm tracking-wide rounded-none border-r border-white/20"
                >
                  NATUR PRO
                </TabsTrigger>
                <TabsTrigger 
                  value="agenda-cultural"
                  className="data-[state=active]:bg-white data-[state=active]:text-black text-white/70 font-mono text-sm tracking-wide rounded-none"
                >
                  CULTURAL
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Filter Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-white/50" />
                <select 
                  value={filterType} 
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-black/60 border border-white/20 text-white text-sm px-4 py-2 rounded-none font-mono tracking-wide focus:outline-none focus:border-white/40"
                >
                  <option value="all">TODOS</option>
                  <option value="panel">PANELS</option>
                  <option value="charla">CHARLAS</option>
                  <option value="conversatorio">CONVERSATORIOS</option>
                  <option value="ponencia">PONENCIAS</option>
                  <option value="demo">DEMOS</option>
                  <option value="ritual">RITUALES</option>
                  <option value="taller">TALLERES</option>
                  <option value="arte">ARTE</option>
                  <option value="musica">MÚSICA</option>
                  <option value="actividad">ACTIVIDADES</option>
                  <option value="juego">JUEGOS</option>
                  <option value="bienestar">BIENESTAR</option>
                </select>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                className="bg-transparent border-white/20 text-white/70 hover:bg-white/10 rounded-none font-mono tracking-wide"
              >
                MI AGENDA ({myAgenda.size})
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>

            {Object.entries(agendaData).map(([key, agenda]) => (
              <TabsContent key={key} value={key} className="mt-8">
                {/* Agenda Header */}
                <Card className="bg-black/20 backdrop-blur-md border-white/20 mb-8">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl md:text-3xl font-sans text-white mb-2">
                      {agenda.title}
                    </CardTitle>
                    <p className="text-lg text-white/80 mb-4">{agenda.subtitle}</p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-white/70">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {agenda.horario}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {agenda.lugar}
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Days and Sessions */}
                {agenda.days.map((day, dayIndex) => (
                  <div key={dayIndex} className="mb-12">
                    <h2 className="text-3xl font-sans mb-6 text-center" style={{ color: agenda.color }}>
                      {day.day}
                    </h2>
                    
                    {/* Brutalist Card Grid */}
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                      {day.sessions
                        .filter(session => filterType === 'all' || session.type === filterType)
                        .map((session, sessionIndex) => (
                        <Card 
                          key={sessionIndex}
                          className="bg-black/60 backdrop-blur-sm border-2 border-white/10 hover:border-white/30 transition-all duration-500 cursor-pointer group rounded-none overflow-hidden hover:shadow-2xl hover:shadow-lime-500/20"
                          onClick={() => setSelectedSession(session)}
                        >
                          <div className="relative overflow-hidden">
                            <img 
                              src={session.image} 
                              alt={session.title}
                              className="w-full h-48 object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                            />
                            
                            {/* Glowing overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                            
                            {/* Type badge */}
                            <div className="absolute top-4 left-4">
                              <div className="bg-black/80 border border-white/20 px-3 py-1 font-mono text-xs tracking-widest text-white">
                                {session.type.toUpperCase()}
                              </div>
                            </div>
                            
                            {/* Time badge */}
                            <div className="absolute top-4 right-4">
                              <div className="bg-black/80 border border-white/20 px-3 py-1 font-mono text-xs tracking-widest text-white">
                                {session.time}
                              </div>
                            </div>
                            
                            {/* Add to agenda button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                addToAgenda(session.title);
                              }}
                              className={`absolute bottom-4 right-4 w-8 h-8 border-2 flex items-center justify-center transition-all duration-300 ${
                                myAgenda.has(session.title) 
                                  ? 'bg-lime-400 border-lime-400 text-black' 
                                  : 'bg-black/60 border-white/20 text-white hover:border-lime-400'
                              }`}
                            >
                              <Star className="w-4 h-4" fill={myAgenda.has(session.title) ? 'currentColor' : 'transparent'} />
                            </button>
                          </div>
                          
                          <CardContent className="p-6 space-y-4">
                            <h3 className="font-sans font-medium text-white text-lg leading-tight group-hover:text-lime-400 transition-colors duration-300">
                              {session.title}
                            </h3>
                            
                            {session.description && (
                              <p className="text-sm text-white/60 leading-relaxed">
                                {session.description}
                              </p>
                            )}
                            
                            {/* Speakers */}
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-xs text-white/40 font-mono tracking-wider">
                                <Users className="w-3 h-3" />
                                SPEAKERS
                              </div>
                              {session.speakers.slice(0, 2).map((speaker, speakerIndex) => (
                                <div key={speakerIndex} className="text-sm text-white/80 font-mono">
                                  {speaker}
                                </div>
                              ))}
                              
                              {session.speakers.length > 2 && (
                                <div className="text-xs text-white/50 font-mono">
                                  +{session.speakers.length - 2} MÁS
                                </div>
                              )}
                              
                              {session.moderator && (
                                <div className="pt-2 border-t border-white/10">
                                  <div className="text-xs text-white/40 font-mono tracking-wider mb-1">
                                    MODERACIÓN
                                  </div>
                                  <div className="text-sm text-white/80 font-mono">
                                    {session.moderator}
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            {/* Action buttons */}
                            <div className="flex gap-2 pt-4">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex-1 bg-transparent border-white/20 text-white/70 hover:bg-white/10 hover:border-white/40 rounded-none font-mono text-xs tracking-wider"
                              >
                                <Eye className="w-3 h-3 mr-2" />
                                VER MÁS
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      {/* Session Detail Modal */}
      {selectedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <Card className="bg-black/90 backdrop-blur-md border-white/20 max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="relative">
              <img 
                src={selectedSession.image} 
                alt={selectedSession.title}
                className="w-full h-60 object-cover rounded-t-lg"
              />
              <Button 
                variant="ghost" 
                size="sm"
                className="absolute top-4 right-4 bg-black/60 text-white hover:bg-black/80"
                onClick={() => setSelectedSession(null)}
              >
                ✕
              </Button>
            </div>
            
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge className={`${getTypeColor(selectedSession.type)} font-medium`}>
                  <span className="flex items-center gap-1">
                    {getTypeIcon(selectedSession.type)}
                    {selectedSession.type.charAt(0).toUpperCase() + selectedSession.type.slice(1)}
                  </span>
                </Badge>
                <Badge className="bg-white/10 text-white border-white/20">
                  {selectedSession.time}
                </Badge>
              </div>
              
              <h2 className="text-2xl font-sans font-medium text-white mb-4">
                {selectedSession.title}
              </h2>
              
              {selectedSession.description && (
                <p className="text-white/80 mb-6">
                  {selectedSession.description}
                </p>
              )}
              
              <div className="space-y-4">
                <h3 className="text-lg font-sans font-normal text-white">Speakers:</h3>
                {selectedSession.speakers.map((speaker: string, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white/80">{speaker}</span>
                  </div>
                ))}
                
                {selectedSession.moderator && (
                  <div className="pt-4 border-t border-white/20">
                    <h4 className="text-sm font-sans font-normal text-white/70 mb-2">Moderación:</h4>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        <Users className="w-4 h-4 text-white/70" />
                      </div>
                      <span className="text-white/70">{selectedSession.moderator}</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Agenda;