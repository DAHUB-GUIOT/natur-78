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
              <h2 className="text-2xl font-bold text-gray-900">Mis Experiencias</h2>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Crear Experiencia
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experiences.map((experience) => (
                <Card key={experience.id} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative">
                    <img 
                      src={experience.image} 
                      alt={experience.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 space-y-2">
                      <Button size="sm" variant="secondary" className="w-8 h-8 p-0 bg-white/80 backdrop-blur-sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="w-8 h-8 p-0 bg-white/80 backdrop-blur-sm">
                        <Share className="w-4 h-4" />
                      </Button>
                    </div>
                    <Badge className="absolute top-4 left-4 bg-white/90 text-gray-900">
                      {experience.category}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">{experience.title}</h3>
                        <p className="text-gray-600 text-sm">{experience.subtitle}</p>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        {experience.location}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={experience.hostAvatar} />
                            <AvatarFallback>{experience.host[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-600">{experience.host}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{experience.rating}</span>
                          <span className="text-sm text-gray-500">({experience.reviews})</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          {experience.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            ${experience.price.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600">por persona</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" className="flex-1">Ver más</Button>
                        <Button size="sm" variant="outline">
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
              <h2 className="text-2xl font-bold text-gray-900">Directorio de Empresas</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company) => (
                <Card key={company.id} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={company.image} />
                        <AvatarFallback>{company.name[0]}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900 truncate">{company.name}</h3>
                          {company.verified && (
                            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                              Verificado
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">{company.category}</p>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <MapPin className="w-4 h-4 mr-1" />
                          {company.location}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{company.rating}</span>
                            <span className="text-sm text-gray-500">({company.reviews})</span>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">Ver perfil</Button>
                            <Button size="sm">Chatear</Button>
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
            <h2 className="text-2xl font-bold text-gray-900">Mensajes</h2>
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="bg-gray-100 rounded-lg flex items-center justify-center h-96">
                  <div className="text-center text-gray-600">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg font-medium">Sistema de Mensajería</p>
                    <p className="text-sm">Chat estilo WhatsApp/Telegram se implementará aquí</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "estadisticas":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Estadísticas</h2>
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="bg-gray-100 rounded-lg flex items-center justify-center h-96">
                  <div className="text-center text-gray-600">
                    <BarChart3 className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg font-medium">Panel de Estadísticas</p>
                    <p className="text-sm">Gráficos y métricas detalladas se mostrarán aquí</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "ajustes":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Ajustes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Perfil</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <User className="w-4 h-4 mr-2" />
                      Editar perfil
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="w-4 h-4 mr-2" />
                      Cambiar contraseña
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Configuración</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Métodos de pago
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
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
      <div className="h-screen w-full relative">
        {/* Full-screen map */}
        <InteractiveMap />
        
        {/* Floating glassmorphism sidebar for map view */}
        <div className="absolute top-4 left-4 z-50 backdrop-blur-md bg-white/10 border border-white/20 rounded-lg shadow-lg">
          <div className="p-4 border-b border-white/20 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">N</span>
              </div>
              <span className="text-lg font-bold text-white">NATUR</span>
            </div>
          </div>
          
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    activeSection === item.id 
                      ? 'bg-white/30 text-white' 
                      : 'text-white/80 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-green-600 border-b border-green-700 shadow-lg px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold text-white">NATUR</span>
            </div>
          </div>
          
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/70" />
              <Input 
                placeholder="Buscar experiencias, empresas, ubicaciones..." 
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60"
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

      <div className="flex">
        {/* Sidebar */}
        <aside className={`bg-white border-r border-gray-200 transition-all duration-300 ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        }`}>
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    activeSection === item.id 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {!sidebarCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </button>
              );
            })}
          </nav>
          
          <div className="absolute bottom-4 left-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>

      {/* Floating Action Button - Create Experience */}
      {activeSection !== "mapa" && (
        <Button
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
          size="lg"
        >
          <Plus className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
};

export default PortalEmpresasDashboard;