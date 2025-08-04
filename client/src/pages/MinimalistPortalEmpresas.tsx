import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Map, Building2, Star, MessageCircle, Settings, User, Plus,
  Menu, X, Search, Filter, Grid, List, MapPin, Eye, TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { InteractiveMap } from "@/components/dashboard/InteractiveMap";
import { WhatsAppChat } from "@/components/messaging/WhatsAppChat";
import TwitterProfileSection from "@/components/profile/TwitterProfileSection";
import { HeaderButtons } from "@/components/layout/HeaderButtons";

const MinimalistPortalEmpresas = () => {
  const [activeView, setActiveView] = useState("map");
  // Mobile menu removed - now handled by HeaderButtons
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Current user data fetch
  const { data: currentUser, isLoading: userLoading } = useQuery({
    queryKey: ['/api/auth/me'],
    retry: 3,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const user = (currentUser as any)?.user || currentUser;

  // Directory users fetch
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

  const navItems = [
    { id: "map", label: "Mapa", icon: Map },
    { id: "network", label: "Red", icon: Building2 },
    { id: "experiences", label: "Experiencias", icon: Star },
    { id: "messages", label: "Mensajes", icon: MessageCircle },
    { id: "profile", label: "Perfil", icon: User },
    { id: "settings", label: "Ajustes", icon: Settings }
  ];

  const handleNavigation = (viewId: string) => {
    setActiveView(viewId);
  };

  // Mobile navigation removed - now handled by HeaderButtons component

  // Sidebar removed - navigation now in HeaderButtons

  const renderMapView = () => (
    <div className="absolute inset-0">
      <InteractiveMap />
    </div>
  );

  const renderNetworkView = () => (
    <div className="p-4 space-y-4">
      {/* Mobile-First Header */}
      <div className="mb-6">
        <h2 className="text-xl font-light text-white mb-4">Red Empresarial</h2>
        
        {/* Mobile-First Search and Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
            <Input
              placeholder="Buscar empresas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/40 h-12"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="w-full border-white/30 text-white hover:bg-white/10 h-12"
          >
            {viewMode === 'grid' ? (
              <>
                <List className="w-4 h-4 mr-2" />
                Vista Lista
              </>
            ) : (
              <>
                <Grid className="w-4 h-4 mr-2" />
                Vista Tarjetas
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile-First Cards */}
      <div className={`space-y-4 ${viewMode === 'grid' ? 'lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-4 lg:space-y-0' : ''}`}>
        {typedDirectoryUsers
          .filter((company: any) => 
            !searchQuery || 
            company.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            company.category?.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((company: any, index: number) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white mb-1 truncate">
                          {company.companyName || `${company.firstName} ${company.lastName}`}
                        </h3>
                        <p className="text-sm text-white/60 mb-2 line-clamp-2">{company.category}</p>
                      </div>
                      <Badge variant="secondary" className="bg-white/10 text-white/80 text-xs ml-2 shrink-0">
                        {company.location || 'Bogotá'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 text-xs text-white/60">
                        <Eye className="w-4 h-4" />
                        <span>Ver perfil</span>
                      </div>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white px-4">
                        Conectar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
      </div>
    </div>
  );

  const renderExperiencesView = () => (
    <div className="p-4 space-y-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-light text-white">Mis Experiencias</h2>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12">
          <Plus className="w-5 h-5 mr-2" />
          Nueva Experiencia
        </Button>
      </div>

      <div className="text-center py-16">
        <Star className="w-20 h-20 text-white/30 mx-auto mb-6" />
        <h3 className="text-lg font-light text-white mb-3">No tienes experiencias aún</h3>
        <p className="text-white/60 mb-8 px-4">Crea tu primera experiencia turística sostenible y comienza a conectar con viajeros conscientes</p>
        <Button className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white h-12">
          <Plus className="w-5 h-5 mr-2" />
          Crear Primera Experiencia
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
    <div className="p-4 space-y-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-light text-white">Mi Perfil</h2>
        <Button 
          onClick={() => window.open('/company-profile', '_blank')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12"
        >
          Editar Perfil Completo
        </Button>
      </div>

      <div className="space-y-4">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <h3 className="font-medium text-white mb-4">Información Básica</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-white/60 mb-1">Empresa</p>
                <p className="text-white font-medium">{user?.companyName || 'Tu Empresa'}</p>
              </div>
              <div>
                <p className="text-sm text-white/60 mb-1">Categoría</p>
                <p className="text-white">{user?.category || 'Turismo Sostenible'}</p>
              </div>
              <div>
                <p className="text-sm text-white/60 mb-1">Email</p>
                <p className="text-white text-sm">{user?.email || 'No especificado'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <h3 className="font-medium text-white mb-4">Estado del Perfil</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60">Completitud</span>
                <span className="text-blue-400 font-medium">85%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <div className="bg-blue-400 h-3 rounded-full transition-all duration-500" style={{width: '85%'}}></div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  Verificado
                </Badge>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  Activo
                </Badge>
              </div>
            </div>
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
      case "network": return renderNetworkView();
      case "experiences": return renderExperiencesView();
      case "messages": return renderMessagesView();
      case "profile": return renderProfileView();
      case "settings": return renderSettingsView();
      default: return renderMapView();
    }
  };

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
        <main className={activeView === 'map' ? 'h-screen' : 'min-h-screen pt-16'}>
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={activeView === 'map' ? 'h-full' : 'min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900'}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>

      {/* Mobile navigation now handled by HeaderButtons */}
    </div>
  );
};

export default MinimalistPortalEmpresas;