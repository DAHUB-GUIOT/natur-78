import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Map, Building2, Star, MessageCircle, Settings, ShieldCheck, Plus,
  Sun, Leaf, Zap, Globe, Users, TrendingUp, Calendar, Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InteractiveMap } from "@/components/dashboard/InteractiveMap";
import ExperienceForm from "@/components/dashboard/ExperienceForm";
import TwitterProfileSection from "@/components/profile/TwitterProfileSection";
import { SimpleChat } from "@/components/messaging/SimpleChat";
import AdaptiveSidebar from "@/components/portal/AdaptiveSidebar";
import TopNavigationMenu from "@/components/portal/TopNavigationMenu";
import ContentOverlay from "@/components/portal/ContentOverlay";
import NavigationBreadcrumb from "@/components/portal/NavigationBreadcrumb";
import { GlassmorphismLayout, GlassBlock } from "@/components/layout/GlassmorphismLayout";
import SolarBreadcrumb from "@/components/layout/SolarBreadcrumb";
import EcoGrid from "@/components/layout/EcoGrid";

const PortalEmpresasDashboard = () => {
  // Enhanced state management for intelligent navigation
  const [activeSection, setActiveSection] = useState("mapa");
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [navigationHistory, setNavigationHistory] = useState<string[]>(["mapa"]);
  const [contentPosition, setContentPosition] = useState<'right' | 'left' | 'center' | 'floating'>('right');
  const [isMapContext, setIsMapContext] = useState(true);
  const [breadcrumbPath, setBreadcrumbPath] = useState<Array<{id: string, label: string, isActive?: boolean}>>([
    { id: 'mapa', label: 'Explorar', isActive: true }
  ]);

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

  // Intelligent navigation system
  const handleSectionChange = (newSection: string) => {
    // Update navigation history
    setNavigationHistory(prev => {
      const updated = [...prev, newSection];
      return updated.slice(-5);
    });

    // Update breadcrumb path
    const sectionLabels: Record<string, string> = {
      'mapa': 'Explorar',
      'empresas': 'Directorio',
      'experiencias': 'Experiencias',
      'mensajes': 'Mensajes',
      'ajustes': 'Configuración',
      'admin': 'Administración'
    };

    setBreadcrumbPath(prev => {
      const newPath = [...prev];
      newPath[newPath.length - 1] = { ...newPath[newPath.length - 1], isActive: false };
      newPath.push({ 
        id: newSection, 
        label: sectionLabels[newSection] || newSection, 
        isActive: true 
      });
      return newPath.slice(-3);
    });

    // Set map context based on section
    setIsMapContext(newSection === 'mapa');
    
    // Smart content positioning
    if (newSection === 'mapa') {
      setContentPosition('floating');
    } else if (newSection === 'mensajes') {
      setContentPosition('center');
    } else {
      setContentPosition('right');
    }

    setActiveSection(newSection);
  };

  const handleBack = () => {
    if (navigationHistory.length > 1) {
      const prevHistory = navigationHistory.slice(0, -1);
      const prevSection = prevHistory[prevHistory.length - 1];
      setNavigationHistory(prevHistory);
      setActiveSection(prevSection);
      
      setBreadcrumbPath(prev => prev.slice(0, -1));
      setIsMapContext(prevSection === 'mapa');
    }
  };

  const getContentTitle = () => {
    const titles: Record<string, string> = {
      'mapa': 'Explorador de Territorio',
      'empresas': 'Directorio Empresarial',
      'experiencias': 'Gestión de Experiencias',
      'mensajes': 'Centro de Comunicación',
      'ajustes': 'Configuración de Cuenta',
      'admin': 'Panel Administrativo'
    };
    return titles[activeSection] || 'Panel Principal';
  };

  // Enhanced content rendering with glassmorphism
  const renderContent = () => {
    switch (activeSection) {
      case "empresas":
        return (
          <div className="space-y-8">
            {/* Header with Solar Breadcrumb */}
            <SolarBreadcrumb 
              items={[
                { label: 'Portal', icon: <Building2 size={16} /> },
                { label: 'Directorio Empresarial', current: true }
              ]} 
            />

            {/* Glassmorphism Grid Layout */}
            <EcoGrid>
              {/* Directory Overview */}
              <GlassBlock size="medium" icon={<Globe size={20} />}>
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-title mb-2">Red Empresarial</h3>
                    <p className="text-body">Conecta con {typedDirectoryUsers.length} empresas sostenibles</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge className="glass-accent px-3 py-1">
                      {typedDirectoryUsers.length} activas
                    </Badge>
                    <TrendingUp className="text-green-400" size={24} />
                  </div>
                </div>
              </GlassBlock>

              {/* Quick Actions */}
              <GlassBlock size="medium" icon={<Heart size={20} />}>
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-title mb-2">Impacto Colectivo</h3>
                    <p className="text-body">Juntos transformamos el turismo</p>
                  </div>
                  <Button className="btn-primary w-full">
                    Ver Métricas
                  </Button>
                </div>
              </GlassBlock>

              {/* Featured Companies */}
              {typedDirectoryUsers.slice(0, 6).map((company: any, index: number) => (
                <GlassBlock 
                  key={company.id} 
                  size="small" 
                  icon={<Building2 size={16} />}
                  delay={index + 2}
                >
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <h4 className="text-subtitle mb-1 truncate">
                        {company.companyName || `${company.firstName} ${company.lastName}`}
                      </h4>
                      <p className="text-caption mb-2">{company.category}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className="text-xs bg-white/10">
                        {company.location || 'Bogotá'}
                      </Badge>
                      <Button size="sm" className="btn-secondary text-xs">
                        Ver
                      </Button>
                    </div>
                  </div>
                </GlassBlock>
              ))}
            </EcoGrid>
          </div>
        );

      case "experiencias":
        return (
          <div className="space-y-8">
            {/* Solar Breadcrumb */}
            <SolarBreadcrumb 
              items={[
                { label: 'Portal', icon: <Building2 size={16} /> },
                { label: 'Experiencias', current: true, icon: <Star size={16} /> }
              ]} 
            />

            {/* Glassmorphism Experience Grid */}
            <EcoGrid>
              {/* Create New Experience */}
              <GlassBlock size="full" icon={<Plus size={24} />} className="solar-glow">
                <div className="text-center">
                  <div className="mb-6">
                    <Star className="w-16 h-16 text-yellow-400 mx-auto mb-4 float-element" />
                    <h3 className="text-hero mb-2">Crea tu Experiencia</h3>
                    <p className="text-subtitle">Comparte ofertas turísticas sostenibles con viajeros conscientes</p>
                  </div>
                  <Button
                    onClick={() => setShowExperienceForm(true)}
                    className="btn-accent px-8 py-3 text-lg glow-on-hover"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Nueva Experiencia
                  </Button>
                </div>
              </GlassBlock>

              {/* Experience Stats */}
              <GlassBlock size="medium" icon={<TrendingUp size={20} />}>
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-title mb-2">Rendimiento</h3>
                    <p className="text-body">Análisis de tus experiencias</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">0</div>
                      <div className="text-caption">Publicadas</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">0</div>
                      <div className="text-caption">Reservas</div>
                    </div>
                  </div>
                </div>
              </GlassBlock>

              {/* Experience Categories */}
              <GlassBlock size="medium" icon={<Leaf size={20} />}>
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-title mb-2">Categorías Populares</h3>
                    <p className="text-body">Tendencias en turismo sostenible</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-caption">Ecoturismo</span>
                      <div className="w-12 h-2 bg-green-400/30 rounded"></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-caption">Cultura Local</span>
                      <div className="w-8 h-2 bg-yellow-400/30 rounded"></div>
                    </div>
                  </div>
                </div>
              </GlassBlock>
            </EcoGrid>
          </div>
        );

      case "mensajes":
        return (
          <div className="space-y-8">
            <SolarBreadcrumb 
              items={[
                { label: 'Portal', icon: <Building2 size={16} /> },
                { label: 'Mensajes', current: true, icon: <MessageCircle size={16} /> }
              ]} 
            />
            
            <EcoGrid>
              <GlassBlock size="full" icon={<MessageCircle size={24} />}>
                <div className="h-[400px]">
                  <SimpleChat />
                </div>
              </GlassBlock>
            </EcoGrid>
          </div>
        );

      case "ajustes":
        return (
          <div className="space-y-8">
            <SolarBreadcrumb 
              items={[
                { label: 'Portal', icon: <Building2 size={16} /> },
                { label: 'Configuración', current: true, icon: <Settings size={16} /> }
              ]} 
            />
            
            <EcoGrid>
              <GlassBlock size="full" icon={<Settings size={24} />}>
                <div className="max-w-2xl">
                  <TwitterProfileSection />
                </div>
              </GlassBlock>
            </EcoGrid>
          </div>
        );

      case "mapa":
        return (
          <div className="space-y-8">
            <SolarBreadcrumb 
              items={[
                { label: 'Portal', icon: <Building2 size={16} /> },
                { label: 'Explorador', current: true, icon: <Map size={16} /> }
              ]} 
            />
            
            <EcoGrid>
              {/* Welcome Dashboard */}
              <GlassBlock size="medium" icon={<Sun size={20} />} className="solar-glow">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-title mb-2">Bienvenido/a</h3>
                    <p className="text-body">Explora el ecosistema sostenible</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-caption">Sistema activo</span>
                  </div>
                </div>
              </GlassBlock>

              {/* Quick Stats */}
              <GlassBlock size="medium" icon={<Users size={20} />}>
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-title mb-2">Comunidad</h3>
                    <p className="text-body">{typedDirectoryUsers.length} empresas conectadas</p>
                  </div>
                  <Button className="btn-primary w-full" onClick={() => handleSectionChange('empresas')}>
                    Ver Directorio
                  </Button>
                </div>
              </GlassBlock>

              {/* Calendar */}
              <GlassBlock size="medium" icon={<Calendar size={20} />}>
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-title mb-2">Festival NATUR</h3>
                    <p className="text-body">14-15 Noviembre 2025</p>
                  </div>
                  <Badge className="glass-accent px-3 py-1 w-fit">
                    Próximamente
                  </Badge>
                </div>
              </GlassBlock>

              {/* Experience CTA */}
              <GlassBlock size="medium" icon={<Star size={20} />} className="glow-on-hover">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-title mb-2">Crear Experiencia</h3>
                    <p className="text-body">Comparte tu oferta turística</p>
                  </div>
                  <Button className="btn-accent w-full" onClick={() => handleSectionChange('experiencias')}>
                    Comenzar
                  </Button>
                </div>
              </GlassBlock>
            </EcoGrid>
          </div>
        );

      default:
        return null;
    }
  };

  if (userLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[var(--color-bg)]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-[var(--color-accent)] animate-pulse rounded-lg mx-auto"></div>
          <p className="text-[var(--color-text)] font-jakarta">Cargando Portal Empresas...</p>
        </div>
      </div>
    );
  }

  return (
    <GlassmorphismLayout showEcoElements={true} backgroundVariant="forest">
      {/* Top Navigation Menu */}
      <TopNavigationMenu 
        user={user}
        notificationCount={3}
        onSearch={() => setContentPosition('center')}
        onLogout={() => window.location.href = '/api/logout'}
      />
      
      {/* Always-visible Interactive Map */}
      <div className="absolute inset-0 z-0">
        <InteractiveMap />
      </div>

      {/* Enhanced Adaptive Sidebar */}
      <AdaptiveSidebar
        activeSection={activeSection}
        setActiveSection={handleSectionChange}
        user={user}
        notificationCount={3}
        messageCount={2}
        isMapView={isMapContext}
        onSearchFocus={() => {
          // Handle search focus
        }}
      />

      {/* Glassmorphism Content Area */}
      {activeSection !== 'mapa' && (
        <ContentOverlay
          title={getContentTitle()}
          isMapView={isMapContext}
          defaultPosition={contentPosition}
          allowResize={true}
          allowMove={true}
          priority={activeSection === 'mensajes' ? 'high' : 'medium'}
          onClose={() => handleSectionChange('mapa')}
        >
          {/* Dynamic Content Rendering */}
          <div className="flex-1 overflow-auto p-6">
            {renderContent()}
          </div>
        </ContentOverlay>
      )}

      {/* Glassmorphism Dashboard for Map View */}
      {activeSection === 'mapa' && (
        <div className="absolute top-6 left-6 right-6 z-30 pointer-events-none">
          <div className="pointer-events-auto">
            <EcoGrid className="max-w-6xl">
              {/* Welcome Dashboard */}
              <GlassBlock size="medium" icon={<Sun size={20} />} className="solar-glow">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-title mb-2">Portal Empresas</h3>
                    <p className="text-body">Bienvenido/a {user?.firstName || 'Usuario'}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-caption">Sistema activo</span>
                  </div>
                </div>
              </GlassBlock>

              {/* Quick Actions */}
              <GlassBlock size="medium" icon={<Star size={20} />} className="glow-on-hover" interactive={true}>
                <div className="flex flex-col justify-between h-full" onClick={() => setShowExperienceForm(true)}>
                  <div>
                    <h3 className="text-title mb-2">Nueva Experiencia</h3>
                    <p className="text-body">Comparte tu oferta turística</p>
                  </div>
                  <Button className="btn-accent w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Crear
                  </Button>
                </div>
              </GlassBlock>

              {/* Community Stats */}
              <GlassBlock size="medium" icon={<Users size={20} />} interactive={true}>
                <div className="flex flex-col justify-between h-full" onClick={() => handleSectionChange('empresas')}>
                  <div>
                    <h3 className="text-title mb-2">Red de Empresas</h3>
                    <p className="text-body">{typedDirectoryUsers.length} empresas conectadas</p>
                  </div>
                  <Badge className="glass-accent px-3 py-1 w-fit">
                    Ver Directorio
                  </Badge>
                </div>
              </GlassBlock>

              {/* Festival Info */}
              <GlassBlock size="medium" icon={<Calendar size={20} />}>
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-title mb-2">Festival NATUR 2025</h3>
                    <p className="text-body">14-15 Noviembre • Bogotá</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-yellow-400/20 text-yellow-400 px-3 py-1">
                      Próximamente
                    </Badge>
                    <Heart className="text-green-400" size={20} />
                  </div>
                </div>
              </GlassBlock>
            </EcoGrid>
          </div>
        </div>
      )}

      {/* Floating Action Button for Mobile */}
      {activeSection === 'mapa' && (
        <div className="absolute bottom-6 right-6 z-40 md:hidden">
          <Button
            onClick={() => setShowExperienceForm(true)}
            className="w-14 h-14 rounded-full btn-accent shadow-2xl glow-on-hover"
            size="lg"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      )}

      {/* Experience Form Modal */}
      {showExperienceForm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-4xl max-h-[90vh] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-2xl overflow-hidden">
            <ExperienceForm onClose={() => setShowExperienceForm(false)} />
          </div>
        </div>
      )}
    </GlassmorphismLayout>
  );
};

export default PortalEmpresasDashboard;