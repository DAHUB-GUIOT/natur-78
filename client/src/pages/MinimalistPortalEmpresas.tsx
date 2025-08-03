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
import { SimpleChat } from "@/components/messaging/SimpleChat";
import TwitterProfileSection from "@/components/profile/TwitterProfileSection";
import { HeaderButtons } from "@/components/layout/HeaderButtons";

const MinimalistPortalEmpresas = () => {
  const [activeView, setActiveView] = useState("map");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
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
    setShowMobileMenu(false);
  };

  const renderMobileNav = () => (
    <AnimatePresence>
      {showMobileMenu && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="fixed inset-x-0 top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/10"
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-white">Navegación</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowMobileMenu(false)}
                className="text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeView === item.id ? "secondary" : "ghost"}
                    onClick={() => handleNavigation(item.id)}
                    className={`h-16 flex flex-col items-center justify-center text-white hover:bg-white/10 ${
                      activeView === item.id ? 'bg-white/20' : ''
                    }`}
                  >
                    <Icon className="w-5 h-5 mb-1" />
                    <span className="text-xs">{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderDesktopSidebar = () => (
    <div className="hidden lg:flex flex-col w-64 bg-black/30 backdrop-blur-xl border-r border-white/10 min-h-screen">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-xl font-medium text-white mb-2">Portal Empresas</h1>
          <p className="text-sm text-white/60">
            {user?.companyName || 'Tu empresa'}
          </p>
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => handleNavigation(item.id)}
                className={`w-full justify-start text-white hover:bg-white/10 transition-colors ${
                  isActive ? 'bg-white/20 border-l-2 border-green-400' : ''
                }`}
              >
                <Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-green-400' : 'text-white/70'}`} />
                <span className={isActive ? 'font-medium' : ''}>{item.label}</span>
              </Button>
            );
          })}
        </nav>
      </div>
      
      {/* Sidebar Footer */}
      <div className="mt-auto p-6 border-t border-white/10">
        <div className="text-xs text-white/50 text-center">
          Festival NATUR 2025
        </div>
      </div>
    </div>
  );

  const renderMapView = () => (
    <div className="relative h-full">
      {/* Floating Header Overlay */}
      <div className="absolute top-4 left-4 right-4 z-20">
        <div className="bg-black/50 backdrop-blur-xl rounded-lg p-4 border border-white/10">
          <h1 className="text-xl lg:text-2xl font-light mb-1 text-white">
            Hola, {user?.companyName || user?.firstName || 'Empresa'}
          </h1>
          <p className="text-sm text-white/70">
            Explora el ecosistema de turismo sostenible
          </p>
        </div>
      </div>

      {/* Floating Stats Overlay */}
      <div className="absolute top-24 left-4 right-4 z-20">
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Experiencias", value: "3", color: "text-yellow-400" },
            { label: "Vistas", value: "1.2K", color: "text-blue-400" },
            { label: "Contactos", value: "8", color: "text-green-400" },
            { label: "Rating", value: "4.8", color: "text-pink-400" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-black/50 backdrop-blur-xl rounded-lg p-2 border border-white/10">
                <div className="text-center">
                  <div className={`text-lg font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Actions Overlay */}
      <div className="absolute bottom-4 left-4 right-4 z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          <Button 
            onClick={() => setActiveView('experiences')}
            className="h-12 bg-black/50 backdrop-blur-xl border border-green-500/30 text-white hover:bg-green-600/30"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nueva Experiencia
          </Button>
          <Button 
            onClick={() => setActiveView('network')}
            className="h-12 bg-black/50 backdrop-blur-xl border border-blue-500/30 text-white hover:bg-blue-600/30"
          >
            <Building2 className="w-4 h-4 mr-2" />
            Ver Red
          </Button>
          <Button 
            onClick={() => setActiveView('messages')}
            className="h-12 bg-black/50 backdrop-blur-xl border border-purple-500/30 text-white hover:bg-purple-600/30"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Mensajes
          </Button>
        </div>
      </div>

      {/* Full Size Interactive Map */}
      <div className="absolute inset-0 z-10">
        <InteractiveMap />
      </div>
    </div>
  );

  const renderNetworkView = () => (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <h2 className="text-xl font-light text-white">Red Empresarial</h2>
        
        <div className="flex items-center gap-3">
          <div className="relative flex-1 lg:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
            <Input
              placeholder="Buscar empresas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/40"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="border-white/30 text-white hover:bg-white/10"
          >
            {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
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
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-white mb-1 line-clamp-1">
                        {company.companyName || `${company.firstName} ${company.lastName}`}
                      </h3>
                      <p className="text-sm text-white/60 mb-2">{company.category}</p>
                    </div>
                    <Badge variant="secondary" className="bg-white/10 text-white/80 text-xs">
                      {company.location || 'Bogotá'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <Eye className="w-3 h-3" />
                      <span>Ver perfil</span>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      Conectar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
      </div>
    </div>
  );

  const renderExperiencesView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-light text-white">Mis Experiencias</h2>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Nueva
        </Button>
      </div>

      <div className="text-center py-12">
        <Star className="w-16 h-16 text-white/30 mx-auto mb-4" />
        <h3 className="text-lg font-light text-white mb-2">No tienes experiencias aún</h3>
        <p className="text-white/60 mb-6">Crea tu primera experiencia turística sostenible</p>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Crear Primera Experiencia
        </Button>
      </div>
    </div>
  );

  const renderMessagesView = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-light text-white">Mensajes</h2>
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-0">
          <div className="h-96">
            <SimpleChat />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProfileView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-light text-white">Mi Perfil</h2>
        <Button 
          onClick={() => window.open('/company-profile', '_blank')}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Editar Perfil
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <h3 className="font-medium text-white mb-4">Información Básica</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-white/60">Empresa</p>
                <p className="text-white">{user?.companyName || 'Tu Empresa'}</p>
              </div>
              <div>
                <p className="text-sm text-white/60">Categoría</p>
                <p className="text-white">{user?.category || 'Turismo Sostenible'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <h3 className="font-medium text-white mb-4">Estado del Perfil</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60">Completitud</span>
                <span className="text-green-400 font-medium">85%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Verificado
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSettingsView = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-light text-white">Configuración</h2>
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
      <HeaderButtons showPortalButtons={false} />
      
      {/* Mobile Header */}
      <div className="lg:hidden bg-black/30 backdrop-blur-xl border-b border-white/10 px-4 py-3 mt-16 sticky top-16 z-30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-medium text-white">Portal Empresas</h1>
            <p className="text-xs text-white/60">{navItems.find(item => item.id === activeView)?.label}</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowMobileMenu(true)}
            className="text-white hover:bg-white/10"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex">
        {renderDesktopSidebar()}
        
        {/* Main Content */}
        <div className="flex-1">
          <main className={activeView === 'map' ? 'h-screen' : 'p-4 lg:p-8'}>
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={activeView === 'map' ? 'h-full' : ''}
            >
              {renderContent()}
            </motion.div>
          </main>
        </div>
      </div>

      {renderMobileNav()}
    </div>
  );
};

export default MinimalistPortalEmpresas;