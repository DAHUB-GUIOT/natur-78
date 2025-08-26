import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { HeaderButtons } from "@/components/layout/HeaderButtons";
import { 
  Building2, User, MapPin, Clock, CheckCircle, ArrowLeft, ArrowRight, Mail, Phone, Globe, Users, Calendar, Target, Award, Briefcase, Shield, CreditCard, FileText, Heart, Accessibility, Languages, Instagram, Twitter, Facebook, Linkedin
} from "lucide-react";

// COMPLETE registration schema - ALL configuration BEFORE login
const registrationSchema = z.object({
  // Step 1: Basic Information
  firstName: z.string().min(2, "Nombre requerido"),
  lastName: z.string().min(2, "Apellido requerido"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
  confirmPassword: z.string(),
  
  // Step 2: Company Information
  companyName: z.string().min(2, "Nombre de empresa requerido"),
  companyDescription: z.string().min(50, "Descripción mínimo 50 caracteres"),
  companyCategory: z.string().min(1, "Categoría requerida"),
  companySubcategory: z.string().min(1, "Subcategoría requerida"),
  businessType: z.string().optional(),
  
  // Step 3: Complete Profile Configuration
  bio: z.string().min(100, "Biografía profesional mínimo 100 caracteres"),
  servicesOffered: z.array(z.string()).min(1, "Al menos un servicio"),
  targetMarket: z.string().min(1, "Mercado objetivo requerido"),
  yearsExperience: z.number().min(0),
  teamSize: z.number().min(1, "Mínimo 1 persona"),
  
  // Step 4: Map Location & Contact Card Configuration
  address: z.string().min(10, "Dirección completa requerida"),
  city: z.string().min(2, "Ciudad requerida"),
  country: z.string().default("Colombia"),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number()
  }),
  phone: z.string().min(10, "Teléfono válido requerido"),
  website: z.string().url().optional().or(z.literal("")),
  isContactCardVisible: z.boolean().default(true),
  isMapVisible: z.boolean().default(true),
  
  // Step 5: Messaging Configuration
  messagingEnabled: z.boolean().default(true),
  messagingBio: z.string().min(50, "Descripción para mensajería mínimo 50 caracteres"),
  acceptsInquiries: z.boolean().default(true),
  responseTimeHours: z.number().min(1).max(72),
  
  // Step 6: Experience Creation Setup
  experienceSetupComplete: z.boolean().default(true),
  defaultExperienceCategory: z.string().min(1, "Categoría de experiencia por defecto requerida"),
  defaultMeetingPoint: z.string().min(10, "Punto de encuentro por defecto requerido"),
  defaultCancellationPolicy: z.string().min(50, "Política de cancelación por defecto requerida"),
  
  // Step 7: Operating Hours & Availability
  operatingHours: z.object({
    monday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }),
    tuesday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }),
    wednesday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }),
    thursday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }),
    friday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }),
    saturday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }),
    sunday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() })
  }),
  
  // Step 8: Professional Documentation
  businessLicense: z.string().optional(),
  taxId: z.string().optional(),
  certifications: z.array(z.string()),
  sustainabilityPractices: z.array(z.string()),
  accessibilityFeatures: z.array(z.string()),
  languages: z.array(z.string()).min(1, "Al menos un idioma"),
  
  // Step 9: Social Media & Professional Network
  socialMedia: z.object({
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional()
  }),
  
  // Step 10: Emergency Contact & Final Setup
  emergencyContact: z.object({
    name: z.string().min(2, "Nombre requerido"),
    phone: z.string().min(10, "Teléfono requerido"),
    email: z.string().email("Email requerido"),
    relationship: z.string()
  }),
  
  // Configuration completion flags
  profileComplete: z.boolean().default(true),
  registrationComplete: z.boolean().default(true),
  profileCompletion: z.number().default(100),
  verificationLevel: z.string().default("verified"),
  
  // Final terms acceptance
  acceptTerms: z.boolean().refine(val => val === true, "Debe aceptar términos")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type RegistrationForm = z.infer<typeof registrationSchema>;

// Company categories with comprehensive subcategories
const COMPANY_CATEGORIES = {
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
    "Apps de Turismo Sostenible",
    "Sistemas de Gestión Ambiental",
    "Tecnología para Conservación",
    "IoT para Sostenibilidad",
    "Blockchain para Turismo",
    "Inteligencia Artificial Verde"
  ],
  "Aliados y Patrocinadores": [
    "Entidades Públicas",
    "Empresas Privadas",
    "Organizaciones Internacionales",
    "Medios de Comunicación",
    "Instituciones Académicas",
    "Cámaras de Comercio",
    "Gremios Turísticos"
  ]
};

const SUSTAINABILITY_PRACTICES = [
  "Gestión eficiente del agua",
  "Uso de energías renovables", 
  "Reducción de residuos",
  "Productos locales y orgánicos",
  "Transporte sostenible",
  "Certificaciones ambientales",
  "Educación ambiental",
  "Apoyo a comunidades locales",
  "Conservación de biodiversidad",
  "Construcción sostenible"
];

