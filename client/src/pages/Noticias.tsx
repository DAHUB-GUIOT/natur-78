import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";

const newsArticles = [
  {
    id: 1,
    title: "Turismo Regenerativo: El Futuro del Viaje Consciente",
    excerpt: "Descubre cómo el turismo regenerativo está transformando la industria del viaje, creando experiencias que no solo minimizan el impacto ambiental, sino que contribuyen activamente a la restauración de ecosistemas y comunidades locales.",
    date: "2025-01-15",
    author: "María González",
    category: "Turismo Sostenible",
    image: "/api/placeholder/400/250",
    readTime: "5 min"
  },
  {
    id: 2,
    title: "Colombia Lidera la Revolución del Ecoturismo en Latinoamérica",
    excerpt: "Con su biodiversidad única y compromiso con la sostenibilidad, Colombia se posiciona como líder regional en ecoturismo, atrayendo viajeros conscientes de todo el mundo.",
    date: "2025-01-10",
    author: "Carlos Mendoza",
    category: "Destinos",
    image: "/api/placeholder/400/250",
    readTime: "7 min"
  },
  {
    id: 3,
    title: "Festival NATUR 2025: Conectando Comunidades Sostenibles",
    excerpt: "El evento más importante de turismo sostenible en Colombia reunirá a emprendedores, viajeros conscientes y líderes de la industria para crear el futuro del turismo responsable.",
    date: "2025-01-05",
    author: "Ana Rodríguez",
    category: "Eventos",
    image: "/api/placeholder/400/250",
    readTime: "4 min"
  },
  {
    id: 4,
    title: "Tecnología Verde: Innovaciones que Transforman el Turismo",
    excerpt: "Desde aplicaciones de compensación de carbono hasta plataformas de turismo colaborativo, la tecnología está revolucionando la forma en que viajamos de manera sostenible.",
    date: "2024-12-28",
    author: "Diego Torres",
    category: "Tecnología",
    image: "/api/placeholder/400/250",
    readTime: "6 min"
  },
  {
    id: 5,
    title: "Comunidades Locales: El Corazón del Turismo Regenerativo",
    excerpt: "Conoce las historias inspiradoras de comunidades que han transformado sus territorios a través del turismo consciente y la conservación ambiental.",
    date: "2024-12-20",
    author: "Sofía Vargas",
    category: "Comunidades",
    image: "/api/placeholder/400/250",
    readTime: "8 min"
  },
  {
    id: 6,
    title: "Guía Completa: Cómo Planificar un Viaje 100% Sostenible",
    excerpt: "Tips prácticos, herramientas y recursos para que tu próximo viaje sea completamente alineado con principios de sostenibilidad ambiental y social.",
    date: "2024-12-15",
    author: "Roberto Jiménez",
    category: "Guías",
    image: "/api/placeholder/400/250",
    readTime: "10 min"
  }
];

const categories = ["Todos", "Turismo Sostenible", "Destinos", "Eventos", "Tecnología", "Comunidades", "Guías"];

export default function Noticias() {
  return (
    <div className="min-h-screen bg-[#0a1a0a] text-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 sm:px-8 md:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-gasoek text-[#cad95e] mb-6 uppercase tracking-wider">
              NOTICIAS NATUR
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Mantente al día con las últimas tendencias, innovaciones y historias inspiradoras 
              del turismo sostenible y regenerativo en Colombia y el mundo.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category, index) => (
              <button
                key={category}
                className={`px-6 py-3 rounded-full font-jakarta text-sm uppercase tracking-wide transition-all duration-300 hover:scale-105 ${
                  index === 0 
                    ? 'bg-[#cad95e] text-[#0a1a0a] font-bold' 
                    : 'border border-[#cad95e]/30 text-gray-300 hover:border-[#cad95e] hover:text-[#cad95e]'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* News Grid */}
      <section className="px-6 sm:px-8 md:px-20 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-[#0f2d0f] border border-[#cad95e]/20 rounded-lg overflow-hidden hover:border-[#cad95e]/50 transition-all duration-300 hover:transform hover:scale-[1.02]">
                  {/* Article Image */}
                  <div className="relative overflow-hidden h-48">
                    <div className="w-full h-full bg-gradient-to-br from-[#1a3d1a] to-[#0f2d0f] flex items-center justify-center">
                      <span className="text-6xl">📰</span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#cad95e] text-[#0a1a0a] px-3 py-1 rounded-full text-xs font-jakarta-bold uppercase tracking-wide">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(article.date).toLocaleDateString('es-ES')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{article.author}</span>
                      </div>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="text-xl font-jakarta font-bold text-[#cad95e] mb-3 line-clamp-2 group-hover:text-yellow-300 transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <button className="flex items-center gap-2 text-[#cad95e] hover:text-yellow-300 transition-colors font-jakarta text-sm uppercase tracking-wide">
                      Leer más 
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <button className="bg-[#cad95e] text-[#0a1a0a] px-8 py-4 font-jakarta-bold uppercase tracking-wide hover:bg-yellow-300 transition-colors rounded-lg">
              Cargar más noticias
            </button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="bg-[#0f2d0f] border-t border-[#cad95e]/20 px-6 sm:px-8 md:px-20 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-gasoek text-[#cad95e] mb-6 uppercase tracking-wider">
              Newsletter NATUR
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Recibe las últimas noticias, tendencias y oportunidades del turismo sostenible 
              directamente en tu bandeja de entrada.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-6 py-4 bg-[#0a1a0a] border border-[#cad95e]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#cad95e] focus:outline-none"
              />
              <button className="bg-[#cad95e] text-[#0a1a0a] px-8 py-4 font-jakarta-bold uppercase tracking-wide hover:bg-yellow-300 transition-colors rounded-lg whitespace-nowrap">
                Suscribirse
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}