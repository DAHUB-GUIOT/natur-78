
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, Heart, Filter, Share } from 'lucide-react';

const QuickAccessItem = ({ icon: Icon, label }: { icon: React.ElementType, label: string }) => {
  return (
    <Card className="hover:shadow-md transition-all cursor-pointer bg-white border border-gray-200">
      <CardContent className="flex flex-col items-center justify-center p-3 md:p-4 text-center">
        <div className="bg-green-600/10 p-2 md:p-3 rounded-lg mb-2">
          <Icon className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
        </div>
        <span className="text-xs md:text-sm font-medium text-gray-800">{label}</span>
      </CardContent>
    </Card>
  );
};

export const MarketplaceQuickAccess = () => {
  return (
    <div className="py-6">
      <h2 className="text-xl font-gasoek text-green-700 mb-4">Acceso Rápido</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <QuickAccessItem icon={ShoppingCart} label="Todos los Productos" />
        <QuickAccessItem icon={Heart} label="Favoritos" />
        <QuickAccessItem icon={Filter} label="Categorías" />
        <QuickAccessItem icon={Share} label="Compartir" />
      </div>
    </div>
  );
};
