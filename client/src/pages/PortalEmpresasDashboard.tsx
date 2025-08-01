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
  Repeat2,
  Save,
  Shield,
  Menu,
  X,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { InteractiveMap } from "@/components/dashboard/InteractiveMap";
import ExperienceForm from "@/components/dashboard/ExperienceForm";
import { PortalProfile } from "@/components/portal/PortalProfile";

// Mock data for demo
const mockExperiences = [
  {
    id: 1,
    title: "Experiencia Gastronómica Sostenible",
    location: "Bogotá, Colombia",
    price: "150.000",
    duration: "4 horas",
    rating: 4.8,
    image: "/lovable-uploads/a6b19bab-ad8e-4e0f-8e98-69e4f2d1ab7f.png",
    category: "Gastronomía",
    availability: "Disponible",
    status: "active"
  },
  {
    id: 2, 
    title: "Tour de Café Orgánico",
    location: "Cundinamarca, Colombia",
    price: "85.000",
    duration: "6 horas",
    rating: 4.9,
    image: "/lovable-uploads/e38b4e38-84ef-4ac8-9b6a-b58b86e18e6e.png",
    category: "Agroturismo",
    availability: "Disponible",
    status: "active"
  }
];

const PortalEmpresasDashboard = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("inicio");
  const [isMobileSidebarExpanded, setIsMobileSidebarExpanded] = useState(false);
  const [showExperienceForm, setShowExperienceForm] = useState(false);

  // Sidebar configuration
  const sidebarItems = [
    { id: "inicio", label: "Inicio", icon: Home },
    { id: "mapa", label: "Mapa", icon: Map },
    { id: "directorio", label: "Directorio", icon: Building2 },
    { id: "experiencias", label: "Experiencias", icon: Star },
    { id: "mensajes", label: "Mensajes", icon: MessageCircle },
    { id: "estadisticas", label: "Estadísticas", icon: BarChart3 },
    { id: "admin", label: "Admin", icon: ShieldCheck },
  ];

  // Unified Sidebar Component
  const UnifiedSidebar = () => {
    const isExpanded = window.innerWidth >= 768 || isMobileSidebarExpanded;
    
    return (
      <div className={`fixed top-0 left-0 bottom-0 z-50 transition-all duration-300 ease-in-out ${
        isMobileSidebarExpanded ? 'w-60' : 'w-16'
      } md:w-60`}>
        <div className="h-full backdrop-blur-xl bg-gray-900/20 border-r border-white/20 shadow-2xl flex flex-col">
          {/* Logo Section with integrated mobile toggle */}
          <div className="p-3 border-b border-white/20">
            <div className={`flex items-center ${isExpanded ? 'justify-between' : 'justify-center'}`}>
              {/* Logo */}
              <div className={`flex items-center ${isExpanded ? 'space-x-2' : ''}`}>
                <div className="w-8 h-8 bg-green-600/80 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                {isExpanded && (
                  <div>
                    <span className="text-xl font-bold text-white tracking-wide">NATUR</span>
                    <p className="text-white/70 text-xs">Portal Empresas</p>
                  </div>
                )}
              </div>
              
              {/* Mobile toggle button - only when expanded */}
              {isMobileSidebarExpanded && (
                <button
                  onClick={() => setIsMobileSidebarExpanded(false)}
                  className="md:hidden p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white backdrop-blur-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {/* Mobile toggle when collapsed - make it clickable on the logo area */}
            {!isMobileSidebarExpanded && (
              <button
                onClick={() => setIsMobileSidebarExpanded(true)}
                className="md:hidden absolute inset-0 w-full h-full bg-transparent"
                aria-label="Expandir menú"
              />
            )}
          </div>

          {/* User Profile Section */}
          <div className="p-3 border-b border-white/20">
            {user ? (
              <div className="space-y-2">
                <div className={`flex items-center ${isExpanded ? 'justify-start' : 'justify-center'}`}>
                  {user.profilePicture ? (
                    <img 
                      src={user.profilePicture} 
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#cad95e]"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#cad95e]/20 border-2 border-[#cad95e] flex items-center justify-center">
                      <User className="w-5 h-5 text-[#cad95e]" />
                    </div>
                  )}
                  {isExpanded && (
                    <div className="ml-3 flex-1 min-w-0">
                      <h3 className="text-white font-sans text-sm font-medium truncate">
                        {user.firstName} {user.lastName}
                      </h3>
                      <p className="text-white/70 text-xs truncate">
                        {user.companyName || user.email}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className={`${isExpanded ? 'text-center' : 'flex justify-center'}`}>
                <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse"></div>
              </div>
            )}
          </div>

          {/* Navigation Items */}
          <div className="flex-1 p-2 space-y-1 overflow-y-auto">
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
                    // Auto-collapse on mobile after selection
                    if (window.innerWidth < 768) {
                      setIsMobileSidebarExpanded(false);
                    }
                  }}
                  className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                    activeSection === item.id 
                      ? 'bg-white/20 text-white shadow-lg border border-white/30 backdrop-blur-sm' 
                      : 'text-white/80 hover:bg-white/10 hover:text-white backdrop-blur-sm'
                  } ${!isExpanded ? 'justify-center' : 'justify-start'}`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {isExpanded && (
                    <span className="ml-3 text-sm font-medium truncate">{item.label}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* PRODUCIR Button */}
          <div className="p-3">
            <button
              onClick={() => {
                setActiveSection("producir");
                if (window.innerWidth < 768) {
                  setIsMobileSidebarExpanded(false);
                }
              }}
              className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                activeSection === "producir" 
                  ? 'bg-gradient-to-r from-[#cad95e] to-green-500 text-black font-bold shadow-xl' 
                  : 'bg-gradient-to-r from-[#cad95e]/80 to-green-500/80 text-black font-bold hover:from-[#cad95e] hover:to-green-500'
              } ${!isExpanded ? 'justify-center' : 'justify-start'}`}
            >
              <Plus className="w-5 h-5 flex-shrink-0" />
              {isExpanded && (
                <span className="ml-3 text-sm font-medium truncate">PRODUCIR</span>
              )}
            </button>
          </div>

          {/* Quick Actions */}
          <div className="p-3 border-t border-white/20">
            <div className={`flex ${isExpanded ? 'space-x-2' : 'flex-col space-y-2'}`}>
              <button
                onClick={() => {
                  setActiveSection("ajustes");
                  if (window.innerWidth < 768) {
                    setIsMobileSidebarExpanded(false);
                  }
                }}
                className={`${isExpanded ? 'flex-1' : 'w-full'} flex items-center justify-center p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white backdrop-blur-sm`}
              >
                <Settings className="w-4 h-4" />
                {isExpanded && <span className="ml-2 text-xs">Perfil</span>}
              </button>
              <button
                onClick={() => window.location.href = "/api/auth/logout"}
                className={`${isExpanded ? 'px-3' : 'w-full'} flex items-center justify-center p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors text-white backdrop-blur-sm`}
              >
                <LogOut className="w-4 h-4" />
                {isExpanded && <span className="ml-2 text-xs">Salir</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "ajustes":
        return <PortalProfile />;
      case "inicio":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Experiencias Activas</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                    <Star className="w-8 h-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Reservas Mes</p>
                      <p className="text-2xl font-bold">47</p>
                    </div>
                    <Calendar className="w-8 h-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Ingresos</p>
                      <p className="text-2xl font-bold">$2.8M</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Conectados</p>
                      <p className="text-2xl font-bold">156</p>
                    </div>
                    <Users className="w-8 h-8 text-orange-200" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case "mapa":
        return null; // Map is rendered as background
      default:
        return <div>Sección no encontrada</div>;
    }
  };

  // Full-screen layout for map, regular layout for other sections
  if (activeSection === "mapa") {
    return (
      <div className="h-screen w-full relative overflow-hidden">
        {/* Full-screen map as background */}
        <div className={`absolute inset-0 ${isMobileSidebarExpanded ? 'md:left-60 left-60' : 'md:left-60 left-16'}`}>
          <InteractiveMap />
        </div>

        {/* Unified Sidebar */}
        <UnifiedSidebar />

        {/* Mobile Overlay */}
        {isMobileSidebarExpanded && (
          <div 
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileSidebarExpanded(false)}
          />
        )}
        
        {/* Top green bar for map page */}
        <header className={`absolute top-0 right-0 bg-green-600 border-b border-green-700 shadow-lg px-3 md:px-6 py-3 md:py-4 z-40 backdrop-blur-md bg-green-600/95 ${
          isMobileSidebarExpanded ? 'md:left-60 left-60' : 'md:left-60 left-16'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/70" />
                <Input 
                  placeholder="Buscar experiencias, empresas, ubicaciones..." 
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60 backdrop-blur-md"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4 ml-4">
              <Button variant="ghost" size="sm" className="relative text-white hover:bg-white/20">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="relative text-white hover:bg-white/20">
                <MessageCircle className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center">2</span>
              </Button>
            </div>
          </div>
        </header>
      </div>
    );
  }

  // Regular layout for non-map sections
  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* Full-screen map as background for all pages */}
      <InteractiveMap />
      
      {/* Unified Sidebar */}
      <UnifiedSidebar />

      {/* Mobile Overlay */}
      {isMobileSidebarExpanded && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileSidebarExpanded(false)}
        />
      )}
      
      {/* Top green bar for all pages */}
      <header className={`absolute top-0 right-0 bg-green-600 border-b border-green-700 shadow-lg px-3 md:px-6 py-3 md:py-4 z-40 backdrop-blur-md bg-green-600/95 ${
        isMobileSidebarExpanded ? 'md:left-60 left-60' : 'md:left-60 left-16'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-white tracking-wide hidden sm:block">
              {sidebarItems.find(item => item.id === activeSection)?.label || "Portal Empresas"}
            </h1>
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
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className={`absolute top-20 right-0 bottom-0 bg-black/40 backdrop-blur-sm p-6 overflow-y-auto ${
        isMobileSidebarExpanded ? 'md:left-60 left-60' : 'md:left-60 left-16'
      }`}>
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>

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