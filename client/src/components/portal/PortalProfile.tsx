import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  MapPin, Globe, Phone, Mail, Calendar, Users, Award, 
  Edit, Save, X, Twitter, Facebook, Linkedin, Instagram,
  Building2, Star, Heart, MessageCircle, Share, Settings,
  TrendingUp, Activity, Eye, CheckCircle, Camera, Shield,
  Briefcase, Target
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface UserProfile {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  phone?: string;
  website?: string;
  description?: string;
  location?: string;
  userCategory?: string;
  subcategory?: string;
  profileImage?: string;
  coverImage?: string;
  socialMedia?: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
}

interface PortalProfileProps {
  userId?: number;
}

export const PortalProfile = ({ userId }: PortalProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get user data from localStorage if no userId provided
  const getCurrentUser = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        return null;
      }
    }
    return null;
  };

  const currentUser = getCurrentUser();
  const targetUserId = userId || currentUser?.id;

  // Fetch user profile data
  const { data: user, isLoading, error } = useQuery({
    queryKey: [`/api/users/${targetUserId}`],
    enabled: !!targetUserId,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: Partial<UserProfile>) => {
      return apiRequest(`/api/users/${targetUserId}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Perfil actualizado",
        description: "Los cambios se han guardado correctamente",
      });
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: [`/api/users/${targetUserId}`] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "No se pudo actualizar el perfil",
        variant: "destructive",
      });
    },
  });

  // Initialize form data when user data loads
  useEffect(() => {
    if (user) {
      setFormData(user);
    } else if (currentUser && !user && !isLoading) {
      // Fallback to current user data if API fails
      setFormData({
        id: currentUser.id,
        email: currentUser.email,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        companyName: currentUser.companyName || "DaHub Technologies",
        phone: currentUser.phone,
        website: currentUser.website || "https://dahub.tech",
        description: currentUser.description || "Empresa de tecnología especializada en desarrollo de plataformas digitales para turismo sostenible.",
        location: currentUser.location || "Medellín, Colombia",
        userCategory: currentUser.userCategory || "Agencias u Operadores Turísticos",
        subcategory: currentUser.subcategory,
      });
    }
  }, [user, currentUser, isLoading]);

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialMediaChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }));
  };

  const handleSave = () => {
    updateProfileMutation.mutate(formData);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Agencias u Operadores Turísticos": "bg-blue-600",
      "Alojamientos Sostenibles": "bg-green-600",
      "Gastronomía Sostenible": "bg-orange-600",
      "Movilidad y Transporte Ecológico": "bg-teal-600",
      "ONG y Fundaciones": "bg-purple-600",
      "Educación y Sensibilización Ambiental": "bg-indigo-600",
      "Tecnología para el Turismo Sostenible": "bg-cyan-600",
      "Aliados y Patrocinadores": "bg-red-600",
    };
    return colors[category] || "bg-gray-600";
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-32 bg-gray-800 rounded-xl"></div>
        <div className="h-64 bg-gray-800 rounded-xl"></div>
      </div>
    );
  }

  if (error && !currentUser) {
    return (
      <div className="text-center text-gray-400 mt-8">
        <p>Error al cargar el perfil. Por favor intenta nuevamente.</p>
      </div>
    );
  }

  const displayData = user || formData || {};

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 overflow-hidden">
        {/* Cover Photo */}
        <div className="h-32 bg-gradient-to-r from-green-600 to-emerald-600 relative">
          <div className="absolute inset-0 bg-black/20"></div>
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              size="sm"
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30"
            >
              <Edit className="w-4 h-4 mr-1" />
              Editar perfil
            </Button>
          )}
        </div>
        
        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-16 mb-4">
            <div className="relative">
              <Avatar className="w-24 h-24 ring-4 ring-gray-900 bg-gray-900">
                <AvatarImage src={displayData.profileImage} />
                <AvatarFallback className="bg-green-600 text-white text-2xl font-bold">
                  {displayData.companyName?.charAt(0) || displayData.firstName?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 w-8 h-8 p-0 bg-green-600 hover:bg-green-700 rounded-full"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            {isEditing ? (
              <div className="flex space-x-2 mt-16">
                <Button
                  onClick={() => setIsEditing(false)}
                  size="sm"
                  variant="outline"
                  className="border-gray-600/50 text-white hover:bg-gray-700/50"
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancelar
                </Button>
                <Button
                  onClick={handleSave}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                  disabled={updateProfileMutation.isPending}
                >
                  <Save className="w-4 h-4 mr-1" />
                  {updateProfileMutation.isPending ? "Guardando..." : "Guardar"}
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2 mt-16">
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                  <Share className="w-4 h-4 mr-1" />
                  Compartir
                </Button>
              </div>
            )}
          </div>
          
          {/* Profile Details */}
          <div className="space-y-3">
            <div>
              {isEditing ? (
                <div className="space-y-2">
                  <Input
                    value={formData.companyName || ""}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    placeholder="Nombre de la empresa"
                    className="bg-gray-800/50 border-gray-600/50 text-white text-lg font-bold"
                  />
                  <Input
                    value={formData.firstName || ""}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="Nombre"
                    className="bg-gray-800/50 border-gray-600/50 text-white"
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-white">
                    {displayData.companyName || `${displayData.firstName} ${displayData.lastName}`.trim() || "Usuario"}
                  </h1>
                  {displayData.firstName && (
                    <p className="text-gray-400">
                      {displayData.firstName} {displayData.lastName}
                    </p>
                  )}
                </>
              )}
            </div>
            
            {displayData.userCategory && (
              <Badge className={`${getCategoryColor(displayData.userCategory)} text-white`}>
                <Building2 className="w-3 h-3 mr-1" />
                {displayData.userCategory}
              </Badge>
            )}
            
            {isEditing ? (
              <Textarea
                value={formData.description || ""}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe tu empresa o servicios..."
                className="bg-gray-800/50 border-gray-600/50 text-white resize-none"
                rows={3}
              />
            ) : (
              <p className="text-white text-sm leading-relaxed">
                {displayData.description || "Sin descripción disponible."}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              {isEditing ? (
                <>
                  <Input
                    value={formData.location || ""}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="Ubicación"
                    className="flex-1 min-w-[200px] bg-gray-800/50 border-gray-600/50 text-white text-sm"
                  />
                  <Input
                    value={formData.website || ""}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    placeholder="Sitio web"
                    className="flex-1 min-w-[200px] bg-gray-800/50 border-gray-600/50 text-white text-sm"
                  />
                </>
              ) : (
                <>
                  {displayData.location && (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {displayData.location}
                    </div>
                  )}
                  {displayData.website && (
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-1" />
                      <a 
                        href={displayData.website.startsWith('http') ? displayData.website : `https://${displayData.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-400 transition-colors"
                      >
                        {displayData.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Se unió en enero 2025
                  </div>
                </>
              )}
            </div>
            
            {!isEditing && (
              <div className="flex space-x-6 text-sm">
                <div className="text-white">
                  <span className="font-bold">156</span> <span className="text-gray-400">Conexiones</span>
                </div>
                <div className="text-white">
                  <span className="font-bold">89</span> <span className="text-gray-400">Experiencias</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Profile Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-gray-800/50 border border-gray-600/30 backdrop-blur-sm">
          <TabsTrigger value="overview" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Vista General
          </TabsTrigger>
          <TabsTrigger value="contact" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Contacto
          </TabsTrigger>
          <TabsTrigger value="social" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Redes Sociales
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Configuración
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Estadísticas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Visualizaciones del perfil</span>
                  <span className="text-white font-bold">1,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Conexiones nuevas</span>
                  <span className="text-white font-bold">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Experiencias publicadas</span>
                  <span className="text-white font-bold">12</span>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Reconocimientos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Empresa Sostenible Certificada</p>
                    <p className="text-gray-400 text-xs">Enero 2025</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Perfil Verificado</p>
                    <p className="text-gray-400 text-xs">Diciembre 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
            <CardHeader>
              <CardTitle className="text-white">Información de Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Email</label>
                    <Input
                      value={formData.email || ""}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-gray-800/50 border-gray-600/50 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Teléfono</label>
                    <Input
                      value={formData.phone || ""}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="bg-gray-800/50 border-gray-600/50 text-white"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {displayData.email && (
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-white">{displayData.email}</span>
                    </div>
                  )}
                  {displayData.phone && (
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span className="text-white">{displayData.phone}</span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
            <CardHeader>
              <CardTitle className="text-white">Redes Sociales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <div className="space-y-4">
                  {[
                    { platform: 'twitter', icon: Twitter, label: 'Twitter/X', placeholder: '@usuario' },
                    { platform: 'facebook', icon: Facebook, label: 'Facebook', placeholder: 'facebook.com/usuario' },
                    { platform: 'linkedin', icon: Linkedin, label: 'LinkedIn', placeholder: 'linkedin.com/in/usuario' },
                    { platform: 'instagram', icon: Instagram, label: 'Instagram', placeholder: '@usuario' },
                  ].map(({ platform, icon: Icon, label, placeholder }) => (
                    <div key={platform} className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-gray-400" />
                      <div className="flex-1 space-y-1">
                        <label className="text-sm text-gray-400">{label}</label>
                        <Input
                          value={formData.socialMedia?.[platform as keyof typeof formData.socialMedia] || ""}
                          onChange={(e) => handleSocialMediaChange(platform, e.target.value)}
                          placeholder={placeholder}
                          className="bg-gray-800/50 border-gray-600/50 text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {displayData.socialMedia?.twitter && (
                    <div className="flex items-center space-x-3">
                      <Twitter className="w-5 h-5 text-blue-400" />
                      <span className="text-white">@{displayData.socialMedia.twitter}</span>
                    </div>
                  )}
                  {displayData.socialMedia?.linkedin && (
                    <div className="flex items-center space-x-3">
                      <Linkedin className="w-5 h-5 text-blue-600" />
                      <span className="text-white">{displayData.socialMedia.linkedin}</span>
                    </div>
                  )}
                  {!displayData.socialMedia && (
                    <p className="text-gray-400 text-sm">No hay redes sociales configuradas.</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
            <CardHeader>
              <CardTitle className="text-white">Configuración de Cuenta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Perfil público</p>
                    <p className="text-gray-400 text-sm">Permite que otros usuarios vean tu perfil</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-gray-600/50 text-white">
                    Activado
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Notificaciones por email</p>
                    <p className="text-gray-400 text-sm">Recibe actualizaciones por correo electrónico</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-gray-600/50 text-white">
                    Activado
                  </Button>
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <Button variant="outline" className="w-full border-red-600/50 text-red-400 hover:bg-red-600/10">
                    Eliminar cuenta
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortalProfile;