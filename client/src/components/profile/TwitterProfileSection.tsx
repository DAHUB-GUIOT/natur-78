import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { 
  Calendar, 
  MapPin, 
  Link as LinkIcon,
  Verified,
  TrendingUp,
  Users,
  Eye,
  DollarSign,
  Star,
  Globe,
  MessageCircle,
  BarChart3,
  Settings,
  Camera,
  CalendarDays
} from "lucide-react";

const TwitterProfileSection = () => {
  // Fetch current user data
  const { data: currentUser } = useQuery({
    queryKey: ['/api/auth/me'],
    retry: false,
  });

  // Fetch user profile
  const { data: profile } = useQuery({
    queryKey: [`/api/user-profiles/${(currentUser as any)?.user?.id}`],
    enabled: !!(currentUser as any)?.user?.id,
    retry: false,
  });

  // Fetch experiences
  const { data: experiences = [] } = useQuery({
    queryKey: ['/api/experiences'],
    retry: false,
  });

  const userExperiences = (experiences as any[]).filter((exp: any) => exp.userId === (currentUser as any)?.user?.id);

  // Calculate stats
  const stats = {
    experiencias: userExperiences.length,
    vistasTotal: userExperiences.reduce((acc: number, exp: any) => acc + (exp.views || 0), 0),
    reservasTotal: userExperiences.reduce((acc: number, exp: any) => acc + (exp.bookings || 0), 0),
    ingresosTotal: userExperiences.reduce((acc: number, exp: any) => acc + (exp.revenue || 0), 0),
    ratingPromedio: userExperiences.length > 0 
      ? (userExperiences.reduce((acc: number, exp: any) => acc + (exp.rating || 0), 0) / userExperiences.length).toFixed(1)
      : '0.0'
  };

  return (
    <div className="h-full w-full relative">
      {/* Glassmorphism container */}
      <div className="h-full backdrop-blur-xl bg-black/20 rounded-2xl border border-white/10 overflow-hidden">
        {/* Cover photo section */}
        <div className="relative h-48 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <Button 
            size="sm" 
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white backdrop-blur-md border border-white/20"
          >
            <Camera className="w-4 h-4 mr-2" />
            Cambiar foto
          </Button>
        </div>

        {/* Profile section */}
        <div className="relative px-6 pb-6">
          {/* Avatar */}
          <div className="absolute -top-16 left-6">
            <Avatar className="w-32 h-32 border-4 border-black/50 backdrop-blur-xl">
              <AvatarImage src="/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg" />
              <AvatarFallback className="bg-green-600 text-white text-3xl font-bold">
                {(profile as any)?.name?.charAt(0) || 'D'}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Edit profile button */}
          <div className="flex justify-end pt-4">
            <Button 
              variant="outline" 
              className="bg-black/30 hover:bg-black/50 text-white border-white/30 backdrop-blur-md"
            >
              <Settings className="w-4 h-4 mr-2" />
              Editar perfil
            </Button>
          </div>

          {/* Profile info */}
          <div className="mt-4 space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">{(profile as any)?.name || 'DaHub'}</h1>
                {(profile as any)?.isVerified && (
                  <Verified className="w-6 h-6 text-blue-400 fill-blue-400" />
                )}
              </div>
              <p className="text-white/60">@{(currentUser as any)?.user?.email?.split('@')[0] || 'dahub'}</p>
            </div>

            {/* Bio */}
            <p className="text-white text-sm leading-relaxed">
              {(profile as any)?.bio || 'Empresa de tecnología especializada en desarrollo de plataformas digitales. Creadores de Festival NATUR - conectando el turismo sostenible con la innovación.'}
            </p>

            {/* Info row */}
            <div className="flex flex-wrap gap-4 text-sm text-white/60">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{(profile as any)?.city || 'Bogotá'}, Colombia</span>
              </div>
              <div className="flex items-center gap-1">
                <LinkIcon className="w-4 h-4" />
                <a href={(profile as any)?.website || '#'} className="hover:text-white transition-colors">
                  {(profile as any)?.website?.replace('https://', '') || 'dahub.tech'}
                </a>
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                <span>Se unió en {new Date((currentUser as any)?.user?.createdAt || Date.now()).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</span>
              </div>
            </div>

            {/* Following/Followers */}
            <div className="flex gap-4">
              <div className="hover:underline cursor-pointer">
                <span className="font-bold text-white">342</span>
                <span className="text-white/60 ml-1">Siguiendo</span>
              </div>
              <div className="hover:underline cursor-pointer">
                <span className="font-bold text-white">1.2K</span>
                <span className="text-white/60 ml-1">Seguidores</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats section - Twitter style */}
        <div className="border-t border-white/10 px-6 py-4">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Estadísticas del negocio
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: "Experiencias", value: stats.experiencias, icon: Globe, color: "blue" },
              { label: "Vistas", value: stats.vistasTotal || '1.2K', icon: Eye, color: "green" },
              { label: "Reservas", value: stats.reservasTotal || '89', icon: Calendar, color: "purple" },
              { label: "Ingresos", value: `$${stats.ingresosTotal || '2.4M'}`, icon: DollarSign, color: "yellow" },
              { label: "Rating", value: stats.ratingPromedio || '4.8', icon: Star, color: "orange" }
            ].map((stat, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Activity tabs - Twitter style */}
        <div className="border-t border-white/10">
          <div className="flex">
            <button className="flex-1 px-6 py-4 text-white font-semibold border-b-2 border-green-400 bg-white/5">
              Posts
            </button>
            <button className="flex-1 px-6 py-4 text-white/60 hover:text-white hover:bg-white/5 transition-all">
              Respuestas
            </button>
            <button className="flex-1 px-6 py-4 text-white/60 hover:text-white hover:bg-white/5 transition-all">
              Medios
            </button>
            <button className="flex-1 px-6 py-4 text-white/60 hover:text-white hover:bg-white/5 transition-all">
              Me gusta
            </button>
          </div>
        </div>

        {/* Recent activity feed */}
        <div className="px-6 py-4 space-y-4 overflow-y-auto max-h-96">
          {/* Sample posts */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all cursor-pointer">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg" />
                  <AvatarFallback>N</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">Festival NATUR</span>
                    <Verified className="w-4 h-4 text-blue-400 fill-blue-400" />
                    <span className="text-white/60 text-sm">@festivalnatur · 2h</span>
                  </div>
                  <p className="text-white mt-1">
                    🌿 Nueva experiencia disponible: "Ruta Digital del Café Colombiano" 
                    Combina tecnología AR con visitas a fincas cafeteras tradicionales. 
                    ¡Reserva ya! #TurismoSostenible #Colombia
                  </p>
                  <div className="flex gap-6 mt-3 text-white/60">
                    <button className="hover:text-white flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">12</span>
                    </button>
                    <button className="hover:text-green-400 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">45</span>
                    </button>
                    <button className="hover:text-red-400 flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      <span className="text-sm">89</span>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all cursor-pointer">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg" />
                  <AvatarFallback>N</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">Festival NATUR</span>
                    <Verified className="w-4 h-4 text-blue-400 fill-blue-400" />
                    <span className="text-white/60 text-sm">@festivalnatur · 5h</span>
                  </div>
                  <p className="text-white mt-1">
                    📍 Festival NATUR 2025 en Centro de Felicidad Chapinero
                    15-17 de Marzo | 50+ speakers | 20+ talleres
                    ¡Early bird disponible! 🎯
                  </p>
                  <div className="flex gap-6 mt-3 text-white/60">
                    <button className="hover:text-white flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">34</span>
                    </button>
                    <button className="hover:text-green-400 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">128</span>
                    </button>
                    <button className="hover:text-red-400 flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      <span className="text-sm">256</span>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TwitterProfileSection;