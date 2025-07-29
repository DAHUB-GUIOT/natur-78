
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface LoginFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  showCancel?: boolean;
}

const LoginForm = ({ onSuccess, onCancel, showCancel = false }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await signIn(email, password);
      
      if (error) {
        let errorMessage = "Ocurrió un error durante el inicio de sesión. Por favor intenta nuevamente.";
        
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = "Correo o contraseña incorrectos. Por favor verifica tus datos.";
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = "Por favor verifica tu correo electrónico para activar tu cuenta.";
        }
        
        toast({
          title: "Error de inicio de sesión",
          description: errorMessage,
          variant: "destructive",
        });
      } else if (data) {
        toast({
          title: "¡Bienvenido!",
          description: "Has iniciado sesión correctamente",
        });
        
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error: any) {
      toast({
        title: "Error de inicio de sesión",
        description: error.message || "Ocurrió un error durante el inicio de sesión. Por favor intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login-email" className="text-[#FCF8EE]">
          Correo electrónico
        </Label>
        <Input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="correo@ejemplo.com"
          className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE] placeholder:text-[#FCF8EE]/50"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="login-password" className="text-[#FCF8EE]">
          Contraseña
        </Label>
        <div className="relative">
          <Input
            id="login-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE] pr-10"
            placeholder="Tu contraseña"
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
      
      <div className="text-right">
        <a href="#" className="text-xs text-[#cad95e] hover:underline">
          ¿Olvidaste tu contraseña?
        </a>
      </div>
      
      <div className="flex gap-2 justify-end">
        {showCancel && (
          <Button 
            type="button" 
            variant="outline"
            onClick={onCancel}
            className="border-[#FCF8EE]/30 text-[#FCF8EE] hover:bg-[#FCF8EE]/10"
          >
            Cancelar
          </Button>
        )}
        
        <Button 
          type="submit" 
          className="bg-[#cad95e] text-[#222408] hover:bg-[#CEDD9F]"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Iniciando...
            </>
          ) : (
            "Iniciar Sesión"
          )}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
