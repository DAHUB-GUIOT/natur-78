
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface RegistrationAuthProps {
  email: string;
  onSuccess: (user: any) => void;
  onError: (error: any) => void;
}

const RegistrationAuth = ({ email, onSuccess, onError }: RegistrationAuthProps) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const { signUp } = useAuth();
  const { toast } = useToast();

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres');
      return false;
    }
    if (password !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return false;
    }
    setPasswordError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await signUp(email, password);
      
      if (error) {
        if (error.message.includes('already registered')) {
          toast({
            title: "Correo ya registrado",
            description: "Este correo ya está registrado en nuestra plataforma. Por favor inicia sesión o utiliza otro correo.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error de registro",
            description: error.message || "Ocurrió un error durante el registro. Por favor intenta nuevamente.",
            variant: "destructive",
          });
        }
        onError(error);
      } else {
        toast({
          title: "Registro exitoso",
          description: "Tu cuenta ha sido creada. Por favor verifica tu correo para activarla.",
        });
        onSuccess(data.user);
      }
    } catch (error: any) {
      toast({
        title: "Error de registro",
        description: error.message || "Ocurrió un error durante el registro. Por favor intenta nuevamente.",
        variant: "destructive",
      });
      onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-[#FCF8EE]">
          Correo electrónico
        </Label>
        <Input
          id="email"
          value={email}
          readOnly
          disabled
          className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE]"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password" className="text-[#FCF8EE]">
          Contraseña
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE] pr-10"
            placeholder="Al menos 8 caracteres"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-[#FCF8EE]/70 hover:text-[#FCF8EE] hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-[#FCF8EE]">
          Confirmar contraseña
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE] pr-10"
            placeholder="Repite tu contraseña"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-[#FCF8EE]/70 hover:text-[#FCF8EE] hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </Button>
        </div>
        
        {passwordError && (
          <p className="text-sm text-red-400 mt-1">{passwordError}</p>
        )}
      </div>
      
      <div className="text-xs text-[#FCF8EE]/70 mt-2">
        <p>Al registrarte, aceptas nuestra política de privacidad y términos de servicio.</p>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-[#EDFF60] text-[#222408] hover:bg-[#CEDD9F]"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registrando...
          </>
        ) : (
          "Crear cuenta"
        )}
      </Button>
    </form>
  );
};

export default RegistrationAuth;
