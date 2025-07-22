
import React from 'react';
import { UserCategory } from './ProfileHeader';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ProfileCoverProps {
  imageUrl?: string;
  user?: any;
  userCategory?: UserCategory;
}

export const ProfileCover: React.FC<ProfileCoverProps> = ({ imageUrl, user, userCategory }) => {
  // Default cover image 
  const defaultCoverImage = "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg";
  
  return (
    <div className="w-full h-full relative">
      <img 
        src={imageUrl || defaultCoverImage} 
        alt="Cover Photo"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>
      
      {/* Edit Cover Button - Only show if editing is allowed */}
      <Button 
        size="sm" 
        variant="ghost"
        className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm"
        style={{ visibility: 'hidden' }} // Hidden by default, shown via CSS when parent is hovered
      >
        <Camera className="h-4 w-4 mr-1" /> Cambiar portada
      </Button>
    </div>
  );
};
