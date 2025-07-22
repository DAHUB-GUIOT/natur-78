
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RegistrationForm from "@/components/registration/RegistrationForm";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#222408] px-2 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-4 sm:mb-8">
          <Button 
            variant="ghost" 
            className="text-[#FCF8EE] hover:text-[#EDFF60] hover:bg-transparent mr-2 sm:mr-4"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Volver
          </Button>
        </div>

        <div className="text-center mb-6 sm:mb-12">
          <h1 className="font-gasoek text-[#FCF8EE] text-2xl sm:text-4xl md:text-5xl lg:text-7xl leading-tight uppercase font-thin">
            REGISTRO FESTIVAL NATUR
          </h1>
          <p className="text-[#FCF8EE] mt-2 sm:mt-4 text-base sm:text-lg">
            Completa el formulario para participar en el festival
          </p>
        </div>
        
        <RegistrationForm />
      </div>
    </div>
  );
};

export default Register;
