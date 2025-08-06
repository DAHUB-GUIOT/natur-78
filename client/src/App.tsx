
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
import PortalEmpresasAuth from "./pages/PortalEmpresasAuth";
import PortalViajerosNew from "./pages/PortalViajerosNew";
import AuthViajeros from "./pages/AuthViajeros";
import ExperienceDetail from "./pages/ExperienceDetail";

import UserProfile from "./pages/UserProfile";
import CompanyProfile from "./pages/CompanyProfile";
import Profile from "./pages/Profile";
import EnhancedProfile from "./pages/EnhancedProfile";

import Tickets from "./pages/Tickets";
import SessionDetail from "./pages/SessionDetail";
import Noticias from "./pages/Noticias";
import BiodiversityExperience from "./pages/BiodiversityExperience";
import CompanyProfilePage from "./pages/CompanyProfilePage";
import { AuthProvider } from "./contexts/AuthContext";
import React from "react";

// Create QueryClient outside component to prevent recreation on renders
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <ContrastEnhancer />
          <Switch>
            <Route path="/" component={Index} />
            <Route path="/registro" component={Register} />
            <Route path="/con-sentidos" component={ConSentidosRegister} />
            <Route path="/auth/empresas" component={AuthEmpresas} />
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
            <Route path="/portal-empresas/auth" component={PortalEmpresasAuth} />
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
            <Route path="/biodiversidad" component={BiodiversityExperience} />
            <Route path="/edit-profile" component={() => {
              const EditProfile = React.lazy(() => import('./pages/EditProfile'));
              return (
                <React.Suspense fallback={<div>Loading...</div>}>
                  <EditProfile />
                </React.Suspense>
              );
            }} />
            <Route><NotFound /></Route>
          </Switch>
        </Router>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
