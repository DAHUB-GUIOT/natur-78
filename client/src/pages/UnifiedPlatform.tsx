import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  Phone, 
  Mail, 
  Globe, 

  Heart,
  Search,
  Filter,
  Calendar,
  DollarSign,
  Copy,
  Plus,
  Edit3
} from "lucide-react";

import ExperienceForm from "@/components/dashboard/ExperienceForm";
import { apiRequest } from "@/lib/queryClient";

interface Experience {
  id: number;
  title: string;
  description?: string;
  userId: number;
  type: string;
  adultPricePvp?: string;
  duration?: string;
  status: string;
  createdAt: string;
}

interface Company {
  id: number;
  companyName: string;
  businessType?: string;
  description?: string;
  phone?: string;
  website?: string;
  city?: string;
  department?: string;
  rating: number;
  totalReviews: number;
  isVerified: boolean;
}

export default function UnifiedPlatform() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showExperienceForm, setShowExperienceForm] = useState(false);

  const queryClient = useQueryClient();

  const { data: experiences = [] } = useQuery<Experience[]>({
    queryKey: ["/api/experiences/public"],
  });

  const { data: companies = [] } = useQuery<Company[]>({
    queryKey: ["/api/companies"],
  });

  const { data: userExperiences = [] } = useQuery<Experience[]>({
    queryKey: ["/api/experiences"],
  });

  const duplicateExperienceMutation = useMutation({
    mutationFn: (experienceId: number) =>
      apiRequest(`/api/experiences/${experienceId}/duplicate`, {
        method: "POST",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/experiences"] });
    },
  });

  const filteredExperiences = experiences.filter((exp: Experience) => {
    const matchesSearch = exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exp.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || exp.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDuplicateExperience = (experienceId: number) => {
    duplicateExperienceMutation.mutate(experienceId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-green-800">Festival NATUR</h1>
              <Badge variant="outline" className="text-green-700 border-green-300">
                Plataforma Unificada
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setShowExperienceForm(true)}
                className="gap-2 bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4" />
                Nueva Experiencia
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="explore" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="explore">Explorar Experiencias</TabsTrigger>
            <TabsTrigger value="companies">Empresas</TabsTrigger>
            <TabsTrigger value="manage">Mis Experiencias</TabsTrigger>
          </TabsList>

          {/* Explore Experiences Tab */}
          <TabsContent value="explore" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar experiencias..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("all")}
                  size="sm"
                >
                  Todas
                </Button>
                <Button
                  variant={selectedCategory === "ecoturismo" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("ecoturismo")}
                  size="sm"
                >
                  Ecoturismo
                </Button>
                <Button
                  variant={selectedCategory === "cultura" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("cultura")}
                  size="sm"
                >
                  Cultura
                </Button>
                <Button
                  variant={selectedCategory === "aventura" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("aventura")}
                  size="sm"
                >
                  Aventura
                </Button>
              </div>
            </div>

            {/* Experience Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExperiences.map((experience: Experience) => (
                <Card key={experience.id} className="group hover:shadow-lg transition-shadow">
                  <div className="relative overflow-hidden rounded-t-lg bg-gray-200 h-48">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-semibold text-lg">{experience.title}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">4.8 (24 reseñas)</span>
                      </div>
                    </div>
                    <Badge className="absolute top-4 right-4 bg-green-600">
                      {experience.type}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {experience.description || "Experiencia única que conecta con la naturaleza y las tradiciones locales."}
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
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="flex-1">
                        Ver Detalles
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDuplicateExperience(experience.id)}
                        disabled={duplicateExperienceMutation.isPending}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Companies Tab */}
          <TabsContent value="companies" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company: Company) => (
                <Card key={company.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{company.companyName}</CardTitle>
                        <p className="text-sm text-gray-500">{company.businessType}</p>
                      </div>
                      {company.isVerified && (
                        <Badge variant="secondary" className="text-green-700 bg-green-100">
                          Verificado
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {company.description || "Empresa comprometida con el turismo sostenible y responsable."}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{company.city}, {company.department}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span>{company.rating}/5 ({company.totalReviews} reseñas)</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="flex-1">
                        Ver Perfil
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Manage Experiences Tab */}
          <TabsContent value="manage" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Mis Experiencias</h2>
              <Button
                onClick={() => setShowExperienceForm(true)}
                className="gap-2 bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4" />
                Nueva Experiencia
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userExperiences.map((experience: Experience) => (
                <Card key={experience.id} className="group">
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
                      {experience.description || "Descripción de la experiencia..."}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit3 className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDuplicateExperience(experience.id)}
                        disabled={duplicateExperienceMutation.isPending}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Experience Form Modal */}
      <Sheet open={showExperienceForm} onOpenChange={setShowExperienceForm}>
        <SheetContent className="w-full max-w-4xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Crear Nueva Experiencia</SheetTitle>
            <SheetDescription>
              Completa la información para crear tu experiencia turística sostenible.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <ExperienceForm
              onClose={() => {
                setShowExperienceForm(false);
                queryClient.invalidateQueries({ queryKey: ["/api/experiences"] });
              }}
            />
          </div>
        </SheetContent>
      </Sheet>


    </div>
  );
}