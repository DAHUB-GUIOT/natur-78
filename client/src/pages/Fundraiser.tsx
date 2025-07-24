
import React from 'react';
import { Certifications } from '@/components/profile/Certifications';
import { UserCategory } from '@/components/profile/ProfileHeader';

const Fundraiser = () => {
  // Use a default userCategory for the fundraiser page
  const userCategory: UserCategory = "ecosystem";
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Certificaciones</h1>
      
      {/* Pass the required props to the Certifications component */}
      <Certifications 
        profileData={null}
        userCategory={userCategory} 
      />
    </div>
  );
};

export default Fundraiser;
