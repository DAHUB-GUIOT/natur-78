
import React from 'react';
import { Phone, Mail, Instagram } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Reservation() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-[#222408] px-4 sm:px-6 md:px-8 lg:px-16 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* Left Column */}
        <div className="space-y-6 sm:space-y-8">
          <div>
            <h1 className="font-gasoek text-[#FCF8EE] text-3xl sm:text-4xl md:text-5xl lg:text-7xl leading-tight uppercase font-thin">
              RESERVA TU ESPACIO
            </h1>
            <p className="text-[#FCF8EE] mt-4 sm:mt-6 text-base sm:text-lg">
              Muchas gracias por ser parte de este gran movimiento, pronto tendrás más noticias.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-gasoek text-[#CEDD9F] text-lg sm:text-xl tracking-[2px] uppercase font-thin">
              ¿TIENES DUDAS? PONTE EN CONTACTO CON NOSOTROS
            </h2>
            <div className="flex gap-3 sm:gap-4">
              {[
                { href: "tel:+1234567890", icon: <Phone className="w-5 h-5 sm:w-6 sm:h-6" /> },
                { href: "mailto:info@festivalnatur.com", icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" /> },
                { href: "https://instagram.com/festivalnatur", icon: <Instagram className="w-5 h-5 sm:w-6 sm:h-6" /> }
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="bg-[#CEDD9F] p-2 sm:p-3 rounded-lg hover:bg-[#cad95e] transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[#CEDD9F] uppercase text-xs sm:text-sm">UNA INICIATIVA DE</p>
            <div className="text-white text-xl sm:text-2xl mt-2 font-bold">tripCol</div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="text-right">
            <div className="text-[#FCF8EE] text-xs sm:text-sm uppercase">FESTIVAL</div>
            <div className="font-gasoek text-[#FCF8EE] text-3xl sm:text-4xl md:text-5xl uppercase">NATUR</div>
            <div className="text-[#FCF8EE] text-xs sm:text-sm mt-1">22 Y 23 DE NOVIEMBRE / 2025</div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="text" placeholder="Tu nombre*" className="bg-[#FCF8EE] border-none w-full" required />
            <Input type="email" placeholder="Tu email*" className="bg-[#FCF8EE] border-none w-full" required />
            <Input type="tel" placeholder="Tu teléfono*" className="bg-[#FCF8EE] border-none w-full" required />
            <Input type="text" placeholder="Tu empresa*" className="bg-[#FCF8EE] border-none w-full" required />
            
            <div className="flex items-start gap-2">
              <input type="checkbox" id="terms" className="mt-1" required />
              <Label htmlFor="terms" className="text-[#FCF8EE] text-xs sm:text-sm">
                Autorizo el uso de mi información de acuerdo a las políticas de privacidad.
              </Label>
            </div>
            
            <Button type="submit" className="w-full bg-[#cad95e] text-[#222408] hover:bg-[#CEDD9F] text-base sm:text-lg font-medium py-4 sm:py-6">
              ENVIAR
            </Button>
          </form>
        </div>
      </div>

      <div className="text-[#cad95e] text-center text-lg sm:text-xl md:text-2xl mt-12 sm:mt-16 font-gasoek tracking-wide uppercase">
        SOMOS UN MOVIMIENTO, UNA FIESTA, UNA REVOLUCIÓN.
      </div>
    </div>
  );
}
