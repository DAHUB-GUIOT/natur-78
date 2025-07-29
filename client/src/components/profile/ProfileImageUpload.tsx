
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { updateProfileImage } from "@/services/profileService";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Camera, Loader2 } from "lucide-react";

interface ProfileImageUploadProps {
  type: 'profile' | 'cover';
  onSuccess: (url: string) => void;
}

const ProfileImageUpload = ({ type, onSuccess }: ProfileImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Archivo demasiado grande",
        description: "El tamaño máximo permitido es 5MB",
        variant: "destructive",
      });
      return;
    }
    
    // Validate file type
    if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
      toast({
        title: "Formato no soportado",
        description: "Por favor sube una imagen en formato JPEG, PNG, GIF o WEBP",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      if (!user?.id) {
        throw new Error("Usuario no autenticado");
      }
      
      const { publicUrl } = await updateProfileImage(user.id, file, type);
      
      toast({
        title: "Imagen actualizada",
        description: type === 'profile' ? 
          "Tu foto de perfil ha sido actualizada correctamente" : 
          "Tu imagen de portada ha sido actualizada correctamente",
      });
      
      onSuccess(publicUrl);
      
    } catch (error: any) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error al subir imagen",
        description: error.message || "Ocurrió un error al subir la imagen. Por favor intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  return (
    <>
      <input 
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/gif,image/webp"
        style={{ display: 'none' }}
      />
      
      <Button
        type="button"
        className={`bg-[#cad95e]/80 text-[#222408] hover:bg-[#cad95e] rounded-full ${type === 'profile' ? 'p-2' : 'px-3 py-2'}`}
        onClick={handleClick}
        disabled={isUploading}
      >
        {isUploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <Camera className={`${type === 'profile' ? 'h-4 w-4' : 'h-4 w-4 mr-1'}`} />
            {type === 'cover' && <span className="text-xs">Cambiar portada</span>}
          </>
        )}
      </Button>
    </>
  );
};

export default ProfileImageUpload;
