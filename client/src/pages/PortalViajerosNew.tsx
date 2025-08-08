import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  Map, Heart, Star, MessageCircle, Settings, User, Calendar,
  Search, TreePine, Plane, Building2, MapPin, Globe, Hotel, 
  Utensils, Car, GraduationCap, Smartphone, Handshake, Leaf,
  Camera, Coffee, Waves, Mountain
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
import { DesktopSidebar } from "@/components/layout/DesktopSidebar";
import UserFlowManager from "@/components/userflow/UserFlowManager";
import AuthViajeros from "./AuthViajeros";

const PortalViajerosNew = () => {
  const [activeView, setActiveView] = useState("experiencias"); // Changed default to experiencias
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true); // Desktop sidebar state
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  // Enhanced category and subcategory icon mapping for traveler portal
  const getCategoryIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'agencias u operadores turísticos': return '🏢';
      case 'alojamientos sostenibles': return '🏨';
      case 'gastronomía sostenible': return '🍽️';
      case 'movilidad y transporte ecológico': return '🚗';
      case 'ong y fundaciones': return '❤️';
      case 'educación y sensibilización ambiental': return '🎓';
      case 'tecnología para el turismo sostenible': return '📱';
      case 'aliados y patrocinadores': return '🤝';
      default: return '🌱';
    }
  };

  const getSubcategoryIcon = (subcategory: string) => {
    const subcat = subcategory?.toLowerCase();
    if (subcat?.includes('ecoturismo')) return '🌿';
    if (subcat?.includes('aventura')) return '⛰️';
    if (subcat?.includes('cultural')) return '🏛️';
    if (subcat?.includes('gastronomico')) return '👨‍🍳';
    if (subcat?.includes('educativo')) return '📚';
    if (subcat?.includes('wellness')) return '🧘';
    if (subcat?.includes('fotografia')) return '📸';
    if (subcat?.includes('naturaleza')) return '🦋';
    if (subcat?.includes('playa')) return '🏖️';
    if (subcat?.includes('montaña')) return '🏔️';
    return '⭐';
  };

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

  // Current user data fetch with fallback to temporary auth
  const { data: currentUser, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ['/api/auth/me'],
    retry: (failureCount, error) => {
      console.log("🔍 Auth query error:", error);
      // Only retry once for 401s, might be a temporary session issue
      if (error?.message?.includes('401')) return failureCount < 1;
      return failureCount < 2;
    },
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        const response = await apiRequest('/api/auth/me');
        return response;
      } catch (error) {
        // Fallback: check for temporary auth in localStorage
        const tempAuth = localStorage.getItem('viajeros-auth-temp');
        if (tempAuth) {
          const authData = JSON.parse(tempAuth);
          const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
          
          if (authData.timestamp > fiveMinutesAgo) {
            console.log("🔄 Using temporary auth fallback");
            // Return minimal user data for temporary auth
            return { user: { id: authData.userId, email: "dahub.tech@gmail.com", role: "viajero" } };
          } else {
            localStorage.removeItem('viajeros-auth-temp');
          }
        }
        throw error;
      }
    }
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
    <div className="relative h-full w-full">
      {/* Full-screen map */}
      <div className="absolute inset-0">
        <InteractiveMap experiences={typedExperiences} />
      </div>

      {/* Mobile User Flow Manager - Top overlay */}
      <div className="absolute top-4 left-4 right-4 z-50 lg:hidden">
        <UserFlowManager />
      </div>

      {/* Desktop User Flow Manager - Top right */}
      <div className="absolute top-4 right-4 z-50 hidden lg:block">
        <UserFlowManager />
      </div>

      {/* Welcome overlay - Mobile positioned differently */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 max-w-sm w-full mx-4 lg:bottom-12 lg:right-12 lg:left-auto lg:transform-none lg:mx-0">
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
    <div className="relative h-full w-full">
      {/* Interactive Map for Experiences - Full size */}
      <div className="absolute inset-0">
        <InteractiveMap 
          experiences={typedExperiences}
        />
      </div>

      {/* Mobile Search Panel */}
      <div className="absolute top-4 left-2 right-2 z-10 lg:hidden">
        <Card className="mobile-card bg-black/60 backdrop-blur-sm border-white/20">
          <CardContent className="mobile-p-3">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                <Input
                  placeholder="Buscar experiencias..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mobile-input pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/50"
                />
              </div>
              <Button className="mobile-btn bg-green-600 hover:bg-green-700 text-white">
                <TreePine className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Desktop Search Panel - Top right */}
      <div className="absolute top-4 right-4 z-10 hidden lg:block">
        <Card className="bg-black/60 backdrop-blur-sm border-white/20 min-w-[320px]">
          <CardContent className="p-4">
            <div className="flex gap-3 mb-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                <Input
                  placeholder="Buscar experiencias..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/50"
                />
              </div>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Search className="w-4 h-4" />
              </Button>
            </div>
            <Button className="w-full bg-green-600/20 hover:bg-green-600/30 text-white border border-green-600/40">
              <TreePine className="w-4 h-4 mr-2" />
              Filtros Avanzados
            </Button>
          </CardContent>
        </Card>
      </div>


    </div>
  );

  const renderReservasView = () => (
    <div className="h-full w-full flex flex-col bg-gradient-to-br from-gray-900 via-black to-green-900 p-4 lg:p-8">
      <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8">Mis Reservas</h2>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md">
          <Calendar className="w-20 h-20 text-white/30 mx-auto mb-6" />
          <h3 className="text-xl font-light text-white mb-3">No tienes reservas aún</h3>
          <p className="text-white/60 mb-8">Explora experiencias increíbles y haz tu primera reserva</p>
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
            onClick={() => setActiveView('experiencias')}
          >
            Explorar Experiencias
          </Button>
        </div>
      </div>
    </div>
  );

  const renderFavoritosView = () => (
    <div className="h-full w-full flex flex-col bg-gradient-to-br from-gray-900 via-black to-green-900 p-4 lg:p-8">
      <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8">Experiencias Favoritas</h2>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md">
          <Heart className="w-20 h-20 text-white/30 mx-auto mb-6" />
          <h3 className="text-xl font-light text-white mb-3">No tienes favoritos aún</h3>
          <p className="text-white/60 mb-8">Marca experiencias como favoritas para encontrarlas fácilmente</p>
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
            onClick={() => setActiveView('experiencias')}
          >
            Explorar Experiencias
          </Button>
        </div>
      </div>
    </div>
  );

  const renderMessagesView = () => (
    <div className="h-full w-full bg-transparent">
      <WhatsAppChat />
    </div>
  );

  const renderProfileView = () => (
    <div className="h-full w-full bg-gradient-to-br from-gray-900 via-black to-green-900 p-4 lg:p-8 overflow-auto">
      <h2 className="text-2xl lg:text-3xl font-light text-white mb-6">Mi Perfil</h2>
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-4xl">
        <CardContent className="p-6">
          <TwitterProfileSection />
        </CardContent>
      </Card>
    </div>
  );

  const renderSettingsView = () => (
    <div className="h-full w-full bg-gradient-to-br from-gray-900 via-black to-green-900 p-4 lg:p-8 overflow-auto">
      <h2 className="text-2xl lg:text-3xl font-light text-white mb-6">Configuración</h2>
      
      {/* Portal Navigation */}
      <div className="space-y-6 max-w-2xl">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <div className="w-2 h-6 bg-green-500 rounded-full mr-3"></div>
            Navegación entre Portales
          </h3>
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full border-blue-500/50 text-blue-400 hover:bg-blue-500/10 h-12 flex items-center justify-center"
              onClick={() => setLocation('/portal-empresas')}
            >
              <Building2 className="w-5 h-5 mr-2" />
              Cambiar a Portal Empresas
            </Button>
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 text-white h-12 flex items-center justify-center"
              onClick={() => setLocation('/portal-viajeros')}
            >
              <MapPin className="w-5 h-5 mr-2" />
              Portal Viajeros (Actual)
            </Button>
          </div>
          <p className="text-xs text-white/50 mt-3">
            Usa el mismo usuario para acceder a ambos portales y ver diferentes perspectivas
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-white font-semibold mb-3">Preferencias de Viaje</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/70 text-sm">Tipo de experiencias</label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    <Badge className="bg-green-500/20 text-green-400">Ecoturismo</Badge>
                    <Badge className="bg-blue-500/20 text-blue-400">Aventura</Badge>
                    <Badge className="bg-purple-500/20 text-purple-400">Cultural</Badge>
                  </div>
                </div>
                <div>
                  <label className="text-white/70 text-sm">Presupuesto</label>
                  <div className="mt-1 text-white">$50,000 - $200,000 COP</div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/20 pt-4">
              <h3 className="text-white font-semibold mb-3">Notificaciones</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Nuevas experiencias</span>
                  <div className="w-10 h-6 bg-green-600 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Mensajes</span>
                  <div className="w-10 h-6 bg-green-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
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
      default: return renderExperienciasView(); // Changed default to experiencias for travelers
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
      {/* Mobile only HeaderButtons */}
      <div className="lg:hidden">
        <HeaderButtons 
          showPortalButtons={false} 
          showPortalEmpresasNav={true}
          navItems={navItems}
          activeView={activeView}
          onNavigation={handleNavigation}
        />
      </div>
      
      {/* Desktop Sidebar with HeaderButtons integrated */}
      <DesktopSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        activeView={activeView}
        onNavigation={handleNavigation}
        navItems={navItems}
        portalType="viajeros"
        showHeaderButtons={true}
      />

      {/* Full-screen Main Content */}
      <div className={`fixed inset-0 ${sidebarOpen ? 'lg:pl-[200px]' : 'lg:pl-[60px]'} transition-all duration-300`}>
        <main className="h-full w-full">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full w-full"
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default PortalViajerosNew;