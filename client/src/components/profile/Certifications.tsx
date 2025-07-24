import React from 'react';
import { UserCategory } from './ProfileHeader';

interface CertificationsProps {
  profileData: any;
  userCategory: UserCategory;
  isPublicView?: boolean;
}

export const Certifications: React.FC<CertificationsProps> = ({ 
  profileData, 
  userCategory,
  isPublicView = false
}) => {
  // Implementation remains the same
  return (
    <div>
      <h3 className="text-lg font-semibold text-green-800 mb-4">
        {userCategory === "sponsor" ? "Patrocinios" : 
         userCategory === "startup" ? "Productos" : 
         "Certificaciones"}
      </h3>
      
      <p className="text-green-700 italic">
        Esta sección se está actualizando. Pronto verás tus 
        {userCategory === "sponsor" ? " patrocinios" : 
         userCategory === "startup" ? " productos" : 
         " certificaciones"} aquí.
      </p>
    </div>
  );
};
