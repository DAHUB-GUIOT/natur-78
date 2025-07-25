import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  Phone, 
  Mail, 
  Globe, 
  MessageCircle, 
  Calendar,
  DollarSign,
  Building,
  Award,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Target,
  Heart,
  Edit,
  Share2,
  MoreHorizontal,
  ExternalLink,
  CheckCircle,
  Info
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface UserProfileData {
  id: number;
  userId: number;
  fullName?: string;
  userCategory: string;
  subcategory?: string;
  phone?: string;
  whatsapp?: string;
  website?: string;
  linkedin?: string;
  bio?: string;
  description?: string;
  startupName?: string;
  foundingYear?: number;
  stage?: string;
  sector?: string;
  teamSize?: number;
  fundingNeeded?: string;
  currentRevenue?: string;
  investmentFocus?: string[];
  investmentRange?: string;
  portfolioSize?: number;
  expertise?: string[];
  experience?: string;
  mentorshipType?: string[];
  skills?: string[];
  interests?: string[];
  country?: string;
  city?: string;
  isProfileComplete: boolean;
  isPublic: boolean;
  user?: {
    email: string;
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
  };
}

interface Company {
  id: number;
  companyName: string;
  businessType?: string;
  description?: string;
  website?: string;
  phone?: string;
  city?: string;
  department?: string;
  isVerified: boolean;
  rating: number;
  totalReviews: number;
}

interface Experience {
  id: number;
  title: string;
  description?: string;
  type: string;
  adultPricePvp?: string;
  duration?: string;
  status: string;
}

