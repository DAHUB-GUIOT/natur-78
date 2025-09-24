import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Edit, Camera, MapPin, Building2, Mail, Phone, Globe, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileMap } from "@/components/ui/ProfileMap";
import TwitterProfileSection from "@/components/profile/TwitterProfileSection";

export default function PerfilPage() {
  const [isEditing, setIsEditing] = useState(false);

  // Fetch current user profile
  const { data: currentUser, isLoading: userLoading } = useQuery({
    queryKey: ['/api/auth/me'],
    staleTime: 10 * 60 * 1000,
  });

  // Calculate profile completion
  const calculateProfileCompletion = (user: any) => {
    if (!user) return 0;
    const fields = [
      user.firstName, user.lastName, user.email, user.companyName,
      user.role, user.city, user.country, user.description, user.profileImage
    ];
    const completedFields = fields.filter(field => field && field.toString().trim() !== '').length;
    return Math.round((completedFields / fields.length) * 100);
  };

  const profileCompletion = calculateProfileCompletion(currentUser);

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900 p-4 lg:p-6">
        <Card className="bg-white/5 backdrop-blur-xl border-white/10">
          <CardContent className="p-8">
            <div className="animate-pulse">
              <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4"></div>
              <div className="h-6 bg-white/20 rounded mb-2"></div>
              <div className="h-4 bg-white/20 rounded w-3/4 mx-auto"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900 p-4 lg:p-6">
        <Card className="bg-white/5 backdrop-blur-xl border-white/10">
          <CardContent className="p-8 text-center">
            <h2 className="text-white text-xl mb-2">Error al cargar perfil</h2>
            <p className="text-white/60">No se pudo cargar la información del perfil</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900 p-4 lg:p-6">
      {/* Profile Header */}
      <Card className="bg-white/10 backdrop-blur-xl border-white/20 mb-6">
        <CardContent className="p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            {/* Profile Image */}
            <div className="relative">
              <Avatar className="w-24 h-24 lg:w-32 lg:h-32 border-4 border-green-400/30">
                <AvatarImage src={currentUser.profileImage} alt={currentUser.firstName} />
                <AvatarFallback className="bg-green-600/20 text-green-400 text-2xl lg:text-3xl">
                  {currentUser.firstName?.charAt(0) || currentUser.companyName?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <Button 
                size="sm" 
                className="absolute -bottom-2 -right-2 bg-green-600/80 hover:bg-green-600 rounded-full w-8 h-8 p-0"
                data-testid="button-change-photo"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                    {currentUser.companyName || `${currentUser.firstName} ${currentUser.lastName}`}
                  </h1>
                  {currentUser.role && (
                    <Badge className="bg-green-600/20 text-green-300 border-green-500/30 mb-2">
                      {currentUser.role}
                    </Badge>
                  )}
                  {currentUser.city && (
                    <div className="flex items-center gap-2 text-white/70 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{currentUser.city}, {currentUser.country}</span>
                    </div>
                  )}
                  {currentUser.description && (
                    <p className="text-white/80 max-w-2xl">{currentUser.description}</p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="text-white font-semibold">{profileCompletion}%</div>
                    <div className="text-white/60 text-xs">Completitud</div>
                  </div>
                  <Button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-white/10 border border-white/20 text-white hover:bg-white/20"
                    data-testid="button-edit-profile"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar Perfil
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Contact Information */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Mail className="w-5 h-5 mr-2 text-blue-400" />
              Información de Contacto
            </h3>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">Email</span>
              <span className="text-white font-medium">{currentUser.email}</span>
            </div>
            {currentUser.phone && (
              <div className="flex items-center justify-between">
                <span className="text-white/70 text-sm">Teléfono</span>
                <span className="text-white font-medium">{currentUser.phone}</span>
              </div>
            )}
            {currentUser.website && (
              <div className="flex items-center justify-between">
                <span className="text-white/70 text-sm">Sitio web</span>
                <a href={currentUser.website} target="_blank" rel="noopener noreferrer" 
                   className="text-green-400 hover:text-green-300 font-medium">
                  <Globe className="w-4 h-4 inline mr-1" />
                  Visitar
                </a>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">Miembro desde</span>
              <span className="text-white font-medium">
                {new Date(currentUser.createdAt).toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Business Information */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Building2 className="w-5 h-5 mr-2 text-green-400" />
              Información Empresarial
            </h3>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentUser.companyCategory && (
              <div className="flex items-center justify-between">
                <span className="text-white/70 text-sm">Categoría</span>
                <Badge className="bg-green-600/20 text-green-300">
                  {currentUser.companyCategory}
                </Badge>
              </div>
            )}
            {currentUser.companySubcategory && (
              <div className="flex items-center justify-between">
                <span className="text-white/70 text-sm">Subcategoría</span>
                <span className="text-white font-medium text-sm">{currentUser.companySubcategory}</span>
              </div>
            )}
            {currentUser.businessType && (
              <div className="flex items-center justify-between">
                <span className="text-white/70 text-sm">Tipo de empresa</span>
                <span className="text-white font-medium text-sm">{currentUser.businessType}</span>
              </div>
            )}
            {currentUser.yearsExperience && (
              <div className="flex items-center justify-between">
                <span className="text-white/70 text-sm">Años de experiencia</span>
                <span className="text-white font-medium">{currentUser.yearsExperience}</span>
              </div>
            )}
            {currentUser.teamSize && (
              <div className="flex items-center justify-between">
                <span className="text-white/70 text-sm">Tamaño del equipo</span>
                <span className="text-white font-medium">{currentUser.teamSize} personas</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Profile Stats */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-purple-400" />
              Actividad
            </h3>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">Experiencias creadas</span>
              <span className="text-white font-medium">0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">Conexiones</span>
              <span className="text-white font-medium">0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">Vistas del perfil</span>
              <span className="text-white font-medium">0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">Completitud del perfil</span>
              <div className="flex items-center">
                <div className="w-16 h-2 bg-gray-700 rounded-full mr-2">
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
      </div>

      {/* Company Description */}
      {currentUser?.companyDescription && (
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 mb-6">
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">Descripción de la Empresa</h3>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 leading-relaxed">{currentUser.companyDescription}</p>
          </CardContent>
        </Card>
      )}

      {/* Services and Certifications Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Services Offered */}
        {currentUser?.servicesOffered && Array.isArray(currentUser.servicesOffered) && currentUser.servicesOffered.length > 0 && (
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">Servicios Ofrecidos</h3>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {currentUser.servicesOffered.map((service: string, index: number) => (
                  <Badge key={index} className="bg-blue-600/20 text-blue-300 border-blue-500/30">
                    {service}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Certifications */}
        {currentUser?.certifications && Array.isArray(currentUser.certifications) && currentUser.certifications.length > 0 && (
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">Certificaciones</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {currentUser.certifications.map((cert: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                    <span className="text-white/80 text-sm">{cert}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Sustainability and Accessibility */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sustainability Practices */}
        {currentUser?.sustainabilityPractices && Array.isArray(currentUser.sustainabilityPractices) && currentUser.sustainabilityPractices.length > 0 && (
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">Prácticas Sostenibles</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {currentUser.sustainabilityPractices.map((practice: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                    <span className="text-white/80 text-sm">{practice}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Accessibility Features */}
        {currentUser?.accessibilityFeatures && Array.isArray(currentUser.accessibilityFeatures) && currentUser.accessibilityFeatures.length > 0 && (
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">Características de Accesibilidad</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {currentUser.accessibilityFeatures.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                    <span className="text-white/80 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Location Map */}
      {currentUser && (currentUser.address || currentUser.coordinates) && (
        <ProfileMap
          address={currentUser.address || `${currentUser.city}, ${currentUser.country}`}
          coordinates={currentUser.coordinates}
          companyName={currentUser.companyName || currentUser.firstName}
          className="mb-6"
        />
      )}

      {/* Profile Feed/Activity Section */}
      {currentUser && (
        <div className="mt-6">
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardContent className="p-6">
              <h3 className="text-white text-lg font-semibold mb-4">Actividad Reciente</h3>
              <p className="text-white/60">No hay actividad reciente para mostrar.</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}