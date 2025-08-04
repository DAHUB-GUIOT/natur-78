import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Upload, Check, X, Star, Shield, Award, Globe, Users, MapPin, Phone, Mail, Calendar, Building } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface ProfileData {
  companyName: string;
  category: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  address: string;
  foundedYear: string;
  employees: string;
  services: string[];
  certifications: string[];
  socialMedia: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
  businessType: string;
  department: string;
  country: string;
}

interface VerificationLevel {
  id: string;
  name: string;
  description: string;
  requirements: string[];
  badge: string;
  color: string;
  completed: boolean;
  progress: number;
}

const EditProfile: React.FC = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('basic');
  
  const [profileData, setProfileData] = useState<ProfileData>({
    companyName: '',
    category: '',
    description: '',
    email: '',
    phone: '',
    website: '',
    location: '',
    address: '',
    foundedYear: '',
    employees: '',
    services: [],
    certifications: [],
    socialMedia: {},
    businessType: '',
    department: '',
    country: 'Colombia'
  });

  const verificationLevels: VerificationLevel[] = [
    {
      id: 'basic',
      name: 'Verificación Básica',
      description: 'Información básica de la empresa completada',
      requirements: ['Nombre de empresa', 'Categoría', 'Email', 'Teléfono', 'Descripción'],
      badge: 'Básico',
      color: 'bg-blue-500',
      completed: false,
      progress: 0
    },
    {
      id: 'verified',
      name: 'Empresa Verificada',
      description: 'Empresa con información completa y verificada',
      requirements: ['Verificación básica', 'Sitio web', 'Dirección', 'Año de fundación', 'Número de empleados'],
      badge: 'Verificado',
      color: 'bg-green-500',
      completed: false,
      progress: 0
    },
    {
      id: 'certified',
      name: 'Certificado Sostenible',
      description: 'Empresa con certificaciones de sostenibilidad',
      requirements: ['Empresa verificada', 'Al menos 2 certificaciones', 'Servicios detallados', 'Redes sociales'],
      badge: 'Certificado',
      color: 'bg-yellow-500',
      completed: false,
      progress: 0
    },
    {
      id: 'premium',
      name: 'Partner Premium',
      description: 'Empresa partner con máxima credibilidad',
      requirements: ['Certificado sostenible', 'Más de 5 certificaciones', 'Presencia digital completa', 'Validación manual'],
      badge: 'Premium',
      color: 'bg-purple-500',
      completed: false,
      progress: 0
    }
  ];

  const { data: user } = useQuery({
    queryKey: ['/api/auth/user'],
  });

  const { data: company } = useQuery({
    queryKey: ['/api/companies/me'],
    enabled: !!user,
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: Partial<ProfileData>) => {
      return await apiRequest('/api/companies/me', {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Perfil actualizado",
        description: "Los cambios han sido guardados exitosamente",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/companies/me'] });
      queryClient.invalidateQueries({ queryKey: ['/api/auth/user'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo actualizar el perfil",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (company) {
      setProfileData({
        companyName: (company as any).companyName || '',
        category: (company as any).businessType || '',
        description: (company as any).description || '',
        email: user?.email || '',
        phone: (company as any).phone || '',
        website: (company as any).website || '',
        location: (company as any).city || '',
        address: (company as any).address || '',
        foundedYear: (company as any).foundedYear || '',
        employees: (company as any).employees || '',
        services: (company as any).services || [],
        certifications: (company as any).certifications || [],
        socialMedia: (company as any).socialMedia || {},
        businessType: (company as any).businessType || '',
        department: (company as any).department || '',
        country: (company as any).country || 'Colombia'
      });
    }
  }, [company, user]);

  const calculateVerificationProgress = () => {
    const levels = [...verificationLevels];
    
    // Basic verification
    const basicFields = [profileData.companyName, profileData.category, profileData.email, profileData.phone, profileData.description];
    const basicCompleted = basicFields.filter(field => field && field.trim()).length;
    levels[0].progress = (basicCompleted / basicFields.length) * 100;
    levels[0].completed = levels[0].progress === 100;

    // Verified
    const verifiedFields = [profileData.website, profileData.address, profileData.foundedYear, profileData.employees];
    const verifiedCompleted = verifiedFields.filter(field => field && field.trim()).length;
    levels[1].progress = levels[0].completed ? (verifiedCompleted / verifiedFields.length) * 100 : 0;
    levels[1].completed = levels[0].completed && levels[1].progress === 100;

    // Certified
    const certifiedRequirements = [
      profileData.certifications.length >= 2,
      profileData.services.length > 0,
      Object.keys(profileData.socialMedia).length > 0
    ];
    const certifiedCompleted = certifiedRequirements.filter(req => req).length;
    levels[2].progress = levels[1].completed ? (certifiedCompleted / certifiedRequirements.length) * 100 : 0;
    levels[2].completed = levels[1].completed && levels[2].progress === 100;

    // Premium
    const premiumRequirements = [
      profileData.certifications.length >= 5,
      profileData.website && profileData.socialMedia.instagram && profileData.socialMedia.facebook
    ];
    const premiumCompleted = premiumRequirements.filter(req => req).length;
    levels[3].progress = levels[2].completed ? (premiumCompleted / premiumRequirements.length) * 100 : 0;
    levels[3].completed = levels[2].completed && levels[3].progress === 100;

    return levels;
  };

  const currentLevels = calculateVerificationProgress();

  const handleInputChange = (field: keyof ProfileData, value: string | string[]) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialMediaChange = (platform: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }));
  };

  const addService = (service: string) => {
    if (service.trim() && !profileData.services.includes(service.trim())) {
      setProfileData(prev => ({
        ...prev,
        services: [...prev.services, service.trim()]
      }));
    }
  };

  const removeService = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const addCertification = (cert: string) => {
    if (cert.trim() && !profileData.certifications.includes(cert.trim())) {
      setProfileData(prev => ({
        ...prev,
        certifications: [...prev.certifications, cert.trim()]
      }));
    }
  };

  const removeCertification = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    updateProfileMutation.mutate(profileData);
  };

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            <Building className="w-4 h-4 inline mr-2" />
            Nombre de la Empresa *
          </label>
          <Input
            value={profileData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            className="bg-white/10 border-white/30 text-white"
            placeholder="Nombre de tu empresa"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            <Users className="w-4 h-4 inline mr-2" />
            Categoría *
          </label>
          <Select value={profileData.category} onValueChange={(value) => handleInputChange('category', value)}>
            <SelectTrigger className="bg-white/10 border-white/30 text-white">
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
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
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            <Mail className="w-4 h-4 inline mr-2" />
            Email *
          </label>
          <Input
            value={profileData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="bg-white/10 border-white/30 text-white"
            placeholder="email@empresa.com"
            type="email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            Teléfono *
          </label>
          <Input
            value={profileData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="bg-white/10 border-white/30 text-white"
            placeholder="+57 300 123 4567"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Descripción de la Empresa *
        </label>
        <Textarea
          value={profileData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="bg-white/10 border-white/30 text-white min-h-[120px]"
          placeholder="Describe tu empresa, servicios y enfoque en sostenibilidad..."
        />
      </div>
    </div>
  );

  const renderBusinessDetails = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            <Globe className="w-4 h-4 inline mr-2" />
            Sitio Web
          </label>
          <Input
            value={profileData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            className="bg-white/10 border-white/30 text-white"
            placeholder="https://tuempresa.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            <Calendar className="w-4 h-4 inline mr-2" />
            Año de Fundación
          </label>
          <Input
            value={profileData.foundedYear}
            onChange={(e) => handleInputChange('foundedYear', e.target.value)}
            className="bg-white/10 border-white/30 text-white"
            placeholder="2020"
            type="number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            <Users className="w-4 h-4 inline mr-2" />
            Número de Empleados
          </label>
          <Select value={profileData.employees} onValueChange={(value) => handleInputChange('employees', value)}>
            <SelectTrigger className="bg-white/10 border-white/30 text-white">
              <SelectValue placeholder="Selecciona el tamaño" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-5">1-5 empleados</SelectItem>
              <SelectItem value="6-15">6-15 empleados</SelectItem>
              <SelectItem value="16-50">16-50 empleados</SelectItem>
              <SelectItem value="51-100">51-100 empleados</SelectItem>
              <SelectItem value="100+">Más de 100 empleados</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            <MapPin className="w-4 h-4 inline mr-2" />
            Ciudad
          </label>
          <Input
            value={profileData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="bg-white/10 border-white/30 text-white"
            placeholder="Bogotá"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Dirección Completa
        </label>
        <Input
          value={profileData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          className="bg-white/10 border-white/30 text-white"
          placeholder="Carrera 11 #93-07, Chapinero, Bogotá"
        />
      </div>
    </div>
  );

  const renderServices = () => {
    const [newService, setNewService] = useState('');

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Agregar Servicio
          </label>
          <div className="flex space-x-2">
            <Input
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              className="bg-white/10 border-white/30 text-white flex-1"
              placeholder="Ej: Ecoturismo, Senderismo ecológico..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addService(newService);
                  setNewService('');
                }
              }}
            />
            <Button
              onClick={() => {
                addService(newService);
                setNewService('');
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Agregar
            </Button>
          </div>
        </div>
        <div>
          <h4 className="text-white font-medium mb-3">Servicios Ofrecidos</h4>
          <div className="flex flex-wrap gap-2">
            {profileData.services.map((service, index) => (
              <Badge
                key={index}
                className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-3 py-1 flex items-center space-x-2"
              >
                <span>{service}</span>
                <X
                  className="w-3 h-3 cursor-pointer hover:text-red-400"
                  onClick={() => removeService(index)}
                />
              </Badge>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderCertifications = () => {
    const [newCert, setNewCert] = useState('');

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Agregar Certificación
          </label>
          <div className="flex space-x-2">
            <Input
              value={newCert}
              onChange={(e) => setNewCert(e.target.value)}
              className="bg-white/10 border-white/30 text-white flex-1"
              placeholder="Ej: ISO 14001, Certificación de Turismo Sostenible..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addCertification(newCert);
                  setNewCert('');
                }
              }}
            />
            <Button
              onClick={() => {
                addCertification(newCert);
                setNewCert('');
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              Agregar
            </Button>
          </div>
        </div>
        <div>
          <h4 className="text-white font-medium mb-3">Certificaciones</h4>
          <div className="flex flex-wrap gap-2">
            {profileData.certifications.map((cert, index) => (
              <Badge
                key={index}
                className="bg-green-500/20 text-green-400 border-green-500/30 px-3 py-1 flex items-center space-x-2"
              >
                <span>{cert}</span>
                <X
                  className="w-3 h-3 cursor-pointer hover:text-red-400"
                  onClick={() => removeCertification(index)}
                />
              </Badge>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSocialMedia = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Instagram
          </label>
          <Input
            value={profileData.socialMedia.instagram || ''}
            onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
            className="bg-white/10 border-white/30 text-white"
            placeholder="@tuempresa"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Facebook
          </label>
          <Input
            value={profileData.socialMedia.facebook || ''}
            onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
            className="bg-white/10 border-white/30 text-white"
            placeholder="TuEmpresa"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            LinkedIn
          </label>
          <Input
            value={profileData.socialMedia.linkedin || ''}
            onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
            className="bg-white/10 border-white/30 text-white"
            placeholder="company/tuempresa"
          />
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'basic', name: 'Información Básica', icon: Building },
    { id: 'business', name: 'Detalles del Negocio', icon: Globe },
    { id: 'services', name: 'Servicios', icon: Users },
    { id: 'certifications', name: 'Certificaciones', icon: Award },
    { id: 'social', name: 'Redes Sociales', icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver
            </Button>
            <h1 className="text-3xl font-bold text-white">Editar Perfil</h1>
          </div>
          <Button
            onClick={handleSave}
            disabled={updateProfileMutation.isPending}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8"
          >
            {updateProfileMutation.isPending ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Verification Levels Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 sticky top-4">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Niveles de Verificación
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentLevels.map((level, index) => (
                  <div key={level.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {level.completed ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <div className={`w-4 h-4 rounded-full ${level.color} opacity-50`} />
                        )}
                        <span className="text-white text-sm font-medium">{level.name}</span>
                      </div>
                      <Badge className={`${level.color}/20 text-white text-xs`}>
                        {Math.round(level.progress)}%
                      </Badge>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className={`${level.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${level.progress}%` }}
                      />
                    </div>
                    <p className="text-white/60 text-xs">{level.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <div className="flex flex-wrap gap-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <Button
                        key={tab.id}
                        variant={activeTab === tab.id ? "default" : "ghost"}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 ${
                          activeTab === tab.id
                            ? "bg-blue-600 text-white"
                            : "text-white/70 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{tab.name}</span>
                      </Button>
                    );
                  })}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {activeTab === 'basic' && renderBasicInfo()}
                {activeTab === 'business' && renderBusinessDetails()}
                {activeTab === 'services' && renderServices()}
                {activeTab === 'certifications' && renderCertifications()}
                {activeTab === 'social' && renderSocialMedia()}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;