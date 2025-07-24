
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
    <div className="min-h-screen relative">
      {/* Background Image - Same as Hero */}
      <img 
        alt="Festival NATUR - Portal Empresas Registration" 
        className="absolute h-full w-full object-cover inset-0" 
        src="/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg" 
      />
      
      {/* Light Gradient Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Top Navigation - Fixed with Glassmorphism */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <span className="font-bold text-2xl font-gasoek" style={{ color: '#EDFF60' }}>N</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al inicio
              </Button>
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto max-w-4xl">
          {/* Registration Form with Transparent Yellow Styling */}
          <div className="backdrop-blur-sm bg-transparent border-2 border-[#EDFF60] rounded-2xl p-6 sm:p-8 md:p-10">
            <RegistrationForm />
          </div>

          {/* Additional Info with Transparent Yellow Styling */}
          <div className="text-center mt-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/auth/empresas">
                <Button 
                  variant="outline" 
                  className="border-2 border-[#EDFF60] bg-transparent text-[#EDFF60] hover:bg-[#EDFF60]/10 font-bold text-sm sm:text-base px-6 py-2 sm:px-8 sm:py-3 backdrop-blur-sm"
                >
                  Ya tengo cuenta - Iniciar sesión
                </Button>
              </Link>
              <div className="backdrop-blur-sm bg-white/5 border border-[#EDFF60]/30 rounded-lg p-3 sm:p-4">
                <p className="text-[#EDFF60] text-sm sm:text-base font-medium">
                  ¿Eres un viajero?{" "}
                  <Link to="/con-sentidos" className="text-[#EDFF60] hover:text-white underline font-bold">
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
