import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Home, 
  Map, 
  Building2, 
  Star, 
  MessageCircle, 
  BarChart3, 
  Settings,
  Search,
  Bell,
  Plus,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Globe,
  Filter,
  MoreVertical,
  Heart,
  Share,
  Bookmark,
  User,
  LogOut,
  Edit,
  Handshake,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InteractiveMap } from "@/components/dashboard/InteractiveMap";
import ExperienceForm from "@/components/dashboard/ExperienceForm";
import ProfileSection from "@/components/dashboard/ProfileSection";
import TwitterProfileSection from "@/components/profile/TwitterProfileSection";
import { MessageCenter } from "@/components/messaging/MessageCenter";
import { WhatsAppChat } from "@/components/messaging/WhatsAppChat";
import { Link } from "wouter";

const PortalEmpresasDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("mapa");
  const [showExperienceForm, setShowExperienceForm] = useState(false);

  // Handle hash fragment navigation for direct messaging access
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'mensajes') {
      setActiveSection('mensajes');
    }
  }, []);

  // Fetch experiences data
  const { data: experiences = [], isLoading: experiencesLoading } = useQuery({
    queryKey: ['/api/experiences'],
    retry: false,
  });

  // Fetch current user data
  const { data: currentUser, isLoading: userLoading, refetch: refetchUser } = useQuery({
    queryKey: ['/api/auth/me'],
    retry: false,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const sidebarItems = [
    { id: "mapa", label: "Mapa", icon: Map },
    { id: "empresas", label: "Contactos", icon: Building2 },
    { id: "experiencias", label: "Experiencias", icon: Star },
    { id: "mensajes", label: "Mensajes", icon: MessageCircle },
    { id: "perfil", label: "Mi Perfil", icon: User },
    { id: "ajustes", label: "Ajustes", icon: Settings },
    ...((currentUser as any)?.user?.role === 'admin' ? [{ id: "admin", label: "Admin Panel", icon: ShieldCheck }] : [])
  ];



  // Fetch companies data from database
  const { data: companiesData = [], isLoading: companiesLoading } = useQuery({
    queryKey: ['/api/companies'],
    retry: false,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todas");

  const categories = [
    { id: "todas", label: "Todas las categorías" },
    { id: "tecnologia", label: "Tecnología" },
    { id: "agencia-viajes", label: "Agencia de Viajes" },
    { id: "organizacion-eventos", label: "Organización de Eventos" }
  ];

  const companies = [
    {
      id: 1,
      name: "DaHub",
      category: "Tecnología",
      categoryId: "tecnologia",
      location: "Bogotá, Colombia",
      rating: 5.0,
      reviews: 127,
      image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg",
      verified: true,
      description: "Empresa de tecnología especializada en diseño y desarrollo de plataformas digitales. Creadores de la plataforma Festival NATUR para conectar emprendedores de turismo sostenible.",
      founder: "Daniel Hurtado",
      website: "festivalnatur.com",
      email: "dahub.tech@gmail.com",
      skills: ["Desarrollo de plataformas", "UX/UI Design", "Tecnología verde", "Sistemas de networking"],
      certifications: ["B Corp Pending", "Sello Ambiental Colombiano", "ISO 14001"]
    },
    {
      id: 2,
      name: "TripCol",
      category: "Agencia de Viajes",
      categoryId: "agencia-viajes",
      location: "Medellín, Colombia",
      rating: 4.8,
      reviews: 89,
      image: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg",
      verified: true,
      description: "Agencia de viajes especializada en turismo sostenible en Colombia. Organizadores del evento Festival NATUR y expertos en experiencias auténticas con comunidades locales.",
      founder: "Equipo TripCol",
      website: "tripcol.tours",
      email: "tripcol.tour@gmail.com",
      skills: ["Organización de eventos", "Turismo comunitario", "Experiencias auténticas", "Guías locales"],
      certifications: ["Certificación en Turismo Responsable", "Sello de Calidad Turística"]
    }
  ];

  // Filter companies based on search and category
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "todas" || company.categoryId === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const renderContent = () => {
    switch (activeSection) {
      case "inicio":
        return (
          <div className="space-y-6">
            {/* Compact Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 hover:bg-gray-800/50 transition-all">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white font-medium">Experiencias Activas</p>
                      <p className="text-xl font-bold text-white">12</p>
                    </div>
                    <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <Star className="w-4 h-4 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 hover:bg-gray-800/50 transition-all">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white font-medium">Reservas del Mes</p>
                      <p className="text-xl font-bold text-white">89</p>
                    </div>
                    <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 hover:bg-gray-800/50 transition-all">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white font-medium">Ingresos</p>
                      <p className="text-xl font-bold text-white">$2.4M</p>
                    </div>
                    <div className="w-8 h-8 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-yellow-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 hover:bg-gray-800/50 transition-all">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white font-medium">Clientes Nuevos</p>
                      <p className="text-xl font-bold text-white">24</p>
                    </div>
                    <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-purple-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">Actividad Reciente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-lg">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white">Nueva reserva para "Tour de Café Sostenible"</p>
                      <p className="text-sm text-gray-300">Hace 2 horas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-lg">
                    <div className="w-10 h-10 bg-green-600/20 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white">Nuevo mensaje de EcoTours Colombia</p>
                      <p className="text-sm text-gray-300">Hace 1 día</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "experiencias":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Mis Experiencias</h2>
              <Button 
                size="sm" 
                onClick={() => setShowExperienceForm(true)}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
              >
                <Plus className="w-3 h-3 mr-1" />
                Crear
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {(experiences as any[]).map((experience: any) => (
                <Card key={experience.id} className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 hover:bg-gray-800/50 transition-all duration-200 overflow-hidden">
                  <div className="relative">
                    <img 
                      src={experience.image} 
                      alt={experience.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-2 right-2 space-y-1">
                      <Button size="sm" variant="secondary" className="w-6 h-6 p-0 bg-gray-700/80 backdrop-blur-md text-white hover:bg-gray-600/80">
                        <Heart className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="secondary" className="w-6 h-6 p-0 bg-gray-700/80 backdrop-blur-md text-white hover:bg-gray-600/80">
                        <Share className="w-3 h-3" />
                      </Button>
                    </div>
                    <Badge className="absolute top-2 left-2 bg-green-600/80 text-white text-xs backdrop-blur-sm">
                      {experience.category}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-3">
                    <div className="space-y-2">
                      <div>
                        <h3 className="font-semibold text-sm text-white mb-1">{experience.title}</h3>
                        <p className="text-gray-200 text-xs line-clamp-2">{experience.subtitle}</p>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-200">
                        <MapPin className="w-3 h-3 mr-1" />
                        {experience.location}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Avatar className="w-4 h-4">
                            <AvatarImage src={experience.hostAvatar} />
                            <AvatarFallback className="bg-green-500 text-white text-xs">{experience.host[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-gray-200 truncate">{experience.host}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs font-medium text-white">{experience.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-1">
                          {experience.tags?.slice(0, 2).map((tag: string) => (
                            <Badge key={tag} className="bg-gray-700/80 text-gray-200 text-xs backdrop-blur-md px-1 py-0">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-white">
                            ${experience.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-1 pt-1">
                        <Link href={`/experiencia/${experience.id}`} className="flex-1">
                          <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white text-xs h-6">Ver</Button>
                        </Link>
                        <Button size="sm" variant="outline" className="border-gray-500/50 text-gray-300 hover:bg-gray-700/50 h-6 w-6 p-0">
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "empresas":
        return (
          <div className="space-y-4">
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Contactos</h2>
                <Badge className="bg-green-600/20 text-green-300 px-3 py-1">
                  {filteredCompanies.length} empresas
                </Badge>
              </div>
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/70" />
                <Input 
                  placeholder="Buscar por nombre, descripción o especialidades..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800/40 border-gray-600/50 text-white placeholder-white/60 backdrop-blur-md"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`text-xs h-8 ${
                      selectedCategory === category.id 
                        ? "bg-green-600 text-white hover:bg-green-700" 
                        : "border-gray-600/50 text-gray-300 hover:bg-gray-700/50"
                    }`}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>
            
            {filteredCompanies.length === 0 ? (
              <div className="text-center py-12">
                <div className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 rounded-lg p-8">
                  <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">No se encontraron empresas</h3>
                  <p className="text-gray-300 text-sm">
                    {searchTerm ? `No hay resultados para "${searchTerm}"` : "No hay empresas en esta categoría"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCompanies.map((company) => (
                  <Card key={company.id} className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 hover:bg-gray-800/50 transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Header with avatar and basic info */}
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-12 h-12 ring-2 ring-green-500/30">
                          <AvatarImage src={company.image} />
                          <AvatarFallback className="bg-green-600/80 text-white text-sm font-bold">{company.name[0]}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-bold text-base text-white">{company.name}</h3>
                            {company.verified && (
                              <Badge className="text-xs bg-green-600 text-white px-2 py-0.5">
                                Verificado ✓
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-sm text-green-300 font-medium">{company.category}</p>
                          <p className="text-xs text-gray-300">Fundador: {company.founder}</p>
                          
                          <div className="flex items-center text-xs text-gray-200 mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {company.location}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-200 leading-relaxed">{company.description}</p>

                      {/* Skills */}
                      <div>
                        <p className="text-xs font-semibold text-white mb-2">Especialidades</p>
                        <div className="flex flex-wrap gap-1">
                          {company.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} className="bg-green-600/20 text-green-300 text-xs px-2 py-0.5 border border-green-500/30">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Rating and contact info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-white">{company.rating}</span>
                          <span className="text-xs text-gray-300">({company.reviews} reseñas)</span>
                        </div>
                        <div className="text-xs text-gray-300">
                          {company.website}
                        </div>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="flex space-x-2 pt-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-gray-600/50 text-gray-300 hover:bg-gray-700/50 text-xs h-8 flex-1 backdrop-blur-sm"
                          onClick={() => window.location.href = `/empresa/${company.id}`}
                        >
                          <User className="w-3 h-3 mr-1" />
                          Ver Perfil
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-green-600/80 hover:bg-green-700/80 text-white text-xs h-8 flex-1 backdrop-blur-sm"
                          onClick={() => {
                            setActiveSection('mensajes');
                            // Store the contact to start a chat with
                            localStorage.setItem('startChatWith', company.id.toString());
                          }}
                        >
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Contactar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      case "mapa":
        return <InteractiveMap />;

      case "mensajes":
        return (
          <div className="h-full">
            <WhatsAppChat 
              currentUserId={(currentUser as any)?.user?.id} 
              onClose={() => setActiveSection('inicio')}
            />
          </div>
        );

      case "ajustes":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Ajustes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
                <CardContent className="p-3">
                  <h3 className="text-sm font-semibold text-white mb-3">Perfil</h3>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start border-gray-600/50 text-white hover:bg-gray-700/50 text-xs h-8 backdrop-blur-sm">
                      <User className="w-3 h-3 mr-2" />
                      Editar perfil
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start border-gray-600/50 text-white hover:bg-gray-700/50 text-xs h-8 backdrop-blur-sm">
                      <Settings className="w-3 h-3 mr-2" />
                      Cambiar contraseña
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
                <CardContent className="p-3">
                  <h3 className="text-sm font-semibold text-white mb-3">Pagos</h3>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start border-gray-600/50 text-white hover:bg-gray-700/50 text-xs h-8 backdrop-blur-sm">
                      <DollarSign className="w-3 h-3 mr-2" />
                      Métodos de pago
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start border-gray-600/50 text-white hover:bg-gray-700/50 text-xs h-8 backdrop-blur-sm">
                      <BarChart3 className="w-3 h-3 mr-2" />
                      Facturación
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
                <CardContent className="p-3">
                  <h3 className="text-sm font-semibold text-white mb-3">Notificaciones</h3>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start border-gray-600/50 text-white hover:bg-gray-700/50 text-xs h-8 backdrop-blur-sm">
                      <Bell className="w-3 h-3 mr-2" />
                      Configurar
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start border-gray-600/50 text-white hover:bg-gray-700/50 text-xs h-8 backdrop-blur-sm">
                      <MessageCircle className="w-3 h-3 mr-2" />
                      Mensajes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Quick Settings */}
            <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
              <CardContent className="p-3">
                <h3 className="text-sm font-semibold text-white mb-3">Configuración Rápida</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-xs text-white">Modo de Disponibilidad</label>
                    <select className="w-full bg-gray-800/50 border border-gray-600/50 text-white text-xs rounded-lg p-2 backdrop-blur-sm">
                      <option>Disponible</option>
                      <option>Ocupado</option>
                      <option>Ausente</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white">Idioma</label>
                    <select className="w-full bg-gray-800/50 border border-gray-600/50 text-white text-xs rounded-lg p-2 backdrop-blur-sm">
                      <option>Español</option>
                      <option>English</option>
                      <option>Português</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "perfil":
        return <TwitterProfileSection />;

      default:
        return <div>Sección no encontrada</div>;
    }
  };

  // Full-screen layout for map, regular layout for other sections
  if (activeSection === "mapa") {
    return (
      <div className="h-screen w-full relative overflow-hidden">
        {/* Full-screen map as background */}
        <InteractiveMap />
        
        {/* Top green bar for map page */}
        <header className="absolute top-0 left-0 right-0 bg-green-600 border-b border-green-700 shadow-lg px-6 py-4 z-40 backdrop-blur-md bg-green-600/95">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <span className="text-xl font-bold text-white tracking-wide">NATUR</span>
              </div>
            </div>
            
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/70" />
                <Input 
                  placeholder="Buscar experiencias, empresas, ubicaciones..." 
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60 backdrop-blur-md"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative text-white hover:bg-white/20">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="relative text-white hover:bg-white/20">
                <MessageCircle className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center">2</span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 p-2 text-white hover:bg-white/20">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">Usuario</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Ajustes
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        
        {/* Compact glassmorphism sidebar for map view */}
        <div className="absolute top-24 left-4 z-50 w-52 backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 rounded-xl shadow-2xl">
          <div className="p-3 border-b border-gray-600/30">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-600/80 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm">
                <span className="text-white font-bold text-xs">N</span>
              </div>
              <span className="text-lg font-bold text-white tracking-wide">NATUR</span>
            </div>
            <p className="text-gray-300 text-xs mt-1">Portal Empresas</p>
          </div>
          
          <nav className="p-2 space-y-0.5">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'admin') {
                      window.location.href = '/admin';
                    } else {
                      setActiveSection(item.id);
                    }
                  }}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    activeSection === item.id 
                      ? 'bg-green-600/30 text-white shadow-lg border border-green-400/30 backdrop-blur-sm' 
                      : 'text-gray-200 hover:bg-gray-700/30 hover:text-white hover:shadow-md'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium text-xs">{item.label}</span>
                </button>
              );
            })}
          </nav>
          
          {/* Compact user profile section */}
          <div className="p-2 border-t border-gray-600/30">
            <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-800/30 backdrop-blur-sm">
              <Avatar className="w-6 h-6 ring-1 ring-gray-600/50">
                <AvatarImage src="/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg" />
                <AvatarFallback className="bg-green-600/80 text-white text-xs">U</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-xs truncate">Usuario</p>
                <p className="text-gray-300 text-xs">Empresa</p>
              </div>
            </div>
          </div>
        </div>


      </div>
    );
  }

  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* Full-screen map as background for all pages */}
      <InteractiveMap />
      
      {/* Top green bar for all pages */}
      <header className="absolute top-0 left-0 right-0 bg-green-600 border-b border-green-700 shadow-lg px-6 py-4 z-40 backdrop-blur-md bg-green-600/95">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <span className="text-xl font-bold text-white tracking-wide">NATUR</span>
              </div>
            </div>
            
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/70" />
                <Input 
                  placeholder="Buscar experiencias, empresas, ubicaciones..." 
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60 backdrop-blur-md"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative text-white hover:bg-white/20">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="relative text-white hover:bg-white/20">
                <MessageCircle className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center">2</span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 p-2 text-white hover:bg-white/20">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">Usuario</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Ajustes
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

      {/* Compact glassmorphism sidebar for all pages */}
      <div className="absolute top-24 left-4 z-50 w-52 backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 rounded-xl shadow-2xl">
        <div className="p-3 border-b border-gray-600/30">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-green-600/80 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm">
              <span className="text-white font-bold text-xs">N</span>
            </div>
            <span className="text-lg font-bold text-white tracking-wide">NATUR</span>
          </div>
          <p className="text-gray-300 text-xs mt-1">Portal Empresas</p>
        </div>
        
        <nav className="p-2 space-y-0.5">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  activeSection === item.id 
                    ? 'bg-green-600/30 text-white shadow-lg border border-green-400/30 backdrop-blur-sm' 
                    : 'text-gray-200 hover:bg-gray-700/30 hover:text-white hover:shadow-md'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium text-xs">{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        {/* Compact user profile section */}
        <div className="p-2 border-t border-gray-600/30">
          <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-800/30 backdrop-blur-sm">
            <Avatar className="w-6 h-6 ring-1 ring-gray-600/50">
              <AvatarImage src="/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg" />
              <AvatarFallback className="bg-green-600/80 text-white text-xs">U</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-xs truncate">Usuario</p>
              <p className="text-gray-300 text-xs">Empresa</p>
            </div>
          </div>
        </div>
      </div>

      {/* Compact main content with glassmorphism background (except for map) */}
      {activeSection !== "mapa" && (
        <main className="absolute top-24 left-60 right-4 bottom-4 z-40 backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 rounded-xl shadow-2xl overflow-hidden">
          <div className="h-full overflow-y-auto p-4">
            {renderContent()}
          </div>
        </main>
      )}

      {/* Floating Action Button - Create Experience */}
      {activeSection !== "mapa" && (
        <Button
          onClick={() => setShowExperienceForm(true)}
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-2xl z-50"
          size="lg"
        >
          <Plus className="w-6 h-6" />
        </Button>
      )}

      {/* Experience Form Modal */}
      {showExperienceForm && (
        <ExperienceForm onClose={() => setShowExperienceForm(false)} />
      )}
    </div>
  );
};

export default PortalEmpresasDashboard;