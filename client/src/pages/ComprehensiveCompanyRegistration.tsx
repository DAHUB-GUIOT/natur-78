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

// Enhanced registration schema with ALL company fields
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
  
  // Step 3: Services & Experience
  servicesOffered: z.array(z.string()).min(1, "Al menos un servicio"),
  targetMarket: z.string().min(1, "Mercado objetivo requerido"),
  yearsExperience: z.number().min(0),
  teamSize: z.number().min(1, "Mínimo 1 persona"),
  
  // Step 4: Location & Contact
  address: z.string().min(10, "Dirección completa requerida"),
  city: z.string().min(2, "Ciudad requerida"),
  country: z.string().default("Colombia"),
  phone: z.string().min(10, "Teléfono válido requerido"),
  website: z.string().url().optional().or(z.literal("")),
  
  // Step 5: Operating Hours
  operatingHours: z.object({
    monday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }),
    tuesday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }),
    wednesday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }),
    thursday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }),
    friday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }),
    saturday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }),
    sunday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() })
  }),
  
  // Step 6: Business Documentation & Verification
  businessLicense: z.string().optional(),
  taxId: z.string().optional(),
  certifications: z.array(z.string()),
  
  // Step 7: Social Media & Additional Info
  socialMedia: z.object({
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional()
  }),
  
  // Step 8: Sustainability & Accessibility
  sustainabilityPractices: z.array(z.string()),
  accessibilityFeatures: z.array(z.string()),
  languages: z.array(z.string()).min(1, "Al menos un idioma"),
  
  // Step 9: Banking & Emergency Contact
  emergencyContact: z.object({
    name: z.string().min(2, "Nombre requerido"),
    phone: z.string().min(10, "Teléfono requerido"),
    email: z.string().email("Email requerido"),
    relationship: z.string()
  }),
  
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

  const form = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
    defaultValues: {
      country: "Colombia",
      yearsExperience: 0,
      teamSize: 1,
      servicesOffered: [],
      certifications: [],
      sustainabilityPractices: [],
      accessibilityFeatures: [],
      languages: ["Español"],
      socialMedia: {},
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
      acceptTerms: false
    }
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegistrationForm) => {
      const response = await apiRequest('/api/auth/register-company', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      return response;
    },
    onSuccess: (data) => {
      console.log('✅ Registration successful:', data);
      toast({
        title: "¡Registro Exitoso!",
        description: "Se ha enviado un email de verificación. Revisa tu bandeja de entrada.",
        duration: 5000
      });
      setLocation('/verificacion-pendiente');
    },
    onError: (error: any) => {
      console.error('❌ Registration error:', error);
      toast({
        title: "Error en el Registro",
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
      case 3: return ['servicesOffered', 'targetMarket', 'yearsExperience', 'teamSize'];
      case 4: return ['address', 'city', 'phone', 'website'];
      case 5: return ['operatingHours'];
      case 6: return ['businessLicense', 'taxId', 'certifications'];
      case 7: return ['socialMedia'];
      case 8: return ['sustainabilityPractices', 'accessibilityFeatures', 'languages'];
      case 9: return ['emergencyContact'];
      case 10: return ['acceptTerms'];
      default: return [];
    }
  };

  const onSubmit = (data: RegistrationForm) => {
    registerMutation.mutate(data);
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
              <Briefcase className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white">Servicios y Experiencia</h2>
              <p className="text-white/70">Qué ofreces y tu experiencia en el sector</p>
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
              <h2 className="text-2xl font-bold text-white">Ubicación y Contacto</h2>
              <p className="text-white/70">Dónde encontrarte y cómo contactarte</p>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className="text-white">Teléfono/WhatsApp *</Label>
                <Input
                  {...form.register("phone")}
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="+57 300 123 4567"
                />
                {form.formState.errors.phone && (
                  <p className="text-red-400 text-sm">{form.formState.errors.phone.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="website" className="text-white">Sitio Web</Label>
                <Input
                  {...form.register("website")}
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="https://www.empresa.com"
                />
                {form.formState.errors.website && (
                  <p className="text-red-400 text-sm">{form.formState.errors.website.message}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Clock className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white">Horarios de Operación</h2>
              <p className="text-white/70">Define cuándo estás disponible</p>
            </div>

            <div className="space-y-4">
              {Object.entries({
                monday: "Lunes",
                tuesday: "Martes", 
                wednesday: "Miércoles",
                thursday: "Jueves",
                friday: "Viernes",
                saturday: "Sábado",
                sunday: "Domingo"
              }).map(([day, label]) => (
                <div key={day} className="bg-white/5 p-4 rounded-lg border border-white/20">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-white font-semibold">{label}</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`${day}-closed`}
                        checked={form.watch(`operatingHours.${day}.closed` as any)}
                        onCheckedChange={(checked) => {
                          form.setValue(`operatingHours.${day}.closed` as any, !!checked);
                        }}
                      />
                      <Label htmlFor={`${day}-closed`} className="text-white/70 text-sm">Cerrado</Label>
                    </div>
                  </div>
                  
                  {!form.watch(`operatingHours.${day}.closed` as any) && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white/70 text-sm">Apertura</Label>
                        <Input
                          type="time"
                          {...form.register(`operatingHours.${day}.open` as any)}
                          className="bg-white/10 border-white/30 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white/70 text-sm">Cierre</Label>
                        <Input
                          type="time"
                          {...form.register(`operatingHours.${day}.close` as any)}
                          className="bg-white/10 border-white/30 text-white"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      // Continue with remaining steps...
      case 6:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <FileText className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white">Documentación Legal</h2>
              <p className="text-white/70">Información legal y certificaciones</p>
            </div>

            <div>
              <Label htmlFor="businessLicense" className="text-white">Registro Mercantil/Cámara de Comercio</Label>
              <Input
                {...form.register("businessLicense")}
                className="bg-white/10 border-white/30 text-white"
                placeholder="Número de registro"
              />
            </div>

            <div>
              <Label htmlFor="taxId" className="text-white">NIT/RUT</Label>
              <Input
                {...form.register("taxId")}
                className="bg-white/10 border-white/30 text-white"
                placeholder="Número de identificación tributaria"
              />
            </div>

            <div>
              <Label className="text-white">Certificaciones y Reconocimientos</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {[
                  "ISO 14001", "Rainforest Alliance", "Travelife", "Green Key",
                  "Registro Nacional de Turismo", "Sello Ambiental Colombiano",
                  "Certificación Icontec", "Fair Trade", "B Corp", "LEED"
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
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Globe className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white">Redes Sociales</h2>
              <p className="text-white/70">Conecta tus perfiles sociales</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="instagram" className="text-white flex items-center">
                  <Instagram className="w-4 h-4 mr-2" />
                  Instagram
                </Label>
                <Input
                  {...form.register("socialMedia.instagram")}
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="https://instagram.com/tuempresa"
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
                  placeholder="https://facebook.com/tuempresa"
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
                  placeholder="https://twitter.com/tuempresa"
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
                  placeholder="https://linkedin.com/company/tuempresa"
                />
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Heart className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white">Sostenibilidad y Accesibilidad</h2>
              <p className="text-white/70">Tus prácticas responsables</p>
            </div>

            <div>
              <Label className="text-white">Prácticas de Sostenibilidad</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
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
              <Label className="text-white">Características de Accesibilidad</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
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
              <Label className="text-white">Idiomas de Atención * (selecciona múltiples)</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {LANGUAGES.map((language) => (
                  <div key={language} className="flex items-center space-x-2">
                    <Checkbox
                      id={language}
                      defaultChecked={language === "Español"}
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
              <Shield className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white">Contacto de Emergencia</h2>
              <p className="text-white/70">Persona de contacto en caso de emergencias</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyName" className="text-white">Nombre Completo *</Label>
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
                <Label htmlFor="emergencyRelationship" className="text-white">Relación</Label>
                <Select onValueChange={(value) => form.setValue("emergencyContact.relationship", value)}>
                  <SelectTrigger className="bg-white/10 border-white/30 text-white">
                    <SelectValue placeholder="Seleccionar relación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Familiar">Familiar</SelectItem>
                    <SelectItem value="Socio">Socio/a</SelectItem>
                    <SelectItem value="Empleado">Empleado/a</SelectItem>
                    <SelectItem value="Consultor">Consultor/a</SelectItem>
                    <SelectItem value="Abogado">Abogado/a</SelectItem>
                    <SelectItem value="Contador">Contador/a</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyPhone" className="text-white">Teléfono *</Label>
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
                <Label htmlFor="emergencyEmail" className="text-white">Email *</Label>
                <Input
                  {...form.register("emergencyContact.email")}
                  type="email"
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="contacto@email.com"
                />
                {form.formState.errors.emergencyContact?.email && (
                  <p className="text-red-400 text-sm">{form.formState.errors.emergencyContact.email.message}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 10:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white">Confirmación Final</h2>
              <p className="text-white/70">Revisa y confirma tu información</p>
            </div>

            <div className="bg-white/5 border border-white/20 rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold text-white">Resumen de Registro</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/70">Empresa:</p>
                  <p className="text-white font-semibold">{form.watch("companyName")}</p>
                </div>
                <div>
                  <p className="text-white/70">Categoría:</p>
                  <p className="text-white font-semibold">{form.watch("companyCategory")}</p>
                </div>
                <div>
                  <p className="text-white/70">Email:</p>
                  <p className="text-white font-semibold">{form.watch("email")}</p>
                </div>
                <div>
                  <p className="text-white/70">Ciudad:</p>
                  <p className="text-white font-semibold">{form.watch("city")}</p>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-300 font-semibold mb-2">Qué sucederá después:</h4>
              <ul className="text-white/80 text-sm space-y-1">
                <li>• Recibirás un email de verificación</li>
                <li>• Debes hacer clic en el enlace para activar tu cuenta</li>
                <li>• Una vez verificado, tendrás acceso completo al Portal Empresas</li>
                <li>• Podrás crear experiencias, conectar con empresarios y aparecer en el directorio</li>
              </ul>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="acceptTerms"
                {...form.register("acceptTerms")}
                required
              />
              <Label htmlFor="acceptTerms" className="text-white text-sm">
                Acepto los términos y condiciones de Festival NATUR *
              </Label>
            </div>
            {form.formState.errors.acceptTerms && (
              <p className="text-red-400 text-sm">{form.formState.errors.acceptTerms.message}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900">
      <HeaderButtons showPortalButtons={true} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-gasoek text-green-400 mb-2 uppercase tracking-wider">
              NATUR
            </h1>
            <p className="text-white text-lg">
              Registro Completo de Empresa
            </p>
            <p className="text-white/60 text-sm mt-2">
              Información integral para acceder al Portal Empresas
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/70 text-sm">Paso {currentStep} de {totalSteps}</span>
              <span className="text-white/70 text-sm">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-white/20" />
          </div>

          {/* Form */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {renderStep()}
                
                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="text-white border-white/30 hover:bg-white/10"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Anterior
                  </Button>
                  
                  {currentStep < totalSteps ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-green-400 hover:bg-green-500 text-black"
                    >
                      Siguiente
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={registerMutation.isPending}
                      className="bg-green-400 hover:bg-green-500 text-black"
                    >
                      {registerMutation.isPending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                          Registrando...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
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
    </div>
  );
};

export default ComprehensiveCompanyRegistration;