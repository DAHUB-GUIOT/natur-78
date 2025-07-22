
import React from 'react';
import { PersonalInfoCard } from './PersonalInfoCard';

interface PersonalDataProps {
  profileData?: any;
  userCategory?: string;
}

export const PersonalData = ({ profileData, userCategory = "ecosystem" }: PersonalDataProps) => {
  // Format profile data to match PersonalInfoCard expected props structure
  const profileDataForCard = {
    username: profileData?.username,
    subcategory: profileData?.subcategory,
    email: profileData?.email || "usuario@ejemplo.com",
    phone: profileData?.phone || "No especificado",
    location: profileData?.location || "Colombia",
    website: profileData?.website || "",
    joinDate: profileData?.joinDate || "Enero 2023",
    occupation: profileData?.occupation || (
      userCategory === "startup" ? "Startup de turismo sostenible" : 
      userCategory === "sponsor" ? "Patrocinador oficial" : 
      "Usuario de NATUR"
    ),
    // Add any additional fields that might be used by PersonalInfoCard
    socialMedia: profileData?.socialMedia || {
      linkedin: profileData?.linkedin || "",
      twitter: profileData?.twitter || "",
      instagram: profileData?.instagram || ""
    }
  };

  return (
    <PersonalInfoCard 
      profileData={profileDataForCard}
      userCategory={userCategory}
      isPublicView={false}
    />
  );
};
