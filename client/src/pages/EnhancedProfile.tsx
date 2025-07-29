import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  MapPin, Globe, Phone, Mail, Calendar, Users, Award, 
  Edit, Save, X, Twitter, Facebook, Linkedin, Instagram,
  Building2, Star, Heart, MessageCircle, Share, Settings,
  TrendingUp, Activity, Eye, CheckCircle
} from "lucide-react";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";

export default function EnhancedProfile() {
  const [location] = useLocation();
  const userId = location.split("/")[2]; // Extract user ID from URL /perfil/:userId
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch user profile data
  const { data: user, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ["/api/users", userId],
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    retry: 2,
  });

  // Fetch user's experiences/posts
  const { data: userPosts = [], isLoading: postsLoading } = useQuery({
    queryKey: ["/api/experiences/user", userId],
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes cache
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData: any) => {
      return await apiRequest(`/api/users/${userId}`, {
        method: "PATCH",
        body: JSON.stringify(updatedData),
      });
    },
    onSuccess: () => {
      toast({
        title: "Perfil actualizado",
        description: "Los cambios se han guardado correctamente.",
      });
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["/api/users", userId] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo actualizar el perfil.",
        variant: "destructive",
      });
    },
  });

  if (userLoading) {
    return (
      <div className="min-h-screen bg-black relative">
        {/* Background map */}
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
        
        <div className="relative z-10 max-w-4xl mx-auto p-6 space-y-6">
          {/* Header skeleton */}
          <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
            <CardContent className="p-6">
              <div className="flex items-start space-x-6">
                <Skeleton className="w-24 h-24 rounded-full bg-gray-700" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-6 bg-gray-700 w-1/3" />
                  <Skeleton className="h-4 bg-gray-700 w-1/2" />
                  <Skeleton className="h-4 bg-gray-700 w-2/3" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (userError || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 p-8">
          <div className="text-center">
            <Building2 className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg text-white mb-2">Usuario no encontrado</h3>
            <p className="text-gray-300 text-sm">El perfil que buscas no existe o no está disponible.</p>
          </div>
        </Card>
      </div>
    );
  }

  const profileData = user as any;
  const profileCompletion = Math.round((Object.values(profileData).filter(Boolean).length / Object.keys(profileData).length) * 100);

  return (
    <div className="min-h-screen bg-black relative">
      {/* Mapbox background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 opacity-90" />
      
      <div className="relative z-10 max-w-4xl mx-auto p-6 space-y-6">
        {/* Twitter-style Header */}
        <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 hover:bg-gray-800/50 transition-all">
          <div className="relative h-32 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-t-lg">
            <div className="absolute -bottom-12 left-6">
              <Avatar className="w-24 h-24 ring-4 ring-gray-900 bg-gray-800">
                <AvatarImage src={profileData.profilePicture} />
                <AvatarFallback className="bg-green-600 text-white text-xl font-bold">
                  {profileData.companyName?.[0] || profileData.firstName?.[0] || profileData.email[0]}
                </AvatarFallback>
              </Avatar>
            </div>
            {profileData.isVerified && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/50">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verificado
                </Badge>
              </div>
            )}
          </div>
          
          <CardContent className="pt-16 pb-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white mb-1">
                  {profileData.companyName || `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim() || profileData.email}
                </h1>
                <p className="text-gray-300 text-sm mb-2">
                  @{profileData.email.split('@')[0]}
                </p>
                <p className="text-gray-300 text-sm mb-3">
                  {profileData.bio || "Miembro de la comunidad Festival NATUR"}
                </p>
                
                {/* Profile metadata */}
                <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm mb-4">
                  {profileData.city && (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{profileData.city}, {profileData.country}</span>
                    </div>
                  )}
                  {profileData.website && (
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-1" />
                      <a href={profileData.website} target="_blank" rel="noopener noreferrer" 
                         className="text-green-400 hover:text-green-300 transition-colors">
                        {profileData.website.replace(/https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Se unió en {new Date(profileData.createdAt).toLocaleDateString('es-ES', { 
                      month: 'long', year: 'numeric' 
                    })}</span>
                  </div>
                </div>

                {/* Social media links */}
                <div className="flex items-center gap-3 mb-4">
                  {profileData.twitterUrl && (
                    <a href={profileData.twitterUrl} target="_blank" rel="noopener noreferrer"
                       className="text-gray-400 hover:text-blue-400 transition-colors">
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {profileData.facebookUrl && (
                    <a href={profileData.facebookUrl} target="_blank" rel="noopener noreferrer"
                       className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Facebook className="w-4 h-4" />
                    </a>
                  )}
                  {profileData.linkedinUrl && (
                    <a href={profileData.linkedinUrl} target="_blank" rel="noopener noreferrer"
                       className="text-gray-400 hover:text-blue-500 transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {profileData.instagramUrl && (
                    <a href={profileData.instagramUrl} target="_blank" rel="noopener noreferrer"
                       className="text-gray-400 hover:text-pink-500 transition-colors">
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 text-sm">
                  <span className="text-white">
                    <strong>{userPosts.length}</strong> <span className="text-gray-400">Experiencias</span>
                  </span>
                  <span className="text-white">
                    <strong>24</strong> <span className="text-gray-400">Conexiones</span>
                  </span>
                  <span className="text-white">
                    <strong>1.2K</strong> <span className="text-gray-400">Vistas de perfil</span>
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" 
                        className="border-gray-600/50 text-gray-300 hover:bg-gray-700/50">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Mensaje
                </Button>
                <Button size="sm" variant="outline"
                        className="border-gray-600/50 text-gray-300 hover:bg-gray-700/50">
                  <Share className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline"
                        className="border-gray-600/50 text-gray-300 hover:bg-gray-700/50"
                        onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile completion and business info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Business Information */}
          <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
            <CardHeader>
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Building2 className="w-5 h-5 mr-2 text-green-400" />
                Información Empresarial
              </h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Tipo de empresa</span>
                <Badge className="bg-green-600/20 text-green-300">
                  {profileData.businessType || profileData.role}
                </Badge>
              </div>
              {profileData.yearsExperience && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Años de experiencia</span>
                  <span className="text-white font-medium">{profileData.yearsExperience}</span>
                </div>
              )}
              {profileData.teamSize && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Tamaño del equipo</span>
                  <span className="text-white font-medium">{profileData.teamSize} personas</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Completitud del perfil</span>
                <div className="flex items-center">
                  <div className="w-12 h-2 bg-gray-700 rounded-full mr-2">
                    <div 
                      className="h-2 bg-green-500 rounded-full transition-all duration-300" 
                      style={{ width: `${profileCompletion}%` }}
                    />
                  </div>
                  <span className="text-white text-sm">{profileCompletion}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills and Interests */}
          <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
            <CardHeader>
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-400" />
                Habilidades
              </h3>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profileData.skills?.length > 0 ? (
                  profileData.skills.map((skill: string, index: number) => (
                    <Badge key={index} className="bg-blue-600/20 text-blue-300 border-blue-500/50">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <div className="text-gray-400 text-sm">
                    No se han agregado habilidades
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Activity Stats */}
          <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
            <CardHeader>
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Activity className="w-5 h-5 mr-2 text-purple-400" />
                Actividad
              </h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Experiencias publicadas</span>
                <span className="text-white font-medium">{userPosts.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Vistas del perfil</span>
                <span className="text-white font-medium">1,234</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Último activo</span>
                <span className="text-white font-medium">Hace 2 horas</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content tabs */}
        <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
          <CardHeader>
            <div className="flex space-x-6 border-b border-gray-600/30 pb-4">
              {[
                { id: "posts", label: "Experiencias", icon: Star, count: userPosts.length },
                { id: "activity", label: "Actividad", icon: Activity, count: 12 },
                { id: "reviews", label: "Reseñas", icon: Heart, count: 8 }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    activeTab === tab.id 
                      ? 'bg-green-600/20 text-green-300 border border-green-500/50' 
                      : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  <Badge className="bg-gray-700 text-gray-300 text-xs">
                    {tab.count}
                  </Badge>
                </button>
              ))}
            </div>
          </CardHeader>
          
          <CardContent>
            {/* Experiences content */}
            {activeTab === "posts" && (
              <div className="space-y-4">
                {postsLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="p-4 border border-gray-600/30 rounded-lg">
                        <Skeleton className="h-4 bg-gray-700 mb-2 w-3/4" />
                        <Skeleton className="h-3 bg-gray-700 mb-2 w-full" />
                        <Skeleton className="h-3 bg-gray-700 w-1/2" />
                      </div>
                    ))}
                  </div>
                ) : userPosts.length > 0 ? (
                  userPosts.map((post: any) => (
                    <div key={post.id} className="p-4 border border-gray-600/30 rounded-lg hover:bg-gray-800/30 transition-all">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={profileData.profilePicture} />
                          <AvatarFallback className="bg-green-600 text-white text-sm">
                            {profileData.companyName?.[0] || profileData.firstName?.[0] || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-white">{profileData.companyName || profileData.firstName}</span>
                            <span className="text-gray-400 text-sm">·</span>
                            <span className="text-gray-400 text-sm">
                              {new Date(post.createdAt).toLocaleDateString('es-ES')}
                            </span>
                          </div>
                          <h4 className="text-white font-medium mb-2">{post.title}</h4>
                          <p className="text-gray-300 text-sm mb-3">{post.description}</p>
                          <div className="flex items-center space-x-4 text-gray-400 text-sm">
                            <button className="flex items-center space-x-1 hover:text-red-400 transition-colors">
                              <Heart className="w-4 h-4" />
                              <span>12</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
                              <MessageCircle className="w-4 h-4" />
                              <span>3</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-green-400 transition-colors">
                              <Share className="w-4 h-4" />
                              <span>5</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg text-white mb-2">Sin experiencias publicadas</h3>
                    <p className="text-gray-400 text-sm">
                      Este usuario aún no ha compartido ninguna experiencia.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Activity tab content */}
            {activeTab === "activity" && (
              <div className="space-y-4">
                <div className="text-center py-8">
                  <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg text-white mb-2">Actividad reciente</h3>
                  <p className="text-gray-400 text-sm">
                    La actividad del usuario aparecerá aquí.
                  </p>
                </div>
              </div>
            )}

            {/* Reviews tab content */}
            {activeTab === "reviews" && (
              <div className="space-y-4">
                <div className="text-center py-8">
                  <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg text-white mb-2">Reseñas y valoraciones</h3>
                  <p className="text-gray-400 text-sm">
                    Las reseñas de otros usuarios aparecerán aquí.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}