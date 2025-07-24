
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin } from "lucide-react";
import { Product } from '@/types/marketplace';

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  // Map impact tags to their corresponding colors
  const getImpactColor = (impact: string) => {
    const impactColors: Record<string, string> = {
      'mujeres': 'bg-pink-700/70 hover:bg-pink-700',
      'indigenas': 'bg-amber-700/70 hover:bg-amber-700',
      'reforestacion': 'bg-green-700/70 hover:bg-green-700',
      'energia': 'bg-yellow-700/70 hover:bg-yellow-700',
      'agua': 'bg-blue-700/70 hover:bg-blue-700',
      'residuos': 'bg-purple-700/70 hover:bg-purple-700'
    };
    
    return impactColors[impact] || 'bg-gray-700/70 hover:bg-gray-700';
  };

  const getProductTypeIcon = () => {
    switch (product.tipo) {
      case 'artesania':
        return '🧶';
      case 'alimentacion':
        return '🍲';
      case 'cosmetica':
        return '🌿';
      case 'experiencias':
        return '🏕️';
      default:
        return '📦';
    }
  };

  return (
    <Card className="overflow-hidden bg-[#2A2E22] border-[#4B5D39]/50 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#4B5D39]/20 hover:scale-[1.02] h-full">
      <a href="#" className="block h-full">
        <div className="aspect-[4/3] relative overflow-hidden">
          <img
            src={product.imagen}
            alt={product.nombre}
            className="w-full h-full object-cover"
          />
          
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 rounded-full w-8 h-8 ${
              isFavorite 
                ? 'bg-[#C77B30]/80 text-white hover:bg-[#C77B30]' 
                : 'bg-black/30 hover:bg-black/50 text-white'
            }`}
            onClick={toggleFavorite}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>

          <div className="absolute top-2 left-2">
            <Badge className="bg-[#191C0F]/80 hover:bg-[#191C0F] text-[#E3DAC9]">
              {getProductTypeIcon()} {product.tipoNombre}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center text-sm text-[#E3DAC9]/70">
              <MapPin className="h-3.5 w-3.5 mr-1 text-[#C77B30]" />
              {product.region}
            </div>
            <div className="text-[#C77B30] font-medium">
              {formatPrice(product.precio)}
            </div>
          </div>

          <h3 className="font-bold text-lg mb-2 text-[#F5F5F5]">{product.nombre}</h3>
          
          <p className="text-[#E3DAC9]/80 text-sm line-clamp-2 mb-3">{product.descripcion}</p>
          
          <div className="flex items-center text-xs text-[#E3DAC9]/70 mb-3">
            <span className="mr-1 font-medium">Por:</span>
            {product.comunidad}
          </div>
          
          <div className="flex flex-wrap gap-1.5">
            {product.impactos.map(impacto => (
              <Badge 
                key={impacto} 
                className={`${getImpactColor(impacto)} text-white/90 font-normal`}
              >
                {impacto === 'mujeres' && '👩‍🦱 '}
                {impacto === 'indigenas' && '🏞️ '}
                {impacto === 'reforestacion' && '🌱 '}
                {impacto === 'energia' && '⚡ '}
                {impacto === 'agua' && '💧 '}
                {impacto === 'residuos' && '♻️ '}
                {impacto === 'mujeres' && 'Mujeres'}
                {impacto === 'indigenas' && 'Comunidades indígenas'}
                {impacto === 'reforestacion' && 'Reforestación'}
                {impacto === 'energia' && 'Energía limpia'}
                {impacto === 'agua' && 'Agua limpia'}
                {impacto === 'residuos' && 'Residuos'}
              </Badge>
            ))}
          </div>
        </CardContent>
      </a>
    </Card>
  );
};
