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
      setLocation('/experiencias');
    } else {
      setLocation('/mapa');
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
      setLocation('/con-sentidos');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <HeaderButtons showPortalButtons={false} />
      
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-black/70 to-green-900/70 text-white">
        <img 
          src="/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          alt="Authentication"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        <div className="relative z-10 container mx-auto px-4 py-16 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-2xl">
              <IconComponent className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-gasoek tracking-wide drop-shadow-2xl">
            {currentConfig.title.toUpperCase()}
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto font-medium drop-shadow-lg">
            {currentConfig.subtitle}
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16 max-w-md">
        {/* Back button */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="text-black hover:text-green-800 font-bold">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>
        </div>

        {/* Auth Form */}
        <Card className="shadow-2xl border-2 border-green-500 bg-white">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 border-b-2 border-green-500">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
              <TabsList className="grid w-full grid-cols-2 bg-white/20">
                <TabsTrigger value="login" className="text-white font-bold data-[state=active]:bg-white data-[state=active]:text-green-700">Iniciar Sesión</TabsTrigger>
                <TabsTrigger value="register" className="text-white font-bold data-[state=active]:bg-white data-[state=active]:text-green-700">Registrarse</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          
          <CardContent className="p-6">
            <Tabs value={activeTab}>
              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-3">
                    <Label htmlFor="login-email" className="text-black font-bold text-lg">
                      Correo electrónico
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-600 w-5 h-5" />
                      <Input
                        id="login-email"
                        type="email"
                        value={loginData.email}
                        onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-12 border-2 border-green-600 focus:border-green-700 focus:ring-green-600 text-black font-medium text-lg p-4"
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="login-password" className="text-black font-bold text-lg">
                      Contraseña
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-600 w-5 h-5" />
                      <Input
                        id="login-password"
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-12 border-2 border-green-600 focus:border-green-700 focus:ring-green-600 text-black font-medium text-lg p-4"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <a href="#" className={`${currentConfig.iconColor} hover:underline`}>
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 font-bold text-lg shadow-xl"
                  >
                    Iniciar Sesión
                  </Button>
                </form>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name" className="text-gray-700 font-medium">
                      Nombre completo
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="register-name"
                        type="text"
                        value={registerData.name}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                        className={`pl-10 border-gray-200 ${currentConfig.focusColor}`}
                        placeholder="Tu nombre completo"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-gray-700 font-medium">
                      Correo electrónico
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="register-email"
                        type="email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                        className={`pl-10 border-gray-200 ${currentConfig.focusColor}`}
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-gray-700 font-medium">
                      Contraseña
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="register-password"
                        type="password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                        className={`pl-10 border-gray-200 ${currentConfig.focusColor}`}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-gray-700 font-medium">
                      Confirmar contraseña
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="confirm-password"
                        type="password"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className={`pl-10 border-gray-200 ${currentConfig.focusColor}`}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className={`w-full ${currentConfig.buttonColor} text-white py-3 font-medium`}
                  >
                    Crear Cuenta
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Additional Links */}
        <div className="text-center mt-6 text-gray-600 text-sm">
          {isEmpresas ? (
            <p>
              ¿Eres un viajero?{" "}
              <Link to="/auth/consentidos" className="text-green-600 hover:underline font-medium">
                Únete a Con-Sentidos
              </Link>
            </p>
          ) : (
            <p>
              ¿Tienes una empresa?{" "}
              <Link to="/auth/empresas" className="text-yellow-600 hover:underline font-medium">
                Accede al Portal Empresas
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;