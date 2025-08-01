
import React from "react";
import { UnifiedHeader } from "@/components/layout/UnifiedHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Building2 } from "lucide-react";
import { useLocation, Link } from "wouter";
import RegistrationForm from "@/components/registration/RegistrationForm";
import EnhancedRegistrationForm from "@/components/registration/EnhancedRegistrationForm";

const Register = () => {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen relative">
      {/* Background Image - Same as Hero */}
      <img 
        alt="Festival NATUR - Portal Empresas Registration" 
        className="absolute h-full w-full object-cover inset-0" 
        src="/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg" 
      />
      
      {/* Light Gradient Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      <UnifiedHeader title="Registro NATUR" showSearch={false} />
      
      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto max-w-4xl">
          {/* Enhanced Registration Form with All Portal Functionalities */}
          <EnhancedRegistrationForm />

          {/* Additional Info with Transparent Yellow Styling */}
          <div className="text-center mt-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/auth/empresas">
                <Button 
                  variant="outline" 
                  className="border-2 border-[#cad95e] bg-transparent text-[#cad95e] hover:bg-[#cad95e]/10 font-bold text-sm sm:text-base px-6 py-2 sm:px-8 sm:py-3 backdrop-blur-sm"
                >
                  Ya tengo cuenta - Iniciar sesión
                </Button>
              </Link>
              <div className="backdrop-blur-sm bg-white/5 border border-[#cad95e]/30 rounded-lg p-3 sm:p-4">
                <p className="text-[#cad95e] text-sm sm:text-base font-medium">
                  ¿Eres un viajero?{" "}
                  <Link to="/con-sentidos" className="text-[#cad95e] hover:text-white underline font-bold">
                    Únete a Con-Sentidos
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
