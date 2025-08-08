import React, { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '../auth/LoginForm';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const [location, setLocation] = useLocation();
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-[#222408] text-[#FCF8EE]">
      

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      <Sheet open={showLogin} onOpenChange={setShowLogin}>
        <SheetContent side="right" className="bg-[#222408] text-[#FCF8EE] w-80">
          <SheetHeader className="text-left">
            <SheetTitle className="font-gasoek text-2xl text-[#cad95e] tracking-wide uppercase">
              Iniciar Sesión
            </SheetTitle>
            <SheetDescription>
              Ingresa con tu correo y contraseña para acceder a la plataforma.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <LoginForm onSuccess={() => setShowLogin(false)} onCancel={() => setShowLogin(false)} showCancel />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
