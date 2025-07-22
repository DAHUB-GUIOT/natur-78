
import React from 'react';
import { Briefcase, LineChart, Users, Star } from 'lucide-react';
import { UserCategory } from './ProfileHeader';

export interface ContentTabProps {
  userCategory: UserCategory | string;
  subcategory?: string;
  profileData?: any;
  isPublicView?: boolean;
}

export const ContentTab: React.FC<ContentTabProps> = ({ 
  userCategory, 
  subcategory,
  profileData,
  isPublicView = false 
}) => {
  // Determine if the user is an investment-related role
  const isInvestmentRole = ['investor', 'angel', 'mentor', 'venture-capital'].includes(subcategory || '');
  
  // Return specialized content based on user category and subcategory
  if (userCategory === 'startup' && isInvestmentRole) {
    switch (subcategory) {
      case 'investor':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
              <h3 className="flex items-center text-lg font-semibold text-blue-800 mb-2">
                <Briefcase className="h-5 w-5 mr-2" /> 
                Tesis de Inversión
              </h3>
              <p className="text-blue-700">
                {profileData?.investmentThesis || "Inversión en startups tempranas con enfoque en sostenibilidad y turismo."}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                <h4 className="text-md font-medium text-gray-800 mb-2">Tipo de Inversionista</h4>
                <p className="text-gray-700">{profileData?.investorType || "Inversionista independiente"}</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                <h4 className="text-md font-medium text-gray-800 mb-2">Ticket de Inversión</h4>
                <p className="text-gray-700">{profileData?.investmentTicket || "$20K - $50K"}</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <h4 className="flex items-center text-md font-medium text-gray-800 mb-2">
                <LineChart className="h-4 w-4 mr-2" /> Datos de Inversión
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Tamaño de Portfolio</p>
                  <p className="text-gray-800 font-medium">{profileData?.portfolioSize || 8} startups</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sectores Preferidos</p>
                  <p className="text-gray-800 font-medium">Turismo sostenible, Tecnologías limpias</p>
                </div>
              </div>
            </div>
            
            {!isPublicView && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h4 className="text-green-800 font-medium mb-2">¿Quieres actualizar tu perfil de inversionista?</h4>
                <p className="text-green-700 text-sm mb-3">Mantén tu información actualizada para conectar con las mejores startups.</p>
                <button className="text-sm bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                  Actualizar perfil de inversionista
                </button>
              </div>
            )}
          </div>
        );

      case 'angel':
        return (
          <div className="space-y-6">
            <div className="bg-amber-50/50 p-4 rounded-lg border border-amber-100">
              <h3 className="flex items-center text-lg font-semibold text-amber-800 mb-2">
                <Star className="h-5 w-5 mr-2" /> 
                Tesis de Inversión Ángel
              </h3>
              <p className="text-amber-700">
                {profileData?.investmentThesis || "Capital semilla para startups con impacto social y ambiental."}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                <h4 className="text-md font-medium text-gray-800 mb-2">Tipo de Ángel</h4>
                <p className="text-gray-700">{profileData?.investorType || "Inversionista Ángel"}</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                <h4 className="text-md font-medium text-gray-800 mb-2">Ticket de Inversión</h4>
                <p className="text-gray-700">{profileData?.investmentTicket || "$10K - $30K"}</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <h4 className="flex items-center text-md font-medium text-gray-800 mb-2">
                <Star className="h-4 w-4 mr-2" /> Experiencia como Ángel
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Startups en Portafolio</p>
                  <p className="text-gray-800 font-medium">{profileData?.portfolioSize || 10} startups</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Etapas Preferidas</p>
                  <p className="text-gray-800 font-medium">Semilla, Pre-seed</p>
                </div>
              </div>
            </div>
            
            {!isPublicView && (
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <h4 className="text-amber-800 font-medium mb-2">¿Quieres actualizar tu perfil de inversionista ángel?</h4>
                <p className="text-amber-700 text-sm mb-3">Mantén tu información actualizada para conectar con startups prometedoras.</p>
                <button className="text-sm bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors">
                  Actualizar perfil de ángel
                </button>
              </div>
            )}
          </div>
        );

      case 'mentor':
        return (
          <div className="space-y-6">
            <div className="bg-green-50/50 p-4 rounded-lg border border-green-100">
              <h3 className="flex items-center text-lg font-semibold text-green-800 mb-2">
                <Users className="h-5 w-5 mr-2" /> 
                Especialidades de Mentoría
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {(profileData?.mentoringSpecialties || ['Estrategia de negocio', 'Ecoturismo', 'Levantamiento de capital']).map((specialty: string, index: number) => (
                  <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                <h4 className="text-md font-medium text-gray-800 mb-2">Años de Experiencia</h4>
                <p className="text-gray-700">{profileData?.mentoringExperience || 15} años</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                <h4 className="text-md font-medium text-gray-800 mb-2">Startups Mentoreadas</h4>
                <p className="text-gray-700">{profileData?.mentorStats?.startups || 22} startups</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <h4 className="text-md font-medium text-gray-800 mb-2">Enfoque de Mentoría</h4>
              <p className="text-gray-700">
                {profileData?.mentorApproach || "Ayudar a los emprendedores a desarrollar estrategias de negocio sostenibles y prepararse para recibir inversión. Especialista en ecoturismo y turismo comunitario."}
              </p>
            </div>
            
            {!isPublicView && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h4 className="text-green-800 font-medium mb-2">¿Quieres actualizar tu perfil de mentor?</h4>
                <p className="text-green-700 text-sm mb-3">Mantén tu información actualizada para conectar con emprendedores que necesitan tu conocimiento.</p>
                <button className="text-sm bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                  Actualizar perfil de mentor
                </button>
              </div>
            )}
          </div>
        );

      case 'venture-capital':
        return (
          <div className="space-y-6">
            <div className="bg-purple-50/50 p-4 rounded-lg border border-purple-100">
              <h3 className="flex items-center text-lg font-semibold text-purple-800 mb-2">
                <LineChart className="h-5 w-5 mr-2" /> 
                Tesis de Inversión VC
              </h3>
              <p className="text-purple-700">
                {profileData?.investmentThesis || "Inversión en startups de Series A y B con enfoque en sostenibilidad."}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                <h4 className="text-md font-medium text-gray-800 mb-2">Activos bajo Administración</h4>
                <p className="text-gray-700">{profileData?.aum || "$12M"}</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                <h4 className="text-md font-medium text-gray-800 mb-2">Ticket de Inversión</h4>
                <p className="text-gray-700">{profileData?.investmentTicket || "$150K - $500K"}</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <h4 className="flex items-center text-md font-medium text-gray-800 mb-2">
                <Briefcase className="h-4 w-4 mr-2" /> Portfolio
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Tamaño de Portfolio</p>
                  <p className="text-gray-800 font-medium">{profileData?.portfolioSize || 18} startups</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sectores Preferidos</p>
                  <p className="text-gray-800 font-medium">Turismo sostenible, Tecnologías limpias, Economía circular</p>
                </div>
              </div>
            </div>
            
            {!isPublicView && (
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <h4 className="text-purple-800 font-medium mb-2">¿Quieres actualizar tu perfil de VC?</h4>
                <p className="text-purple-700 text-sm mb-3">Mantén tu información actualizada para encontrar las mejores oportunidades de inversión.</p>
                <button className="text-sm bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                  Actualizar perfil de VC
                </button>
              </div>
            )}
          </div>
        );
        
      default:
        return <div>Contenido por defecto</div>;
    }
  }
  
  // Return content for normal user categories (non-investment roles)
  return (
    <div>
      <h3 className="text-lg font-semibold text-green-800 mb-4">
        {userCategory === "digital-nomad" ? "Destinos favoritos" : "Contenido"}
      </h3>
      
      <p className="text-green-700 italic">
        Esta sección se está actualizando. Pronto verás tu contenido aquí.
      </p>
    </div>
  );
};
