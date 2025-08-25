import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Camera, Save, User, Building2, MapPin, Globe, 
  Phone, Mail, Calendar, Users, Award, Settings, Upload,
  Facebook, Twitter, Instagram, Linkedin, Eye, EyeOff
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProfileData {
  companyName: string;
  category: string;
  bio: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  city: string;
  country: string;
  foundedYear: string;
  teamSize: string;
  description: string;
  services: string[];
  certifications: string[];
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  privacy: {
    profileVisible: boolean;
    emailVisible: boolean;
    phoneVisible: boolean;
    experiencesVisible: boolean;
  };
}

const EditProfileFacebook = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('basic');
  const [isLoading, setIsLoading] = useState(false);
  
  const [profileData, setProfileData] = useState<ProfileData>({
    companyName: '',
    category: '',
    bio: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    city: '',
    country: 'Colombia',
    foundedYear: '',
    teamSize: '',
    description: '',
    services: [],
    certifications: [],
    socialMedia: {},
    privacy: {
      profileVisible: true,
      emailVisible: true,
      phoneVisible: true,
      experiencesVisible: true
    }
  });

  const { data: user } = useQuery({
    queryKey: ['/api/auth/user'],
  });

  // Load current user data
  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        companyName: (user as any).companyName || '',
        category: (user as any).category || '',
        bio: (user as any).bio || '',
        email: (user as any).email || '',
        phone: (user as any).phone || '',
        website: (user as any).website || '',
        address: (user as any).address || '',
        city: (user as any).city || '',
        country: (user as any).country || 'Colombia',
        foundedYear: (user as any).foundedYear || '',
        teamSize: (user as any).teamSize || '',
        description: (user as any).companyDescription || '',
        socialMedia: {
          facebook: (user as any).facebookUrl || '',
          twitter: (user as any).twitterUrl || '',
          instagram: (user as any).instagramUrl || '',
          linkedin: (user as any).linkedinUrl || ''
        }
      }));
    }
  }, [user]);

  const updateProfileMutation = useMutation({
    mutationFn: async (data: Partial<ProfileData>) => {
      return await apiRequest('/api/auth/update-profile', {
        method: 'PUT',
        body: JSON.stringify({
          ...data,
          companyDescription: data.description,
          facebookUrl: data.socialMedia?.facebook,
          twitterUrl: data.socialMedia?.twitter,
          instagramUrl: data.socialMedia?.instagram,
          linkedinUrl: data.socialMedia?.linkedin
        }),
      });
    },
    onSuccess: () => {
      toast({
        title: "Perfil actualizado",
        description: "Tu información ha sido guardada exitosamente.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/auth/user'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "No se pudo actualizar el perfil.",
        variant: "destructive",
      });
    },
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateProfileMutation.mutateAsync(profileData);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialMediaChange = (platform: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      socialMedia: { ...prev.socialMedia, [platform]: value }
    }));
  };

  const handlePrivacyChange = (setting: string, value: boolean) => {
    setProfileData(prev => ({
      ...prev,
      privacy: { ...prev.privacy, [setting]: value }
    }));
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
                Volver al Perfil
              </Button>
              <h1 className="text-xl font-semibold text-white">Editar Perfil</h1>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => setLocation('/portal-empresas')}
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSave}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Preview */}
          <div className="lg:col-span-1">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Vista Previa</h3>
                
                {/* Profile Picture */}
                <div className="relative mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white text-2xl font-bold mx-auto">
                    {profileData.companyName?.substring(0, 2).toUpperCase() || 'TU'}
                  </div>
                  <Button 
                    size="sm" 
                    className="absolute -bottom-2 -right-2 w-8 h-8 p-0 bg-green-600 hover:bg-green-700 rounded-full"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="text-center space-y-2">
                  <h4 className="text-lg font-semibold text-white">
                    {profileData.companyName || 'Nombre de la Empresa'}
                  </h4>
                  <p className="text-white/70">{profileData.category || 'Categoría'}</p>
                  <p className="text-white/60 text-sm">{profileData.bio || 'Biografía de la empresa...'}</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-lg font-bold text-white">25</div>
                    <div className="text-white/60 text-xs">Experiencias</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-lg font-bold text-white">4.8</div>
                    <div className="text-white/60 text-xs">Calificación</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Edit Form */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-sm">
                <TabsTrigger value="basic" className="text-white data-[state=active]:bg-green-600">
                  Básico
                </TabsTrigger>
                <TabsTrigger value="contact" className="text-white data-[state=active]:bg-green-600">
                  Contacto
                </TabsTrigger>
                <TabsTrigger value="business" className="text-white data-[state=active]:bg-green-600">
                  Negocio
                </TabsTrigger>
                <TabsTrigger value="privacy" className="text-white data-[state=active]:bg-green-600">
                  Privacidad
                </TabsTrigger>
              </TabsList>

              {/* Basic Information Tab */}
              <TabsContent value="basic">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Información Básica
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="companyName" className="text-white">
                          Nombre de la Empresa *
                        </Label>
                        <Input
                          id="companyName"
                          value={profileData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                          className="bg-white/5 border-white/20 text-white"
                          placeholder="Ej: EcoTours Colombia"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category" className="text-white">
                          Categoría Principal *
                        </Label>
                        <Select value={profileData.category} onValueChange={(value) => handleInputChange('category', value)}>
                          <SelectTrigger className="bg-white/5 border-white/20 text-white">
                            <SelectValue placeholder="Selecciona una categoría" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-white/20">
                            <SelectItem value="Agencias u Operadores Turísticos">Agencias u Operadores Turísticos</SelectItem>
                            <SelectItem value="Alojamientos Sostenibles">Alojamientos Sostenibles</SelectItem>
                            <SelectItem value="Gastronomía Sostenible">Gastronomía Sostenible</SelectItem>
                            <SelectItem value="Movilidad y Transporte Ecológico">Movilidad y Transporte Ecológico</SelectItem>
                            <SelectItem value="ONG y Fundaciones">ONG y Fundaciones</SelectItem>
                            <SelectItem value="Educación y Sensibilización Ambiental">Educación y Sensibilización Ambiental</SelectItem>
                            <SelectItem value="Tecnología para el Turismo Sostenible">Tecnología para el Turismo Sostenible</SelectItem>
                            <SelectItem value="Aliados y Patrocinadores">Aliados y Patrocinadores</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio" className="text-white">
                        Biografía Corta
                      </Label>
                      <Input
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        className="bg-white/5 border-white/20 text-white"
                        placeholder="Descripción breve de tu empresa"
                        maxLength={100}
                      />
                      <p className="text-white/40 text-xs mt-1">{profileData.bio.length}/100 caracteres</p>
                    </div>

                    <div>
                      <Label htmlFor="description" className="text-white">
                        Descripción Completa
                      </Label>
                      <Textarea
                        id="description"
                        value={profileData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className="bg-white/5 border-white/20 text-white min-h-[120px]"
                        placeholder="Describe detalladamente tu empresa, servicios y valores..."
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Contact Information Tab */}
              <TabsContent value="contact">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Phone className="w-5 h-5 mr-2" />
                      Información de Contacto
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="text-white">
                          Email de Contacto *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="bg-white/5 border-white/20 text-white"
                          placeholder="contacto@empresa.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-white">
                          Teléfono
                        </Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="bg-white/5 border-white/20 text-white"
                          placeholder="+57 300 123 4567"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="website" className="text-white">
                        Sitio Web
                      </Label>
                      <Input
                        id="website"
                        value={profileData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="bg-white/5 border-white/20 text-white"
                        placeholder="https://www.empresa.com"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="address" className="text-white">
                          Dirección
                        </Label>
                        <Input
                          id="address"
                          value={profileData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="bg-white/5 border-white/20 text-white"
                          placeholder="Calle 123 #45-67"
                        />
                      </div>
                      <div>
                        <Label htmlFor="city" className="text-white">
                          Ciudad
                        </Label>
                        <Input
                          id="city"
                          value={profileData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className="bg-white/5 border-white/20 text-white"
                          placeholder="Bogotá"
                        />
                      </div>
                      <div>
                        <Label htmlFor="country" className="text-white">
                          País
                        </Label>
                        <Select value={profileData.country} onValueChange={(value) => handleInputChange('country', value)}>
                          <SelectTrigger className="bg-white/5 border-white/20 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-white/20">
                            <SelectItem value="Colombia">Colombia</SelectItem>
                            <SelectItem value="Argentina">Argentina</SelectItem>
                            <SelectItem value="Brasil">Brasil</SelectItem>
                            <SelectItem value="Chile">Chile</SelectItem>
                            <SelectItem value="Ecuador">Ecuador</SelectItem>
                            <SelectItem value="Perú">Perú</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-4">
                      <h4 className="text-white font-medium">Redes Sociales</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3">
                          <Facebook className="w-5 h-5 text-blue-500" />
                          <Input
                            value={profileData.socialMedia.facebook || ''}
                            onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                            className="bg-white/5 border-white/20 text-white"
                            placeholder="https://facebook.com/empresa"
                          />
                        </div>
                        <div className="flex items-center space-x-3">
                          <Twitter className="w-5 h-5 text-blue-400" />
                          <Input
                            value={profileData.socialMedia.twitter || ''}
                            onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                            className="bg-white/5 border-white/20 text-white"
                            placeholder="https://twitter.com/empresa"
                          />
                        </div>
                        <div className="flex items-center space-x-3">
                          <Instagram className="w-5 h-5 text-pink-500" />
                          <Input
                            value={profileData.socialMedia.instagram || ''}
                            onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                            className="bg-white/5 border-white/20 text-white"
                            placeholder="https://instagram.com/empresa"
                          />
                        </div>
                        <div className="flex items-center space-x-3">
                          <Linkedin className="w-5 h-5 text-blue-600" />
                          <Input
                            value={profileData.socialMedia.linkedin || ''}
                            onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                            className="bg-white/5 border-white/20 text-white"
                            placeholder="https://linkedin.com/company/empresa"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Business Information Tab */}
              <TabsContent value="business">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Building2 className="w-5 h-5 mr-2" />
                      Información del Negocio
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="foundedYear" className="text-white">
                          Año de Fundación
                        </Label>
                        <Input
                          id="foundedYear"
                          value={profileData.foundedYear}
                          onChange={(e) => handleInputChange('foundedYear', e.target.value)}
                          className="bg-white/5 border-white/20 text-white"
                          placeholder="2020"
                        />
                      </div>
                      <div>
                        <Label htmlFor="teamSize" className="text-white">
                          Tamaño del Equipo
                        </Label>
                        <Select value={profileData.teamSize} onValueChange={(value) => handleInputChange('teamSize', value)}>
                          <SelectTrigger className="bg-white/5 border-white/20 text-white">
                            <SelectValue placeholder="Selecciona el tamaño" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-white/20">
                            <SelectItem value="1-5 empleados">1-5 empleados</SelectItem>
                            <SelectItem value="6-10 empleados">6-10 empleados</SelectItem>
                            <SelectItem value="11-25 empleados">11-25 empleados</SelectItem>
                            <SelectItem value="26-50 empleados">26-50 empleados</SelectItem>
                            <SelectItem value="51-100 empleados">51-100 empleados</SelectItem>
                            <SelectItem value="100+ empleados">100+ empleados</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Services */}
                    <div>
                      <Label className="text-white">Servicios Ofrecidos</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {[
                          'Ecoturismo', 'Turismo Aventura', 'Turismo Cultural', 
                          'Turismo Rural', 'Turismo Gastronómico', 'Alojamiento Ecológico',
                          'Transporte Sostenible', 'Guías Especializados', 'Educación Ambiental'
                        ].map((service) => (
                          <div key={service} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={service}
                              checked={profileData.services.includes(service)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setProfileData(prev => ({ 
                                    ...prev, 
                                    services: [...prev.services, service] 
                                  }));
                                } else {
                                  setProfileData(prev => ({ 
                                    ...prev, 
                                    services: prev.services.filter(s => s !== service) 
                                  }));
                                }
                              }}
                              className="rounded bg-white/5 border-white/20"
                            />
                            <Label htmlFor={service} className="text-white/80 text-sm">
                              {service}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Certifications */}
                    <div>
                      <Label className="text-white">Certificaciones</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        {[
                          'ISO 14001', 'Rainforest Alliance', 'Fair Trade',
                          'LEED Certification', 'Green Key', 'Travelife'
                        ].map((cert) => (
                          <div key={cert} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={cert}
                              checked={profileData.certifications.includes(cert)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setProfileData(prev => ({ 
                                    ...prev, 
                                    certifications: [...prev.certifications, cert] 
                                  }));
                                } else {
                                  setProfileData(prev => ({ 
                                    ...prev, 
                                    certifications: prev.certifications.filter(c => c !== cert) 
                                  }));
                                }
                              }}
                              className="rounded bg-white/5 border-white/20"
                            />
                            <Label htmlFor={cert} className="text-white/80 text-sm">
                              {cert}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Privacy Settings Tab */}
              <TabsContent value="privacy">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Settings className="w-5 h-5 mr-2" />
                      Configuración de Privacidad
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div>
                          <h4 className="text-white font-medium">Perfil Público</h4>
                          <p className="text-white/60 text-sm">Tu perfil será visible en el directorio</p>
                        </div>
                        <Switch
                          checked={profileData.privacy.profileVisible}
                          onCheckedChange={(checked) => handlePrivacyChange('profileVisible', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div>
                          <h4 className="text-white font-medium">Email Visible</h4>
                          <p className="text-white/60 text-sm">Otros usuarios pueden ver tu email</p>
                        </div>
                        <Switch
                          checked={profileData.privacy.emailVisible}
                          onCheckedChange={(checked) => handlePrivacyChange('emailVisible', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div>
                          <h4 className="text-white font-medium">Teléfono Visible</h4>
                          <p className="text-white/60 text-sm">Otros usuarios pueden ver tu teléfono</p>
                        </div>
                        <Switch
                          checked={profileData.privacy.phoneVisible}
                          onCheckedChange={(checked) => handlePrivacyChange('phoneVisible', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div>
                          <h4 className="text-white font-medium">Experiencias Públicas</h4>
                          <p className="text-white/60 text-sm">Tus experiencias aparecen en búsquedas</p>
                        </div>
                        <Switch
                          checked={profileData.privacy.experiencesVisible}
                          onCheckedChange={(checked) => handlePrivacyChange('experiencesVisible', checked)}
                        />
                      </div>
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                      <h4 className="text-yellow-400 font-medium mb-2">Configuración de Visibilidad</h4>
                      <p className="text-white/70 text-sm">
                        Controla quién puede ver tu información. Los cambios de privacidad se aplican inmediatamente.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileFacebook;