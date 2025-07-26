import React from 'react';
import { useParams } from 'wouter';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  MapPin, 
  Link as LinkIcon,
  Verified,
  Users,
  Eye,
  DollarSign,
  Star,
  Globe,
  MessageCircle,
  Camera,
  CalendarDays,
  Building2,
  Phone,
  Mail
} from "lucide-react";

const CompanyProfile = () => {
  const { companyId } = useParams<{ companyId: string }>();
  
  // Sample data for TripCol
  const companyData = companyId === 'tripcol' ? {
    id: 'tripcol',
    name: 'TripCol',
    handle: 'tripcol',
    category: 'Agencia de Viajes & Organizador de Eventos',
    founder: 'Carlos Mendoza',
    bio: 'Agencia de viajes especializada en experiencias auténticas colombianas. Organizamos eventos corporativos y turismo regenerativo por toda Colombia.',
    location: 'Medellín, Colombia',
    website: 'tripcol.tour',
    email: 'tripcol.tour@gmail.com',
    phone: '+57 300 123 4567',
    joinDate: 'enero 2024',
    verified: true,
    rating: 4.8,
    reviews: 127,
    followers: 856,
    following: 234,
    image: '/lovable-uploads/tripcol-avatar.jpg',
    coverImage: '/lovable-uploads/tripcol-cover.jpg',
    skills: ['Turismo Sostenible', 'Eventos Corporativos', 'Guía Especializada', 'Ecoturismo', 'Turismo Cultural'],
    services: [
      'Tours especializados por Colombia',
      'Organización de eventos corporativos',
      'Experiencias de turismo regenerativo',
      'Guías bilingües certificados',
      'Alojamiento ecológico'
    ],
    certifications: ['Registro Nacional de Turismo', 'ISO 14001', 'Travelife Certified'],
    stats: {
      experiencias: 15,
      clientesAtendidos: 1240,
      eventosOrganizados: 67,
      destinosActivos: 12,
      satisfaccionCliente: 4.8
    }
  } : {
    id: 'dahub',
    name: 'DaHub',
    handle: 'dahub',
    category: 'Tecnología',
    founder: 'Daniel Hurtado',
    bio: 'Empresa de tecnología especializada en desarrollo de plataformas digitales. Creadores de Festival NATUR - conectando el turismo sostenible con la innovación.',
    location: 'Bogotá, Colombia',
    website: 'dahub.tech',
    email: 'dahub.tech@gmail.com',
    phone: '+57 301 456 7890',
    joinDate: 'julio 2025',
    verified: true,
    rating: 4.9,
    reviews: 45,
    followers: 342,
    following: 156,
    image: '/lovable-uploads/dahub-avatar.jpg',
    coverImage: '/lovable-uploads/dahub-cover.jpg',
    skills: ['Desarrollo Web', 'Plataformas Digitales', 'UX/UI Design', 'Turismo Tech', 'Sostenibilidad'],
    services: [
      'Desarrollo de plataformas web',
      'Consultoría en transformación digital',
      'Diseño UX/UI especializado',
      'Soluciones para turismo sostenible',
      'Desarrollo de apps móviles'
    ],
    certifications: ['Google Cloud Partner', 'React Certified', 'AWS Solutions Architect'],
    stats: {
      proyectosCompletados: 28,
      clientesSatisfechos: 156,
      añosExperiencia: 8,
      tecnologiasDominadas: 15,
      satisfaccionCliente: 4.9
    }
  };

  const handleContactClick = () => {
    // Navigate to messaging with this company
    window.location.href = `/portal-empresas?section=mensajes&contact=${companyData.id}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900">
      {/* Background map effect */}
      <div className="fixed inset-0 opacity-20">
        <div className="w-full h-full bg-gray-800/50"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="backdrop-blur-xl bg-black/20 border border-white/10 overflow-hidden mb-6">
          {/* Cover photo */}
          <div className="relative h-48 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          </div>

          <CardContent className="relative px-6 pb-6">
            {/* Avatar */}
            <div className="absolute -top-16 left-6">
              <Avatar className="w-32 h-32 border-4 border-black/50 backdrop-blur-xl">
                <AvatarImage src={companyData.image} />
                <AvatarFallback className="bg-green-600 text-white text-3xl font-bold">
                  {companyData.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Contact button */}
            <div className="flex justify-end pt-4">
              <Button 
                onClick={handleContactClick}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contactar
              </Button>
            </div>

            {/* Profile info */}
            <div className="mt-4 space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-white">{companyData.name}</h1>
                  {companyData.verified && (
                    <Verified className="w-6 h-6 text-blue-400 fill-blue-400" />
                  )}
                </div>
                <p className="text-white/60">@{companyData.handle}</p>
                <p className="text-green-300 font-medium">{companyData.category}</p>
                <p className="text-white/80 text-sm">Fundador: {companyData.founder}</p>
              </div>

              {/* Bio */}
              <p className="text-white text-sm leading-relaxed">
                {companyData.bio}
              </p>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-4 text-sm text-white/60">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{companyData.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <LinkIcon className="w-4 h-4" />
                  <a href={`https://${companyData.website}`} className="hover:text-white transition-colors">
                    {companyData.website}
                  </a>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <span>{companyData.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span>{companyData.phone}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarDays className="w-4 h-4" />
                  <span>Se unió en {companyData.joinDate}</span>
                </div>
              </div>

              {/* Following/Followers */}
              <div className="flex gap-4">
                <div className="hover:underline cursor-pointer">
                  <span className="font-bold text-white">{companyData.following}</span>
                  <span className="text-white/60 ml-1">Siguiendo</span>
                </div>
                <div className="hover:underline cursor-pointer">
                  <span className="font-bold text-white">{companyData.followers}</span>
                  <span className="text-white/60 ml-1">Seguidores</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-white font-bold ml-1">{companyData.rating}</span>
                </div>
                <span className="text-white/60">({companyData.reviews} reseñas)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills & Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Skills */}
          <Card className="backdrop-blur-xl bg-black/20 border border-white/10">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-white mb-4">Especialidades</h3>
              <div className="flex flex-wrap gap-2">
                {companyData.skills.map((skill, index) => (
                  <Badge key={index} className="bg-green-600/20 text-green-300 border border-green-500/30">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Services */}
          <Card className="backdrop-blur-xl bg-black/20 border border-white/10">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-white mb-4">Servicios</h3>
              <ul className="space-y-2">
                {companyData.services.map((service, index) => (
                  <li key={index} className="text-white/80 text-sm flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    {service}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <Card className="backdrop-blur-xl bg-black/20 border border-white/10 mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">Estadísticas</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Object.entries(companyData.stats).map(([key, value], index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-green-400">{value}</div>
                  <div className="text-sm text-white/60 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card className="backdrop-blur-xl bg-black/20 border border-white/10">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">Certificaciones</h3>
            <div className="flex flex-wrap gap-2">
              {companyData.certifications.map((cert, index) => (
                <Badge key={index} className="bg-blue-600/20 text-blue-300 border border-blue-500/30">
                  {cert}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyProfile;