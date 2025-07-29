import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Home, 
  Map, 
  Building2, 
  Star, 
  MessageCircle, 
  BarChart3, 
  Settings,
  Search,
  Bell,
  Plus,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Globe,
  Filter,
  MoreVertical,
  Heart,
  Share,
  Bookmark,
  User,
  LogOut,
  Edit,
  Handshake,
  ShieldCheck,
  Mail,
  Share2,
  Code,
  Repeat2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InteractiveMap } from "@/components/dashboard/InteractiveMap";
import ExperienceForm from "@/components/dashboard/ExperienceForm";
import ProfileSection from "@/components/dashboard/ProfileSection";
import TwitterProfileSection from "@/components/profile/TwitterProfileSection";
import { SimpleChat } from "@/components/messaging/SimpleChat";

import { Link } from "wouter";

const PortalEmpresasDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("mapa");
  const [showExperienceForm, setShowExperienceForm] = useState(false);



  // Fetch experiences data
  const { data: experiences = [], isLoading: experiencesLoading } = useQuery({
    queryKey: ['/api/experiences'],
    retry: false,
  });

  // Fetch current user data
  const { data: currentUser, isLoading: userLoading, refetch: refetchUser } = useQuery({
    queryKey: ['/api/auth/me'],
    retry: false,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  // Cast currentUser to proper type - handle both direct user and nested user format
  const user = (currentUser as any)?.user || currentUser;

  const sidebarItems = [
    { id: "mapa", label: "Mapa", icon: Map },
    { id: "empresas", label: "Contactos", icon: Building2 },
    { id: "experiencias", label: "Experiencias", icon: Star },
    { id: "mensajes", label: "Mensajes", icon: MessageCircle },
    { id: "ajustes", label: "Ajustes", icon: Settings },
    ...(user?.role === 'admin' ? [{ id: "admin", label: "Admin Panel", icon: ShieldCheck }] : [])
  ];



  // Fetch all company users from database
  const { data: companiesData = [], isLoading: companiesLoading, error } = useQuery({
    queryKey: ['/api/users/companies'],
    retry: false,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todas");

  const categories = [
    { id: "todas", label: "Todas las categorías" },
    { id: "agencias-operadores", label: "🧭 Agencias u Operadores Turísticos" },
    { id: "alojamientos", label: "🛏️ Alojamientos Sostenibles" },
    { id: "gastronomia", label: "🍃 Gastronomía Sostenible" },
    { id: "movilidad", label: "🚲 Movilidad y Transporte Ecológico" },
    { id: "ong-fundaciones", label: "🌱 ONG y Fundaciones" },
    { id: "educacion", label: "📚 Educación y Sensibilización Ambiental" },
    { id: "tecnologia", label: "💡 Tecnología para el Turismo Sostenible" },
    { id: "aliados", label: "🤝 Aliados y Patrocinadores" }
  ];

  // Simplified company mapping for better performance
  const companies = (companiesData as any[]).map((user: any) => ({
    id: user.id,
    name: user.email === 'dahub.tech@gmail.com' ? 'DaHub' : 
          user.email === 'tripcol.tour@gmail.com' ? 'TripCol' : 
          user.email === 'info@festivalnatur.com' ? 'Festival NATUR' :
          user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.name,
    category: user.category || "Empresa",
    location: user.location || "Colombia",
    founder: user.founder || user.name,
    email: user.email
  }));

  // Optimized filtering logic
  const filteredCompanies = companies.filter((company: any) => {
    const matchesSearch = !searchTerm || company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "todas";
    return matchesSearch && matchesCategory;
  });

  const renderContent = () => {
    switch (activeSection) {
      case "inicio":
        return (
          <div className="space-y-6">
            {/* Compact Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 hover:bg-gray-800/50 transition-all">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white font-medium">Experiencias Activas</p>
                      <p className="text-xl font-bold text-white">12</p>
                    </div>
                    <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <Star className="w-4 h-4 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 hover:bg-gray-800/50 transition-all">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white font-medium">Reservas del Mes</p>
                      <p className="text-xl font-bold text-white">89</p>
                    </div>
                    <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 hover:bg-gray-800/50 transition-all">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white font-medium">Ingresos</p>
                      <p className="text-xl font-bold text-white">$2.4M</p>
                    </div>
                    <div className="w-8 h-8 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-yellow-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 hover:bg-gray-800/50 transition-all">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white font-medium">Clientes Nuevos</p>
                      <p className="text-xl font-bold text-white">24</p>
                    </div>
                    <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-purple-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">Actividad Reciente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-lg">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white">Nueva reserva para "Tour de Café Sostenible"</p>
                      <p className="text-sm text-gray-300">Hace 2 horas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-lg">
                    <div className="w-10 h-10 bg-green-600/20 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white">Nuevo mensaje de EcoTours Colombia</p>
                      <p className="text-sm text-gray-300">Hace 1 día</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "experiencias":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Mis Experiencias</h2>
              <Button 
                size="sm" 
                onClick={() => setShowExperienceForm(true)}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
              >
                <Plus className="w-3 h-3 mr-1" />
                Crear
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {(experiences as any[]).map((experience: any) => (
                <Card key={experience.id} className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 hover:bg-gray-800/50 transition-all duration-200 overflow-hidden">
                  <div className="relative">
                    <img 
                      src={experience.image} 
                      alt={experience.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-2 right-2 space-y-1">
                      <Button size="sm" variant="secondary" className="w-6 h-6 p-0 bg-gray-700/80 backdrop-blur-md text-white hover:bg-gray-600/80">
                        <Heart className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="secondary" className="w-6 h-6 p-0 bg-gray-700/80 backdrop-blur-md text-white hover:bg-gray-600/80">
                        <Share className="w-3 h-3" />
                      </Button>
                    </div>
                    <Badge className="absolute top-2 left-2 bg-green-600/80 text-white text-xs backdrop-blur-sm">
                      {experience.category}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-3">
                    <div className="space-y-2">
                      <div>
                        <h3 className="font-semibold text-sm text-white mb-1">{experience.title}</h3>
                        <p className="text-gray-200 text-xs line-clamp-2">{experience.subtitle}</p>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-200">
                        <MapPin className="w-3 h-3 mr-1" />
                        {experience.location}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Avatar className="w-4 h-4">
                            <AvatarImage src={experience.hostAvatar} />
                            <AvatarFallback className="bg-green-500 text-white text-xs">{experience.host[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-gray-200 truncate">{experience.host}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs font-medium text-white">{experience.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-1">
                          {experience.tags?.slice(0, 2).map((tag: string) => (
                            <Badge key={tag} className="bg-gray-700/80 text-gray-200 text-xs backdrop-blur-md px-1 py-0">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-white">
                            ${experience.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-1 pt-1">
                        <Link href={`/experiencia/${experience.id}`} className="flex-1">
                          <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white text-xs h-6">Ver</Button>
                        </Link>
                        <Button size="sm" variant="outline" className="border-gray-500/50 text-gray-300 hover:bg-gray-700/50 h-6 w-6 p-0">
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "empresas":
        return (
          <div className="space-y-4">
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Contactos</h2>
                <Badge className="bg-green-600/20 text-green-300 px-3 py-1">
                  {filteredCompanies.length} contactos
                </Badge>
              </div>
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/70" />
                <Input 
                  placeholder="Buscar por nombre, descripción o especialidades..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800/40 border-gray-600/50 text-white placeholder-white/60 backdrop-blur-md"
                />
              </div>

              {/* Simplified filters */}
              <div className="text-sm text-gray-400">
                Mostrando todos los contactos registrados
              </div>
            </div>
            
            {companiesLoading ? (
              <div className="text-center py-12">
                <div className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 rounded-lg p-8">
                  <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-lg font-sans text-white mb-2">Cargando empresas...</h3>
                  <p className="text-gray-300 text-sm">Obteniendo contactos de la base de datos</p>
                </div>
              </div>
            ) : filteredCompanies.length === 0 ? (
              <div className="text-center py-12">
                <div className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 rounded-lg p-8">
                  <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-sans text-white mb-2">No se encontraron empresas</h3>
                  <p className="text-gray-300 text-sm">
                    {searchTerm ? `No hay resultados para "${searchTerm}"` : "No hay empresas en esta categoría"}
                  </p>

                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredCompanies.map((company) => (
                  <Card key={company.id} className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 hover:bg-gray-800/50 transition-all">
                  <CardContent className="p-3">
                    <div className="space-y-2">
                      {/* Simplified header */}
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-green-600 text-white text-sm">{company.name[0]}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <h3 className="font-sans text-sm text-white">{company.name}</h3>
                          <p className="text-xs text-gray-300">{company.location}</p>
                        </div>
                      </div>
                      
                      {/* Simple action buttons */}
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-gray-600/50 text-gray-300 hover:bg-gray-700/50 text-xs h-7 flex-1"
                          onClick={() => window.location.href = `/empresa/${company.id}`}
                        >
                          Ver Perfil
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700 text-white text-xs h-7 flex-1"
                        >
                          Contactar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      case "mapa":
        return <InteractiveMap />;



      case "ajustes":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-sans text-white">Ajustes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
                <CardContent className="p-3">
                  <h3 className="text-sm font-sans text-white mb-3">Perfil</h3>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start border-gray-600/50 text-white hover:bg-gray-700/50 text-xs h-8 backdrop-blur-sm">
                      <User className="w-3 h-3 mr-2" />
                      Editar perfil
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start border-gray-600/50 text-white hover:bg-gray-700/50 text-xs h-8 backdrop-blur-sm">
                      <Settings className="w-3 h-3 mr-2" />
                      Cambiar contraseña
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
                <CardContent className="p-3">
                  <h3 className="text-sm font-sans text-white mb-3">Pagos</h3>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start border-gray-600/50 text-white hover:bg-gray-700/50 text-xs h-8 backdrop-blur-sm">
                      <DollarSign className="w-3 h-3 mr-2" />
                      Métodos de pago
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start border-gray-600/50 text-white hover:bg-gray-700/50 text-xs h-8 backdrop-blur-sm">
                      <BarChart3 className="w-3 h-3 mr-2" />
                      Facturación
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
                <CardContent className="p-3">
                  <h3 className="text-sm font-sans text-white mb-3">Notificaciones</h3>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start border-gray-600/50 text-white hover:bg-gray-700/50 text-xs h-8 backdrop-blur-sm">
                      <Bell className="w-3 h-3 mr-2" />
                      Configurar
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start border-gray-600/50 text-white hover:bg-gray-700/50 text-xs h-8 backdrop-blur-sm">
                      <MessageCircle className="w-3 h-3 mr-2" />
                      Mensajes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Quick Settings */}
            <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
              <CardContent className="p-3">
                <h3 className="text-sm font-sans text-white mb-3">Configuración Rápida</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-xs text-white">Modo de Disponibilidad</label>
                    <select className="w-full bg-gray-800/50 border border-gray-600/50 text-white text-xs rounded-lg p-2 backdrop-blur-sm">
                      <option>Disponible</option>
                      <option>Ocupado</option>
                      <option>Ausente</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white">Idioma</label>
                    <select className="w-full bg-gray-800/50 border border-gray-600/50 text-white text-xs rounded-lg p-2 backdrop-blur-sm">
                      <option>Español</option>
                      <option>English</option>
                      <option>Português</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "mensajes":
        return (
          <div className="h-[calc(100vh-8rem)]">
            <SimpleChat onClose={() => setActiveSection("inicio")} />
          </div>
        );

      case "perfil":
        return (
          <div className="space-y-6">
            {/* X/Twitter Style Profile Header */}
            <div className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 rounded-xl overflow-hidden">
              {/* Cover Photo */}
              <div className="h-32 bg-gradient-to-r from-green-600 to-emerald-600 relative">
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
              
              {/* Profile Info */}
              <div className="px-6 pb-6">
                <div className="flex items-end justify-between -mt-8 mb-4">
                  <Avatar className="w-24 h-24 ring-4 ring-gray-900 bg-gray-900">
                    <AvatarFallback className="bg-green-600 text-white text-2xl font-bold">D</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex space-x-2 mt-12">
                    <Button size="sm" variant="outline" className="border-gray-600/50 text-white hover:bg-gray-700/50">
                      <Settings className="w-4 h-4 mr-1" />
                      Editar perfil
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      <Share2 className="w-4 h-4 mr-1" />
                      Compartir
                    </Button>
                  </div>
                </div>
                
                {/* Profile Details */}
                <div className="space-y-3">
                  <div>
                    <h1 className="text-2xl font-bold text-white">DaHub</h1>
                    <p className="text-gray-400">@dahub</p>
                  </div>
                  
                  <p className="text-white text-sm leading-relaxed">
                    🚀 Empresa de tecnología especializada en desarrollo de plataformas digitales para turismo sostenible. 
                    Creadores de Festival NATUR - conectando la innovación con el turismo regenerativo en Colombia.
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      Medellín, Colombia
                    </div>
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-1" />
                      dahub.tech
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Se unió en enero 2025
                    </div>
                  </div>
                  
                  <div className="flex space-x-6 text-sm">
                    <div className="text-white">
                      <span className="font-bold">156</span> <span className="text-gray-400">Siguiendo</span>
                    </div>
                    <div className="text-white">
                      <span className="font-bold">2.3K</span> <span className="text-gray-400">Seguidores</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Proyectos Activos</p>
                      <p className="text-2xl font-bold text-white">8</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <Code className="w-5 h-5 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Clientes</p>
                      <p className="text-2xl font-bold text-white">42</p>
                    </div>
                    <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Rating</p>
                      <p className="text-2xl font-bold text-white">4.9</p>
                    </div>
                    <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                      <Star className="w-5 h-5 text-yellow-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activity Feed */}
            <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
              <CardHeader>
                <CardTitle className="text-lg text-white">Actividad Reciente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-3 pb-4 border-b border-gray-700/50">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-green-600 text-white text-sm font-bold">D</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-white">DaHub</span>
                      <span className="text-gray-400 text-sm">@dahub</span>
                      <span className="text-gray-400 text-sm">•</span>
                      <span className="text-gray-400 text-sm">2h</span>
                    </div>
                    <p className="text-white text-sm">
                      🎉 Acabamos de lanzar una nueva funcionalidad en Festival NATUR: 
                      mapas interactivos 3D con marcadores de empresas sostenibles. 
                      ¡La tecnología al servicio del turismo regenerativo!
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-gray-400 text-sm">
                      <button className="flex items-center space-x-1 hover:text-blue-400">
                        <MessageCircle className="w-4 h-4" />
                        <span>12</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-green-400">
                        <Repeat2 className="w-4 h-4" />
                        <span>4</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-red-400">
                        <Heart className="w-4 h-4" />
                        <span>28</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3 pb-4 border-b border-gray-700/50">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-green-600 text-white text-sm font-bold">D</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-white">DaHub</span>
                      <span className="text-gray-400 text-sm">@dahub</span>
                      <span className="text-gray-400 text-sm">•</span>
                      <span className="text-gray-400 text-sm">1d</span>
                    </div>
                    <p className="text-white text-sm">
                      💡 Trabajando en la integración de inteligencia artificial para 
                      recomendaciones personalizadas de experiencias turísticas sostenibles. 
                      El futuro del turismo es inteligente y consciente.
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-gray-400 text-sm">
                      <button className="flex items-center space-x-1 hover:text-blue-400">
                        <MessageCircle className="w-4 h-4" />
                        <span>8</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-green-400">
                        <Repeat2 className="w-4 h-4" />
                        <span>15</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-red-400">
                        <Heart className="w-4 h-4" />
                        <span>67</span>
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return <div>Sección no encontrada</div>;
    }
  };

  // Full-screen layout for map, regular layout for other sections
  if (activeSection === "mapa") {
    return (
      <div className="h-screen w-full relative overflow-hidden">
        {/* Full-screen map as background */}
        <InteractiveMap />
        
        {/* Top green bar for map page */}
        <header className="absolute top-0 left-0 right-0 bg-green-600 border-b border-green-700 shadow-lg px-6 py-4 z-40 backdrop-blur-md bg-green-600/95">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <span className="text-xl font-bold text-white tracking-wide">NATUR</span>
              </div>
            </div>
            
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/70" />
                <Input 
                  placeholder="Buscar experiencias, empresas, ubicaciones..." 
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60 backdrop-blur-md"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative text-white hover:bg-white/20">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="relative text-white hover:bg-white/20">
                <MessageCircle className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center">2</span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 p-2 text-white hover:bg-white/20">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">Usuario</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Ajustes
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        
        {/* Compact glassmorphism sidebar for map view */}
        <div className="absolute top-24 left-4 z-50 w-52 backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 rounded-xl shadow-2xl">
          <div className="p-3 border-b border-gray-600/30">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-600/80 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm">
                <span className="text-white font-bold text-xs">N</span>
              </div>
              <span className="text-lg font-bold text-white tracking-wide">NATUR</span>
            </div>
            <p className="text-gray-300 text-xs mt-1">Portal Empresas</p>
          </div>
          
          <nav className="p-2 space-y-0.5">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'admin') {
                      window.location.href = '/admin';
                    } else {
                      setActiveSection(item.id);
                    }
                  }}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    activeSection === item.id 
                      ? 'bg-green-600/30 text-white shadow-lg border border-green-400/30 backdrop-blur-sm' 
                      : 'text-gray-200 hover:bg-gray-700/30 hover:text-white hover:shadow-md'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium text-xs">{item.label}</span>
                </button>
              );
            })}
          </nav>
          
          {/* Compact user profile section */}
          <div className="p-2 border-t border-gray-600/30">
            <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-800/30 backdrop-blur-sm">
              <Avatar className="w-6 h-6 ring-1 ring-gray-600/50">
                <AvatarImage src="/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg" />
                <AvatarFallback className="bg-green-600/80 text-white text-xs">
                  {user?.firstName?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-xs truncate">
                  {user?.firstName && user?.lastName 
                    ? `${user.firstName} ${user.lastName}`
                    : user?.email || 'Usuario'
                  }
                </p>
                <p className="text-gray-300 text-xs">
                  {user?.role === 'empresa' ? 'Empresa' : 
                   user?.role === 'admin' ? 'Administrador' : 'Viajero'}
                </p>
              </div>
            </div>
          </div>
        </div>


      </div>
    );
  }

  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* Full-screen map as background for all pages */}
      <InteractiveMap />
      
      {/* Top green bar for all pages */}
      <header className="absolute top-0 left-0 right-0 bg-green-600 border-b border-green-700 shadow-lg px-6 py-4 z-40 backdrop-blur-md bg-green-600/95">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <span className="text-xl font-bold text-white tracking-wide">NATUR</span>
              </div>
            </div>
            
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/70" />
                <Input 
                  placeholder="Buscar experiencias, empresas, ubicaciones..." 
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60 backdrop-blur-md"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative text-white hover:bg-white/20">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="relative text-white hover:bg-white/20">
                <MessageCircle className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center">2</span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 p-2 text-white hover:bg-white/20">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">Usuario</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Ajustes
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

      {/* Compact glassmorphism sidebar for all pages */}
      <div className="absolute top-24 left-4 z-50 w-52 backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 rounded-xl shadow-2xl">
        <div className="p-3 border-b border-gray-600/30">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-green-600/80 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm">
              <span className="text-white font-bold text-xs">N</span>
            </div>
            <span className="text-lg font-bold text-white tracking-wide">NATUR</span>
          </div>
          <p className="text-gray-300 text-xs mt-1">Portal Empresas</p>
        </div>
        
        <nav className="p-2 space-y-0.5">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  activeSection === item.id 
                    ? 'bg-green-600/30 text-white shadow-lg border border-green-400/30 backdrop-blur-sm' 
                    : 'text-gray-200 hover:bg-gray-700/30 hover:text-white hover:shadow-md'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium text-xs">{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        {/* Usuario Viajero section */}
        <div className="p-2 border-t border-gray-600/30">
          <button
            onClick={() => setActiveSection("perfil")}
            className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg bg-green-600/20 border border-green-500/30 backdrop-blur-sm hover:bg-green-600/30 hover:border-green-400/40 transition-all duration-200"
          >
            <Avatar className="w-6 h-6 ring-1 ring-green-400/50">
              <AvatarFallback className="bg-green-600/80 text-white text-xs font-bold">
                {user?.email === 'dahub.tech@gmail.com' ? 'D' : 
                 user?.email === 'tripcol.tour@gmail.com' ? 'T' : 
                 'E'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-white font-medium text-xs truncate">
                {user?.email === 'dahub.tech@gmail.com' ? 'DaHub' : 
                 user?.email === 'tripcol.tour@gmail.com' ? 'TripCol' : 
                 user?.email === 'info@festivalnatur.com' ? 'Festival NATUR' :
                 user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.name || 'Usuario'}
              </p>
              <p className="text-green-300 text-xs font-medium">Tecnología</p>
            </div>
          </button>
        </div>
      </div>

      {/* Compact main content with glassmorphism background (except for map) */}
      {activeSection !== "mapa" && (
        <main className="absolute top-24 left-60 right-4 bottom-4 z-40 backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 rounded-xl shadow-2xl overflow-hidden">
          <div className="h-full overflow-y-auto p-4">
            {renderContent()}
          </div>
        </main>
      )}

      {/* Floating Action Button - Create Experience */}
      {activeSection !== "mapa" && (
        <Button
          onClick={() => setShowExperienceForm(true)}
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-2xl z-50"
          size="lg"
        >
          <Plus className="w-6 h-6" />
        </Button>
      )}

      {/* Experience Form Modal */}
      {showExperienceForm && (
        <ExperienceForm onClose={() => setShowExperienceForm(false)} />
      )}
    </div>
  );
};

export default PortalEmpresasDashboard;