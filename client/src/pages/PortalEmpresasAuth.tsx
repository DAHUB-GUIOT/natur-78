import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { HeaderButtons } from "@/components/layout/HeaderButtons";

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
    <div className="min-h-screen bg-[var(--color-bg)] dark:bg-[var(--color-bg)] flex items-center justify-center p-4">
      <HeaderButtons showPortalButtons={true} />
      <div className="w-full max-w-md">
        {/* NATUR Branding */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-gasoek text-[var(--color-accent)] mb-2 uppercase tracking-wider">
            NATUR
          </h1>
          <p className="text-[var(--color-text)] text-lg font-jakarta">
            Portal Empresas
          </p>
        </div>

        <Card className="bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl text-[var(--color-text)] font-jakarta font-bold">
              Iniciar Sesión
            </CardTitle>
            <p className="text-[var(--color-text)]/70 text-sm font-jakarta">
              Accede a tu cuenta empresarial
            </p>
          </CardHeader>
          <CardContent className="pt-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-[var(--color-text)] font-jakarta font-medium">
                  Correo Electrónico
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[var(--color-bg)] border-[var(--color-border)] text-[var(--color-text)] font-jakarta h-12 rounded-none focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]"
                  placeholder="tu@empresa.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-[var(--color-text)] font-jakarta font-medium">
                  Contraseña
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[var(--color-bg)] border-[var(--color-border)] text-[var(--color-text)] font-jakarta h-12 rounded-none focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]"
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-black font-jakarta font-bold text-sm uppercase tracking-wide h-12 rounded-none transition-all duration-200"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Iniciando sesión..." : "Ingresar al Portal"}
              </Button>
            </form>

            {/* Additional Links */}
            <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
              <div className="text-center space-y-2">
                <p className="text-xs text-[var(--color-text)]/60 font-jakarta">
                  ¿No tienes una cuenta empresarial?
                </p>
                <Button 
                  variant="outline" 
                  className="text-[var(--color-accent)] border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-black font-jakarta text-sm rounded-none"
                  onClick={() => window.location.href = '/registro'}
                >
                  Registrar Empresa
                </Button>
              </div>
            </div>

            {/* Test Account Info */}
            <div className="mt-6 p-4 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-none">
              <h3 className="text-sm font-jakarta font-semibold text-[var(--color-text)] mb-2">Cuenta de prueba:</h3>
              <p className="text-xs text-[var(--color-text)]/70 font-jakarta">Email: dahub.tech@gmail.com</p>
              <p className="text-xs text-[var(--color-text)]/70 font-jakarta">Contraseña: dahub123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PortalEmpresasAuth;