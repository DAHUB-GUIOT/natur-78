
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { UserCategory } from './ProfileHeader';
import { Mail, MapPin, Phone, Globe } from "lucide-react";

export interface PersonalInfoCardProps {
  profileData: any;
  userCategory: UserCategory | string;
  isPublicView?: boolean;
}

export const PersonalInfoCard: React.FC<PersonalInfoCardProps> = ({ 
  profileData, 
  userCategory,
  isPublicView = false 
}) => {
  return (
    <Card className="border border-green-100 bg-white/80 backdrop-blur-sm shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-green-800">Información Personal</h3>
        </div>
        
        <div className="space-y-4 text-sm">
          {profileData?.email && (
            <div className="flex items-start space-x-2">
              <Mail className="h-4 w-4 text-green-600 mt-0.5" />
              <div>
                <p className="text-green-800 font-medium">Email</p>
                <p className="text-green-700">{profileData.email}</p>
              </div>
            </div>
          )}
          
          {profileData?.location && (
            <div className="flex items-start space-x-2">
              <MapPin className="h-4 w-4 text-green-600 mt-0.5" />
              <div>
                <p className="text-green-800 font-medium">Ubicación</p>
                <p className="text-green-700">{profileData.location}</p>
              </div>
            </div>
          )}
          
          {profileData?.phone && (
            <div className="flex items-start space-x-2">
              <Phone className="h-4 w-4 text-green-600 mt-0.5" />
              <div>
                <p className="text-green-800 font-medium">Teléfono</p>
                <p className="text-green-700">{profileData.phone}</p>
              </div>
            </div>
          )}
          
          {profileData?.website && (
            <div className="flex items-start space-x-2">
              <Globe className="h-4 w-4 text-green-600 mt-0.5" />
              <div>
                <p className="text-green-800 font-medium">Sitio web</p>
                <a 
                  href={profileData.website.startsWith('http') ? profileData.website : `https://${profileData.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 hover:text-green-900 hover:underline"
                >
                  {profileData.website.replace(/^(https?:\/\/)?(www\.)?/i, '')}
                </a>
              </div>
            </div>
          )}

          {userCategory === 'startup' && (
            <div className="pt-2 mt-2 border-t border-green-100">
              <p className="text-green-800 font-medium mb-2">Información de la Startup</p>
              {profileData?.foundingYear && (
                <div className="flex justify-between text-sm text-green-700">
                  <span>Año de fundación</span>
                  <span className="font-medium">{profileData.foundingYear}</span>
                </div>
              )}
              {profileData?.phase && (
                <div className="flex justify-between text-sm text-green-700 mt-1">
                  <span>Fase</span>
                  <span className="font-medium">{profileData.phase}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
