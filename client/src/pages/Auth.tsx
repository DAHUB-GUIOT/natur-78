import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, MapPin, Mail, Lock, ArrowLeft, ArrowRight, User, Phone, Globe, Clock, Award, Shield } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";


// Company categories for registration
const COMPANY_CATEGORIES = [
  { value: "agencias-operadores", label: "Agencias u Operadores Turísticos" },
  { value: "alojamientos", label: "Alojamientos Sostenibles" },
  { value: "gastronomia", label: "Gastronomía Sostenible" },
  { value: "movilidad", label: "Movilidad y Transporte Ecológico" },
  { value: "ong-fundaciones", label: "ONG y Fundaciones" },
  { value: "educacion", label: "Educación y Sensibilización Ambiental" },
  { value: "tecnologia", label: "Tecnología para el Turismo Sostenible" },
  { value: "aliados", label: "Aliados y Patrocinadores" }
];

const Auth = () => {
  const [location] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [registrationStep, setRegistrationStep] = useState(1);
  
  // Determine if this is empresas or consentidos based on URL
  const isEmpresas = location.includes('empresas');
  const IconComponent = isEmpresas ? Building2 : MapPin;
  
  const currentConfig = {
    title: isEmpresas ? "Portal Empresas" : "Con-Sentidos",
    subtitle: isEmpresas 
      ? "Conecta tu empresa con el ecosistema de turismo sostenible"
      : "Descubre experiencias auténticas y conecta con viajeros conscientes"
  };

  const [loginData, setLoginData] = useState({
    email: isEmpresas ? "dahub.tech@gmail.com" : "",
    password: isEmpresas ? "12345678" : ""
  });

  // Enhanced registration data for empresas
  const [companyRegisterData, setCompanyRegisterData] = useState({
    // Step 1: Personal Info
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // Step 2: Company Basics
    companyName: "",
    companyDescription: "",
    companyCategory: "",
    companySubcategory: "",
    // Step 3: Contact & Location
    phone: "",
    website: "",
    address: "",
    city: "Bogotá",
    country: "Colombia",
    // Step 4: Business Details
    servicesOffered: [] as string[],
    targetMarket: "",
    yearsExperience: 0,
    teamSize: 1,
    // Step 5: Certifications & Social
    certifications: [] as string[],
    socialMedia: {
      instagram: "",
      facebook: "",
      twitter: "",
      linkedin: ""
    },
    // Step 6: Terms
    acceptTerms: false,
    acceptPrivacy: false
  });

  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    userType: isEmpresas ? "empresa" : "viajero"
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      return await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Inicio de sesión exitoso",
        description: "Redirigiendo...",
      });
      
      // Redirect based on the current portal context
      const redirectUrl = isEmpresas ? '/portal-empresas' : '/portal-viajeros';
      
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1000);
    },
    onError: (error: any) => {
      toast({
        title: "Error de autenticación",
        description: error.message || "Credenciales inválidas",
        variant: "destructive",
      });
    },
  });

  // Step validation function
  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return companyRegisterData.firstName && companyRegisterData.lastName && 
               companyRegisterData.email && companyRegisterData.password.length >= 8;
      case 2:
        return companyRegisterData.companyName && companyRegisterData.companyDescription.length >= 50 && 
               companyRegisterData.companyCategory;
      case 3:
        return companyRegisterData.phone && companyRegisterData.address && companyRegisterData.city;
      case 4:
        return companyRegisterData.servicesOffered.length > 0 && companyRegisterData.targetMarket;
      case 5:
        return true; // Optional step
      case 6:
        return companyRegisterData.acceptTerms && companyRegisterData.acceptPrivacy;
      default:
        return false;
    }
  };

  // Render step functions
  const renderPersonalInfoStep = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <User className="w-8 h-8 mx-auto text-[#cad95e] mb-2" />
        <h3 className="text-lg font-bold text-[#cad95e]">Información Personal</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-[#cad95e] font-medium">Nombre *</Label>
          <Input
            value={companyRegisterData.firstName}
            onChange={(e) => setCompanyRegisterData(prev => ({ ...prev, firstName: e.target.value }))}
            className="bg-white/10 border-[#cad95e] text-white"
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <Label className="text-[#cad95e] font-medium">Apellido *</Label>
          <Input
            value={companyRegisterData.lastName}
            onChange={(e) => setCompanyRegisterData(prev => ({ ...prev, lastName: e.target.value }))}
            className="bg-white/10 border-[#cad95e] text-white"
            placeholder="Tu apellido"
          />
        </div>
      </div>
      
      <div>
        <Label className="text-[#cad95e] font-medium">Email *</Label>
        <Input
          type="email"
          value={companyRegisterData.email}
          onChange={(e) => setCompanyRegisterData(prev => ({ ...prev, email: e.target.value }))}
          className="bg-white/10 border-[#cad95e] text-white"
          placeholder="tu@email.com"
        />
      </div>
      
      <div>
        <Label className="text-[#cad95e] font-medium">Contraseña *</Label>
        <Input
          type="password"
          value={companyRegisterData.password}
          onChange={(e) => setCompanyRegisterData(prev => ({ ...prev, password: e.target.value }))}
          className="bg-white/10 border-[#cad95e] text-white"
          placeholder="Mínimo 8 caracteres"
        />
      </div>
    </div>
  );

  const renderCompanyBasicsStep = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <Building2 className="w-8 h-8 mx-auto text-[#cad95e] mb-2" />
        <h3 className="text-lg font-bold text-[#cad95e]">Información de la Empresa</h3>
      </div>
      
      <div>
        <Label className="text-[#cad95e] font-medium">Nombre de la Empresa *</Label>
        <Input
          value={companyRegisterData.companyName}
          onChange={(e) => setCompanyRegisterData(prev => ({ ...prev, companyName: e.target.value }))}
          className="bg-white/10 border-[#cad95e] text-white"
          placeholder="Nombre de tu empresa"
        />
      </div>
      
      <div>
        <Label className="text-[#cad95e] font-medium">Descripción *</Label>
        <Textarea
          value={companyRegisterData.companyDescription}
          onChange={(e) => setCompanyRegisterData(prev => ({ ...prev, companyDescription: e.target.value }))}
          className="bg-white/10 border-[#cad95e] text-white min-h-[80px]"
          placeholder="Describe tu empresa (mínimo 50 caracteres)"
        />
        <div className="text-xs text-white/60 mt-1">{companyRegisterData.companyDescription.length}/50 mínimo</div>
      </div>
      
      <div>
        <Label className="text-[#cad95e] font-medium">Categoría *</Label>
        <Select value={companyRegisterData.companyCategory} onValueChange={(value) => setCompanyRegisterData(prev => ({ ...prev, companyCategory: value }))}>
          <SelectTrigger className="bg-white/10 border-[#cad95e] text-white">
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            {COMPANY_CATEGORIES.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderContactLocationStep = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <Phone className="w-8 h-8 mx-auto text-[#cad95e] mb-2" />
        <h3 className="text-lg font-bold text-[#cad95e]">Contacto y Ubicación</h3>
      </div>
      
      <div>
        <Label className="text-[#cad95e] font-medium">Teléfono *</Label>
        <Input
          value={companyRegisterData.phone}
          onChange={(e) => setCompanyRegisterData(prev => ({ ...prev, phone: e.target.value }))}
          className="bg-white/10 border-[#cad95e] text-white"
          placeholder="+57 300 123 4567"
        />
      </div>
      
      <div>
        <Label className="text-[#cad95e] font-medium">Sitio Web</Label>
        <Input
          type="url"
          value={companyRegisterData.website}
          onChange={(e) => setCompanyRegisterData(prev => ({ ...prev, website: e.target.value }))}
          className="bg-white/10 border-[#cad95e] text-white"
          placeholder="https://tuempresa.com"
        />
      </div>
      
      <div>
        <Label className="text-[#cad95e] font-medium">Dirección *</Label>
        <Input
          value={companyRegisterData.address}
          onChange={(e) => setCompanyRegisterData(prev => ({ ...prev, address: e.target.value }))}
          className="bg-white/10 border-[#cad95e] text-white"
          placeholder="Dirección completa"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-[#cad95e] font-medium">Ciudad *</Label>
          <Input
            value={companyRegisterData.city}
            onChange={(e) => setCompanyRegisterData(prev => ({ ...prev, city: e.target.value }))}
            className="bg-white/10 border-[#cad95e] text-white"
            placeholder="Bogotá"
          />
        </div>
        <div>
          <Label className="text-[#cad95e] font-medium">País</Label>
          <Input
            value={companyRegisterData.country}
            onChange={(e) => setCompanyRegisterData(prev => ({ ...prev, country: e.target.value }))}
            className="bg-white/10 border-[#cad95e] text-white"
            placeholder="Colombia"
          />
        </div>
      </div>
    </div>
  );

  const renderBusinessDetailsStep = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <Globe className="w-8 h-8 mx-auto text-[#cad95e] mb-2" />
        <h3 className="text-lg font-bold text-[#cad95e]">Detalles del Negocio</h3>
      </div>
      
      <div>
        <Label className="text-[#cad95e] font-medium">Servicios Ofrecidos *</Label>
        <Textarea
          value={companyRegisterData.servicesOffered.join(', ')}
          onChange={(e) => setCompanyRegisterData(prev => ({ ...prev, servicesOffered: e.target.value.split(', ').filter(s => s.trim()) }))}
          className="bg-white/10 border-[#cad95e] text-white"
          placeholder="Turismo ecológico, Senderismo, Aviturismo (separar por comas)"
        />
      </div>
      
      <div>
        <Label className="text-[#cad95e] font-medium">Mercado Objetivo *</Label>
        <Input
          value={companyRegisterData.targetMarket}
          onChange={(e) => setCompanyRegisterData(prev => ({ ...prev, targetMarket: e.target.value }))}
          className="bg-white/10 border-[#cad95e] text-white"
          placeholder="Familias, jóvenes aventureros, turistas internacionales..."
        />
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-[#cad95e] font-medium">Años de Experiencia</Label>
          <Input
            type="number"
            value={companyRegisterData.yearsExperience}
            onChange={(e) => setCompanyRegisterData(prev => ({ ...prev, yearsExperience: parseInt(e.target.value) || 0 }))}
            className="bg-white/10 border-[#cad95e] text-white"
            placeholder="0"
          />
        </div>
        <div>
          <Label className="text-[#cad95e] font-medium">Tamaño del Equipo</Label>
          <Input
            type="number"
            value={companyRegisterData.teamSize}
            onChange={(e) => setCompanyRegisterData(prev => ({ ...prev, teamSize: parseInt(e.target.value) || 1 }))}
            className="bg-white/10 border-[#cad95e] text-white"
            placeholder="1"
          />
        </div>
      </div>
    </div>
  );

  const renderCertificationsSocialStep = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <Award className="w-8 h-8 mx-auto text-[#cad95e] mb-2" />
        <h3 className="text-lg font-bold text-[#cad95e]">Certificaciones y Redes Sociales</h3>
      </div>
      
      <div>
        <Label className="text-[#cad95e] font-medium">Certificaciones</Label>
        <Textarea
          value={companyRegisterData.certifications.join(', ')}
          onChange={(e) => setCompanyRegisterData(prev => ({ ...prev, certifications: e.target.value.split(', ').filter(s => s.trim()) }))}
          className="bg-white/10 border-[#cad95e] text-white"
          placeholder="ISO 14001, Certificación de Sostenibilidad, etc. (separar por comas)"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-[#cad95e] font-medium">Instagram</Label>
          <Input
            value={companyRegisterData.socialMedia.instagram}
            onChange={(e) => setCompanyRegisterData(prev => ({ ...prev, socialMedia: { ...prev.socialMedia, instagram: e.target.value } }))}
            className="bg-white/10 border-[#cad95e] text-white"
            placeholder="@tuempresa"
          />
        </div>
        <div>
          <Label className="text-[#cad95e] font-medium">Facebook</Label>
          <Input
            value={companyRegisterData.socialMedia.facebook}
            onChange={(e) => setCompanyRegisterData(prev => ({ ...prev, socialMedia: { ...prev.socialMedia, facebook: e.target.value } }))}
            className="bg-white/10 border-[#cad95e] text-white"
            placeholder="facebook.com/tuempresa"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-[#cad95e] font-medium">Twitter</Label>
          <Input
            value={companyRegisterData.socialMedia.twitter}
            onChange={(e) => setCompanyRegisterData(prev => ({ ...prev, socialMedia: { ...prev.socialMedia, twitter: e.target.value } }))}
            className="bg-white/10 border-[#cad95e] text-white"
            placeholder="@tuempresa"
          />
        </div>
        <div>
          <Label className="text-[#cad95e] font-medium">LinkedIn</Label>
          <Input
            value={companyRegisterData.socialMedia.linkedin}
            onChange={(e) => setCompanyRegisterData(prev => ({ ...prev, socialMedia: { ...prev.socialMedia, linkedin: e.target.value } }))}
            className="bg-white/10 border-[#cad95e] text-white"
            placeholder="linkedin.com/company/tuempresa"
          />
        </div>
      </div>
    </div>
  );

  const renderFinalStepConfirmation = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <Shield className="w-8 h-8 mx-auto text-[#cad95e] mb-2" />
        <h3 className="text-lg font-bold text-[#cad95e]">Confirmación Final</h3>
      </div>
      
      <div className="bg-white/5 p-4 rounded-lg space-y-3">
        <p className="text-white/80 text-sm">Resumen de tu registro:</p>
        <div className="text-xs text-white/60 space-y-1">
          <p><span className="font-medium">Empresa:</span> {companyRegisterData.companyName}</p>
          <p><span className="font-medium">Email:</span> {companyRegisterData.email}</p>
          <p><span className="font-medium">Categoría:</span> {COMPANY_CATEGORIES.find(c => c.value === companyRegisterData.companyCategory)?.label}</p>
          <p><span className="font-medium">Ciudad:</span> {companyRegisterData.city}</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="terms"
            checked={companyRegisterData.acceptTerms}
            onCheckedChange={(checked) => setCompanyRegisterData(prev => ({ ...prev, acceptTerms: checked as boolean }))}
          />
          <label htmlFor="terms" className="text-sm text-white/80 leading-relaxed">
            Acepto los <span className="text-[#cad95e] underline cursor-pointer">términos y condiciones</span> de Festival NATUR
          </label>
        </div>
        
        <div className="flex items-start space-x-3">
          <Checkbox
            id="privacy"
            checked={companyRegisterData.acceptPrivacy}
            onCheckedChange={(checked) => setCompanyRegisterData(prev => ({ ...prev, acceptPrivacy: checked as boolean }))}
          />
          <label htmlFor="privacy" className="text-sm text-white/80 leading-relaxed">
            Acepto la <span className="text-[#cad95e] underline cursor-pointer">política de privacidad</span> y el tratamiento de mis datos
          </label>
        </div>
      </div>
    </div>
  );

  // Company registration mutation
  const companyRegisterMutation = useMutation({
    mutationFn: async (data: typeof companyRegisterData) => {
      const payload = {
        ...data,
        role: 'empresa',
        servicesOffered: data.servicesOffered,
        operatingHours: {
          monday: { open: "09:00", close: "17:00", closed: false },
          tuesday: { open: "09:00", close: "17:00", closed: false },
          wednesday: { open: "09:00", close: "17:00", closed: false },
          thursday: { open: "09:00", close: "17:00", closed: false },
          friday: { open: "09:00", close: "17:00", closed: false },
          saturday: { open: "09:00", close: "17:00", closed: false },
          sunday: { open: "09:00", close: "17:00", closed: true }
        }
      };
      
      return await apiRequest('/api/auth/register-company', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: () => {
      toast({
        title: "¡Registro completado!",
        description: "Se ha enviado un email de verificación. Revisa tu bandeja de entrada.",
      });
      window.location.href = '/verificacion-pendiente?email=' + encodeURIComponent(companyRegisterData.email);
    },
    onError: (error: any) => {
      toast({
        title: "Error en el registro",
        description: error.message || "No se pudo completar el registro. Intenta de nuevo.",
        variant: "destructive",
      });
    }
  });

  const handleCompanyRegister = () => {
    companyRegisterMutation.mutate(companyRegisterData);
  };

  const registerMutation = useMutation({
    mutationFn: async (userData: any) => {
      return await apiRequest('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: () => {
      toast({
        title: "Registro exitoso",
        description: "Redirigiendo...",
      });
      const redirectUrl = isEmpresas ? '/portal-empresas' : '/portal-viajeros';
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1000);
    },
    onError: (error: any) => {
      toast({
        title: "Error en registro",
        description: error.message || "Error al crear cuenta",
        variant: "destructive",
      });
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(loginData);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(registerData);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-900 via-gray-900 to-black">
      {/* Navigation */}
      <nav className="relative z-20 bg-gradient-to-r from-black/50 to-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 pt-20">
        <div className="w-full max-w-md">
          
          {/* Title Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#cad95e' }}>
                <IconComponent className="w-8 h-8 text-black" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-gasoek tracking-wide text-[#cad95e]">
              {currentConfig.title.toUpperCase()}
            </h1>
            <p className="text-lg text-white max-w-2xl mx-auto font-medium">
              {currentConfig.subtitle}
            </p>
          </div>

          {/* Auth Form */}
          <Card className="shadow-2xl backdrop-blur-md bg-white/10 border-2 border-[#cad95e]">
            <CardHeader className="backdrop-blur-md bg-white/5 border-b-2 border-[#cad95e]">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
                <TabsList className="grid w-full grid-cols-2 bg-white/20">
                  <TabsTrigger 
                    value="login" 
                    className="font-bold data-[state=active]:bg-white/20 text-[#cad95e]"
                  >
                    Iniciar Sesión
                  </TabsTrigger>
                  <TabsTrigger 
                    value="register" 
                    className="font-bold data-[state=active]:bg-white/20 text-[#cad95e]"
                  >
                    Registrarse
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
          
          <CardContent className="p-6">
            <Tabs value={activeTab}>
              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  {/* Google OAuth Button - Single instance */}
                  <Button
                    type="button"
                    className="w-full bg-white/90 border-2 border-gray-300 text-gray-700 hover:bg-white flex items-center justify-center gap-2 p-4"
                    onClick={() => window.location.href = '/api/auth/google'}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continuar con Google
                  </Button>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#cad95e]" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white/10 backdrop-blur-sm text-[#cad95e]">O continúa con email</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="login-email" className="font-bold text-lg text-[#cad95e]">
                      Correo electrónico
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#cad95e]" />
                      <Input
                        id="login-email"
                        type="email"
                        value={loginData.email}
                        onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                        className="mobile-input pl-12 border-2 bg-white/10 backdrop-blur-sm text-white font-medium placeholder-white/60 border-[#cad95e]"
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="login-password" className="font-bold text-lg text-[#cad95e]">
                      Contraseña
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#cad95e]" />
                      <Input
                        id="login-password"
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                        className="mobile-input pl-12 border-2 bg-white/10 backdrop-blur-sm text-white font-medium placeholder-white/60 border-[#cad95e]"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <a href="#" className="hover:underline text-[#cad95e]">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>

                  <Button
                    type="submit"
                    className="w-full text-black py-4 font-bold text-lg shadow-xl hover:opacity-90"
                    style={{ backgroundColor: '#cad95e' }}
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </Button>
                </form>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register">
                {isEmpresas ? (
                  // Multi-step company registration form
                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between text-xs text-white/60 mb-2">
                        <span>Paso {registrationStep} de 6</span>
                        <span>{Math.round((registrationStep / 6) * 100)}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div 
                          className="bg-[#cad95e] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(registrationStep / 6) * 100}%` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${(registrationStep / 6) * 100}%` }}
                        />
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={registrationStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {registrationStep === 1 && renderPersonalInfoStep()}
                        {registrationStep === 2 && renderCompanyBasicsStep()}
                        {registrationStep === 3 && renderContactLocationStep()}
                        {registrationStep === 4 && renderBusinessDetailsStep()}
                        {registrationStep === 5 && renderCertificationsSocialStep()}
                        {registrationStep === 6 && renderFinalStepConfirmation()}
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setRegistrationStep(prev => Math.max(1, prev - 1))}
                        disabled={registrationStep === 1}
                        className="border-[#cad95e] text-[#cad95e] hover:bg-[#cad95e]/10"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Anterior
                      </Button>
                      
                      <Button
                        onClick={() => {
                          if (registrationStep === 6) {
                            handleCompanyRegister();
                          } else {
                            setRegistrationStep(prev => Math.min(6, prev + 1));
                          }
                        }}
                        className="text-black font-bold"
                        style={{ backgroundColor: '#cad95e' }}
                        disabled={!isStepValid(registrationStep)}
                      >
                        {registrationStep === 6 ? "Completar Registro" : "Siguiente"}
                        {registrationStep < 6 && <ArrowRight className="w-4 h-4 ml-2" />}
                      </Button>
                    </div>
                  </div>
                ) : (
                  // For viajeros, keep the simple registration form
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-3">
                      <Label htmlFor="register-firstName" className="font-bold text-lg text-[#cad95e]">
                        Nombre
                      </Label>
                      <Input
                        id="register-firstName"
                        type="text"
                        value={registerData.firstName}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, firstName: e.target.value }))}
                        className="border-2 bg-white/10 backdrop-blur-sm text-white font-medium text-lg p-4 placeholder-white/60 border-[#cad95e]"
                        placeholder="Tu nombre"
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="register-lastName" className="font-bold text-lg text-[#cad95e]">
                        Apellido
                      </Label>
                      <Input
                        id="register-lastName"
                        type="text"
                        value={registerData.lastName}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, lastName: e.target.value }))}
                        className="border-2 bg-white/10 backdrop-blur-sm text-white font-medium text-lg p-4 placeholder-white/60 border-[#cad95e]"
                        placeholder="Tu apellido"
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="register-email" className="font-bold text-lg text-[#cad95e]">
                        Correo electrónico
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#cad95e]" />
                        <Input
                          id="register-email"
                          type="email"
                          value={registerData.email}
                          onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                          className="pl-12 border-2 bg-white/10 backdrop-blur-sm text-white font-medium text-lg p-4 placeholder-white/60 border-[#cad95e]"
                          placeholder="tu@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="register-password" className="font-bold text-lg text-[#cad95e]">
                        Contraseña
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#cad95e]" />
                        <Input
                          id="register-password"
                          type="password"
                          value={registerData.password}
                          onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                          className="pl-12 border-2 bg-white/10 backdrop-blur-sm text-white font-medium text-lg p-4 placeholder-white/60 border-[#cad95e]"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full text-black py-4 font-bold text-lg shadow-xl hover:opacity-90"
                      style={{ backgroundColor: '#cad95e' }}
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? "Creando cuenta..." : "Crear Cuenta"}
                    </Button>
                  </form>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;