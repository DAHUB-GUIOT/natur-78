
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
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
import Dashboard from "./pages/Dashboard";
import PortalEmpresasDashboard from "./pages/PortalEmpresasDashboard";
import ExperienceDetail from "./pages/ExperienceDetail";
import MapaPublicoOptimized from "./pages/MapaPublicoOptimized";
import { AuthProvider } from "./contexts/AuthContext";

// Create QueryClient outside component to prevent recreation on renders
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
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
            <Route path="/perfil/:username">
              <MainLayout><PublicProfile /></MainLayout>
            </Route>
            <Route path="/admin">
              <MainLayout><AdminOptimized /></MainLayout>
            </Route>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/portal-empresas" component={PortalEmpresasDashboard} />
            <Route path="/experiencia/:id" component={ExperienceDetail} />
            <Route path="/mapa" component={MapaPublicoOptimized} />
            <Route path="/plataforma">
              <MainLayout><Platform /></MainLayout>
            </Route>
            <Route path="/agenda">
              <MainLayout><Agenda /></MainLayout>
            </Route>
            <Route path="/educacion">
              <MainLayout><Educacion /></MainLayout>
            </Route>
            <Route path="/marketplace">
              <MainLayout><Marketplace /></MainLayout>
            </Route>
            <Route><NotFound /></Route>
          </Switch>
        </Router>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
