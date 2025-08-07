import React, { useState } from "react";
import { motion } from "framer-motion";
import { TreePine, Plane, Heart, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";

const AuthViajeros = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      return apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: (data) => {
      toast({
        title: "¡Bienvenido!",
        description: "Has iniciado sesión correctamente",
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
        title: "Error al iniciar sesión",
        description: error.message || "Verifica tus credenciales",
        variant: "destructive",
      });
    }
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async ({ email, password, firstName, lastName }: { 
      email: string; 
      password: string; 
      firstName: string;
      lastName: string;
    }) => {
      return apiRequest('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ 
          email, 
          password, 
          firstName, 
          lastName,
          role: 'viajero' 
        }),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: (data) => {
      toast({
        title: "¡Cuenta creada!",
        description: "Te has registrado correctamente como viajero",
      });
      
      // Redirect to viajeros portal after registration
      setTimeout(() => {
        window.location.href = '/portal-viajeros';
      }, 1000);
    },
    onError: (error: any) => {
      toast({
        title: "Error al registrarse",
        description: error.message || "Intenta con un email diferente",
        variant: "destructive",
      });
    }
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    if (!email || !password) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    loginMutation.mutate({ email, password });
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    
    if (!email || !password || !firstName || !lastName) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    registerMutation.mutate({ email, password, firstName, lastName });
  };

  const handleGoogleAuth = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-green-600/20 backdrop-blur-sm border border-green-500/30 rounded-full mb-4"
          >
            <TreePine className="w-8 h-8 text-green-400" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Portal Viajeros
          </h1>
          <p className="text-white/70">
            Descubre experiencias sostenibles únicas
          </p>
        </div>

        <Card className="backdrop-blur-sm bg-black/40 border border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-white">Acceso Viajeros</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/10 border-white/20">
                <TabsTrigger value="login" className="text-white data-[state=active]:bg-green-600 data-[state=active]:text-white">Iniciar Sesión</TabsTrigger>
                <TabsTrigger value="register" className="text-white data-[state=active]:bg-green-600 data-[state=active]:text-white">Registrarse</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      defaultValue="dahub.tech@gmail.com"
                      required
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                      data-testid="input-email-login"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">Contraseña</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      defaultValue="12345678"
                      required
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                      data-testid="input-password-login"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={loginMutation.isPending}
                    data-testid="button-login"
                  >
                    {loginMutation.isPending ? "Iniciando..." : "Iniciar Sesión"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-white">Nombre</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="Juan"
                        required
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                        data-testid="input-firstName"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-white">Apellido</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Pérez"
                        required
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                        data-testid="input-lastName"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-register" className="text-white">Email</Label>
                    <Input
                      id="email-register"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      required
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                      data-testid="input-email-register"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-register" className="text-white">Contraseña</Label>
                    <Input
                      id="password-register"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                      data-testid="input-password-register"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={registerMutation.isPending}
                    data-testid="button-register"
                  >
                    {registerMutation.isPending ? "Creando cuenta..." : "Crear Cuenta"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/30" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-black/40 px-2 text-white/70">O continúa con</span>
                </div>
              </div>
              <Button
                onClick={handleGoogleAuth}
                variant="outline"
                className="w-full mt-4 bg-white/10 border-white/30 text-white hover:bg-white/20"
                data-testid="button-google-auth"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
            </div>

            <div className="mt-6 text-center">
              <Button
                variant="ghost"
                onClick={() => setLocation("/")}
                className="text-sm text-white/70 hover:text-white hover:bg-white/10"
                data-testid="link-back-home"
              >
                ← Volver al inicio
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-6 text-sm text-white/50">
            <div className="flex items-center">
              <Map className="w-4 h-4 mr-2" />
              Mapa interactivo
            </div>
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-2" />
              Experiencias únicas
            </div>
            <div className="flex items-center">
              <Plane className="w-4 h-4 mr-2" />
              Turismo sostenible
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthViajeros;