import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Map, Building2, Star, MessageCircle, Settings, User, Plus,
  Menu, X, Search, Filter, Grid, List, MapPin, Eye, TrendingUp
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { InteractiveMap } from "@/components/dashboard/InteractiveMap";
import { WhatsAppChat } from "@/components/messaging/WhatsAppChat";
import TwitterProfileSection from "@/components/profile/TwitterProfileSection";
import { HeaderButtons } from "@/components/layout/HeaderButtons";
import UserFlowManager from "@/components/userflow/UserFlowManager";
import ExperienceForm from "@/components/dashboard/ExperienceForm";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const MinimalistPortalEmpresas = () => {
  const [activeView, setActiveView] = useState("map");
  // Mobile menu removed - now handled by HeaderButtons
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

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
      // Switch to messages view and show the conversation
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
    <div className="p-4 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-bold text-white">Red de Contactos</h2>
      </div>

      {/* Search Section */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
              <Input
                placeholder="Buscar empresas por nombre o categoría..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/50 h-10"
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
              Filtrar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <CardContent className="p-6">
                  {/* Company Header */}
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {(company.companyName || `${company.firstName} ${company.lastName}`).substring(0, 2).toUpperCase()}
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white/20 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-lg truncate">
                        {company.companyName || `${company.firstName} ${company.lastName}`}
                      </h3>
                      <p className="text-white/70 text-sm">{company.category || 'Turismo Sostenible'}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs px-2 py-0.5">
                          Verificado
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Company Info */}
                  <div className="space-y-3 mb-4">
                    <p className="text-white/80 text-sm line-clamp-2 leading-relaxed">
                      {company.description || 'Empresa especializada en experiencias de turismo sostenible y responsable.'}
                    </p>
                    
                    <div className="grid grid-cols-1 gap-3 text-xs">
                      <div className="flex items-center space-x-2 text-white/60">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span>{company.location || 'Bogotá, Colombia'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-sm h-9 shadow-lg transition-all duration-300"
                      onClick={() => handleViewProfile(company.id)}
                      data-testid={`button-view-profile-${company.id}`}
                    >
                      <User className="w-3 h-3 mr-1" />
                      Ver perfil
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1 border-white/30 text-white hover:bg-white/10 font-semibold text-sm h-9 shadow-lg transition-all duration-300"
                      onClick={() => handleSendMessage(company.id)}
                      disabled={createConversationMutation.isPending}
                      data-testid={`button-send-message-${company.id}`}
                    >
                      <MessageCircle className="w-3 h-3 mr-1" />
                      {createConversationMutation.isPending ? 'Enviando...' : 'Enviar mensaje'}
                    </Button>
                  </div>

                  {/* Connection Status */}
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/50">Estado:</span>
                      <span className="text-green-400 font-medium">● Conectado</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-3">
          Cargar Más Empresas
        </Button>
      </div>
    </div>
  );

  const renderExperiencesView = () => (
    <div className="p-4 space-y-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-light text-white">Mis Experiencias</h2>
        
        {/* Single Button for Experience Creation with Step-by-Step Form */}
        <Sheet open={showExperienceForm} onOpenChange={setShowExperienceForm}>
          <SheetTrigger asChild>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12">
              <Plus className="w-5 h-5 mr-2" />
              Nueva Experiencia
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-full sm:max-w-2xl overflow-y-auto bg-gradient-to-br from-gray-900 via-black to-blue-900 border-white/20"
          >
            <SheetHeader>
              <SheetTitle className="text-white text-xl font-light">
                Crear Nueva Experiencia
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <ExperienceForm onClose={() => setShowExperienceForm(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="text-center py-16">
        <Star className="w-20 h-20 text-white/30 mx-auto mb-6" />
        <h3 className="text-lg font-light text-white mb-3">No tienes experiencias aún</h3>
        <p className="text-white/60 mb-8 px-4">Crea tu primera experiencia turística sostenible y comienza a conectar con viajeros conscientes</p>
        
        {/* Alternative button that also opens the same form */}
        <Sheet open={showExperienceForm} onOpenChange={setShowExperienceForm}>
          <SheetTrigger asChild>
            <Button className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white h-12">
              <Plus className="w-5 h-5 mr-2" />
              Crear Primera Experiencia
            </Button>
          </SheetTrigger>
        </Sheet>
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
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-2xl">
            {user?.companyName?.substring(0, 2).toUpperCase() || 'TU'}
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white/20 flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{user?.companyName || 'Tu Empresa'}</h2>
          <p className="text-white/70">{user?.category || 'Turismo Sostenible'}</p>
        </div>
        <Button 
          onClick={() => window.location.href = '/edit-profile'}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          Editar Perfil Completo
        </Button>
      </div>



      {/* User Flow Progress */}
      <div className="mb-6">
        <UserFlowManager />
      </div>

      {/* Main Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Information */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <h3 className="font-semibold text-white mb-6 flex items-center">
              <div className="w-2 h-6 bg-blue-500 rounded-full mr-3"></div>
              Información de la Empresa
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm text-white/60 mb-1">Nombre de la Empresa</p>
                  <p className="text-white font-medium">{user?.companyName || 'Tu Empresa'}</p>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm text-white/60 mb-1">Categoría Principal</p>
                  <p className="text-white">{user?.category || 'Turismo Sostenible'}</p>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm text-white/60 mb-1">Email de Contacto</p>
                  <p className="text-white text-sm">{user?.email || 'No especificado'}</p>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm text-white/60 mb-1">Teléfono</p>
                  <p className="text-white text-sm">{user?.phone || '+57 300 123 4567'}</p>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm text-white/60 mb-1">Ubicación</p>
                  <p className="text-white text-sm">{user?.location || 'Bogotá, Colombia'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Details */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <h3 className="font-semibold text-white mb-6 flex items-center">
              <div className="w-2 h-6 bg-green-500 rounded-full mr-3"></div>
              Detalles del Negocio
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-white/60 mb-1">Año de Fundación</p>
                <p className="text-white">{user?.foundedYear || '2020'}</p>
              </div>
              <div>
                <p className="text-sm text-white/60 mb-1">Número de Empleados</p>
                <p className="text-white">{user?.employees || '5-10 empleados'}</p>
              </div>
              <div>
                <p className="text-sm text-white/60 mb-1">Sitio Web</p>
                <p className="text-blue-400 text-sm underline cursor-pointer hover:text-blue-300">
                  {user?.website || 'www.tuempresa.com'}
                </p>
              </div>
              <div>
                <p className="text-sm text-white/60 mb-1">Redes Sociales</p>
                <div className="flex space-x-2 mt-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs cursor-pointer hover:bg-blue-700">
                    F
                  </div>
                  <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white text-xs cursor-pointer hover:bg-blue-500">
                    T
                  </div>
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs cursor-pointer hover:bg-pink-600">
                    I
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Status */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <h3 className="font-semibold text-white mb-6 flex items-center">
            <div className="w-2 h-6 bg-yellow-500 rounded-full mr-3"></div>
            Estado del Perfil
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/70">Completitud del Perfil</span>
                <span className="text-blue-400 font-semibold">85%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500" style={{width: '85%'}}></div>
              </div>
              <p className="text-xs text-white/50 mt-2">Agrega más información para mejorar tu visibilidad</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-3 py-1">
                ✓ Verificado
              </Badge>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-3 py-1">
                ✓ Activo
              </Badge>
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 px-3 py-1">
                ⏳ Perfil Básico
              </Badge>
            </div>

            <div className="pt-4 border-t border-white/20">
              <h4 className="text-white font-medium mb-3">Próximos Pasos Sugeridos:</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  Agregar fotos de alta calidad de tus experiencias
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  Completar descripción detallada de servicios
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  Obtener certificaciones de sostenibilidad
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
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