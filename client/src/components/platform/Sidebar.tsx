
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Home, Calendar, Users, GraduationCap, ShoppingCart, Edit, User, Settings, Menu, Award, Heart, Rocket, Briefcase, LineChart, Star, Building } from "lucide-react";
import { Sidebar as ShadcnSidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

// Define navigation items outside component to prevent re-creation on render
const getNavigationItems = (userType: string | null, userSubcategory: string | null) => [{
  icon: Home,
  text: "Inicio",
  path: "/plataforma"
}, {
  icon: Calendar,
  text: "Agenda",
  path: "/agenda"
}, {
  icon: Users,
  text: "Networking",
  path: "/networking"
}, {
  icon: GraduationCap,
  text: "Educación",
  path: "/educacion"
}, {
  icon: ShoppingCart,
  text: "Marketplace",
  path: "/marketplace"
}, {
  icon: Edit,
  text: "Experiencias",
  path: "/experiencias"
}, {
  icon: Award,
  text: "Recaudación",
  path: "/fundraiser"
}, {
  icon: Heart,
  text: "Corazón",
  path: "/heart"
}, {
  icon: Building,
  text: "Startups",
  path: "/startups"
}, {
  icon: Rocket,
  text: "Acceleradora",
  path: "/acceleradora",
  showOnlyFor: ["startup", "investor", "angel", "mentor", "venture-capital"]
}, {
  icon: Users,
  text: "Mentoría",
  path: "/mentoria",
  showOnlyFor: ["mentor"]
}, {
  icon: LineChart,
  text: "Inversiones",
  path: "/inversiones",
  showOnlyFor: ["investor", "angel", "venture-capital"]
}, {
  icon: Star,
  text: "Startups Destacadas",
  path: "/startups-destacadas",
  showOnlyFor: ["investor", "angel", "venture-capital"]
}, {
  icon: User,
  text: "Perfil",
  path: "/perfil"
}, {
  icon: Settings,
  text: "Administración",
  path: "/admin"
}];

// Add interface for component props
interface SidebarProps {
  userType: string | null;
}

export const Sidebar = ({ userType }: SidebarProps) => {
  const [location] = useLocation();
  const currentPath = location;
  const isMobile = useIsMobile();
  const [userCategory, setUserCategory] = useState<string | null>(userType);
  const [userSubcategory, setUserSubcategory] = useState<string | null>(null);
  
  // Load user category and subcategory from localStorage if not provided as prop
  useEffect(() => {
    if (!userType) {
      const storedData = localStorage.getItem('userProfileData');
      if (storedData) {
        try {
          const userData = JSON.parse(storedData);
          if (userData.category) {
            setUserCategory(userData.category);
          } else if (userData.userCategory) {
            setUserCategory(userData.userCategory);
          }
          
          if (userData.subcategory) {
            setUserSubcategory(userData.subcategory);
          }
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    }
    
    // Also check localStorage for userType
    const savedType = localStorage.getItem("userType");
    if (savedType && !userCategory) {
      setUserCategory(savedType);
    }
    
    // Check for subcategory in localStorage
    const savedSubcategory = localStorage.getItem("userSubcategory");
    if (savedSubcategory) {
      setUserSubcategory(savedSubcategory);
    }
  }, [userType, userCategory]);
  
  // Get navigation items filtered by user type if needed
  const navigationItems = getNavigationItems(userCategory, userSubcategory).filter(item => {
    // If item has showOnlyFor property, only show for that user type
    if (item.showOnlyFor) {
      if (Array.isArray(item.showOnlyFor)) {
        // If userCategory is startup, also check subcategory for specialized roles
        if (userCategory === "startup" && userSubcategory) {
          return item.showOnlyFor.includes(userCategory) || 
                 item.showOnlyFor.includes(userSubcategory);
        }
        return item.showOnlyFor.includes(userCategory as string);
      } else {
        return item.showOnlyFor === userCategory || 
               (userCategory === "startup" && item.showOnlyFor === userSubcategory);
      }
    }
    // Otherwise show for all users
    return true;
  });
  
  return <>
      {isMobile && <Button variant="ghost" size="icon" className="fixed left-2 top-[74px] z-40 text-sidebar-foreground hover:text-accent hover:bg-transparent">
          <SidebarTrigger>
            <Menu className="h-6 w-6" />
          </SidebarTrigger>
        </Button>}
      <ShadcnSidebar className="h-screen hidden md:block w-auto" variant={isMobile ? "floating" : "sidebar"}>
        <SidebarContent className="bg-sidebar-background border-r border-sidebar-border/20 w-fit pt-2">
          <SidebarMenu className="py-[66px]">
            {navigationItems.map(item => {
              return (
                <SidebarMenuItem key={item.path} className="px-2 mb-1">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <SidebarMenuButton isActive={currentPath === item.path} asChild className={`w-12 h-12 flex flex-col items-center justify-center text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-foreground/5 p-0 rounded-xl ${currentPath === item.path ? 'bg-sidebar-foreground/10 text-sidebar-primary' : ''}`}>
                        <Link to={item.path}>
                          <item.icon className="h-6 w-6" />
                        </Link>
                      </SidebarMenuButton>
                    </HoverCardTrigger>
                    <HoverCardContent side="right" align="center" sideOffset={16} className="bg-sidebar-background border-sidebar-border/20 text-sidebar-foreground px-4 py-2 z-50">
                      {item.text}
                    </HoverCardContent>
                  </HoverCard>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
      </ShadcnSidebar>
    </>;
};
