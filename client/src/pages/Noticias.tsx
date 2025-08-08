import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from 'wouter';
import { TreePine, Calendar, User, ArrowRight, Star, Globe, Leaf, Users, Heart } from 'lucide-react';

const newsArticles = [
  {
    id: 1,
    slug: 'turismo-regenerativo-futuro',
    title: "Turismo Regenerativo: El Futuro del Viaje Consciente",
    excerpt: "Descubre cómo el turismo regenerativo está transformando la industria del viaje, creando experiencias que no solo minimizan el impacto ambiental, sino que contribuyen activamente a la restauración de ecosistemas y comunidades locales.",
    date: "15 de Noviembre, 2024",
    author: "María Rodríguez",
    category: "Sostenibilidad",
    image: "🌱",
    readTime: "8 min",
    featured: true
  },
  {
    id: 2,
    slug: 'experiencias-autenticas-colombia',
    title: "Experiencias Auténticas: Conectando con el Alma de Colombia",
    excerpt: "Explora cómo las experiencias auténticas van más allá del turismo tradicional para crear conexiones profundas con la cultura, la naturaleza y las comunidades locales de Colombia.",
    date: "12 de Noviembre, 2024",
    author: "Carlos Mendoza",
    category: "Experiencias",
    image: "🎭",
    readTime: "6 min",
    featured: true
  },
  {
    id: 3,
    slug: 'tecnologia-turismo-sostenible',
    title: "Tecnología al Servicio del Turismo Sostenible",
    excerpt: "Desde aplicaciones de impacto hasta blockchain para transparencia, descubre cómo las innovaciones tecnológicas están revolucionando el turismo sostenible.",
    date: "10 de Noviembre, 2024",
    author: "Ana Gutiérrez",
    category: "Tecnología",
    image: "🚀",
    readTime: "7 min",
    featured: true
  },
  {
    id: 4,
    title: "Colombia Lidera la Revolución del Ecoturismo en Latinoamérica",
    excerpt: "Con su biodiversidad única y compromiso con la sostenibilidad, Colombia se posiciona como líder regional en ecoturismo, atrayendo viajeros conscientes de todo el mundo.",
    date: "8 de Noviembre, 2024",
    author: "Diego Torres",
    category: "Destinos",
    image: "🦋",
    readTime: "5 min"
  },
  {
    id: 5,
    title: "Festival NATUR 2025: Conectando Comunidades Sostenibles",
    excerpt: "El evento más importante de turismo sostenible en Colombia reunirá a emprendedores, viajeros conscientes y líderes de la industria para crear el futuro del turismo responsable.",
    date: "5 de Noviembre, 2024",
    author: "Carmen López",
    category: "Eventos",
    image: "🎪",
    readTime: "4 min"
  },
  {
    id: 6,
    title: "Comunidades Indígenas: Guardianes del Turismo Ancestral",
    excerpt: "Conoce cómo las comunidades indígenas de Colombia están liderando iniciativas de turismo que preservan sus tradiciones mientras protegen la biodiversidad.",
    date: "2 de Noviembre, 2024",
    author: "Roberto Silva",
    category: "Cultura",
    image: "🏛️",
    readTime: "9 min"
  }
];

