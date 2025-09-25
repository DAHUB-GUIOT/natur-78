import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  Search, Building2, Users, TrendingUp, MapPin, ArrowRight,
  BookOpen, Calendar, ExternalLink, Globe, Mail, Phone,
  Map, Star, MessageCircle, Settings, User as UserIcon, Network, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  const [searchFilter, setSearchFilter] = useState("all");

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

  // Fetch companies for search
  const { data: allCompanies = [] } = useQuery({
    queryKey: ['/api/companies/map'],
    staleTime: 5 * 60 * 1000,
  }) as { data: any[]; };

  // Filter companies based on search
  const filteredCompanies = allCompanies.filter(company => {
    if (!searchQuery) return false;
    
    const searchLower = searchQuery.toLowerCase();
    const matchesName = company.companyName?.toLowerCase().includes(searchLower);
    const matchesCategory = company.companyCategory?.toLowerCase().includes(searchLower);
    const matchesLocation = company.city?.toLowerCase().includes(searchLower) || 
                           company.country?.toLowerCase().includes(searchLower);
    
    if (searchFilter === "name") return matchesName;
    if (searchFilter === "category") return matchesCategory;
    if (searchFilter === "location") return matchesLocation;
    
    return matchesName || matchesCategory || matchesLocation;
  });

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
              
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  data-testid="button-explore-map"
                >
                  <Map className="w-5 h-5 mr-2" />
                  Explorar Mapa
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white/30 bg-white/10 backdrop-blur-lg text-white hover:bg-white/20 px-8 py-3 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  data-testid="button-join-network"
                >
                  <Network className="w-5 h-5 mr-2" />
                  Únete a la Red
                </Button>
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
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-green-600/20 backdrop-blur-lg border border-green-500/30 rounded-full px-6 py-3"
            >
              <Search className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-semibold">Buscador Inteligente</span>
            </motion.div>
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
                
                {/* Smart Filter Buttons */}
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button
                    variant={searchFilter === "all" ? "default" : "outline"}
                    onClick={() => setSearchFilter("all")}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      searchFilter === "all" 
                        ? "bg-green-600 hover:bg-green-700 text-white shadow-lg" 
                        : "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105"
                    }`}
                    data-testid="filter-all"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Todo
                  </Button>
                  <Button
                    variant={searchFilter === "name" ? "default" : "outline"}
                    onClick={() => setSearchFilter("name")}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      searchFilter === "name" 
                        ? "bg-green-600 hover:bg-green-700 text-white shadow-lg" 
                        : "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105"
                    }`}
                    data-testid="filter-name"
                  >
                    <Building2 className="w-4 h-4 mr-2" />
                    Nombre
                  </Button>
                  <Button
                    variant={searchFilter === "category" ? "default" : "outline"}
                    onClick={() => setSearchFilter("category")}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      searchFilter === "category" 
                        ? "bg-green-600 hover:bg-green-700 text-white shadow-lg" 
                        : "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105"
                    }`}
                    data-testid="filter-category"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Categoría
                  </Button>
                  <Button
                    variant={searchFilter === "location" ? "default" : "outline"}
                    onClick={() => setSearchFilter("location")}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      searchFilter === "location" 
                        ? "bg-green-600 hover:bg-green-700 text-white shadow-lg" 
                        : "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105"
                    }`}
                    data-testid="filter-location"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Ubicación
                  </Button>
                </div>

                {/* Enhanced Search Results */}
                {searchQuery && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-white font-semibold text-lg">
                        Resultados encontrados: {filteredCompanies.length}
                      </h4>
                      {filteredCompanies.length > 0 && (
                        <Badge className="bg-green-600/80 text-white px-3 py-1">
                          {searchFilter === "all" ? "Búsqueda global" : `Filtrado por ${searchFilter}`}
                        </Badge>
                      )}
                    </div>
                    
                    {filteredCompanies.length > 0 ? (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                          {filteredCompanies.slice(0, 12).map((company, index) => (
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
                                  <Badge className="bg-green-600/80 text-white mb-3 text-xs">
                                    {company.companyCategory}
                                  </Badge>
                                  <div className="flex items-center text-white/70 text-sm">
                                    <MapPin className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                                    <span className="truncate">{company.city}, {company.country}</span>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                        {filteredCompanies.length > 12 && (
                          <div className="text-center pt-4">
                            <Badge className="bg-blue-600/80 text-white px-4 py-2 text-sm">
                              Y {filteredCompanies.length - 12} empresas más disponibles...
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
                          Prueba con otros términos de búsqueda o cambia el filtro
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
                
                {/* Search Tips */}
                {!searchQuery && (
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h5 className="text-white font-semibold mb-3 flex items-center">
                      <Sparkles className="w-5 h-5 mr-2 text-green-400" />
                      Consejos de búsqueda
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/70">
                      <div>
                        <strong className="text-white">Por nombre:</strong> "EcoTours", "Aventura Verde"
                      </div>
                      <div>
                        <strong className="text-white">Por categoría:</strong> "Ecoturismo", "Turismo rural"
                      </div>
                      <div>
                        <strong className="text-white">Por país:</strong> "Colombia", "Costa Rica"
                      </div>
                      <div>
                        <strong className="text-white">Por ciudad:</strong> "Bogotá", "Medellín"
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Portal Explanation */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-gasoek text-white">¿Qué es el Portal Empresas?</h3>
            <p className="text-white/70 max-w-3xl mx-auto">
              Una plataforma integral diseñada para empresas de turismo sostenible que buscan conectar, 
              crecer y generar impacto positivo en sus comunidades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white/10 backdrop-blur-xl border-white/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Map className="w-6 h-6 text-green-400" />
                </div>
                <h4 className="text-white font-semibold mb-2">Visibilidad en el Mapa</h4>
                <p className="text-white/70 text-sm">
                  Aparece en nuestro mapa interactivo y conecta con viajeros que buscan experiencias sostenibles.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-xl border-white/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Network className="w-6 h-6 text-blue-400" />
                </div>
                <h4 className="text-white font-semibold mb-2">Red de Contactos</h4>
                <p className="text-white/70 text-sm">
                  Conecta con otras empresas del sector, forma alianzas estratégicas y comparte conocimientos.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-xl border-white/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                  <UserIcon className="w-6 h-6 text-purple-400" />
                </div>
                <h4 className="text-white font-semibold mb-2">Gestión de Perfil</h4>
                <p className="text-white/70 text-sm">
                  Administra tu información empresarial, certificaciones y prácticas sostenibles de forma completa.
                </p>
              </CardContent>
            </Card>
          </div>
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
                      <Button 
                        className="w-full mt-4 bg-green-600/20 border-green-500/30 text-green-400 hover:bg-green-600/30"
                        data-testid={`button-read-blog-${blog.id}`}
                      >
                        Leer Artículo
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </motion.section>

        {/* Recent Companies */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="space-y-6"
        >
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-gasoek text-white">Empresas Registradas Recientemente</h3>
            <p className="text-white/70">Conoce a las nuevas empresas que se han unido al ecosistema</p>
          </div>

          {statsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="bg-white/10 backdrop-blur-xl border-white/20">
                  <CardContent className="p-4">
                    <div className="animate-pulse">
                      <div className="h-4 bg-white/20 rounded mb-2"></div>
                      <div className="h-3 bg-white/20 rounded w-2/3 mb-2"></div>
                      <div className="h-3 bg-white/20 rounded w-1/2"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats?.recentCompanies?.map((company) => (
                <Card key={company.id} className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-200">
                  <CardContent className="p-4">
                    <h5 className="text-white font-semibold mb-1">{company.companyName}</h5>
                    <p className="text-white/60 text-sm mb-2">{company.companyCategory}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-white/50 text-xs">
                        <MapPin className="w-3 h-3 mr-1" />
                        {company.city}, {company.country}
                      </div>
                      <div className="text-white/50 text-xs">
                        {company.createdAt && new Date(company.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </motion.section>

      </div>
    </div>
  );
}