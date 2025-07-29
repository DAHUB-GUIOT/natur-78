import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const PortalEmpresasAuth = () => {
  const [email, setEmail] = useState("dahub.tech@gmail.com");
  const [password, setPassword] = useState("dahub123");
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      return await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: () => {
      toast({
        title: "Inicio de sesión exitoso",
        description: "Redirigiendo al portal...",
      });
      setTimeout(() => {
        window.location.href = '/portal-empresas';
      }, 1000);
    },
    onError: (error: any) => {
      toast({
        title: "Error de autenticación",
        description: error.message || "Credenciales inválidas",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-gray-900 to-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900/80 border-green-600/30 backdrop-blur-xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="text-2xl font-bold text-white">NATUR</span>
          </div>
          <CardTitle className="text-xl text-white">Portal Empresas</CardTitle>
          <p className="text-gray-400 text-sm">Accede a tu cuenta empresarial</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-white mb-2 block">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800/50 border-gray-600 text-white"
                placeholder="tu@empresa.com"
                required
              />
            </div>
            <div>
              <label className="text-sm text-white mb-2 block">Contraseña</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800/50 border-gray-600 text-white"
                placeholder="••••••••"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
            <h3 className="text-sm font-semibold text-white mb-2">Cuenta de prueba:</h3>
            <p className="text-xs text-gray-300">Email: dahub.tech@gmail.com</p>
            <p className="text-xs text-gray-300">Contraseña: dahub123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortalEmpresasAuth;