import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from 'wouter';
import { 
  TreePine, Mail, Phone, MapPin, Clock, 
  MessageCircle, Send, Instagram, Twitter, 
  Facebook, Linkedin, ExternalLink
} from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <TreePine className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-white text-lg">Festival NATUR</h1>
                <p className="text-xs text-white/60">Contacto</p>
              </div>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-white/70 hover:text-white transition-colors">Inicio</Link>
              <Link to="/about" className="text-white/70 hover:text-white transition-colors">Acerca de</Link>
              <Link to="/agenda" className="text-white/70 hover:text-white transition-colors">Agenda</Link>
              <Link to="/tickets" className="text-white/70 hover:text-white transition-colors">Entradas</Link>
              <span className="text-green-400 font-medium">Contacto</span>
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
              Contáctanos
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Hablemos del
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent block">
                Futuro Sostenible
              </span>
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              ¿Tienes una pregunta, propuesta o quieres formar parte del movimiento NATUR? 
              Nos encantaría conectar contigo y explorar cómo podemos colaborar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-4">Información de Contacto</h2>
                    <p className="text-white/70 text-lg">
                      Múltiples formas de conectar con nuestro equipo
                    </p>
                  </div>

                  {/* Contact Cards */}
                  <div className="space-y-6">
                    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Mail className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold mb-2">Email Principal</h3>
                            <p className="text-white/80 mb-1">info@festivalnatur.co</p>
                            <p className="text-white/60 text-sm">Consultas generales y colaboraciones</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Phone className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold mb-2">Teléfono</h3>
                            <p className="text-white/80 mb-1">+57 300 123 4567</p>
                            <p className="text-white/60 text-sm">Lunes a Viernes, 9:00 AM - 6:00 PM</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold mb-2">Ubicación</h3>
                            <p className="text-white/80 mb-1">CEFE Chapinero</p>
                            <p className="text-white/80 mb-1">Carrera 13 #63-42</p>
                            <p className="text-white/60 text-sm">Bogotá, Colombia</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <MessageCircle className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold mb-2">WhatsApp</h3>
                            <p className="text-white/80 mb-1">+57 300 123 4567</p>
                            <p className="text-white/60 text-sm">Respuesta inmediata</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Social Media */}
                  <div>
                    <h3 className="text-white font-semibold mb-4">Síguenos en Redes Sociales</h3>
                    <div className="flex space-x-4">
                      <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                        <Instagram className="w-4 h-4 mr-2" />
                        @FestivalNatur
                      </Button>
                      <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                        <Twitter className="w-4 h-4 mr-2" />
                        @NaturFest
                      </Button>
                      <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                        <Linkedin className="w-4 h-4 mr-2" />
                        Festival NATUR
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-white mb-2">Envíanos un Mensaje</h2>
                      <p className="text-white/70">
                        Completa el formulario y nos pondremos en contacto contigo pronto
                      </p>
                    </div>

                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-white/80 text-sm font-medium mb-2">
                            Nombre *
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                            placeholder="Tu nombre completo"
                          />
                        </div>
                        <div>
                          <label className="block text-white/80 text-sm font-medium mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            required
                            className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                            placeholder="tu@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Organización
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                          placeholder="Nombre de tu empresa u organización"
                        />
                      </div>

                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Tipo de Consulta *
                        </label>
                        <select
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                        >
                          <option value="">Selecciona una opción</option>
                          <option value="participacion">Participación en el Festival</option>
                          <option value="patrocinio">Oportunidades de Patrocinio</option>
                          <option value="colaboracion">Propuesta de Colaboración</option>
                          <option value="prensa">Consultas de Prensa</option>
                          <option value="general">Consulta General</option>
                          <option value="otro">Otro</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Mensaje *
                        </label>
                        <textarea
                          required
                          rows={6}
                          className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent resize-none"
                          placeholder="Cuéntanos más sobre tu consulta, propuesta o cómo te gustaría colaborar con Festival NATUR..."
                        />
                      </div>

                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id="privacy"
                          required
                          className="mt-1 w-4 h-4 text-green-400 border-white/30 rounded focus:ring-green-400"
                        />
                        <label htmlFor="privacy" className="text-white/70 text-sm">
                          Acepto la{' '}
                          <a href="#" className="text-green-400 hover:text-green-300 underline">
                            política de privacidad
                          </a>{' '}
                          y el tratamiento de mis datos personales para responder a mi consulta.
                        </label>
                      </div>

                      <Button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white py-3"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Enviar Mensaje
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Preguntas Frecuentes</h2>
              <p className="text-white/70">
                Respuestas a las consultas más comunes sobre Festival NATUR
              </p>
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  question: "¿Cómo puedo participar como expositor en Festival NATUR?",
                  answer: "Las inscripciones para expositores están abiertas hasta el 1 de noviembre. Puedes aplicar a través de nuestro portal de empresas o contactándonos directamente. Evaluamos propuestas que estén alineadas con los principios de turismo sostenible."
                },
                {
                  question: "¿Qué incluye la entrada al festival?",
                  answer: "La entrada VIVE NATUR incluye acceso a todas las charlas abiertas, zona de comidas, programación cultural y networking. El pase NATUR PRO adicional incluye talleres especializados, networking VIP y acceso a las ruedas de negocios."
                },
                {
                  question: "¿Hay opciones de patrocinio disponibles?",
                  answer: "Sí, ofrecemos diferentes niveles de patrocinio desde nivel Semilla hasta nivel Bosque. Cada nivel incluye beneficios específicos de visibilidad, networking y participación. Contáctanos para conocer las opciones disponibles."
                },
                {
                  question: "¿El evento es presencial o virtual?",
                  answer: "Festival NATUR 2025 es un evento presencial que se realizará en CEFE Chapinero, Bogotá. Algunas conferencias magistrales serán transmitidas en vivo para audiencia global."
                },
                {
                  question: "¿Cómo puedo proponer una charla o taller?",
                  answer: "Tenemos un proceso de selección de contenido. Envíanos tu propuesta detallada incluyendo tema, objetivos, perfil del ponente y alineación con turismo sostenible. El plazo cierra el 20 de octubre."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-6">
                      <h3 className="text-white font-semibold mb-3">{faq.question}</h3>
                      <p className="text-white/80 leading-relaxed">{faq.answer}</p>
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
              <h3 className="text-2xl font-bold text-white mb-4">
                ¿Listo para Ser Parte del Cambio?
              </h3>
              <p className="text-white/80 mb-6">
                Únete al movimiento que está transformando el turismo hacia un futuro más sostenible
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white">
                  <Link to="/tickets">
                    Obtener Entradas
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Link to="/portal-empresas">
                    Portal Empresas
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

export default Contact;