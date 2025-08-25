import React, { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Settings, Bell, Shield, Eye, Globe, 
  Users, MessageCircle, Building2, MapPin, Palette,
  Moon, Sun, Volume2, VolumeX
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/contexts/AuthContext';

const ConfiguracionEmpresa = () => {
  const { signOut } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('account');
  
  // Configuration states
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
    newExperiences: true,
    messages: true,
    networkingRequests: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    contactInfoVisible: true,
    experiencesVisible: true,
    onlineStatus: true,
    lastSeen: false
  });

  const [preferences, setPreferences] = useState({
    language: 'es',
    timezone: 'America/Bogota',
    currency: 'COP',
    theme: 'dark',
    sounds: true
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };

  const handlePreferenceChange = (key: string, value: string | boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setLocation('/portal-empresas')}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Portal
              </Button>
              <h1 className="text-xl font-semibold text-white">Configuración</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-sm">
            <TabsTrigger value="account" className="text-white data-[state=active]:bg-green-600">
              <Settings className="w-4 h-4 mr-2" />
              Cuenta
            </TabsTrigger>
            <TabsTrigger value="notifications" className="text-white data-[state=active]:bg-green-600">
              <Bell className="w-4 h-4 mr-2" />
              Notificaciones
            </TabsTrigger>
            <TabsTrigger value="privacy" className="text-white data-[state=active]:bg-green-600">
              <Shield className="w-4 h-4 mr-2" />
              Privacidad
            </TabsTrigger>
            <TabsTrigger value="preferences" className="text-white data-[state=active]:bg-green-600">
              <Palette className="w-4 h-4 mr-2" />
              Preferencias
            </TabsTrigger>
          </TabsList>

          {/* Account Settings */}
          <TabsContent value="account">
            <div className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Building2 className="w-5 h-5 mr-2" />
                    Gestión de Cuenta
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">Editar Perfil</h4>
                      <p className="text-white/60 text-sm">Actualiza tu información empresarial</p>
                    </div>
                    <Button 
                      onClick={() => setLocation('/edit-profile')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Editar
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">Cambiar Contraseña</h4>
                      <p className="text-white/60 text-sm">Actualiza tu contraseña de acceso</p>
                    </div>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      Cambiar
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">Verificación de Cuenta</h4>
                      <p className="text-white/60 text-sm">Estado: Verificada ✓</p>
                    </div>
                    <Button variant="outline" className="border-green-500/30 text-green-400 hover:bg-green-500/10" disabled>
                      Verificado
                    </Button>
                  </div>

                  <Separator className="bg-white/20" />

                  {/* Portal Navigation */}
                  <div>
                    <h4 className="text-white font-medium mb-4">Navegación entre Portales</h4>
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
                        Portal Viajeros
                      </Button>
                    </div>
                    <p className="text-xs text-white/50 mt-3">
                      Usa el mismo usuario para acceder a ambos portales
                    </p>
                  </div>

                  <Separator className="bg-white/20" />

                  {/* Danger Zone */}
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <h4 className="text-red-400 font-medium mb-2">Zona de Peligro</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white/80">Cerrar Sesión</p>
                          <p className="text-white/50 text-sm">Cierra tu sesión actual</p>
                        </div>
                        <Button 
                          onClick={signOut}
                          variant="outline"
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                        >
                          Cerrar Sesión
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white/80">Desactivar Cuenta</p>
                          <p className="text-white/50 text-sm">Desactiva temporalmente tu perfil</p>
                        </div>
                        <Button 
                          variant="outline"
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                        >
                          Desactivar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Configuración de Notificaciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <Label htmlFor="email-notifications" className="text-white font-medium">
                        Notificaciones por Email
                      </Label>
                      <p className="text-white/60 text-sm">Recibe actualizaciones importantes por correo</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notifications.email}
                      onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <Label htmlFor="push-notifications" className="text-white font-medium">
                        Notificaciones Push
                      </Label>
                      <p className="text-white/60 text-sm">Notificaciones en tiempo real en el navegador</p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={notifications.push}
                      onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <Label htmlFor="marketing-notifications" className="text-white font-medium">
                        Comunicaciones de Marketing
                      </Label>
                      <p className="text-white/60 text-sm">Recibe información sobre eventos y novedades</p>
                    </div>
                    <Switch
                      id="marketing-notifications"
                      checked={notifications.marketing}
                      onCheckedChange={(checked) => handleNotificationChange('marketing', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <Label htmlFor="experience-notifications" className="text-white font-medium">
                        Nuevas Experiencias
                      </Label>
                      <p className="text-white/60 text-sm">Alertas cuando se publiquen experiencias relevantes</p>
                    </div>
                    <Switch
                      id="experience-notifications"
                      checked={notifications.newExperiences}
                      onCheckedChange={(checked) => handleNotificationChange('newExperiences', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <Label htmlFor="message-notifications" className="text-white font-medium">
                        Mensajes Directos
                      </Label>
                      <p className="text-white/60 text-sm">Notificaciones de nuevos mensajes</p>
                    </div>
                    <Switch
                      id="message-notifications"
                      checked={notifications.messages}
                      onCheckedChange={(checked) => handleNotificationChange('messages', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <Label htmlFor="networking-notifications" className="text-white font-medium">
                        Solicitudes de Networking
                      </Label>
                      <p className="text-white/60 text-sm">Nuevas conexiones y solicitudes de colaboración</p>
                    </div>
                    <Switch
                      id="networking-notifications"
                      checked={notifications.networkingRequests}
                      onCheckedChange={(checked) => handleNotificationChange('networkingRequests', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Configuración de Privacidad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <Label htmlFor="profile-visible" className="text-white font-medium">
                        Perfil Público
                      </Label>
                      <p className="text-white/60 text-sm">Tu perfil aparece en búsquedas y directorios</p>
                    </div>
                    <Switch
                      id="profile-visible"
                      checked={privacy.profileVisible}
                      onCheckedChange={(checked) => handlePrivacyChange('profileVisible', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <Label htmlFor="contact-visible" className="text-white font-medium">
                        Información de Contacto Visible
                      </Label>
                      <p className="text-white/60 text-sm">Otros usuarios pueden ver tu email y teléfono</p>
                    </div>
                    <Switch
                      id="contact-visible"
                      checked={privacy.contactInfoVisible}
                      onCheckedChange={(checked) => handlePrivacyChange('contactInfoVisible', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <Label htmlFor="experiences-visible" className="text-white font-medium">
                        Experiencias Públicas
                      </Label>
                      <p className="text-white/60 text-sm">Tus experiencias aparecen en el marketplace</p>
                    </div>
                    <Switch
                      id="experiences-visible"
                      checked={privacy.experiencesVisible}
                      onCheckedChange={(checked) => handlePrivacyChange('experiencesVisible', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <Label htmlFor="online-status" className="text-white font-medium">
                        Estado en Línea
                      </Label>
                      <p className="text-white/60 text-sm">Mostrar cuando estás activo en la plataforma</p>
                    </div>
                    <Switch
                      id="online-status"
                      checked={privacy.onlineStatus}
                      onCheckedChange={(checked) => handlePrivacyChange('onlineStatus', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <Label htmlFor="last-seen" className="text-white font-medium">
                        Última Conexión
                      </Label>
                      <p className="text-white/60 text-sm">Mostrar cuándo fue tu última actividad</p>
                    </div>
                    <Switch
                      id="last-seen"
                      checked={privacy.lastSeen}
                      onCheckedChange={(checked) => handlePrivacyChange('lastSeen', checked)}
                    />
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h4 className="text-blue-400 font-medium mb-2">Información de Privacidad</h4>
                  <p className="text-white/70 text-sm">
                    Tus datos están protegidos según las políticas de privacidad. 
                    Puedes controlar qué información es visible para otros usuarios y cómo te contactan.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Settings */}
          <TabsContent value="preferences">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Preferencias de la Aplicación
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="language" className="text-white">Idioma</Label>
                    <Select value={preferences.language} onValueChange={(value) => handlePreferenceChange('language', value)}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-white/20">
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="pt">Português</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="timezone" className="text-white">Zona Horaria</Label>
                    <Select value={preferences.timezone} onValueChange={(value) => handlePreferenceChange('timezone', value)}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-white/20">
                        <SelectItem value="America/Bogota">Bogotá (UTC-5)</SelectItem>
                        <SelectItem value="America/Mexico_City">Ciudad de México (UTC-6)</SelectItem>
                        <SelectItem value="America/Argentina/Buenos_Aires">Buenos Aires (UTC-3)</SelectItem>
                        <SelectItem value="America/Sao_Paulo">São Paulo (UTC-3)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="currency" className="text-white">Moneda</Label>
                    <Select value={preferences.currency} onValueChange={(value) => handlePreferenceChange('currency', value)}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-white/20">
                        <SelectItem value="COP">Peso Colombiano (COP)</SelectItem>
                        <SelectItem value="USD">Dólar Americano (USD)</SelectItem>
                        <SelectItem value="EUR">Euro (EUR)</SelectItem>
                        <SelectItem value="MXN">Peso Mexicano (MXN)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="theme" className="text-white">Tema</Label>
                    <Select value={preferences.theme} onValueChange={(value) => handlePreferenceChange('theme', value)}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-white/20">
                        <SelectItem value="dark">Oscuro</SelectItem>
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="auto">Automático</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {preferences.sounds ? (
                      <Volume2 className="w-5 h-5 text-green-400" />
                    ) : (
                      <VolumeX className="w-5 h-5 text-red-400" />
                    )}
                    <div>
                      <Label htmlFor="sounds" className="text-white font-medium">
                        Sonidos de Notificación
                      </Label>
                      <p className="text-white/60 text-sm">Reproducir sonidos para notificaciones</p>
                    </div>
                  </div>
                  <Switch
                    id="sounds"
                    checked={preferences.sounds}
                    onCheckedChange={(checked) => handlePreferenceChange('sounds', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ConfiguracionEmpresa;