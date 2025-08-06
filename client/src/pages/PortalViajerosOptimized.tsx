import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  Map, Heart, MessageCircle, User, Search, Star, MapPin, 
  Calendar, Clock, Users, DollarSign, Filter, LogOut, Settings,
  Plane, Camera, BookOpen, TreePine, Waves, Mountain, Utensils
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InteractiveMap } from "@/components/dashboard/InteractiveMap";
import { WhatsAppChat } from "@/components/messaging/WhatsAppChat";
import { HeaderButtons } from "@/components/layout/HeaderButtons";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";

const PortalViajerosOptimized = () => {
  const [activeView, setActiveView] = useState("mapa");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [, setLocation] = useLocation();

  // Current user data fetch
  const { data: currentUser, isLoading: userLoading } = useQuery({
    queryKey: ['/api/auth/me'],
    retry: 3,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const user = (currentUser as any)?.user || currentUser;

  // Public experiences fetch for travelers
  const { data: experiences = [], isLoading: experiencesLoading } = useQuery({
    queryKey: ["/api/experiences/public"],
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const navItems = [
    { id: "mapa", label: "Mapa", icon: Map },
    { id: "experiencias", label: "Experiencias", icon: Star },
    { id: "reservas", label: "Mis Reservas", icon: Calendar },
    { id: "mensajes", label: "Mensajes", icon: MessageCircle },
    { id: "perfil", label: "Perfil", icon: User }
  ];

  const categories = [
    { id: "todos", label: "Todos", icon: TreePine },
    { id: "ecoturismo", label: "Ecoturismo", icon: Mountain },
    { id: "gastronomia", label: "Gastronomía", icon: Utensils },
    { id: "cultura", label: "Cultural", icon: BookOpen },
    { id: "aventura", label: "Aventura", icon: Waves }
  ];

  const handleNavigation = (viewId: string) => {
    setActiveView(viewId);
  };

  const renderMapView = () => (
    <div className="absolute inset-0">
      <InteractiveMap />
    </div>
  );

  const renderExperiencesView = () => (
    <div className="p-4 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-bold text-white">Experiencias Disponibles</h2>
        <p className="text-white/70">Descubre experiencias únicas de turismo sostenible</p>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
              <Input
                placeholder="Buscar experiencias..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/50 h-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`whitespace-nowrap ${
                    selectedCategory === category.id
                      ? "bg-green-600 text-white"
                      : "bg-white/10 border-white/30 text-white hover:bg-white/20"
                  }`}
                >
                  <category.icon className="w-4 h-4 mr-2" />
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Experiences Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiencesLoading ? (
          Array(6).fill(0).map((_, i) => (
            <Card key={i} className="bg-white/10 backdrop-blur-sm border-white/20 animate-pulse">
              <CardContent className="p-6">
                <div className="h-32 bg-white/10 rounded-lg mb-4"></div>
                <div className="h-4 bg-white/10 rounded mb-2"></div>
                <div className="h-3 bg-white/10 rounded mb-4"></div>
                <div className="flex justify-between">
                  <div className="h-8 bg-white/10 rounded w-20"></div>
                  <div className="h-8 bg-white/10 rounded w-16"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          experiences
            .filter((exp: any) => 
              !searchQuery || 
              exp.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              exp.description?.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((experience: any, index: number) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <CardContent className="p-6">
                    {/* Experience Image Placeholder */}
                    <div className="relative mb-4">
                      <div className="w-full h-32 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <Camera className="w-8 h-8 text-white/60" />
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-green-500/80 text-white border-0">
                          {experience.status === 'aprobado' ? 'Disponible' : experience.status}
                        </Badge>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-2 left-2 bg-black/20 hover:bg-black/40 text-white"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Experience Info */}
                    <div className="space-y-3">
                      <h3 className="font-bold text-white text-lg line-clamp-2">
                        {experience.title || 'Experiencia sin título'}
                      </h3>
                      
                      <p className="text-white/80 text-sm line-clamp-2">
                        {experience.description || 'Descripción no disponible'}
                      </p>

                      <div className="flex items-center gap-4 text-white/60 text-sm">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {experience.duration || 'N/A'}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {experience.minimumPeople || '1+'} personas
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {experience.meetingPoint || 'Por definir'}
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-white/20">
                        <div className="text-left">
                          <p className="text-xs text-white/60">Desde</p>
                          <p className="text-xl font-bold text-white">
                            ${experience.adultPricePvp || experience.adultPriceNet || 'N/A'}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/30 text-white hover:bg-white/20"
                            onClick={() => setLocation(`/experiencia/${experience.id}`)}
                          >
                            Ver más
                          </Button>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Reservar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
        )}
      </div>

      {experiences.length === 0 && !experiencesLoading && (
        <div className="text-center py-16">
          <Star className="w-20 h-20 text-white/30 mx-auto mb-6" />
          <h3 className="text-lg font-light text-white mb-3">No hay experiencias disponibles</h3>
          <p className="text-white/60 px-4">Las empresas están creando nuevas experiencias. ¡Vuelve pronto!</p>
        </div>
      )}
    </div>
  );

  const renderReservationsView = () => (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-white">Mis Reservas</h2>
      <div className="text-center py-16">
        <Calendar className="w-20 h-20 text-white/30 mx-auto mb-6" />
        <h3 className="text-lg font-light text-white mb-3">No tienes reservas aún</h3>
        <p className="text-white/60 mb-8 px-4">Explora experiencias increíbles y haz tu primera reserva</p>
        <Button 
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={() => setActiveView('experiencias')}
        >
          Explorar Experiencias
        </Button>
      </div>
    </div>
  );

  const renderMessagesView = () => (
    <div className="h-full bg-transparent">
      <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)]">
        <WhatsAppChat />
      </div>
    </div>
  );

  const renderProfileView = () => (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="relative inline-block">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user?.profilePicture} />
            <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white text-2xl">
              {user?.firstName?.substring(0, 1) || 'V'}{user?.lastName?.substring(0, 1) || 'I'}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white/20 flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="text-white/70">Viajero Consciente</p>
        </div>
        <Button 
          onClick={() => setLocation('/perfil')}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          Editar Perfil
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-white">0</div>
            <div className="text-white/60 text-sm">Reservas</div>
          </CardContent>
        </Card>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-white">0</div>
            <div className="text-white/60 text-sm">Favoritos</div>
          </CardContent>
        </Card>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-white">5★</div>
            <div className="text-white/60 text-sm">Rating</div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Info */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Información Personal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-white/60 mb-1">Email</p>
            <p className="text-white">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm text-white/60 mb-1">Tipo de Usuario</p>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              Viajero Consciente
            </Badge>
          </div>
          <div>
            <p className="text-sm text-white/60 mb-1">Miembro desde</p>
            <p className="text-white">{new Date(user?.createdAt || Date.now()).toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeView) {
      case "mapa":
        return renderMapView();
      case "experiencias":
        return renderExperiencesView();
      case "reservas":
        return renderReservationsView();
      case "mensajes":
        return renderMessagesView();
      case "perfil":
        return renderProfileView();
      default:
        return renderMapView();
    }
  };

  const handleLogout = () => {
    // Clear session and redirect
    fetch('/api/auth/logout', { method: 'POST' })
      .then(() => {
        window.location.href = '/';
      })
      .catch(() => {
        window.location.href = '/';
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-slate-900 to-blue-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5" />
      </div>

      {/* Header */}
      <header className="relative z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left Side - Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <TreePine className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">Portal Viajeros</h1>
              <p className="text-white/60 text-xs">Festival NATUR</p>
            </div>
          </div>

          {/* Right Side - User Menu */}
          <div className="flex items-center space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.profilePicture} />
                    <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white">
                      {user?.firstName?.substring(0, 1) || 'V'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-black/90 backdrop-blur-sm border-white/20" align="end">
                <DropdownMenuItem className="text-white hover:bg-white/10">
                  <User className="mr-2 h-4 w-4" />
                  Mi Perfil
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-white/10">
                  <Settings className="mr-2 h-4 w-4" />
                  Configuración
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/20" />
                <DropdownMenuItem 
                  className="text-white hover:bg-white/10"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pb-20 md:pb-0">
        {renderContent()}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-sm border-t border-white/20 md:hidden">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all ${
                activeView === item.id
                  ? "text-green-400 bg-green-600/20"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default PortalViajerosOptimized;