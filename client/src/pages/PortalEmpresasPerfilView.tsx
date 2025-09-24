import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, User, Building2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileMap } from "@/components/ui/ProfileMap";
import { useLocation } from "wouter";
import { useAuth } from '@/contexts/AuthContext';
import EnhancedProfile from './EnhancedProfile';

const PortalEmpresasPerfilView = () => {
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  // If we have the current user, show their profile directly
  if (user?.id) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-black">
        {/* Header */}
        <motion.header 
          className="bg-black/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setLocation('/portal-empresas')}
                className="text-white hover:bg-white/10"
                data-testid="button-back"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Portal Empresas
              </Button>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-green-400" />
                <h1 className="text-xl font-bold text-white">
                  Mi Perfil Empresarial
                </h1>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Profile Content */}
        <div className="relative">
          <EnhancedProfile />
        </div>
      </div>
    );
  }

  // Fallback if no user is logged in
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-black flex items-center justify-center">
      <div className="text-center">
        <div className="mb-4">
          <User className="w-16 h-16 text-white/50 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Perfil no disponible</h2>
          <p className="text-gray-400 mb-6">Necesitas iniciar sesión para ver tu perfil</p>
          <Button 
            onClick={() => setLocation('/auth/empresas')}
            className="bg-green-600 hover:bg-green-700 text-white"
            data-testid="button-login"
          >
            Iniciar Sesión
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PortalEmpresasPerfilView;