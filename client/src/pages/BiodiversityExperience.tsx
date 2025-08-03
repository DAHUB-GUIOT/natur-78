import React from 'react';
import { BiodiversityReveal } from '@/components/biodiversity/BiodiversityReveal';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Leaf, Globe, Heart } from 'lucide-react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

const BiodiversityExperience: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Biodiversidad Colombia"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
        </div>

        {/* Floating Navigation */}
        <div className="absolute top-8 left-8 z-50">
          <Link to="/">
            <Button 
              variant="ghost" 
              className="text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <Leaf className="w-8 h-8 text-green-400" />
              <span className="text-green-400 font-mono text-sm tracking-widest uppercase">
                Colombia Megadiversa
              </span>
              <Leaf className="w-8 h-8 text-green-400" />
            </div>

            <h1 className="text-6xl md:text-8xl font-unbounded font-light mb-8 text-white tracking-wider leading-none">
              BIODIVERSIDAD
              <br />
              <span className="text-green-400">INMERSIVA</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed font-light max-w-3xl mx-auto">
              Sumérgete en un viaje visual que revela la extraordinaria riqueza natural de Colombia mientras navegas
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.div 
                className="flex items-center gap-3 text-white/70"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse"></div>
                </div>
                <span className="font-mono text-sm">Desplázate para explorar</span>
              </motion.div>
            </div>

          </motion.div>

          {/* Floating Elements */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-4 h-4 bg-green-400/30 rounded-full"
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-blue-400/20 rounded-full"
            animate={{ 
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>
      </section>

      {/* Main Biodiversity Reveal Experience */}
      <BiodiversityReveal />

      {/* Call to Action Section */}
      <section className="relative py-32 bg-gradient-to-b from-green-900 to-black">
        <div className="max-w-4xl mx-auto text-center px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <Heart className="w-6 h-6 text-red-400" />
              <span className="text-red-400 font-mono text-sm tracking-widest uppercase">
                Conservación
              </span>
              <Heart className="w-6 h-6 text-red-400" />
            </div>

            <h2 className="text-4xl md:text-6xl font-unbounded font-light mb-8 text-white">
              PROTEGE LA
              <br />
              <span className="text-green-400">BIODIVERSIDAD</span>
            </h2>
            
            <p className="text-lg text-white/80 mb-12 leading-relaxed max-w-2xl mx-auto">
              Cada especie que has conocido necesita tu ayuda. Únete al movimiento de turismo sostenible 
              y contribuye a la conservación de estos tesoros naturales.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/marketplace">
                <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg">
                  <Globe className="w-5 h-5 mr-2" />
                  Explorar Experiencias
                </Button>
              </Link>
              <Link to="/registro">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg">
                  Crear Experiencia Sostenible
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {[
              { number: '54,000+', label: 'Especies de Plantas' },
              { number: '1,900+', label: 'Especies de Aves' },
              { number: '763', label: 'Especies de Peces' },
              { number: '524', label: 'Especies de Mamíferos' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-unbounded font-light text-green-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-white/70 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BiodiversityExperience;