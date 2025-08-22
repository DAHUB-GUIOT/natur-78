import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowRight, RefreshCw } from "lucide-react";
import { HeaderButtons } from "@/components/layout/HeaderButtons";
import { useLocation } from "wouter";

const VerificationPending = () => {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900 flex items-center justify-center p-4">
      <HeaderButtons showPortalButtons={true} />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-gasoek text-green-400 mb-2 uppercase tracking-wider">
            NATUR
          </h1>
          <p className="text-white text-lg font-jakarta">
            Verificación Pendiente
          </p>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader className="text-center">
            <div className="relative">
              <Mail className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-black text-xs font-bold">!</span>
              </div>
            </div>
            <CardTitle className="text-2xl text-white font-jakarta">
              Revisa tu Email
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <p className="text-white/90">
                Te hemos enviado un correo de verificación
              </p>
              <p className="text-white/70 text-sm">
                Haz clic en el enlace del email para activar tu cuenta empresarial
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/20 rounded-lg p-4 space-y-3">
              <h3 className="text-white font-semibold flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Instrucciones:
              </h3>
              <ol className="text-white/80 text-sm space-y-2 list-decimal list-inside">
                <li>Abre tu bandeja de entrada de correo</li>
                <li>Busca el email de "Festival NATUR"</li>
                <li>Haz clic en "VERIFICAR MI EMAIL"</li>
                <li>Serás redirigido automáticamente</li>
              </ol>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
              <p className="text-yellow-300 text-sm flex items-center">
                <RefreshCw className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>El enlace expira en 24 horas. Si no lo encuentras, revisa tu carpeta de spam.</span>
              </p>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={() => window.location.reload()}
                variant="outline"
                className="w-full text-white border-white/30 hover:bg-white/10"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualizar Página
              </Button>
              
              <Button 
                onClick={() => setLocation('/')}
                className="w-full bg-green-400 hover:bg-green-500 text-black"
              >
                Volver al Inicio
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerificationPending;