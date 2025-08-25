import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  Map, Building2, Star, MessageCircle, Settings, User, Plus,
  Search, MapPin, Globe, Hotel, Utensils, Car, Heart, 
  GraduationCap, Smartphone, Handshake, Leaf, TreePine,
  Plane, Camera, Coffee, Waves, Mountain, LogOut
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
import { DesktopSidebar } from "@/components/layout/DesktopSidebar";
import UserFlowManager from "@/components/userflow/UserFlowManager";
import ExperienceForm from "@/components/dashboard/ExperienceForm";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from '@/contexts/AuthContext';

const MinimalistPortalEmpresas = () => {
  const { signOut } = useAuth();
  const [activeView, setActiveView] = useState("map");
  const [searchQuery, setSearchQuery] = useState("");
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Desktop sidebar state
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  // Category and subcategory icon mapping
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

  // Current user data fetch - improved for loading issues
  const { data: currentUser, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ['/api/auth/me'],
    retry: (failureCount, error: any) => {
      // Don't retry on 401 errors (authentication issues)
      if (error?.message?.includes('401')) return false;
      return failureCount < 2;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true, // Enable refetch to handle login transitions
    refetchOnMount: true,
    queryFn: async () => {
      try {
        const response = await apiRequest('/api/auth/me');
        return response;
      } catch (error) {
        if (error instanceof Error && error.message.includes('401')) {
          // Redirect to login on authentication failure
          window.location.href = '/portal-empresas/auth';
          throw error;
        }
        throw error;
      }
    }
  });

  const user = (currentUser as any)?.user || currentUser;

  // Directory users fetch - ALL HOOKS MUST BE CALLED BEFORE CONDITIONAL RETURNS
  const { data: directoryUsers = [], isLoading: directoryLoading } = useQuery({
    queryKey: ["/api/directory/users"],
    queryFn: async () => {
      const response = await apiRequest("/api/directory/users");
      return response;
    },
    staleTime: 10 * 60 * 1000, // Cache for 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!user && !userLoading, // Only fetch when user is authenticated and loaded
  });

  // Show loading state if user is being fetched
  if (userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-white text-lg">Cargando Portal Empresas...</p>
        </div>
      </div>
    );
  }

  // Redirect to auth if no user data after loading
  if (!userLoading && !user) {
    window.location.href = '/portal-empresas/auth';
    return null;
  }

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

  const renderMapView = () => (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <InteractiveMap />
    </div>
  );

  const renderNetworkView = () => (
    <div className="mobile-content space-y-6 max-w-6xl mx-auto">
      {/* Enhanced Desktop Header */}
      <div className="text-center space-y-3">
        <h2 className="mobile-text-xl md:text-2xl lg:text-3xl font-bold text-white">Red de Contactos</h2>
        <p className="text-white/60 mobile-text-sm lg:text-base">Conecta con empresas sostenibles verificadas</p>
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

      {/* Enhanced Desktop Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
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
                  {/* Enhanced Company Header */}
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {(company.companyName || `${company.firstName} ${company.lastName}`).substring(0, 2).toUpperCase()}
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white/20 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-lg truncate mb-2">
                        {company.companyName || `${company.firstName} ${company.lastName}`}
                      </h3>
                      
                      {/* Enhanced Subcategory Badges with Symbols */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {company.category && (
                          <Badge variant="outline" className="text-green-400 border-green-400/50 bg-green-400/10 text-xs px-2 py-1">
                            <span className="mr-1">{getCategoryIcon(company.category)}</span>
                            {company.category.length > 20 ? company.category.substring(0, 20) + '...' : company.category}
                          </Badge>
                        )}
                        {company.subcategory && (
                          <Badge variant="outline" className="text-blue-400 border-blue-400/50 bg-blue-400/10 text-xs px-2 py-1">
                            <span className="mr-1">{getSubcategoryIcon(company.subcategory)}</span>
                            {company.subcategory}
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-yellow-400 border-yellow-400/50 bg-yellow-400/10 text-xs px-2 py-1">
                          <span className="mr-1">✓</span>
                          Verificado
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Company Info */}
                  <div className="space-y-3 mb-4">
                    <p className="text-white/80 text-sm line-clamp-2 leading-relaxed">
                      {company.companyDescription || company.description || 'Empresa especializada en experiencias de turismo sostenible y responsable.'}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2 text-white/60">
                        <MapPin className="w-3 h-3" />
                        <span>{company.location || 'Colombia'}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-white/60">
                        <Globe className="w-3 h-3" />
                        <span>Portal NATUR</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-800 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-sm h-9 shadow-lg transition-all duration-300"
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
    <div className="mobile-content space-y-6">
      <div className="flex flex-col space-y-4">
        <h2 className="mobile-text-xl font-light text-white">Mis Experiencias</h2>
        
        {/* Mobile-First Button for Experience Creation */}
        <Sheet open={showExperienceForm} onOpenChange={setShowExperienceForm}>
          <SheetTrigger asChild>
            <Button className="mobile-btn w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 md:w-5 md:h-5 mr-2" />
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
    <div className="mobile-content space-y-6 max-w-4xl mx-auto">
      {/* Cover Photo Section - Facebook Style */}
      <div className="relative w-full h-48 md:h-64 bg-gradient-to-r from-green-600 via-green-500 to-blue-600 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg">
            {user?.companyName || 'Tu Empresa'}
          </h1>
          <p className="text-white/90 text-lg mt-1">{user?.category || 'Turismo Sostenible'}</p>
        </div>
      </div>

      {/* Profile Header - Facebook Style */}
      <div className="relative -mt-20 px-6">
        <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-6">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-green-500 to-blue-600 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white text-4xl md:text-5xl font-bold">
              {user?.companyName?.substring(0, 2).toUpperCase() || 'TU'}
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 md:pb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {user?.companyName || 'Tu Empresa'}
            </h2>
            <p className="text-white/70 text-lg mb-4">{user?.bio || 'Empresa comprometida con el turismo sostenible'}</p>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={() => window.location.href = '/edit-profile'}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 px-6 py-2 rounded-lg font-medium"
              >
                <User className="w-4 h-4 mr-2" />
                Editar Perfil
              </Button>
              <Button 
                onClick={() => window.location.href = '/configuracion'}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 px-6 py-2 rounded-lg font-medium"
              >
                <Settings className="w-4 h-4 mr-2" />
                Configuración
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* User Flow Progress */}
      <div className="mb-6">
        <UserFlowManager />
      </div>

      {/* Profile Stats - Facebook Style */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center p-4">
          <div className="text-2xl font-bold text-white">25</div>
          <div className="text-white/60 text-sm">Experiencias</div>
        </Card>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center p-4">
          <div className="text-2xl font-bold text-white">142</div>
          <div className="text-white/60 text-sm">Contactos</div>
        </Card>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center p-4">
          <div className="text-2xl font-bold text-white">4.8</div>
          <div className="text-white/60 text-sm">Calificación</div>
        </Card>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center p-4">
          <div className="text-2xl font-bold text-white">85%</div>
          <div className="text-white/60 text-sm">Completitud</div>
        </Card>
      </div>

      {/* About Section - Facebook Style */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Building2 className="w-5 h-5 mr-2" />
            Acerca de {user?.companyName || 'la empresa'}
          </h3>
          <div className="space-y-4 text-white/80">
            <p>{user?.companyDescription || 'Empresa dedicada al turismo sostenible, comprometida con la conservación del medio ambiente y el desarrollo de experiencias únicas que conectan a los viajeros con la naturaleza.'}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-green-400" />
                <span>{user?.address || 'Bogotá, Colombia'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4 text-green-400" />
                <span>{user?.website || 'www.empresa.com'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Building2 className="w-4 h-4 text-green-400" />
                <span>{user?.teamSize || '10-50'} empleados</span>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="w-4 h-4 text-green-400" />
                <span>Fundada en {user?.foundedYear || '2020'}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Info - Facebook Style */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Información de Contacto</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Globe className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Email</p>
                  <p className="text-white">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Globe className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Teléfono</p>
                  <p className="text-white">{user?.phone || '+57 300 123 4567'}</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <Globe className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Sitio Web</p>
                  <p className="text-white">{user?.website || 'www.empresa.com'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Ubicación</p>
                  <p className="text-white">{user?.city}, {user?.country}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSettingsView = () => (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-light text-white mb-4">Configuración</h2>
      
      {/* Portal Navigation */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <div className="w-2 h-6 bg-green-500 rounded-full mr-3"></div>
            Navegación entre Portales
          </h3>
          <div className="space-y-3">
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 text-white h-12 flex items-center justify-center"
              onClick={() => setLocation('/portal-empresas')}
            >
              <Building2 className="w-5 h-5 mr-2" />
              Portal Empresas (Actual)
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-green-400/50 text-green-300 hover:bg-green-400/10 h-12 flex items-center justify-center"
              onClick={() => setLocation('/portal-viajeros')}
            >
              <MapPin className="w-5 h-5 mr-2" />
              Cambiar a Portal Viajeros
            </Button>
          </div>
          <p className="text-xs text-white/50 mt-3">
            Usa el mismo usuario para acceder a ambos portales y ver diferentes perspectivas
          </p>
        </CardContent>
      </Card>

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
      
      {/* Mobile View */}
      <div className="lg:hidden pt-20">
        {renderContent()}
      </div>

      {/* Desktop View with Ultra-Compact Sidebar */}
      <div className="hidden lg:flex h-screen pt-20">
        {/* Compact Sidebar */}
        <div className={`desktop-sidebar ${!sidebarOpen ? 'collapsed' : ''} transition-all duration-300`}>
          <div className="flex flex-col h-full">
            {/* Compact Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div className={`${!sidebarOpen ? 'hidden' : 'block'}`}>
                <h2 className="text-sm font-bold text-green-400 uppercase tracking-wide">Portal</h2>
                <p className="text-xs text-white/60">Empresas</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="h-6 w-6 p-0 hover:bg-white/10"
              >
                <span className="text-white text-xs">{sidebarOpen ? '←' : '→'}</span>
              </Button>
            </div>

            {/* Compact Navigation */}
            <div className="flex-1 space-y-1">
              {[
                { id: 'map', icon: '🗺️', label: 'Mapa', desc: 'Vista principal' },
                { id: 'profile', icon: '👤', label: 'Perfil', desc: 'Mi información' },
                { id: 'network', icon: '🏢', label: 'Red', desc: 'Empresas' },
                { id: 'experiences', icon: '✨', label: 'Experiencias', desc: 'Gestionar' },
                { id: 'messages', icon: '💬', label: 'Mensajes', desc: 'Chat' },
                { id: 'settings', icon: '⚙️', label: 'Configuración', desc: 'Ajustes' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`
                    w-full flex items-center gap-3 p-2 rounded-lg transition-all duration-200
                    ${activeView === item.id 
                      ? 'bg-green-500/20 text-green-400 border-l-2 border-green-400' 
                      : 'text-white/80 hover:bg-white/10 hover:text-green-400'
                    }
                  `}
                >
                  <span className="text-sm">{item.icon}</span>
                  <div className={`${!sidebarOpen ? 'hidden' : 'block'} flex-1`}>
                    <div className="text-xs font-medium text-left">{item.label}</div>
                    <div className="text-xs text-white/50 text-left">{item.desc}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* User Flow Progress */}
            <div className={`${!sidebarOpen ? 'hidden' : 'block'} mt-auto pt-3 border-t border-white/10`}>
              <div className="text-xs text-white/60 mb-2">Progreso</div>
              <div className="bg-white/10 rounded-full h-1.5">
                <div className="bg-green-400 h-1.5 rounded-full w-3/4"></div>
              </div>
              <div className="text-xs text-white/50 mt-1">75% completado</div>
            </div>
          </div>
        </div>
        
        {/* Full-Screen Main Content */}
        <div className={`flex-1 h-full overflow-hidden transition-all duration-300 relative ${
          !sidebarOpen ? 'ml-15' : 'ml-0'
        }`}>
          {renderContent()}
        </div>
      </div>

      {/* WhatsApp Chat Integration */}
      <WhatsAppChat />
      
      {/* Profile configuration removed - all information captured during registration */}

      {/* Experience Form Sheet */}
      <Sheet open={showExperienceForm} onOpenChange={setShowExperienceForm}>
        <SheetContent side="right" className="w-full sm:max-w-2xl p-0 bg-gradient-to-br from-gray-900 via-black to-green-900 border-l border-white/20">
          <SheetHeader className="p-6 border-b border-white/20">
            <SheetTitle className="text-white font-light">Crear Nueva Experiencia</SheetTitle>
          </SheetHeader>
          <div className="p-6">
            <ExperienceForm onClose={() => {
              setShowExperienceForm(false);
              queryClient.invalidateQueries({ queryKey: ['/api/experiences'] });
            }} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MinimalistPortalEmpresas;