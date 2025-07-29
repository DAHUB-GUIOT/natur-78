import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Calendar,
  Building,
  User,
  Shield,
  Star,
  ArrowLeft
} from "lucide-react";
import { Link, useParams } from "wouter";

interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  role: string;
  city?: string;
  country?: string;
  address?: string;
  coordinates?: { lat: number; lng: number };
  createdAt: string;
}

interface Company {
  id: number;
  companyName: string;
  businessType?: string;
  description?: string;
  phone?: string;
  website?: string;
  address?: string;
  city?: string;
  isVerified?: boolean;
}

const Profile = () => {
  const params = useParams();
  const userId = params.id;

  // Fetch user data
  const { data: user, isLoading } = useQuery<User>({
    queryKey: [`/api/profiles/${userId}`],
    enabled: !!userId,
  });

  // Fetch company data if user is empresa
  const { data: company } = useQuery<Company>({
    queryKey: [`/api/companies/user/${userId}`],
    enabled: !!userId && user?.role === 'empresa',
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-white mt-4">Cargando perfil...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl text-white mb-4">Perfil no encontrado</h1>
            <Link href="/portal-empresas">
              <Button className="bg-green-600 hover:bg-green-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Portal
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Map background with blur effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-black/80"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23065f46' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/portal-empresas">
            <Button variant="outline" className="border-gray-600/50 text-white hover:bg-gray-700/50 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Portal
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Card */}
          <div className="lg:col-span-2">
            <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <Avatar className="w-20 h-20 ring-2 ring-green-600/50">
                    <AvatarFallback className="bg-green-600 text-white text-2xl font-bold">
                      {company?.companyName ? company.companyName[0].toUpperCase() : 
                       user.firstName ? user.firstName[0].toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h1 className="text-2xl font-bold text-white">
                        {company?.companyName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email}
                      </h1>
                      {user.role === 'admin' && (
                        <Badge className="bg-red-600/20 text-red-300">
                          <Shield className="w-3 h-3 mr-1" />
                          Admin
                        </Badge>
                      )}
                      {company?.isVerified && (
                        <Badge className="bg-green-600/20 text-green-300">
                          <Star className="w-3 h-3 mr-1" />
                          Verificado
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-300 mb-2">
                      {company?.description || 
                       (user.role === 'empresa' ? 'Empresa registrada en Festival NATUR' : 'Usuario de Festival NATUR')}
                    </p>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Miembro desde {new Date(user.createdAt).toLocaleDateString('es-ES', { 
                        year: 'numeric', 
                        month: 'long' 
                      })}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Información de Contacto</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Mail className="w-5 h-5 text-green-400" />
                      <span>{user.email}</span>
                    </div>
                    {company?.phone && (
                      <div className="flex items-center space-x-3 text-gray-300">
                        <Phone className="w-5 h-5 text-green-400" />
                        <span>{company.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-3 text-gray-300">
                      <MapPin className="w-5 h-5 text-green-400" />
                      <span>{user.city || 'Colombia'}</span>
                    </div>
                    {company?.website && (
                      <div className="flex items-center space-x-3 text-gray-300">
                        <Globe className="w-5 h-5 text-green-400" />
                        <a 
                          href={company.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-green-400 transition-colors"
                        >
                          Sitio Web
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Business Information for companies */}
                {company && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Información Empresarial</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Tipo de Negocio</p>
                        <p className="text-white font-medium capitalize">
                          {company.businessType || 'Turismo'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Dirección</p>
                        <p className="text-white font-medium">
                          {company.address || user.address || 'No especificada'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4 border-t border-gray-600/30">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <Mail className="w-4 h-4 mr-2" />
                    Enviar Mensaje
                  </Button>
                  <Button variant="outline" className="border-gray-600/50 text-white hover:bg-gray-700/50">
                    <User className="w-4 h-4 mr-2" />
                    Conectar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Information */}
          <div className="space-y-6">
            {/* Statistics */}
            <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
              <CardHeader>
                <CardTitle className="text-white">Estadísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Perfil completado</span>
                  <span className="text-green-400 font-medium">85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Conexiones</span>
                  <span className="text-white font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Experiencias</span>
                  <span className="text-white font-medium">3</span>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            {user.coordinates && (
              <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
                <CardHeader>
                  <CardTitle className="text-white">Ubicación</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <p className="text-white font-medium">{user.city}</p>
                    <p className="text-gray-300 text-sm">{user.country}</p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-gray-600/50 text-white hover:bg-gray-700/50 mt-3"
                    >
                      Ver en Mapa
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Role Badge */}
            <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Building className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <Badge className="bg-green-600/20 text-green-300 text-sm px-3 py-1">
                    {user.role === 'empresa' ? 'Empresa' : 
                     user.role === 'admin' ? 'Administrador' : 'Viajero'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;