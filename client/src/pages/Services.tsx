import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from 'wouter';
import { 
  TreePine, Users, Building2, Plane, MapPin, 
  Calendar, Star, Target, Lightbulb, TrendingUp,
  ArrowRight, Check, Globe, Heart, Leaf
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      id: 'consultoria',
      title: 'Consultoría en Turismo Sostenible',
      description: 'Asesoramiento especializado para empresas que buscan transformar sus operaciones hacia modelos más sostenibles y regenerativos.',
      features: [
        'Diagnóstico de sostenibilidad',
        'Plan de transformación integral',
        'Certificaciones ambientales',
        'Capacitación de equipos',
        'Seguimiento y métricas'
      ],
      icon: Target,
      color: 'from-green-500 to-emerald-600',
      duration: '3-6 meses',
      price: 'Desde $5.000.000 COP'
    },
    {
      id: 'networking',
      title: 'Red de Colaboración NATUR',
      description: 'Conectamos empresas, emprendedores y viajeros en una red global de turismo sostenible para facilitar alianzas estratégicas.',
      features: [
        'Acceso a red exclusiva',
        'Eventos de networking mensuales',
        'Matching con socios potenciales',
        'Oportunidades de colaboración',
        'Marketplace B2B'
      ],
      icon: Users,
      color: 'from-green-500 to-green-700',
      duration: 'Membresía anual',
      price: 'Desde $2.500.000 COP/año'
    },
    {
      id: 'marketing',
      title: 'Marketing Sostenible',
      description: 'Estrategias de marketing digital especializado en turismo sostenible para aumentar tu visibilidad y atraer viajeros conscientes.',
      features: [
        'Estrategia de contenido verde',
        'Campañas digitales éticas',
        'Storytelling auténtico',
        'Gestión de redes sociales',
        'SEO para turismo sostenible'
      ],
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-600',
      duration: '6-12 meses',
      price: 'Desde $3.000.000 COP'
    },
    {
      id: 'experiencias',
      title: 'Diseño de Experiencias',
      description: 'Creamos experiencias auténticas y transformadoras que conectan viajeros con comunidades locales y ecosistemas naturales.',
      features: [
        'Diseño de experiencias únicas',
        'Validación con comunidades',
        'Protocolos de sostenibilidad',
        'Capacitación de guías',
        'Sistema de evaluación'
      ],
      icon: Star,
      color: 'from-orange-500 to-red-600',
      duration: '2-4 meses',
      price: 'Desde $4.000.000 COP'
    },
    {
      id: 'tecnologia',
      title: 'Soluciones Tecnológicas',
      description: 'Desarrollamos plataformas y herramientas digitales especializadas para optimizar operaciones de turismo sostenible.',
      features: [
        'Plataformas de reservas',
        'Apps de experiencias',
        'Sistemas de gestión',
        'Analíticas de impacto',
        'Integración de pagos'
      ],
      icon: Lightbulb,
      color: 'from-green-600 to-green-800',
      duration: '4-8 meses',
      price: 'Desde $8.000.000 COP'
    },
    {
      id: 'formacion',
      title: 'Formación y Capacitación',
      description: 'Programas educativos especializados para desarrollar competencias en turismo sostenible y regenerativo.',
      features: [
        'Cursos certificados',
        'Talleres prácticos',
        'Mentorías personalizadas',
        'Material educativo',
        'Certificación internacional'
      ],
      icon: Building2,
      color: 'from-emerald-500 to-green-600',
      duration: '1-3 meses',
      price: 'Desde $1.500.000 COP'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Diagnóstico Inicial',
      description: 'Evaluamos tu situación actual y identificamos oportunidades de mejora en sostenibilidad.'
    },
    {
      step: '02',
      title: 'Estrategia Personalizada',
      description: 'Diseñamos un plan de acción específico para tus objetivos y contexto empresarial.'
    },
    {
      step: '03',
      title: 'Implementación',
      description: 'Ejecutamos la estrategia con acompañamiento constante y ajustes según avancemos.'
    },
    {
      step: '04',
      title: 'Medición y Optimización',
      description: 'Monitoreamos resultados y optimizamos continuamente para maximizar el impacto.'
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
                <p className="text-xs text-white/60">Servicios</p>
              </div>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-white/70 hover:text-white transition-colors">Inicio</Link>
              <Link to="/about" className="text-white/70 hover:text-white transition-colors">Acerca de</Link>
              <Link to="/experiencias" className="text-white/70 hover:text-white transition-colors">Experiencias</Link>
              <Link to="/contact" className="text-white/70 hover:text-white transition-colors">Contacto</Link>
              <span className="text-green-400 font-medium">Servicios</span>
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
              Servicios NATUR
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Transformamos
              <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent block">
                Tu Negocio Sostenible
              </span>
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Ofrecemos servicios especializados para empresas que buscan liderar 
              la transformación hacia un turismo más sostenible, auténtico y regenerativo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 h-full group">
                    <CardContent className="p-8">
                      {/* Icon */}
                      <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <service.icon className="w-8 h-8 text-white" />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                        {service.title}
                      </h3>
                      
                      <p className="text-white/80 text-sm mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2 mb-6">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                            <span className="text-white/70 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Pricing & Duration */}
                      <div className="border-t border-white/10 pt-6">
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <p className="text-white/60 text-xs">Duración</p>
                            <p className="text-white text-sm font-medium">{service.duration}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-white/60 text-xs">Desde</p>
                            <p className="text-green-400 font-bold">{service.price}</p>
                          </div>
                        </div>
                        
                        <Button className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white">
                          Solicitar Información
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Nuestro Proceso</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Una metodología probada para transformar tu empresa hacia la sostenibilidad
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Connection line */}
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-green-400 to-green-600 transform -translate-x-1/2" />
                  )}
                  
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 relative z-10">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold">{step.step}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-white/70 text-sm leading-relaxed">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { number: "150+", label: "Empresas Transformadas", icon: Building2 },
                { number: "95%", label: "Tasa de Éxito", icon: Target },
                { number: "50K+", label: "Viajeros Conectados", icon: Users },
                { number: "25", label: "Países Alcanzados", icon: Globe }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-2">{stat.number}</h3>
                      <p className="text-white/60 text-sm">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Lo que Dicen Nuestros Clientes</h2>
              <p className="text-white/70">
                Testimonios reales de empresas que han transformado su negocio con NATUR
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "María Elena Sánchez",
                  company: "EcoLodge Amazonia",
                  testimonial: "NATUR nos ayudó a implementar prácticas sostenibles que no solo redujeron nuestro impacto ambiental, sino que aumentaron nuestros ingresos en un 40%.",
                  image: "🌿"
                },
                {
                  name: "Carlos Rodríguez", 
                  company: "Tours Aventura Colombia",
                  testimonial: "La consultoría de NATUR transformó completamente nuestra operación. Ahora somos líderes en turismo responsable en la región.",
                  image: "🎒"
                },
                {
                  name: "Ana Gutiérrez",
                  company: "Hostal Verde Bogotá", 
                  testimonial: "Gracias a la red de colaboración NATUR, hemos conectado con viajeros conscientes de todo el mundo. Nuestra ocupación creció 60%.",
                  image: "🏨"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 text-2xl rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                          {testimonial.image}
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{testimonial.name}</h4>
                          <p className="text-green-400 text-sm">{testimonial.company}</p>
                        </div>
                      </div>
                      <p className="text-white/80 italic leading-relaxed">
                        "{testimonial.testimonial}"
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-sm border-green-400/30 max-w-4xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                ¿Listo para Transformar tu Negocio?
              </h3>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                Únete a las empresas líderes que ya están construyendo el futuro del turismo sostenible. 
                Agenda una consulta gratuita y descubre cómo podemos ayudarte.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white">
                  <Link to="/contact">
                    Agenda Consulta Gratuita
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Link to="/about">
                    Conoce Más Sobre NATUR
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Services;