const Noticias = () => {
  const featuredArticles = newsArticles.filter(article => article.featured);
  const regularArticles = newsArticles.filter(article => !article.featured);

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
                <p className="text-xs text-white/60">Blog & Noticias</p>
              </div>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-white/70 hover:text-white transition-colors">Inicio</Link>
              <Link to="/about" className="text-white/70 hover:text-white transition-colors">Acerca de</Link>
              <Link to="/agenda" className="text-white/70 hover:text-white transition-colors">Agenda</Link>
              <Link to="/experiencias" className="text-white/70 hover:text-white transition-colors">Experiencias</Link>
              <span className="text-green-400 font-medium">Blog</span>
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
              Blog Festival NATUR
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Noticias &
              <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent block">
                Perspectivas
              </span>
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Mantente informado sobre las últimas tendencias en turismo sostenible, 
              innovaciones tecnológicas y historias inspiradoras de nuestro ecosistema.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 bg-white/5 backdrop-blur-sm border-y border-white/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Artículos Destacados</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Las historias más importantes sobre el futuro del turismo sostenible
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {featuredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={index === 0 ? "lg:col-span-2" : ""}
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 h-full group">
                  <CardContent className="p-0">
                    {/* Image Area */}
                    <div className={`${index === 0 ? 'h-64' : 'h-48'} bg-gradient-to-br from-green-400 to-green-600 rounded-t-lg flex items-center justify-center relative overflow-hidden`}>
                      <div className="text-6xl">{article.image}</div>
                      <Badge className="absolute top-4 left-4 bg-black/50 text-white border-white/30">
                        {article.category}
                      </Badge>
                      {article.featured && (
                        <Badge className="absolute top-4 right-4 bg-yellow-500/20 text-yellow-400 border-yellow-400/30">
                          <Star className="w-3 h-3 mr-1" />
                          Destacado
                        </Badge>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center space-x-4 text-white/60 text-sm mb-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{article.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{article.author}</span>
                        </div>
                        <span>{article.readTime}</span>
                      </div>
                      
                      <h3 className={`font-bold text-white mb-3 group-hover:text-green-400 transition-colors ${index === 0 ? 'text-2xl' : 'text-xl'}`}>
                        {article.title}
                      </h3>
                      
                      <p className={`text-white/80 mb-4 leading-relaxed ${index === 0 ? 'text-base' : 'text-sm'}`}>
                        {article.excerpt}
                      </p>
                      
                      <Button
                        asChild
                        variant="ghost" 
                        className="text-green-400 hover:text-green-300 hover:bg-green-400/10 p-0 h-auto"
                      >
                        {article.slug ? (
                          <Link to={`/blog/${article.slug}`}>
                            Leer artículo completo <ArrowRight className="w-4 h-4 ml-1" />
                          </Link>
                        ) : (
                          <span className="cursor-not-allowed opacity-50">
                            Próximamente <ArrowRight className="w-4 h-4 ml-1" />
                          </span>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Regular Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Más Artículos</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Explora más contenido sobre turismo sostenible y tendencias de la industria
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {regularArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 h-full group">
                  <CardContent className="p-0">
                    {/* Image Area */}
                    <div className="h-40 bg-gradient-to-br from-purple-400 to-pink-500 rounded-t-lg flex items-center justify-center relative">
                      <div className="text-4xl">{article.image}</div>
                      <Badge className="absolute top-3 left-3 bg-black/50 text-white border-white/30 text-xs">
                        {article.category}
                      </Badge>
                    </div>
                    
                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center space-x-3 text-white/60 text-xs mb-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{article.date}</span>
                        </div>
                        <span>{article.readTime}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-green-400 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      
                      <p className="text-white/80 text-sm mb-4 line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-xs">{article.author}</span>
                        <Button
                          variant="ghost" 
                          size="sm"
                          className="text-green-400 hover:text-green-300 hover:bg-green-400/10 p-0 h-auto text-sm"
                        >
                          Leer más <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Explora por Categorías</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Encuentra el contenido que más te interesa
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { name: 'Sostenibilidad', icon: Leaf, count: 12, color: 'from-green-500 to-emerald-600' },
              { name: 'Experiencias', icon: Star, count: 8, color: 'from-purple-500 to-pink-600' },
              { name: 'Tecnología', icon: Globe, count: 6, color: 'from-green-500 to-green-700' },
              { name: 'Comunidades', icon: Users, count: 10, color: 'from-orange-500 to-red-600' }
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{category.name}</h3>
                    <p className="text-white/60 text-sm">{category.count} artículos</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-green-600/20 to-green-800/20 backdrop-blur-sm border-green-400/30 max-w-4xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Mantente Conectado
              </h3>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                Suscríbete a nuestro newsletter y recibe las últimas noticias sobre turismo sostenible, 
                eventos exclusivos y oportunidades de colaboración directamente en tu bandeja de entrada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <Button className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-6 py-3">
                  Suscribirse
                </Button>
              </div>
              <p className="text-white/50 text-sm mt-4">
                No spam. Solo contenido valioso sobre turismo sostenible.
              </p>
            </CardContent>
          </Card>
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
              © 2025 Festival NATUR. Transformando el turismo hacia un futuro sostenible.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Noticias;