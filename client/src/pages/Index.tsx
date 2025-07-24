
import React, { useEffect } from "react";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Benefits } from "@/components/sections/Benefits";
import { Participation } from "@/components/sections/Participation";
import { Program } from "@/components/sections/Program";
import { Location } from "@/components/sections/Location";
import { Award } from "@/components/sections/Award";
import { Partners } from "@/components/sections/Partners";
import { Contact } from "@/components/sections/Contact";
import { TopButtons } from "@/components/ui/TopButtons";
import { HomeBanner } from "@/components/sections/HomeBanner";
import { FeaturedArticles } from "@/components/sections/FeaturedArticles";
import { MainPortals } from "@/components/sections/MainPortals";

const Index = () => {
  // Smooth scroll to anchor links
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = (anchor as HTMLAnchorElement).getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <div className="overflow-x-hidden w-full">
      <div className="min-h-screen bg-[#FCF8EE] w-full">
        <TopButtons />
        
        <HomeBanner />
        <FeaturedArticles />
        
        <MainPortals />
        
        <Hero />
        
        <div id="about">
          <About />
        </div>
        
        <div id="benefits">
          <Benefits />
        </div>
        
        <div id="participate">
          <Participation />
        </div>
        
        <div id="program">
          <Program />
        </div>
        
        <div id="location">
          <Location />
        </div>
        
        <div id="award">
          <Award />
        </div>
        
        <div id="partners">
          <Partners />
        </div>
        
        <div id="contact">
          <Contact />
        </div>

        <footer className="bg-[#191C0F] text-[#FCF8EE] text-center py-6 text-sm w-full">
          <p>© {new Date().getFullYear()} Festival NATUR - Todos los derechos reservados</p>
          <p className="mt-2">Una iniciativa para un turismo más sostenible y responsable en Colombia</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
