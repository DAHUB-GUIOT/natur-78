import { useState } from 'react';
import { Link } from 'wouter';
import { Check, Star, Users, Calendar, MapPin, Music, Coffee, Leaf, Zap } from 'lucide-react';

const Tickets = () => {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  const ticketTypes = [
    {
      id: 'vive',
      name: 'VIVE NATUR',
      price: 'Gratis',
      originalPrice: null,
      popular: false,
      color: 'from-green-400/20 to-emerald-600/20',
      borderColor: 'border-green-400/30',
      glowColor: 'shadow-green-400/20',
      features: [
        { icon: Coffee, text: 'Charlas NATUR' },
        { icon: Users, text: 'Rooftop + Zona de Comidas' },
        { icon: Leaf, text: 'Feria de Emprendimientos' },
        { icon: Star, text: 'Zona Chill & Kinder' },
        { icon: MapPin, text: 'Foro Colombia Sostenible' }
      ]
    },
    {
      id: 'pro',
      name: 'NATUR PRO',
      price: '$240.000',
      originalPrice: '$300.000',
      popular: true,
      color: 'from-yellow-400/20 to-amber-600/20',
      borderColor: 'border-yellow-400/40',
      glowColor: 'shadow-yellow-400/30',
      features: [
        { icon: Check, text: 'TODO lo anterior, más:' },
        { icon: Music, text: 'Cartel de Artistas' },
        { icon: Zap, text: 'Talleres Interactivos' },
        { icon: Star, text: 'Rumba & Wellness' },
        { icon: Users, text: 'Zona VIP y Experiencia NATUR' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      
      {/* Organic floating shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-green-400/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-400/15 rounded-full blur-lg animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-emerald-400/8 rounded-full blur-2xl animate-pulse delay-2000"></div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 backdrop-blur-md bg-black/20 border-b border-white/10">
        <Link to="/" className="text-2xl font-bold text-yellow-400 hover:text-yellow-300 transition-colors font-gasoek">
          NATUR
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/portal-empresas" className="text-white/80 hover:text-white transition-colors text-sm uppercase tracking-wide">
            Portal Empresas
          </Link>
          <Link to="/portal-viajeros" className="text-white/80 hover:text-white transition-colors text-sm uppercase tracking-wide">
            Experiencias
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-yellow-400 mb-6 font-gasoek uppercase tracking-wide">
            🎟️ Paquetes NATUR
          </h1>
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl text-white mb-4 font-medium">
              Festival de Turismo Sostenible
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              NATUR es una plataforma para vivir, aprender y transformar desde el turismo consciente.
            </p>
          </div>
        </div>

        {/* Tickets Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {ticketTypes.map((ticket) => (
            <div
              key={ticket.id}
              className={`relative group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                selectedTicket === ticket.id ? 'scale-105' : ''
              }`}
              onClick={() => setSelectedTicket(ticket.id)}
            >
              {/* Popular Badge */}
              {ticket.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg">
                    Más Popular
                  </div>
                </div>
              )}

              <div className={`
                backdrop-blur-xl bg-gradient-to-br ${ticket.color} 
                border-2 ${ticket.borderColor} rounded-3xl p-8 h-full
                shadow-2xl ${ticket.glowColor} hover:shadow-3xl
                transition-all duration-500 group-hover:border-opacity-60
                ${selectedTicket === ticket.id ? 'ring-2 ring-yellow-400/50' : ''}
              `}>
                {/* Ticket Header */}
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-4 font-gasoek uppercase tracking-wide">
                    {ticket.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2">
                    {ticket.originalPrice && (
                      <span className="text-white/50 line-through text-lg">
                        {ticket.originalPrice}
                      </span>
                    )}
                    <span className={`text-4xl font-bold ${
                      ticket.id === 'vive' ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {ticket.price}
                    </span>
                    {ticket.price !== 'Gratis' && (
                      <span className="text-white/70 text-sm">COP</span>
                    )}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {ticket.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 text-white/90">
                      <div className={`p-2 rounded-lg ${
                        ticket.id === 'vive' ? 'bg-green-400/20' : 'bg-yellow-400/20'
                      }`}>
                        <feature.icon className="w-5 h-5" />
                      </div>
                      <span className="font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className={`
                  w-full py-4 px-6 rounded-xl font-bold text-lg uppercase tracking-wide
                  transition-all duration-300 transform hover:scale-105
                  ${ticket.id === 'vive' 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-black hover:from-green-300 hover:to-emerald-400 shadow-lg hover:shadow-green-400/30' 
                    : 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-300 hover:to-amber-400 shadow-lg hover:shadow-yellow-400/30'
                  }
                `}>
                  {ticket.price === 'Gratis' ? 'Registrarse Gratis' : 'Comprar Ticket'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 text-white/80">
              <div className="flex flex-col items-center">
                <Calendar className="w-8 h-8 text-yellow-400 mb-2" />
                <h4 className="font-bold mb-1">Fechas</h4>
                <p className="text-sm">15-17 Marzo, 2025</p>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="w-8 h-8 text-green-400 mb-2" />
                <h4 className="font-bold mb-1">Ubicación</h4>
                <p className="text-sm">Centro de Felicidad, Chapinero</p>
              </div>
              <div className="flex flex-col items-center">
                <Users className="w-8 h-8 text-blue-400 mb-2" />
                <h4 className="font-bold mb-1">Capacidad</h4>
                <p className="text-sm">Cupos Limitados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;