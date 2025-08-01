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
  TreePine,
  Waves,
  Menu,
  X,
  Mail,
  Share2,
  Code,
  Repeat2,
  Save,
  Shield,
  ChevronLeft,
  Clock,
  ChevronDown,
  ChevronRight
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
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // Complete menu structure with categories and subcategories
  const menuStructure = [
    { id: "inicio", label: "Inicio", icon: Home, type: "single" },
    { id: "mapa", label: "Mapa", icon: Map, type: "single" },
    {
      id: "directorio",
      label: "Directorio",
      icon: Building2,
      type: "category",
      subcategories: [
        { id: "turismo-sostenible", label: "Agencias Turismo Sostenible", icon: Globe },
        { id: "alojamientos", label: "Alojamientos Sostenibles", icon: Building2 },
        { id: "gastronomia", label: "Gastronomía Sostenible", icon: Users },
        { id: "movilidad", label: "Movilidad Ecológica", icon: MapPin },
        { id: "ong-fundaciones", label: "ONG y Fundaciones", icon: Heart },
        { id: "educacion", label: "Educación Ambiental", icon: Star },
        { id: "tecnologia", label: "Tecnología Sostenible", icon: Settings },
        { id: "aliados", label: "Aliados y Patrocinadores", icon: Handshake }
      ]
    },
    {
      id: "experiencias",
      label: "Experiencias",
      icon: Star,
      type: "category",
      subcategories: [
        { id: "mis-experiencias", label: "Mis Experiencias", icon: Star },
        { id: "crear-experiencia", label: "Crear Nueva", icon: Plus },
        { id: "experiencias-populares", label: "Más Populares", icon: Heart },
        { id: "experiencias-pending", label: "Pendientes Aprobación", icon: Clock }
      ]
    },
    {
      id: "mensajes",
      label: "Mensajes",
      icon: MessageCircle,
      type: "category", 
      subcategories: [
        { id: "chat-general", label: "Chat General", icon: MessageCircle },
        { id: "consultas-empresas", label: "Consultas Empresas", icon: Building2 },
        { id: "soporte-tecnico", label: "Soporte Técnico", icon: Settings }
      ]
    },
    {
      id: "estadisticas",
      label: "Estadísticas",
      icon: BarChart3,
      type: "category",
      subcategories: [
        { id: "dashboard-general", label: "Dashboard General", icon: BarChart3 },
        { id: "analytics-experiencias", label: "Analytics Experiencias", icon: Star },
        { id: "metricas-engagement", label: "Métricas Engagement", icon: Users },
        { id: "reportes-financieros", label: "Reportes Financieros", icon: DollarSign }
      ]
    },
    { id: "admin", label: "Admin", icon: ShieldCheck, type: "single" },
    {
      id: "producir",
      label: "PRODUCIR",
      icon: TreePine,
      type: "category",
      subcategories: [
        { id: "contenido-sostenible", label: "Contenido Sostenible", icon: Edit },
        { id: "herramientas-marketing", label: "Herramientas Marketing", icon: Share2 },
        { id: "recursos-educativos", label: "Recursos Educativos", icon: Star },
        { id: "plantillas-experiencias", label: "Plantillas Experiencias", icon: Save }
      ]
    },
    { id: "perfil", label: "Perfil", icon: User, type: "single" },
    { id: "salir", label: "Salir", icon: LogOut, type: "single" }
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Desktop Sidebar Component
  const DesktopSidebar = () => {
    return (
      <div className="hidden md:block fixed top-0 left-0 bottom-0 w-60 z-50">
        <div className="h-full backdrop-blur-xl bg-gray-900/20 border-r border-white/20 shadow-2xl flex flex-col">
          {/* Logo Section */}
          <div className="p-3 border-b border-white/20">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600/80 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-wide">NATUR</span>
                <p className="text-white/70 text-xs">Portal Empresas</p>
              </div>
            </div>
          </div>

          {/* User Profile Section */}
          <div className="p-3 border-b border-white/20">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center justify-start">
                  <div className="w-10 h-10 rounded-full bg-[#cad95e]/20 border-2 border-[#cad95e] flex items-center justify-center">
                    <User className="w-5 h-5 text-[#cad95e]" />
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <h3 className="text-white font-sans text-sm font-medium truncate">
                      Usuario Portal
                    </h3>
                    <p className="text-white/70 text-xs truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse"></div>
              </div>
            )}
          </div>

          {/* Navigation Items */}
          <div className="flex-1 p-2 space-y-1 overflow-y-auto">
            {menuStructure.map((item) => {
              const Icon = item.icon;
              const isExpanded = expandedCategories.includes(item.id);
              
              if (item.type === "single") {
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === 'admin') {
                        window.location.href = '/admin';
                      } else if (item.id === 'perfil') {
                        setActiveSection('perfil');
                      } else if (item.id === 'salir') {
                        window.location.href = '/';
                      } else {
                        setActiveSection(item.id);
                      }
                    }}
                    className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                      activeSection === item.id 
                        ? 'bg-white/20 text-white shadow-lg border border-white/30 backdrop-blur-sm' 
                        : 'text-white/80 hover:bg-white/10 hover:text-white backdrop-blur-sm'
                    } justify-start`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="ml-3 text-sm font-medium truncate">{item.label}</span>
                  </button>
                );
              }
              
              return (
                <div key={item.id} className="space-y-1">
                  <button
                    onClick={() => toggleCategory(item.id)}
                    className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                      activeSection === item.id 
                        ? 'bg-white/20 text-white shadow-lg border border-white/30 backdrop-blur-sm' 
                        : 'text-white/80 hover:bg-white/10 hover:text-white backdrop-blur-sm'
                    } justify-start`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="ml-3 text-sm font-medium truncate">{item.label}</span>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 ml-auto" />
                    ) : (
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    )}
                  </button>
                  
                  {isExpanded && item.subcategories && (
                    <div className="ml-4 space-y-1">
                      {item.subcategories.map((subItem) => {
                        const SubIcon = subItem.icon;
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => setActiveSection(subItem.id)}
                            className={`w-full flex items-center p-2 rounded-lg transition-all duration-200 ${
                              activeSection === subItem.id 
                                ? 'bg-white/20 text-white shadow-lg border border-white/30 backdrop-blur-sm' 
                                : 'text-white/60 hover:bg-white/5 hover:text-white/80 backdrop-blur-sm'
                            } justify-start`}
                          >
                            <SubIcon className="w-4 h-4 flex-shrink-0" />
                            <span className="ml-3 text-xs font-medium truncate">{subItem.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* PRODUCIR Button */}
          <div className="p-3">
            <button
              onClick={() => setActiveSection("producir")}
              className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                activeSection === "producir" 
                  ? 'bg-gradient-to-r from-[#cad95e] to-green-500 text-black font-bold shadow-xl' 
                  : 'bg-gradient-to-r from-[#cad95e]/80 to-green-500/80 text-black font-bold hover:from-[#cad95e] hover:to-green-500'
              } justify-start`}
            >
              <Plus className="w-5 h-5 flex-shrink-0" />
              <span className="ml-3 text-sm font-medium truncate">PRODUCIR</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="p-3 border-t border-white/20">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveSection("ajustes")}
                className="flex-1 flex items-center justify-center p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white backdrop-blur-sm"
              >
                <Settings className="w-4 h-4" />
                <span className="ml-2 text-xs">Perfil</span>
              </button>
              <button
                onClick={() => window.location.href = "/api/auth/logout"}
                className="px-3 flex items-center justify-center p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors text-white backdrop-blur-sm"
              >
                <LogOut className="w-4 h-4" />
                <span className="ml-2 text-xs">Salir</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Mobile Header with Burger Menu
  const MobileHeader = () => {
    return (
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-gray-900/20 border-b border-white/20 shadow-2xl">
        <div className="flex items-center justify-between p-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600/80 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-wide">NATUR</span>
              <p className="text-white/70 text-xs">Portal Empresas</p>
            </div>
          </div>

          {/* Burger Menu Button */}
          <button
            onClick={() => setIsMobileSidebarExpanded(!isMobileSidebarExpanded)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white backdrop-blur-sm"
          >
            {isMobileSidebarExpanded ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileSidebarExpanded && (
          <div className="border-t border-white/20 backdrop-blur-xl bg-gray-900/30">
            <div className="p-4 space-y-2">
              {/* User Profile in Mobile */}
              {user && (
                <div className="flex items-center p-3 rounded-lg bg-white/5 border border-white/10 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#cad95e]/20 border-2 border-[#cad95e] flex items-center justify-center">
                    <User className="w-4 h-4 text-[#cad95e]" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-white font-sans text-sm font-medium">
                      Usuario Portal
                    </h3>
                    <p className="text-white/70 text-xs">
                      {user.email}
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Items */}
              {menuStructure.map((item) => {
                const Icon = item.icon;
                const isExpanded = expandedCategories.includes(item.id);
                
                if (item.type === "single") {
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.id === 'admin') {
                          window.location.href = '/admin';
                        } else if (item.id === 'perfil') {
                          setActiveSection('perfil');
                        } else if (item.id === 'salir') {
                          window.location.href = '/';
                        } else {
                          setActiveSection(item.id);
                        }
                        setIsMobileSidebarExpanded(false);
                      }}
                      className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                        activeSection === item.id 
                          ? 'bg-white/20 text-white shadow-lg border border-white/30 backdrop-blur-sm' 
                          : 'text-white/80 hover:bg-white/10 hover:text-white backdrop-blur-sm'
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="ml-3 text-sm font-medium">{item.label}</span>
                    </button>
                  );
                }
                
                return (
                  <div key={item.id} className="space-y-1">
                    <button
                      onClick={() => toggleCategory(item.id)}
                      className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                        activeSection === item.id 
                          ? 'bg-white/20 text-white shadow-lg border border-white/30 backdrop-blur-sm' 
                          : 'text-white/80 hover:bg-white/10 hover:text-white backdrop-blur-sm'
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="ml-3 text-sm font-medium">{item.label}</span>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 ml-auto" />
                      ) : (
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      )}
                    </button>
                    
                    {isExpanded && item.subcategories && (
                      <div className="ml-4 space-y-1">
                        {item.subcategories.map((subItem) => {
                          const SubIcon = subItem.icon;
                          return (
                            <button
                              key={subItem.id}
                              onClick={() => {
                                setActiveSection(subItem.id);
                                setIsMobileSidebarExpanded(false);
                              }}
                              className={`w-full flex items-center p-2 rounded-lg transition-all duration-200 ${
                                activeSection === subItem.id 
                                  ? 'bg-white/20 text-white shadow-lg border border-white/30 backdrop-blur-sm' 
                                  : 'text-white/60 hover:bg-white/5 hover:text-white/80 backdrop-blur-sm'
                              }`}
                            >
                              <SubIcon className="w-4 h-4 flex-shrink-0" />
                              <span className="ml-3 text-xs font-medium">{subItem.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* PRODUCIR Button */}
              <button
                onClick={() => {
                  setActiveSection("producir");
                  setIsMobileSidebarExpanded(false);
                }}
                className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                  activeSection === "producir" 
                    ? 'bg-gradient-to-r from-[#cad95e] to-green-500 text-black font-bold shadow-xl' 
                    : 'bg-gradient-to-r from-[#cad95e]/80 to-green-500/80 text-black font-bold hover:from-[#cad95e] hover:to-green-500'
                }`}
              >
                <Plus className="w-5 h-5 flex-shrink-0" />
                <span className="ml-3 text-sm font-medium">PRODUCIR</span>
              </button>

              {/* Quick Actions */}
              <div className="flex space-x-2 pt-2 border-t border-white/20 mt-4">
                <button
                  onClick={() => {
                    setActiveSection("ajustes");
                    setIsMobileSidebarExpanded(false);
                  }}
                  className="flex-1 flex items-center justify-center p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white backdrop-blur-sm"
                >
                  <Settings className="w-4 h-4" />
                  <span className="ml-2 text-xs">Perfil</span>
                </button>
                <button
                  onClick={() => window.location.href = "/api/auth/logout"}
                  className="px-3 flex items-center justify-center p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors text-white backdrop-blur-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="ml-2 text-xs">Salir</span>
                </button>
              </div>
            </div>
          </div>
        )}
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
          <div className="space-y-8">
            {/* Sustainability News Section */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Noticias de Sostenibilidad</h2>
                  <p className="text-white/70">Últimas tendencias en turismo regenerativo y tecnología verde</p>
                </div>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Ver todas
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Featured News Item */}
                <div className="lg:col-span-2 group cursor-pointer">
                  <div className="relative h-80 rounded-2xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-purple-700/40"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05' fill-rule='nonzero'%3E%3Ccircle cx='7' cy='7' r='3'/%3E%3Ccircle cx='53' cy='53' r='3'/%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Floating geometric elements */}
                    <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-[#cad95e]/20 backdrop-blur-md border border-[#cad95e]/30 flex items-center justify-center">
                      <Globe className="w-6 h-6 text-[#cad95e]" />
                    </div>
                    
                    <div className="absolute top-1/3 left-6 w-8 h-8 rounded-lg bg-blue-400/20 backdrop-blur-md border border-blue-400/30 rotate-12 flex items-center justify-center">
                      <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="inline-block px-3 py-1 rounded-full bg-[#cad95e]/20 backdrop-blur-md border border-[#cad95e]/30 text-[#cad95e] text-xs font-medium mb-4">
                        TECNOLOGÍA SOSTENIBLE
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                        IA Regenerativa: El Futuro del Turismo Consciente en 2025
                      </h3>
                      <p className="text-white/70 text-sm line-clamp-2 mb-4">
                        Descubre cómo la inteligencia artificial está revolucionando las experiencias de turismo sostenible, 
                        creando itinerarios personalizados que respetan los ecosistemas locales.
                      </p>
                      <div className="flex items-center text-white/60 text-xs space-x-4">
                        <span>Hace 2 horas</span>
                        <span>•</span>
                        <span>5 min lectura</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-3 h-3" />
                          <span>24</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Side News Items */}
                <div className="space-y-6">
                  <div className="group cursor-pointer">
                    <div className="relative h-36 rounded-xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                      <div 
                        className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-emerald-600/30 to-teal-700/40"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpolygon points='20 0 40 20 20 40 0 20'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-green-400/20 backdrop-blur-md border border-green-400/30 flex items-center justify-center">
                        <TreePine className="w-4 h-4 text-green-400" />
                      </div>

                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="inline-block px-2 py-0.5 rounded-full bg-green-400/20 backdrop-blur-md border border-green-400/30 text-green-400 text-xs font-medium mb-2">
                          CONSERVACIÓN
                        </div>
                        <h4 className="text-white font-bold text-sm leading-tight mb-1">
                          Blockchain para Certificación de Carbono Neutral
                        </h4>
                        <p className="text-white/60 text-xs">Hace 4 horas</p>
                      </div>
                    </div>
                  </div>

                  <div className="group cursor-pointer">
                    <div className="relative h-36 rounded-xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                      <div 
                        className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-600/30 to-red-700/40"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M15 0L30 15L15 30L0 15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-purple-400/20 backdrop-blur-md border border-purple-400/30 flex items-center justify-center">
                        <Waves className="w-4 h-4 text-purple-400" />
                      </div>

                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="inline-block px-2 py-0.5 rounded-full bg-purple-400/20 backdrop-blur-md border border-purple-400/30 text-purple-400 text-xs font-medium mb-2">
                          INNOVACIÓN
                        </div>
                        <h4 className="text-white font-bold text-sm leading-tight mb-1">
                          Drones Solares Monitorean Biodiversidad Marina
                        </h4>
                        <p className="text-white/60 text-xs">Hace 6 horas</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional News Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                <div className="group cursor-pointer">
                  <div className="relative h-32 rounded-lg overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/8 to-white/3 border border-white/15 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/15 via-yellow-600/20 to-red-700/25" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    
                    <div className="absolute bottom-2 left-2 right-2">
                      <h5 className="text-white font-medium text-xs leading-tight mb-1">
                        Energía Solar en Ecolodges: +300% Eficiencia
                      </h5>
                      <p className="text-white/50 text-xs">Hace 8 horas</p>
                    </div>
                  </div>
                </div>

                <div className="group cursor-pointer">
                  <div className="relative h-32 rounded-lg overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/8 to-white/3 border border-white/15 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/15 via-cyan-600/20 to-blue-700/25" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    
                    <div className="absolute bottom-2 left-2 right-2">
                      <h5 className="text-white font-medium text-xs leading-tight mb-1">
                        Apps de Realidad Aumentada para Educación Ambiental
                      </h5>
                      <p className="text-white/50 text-xs">Hace 10 horas</p>
                    </div>
                  </div>
                </div>

                <div className="group cursor-pointer">
                  <div className="relative h-32 rounded-lg overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/8 to-white/3 border border-white/15 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/15 via-purple-600/20 to-pink-700/25" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    
                    <div className="absolute bottom-2 left-2 right-2">
                      <h5 className="text-white font-medium text-xs leading-tight mb-1">
                        Sensores IoT Predicen Cambios Climáticos Locales
                      </h5>
                      <p className="text-white/50 text-xs">Hace 12 horas</p>
                    </div>
                  </div>
                </div>

                <div className="group cursor-pointer">
                  <div className="relative h-32 rounded-lg overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/8 to-white/3 border border-white/15 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-green-600/20 to-lime-700/25" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    
                    <div className="absolute bottom-2 left-2 right-2">
                      <h5 className="text-white font-medium text-xs leading-tight mb-1">
                        Biomateriales Revolucionan Construcción Sostenible
                      </h5>
                      <p className="text-white/50 text-xs">Hace 1 día</p>
                    </div>
                  </div>
                </div>
              </div>
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
        <div className="absolute inset-0 md:left-60 left-0">
          <InteractiveMap />
        </div>

        {/* Desktop Sidebar */}
        <DesktopSidebar />

        {/* Mobile Header */}
        <MobileHeader />

        {/* Mobile Overlay */}
        {isMobileSidebarExpanded && (
          <div 
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileSidebarExpanded(false)}
          />
        )}
        
        {/* Top green bar for map page */}
        <header className="absolute top-0 right-0 md:left-60 left-0 bg-green-600 border-b border-green-700 shadow-lg px-3 md:px-6 py-3 md:py-4 z-40 backdrop-blur-md bg-green-600/95 md:top-0 top-16">
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
      
      {/* Desktop Sidebar */}
      <DesktopSidebar />

      {/* Mobile Header */}
      <MobileHeader />

      {/* Mobile Overlay */}
      {isMobileSidebarExpanded && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileSidebarExpanded(false)}
        />
      )}
      
      {/* Top green bar for all pages */}
      <header className="absolute top-0 right-0 md:left-60 left-0 bg-green-600 border-b border-green-700 shadow-lg px-3 md:px-6 py-3 md:py-4 z-40 backdrop-blur-md bg-green-600/95 md:top-0 top-16">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-white tracking-wide hidden sm:block">
              {(() => {
                // Find the active section in main menu or subcategories
                for (const item of menuStructure) {
                  if (item.id === activeSection) {
                    return item.label;
                  }
                  if (item.subcategories) {
                    const subItem = item.subcategories.find(sub => sub.id === activeSection);
                    if (subItem) {
                      return subItem.label;
                    }
                  }
                }
                return "Portal Empresas";
              })()}
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
      <main className="absolute right-0 bottom-0 md:left-60 left-0 bg-black/40 backdrop-blur-sm p-6 overflow-y-auto md:top-20 top-32">
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