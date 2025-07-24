
import React from 'react';
import ProfileHeader, { UserCategory } from './ProfileHeader';
import { ProfileStatsCard } from './ProfileStatsCard';
import { PersonalInfoCard } from './PersonalInfoCard';
import { BadgesCard } from './BadgesCard';
import { ContentTab } from './ContentTab';

interface ProfileViewerProps {
  username?: string;
  userCategory: UserCategory;
  subcategory: string;
  isPublicView?: boolean;
}

export const ProfileViewer: React.FC<ProfileViewerProps> = ({
  username = 'Usuario',
  userCategory,
  subcategory,
  isPublicView = false
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <ProfileHeader 
          userCategory={userCategory}
          subcategory={subcategory}
          isPublicView={isPublicView}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-1 space-y-6">
            <ProfileStatsCard />
            <PersonalInfoCard />
            <BadgesCard />
          </div>
          
          <div className="lg:col-span-2">
            <ContentTab />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Participation = () => {
  const PARTICIPANTS = ["Agencias y operadores", "Hoteles y hostales", "Emprendimientos de turismo comunitario o local", "Guías turísticos", "Proyectos, fundaciones y organizaciones", "Empresas comprometidos con la sostenibilidad", "Instituciones gubernamentales y atractivos turísticos", "Restaurantes con proposito", "Startups"];
  
  return (
    <section className="w-full px-3 sm:px-6 md:px-20 py-10 md:py-[100px] lg:py-[131px] flex justify-center items-center font-jakarta bg-[#191c0f]">
      <div className="w-full max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <h1 style={{
            lineHeight: 1.02,
            fontWeight: 700,
            letterSpacing: 2
          }} className="font-gasoek text-[#EDFF60] text-center text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-normal leading-tight tracking-[2px] uppercase max-w-[90vw] mb-8 sm:mb-10 md:mb-12">
            BUSCAMOS INICIATIVAS QUE HAGAN TURISMO SOSTENIBLE
          </h1>

          <div className="text-[#CEDD9F] font-unbounded text-[1rem] sm:text-[1.1rem] md:text-[1.17rem] font-light uppercase tracking-[0.07em] leading-7 mt-1 md:w-[38%] md:text-right">
            Si haces parte de la cadena turística y quieres aprender del turismo con propósito, este festival es para ti
          </div>
        </div>

        {/* Participants Grid */}
        <div className="w-full mt-16 flex flex-col items-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-5 w-full">
            {PARTICIPANTS.map((label, idx) => (
              <div key={idx} className="border border-[#CEDD9F] rounded-lg text-[#CEDD9F] text-center font-jakarta text-lg md:text-xl font-medium px-8 py-8 flex items-center justify-center">
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Button */}
        <div className="w-full flex justify-center mt-12">
          <a href="/reserva" className="w-full max-w-[450px] bg-[#EDFF60] text-[#232611] rounded-none text-lg md:text-xl font-unbounded font-bold uppercase px-4 py-6 tracking-tight transition-none border-none hover:bg-[#E5F73D] block text-center" style={{
            letterSpacing: 0
          }}>
            ¡Reserva tu stand o patrocina!
          </a>
        </div>
      </div>
    </section>
  );
};
