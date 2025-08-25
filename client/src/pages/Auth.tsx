import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { GoogleAuthButton } from "@/components/GoogleAuthButton";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Upload, MapPin, Building, User, Camera, Check, ArrowLeft, Mail, Briefcase, Clock, Languages, Shield, Building2 } from "lucide-react";

// Company categories with comprehensive subcategories
const companyCategories = {
  "Agencias u Operadores Turísticos": [
    "Agencia de Viajes Minorista",
    "Agencia de Viajes Mayorista", 
    "Operador Turístico Receptivo",
    "Operador Turístico Emisivo",
    "Turismo de Aventura",
    "Ecoturismo y Turismo de Naturaleza",
    "Turismo Cultural y Patrimonial",
    "Turismo Rural y Agroturismo",
    "Turismo de Bienestar y Salud",
    "Turismo Educativo",
    "Turismo Corporativo y de Incentivos",
    "Turismo Gastronómico",
    "Turismo Deportivo",
    "Turismo Científico"
  ],
  "Alojamientos Sostenibles": [
    "Ecolodges y Hoteles Ecológicos",
    "Cabañas y Glamping Sostenible",
    "Hostales Verdes",
    "Casas Rurales Sostenibles",
    "Hoteles Boutique Ecológicos",
    "Resorts Sostenibles",
    "Albergues Ecológicos",
    "Camping Ecológico"
  ],
  "Gastronomía Sostenible": [
    "Restaurantes Farm-to-Table",
    "Cocina Local y Regional",
    "Restaurantes Orgánicos",
    "Food Trucks Sostenibles",
    "Bares y Cafeterías Verdes",
    "Experiencias Gastronómicas",
    "Productos Artesanales",
    "Mercados Locales"
  ],
  "Movilidad y Transporte Ecológico": [
    "Transporte Eléctrico",
    "Bicicletas y E-bikes",
    "Transporte Público Sostenible",
    "Car Sharing Verde",
    "Transporte Fluvial Ecológico",
    "Senderismo y Trekking",
    "Transporte en Vehículos Híbridos"
  ],
  "ONG y Fundaciones": [
    "Conservación Ambiental",
    "Educación Ambiental",
    "Desarrollo Comunitario",
    "Investigación Científica",
    "Protección de Fauna",
    "Reforestación",
    "Gestión de Residuos",
    "Energías Renovables"
  ],
  "Educación y Sensibilización Ambiental": [
    "Centros de Interpretación",
    "Programas Educativos",
    "Talleres Ambientales",
    "Investigación Aplicada",
    "Capacitación Empresarial",
    "Educación Infantil Ambiental",
    "Formación Profesional Verde"
  ],
  "Tecnología para el Turismo Sostenible": [
    "Plataformas Digitales",
    "Apps de Turismo Verde",
    "Sistemas de Gestión Ambiental",
    "IoT para Turismo",
    "Inteligencia Artificial",
    "Realidad Virtual/Aumentada",
    "Blockchain para Turismo"
  ],
  "Aliados y Patrocinadores": [
    "Instituciones Financieras Verdes",
    "Empresas de Tecnología Sostenible",
    "Medios de Comunicación",
    "Organismos Internacionales",
    "Gobierno y Entes Reguladores",
    "Universidades e Instituciones Académicas",
    "Certificadoras Ambientales"
  ]
};

