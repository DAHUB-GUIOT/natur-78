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
import { CitySelector } from "@/components/ui/city-selector";
import { CountrySelector } from "@/components/ui/country-selector";
import { MapboxAddressInput } from "@/components/ui/mapbox-address-input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

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
  
  // Set default values for removed steps
  messagingEnabled: z.boolean().default(true),
  messagingBio: z.string().default("Estamos listos para atender tus consultas"),
  acceptsInquiries: z.boolean().default(true),
  responseTimeHours: z.number().default(24),
  
  experienceSetupComplete: z.boolean().default(true),
  defaultExperienceCategory: z.string().default("Turismo Sostenible"),
  defaultMeetingPoint: z.string().default("Por definir"),
  defaultCancellationPolicy: z.string().default("Cancelación gratuita hasta 24 horas antes"),
  
  operatingHours: z.object({
    monday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }),
    tuesday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }),
    wednesday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }),
    thursday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }),
    friday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }),
    saturday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }),
    sunday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() })
  }).default({
    monday: { open: "09:00", close: "18:00", closed: false },
    tuesday: { open: "09:00", close: "18:00", closed: false },
    wednesday: { open: "09:00", close: "18:00", closed: false },
    thursday: { open: "09:00", close: "18:00", closed: false },
    friday: { open: "09:00", close: "18:00", closed: false },
    saturday: { open: "09:00", close: "18:00", closed: false },
    sunday: { open: "09:00", close: "18:00", closed: true }
  }),
  
  businessLicense: z.string().optional(),
  taxId: z.string().optional(),
  certifications: z.array(z.string()).default([]),
  sustainabilityPractices: z.array(z.string()).default([]),
  accessibilityFeatures: z.array(z.string()).default([]),
  languages: z.array(z.string()).default(["Español"]),
  
  socialMedia: z.object({
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional()
  }).default({}),
  
  emergencyContact: z.object({
    name: z.string().min(2, "Nombre requerido"),
    phone: z.string().min(10, "Teléfono requerido"),
    email: z.string().email("Email requerido"),
    relationship: z.string()
  }).default({
    name: "",
    phone: "",
    email: "",
    relationship: "Familiar"
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

// Company categories with comprehensive subcategories including new ones
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
    "Turismo Científico",
    "Turismo Comunitario",
    "Turismo Regenerativo",
    "Turismo de Naturaleza"
  ],
  "Guía de Turismo": [
    "Guía de Naturaleza y Ecoturismo",
    "Guía Cultural e Histórico",
    "Guía de Turismo de Aventura",
    "Guía Gastronómico",
    "Guía de Turismo Rural"
  ],
  "Intérprete de Idiomas": [
    "Intérprete Español-Inglés",
    "Intérprete Español-Francés",
    "Intérprete de Lenguas Indígenas",
    "Intérprete Español-Alemán",
    "Intérprete Especializado en Turismo"
  ],
  "DMC (Destination Management Company)": [
    "DMC Especializado en Ecoturismo",
    "DMC de Turismo Cultural",
    "DMC de Turismo Regenerativo",
    "DMC de Turismo de Aventura",
    "DMC Corporativo"
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
  const totalSteps = 4;

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
      case 4: return ['address', 'city', 'phone', 'website', 'coordinates', 'emergencyContact', 'acceptTerms'];
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
          <Form {...form}>
            <div className="space-y-6">
              <div className="text-center mb-6">
                <MapPin className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white">Ubicación y Contacto Final</h2>
                <p className="text-white/70">Datos finales para completar tu registro</p>
              </div>

              {/* Address with Mapbox Integration */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <MapboxAddressInput 
                    addressField={field}
                    coordinatesField={{
                      value: form.watch('coordinates') || { lat: 4.6097, lng: -74.0817 },
                      onChange: (value) => form.setValue('coordinates', value)
                    }}
                    placeholder="Ej: Carrera 7 #93-07, Oficina 501, Bogotá"
                  />
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* City Selector */}
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <CitySelector field={field} placeholder="Selecciona tu ciudad" />
                  )}
                />

                {/* Country Selector */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <CountrySelector field={field} placeholder="Selecciona el país" />
                  )}
                />
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-white">
                        <Phone className="w-4 h-4" />
                        Teléfono / WhatsApp *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-white/5 border-white/20 text-white"
                          placeholder="+57 300 123 4567"
                          data-testid="input-phone"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-white">
                        <Globe className="w-4 h-4" />
                        Sitio Web
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-white/5 border-white/20 text-white"
                          placeholder="https://tuempresa.com"
                          data-testid="input-website"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Emergency Contact */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  Contacto de Emergencia
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="emergencyContact.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Nombre completo *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-white/5 border-white/20 text-white"
                            placeholder="Nombre del contacto"
                            data-testid="input-emergency-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="emergencyContact.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Teléfono *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-white/5 border-white/20 text-white"
                            placeholder="+57 300 123 4567"
                            data-testid="input-emergency-phone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="emergencyContact.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className="bg-white/5 border-white/20 text-white"
                            placeholder="contacto@email.com"
                            data-testid="input-emergency-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="emergencyContact.relationship"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Relación</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="bg-white/5 border-white/20 text-white">
                              <SelectValue placeholder="Selecciona relación" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Familiar">Familiar</SelectItem>
                              <SelectItem value="Socio">Socio</SelectItem>
                              <SelectItem value="Empleado">Empleado</SelectItem>
                              <SelectItem value="Abogado">Abogado</SelectItem>
                              <SelectItem value="Contador">Contador</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Terms Acceptance */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-white/30"
                          data-testid="checkbox-accept-terms"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-white">
                          Acepto los términos y condiciones *
                        </FormLabel>
                        <p className="text-white/70 text-sm">
                          Al registrarte, aceptas nuestros términos de servicio y política de privacidad del Festival NATUR 2025.
                        </p>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </Form>
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
                onClick={fillDahubTestData}
                className="bg-blue-600/20 border-blue-400/30 text-blue-400 hover:bg-blue-600/30"
              >
                🧪 Cargar Datos DaHub (Testing)
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {renderStep()}
              
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                  data-testid="button-previous"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Anterior
                </Button>
                
                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                    data-testid="button-next"
                  >
                    Siguiente
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={registerMutation.isPending}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                    data-testid="button-submit"
                  >
                    {registerMutation.isPending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Registrando...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Completar Registro
                      </>
                    )}
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
