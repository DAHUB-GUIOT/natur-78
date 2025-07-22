import React from 'react';
import { UserCategory } from './ProfileHeader';

interface ExperiencesProps {
  userCategory: UserCategory;
  isPublicView?: boolean;
}

export const Experiences: React.FC<ExperiencesProps> = ({ 
  userCategory,
  isPublicView = false 
}) => {
  // Implementation remains the same
  return (
    <div>
      <h3 className="text-lg font-semibold text-green-800 mb-4">
        {userCategory === "sponsor" ? "Campañas" : 
         userCategory === "startup" ? "Servicios" : 
         "Experiencias"}
      </h3>
      
      <p className="text-green-700 italic">
        Esta sección se está actualizando. Pronto verás tus 
        {userCategory === "sponsor" ? " campañas" : 
         userCategory === "startup" ? " servicios" : 
         " experiencias"} aquí.
      </p>
    </div>
  );
};
