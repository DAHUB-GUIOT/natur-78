import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, 
  Building, 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  Save,
  Edit,
  Camera,
  Star,
  CheckCircle,
  Award,
  TrendingUp,
  Users,
  DollarSign,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/contexts/AuthContext";

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
  skills?: string[];
  interests?: string[];
  country?: string;
  city?: string;
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
  address?: string;
  city?: string;
  department?: string;
  isVerified: boolean;
  rating: number;
  totalReviews: number;
}

export default function ProfileSection() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  const { data: profile, isLoading: profileLoading } = useQuery<UserProfileData>({
    queryKey: [`/api/profiles/${user?.id}`],
    enabled: !!user?.id,
  });

  const { data: company } = useQuery<Company>({
    queryKey: [`/api/companies/user/${user?.id}`],
    enabled: !!user?.id,
  });

  const [profileData, setProfileData] = useState({
    fullName: "",
    bio: "",
    description: "",
    phone: "",
    whatsapp: "",
    website: "",
    linkedin: "",
    startupName: "",
    foundingYear: "",
    stage: "",
    sector: "",
    teamSize: "",
    fundingNeeded: "",
    currentRevenue: "",
    skills: "",
    interests: "",
    city: "",
    country: "",
  });

  const [companyData, setCompanyData] = useState({
    companyName: "",
    businessType: "",
    description: "",
    website: "",
    phone: "",
    address: "",
    city: "",
    department: "",
  });

  React.useEffect(() => {
    if (profile) {
      setProfileData({
        fullName: profile.fullName || "",
        bio: profile.bio || "",
        description: profile.description || "",
        phone: profile.phone || "",
        whatsapp: profile.whatsapp || "",
        website: profile.website || "",
        linkedin: profile.linkedin || "",
        startupName: profile.startupName || "",
        foundingYear: profile.foundingYear?.toString() || "",
        stage: profile.stage || "",
        sector: profile.sector || "",
        teamSize: profile.teamSize?.toString() || "",
        fundingNeeded: profile.fundingNeeded || "",
        currentRevenue: profile.currentRevenue || "",
        skills: profile.skills?.join(", ") || "",
        interests: profile.interests?.join(", ") || "",
        city: profile.city || "",
        country: profile.country || "",
      });
    }
  }, [profile]);

  React.useEffect(() => {
    if (company) {
      setCompanyData({
        companyName: company.companyName || "",
        businessType: company.businessType || "",
        description: company.description || "",
        website: company.website || "",
        phone: company.phone || "",
        address: company.address || "",
        city: company.city || "",
        department: company.department || "",
      });
    }
  }, [company]);

  const updateProfileMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest(`/api/profiles/${user?.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...data,
          skills: data.skills ? data.skills.split(",").map((s: string) => s.trim()) : [],
          interests: data.interests ? data.interests.split(",").map((s: string) => s.trim()) : [],
          foundingYear: data.foundingYear ? parseInt(data.foundingYear) : undefined,
          teamSize: data.teamSize ? parseInt(data.teamSize) : undefined,
        }),
      });
    },
    onSuccess: () => {
      toast({
        title: "Perfil actualizado",
        description: "Tu información personal ha sido guardada exitosamente.",
      });
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: [`/api/profiles/${user?.id}`] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo actualizar el perfil. Intenta de nuevo.",
        variant: "destructive",
      });
    },
  });

  const updateCompanyMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest(`/api/companies/user/${user?.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Empresa actualizada",
        description: "La información de tu empresa ha sido guardada exitosamente.",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/companies/user/${user?.id}`] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo actualizar la empresa. Intenta de nuevo.",
        variant: "destructive",
      });
    },
  });

  const handleSaveProfile = () => {
    updateProfileMutation.mutate(profileData);
  };

  const handleSaveCompany = () => {
    updateCompanyMutation.mutate(companyData);
  };

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "sponsor": return Building;
      case "startup": return TrendingUp;
      case "commercial": return Users;
      default: return User;
    }
  };

  const CategoryIcon = getCategoryIcon(profile?.userCategory || "");

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="border-white/20 bg-black/20 backdrop-blur-xl">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-white/20">
                <AvatarImage src={profile?.user?.profilePicture} />
                <AvatarFallback className="text-2xl bg-green-100 text-green-800">
                  {profile?.fullName?.charAt(0) || profile?.user?.firstName?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 border-white/30 bg-black/50 hover:bg-black/70"
              >
                <Camera className="h-4 w-4 text-white" />
              </Button>
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {profile?.fullName || `${profile?.user?.firstName} ${profile?.user?.lastName}`.trim() || "Mi Perfil"}
                  </h1>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge className="bg-green-100 text-green-800">
                      <CategoryIcon className="h-4 w-4 mr-1" />
                      {profile?.userCategory || "Usuario"}
                    </Badge>
                    {profile?.subcategory && (
                      <Badge variant="outline" className="border-white/30 text-white">
                        {profile.subcategory}
                      </Badge>
                    )}
                    {company?.isVerified && (
                      <Badge className="bg-blue-100 text-blue-800">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Verificado
                      </Badge>
                    )}
                  </div>
                  {profile?.bio && (
                    <p className="text-white/80 mt-2 max-w-2xl">{profile.bio}</p>
                  )}
                </div>
                
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/20"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? "Cancelar" : "Editar"}
                </Button>
              </div>

              <div className="flex items-center gap-6 mt-4 text-sm text-white/70">
                {profile?.city && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.city}, {profile.country}</span>
                  </div>
                )}
                {profile?.user?.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span>{profile.user.email}</span>
                  </div>
                )}
                {company?.rating && company.rating > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{company.rating.toFixed(1)} ({company.totalReviews} reseñas)</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Información Personal</TabsTrigger>
          <TabsTrigger value="company">Mi Empresa</TabsTrigger>
          <TabsTrigger value="business">Información de Negocio</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card className="border-white/20 bg-black/20 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="h-5 w-5 text-green-400" />
                Información Personal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">Nombre Completo</Label>
                  <Input
                    value={profileData.fullName}
                    onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                    disabled={!isEditing}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <Label className="text-white">Teléfono</Label>
                  <Input
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    disabled={!isEditing}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="+57 300 123 4567"
                  />
                </div>
                <div>
                  <Label className="text-white">WhatsApp</Label>
                  <Input
                    value={profileData.whatsapp}
                    onChange={(e) => setProfileData({...profileData, whatsapp: e.target.value})}
                    disabled={!isEditing}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="+57 300 123 4567"
                  />
                </div>
                <div>
                  <Label className="text-white">Sitio Web</Label>
                  <Input
                    value={profileData.website}
                    onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                    disabled={!isEditing}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="https://misitio.com"
                  />
                </div>
                <div>
                  <Label className="text-white">LinkedIn</Label>
                  <Input
                    value={profileData.linkedin}
                    onChange={(e) => setProfileData({...profileData, linkedin: e.target.value})}
                    disabled={!isEditing}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="https://linkedin.com/in/usuario"
                  />
                </div>
                <div>
                  <Label className="text-white">Ciudad</Label>
                  <Input
                    value={profileData.city}
                    onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                    disabled={!isEditing}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Bogotá"
                  />
                </div>
              </div>

              <div>
                <Label className="text-white">Biografía</Label>
                <Textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  disabled={!isEditing}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Cuéntanos sobre ti..."
                  rows={3}
                />
              </div>

              <div>
                <Label className="text-white">Descripción Detallada</Label>
                <Textarea
                  value={profileData.description}
                  onChange={(e) => setProfileData({...profileData, description: e.target.value})}
                  disabled={!isEditing}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Información más detallada sobre tu experiencia y objetivos..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">Habilidades (separadas por comas)</Label>
                  <Input
                    value={profileData.skills}
                    onChange={(e) => setProfileData({...profileData, skills: e.target.value})}
                    disabled={!isEditing}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Marketing, Ventas, Finanzas"
                  />
                </div>
                <div>
                  <Label className="text-white">Intereses (separados por comas)</Label>
                  <Input
                    value={profileData.interests}
                    onChange={(e) => setProfileData({...profileData, interests: e.target.value})}
                    disabled={!isEditing}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Turismo Sostenible, Innovación, Tecnología"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveProfile}
                    disabled={updateProfileMutation.isPending}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {updateProfileMutation.isPending ? "Guardando..." : "Guardar Cambios"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company" className="space-y-6">
          <Card className="border-white/20 bg-black/20 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Building className="h-5 w-5 text-green-400" />
                Información de la Empresa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">Nombre de la Empresa</Label>
                  <Input
                    value={companyData.companyName}
                    onChange={(e) => setCompanyData({...companyData, companyName: e.target.value})}
                    disabled={!isEditing}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Nombre de tu empresa"
                  />
                </div>
                <div>
                  <Label className="text-white">Tipo de Negocio</Label>
                  <Input
                    value={companyData.businessType}
                    onChange={(e) => setCompanyData({...companyData, businessType: e.target.value})}
                    disabled={!isEditing}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Turismo, Tecnología, Consultoría"
                  />
                </div>
                <div>
                  <Label className="text-white">Teléfono Empresa</Label>
                  <Input
                    value={companyData.phone}
                    onChange={(e) => setCompanyData({...companyData, phone: e.target.value})}
                    disabled={!isEditing}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="+57 1 234 5678"
                  />
                </div>
                <div>
                  <Label className="text-white">Sitio Web Empresa</Label>
                  <Input
                    value={companyData.website}
                    onChange={(e) => setCompanyData({...companyData, website: e.target.value})}
                    disabled={!isEditing}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="https://miempresa.com"
                  />
                </div>
                <div>
                  <Label className="text-white">Ciudad</Label>
                  <Input
                    value={companyData.city}
                    onChange={(e) => setCompanyData({...companyData, city: e.target.value})}
                    disabled={!isEditing}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Bogotá"
                  />
                </div>
                <div>
                  <Label className="text-white">Departamento</Label>
                  <Input
                    value={companyData.department}
                    onChange={(e) => setCompanyData({...companyData, department: e.target.value})}
                    disabled={!isEditing}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Cundinamarca"
                  />
                </div>
              </div>

              <div>
                <Label className="text-white">Dirección</Label>
                <Input
                  value={companyData.address}
                  onChange={(e) => setCompanyData({...companyData, address: e.target.value})}
                  disabled={!isEditing}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Dirección completa de la empresa"
                />
              </div>

              <div>
                <Label className="text-white">Descripción de la Empresa</Label>
                <Textarea
                  value={companyData.description}
                  onChange={(e) => setCompanyData({...companyData, description: e.target.value})}
                  disabled={!isEditing}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Describe tu empresa, servicios y valores..."
                  rows={4}
                />
              </div>

              {isEditing && (
                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveCompany}
                    disabled={updateCompanyMutation.isPending}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {updateCompanyMutation.isPending ? "Guardando..." : "Guardar Empresa"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business" className="space-y-6">
          {profile?.userCategory === "startup" && (
            <Card className="border-white/20 bg-black/20 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  Información de Startup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white">Nombre del Startup</Label>
                    <Input
                      value={profileData.startupName}
                      onChange={(e) => setProfileData({...profileData, startupName: e.target.value})}
                      disabled={!isEditing}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="Nombre de tu startup"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Año de Fundación</Label>
                    <Input
                      type="number"
                      value={profileData.foundingYear}
                      onChange={(e) => setProfileData({...profileData, foundingYear: e.target.value})}
                      disabled={!isEditing}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="2024"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Etapa</Label>
                    <Select
                      value={profileData.stage}
                      onValueChange={(value) => setProfileData({...profileData, stage: value})}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Selecciona la etapa" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="idea">Idea</SelectItem>
                        <SelectItem value="mvp">MVP</SelectItem>
                        <SelectItem value="growth">Crecimiento</SelectItem>
                        <SelectItem value="established">Establecida</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-white">Sector</Label>
                    <Input
                      value={profileData.sector}
                      onChange={(e) => setProfileData({...profileData, sector: e.target.value})}
                      disabled={!isEditing}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="Turismo, Tecnología, Fintech"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Tamaño del Equipo</Label>
                    <Input
                      type="number"
                      value={profileData.teamSize}
                      onChange={(e) => setProfileData({...profileData, teamSize: e.target.value})}
                      disabled={!isEditing}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="5"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Financiación Necesaria</Label>
                    <Input
                      value={profileData.fundingNeeded}
                      onChange={(e) => setProfileData({...profileData, fundingNeeded: e.target.value})}
                      disabled={!isEditing}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="$100,000 USD"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-white">Ingresos Actuales</Label>
                  <Input
                    value={profileData.currentRevenue}
                    onChange={(e) => setProfileData({...profileData, currentRevenue: e.target.value})}
                    disabled={!isEditing}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="$10,000 USD mensuales"
                  />
                </div>

                {isEditing && (
                  <div className="flex justify-end">
                    <Button
                      onClick={handleSaveProfile}
                      disabled={updateProfileMutation.isPending}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {updateProfileMutation.isPending ? "Guardando..." : "Guardar Información"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}