
import React from "react";
import { 
  CalendarIcon, 
  HomeIcon, 
  InboxIcon, 
  UserIcon, 
  ShoppingCartIcon, 
  GraduationCapIcon, 
  HeartIcon, 
  Edit, 
  Building, 
  Award 
} from "lucide-react";
import { Link } from "react-router-dom";
import { Drawer, DrawerContent, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Separator } from "@/components/ui/separator";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  userType?: string | null;
  userName?: string;
  userAvatar?: string;
}

export function MobileMenu({ 
  isOpen, 
  onClose, 
  userType = "ecosystem", 
  userName = "Usuario", 
  userAvatar 
}: MobileMenuProps) {
  const isMobile = useIsMobile();
  
  if (!isMobile) return null;
  
  // Memoize menu items to prevent unnecessary re-renders
  const platformItems = [
    { icon: <HomeIcon className="w-5 h-5" />, label: "Inicio", href: "/plataforma" },
    { icon: <CalendarIcon className="w-5 h-5" />, label: "Agenda", href: "/agenda" },
    { icon: <InboxIcon className="w-5 h-5" />, label: "Networking", href: "/networking" },
    { icon: <GraduationCapIcon className="w-5 h-5" />, label: "Educación", href: "/educacion" },
    { icon: <ShoppingCartIcon className="w-5 h-5" />, label: "Marketplace", href: "/marketplace" },
    { icon: <Edit className="w-5 h-5" />, label: "Experiencias", href: "/experiencias" },
  ];

  const userItems = [
    { icon: <UserIcon className="w-5 h-5" />, label: "Mi Perfil", href: "/perfil" },
    { icon: <HeartIcon className="w-5 h-5" />, label: "Corazón NATUR", href: "/heart" },
  ];

  const startupItems = [
    { icon: <Building className="w-5 h-5" />, label: "Startups", href: "/startups" },
    { icon: <Award className="w-5 h-5" />, label: "Recaudación", href: "/fundraiser" },
  ];

  const conditionalItems = userType === "startup" ? [...startupItems, ...userItems] : userItems;

  return (
    <Drawer open={isOpen} onOpenChange={open => !open && onClose()}>
      <DrawerContent className="h-[85vh] focus:outline-none">
        <div className="bg-green-700 flex items-center px-4 py-5 text-white">
          <Avatar className="h-12 w-12 border-2 border-white">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback className="bg-green-600">{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <p className="font-medium text-lg">{userName}</p>
            <p className="text-sm text-green-100">{userType === "startup" ? "Startup" : "Ecosistema"}</p>
          </div>
        </div>
        
        <div className="p-4 overflow-y-auto">
          <div className="mb-4">
            <h3 className="font-bold text-sm uppercase text-muted-foreground mb-2 px-1">Plataforma</h3>
            <nav className="grid gap-1">
              {platformItems.map((item) => (
                <Link 
                  key={item.href} 
                  to={item.href} 
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-accent active:bg-accent/80"
                  onClick={onClose}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <Separator className="my-4" />
          
          <div>
            <h3 className="font-bold text-sm uppercase text-muted-foreground mb-2 px-1">Tu cuenta</h3>
            <nav className="grid gap-1">
              {conditionalItems.map((item) => (
                <Link 
                  key={item.href} 
                  to={item.href} 
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-accent active:bg-accent/80"
                  onClick={onClose}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="p-4 mt-auto border-t">
          <DrawerClose asChild>
            <Button 
              onClick={onClose} 
              variant="outline" 
              className="w-full"
            >
              Cerrar
            </Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
