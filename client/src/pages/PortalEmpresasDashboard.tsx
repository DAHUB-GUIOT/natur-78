import React, { useState } from "react";
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
  Edit
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

const PortalEmpresasDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("mapa");

  const sidebarItems = [
    { id: "mapa", label: "Mapa", icon: Map },
    { id: "empresas", label: "Empresas", icon: Building2 },
    { id: "experiencias", label: "Experiencias", icon: Star },
    { id: "mensajes", label: "Mensajes", icon: MessageCircle },
    { id: "estadisticas", label: "Estadísticas", icon: BarChart3 },
    { id: "ajustes", label: "Ajustes", icon: Settings },
  ];

  const experiences = [
    {
      id: 1,
      title: "Tour de Café Sostenible",
      subtitle: "Descubre el proceso del café de la montaña",
      image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg",
      location: "Eje Cafetero, Colombia",
      category: "Gastronomía",
      price: 85000,
      date: "2025-02-15",
      time: "09:00",
      duration: "4 horas",
      language: "Español/Inglés",
      capacity: 12,
      rating: 4.8,
      reviews: 127,
      host: "Finca El Paraíso",
      hostAvatar: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg",
      tags: ["Ecológica", "Educativa"],
      isAccessible: true,
      isPetFriendly: false,
      isEcoFriendly: true
    },
    {
      id: 2,
      title: "Caminata Nocturna en la Selva",
      subtitle: "Aventura única para descubrir la vida nocturna",
      image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg",
      location: "Amazonas, Colombia",
      category: "Aventura",
      price: 120000,
      date: "2025-02-20",
      time: "18:00",
      duration: "3 horas",
      language: "Español",
      capacity: 8,
      rating: 4.9,
      reviews: 89,
      host: "EcoGuías Amazonas",
      hostAvatar: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg",
      tags: ["Aventura", "Nocturna"],
      isAccessible: false,
      isPetFriendly: false,
      isEcoFriendly: true
    }
  ];

  const companies = [
    {
      id: 1,
      name: "EcoTours Colombia",
      category: "Operador Turístico",
      location: "Bogotá, Colombia",
      rating: 4.7,
      reviews: 234,
      image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg",
      verified: true
    },
    {
      id: 2,
      name: "Café de la Montaña",
      category: "Gastronomía",
      location: "Manizales, Colombia",
      rating: 4.9,
      reviews: 156,
      image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg",
      verified: true
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "inicio":
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Experiencias Activas</p>
                      <p className="text-3xl font-bold text-gray-900">12</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Star className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Reservas del Mes</p>
                      <p className="text-3xl font-bold text-gray-900">89</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Ingresos</p>
                      <p className="text-3xl font-bold text-gray-900">$2.4M</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Clientes Nuevos</p>
                      <p className="text-3xl font-bold text-gray-900">24</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Actividad Reciente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Nueva reserva para "Tour de Café Sostenible"</p>
                      <p className="text-sm text-gray-600">Hace 2 horas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Nuevo mensaje de EcoTours Colombia</p>
                      <p className="text-sm text-gray-600">Hace 1 día</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "experiencias":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Mis Experiencias</h2>
              <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Crear Experiencia
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experiences.map((experience) => (
                <Card key={experience.id} className="backdrop-blur-xl bg-white/10 border border-white/30 hover:bg-white/20 transition-all duration-200 overflow-hidden">
                  <div className="relative">
                    <img 
                      src={experience.image} 
                      alt={experience.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 space-y-2">
                      <Button size="sm" variant="secondary" className="w-8 h-8 p-0 bg-white/20 backdrop-blur-md text-white hover:bg-white/30">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="w-8 h-8 p-0 bg-white/20 backdrop-blur-md text-white hover:bg-white/30">
                        <Share className="w-4 h-4" />
                      </Button>
                    </div>
                    <Badge className="absolute top-4 left-4 bg-green-600 text-white">
                      {experience.category}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg text-white mb-1">{experience.title}</h3>
                        <p className="text-white/80 text-sm">{experience.subtitle}</p>
                      </div>
                      
                      <div className="flex items-center text-sm text-white/80">
                        <MapPin className="w-4 h-4 mr-1" />
                        {experience.location}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={experience.hostAvatar} />
                            <AvatarFallback className="bg-green-500 text-white">{experience.host[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-white/80">{experience.host}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-white">{experience.rating}</span>
                          <span className="text-sm text-white/70">({experience.reviews})</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          {experience.tags.map((tag) => (
                            <Badge key={tag} className="bg-white/20 text-white text-xs backdrop-blur-md">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-white">
                            ${experience.price.toLocaleString()}
                          </p>
                          <p className="text-sm text-white/70">por persona</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-white">Ver más</Button>
                        <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/20">
                          <Edit className="w-4 h-4" />
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
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Directorio de Empresas</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/20">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company) => (
                <Card key={company.id} className="backdrop-blur-xl bg-white/10 border border-white/30 hover:bg-white/20 transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-16 h-16 ring-2 ring-white/30">
                        <AvatarImage src={company.image} />
                        <AvatarFallback className="bg-green-500 text-white">{company.name[0]}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-white truncate">{company.name}</h3>
                          {company.verified && (
                            <Badge className="text-xs bg-green-600 text-white">
                              Verificado
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-white/80 mb-2">{company.category}</p>
                        
                        <div className="flex items-center text-sm text-white/80 mb-3">
                          <MapPin className="w-4 h-4 mr-1" />
                          {company.location}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-white">{company.rating}</span>
                            <span className="text-sm text-white/70">({company.reviews})</span>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/20">Ver perfil</Button>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">Chatear</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "mapa":
        return <InteractiveMap />;

      case "mensajes":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Mensajes</h2>
            <Card className="backdrop-blur-xl bg-white/10 border border-white/30">
              <CardContent className="p-6">
                <div className="bg-white/5 rounded-lg flex items-center justify-center h-96">
                  <div className="text-center text-white">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg font-medium">Sistema de Mensajería</p>
                    <p className="text-sm text-white/80">Chat estilo WhatsApp/Telegram se implementará aquí</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "estadisticas":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Estadísticas</h2>
            <Card className="backdrop-blur-xl bg-white/10 border border-white/30">
              <CardContent className="p-6">
                <div className="bg-white/5 rounded-lg flex items-center justify-center h-96">
                  <div className="text-center text-white">
                    <BarChart3 className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg font-medium">Panel de Estadísticas</p>
                    <p className="text-sm text-white/80">Gráficos y métricas detalladas se mostrarán aquí</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "ajustes":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Ajustes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="backdrop-blur-xl bg-white/10 border border-white/30">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white">Perfil</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start border-white/30 text-white hover:bg-white/20">
                      <User className="w-4 h-4 mr-2" />
                      Editar perfil
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-white/30 text-white hover:bg-white/20">
                      <Settings className="w-4 h-4 mr-2" />
                      Cambiar contraseña
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-xl bg-white/10 border border-white/30">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white">Configuración</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start border-white/30 text-white hover:bg-white/20">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Métodos de pago
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-white/30 text-white hover:bg-white/20">
                      <Bell className="w-4 h-4 mr-2" />
                      Notificaciones
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
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
        
        {/* Floating glassmorphism sidebar for map view - optimized */}
        <div className="absolute top-6 left-6 z-50 w-64 backdrop-blur-xl bg-black/20 border border-white/30 rounded-2xl shadow-2xl">
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold text-white tracking-wide">NATUR</span>
            </div>
            <p className="text-white/70 text-sm mt-2">Portal Empresas</p>
          </div>
          
          <nav className="p-4 space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeSection === item.id 
                      ? 'bg-gradient-to-r from-green-500/30 to-green-400/30 text-white shadow-lg border border-green-400/30' 
                      : 'text-white/90 hover:bg-white/10 hover:text-white hover:shadow-md'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold text-sm">{item.label}</span>
                </button>
              );
            })}
          </nav>
          
          {/* User profile section */}
          <div className="p-4 border-t border-white/20">
            <div className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-white/5">
              <Avatar className="w-8 h-8 ring-2 ring-white/30">
                <AvatarImage src="/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg" />
                <AvatarFallback className="bg-green-500 text-white">U</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">Usuario</p>
                <p className="text-white/70 text-xs">Empresa</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top notification bar */}
        <div className="absolute top-6 right-6 z-50 flex space-x-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="backdrop-blur-xl bg-black/20 border border-white/30 text-white hover:bg-white/20 rounded-xl px-4 py-2"
          >
            <Bell className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">3</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="backdrop-blur-xl bg-black/20 border border-white/30 text-white hover:bg-white/20 rounded-xl px-4 py-2"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">2</span>
          </Button>
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

      {/* Floating glassmorphism sidebar for all pages */}
      <div className="absolute top-24 left-6 z-50 w-64 backdrop-blur-xl bg-black/20 border border-white/30 rounded-2xl shadow-2xl">
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-xl font-bold text-white tracking-wide">NATUR</span>
          </div>
          <p className="text-white/70 text-sm mt-2">Portal Empresas</p>
        </div>
        
        <nav className="p-4 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeSection === item.id 
                    ? 'bg-gradient-to-r from-green-500/30 to-green-400/30 text-white shadow-lg border border-green-400/30' 
                    : 'text-white/90 hover:bg-white/10 hover:text-white hover:shadow-md'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-semibold text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        {/* User profile section */}
        <div className="p-4 border-t border-white/20">
          <div className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-white/5">
            <Avatar className="w-8 h-8 ring-2 ring-white/30">
              <AvatarImage src="/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg" />
              <AvatarFallback className="bg-green-500 text-white">U</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">Usuario</p>
              <p className="text-white/70 text-xs">Empresa</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with glassmorphism background (except for map) */}
      {activeSection !== "mapa" && (
        <main className="absolute top-24 left-80 right-6 bottom-6 z-40 backdrop-blur-xl bg-black/20 border border-white/30 rounded-2xl shadow-2xl overflow-hidden">
          <div className="h-full overflow-y-auto p-8">
            {renderContent()}
          </div>
        </main>
      )}

      {/* Floating Action Button - Create Experience */}
      {activeSection !== "mapa" && (
        <Button
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-2xl z-50"
          size="lg"
        >
          <Plus className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
};

export default PortalEmpresasDashboard;