import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, Building2, MapPin, MessageCircle, Users, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { apiRequest } from "@/lib/queryClient";

export default function RedPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const queryClient = useQueryClient();

  // Fetch all companies
  const { data: allCompanies = [], isLoading: companiesLoading } = useQuery({
    queryKey: ['/api/users/companies'],
    staleTime: 5 * 60 * 1000,
  }) as { data: any[]; isLoading: boolean };

  // Create conversation mutation
  const createConversationMutation = useMutation({
    mutationFn: async (receiverId: number) => {
      return apiRequest('/api/conversations', {
        method: 'POST',
        body: JSON.stringify({ receiverId }),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/conversations'] });
    }
  });

  const handleSendMessage = (userId: number) => {
    createConversationMutation.mutate(userId);
  };

  // Filter companies based on search and category
  const filteredCompanies = allCompanies.filter((company: any) => {
    const matchesSearch = searchQuery === "" || 
      company.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.role?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || 
      company.role?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      company.businessType?.toLowerCase().includes(selectedCategory.toLowerCase());
    
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: "all", label: "Todas" },
    { id: "agencias", label: "Agencias" },
    { id: "alojamientos", label: "Alojamientos" },
    { id: "gastronomía", label: "Gastronomía" },
    { id: "ong", label: "ONGs" },
    { id: "tecnología", label: "Tecnología" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900 p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6">
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardContent className="p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Red de Empresas</h1>
                <p className="text-white/70">Conecta con otras empresas de turismo sostenible</p>
              </div>
              
              <div className="flex items-center gap-2 text-white/60">
                <Users className="w-5 h-5" />
                <span>{filteredCompanies.length} empresas</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <Card className="bg-white/5 backdrop-blur-xl border-white/10">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <Input
                  placeholder="Buscar empresas por nombre, tipo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pl-10"
                  data-testid="input-search-network"
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="w-4 h-4 text-white/60" />
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    size="sm"
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={selectedCategory === category.id 
                      ? "bg-green-600 text-white" 
                      : "bg-white/10 border-white/20 text-white/80 hover:bg-white/20"
                    }
                    data-testid={`filter-${category.id}`}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {companiesLoading ? (
          // Loading skeleton
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardContent className="p-4">
                <div className="animate-pulse">
                  <div className="w-12 h-12 bg-white/20 rounded-full mb-3"></div>
                  <div className="h-4 bg-white/20 rounded mb-2"></div>
                  <div className="h-3 bg-white/20 rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : filteredCompanies.length === 0 ? (
          <div className="col-span-full">
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardContent className="p-8 text-center">
                <Building2 className="w-12 h-12 text-white/40 mx-auto mb-4" />
                <h3 className="text-white/80 text-lg mb-2">No se encontraron empresas</h3>
                <p className="text-white/60">Intenta cambiar los filtros de búsqueda</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          filteredCompanies.map((company: any) => (
            <Card key={company.id} className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300 group">
              <CardContent className="p-4" data-testid={`company-card-${company.id}`}>
                <div className="flex items-start gap-3 mb-4">
                  <Avatar className="w-12 h-12 border-2 border-green-400/30">
                    <AvatarImage src={company.profileImage} />
                    <AvatarFallback className="bg-green-600/20 text-green-400">
                      {company.companyName?.charAt(0) || company.firstName?.charAt(0) || 'E'}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold truncate" data-testid={`company-name-${company.id}`}>
                      {company.companyName || `${company.firstName} ${company.lastName}`}
                    </h3>
                    <p className="text-white/70 text-sm truncate">{company.role}</p>
                    {company.city && (
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-green-400" />
                        <span className="text-white/60 text-xs">{company.city}, {company.country}</span>
                      </div>
                    )}
                  </div>
                </div>

                {company.businessType && (
                  <Badge className="bg-green-600/20 text-green-300 border-green-500/30 mb-3">
                    {company.businessType}
                  </Badge>
                )}

                {company.description && (
                  <p className="text-white/70 text-sm mb-4 line-clamp-2">{company.description}</p>
                )}

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={() => window.open(`/profile/${company.id}`, '_blank')}
                    data-testid={`button-view-profile-${company.id}`}
                  >
                    Ver Perfil
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-green-600/80 hover:bg-green-600 text-white"
                    onClick={() => handleSendMessage(company.id)}
                    disabled={createConversationMutation.isPending}
                    data-testid={`button-message-${company.id}`}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}