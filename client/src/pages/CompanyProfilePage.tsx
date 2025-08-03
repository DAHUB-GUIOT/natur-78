import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit3, Save, X, MapPin, Globe, Mail, Phone, Building, Users, Award, Calendar, Camera, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CompanyProfile {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  website: string;
  email: string;
  phone: string;
  founded: string;
  employees: string;
  logo: string;
  coverImage: string;
  specialties: string[];
  certifications: string[];
  achievements: string[];
  socialMedia: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
}

const CompanyProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<CompanyProfile>({
    id: '1',
    name: 'EcoTurismo Sostenible',
    description: 'Somos una empresa líder en turismo sostenible en Colombia, ofreciendo experiencias auténticas que conectan a los viajeros con la naturaleza mientras protegemos nuestro patrimonio natural y cultural.',
    category: 'Agencia de Turismo Sostenible',
    location: 'Bogotá, Colombia',
    website: 'https://ecoturismosostenible.co',
    email: 'info@ecoturismosostenible.co',
    phone: '+57 301 234 5678',
    founded: '2018',
    employees: '15-25',
    logo: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    specialties: ['Ecoturismo', 'Turismo Rural', 'Observación de Aves', 'Senderismo Ecológico'],
    certifications: ['Certificación de Turismo Sostenible', 'ISO 14001', 'Rainforest Alliance'],
    achievements: ['Mejor Operador Ecoturístico 2023', 'Premio Sostenibilidad Ambiental', 'Reconocimiento MinComercio'],
    socialMedia: {
      instagram: '@ecoturismosostenible',
      facebook: 'EcoTurismoSostenible',
      linkedin: 'ecoturismo-sostenible'
    }
  });

  const [editedProfile, setEditedProfile] = useState<CompanyProfile>(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FCF8EE] to-[#F5F1E8]">
      
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-green-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/portal-empresas">
                <Button variant="ghost" size="sm" className="text-green-700 hover:text-green-800">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al Portal
                </Button>
              </Link>
              <div className="h-6 w-px bg-green-200"></div>
              <h1 className="text-xl font-unbounded font-light text-green-800">Mi Perfil</h1>
            </div>
            
            <div className="flex items-center gap-3">
              {!isEditing ? (
                <Button 
                  onClick={() => setIsEditing(true)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Editar Perfil
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button 
                    onClick={handleSave}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Guardar
                  </Button>
                  <Button 
                    onClick={handleCancel}
                    variant="outline"
                    className="border-green-300 text-green-700 hover:bg-green-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancelar
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Cover Image and Logo */}
        <motion.div 
          className="relative mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative h-64 rounded-2xl overflow-hidden">
            <img 
              src={profile.coverImage} 
              alt="Company Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            {isEditing && (
              <Button 
                size="sm"
                className="absolute top-4 right-4 bg-white/90 text-gray-700 hover:bg-white"
              >
                <Camera className="w-4 h-4 mr-2" />
                Cambiar Portada
              </Button>
            )}
          </div>
          
          {/* Company Logo */}
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                <AvatarImage src={profile.logo} alt={profile.name} />
                <AvatarFallback className="bg-green-100 text-green-700 text-2xl font-bold">
                  {profile.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              {isEditing && (
                <Button 
                  size="sm"
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-green-600 hover:bg-green-700 text-white p-0"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Company Info Header */}
        <motion.div 
          className="mb-8 pt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                    className="text-2xl font-unbounded font-light"
                    placeholder="Nombre de la empresa"
                  />
                  <Input
                    value={editedProfile.category}
                    onChange={(e) => setEditedProfile({...editedProfile, category: e.target.value})}
                    placeholder="Categoría"
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-unbounded font-light text-gray-900 mb-2">
                    {profile.name}
                  </h1>
                  <p className="text-lg text-green-600 font-medium mb-4">
                    {profile.category}
                  </p>
                </>
              )}
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Fundada en {profile.founded}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{profile.employees} empleados</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-yellow-500">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-sm text-gray-600 ml-2">4.9 (127 reseñas)</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4 bg-white/80 backdrop-blur-sm">
              <TabsTrigger value="overview" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
                Información General
              </TabsTrigger>
              <TabsTrigger value="specialties" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
                Especialidades
              </TabsTrigger>
              <TabsTrigger value="certifications" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
                Certificaciones
              </TabsTrigger>
              <TabsTrigger value="contact" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
                Contacto
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-green-200/50">
                <CardHeader>
                  <CardTitle className="text-green-800 font-unbounded font-light">
                    Acerca de Nosotros
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <Textarea
                      value={editedProfile.description}
                      onChange={(e) => setEditedProfile({...editedProfile, description: e.target.value})}
                      className="min-h-32"
                      placeholder="Descripción de la empresa"
                    />
                  ) : (
                    <p className="text-gray-700 leading-relaxed">
                      {profile.description}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="bg-white/80 backdrop-blur-sm border-green-200/50">
                <CardHeader>
                  <CardTitle className="text-green-800 font-unbounded font-light flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Logros y Reconocimientos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {profile.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <Award className="w-5 h-5 text-green-600" />
                        <span className="text-gray-800">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Specialties Tab */}
            <TabsContent value="specialties" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-green-200/50">
                <CardHeader>
                  <CardTitle className="text-green-800 font-unbounded font-light">
                    Especialidades
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.specialties.map((specialty, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className="bg-green-100 text-green-800 hover:bg-green-200"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Certifications Tab */}
            <TabsContent value="certifications" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-green-200/50">
                <CardHeader>
                  <CardTitle className="text-green-800 font-unbounded font-light">
                    Certificaciones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {profile.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <Award className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{cert}</h4>
                          <p className="text-sm text-gray-600">Certificación válida</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm border-green-200/50">
                  <CardHeader>
                    <CardTitle className="text-green-800 font-unbounded font-light">
                      Información de Contacto
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Email</label>
                          <Input
                            value={editedProfile.email}
                            onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                            type="email"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Teléfono</label>
                          <Input
                            value={editedProfile.phone}
                            onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Sitio Web</label>
                          <Input
                            value={editedProfile.website}
                            onChange={(e) => setEditedProfile({...editedProfile, website: e.target.value})}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-green-600" />
                          <span className="text-gray-700">{profile.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-green-600" />
                          <span className="text-gray-700">{profile.phone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-green-600" />
                          <a 
                            href={profile.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-700 underline"
                          >
                            {profile.website}
                          </a>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-green-200/50">
                  <CardHeader>
                    <CardTitle className="text-green-800 font-unbounded font-light">
                      Redes Sociales
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {profile.socialMedia.instagram && (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                            <span className="text-pink-600 text-sm font-bold">IG</span>
                          </div>
                          <span className="text-gray-700">{profile.socialMedia.instagram}</span>
                        </div>
                      )}
                      {profile.socialMedia.facebook && (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 text-sm font-bold">FB</span>
                          </div>
                          <span className="text-gray-700">{profile.socialMedia.facebook}</span>
                        </div>
                      )}
                      {profile.socialMedia.linkedin && (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 text-sm font-bold">LI</span>
                          </div>
                          <span className="text-gray-700">{profile.socialMedia.linkedin}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default CompanyProfilePage;