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
      <header className="bg-green-600 border-b border-green-700 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="font-gasoek text-xl text-white tracking-wide uppercase">
            Festival Natur
          </Link>
          
          <div className="flex items-center gap-4">
            {user ? (
              <Link to="/perfil">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <Button onClick={() => setShowLogin(true)} variant="outline" className="border-white/30 text-white hover:bg-white/20">
                Iniciar Sesión
              </Button>
            )}

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="p-2 hover:bg-white/20 text-white hover:text-white">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#222408] text-[#FCF8EE] w-80">
                <SheetHeader className="text-left">
                  <SheetTitle className="font-gasoek text-2xl text-[#EDFF60] tracking-wide uppercase">Menú</SheetTitle>
                  <SheetDescription>
                    Navega por la plataforma y descubre todo lo que tenemos para ti.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <Button variant="ghost" className="w-full justify-start text-base hover:bg-transparent text-[#FCF8EE] hover:text-[#EDFF60]" asChild>
                    <Link to="/heart">💚 Corazón NATUR</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-base hover:bg-transparent text-[#FCF8EE] hover:text-[#EDFF60]" asChild>
                    <Link to="/plataforma">Plataforma</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-base hover:bg-transparent text-[#FCF8EE] hover:text-[#EDFF60]" asChild>
                    <Link to="/agenda">Agenda</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-base hover:bg-transparent text-[#FCF8EE] hover:text-[#EDFF60]" asChild>
                    <Link to="/networking">Networking</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-base hover:bg-transparent text-[#FCF8EE] hover:text-[#EDFF60]" asChild>
                    <Link to="/educacion">Educación</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-base hover:bg-transparent text-[#FCF8EE] hover:text-[#EDFF60]" asChild>
                    <Link to="/marketplace">Marketplace</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-base hover:bg-transparent text-[#FCF8EE] hover:text-[#EDFF60]" asChild>
                    <Link to="/experiencias">Experiencias</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-base hover:bg-transparent text-[#FCF8EE] hover:text-[#EDFF60]" asChild>
                    <Link to="/dashboard">📊 Dashboard</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      <Sheet open={showLogin} onOpenChange={setShowLogin}>
        <SheetContent side="right" className="bg-[#222408] text-[#FCF8EE] w-80">
          <SheetHeader className="text-left">
            <SheetTitle className="font-gasoek text-2xl text-[#EDFF60] tracking-wide uppercase">
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