export default function UserProfile() {
  const [match, params] = useRoute("/perfil/:userId");
  const [activeTab, setActiveTab] = useState("about");
  const queryClient = useQueryClient();
  const userId = params?.userId ? parseInt(params.userId) : null;

  const { data: profile } = useQuery<UserProfileData>({
    queryKey: [`/api/profiles/${userId}`],
    enabled: !!userId,
  });

  const { data: company } = useQuery<Company>({
    queryKey: [`/api/companies/user/${userId}`],
    enabled: !!userId && profile?.userCategory === "sponsor",
  });

  const { data: experiences = [] } = useQuery<Experience[]>({
    queryKey: [`/api/experiences/user/${userId}`],
    enabled: !!userId,
  });

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "sponsor": return Building;
      case "startup": return TrendingUp;
      case "mentor": return GraduationCap;
      case "investor": return DollarSign;
      case "commercial": return Briefcase;
      default: return Users;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "sponsor": return "bg-blue-100 text-blue-800";
      case "startup": return "bg-green-100 text-green-800";
      case "mentor": return "bg-purple-100 text-purple-800";
      case "investor": return "bg-yellow-100 text-yellow-800";
      case "commercial": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const CategoryIcon = getCategoryIcon(profile.userCategory);

  const renderStartupInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {profile.startupName && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Building className="h-5 w-5 text-green-600" />
              Empresa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold text-xl">{profile.startupName}</h3>
            {profile.sector && <p className="text-gray-600">{profile.sector}</p>}
            <div className="flex gap-4 mt-3">
              {profile.foundingYear && (
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>Fundada en {profile.foundingYear}</span>
                </div>
              )}
              {profile.teamSize && (
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Users className="h-4 w-4" />
                  <span>{profile.teamSize} empleados</span>
                </div>
              )}
            </div>
            {profile.stage && (
              <Badge className="mt-3 bg-green-100 text-green-800">
                Etapa: {profile.stage}
              </Badge>
            )}
          </CardContent>
        </Card>
      )}

      {(profile.fundingNeeded || profile.currentRevenue) && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Información Financiera
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {profile.fundingNeeded && (
              <div>
                <p className="text-sm text-gray-500">Financiación Necesaria</p>
                <p className="font-semibold">{profile.fundingNeeded}</p>
              </div>
            )}
            {profile.currentRevenue && (
              <div>
                <p className="text-sm text-gray-500">Ingresos Actuales</p>
                <p className="font-semibold">{profile.currentRevenue}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderInvestorInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {profile.investmentFocus && profile.investmentFocus.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              Áreas de Inversión
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.investmentFocus.map((focus, index) => (
                <Badge key={index} variant="outline" className="border-green-200 text-green-700">
                  {focus}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Información de Inversión
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {profile.investmentRange && (
            <div>
              <p className="text-sm text-gray-500">Rango de Inversión</p>
              <p className="font-semibold">{profile.investmentRange}</p>
            </div>
          )}
          {profile.portfolioSize && (
            <div>
              <p className="text-sm text-gray-500">Tamaño del Portafolio</p>
              <p className="font-semibold">{profile.portfolioSize} empresas</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderMentorInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {profile.expertise && profile.expertise.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="h-5 w-5 text-green-600" />
              Áreas de Expertise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.expertise.map((exp, index) => (
                <Badge key={index} variant="outline" className="border-purple-200 text-purple-700">
                  {exp}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {profile.mentorshipType && profile.mentorshipType.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-green-600" />
              Tipo de Mentoría
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.mentorshipType.map((type, index) => (
                <Badge key={index} variant="outline" className="border-purple-200 text-purple-700">
                  {type}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {profile.experience && (
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Experiencia</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{profile.experience}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderCompanyInfo = () => (
    company && (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Building className="h-5 w-5 text-green-600" />
            Información de la Empresa
            {company.isVerified && (
              <CheckCircle className="h-5 w-5 text-green-600" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-xl">{company.companyName}</h3>
            {company.businessType && (
              <p className="text-gray-600">{company.businessType}</p>
            )}
          </div>
          
          {company.description && (
            <p className="text-gray-700">{company.description}</p>
          )}

          <div className="flex items-center gap-4">
            {company.rating > 0 && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{company.rating.toFixed(1)}</span>
                <span className="text-gray-500 text-sm">({company.totalReviews} reseñas)</span>
              </div>
            )}
            {company.isVerified && (
              <Badge className="bg-green-100 text-green-800">
                Empresa Verificada
              </Badge>
            )}
          </div>

          <div className="space-y-2">
            {company.city && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{company.city}, {company.department}</span>
              </div>
            )}
            {company.phone && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{company.phone}</span>
              </div>
            )}
            {company.website && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Globe className="h-4 w-4" />
                <a 
                  href={company.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline flex items-center gap-1"
                >
                  {company.website}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src={profile.user?.profilePicture} />
              <AvatarFallback className="text-2xl bg-green-100 text-green-800">
                {profile.fullName?.charAt(0) || profile.user?.firstName?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {profile.fullName || `${profile.user?.firstName} ${profile.user?.lastName}`.trim() || "Usuario"}
                  </h1>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge className={getCategoryColor(profile.userCategory)}>
                      <CategoryIcon className="h-4 w-4 mr-1" />
                      {profile.userCategory}
                    </Badge>
                    {profile.subcategory && (
                      <Badge variant="outline">{profile.subcategory}</Badge>
                    )}
                  </div>
                  {profile.bio && (
                    <p className="text-gray-600 mt-2 max-w-2xl">{profile.bio}</p>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Contactar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-6 mt-4 text-sm text-gray-500">
                {profile.city && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.city}, {profile.country}</span>
                  </div>
                )}
                {profile.phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    <span>{profile.phone}</span>
                  </div>
                )}
                {profile.website && (
                  <div className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    <a 
                      href={profile.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline"
                    >
                      Sitio web
                    </a>
                  </div>
                )}
                {profile.linkedin && (
                  <div className="flex items-center gap-1">
                    <ExternalLink className="h-4 w-4" />
                    <a 
                      href={profile.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline"
                    >
                      LinkedIn
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="about">Información</TabsTrigger>
            <TabsTrigger value="experiences">Experiencias</TabsTrigger>
            <TabsTrigger value="skills">Habilidades</TabsTrigger>
            <TabsTrigger value="contact">Contacto</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-6">
            {profile.description && (
              <Card>
                <CardHeader>
                  <CardTitle>Acerca de</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{profile.description}</p>
                </CardContent>
              </Card>
            )}

            {profile.userCategory === "startup" && renderStartupInfo()}
            {profile.userCategory === "investor" && renderInvestorInfo()}
            {profile.userCategory === "mentor" && renderMentorInfo()}
            {profile.userCategory === "sponsor" && renderCompanyInfo()}
          </TabsContent>

          <TabsContent value="experiences" className="space-y-6">
            {experiences.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiences.map((experience) => (
                  <Card key={experience.id} className="group hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{experience.title}</CardTitle>
                        <Badge
                          variant={experience.status === "approved" ? "default" : "secondary"}
                          className={experience.status === "approved" ? "bg-green-600" : ""}
                        >
                          {experience.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {experience.description || "Experiencia única en turismo sostenible"}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>{experience.duration || "Duración variable"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <DollarSign className="h-4 w-4" />
                          <span>Desde ${experience.adultPricePvp || "150,000"}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Info className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No hay experiencias disponibles
                  </h3>
                  <p className="text-gray-500">
                    Este usuario aún no ha publicado experiencias.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.skills && profile.skills.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-green-600" />
                      Habilidades
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="border-green-200 text-green-700">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {profile.interests && profile.interests.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-green-600" />
                      Intereses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profile.interests.map((interest, index) => (
                        <Badge key={index} variant="outline" className="border-blue-200 text-blue-700">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.user?.email && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{profile.user.email}</p>
                      </div>
                    </div>
                  )}
                  {profile.phone && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Teléfono</p>
                        <p className="font-medium">{profile.phone}</p>
                      </div>
                    </div>
                  )}
                  {profile.whatsapp && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <MessageCircle className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">WhatsApp</p>
                        <p className="font-medium">{profile.whatsapp}</p>
                      </div>
                    </div>
                  )}
                  {(profile.city || profile.country) && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Ubicación</p>
                        <p className="font-medium">{profile.city}, {profile.country}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Enviar Mensaje
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}