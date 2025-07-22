
import React from 'react';
import { Book, Users, Lightbulb, Award } from 'lucide-react';
import { QuickAccessCard } from '@/components/platform/quick-access/QuickAccessCard';

export const EducacionQuickAccess = () => {
  const quickAccessItems = [
    {
      title: "Guías",
      description: "Documentos prácticos para implementar turismo regenerativo",
      icon: Book,
      bgColor: "bg-green-100",
      iconColor: "text-green-700"
    },
    {
      title: "Talleres",
      description: "Sesiones en vivo con facilitadores y expertos",
      icon: Users,
      bgColor: "bg-green-100",
      iconColor: "text-green-700"
    },
    {
      title: "Recursos",
      description: "Material didáctico y formatos descargables",
      icon: Lightbulb,
      bgColor: "bg-green-100",
      iconColor: "text-green-700"
    },
    {
      title: "Certificaciones",
      description: "Programas formativos con reconocimiento NATUR",
      icon: Award,
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
