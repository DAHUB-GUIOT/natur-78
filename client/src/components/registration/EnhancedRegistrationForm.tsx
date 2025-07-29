import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Building, User, Mail, Lock, Save, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface RegistrationFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  
  // Company Information (mandatory for Portal Empresas)
  companyName: string;
  businessType: string;
  description: string;
  
  // Location Information (mandatory for map positioning)
  address: string;
  city: string;
  country: string;
  coordinates?: { lat: number; lng: number };
  
  // Contact Information
  phone?: string;
  website?: string;
}

interface EnhancedRegistrationFormProps {
  onSuccess?: (user: any) => void;
}

const EnhancedRegistrationForm: React.FC<EnhancedRegistrationFormProps> = ({ onSuccess }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    companyName: '',
    businessType: 'tourism',
    description: '',
    address: '',
    city: 'Bogotá',
    country: 'Colombia',
    phone: '',
    website: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const registrationMutation = useMutation({
    mutationFn: async (data: RegistrationFormData) => {
      // Generate coordinates based on city (mock implementation)
      const coordinates = getCityCoordinates(data.city);
      
      return await apiRequest('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          role: 'empresa',
          userType: 'empresa',
          coordinates
        })
      });
    },
    onSuccess: (response) => {
      toast({
        title: "¡Registro exitoso!",
        description: "Tu cuenta empresarial ha sido creada. Todas las funcionalidades del portal están ahora activadas.",
      });
      
      if (onSuccess) {
        onSuccess(response.user);
      } else {
        // Redirect to Portal Empresas
        setTimeout(() => {
          window.location.href = '/portal-empresas';
        }, 1500);
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error en el registro",
        description: error.message || "Ha ocurrido un error. Inténtalo de nuevo.",
        variant: "destructive"
      });
    }
  });

  const getCityCoordinates = (city: string) => {
    const cityCoords: { [key: string]: { lat: number; lng: number } } = {
      'Bogotá': { lat: 4.6097, lng: -74.0817 },
      'Medellín': { lat: 6.2442, lng: -75.5812 },
      'Cali': { lat: 3.4516, lng: -76.5320 },
      'Cartagena': { lat: 10.3910, lng: -75.4794 },
      'Santa Marta': { lat: 11.2408, lng: -74.1990 },
      'Manizales': { lat: 5.0703, lng: -75.5138 },
      'Pereira': { lat: 4.8133, lng: -75.6961 }
    };
    
    return cityCoords[city] || cityCoords['Bogotá'];
  };

  const handleInputChange = (field: keyof RegistrationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.companyName || !formData.address || !formData.email || !formData.password) {
      toast({
        title: "Campos obligatorios",
        description: "Por favor completa todos los campos obligatorios marcados con *",
        variant: "destructive"
      });
      return;
    }
    
    registrationMutation.mutate(formData);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Información Personal</h3>
              <p className="text-gray-300">Datos básicos para tu cuenta</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Nombre *</Label>
                <Input
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="bg-gray-700/40 border-gray-600/50 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-white">Apellido *</Label>
                <Input
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="bg-gray-700/40 border-gray-600/50 text-white"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label className="text-white">Email *</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-gray-700/40 border-gray-600/50 text-white"
                required
              />
            </div>
            
            <div>
              <Label className="text-white">Contraseña *</Label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="bg-gray-700/40 border-gray-600/50 text-white"
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Información Empresarial</h3>
              <p className="text-gray-300">Datos de tu empresa para el directorio</p>
            </div>
            
            <div>
              <Label className="text-white">Nombre de la Empresa *</Label>
              <Input
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className="bg-gray-700/40 border-gray-600/50 text-white"
                placeholder="Ej. EcoTours Colombia"
                required
              />
            </div>
            
            <div>
              <Label className="text-white">Tipo de Negocio</Label>
              <Select 
                value={formData.businessType} 
                onValueChange={(value) => handleInputChange('businessType', value)}
              >
                <SelectTrigger className="bg-gray-700/40 border-gray-600/50 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tourism">Turismo</SelectItem>
                  <SelectItem value="hotel">Alojamiento</SelectItem>
                  <SelectItem value="restaurant">Gastronomía</SelectItem>
                  <SelectItem value="transport">Transporte</SelectItem>
                  <SelectItem value="agency">Agencia</SelectItem>
                  <SelectItem value="technology">Tecnología</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-white">Descripción</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="bg-gray-700/40 border-gray-600/50 text-white"
                placeholder="Describe tu empresa y servicios..."
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Teléfono</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-gray-700/40 border-gray-600/50 text-white"
                  placeholder="+57 300 123 4567"
                />
              </div>
              <div>
                <Label className="text-white">Sitio Web</Label>
                <Input
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="bg-gray-700/40 border-gray-600/50 text-white"
                  placeholder="https://miempresa.com"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Ubicación</h3>
              <p className="text-gray-300">Ubicación para aparecer en el mapa interactivo *</p>
            </div>
            
            <div>
              <Label className="text-white">Dirección Completa *</Label>
              <Input
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="bg-gray-700/40 border-gray-600/50 text-white"
                placeholder="Ej. Carrera 11 #93-15, Chapinero"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Ciudad *</Label>
                <Select 
                  value={formData.city} 
                  onValueChange={(value) => handleInputChange('city', value)}
                >
                  <SelectTrigger className="bg-gray-700/40 border-gray-600/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bogotá">Bogotá</SelectItem>
                    <SelectItem value="Medellín">Medellín</SelectItem>
                    <SelectItem value="Cali">Cali</SelectItem>
                    <SelectItem value="Cartagena">Cartagena</SelectItem>
                    <SelectItem value="Santa Marta">Santa Marta</SelectItem>
                    <SelectItem value="Manizales">Manizales</SelectItem>
                    <SelectItem value="Pereira">Pereira</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-white">País</Label>
                <Input
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="bg-gray-700/40 border-gray-600/50 text-white"
                  disabled
                />
              </div>
            </div>
            
            <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-400 font-medium mb-2">Funcionalidades que se activarán:</h4>
              <ul className="text-green-200 text-sm space-y-1">
                <li>✅ Tarjeta en el directorio de contactos</li>
                <li>📍 Marcador en el mapa interactivo</li>
                <li>💬 Sistema de mensajería</li>
                <li>✨ Creación de experiencias</li>
                <li>👤 Perfil empresarial automático</li>
                <li>🧭 Nombre en menú de navegación</li>
                <li>⚙️ Panel de ajustes completo</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-300">Paso {currentStep} de {totalSteps}</span>
          <span className="text-sm text-gray-300">{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-green-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      <Card className="backdrop-blur-sm bg-gray-900/40 border-2 border-[#cad95e]">
        <CardHeader>
          <CardTitle className="text-white text-center">
            <Building className="w-6 h-6 mx-auto mb-2" />
            Registro Portal Empresas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {renderStep()}
            
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={prevStep}
                  className="border-gray-600/50 text-white hover:bg-gray-700/50"
                >
                  Anterior
                </Button>
              )}
              
              <div className="ml-auto">
                {currentStep < totalSteps ? (
                  <Button 
                    type="button" 
                    onClick={nextStep}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Siguiente
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    disabled={registrationMutation.isPending}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    {registrationMutation.isPending ? (
                      "Creando cuenta..."
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Crear Cuenta
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedRegistrationForm;