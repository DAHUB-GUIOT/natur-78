import React, { useState } from 'react';
import { HeaderButtons } from "@/components/layout/HeaderButtons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Building2, MapPin, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "wouter";

interface AuthProps {
  type: 'empresas' | 'consentidos';
}

const Auth = ({ type }: AuthProps) => {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const isEmpresas = type === 'empresas';
  
  const config = {
    empresas: {
      title: 'Portal Empresas',
      subtitle: 'Acceso para empresas y organizaciones de turismo sostenible',
      icon: Building2,
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      iconColor: 'text-yellow-600',
      buttonColor: 'bg-yellow-500 hover:bg-yellow-600',
      focusColor: 'focus:border-yellow-500 focus:ring-yellow-500'
    },
    consentidos: {
      title: 'Con-Sentidos',
      subtitle: 'Acceso para viajeros conscientes y exploradores sostenibles',
      icon: MapPin,
      color: 'green',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconColor: 'text-green-600',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      focusColor: 'focus:border-green-500 focus:ring-green-500'
    }
  };

  const currentConfig = config[type];
  const IconComponent = currentConfig.icon;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Inicio de sesión exitoso",
      description: `Bienvenido de vuelta a ${currentConfig.title}`,
    });
    
    // For existing users, redirect to their dashboards
    if (isEmpresas) {
      setLocation('/portal-empresas');
    } else {
      setLocation('/mapa'); // Marketplace for travelers
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Registro exitoso",
      description: `Te has registrado en ${currentConfig.title}. Completa tu perfil para comenzar.`,
    });
    
    // Redirect to detailed registration forms with subcategories
    if (isEmpresas) {
      setLocation('/registro');
    } else {
      setLocation('/con-sentidos'); // Con-Sentidos registration for travelers
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image - Same as Hero */}
      <img 
        alt="Festival NATUR - Authentication" 
        className="absolute h-full w-full object-cover inset-0" 
        src="/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg" 
      />
      
      {/* Light Gradient Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Top Navigation - Fixed with Green Background */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-green-600 border-b border-green-700 shadow-lg">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <span className="font-bold text-2xl font-gasoek" style={{ color: '#EDFF60' }}>N</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Main Content - Centered like BIME */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 pt-20">
        <div className="w-full max-w-md">
          
          {/* Title Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: isEmpresas ? '#EDFF60' : 'transparent', border: isEmpresas ? 'none' : '2px solid #10B981' }}>
                <IconComponent className="w-8 h-8" style={{ color: isEmpresas ? '#000' : '#10B981' }} />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-gasoek tracking-wide" style={{ color: isEmpresas ? '#EDFF60' : '#10B981' }}>
              {currentConfig.title.toUpperCase()}
            </h1>
            <p className="text-lg text-white max-w-2xl mx-auto font-medium">
              {currentConfig.subtitle}
            </p>
          </div>

          {/* Auth Form - Transparent with colored outlines */}
          <Card className="shadow-2xl backdrop-blur-md bg-white/10 border-2" style={{ borderColor: isEmpresas ? '#EDFF60' : '#10B981' }}>
            <CardHeader className="backdrop-blur-md bg-white/5 border-b-2" style={{ borderColor: isEmpresas ? '#EDFF60' : '#10B981' }}>
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
                <TabsList className="grid w-full grid-cols-2 bg-white/20">
                  <TabsTrigger 
                    value="login" 
                    className="font-bold data-[state=active]:bg-white/20"
                    style={{ 
                      color: isEmpresas ? '#EDFF60' : '#10B981',
                      borderColor: isEmpresas ? '#EDFF60' : '#10B981'
                    }}
                  >
                    Iniciar Sesión
                  </TabsTrigger>
                  <TabsTrigger 
                    value="register" 
                    className="font-bold data-[state=active]:bg-white/20"
                    style={{ 
                      color: isEmpresas ? '#EDFF60' : '#10B981',
                      borderColor: isEmpresas ? '#EDFF60' : '#10B981'
                    }}
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
                  <div className="space-y-3">
                    <Label htmlFor="login-email" className="font-bold text-lg" style={{ color: isEmpresas ? '#EDFF60' : '#10B981' }}>
                      Correo electrónico
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: isEmpresas ? '#EDFF60' : '#10B981' }} />
                      <Input
                        id="login-email"
                        type="email"
                        value={loginData.email}
                        onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-12 border-2 bg-white/10 backdrop-blur-sm text-white font-medium text-lg p-4 placeholder-white/60"
                        style={{ borderColor: isEmpresas ? '#EDFF60' : '#10B981' }}
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="login-password" className="font-bold text-lg" style={{ color: isEmpresas ? '#EDFF60' : '#10B981' }}>
                      Contraseña
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: isEmpresas ? '#EDFF60' : '#10B981' }} />
                      <Input
                        id="login-password"
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-12 border-2 bg-white/10 backdrop-blur-sm text-white font-medium text-lg p-4 placeholder-white/60"
                        style={{ borderColor: isEmpresas ? '#EDFF60' : '#10B981' }}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <a href="#" className="hover:underline" style={{ color: isEmpresas ? '#EDFF60' : '#10B981' }}>
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>

                  <Button
                    type="submit"
                    className="w-full text-black py-4 font-bold text-lg shadow-xl hover:opacity-90"
                    style={{ backgroundColor: isEmpresas ? '#EDFF60' : '#10B981' }}
                  >
                    Iniciar Sesión
                  </Button>

                  {isEmpresas && (
                    <>
                      <div className="text-center mt-4">
                        <p className="text-white/70 text-sm">
                          ✅ Google OAuth configurado y listo
                        </p>
                      </div>

                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t border-white/30" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-transparent px-2 text-white">O continúa con</span>
                        </div>
                      </div>

                      <Button 
                        type="button"
                        className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm py-4 font-medium text-lg transition-all duration-200"
                        onClick={() => {
                          const button = document.activeElement as HTMLButtonElement;
                          if (button) {
                            button.textContent = 'Conectando...';
                            button.disabled = true;
                          }
                          // Try direct approach first
                          window.location.href = '/api/auth/google';
                        }}
                      >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Continuar con Google
                      </Button>
                    </>
                  )}
                </form>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name" className="font-medium" style={{ color: isEmpresas ? '#EDFF60' : '#10B981' }}>
                      Nombre completo
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: isEmpresas ? '#EDFF60' : '#10B981' }} />
                      <Input
                        id="register-name"
                        type="text"
                        value={registerData.name}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                        className="pl-10 border-2 bg-white/10 backdrop-blur-sm text-white font-medium placeholder-white/60"
                        style={{ borderColor: isEmpresas ? '#EDFF60' : '#10B981' }}
                        placeholder="Tu nombre completo"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="font-medium" style={{ color: isEmpresas ? '#EDFF60' : '#10B981' }}>
                      Correo electrónico
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: isEmpresas ? '#EDFF60' : '#10B981' }} />
                      <Input
                        id="register-email"
                        type="email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-10 border-2 bg-white/10 backdrop-blur-sm text-white font-medium placeholder-white/60"
                        style={{ borderColor: isEmpresas ? '#EDFF60' : '#10B981' }}
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="font-medium" style={{ color: isEmpresas ? '#EDFF60' : '#10B981' }}>
                      Contraseña
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: isEmpresas ? '#EDFF60' : '#10B981' }} />
                      <Input
                        id="register-password"
                        type="password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-10 border-2 bg-white/10 backdrop-blur-sm text-white font-medium placeholder-white/60"
                        style={{ borderColor: isEmpresas ? '#EDFF60' : '#10B981' }}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="font-medium" style={{ color: isEmpresas ? '#EDFF60' : '#10B981' }}>
                      Confirmar contraseña
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: isEmpresas ? '#EDFF60' : '#10B981' }} />
                      <Input
                        id="confirm-password"
                        type="password"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="pl-10 border-2 bg-white/10 backdrop-blur-sm text-white font-medium placeholder-white/60"
                        style={{ borderColor: isEmpresas ? '#EDFF60' : '#10B981' }}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full text-black py-3 font-medium hover:opacity-90"
                    style={{ backgroundColor: isEmpresas ? '#EDFF60' : '#10B981' }}
                  >
                    Crear Cuenta
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

          {/* Additional Links */}
          <div className="text-center mt-6 text-sm">
            {isEmpresas ? (
              <p style={{ color: '#EDFF60' }}>
                ¿Eres un viajero?{" "}
                <Link to="/auth/consentidos" className="hover:underline font-medium" style={{ color: '#10B981' }}>
                  Únete a Con-Sentidos
                </Link>
              </p>
            ) : (
              <p style={{ color: '#10B981' }}>
                ¿Tienes una empresa?{" "}
                <Link to="/auth/empresas" className="hover:underline font-medium" style={{ color: '#EDFF60' }}>
                  Accede al Portal Empresas
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;