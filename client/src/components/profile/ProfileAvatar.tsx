
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

export interface ProfileAvatarProps {
  imageUrl?: string;
  name?: string;
  size?: string;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ imageUrl, name, size = "md" }) => {
  const sizeClass = {
    sm: "h-12 w-12",
    md: "h-16 w-16",
    lg: "h-20 w-20",
    xl: "h-28 w-28"
  }[size] || "h-16 w-16";

  return (
    <Avatar className={`${sizeClass} mb-4 border-4 border-green-100 shadow-md`}>
      <AvatarImage src={imageUrl} alt={name || "User"} />
      <AvatarFallback className="bg-green-600 text-2xl text-white">
        <User className="h-10 w-10" />
      </AvatarFallback>
    </Avatar>
  );
};
