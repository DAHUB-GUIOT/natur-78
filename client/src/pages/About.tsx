import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from 'wouter';
import { 
  TreePine, Leaf, Users, Globe, Heart, Star, 
  Calendar, MapPin, Mail, Phone, Instagram, 
  Twitter, Facebook, ArrowRight, Award, Target,
  Lightbulb, Handshake
} from 'lucide-react';

const About = () => {
  const stats = [
    { number: "2025", label: "Año del Festival", icon: Calendar },
    { number: "500+", label: "Empresas Sostenibles", icon: Users },
    { number: "50+", label: "Experiencias Únicas", icon: Star },
    { number: "15", label: "Países Participantes", icon: Globe }
  ];

  const values = [
    {
      icon: Leaf,
      title: "Sostenibilidad",
      description: "Promovemos prácticas responsables que protejen nuestros ecosistemas naturales y culturales.",
      color: "text-green-400"
    },
    {
      icon: Heart,
      title: "Responsabilidad Social",
      description: "Fomentamos el turismo que beneficia directamente a las comunidades locales.",
      color: "text-pink-400"
    },
    {
      icon: Lightbulb,
      title: "Innovación",
      description: "Integramos tecnología y creatividad para crear experiencias transformadoras.",
      color: "text-yellow-400"
    },
    {
      icon: Handshake,
      title: "Colaboración",
      description: "Construimos redes que conectan a viajeros conscientes con empresas sostenibles.",
      color: "text-blue-400"
    }
  ];

  const team = [
    {
      name: "María Rodríguez",
      role: "Directora Ejecutiva",
      bio: "Experta en turismo sostenible con 15 años de experiencia.",
      image: "🌿",
      social: { twitter: "@maria_natur", linkedin: "/in/mariarodriguez" }
    },
    {
      name: "Carlos Mendoza",
      role: "Director de Innovación",
      bio: "Líder en tecnología aplicada al turismo regenerativo.",
      image: "🚀",
      social: { twitter: "@carlos_tech", linkedin: "/in/carlosmendoza" }
    },
    {
      name: "Ana Gutierrez",
      role: "Coordinadora de Comunidades",
      bio: "Especialista en desarrollo comunitario y turismo responsable.",
      image: "🌍",
      social: { twitter: "@ana_communities", linkedin: "/in/anagutierrez" }
    }
  ];

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
                <p className="text-xs text-white/60">Bogotá 2025</p>
              </div>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-white/70 hover:text-white transition-colors">Inicio</Link>
              <Link to="/agenda" className="text-white/70 hover:text-white transition-colors">Agenda</Link>
              <Link to="/experiencias" className="text-white/70 hover:text-white transition-colors">Experiencias</Link>
              <Link to="/tickets" className="text-white/70 hover:text-white transition-colors">Entradas</Link>
              <span className="text-green-400 font-medium">Acerca de</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 bg-green-400/20 text-green-400 border-green-400/30 text-sm px-4 py-2">
              Festival NATUR 2025
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Transformando el
              <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent block">
                Turismo del Futuro
              </span>
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Festival NATUR es más que un evento: es un movimiento hacia un turismo 
              regenerativo que conecta personas, protege ecosistemas y fortalece comunidades 
              a través de experiencias auténticas y sostenibles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-3">
                <Link to="/tickets">
                  Obtener Entradas <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 px-8 py-3">
                <Link to="/agenda">
                  Ver Agenda
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/5 backdrop-blur-sm border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</h3>
                <p className="text-white/60">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 h-full">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">Nuestra Misión</h2>
                  <p className="text-white/80 leading-relaxed">
                    Crear un ecosistema integral que conecte viajeros conscientes con empresas 
                    sostenibles, promoviendo prácticas regenerativas que beneficien tanto a las 
                    comunidades locales como al medio ambiente, mientras ofrecemos experiencias 
                    auténticas y transformadoras.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 h-full">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mb-6">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">Nuestra Visión</h2>
                  <p className="text-white/80 leading-relaxed">
                    Ser la plataforma líder en Latinoamérica para el turismo regenerativo, 
                    estableciendo nuevos estándares de sostenibilidad y responsabilidad social 
                    que inspiren a la industria global a adoptar prácticas más conscientes 
                    y respetuosas con nuestro planeta.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Nuestros Valores</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Los principios fundamentales que guían cada decisión y acción en Festival NATUR
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-black/30`}>
                      <value.icon className={`w-8 h-8 ${value.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Nuestro Equipo</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Profesionales apasionados por transformar la industria del turismo
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 text-4xl rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-600">
                      {member.image}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-green-400 font-medium mb-3">{member.role}</p>
                    <p className="text-white/70 text-sm mb-4">{member.bio}</p>
                    <div className="flex justify-center space-x-3">
                      <Button size="sm" variant="ghost" className="text-white/60 hover:text-white p-2">
                        <Twitter className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-white/60 hover:text-white p-2">
                        <Instagram className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Contacto</h2>
              <p className="text-white/70">¿Tienes preguntas? Nos encantaría escucharte</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-white mb-6">Información de Contacto</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-green-400" />
                      <span className="text-white/80">Bogotá, Colombia</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-green-400" />
                      <span className="text-white/80">info@festivalnatur.co</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-green-400" />
                      <span className="text-white/80">+57 300 123 4567</span>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="text-white font-medium mb-4">Síguenos</h4>
                    <div className="flex space-x-4">
                      <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        <Instagram className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        <Twitter className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        <Facebook className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-white mb-6">Únete al Movimiento</h3>
                  <p className="text-white/70 mb-6">
                    Forma parte de la comunidad que está transformando el turismo hacia 
                    un futuro más sostenible y responsable.
                  </p>
                  <div className="space-y-4">
                    <Button asChild className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white">
                      <Link to="/portal-empresas">
                        Portal Empresas
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">
                      <Link to="/portal-viajeros">
                        Portal Viajeros
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-sm border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                <TreePine className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-lg">Festival NATUR 2025</span>
            </div>
            <p className="text-white/60 text-sm">
              © 2025 Festival NATUR. Todos los derechos reservados. 
              Transformando el turismo hacia un futuro sostenible.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;