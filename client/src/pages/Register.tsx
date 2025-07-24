
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
      
      {/* Hero Banner with Background Image */}
      <div className="relative bg-gradient-to-r from-black/70 to-green-900/70 text-white">
        <img 
          src="/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          alt="Sustainable Tourism"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        <div className="relative z-10 container mx-auto px-4 py-24 text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-2xl">
              <Building2 className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-gasoek tracking-wide drop-shadow-2xl">
            PORTAL EMPRESAS
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto font-medium drop-shadow-lg">
            Registra tu empresa o iniciativa de turismo sostenible y conecta con viajeros conscientes
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Registration Card */}
        <Card className="shadow-2xl border-2 border-green-500 bg-white">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 border-b-2 border-green-500">
            <CardTitle className="text-3xl text-white flex items-center font-bold">
              <Building2 className="w-8 h-8 mr-4 text-white" />
              Registro de Empresa
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-8 bg-white">
            <RegistrationForm />
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/auth/empresas">
              <Button 
                variant="outline" 
                className="border-2 border-green-600 text-green-800 hover:bg-green-50 font-bold text-lg px-8 py-3"
              >
                Ya tengo cuenta - Iniciar sesión
              </Button>
            </Link>
            <p className="text-black text-lg font-medium">
              ¿Eres un viajero?{" "}
              <Link to="/con-sentidos" className="text-green-700 hover:text-green-900 underline font-bold">
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
