
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { ContrastEnhancer } from "@/components/accessibility/ContrastEnhancer";
import { MainLayout } from "./components/layout/MainLayout";
import Index from "./pages/Index";
import Register from "./pages/Register";
import ConSentidosRegister from "./pages/ConSentidosRegister";
import AuthEmpresas from "./pages/AuthEmpresas";
import AuthConSentidos from "./pages/AuthConSentidos";
import Reservation from "./pages/Reservation";
import NotFound from "./pages/NotFound";
import Platform from "./pages/Platform";
import Agenda from "./pages/Agenda";
import Networking from "./pages/Networking";
import Educacion from "./pages/Educacion";
import Marketplace from "./pages/Marketplace";
import ExperienciasOptimized from "./pages/ExperienciasOptimized";
import Perfil from "./pages/Perfil";
import PublicProfile from "./pages/PublicProfile";
import AdminOptimized from "./pages/AdminOptimized";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";

import MinimalistPortalEmpresas from "./pages/MinimalistPortalEmpresas";
import PortalViajerosNew from "./pages/PortalViajerosNew";
import AuthViajeros from "./pages/AuthViajeros";
import ExperienceDetail from "./pages/ExperienceDetail";

import UserProfile from "./pages/UserProfile";
import CompanyProfile from "./pages/CompanyProfile";
import Profile from "./pages/Profile";
import EnhancedProfile from "./pages/EnhancedProfile";

// Portal Empresas subpages
import MapaPage from "./pages/portal-empresas/MapaPage";
import RedPage from "./pages/portal-empresas/RedPage";
import ExperienciasPage from "./pages/portal-empresas/ExperienciasPage";
import MensajesPage from "./pages/portal-empresas/MensajesPage";
import PerfilPage from "./pages/portal-empresas/PerfilPage";
import ConfigPage from "./pages/portal-empresas/ConfigPage";
import { PortalEmpresasLayout } from "./components/layout/PortalEmpresasLayout";

import Tickets from "./pages/Tickets";
import SessionDetail from "./pages/SessionDetail";
import Noticias from "./pages/Noticias";
import BiodiversityExperience from "./pages/BiodiversityExperience";
import CompanyProfilePage from "./pages/CompanyProfilePage";
import About from "./pages/About";
import BlogPost from "./pages/BlogPost";
import ErrorBoundary from "@/components/ErrorBoundary";
import { setupGlobalErrorHandlers } from "@/lib/errorHandler";
import { useEffect } from "react";
import EventDetail from "./pages/EventDetail";
import CategoryPage from "./pages/CategoryPage";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import { AuthProvider } from "./contexts/AuthContext";
import ComprehensiveCompanyRegistration from "./pages/ComprehensiveCompanyRegistration";
import VerificationPending from "./pages/VerificationPending";
import EmailVerification from "./pages/EmailVerification";
import EditProfileFacebook from "./pages/EditProfileFacebook";
import ConfiguracionEmpresa from "./pages/ConfiguracionEmpresa";
import React from "react";

// Create QueryClient outside component to prevent recreation on renders
const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    setupGlobalErrorHandlers();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ErrorBoundary>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Router>
              <ContrastEnhancer />
              <Switch>
            <Route path="/" component={Index} />
            <Route path="/verificacion-pendiente" component={VerificationPending} />
            <Route path="/verificar-email" component={EmailVerification} />
            <Route path="/con-sentidos" component={ConSentidosRegister} />
            <Route path="/auth/consentidos" component={AuthConSentidos} />
            <Route path="/reserva" component={Reservation} />
            <Route path="/experiencias">
              <MainLayout><ExperienciasOptimized /></MainLayout>
            </Route>
            <Route path="/networking">
              <MainLayout><Networking /></MainLayout>
            </Route>
            <Route path="/perfil">
              <MainLayout><Perfil /></MainLayout>
            </Route>
            <Route path="/perfil-publico/:username">
              <MainLayout><PublicProfile /></MainLayout>
            </Route>
            <Route path="/admin" component={AdminDashboard} />
            <Route path="/admin-legacy">
              <MainLayout><AdminOptimized /></MainLayout>
            </Route>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/auth/empresas" component={AuthEmpresas} />
            
            {/* Portal Empresas subpages - specific routes first */}
            <Route path="/portal-empresas/mapa">
              <PortalEmpresasLayout><MapaPage /></PortalEmpresasLayout>
            </Route>
            <Route path="/portal-empresas/red">
              <PortalEmpresasLayout><RedPage /></PortalEmpresasLayout>
            </Route>
            <Route path="/portal-empresas/experiencias">
              <PortalEmpresasLayout><ExperienciasPage /></PortalEmpresasLayout>
            </Route>
            <Route path="/portal-empresas/mensajes">
              <PortalEmpresasLayout><MensajesPage /></PortalEmpresasLayout>
            </Route>
            <Route path="/portal-empresas/perfil">
              <PortalEmpresasLayout><PerfilPage /></PortalEmpresasLayout>
            </Route>
            <Route path="/portal-empresas/config">
              <PortalEmpresasLayout><ConfigPage /></PortalEmpresasLayout>
            </Route>
            
            {/* Main portal route - should be last to avoid conflicts */}
            <Route path="/portal-empresas" component={MinimalistPortalEmpresas} />
            <Route path="/company-profile" component={CompanyProfilePage} />
            <Route path="/portal-viajeros/auth" component={AuthViajeros} />
            <Route path="/portal-viajeros" component={PortalViajerosNew} />
            <Route path="/experiencia/:id" component={ExperienceDetail} />
            <Route path="/mapa" component={PortalViajerosNew} />
            <Route path="/profile/:userId" component={UserProfile} />
            <Route path="/user-profile/:id" component={Profile} />
            <Route path="/perfil-empresarial/:id" component={EnhancedProfile} />
            <Route path="/empresa/:companyId" component={CompanyProfile} />

            <Route path="/tickets" component={Tickets} />
            <Route path="/sesion/:sessionId" component={SessionDetail} />
            <Route path="/agenda">
              <MainLayout><Agenda /></MainLayout>
            </Route>
            <Route path="/educacion">
              <MainLayout><Educacion /></MainLayout>
            </Route>
            <Route path="/marketplace">
              <MainLayout><Marketplace /></MainLayout>
            </Route>
            <Route path="/noticias" component={Noticias} />
            <Route path="/blog/:slug" component={BlogPost} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/services" component={Services} />
            <Route path="/evento/:id" component={EventDetail} />
            <Route path="/categoria/:category" component={CategoryPage} />
            <Route path="/biodiversidad" component={BiodiversityExperience} />
            <Route path="/edit-profile" component={EditProfileFacebook} />
            <Route path="/configuracion" component={ConfiguracionEmpresa} />
            <Route><NotFound /></Route>
          </Switch>
        </Router>
      </TooltipProvider>
    </ErrorBoundary>
  </AuthProvider>
</QueryClientProvider>
);
};

export default App;
