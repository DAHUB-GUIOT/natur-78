
import React from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { LogOut, UserCog } from 'lucide-react';

const AccountSettings = () => {
  const { user, signOut } = useAuth();
  const [, setLocation] = useLocation();
  
  const handleSignOut = async () => {
    await signOut();
    setLocation('/');
  };
  
  return (
    <div className="bg-[#FCF8EE]/10 p-6 rounded-lg border border-[#FCF8EE]/10">
      <h3 className="text-lg font-semibold text-[#EDFF60] flex items-center gap-2 mb-4">
        <UserCog className="h-5 w-5" />
        Ajustes de cuenta
      </h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-[#FCF8EE] font-medium mb-2">Email</h4>
          <p className="text-[#FCF8EE]/70">{user?.email}</p>
        </div>
        
        <div>
          <h4 className="text-[#FCF8EE] font-medium mb-2">Cerrar sesión</h4>
          <Button 
            variant="destructive"
            className="flex items-center gap-2"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
