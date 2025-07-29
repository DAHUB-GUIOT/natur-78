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
  "academica-publica": {
    title: "Agenda Académica Abierta al Público",
    subtitle: "Ejes temáticos: Agua / Medio Ambiente / Turismo consciente y responsable",
    horario: "9:00 a.m. – 4:00 p.m.",
    lugar: "Escenario lugar común",
    color: "#cad95e",
    days: [
      {
        day: "Día 1: Sábado 15 de marzo",
        sessions: [
          {
            time: "9:00 - 9:30",
            title: "Ceremonia de apertura: Bienvenida al lugar común",
            speakers: ["Brigitte Baptiste", "Comunidades invitadas"],
            type: "ceremonia",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "9:40 - 10:50",
            title: "Panel: Viajar con sentido: hacia un turismo que cuida",
            speakers: ["Claudia Bernal - Parques Nacionales", "Andrés Rodríguez - Festival NATUR", "Camilo Robledo - Live Happy"],
            moderator: "Universidad EAN",
            type: "panel",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "11:00 - 11:30",
            title: "Conversatorio: Gentrificación, turismo y derecho a la ciudad",
            speakers: ["Diana Wiesner - Fundación Cerros de Bogotá", "Arquitecto experto en urbanismo", "Viceministerio de Turismo de MINCIT"],
            type: "conversatorio",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "11:45 - 12:15",
            title: "Conversatorio: ¿Es posible un turismo más responsable?",
            speakers: ["Santiago Giraldo - Fundación Pro Sierra", "CAR - Luisa Fernando Aguirre"],
            type: "conversatorio",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "14:30 - 16:00",
            title: "Relatos vivos: Primer momento - Las 50 historias más transformadoras del turismo",
            speakers: ["Diversos relatores"],
            type: "relatos",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          }
        ]
      },
      {
        day: "Día 2: Domingo 16 de marzo",
        sessions: [
          {
            time: "9:00 - 9:30",
            title: "Charla de apertura: El lugar común",
            speakers: ["Camila Buelvas - Festival NATUR", "Alejandro Rogelis - Arquitecto del CEFE Chapinero"],
            type: "charla",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "9:30 - 11:00",
            title: "Panel: La sostenibilidad más allá del marketing",
            speakers: ["Dago Ospina - Tornus Agencia", "Juan Fernando Rubio - Green Destinations", "Invitado internacional"],
            moderator: "Universidad EAN",
            type: "panel",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "11:30 - 13:00",
            title: "Ponencia: El poder de contar historias",
            speakers: ["Dago Ospina - Tornus Agencia"],
            type: "ponencia",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "14:30 - 16:00",
            title: "Relatos vivos: Segundo momento - Las 50 historias más transformadoras del turismo",
            speakers: ["Diversos relatores"],
            type: "relatos",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          }
        ]
      }
    ]
  },
  "academica-especializada": {
    title: "Agenda Académica Especializada",
    subtitle: "Ejes temáticos: Turismo, Tecnología y Sostenibilidad",
    horario: "9:00 a.m. – 4:00 p.m.",
    lugar: "Escenario Visión Turismo",
    color: "#181c0d",
    days: [
      {
        day: "Día 1: Sábado 15 de marzo",
        sessions: [
          {
            time: "9:00 – 9:30",
            title: "Tecnología con propósito en el turismo sostenible",
            description: "Una mirada al uso ético de la tecnología en los viajes, desde la innovación social y el impacto ambiental.",
            speakers: ["ACOTUR"],
            type: "ponencia",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "9:40 – 10:10",
            title: "Del dato a la decisión: sistemas de monitoreo para destinos sostenibles",
            description: "Indicadores, tecnología cívica y datos abiertos para la planificación turística responsable.",
            speakers: ["Fundación CREATA", "Universidad EAN"],
            type: "conversatorio",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "10:10 – 10:40",
            title: "La digitalización del territorio: oportunidades y riesgos",
            speakers: ["FONTUR"],
            type: "charla",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "11:50 – 12:20",
            title: "Blockchain y turismo regenerativo: ¿una herramienta para la transparencia?",
            description: "Aplicaciones emergentes para trazabilidad, certificaciones, pagos y confianza comunitaria.",
            speakers: ["Invitado internacional", "Experto en innovación cívica digital"],
            type: "charla",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "12:20 – 12:50",
            title: "Juventud, redes y nuevas formas de habitar el viaje",
            description: "El rol de las redes sociales y las plataformas digitales en el turismo consciente.",
            speakers: ["Red de turismo joven", "Colectivo de viajeros tecnológicos"],
            type: "conversatorio",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "12:50 – 13:20",
            title: "Innovaciones que están cambiando el turismo en Colombia",
            speakers: ["Startups aliadas (Life Happy)", "Colectivos", "Apps de ecoturismo", "Observatorios territoriales"],
            type: "panel",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          }
        ]
      },
      {
        day: "Día 2: Domingo 16 de marzo",
        sessions: [
          {
            time: "9:00 – 9:30",
            title: "Inteligencia artificial en la planificación turística: ¿aliada o amenaza?",
            speakers: ["Universidad EAN", "Experto en IA aplicada al turismo"],
            type: "charla",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "9:40 – 10:10",
            title: "Tecnología y ética en el relato de los destinos",
            description: "Storytelling digital, fake green y apropiación cultural en el marketing verde.",
            speakers: ["Andrea García (Nosotras para Nosotras)", "Creativos invitados", "Agencia Sístole o Sancho"],
            type: "mesa-redonda",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "10:20 – 10:50",
            title: "Demo en vivo: Mapa del Turismo Responsable de Colombia",
            speakers: ["Equipo NATUR"],
            type: "demo",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "11:00 – 11:30",
            title: "Carbono, apps y movilidad consciente",
            speakers: ["Equipo de Placebranders", "Startups de movilidad ecológica"],
            type: "charla",
            image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          },
          {
            time: "11:40 – 12:10",
            title: "Tecnología popular y turismo indígena: alianzas para la autonomía",
            speakers: ["Representantes de procesos indígenas", "Aliados académicos"],
            type: "panel",
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
    default: return 'bg-gray-100 text-gray-800';
  }
};

export function Agenda() {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [activeTab, setActiveTab] = useState('academica-publica');
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
              <TabsList className="grid w-full grid-cols-2 bg-transparent border border-white/20 p-1 rounded-none">
                <TabsTrigger 
                  value="academica-publica" 
                  className="data-[state=active]:bg-white data-[state=active]:text-black text-white/70 font-mono text-sm tracking-wide rounded-none border-r border-white/20"
                >
                  AGENDA PÚBLICA
                </TabsTrigger>
                <TabsTrigger 
                  value="academica-especializada"
                  className="data-[state=active]:bg-white data-[state=active]:text-black text-white/70 font-mono text-sm tracking-wide rounded-none"
                >
                  ESPECIALIZADA
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