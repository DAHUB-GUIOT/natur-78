import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  Search, Building2, Users, TrendingUp, MapPin, ArrowRight,
  BookOpen, Calendar, ExternalLink, Globe, Mail, Phone,
  Map, Star, MessageCircle, Settings, User as UserIcon, Network
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeaderButtons } from "@/components/layout/HeaderButtons";

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

const MinimalistPortalEmpresas = () => {
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
    { id: "perfil", label: "Mi Perfil", icon: UserIcon, path: "/portal-empresas/perfil", description: "Gestiona tu información empresarial" },
    { id: "red", label: "Red de Contactos", icon: Network, path: "/portal-empresas/red", description: "Conecta con otras empresas" },
    { id: "experiencias", label: "Experiencias", icon: Star, path: "/portal-empresas/experiencias", description: "Crea y gestiona experiencias" },
    { id: "mensajes", label: "Mensajes", icon: MessageCircle, path: "/portal-empresas/mensajes", description: "Comunicación directa" },
    { id: "configuracion", label: "Configuración", icon: Settings, path: "/portal-empresas/configuracion", description: "Ajustes de cuenta" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white font-gasoek text-xl lg:text-2xl">Portal Empresas</h1>
              <p className="text-white/60 text-sm">Ecosistema de Turismo Sostenible</p>
            </div>
            <HeaderButtons showPortalEmpresasNav={true} />
          </div>
        </div>
      </div>

      {/* Main Content with Enhanced Scroll */}
      <div className="portal-empresas-content">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 space-y-12">
          
          {/* Hero Section with Statistics */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-6xl font-gasoek text-white leading-tight">
                Bienvenido al Portal <span className="text-green-400">Empresas</span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Conecta, crece y transforma el turismo sostenible en Colombia. 
                Únete a una red de empresas comprometidas con el futuro del planeta.
              </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardContent className="p-6 text-center">
                  <Building2 className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">
                    {statsLoading ? "..." : stats?.totalCompanies || 0}
                  </div>
                  <p className="text-white/60 text-sm">Empresas Registradas</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">
                    {statsLoading ? "..." : stats?.totalTravelers || 0}
                  </div>
                  <p className="text-white/60 text-sm">Viajeros Conectados</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">
                    {statsLoading ? "..." : stats?.totalUsers || 0}
                  </div>
                  <p className="text-white/60 text-sm">Total Usuarios</p>
                </CardContent>
              </Card>
            </div>
          </motion.section>

          {/* Company Search Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-gasoek text-white">Buscar Empresas</h3>
              <p className="text-white/70">Encuentra empresas de turismo sostenible por nombre, categoría o ubicación</p>
            </div>

            <Card className="bg-white/10 backdrop-blur-xl border-white/20">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                    <Input
                      placeholder="Buscar empresas..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pl-12"
                      data-testid="input-search-companies"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={searchFilter === "all" ? "default" : "outline"}
                      onClick={() => setSearchFilter("all")}
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      data-testid="filter-all"
                    >
                      Todo
                    </Button>
                    <Button
                      variant={searchFilter === "name" ? "default" : "outline"}
                      onClick={() => setSearchFilter("name")}
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      data-testid="filter-name"
                    >
                      Nombre
                    </Button>
                    <Button
                      variant={searchFilter === "category" ? "default" : "outline"}
                      onClick={() => setSearchFilter("category")}
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      data-testid="filter-category"
                    >
                      Categoría
                    </Button>
                    <Button
                      variant={searchFilter === "location" ? "default" : "outline"}
                      onClick={() => setSearchFilter("location")}
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      data-testid="filter-location"
                    >
                      Ubicación
                    </Button>
                  </div>
                </div>

                {/* Search Results */}
                {searchQuery && (
                  <div className="mt-6">
                    <h4 className="text-white font-semibold mb-3">
                      Resultados de búsqueda ({filteredCompanies.length})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-80 overflow-y-auto">
                      {filteredCompanies.slice(0, 9).map((company) => (
                        <Card key={company.id} className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-200">
                          <CardContent className="p-4">
                            <h5 className="text-white font-semibold mb-1">{company.companyName}</h5>
                            <p className="text-white/60 text-sm mb-2">{company.companyCategory}</p>
                            <div className="flex items-center text-white/50 text-xs">
                              <MapPin className="w-3 h-3 mr-1" />
                              {company.city}, {company.country}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    {filteredCompanies.length > 9 && (
                      <p className="text-white/60 text-sm mt-3 text-center">
                        Y {filteredCompanies.length - 9} empresas más...
                      </p>
                    )}
                  </div>
                )}
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
    </div>
  );
};

export default MinimalistPortalEmpresas;