const Auth = () => {
  const [location] = useLocation();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Suppress ResizeObserver loop error
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes('ResizeObserver loop completed')) {
        event.stopImmediatePropagation();
        event.preventDefault();
        return true;
      }
      return false;
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event.reason && event.reason.message && event.reason.message.includes('ResizeObserver loop completed')) {
        event.preventDefault();
        return true;
      }
    };
    
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);
  
  // Determine if this is empresas or consentidos based on URL
  const isEmpresas = location.includes('empresas');
  
  // State management
  const [isLogin, setIsLogin] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);

  // Login State
  const [loginData, setLoginData] = useState({
    email: isEmpresas ? "nicolasdominguez2603@gmail.com" : "",
    password: isEmpresas ? "test123456" : ""
  });

  // Complete Registration State - ALL 15 steps for empresas
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
    emergencyContact: {
      name: "",
      phone: "",
      email: "",
      relationship: ""
    },
    // Step 5: Messaging Configuration
    messagingEnabled: true,
    messagingBio: "",
    acceptsInquiries: true,
    responseTimeHours: 24,
    // Step 6: Experience Configuration
    experienceSetupComplete: true,
    defaultExperienceCategory: "",
    defaultMeetingPoint: "",
    defaultCancellationPolicy: "",
    // Step 7-10: Additional fields
    businessLicense: "",
    taxId: "",
    languages: [] as string[],
    acceptTerms: false,
    // Step 11: Payment Configuration
    paymentMethods: [] as string[],
    invoiceEmail: "",
    taxInformation: "",
    // Step 12: Notification Preferences
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    // Step 13: Security Settings
    twoFactorEnabled: false,
    loginNotifications: true,
    // Step 14: API Settings
    apiAccess: false,
    webhookUrl: "",
    // Step 15: Final Configuration
    setupComplete: false
  });

  // Simple registration data for non-empresas
  const [simpleRegisterData, setSimpleRegisterData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    userType: "viajero"
  });

  // Company categories and subcategories for empresas
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
      
      const redirectUrl = isEmpresas ? '/portal-empresas' : '/portal-viajeros';
      window.location.replace(redirectUrl);
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
      const payload = isEmpresas ? {
        ...userData,
        role: 'empresa',
        registrationComplete: true,
        profileCompletion: 100,
        verificationLevel: 'verified'
      } : {
        ...userData,
        role: 'viajero'
      };

      return await apiRequest('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: () => {
      toast({
        title: "Registro exitoso",
        description: isEmpresas 
          ? "Tu cuenta empresarial ha sido creada. Revisa tu email para verificar tu cuenta."
          : "Tu cuenta ha sido creada. Revisa tu email para verificar tu cuenta.",
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
    if (isEmpresas && currentStep < 15) {
      setCurrentStep(currentStep + 1);
    } else if (!isEmpresas && currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRegistrationSubmit = () => {
    if (isEmpresas) {
      if (registrationData.password !== registrationData.confirmPassword) {
        toast({
          title: "Error de validación",
          description: "Las contraseñas no coinciden",
          variant: "destructive",
        });
        return;
      }
      registrationMutation.mutate(registrationData);
    } else {
      registrationMutation.mutate(simpleRegisterData);
    }
  };

  // Load EcoVentura test data function (for empresas only)
  const loadTestData = () => {
    if (!isEmpresas) return;
    
    setRegistrationData({
      firstName: "Nicolas",
      lastName: "Rodriguez",
      email: "nicolasdominguez2603@gmail.com",
      password: "test123456",
      confirmPassword: "test123456",
      phone: "+57 305 987 6543",
      companyName: "EcoVentura Colombia",
      businessType: "Turismo",
      companyCategory: "Agencias u Operadores Turísticos",
      companySubcategory: "Operador Turístico Especializado en Ecoturismo",
      companyDescription: "Operadora turística especializada en experiencias de ecoturismo y aventura sostenible en Colombia. Promovemos la conservación del medio ambiente mientras ofrecemos experiencias únicas en contacto con la naturaleza.",
      yearsExperience: "8",
      teamSize: "25",
      address: "Carrera 15 #85-32, Zona Rosa",
      city: "Bogotá",
      country: "Colombia",
      website: "https://ecoventuracolombia.co",
      coordinates: { lat: 4.6659, lng: -74.0567 },
      profilePicture: "",
      bio: "EcoVentura Colombia es una operadora turística comprometida con la sostenibilidad y la conservación. Ofrecemos experiencias únicas de ecoturismo que conectan a los viajeros con la biodiversidad colombiana, promoviendo el desarrollo de las comunidades locales y la protección del medio ambiente.",
      servicesOffered: ["Tours de ecoturismo", "Avistamiento de aves", "Caminatas ecológicas", "Turismo rural comunitario"],
      targetMarket: "Viajeros conscientes, amantes de la naturaleza, grupos ecológicos",
      operatingHours: {},
      certifications: ["Rainforest Alliance", "Travelife Certified", "ISO 14001"],
      sustainabilityPractices: ["Turismo carbono neutro", "Apoyo a comunidades locales", "Conservación de flora y fauna"],
      accessibilityFeatures: ["Senderos adaptados", "Guías especializados", "Transporte accesible"],
      socialMedia: {},
      linkedinUrl: "https://linkedin.com/company/ecoventura-colombia",
      facebookUrl: "https://facebook.com/ecoventuracol",
      instagramUrl: "https://instagram.com/ecoventuracolombia",
      twitterUrl: "https://twitter.com/ecoventuracol",
      emergencyContact: {
        name: "María Fernández",
        phone: "+57 312 456 7890",
        email: "emergencias@ecoventuracolombia.co",
        relationship: "Coordinadora de Seguridad"
      },
      messagingEnabled: true,
      messagingBio: "¡Hola! Somos EcoVentura Colombia. Estamos aquí para ayudarte a descubrir la increíble biodiversidad de Colombia a través de experiencias de ecoturismo sostenible. Conectemos con la naturaleza y las comunidades locales.",
      acceptsInquiries: true,
      responseTimeHours: 12,
      experienceSetupComplete: true,
      defaultExperienceCategory: "ecoturismo",
      defaultMeetingPoint: "Oficinas EcoVentura - Carrera 15 #85-32",
      defaultCancellationPolicy: "Cancelación gratuita hasta 72 horas antes del tour. Reagendamos sin costo adicional por condiciones climáticas adversas.",
      businessLicense: "TUR-2023-987654",
      taxId: "900987654-3",
      languages: ["Español", "Inglés", "Portugués"],
      acceptTerms: true,
      paymentMethods: ["transferencia", "tarjeta"],
      invoiceEmail: "nicolasdominguez2603@gmail.com",
      taxInformation: "Régimen simplificado",
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: true,
      twoFactorEnabled: false,
      loginNotifications: true,
      apiAccess: false,
      webhookUrl: "",
      setupComplete: true
    });
    
    toast({
      title: "Datos de prueba cargados",
      description: "Se han cargado los datos completos de EcoVentura Colombia",
    });
  };

  const validateStep = (step: number): boolean => {
    if (!isEmpresas) {
      // Simple validation for non-empresas
      switch (step) {
        case 1:
          return !!(simpleRegisterData.firstName && simpleRegisterData.lastName && 
                   simpleRegisterData.email && simpleRegisterData.password);
        default:
          return false;
      }
    }

    // Complex validation for empresas
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
        return !!(registrationData.messagingBio && registrationData.responseTimeHours);
      case 6:
        return !!(registrationData.defaultExperienceCategory && registrationData.defaultMeetingPoint);
      case 7:
        return true; // Operating hours - optional
      case 8:
        return registrationData.languages.length > 0;
      case 9:
        return true; // Social media - optional
      case 10:
        return !!(registrationData.emergencyContact.name && registrationData.emergencyContact.phone && registrationData.acceptTerms);
      case 11:
        return true; // Payment configuration - optional initially
      case 12:
        return true; // Notification preferences - optional
      case 13:
        return true; // Security and privacy settings - optional
      case 14:
        return true; // API integration settings - optional
      case 15:
        return true; // Final review - always valid
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

    // For non-empresas, show simple registration
    if (!isEmpresas) {
      return (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <User className="mx-auto h-12 w-12 text-[#CAD95E] mb-4" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Registro de Viajero</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Únete a nuestra comunidad</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Nombre *</Label>
              <Input
                value={simpleRegisterData.firstName}
                onChange={(e) => setSimpleRegisterData({...simpleRegisterData, firstName: e.target.value})}
                placeholder="Tu nombre"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Apellido *</Label>
              <Input
                value={simpleRegisterData.lastName}
                onChange={(e) => setSimpleRegisterData({...simpleRegisterData, lastName: e.target.value})}
                placeholder="Tu apellido"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium">Email *</Label>
            <Input
              type="email"
              value={simpleRegisterData.email}
              onChange={(e) => setSimpleRegisterData({...simpleRegisterData, email: e.target.value})}
              placeholder="tu@email.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium">Contraseña *</Label>
            <Input
              type="password"
              value={simpleRegisterData.password}
              onChange={(e) => setSimpleRegisterData({...simpleRegisterData, password: e.target.value})}
              placeholder="••••••••"
              required
            />
          </div>
        </div>
      );
    }

    // For empresas - show 15 step registration
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
                placeholder="Calle 123 #45-67"
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
                <Label className="text-sm font-medium">País *</Label>
                <Select value={registrationData.country} onValueChange={(value) => setRegistrationData({...registrationData, country: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Colombia">Colombia</SelectItem>
                    <SelectItem value="Ecuador">Ecuador</SelectItem>
                    <SelectItem value="Perú">Perú</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Sitio Web</Label>
              <Input
                value={registrationData.website}
                onChange={(e) => setRegistrationData({...registrationData, website: e.target.value})}
                placeholder="https://tuempresa.com"
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
              <p className="text-sm text-gray-600 dark:text-gray-400">Imagen y descripción de tus servicios</p>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Foto de Perfil</Label>
              <div className="flex items-center space-x-4">
                {registrationData.profilePicture && (
                  <img 
                    src={registrationData.profilePicture} 
                    alt="Preview" 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-2"
                >
                  <Upload className="h-4 w-4" />
                  <span>Subir Foto</span>
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Bio de la Empresa *</Label>
              <Textarea
                value={registrationData.bio}
                onChange={(e) => setRegistrationData({...registrationData, bio: e.target.value})}
                placeholder="Cuenta la historia de tu empresa, tu misión y valores..."
                rows={4}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Mercado Objetivo *</Label>
              <Input
                value={registrationData.targetMarket}
                onChange={(e) => setRegistrationData({...registrationData, targetMarket: e.target.value})}
                placeholder="Familias, parejas, aventureros, etc."
                required
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Mail className="mx-auto h-12 w-12 text-[#CAD95E] mb-4" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Configuración de Mensajería</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Configura cómo quieres comunicarte con clientes</p>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Mensaje de Bienvenida *</Label>
              <Textarea
                value={registrationData.messagingBio}
                onChange={(e) => setRegistrationData({...registrationData, messagingBio: e.target.value})}
                placeholder="¡Hola! Bienvenido a nuestra empresa. Estamos aquí para ayudarte..."
                rows={3}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Tiempo de Respuesta (horas) *</Label>
              <Select 
                value={registrationData.responseTimeHours.toString()} 
                onValueChange={(value) => setRegistrationData({...registrationData, responseTimeHours: parseInt(value)})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tiempo de respuesta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hora</SelectItem>
                  <SelectItem value="6">6 horas</SelectItem>
                  <SelectItem value="12">12 horas</SelectItem>
                  <SelectItem value="24">24 horas</SelectItem>
                  <SelectItem value="48">48 horas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Briefcase className="mx-auto h-12 w-12 text-[#CAD95E] mb-4" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Configuración de Experiencias</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Configuración por defecto para tus experiencias</p>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Categoría de Experiencia por Defecto *</Label>
              <Select 
                value={registrationData.defaultExperienceCategory} 
                onValueChange={(value) => setRegistrationData({...registrationData, defaultExperienceCategory: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ecoturismo">Ecoturismo</SelectItem>
                  <SelectItem value="aventura">Aventura</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="gastronomico">Gastronómico</SelectItem>
                  <SelectItem value="bienestar">Bienestar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Punto de Encuentro por Defecto *</Label>
              <Input
                value={registrationData.defaultMeetingPoint}
                onChange={(e) => setRegistrationData({...registrationData, defaultMeetingPoint: e.target.value})}
                placeholder="Plaza principal, hotel, oficina, etc."
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Política de Cancelación por Defecto</Label>
              <Textarea
                value={registrationData.defaultCancellationPolicy}
                onChange={(e) => setRegistrationData({...registrationData, defaultCancellationPolicy: e.target.value})}
                placeholder="Describe tu política de cancelación..."
                rows={3}
              />
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Clock className="mx-auto h-12 w-12 text-[#CAD95E] mb-4" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Horarios de Operación</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Configura tus horarios de atención</p>
            </div>
            
            <div className="text-center p-8">
              <p className="text-gray-600 dark:text-gray-400">
                Los horarios de operación se pueden configurar después del registro inicial.
                Por ahora, continuemos con el proceso.
              </p>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Languages className="mx-auto h-12 w-12 text-[#CAD95E] mb-4" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Idiomas y Certificaciones</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Idiomas que hablas y certificaciones</p>
            </div>
            
            <div className="space-y-4">
              <Label className="text-sm font-medium">Idiomas que Hablas *</Label>
              <div className="grid grid-cols-2 gap-2">
                {["Español", "Inglés", "Francés", "Portugués", "Alemán", "Italiano"].map((lang) => (
                  <div key={lang} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={lang}
                      checked={registrationData.languages.includes(lang)}
                      onChange={(e) => {
                        const langs = e.target.checked 
                          ? [...registrationData.languages, lang]
                          : registrationData.languages.filter(l => l !== lang);
                        setRegistrationData({...registrationData, languages: langs});
                      }}
                      className="rounded"
                    />
                    <Label htmlFor={lang} className="text-sm">{lang}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Licencia Comercial</Label>
              <Input
                value={registrationData.businessLicense}
                onChange={(e) => setRegistrationData({...registrationData, businessLicense: e.target.value})}
                placeholder="Número de licencia comercial"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">NIT/RUT</Label>
              <Input
                value={registrationData.taxId}
                onChange={(e) => setRegistrationData({...registrationData, taxId: e.target.value})}
                placeholder="123456789-1"
              />
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="mx-auto h-12 w-12 text-[#CAD95E] mb-4" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Redes Sociales</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Conecta tus redes sociales (opcional)</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">LinkedIn</Label>
                <Input
                  value={registrationData.linkedinUrl}
                  onChange={(e) => setRegistrationData({...registrationData, linkedinUrl: e.target.value})}
                  placeholder="https://linkedin.com/company/tuempresa"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Facebook</Label>
                <Input
                  value={registrationData.facebookUrl}
                  onChange={(e) => setRegistrationData({...registrationData, facebookUrl: e.target.value})}
                  placeholder="https://facebook.com/tuempresa"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Instagram</Label>
                <Input
                  value={registrationData.instagramUrl}
                  onChange={(e) => setRegistrationData({...registrationData, instagramUrl: e.target.value})}
                  placeholder="https://instagram.com/tuempresa"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Twitter/X</Label>
                <Input
                  value={registrationData.twitterUrl}
                  onChange={(e) => setRegistrationData({...registrationData, twitterUrl: e.target.value})}
                  placeholder="https://twitter.com/tuempresa"
                />
              </div>
            </div>
          </div>
        );

      case 10:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Shield className="mx-auto h-12 w-12 text-[#CAD95E] mb-4" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Contacto de Emergencia</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Información de contacto de emergencia</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Nombre Completo *</Label>
                <Input
                  value={registrationData.emergencyContact.name || ""}
                  onChange={(e) => setRegistrationData({
                    ...registrationData, 
                    emergencyContact: {
                      ...registrationData.emergencyContact,
                      name: e.target.value
                    }
                  })}
                  placeholder="Juan Pérez"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Teléfono *</Label>
                <Input
                  value={registrationData.emergencyContact.phone || ""}
                  onChange={(e) => setRegistrationData({
                    ...registrationData,
                    emergencyContact: {
                      ...registrationData.emergencyContact,
                      phone: e.target.value
                    }
                  })}
                  placeholder="+57 300 123 4567"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Email *</Label>
              <Input
                type="email"
                value={registrationData.emergencyContact.email || ""}
                onChange={(e) => setRegistrationData({
                  ...registrationData,
                  emergencyContact: {
                    ...registrationData.emergencyContact,
                    email: e.target.value
                  }
                })}
                placeholder="contacto@empresa.com"
                required
              />
            </div>
            
            <div className="space-y-4 mt-6">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={registrationData.acceptTerms}
                  onChange={(e) => setRegistrationData({...registrationData, acceptTerms: e.target.checked})}
                  className="rounded"
                  required
                />
                <Label htmlFor="acceptTerms" className="text-sm">
                  Acepto los términos y condiciones y la política de privacidad *
                </Label>
              </div>
            </div>
          </div>
        );

      case 11:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Briefcase className="mx-auto h-12 w-12 text-[#CAD95E] mb-4" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Configuración de Pagos</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Configura tus métodos de pago y facturación</p>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Métodos de Pago Aceptados</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="transferencia"
                    checked={registrationData.paymentMethods.includes("transferencia")}
                    onChange={(e) => {
                      const methods = e.target.checked 
                        ? [...registrationData.paymentMethods, "transferencia"]
                        : registrationData.paymentMethods.filter(m => m !== "transferencia");
                      setRegistrationData({...registrationData, paymentMethods: methods});
                    }}
                  />
                  <Label htmlFor="transferencia" className="text-sm">Transferencia Bancaria</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="tarjeta"
                    checked={registrationData.paymentMethods.includes("tarjeta")}
                    onChange={(e) => {
                      const methods = e.target.checked 
                        ? [...registrationData.paymentMethods, "tarjeta"]
                        : registrationData.paymentMethods.filter(m => m !== "tarjeta");
                      setRegistrationData({...registrationData, paymentMethods: methods});
                    }}
                  />
                  <Label htmlFor="tarjeta" className="text-sm">Tarjeta de Crédito/Débito</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="efectivo"
                    checked={registrationData.paymentMethods.includes("efectivo")}
                    onChange={(e) => {
                      const methods = e.target.checked 
                        ? [...registrationData.paymentMethods, "efectivo"]
                        : registrationData.paymentMethods.filter(m => m !== "efectivo");
                      setRegistrationData({...registrationData, paymentMethods: methods});
                    }}
                  />
                  <Label htmlFor="efectivo" className="text-sm">Efectivo</Label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Email para Facturación</Label>
              <Input
                type="email"
                value={registrationData.invoiceEmail}
                onChange={(e) => setRegistrationData({...registrationData, invoiceEmail: e.target.value})}
                placeholder="facturacion@empresa.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Información Fiscal</Label>
              <Input
                value={registrationData.taxInformation}
                onChange={(e) => setRegistrationData({...registrationData, taxInformation: e.target.value})}
                placeholder="Régimen simplificado, IVA, etc."
              />
            </div>
          </div>
        );

      case 12:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Mail className="mx-auto h-12 w-12 text-[#CAD95E] mb-4" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Configuración de Notificaciones</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Configura cómo quieres recibir notificaciones</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Notificaciones por Email</Label>
                  <p className="text-xs text-gray-500">Recibe actualizaciones importantes por email</p>
                </div>
                <input
                  type="checkbox"
                  checked={registrationData.emailNotifications}
                  onChange={(e) => setRegistrationData({...registrationData, emailNotifications: e.target.checked})}
                  className="rounded"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Notificaciones SMS</Label>
                  <p className="text-xs text-gray-500">Recibe notificaciones urgentes por SMS</p>
                </div>
                <input
                  type="checkbox"
                  checked={registrationData.smsNotifications}
                  onChange={(e) => setRegistrationData({...registrationData, smsNotifications: e.target.checked})}
                  className="rounded"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Emails de Marketing</Label>
                  <p className="text-xs text-gray-500">Recibe ofertas y novedades del festival</p>
                </div>
                <input
                  type="checkbox"
                  checked={registrationData.marketingEmails}
                  onChange={(e) => setRegistrationData({...registrationData, marketingEmails: e.target.checked})}
                  className="rounded"
                />
              </div>
            </div>
          </div>
        );

      case 13:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Shield className="mx-auto h-12 w-12 text-[#CAD95E] mb-4" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Configuración de Seguridad</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Configura la seguridad de tu cuenta</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Autenticación de Dos Factores</Label>
                  <p className="text-xs text-gray-500">Agrega una capa extra de seguridad</p>
                </div>
                <input
                  type="checkbox"
                  checked={registrationData.twoFactorEnabled}
                  onChange={(e) => setRegistrationData({...registrationData, twoFactorEnabled: e.target.checked})}
                  className="rounded"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Notificaciones de Login</Label>
                  <p className="text-xs text-gray-500">Te avisamos cuando alguien acceda a tu cuenta</p>
                </div>
                <input
                  type="checkbox"
                  checked={registrationData.loginNotifications}
                  onChange={(e) => setRegistrationData({...registrationData, loginNotifications: e.target.checked})}
                  className="rounded"
                />
              </div>
            </div>
          </div>
        );

      case 14:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Building2 className="mx-auto h-12 w-12 text-[#CAD95E] mb-4" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Configuración de API</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Configuración para integraciones avanzadas</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Acceso API</Label>
                  <p className="text-xs text-gray-500">Habilitar acceso programático a tu cuenta</p>
                </div>
                <input
                  type="checkbox"
                  checked={registrationData.apiAccess}
                  onChange={(e) => setRegistrationData({...registrationData, apiAccess: e.target.checked})}
                  className="rounded"
                />
              </div>
              
              {registrationData.apiAccess && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">URL de Webhook</Label>
                  <Input
                    value={registrationData.webhookUrl}
                    onChange={(e) => setRegistrationData({...registrationData, webhookUrl: e.target.value})}
                    placeholder="https://tuservidor.com/webhook"
                  />
                  <p className="text-xs text-gray-500">URL donde recibirás notificaciones automáticas</p>
                </div>
              )}
            </div>
          </div>
        );

      case 15:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Check className="mx-auto h-12 w-12 text-[#CAD95E] mb-4" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Configuración Final</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Revisa tu información antes de completar</p>
            </div>
            
            <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex justify-between">
                <span className="font-medium">Empresa:</span>
                <span>{registrationData.companyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Email:</span>
                <span>{registrationData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Categoría:</span>
                <span>{registrationData.companyCategory}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Ubicación:</span>
                <span>{registrationData.city}, {registrationData.country}</span>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Al completar el registro, confirmas que toda la información es correcta.
              </p>
            </div>
          </div>
        );

      default:
        return <div>Paso no encontrado</div>;
    }
  };

  const currentConfig = {
    title: isEmpresas ? "Portal Empresas" : "Con-Sentidos",
    subtitle: isEmpresas 
      ? "Conecta tu empresa con el ecosistema de turismo sostenible"
      : "Descubre experiencias auténticas y conecta con viajeros conscientes"
  };

  const maxSteps = isEmpresas ? 15 : 6;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1a0a] via-[#1a2f1a] to-[#0f2a0f] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#cad95e]/10 via-transparent to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-full opacity-20"></div>
      
      {/* Back to Home */}
      <div className="absolute top-6 left-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.location.href = '/'}
          className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border-[#CAD95E]/30 text-white hover:bg-[#CAD95E]/20"
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
            <p className="text-white text-lg">
              {currentConfig.title}
            </p>
          </div>

          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-white/20 shadow-2xl">
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
                  {isEmpresas ? "Registrar Empresa" : "Registrarse"}
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
                        Accede a tu cuenta
                      </p>
                    </>
                  ) : (
                    <>
                      <CardTitle className="text-2xl text-gray-800 dark:text-white font-bold">
                        {isEmpresas ? "Registro Empresarial Completo" : "Registro de Usuario"}
                      </CardTitle>
                      {isEmpresas ? (
                        <>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Paso {currentStep} de 15 - Configuración completa ANTES del login
                          </p>
                          
                          {/* Progress Bar */}
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-4">
                            <div 
                              className="bg-[#CAD95E] h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(currentStep / 15) * 100}%` }}
                            ></div>
                          </div>
                          
                          {/* Load Test Data Button */}
                          <div className="mt-4 text-center">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => loadTestData()}
                              className="text-xs"
                            >
                              🔧 Cargar Datos de Prueba (EcoVentura)
                            </Button>
                          </div>
                        </>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Únete a nuestra comunidad
                        </p>
                      )}
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
                  
                  {currentStep < maxSteps ? (
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
                        {isEmpresas ? "¿No tienes una cuenta empresarial?" : "¿No tienes una cuenta?"}
                      </p>
                      <Button 
                        variant="outline" 
                        className="text-[#CAD95E] border-[#CAD95E] hover:bg-[#CAD95E] hover:text-black text-sm"
                        onClick={() => setIsLogin(false)}
                      >
                        {isEmpresas ? "Registrar Empresa" : "Registrarse"}
                      </Button>
                    </div>
                  </div>

                  {/* Test Account Info for empresas */}
                  {isEmpresas && (
                    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Cuenta de prueba:</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Email: nicolasdominguez2603@gmail.com</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Contraseña: test123456</p>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;