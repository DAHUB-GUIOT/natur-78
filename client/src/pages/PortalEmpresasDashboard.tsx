import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Map, Building2, Star, MessageCircle, Settings, ShieldCheck, Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InteractiveMap } from "@/components/dashboard/InteractiveMap";
import ExperienceForm from "@/components/dashboard/ExperienceForm";
import TwitterProfileSection from "@/components/profile/TwitterProfileSection";
import { SimpleChat } from "@/components/messaging/SimpleChat";
import AdaptiveSidebar from "@/components/portal/AdaptiveSidebar";
import ContentOverlay from "@/components/portal/ContentOverlay";
import NavigationBreadcrumb from "@/components/portal/NavigationBreadcrumb";

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

  // Content rendering function
  const renderContent = () => {
    switch (activeSection) {
      case "empresas":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-gasoek text-[var(--color-text)] uppercase tracking-wider">
                Directorio Empresarial
              </h2>
              <Badge className="bg-[var(--color-accent)]/20 text-[var(--color-accent)]">
                {typedDirectoryUsers.length} empresas
              </Badge>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {typedDirectoryUsers.map((company: any) => (
                <div
                  key={company.id}
                  className="bg-[var(--color-surface)]/90 backdrop-blur-sm border border-[var(--color-border)] rounded-lg p-6 hover:shadow-lg transition-all duration-200"
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-[var(--color-accent)]/20 rounded-lg flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-[var(--color-accent)]" />
                      </div>
                      <div>
                        <h3 className="font-gasoek text-[var(--color-text)] uppercase tracking-wide">
                          {company.companyName || `${company.firstName} ${company.lastName}`}
                        </h3>
                        <p className="text-sm text-[var(--color-text)]/60 font-jakarta">
                          {company.category}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-[var(--color-text)]/80 font-jakarta line-clamp-2">
                      {company.description || 'Empresa comprometida con el turismo sostenible'}
                    </p>
                    
                    <div className="flex justify-between items-center pt-2">
                      <Badge className="bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs">
                        {company.location || 'Bogotá'}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-[var(--color-accent)] border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/10"
                      >
                        Ver perfil
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "experiencias":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-gasoek text-[var(--color-text)] uppercase tracking-wider">
                Gestión de Experiencias
              </h2>
              <Button
                onClick={() => setShowExperienceForm(true)}
                className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-black font-jakarta"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nueva Experiencia
              </Button>
            </div>

            <div className="bg-[var(--color-surface)]/50 backdrop-blur-sm border border-[var(--color-border)] rounded-lg p-8 text-center">
              <Star className="w-16 h-16 text-[var(--color-accent)] mx-auto mb-4" />
              <h3 className="text-xl font-gasoek text-[var(--color-text)] mb-2 uppercase tracking-wide">
                Crea tu primera experiencia
              </h3>
              <p className="text-[var(--color-text)]/60 font-jakarta mb-6">
                Comparte tus ofertas turísticas con viajeros conscientes
              </p>
              <Button
                onClick={() => setShowExperienceForm(true)}
                className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-black font-jakarta"
              >
                Comenzar
              </Button>
            </div>
          </div>
        );

      case "mensajes":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-gasoek text-[var(--color-text)] uppercase tracking-wider">
              Centro de Mensajes
            </h2>
            <div className="h-[500px]">
              <SimpleChat />
            </div>
          </div>
        );

      case "ajustes":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-gasoek text-[var(--color-text)] uppercase tracking-wider">
              Configuración
            </h2>
            <div className="max-w-2xl">
              <TwitterProfileSection />
            </div>
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
    <div className="h-screen w-full relative overflow-hidden bg-[var(--color-bg)]">
      {/* Always-visible Interactive Map */}
      <div className="absolute inset-0 z-0">
        <InteractiveMap />
      </div>

      {/* Adaptive Sidebar */}
      <AdaptiveSidebar
        activeSection={activeSection}
        setActiveSection={handleSectionChange}
        user={user}
        notificationCount={3}
        messageCount={2}
        isMapView={isMapContext}
        onSearchFocus={() => {
          // Handle search focus - could expand search overlay
        }}
      />

      {/* Content Area with Intelligent Positioning */}
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
          {/* Navigation Breadcrumb */}
          <NavigationBreadcrumb
            items={breadcrumbPath}
            onNavigate={handleSectionChange}
            onBack={navigationHistory.length > 1 ? handleBack : undefined}
            showMapContext={true}
            mapLocation="Bogotá, Colombia"
            contextualActions={
              <div className="flex items-center space-x-2">
                {activeSection === 'experiencias' && (
                  <Button
                    size="sm"
                    onClick={() => setShowExperienceForm(true)}
                    className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-black font-jakarta"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Nueva Experiencia
                  </Button>
                )}
              </div>
            }
          />

          {/* Dynamic Content Rendering */}
          <div className="flex-1 overflow-auto p-6">
            {renderContent()}
          </div>
        </ContentOverlay>
      )}

      {/* Floating Action Elements for Map View */}
      {activeSection === 'mapa' && (
        <div className="absolute bottom-6 right-6 z-30 flex flex-col space-y-3">
          <Button
            onClick={() => setShowExperienceForm(true)}
            className="w-14 h-14 rounded-full bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-black shadow-2xl"
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
    </div>
  );
};

export default PortalEmpresasDashboard;