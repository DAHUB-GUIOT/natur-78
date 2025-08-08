import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link, useParams } from 'wouter';
import { 
  TreePine, Search, Filter, MapPin, Star, 
  Clock, Users, ArrowRight, SlidersHorizontal,
  Grid, List, ChevronDown
} from 'lucide-react';

const CategoryPage = () => {
  const { category } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  // Category configurations
  const categoryConfig = {
    'alojamientos': {
      title: 'Alojamientos Sostenibles',
      description: 'Hospedajes comprometidos con prácticas ambientales y sociales responsables',
      icon: '🏨',
      color: 'from-green-500 to-blue-600'
    },
    'gastronomia': {
      title: 'Gastronomía Sostenible', 
      description: 'Experiencias culinarias que celebran ingredientes locales y técnicas tradicionales',
      icon: '🍽️',
      color: 'from-orange-500 to-red-600'
    },
    'transporte': {
      title: 'Movilidad Ecológica',
      description: 'Opciones de transporte que minimizan el impacto ambiental',
      icon: '🚗',
      color: 'from-green-500 to-green-700'
    },
    'experiencias': {
      title: 'Experiencias Auténticas',
      description: 'Actividades que conectan viajeros con la cultura y naturaleza local',
      icon: '⭐',
      color: 'from-purple-500 to-pink-600'
    }
  };

  const currentCategory = categoryConfig[category as keyof typeof categoryConfig] || categoryConfig['experiencias'];

  // Sample data for different categories
  const sampleData = {
    'alojamientos': [
      {
        id: 1,
        name: 'Ecolodge Sierra Nevada',
        location: 'Santa Marta, Magdalena',
        description: 'Lodge sostenible en el corazón de la Sierra Nevada, operado por comunidades indígenas',
        price: '$180.000 COP/noche',
        rating: 4.8,
        reviews: 124,
        features: ['100% Energía Solar', 'Agricultura Orgánica', 'Construcción Tradicional'],
        image: '🏔️',
        category: 'Ecolodge',
        verified: true
      },
      {
        id: 2,
        name: 'Casa Bambú Cocora',
        location: 'Valle del Cocora, Quindío',
        description: 'Arquitectura en bambú con vistas espectaculares al valle de las palmas de cera',
        price: '$120.000 COP/noche',
        rating: 4.9,
        reviews: 89,
        features: ['Construcción en Bambú', 'Energías Renovables', 'Huerta Orgánica'],
        image: '🎋',
        category: 'Cabaña Ecológica',
        verified: true
      },
      {
        id: 3,
        name: 'Hostal Verde Chapinero',
        location: 'Bogotá, Cundinamarca',
        description: 'Alojamiento urbano con certificación LEED y programas de voluntariado',
        price: '$65.000 COP/noche',
        rating: 4.6,
        reviews: 256,
        features: ['Certificación LEED', 'Reciclaje Total', 'Movilidad Sostenible'],
        image: '🏢',
        category: 'Hostal Urbano',
        verified: true
      }
    ],
    'gastronomia': [
      {
        id: 1,
        name: 'Mesa Campesina',
        location: 'Villa de Leyva, Boyacá',
        description: 'Experiencia gastronómica con ingredientes 100% orgánicos de productores locales',
        price: '$85.000 COP/persona',
        rating: 4.9,
        reviews: 67,
        features: ['Ingredientes Orgánicos', 'Recetas Ancestrales', 'Productores Locales'],
        image: '🌾',
        category: 'Experiencia Culinaria',
        verified: true
      },
      {
        id: 2,
        name: 'Sabores del Pacífico',
        location: 'Bahía Solano, Chocó',
        description: 'Cocina tradicional afrodescendiente con productos del mar y la selva',
        price: '$120.000 COP/persona',
        rating: 4.8,
        reviews: 34,
        features: ['Cocina Tradicional', 'Productos del Mar', 'Comunidad Afrocolombiana'],
        image: '🐟',
        category: 'Cocina Étnica',
        verified: true
      },
      {
        id: 3,
        name: 'Huerta a la Mesa',
        location: 'Medellín, Antioquia',
        description: 'Restaurante urbano con huerta vertical y menú de temporada',
        price: '$95.000 COP/persona',
        rating: 4.7,
        reviews: 189,
        features: ['Huerta Vertical', 'Menú de Temporada', 'Cero Desperdicios'],
        image: '🥬',
        category: 'Restaurante Sostenible',
        verified: true
      }
    ],
    'transporte': [
      {
        id: 1,
        name: 'Bicicletas Eléctricas Tour',
        location: 'Medellín, Antioquia',
        description: 'Recorridos urbanos en bicicletas eléctricas para explorar la ciudad',
        price: '$45.000 COP/día',
        rating: 4.7,
        reviews: 156,
        features: ['100% Eléctrico', 'GPS Incluido', 'Casco y Seguro'],
        image: '🚴',
        category: 'Movilidad Urbana',
        verified: true
      },
      {
        id: 2,
        name: 'Transporte Fluvial Sostenible',
        location: 'Amazonas',
        description: 'Navegación por el río Amazonas en embarcaciones con motores eléctricos',
        price: '$200.000 COP/día',
        rating: 4.9,
        reviews: 23,
        features: ['Motor Eléctrico', 'Guía Naturalista', 'Cero Emisiones'],
        image: '⛵',
        category: 'Transporte Fluvial',
        verified: true
      },
      {
        id: 3,
        name: 'Jeep Híbrido 4x4',
        location: 'Eje Cafetero',
        description: 'Vehículos híbridos para explorar fincas cafeteras y paisajes rurales',
        price: '$180.000 COP/día',
        rating: 4.6,
        reviews: 78,
        features: ['Tecnología Híbrida', 'Conductor-Guía', 'Bajo Impacto'],
        image: '🚙',
        category: 'Transporte Rural',
        verified: true
      }
    ],
    'experiencias': [
      {
        id: 1,
        name: 'Avistamiento de Ballenas',
        location: 'Nuquí, Chocó',
        description: 'Observación responsable de ballenas jorobadas con comunidades locales',
        price: '$280.000 COP/persona',
        rating: 4.9,
        reviews: 234,
        features: ['Observación Responsable', 'Comunidad Local', 'Educación Ambiental'],
        image: '🐋',
        category: 'Vida Silvestre',
        verified: true
      },
      {
        id: 2,
        name: 'Caminata Nocturna Amazonas',
        location: 'Leticia, Amazonas',
        description: 'Exploración nocturna de la selva amazónica con guías indígenas',
        price: '$150.000 COP/persona',
        rating: 4.8,
        reviews: 167,
        features: ['Guías Indígenas', 'Educación Cultural', 'Turismo Regenerativo'],
        image: '🌙',
        category: 'Aventura',
        verified: true
      },
      {
        id: 3,
        name: 'Taller de Artesanías Wayuu',
        location: 'La Guajira',
        description: 'Aprende técnicas tradicionales de tejido con artesanas Wayuu',
        price: '$120.000 COP/persona',
        rating: 4.7,
        reviews: 89,
        features: ['Artesanas Wayuu', 'Técnicas Ancestrales', 'Comercio Justo'],
        image: '🧶',
        category: 'Cultural',
        verified: true
      }
    ]
  };

  const currentData = sampleData[category as keyof typeof sampleData] || sampleData['experiencias'];

  const filteredData = currentData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                <p className="text-xs text-white/60">{currentCategory.title}</p>
              </div>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-white/70 hover:text-white transition-colors">Inicio</Link>
              <Link to="/experiencias" className="text-white/70 hover:text-white transition-colors">Experiencias</Link>
              <Link to="/marketplace" className="text-white/70 hover:text-white transition-colors">Marketplace</Link>
              <span className="text-green-400 font-medium">Categorías</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className={`w-20 h-20 text-4xl rounded-full bg-gradient-to-r ${currentCategory.color} flex items-center justify-center mx-auto mb-6`}>
              {currentCategory.icon}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {currentCategory.title}
            </h1>
            <p className="text-xl text-white/80 mb-8">
              {currentCategory.description}
            </p>
            <Badge className="bg-green-400/20 text-green-400 border-green-400/30 text-sm px-4 py-2">
              {filteredData.length} opciones disponibles
            </Badge>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white/5 backdrop-blur-sm border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/50"
                />
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4">
                {/* Sort */}
                <div className="flex items-center space-x-2">
                  <span className="text-white/70 text-sm">Ordenar por:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white/10 border border-white/30 text-white text-sm px-3 py-1 rounded-lg"
                  >
                    <option value="relevance">Relevancia</option>
                    <option value="price-low">Precio: Menor a Mayor</option>
                    <option value="price-high">Precio: Mayor a Menor</option>
                    <option value="rating">Mejor Valorados</option>
                    <option value="newest">Más Recientes</option>
                  </select>
                </div>

                {/* View Mode */}
                <div className="flex bg-white/10 rounded-lg p-1">
                  <Button
                    size="sm"
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    onClick={() => setViewMode('grid')}
                    className="px-3 py-1"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    onClick={() => setViewMode('list')}
                    className="px-3 py-1"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>

                {/* Filters Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </div>

            {/* Extended Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-6 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-3">Rango de Precio</h4>
                    <div className="space-y-2">
                      <label className="flex items-center text-white/70 text-sm">
                        <input type="checkbox" className="mr-2" />
                        Menos de $100.000
                      </label>
                      <label className="flex items-center text-white/70 text-sm">
                        <input type="checkbox" className="mr-2" />
                        $100.000 - $200.000
                      </label>
                      <label className="flex items-center text-white/70 text-sm">
                        <input type="checkbox" className="mr-2" />
                        Más de $200.000
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-3">Ubicación</h4>
                    <div className="space-y-2">
                      <label className="flex items-center text-white/70 text-sm">
                        <input type="checkbox" className="mr-2" />
                        Costa Caribe
                      </label>
                      <label className="flex items-center text-white/70 text-sm">
                        <input type="checkbox" className="mr-2" />
                        Región Andina
                      </label>
                      <label className="flex items-center text-white/70 text-sm">
                        <input type="checkbox" className="mr-2" />
                        Amazonía
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-3">Características</h4>
                    <div className="space-y-2">
                      <label className="flex items-center text-white/70 text-sm">
                        <input type="checkbox" className="mr-2" />
                        Certificado Sostenible
                      </label>
                      <label className="flex items-center text-white/70 text-sm">
                        <input type="checkbox" className="mr-2" />
                        Comunidad Local
                      </label>
                      <label className="flex items-center text-white/70 text-sm">
                        <input type="checkbox" className="mr-2" />
                        Ecológico
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredData.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 h-full ${viewMode === 'list' ? 'lg:flex' : ''}`}>
                    <CardContent className={`p-6 ${viewMode === 'list' ? 'lg:flex lg:items-center lg:space-x-6' : ''}`}>
                      {/* Image/Icon */}
                      <div className={`${viewMode === 'list' ? 'lg:flex-shrink-0' : 'mb-4'}`}>
                        <div className={`${viewMode === 'list' ? 'w-24 h-24' : 'w-16 h-16'} text-3xl bg-gradient-to-br ${currentCategory.color} rounded-xl flex items-center justify-center ${viewMode === 'grid' ? 'mb-4' : ''}`}>
                          {item.image}
                        </div>
                      </div>

                      {/* Content */}
                      <div className={`${viewMode === 'list' ? 'lg:flex-1' : ''}`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                            <div className="flex items-center space-x-2 mb-2">
                              <MapPin className="w-4 h-4 text-white/50" />
                              <span className="text-white/70 text-sm">{item.location}</span>
                            </div>
                          </div>
                          {item.verified && (
                            <Badge className="bg-green-400/20 text-green-400 border-green-400/30 text-xs">
                              Verificado
                            </Badge>
                          )}
                        </div>

                        <p className="text-white/80 text-sm mb-4 line-clamp-2">{item.description}</p>

                        {/* Features */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {item.features.slice(0, 3).map((feature, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs text-white/60 border-white/30">
                              {feature}
                            </Badge>
                          ))}
                        </div>

                        {/* Bottom Info */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center space-x-1 mb-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-white font-medium text-sm">{item.rating}</span>
                              <span className="text-white/60 text-sm">({item.reviews} reseñas)</span>
                            </div>
                            <p className="text-green-400 font-bold">{item.price}</p>
                          </div>
                          <Button size="sm" className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white">
                            Ver Detalles
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                Cargar Más Resultados
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-sm border-green-400/30 max-w-4xl mx-auto">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                ¿No encuentras lo que buscas?
              </h3>
              <p className="text-white/80 mb-6">
                Explora todas nuestras categorías o contáctanos para experiencias personalizadas
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white">
                  <Link to="/experiencias">
                    Ver Todas las Experiencias
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Link to="/about">
                    Contactar
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

export default CategoryPage;