import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { 
  Search, 
  Filter,
  MapPin,
  Briefcase,
  MessageCircle,
  User,
  ExternalLink,
  Star,
  Building
} from "lucide-react";

// Remove mock data - will use real data from API

interface ContactSearchProps {
  onChatSelect?: (userId: number) => void;
}

export const ContactSearch = ({ onChatSelect }: ContactSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  // Fetch all companies from API
  const { data: allCompanies = [], isLoading: companiesLoading } = useQuery({
    queryKey: ['/api/companies/map'],
    staleTime: 5 * 60 * 1000,
  }) as { data: any[]; isLoading: boolean };

  // Create or get conversation mutation
  const createConversationMutation = useMutation({
    mutationFn: async (receiverId: number) => {
      return apiRequest('/api/conversations', {
        method: 'POST',
        body: JSON.stringify({ receiverId }),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: (conversation, receiverId) => {
      queryClient.invalidateQueries({ queryKey: ['/api/conversations'] });
      if (onChatSelect) {
        onChatSelect(receiverId);
      }
    }
  });

  const handleViewProfile = (contactId: number) => {
    setLocation(`/profile/${contactId}`);
  };

  const handleSendMessage = (contactId: number) => {
    createConversationMutation.mutate(contactId);
  };

  // Filter companies based on search and filters
  const filteredContacts = allCompanies.filter((company: any) => {
    const fullName = `${company.firstName || ''} ${company.lastName || ''}`.trim();
    const companyName = company.companyName || '';
    const location = `${company.city || ''}, ${company.country || ''}`;
    
    const matchesSearch = searchQuery === "" ||
      fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.companyCategory?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.companyDescription?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || 
      company.companyCategory?.toLowerCase().includes(categoryFilter.toLowerCase());
    
    const matchesLocation = locationFilter === 'all' || 
      company.city?.toLowerCase().includes(locationFilter.toLowerCase()) ||
      company.country?.toLowerCase().includes(locationFilter.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const getCategoryBadge = (category: string) => {
    const styles: Record<string, string> = {
      startup: "bg-blue-100 text-blue-800",
      investor: "bg-green-100 text-green-800",
      mentor: "bg-purple-100 text-purple-800",
      ecosystem: "bg-emerald-100 text-emerald-800",
      "digital-nomad": "bg-orange-100 text-orange-800"
    };
    return styles[category] || "bg-gray-100 text-gray-800";
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      startup: "Startup",
      investor: "Inversor",
      mentor: "Mentor",
      ecosystem: "Ecosistema",
      "digital-nomad": "Nómada Digital"
    };
    return labels[category] || category;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-sans text-gray-900 mb-2">
          Directorio de Contactos
        </h1>
        <p className="text-gray-600">
          Conecta con profesionales del ecosistema de turismo sostenible
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar por nombre, empresa, habilidades..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              <SelectItem value="startup">Startups</SelectItem>
              <SelectItem value="investor">Inversores</SelectItem>
              <SelectItem value="mentor">Mentores</SelectItem>
              <SelectItem value="ecosystem">Ecosistema</SelectItem>
              <SelectItem value="digital-nomad">Nómadas Digitales</SelectItem>
            </SelectContent>
          </Select>

          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <MapPin className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Ubicación" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las ubicaciones</SelectItem>
              <SelectItem value="Colombia">Colombia</SelectItem>
              <SelectItem value="Brasil">Brasil</SelectItem>
              <SelectItem value="Perú">Perú</SelectItem>
              <SelectItem value="Remote">Remoto</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4 text-sm text-gray-600">
        {filteredContacts.length} contactos encontrados
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact) => (
          <Card key={contact.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback>
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-1">
                      <CardTitle className="text-base">{contact.name}</CardTitle>
                      {contact.verified && (
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{contact.title}</p>
                  </div>
                </div>
                <Badge className={getCategoryBadge(contact.category)}>
                  {getCategoryLabel(contact.category)}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center text-sm text-gray-600">
                <Building className="h-4 w-4 mr-2" />
                {contact.company}
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {contact.location}
              </div>

              <p className="text-sm text-gray-700 line-clamp-2">
                {contact.bio}
              </p>

              <div className="flex flex-wrap gap-1">
                {contact.skills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {contact.skills.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{contact.skills.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{contact.connections} conexiones</span>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleViewProfile(contact.id)}
                    data-testid={`button-view-profile-${contact.id}`}
                  >
                    <User className="h-3 w-3 mr-1" />
                    Ver perfil
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleSendMessage(contact.id)}
                    disabled={createConversationMutation.isPending}
                    data-testid={`button-send-message-${contact.id}`}
                  >
                    <MessageCircle className="h-3 w-3 mr-1" />
                    {createConversationMutation.isPending ? 'Enviando...' : 'Enviar mensaje'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};