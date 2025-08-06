import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, MapPin, Mail, Lock, ArrowLeft } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";


const Auth = () => {
  const [location] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
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
    password: isEmpresas ? "dahub123" : ""
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
      
      // Redirect based on user role, not URL type
      const userRole = data.user?.role || 'viajero';
      const redirectUrl = userRole === 'empresa' ? '/portal-empresas' : '/portal-viajeros';
      
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
                        className="pl-12 border-2 bg-white/10 backdrop-blur-sm text-white font-medium text-lg p-4 placeholder-white/60 border-[#cad95e]"
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
                        className="pl-12 border-2 bg-white/10 backdrop-blur-sm text-white font-medium text-lg p-4 placeholder-white/60 border-[#cad95e]"
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