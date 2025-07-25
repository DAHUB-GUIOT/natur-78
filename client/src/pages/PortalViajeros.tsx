import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { 
  Search, User, Bell, MessageCircle, Heart, Filter, MapPin, 
  Star, Calendar, Clock, Users, DollarSign, Camera, Share2,
  BookOpen, Compass, Mountain, Waves, TreePine, Building,
  Utensils, Car, Plane, Hotel, ShoppingBag, LogOut, Settings, Plus
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
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { InteractiveMap } from "@/components/dashboard/InteractiveMap";
import { MessageCenter } from "@/components/messaging/MessageCenter";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Experience {
  id: number;
  title: string;
  description: string;
  adultPricePvp: string;
  duration: string;
  type: string;
  status: string;
  isActive: boolean;
  userId: number;
  createdAt: string;
}

export default function PortalViajeros() {
  const [activeSection, setActiveSection] = useState("mapa");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingGuests, setBookingGuests] = useState("1");
  const [chatReceiverId, setChatReceiverId] = useState<number | null>(null);

  // Sample experiences for the map
  const sampleExperiences = [
    {
      id: 1,
      title: "Caminata Ecológica en el Cocuy",
      description: "Explora los picos nevados y lagunas cristalinas del Parque Nacional Natural El Cocuy",
      adultPricePvp: "120000",
      duration: "3 días",
      type: "aventura",
      status: "approved",
      isActive: true,
      userId: 1,
      createdAt: "2025-01-25",
      location: { lat: 6.3910, lng: -72.3474 }
    },
    {
      id: 2,
      title: "Avistamiento de Ballenas en Nuquí",
      description: "Observa ballenas jorobadas en su migración natural por el Pacífico colombiano",
      adultPricePvp: "180000",
      duration: "1 día",
      type: "naturaleza",
      status: "approved",
      isActive: true,
      userId: 2,
      createdAt: "2025-01-25",
      location: { lat: 5.7069, lng: -77.2719 }
    },
    {
      id: 3,
      title: "Tour Gastronómico en Cartagena",
      description: "Descubre los sabores tradicionales de la cocina caribeña en el casco histórico",
      adultPricePvp: "85000",
      duration: "4 horas",
      type: "gastronomia",
      status: "approved",
      isActive: true,
      userId: 3,
      createdAt: "2025-01-25",
      location: { lat: 10.3932, lng: -75.4832 }
    }
  ];

  // Fetch experiences from API and combine with samples
  const { data: apiExperiences = [], isLoading } = useQuery<Experience[]>({
    queryKey: ["/api/experiences"],
  });

  // Fetch current user
  const { data: currentUser } = useQuery<{ user: { id: number; email: string } }>({
    queryKey: ['/api/auth/me'],
    retry: false,
  });

  const experiences = [...sampleExperiences, ...apiExperiences];

  const sidebarItems = [
    { id: "mapa", label: "Mapa", icon: MapPin },
    { id: "experiencias", label: "Experiencias", icon: Compass },
    { id: "favoritos", label: "Favoritos", icon: Heart },
    { id: "reservas", label: "Reservas", icon: Calendar },
    { id: "mensajes", label: "Mensajes", icon: MessageCircle },
  ];

  const categories = [
    "todos", "aventura", "naturaleza", "cultura", "gastronomia", 
    "acuaticas", "transporte", "hospedaje"
  ];

  const filteredExperiences = experiences.filter((exp: Experience) => {
    const matchesCategory = selectedCategory === "todos" || 
                           exp.type?.toLowerCase() === selectedCategory;
    return matchesCategory && exp.status === "approved" && exp.isActive;
  });

  const handleBookExperience = (experience: Experience) => {
    setSelectedExperience(experience);
    setShowBookingModal(true);
  };

  const handleChatWithHost = (experience: Experience) => {
    setChatReceiverId(experience.userId);
    setSelectedExperience(experience);
    setShowChat(true);
  };

  const renderExperienceCard = (experience: Experience) => (
    <Card key={experience.id} className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 hover:bg-gray-800/50 transition-all duration-200 cursor-pointer group">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-green-400 transition-colors">
              {experience.title}
            </h3>
            <p className="text-gray-300 text-xs line-clamp-2 mb-2">
              {experience.description}
            </p>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3 text-xs text-gray-300">
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              <span>{experience.duration || "Flexible"}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              <span>Colombia</span>
            </div>
          </div>
          <div className="flex items-center">
            <Star className="w-3 h-3 text-yellow-400 mr-1" />
            <span className="text-xs text-gray-300">4.8 (24)</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-sm">
            ${experience.adultPricePvp || "Por consultar"}
            <span className="text-gray-400 text-xs font-normal ml-1">por persona</span>
          </div>
          <div className="flex space-x-1">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => handleChatWithHost(experience)}
              className="border-gray-600/50 text-white hover:bg-gray-700/50 text-xs h-7 px-2"
            >
              <MessageCircle className="w-3 h-3 mr-1" />
              Chat
            </Button>
            <Button 
              size="sm" 
              onClick={() => handleBookExperience(experience)}
              className="bg-green-600/80 hover:bg-green-600 text-white text-xs h-7 px-2"
            >
              <ShoppingBag className="w-3 h-3 mr-1" />
              Comprar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );



  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* Full-screen map as background with experience markers */}
      <InteractiveMap 
        experiences={filteredExperiences}
        selectedCategory={selectedCategory}
        showMarkers={true}
        onMarkerClick={(experience) => {
          console.log('Experience clicked:', experience);
        }}
      />
      
      {/* Top Navigation */}
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
          
          
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative text-white hover:bg-white/20">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">2</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="relative text-white hover:bg-white/20">
              <MessageCircle className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center">1</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 p-2 text-white hover:bg-white/20">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg" />
                    <AvatarFallback>V</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">Viajero</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Mi Perfil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Heart className="w-4 h-4 mr-2" />
                  Favoritos
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Calendar className="w-4 h-4 mr-2" />
                  Mis Reservas
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Configuración
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



      {/* Compact glassmorphism sidebar for travelers */}
      <div className="absolute top-24 left-4 z-50 w-52 backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 rounded-xl shadow-2xl">
        <div className="p-3 border-b border-gray-600/30">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-green-600/80 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm">
              <span className="text-white font-bold text-xs">M</span>
            </div>
            <span className="text-lg font-bold text-white tracking-wide">Marketplace</span>
          </div>
          <p className="text-gray-300 text-xs mt-1">Experiencias Sostenibles</p>
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
              <AvatarFallback className="bg-green-600/80 text-white text-xs">V</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-xs truncate">Viajero</p>
              <p className="text-gray-300 text-xs">Explorador</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content overlay based on active section */}
      {activeSection === "mapa" && (
        <div className="absolute top-24 right-6 bg-gray-900/80 backdrop-blur-md rounded-lg p-4 border border-gray-600/30 z-40 max-w-sm">
          <h3 className="text-white text-lg font-semibold mb-3">Experiencias en el Mapa</h3>
          <div className="space-y-2 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-300">{filteredExperiences.length} experiencias disponibles</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-gray-300">Proveedores verificados</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-xs text-gray-300">Promociones especiales</span>
            </div>
          </div>
          
          {/* Category Filters for map */}
          <div className="mb-4">
            <h4 className="text-white text-sm font-medium mb-2">Filtrar por categoría:</h4>
            <div className="flex flex-wrap gap-1">
              {categories.slice(0, 4).map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`text-xs h-6 px-2 ${
                    selectedCategory === category
                      ? "bg-green-600/80 text-white border-green-500/50"
                      : "border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:text-white"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          
          <p className="text-gray-400 text-xs">
            Haz clic en los marcadores del mapa para ver detalles de cada experiencia
          </p>
        </div>
      )}

      {activeSection === "experiencias" && (
        <div className="absolute top-24 left-60 right-4 bottom-4 z-40 backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 rounded-xl shadow-2xl overflow-hidden">
          <div className="h-full overflow-y-auto p-4">
            <div className="space-y-4">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`text-xs h-7 ${
                      selectedCategory === category
                        ? "bg-green-600/80 text-white border-green-500/50"
                        : "border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:text-white"
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1')}
                  </Button>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-white">{filteredExperiences.length}</div>
                    <div className="text-xs text-gray-300">Experiencias</div>
                  </CardContent>
                </Card>
                <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-white">156</div>
                    <div className="text-xs text-gray-300">Proveedores</div>
                  </CardContent>
                </Card>
                <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-white">4.8</div>
                    <div className="text-xs text-gray-300">Calificación</div>
                  </CardContent>
                </Card>
                <Card className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30">
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-white">$85</div>
                    <div className="text-xs text-gray-300">Precio Prom.</div>
                  </CardContent>
                </Card>
              </div>

              {/* Experience Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {isLoading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 animate-pulse">
                      <CardContent className="p-4">
                        <div className="h-4 bg-gray-700/50 rounded mb-2"></div>
                        <div className="h-3 bg-gray-700/50 rounded mb-3"></div>
                        <div className="flex justify-between">
                          <div className="h-3 bg-gray-700/50 rounded w-16"></div>
                          <div className="h-3 bg-gray-700/50 rounded w-20"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : filteredExperiences.length > 0 ? (
                  filteredExperiences.map(renderExperienceCard)
                ) : (
                  <div className="col-span-full text-center py-12">
                    <Compass className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">No se encontraron experiencias en esta categoría</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === "favoritos" && (
        <div className="absolute top-24 left-60 right-4 bottom-4 z-40 backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 rounded-xl shadow-2xl overflow-hidden">
          <div className="h-full overflow-y-auto p-4">
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Experiencias Favoritas</h2>
              <p className="text-gray-400 mb-4">Aún no tienes experiencias favoritas</p>
              <p className="text-gray-500 text-sm mb-6">Explora el mapa y guarda las experiencias que más te gusten haciendo clic en el corazón</p>
              <Button 
                onClick={() => setActiveSection("experiencias")}
                className="bg-green-600/80 hover:bg-green-600 text-white"
              >
                Explorar Experiencias
              </Button>
            </div>
          </div>
        </div>
      )}

      {activeSection === "reservas" && (
        <div className="absolute top-24 left-60 right-4 bottom-4 z-40 backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 rounded-xl shadow-2xl overflow-hidden">
          <div className="h-full overflow-y-auto p-4">
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Mis Reservas</h2>
              <p className="text-gray-400 mb-4">No tienes reservas activas</p>
              <p className="text-gray-500 text-sm mb-6">Cuando realices una reserva, aparecerá aquí con todos los detalles de tu experiencia</p>
              <Button 
                onClick={() => setActiveSection("experiencias")}
                className="bg-green-600/80 hover:bg-green-600 text-white"
              >
                Reservar Experiencia
              </Button>
            </div>
          </div>
        </div>
      )}

      {activeSection === "mensajes" && (
        <div className="absolute top-24 left-60 right-4 bottom-4 z-40 backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 rounded-xl shadow-2xl overflow-hidden">
          <div className="h-full overflow-y-auto p-4">
            <h2 className="text-xl font-bold text-white mb-4">Mensajes</h2>
            {currentUser?.user?.id ? (
              <MessageCenter currentUserId={currentUser.user.id} />
            ) : (
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">Inicia sesión para ver tus mensajes</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="bg-gray-900 border border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Reservar Experiencia</DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedExperience?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="date" className="text-white">Fecha</Label>
              <Input
                id="date"
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="guests" className="text-white">Número de personas</Label>
              <Input
                id="guests"
                type="number"
                min="1"
                value={bookingGuests}
                onChange={(e) => setBookingGuests(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Precio por persona</span>
                <span className="text-white">${selectedExperience?.adultPricePvp || "0"}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-white">Total</span>
                <span className="text-green-400">
                  ${(parseInt(selectedExperience?.adultPricePvp || "0") * parseInt(bookingGuests)).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowBookingModal(false)}
                className="flex-1 border-gray-700 text-white hover:bg-gray-800"
              >
                Cancelar
              </Button>
              <Button 
                onClick={() => {
                  alert(`¡Reserva confirmada para ${selectedExperience?.title}!`);
                  setShowBookingModal(false);
                }}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                Confirmar Compra
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Chat Modal */}
      {showChat && chatReceiverId && (
        <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-gray-900 border border-gray-700 rounded-lg shadow-2xl z-50">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h3 className="text-white font-semibold">Chat con proveedor</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowChat(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </Button>
          </div>
          <div className="h-[calc(100%-64px)] overflow-hidden">
            {currentUser?.user?.id ? (
              <MessageCenter 
                currentUserId={currentUser.user.id} 
                preSelectedUserId={chatReceiverId}
                compact={true}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400">Inicia sesión para chatear</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Action Button - Upload Experience */}
      <Link href="/portal-empresas">
        <Button
          className="fixed bottom-8 right-8 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold shadow-2xl z-40"
          size="lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Subir Experiencia
        </Button>
      </Link>
      
    </div>
  );
}