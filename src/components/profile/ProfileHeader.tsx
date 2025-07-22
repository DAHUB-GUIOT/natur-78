
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Edit, MapPin, Globe, Mail, Phone } from "lucide-react";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileCover } from "./ProfileCover";
import { getUserProfile } from "@/services/profileService";
import { useAuth } from "@/contexts/AuthContext";
import ProfileImageUpload from './ProfileImageUpload';
import { ProfileEditDialog } from './ProfileEditDialog';

// Define the UserCategory type and export it
export type UserCategory = "ecosystem" | "startup" | "sponsor" | "attendee" | "digital-nomad";

const ProfileHeader = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);

  useEffect(() => {
    const loadProfileData = async () => {
      if (user?.id) {
        try {
          const { profile } = await getUserProfile(user.id);
          setProfileData(profile);
          setProfileImage(profile?.profile_image_url || null);
          setCoverImage(profile?.cover_image_url || null);
        } catch (error) {
          console.error("Error loading profile:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadProfileData();
  }, [user]);
  
  // Fallback to local storage if no data from Supabase yet
  useEffect(() => {
    if (!profileData && !loading) {
      const storedData = localStorage.getItem('userProfileData');
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          setProfileData(parsedData);
        } catch (e) {
          console.error("Error parsing stored profile data", e);
        }
      }
    }
  }, [profileData, loading]);

  const handleUpdateProfileImage = (url: string) => {
    setProfileImage(url);
  };

  const handleUpdateCoverImage = (url: string) => {
    setCoverImage(url);
  };
  
  if (loading) {
    return (
      <div className="w-full h-[300px] bg-gradient-to-r from-[#222408]/50 to-[#2C2F0A]/50 animate-pulse rounded-lg"></div>
    );
  }

  return (
    <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-[#222408] to-[#2C2F0A] mb-6">
      {/* Cover Image */}
      <div className="h-48 md:h-64 relative">
        <ProfileCover imageUrl={coverImage} />
        
        <div className="absolute top-4 right-4">
          <ProfileImageUpload 
            type="cover"
            onSuccess={handleUpdateCoverImage}
          />
        </div>
      </div>
      
      {/* Profile header content */}
      <div className="px-4 md:px-8 pb-6 relative">
        {/* Avatar */}
        <div className="absolute -top-16 left-6">
          <div className="relative">
            <ProfileAvatar 
              size="xl" 
              imageUrl={profileImage}
              name={profileData?.name || "Usuario"}
            />
            <div className="absolute bottom-0 right-0">
              <ProfileImageUpload 
                type="profile"
                onSuccess={handleUpdateProfileImage}
              />
            </div>
          </div>
        </div>
        
        <div className="pt-20">
          {/* Name and Edit Button */}
          <div className="flex flex-wrap items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-[#FCF8EE]">{profileData?.name || "Nombre de Usuario"}</h1>
              <p className="text-[#FCF8EE]/70">{profileData?.subcategory || profileData?.user_category || "Categoría de usuario"}</p>
            </div>
            
            <Button 
              variant="outline" 
              className="border-[#EDFF60] text-[#EDFF60] hover:bg-[#EDFF60]/10"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Editar Perfil
            </Button>
          </div>
          
          {/* Bio */}
          <p className="text-[#FCF8EE] mb-4">{profileData?.profileBio || profileData?.profile_bio || "Sin descripción..."}</p>
          
          {/* Profile meta information */}
          <div className="flex flex-wrap gap-4 text-sm text-[#FCF8EE]/80">
            {profileData?.location && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{profileData.location}</span>
              </div>
            )}
            
            {profileData?.website && (
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-1" />
                <a 
                  href={profileData.website.startsWith('http') ? profileData.website : `https://${profileData.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#EDFF60]"
                >
                  {profileData.website.replace(/^(https?:\/\/)?(www\.)?/i, '')}
                </a>
              </div>
            )}
            
            {profileData?.email && (
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                <a 
                  href={`mailto:${profileData.email}`}
                  className="hover:text-[#EDFF60]"
                >
                  {profileData.email}
                </a>
              </div>
            )}
            
            {profileData?.phone && (
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                <span>{profileData.phone}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Edit Profile Dialog */}
      <ProfileEditDialog
        open={isEditing}
        onOpenChange={setIsEditing}
        profileData={profileData}
        onUpdate={(updatedData) => setProfileData({...profileData, ...updatedData})}
      />
    </div>
  );
};

export default ProfileHeader;
