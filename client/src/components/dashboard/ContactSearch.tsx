import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter,
  MapPin,
  Briefcase,
  MessageCircle,
  UserPlus,
  ExternalLink,
  Star,
  Building
} from "lucide-react";

// Mock data para contactos
const contacts = [
  {
    id: 1,
    name: "María González",
    title: "CEO & Fundadora",
    company: "EcoTours Colombia",
    category: "startup",
    location: "Bogotá, Colombia",
    bio: "Emprendedora apasionada por el turismo sostenible. 10+ años de experiencia en ecoturismo.",
    skills: ["Ecoturismo", "Sostenibilidad", "Liderazgo"],
    connections: 234,
    verified: true,
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 2,
    name: "Carlos Rivera",
    title: "Managing Partner",
    company: "Green Impact Fund",
    category: "investor",
    location: "Medellín, Colombia",
    bio: "Inversionista especializado en startups de impacto ambiental. MBA Stanford.",
    skills: ["Venture Capital", "ESG", "Fintech"],
    connections: 892,
    verified: true,
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 3,
    name: "Ana Morales",
    title: "Conservation Director",
    company: "Amazon Regenerative",
    category: "ecosystem",
    location: "Manaus, Brasil",
    bio: "Bióloga marina especializada en conservación amazónica. PhD en Ecología.",
    skills: ["Conservación", "Biología Marina", "Investigación"],
    connections: 567,
    verified: true,
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 4,
    name: "Diego Herrera",
    title: "Mentor & Advisor",
    company: "Tech for Good",
    category: "mentor",
    location: "Lima, Perú",
    bio: "Mentor de startups tech. Ex-CTO de 3 unicornios latinoamericanos.",
    skills: ["Mentoring", "Technology", "Scaling"],
    connections: 1205,
    verified: true,
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 5,
    name: "Sofia Vargas",
    title: "Community Manager",
    company: "Digital Nomad Hub",
    category: "digital-nomad",
    location: "Remote",
    bio: "Nómada digital construyendo comunidades remotas en Latinoamérica.",
    skills: ["Community Building", "Remote Work", "Marketing"],
    connections: 445,
    verified: false,
    avatar: "/api/placeholder/40/40"
  }
];

export const ContactSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || contact.category === categoryFilter;
    const matchesLocation = locationFilter === 'all' || contact.location.includes(locationFilter);
    
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
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
                  <Button size="sm" variant="outline">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Mensaje
                  </Button>
                  <Button size="sm" variant="outline">
                    <UserPlus className="h-3 w-3 mr-1" />
                    Conectar
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