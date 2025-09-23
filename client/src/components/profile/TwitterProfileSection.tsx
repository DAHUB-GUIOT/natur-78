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
      {/* Glassmorphism container - More compact */}
      <div className="h-full backdrop-blur-xl bg-black/20 rounded-xl border border-white/10 overflow-hidden">
        {/* Cover photo section - Smaller */}
        <div className="relative h-24 sm:h-32 md:h-36 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <Button 
            size="sm" 
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 text-xs h-7 px-2"
          >
            <Camera className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">Cambiar</span>
          </Button>
        </div>

        {/* Profile section - More compact */}
        <div className="relative px-4 pb-4">
          {/* Avatar - Smaller */}
          <div className="absolute -top-8 sm:-top-10 left-4">
            <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-black/50 backdrop-blur-xl">
              <AvatarImage src="/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg" />
              <AvatarFallback className="bg-green-600 text-white text-lg sm:text-xl font-bold">
                {(profile as any)?.name?.charAt(0) || 'D'}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Edit profile button - Smaller */}
          <div className="flex justify-end pt-2">
            <Button 
              variant="outline" 
              className="bg-black/30 hover:bg-black/50 text-white border-white/30 backdrop-blur-md h-8 px-3 text-xs"
            >
              <Settings className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">Editar</span>
            </Button>
          </div>

          {/* Profile info - More compact */}
          <div className="mt-2 space-y-2">
            <div>
              <div className="flex items-center gap-1">
                <h1 className="text-lg sm:text-xl font-sans text-white">{(profile as any)?.name || 'DaHub'}</h1>
                {(profile as any)?.isVerified && (
                  <Verified className="w-4 h-4 text-blue-400 fill-blue-400" />
                )}
              </div>
              <p className="text-white/60 text-sm">@{(currentUser as any)?.user?.email?.split('@')[0] || 'dahub'}</p>
            </div>

            {/* Bio - Shorter */}
            <p className="text-white text-xs sm:text-sm leading-relaxed line-clamp-2">
              {(profile as any)?.bio || 'Empresa de tecnología especializada en desarrollo de plataformas digitales.'}
            </p>

            {/* Info row - More compact */}
            <div className="flex flex-wrap gap-2 sm:gap-3 text-xs text-white/60">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{(profile as any)?.city || 'Bogotá'}</span>
              </div>
              <div className="flex items-center gap-1">
                <LinkIcon className="w-3 h-3" />
                <a href={(profile as any)?.website || '#'} className="hover:text-white transition-colors truncate max-w-20">
                  {(profile as any)?.website?.replace('https://', '') || 'dahub.tech'}
                </a>
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="w-3 h-3" />
                <span className="hidden sm:inline">Desde {new Date((currentUser as any)?.user?.createdAt || Date.now()).getFullYear()}</span>
              </div>
            </div>

            {/* Following/Followers - More compact */}
            <div className="flex gap-3">
              <div className="hover:underline cursor-pointer">
                <span className="font-bold text-white text-sm">342</span>
                <span className="text-white/60 ml-1 text-xs">Siguiendo</span>
              </div>
              <div className="hover:underline cursor-pointer">
                <span className="font-bold text-white text-sm">1.2K</span>
                <span className="text-white/60 ml-1 text-xs">Seguidores</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats section - More compact */}
        <div className="border-t border-white/10 px-4 py-3">
          <h3 className="text-white font-semibold mb-2 flex items-center gap-2 text-sm">
            <BarChart3 className="w-4 h-4" />
            Estadísticas
          </h3>
          
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            {[
              { label: "Experiencias", value: stats.experiencias, icon: Globe, color: "blue" },
              { label: "Vistas", value: stats.vistasTotal || '1.2K', icon: Eye, color: "green" },
              { label: "Reservas", value: stats.reservasTotal || '89', icon: Calendar, color: "purple" },
              { label: "Ingresos", value: `$${stats.ingresosTotal || '2.4M'}`, icon: DollarSign, color: "yellow" },
              { label: "Rating", value: stats.ratingPromedio || '4.8', icon: Star, color: "orange" }
            ].map((stat, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-1">
                  <stat.icon className={`w-3 h-3 text-${stat.color}-400`} />
                  <TrendingUp className="w-2 h-2 text-green-400" />
                </div>
                <p className="text-sm sm:text-lg font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/60 truncate">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Activity tabs - More compact */}
        <div className="border-t border-white/10">
          <div className="flex">
            <button className="flex-1 px-3 py-2 text-white font-semibold border-b-2 border-green-400 bg-white/5 text-sm">
              Posts
            </button>
            <button className="flex-1 px-3 py-2 text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm">
              Medios
            </button>
            <button className="flex-1 px-3 py-2 text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm">
              Me gusta
            </button>
          </div>
        </div>

        {/* Recent activity feed - More compact */}
        <div className="px-4 py-2 space-y-2 overflow-y-auto max-h-64">
          {/* Sample posts - More compact */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all cursor-pointer">
            <CardContent className="p-3">
              <div className="flex gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg" />
                  <AvatarFallback>N</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-white text-sm">Festival NATUR</span>
                    <Verified className="w-3 h-3 text-blue-400 fill-blue-400" />
                    <span className="text-white/60 text-xs">@festivalnatur · 2h</span>
                  </div>
                  <p className="text-white text-sm mt-1 line-clamp-2">
                    🌿 Nueva experiencia: "Ruta Digital del Café Colombiano" - AR + fincas tradicionales. ¡Reserva ya!
                  </p>
                  <div className="flex gap-4 mt-2 text-white/60">
                    <button className="hover:text-white flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      <span className="text-xs">12</span>
                    </button>
                    <button className="hover:text-green-400 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-xs">45</span>
                    </button>
                    <button className="hover:text-red-400 flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      <span className="text-xs">89</span>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all cursor-pointer">
            <CardContent className="p-3">
              <div className="flex gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg" />
                  <AvatarFallback>N</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-white text-sm">Festival NATUR</span>
                    <Verified className="w-3 h-3 text-blue-400 fill-blue-400" />
                    <span className="text-white/60 text-xs">@festivalnatur · 5h</span>
                  </div>
                  <p className="text-white text-sm mt-1 line-clamp-2">
                    📍 Festival NATUR 2025 - Centro Chapinero | 15-17 Mar | 50+ speakers | ¡Early bird! 🎯
                  </p>
                  <div className="flex gap-4 mt-2 text-white/60">
                    <button className="hover:text-white flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      <span className="text-xs">34</span>
                    </button>
                    <button className="hover:text-green-400 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-xs">128</span>
                    </button>
                    <button className="hover:text-red-400 flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      <span className="text-xs">256</span>
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