
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Rocket, Save, Lightbulb, LineChart, Globe, DollarSign, Star, Award, TrendingUp } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Link } from 'react-router-dom';

interface HomeBannerProps {
  subcategory?: string;
}

export const HomeBanner: React.FC<HomeBannerProps> = ({ subcategory = "established" }) => {
  const location = useLocation();
  const isProfilePage = location.pathname === '/perfil';
  const isStartupDirectory = location.pathname === '/startups';
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // For now, assume startup view. In a real app, we'd check user type from context/state
  const showStartupBanner = isProfilePage;
  if (!showStartupBanner) {
    return null;
  }
  
  const handleSaveProfile = () => {
    setIsSaving(true);

    // Simulate saving profile data
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Perfil guardado con éxito",
        description: "Todos los cambios han sido guardados"
      });
    }, 1000);
  };

  // Get banner content based on startup subcategory
  const getBannerContent = () => {
    switch(subcategory) {
      case "idea":
        return {
          icon: <Lightbulb className="h-5 w-5 text-green-700" />,
          title: "¿Buscas validar tu idea de startup?",
          description: "Completa tu perfil para recibir mentoría y recursos de validación",
          ctaText: "Ver recursos de validación"
        };
      case "mvp":
        return {
          icon: <Rocket className="h-5 w-5 text-green-700" />,
          title: "¿Necesitas testear tu MVP en el mercado?",
          description: "Completa tu perfil para acceder a usuarios beta y feedback temprano",
          ctaText: "Encontrar testers"
        };
      case "growth":
        return {
          icon: <LineChart className="h-5 w-5 text-green-700" />,
          title: "¿Buscas escalar tu startup?",
          description: "Completa tu perfil para conectar con inversionistas y mentores de crecimiento",
          ctaText: "Ver oportunidades de inversión"
        };
      case "investor":
        return {
          icon: <DollarSign className="h-5 w-5 text-green-700" />,
          title: "¿Buscas startups para invertir?",
          description: "Completa tu perfil para acceder a un pipeline de startups prometedoras",
          ctaText: "Ver startups destacadas"
        };
      case "angel":
        return {
          icon: <Star className="h-5 w-5 text-green-700" />,
          title: "¿Buscas startups tempranas para invertir?",
          description: "Completa tu perfil para conectar con fundadores innovadores",
          ctaText: "Ver startups en etapa inicial"
        };
      case "mentor":
        return {
          icon: <Award className="h-5 w-5 text-green-700" />,
          title: "¿Quieres mentorear nuevos emprendedores?",
          description: "Completa tu perfil para conectar con startups que necesitan tu experiencia",
          ctaText: "Ver oportunidades de mentoría"
        };
      case "venture-capital":
        return {
          icon: <TrendingUp className="h-5 w-5 text-green-700" />,
          title: "¿Buscas startups para tu portafolio?",
          description: "Completa tu perfil para acceder a startups en fase de crecimiento",
          ctaText: "Ver oportunidades de inversión"
        };
      case "established":
      default:
        return {
          icon: <Globe className="h-5 w-5 text-green-700" />,
          title: "¿Buscas inversión para tu startup?",
          description: "Completa tu perfil para acceder a oportunidades de inversión",
          ctaText: "Ver oportunidades"
        };
    }
  };
  
  const bannerContent = getBannerContent();
  
  return (
    <div className="bg-green-50 border-b border-green-100 py-3">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-3 sm:mb-0">
          <div className="bg-green-100 rounded-full p-2 mr-3">
            {bannerContent.icon}
          </div>
          <div>
            <h3 className="text-green-900 font-medium text-sm sm:text-base">{bannerContent.title}</h3>
            <p className="text-green-700 text-xs sm:text-sm">{bannerContent.description}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            size="sm"
            className="bg-white border-green-200 text-green-800 hover:bg-green-50"
            onClick={handleSaveProfile}
            disabled={isSaving}
          >
            {isSaving ? (
              <>Guardando...</>
            ) : (
              <>
                <Save className="mr-1 h-4 w-4" />
                Guardar perfil
              </>
            )}
          </Button>
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white"
            asChild
          >
            <Link to="/startups">
              {bannerContent.ctaText}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          {!isStartupDirectory && (
            <Button
              size="sm"
              variant="secondary"
              className="bg-green-100 hover:bg-green-200 text-green-800"
              asChild
            >
              <Link to="/startups">
                <Rocket className="mr-1 h-4 w-4" />
                Directorio de Startups
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
