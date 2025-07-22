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
  return <section className="bg-[#191C0F] flex w-full flex-col items-center justify-center px-3 sm:px-6 md:px-20 py-10 md:py-[93px] max-md:max-w-full font-jakarta">
      <div className="flex w-full max-w-[600px] flex-col items-stretch">
        <h2 style={{
        letterSpacing: 2
      }} className="font-gasoek text-[#CEDD9F] text-center sm:text-4xl md:text-7xl font-normal leading-tight md:leading-none uppercase max-md:max-w-full tracking-[2px] text-3xl">
          Contáctanos
        </h2>

        <div className="flex items-center justify-center gap-6 sm:gap-8 md:gap-10 flex-wrap mt-8 md:mt-[90px] max-md:max-w-full max-md:mr-1.5 max-md:mt-10">
          {socialLinks.map((link, index) => <a key={index} href={link.href} aria-label={link.label} className="text-[#CEDD9F] hover:text-[#EDFF60] hover:scale-110 transform transition-all duration-300">
              {link.icon}
            </a>)}
        </div>

        <div className="mt-10 md:mt-16 text-center">
          <p className="text-[#FCF8EE] text-sm sm:text-base md:text-lg font-jakarta">Una iniciativa de</p>
          <div className="mt-2 sm:mt-4 flex justify-center">
            <div className="text-[#FCF8EE] text-xl sm:text-2xl md:text-3xl font-bold font-jakarta">tripCol</div>
          </div>
        </div>
      </div>
    </section>;
}