
import React from "react";
import { HeaderButtons } from "@/components/layout/HeaderButtons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Building2 } from "lucide-react";
import { useLocation, Link } from "wouter";
import RegistrationForm from "@/components/registration/RegistrationForm";

const Register = () => {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      <HeaderButtons showPortalButtons={false} />
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Building2 className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Portal Empresas
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Registra tu empresa o iniciativa de turismo sostenible y conecta con viajeros conscientes
          </p>
        </div>

        {/* Registration Card */}
        <Card className="shadow-lg border-green-100">
          <CardHeader className="bg-green-50 border-b border-green-100">
            <CardTitle className="text-2xl text-gray-900 flex items-center">
              <Building2 className="w-6 h-6 mr-3 text-green-600" />
              Registro de Empresa
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-8">
            <RegistrationForm />
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/auth/empresas">
              <Button variant="outline" className="border-yellow-200 text-yellow-700 hover:bg-yellow-50">
                Ya tengo cuenta - Iniciar sesión
              </Button>
            </Link>
            <p className="text-gray-600 text-sm">
              ¿Eres un viajero?{" "}
              <Link to="/con-sentidos" className="text-green-600 hover:underline font-medium">
                Únete a Con-Sentidos
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
