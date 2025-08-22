import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { HeaderButtons } from "@/components/layout/HeaderButtons";
import { ArrowLeft, ArrowRight, Building2, Mail, MapPin, Clock, Users, Target } from "lucide-react";

interface CompanyData {
  // Basic Info
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  firstName: string;
  lastName: string;
  phone: string;
  website: string;
  
  // Company Details
  companyDescription: string;
  companyCategory: string;
  companySubcategory: string;
  servicesOffered: string[];
  targetMarket: string;
  yearsExperience: number;
  teamSize: number;
  
  // Location
  address: string;
  city: string;
  country: string;
  
  // Operating Hours
  operatingHours: {
    monday: { open: string; close: string; isOpen: boolean };
    tuesday: { open: string; close: string; isOpen: boolean };
    wednesday: { open: string; close: string; isOpen: boolean };
    thursday: { open: string; close: string; isOpen: boolean };
    friday: { open: string; close: string; isOpen: boolean };
    saturday: { open: string; close: string; isOpen: boolean };
    sunday: { open: string; close: string; isOpen: boolean };
  };
}

const CompanyRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CompanyData>({
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    firstName: "",
    lastName: "",
    phone: "",
    website: "",
    companyDescription: "",
    companyCategory: "",
    companySubcategory: "",
    servicesOffered: [],
    targetMarket: "",
    yearsExperience: 0,
    teamSize: 0,
    address: "",
    city: "",
    country: "Colombia",
    operatingHours: {
      monday: { open: "09:00", close: "17:00", isOpen: true },
      tuesday: { open: "09:00", close: "17:00", isOpen: true },
      wednesday: { open: "09:00", close: "17:00", isOpen: true },
      thursday: { open: "09:00", close: "17:00", isOpen: true },
      friday: { open: "09:00", close: "17:00", isOpen: true },
      saturday: { open: "09:00", close: "17:00", isOpen: false },
      sunday: { open: "09:00", close: "17:00", isOpen: false },
    }
  });
  const { toast } = useToast();

  const companyCategories = [
    { value: "agencias-operadores", label: "Agencias u Operadores Turísticos" },
    { value: "alojamientos", label: "Alojamientos Sostenibles" },
    { value: "gastronomia", label: "Gastronomía Sostenible" },
    { value: "movilidad", label: "Movilidad y Transporte Ecológico" },
    { value: "ong-fundaciones", label: "ONG y Fundaciones" },
    { value: "educacion", label: "Educación y Sensibilización Ambiental" },
    { value: "tecnologia", label: "Tecnología para el Turismo Sostenible" },
    { value: "aliados", label: "Aliados y Patrocinadores" }
  ];

  const subcategoriesByCategory: Record<string, string[]> = {
    "agencias-operadores": ["Ecoturismo", "Turismo de Aventura", "Turismo Cultural", "Turismo Gastronómico"],
    "alojamientos": ["Hoteles Eco-friendly", "Hostales Sostenibles", "Glamping", "Turismo Rural"],
    "gastronomia": ["Restaurantes Orgánicos", "Productos Locales", "Cocina Tradicional", "Bebidas Artesanales"],
    "movilidad": ["Transporte Eléctrico", "Bicicletas", "Vehículos Híbridos", "Transporte Público"],
    "ong-fundaciones": ["Conservación", "Educación Ambiental", "Desarrollo Comunitario", "Investigación"],
    "educacion": ["Talleres Ambientales", "Guías Especializados", "Programas Educativos", "Centros de Interpretación"],
    "tecnologia": ["Apps Turísticas", "Plataformas Digitales", "IoT para Turismo", "Realidad Virtual"],
    "aliados": ["Sponsors", "Partners Estratégicos", "Colaboradores", "Proveedores"]
  };

  const availableServices = [
    "Tours guiados", "Hospedaje", "Transporte", "Alimentación", "Actividades recreativas",
    "Educación ambiental", "Fotografía", "Equipos especializados", "Guías especializados",
    "Servicios de spa", "Actividades acuáticas", "Senderismo", "Observación de fauna",
    "Turismo rural", "Experiencias culturales", "Talleres artesanales"
  ];

  const registerMutation = useMutation({
    mutationFn: async (data: CompanyData) => {
      return await apiRequest('/api/auth/register-company', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          role: 'empresa',
          registrationComplete: true
        }),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: (response) => {
      toast({
        title: "Registro exitoso",
        description: "Te hemos enviado un correo de verificación. Revisa tu email para activar tu cuenta.",
      });
      window.location.href = '/verificacion-pendiente';
    },
    onError: (error: any) => {
      toast({
        title: "Error en el registro",
        description: error.message || "Ha ocurrido un error inesperado",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (field: keyof CompanyData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      servicesOffered: prev.servicesOffered.includes(service)
        ? prev.servicesOffered.filter(s => s !== service)
        : [...prev.servicesOffered, service]
    }));
  };

  const handleOperatingHourChange = (day: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day as keyof typeof prev.operatingHours],
          [field]: value
        }
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      });
      return;
    }

    if (!formData.email || !formData.companyName || !formData.companyCategory) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      });
      return;
    }

    registerMutation.mutate(formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Building2 className="w-12 h-12 mx-auto text-green-400" />
              <h3 className="text-xl font-bold text-white">Información Básica</h3>
              <p className="text-white/60">Datos fundamentales de tu empresa</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-white font-medium">Correo Electrónico *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="empresa@email.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-white font-medium">Nombre de la Empresa *</label>
                <Input
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="Tu Empresa S.A.S"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-white font-medium">Nombre *</label>
                <Input
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="Tu nombre"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-white font-medium">Apellido *</label>
                <Input
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="Tu apellido"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-white font-medium">Contraseña *</label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-white font-medium">Confirmar Contraseña *</label>
                <Input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Target className="w-12 h-12 mx-auto text-green-400" />
              <h3 className="text-xl font-bold text-white">Categoría de Negocio</h3>
              <p className="text-white/60">Clasifica tu empresa según tu actividad principal</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-white font-medium">Categoría Principal *</label>
                <Select onValueChange={(value) => handleInputChange('companyCategory', value)}>
                  <SelectTrigger className="bg-white/10 border-white/30 text-white">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {companyCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {formData.companyCategory && (
                <div className="space-y-2">
                  <label className="text-sm text-white font-medium">Subcategoría</label>
                  <Select onValueChange={(value) => handleInputChange('companySubcategory', value)}>
                    <SelectTrigger className="bg-white/10 border-white/30 text-white">
                      <SelectValue placeholder="Selecciona una subcategoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {subcategoriesByCategory[formData.companyCategory]?.map((subcat) => (
                        <SelectItem key={subcat} value={subcat}>
                          {subcat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm text-white font-medium">Descripción de la Empresa *</label>
                <Textarea
                  value={formData.companyDescription}
                  onChange={(e) => handleInputChange('companyDescription', e.target.value)}
                  className="bg-white/10 border-white/30 text-white min-h-[100px]"
                  placeholder="Describe tu empresa, misión, valores y enfoque sostenible..."
                  required
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Users className="w-12 h-12 mx-auto text-green-400" />
              <h3 className="text-xl font-bold text-white">Servicios y Experiencia</h3>
              <p className="text-white/60">Define qué ofreces y tu trayectoria</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-white font-medium">Servicios Ofrecidos</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {availableServices.map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={service}
                        checked={formData.servicesOffered.includes(service)}
                        onCheckedChange={() => handleServiceToggle(service)}
                        className="border-white/30"
                      />
                      <label htmlFor={service} className="text-xs text-white cursor-pointer">
                        {service}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-white font-medium">Años de Experiencia</label>
                  <Input
                    type="number"
                    value={formData.yearsExperience}
                    onChange={(e) => handleInputChange('yearsExperience', parseInt(e.target.value) || 0)}
                    className="bg-white/10 border-white/30 text-white"
                    placeholder="0"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-white font-medium">Tamaño del Equipo</label>
                  <Input
                    type="number"
                    value={formData.teamSize}
                    onChange={(e) => handleInputChange('teamSize', parseInt(e.target.value) || 0)}
                    className="bg-white/10 border-white/30 text-white"
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-white font-medium">Mercado Objetivo</label>
                <Textarea
                  value={formData.targetMarket}
                  onChange={(e) => handleInputChange('targetMarket', e.target.value)}
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="Describe tu público objetivo: turistas nacionales, internacionales, familias, aventureros..."
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <MapPin className="w-12 h-12 mx-auto text-green-400" />
              <h3 className="text-xl font-bold text-white">Ubicación y Contacto</h3>
              <p className="text-white/60">Información de contacto y ubicación</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-white font-medium">Dirección Completa</label>
                <Textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="Calle, número, barrio, referencias..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-white font-medium">Ciudad</label>
                  <Input
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="bg-white/10 border-white/30 text-white"
                    placeholder="Bogotá"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-white font-medium">País</label>
                  <Input
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="bg-white/10 border-white/30 text-white"
                    placeholder="Colombia"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-white font-medium">Teléfono</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-white/10 border-white/30 text-white"
                    placeholder="+57 300 123 4567"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-white font-medium">Sitio Web</label>
                  <Input
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="bg-white/10 border-white/30 text-white"
                    placeholder="https://tuempresa.com"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Clock className="w-12 h-12 mx-auto text-green-400" />
              <h3 className="text-xl font-bold text-white">Horarios de Operación</h3>
              <p className="text-white/60">Define cuándo está disponible tu empresa</p>
            </div>
            
            <div className="space-y-4">
              {Object.entries(formData.operatingHours).map(([day, hours]) => (
                <div key={day} className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg">
                  <div className="w-20">
                    <Checkbox
                      checked={hours.isOpen}
                      onCheckedChange={(checked) => handleOperatingHourChange(day, 'isOpen', checked)}
                      className="border-white/30"
                    />
                    <label className="text-sm text-white ml-2 capitalize">
                      {day === 'monday' ? 'Lunes' :
                       day === 'tuesday' ? 'Martes' :
                       day === 'wednesday' ? 'Miércoles' :
                       day === 'thursday' ? 'Jueves' :
                       day === 'friday' ? 'Viernes' :
                       day === 'saturday' ? 'Sábado' : 'Domingo'}
                    </label>
                  </div>
                  
                  {hours.isOpen && (
                    <div className="flex space-x-2">
                      <Input
                        type="time"
                        value={hours.open}
                        onChange={(e) => handleOperatingHourChange(day, 'open', e.target.value)}
                        className="bg-white/10 border-white/30 text-white w-32"
                      />
                      <span className="text-white self-center">-</span>
                      <Input
                        type="time"
                        value={hours.close}
                        onChange={(e) => handleOperatingHourChange(day, 'close', e.target.value)}
                        className="bg-white/10 border-white/30 text-white w-32"
                      />
                    </div>
                  )}
                  
                  {!hours.isOpen && (
                    <span className="text-white/50">Cerrado</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Mail className="w-12 h-12 mx-auto text-green-400" />
              <h3 className="text-xl font-bold text-white">Confirmación</h3>
              <p className="text-white/60">Revisa tu información antes de enviar</p>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-2">Información Básica</h4>
                <p className="text-white/70 text-sm">Email: {formData.email}</p>
                <p className="text-white/70 text-sm">Empresa: {formData.companyName}</p>
                <p className="text-white/70 text-sm">Contacto: {formData.firstName} {formData.lastName}</p>
              </div>
              
              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-2">Categoría</h4>
                <p className="text-white/70 text-sm">
                  {companyCategories.find(c => c.value === formData.companyCategory)?.label}
                </p>
                {formData.companySubcategory && (
                  <p className="text-white/70 text-sm">Subcategoría: {formData.companySubcategory}</p>
                )}
              </div>
              
              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-2">Servicios</h4>
                <p className="text-white/70 text-sm">
                  {formData.servicesOffered.length > 0 
                    ? formData.servicesOffered.join(', ')
                    : 'No especificados'
                  }
                </p>
              </div>
            </div>
            
            <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
              <p className="text-yellow-300 text-sm">
                Al registrarte, recibirás un correo de verificación. Tu cuenta estará activa después de confirmar tu email.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900 flex items-center justify-center p-4">
      <HeaderButtons showPortalButtons={true} />
      
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-gasoek text-green-400 mb-2 uppercase tracking-wider">
            NATUR
          </h1>
          <p className="text-white text-lg font-jakarta">
            Registro de Empresa
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <div
                key={step}
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step <= currentStep
                    ? 'bg-green-400 border-green-400 text-black'
                    : 'border-white/30 text-white/50'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className="bg-green-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 6) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-8">
            {renderStep()}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="text-white border-white/30 hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Anterior
              </Button>
              
              {currentStep < 6 ? (
                <Button
                  onClick={nextStep}
                  className="bg-green-400 hover:bg-green-500 text-black"
                >
                  Siguiente
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={registerMutation.isPending}
                  className="bg-green-400 hover:bg-green-500 text-black"
                >
                  {registerMutation.isPending ? "Registrando..." : "Registrar Empresa"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyRegistration;