import React from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, MapPin, Calendar, Clock, Users, Star, 
  Wheelchair, Heart, Share, DollarSign, Globe, Phone
} from "lucide-react";

const ExperienceDetail = () => {
  const { id } = useParams();
  
  const { data: experience, isLoading } = useQuery({
    queryKey: ['/api/experiences', id],
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Cargando experiencia...</div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Experiencia no encontrada</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative z-10 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/portal-empresas">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Dashboard
              </Button>
            </Link>
            
            <div className="flex space-x-2">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/20">
                <Heart className="w-4 h-4 mr-2" />
                Guardar
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/20">
                <Share className="w-4 h-4 mr-2" />
                Compartir
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Hero Image */}
              <Card className="backdrop-blur-xl bg-white/10 border border-white/30 overflow-hidden">
                <div className="relative h-64">
                  <img 
                    src={experience.image || "/api/placeholder/800/400"}
                    alt={experience.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-green-600 text-white">
                      {experience.type || "Regular"}
                    </Badge>
                  </div>
                </div>
              </Card>

              {/* Title and Description */}
              <Card className="backdrop-blur-xl bg-white/10 border border-white/30">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl text-white mb-2">
                        {experience.title}
                      </CardTitle>
                      <div className="flex items-center text-white/80 mb-4">
                        <MapPin className="w-4 h-4 mr-2" />
                        {experience.meetingPoint || "Punto de encuentro por definir"}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">
                        ${experience.adultPricePvp || "0"}
                      </div>
                      <div className="text-sm text-white/80">por adulto</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90 leading-relaxed">
                    {experience.description || "Sin descripción disponible"}
                  </p>
                </CardContent>
              </Card>

              {/* Details */}
              <Card className="backdrop-blur-xl bg-white/10 border border-white/30">
                <CardHeader>
                  <CardTitle className="text-white">Detalles de la Experiencia</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center text-white">
                      <Clock className="w-4 h-4 mr-2 text-green-400" />
                      <span className="text-sm">Duración: {experience.duration || "Por definir"}</span>
                    </div>
                    <div className="flex items-center text-white">
                      <Users className="w-4 h-4 mr-2 text-green-400" />
                      <span className="text-sm">Mín. personas: {experience.minimumPeople || "1"}</span>
                    </div>
                    <div className="flex items-center text-white">
                      <Globe className="w-4 h-4 mr-2 text-green-400" />
                      <span className="text-sm">Idiomas: {experience.languages || "Español"}</span>
                    </div>
                    <div className="flex items-center text-white">
                      <Calendar className="w-4 h-4 mr-2 text-green-400" />
                      <span className="text-sm">Días: {experience.operationDays || "Todos los días"}</span>
                    </div>
                  </div>

                  {experience.wheelchairAccessible === "yes" && (
                    <div className="flex items-center text-green-400">
                      <Wheelchair className="w-4 h-4 mr-2" />
                      <span className="text-sm">Accesible para sillas de ruedas</span>
                    </div>
                  )}

                  {experience.included && (
                    <div>
                      <h4 className="font-semibold text-white mb-2">Incluye:</h4>
                      <p className="text-white/80 text-sm">{experience.included}</p>
                    </div>
                  )}

                  {experience.notIncluded && (
                    <div>
                      <h4 className="font-semibold text-white mb-2">No incluye:</h4>
                      <p className="text-white/80 text-sm">{experience.notIncluded}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Booking */}
            <div className="space-y-6">
              {/* Pricing */}
              <Card className="backdrop-blur-xl bg-white/10 border border-white/30">
                <CardHeader>
                  <CardTitle className="text-white">Precios</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {experience.adultPricePvp && (
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Adulto</span>
                      <span className="font-semibold text-white">${experience.adultPricePvp}</span>
                    </div>
                  )}
                  {experience.childPricePvp && (
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Niño</span>
                      <span className="font-semibold text-white">${experience.childPricePvp}</span>
                    </div>
                  )}
                  {experience.seniorPricePvp && (
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Adulto mayor</span>
                      <span className="font-semibold text-white">${experience.seniorPricePvp}</span>
                    </div>
                  )}
                  
                  <div className="pt-3 border-t border-white/20">
                    <div className="flex justify-between items-center text-sm text-white/80">
                      <span>Comisión</span>
                      <span>{experience.commission || "25"}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card className="backdrop-blur-xl bg-white/10 border border-white/30">
                <CardHeader>
                  <CardTitle className="text-white">Contacto</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white mb-3">
                    <Phone className="w-4 h-4 mr-2" />
                    Contactar Proveedor
                  </Button>
                  <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/20">
                    Ver Perfil Completo
                  </Button>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card className="backdrop-blur-xl bg-white/10 border border-white/30">
                <CardHeader>
                  <CardTitle className="text-white">Estado</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Estado</span>
                    <Badge className={
                      experience.status === "active" ? "bg-green-600" :
                      experience.status === "draft" ? "bg-yellow-600" : "bg-gray-600"
                    }>
                      {experience.status === "active" ? "Activa" :
                       experience.status === "draft" ? "Borrador" : "Inactiva"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Modalidad</span>
                    <span className="text-white text-sm">{experience.modality || "Regular"}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetail;