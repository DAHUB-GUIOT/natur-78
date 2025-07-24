
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit } from "lucide-react";
import { CardHeader } from "@/components/ui/card";

export interface ProfileEditDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  profileData?: any;
  onUpdate?: (updatedData: any) => void;
  user?: any;
}

export const ProfileEditDialog: React.FC<ProfileEditDialogProps> = ({ 
  open, 
  onOpenChange,
  profileData,
  onUpdate,
  user 
}) => {
  // Use either user or profileData depending on what's provided
  const userData = user || profileData || {};
  
  return (
    <>
      {!open ? (
        <CardHeader className="relative pb-0">
          <div className="absolute top-4 right-4">
            <Dialog open={open} onOpenChange={onOpenChange}>
              <Button size="icon" variant="ghost" className="h-8 w-8 text-green-700 hover:text-white hover:bg-green-600">
                <Edit className="h-4 w-4" />
              </Button>
            </Dialog>
          </div>
        </CardHeader>
      ) : (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="bg-white border-green-100">
            <DialogHeader>
              <DialogTitle className="text-green-800">Editar perfil</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Avatar className="h-24 w-24 cursor-pointer border-4 border-green-100">
                  <AvatarImage src={userData.profileImage} alt={userData.name} />
                  <AvatarFallback className="bg-green-600 text-xl text-white">
                    {userData.name ? userData.name.charAt(0) : "U"}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" className="bg-white border-green-600 text-green-700 hover:bg-green-50">
                  Cambiar foto
                </Button>
              </div>
              <div className="space-y-4 pt-4">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-green-800 text-sm font-medium">
                    Nombre completo
                  </label>
                  <input 
                    id="name" 
                    type="text" 
                    defaultValue={userData.name}
                    className="bg-white border-green-200 text-green-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="username" className="text-green-800 text-sm font-medium">
                    Nombre de usuario
                  </label>
                  <div className="relative">
                    <span className="absolute left-2 top-2 text-green-600/60">@</span>
                    <input 
                      id="username" 
                      type="text" 
                      defaultValue={userData.username}
                      className="bg-white border-green-200 text-green-800 rounded-lg p-2 pl-6 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button className="bg-green-600 text-white hover:bg-green-700" onClick={() => onUpdate && onUpdate({})}>Guardar</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
