
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { BadgesCard } from "@/components/profile/BadgesCard";
import { PersonalInfoCard } from "@/components/profile/PersonalInfoCard";
import { ModernActivityTimeline } from "@/components/profile/ModernActivityTimeline";
import { ContentTab } from "@/components/profile/ContentTab";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !user) {
      navigate('/registro');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="w-full h-[300px] bg-gradient-to-r from-[#222408]/50 to-[#2C2F0A]/50 animate-pulse rounded-lg mb-4"></div>
        <div className="w-full h-[200px] bg-gradient-to-r from-[#222408]/50 to-[#2C2F0A]/50 animate-pulse rounded-lg"></div>
      </div>
    );
  }

  if (!user) {
    // This should not be shown as we redirect, but just in case
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-gasoek text-[#EDFF60] mb-4">Acceso restringido</h2>
          <p className="text-[#FCF8EE] mb-6">Necesitas iniciar sesión para ver tu perfil</p>
          <Button onClick={() => navigate('/registro')} className="bg-[#EDFF60] text-[#222408] hover:bg-[#CEDD9F]">
            Registrarse
          </Button>
        </div>
      </div>
    );
  }

  // Mock data for the components while user profile is being loaded
  const mockStats = [
    { label: "Eventos", value: 6 },
    { label: "Conexiones", value: 45 },
    { label: "Puntos", value: 350 }
  ];
  
  const mockBadges = [
    { name: "Primeros pasos", description: "Has completado tu perfil", icon: "star" },
    { name: "Eco-amigable", description: "Comprometido con la sostenibilidad", icon: "leaf" },
    { name: "Networker", description: "Has conectado con 10+ personas", icon: "users" }
  ];
  
  // Mock profile data
  const profileData = {
    name: user?.email?.split('@')[0] || "Usuario",
    email: user?.email,
    userCategory: "attendee",
    subcategory: "general"
  };

  return (
    <div className="p-4 md:p-6">
      <ProfileHeader />
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3 space-y-6">
          <ProfileStats stats={mockStats} />
          <BadgesCard badges={mockBadges} />
          <PersonalInfoCard profileData={profileData} userCategory="attendee" />
        </div>
        
        <div className="lg:w-2/3">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-[#FCF8EE]/10 mb-6">
              <TabsTrigger value="overview" className="data-[state=active]:bg-[#EDFF60] data-[state=active]:text-[#222408]">
                Resumen
              </TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-[#EDFF60] data-[state=active]:text-[#222408]">
                Actividad
              </TabsTrigger>
              <TabsTrigger value="content" className="data-[state=active]:bg-[#EDFF60] data-[state=active]:text-[#222408]">
                Contenido
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-[#EDFF60] data-[state=active]:text-[#222408]">
                Ajustes
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-[#EDFF60]/10 to-[#EDFF60]/5 p-6 rounded-lg border border-[#EDFF60]/20">
                  <h3 className="text-xl font-semibold text-[#EDFF60] mb-2">¡Bienvenido a tu perfil!</h3>
                  <p className="text-[#FCF8EE]/90 mb-4">
                    Estamos preparando todas las funcionalidades de la plataforma para el evento. 
                    Pronto podrás conectar con otros participantes, inscribirte en actividades y mucho más.
                  </p>
                  <Button className="bg-[#EDFF60] text-[#222408] hover:bg-[#CEDD9F]">
                    Explorar la plataforma
                  </Button>
                </div>
                
                <ModernActivityTimeline userCategory="attendee" />
              </div>
            </TabsContent>
            
            <TabsContent value="activity">
              <ModernActivityTimeline extended userCategory="attendee" />
            </TabsContent>
            
            <TabsContent value="content">
              <ContentTab userCategory="attendee" />
            </TabsContent>
            
            <TabsContent value="settings">
              <div className="bg-[#FCF8EE]/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#EDFF60] mb-4">Ajustes de cuenta</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-[#FCF8EE] font-medium mb-2">Email</h4>
                    <p className="text-[#FCF8EE]/70">{user?.email}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-[#FCF8EE] font-medium mb-2">Cerrar sesión</h4>
                    <Button 
                      variant="destructive"
                      onClick={() => {
                        // Sign out functionality will be added later
                      }}
                    >
                      Cerrar sesión
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
