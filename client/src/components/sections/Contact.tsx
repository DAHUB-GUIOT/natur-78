import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone, Twitter } from 'lucide-react';
export function Contact() {
  const socialLinks = [{
    icon: <Phone className="w-7 h-7 sm:w-8 sm:h-8" />,
    href: "tel:+573001234567",
    label: "Phone"
  }, {
    icon: <Mail className="w-7 h-7 sm:w-8 sm:h-8" />,
    href: "mailto:info@festivalnatur.com",
    label: "Email"
  }, {
    icon: <Instagram className="w-7 h-7 sm:w-8 sm:h-8" />,
    href: "#",
    label: "Instagram"
  }, {
    icon: <Facebook className="w-7 h-7 sm:w-8 sm:h-8" />,
    href: "#",
    label: "Facebook"
  }];
  return <section className="bg-[#191C0F] flex w-full flex-col items-center justify-center px-4 sm:px-6 md:px-12 py-12 md:py-16 lg:py-20 max-md:max-w-full font-jakarta">
      <div className="flex w-full max-w-4xl flex-col items-stretch">
        <h2 style={{
        letterSpacing: 1.5
      }} className="font-gasoek text-[#CEDD9F] text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal leading-tight uppercase tracking-wide mb-6 sm:mb-8 md:mb-10">
          Contáctanos
        </h2>

        <div className="backdrop-blur-sm bg-white/5 border border-[#CEDD9F]/20 rounded-xl p-6 sm:p-8 md:p-10 mb-6">
          <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
            {socialLinks.map((link, index) => <a key={index} href={link.href} aria-label={link.label} className="backdrop-blur-sm bg-white/5 border border-[#CEDD9F]/30 rounded-full p-3 sm:p-4 text-[#CEDD9F] hover:text-[#EDFF60] hover:border-[#EDFF60]/60 hover:scale-110 transform transition-all duration-300">
                {link.icon}
              </a>)}
          </div>
        </div>

        <div className="backdrop-blur-sm bg-white/5 border border-[#EDFF60]/20 rounded-xl p-4 sm:p-6 text-center">
          <p className="text-[#FCF8EE] text-xs sm:text-sm md:text-base font-jakarta mb-2">Una iniciativa de</p>
          <div className="text-[#EDFF60] text-lg sm:text-xl md:text-2xl font-bold font-jakarta">tripCol</div>
        </div>
      </div>
    </section>;
}