
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { MainLayout } from "./components/layout/MainLayout";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Reservation from "./pages/Reservation";
import NotFound from "./pages/NotFound";
import Platform from "./pages/Platform";
import Agenda from "./pages/Agenda";
import Networking from "./pages/Networking";
import Educacion from "./pages/Educacion";
import Marketplace from "./pages/Marketplace";
import Experiencias from "./pages/Experiencias";
import Perfil from "./pages/Perfil";
import PublicProfile from "./pages/PublicProfile";
import AdminSimple from "./pages/AdminSimple";
import Dashboard from "./pages/Dashboard";
import MapaPublico from "./pages/MapaPublico";
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
            <Route path="/reserva" component={Reservation} />
            <Route path="/experiencias">
              <MainLayout><Experiencias /></MainLayout>
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
              <MainLayout><AdminSimple /></MainLayout>
            </Route>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/mapa" component={MapaPublico} />
            <Route><NotFound /></Route>
          </Switch>
        </Router>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
