import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Mail, ArrowRight } from "lucide-react";
import { HeaderButtons } from "@/components/layout/HeaderButtons";

const EmailVerification = () => {
  const [, setLocation] = useLocation();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Get token from URL
    const params = new URLSearchParams(window.location.search);
    const tokenParam = params.get('token');
    setToken(tokenParam);
  }, []);

  const { data: verification, isLoading, error } = useQuery({
    queryKey: ['/api/auth/verify-email', token],
    queryFn: async () => {
      if (!token) return null;
      return await apiRequest(`/api/auth/verify-email?token=${token}`);
    },
    enabled: !!token,
    retry: false
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900 flex items-center justify-center p-4">
        <HeaderButtons showPortalButtons={true} />
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-8 text-center">
            <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white">Verificando tu email...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !verification) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900 flex items-center justify-center p-4">
        <HeaderButtons showPortalButtons={true} />
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-gasoek text-green-400 mb-2 uppercase tracking-wider">
              NATUR
            </h1>
            <p className="text-white text-lg font-jakarta">
              Verificación de Email
            </p>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="text-center">
              <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <CardTitle className="text-2xl text-white font-jakarta">
                Error en la Verificación
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-white/70">
                {error instanceof Error 
                  ? error.message.includes('expired') 
                    ? 'El enlace de verificación ha expirado.'
                    : 'El enlace de verificación no es válido.'
                  : 'Ha ocurrido un error inesperado.'
                }
              </p>
              
              <div className="space-y-3">
                <Button 
                  onClick={() => setLocation('/registro')}
                  className="w-full bg-green-400 hover:bg-green-500 text-black"
                >
                  Volver al Registro
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => setLocation('/')}
                  className="w-full text-white border-white/30 hover:bg-white/10"
                >
                  Ir al Inicio
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900 flex items-center justify-center p-4">
      <HeaderButtons showPortalButtons={true} />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-gasoek text-green-400 mb-2 uppercase tracking-wider">
            NATUR
          </h1>
          <p className="text-white text-lg font-jakarta">
            ¡Email Verificado!
          </p>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader className="text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <CardTitle className="text-2xl text-white font-jakarta">
              ¡Verificación Exitosa!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="space-y-2">
              <p className="text-white/90 font-medium">
                Tu email ha sido verificado correctamente
              </p>
              <p className="text-white/70 text-sm">
                Ahora puedes acceder a todas las funcionalidades del Portal Empresas
              </p>
            </div>
            
            <div className="bg-green-400/10 border border-green-400/30 rounded-lg p-4">
              <h3 className="text-green-300 font-semibold mb-2">¿Qué puedes hacer ahora?</h3>
              <ul className="text-white/80 text-sm space-y-1 text-left">
                <li>• Acceder al Portal Empresas completo</li>
                <li>• Aparecer en el directorio de empresas</li>
                <li>• Crear experiencias turísticas</li>
                <li>• Conectar con otros empresarios</li>
                <li>• Gestionar tu perfil empresarial</li>
              </ul>
            </div>
            
            <Button 
              onClick={() => setLocation('/portal-empresas/auth')}
              className="w-full bg-green-400 hover:bg-green-500 text-black font-semibold h-12"
            >
              Acceder al Portal Empresas
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailVerification;