import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Settings, Bell, Shield, Eye, Globe, Smartphone, 
  Save, Key, LogOut, Trash2, Download, Upload,
  User, Building2, Mail, MapPin, Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function ConfigPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const { signOut } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch current user
  const { data: currentUser, isLoading } = useQuery({
    queryKey: ['/api/auth/me'],
    staleTime: 10 * 60 * 1000,
  }) as { data: any; isLoading: boolean };

  // Form states for different sections
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phone: "",
    description: "",
    website: "",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    messageNotifications: true,
    experienceUpdates: true,
    marketingEmails: false,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showContactInfo: true,
    showLocation: true,
    allowMessages: true,
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest('/api/users/profile', {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
      toast({
        title: "Perfil actualizado",
        description: "Los cambios se han guardado correctamente.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudieron guardar los cambios.",
        variant: "destructive",
      });
    }
  });

  // Load user data into form when available
  useState(() => {
    if (currentUser) {
      setProfileData({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        companyName: currentUser.companyName || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        description: currentUser.description || "",
        website: currentUser.website || "",
      });
    }
  });

  const sections = [
    { id: "profile", label: "Perfil", icon: User },
    { id: "business", label: "Empresa", icon: Building2 },
    { id: "notifications", label: "Notificaciones", icon: Bell },
    { id: "privacy", label: "Privacidad", icon: Shield },
    { id: "account", label: "Cuenta", icon: Settings },
  ];

  const handleSaveProfile = () => {
    updateProfileMutation.mutate(profileData);
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Información Personal</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="text-white/80">Nombre</Label>
            <Input
              id="firstName"
              value={profileData.firstName}
              onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
              className="bg-white/10 border-white/20 text-white"
              data-testid="input-first-name"
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-white/80">Apellido</Label>
            <Input
              id="lastName"
              value={profileData.lastName}
              onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
              className="bg-white/10 border-white/20 text-white"
              data-testid="input-last-name"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-white/80">Email</Label>
            <Input
              id="email"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
              className="bg-white/10 border-white/20 text-white"
              data-testid="input-email"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-white/80">Teléfono</Label>
            <Input
              id="phone"
              value={profileData.phone}
              onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
              className="bg-white/10 border-white/20 text-white"
              data-testid="input-phone"
            />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="description" className="text-white/80">Descripción</Label>
        <Textarea
          id="description"
          value={profileData.description}
          onChange={(e) => setProfileData(prev => ({ ...prev, description: e.target.value }))}
          className="bg-white/10 border-white/20 text-white"
          rows={4}
          data-testid="textarea-description"
        />
      </div>

      <Button 
        onClick={handleSaveProfile}
        disabled={updateProfileMutation.isPending}
        className="bg-green-600/80 hover:bg-green-600 text-white"
        data-testid="button-save-profile"
      >
        <Save className="w-4 h-4 mr-2" />
        {updateProfileMutation.isPending ? "Guardando..." : "Guardar Cambios"}
      </Button>
    </div>
  );

  const renderBusinessSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Información de la Empresa</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="companyName" className="text-white/80">Nombre de la Empresa</Label>
            <Input
              id="companyName"
              value={profileData.companyName}
              onChange={(e) => setProfileData(prev => ({ ...prev, companyName: e.target.value }))}
              className="bg-white/10 border-white/20 text-white"
              data-testid="input-company-name"
            />
          </div>
          <div>
            <Label htmlFor="website" className="text-white/80">Sitio Web</Label>
            <Input
              id="website"
              type="url"
              value={profileData.website}
              onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
              className="bg-white/10 border-white/20 text-white"
              placeholder="https://ejemplo.com"
              data-testid="input-website"
            />
          </div>
        </div>
      </div>

      <Button 
        onClick={handleSaveProfile}
        disabled={updateProfileMutation.isPending}
        className="bg-green-600/80 hover:bg-green-600 text-white"
        data-testid="button-save-business"
      >
        <Save className="w-4 h-4 mr-2" />
        Guardar Cambios
      </Button>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white mb-4">Preferencias de Notificación</h3>
      
      <div className="space-y-4">
        {[
          { key: "emailNotifications", label: "Notificaciones por email", description: "Recibir notificaciones importantes por correo" },
          { key: "pushNotifications", label: "Notificaciones push", description: "Notificaciones en tiempo real en el navegador" },
          { key: "messageNotifications", label: "Nuevos mensajes", description: "Notificar cuando recibas nuevos mensajes" },
          { key: "experienceUpdates", label: "Actualizaciones de experiencias", description: "Notificar sobre cambios en experiencias" },
          { key: "marketingEmails", label: "Emails de marketing", description: "Recibir promociones y novedades" },
        ].map((setting) => (
          <div key={setting.key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
            <div>
              <h4 className="text-white font-medium">{setting.label}</h4>
              <p className="text-white/60 text-sm">{setting.description}</p>
            </div>
            <Switch
              checked={notificationSettings[setting.key as keyof typeof notificationSettings]}
              onCheckedChange={(checked) => 
                setNotificationSettings(prev => ({ ...prev, [setting.key]: checked }))
              }
              data-testid={`switch-${setting.key}`}
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white mb-4">Configuración de Privacidad</h3>
      
      <div className="space-y-4">
        {[
          { key: "showContactInfo", label: "Mostrar información de contacto", description: "Permitir que otros vean tu email y teléfono" },
          { key: "showLocation", label: "Mostrar ubicación", description: "Mostrar tu ciudad y país en el perfil" },
          { key: "allowMessages", label: "Permitir mensajes", description: "Permitir que otros usuarios te envíen mensajes" },
        ].map((setting) => (
          <div key={setting.key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
            <div>
              <h4 className="text-white font-medium">{setting.label}</h4>
              <p className="text-white/60 text-sm">{setting.description}</p>
            </div>
            <Switch
              checked={privacySettings[setting.key as keyof typeof privacySettings]}
              onCheckedChange={(checked) => 
                setPrivacySettings(prev => ({ ...prev, [setting.key]: checked }))
              }
              data-testid={`switch-${setting.key}`}
            />
          </div>
        ))}
      </div>

      <div className="p-4 bg-yellow-600/10 border border-yellow-500/20 rounded-lg">
        <h4 className="text-yellow-400 font-medium mb-2">Visibilidad del Perfil</h4>
        <p className="text-white/70 text-sm mb-3">Controla quién puede ver tu perfil completo</p>
        <div className="space-y-2">
          {[
            { value: "public", label: "Público - Visible para todos" },
            { value: "network", label: "Red - Solo mi red de contactos" },
            { value: "private", label: "Privado - Solo yo" },
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="profileVisibility"
                value={option.value}
                checked={privacySettings.profileVisibility === option.value}
                onChange={(e) => setPrivacySettings(prev => ({ ...prev, profileVisibility: e.target.value }))}
                className="text-green-500"
              />
              <span className="text-white/80 text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAccountSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white mb-4">Configuración de Cuenta</h3>
      
      <div className="space-y-4">
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">Cambiar Contraseña</h4>
                <p className="text-white/60 text-sm">Actualiza tu contraseña por seguridad</p>
              </div>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Key className="w-4 h-4 mr-2" />
                Cambiar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">Exportar Datos</h4>
                <p className="text-white/60 text-sm">Descarga una copia de tus datos</p>
              </div>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Separator className="bg-white/20" />

        <Card className="bg-red-600/10 border-red-500/20">
          <CardContent className="p-4">
            <h4 className="text-red-400 font-medium mb-2">Zona de Peligro</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Cerrar Sesión</p>
                  <p className="text-white/60 text-sm">Cerrar sesión en este dispositivo</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={signOut}
                  className="bg-orange-600/20 border-orange-500/30 text-orange-400 hover:bg-orange-600/30"
                  data-testid="button-sign-out"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Cerrar Sesión
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Eliminar Cuenta</p>
                  <p className="text-white/60 text-sm">Elimina permanentemente tu cuenta</p>
                </div>
                <Button 
                  variant="outline" 
                  className="bg-red-600/20 border-red-500/30 text-red-400 hover:bg-red-600/30"
                  data-testid="button-delete-account"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Eliminar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "profile": return renderProfileSection();
      case "business": return renderBusinessSection();
      case "notifications": return renderNotificationsSection();
      case "privacy": return renderPrivacySection();
      case "account": return renderAccountSection();
      default: return renderProfileSection();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900 p-4 lg:p-6">
        <Card className="bg-white/5 backdrop-blur-xl border-white/10">
          <CardContent className="p-8">
            <div className="animate-pulse">
              <div className="h-8 bg-white/20 rounded mb-4"></div>
              <div className="h-4 bg-white/20 rounded mb-2"></div>
              <div className="h-4 bg-white/20 rounded w-3/4"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900 p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6">
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardContent className="p-4 lg:p-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Configuración</h1>
            <p className="text-white/70">Gestiona tu perfil y preferencias de cuenta</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <Card className="lg:w-64 bg-white/5 backdrop-blur-xl border-white/10">
          <CardContent className="p-4">
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left ${
                      activeSection === section.id
                        ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                    data-testid={`nav-${section.id}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </CardContent>
        </Card>

        {/* Settings Content */}
        <Card className="flex-1 bg-white/10 backdrop-blur-xl border-white/20">
          <CardContent className="p-6">
            {renderContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}