const ACCESSIBILITY_FEATURES = [
  "Acceso para sillas de ruedas",
  "Baños adaptados",
  "Señalización en braille",
  "Guías especializados",
  "Equipos de asistencia auditiva",
  "Rampas y elevadores",
  "Información en lenguaje de señas",
  "Tarifas preferenciales",
  "Transporte adaptado",
  "Personal capacitado en discapacidad"
];

const LANGUAGES = [
  "Español", "Inglés", "Francés", "Alemán", "Italiano", "Portugués", 
  "Mandarín", "Japonés", "Ruso", "Árabe", "Lenguas indígenas"
];

const ComprehensiveCompanyRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const totalSteps = 10;

  // Pre-filled test data for dahub company
  const getDahubTestData = () => {
    const isDahubEmail = window.location.search.includes('dahub') || 
                        (typeof window !== 'undefined' && window.localStorage.getItem('fillDahubData') === 'true');
    
    if (isDahubEmail) {
      return {
        firstName: "David",
        lastName: "Hub",
        email: "dahub.tech@gmail.com",
        password: "12345678",
        confirmPassword: "12345678",
        companyName: "DaHub Technologies",
        companyDescription: "DaHub es una empresa líder en desarrollo de tecnologías sostenibles para el turismo, especializada en crear soluciones digitales innovadoras que conectan viajeros con experiencias de turismo responsable y regenerativo. Nuestra misión es revolucionar la industria turística a través de la tecnología, promoviendo prácticas sostenibles y facilitando conexiones auténticas entre comunidades locales y visitantes conscientes.",
        companyCategory: "Tecnología para el Turismo Sostenible",
        companySubcategory: "Plataformas Digitales",
        businessType: "SAS",
        bio: "Somos un equipo de desarrolladores y diseñadores apasionados por crear tecnología que marque la diferencia en el turismo sostenible. Con más de 5 años de experiencia, hemos desarrollado plataformas que conectan a más de 10,000 viajeros con experiencias auténticas en Colombia. Creemos en el poder de la tecnología para crear un turismo más responsable, justo y regenerativo para las comunidades locales.",
        servicesOffered: ["Plataformas Digitales", "Consultoría en Tecnología", "Desarrollo de Apps"],
        targetMarket: "turismo-nacional",
        yearsExperience: 5,
        teamSize: 12,
        address: "Carrera 7 #93-07, Oficina 501",
        city: "Bogotá",
        country: "Colombia",
        coordinates: { lat: 4.6764, lng: -74.0478 },
        phone: "+57 301 234 5678",
        website: "https://dahub.tech",
        isContactCardVisible: true,
        isMapVisible: true,
        messagingEnabled: true,
        messagingBio: "¡Hola! Somos DaHub Technologies. Estamos aquí para ayudarte a crear experiencias digitales increíbles para el turismo sostenible. Contáctanos para hablar sobre tu proyecto.",
        acceptsInquiries: true,
        responseTimeHours: 24,
        experienceSetupComplete: true,
        defaultExperienceCategory: "Tecnología Sostenible",
        defaultMeetingPoint: "Oficinas DaHub Technologies, Zona Rosa, Bogotá",
        defaultCancellationPolicy: "Cancelación gratuita hasta 24 horas antes. Cancelaciones tardías tienen un cargo del 50%. No se admiten reembolsos por no presentarse.",
        certifications: ["ISO 27001", "Empresa B Certificada"],
        sustainabilityPractices: ["Uso de energías renovables", "Trabajo remoto", "Reducción de residuos"],
        accessibilityFeatures: ["Plataforma accesible", "Soporte para lectores de pantalla"],
        languages: ["Español", "Inglés"],
        socialMedia: {
          instagram: "@dahub_tech",
          linkedin: "linkedin.com/company/dahub-technologies",
          twitter: "@dahubtech",
          facebook: "DaHub Technologies"
        },
        emergencyContact: {
          name: "María Hub",
          phone: "+57 300 123 4567",
          email: "maria@dahub.tech",
          relationship: "Socia Comercial"
        },
        profileComplete: true,
        registrationComplete: true,
        profileCompletion: 100,
        verificationLevel: "verified",
        acceptTerms: false
      };
    }
    
    return {};
  };

  // Pre-filled test data for EcoTours Bogotá
  const getEcoToursTestData = () => {
    return {
      firstName: "Julián Eduardo",
      lastName: "Domínguez",
      email: "jedomingueza@unal.edu.co",
      password: "festival123456",
      confirmPassword: "festival123456",
      companyName: "EcoTours Bogotá",
      companyDescription: "Agencia de turismo sostenible especializada en experiencias urbanas ecológicas en Bogotá. Promovemos el turismo responsable a través de recorridos que conectan a los visitantes con la biodiversidad urbana, los humedales de la capital y las iniciativas de agricultura urbana.",
      companyCategory: "Agencias u Operadores Turísticos",
      companySubcategory: "Turismo Urbano Sostenible",
      businessType: "SAS",
      bio: "Agencia de turismo sostenible especializada en experiencias urbanas ecológicas. Con más de 5 años de experiencia en Bogotá, conectamos a los viajeros con la naturaleza urbana y las iniciativas sostenibles de la capital colombiana. Creemos en el turismo regenerativo que beneficia tanto a visitantes como a comunidades locales.",
      servicesOffered: ["Tours urbanos ecológicos", "Visitas a humedales", "Recorridos de agricultura urbana", "Experiencias gastronómicas sostenibles"],
      targetMarket: "turismo-nacional",
      yearsExperience: 5,
      teamSize: 12,
      address: "Calle 11 #5-51, La Candelaria",
      city: "Bogotá",
      country: "Colombia",
      coordinates: { lat: 4.6097, lng: -74.0817 },
      phone: "+57 1 342 7890",
      website: "www.ecotoursbogota.co",
      isContactCardVisible: true,
      isMapVisible: true,
      messagingEnabled: true,
      messagingBio: "¡Hola! Somos EcoTours Bogotá. Estamos aquí para mostrarte la cara sostenible y verde de nuestra hermosa capital. Contáctanos para vivir experiencias únicas que conectan con la naturaleza urbana.",
      acceptsInquiries: true,
      responseTimeHours: 24,
      experienceSetupComplete: true,
      defaultExperienceCategory: "Turismo Urbano Sostenible",
      defaultMeetingPoint: "Plaza Bolívar, La Candelaria, Bogotá",
      defaultCancellationPolicy: "Cancelación gratuita hasta 24 horas antes. Cancelaciones tardías tienen un cargo del 25%. No se admiten reembolsos por no presentarse debido a condiciones climáticas.",
      certifications: ["Certificación en Turismo Sostenible - Ministerio de Comercio"],
      sustainabilityPractices: ["Uso de transporte ecológico", "Trabajo con comunidades locales", "Reducción de residuos", "Conservación de humedales"],
      accessibilityFeatures: ["Tours adaptados", "Rutas accesibles"],
      languages: ["Español", "Inglés"],
      socialMedia: {
        instagram: "@ecotours_bogota",
        linkedin: "linkedin.com/company/ecotours-bogota",
        twitter: "@ecotoursbogota",
        facebook: "EcoTours Bogotá"
      },
      emergencyContact: {
        name: "Ana María Rodríguez",
        phone: "+57 300 789 4567",
        email: "ana@ecotoursbogota.co",
        relationship: "Coordinadora de Tours"
      },
      profileComplete: false, // Set to false so user completes manually
      registrationComplete: false,
      profileCompletion: 35,
      verificationLevel: "basic",
      acceptTerms: false
    };
  };

  const form = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
    defaultValues: {
      country: "Colombia",
      yearsExperience: 0,
      teamSize: 1,
      coordinates: { lat: 4.6097, lng: -74.0817 },
      servicesOffered: [],
      certifications: [],
      sustainabilityPractices: [],
      accessibilityFeatures: [],
      languages: ["Español"],
      socialMedia: {},
      isContactCardVisible: true,
      isMapVisible: true,
      messagingEnabled: true,
      acceptsInquiries: true,
      responseTimeHours: 24,
      experienceSetupComplete: true,
      profileComplete: true,
      registrationComplete: true,
      profileCompletion: 100,
      verificationLevel: "verified",
      operatingHours: {
        monday: { open: "09:00", close: "18:00", closed: false },
        tuesday: { open: "09:00", close: "18:00", closed: false },
        wednesday: { open: "09:00", close: "18:00", closed: false },
        thursday: { open: "09:00", close: "18:00", closed: false },
        friday: { open: "09:00", close: "18:00", closed: false },
        saturday: { open: "09:00", close: "18:00", closed: false },
        sunday: { open: "09:00", close: "18:00", closed: true }
      },
      emergencyContact: {
        name: "",
        phone: "",
        email: "",
        relationship: "Familiar"
      },
      acceptTerms: false,
      ...getDahubTestData()
    }
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegistrationForm) => {
      // Complete registration with all portal features
      
      const response = await apiRequest('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          role: 'empresa',
          // Ensure all portal features are activated from the start
          profileCompletion: 100,
          registrationComplete: true,
          isVerified: true,
          verificationLevel: 'verified'
        })
      });
      return response;
    },
    onSuccess: (data) => {
      toast({
        title: "¡Registro Completo Exitoso!",
        description: "Tu empresa está lista. Todas las funciones del portal han sido activadas. Ya puedes iniciar sesión.",
        duration: 6000
      });
      
      // Clear test data flag
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('fillDahubData');
      }
      
      setLocation('/login-empresa');
    },
    onError: (error: any) => {
      toast({
        title: "Error en el Registro Completo",
        description: error.message || "Por favor, intenta nuevamente",
        variant: "destructive"
      });
    }
  });

  const progress = (currentStep / totalSteps) * 100;
  const [selectedCategory, setSelectedCategory] = useState("");
  const subcategories = selectedCategory ? COMPANY_CATEGORIES[selectedCategory as keyof typeof COMPANY_CATEGORIES] || [] : [];

  const nextStep = async () => {
    const stepFields = getStepFields(currentStep);
    const isValid = await form.trigger(stepFields);
    
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const getStepFields = (step: number): (keyof RegistrationForm)[] => {
    switch (step) {
      case 1: return ['firstName', 'lastName', 'email', 'password', 'confirmPassword'];
      case 2: return ['companyName', 'companyDescription', 'companyCategory', 'companySubcategory'];
      case 3: return ['bio', 'servicesOffered', 'targetMarket', 'yearsExperience', 'teamSize'];
      case 4: return ['address', 'city', 'phone', 'website', 'coordinates'];
      case 5: return ['messagingBio', 'responseTimeHours'];
      case 6: return ['defaultExperienceCategory', 'defaultMeetingPoint', 'defaultCancellationPolicy'];
      case 7: return ['operatingHours'];
      case 8: return ['certifications', 'sustainabilityPractices', 'accessibilityFeatures', 'languages'];
      case 9: return ['socialMedia'];
      case 10: return ['emergencyContact', 'acceptTerms'];
      default: return [];
    }
  };

  const onSubmit = (data: RegistrationForm) => {
    registerMutation.mutate(data);
  };

  // Auto-fill test data for dahub company
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isDahubTest = urlParams.get('test') === 'dahub' || urlParams.get('company') === 'dahub';
    
    if (isDahubTest) {
      // Loading test data for DaHub Technologies
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('fillDahubData', 'true');
      }
      
      // Reset form with complete dahub data
      const dahubData = getDahubTestData();
      form.reset({
        ...form.getValues(),
        ...dahubData
      });
      
      toast({
        title: "Datos de Prueba Cargados",
        description: "Se han cargado los datos completos de DaHub Technologies para testing",
        duration: 4000
      });
    }
  }, [form, toast]);

  // Utility function to fill complete test data
  const fillDahubTestData = () => {
    const dahubData = getDahubTestData();
    form.reset({
      ...form.getValues(),
      ...dahubData
    });
    
    toast({
      title: "Datos Completos de Prueba Cargados",
      description: "Se han cargado TODOS los datos de configuración de DaHub Technologies para testing completo",
      duration: 4000
    });
  };

  // Utility function to fill EcoTours Bogotá test data
  const fillEcoToursTestData = () => {
    const ecoToursData = getEcoToursTestData();
    form.reset({
      ...form.getValues(),
      ...ecoToursData
    });
    
    toast({
      title: "Información Cargada",
      description: "Se han cargado los datos de EcoTours Bogotá para autocompletar el registro",
      duration: 4000
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <User className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white">Información Personal</h2>
              <p className="text-white/70">Datos básicos del representante legal</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-white">Nombres *</Label>
                <Input
                  {...form.register("firstName")}
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="Tu nombre"
                />
                {form.formState.errors.firstName && (
                  <p className="text-red-400 text-sm">{form.formState.errors.firstName.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="lastName" className="text-white">Apellidos *</Label>
                <Input
                  {...form.register("lastName")}
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="Tu apellido"
                />
                {form.formState.errors.lastName && (
                  <p className="text-red-400 text-sm">{form.formState.errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-white">Email Corporativo *</Label>
              <Input
                {...form.register("email")}
                type="email"
                className="bg-white/10 border-white/30 text-white"
                placeholder="contacto@empresa.com"
              />
              {form.formState.errors.email && (
                <p className="text-red-400 text-sm">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="password" className="text-white">Contraseña *</Label>
                <Input
                  {...form.register("password")}
                  type="password"
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="Mínimo 8 caracteres"
                />
                {form.formState.errors.password && (
                  <p className="text-red-400 text-sm">{form.formState.errors.password.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="confirmPassword" className="text-white">Confirmar Contraseña *</Label>
                <Input
                  {...form.register("confirmPassword")}
                  type="password"
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="Repetir contraseña"
                />
                {form.formState.errors.confirmPassword && (
                  <p className="text-red-400 text-sm">{form.formState.errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            {/* Botón de autocompletar información de prueba */}
            <div className="mt-6 pt-4 border-t border-white/20">
              <div className="text-center">
                <p className="text-white/60 text-sm mb-3">¿Quieres probar con datos de ejemplo?</p>
                <Button
                  type="button"
                  onClick={fillEcoToursTestData}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                  data-testid="button-autofill-ecotours"
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  Autocompletar con EcoTours Bogotá
                </Button>
                <p className="text-white/50 text-xs mt-2">Carga datos de prueba para completar el registro más rápido</p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Building2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white">Información de la Empresa</h2>
              <p className="text-white/70">Datos principales de tu organización</p>
            </div>

            <div>
              <Label htmlFor="companyName" className="text-white">Nombre de la Empresa *</Label>
              <Input
                {...form.register("companyName")}
                className="bg-white/10 border-white/30 text-white"
                placeholder="Nombre legal de la empresa"
              />
              {form.formState.errors.companyName && (
                <p className="text-red-400 text-sm">{form.formState.errors.companyName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="companyDescription" className="text-white">Descripción de la Empresa *</Label>
              <Textarea
                {...form.register("companyDescription")}
                className="bg-white/10 border-white/30 text-white min-h-20"
                placeholder="Describe tu empresa, misión, valores y servicios principales (mínimo 50 caracteres)"
              />
              {form.formState.errors.companyDescription && (
                <p className="text-red-400 text-sm">{form.formState.errors.companyDescription.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyCategory" className="text-white">Categoría Principal *</Label>
                <Select onValueChange={(value) => {
                  setSelectedCategory(value);
                  form.setValue("companyCategory", value);
                  form.setValue("companySubcategory", ""); // Reset subcategory
                }}>
                  <SelectTrigger className="bg-white/10 border-white/30 text-white">
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(COMPANY_CATEGORIES).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.companyCategory && (
                  <p className="text-red-400 text-sm">{form.formState.errors.companyCategory.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="companySubcategory" className="text-white">Subcategoría Específica *</Label>
                <Select 
                  onValueChange={(value) => form.setValue("companySubcategory", value)}
                  disabled={!selectedCategory}
                >
                  <SelectTrigger className="bg-white/10 border-white/30 text-white">
                    <SelectValue placeholder="Seleccionar subcategoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {subcategories.map((subcategory) => (
                      <SelectItem key={subcategory} value={subcategory}>
                        {subcategory}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.companySubcategory && (
                  <p className="text-red-400 text-sm">{form.formState.errors.companySubcategory.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="businessType" className="text-white">Tipo de Negocio (Opcional)</Label>
              <Input
                {...form.register("businessType")}
                className="bg-white/10 border-white/30 text-white"
                placeholder="Ej: SAS, Fundación, Cooperativa"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <User className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white">Configuración de Perfil Completo</h2>
              <p className="text-white/70">Información profesional y servicios de tu empresa</p>
            </div>

            <div>
              <Label htmlFor="bio" className="text-white">Biografía Profesional de la Empresa *</Label>
              <Textarea
                {...form.register("bio")}
                className="bg-white/10 border-white/30 text-white min-h-24"
                placeholder="Describe la historia de tu empresa, misión, valores, logros destacados y lo que te diferencia en el mercado (mínimo 100 caracteres)"
              />
              {form.formState.errors.bio && (
                <p className="text-red-400 text-sm">{form.formState.errors.bio.message}</p>
              )}
            </div>

            <div>
              <Label className="text-white">Servicios Ofrecidos * (selecciona múltiples)</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {[
                  "Tours y excursiones", "Alojamiento", "Transporte", "Gastronomía",
                  "Actividades de aventura", "Experiencias culturales", "Educación ambiental",
                  "Consultoría sostenible", "Eventos corporativos", "Fotografía/Video"
                ].map((service) => (
                  <div key={service} className="flex items-center space-x-2">
                    <Checkbox
                      id={service}
                      onCheckedChange={(checked) => {
                        const current = form.getValues("servicesOffered");
                        if (checked) {
                          form.setValue("servicesOffered", [...current, service]);
                        } else {
                          form.setValue("servicesOffered", current.filter(s => s !== service));
                        }
                      }}
                    />
                    <Label htmlFor={service} className="text-white text-sm">{service}</Label>
                  </div>
                ))}
              </div>
              {form.formState.errors.servicesOffered && (
                <p className="text-red-400 text-sm">{form.formState.errors.servicesOffered.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="targetMarket" className="text-white">Mercado Objetivo *</Label>
              <Select onValueChange={(value) => form.setValue("targetMarket", value)}>
                <SelectTrigger className="bg-white/10 border-white/30 text-white">
                  <SelectValue placeholder="Seleccionar mercado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="turismo-nacional">Turismo Nacional</SelectItem>
                  <SelectItem value="turismo-internacional">Turismo Internacional</SelectItem>
                  <SelectItem value="turismo-corporativo">Turismo Corporativo</SelectItem>
                  <SelectItem value="educativo-institucional">Educativo/Institucional</SelectItem>
                  <SelectItem value="familiar-recreativo">Familiar y Recreativo</SelectItem>
                  <SelectItem value="aventura-naturaleza">Aventura y Naturaleza</SelectItem>
                  <SelectItem value="mixto">Mixto</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.targetMarket && (
                <p className="text-red-400 text-sm">{form.formState.errors.targetMarket.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="yearsExperience" className="text-white">Años de Experiencia</Label>
                <Input
                  {...form.register("yearsExperience", { valueAsNumber: true })}
                  type="number"
                  min="0"
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="teamSize" className="text-white">Tamaño del Equipo *</Label>
                <Input
                  {...form.register("teamSize", { valueAsNumber: true })}
                  type="number"
                  min="1"
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="1"
                />
                {form.formState.errors.teamSize && (
                  <p className="text-red-400 text-sm">{form.formState.errors.teamSize.message}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <MapPin className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white">Configuración de Mapa y Tarjeta de Contacto</h2>
              <p className="text-white/70">Ubicación en el mapa y visibilidad de tu empresa</p>
            </div>

            <div>
              <Label htmlFor="address" className="text-white">Dirección Completa *</Label>
              <Input
                {...form.register("address")}
                className="bg-white/10 border-white/30 text-white"
                placeholder="Calle, carrera, número, barrio"
              />
              {form.formState.errors.address && (
                <p className="text-red-400 text-sm">{form.formState.errors.address.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city" className="text-white">Ciudad *</Label>
                <Input
                  {...form.register("city")}
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="Bogotá"
                />
                {form.formState.errors.city && (
                  <p className="text-red-400 text-sm">{form.formState.errors.city.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="country" className="text-white">País</Label>
                <Input
                  {...form.register("country")}
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="Colombia"
                />
              </div>
            </div>

            <div>
              <Label className="text-white">Configuración de Coordenadas del Mapa *</Label>
              <div className="bg-white/10 border border-white/30 rounded-lg p-4">
                <p className="text-white/70 text-sm mb-3">Tu empresa aparecerá en el mapa en estas coordenadas</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="coordinates.lat" className="text-white text-sm">Latitud</Label>
                    <Input
                      {...form.register("coordinates.lat", { valueAsNumber: true })}
                      type="number"
                      step="0.000001"
                      className="bg-white/10 border-white/30 text-white"
                      placeholder="4.6097"
                    />
                  </div>
                  <div>
                    <Label htmlFor="coordinates.lng" className="text-white text-sm">Longitud</Label>
                    <Input
                      {...form.register("coordinates.lng", { valueAsNumber: true })}
                      type="number"
                      step="0.000001"
                      className="bg-white/10 border-white/30 text-white"
                      placeholder="-74.0817"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isContactCardVisible"
                  {...form.register("isContactCardVisible")}
                />
                <Label htmlFor="isContactCardVisible" className="text-white">Tarjeta de contacto visible en directorio</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isMapVisible"
                  {...form.register("isMapVisible")}
                />
                <Label htmlFor="isMapVisible" className="text-white">Empresa visible en mapa para viajeros</Label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className="text-white">Teléfono/WhatsApp *</Label>
                <Input
                  {...form.register("phone")}
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="+57 301 234 5678"
                />
                {form.formState.errors.phone && (
                  <p className="text-red-400 text-sm">{form.formState.errors.phone.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="website" className="text-white">Sitio Web (Opcional)</Label>
                <Input
                  {...form.register("website")}
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="https://empresa.com"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Mail className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white">Configuración de Mensajería</h2>
              <p className="text-white/70">Cómo otros usuarios pueden contactarte</p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="messagingEnabled"
                {...form.register("messagingEnabled")}
              />
              <Label htmlFor="messagingEnabled" className="text-white">Habilitar sistema de mensajería</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="acceptsInquiries"
                {...form.register("acceptsInquiries")}
              />
              <Label htmlFor="acceptsInquiries" className="text-white">Aceptar consultas y cotizaciones</Label>
            </div>

            <div>
              <Label htmlFor="messagingBio" className="text-white">Mensaje de Presentación para Mensajería *</Label>
              <Textarea
                {...form.register("messagingBio")}
                className="bg-white/10 border-white/30 text-white min-h-20"
                placeholder="Escribe un mensaje de bienvenida que verán otros usuarios cuando te contacten (mínimo 50 caracteres)"
              />
              {form.formState.errors.messagingBio && (
                <p className="text-red-400 text-sm">{form.formState.errors.messagingBio.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="responseTimeHours" className="text-white">Tiempo de Respuesta Promedio (horas)</Label>
              <Select onValueChange={(value) => form.setValue("responseTimeHours", parseInt(value))}>
                <SelectTrigger className="bg-white/10 border-white/30 text-white">
                  <SelectValue placeholder="Seleccionar tiempo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hora</SelectItem>
                  <SelectItem value="4">4 horas</SelectItem>
                  <SelectItem value="12">12 horas</SelectItem>
                  <SelectItem value="24">24 horas</SelectItem>
                  <SelectItem value="48">48 horas</SelectItem>
                  <SelectItem value="72">72 horas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Target className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white">Configuración para Crear Experiencias</h2>
              <p className="text-white/70">Configuración predeterminada para tus experiencias</p>
            </div>

            <div>
              <Label htmlFor="defaultExperienceCategory" className="text-white">Categoría de Experiencia por Defecto *</Label>
              <Select onValueChange={(value) => form.setValue("defaultExperienceCategory", value)}>
                <SelectTrigger className="bg-white/10 border-white/30 text-white">
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aventura">Aventura</SelectItem>
                  <SelectItem value="naturaleza">Naturaleza</SelectItem>
                  <SelectItem value="cultura">Cultura</SelectItem>
                  <SelectItem value="gastronomia">Gastronomía</SelectItem>
                  <SelectItem value="bienestar">Bienestar</SelectItem>
                  <SelectItem value="educacion">Educación</SelectItem>
                  <SelectItem value="rural">Rural</SelectItem>
                  <SelectItem value="ecoturismo">Ecoturismo</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.defaultExperienceCategory && (
                <p className="text-red-400 text-sm">{form.formState.errors.defaultExperienceCategory.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="defaultMeetingPoint" className="text-white">Punto de Encuentro por Defecto *</Label>
              <Input
                {...form.register("defaultMeetingPoint")}
                className="bg-white/10 border-white/30 text-white"
                placeholder="Ej: Lobby del hotel, estación de metro, oficina principal"
              />
              {form.formState.errors.defaultMeetingPoint && (
                <p className="text-red-400 text-sm">{form.formState.errors.defaultMeetingPoint.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="defaultCancellationPolicy" className="text-white">Política de Cancelación por Defecto *</Label>
              <Textarea
                {...form.register("defaultCancellationPolicy")}
                className="bg-white/10 border-white/30 text-white min-h-20"
                placeholder="Ej: Cancelación gratuita hasta 24 horas antes. Cancelaciones tardías tienen un cargo del 50%."
              />
              {form.formState.errors.defaultCancellationPolicy && (
                <p className="text-red-400 text-sm">{form.formState.errors.defaultCancellationPolicy.message}</p>
              )}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Clock className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white">Horarios de Operación</h2>
              <p className="text-white/70">Cuándo está disponible tu empresa</p>
            </div>

            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => {
              const dayNames = {
                monday: 'Lunes',
                tuesday: 'Martes', 
                wednesday: 'Miércoles',
                thursday: 'Jueves',
                friday: 'Viernes',
                saturday: 'Sábado',
                sunday: 'Domingo'
              };

              return (
                <div key={day} className="bg-white/5 border border-white/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-white font-semibold">{dayNames[day as keyof typeof dayNames]}</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`${day}-closed`}
                        {...form.register(`operatingHours.${day}.closed` as any)}
                      />
                      <Label htmlFor={`${day}-closed`} className="text-white text-sm">Cerrado</Label>
                    </div>
                  </div>
                  
                  {!form.watch(`operatingHours.${day}.closed` as any) && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor={`${day}-open`} className="text-white text-sm">Apertura</Label>
                        <Input
                          {...form.register(`operatingHours.${day}.open` as any)}
                          type="time"
                          className="bg-white/10 border-white/30 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`${day}-close`} className="text-white text-sm">Cierre</Label>
                        <Input
                          {...form.register(`operatingHours.${day}.close` as any)}
                          type="time"
                          className="bg-white/10 border-white/30 text-white"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );

      case 8:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Shield className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white">Certificaciones y Prácticas</h2>
              <p className="text-white/70">Licencias, certificaciones y prácticas sostenibles</p>
            </div>

            <div>
              <Label htmlFor="businessLicense" className="text-white">Número de Licencia Comercial (Opcional)</Label>
              <Input
                {...form.register("businessLicense")}
                className="bg-white/10 border-white/30 text-white"
                placeholder="Ej: 12345678-9"
              />
            </div>

            <div>
              <Label htmlFor="taxId" className="text-white">NIT / Número de Identificación Tributaria (Opcional)</Label>
              <Input
                {...form.register("taxId")}
                className="bg-white/10 border-white/30 text-white"
                placeholder="Ej: 900123456-7"
              />
            </div>

            <div>
              <Label className="text-white">Certificaciones (selecciona las que apliquen)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                {[
                  "ISO 14001", "ISO 9001", "Rainforest Alliance", "Fair Trade",
                  "B Corp", "Green Key", "Certificación ICONTEC", "Sello Ambiental"
                ].map((cert) => (
                  <div key={cert} className="flex items-center space-x-2">
                    <Checkbox
                      id={cert}
                      onCheckedChange={(checked) => {
                        const current = form.getValues("certifications");
                        if (checked) {
                          form.setValue("certifications", [...current, cert]);
                        } else {
                          form.setValue("certifications", current.filter(c => c !== cert));
                        }
                      }}
                    />
                    <Label htmlFor={cert} className="text-white text-sm">{cert}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-white">Prácticas de Sostenibilidad (selecciona las que apliquen)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                {SUSTAINABILITY_PRACTICES.map((practice) => (
                  <div key={practice} className="flex items-center space-x-2">
                    <Checkbox
                      id={practice}
                      onCheckedChange={(checked) => {
                        const current = form.getValues("sustainabilityPractices");
                        if (checked) {
                          form.setValue("sustainabilityPractices", [...current, practice]);
                        } else {
                          form.setValue("sustainabilityPractices", current.filter(p => p !== practice));
                        }
                      }}
                    />
                    <Label htmlFor={practice} className="text-white text-sm">{practice}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-white">Características de Accesibilidad (selecciona las que apliquen)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                {ACCESSIBILITY_FEATURES.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      onCheckedChange={(checked) => {
                        const current = form.getValues("accessibilityFeatures");
                        if (checked) {
                          form.setValue("accessibilityFeatures", [...current, feature]);
                        } else {
                          form.setValue("accessibilityFeatures", current.filter(f => f !== feature));
                        }
                      }}
                    />
                    <Label htmlFor={feature} className="text-white text-sm">{feature}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-white">Idiomas (selecciona los que manejas) *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                {LANGUAGES.map((language) => (
                  <div key={language} className="flex items-center space-x-2">
                    <Checkbox
                      id={language}
                      onCheckedChange={(checked) => {
                        const current = form.getValues("languages");
                        if (checked) {
                          form.setValue("languages", [...current, language]);
                        } else {
                          form.setValue("languages", current.filter(l => l !== language));
                        }
                      }}
                    />
                    <Label htmlFor={language} className="text-white text-sm">{language}</Label>
                  </div>
                ))}
              </div>
              {form.formState.errors.languages && (
                <p className="text-red-400 text-sm">{form.formState.errors.languages.message}</p>
              )}
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Globe className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white">Redes Sociales</h2>
              <p className="text-white/70">Conecta tus perfiles sociales (opcional)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="instagram" className="text-white flex items-center">
                  <Instagram className="w-4 h-4 mr-2" />
                  Instagram
                </Label>
                <Input
                  {...form.register("socialMedia.instagram")}
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="@tu_empresa"
                />
              </div>

              <div>
                <Label htmlFor="facebook" className="text-white flex items-center">
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </Label>
                <Input
                  {...form.register("socialMedia.facebook")}
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="Tu Empresa"
                />
              </div>

              <div>
                <Label htmlFor="twitter" className="text-white flex items-center">
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter/X
                </Label>
                <Input
                  {...form.register("socialMedia.twitter")}
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="@tu_empresa"
                />
              </div>

              <div>
                <Label htmlFor="linkedin" className="text-white flex items-center">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Label>
                <Input
                  {...form.register("socialMedia.linkedin")}
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="linkedin.com/company/tu-empresa"
                />
              </div>
            </div>
          </div>
        );

      case 10:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white">Configuración Final</h2>
              <p className="text-white/70">Contacto de emergencia y confirmación</p>
            </div>

            <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4">
              <h3 className="text-green-400 font-bold mb-2">✅ Configuración Completa</h3>
              <div className="space-y-1 text-sm text-white/90">
                <p>• Perfil completo de empresa configurado</p>
                <p>• Sistema de mensajería habilitado</p>
                <p>• Tarjeta de contacto creada</p>
                <p>• Ubicación en mapa configurada</p>
                <p>• Configuración para crear experiencias lista</p>
                <p>• Todas las funciones del portal activadas</p>
              </div>
            </div>

            <div>
              <Label className="text-white text-lg font-bold">Contacto de Emergencia</Label>
              <p className="text-white/70 text-sm mb-3">Información de contacto de emergencia para tu empresa</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergencyContact.name" className="text-white">Nombre Completo *</Label>
                  <Input
                    {...form.register("emergencyContact.name")}
                    className="bg-white/10 border-white/30 text-white"
                    placeholder="Nombre del contacto"
                  />
                  {form.formState.errors.emergencyContact?.name && (
                    <p className="text-red-400 text-sm">{form.formState.errors.emergencyContact.name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="emergencyContact.phone" className="text-white">Teléfono *</Label>
                  <Input
                    {...form.register("emergencyContact.phone")}
                    className="bg-white/10 border-white/30 text-white"
                    placeholder="+57 300 123 4567"
                  />
                  {form.formState.errors.emergencyContact?.phone && (
                    <p className="text-red-400 text-sm">{form.formState.errors.emergencyContact.phone.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="emergencyContact.email" className="text-white">Email *</Label>
                  <Input
                    {...form.register("emergencyContact.email")}
                    type="email"
                    className="bg-white/10 border-white/30 text-white"
                    placeholder="contacto@empresa.com"
                  />
                  {form.formState.errors.emergencyContact?.email && (
                    <p className="text-red-400 text-sm">{form.formState.errors.emergencyContact.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="emergencyContact.relationship" className="text-white">Relación</Label>
                  <Select onValueChange={(value) => form.setValue("emergencyContact.relationship", value)}>
                    <SelectTrigger className="bg-white/10 border-white/30 text-white">
                      <SelectValue placeholder="Seleccionar relación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Socio">Socio</SelectItem>
                      <SelectItem value="Familiar">Familiar</SelectItem>
                      <SelectItem value="Gerente">Gerente</SelectItem>
                      <SelectItem value="Contador">Contador</SelectItem>
                      <SelectItem value="Abogado">Abogado</SelectItem>
                      <SelectItem value="Otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptTerms"
                  {...form.register("acceptTerms")}
                />
                <Label htmlFor="acceptTerms" className="text-white">
                  Acepto los términos y condiciones de uso de Festival NATUR
                </Label>
              </div>
              {form.formState.errors.acceptTerms && (
                <p className="text-red-400 text-sm">{form.formState.errors.acceptTerms.message}</p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 py-8">
      <HeaderButtons />
      
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="bg-black/20 backdrop-blur-sm border-white/10">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-white mb-2">
              Configuración Completa ANTES del Login
            </CardTitle>
            <p className="text-white/70">
              Festival NATUR 2025 - Configura TODAS las funciones antes de acceder al portal
            </p>
            
            <div className="mt-4 bg-blue-500/20 border border-blue-400/30 rounded-lg p-3">
              <p className="text-blue-400 text-sm font-medium">
                🚀 Este proceso configura: Perfil • Mensajería • Contacto • Experiencias • Mapa
              </p>
            </div>
            
            <div className="mt-6">
              <Progress value={progress} className="h-2" />
              <p className="text-white/60 text-sm mt-2">
                Paso {currentStep} de {totalSteps} - Configuración ANTES del login
              </p>
            </div>
            
            {/* Test data button for developers */}
            <div className="mt-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={fillDahubTestData}
                className="bg-yellow-500/20 border-yellow-400/30 text-yellow-400 hover:bg-yellow-500/30"
              >
                🔧 Cargar Datos de Prueba (DaHub)
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {renderStep()}
              
              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Anterior
                  </Button>
                )}
                
                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-green-600 hover:bg-green-700 text-white ml-auto"
                  >
                    Siguiente
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={registerMutation.isPending}
                    className="bg-green-600 hover:bg-green-700 text-white ml-auto"
                  >
                    {registerMutation.isPending ? "Activando Portal..." : "🚀 Activar Portal Completo"}
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComprehensiveCompanyRegistration;