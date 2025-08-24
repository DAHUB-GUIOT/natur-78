import React, { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { HeaderButtons } from "@/components/layout/HeaderButtons";
import { GoogleAuthButton } from "@/components/GoogleAuthButton";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Upload, MapPin, Building, User, Camera, Check, ArrowLeft } from "lucide-react";

const PortalEmpresasAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Login State
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  // Registration State
  const [registrationData, setRegistrationData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    companyName: "",
    businessType: "",
    companyCategory: "",
    companySubcategory: "",
    companyDescription: "",
    yearsExperience: "",
    teamSize: "",
    address: "",
    city: "",
    country: "Colombia",
    website: "",
    coordinates: { lat: 4.7110, lng: -74.0721 },
    profilePicture: "",
    bio: "",
    servicesOffered: [] as string[],
    targetMarket: "",
    operatingHours: {},
    certifications: [] as string[],
    sustainabilityPractices: [] as string[],
    accessibilityFeatures: [] as string[],
    socialMedia: {},
    linkedinUrl: "",
    facebookUrl: "",
    instagramUrl: "",
    twitterUrl: "",
    emergencyContact: {}
  });

  // Company categories and subcategories
  const companyCategories = {
    "Agencias u Operadores Turísticos": [
      "Turismo de aventura y deportes extremos",
      "Ecoturismo y turismo de naturaleza",
      "Turismo cultural y patrimonial",
      "Turismo rural y agroturismo",
      "Turismo gastronómico",
      "Turismo de bienestar y salud",
      "Turismo educativo y científico"
    ],
    "Alojamientos Sostenibles": [
      "Hoteles ecológicos",
      "Ecolodges y cabañas",
      "Glamping sostenible",
      "Hostales verdes",
      "Casas rurales",
      "Alojamientos comunitarios"
    ],
    "Gastronomía Sostenible": [
      "Restaurantes farm-to-table",
      "Comida orgánica local",
      "Cocina tradicional",
      "Productos artesanales",
      "Experiencias gastronómicas"
    ],
    "Movilidad y Transporte Ecológico": [
      "Transporte eléctrico",
      "Bicicletas y cicloturismo",
      "Transporte público sostenible",
      "Vehículos híbridos",
      "Caminatas y senderismo"
    ],
    "ONG y Fundaciones": [
      "Conservación ambiental",
      "Desarrollo comunitario",
      "Educación ambiental",
      "Investigación científica",
      "Proyectos sociales"
    ],
    "Educación y Sensibilización Ambiental": [
      "Centros de interpretación",
      "Programas educativos",
      "Talleres ambientales",
      "Capacitación sostenible",
      "Investigación aplicada"
    ],
    "Tecnología para el Turismo Sostenible": [
      "Aplicaciones móviles",
      "Plataformas digitales",
      "IoT ambiental",
      "Realidad aumentada",
      "Análisis de datos"
    ],
    "Aliados y Patrocinadores": [
      "Empresas privadas",
      "Instituciones públicas",
      "Organizaciones internacionales",
      "Medios de comunicación",
      "Proveedores de servicios"
    ]
  };

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      return await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: () => {
      toast({
        title: "Inicio de sesión exitoso",
        description: "Redirigiendo al portal...",
      });
      window.location.replace('/portal-empresas');
    },
    onError: (error: any) => {
      toast({
        title: "Error de autenticación",
        description: error.message || "Credenciales inválidas",
        variant: "destructive",
      });
    },
  });

  // Registration mutation
  const registrationMutation = useMutation({
    mutationFn: async (userData: any) => {
      return await apiRequest('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          ...userData,
          role: 'empresa',
          registrationComplete: true,
          profileCompletion: 100,
          verificationLevel: 'verified'
        }),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: () => {
      toast({
        title: "Registro exitoso",
        description: "Tu cuenta empresarial ha sido creada. Revisa tu email para verificar tu cuenta.",
      });
      setIsLogin(true);
      setCurrentStep(1);
    },
    onError: (error: any) => {
      toast({
        title: "Error en el registro",
        description: error.message || "Error al crear la cuenta",
        variant: "destructive",
      });
    },
  });

  // File upload handler
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setRegistrationData(prev => ({
          ...prev,
          profilePicture: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(loginData);
  };

  const handleNextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRegistrationSubmit = () => {
    if (registrationData.password !== registrationData.confirmPassword) {
      toast({
        title: "Error de validación",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      });
      return;
    }
    registrationMutation.mutate(registrationData);
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(registrationData.firstName && registrationData.lastName && 
                 registrationData.email && registrationData.password && 
                 registrationData.phone);
      case 2:
        return !!(registrationData.companyName && registrationData.companyCategory && 
                 registrationData.companySubcategory && registrationData.companyDescription);
      case 3:
        return !!(registrationData.address && registrationData.city);
      case 4:
        return !!(registrationData.bio && registrationData.targetMarket);
      case 5:
        return true; // Optional step
      case 6:
        return true; // Optional step
      default:
        return false;
    }
  };

  // Render step components
  const renderStep = () => {
    if (isLogin) {
      return (
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-sm text-gray-800 dark:text-white font-medium">
              Correo Electrónico
            </Label>
            <Input
              type="email"
              value={loginData.email}
              onChange={(e) => setLoginData({...loginData, email: e.target.value})}
              className="h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 pl-4 pr-4"
              placeholder=""
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-gray-800 dark:text-white font-medium">
              Contraseña
            </Label>
            <Input
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              className="h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 pl-4 pr-4"
              placeholder=""
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-[#CAD95E] hover:bg-[#b8c755] text-black font-bold text-sm uppercase tracking-wide h-12 transition-all duration-200"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Iniciando sesión..." : "Ingresar al Portal"}
          </Button>
          
          {/* Google OAuth Separator */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 text-gray-600 dark:text-gray-400">O</span>
              </div>
            </div>
            <div className="mt-4">
              <GoogleAuthButton />
            </div>
          </div>
        </form>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="mx-auto h-12 w-12 text-[#CAD95E] mb-4" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Información Personal</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Comenzemos con tu información básica</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Nombre *</Label>
                <Input
                  value={registrationData.firstName}
                  onChange={(e) => setRegistrationData({...registrationData, firstName: e.target.value})}
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Apellido *</Label>
                <Input
                  value={registrationData.lastName}
                  onChange={(e) => setRegistrationData({...registrationData, lastName: e.target.value})}
                  placeholder="Tu apellido"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Email Empresarial *</Label>
              <Input
                type="email"
                value={registrationData.email}
                onChange={(e) => setRegistrationData({...registrationData, email: e.target.value})}
                placeholder="tu@empresa.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Teléfono *</Label>
              <Input
                value={registrationData.phone}
                onChange={(e) => setRegistrationData({...registrationData, phone: e.target.value})}
                placeholder="+57 300 123 4567"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Contraseña *</Label>
                <Input
                  type="password"
                  value={registrationData.password}
                  onChange={(e) => setRegistrationData({...registrationData, password: e.target.value})}
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Confirmar Contraseña *</Label>
                <Input
                  type="password"
                  value={registrationData.confirmPassword}
                  onChange={(e) => setRegistrationData({...registrationData, confirmPassword: e.target.value})}
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
            <div className="text-center mb-6">
              <Building className="mx-auto h-12 w-12 text-[#CAD95E] mb-4" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Información de la Empresa</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Detalles sobre tu negocio</p>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Nombre de la Empresa *</Label>
              <Input
                value={registrationData.companyName}
                onChange={(e) => setRegistrationData({...registrationData, companyName: e.target.value})}
                placeholder="Nombre de tu empresa"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Categoría Principal *</Label>
              <Select 
                value={registrationData.companyCategory} 
                onValueChange={(value) => setRegistrationData({...registrationData, companyCategory: value, companySubcategory: ""})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(companyCategories).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {registrationData.companyCategory && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Subcategoría *</Label>
                <Select 
                  value={registrationData.companySubcategory} 
                  onValueChange={(value) => setRegistrationData({...registrationData, companySubcategory: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una subcategoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {companyCategories[registrationData.companyCategory as keyof typeof companyCategories]?.map((subcategory) => (
                      <SelectItem key={subcategory} value={subcategory}>
                        {subcategory}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Descripción de la Empresa *</Label>
              <Textarea
                value={registrationData.companyDescription}
                onChange={(e) => setRegistrationData({...registrationData, companyDescription: e.target.value})}
                placeholder="Describe brevemente tu empresa y los servicios que ofreces..."
                rows={4}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Años de Experiencia</Label>
                <Input
                  type="number"
                  value={registrationData.yearsExperience}
                  onChange={(e) => setRegistrationData({...registrationData, yearsExperience: e.target.value})}
                  placeholder="5"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Tamaño del Equipo</Label>
                <Input
                  type="number"
                  value={registrationData.teamSize}
                  onChange={(e) => setRegistrationData({...registrationData, teamSize: e.target.value})}
                  placeholder="10"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <MapPin className="mx-auto h-12 w-12 text-[#CAD95E] mb-4" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Ubicación y Contacto</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Donde te encuentras y cómo contactarte</p>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Dirección Completa *</Label>
              <Input
                value={registrationData.address}
                onChange={(e) => setRegistrationData({...registrationData, address: e.target.value})}
                placeholder="Calle 123 #45-67, Bogotá"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Ciudad *</Label>
                <Input
                  value={registrationData.city}
                  onChange={(e) => setRegistrationData({...registrationData, city: e.target.value})}
                  placeholder="Bogotá"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">País</Label>
                <Input
                  value={registrationData.country}
                  onChange={(e) => setRegistrationData({...registrationData, country: e.target.value})}
                  placeholder="Colombia"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Sitio Web</Label>
              <Input
                value={registrationData.website}
                onChange={(e) => setRegistrationData({...registrationData, website: e.target.value})}
                placeholder="https://www.tuempresa.com"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Camera className="mx-auto h-12 w-12 text-[#CAD95E] mb-4" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Perfil y Servicios</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Personaliza tu perfil empresarial</p>
            </div>
            
            <div className="text-center">
              <div className="relative inline-block">
                {registrationData.profilePicture ? (
                  <img 
                    src={registrationData.profilePicture} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full object-cover border-4 border-[#CAD95E]"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-4 border-[#CAD95E]">
                    <Camera className="h-8 w-8 text-gray-400" />
                  </div>
                )}
                <Button
                  type="button"
                  size="sm"
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-[#CAD95E] hover:bg-[#b8c755] text-black"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4" />
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Foto de perfil de la empresa</p>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Biografía Empresarial *</Label>
              <Textarea
                value={registrationData.bio}
                onChange={(e) => setRegistrationData({...registrationData, bio: e.target.value})}
                placeholder="Cuéntanos la historia de tu empresa, tu misión y valores..."
                rows={4}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Mercado Objetivo *</Label>
              <Input
                value={registrationData.targetMarket}
                onChange={(e) => setRegistrationData({...registrationData, targetMarket: e.target.value})}
                placeholder="Ej: Turistas internacionales, familias, aventureros"
                required
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Check className="mx-auto h-12 w-12 text-[#CAD95E] mb-4" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Certificaciones</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Opcional: Agrega tus certificaciones y prácticas sostenibles</p>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Certificaciones</Label>
              <Textarea
                value={registrationData.certifications.join('\n')}
                onChange={(e) => setRegistrationData({...registrationData, certifications: e.target.value.split('\n').filter(c => c.trim())})}
                placeholder="Ej: ISO 14001, Certificación de Turismo Sostenible..."
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Prácticas de Sostenibilidad</Label>
              <Textarea
                value={registrationData.sustainabilityPractices.join('\n')}
                onChange={(e) => setRegistrationData({...registrationData, sustainabilityPractices: e.target.value.split('\n').filter(p => p.trim())})}
                placeholder="Ej: Uso de energías renovables, reciclaje..."
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Características de Accesibilidad</Label>
              <Textarea
                value={registrationData.accessibilityFeatures.join('\n')}
                onChange={(e) => setRegistrationData({...registrationData, accessibilityFeatures: e.target.value.split('\n').filter(a => a.trim())})}
                placeholder="Ej: Acceso para sillas de ruedas, señalización braille..."
                rows={3}
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="mx-auto h-12 w-12 bg-[#CAD95E] rounded-full flex items-center justify-center mb-4">
                <span className="text-black font-bold">@</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Redes Sociales</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Opcional: Conecta tus redes sociales</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">LinkedIn</Label>
                <Input
                  value={registrationData.linkedinUrl}
                  onChange={(e) => setRegistrationData({...registrationData, linkedinUrl: e.target.value})}
                  placeholder="https://www.linkedin.com/company/tu-empresa"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Facebook</Label>
                <Input
                  value={registrationData.facebookUrl}
                  onChange={(e) => setRegistrationData({...registrationData, facebookUrl: e.target.value})}
                  placeholder="https://www.facebook.com/tu-empresa"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Instagram</Label>
                <Input
                  value={registrationData.instagramUrl}
                  onChange={(e) => setRegistrationData({...registrationData, instagramUrl: e.target.value})}
                  placeholder="https://www.instagram.com/tu-empresa"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Twitter</Label>
                <Input
                  value={registrationData.twitterUrl}
                  onChange={(e) => setRegistrationData({...registrationData, twitterUrl: e.target.value})}
                  placeholder="https://www.twitter.com/tu-empresa"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <HeaderButtons showPortalButtons={true} />
      
      {/* Back to Home */}
      <div className="absolute top-6 left-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.location.href = '/'}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Inicio</span>
        </Button>
      </div>
      
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-2xl">
          {/* NATUR Branding */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-gasoek text-[#CAD95E] mb-2 uppercase tracking-wider">
              NATUR
            </h1>
            <p className="text-gray-800 dark:text-white text-lg">
              Portal Empresas
            </p>
          </div>

          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center space-x-4 mb-6">
                <Button
                  variant={isLogin ? "default" : "outline"}
                  onClick={() => setIsLogin(true)}
                  className={isLogin ? "bg-[#CAD95E] text-black" : ""}
                >
                  Iniciar Sesión
                </Button>
                <Button
                  variant={!isLogin ? "default" : "outline"}
                  onClick={() => setIsLogin(false)}
                  className={!isLogin ? "bg-[#CAD95E] text-black" : ""}
                >
                  Registrar Empresa
                </Button>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLogin ? 'login' : 'register'}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {isLogin ? (
                    <>
                      <CardTitle className="text-2xl text-gray-800 dark:text-white font-bold">
                        Iniciar Sesión
                      </CardTitle>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Accede a tu cuenta empresarial
                      </p>
                    </>
                  ) : (
                    <>
                      <CardTitle className="text-2xl text-gray-800 dark:text-white font-bold">
                        Registro Empresarial Completo
                      </CardTitle>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Paso {currentStep} de 6 - Crea tu perfil empresarial completo
                      </p>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-4">
                        <div 
                          className="bg-[#CAD95E] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(currentStep / 6) * 100}%` }}
                        ></div>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </CardHeader>
            
            <CardContent className="pt-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLogin ? 'login-form' : `step-${currentStep}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
              
              {/* Navigation Buttons for Registration */}
              {!isLogin && (
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    className="flex items-center space-x-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Anterior</span>
                  </Button>
                  
                  {currentStep < 6 ? (
                    <Button
                      onClick={handleNextStep}
                      disabled={!validateStep(currentStep)}
                      className="bg-[#CAD95E] hover:bg-[#b8c755] text-black flex items-center space-x-2"
                    >
                      <span>Siguiente</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleRegistrationSubmit}
                      disabled={registrationMutation.isPending}
                      className="bg-[#CAD95E] hover:bg-[#b8c755] text-black flex items-center space-x-2"
                    >
                      <Check className="h-4 w-4" />
                      <span>
                        {registrationMutation.isPending ? "Registrando..." : "Completar Registro"}
                      </span>
                    </Button>
                  )}
                </div>
              )}
              
              {/* Login Additional Options */}
              {isLogin && (
                <>
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center space-y-2">
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        ¿No tienes una cuenta empresarial?
                      </p>
                      <Button 
                        variant="outline" 
                        className="text-[#CAD95E] border-[#CAD95E] hover:bg-[#CAD95E] hover:text-black text-sm"
                        onClick={() => setIsLogin(false)}
                      >
                        Registrar Empresa
                      </Button>
                    </div>
                  </div>

                  {/* Test Account Info */}
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Cuenta de prueba:</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Email: dahub.tech@gmail.com</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Contraseña: dahub123</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PortalEmpresasAuth;