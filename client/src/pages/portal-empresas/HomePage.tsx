import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  Search, Building2, Users, TrendingUp, MapPin, ArrowRight,
  BookOpen, Calendar, ExternalLink, Globe, Mail, Phone,
  Map, Star, MessageCircle, Settings, User as UserIcon, Network, Sparkles,
  Filter, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Import images
import heroImage from '@assets/stock_images/sustainable_tourism,_9d122b10.jpg';
import ecoImage from '@assets/stock_images/sustainable_tourism,_cc0575db.jpg';
import businessImage from '@assets/stock_images/sustainable_tourism,_7b3bfc3e.jpg';

interface PortalStats {
  totalCompanies: number;
  totalTravelers: number;
  totalUsers: number;
  recentCompanies: Array<{
    id: number;
    companyName: string;
    companyCategory: string;
    city: string;
    country: string;
    createdAt: string;
  }>;
}

interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  readTime: string;
  publishedDate: string;
  slug: string;
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch portal statistics
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/portal/stats'],
    staleTime: 5 * 60 * 1000,
  }) as { data: PortalStats; isLoading: boolean };

  // Fetch featured blogs
  const { data: blogs, isLoading: blogsLoading } = useQuery({
    queryKey: ['/api/portal/blogs'],
    staleTime: 10 * 60 * 1000,
  }) as { data: BlogPost[]; isLoading: boolean };

  // Fetch filter options
  const { data: categories = [] } = useQuery({
    queryKey: ['/api/search/filters/categories'],
    staleTime: 15 * 60 * 1000,
  }) as { data: string[]; };

  const { data: subcategories = [] } = useQuery({
    queryKey: ['/api/search/filters/subcategories', selectedCategory],
    enabled: !!selectedCategory,
    staleTime: 10 * 60 * 1000,
  }) as { data: string[]; };

  const { data: countries = [] } = useQuery({
    queryKey: ['/api/search/filters/countries'],
    staleTime: 15 * 60 * 1000,
  }) as { data: string[]; };

  const { data: cities = [] } = useQuery({
    queryKey: ['/api/search/filters/cities', selectedCountry],
    enabled: !!selectedCountry,
    staleTime: 10 * 60 * 1000,
  }) as { data: string[]; };

  // Build search params
  const buildSearchParams = () => {
    const params: Record<string, string> = {};
    if (searchQuery) params.query = searchQuery;
    if (selectedCategory) params.category = selectedCategory;
    if (selectedSubcategory) params.subcategory = selectedSubcategory;
    if (selectedCountry) params.country = selectedCountry;
    if (selectedCity) params.city = selectedCity;
    return params;
  };

  // Enhanced search with filters
  const searchParams = buildSearchParams();
  const hasActiveFilters = Object.keys(searchParams).length > 0;

  const { data: searchResults = [] } = useQuery({
    queryKey: ['/api/search/companies', searchParams],
    enabled: hasActiveFilters,
    staleTime: 2 * 60 * 1000,
  }) as { data: any[]; };

  // Reset subcategory when category changes
  useEffect(() => {
    if (selectedCategory) {
      setSelectedSubcategory("");
    }
  }, [selectedCategory]);

  // Reset city when country changes
  useEffect(() => {
    if (selectedCountry) {
      setSelectedCity("");
    }
  }, [selectedCountry]);

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedSubcategory("");
    setSelectedCountry("");
    setSelectedCity("");
  };

  // Count active filters
  const activeFiltersCount = [selectedCategory, selectedSubcategory, selectedCountry, selectedCity].filter(Boolean).length;

  const navigationLinks = [
    { id: "mapa", label: "Mapa Interactivo", icon: Map, path: "/portal-empresas/mapa", description: "Explora empresas de turismo sostenible" },
    { id: "red", label: "Red de Contactos", icon: Network, path: "/portal-empresas/red", description: "Conecta con otras empresas" },
    { id: "experiencias", label: "Experiencias", icon: Star, path: "/portal-empresas/experiencias", description: "Crea y gestiona experiencias" },
    { id: "chat", label: "Chat", icon: MessageCircle, path: "/portal-empresas/mensajes", description: "Comunicación directa con empresas" },
  ];

  return (
    <div className="portal-empresas-content">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 space-y-12">
        
        {/* Hero Section with Split Layout */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Background with overlay */}
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImage})` }}
          ></div>
          
          {/* Content */}
          <div className="relative z-20 lg:grid lg:grid-cols-2 lg:gap-12 p-8 lg:p-16 min-h-[600px] flex items-center">
            {/* Left side - Text content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 lg:space-y-8 text-center lg:text-left"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-green-400" />
                  <span className="text-green-400 font-semibold">Festival NATUR 2025</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-gasoek text-white leading-tight">
                  Portal <span className="text-green-400 relative">
                    Empresas
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
                  Conecta, crece y transforma el turismo sostenible en Colombia. 
                  Únete a una red de empresas comprometidas con el futuro del planeta.
                </p>
              </div>
              
              {/* Botones mejorados con mejor contraste */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/portal-empresas/mapa">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl border-2 border-green-500 hover:border-green-400 transition-all duration-300"
                      data-testid="button-explore-map"
                    >
                      <Map className="w-5 h-5 mr-2" />
                      Explorar Mapa
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/portal-empresas/red">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="outline" 
                      className="border-2 border-white/60 bg-white/15 backdrop-blur-xl text-white hover:bg-white/25 hover:border-white/80 px-8 py-4 rounded-full font-bold text-lg shadow-2xl transition-all duration-300"
                      data-testid="button-join-network"
                    >
                      <Network className="w-5 h-5 mr-2" />
                      Únete a la Red
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
            
            {/* Right side - Statistics cards overlay */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 lg:mt-0 grid grid-cols-1 gap-4"
            >
              <Card className="bg-white/15 backdrop-blur-xl border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                        {statsLoading ? "..." : stats?.totalCompanies || 0}
                      </div>
                      <p className="text-white/70 font-medium">Empresas Registradas</p>
                    </div>
                    <Building2 className="w-10 h-10 text-green-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/15 backdrop-blur-xl border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                        {statsLoading ? "..." : stats?.totalTravelers || 0}
                      </div>
                      <p className="text-white/70 font-medium">Viajeros Conectados</p>
                    </div>
                    <Users className="w-10 h-10 text-blue-400" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Enhanced Smart Search Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h3 className="text-3xl lg:text-4xl font-gasoek text-white">Encuentra Empresas Sostenibles</h3>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">Busca por nombre, categoría, país, ciudad o cualquier palabra clave relacionada</p>
          </div>

          <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Main Search Input */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-6 h-6" />
                  <Input
                    placeholder="Buscar empresas por nombre, categoría, país, ciudad..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pl-14 pr-4 py-6 text-lg rounded-2xl shadow-lg hover:bg-white/15 focus:bg-white/15 transition-all duration-300 w-full"
                    data-testid="input-smart-search"
                  />
                </div>
                
                {/* Filtros Limpios y Mejorados */}
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-3 items-center justify-between">
                    
                    {hasActiveFilters && (
                      <Button
                        onClick={clearAllFilters}
                        variant="ghost"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-xl px-4 py-2"
                        data-testid="clear-filters"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Limpiar ({activeFiltersCount})
                      </Button>
                    )}
                  </div>

                  {/* Panel de Filtros Simplificado */}
                  <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      
                      {/* Categoría */}
                      <div className="space-y-2">
                        <label className="text-white font-medium text-sm">Categoría</label>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                          <SelectTrigger className="bg-white/10 border-white/20 text-white h-11">
                            <SelectValue placeholder="Todas las categorías" />
                          </SelectTrigger>
                          <SelectContent className="bg-black/90 border-white/20 max-h-[300px]">
                            {categories.map((category) => (
                              <SelectItem key={category} value={category} className="text-white">
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Subcategoría */}
                      <div className="space-y-2">
                        <label className="text-white font-medium text-sm">Subcategoría</label>
                        <Select 
                          value={selectedSubcategory} 
                          onValueChange={setSelectedSubcategory}
                          disabled={!selectedCategory}
                        >
                          <SelectTrigger className="bg-white/10 border-white/20 text-white h-11 disabled:opacity-50">
                            <SelectValue placeholder={!selectedCategory ? "Selecciona categoría" : "Todas las subcategorías"} />
                          </SelectTrigger>
                          <SelectContent className="bg-black/90 border-white/20 max-h-[300px]">
                            {subcategories.map((subcategory) => (
                              <SelectItem key={subcategory} value={subcategory} className="text-white">
                                {subcategory}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* País */}
                      <div className="space-y-2">
                        <label className="text-white font-medium text-sm">País</label>
                        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                          <SelectTrigger className="bg-white/10 border-white/20 text-white h-11">
                            <SelectValue placeholder="Todos los países" />
                          </SelectTrigger>
                          <SelectContent className="bg-black/90 border-white/20 max-h-[300px]">
                            {countries.map((country) => (
                              <SelectItem key={country} value={country} className="text-white">
                                {country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Ciudad */}
                      <div className="space-y-2">
                        <label className="text-white font-medium text-sm">Ciudad</label>
                        <Select 
                          value={selectedCity} 
                          onValueChange={setSelectedCity}
                          disabled={!selectedCountry}
                        >
                          <SelectTrigger className="bg-white/10 border-white/20 text-white h-11 disabled:opacity-50">
                            <SelectValue placeholder={!selectedCountry ? "Selecciona país" : "Todas las ciudades"} />
                          </SelectTrigger>
                          <SelectContent className="bg-black/90 border-white/20 max-h-[300px]">
                            {cities.map((city) => (
                              <SelectItem key={city} value={city} className="text-white">
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Search Results */}
                  {hasActiveFilters && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-semibold text-lg">
                          Resultados encontrados: {searchResults.length}
                        </h4>
                        <div className="flex gap-2">
                          {searchQuery && (
                            <Badge className="bg-blue-600/80 text-white px-3 py-1">
                              Texto: "{searchQuery}"
                            </Badge>
                          )}
                          {activeFiltersCount > 0 && (
                            <Badge className="bg-green-600/80 text-white px-3 py-1">
                              {activeFiltersCount} filtros activos
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {searchResults.length > 0 ? (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                            {searchResults.slice(0, 15).map((company, index) => (
                              <motion.div
                                key={company.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                              >
                                <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 hover:scale-105 hover:shadow-2xl transition-all duration-300 shadow-xl">
                                  <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                      <h5 className="text-white font-bold text-lg leading-tight">{company.companyName}</h5>
                                      <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0 mt-2"></div>
                                    </div>
                                    
                                    <div className="space-y-2 mb-3">
                                      {company.companyCategory && (
                                        <Badge className="bg-green-600/80 text-white text-xs">
                                          {company.companyCategory}
                                        </Badge>
                                      )}
                                      {company.companySubcategory && (
                                        <Badge className="bg-blue-600/80 text-white text-xs ml-2">
                                          {company.companySubcategory}
                                        </Badge>
                                      )}
                                    </div>
                                    
                                    <div className="flex items-center text-white/70 text-sm mb-2">
                                      <MapPin className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                                      <span className="truncate">{company.city}, {company.country}</span>
                                    </div>
                                    
                                    {company.companyDescription && (
                                      <p className="text-white/60 text-xs line-clamp-2 mt-2">
                                        {company.companyDescription}
                                      </p>
                                    )}
                                  </CardContent>
                                </Card>
                              </motion.div>
                            ))}
                          </div>
                          {searchResults.length > 15 && (
                            <div className="text-center pt-4">
                              <Badge className="bg-purple-600/80 text-white px-4 py-2 text-sm">
                                Mostrando 15 de {searchResults.length} empresas encontradas
                              </Badge>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-center py-8">
                          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-white/40" />
                          </div>
                          <p className="text-white/60 text-lg mb-2">No se encontraron empresas</p>
                          <p className="text-white/40 text-sm">
                            Prueba modificando los filtros o términos de búsqueda
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
                
                {/* Search Tips */}
                {!hasActiveFilters && (
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h5 className="text-white font-semibold mb-3 flex items-center">
                      <Sparkles className="w-5 h-5 mr-2 text-green-400" />
                      Buscador Inteligente
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/70">
                      <div>
                        <strong className="text-white">Búsqueda por texto:</strong> Nombre de empresa, descripción, servicios
                      </div>
                      <div>
                        <strong className="text-white">Filtro por categoría:</strong> {categories.length} categorías disponibles
                      </div>
                      <div>
                        <strong className="text-white">Filtro por ubicación:</strong> {countries.length} países registrados
                      </div>
                      <div>
                        <strong className="text-white">Filtros combinables:</strong> Usa múltiples filtros para búsquedas precisas
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Animated Portal Explanation with CTAs */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="inline-flex items-center gap-2 bg-green-600/20 backdrop-blur-lg border border-green-500/30 rounded-full px-8 py-4 mb-4"
            >
              <Sparkles className="w-6 h-6 text-green-400" />
              <span className="text-green-400 font-bold text-lg">Portal Empresas NATUR</span>
            </motion.div>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-4xl lg:text-5xl font-gasoek text-white"
            >
              Tu Ecosistema de Turismo Sostenible
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-xl text-white/80 max-w-4xl mx-auto"
            >
              Conecta, crece y transforma el turismo sostenible. Una plataforma completa donde tu empresa 
              puede brillar, colaborar y generar impacto real en el mundo.
            </motion.p>
          </div>

          {/* Animated Features Flow */}
          <div className="relative">
            {/* Connecting Lines Animation */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <svg width="800" height="400" className="hidden lg:block">
                <motion.path
                  d="M150,200 Q400,100 650,200"
                  stroke="rgb(132, 204, 22)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.8 }}
                />
                <motion.path
                  d="M150,200 Q400,300 650,200"
                  stroke="rgb(132, 204, 22)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1.2 }}
                />
              </svg>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
              {/* Feature 1 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-center"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
                >
                  <Map className="w-12 h-12 text-white" />
                </motion.div>
                <h4 className="text-white font-bold text-xl mb-3">Visibilidad Global</h4>
                <p className="text-white/70 mb-6">
                  Aparece en nuestro mapa interactivo y conecta con miles de viajeros sostenibles
                </p>
                <Link href="/portal-empresas/mapa">
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
                    <Map className="w-4 h-4 mr-2" />
                    Ver Mapa
                  </Button>
                </Link>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="text-center"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, -5, 5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                  className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
                >
                  <Network className="w-12 h-12 text-white" />
                </motion.div>
                <h4 className="text-white font-bold text-xl mb-3">Red Poderosa</h4>
                <p className="text-white/70 mb-6">
                  Conecta con empresas afines, forma alianzas y comparte conocimientos valiosos
                </p>
                <Link href="/portal-empresas/red">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
                    <Network className="w-4 h-4 mr-2" />
                    Conectar
                  </Button>
                </Link>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-center"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3
                  }}
                  className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
                >
                  <UserIcon className="w-12 h-12 text-white" />
                </motion.div>
                <h4 className="text-white font-bold text-xl mb-3">Gestión Total</h4>
                <p className="text-white/70 mb-6">
                  Administra tu perfil, certificaciones y prácticas sostenibles de forma integral
                </p>
                <Link href="/portal-empresas/perfil">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
                    <UserIcon className="w-4 h-4 mr-2" />
                    Mi Perfil
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Main CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-center space-y-8"
          >
            <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-xl border border-white/20 rounded-3xl p-8 lg:p-12">
              <motion.h4 
                animate={{ 
                  textShadow: [
                    "0 0 20px rgb(132, 204, 22)",
                    "0 0 40px rgb(132, 204, 22)",
                    "0 0 20px rgb(132, 204, 22)"
                  ]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-3xl lg:text-4xl font-gasoek text-white mb-4"
              >
                ¿Listo para Transformar tu Empresa?
              </motion.h4>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Únete a la revolución del turismo sostenible y conecta con una comunidad global 
                de empresas comprometidas con el futuro del planeta.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/portal-empresas/experiencias">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl border-2 border-green-500 hover:border-green-400">
                      <Star className="w-5 h-5 mr-2" />
                      Crear Experiencia
                    </Button>
                  </motion.div>
                </Link>
                
                <Link href="/portal-empresas/mensajes">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="outline" className="border-2 border-white/60 bg-white/15 backdrop-blur-xl text-white hover:bg-white/25 hover:border-white/80 px-8 py-4 rounded-full font-bold text-lg shadow-xl">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Iniciar Chat
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Navigation Links */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-6"
        >
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-gasoek text-white">Navega por el Portal</h3>
            <p className="text-white/70">Accede rápidamente a todas las funcionalidades del portal empresas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {navigationLinks.map((link) => (
              <Link key={link.id} href={link.path}>
                <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <link.icon className="w-5 h-5 text-green-400" />
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white/80 transition-colors" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">{link.label}</h4>
                    <p className="text-white/70 text-sm">{link.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* Featured Blogs */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="space-y-6"
        >
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-gasoek text-white">Artículos Destacados</h3>
            <p className="text-white/70">Mantente informado con las últimas tendencias en turismo sostenible</p>
          </div>

          {blogsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-white/10 backdrop-blur-xl border-white/20">
                  <CardContent className="p-6">
                    <div className="animate-pulse">
                      <div className="w-full h-48 bg-white/20 rounded-lg mb-4"></div>
                      <div className="h-4 bg-white/20 rounded mb-2"></div>
                      <div className="h-3 bg-white/20 rounded w-3/4"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogs?.map((blog) => (
                <Card key={blog.id} className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={blog.image} 
                        alt={blog.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-green-600/80 text-white">
                          {blog.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-white font-semibold mb-2 line-clamp-2">{blog.title}</h4>
                      <p className="text-white/70 text-sm mb-4 line-clamp-3">{blog.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-white/50 text-xs">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(blog.publishedDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-white/50 text-xs">
                          <BookOpen className="w-3 h-3 mr-1" />
                          {blog.readTime}
                        </div>
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          className="w-full mt-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold border-2 border-green-500 hover:border-green-400 shadow-lg hover:shadow-xl transition-all duration-300"
                          data-testid={`button-read-blog-${blog.id}`}
                          onClick={() => {
                            // Para el artículo de la plataforma, abrir en la misma ventana
                            if (blog.slug === 'festival-natur-alianza-turismo-sostenible-colombia') {
                              window.location.href = '/plataforma';
                            }
                            // Para otros artículos, simular navegación a contenido completo
                            else {
                              alert(`Artículo: ${blog.title}\n\nEste artículo abrirá próximamente con el contenido completo.\n\nTemas incluidos:\n• ${blog.description}`);
                            }
                          }}
                        >
                          Leer Artículo
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </motion.section>

        {/* Artículos Destacados - Enlaces Directos */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="space-y-6"
        >
          <div className="text-center space-y-2">
            <h3 className="text-3xl font-gasoek text-white">Artículos Destacados</h3>
            <p className="text-white/70 text-lg">Descubre las últimas tendencias en turismo sostenible</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Artículo 1: Festival NATUR */}
            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer group"
              onClick={() => window.location.href = '/plataforma'}
            >
              <Card className="bg-black/20 backdrop-blur-2xl border border-white/20 hover:border-white/40 transition-all duration-500 shadow-2xl hover:shadow-3xl overflow-hidden h-full">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                  <img 
                    src={heroImage}
                    alt="Festival NATUR Alianza"
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <Badge className="bg-green-600/90 text-white border-green-400/50 border">
                      Plataforma NATUR
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <h4 className="text-white font-bold text-xl mb-2 leading-tight">
                      Festival NATUR: Forjando la Alianza de Turismo Sostenible
                    </h4>
                    <p className="text-white/80 text-sm line-clamp-2 mb-3">
                      Descubre cómo estamos uniendo empresas, viajeros y comunidades para crear la alianza más grande de turismo sostenible en Colombia.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 text-xs font-medium">8 min lectura</span>
                      <ExternalLink className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Artículo 2: Guía Turismo Sostenible */}
            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer group"
              onClick={() => alert('Guía Completa: Turismo Sostenible y Responsable en Colombia\n\nUna guía definitiva para practicar turismo sostenible en Colombia. Aprende cómo viajar de manera responsable, apoyar comunidades locales y conservar nuestros ecosistemas únicos.')}
            >
              <Card className="bg-black/20 backdrop-blur-2xl border border-white/20 hover:border-white/40 transition-all duration-500 shadow-2xl hover:shadow-3xl overflow-hidden h-full">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                  <img 
                    src={ecoImage}
                    alt="Turismo Sostenible Colombia"
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <Badge className="bg-blue-600/90 text-white border-blue-400/50 border">
                      Guía de Turismo
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <h4 className="text-white font-bold text-xl mb-2 leading-tight">
                      Guía Completa: Turismo Sostenible y Responsable
                    </h4>
                    <p className="text-white/80 text-sm line-clamp-2 mb-3">
                      Una guía definitiva para practicar turismo sostenible en Colombia. Aprende cómo viajar de manera responsable.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-400 text-xs font-medium">12 min lectura</span>
                      <BookOpen className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Artículo 3: Festival NATUR 2026 */}
            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer group"
              onClick={() => alert('Preparándonos para el Festival NATUR 2026\n\nConoce todos los detalles sobre el Festival NATUR 2026, el evento más importante de turismo sostenible en Colombia. Agenda, ponentes, experiencias y cómo ser parte de esta transformación.')}
            >
              <Card className="bg-black/20 backdrop-blur-2xl border border-white/20 hover:border-white/40 transition-all duration-500 shadow-2xl hover:shadow-3xl overflow-hidden h-full">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                  <img 
                    src={businessImage}
                    alt="Festival NATUR 2026"
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <Badge className="bg-purple-600/90 text-white border-purple-400/50 border">
                      Festival NATUR 2026
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <h4 className="text-white font-bold text-xl mb-2 leading-tight">
                      Preparándonos para el Festival NATUR 2026
                    </h4>
                    <p className="text-white/80 text-sm line-clamp-2 mb-3">
                      Conoce todos los detalles sobre el evento más importante de turismo sostenible en Colombia.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-400 text-xs font-medium">10 min lectura</span>
                      <Calendar className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}