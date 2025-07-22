
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Fundraiser from "./pages/Fundraiser";
import Admin from "./pages/Admin";
import Heart from "./pages/Heart";
import Acceleradora from "./pages/Acceleradora";
import StartupDirectory from "./pages/StartupDirectory";
import { AuthProvider } from "./contexts/AuthContext";

// Create QueryClient outside component to prevent recreation on renders
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/reserva" element={<Reservation />} />
            <Route path="/plataforma" element={<MainLayout>{<Platform />}</MainLayout>} />
            <Route path="/agenda" element={<MainLayout>{<Agenda />}</MainLayout>} />
            <Route path="/networking" element={<MainLayout>{<Networking />}</MainLayout>} />
            <Route path="/educacion" element={<MainLayout>{<Educacion />}</MainLayout>} />
            <Route path="/marketplace" element={<MainLayout>{<Marketplace />}</MainLayout>} />
            <Route path="/experiencias" element={<MainLayout>{<Experiencias />}</MainLayout>} />
            <Route path="/fundraiser" element={<MainLayout>{<Fundraiser />}</MainLayout>} />
            <Route path="/perfil" element={<MainLayout>{<Perfil />}</MainLayout>} />
            <Route path="/perfil/:username" element={<MainLayout>{<PublicProfile />}</MainLayout>} />
            <Route path="/admin" element={<MainLayout>{<Admin />}</MainLayout>} />
            <Route path="/heart" element={<MainLayout>{<Heart />}</MainLayout>} />
            <Route path="/acceleradora" element={<MainLayout>{<Acceleradora />}</MainLayout>} />
            <Route path="/startups" element={<MainLayout>{<StartupDirectory />}</MainLayout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
