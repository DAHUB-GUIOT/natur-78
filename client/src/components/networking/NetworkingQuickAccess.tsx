
import React from 'react';
import { Network, Users, Link2, Share2 } from 'lucide-react';
import { QuickAccessCard } from '@/components/platform/quick-access/QuickAccessCard';

export const NetworkingQuickAccess = () => {
  const quickAccessItems = [
    {
      title: "Directorio",
      description: "Explora nuestro directorio de miembros de la comunidad",
      icon: Users,
      bgColor: "bg-green-100",
      iconColor: "text-green-700"
    },
    {
      title: "Foros",
      description: "Participa en conversaciones temáticas con otros miembros",
      icon: Share2,
      bgColor: "bg-green-100",
      iconColor: "text-green-700"
    },
    {
      title: "Eventos",
      description: "Calendario de encuentros virtuales y presenciales",
      icon: Network,
      bgColor: "bg-green-100",
      iconColor: "text-green-700"
    },
    {
      title: "Alianzas",
      description: "Propuestas de colaboración y oportunidades de alianza",
      icon: Link2,
      bgColor: "bg-green-100",
      iconColor: "text-green-700"
    }
  ];

  return (
    <div className="py-6">
      <h2 className="text-xl font-gasoek mb-4 text-green-700">Acceso Rápido</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {quickAccessItems.map((item, index) => (
          <QuickAccessCard
            key={index}
            title={item.title}
            description={item.description}
            icon={item.icon}
            bgColor={item.bgColor}
            iconColor={item.iconColor}
          />
        ))}
      </div>
    </div>
  );
};
