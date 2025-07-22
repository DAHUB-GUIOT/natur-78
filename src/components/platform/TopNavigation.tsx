
import { Bell, User, Settings, FileText, Badge, Briefcase, Users, Laptop, Globe, Rocket, Award, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserType = "ecosystem" | "attendee" | "sponsor" | "startup" | "digital-nomad";
type SubcategoryType = "" | "idea" | "mvp" | "growth" | "established" | "investor" | "angel" | "mentor" | "venture-capital";

export const TopNavigation = () => {
  const isMobile = useIsMobile();
  const [userType, setUserType] = useState<UserType>(() => {
    // Initialize from localStorage if available, otherwise default to startup
    const savedType = localStorage.getItem("userType");
    return (savedType as UserType) || "startup";
  });
  
  const [subcategory, setSubcategory] = useState<SubcategoryType>(() => {
    // Initialize from localStorage if available
    const savedSubcategory = localStorage.getItem("userSubcategory");
    return (savedSubcategory as SubcategoryType) || "";
  });

  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    // Try to get user data from localStorage
    try {
      const data = localStorage.getItem("userProfileData");
      if (data) {
        setUserData(JSON.parse(data));
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  const handleChangeUserType = (type: UserType, subcat: SubcategoryType = "") => {
    setUserType(type);
    setSubcategory(subcat);
    localStorage.setItem("userType", type);
    localStorage.setItem("userSubcategory", subcat);
    
    toast(`Perfil cambiado a ${getUserTypeLabel(type, subcat)}`, {
      description: "Tu perfil ha sido actualizado correctamente."
    });
  };

  // Initialize localStorage on first load if not set
  useEffect(() => {
    if (!localStorage.getItem("userType")) {
      localStorage.setItem("userType", userType);
    }
    if (!localStorage.getItem("userSubcategory") && subcategory) {
      localStorage.setItem("userSubcategory", subcategory);
    }
  }, []);

  const getUserTypeIcon = (type: UserType, subcat?: SubcategoryType) => {
    if (type === "startup" && subcat) {
      switch (subcat) {
        case "investor": return <Briefcase className="h-4 w-4 mr-2" />;
        case "angel": return <Star className="h-4 w-4 mr-2" />;
        case "mentor": return <Award className="h-4 w-4 mr-2" />;
        case "venture-capital": return <TrendingUp className="h-4 w-4 mr-2" />;
        default: return <Rocket className="h-4 w-4 mr-2" />;
      }
    }
    
    switch (type) {
      case "ecosystem": return <User className="h-4 w-4 mr-2" />;
      case "attendee": return <Users className="h-4 w-4 mr-2" />;
      case "sponsor": return <Briefcase className="h-4 w-4 mr-2" />;
      case "startup": return <Rocket className="h-4 w-4 mr-2" />;
      case "digital-nomad": return <Laptop className="h-4 w-4 mr-2" />;
      default: return <User className="h-4 w-4 mr-2" />;
    }
  };

  const getUserTypeLabel = (type: UserType, subcat?: SubcategoryType) => {
    if (type === "startup" && subcat) {
      switch (subcat) {
        case "investor": return "Inversionista";
        case "angel": return "Inversionista Ángel";
        case "mentor": return "Mentor";
        case "venture-capital": return "Capital de Riesgo";
        case "idea": return "Startup (Idea)";
        case "mvp": return "Startup (MVP)";
        case "growth": return "Startup (Crecimiento)";
        case "established": return "Startup (Consolidada)";
      }
    }
    
    switch (type) {
      case "ecosystem": return "Ecosistema";
      case "attendee": return "Asistente";
      case "sponsor": return "Patrocinador";
      case "startup": return "Startup";
      case "digital-nomad": return "Nómada Digital";
      default: return "Usuario";
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-green-700 border-b border-green-800 z-50">
      <div className="py-3 px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-white font-gasoek text-xl md:text-2xl tracking-wide">NATUR</span>
          <span className="text-xs md:text-sm bg-green-600/30 text-white px-2 py-0.5 rounded ml-2">Plataforma</span>
        </div>
        
        <div className="flex items-center gap-2 md:gap-3">
          <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-green-600 p-2 md:px-3">
            <Bell className="h-4 w-4" />
            <span className="sr-only md:not-sr-only md:inline md:ml-1">Notificaciones</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-green-600 p-2 md:px-3">
                {isMobile ? (
                  <Avatar className="h-6 w-6 border border-white">
                    <AvatarFallback>{userData.name ? userData.name.substring(0, 2).toUpperCase() : "US"}</AvatarFallback>
                  </Avatar>
                ) : (
                  <>
                    {getUserTypeIcon(userType, subcategory)}
                    <span className="hidden sm:inline ml-1">{getUserTypeLabel(userType, subcategory)}</span>
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Opciones de Perfil</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/perfil" className="flex items-center cursor-pointer">
                  <User className="h-4 w-4 mr-2" />
                  <span>Mi Perfil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/perfil/datos" className="flex items-center cursor-pointer">
                  <FileText className="h-4 w-4 mr-2" />
                  <span>Datos Personales</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/perfil/certificaciones" className="flex items-center cursor-pointer">
                  <Badge className="h-4 w-4 mr-2" />
                  <span>Certificaciones</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/perfil/experiencias" className="flex items-center cursor-pointer">
                  <Briefcase className="h-4 w-4 mr-2" />
                  <span>Experiencias</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Cambiar tipo de usuario</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleChangeUserType("ecosystem")} className="cursor-pointer">
                <User className="h-4 w-4 mr-2" />
                <span>Ecosistema</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleChangeUserType("attendee")} className="cursor-pointer">
                <Users className="h-4 w-4 mr-2" />
                <span>Asistente</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleChangeUserType("sponsor")} className="cursor-pointer">
                <Briefcase className="h-4 w-4 mr-2" />
                <span>Patrocinador</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Perfiles de startup</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleChangeUserType("startup", "idea")} className="cursor-pointer">
                <Rocket className="h-4 w-4 mr-2" />
                <span>Startup (Idea)</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleChangeUserType("startup", "mvp")} className="cursor-pointer">
                <Rocket className="h-4 w-4 mr-2" />
                <span>Startup (MVP)</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleChangeUserType("startup", "growth")} className="cursor-pointer">
                <Rocket className="h-4 w-4 mr-2" />
                <span>Startup (Crecimiento)</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleChangeUserType("startup", "established")} className="cursor-pointer">
                <Rocket className="h-4 w-4 mr-2" />
                <span>Startup (Consolidada)</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleChangeUserType("startup", "investor")} className="cursor-pointer">
                <Briefcase className="h-4 w-4 mr-2" />
                <span>Inversionista</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleChangeUserType("startup", "angel")} className="cursor-pointer">
                <Star className="h-4 w-4 mr-2" />
                <span>Inversionista Ángel</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleChangeUserType("startup", "mentor")} className="cursor-pointer">
                <Award className="h-4 w-4 mr-2" />
                <span>Mentor</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleChangeUserType("startup", "venture-capital")} className="cursor-pointer">
                <TrendingUp className="h-4 w-4 mr-2" />
                <span>Capital de Riesgo</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleChangeUserType("digital-nomad")} className="cursor-pointer">
                <Laptop className="h-4 w-4 mr-2" />
                <span>Nómada Digital</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/perfil/configuracion" className="flex items-center cursor-pointer">
                  <Settings className="h-4 w-4 mr-2" />
                  <span>Configuración</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
