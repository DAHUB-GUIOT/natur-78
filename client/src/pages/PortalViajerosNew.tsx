import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  Map, Heart, Star, MessageCircle, Settings, User, Calendar,
  Search, TreePine, Plane
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InteractiveMap } from "@/components/dashboard/InteractiveMap";
import { WhatsAppChat } from "@/components/messaging/WhatsAppChat";
import TwitterProfileSection from "@/components/profile/TwitterProfileSection";
import { HeaderButtons } from "@/components/layout/HeaderButtons";
import UserFlowManager from "@/components/userflow/UserFlowManager";
import AuthViajeros from "./AuthViajeros";

const PortalViajerosNew = () => {
  const [activeView, setActiveView] = useState("experiencias"); // Changed default to experiencias
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  // Navigation items for traveler portal
  const navItems = [
    { id: "map", label: "Inicio", icon: Map },
    { id: "experiencias", label: "Experiencias", icon: Star },
    { id: "reservas", label: "Mis Reservas", icon: Calendar },
    { id: "favoritos", label: "Favoritos", icon: Heart },
    { id: "messages", label: "Mensajes", icon: MessageCircle },
    { id: "profile", label: "Mi Perfil", icon: User },
    { id: "settings", label: "Configuración", icon: Settings }
  ];

  const handleNavigation = (viewId: string) => {
    setActiveView(viewId);
  };

  // Create or get conversation mutation
  const createConversationMutation = useMutation({
    mutationFn: async (receiverId: number) => {
      return apiRequest('/api/conversations', {
        method: 'POST',
        body: JSON.stringify({ receiverId }),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: (conversation, receiverId) => {
      queryClient.invalidateQueries({ queryKey: ['/api/conversations'] });
      setActiveView('messages');
    }
  });

  const handleViewProfile = (userId: number) => {
    setLocation(`/profile/${userId}`);
  };

  const handleSendMessage = (userId: number) => {
    createConversationMutation.mutate(userId);
  };

  // Current user data fetch
  const { data: currentUser, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ['/api/auth/me'],
    retry: 1,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const user = (currentUser as any)?.user || currentUser;

  // Public experiences fetch for travelers - optimized with React.useMemo
  const { data: experiences = [], isLoading: experiencesLoading } = useQuery({
    queryKey: ["/api/experiences/public"],
    staleTime: 5 * 60 * 1000, // Increased cache time
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const typedExperiences = Array.isArray(experiences) ? experiences : [];

  // Companies directory for messaging
  const { data: directoryUsers = [], isLoading: directoryLoading } = useQuery({
    queryKey: ["/api/directory/users"],
    queryFn: () => fetch("/api/directory/users", { credentials: 'include' }).then(res => {
      if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);
      return res.json();
    }),
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const typedDirectoryUsers = Array.isArray(directoryUsers) 
    ? directoryUsers.filter((user: any) => user.role === 'empresa') 
    : [];

  const handleLogout = () => {
    window.location.href = '/api/auth/logout';
  };

  const renderMapView = () => (
    <div className="relative h-screen">
      {/* Full-screen map */}
      <div className="absolute inset-0">
        <InteractiveMap experiences={typedExperiences} />
      </div>

      {/* User Flow Manager - Top overlay */}
      <div className="absolute top-4 left-4 right-4 z-50">
        <UserFlowManager />
      </div>

      {/* Welcome overlay */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 max-w-sm w-full mx-4">
        <Card className="bg-black/80 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 text-center">
            <TreePine className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <h3 className="text-white font-bold mb-2">¡Bienvenido Viajero!</h3>
            <p className="text-white/70 text-sm mb-4">
              Descubre experiencias únicas de turismo sostenible
            </p>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={() => setActiveView('experiencias')}
              >
                Explorar
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1 border-white/30 text-white hover:bg-white/10"
                onClick={() => setActiveView('profile')}
              >
                Mi Perfil
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderExperienciasView = () => (
    <div className="relative h-screen">
      {/* Interactive Map for Experiences */}
      <div className="absolute inset-0">
        <InteractiveMap 
          directoryUsers={typedDirectoryUsers}
          onUserSelect={handleViewProfile}
          onSendMessage={handleSendMessage}
          isMessagingActive={createConversationMutation.isPending}
          showExperiences={true}
          mapTitle="Mapa de Experiencias"
          mapSubtitle="Explora experiencias sostenibles en toda Colombia"
        />
      </div>

      {/* Floating Search Panel */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <Card className="bg-black/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                <Input
                  placeholder="Buscar experiencias por ubicación, tipo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/50 h-10"
                />
              </div>
              <Button className="bg-green-600 hover:bg-green-700 text-white px-6">
                <TreePine className="w-4 h-4 mr-2" />
                Filtrar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Experiences List Below Map - Hidden on Mobile */}
      <div className="absolute bottom-4 left-4 right-4 z-10 hidden md:block">
        <Card className="bg-black/60 backdrop-blur-sm border-white/20 max-h-60 overflow-y-auto">
          <CardContent className="p-4">
            <h3 className="text-white font-semibold mb-3">Experiencias Destacadas</h3>
            <div className="space-y-2">
              {typedDirectoryUsers.slice(0, 3).map((experience: any) => (
                <div key={experience.id} className="flex items-center space-x-3 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">{experience.companyName || 'Experiencia Sostenible'}</p>
                    <p className="text-white/60 text-xs truncate">{experience.city || 'Bogotá, Colombia'}</p>
                  </div>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs">
                    Ver
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderReservasView = () => (
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

  const renderFavoritosView = () => (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-white">Experiencias Favoritas</h2>
      <div className="text-center py-16">
        <Heart className="w-20 h-20 text-white/30 mx-auto mb-6" />
        <h3 className="text-lg font-light text-white mb-3">No tienes favoritos aún</h3>
        <p className="text-white/60 mb-8 px-4">Marca experiencias como favoritas para encontrarlas fácilmente</p>
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
      {/* Profile Header */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user?.profilePicture} />
                <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white text-2xl">
                  {user?.firstName?.substring(0, 1) || 'V'}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white/20 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-white mb-2">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-white/70 mb-3">{user?.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  ✓ Viajero Verificado
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  🌍 Eco-Friendly
                </Badge>
              </div>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Editar Perfil
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Travel Preferences */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <h3 className="font-semibold text-white mb-6 flex items-center">
            <div className="w-2 h-6 bg-green-500 rounded-full mr-3"></div>
            Preferencias de Viaje
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-white/60 mb-1">Tipos de Experiencia Favoritos</p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Naturaleza</Badge>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Aventura</Badge>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Cultural</Badge>
              </div>
            </div>
            <div>
              <p className="text-sm text-white/60 mb-1">Presupuesto Promedio</p>
              <p className="text-white">$50,000 - $150,000 COP</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">0</div>
            <div className="text-xs text-white/60">Experiencias</div>
          </CardContent>
        </Card>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">0</div>
            <div className="text-xs text-white/60">Reservas</div>
          </CardContent>
        </Card>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">0</div>
            <div className="text-xs text-white/60">Favoritos</div>
          </CardContent>
        </Card>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">5.0</div>
            <div className="text-xs text-white/60">Rating</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSettingsView = () => (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-light text-white mb-4">Configuración</h2>
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <TwitterProfileSection />
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeView) {
      case "map": return renderMapView();
      case "experiencias": return renderExperienciasView();
      case "reservas": return renderReservasView();
      case "favoritos": return renderFavoritosView();
      case "messages": return renderMessagesView();
      case "profile": return renderProfileView();
      case "settings": return renderSettingsView();
      default: return renderMapView();
    }
  };

  // If user is not authenticated, show login page
  if (userError || (!userLoading && !user)) {
    return <AuthViajeros />;
  }

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900">
      <HeaderButtons 
        showPortalButtons={false} 
        showPortalEmpresasNav={true}
        navItems={navItems}
        activeView={activeView}
        onNavigation={handleNavigation}
      />
      
      {/* Main Content - Mobile First */}
      <div className="relative">
        <main className={(activeView === 'map' || activeView === 'experiencias') ? 'h-screen' : 'min-h-screen pt-16'}>
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={(activeView === 'map' || activeView === 'experiencias') ? 'h-full' : 'min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900'}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>

      {/* Mobile navigation handled by HeaderButtons */}
    </div>
  );
};

export default PortalViajerosNew;