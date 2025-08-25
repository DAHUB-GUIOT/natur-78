
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing session in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      const response = await apiRequest('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      
      if (response.user) {
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        toast({
          title: "¡Bienvenido!",
          description: "Te has registrado correctamente",
        });
        return { data: { user: response.user }, error: null };
      }
      
      return { data: { user: response.user }, error: null };
    } catch (error: any) {
      // Error handling for sign up
      
      // Better error handling for different scenarios
      let errorMessage = 'Error en el registro';
      
      if (error.message?.includes('400') || error.message?.includes('User already exists')) {
        errorMessage = 'Ya existe una cuenta con este email. Intenta iniciar sesión o usa otro email.';
      } else if (error.message?.includes('500')) {
        errorMessage = 'Error interno del servidor. Intenta nuevamente.';
      } else if (error.message?.includes('Invalid input')) {
        errorMessage = 'Datos de registro inválidos. Verifica el email y contraseña.';
      }
      
      toast({
        title: "Error de registro",
        description: errorMessage,
        variant: "destructive"
      });
      
      return { data: null, error: { message: errorMessage } };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      
      if (response.user) {
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        toast({
          title: "¡Bienvenido!",
          description: "Has iniciado sesión correctamente",
        });
        return { data: { user: response.user }, error: null };
      }
      
      return { data: { user: response.user }, error: null };
    } catch (error: any) {
      // Error handling for sign in
      return { data: null, error: { message: error.message || 'Error al iniciar sesión' } };
    }
  };

  const signOut = async () => {
    try {
      // Call backend logout endpoint
      await apiRequest('/api/auth/logout', {
        method: 'POST',
      });
      
      // Clear local state
      setUser(null);
      localStorage.removeItem('user');
      
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente",
      });
      
      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      // Error handling for sign out
      // Even if backend fails, clear local state
      setUser(null);
      localStorage.removeItem('user');
      window.location.href = '/';
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
