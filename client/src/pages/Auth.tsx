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
    
    // Redirect based on type
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
    
    // Redirect to appropriate registration form
    if (isEmpresas) {
      setLocation('/registro');
    } else {
      setLocation('/con-sentidos');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <HeaderButtons showPortalButtons={false} />
      
      <div className="container mx-auto px-4 py-16 max-w-md">
        {/* Back button */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className={`w-16 h-16 ${currentConfig.bgColor} rounded-full flex items-center justify-center`}>
              <IconComponent className={`w-8 h-8 ${currentConfig.iconColor}`} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {currentConfig.title}
          </h1>
          <p className="text-gray-600 text-sm">
            {currentConfig.subtitle}
          </p>
        </div>

        {/* Auth Form */}
        <Card className={`shadow-lg ${currentConfig.borderColor}`}>
          <CardHeader className={`${currentConfig.bgColor} ${currentConfig.borderColor} border-b`}>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                <TabsTrigger value="register">Registrarse</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          
          <CardContent className="p-6">
            <Tabs value={activeTab}>
              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-gray-700 font-medium">
                      Correo electrónico
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="login-email"
                        type="email"
                        value={loginData.email}
                        onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                        className={`pl-10 border-gray-200 ${currentConfig.focusColor}`}
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-gray-700 font-medium">
                      Contraseña
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="login-password"
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                        className={`pl-10 border-gray-200 ${currentConfig.focusColor}`}
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
                    className={`w-full ${currentConfig.buttonColor} text-white py-3 font-medium`}
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