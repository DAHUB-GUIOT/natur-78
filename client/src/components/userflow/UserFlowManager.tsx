import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  User, MapPin, MessageCircle, Star, Check, 
  Building, Globe, Users, Award 
} from 'lucide-react';

interface UserFlowStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  action?: () => void;
  icon: React.ComponentType<any>;
}

const UserFlowManager: React.FC = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['/api/auth/me'],
  });

  const { data: company } = useQuery({
    queryKey: ['/api/companies/me'],
    enabled: !!user && user.role === 'empresa',
  });

  const { data: experiences = [] } = useQuery({
    queryKey: ['/api/experiences'],
    enabled: !!user,
  });

  const calculateProfileCompletion = () => {
    if (!user) return 0;
    
    const requiredFields = [
      user.firstName,
      user.lastName || user.companyName,
      user.email,
      user.phone,
      user.city,
      user.bio
    ];
    
    const completedFields = requiredFields.filter(field => field && field.trim()).length;
    return Math.round((completedFields / requiredFields.length) * 100);
  };

  const userFlowSteps: UserFlowStep[] = [
    {
      id: 'registration',
      title: '1. Registro Completado',
      description: 'Cuenta creada exitosamente',
      completed: !!user,
      icon: User
    },
    {
      id: 'profile',
      title: '2. Perfil Configurado',
      description: 'Información personal y profesional completa',
      completed: calculateProfileCompletion() >= 80,
      action: () => window.location.href = '/edit-profile',
      icon: Building
    },
    {
      id: 'contact-card',
      title: '3. Tarjeta de Contacto',
      description: 'Ficha pública visible en directorio',
      completed: !!user && user.isContactCardVisible !== false,
      icon: Globe
    },
    {
      id: 'map-location',
      title: '4. Ubicación en Mapa',
      description: 'Punto geolocalizado visible en el mapa',
      completed: !!user && !!user.coordinates && user.isMapVisible !== false,
      icon: MapPin
    },
    {
      id: 'messaging',
      title: '5. Sistema de Mensajería',
      description: 'Puede enviar y recibir mensajes',
      completed: !!user, // Messaging is enabled for all registered users
      action: () => window.location.href = '/portal-empresas?view=messages',
      icon: MessageCircle
    },
    {
      id: 'experiences',
      title: '6. Crear Experiencias',
      description: 'Experiencias/actividades creadas',
      completed: experiences.length > 0,
      action: () => window.location.href = '/experience-creator',
      icon: Star
    },
    {
      id: 'traveler-map',
      title: '7. Mapa de Viajeros',
      description: 'Experiencias visibles para otros usuarios',
      completed: experiences.some((exp: any) => exp.isVisibleOnTravelerMap && exp.status === 'aprobado'),
      icon: Users
    }
  ];

  const completedSteps = userFlowSteps.filter(step => step.completed).length;
  const progressPercentage = Math.round((completedSteps / userFlowSteps.length) * 100);

  const enableMapVisibilityMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest('/api/auth/update-profile', {
        method: 'PUT',
        body: JSON.stringify({
          isMapVisible: true,
          isContactCardVisible: true,
          coordinates: user?.coordinates || { lat: 4.6097, lng: -74.0817 }
        }),
      });
    },
    onSuccess: () => {
      toast({
        title: "Visibilidad activada",
        description: "Tu perfil ahora es visible en el mapa y directorio",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
    },
  });

  const updateProfileCompletionMutation = useMutation({
    mutationFn: async () => {
      const completion = calculateProfileCompletion();
      return await apiRequest('/api/auth/update-profile', {
        method: 'PUT',
        body: JSON.stringify({
          profileCompletion: completion,
          verificationLevel: completion >= 100 ? 'verified' : 'basic'
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
    },
  });

  useEffect(() => {
    if (user) {
      updateProfileCompletionMutation.mutate();
    }
  }, [user]);

  if (!user) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <p className="text-white text-center">Cargando información del usuario...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <span>Progreso de Configuración</span>
          <Badge className={`${progressPercentage === 100 ? 'bg-green-500' : 'bg-blue-500'} text-white`}>
            {progressPercentage}%
          </Badge>
        </CardTitle>
        <Progress value={progressPercentage} className="w-full" />
      </CardHeader>
      <CardContent className="space-y-4">
        {userFlowSteps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              className={`flex items-center space-x-4 p-3 rounded-lg border ${
                step.completed 
                  ? 'bg-green-500/20 border-green-500/30' 
                  : 'bg-white/5 border-white/20'
              }`}
            >
              <div className={`p-2 rounded-full ${
                step.completed ? 'bg-green-500' : 'bg-white/20'
              }`}>
                {step.completed ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <Icon className="w-4 h-4 text-white" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium">{step.title}</h4>
                <p className="text-white/70 text-sm">{step.description}</p>
              </div>
              {!step.completed && step.action && (
                <Button
                  onClick={step.action}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Completar
                </Button>
              )}
            </div>
          );
        })}
        
        {progressPercentage === 100 && (
          <div className="text-center p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
            <Award className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <h3 className="text-green-400 font-bold text-lg">¡Configuración Completa!</h3>
            <p className="text-white/80 text-sm">
              Tu perfil está completamente configurado y visible para otros usuarios.
            </p>
          </div>
        )}
        
        {user.role === 'empresa' && !user.isMapVisible && (
          <Button
            onClick={() => enableMapVisibilityMutation.mutate()}
            disabled={enableMapVisibilityMutation.isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {enableMapVisibilityMutation.isPending ? 'Activando...' : 'Activar Visibilidad en Mapa'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default UserFlowManager;