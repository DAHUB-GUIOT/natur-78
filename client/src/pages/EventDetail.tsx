import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from 'wouter';
import { 
  TreePine, ArrowLeft, Calendar, Clock, MapPin, Users, 
  Star, Share2, Bookmark, Heart, Ticket, Info,
  Facebook, Twitter, Instagram, Copy, Check
} from 'lucide-react';

const EventDetail = () => {
  const { id } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  // Sample events data
  const events = {
    'taller-permacultura': {
      title: 'Taller de Permacultura y Diseño Regenerativo',
      shortDescription: 'Aprende los principios fundamentales de la permacultura aplicados al turismo sostenible',
      fullDescription: `
        Un taller intensivo donde exploraremos los principios de la permacultura y cómo aplicarlos 
        al diseño de experiencias turísticas regenerativas. Los participantes aprenderán a crear 
        sistemas que no solo sean sostenibles, sino que activamente mejoren los ecosistemas y 
        comunidades donde operan.
        
        Durante esta sesión práctica, trabajaremos con casos reales de empresas que han implementado 
        principios permaculturales en sus operaciones turísticas, desde ecolodges que funcionan 
        como sistemas cerrados hasta tours que contribuyen a la restauración de ecosistemas.
      `,
      speakers: [
        {
          name: 'Dr. Roberto Castellanos',
          title: 'Experto en Permacultura',
          bio: 'Pionero en permacultura aplicada al turismo con 20 años de experiencia',
          image: '🌱'
        },
        {
          name: 'Ing. Patricia Herrera',
          title: 'Diseñadora de Sistemas Sostenibles',
          bio: 'Especialista en diseño de ecoaldeas y proyectos turísticos regenerativos',
          image: '🏗️'
        }
      ],
      date: '14 de Noviembre, 2025',
      time: '9:00 AM - 12:00 PM',
      duration: '3 horas',
      location: 'Auditorio CEFE - Chapinero',
      capacity: '50 personas',
      price: 'Incluido con entrada',
      category: 'Educativo',
      tags: ['Permacultura', 'Sostenibilidad', 'Diseño', 'Regenerativo'],
      level: 'Intermedio',
      requirements: 'Conocimientos básicos en sostenibilidad',
      materials: 'Se proporcionan todos los materiales',
      image: '🌿',
      agenda: [
        { time: '9:00 - 9:30', activity: 'Introducción a la Permacultura' },
        { time: '9:30 - 10:30', activity: 'Principios y Ética Permacultural' },
        { time: '10:30 - 10:45', activity: 'Pausa Café' },
        { time: '10:45 - 11:30', activity: 'Diseño de Sistemas Turísticos' },
        { time: '11:30 - 12:00', activity: 'Casos Prácticos y Q&A' }
      ]
    },
    'panel-biodiversidad': {
      title: 'Panel: Conservación de Biodiversidad y Turismo',
      shortDescription: 'Expertos internacionales discuten estrategias para integrar conservación y turismo',
      fullDescription: `
        Un panel de alto nivel que reunirá a conservacionistas, empresarios turísticos y líderes 
        comunitarios para explorar cómo el turismo puede convertirse en una herramienta efectiva 
        para la conservación de biodiversidad.
        
        Discutiremos casos exitosos de turismo de conservación, los desafíos actuales y las 
        oportunidades futuras para crear modelos que beneficien tanto a la vida silvestre como 
        a las comunidades locales.
      `,
      speakers: [
        {
          name: 'Dra. Carmen Delgado',
          title: 'Directora de Conservación, WWF Colombia',
          bio: 'Líder en programas de conservación marina y terrestre',
          image: '🦎'
        },
        {
          name: 'Miguel Santos',
          title: 'CEO EcoTours International',
          bio: 'Empresario pionero en turismo de conservación',
          image: '🦅'
        },
        {
          name: 'Taita Carlos Tandioy',
          title: 'Líder Indígena Inga',
          bio: 'Guardian tradicional del conocimiento ancestral amazónico',
          image: '🌳'
        }
      ],
      date: '15 de Noviembre, 2025',
      time: '2:00 PM - 4:00 PM',
      duration: '2 horas',
      location: 'Sala Principal CEFE',
      capacity: '200 personas',
      price: 'Incluido con entrada',
      category: 'Panel',
      tags: ['Biodiversidad', 'Conservación', 'Turismo', 'Sostenible'],
      level: 'Para todos los públicos',
      requirements: 'Ninguno',
      materials: 'Traducción simultánea disponible',
      image: '🦋',
      agenda: [
        { time: '2:00 - 2:15', activity: 'Bienvenida y Presentaciones' },
        { time: '2:15 - 3:00', activity: 'Mesa Redonda: Retos y Oportunidades' },
        { time: '3:00 - 3:30', activity: 'Casos de Éxito Regionales' },
        { time: '3:30 - 4:00', activity: 'Sesión de Preguntas y Respuestas' }
      ]
    },
    'networking-empresarial': {
      title: 'Networking Empresarial Sostenible',
      shortDescription: 'Espacio de conexión para empresarios del turismo sostenible',
      fullDescription: `
        Un evento de networking diseñado específicamente para empresarios, inversionistas y 
        emprendedores del sector turístico sostenible. Este espacio facilitará conexiones 
        estratégicas y oportunidades de colaboración entre actores clave del ecosistema.
        
        Incluye sesiones de speed networking, presentaciones de proyectos innovadores y 
        un marketplace donde las empresas pueden exhibir sus productos y servicios sostenibles.
      `,
      speakers: [
        {
          name: 'Carlos Ramírez',
          title: 'Presidente ANATO',
          bio: 'Líder gremial con visión en turismo sostenible',
          image: '🤝'
        },
        {
          name: 'Inversión Verde',
          title: 'Fondo de Inversión',
          bio: 'Especialistas en financiamiento de proyectos sostenibles',
          image: '💰'
        }
      ],
      date: '15 de Noviembre, 2025',
      time: '6:00 PM - 9:00 PM',
      duration: '3 horas',
      location: 'Terraza CEFE',
      capacity: '150 personas',
      price: 'Solo Pase PRO',
      category: 'Networking',
      tags: ['Networking', 'Empresarial', 'Colaboración', 'Negocios'],
      level: 'Empresarios y Emprendedores',
      requirements: 'Pase NATUR PRO',
      materials: 'Cocktail y catering incluido',
      image: '🤝',
      agenda: [
        { time: '6:00 - 6:30', activity: 'Recepción y Registro' },
        { time: '6:30 - 7:30', activity: 'Speed Networking Rounds' },
        { time: '7:30 - 8:30', activity: 'Presentaciones de Proyectos' },
        { time: '8:30 - 9:00', activity: 'Networking Libre y Cierre' }
      ]
    }
  };

  const currentEvent = events[id as keyof typeof events] || events['taller-permacultura'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                <TreePine className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-white text-lg">Festival NATUR</h1>
                <p className="text-xs text-white/60">Evento</p>
              </div>
            </Link>
            <Button asChild variant="ghost" className="text-white/70 hover:text-white">
              <Link to="/agenda">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a la Agenda
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Event Header */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <Badge className="bg-green-400/20 text-green-400 border-green-400/30 mb-4">
                    {currentEvent.category}
                  </Badge>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  {currentEvent.title}
                </h1>
                
                <p className="text-xl text-white/80 mb-6 leading-relaxed">
                  {currentEvent.shortDescription}
                </p>

                {/* Event Info Grid */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="text-white/60 text-sm">Fecha</p>
                          <p className="text-white font-medium">{currentEvent.date}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-white/60 text-sm">Horario</p>
                          <p className="text-white font-medium">{currentEvent.time}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-pink-400" />
                        <div>
                          <p className="text-white/60 text-sm">Ubicación</p>
                          <p className="text-white font-medium">{currentEvent.location}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-yellow-400" />
                        <div>
                          <p className="text-white/60 text-sm">Capacidad</p>
                          <p className="text-white font-medium">{currentEvent.capacity}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Social Actions */}
                <div className="flex items-center gap-4 mb-8">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className={`${isLiked ? 'text-red-400' : 'text-white/60'} hover:text-red-400`}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                    Me interesa
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`${isBookmarked ? 'text-yellow-400' : 'text-white/60'} hover:text-yellow-400`}
                  >
                    <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                    Guardar
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartir
                  </Button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Registration Card */}
                <Card className="bg-gradient-to-br from-green-600/20 to-blue-600/20 backdrop-blur-sm border-green-400/30">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="text-3xl mb-2">{currentEvent.image}</div>
                      <h3 className="text-xl font-bold text-white mb-2">Participar</h3>
                      <p className="text-2xl font-bold text-green-400">{currentEvent.price}</p>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Duración:</span>
                        <span className="text-white">{currentEvent.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Nivel:</span>
                        <span className="text-white">{currentEvent.level}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Requisitos:</span>
                        <span className="text-white text-right">{currentEvent.requirements}</span>
                      </div>
                    </div>

                    <Button asChild className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white">
                      <Link to="/tickets">
                        <Ticket className="w-4 h-4 mr-2" />
                        Obtener Entrada
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Event Details */}
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                      <Info className="w-5 h-5 mr-2 text-blue-400" />
                      Detalles del Evento
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-white/60">Materiales:</span>
                        <p className="text-white">{currentEvent.materials}</p>
                      </div>
                      <div>
                        <span className="text-white/60">Etiquetas:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {currentEvent.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs text-white/70 border-white/30">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Event Description */}
      <section className="py-12 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Descripción</h2>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-8">
                <div className="prose prose-lg prose-invert max-w-none">
                  {currentEvent.fullDescription.split('\n').map((paragraph, index) => (
                    <p key={index} className="text-white/80 mb-4 leading-relaxed">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Speakers */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">Ponentes</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentEvent.speakers.map((speaker, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 text-3xl rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-600">
                        {speaker.image}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1">{speaker.name}</h3>
                      <p className="text-green-400 font-medium mb-3">{speaker.title}</p>
                      <p className="text-white/70 text-sm">{speaker.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Agenda */}
      <section className="py-12 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">Agenda</h2>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-8">
                <div className="space-y-4">
                  {currentEvent.agenda.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-white/5">
                      <div className="text-green-400 font-mono text-sm font-medium min-w-0 flex-shrink-0">
                        {item.time}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{item.activity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-sm border-green-400/30 max-w-4xl mx-auto">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                ¿Listo para participar?
              </h3>
              <p className="text-white/80 mb-6">
                Asegura tu lugar en este evento transformador del Festival NATUR 2025
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8">
                <Link to="/tickets">
                  <Ticket className="w-5 h-5 mr-2" />
                  Obtener Entradas
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default EventDetail;