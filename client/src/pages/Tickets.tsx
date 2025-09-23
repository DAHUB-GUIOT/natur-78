import { useState } from 'react';
import { Link } from 'wouter';
import { Check, Star, Users, Calendar, MapPin, Music, Coffee, Leaf, Zap } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { HeaderButtons } from '@/components/layout/HeaderButtons';


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
    <AppShell 
      header={<HeaderButtons showPortalButtons={true} />}
      className="bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden"
    >

      {/* Background Elements - Fixed positioning to prevent reflow */}
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070')] bg-cover bg-center opacity-10 -z-10"></div>
      <div className="fixed inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent -z-10"></div>
      
      {/* Organic floating shapes - Reduced animation on mobile for performance */}
      <div className="fixed top-16 left-4 md:top-20 md:left-10 w-20 h-20 md:w-32 md:h-32 bg-green-400/10 rounded-full blur-xl motion-safe:animate-pulse -z-20"></div>
      <div className="fixed top-32 right-8 md:top-40 md:right-20 w-16 h-16 md:w-24 md:h-24 bg-yellow-400/15 rounded-full blur-lg motion-safe:animate-pulse delay-1000 -z-20"></div>
      <div className="fixed bottom-16 left-1/4 w-24 h-24 md:w-40 md:h-40 bg-emerald-400/8 rounded-full blur-2xl motion-safe:animate-pulse delay-2000 -z-20"></div>

      {/* Main Content - Now properly contained within AppShell */}
      <div className="relative z-10 py-8 md:py-12">
        {/* Header - Fixed aspect ratio to prevent shifts */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-yellow-400 mb-6 font-gasoek uppercase tracking-wide leading-tight">
            🎟️ Paquetes NATUR
          </h1>
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 max-w-4xl mx-auto">
            <h2 className="text-lg sm:text-xl md:text-2xl text-white mb-4 font-medium">
              Festival de Turismo Sostenible
            </h2>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed">
              NATUR es una plataforma para vivir, aprender y transformar desde el turismo consciente.
            </p>
          </div>
        </div>

        {/* Tickets Grid - Stable layout with min-height */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {ticketTypes.map((ticket) => (
            <div
              key={ticket.id}
              className={`relative group cursor-pointer transition-all duration-300 md:hover:scale-[1.02] ${
                selectedTicket === ticket.id ? 'md:scale-[1.02]' : ''
              } min-h-[500px]`}
              onClick={() => setSelectedTicket(ticket.id)}
              data-testid={`ticket-${ticket.id}`}
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
                border-2 ${ticket.borderColor} rounded-3xl p-6 sm:p-8 h-full
                shadow-2xl ${ticket.glowColor} md:hover:shadow-3xl
                transition-all duration-300 md:group-hover:border-opacity-60
                ${selectedTicket === ticket.id ? 'ring-2 ring-yellow-400/50' : ''}
                flex flex-col
              `}>
                {/* Ticket Header - Fixed height for consistency */}
                <div className="text-center mb-6 sm:mb-8 flex-shrink-0">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-gasoek uppercase tracking-wide leading-tight">
                    {ticket.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    {ticket.originalPrice && (
                      <span className="text-white/50 line-through text-base sm:text-lg">
                        {ticket.originalPrice}
                      </span>
                    )}
                    <span className={`text-3xl sm:text-4xl font-bold ${
                      ticket.id === 'vive' ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {ticket.price}
                    </span>
                    {ticket.price !== 'Gratis' && (
                      <span className="text-white/70 text-sm">COP</span>
                    )}
                  </div>
                </div>

                {/* Features List - Flexible content area */}
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-1">
                  {ticket.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 text-white/90">
                      <div className={`p-2 rounded-lg flex-shrink-0 ${
                        ticket.id === 'vive' ? 'bg-green-400/20' : 'bg-yellow-400/20'
                      }`}>
                        <feature.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <span className="font-medium text-sm sm:text-base">{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button - Fixed at bottom */}
                <button className={`
                  w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-base sm:text-lg uppercase tracking-wide
                  transition-all duration-300 md:hover:scale-105 touch-manipulation min-h-[48px]
                  ${ticket.id === 'vive' 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-black md:hover:from-green-300 md:hover:to-emerald-400 shadow-lg md:hover:shadow-green-400/30' 
                    : 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black md:hover:from-yellow-300 md:hover:to-amber-400 shadow-lg md:hover:shadow-yellow-400/30'
                  } flex-shrink-0
                `}
                  data-testid={`button-${ticket.id}-cta`}
                >
                  {ticket.price === 'Gratis' ? 'Registrarse Gratis' : 'Comprar Ticket'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info - Stable layout */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 text-white/80">
              <div className="flex flex-col items-center py-4" data-testid="info-fechas">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 mb-2" />
                <h4 className="font-bold mb-1 text-sm sm:text-base">Fechas</h4>
                <p className="text-xs sm:text-sm">15-17 Marzo, 2025</p>
              </div>
              <div className="flex flex-col items-center py-4" data-testid="info-ubicacion">
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mb-2" />
                <h4 className="font-bold mb-1 text-sm sm:text-base">Ubicación</h4>
                <p className="text-xs sm:text-sm">Centro de Felicidad, Chapinero</p>
              </div>
              <div className="flex flex-col items-center py-4" data-testid="info-capacidad">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mb-2" />
                <h4 className="font-bold mb-1 text-sm sm:text-base">Capacidad</h4>
                <p className="text-xs sm:text-sm">Cupos Limitados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Tickets;